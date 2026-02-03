<?php

namespace App\Models\Order;

enum OrderStatus: string
{
    public const PENDING = 'pending';
    public const SHIPPED = 'shipped';
    public const PAID = 'paid';
    public const DELIVERED = 'delivered';
    public const CANCELLED = 'cancelled';

}
