<?php

namespace App\Http\Controllers;

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
     * @param  \App\Http\Requests\StoreConstructionsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConstructionsRequest $request)
    {
        //
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
    public function update(UpdateConstructionsRequest $request, Constructions $constructions)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Constructions  $constructions
     * @return \Illuminate\Http\Response
     */
    public function destroy(Constructions $constructions)
    {
        //
    }
}
