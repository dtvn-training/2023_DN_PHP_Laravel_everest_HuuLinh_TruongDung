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
        $validator = Validator::make($request->all(), $this->getValidationRules($request));

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $campaign = Campaign::find($id);
        if (!$campaign) {
            return response()->json(['message' => "Campaign not found"], 404);
        }

        $campaignData = $this->prepareCampaignData($request, $currentUser, $campaign);

        $this->updateCampaignStatus($request, $campaign, $campaignData);

        $campaign->update($campaignData);

        $this->updateCreatives($request, $campaign);

        return response()->json(['message' => 'Update campaign and creatives successfully']);
    }
    private function getValidationRules(Request $request)
    {
        return [
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
            'start_date' => 'required|date|after_or_equal:today',
            'end_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($request) {
                    $startDate = Carbon::parse($request->input('start_date'))->startOfDay();
                    $endDate = Carbon::parse($value)->startOfDay();

                    if ($endDate->eq($startDate)) {
                        $request->merge(['status' => 0]);
                    } else {
                        $request->merge(['status' => 1]);
                    }
                },
                'after_or_equal:start_date',
            ],
            'creative_name' => 'max:50',
            'description' => 'max:100',
        ];
    }
    private function prepareCampaignData(Request $request, $currentUser, $campaign)
    {
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

        return $campaignData;
    }
    private function updateCampaignStatus(Request $request, Campaign $campaign, array &$campaignData)
    {
        $newStatus = $request->input('status');
        if ($newStatus !== $campaign->status) {
            $campaign->status = $newStatus;
            $campaign->save();
        } else {
            $campaignData['status'] = ($campaignData['budget'] > 0
            && $campaign->used_amount < $campaignData['budget']) ? 1 : 0;
        }
    }
    private function updateCreatives(Request $request, Campaign $campaign)
    {
        $creativesData = $request->only([
            'creative_name',
            'final_url',
            'preview_image',
            'description',
        ]);

        if ($request->has('preview_image')) {
            $this->handleImageUpload($request, $creativesData, $campaign);
        }

        foreach ($campaign->creatives as $creative) {
            $creative->update($creativesData);
        }
    }
    private function handleImageUpload(Request $request, array &$creativesData, Campaign $campaign)
    {
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
            'end_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) use ($request) {
                    $startDate = Carbon::parse($request->input('start_date'), 'Asia/Ho_Chi_Minh')->startOfDay();
                    $endDate = Carbon::parse($value, 'Asia/Ho_Chi_Minh')->startOfDay();

                    if ($endDate->eq($startDate)) {
                        $request->merge(['status' => 0]);
                    } else {
                        $request->merge(['status' => 1]);
                    }
                },
                'after_or_equal:start_date',
            ],

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
