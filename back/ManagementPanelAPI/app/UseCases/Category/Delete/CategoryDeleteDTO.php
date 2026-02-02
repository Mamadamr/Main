<?php

namespace App\UseCases\Category\Delete;

use App\Contracts\DTO;

class CategoryDeleteDTO implements DTO
{

    public function __construct(
        public string $id
    ){}

    public function toArray(): array
    {
       return [
         //
       ];
    }
}
