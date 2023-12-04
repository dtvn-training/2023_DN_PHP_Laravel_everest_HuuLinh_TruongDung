<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CampaignController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['middleware'=>'api', 'prefix' => 'auth'],function($router){
    Route::post('/register',[AuthController::class,'register']);
    Route::post('/login',[AuthController::class,'login']);
    Route::get('/profile',[AuthController::class,'profile']);
    Route::post('/logout',[AuthController::class,'logout']);
    Route::post('/refresh',[AuthController::class,'refreshToken']);
});

// ADMIN
Route::group(['middleware' => ['api', 'role_id:2,3'], 'prefix' => 'user'], function ($router) {
    Route::get('/get',[UserController::class,'index']);
    Route::post('/create',[UserController::class,'addUser']);
    Route::post('/update/{id}',[UserController::class,'editUser']);
    Route::get('/delete/{id}',[UserController::class,'deleteUser']);
});
// Route::group(['middleware' => ['api', 'role_id:3'], 'prefix' => 'campaign'], function ($router) {
//     Route::get('/getCampagin',[CampaignController::class,'index']);
//     Route::post('/createCampagin',[CampaignController::class,'createCampagin']);
// }

// DAC Account
// Route::group(['middleware' => ['api', 'role_id:2'], 'prefix' => 'user'], function ($router) {
    
// };

// Advertiser
// Route::group(['middleware' => ['api', 'role_id:1'], 'prefix' => 'user'], function ($router) {
    
// };