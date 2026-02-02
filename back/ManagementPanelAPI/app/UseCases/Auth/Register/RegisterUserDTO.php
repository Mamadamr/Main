<?php

namespace App\UseCases\Auth\Register;

use App\Contracts\DTO;
use App\Models\User\UserRole;
use App\Models\User\UserStatus;

class RegisterUserDTO implements DTO
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public string $role = UserRole::ADMIN,
        public string $status = UserStatus::ACTIVE
    ){}

    public function toArray(): array
    {
        return [
            'name' => $this -> name,
            'email' => $this -> email,
            'password' => $this -> password,
            'role' => $this -> role,
            'status' => $this -> status
        ];
    }
}
