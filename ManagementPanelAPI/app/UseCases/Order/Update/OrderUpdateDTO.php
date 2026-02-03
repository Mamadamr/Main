<?php

namespace App\UseCases\Order\Update;

use App\Contracts\DTO;

class OrderUpdateDTO implements DTO
{

    public function __construct(
        public string $id,
        public string $user_id,
        public float $total_price,
        public string $status
    ){}

    public function toArray(): array
    {
       return [
           'user_id' => $this -> user_id,
           'total_price' => $this -> total_price,
           'status' => $this -> status
       ];
    }
}
