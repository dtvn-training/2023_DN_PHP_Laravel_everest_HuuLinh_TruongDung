<?php

namespace App\Http\Controllers;
use App\Models\Campaign;
use App\Models\Creative;


use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function createCampagin(Request $request){
        
    }
    public function index(){
        $campaigns = Campaign::with('creatives')->paginate(5);

        return response()->json([
            'campaigns' => $campaigns,
        ]);
    }
}
