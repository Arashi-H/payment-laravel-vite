<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Transfers;
use App\Models\TableMap;
use Carbon\Carbon;
use App\Models\SystemLog;
use App\Http\Requests\StoreTransfersRequest;
use App\Http\Requests\UpdateTransfersRequest;

class TransfersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $transfers = Transfers::all();
        $transfers = $transfers->where('deleted', null)->values();
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
		return response()->json([
            'success' => true,
            'data' => $transfers
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
     * @param  \App\Http\Requests\StoreTransfersRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTransfersRequest $request)
    {
        $data = $request->all();
        $user = Auth::user();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;
        $transfer = Transfers::create($data);

        $table = TableMap::select('*')->where('name', 'transfer')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $transfer->id;
        $log['action_time'] = $transfer->created_at;
        $log['action_type'] = 1;

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'data' => $transfer,
            'message' => 'Transfer stored successfully.'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Transfers  $transfers
     * @return \Illuminate\Http\Response
     */
    public function show(Transfers $transfers)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Transfers  $transfers
     * @return \Illuminate\Http\Response
     */
    public function edit(Transfers $transfers)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTransfersRequest  $request
     * @param  \App\Models\Transfers  $transfers
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTransfersRequest $request, Transfers $transfer)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;
        $transfer['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');

        $table = TableMap::select('*')->where('name', 'transfer')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $transfer->id;
        $log['action_time'] = $transfer->updated_at;
        $log['action_type'] = 2;

        $system_log = SystemLog::create($log);

        $transfer->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $transfer,
            'message' => 'Transfer updated successfully.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Transfers  $transfers
     * @return \Illuminate\Http\Response
     */
    public function destroy(Transfers $transfer)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $table = TableMap::select('*')->where('name', 'transfer')->get();
        $transfer['deleted'] = Carbon::now()->format('Y-m-d H:i:s');

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $transfer->id;
        $log['action_time'] = $transfer->deleted;
        $log['action_type'] = 3;

		$transfer->update(['deleted' => $transfer['deleted']]);

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'message' => 'Transfer deleted successfully.'
        ]);
    }
}
