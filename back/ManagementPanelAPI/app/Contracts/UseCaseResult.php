<?php

namespace App\Contracts;

class UseCaseResult
{
    public function __construct(
        public bool $success,
        public ?int $code,
        public ?string $message,
        public mixed $data = null
    )
    {}
}
