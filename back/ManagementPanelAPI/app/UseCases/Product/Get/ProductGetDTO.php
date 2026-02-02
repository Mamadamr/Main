<?php

namespace App\UseCases\Product\Get;

use App\Contracts\DTO;

class ProductGetDTO implements DTO
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
