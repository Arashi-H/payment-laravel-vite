<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Article;
use App\Models\Budgets;
use App\Models\Constructions;
use App\Http\Requests\StoreArticleRequest;
use App\Http\Requests\UpdateArticleRequest;

class ArticleController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index(Request $request)
	{
		$articles = Article::all();
        if(isset($request->id)) {
            $articles = $articles->where('id', $request->id);
        }
        if(isset($request->name)) {
            $articles = $articles->where('name', $request->name);
        }
        if(isset($request->is_house)) {
            $articles = $articles->where('is_house', $request->is_house);
        }
        if(isset($request->ended)) {
            $articles = $articles->where('ended', $request->ended);
        }

        foreach ($articles as $article) {
            $budgets = Budgets::select('*')->where('article_id', $article->id)->get();
            foreach ($budgets as $budget) {
                $construction = Constructions::select('name')->where('id', $budget->construction_id)->get();
                $budget['construction_name'] = $construction[0]->name;
            }
            $article['budget'] = $budgets;
        }


		return response()->json([
            'success' => true,
            'data' => $articles,
            'message' => 'Articles successfully scraped.'
        ]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function create(StoreArticleRequest $request)
	{
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @param  \App\Http\Requests\StoreArticleRequest  $request
	 * @return \Illuminate\Http\Response
	 */
	public function store(Request $request)
	{
        $validator = Validator::make($request->all(), [
			'name' => 'required|string|max:255',
			'contract_amount' => 'required|numeric',
			'is_house' => 'required|numeric'
		]);
		if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()->all(),
                'message' => 'Article validation error.'
            ]);
		}
		// role permission related code should be written here!
        $data['name'] = $request['name'];
        $data['contract_amount'] = $request['contract_amount'];
        $data['ended'] = $request['ended'];
        $data['is_house'] = $request['is_house'];
        $article = Article::create($data);

        $data_budgets = $request['budgets'];

        $budgets = array();
        foreach ($data_budgets as $elem) {
            $validator = Validator::make($elem, [
                'construction_id' => 'required|numeric',
                'cost' => 'required|numeric',
                'contract_amount' => 'required|numeric',
                'change_amount' => 'required|numeric'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()->all(),
                    'message' => 'Budget validation error.'
                ]);
            }

            $elem['article_id'] = $article['id'];
            $budget = Budgets::create($elem);
            array_push($budgets, $budget);
        }

        return response()->json([
            'success' => true,
            'message' => 'Article and Budget successfully added.'
        ]);
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  \App\Models\Article  $article
	 * @return \Illuminate\Http\Response
	 */
	public function show(Article $article)
	{
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  \App\Models\Article  $article
	 * @return \Illuminate\Http\Response
	 */
	public function edit(Article $article)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  \App\Http\Requests\UpdateArticleRequest  $request
	 * @param  \App\Models\Article  $article
	 * @return \Illuminate\Http\Response
	 */
	public function update(UpdateArticleRequest $request, Article $article)
	{
        $article->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $article
        ]);
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  \App\Models\Article  $article
	 * @return \Illuminate\Http\Response
	 */
	public function destroy(Article $article)
	{
		$article->delete();

        return response()->json([
            'success' => true
        ]);
	}
}
