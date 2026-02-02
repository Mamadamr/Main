<?php

namespace App\UseCases\Category\Update;

use App\Contracts\DTO;

class CategoryUpdateDTO implements DTO
{

    public function __construct(
        public string $id,
        public string $title
    ){}

    public function toArray(): array
    {
       return [
         'title' => $this -> title
       ];
    }
}
