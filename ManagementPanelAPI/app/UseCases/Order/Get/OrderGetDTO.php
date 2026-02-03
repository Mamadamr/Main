<?php

namespace App\UseCases\Order\Get;

use App\Contracts\DTO;

class OrderGetDTO implements DTO
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
