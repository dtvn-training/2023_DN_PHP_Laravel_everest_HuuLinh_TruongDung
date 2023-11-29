<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('campaign_name');
            $table->integer('status')->unsigned()->default(1)->comment('1:active 0:inactive');
            $table->bigInteger('used_amount');
            $table->double('usage_rate',2);
            $table->bigInteger('budget');
            $table->bigInteger('bid_amount');
            $table->timestamp('start_date')->nullable();
            $table->timestamp('end_date')->nullable();
            $table->bigInteger('user_updated');
            $table->boolean('delete_flag')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('campaigns');
    }
};
