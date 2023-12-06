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
            'status' => 'required|in:1,0', //1:active 0: inactive
            'budget' => 'required|numeric|min:0',
            'bid_amount' => 'required|numeric|min:0',
            'start_date' => 'required',
            'end_date' => 'required',
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
        // Update Creatives
        $creativesData = $request->only([
            'creative_name',
            'final_url',
            'preview_image',
            'description',
        ]);

        // Lặp qua tất cả các creative và cập nhật dữ liệu
        foreach ($campaign->creatives as $creative) {
            $creative->update($creativesData);
        }
        
        if ($request->has('creatives') && is_array($request->creatives)) {
            foreach ($request->creatives as $creativeData) {
                // Update the existing creative or create a new one
                $creative = Creative::updateOrCreate(
                    ['id' => $creativeData['id'] ?? null, 'id_campaign' => $campaign->id],
                    [
                        'creative_name' => $creativeData['creative_name'],
                        'final_url' => $creativeData['final_url'],
                        'description' => $creativeData['description'],
                    ]
                );
    
                
                if ($request->preview_image) {
                    $newPreviewImage = $request->file('creatives.' . $creativeData['id'] . '.preview_image');
    
                    // Check if the new image is valid
                    if ($newPreviewImage->isValid()) {
                        // Delete the old image
                        if ($creative->preview_image) {
                            $publicId = Cloudinary::getPublicId($creative->preview_image);
                            Cloudinary::destroy($publicId);
                        }
    
                        // Upload the new image to Cloudinary and update the URL
                        $uploadedFileUrl = Cloudinary::upload($newPreviewImage->getRealPath())->getSecurePath();
                        $creative->preview_image = $uploadedFileUrl;
                        $creative->save();
                    }
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
