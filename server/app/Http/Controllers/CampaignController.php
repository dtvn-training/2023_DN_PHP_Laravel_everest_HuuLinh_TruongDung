<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Creative;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;

class CampaignController extends Controller
{
    public function deleteCampaign($id)
    {
        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => "Campaign not found"], 404);
        }
        foreach ($campaign->creatives as $creative) {
            $creative->delete();
        }
        $campaign->delete();

        return response()->json(['message' => 'Delete campaign and creatives successfully']);
    }
    public function updateCampaign(Request $request, $id)
    {
        $currentUser = Auth::user();
        $validator = Validator::make($request->all(), [
            'campaign_name' => 'required',
            'status' => 'required|in:1,0',
            'budget' => 'required|numeric|min:0',
            'bid_amount' => 'required|numeric|min:0',
            'start_date' => 'required',
            'end_date' => 'required',
            'creatives.*.creative_name' => 'required',
            'creatives.*.final_url' => 'required',
            'creatives.*.description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        // Update Campaign
        $campaignData = $request->only([
            'campaign_name',
            'status',
            'budget',
            'bid_amount',
            'start_date',
            'end_date',
        ]);
        $campaignData['user_updated'] = $currentUser->id;
        $campaignData['usage_rate'] = ($campaignData['bid_amount'] / $campaignData['budget']) * 100;

        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => "Campaign not found"], 404);
        }
        $campaign->update($campaignData);

        // Update or Create Creatives
        if ($request->has('creatives') && is_array($request->creatives)) {
            foreach ($request->creatives as $creativeData) {
                $creative = Creative::updateOrCreate(
                    ['id' => $creativeData['id'] ?? null],
                    [
                        'creative_name' => $creativeData['creative_name'],
                        'final_url' => $creativeData['final_url'],
                        'description' => $creativeData['description'],
                    ]
                );

                // If a new preview_image is provided, upload it to Cloudinary and update the URL
                if (isset($creativeData['preview_image'])) {
                    $uploadedFileUrl = Cloudinary::upload($request->file('preview_image')->getRealPath())->getSecurePath();
                    $creative->preview_image = $uploadedFileUrl;
                    $creative->save();
                }
            }
        }

        return response()->json(['message' => 'Update campaign and creatives successfully']);
    }


    public function createCampaign(Request $request)
    {
        $currentUser = Auth::user();
        $validator = Validator::make($request->all(), [
            //campaign
            'campaign_name' => 'required',
            'status' => 'required|in:1,0', //1:active 0: inactive
            'budget' => 'required|numeric|min:0',
            'bid_amount' => 'required|numeric|min:0',
            'start_date' => 'required',
            'end_date' => 'required',
            //creative
            'creative_name' => 'required',
            'final_url' => 'required',
            'preview_image' => 'required',
            'description' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        // Create Campaign
        $campaignData = $request->only([
            'campaign_name',
            'status',
            'budget',
            'bid_amount',
            'start_date',
            'end_date',
        ]);
        $campaignData['user_updated'] = $currentUser->id;
        $campaignData['usage_rate'] = ($campaignData['bid_amount'] / $campaignData['budget']) * 100;
        $campaignData['used_amount'] = 0;

        $newCampaign = Campaign::create($campaignData);
        $newCampaign->save();

        // Create Creative
        $creativeData = $request->only([
            'creative_name',
            'final_url',
            'preview_image',
            'description',
        ]);
        $creativeData['id_campaign'] = $newCampaign->id;
        $uploadedFileUrl = Cloudinary::upload($request->file('preview_image')->getRealPath())->getSecurePath();
        $creativeData['preview_image'] = $uploadedFileUrl;
        $newCreative = Creative::create($creativeData);
        $newCreative->save();

        return response()->json(['message' => 'Create campaign successfully']);
    }
    public function index()
    {
        $campaigns = Campaign::with('creatives')->paginate(3);
        if ($campaigns->isEmpty()) {
            return response()->json(['message' => 'There are no campaigns!']);
        }

        return response()->json($campaigns);
    }
}
