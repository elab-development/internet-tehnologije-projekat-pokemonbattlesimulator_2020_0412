<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Password as PasswordFacade;

class PasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $this->validate($request, ['email' => 'required|email']);

        $response = PasswordFacade::sendResetLink($request->only('email'));

        return $response === PasswordFacade::RESET_LINK_SENT
                    ? response()->json(['status' => __($response)], 200)
                    : response()->json(['email' => __($response)], 400);
    }

    public function reset(Request $request)
    {
        $this->validate($request, [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed',
        ]);

        $response = PasswordFacade::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->save();
            }
        );

        return $response === PasswordFacade::PASSWORD_RESET
                    ? response()->json(['status' => __($response)], 200)
                    : response()->json(['email' => __($response)], 400);
    }

    public function showResetForm($token)
    {
        return response()->json(['token' => $token]);
    }
}

