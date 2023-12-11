<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\Creative;

class BannerController extends Controller
{
    public function impression($id)
    {
        $campaign = Campaign::with('creatives')->find($id);

        if (!$campaign) {
            return response()->json(['message' => "Campaign not found"], 404);
        }

        $bid_amount = $campaign->bid_amount;
        $used_amount = $campaign->used_amount + $bid_amount;

        $remain = $campaign->budget - $used_amount;

        // Check end conditions
        if ($remain <  $campaign->bid_amount) {
            $campaign->status = 0;
            $campaign->save();
            return response()->json(['message' => 'Hết tiền', 'status' => $campaign->status]);
        } else {
            // Save the changes to the database
            $campaign->used_amount = $used_amount;
            $campaign->save();
            return response()->json(['message' => $campaign]);
        }
    }

    public function getBanner()
    {
        $campaigns = Campaign::with('creatives')->where('status', 1)->paginate(3);

        return response()->json($campaigns);
    }
}
