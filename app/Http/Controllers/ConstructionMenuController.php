<?php

namespace App\Http\Controllers;

use App\Models\ConstructionMenu;
use App\Http\Requests\StoreConstructionMenuRequest;
use App\Http\Requests\UpdateConstructionMenuRequest;

class ConstructionMenuController extends Controller
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
     * @param  \App\Http\Requests\StoreConstructionMenuRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConstructionMenuRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ConstructionMenu  $constructionMenu
     * @return \Illuminate\Http\Response
     */
    public function show(ConstructionMenu $constructionMenu)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ConstructionMenu  $constructionMenu
     * @return \Illuminate\Http\Response
     */
    public function edit(ConstructionMenu $constructionMenu)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateConstructionMenuRequest  $request
     * @param  \App\Models\ConstructionMenu  $constructionMenu
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateConstructionMenuRequest $request, ConstructionMenu $constructionMenu)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ConstructionMenu  $constructionMenu
     * @return \Illuminate\Http\Response
     */
    public function destroy(ConstructionMenu $constructionMenu)
    {
        //
    }
}
