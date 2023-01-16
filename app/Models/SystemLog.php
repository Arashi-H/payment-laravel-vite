<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemLog extends Model
{
    use HasFactory;

    public $table = 'system_logs';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'user_id',
		'table_id',
		'record_id',
		'action_time',
		'action_type',
		'created_at',
		'updated_at',
	];
}
