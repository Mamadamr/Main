<?php

namespace App\UseCases\Product\Create;

use App\Contracts\DTO;

class ProductCreateDTO implements DTO
{

    public function __construct(
        public string $title,
        public string $description,
        public string $category_id,
        public float $price,
        public string|int $stock,
        public string $status
    )
    {}

    public function toArray(): array
    {
        return [
            'title' => $this -> title,
            'description' => $this -> description,
            'category_id' => $this -> category_id,
            'price' => $this -> price,
            'stock' => $this -> stock,
            'status' => $this -> status,
        ];
    }
}
