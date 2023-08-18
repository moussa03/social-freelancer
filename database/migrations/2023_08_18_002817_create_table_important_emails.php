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
        Schema::create('important_emails', function (Blueprint $table) {
            $table->id();
            $table->uuid('email_id');
            $table->text('data');
            $table->timestamp('read_at')->nullable();
            $table->foreign('email_id')
            ->references('id')->on('notifications')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('important_emails');
    }
};
