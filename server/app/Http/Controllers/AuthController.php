<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware("auth:api", ['except' => ['login', 'register', 'refreshToken']]); // Middleware "auth:api" is used to authenticate users via API token
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)],
        ));

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
        ], 201);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(["message" => "Unauthorized"], 401);
        }

        $data = [
            'sub' => auth()->user()->id,
            'random' => rand().time(),
            'expires_in' => time() + config('jwt.refresh_ttl'),
        ];

        $refreshToken =JWTAuth::getJWTProvider()->encode($data);
        return $this->createNewToken($token, $refreshToken);
    }
    public function createNewToken($token, $refreshToken)
    {
        return response()->json([
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'token_type' => 'bearer',
            'expires_in' => config('jwt.ttl') * 60,
            'user' => auth()->user()
        ]);
    }
    public function refreshToken(){
        $refreshToken = request()->refresh_token;
        try {
            $decoded = JWTAuth::getJWTProvider()->decode($refreshToken);
            $user = User::find($decoded['sub']);
            if(!$user) {
                return response()->json(['message' => 'User not found'],404);
            }
            $token = auth()->login($user);

            return $this->createNewToken($token, 'null');
        }
        catch (JWTException $e) {
            return response()->json(['message' => 'Refresh Token Invalid', 500]);
        };
    }
    public function profile()
    {
        try{
            return response()->json(auth()->user());
        }
        catch(JWTException $e){
            return response()->json(['message' => 'Unauthorized'],401);
        }
    }
    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'User logged out']);
    }
}
