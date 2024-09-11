<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
    {
    public function register ( Request $request )
        {
        // Validacija zahteva
        $validator = Validator::make ( $request->all (), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ] );

        // Ako validacija ne uspe, vrati grešku
        if ( $validator->fails () )
            {
            return response ()->json ( $validator->errors (), 422 );
            }

        // Kreiraj novog korisnika
        $user = User::create ( [
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make ( $request->password ),
        ] );

        // Dodeli ulogu korisniku. Po defaultu dodeljujemo 'user'
        $user->assignRole ( 'user' );

        // Kreiraj token za korisnika
        $token = $user->createToken ( 'auth_token' )->plainTextToken;

        // Vrati odgovor sa tokenom i korisnikom
        return response ()->json ( [ 'token' => $token, 'user' => $user ], 201 );
        }

    public function login ( Request $request )
        {
        $credentials = $request->only ( 'email', 'password' );

        if ( ! Auth::attempt ( $credentials ) )
            {
            return response ()->json ( [ 'message' => 'Unauthorized' ], 401 );
            }

        $user  = $request->user ();
        $token = $user->createToken ( 'auth_token' )->plainTextToken;
        $roles = $user->getRoleNames (); // Dobijanje uloga korisnika

        return response ()->json ( [
            'access_token' => $token,
            'token_type'   => 'Bearer',
            'roles'        => $roles,
        ] );
        }

    public function logout ( Request $request )
        {
        // Dobijamo trenutno autentifikovanog korisnika
        $user = $request->user ();

        // Brišemo sve tokene korisnika (odjava sa svih uređaja)
        $user->tokens ()->delete ();

        return response ()->json ( [ 'message' => 'Successfully logged out' ] );
        }

    // Dodaj funkcionalnost za slanje emaila za reset lozinke
    public function sendResetLinkEmail ( Request $request )
        {
        $request->validate ( [ 'email' => 'required|email' ] );

        $status = Password::sendResetLink (
            $request->only ( 'email' ),
        );

        return $status === Password::RESET_LINK_SENT
            ? response ()->json ( [ 'message' => 'Reset link sent to your email.' ] )
            : response ()->json ( [ 'message' => 'Unable to send reset link' ], 500 );
        }

    // Dodaj funkcionalnost za reset lozinke
    public function resetPassword ( Request $request )
        {
        $request->validate ( [
            'email'    => 'required|email',
            'token'    => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ] );

        $status = Password::reset (
            $request->only ( 'email', 'password', 'password_confirmation', 'token' ),
            function ($user, $password)
                {
                $user->forceFill ( [
                    'password' => Hash::make ( $password ),
                ] )->save ();
                }
        );

        return $status === Password::PASSWORD_RESET
            ? response ()->json ( [ 'message' => 'Password reset successful.' ] )
            : response ()->json ( [ 'message' => 'Password reset failed' ], 500 );
        }

    // Proveri ulogu pre dozvoljavanja pristupa
    public function accessProtectedRoute ( Request $request )
        {
        // Proverava ulogu korisnika
        $user = $request->user ();

        if ( $user->hasRole ( 'admin' ) )
            {
            return response ()->json ( [ 'message' => 'Admin access granted' ] );
            }

        if ( $user->hasRole ( 'user' ) )
            {
            return response ()->json ( [ 'message' => 'User access granted' ] );
            }

        return response ()->json ( [ 'message' => 'Unauthorized' ], 403 );
        }
    }
