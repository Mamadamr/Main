<?php

namespace App\UseCases\Order\Create;

use App\Contracts\DTO;

class OrderCreateDTO implements DTO
{

    public function __construct(
        public int $user_id,
        public string $customer_name,
        public string $website_url,
        public int $pages_count,
        public float $total_price,
        public string $payment_type,
        public string $status,
    ) {}

    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'customer_name' => $this->customer_name,
            'website_url' => $this->website_url,
            'pages_count' => $this->pages_count,
            'total_price' => $this->total_price,
            'payment_type' => $this->payment_type,
            'status' => $this->status,
        ];
    }
}
