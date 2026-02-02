<?php

namespace App\UseCases\Auth\Login;

use App\Contracts\DTO;

class LoginUserDTO implements DTO
{
    public function __construct(
        public string $email,
        public string $password
    ){}

    public function toArray(): array
    {
        return [
            'email' => $this -> email,
            'password' => $this -> password
        ];
    }
}
