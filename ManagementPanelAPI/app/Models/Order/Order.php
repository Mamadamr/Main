<?php

namespace App\Models\Order;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'customer_name',
        'website_url',
        'pages_count',
        'payment_type',
        'total_price',
        'status',
    ];
}

