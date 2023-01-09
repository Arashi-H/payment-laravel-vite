<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budgets extends Model
{
	use HasFactory;

	public $table = 'budgets';

	protected $guard_name = 'api';

	protected $primaryKey = 'id';

	protected $fillable = [
		'id',
		'article_id',
		'construction_id',
		'cost',
		'contract_amount',
		'change_amount',
		'created',
		'modified',
		'deleted',
	];

	public function articles()
	{
		return $this->belongsTo(Article::class);
	}

	public function constructions()
	{
		return $this->belongsTo(Constructions::class);
	}
}