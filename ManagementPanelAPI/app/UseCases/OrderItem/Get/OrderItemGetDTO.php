<?php

namespace App\UseCases\OrderItem\Get;

use App\Contracts\DTO;

class OrderItemGetDTO implements DTO
{

    public function __construct(
        public string $id
    )
    {}

    public function toArray(): array
    {
        return [
          'id' => $this -> id
        ];
    }
}
