<?php

namespace App\UseCases\User\Delete;

use App\Contracts\DTO;
use App\Models\User\UserRole;
use App\Models\User\UserStatus;

class UserDeleteDTO implements DTO
{
    public function __construct(
        public string|int $id,
        public string $email
    )
    {}

    public function toArray(): array
    {
        return [
            //
        ];
    }
}
