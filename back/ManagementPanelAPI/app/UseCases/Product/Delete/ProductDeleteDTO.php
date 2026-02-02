<?php

namespace App\UseCases\Product\Delete;

use App\Contracts\DTO;
use App\Models\User\UserRole;
use App\Models\User\UserStatus;

class ProductDeleteDTO implements DTO
{
    public function __construct(
        public string|int $id,
    )
    {}

    public function toArray(): array
    {
        return [
            //
        ];
    }
}
