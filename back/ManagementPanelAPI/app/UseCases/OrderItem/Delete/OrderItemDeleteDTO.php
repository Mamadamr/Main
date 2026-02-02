<?php

namespace App\UseCases\OrderItem\Delete;

use App\Contracts\DTO;

class OrderItemDeleteDTO implements DTO
{

    public function __construct(
        public string $id,
    ){}

    public function toArray(): array
    {
       return [
        //
       ];
    }
}
