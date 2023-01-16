<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Companies;
use App\Http\Requests\StoreCompaniesRequest;
use App\Http\Requests\UpdateCompaniesRequest;

class CompaniesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Companies::all();
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
        foreach ($companies as $company) {
            $user_created = User::select('*')->where('id', $company->created_user_id)->get();
            $user_updated = User::select('*')->where('id', $company->updated_user_id)->get();
            $company['created_user_name'] = $user_created[0]->first_name.' '.$user_created[0]->last_name;
            $company['updated_user_name'] = $user_updated[0]->first_name.' '.$user_updated[0]->last_name;
        }
		return response()->json([
            'success' => true,
            'data' => $companies,
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
     * @param  \App\Http\Requests\StoreCompaniesRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreCompaniesRequest $request)
    {
        $data = $request->all();

        $user = Auth::user();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;

        $company = Companies::create($data);

        return response()->json([
            'success' => true,
            'data' => $company,
            'message' => 'Company successfully added'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function show(Companies $companies)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function edit(Companies $companies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateCompaniesRequest  $request
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateCompaniesRequest $request, Companies $company)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;
        $company->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $company
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Companies  $companies
     * @return \Illuminate\Http\Response
     */
    public function destroy(Companies $company)
    {
        $company->delete();

        return response()->json([
            'success' => true
        ]);
    }
}
