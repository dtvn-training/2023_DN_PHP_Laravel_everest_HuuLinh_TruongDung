<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Campaign extends Model
{
    use HasFactory;
    protected $table = "campaigns";
    protected $primaryKey = 'id';
    public $timestamp = true;
    protected $fillable = [
        'campaign_name',
        'status',
        'used_amount',
        'usage_rate',
        'budget',
        'bid_amount',
        'start_date',
        'end_date',
        'user_updated',
        'delete_flag',
    ];
    public function creatives()
    {
        return $this->hasMany(Creative::class, 'id_campaign');
    }


}
