<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
	use HasFactory;

	public $table = 'payments';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'pay_date',
		'article_id',
		'construction_id',
		'company_id',
		'cost',
		'is_cash',
		'created',
		'modified',
		'deleted',
	];

	public function budgets()
	{
		return $this->hasOne(Budgets::class);
	}

	public function articles()
	{
		return $this->belongsTo(Article::class);
	}

	public function constructions()
	{
		return $this->belongsTo(Constructions::class);
	}

	public function companies()
	{
		return $this->belongsTo(Companies::class);
	}
}