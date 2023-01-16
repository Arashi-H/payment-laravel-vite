<?php

namespace App\Http\Controllers;

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
    public function index()
    {
        //
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
