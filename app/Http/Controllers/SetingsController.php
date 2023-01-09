<?php

namespace App\Http\Controllers;

use App\Models\Setings;
use App\Http\Requests\StoreSetingsRequest;
use App\Http\Requests\UpdateSetingsRequest;

class SetingsController extends Controller
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
     * @param  \App\Http\Requests\StoreSetingsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSetingsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setings  $setings
     * @return \Illuminate\Http\Response
     */
    public function show(Setings $setings)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Setings  $setings
     * @return \Illuminate\Http\Response
     */
    public function edit(Setings $setings)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSetingsRequest  $request
     * @param  \App\Models\Setings  $setings
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSetingsRequest $request, Setings $setings)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setings  $setings
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setings $setings)
    {
        //
    }
}
