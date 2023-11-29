<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function deleteUser($id)
    {
        if (!empty($id)) {
            $user = User::where('id', $id)->delete();
            if ($user > 0) {
                return response()->json('Delete user successfully');
            } else {
                return response()->json('User not found or error deleting user', 404);
            }
        } else {
            return response()->json('Invalid user ID', 400);
        }
    }
    public function editUser(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'first_name ' => 'required',
            'last_name ' => 'required',
            'role' => 'required',
            'address' => 'required',
            'phone' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $user = User::find($id);
        if (!$user) {
            return response()->json("User not found", 404);
        }
        $user->update($request->all());
        return response()->json("Update user successfully");
    }
    public function addUser(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'first_name ' => 'required',
            'last_name ' => 'required',
            'role' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        $newUser = User::create($request->all());
        $newUser->save();
        return response()->json(
            'Create user successfully'
        );
    }
    public function index()
    {
        $user = User::paginate(5);
        return response()->json(
            [$user]
        );
    }
}
