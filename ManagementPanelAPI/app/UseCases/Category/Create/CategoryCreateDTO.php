<?php

namespace App\UseCases\Category\Create;

use App\Contracts\DTO;

class CategoryCreateDTO implements DTO
{

    public function __construct(
        public string $title
    ){}

    public function toArray(): array
    {
       return [
         'title' => $this -> title
       ];
    }
}
