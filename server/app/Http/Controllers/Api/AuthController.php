<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\Controller;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }
    protected function redirectTo($request)
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Nếu không phải API, có thể chuyển hướng tới route login (nếu cần)
        return route('login');
    }
    // Đăng ký người dùng
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(['token' => $token], 201);
    }

    // Đăng nhập người dùng
    public function login(Request $request)
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'error' => 'Unauthorized'
            ], 401);
        }

        return $this->respondWithToken($token);
    }

    // Lấy thông tin người dùng hiện tại
    public function me()
    {
        return response()->json(Auth::user());
    }

    // Đăng xuất người dùng
    public function logout()
    {
        Auth::logout();
        return response()->json(['message' => 'Successfully logged out']);
    }


    public function refresh()
    {
        return $this->respondWithToken(auth()->guard('api')->refresh());
    }

    // Trả về thông tin token
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->guard('api')->factory()->getTTL() * 60
        ]);
    }
}
