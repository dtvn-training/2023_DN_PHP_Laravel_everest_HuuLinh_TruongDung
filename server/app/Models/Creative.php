<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Creative extends Model
{
    use HasFactory;
    protected $table = "creatives";
    protected $primaryKey = 'id';
    public $timestamp = true;
    protected $fillable = [
        'name',
        'preview_image',
        'final_url',
        'id_campaign',
    ];
}
