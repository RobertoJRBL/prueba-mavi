<?php

namespace App\Http\Controllers;

// use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// use Illuminate\Http\Request;


class UserController extends Controller
{
    public function signin()
    {
        $credentials = request()->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            request()->session()->regenerate();
            return response()->json(['success' => true]);
        }

        return response()->json(['error' => 'El usuario o contraseña son inválidos'], 422);
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['success' => true]);
    }

}
