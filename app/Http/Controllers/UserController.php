<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function index()
    {
        $users = User::get();

        for ($i = 0; $i < count($users); $i++) {
            $users['role'] = DB::table('user_role')->where('user_id', '=', $users[$i]->id)->first()->role_id;
        }
        return $users->toJson();
    }
}