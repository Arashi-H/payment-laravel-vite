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
        $constructions = Constructions::all();
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
		return $constructions->toJson();
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
        $data = $request->all();
        $construction = Companies::create($data);

        return response()->json([
            'success' => true,
            'budget' => $construction
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
        $construction->update($request->all());

        return response()->json([
            'success' => true,
            'construction' => $construction
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
        $construction->delete();

        return response()->json([
            'success' => true
        ]);
    }

    public function get_for_autocomplete() {
        $data_for_autocomplete = Constructions::select('id', 'name')->get();

        return response()->json([
            'success' => true,
            'data_for_autocomplete' => $data_for_autocomplete
        ]);
    }
}
