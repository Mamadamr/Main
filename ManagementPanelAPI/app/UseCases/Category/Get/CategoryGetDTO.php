<?php

namespace App\UseCases\Category\Get;

use App\Contracts\DTO;

class CategoryGetDTO implements DTO
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
