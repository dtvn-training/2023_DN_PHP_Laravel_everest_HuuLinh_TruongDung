<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
class UserController extends Controller
{
    public function deleteUser($id)
    {
        if (!empty($id)) {
            $user = User::where('id', $id)->delete();
            if ($user > 0) {
                return response()->json(['message' => 'Delete user successfully']);
            } else {
                return response()->json(['message' => 'User not found or error deleting user'], 404);
            }
        } else {
            return response()->json('Invalid user ID', 400);
        }
    }
    public function editUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'role_id' => 'required|exists:roles,id',
            'address' => 'required',
            'phone' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => "User not found"], 404);
        }

        $user->update($request->all());

        return response()->json(['message' => 'Update user successfully']);
    }

    public function createUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'first_name' => 'required',
            'last_name' => 'required',
            'role_id' => 'required|exists:roles,id',
            'address' => 'required',
            'phone' => 'required',
            'password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $newUser = User::create($request->all());
        $newUser->save();
        return response()->json(['message' => 'Create user successfully']);
    }
    public function index(Request $request)
    {
        if (Auth::user()->role_id == 3) {
            $searchEmail = $request->input('search_email');
            $query = User::query();
            if ($searchEmail) {
                $query->where('email', 'like', "%$searchEmail%");
            }
            $users = $query->paginate(3);

            return response()->json($users);
        }
        else if (Auth::user()->role_id == 2){
            return response(["message"=>"Unauthorized Admin, You are DAC Account"], 401);
        }
        else{
            return response(["message"=>"Unauthorized Admin, You are Advertiser"], 401);
        }
    }
}
