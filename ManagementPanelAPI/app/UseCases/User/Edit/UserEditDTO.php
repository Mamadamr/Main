<?php

namespace App\UseCases\User\Edit;

use App\Contracts\DTO;
use App\Models\User\UserRole;
use App\Models\User\UserStatus;

class UserEditDTO implements DTO
{
    public function __construct(
        public string|int $id,
        public ?string $name,
        public ?string $email,
        public ?string $password,
        public ?string $role = UserRole::USER,
        public ?string $status = UserStatus::ACTIVE
    )
    {}

    public function toArray(): array
    {
        return [
            'name' => $this -> name,
            'email' => $this -> email,
            'password' => $this -> password,
            'role' => $this -> role ?? UserRole::USER,
            'status' => $this -> status ?? UserStatus::ACTIVE
        ];
    }
}
