<?php

namespace App\UseCases\Order\Delete;

use App\Contracts\DTO;

class OrderDeleteDTO implements DTO
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
