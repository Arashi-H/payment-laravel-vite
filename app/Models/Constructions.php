<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Constructions extends Model
{
	use HasFactory;

	public $table = 'constructions';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'name',
		'sort',
		'house',
		'created_at',
        'created_user_id',
		'updated_at',
        'updated_user_id',
		'deleted',
	];
}
