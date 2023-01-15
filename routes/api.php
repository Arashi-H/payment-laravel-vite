<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\BudgetsController;
use App\Http\Controllers\CompaniesController;
use App\Http\Controllers\ConstructionsController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SetingsController;
use App\Http\Controllers\TransfersController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRoleController;
// use App\Http\Controllers\MenuController;
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


Route::middleware('auth:sanctum')->group(function () {

    //articles
    // Route::get('/articles', [ArticleController::class, 'index']);
    // Route::post('/articles', [ArticleController::class, 'create']);
    // Route::put('/articles', [ArticleController::class, 'update']);

    Route::apiResource('articles', ArticleController::class);

    Route::apiResource('budgets', BudgetsController::class);

    Route::apiResource('companies', CompaniesController::class);

    Route::get('constructions/autocomplete', [ConstructionsController::class, 'get_for_autocomplete']);
    Route::apiResource('constructions', ConstructionsController::class);

    Route::apiResource('companies', PaymentsController::class);

    Route::apiResource('companies', RoleController::class);

    Route::apiResource('companies', SetingsController::class);

    Route::apiResource('companies', TransfersController::class);

    Route::apiResource('companies', UserController::class);

    Route::apiResource('companies', UserRoleController::class);

    Route::get('/users', [UserController::class, 'index']);
    Route::get('/home', [ArticleController::class, 'index']);
    // Route::get('/menu', [MenuController::class, 'index']);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    $user['role'] = DB::table('user_role')->where('user_id', '=', $user->id)->first()->role_id;
    return $user;
});
