<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Budgets;
use App\Models\Article;
use App\Models\TableMap;
use Carbon\Carbon;
use App\Models\SystemLog;
use App\Http\Requests\StoreBudgetsRequest;
use App\Http\Requests\UpdateBudgetsRequest;

class BudgetsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $budgets = Budgets::all();
        $budgets = $budgets->where('deleted', null)->values();
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
        foreach ($budgets as $budget) {
            $user_created = User::select('*')->where('id', $budget->created_user_id)->get();
            $user_updated = User::select('*')->where('id', $budget->updated_user_id)->get();
            $budget['created_user_name'] = $user_created[0]->first_name.' '.$user_created[0]->last_name;
            $budget['updated_user_name'] = $user_updated[0]->first_name.' '.$user_updated[0]->last_name;
        }
		return response()->json([
            'success' => true,
            'data' => $budgets
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
     * @param  \App\Http\Requests\StoreBudgetsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreBudgetsRequest $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;
        $budget = Budgets::create($data);

        $table = TableMap::select('*')->where('name', 'budget')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $budget->id;
        $log['action_time'] = $budget->created_at;
        $log['action_type'] = 1;

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'data' => $budget,
            'message' => 'Budget stored successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Budgets  $budgets
     * @return \Illuminate\Http\Response
     */
    public function show(Budgets $budget)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Budgets  $budgets
     * @return \Illuminate\Http\Response
     */
    public function edit(Budgets $budget)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateBudgetsRequest  $request
     * @param  \App\Models\Budgets  $budgets
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateBudgetsRequest $request, Budgets $budget)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;
        $budget['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');

        $table = TableMap::select('*')->where('name', 'budget')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $budget->id;
        $log['action_time'] = $budget->updated_at;
        $log['action_type'] = 2;

        $system_log = SystemLog::create($log);

        $budget->update($request->all());

        $budgets = Budgets::select('*')->where('article_id', $budget->article_id)->get();

        return response()->json([
            'success' => true,
            'data' => $budgets,
            'message' => 'Budget updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Budgets  $budgets
     * @return \Illuminate\Http\Response
     */
    public function destroy(Budgets $budget)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $table = TableMap::select('*')->where('name', 'budget')->get();
        $budget['deleted'] = Carbon::now()->format('Y-m-d H:i:s');

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $budget->id;
        $log['action_time'] = $budget->deleted;
        $log['action_type'] = 3;

		$budget->update(['deleted' => $budget['deleted']]);

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'message' => 'Budget deleted successfully.'
        ]);
    }
}
