<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfers extends Model
{
	use HasFactory;

	public $table = 'transfers';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'pay_date',
		'company_id',
		'prev_carry_over',
		'month_payment',
		'month_payment_total',
		'discount',
		'bill',
		'transfer_fee',
		'transfer_amount',
		'next_carry_over',
		'created_at',
        'created_user_id',
		'updated_at',
        'updated_user_id',
		'deleted',
	];

	public function companies()
	{
		return $this->belongsTo(Companies::class);
	}
}
