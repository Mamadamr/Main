<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->string('customer_name')->after('user_id');
            $table->string('website_url')->after('customer_name');
            $table->integer('pages_count')->after('website_url');
            $table->enum('payment_type', ['no_gateway', 'gateway'])
                  ->default('no_gateway')
                  ->after('total_price');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'customer_name',
                'website_url',
                'pages_count',
                'payment_type',
            ]);
        });
    }
};
