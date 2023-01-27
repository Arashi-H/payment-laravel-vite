<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\TableMap;
use App\Models\Constructions;
use App\Models\Budgets;
use App\Models\SystemLog;
use App\Http\Requests\StoreSystemLogRequest;
use App\Http\Requests\UpdateSystemLogRequest;

class SystemLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $system_logs = SystemLog::all()->sortDesc()->values();
        // $system_logs = SystemLog::all();
        if (isset($request->table_id)) {
            $system_logs = $system_logs->where('table_id', $request->table_id)->values();
        }
        if (isset($request->record_id)) {
            $system_logs = $system_logs->where('record_id', $request->record_id)->values();
        }
        foreach ($system_logs as $system_log) {
            $user = User::select('*')->where('id', $system_log->user_id)->first();
            $system_log['user_name'] = $user->first_name.' '.$user->last_name;
            $table = TableMap::select('*')->where('id', $system_log->table_id)->first();
            $system_log['table_name'] = $table->name;
        }
        return response()->json([
            'success' => true,
            'data' => $system_logs
        ]);
    }

    public function get_budget_log_from_article_id(Request $request) {
        $article_id = $request->article_id;
        $budget_ids = Budgets::select('id')->where('article_id', $article_id)->get()->toArray();
        if(empty($budget_ids)) {
            return response()->json([
                'success' => false,
                'message' => 'Budget for that article_id does not exist.'
            ]);
        }

        $system_logs_from_article_id = array();
        foreach ($budget_ids as $budget_id) {
            $system_logs = SystemLog::select('*')->where('table_id', 2)->where('record_id', $budget_id)->get()->toArray();
            $system_logs_from_article_id = array_merge($system_logs_from_article_id, $system_logs);
        }


        return response()->json([
            'success' => true,
            'data' => $system_logs_from_article_id
        ]);
    }

    public function get_construction_log_from_house_value(Request $request) {
        $house = $request->house;
        $construction_ids = Constructions::select('id')->where('house', $house)->get()->toArray();
        if(empty($construction_ids)) {
            return response()->json([
                'success' => false,
                'message' => 'Construction for that house value does not exist.'
            ]);
        }

        $system_logs_from_house_value = array();
        foreach ($construction_ids as $construction_id) {
            $system_logs = SystemLog::select('*')->where('table_id', 10)->where('record_id', $construction_id)->get()->toArray();
            $system_logs_from_house_value = array_merge($system_logs_from_house_value, $system_logs);
        }

        return response()->json([
            'success' => true,
            'data' => $system_logs_from_house_value
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
     * @param  \App\Http\Requests\StoreSystemLogRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSystemLogRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SystemLog  $systemLog
     * @return \Illuminate\Http\Response
     */
    public function show(SystemLog $systemLog)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SystemLog  $systemLog
     * @return \Illuminate\Http\Response
     */
    public function edit(SystemLog $systemLog)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSystemLogRequest  $request
     * @param  \App\Models\SystemLog  $systemLog
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSystemLogRequest $request, SystemLog $systemLog)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SystemLog  $systemLog
     * @return \Illuminate\Http\Response
     */
    public function destroy(SystemLog $systemLog)
    {
        //
    }
}
