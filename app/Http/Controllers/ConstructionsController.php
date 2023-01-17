<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\TableMap;
use Carbon\Carbon;
use App\Models\SystemLog;
use App\Models\User;
use App\Models\Constructions;
use App\Http\Requests\StoreConstructionsRequest;
use App\Http\Requests\UpdateConstructionsRequest;

class ConstructionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $constructions = Constructions::all();
        // if(isset($request->id)) {
        //     $budgets = $budgets->where('id', $request->id);
        // }
        // if(isset($request->name)) {
        //     $budgets = $budgets->where('name', $request->name);
        // }
        if(isset($request->house)) {
            $constructions = $constructions->where('house', $request->house)->values();
        }
        // if(isset($request->ended)) {
        //     $budgets = $budgets->where('ended', $request->ended);
        // }
        foreach ($constructions as $construction) {
            $user_created = User::select('*')->where('id', $construction->created_user_id)->first();
            $user_updated = User::select('*')->where('id', $construction->updated_user_id)->first();
            $construction['created_user_name'] = $user_created->first_name.' '.$user_created->last_name;
            $construction['updated_user_name'] = $user_updated->first_name.' '.$user_updated->last_name;
        }
		return response()->json([
            'success' => true,
            // 'data' => array_values($constructions->toArray())
            'data' => $constructions
        ]);
    }

    // public function run() {
    //     $constructions = Constructions::all();
    //     // var_dump($constructions); exit();
    //     foreach ($constructions as $construction) {

    //         // $construction->update(['created_user_id' => 2]);
    //         $construction->update(['updated_user_id' => 2]);
    //     }
    //     return response()->json([
    //         'success' => true,
    //         'data' => $constructions
    //     ]);
    // }

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
     * @param  \App\Http\Requests\StoreConstructionsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConstructionsRequest $request)
    {
        $data = $request->all();

        $user = Auth::user();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;

        $construction = Constructions::create($data);

        $table = TableMap::select('*')->where('name', 'construction')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $construction->id;
        $log['action_time'] = $construction->created_at;
        $log['action_type'] = 1;

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'data' => $construction
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Constructions  $constructions
     * @return \Illuminate\Http\Response
     */
    public function show(Constructions $constructions)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Constructions  $constructions
     * @return \Illuminate\Http\Response
     */
    public function edit(Constructions $constructions)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateConstructionsRequest  $request
     * @param  \App\Models\Constructions  $constructions
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateConstructionsRequest $request, Constructions $construction)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $construction['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');

        $table = TableMap::select('*')->where('name', 'construction')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $construction->id;
        $log['action_time'] = $construction->updated_at;
        $log['action_type'] = 2;

        $system_log = SystemLog::create($log);

        $construction->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $construction
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Constructions  $constructions
     * @return \Illuminate\Http\Response
     */
    public function destroy(Constructions $construction)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $table = TableMap::select('*')->where('name', 'construction')->get();
        $construction['deleted'] = Carbon::now()->format('Y-m-d H:i:s');

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $construction->id;
        $log['action_time'] = $construction->deleted;
        $log['action_type'] = 3;

		$construction->update(['deleted' => $construction['deleted']]);

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true
        ]);
    }

    public function get_for_autocomplete() {
        $data_for_autocomplete = Constructions::select('id', 'name')->get();

        return response()->json([
            'success' => true,
            'data' => $data_for_autocomplete
        ]);
    }
}
