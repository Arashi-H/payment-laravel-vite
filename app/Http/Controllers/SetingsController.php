<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
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
    public function index(Request $request)
    {
        $setings = Setings::all();
        $setings = $setings->where('deleted', null)->values();
        if(isset($request->id)) {
            $setings = $setings->where('id', $request->id);
        }
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
            'data' => $setings
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
     * @param  \App\Http\Requests\StoreSetingsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSetingsRequest $request)
    {
        $data = $request->all();
        $seting = Setings::create($data);

        return response()->json([
            'success' => true,
            'data' => $seting
        ]);
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
    public function update(UpdateSetingsRequest $request, Setings $seting)
    {
        $seting->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $seting
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setings  $setings
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setings $seting)
    {
        $seting->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
