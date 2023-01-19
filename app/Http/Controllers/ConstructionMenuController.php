<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\TableMap;
use Carbon\Carbon;
use App\Models\SystemLog;
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
        $constructionMenus = ConstructionMenu::all();
        $constructionMenus = $constructionMenus->where('deleted', null)->values();
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
        foreach ($constructionMenus as $constructionMenu) {
            $user_created = User::select('*')->where('id', $constructionMenu->created_user_id)->get();
            $user_updated = User::select('*')->where('id', $constructionMenu->updated_user_id)->get();
            $constructionMenu['created_user_name'] = $user_created[0]->first_name.' '.$user_created[0]->last_name;
            $constructionMenu['updated_user_name'] = $user_updated[0]->first_name.' '.$user_updated[0]->last_name;
        }
		return response()->json([
            'success' => true,
            'data' => $constructionMenus,
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
     * @param  \App\Http\Requests\StoreConstructionMenuRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreConstructionMenuRequest $request)
    {
        $data = $request->all();

        $user = Auth::user();
        $data['created_user_id'] = $user->id;
        $data['updated_user_id'] = $user->id;

        $constructionMenu = ConstructionMenu::create($data);

        $table = TableMap::select('*')->where('name', 'constructionMenu')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $constructionMenu->id;
        $log['action_time'] = $constructionMenu->created_at;
        $log['action_type'] = 1;

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true,
            'data' => $constructionMenu,
            'message' => 'ConstructionMenu successfully added'
        ]);
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
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $constructionMenu['updated_at'] = Carbon::now()->format('Y-m-d H:i:s');

        $table = TableMap::select('*')->where('name', 'constructionMenu')->get();

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $constructionMenu->id;
        $log['action_time'] = $constructionMenu->updated_at;
        $log['action_type'] = 2;

        $system_log = SystemLog::create($log);

        $constructionMenu->update($request->all());

        return response()->json([
            'success' => true,
            'data' => $constructionMenu
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ConstructionMenu  $constructionMenu
     * @return \Illuminate\Http\Response
     */
    public function destroy(ConstructionMenu $constructionMenu)
    {
        $user = Auth::user();
        $request['updated_user_id'] = $user->id;

        $table = TableMap::select('*')->where('name', 'constructionMenu')->get();
        $constructionMenu['deleted'] = Carbon::now()->format('Y-m-d H:i:s');

        $log['user_id'] = $user->id;
        $log['table_id'] = $table[0]->id;
        $log['record_id'] = $constructionMenu->id;
        $log['action_time'] = $constructionMenu->deleted;
        $log['action_type'] = 3;

		$constructionMenu->update(['deleted' => $constructionMenu['deleted']]);

        $system_log = SystemLog::create($log);

        return response()->json([
            'success' => true
        ]);
    }
}
