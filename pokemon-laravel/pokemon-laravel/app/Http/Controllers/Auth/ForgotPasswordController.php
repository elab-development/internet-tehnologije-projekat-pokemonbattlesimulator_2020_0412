<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkEmail(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $response = Password::sendResetLink($request->only('email'));

        return $response === Password::RESET_LINK_SENT
                    ? response()->json(['message' => 'Reset link sent to your email.'])
                    : response()->json(['message' => 'Unable to send reset link.'], 500);
    }
}

