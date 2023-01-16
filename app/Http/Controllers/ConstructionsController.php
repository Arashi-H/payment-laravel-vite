<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
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
    public function index()
    {
        $constructions = Constructions::all();
        // if(isset($request->id)) {
        //     $budgets = $budgets->where('id', $request->id);
        // }
        // if(isset($request->name)) {
        //     $budgets = $budgets->where('name', $request->name);
        // }
        if(isset($request->house)) {
            $constructions = $constructions->where('house', $request->house);
        }
        // if(isset($request->ended)) {
        //     $budgets = $budgets->where('ended', $request->ended);
        // }
        foreach ($constructions as $construction) {
            $user_created = User::select('*')->where('id', $construction->created_user_id)->get();
            $user_updated = User::select('*')->where('id', $construction->updated_user_id)->get();
            $construction['created_user_name'] = $user_created[0]->first_name.' '.$user_created[0]->last_name;
            $construction['updated_user_name'] = $user_updated[0]->first_name.' '.$user_updated[0]->last_name;
        }
		return response()->json([
            'success' => true,
            'data' => $constructions
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
        $construction->delete();

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
