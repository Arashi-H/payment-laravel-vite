<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login'])->name('login.api');
Route::post('/register', [AuthController::class, 'register'])->name('register.api');

Route::get('/getarticles', [ArticleController::class, 'index']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/home', [ArticleController::class, 'index']);
    Route::get('/menu', [MenuController::class, 'index']);
    Route::get('/users', [UserController::class, 'index']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $user['role'] = DB::table('user_role')->where('user_id', '=', $user->id)->first()->role_id;
    return $user;
});