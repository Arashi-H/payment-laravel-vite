<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Menu extends Model
{
    use HasFactory;

    protected $guard_name = 'api';

    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'menu_name',
        'up_menu_id',
        'menu_order',
        'route_url',
        'created',
        'modified',
        'deleted',
    ];
}