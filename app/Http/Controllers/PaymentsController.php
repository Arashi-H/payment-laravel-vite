<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Payments;
use App\Models\TableMap;
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
    public function index()
    {
        $payments = Payments::all();
        $payments = $payments->where('deleted', null)->values();
        // if(isset($request->id)) {
        //     $budgets = $budgets->where('id', $request->id);
        // }
        // if(isset($request->name)) {
        //     $budgets = $budgets->where('name', $request->name);
        // }
        // if(isset($request->is_house)) {
        //     $budgets = $budgets->where('is_house', $request->is_house);
        // }
        // if(isset($request->ended)) {
        //     $budgets = $budgets->where('ended', $request->ended);
        // }
        foreach ($payments as $payment) {
            $user_created = User::select('*')->where('id', $payment->created_user_id)->get();
            $user_updated = User::select('*')->where('id', $payment->updated_user_id)->get();
            $payment['created_user_name'] = $user_created[0]->first_name.' '.$user_created[0]->last_name;
            $payment['updated_user_name'] = $user_updated[0]->first_name.' '.$user_updated[0]->last_name;
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
}
