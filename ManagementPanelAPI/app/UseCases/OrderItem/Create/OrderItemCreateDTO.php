<?php

namespace App\UseCases\OrderItem\Create;

use App\Contracts\DTO;

class OrderItemCreateDTO implements DTO
{

    public function __construct(
        public string $order_id,
        public string $product_id,
        public float $price,
        public int $quantity,
    ){}

    public function toArray(): array
    {
       return [
           'order_id' => $this -> order_id,
           'product_id' => $this -> product_id,
           'price' => $this -> price,
           'quantity' => $this -> quantity
       ];
    }
}
