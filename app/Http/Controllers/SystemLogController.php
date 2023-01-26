<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        return response()->json([
            'success' => true,
            'data' => $system_logs
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
