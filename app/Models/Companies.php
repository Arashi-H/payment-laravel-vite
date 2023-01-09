<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Companies extends Model
{
	use HasFactory;

	public $table = 'companies';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'name',
		'bank_code',
		'bank_name',
		'bank_branch_code',
		'bank_branch_name',
		'bank_deposit_type_id',
		'bank_account_number',
		'bank_account_holder',
		'supplier',
		'subcontractor',
		'transfer_fee_id',
		'created',
		'modified',
		'deleted',
	];
}