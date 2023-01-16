<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setings extends Model
{
	use HasFactory;

	public $table = 'setings';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'key',
		'value',
		'note',
		'validation',
		'created_at',
        'created_user_id',
		'updated_at',
        'updated_user_id',
		'deleted',
	];
}
