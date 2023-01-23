<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Payments;
use App\Models\TableMap;
use App\Models\Article;
use App\Models\Constructions;
use App\Models\Companies;
use App\Models\Budgets;
use Carbon\Carbon;
use App\Models\SystemLog;
use App\Http\Requests\StorePaymentsRequest;
use App\Http\Requests\UpdatePaymentsRequest;

class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $payments = Payments::all();
        $payments = $payments->where('deleted', null)->values();
        if(isset($request->id)) {
            $payments = $payments->where('id', $request->id);
        }
        // if(isset($request->name)) {
        //     $budgets = $budgets->where('name', $request->name);
        // }
        if(isset($request->pay_date)) {
            $payments = $payments->where('pay_date', $request->pay_date);
        }
        if(isset($request->article_id)) {
            $payments = $payments->where('article_id', $request->article_id);
        }
        foreach ($payments as $payment) {
            $user_created = User::select('*')->where('id', $payment->created_user_id)->get();
            $user_updated = User::select('*')->where('id', $payment->updated_user_id)->get();
            $payment['created_user_name'] = $user_created[0]->first_name.' '.$user_created[0]->last_name;
            $payment['updated_user_name'] = $user_updated[0]->first_name.' '.$user_updated[0]->last_name;

            $article = Article::select('*')->where('id', $payment->article_id)->first();
            $payment['article_name'] = $article->name;
            $payment['is_house'] = $article->is_house;

            $construction = Constructions::select('*')->where('id', $payment->construction_id)->first();
            $payment['construction_name'] = $construction->name;

            $company = Companies::select('*')->where('id', $payment->company_id)->first();
            $payment['company_name'] = $company->name;

            $budget = Budgets::select('*')->where('article_id', $payment->article_id)->where('construction_id', $payment->construction_id)->first();
            if(empty($budget)) {
                $empty_record['article_id'] = $payment->article_id;
                $empty_record['construction_id'] = $payment->construction_id;
                $empty_record['cost'] = 0;
                $empty_record['contract_amount'] = 0;
                $empty_record['change_amount'] = 0;
                $empty_record['created_at'] = Carbon::now()->format('Y-m-d H:i:s');
                $empty_record['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');
                $user = Auth::user();
                $empty_record['created_user_id'] = $user->id;
                $empty_record['updated_user_id'] = $user->id;
                Budgets::create($empty_record);
            }
            $payment['budget_cost'] = $budget->cost;
            $payment['contract_amount'] = $budget->contract_amount;
            $payment['change_amount'] = $budget->change_amount;
        }

		return response()->json([
            'success' => true,
            'data' => $payments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePaymentsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StorePaymentsRequest $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;

        $payment = Payments::create($data);

        $table = TableMap::select('*')->where('name', 'payment')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $payment->id;
        $log['action_time'] = $payment->created_at;
        $log['action_type'] = 1;

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'data' => $payment,
            'message' => 'Payment stored successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Payments  $payments
     * @return \Illuminate\Http\Response
     */
    public function show(Payments $payments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Payments  $payments
     * @return \Illuminate\Http\Response
     */
    public function edit(Payments $payments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePaymentsRequest  $request
     * @param  \App\Models\Payments  $payments
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePaymentsRequest $request, Payments $payment)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;
        $payment['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');

        $table = TableMap::select('*')->where('name', 'payment')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $payment->id;
        $log['action_time'] = $payment->updated_at;
        $log['action_type'] = 2;

        $system_log = SystemLog::create($log);

        $payment->update($request->all());

        $payments = Payments::select('*')->where('article_id', $payment->article_id)->get();

        return response()->json([
            'success' => true,
            'data' => $payments,
            'message' => 'Payment updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Payments  $payments
     * @return \Illuminate\Http\Response
     */
    public function destroy(Payments $payment)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $table = TableMap::select('*')->where('name', 'payment')->get();
        $payment['deleted'] = Carbon::now()->format('Y-m-d H:i:s');

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $payment->id;
        $log['action_time'] = $payment->deleted;
        $log['action_type'] = 3;

		$payment->update(['deleted' => $payment['deleted']]);

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'message' => 'Payment deleted successfully.'
        ]);
    }

    public function get_statistics_by_date(Request $request) {
        $pay_date = $request->pay_date;
        $article_ids_whole = json_decode(Payments::select('article_id')->where('pay_date', $pay_date)->groupBy('article_id')->get());
        $article_names = array();
        foreach ($article_ids_whole as $article_ids_raw) {
            $article_id = $article_ids_raw->article_id;
            $article = Article::select('*')->where('id', $article_id)->first();
            array_push($article_names, $article->name);
        }

        // var_dump($data['article_names']);
        // exit();

        $company_ids_whole = json_decode(Payments::select('company_id')->where('pay_date', $pay_date)->groupBy('company_id')->get());

        $res = array();
        foreach ($company_ids_whole as $company_id_raw) {
            $company_id = $company_id_raw->company_id;
            $company = Companies::select('*')->where('id', $company_id)->first();

            $data['company'] = $company->name;

            $costs = json_decode(Payments::select('cost')->where('pay_date', $pay_date)->where('company_id', $company_id)->get());
            $total_cost = 0;
            foreach($costs as $cost_raw) {
                $cost = $cost_raw->cost;
                $total_cost += $cost;
            }

            $data['total_payment'] = $total_cost;

            $article_ids = json_decode(Payments::select('article_id')->where('pay_date', $pay_date)->where('company_id', $company_id)->groupBy('article_id')->get());
            foreach($article_ids as $article_id_raw) {
                $article_id = $article_id_raw->article_id;
                $article = Article::select('*')->where('id', $article_id)->first();
                $costs_per_article = json_decode(Payments::select('cost')->where('pay_date', $pay_date)->where('company_id', $company_id)->where('article_id', $article_id)->get());
                $article_cost = 0;
                foreach($costs_per_article as $cost_per_construction_in_article_raw) {
                    $cost_per_construction_in_article = $cost_per_construction_in_article_raw->cost;
                    $article_cost += $cost_per_construction_in_article;
                }
                $data['payment_detail'][$article->name] = $article_cost;
            }
            array_push($res, $data);
        }

        return response()->json([
            'success' => true,
            'data' => $res,
            'article_names' => $article_names
        ]);
    }
}
