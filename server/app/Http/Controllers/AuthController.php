<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Validator;
class AuthController extends Controller
{
    public function __construct(){
        $this->middleware("auth:api",['except'=>['login','register']]); // Middleware "auth:api" is used to authenticate users via API token
    }
    public function register(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|confirmed|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(),422);
        }

        $user = User::create(array_merge(
            $validator->validated(),
            ['password' => bcrypt($request->password)],
        ));

        return response()->json([
            'message' =>'User successfully registered',
            'user' =>$user,
        ],201);
    }
    public function login(Request $request){
    }
}
