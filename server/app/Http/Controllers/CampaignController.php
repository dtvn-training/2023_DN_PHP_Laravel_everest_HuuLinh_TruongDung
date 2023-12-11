<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use App\Models\Creative;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Carbon\Carbon;
class CampaignController extends Controller
{
    public function deleteCampaign($id)
    {
        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => "Campaign not found"], 404);
        }
        foreach ($campaign->creatives as $creative) {
            $publicId = pathinfo($creative->preview_image, PATHINFO_FILENAME);
            Cloudinary::destroy($publicId);
            $creative->delete();
        }
        $campaign->delete();

        return response()->json(['message' => 'Delete campaign and creatives successfully']);
    }
    public function updateCampaign(Request $request, $id)
    {
        $currentUser = Auth::user();
        $validator = Validator::make($request->all(), [
            'campaign_name' => 'required|max:50',
            'status' => 'required|in:1,0', //1:active 0: inactive
            'budget' => [
                'required',
                'numeric',
                'min:1',
                'max:1000000000',
                function ($attribute, $value, $fail) use ($request) {
                    $bidAmount = $request->input('bid_amount');
                    if ($value < $bidAmount) {
                        $fail('The budget must be greater than or equal to the bid amount.');
                    }
                },
            ],
            'bid_amount' => 'required|numeric|min:1|max:1000000000',
            'start_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    $currentDate = Carbon::now();
                    if (Carbon::parse($value)->lt($currentDate)) {
                        $fail('The start date must be from the current date onwards.');
                    }
                },
            ],
            'end_date' => 'required|date',

            'creative_name' => 'max:50',
            'description' => 'max:100',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => "Campaign not found"], 404);
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

        // Check status after updating budget
        // Check if the status is being updated
        $newStatus = $request->input('status');
        if ($newStatus !== $campaign->status) {
            // Status is being updated, save it to the database
            $campaign->status = $newStatus;
            $campaign->save();
        } else {
            if ($campaignData['budget'] > 0 && $campaign->used_amount < $campaignData['budget']) {
                $campaignData['status'] = 1; // Active
            } else {
                $campaignData['status'] = 0; // Inactive
            }
        }

        $campaign->update($campaignData);

        // Update Creatives
        $creativesData = $request->only([
            'creative_name',
            'final_url',
            'preview_image',
            'description',
        ]);

        if ($request->has('preview_image')) {
            $uploadedFileUrl = Cloudinary::upload(
                $request->file('preview_image')->getRealPath(),
                [
                    'verify' => false,
                ]
            )->getSecurePath();
            $creativesData['preview_image'] = $uploadedFileUrl;
            // Delete old images from the database
            foreach ($campaign->creatives as $creative) {
                $publicId = pathinfo($creative->preview_image, PATHINFO_FILENAME);
                Cloudinary::destroy($publicId);
            }
        }

        // Loop through all creatives and update data
        foreach ($campaign->creatives as $creative) {
            $creative->update($creativesData);
        }

        return response()->json(['message' => 'Update campaign and creatives successfully']);
    }

    public function createCampaign(Request $request)
    {
        $currentUser = Auth::user();
        $validator = Validator::make($request->all(), [
            'campaign_name' => 'required',
            'status' => 'required|in:1,0', // 1:active 0: inactive
            'budget' => [
                'required',
                'numeric',
                'min:1',
                'max:1000000000',
                function ($attribute, $value, $fail) use ($request) {
                    // Custom validation rule to check if budget is not less than bid_amount
                    $bidAmount = $request->input('bid_amount');
                    if ($value < $bidAmount) {
                        $fail('The budget must be greater than or equal to the bid amount.');
                    }
                },
            ],
            'bid_amount' => 'required|numeric|min:1|max:1000000000',
            'start_date' => 'required|date',
            'end_date' => 'required|date',

            'creative_name' => 'required|max:50',
            'final_url' => 'required|max:500',
            'preview_image' => 'required|max:500',
            'description' => 'required|max:100',
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
        $uploadedFileUrl = Cloudinary::upload(
            $request->file('preview_image')->getRealPath(),
            [
                'verify' => false,
            ]
        )->getSecurePath();

        $creativeData['preview_image'] = $uploadedFileUrl;
        $newCreative = Creative::create($creativeData);
        $newCreative->save();

        return response()->json(['message' => 'Create campaign successfully']);
    }

    public function index(Request $request)
    {
        try {
            $searchCampaign = $request->input('search_campaign');
            $searchStartDate = $request->input('start_date');
            $searchEndDate = $request->input('end_date');

            $query = Campaign::query();

            if ($searchCampaign) {
                $query->where('campaign_name', 'like', "%$searchCampaign%");
            }

            if ($searchStartDate) {
                $query->where('start_date', '>=', $searchStartDate);
            }

            if ($searchEndDate) {
                $query->where('end_date', '<=', $searchEndDate);
            }

            $campaigns = $query->with('creatives')->paginate(3);

            return response()->json($campaigns);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
