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
        Schema::create('orders_items', function (Blueprint $table) {
            $table -> id();
            $table -> foreignId('order_id') -> constrained('orders' , 'id') -> cascadeOnDelete();
            $table -> foreignId('product_id') -> constrained('products' , 'id') -> cascadeOnDelete();
            $table -> decimal('price' , 10);
            $table -> integer('quantity' , unsigned: true);
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders_items');
    }
};
