<?php

namespace App\Http\Controllers;

use App\Models\Transfers;
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
        $transfer = Transfers::create($data);

        return response()->json([
            'success' => true,
            'data' => $transfer
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
        $transfer->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $transfer
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
        $transfer->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
