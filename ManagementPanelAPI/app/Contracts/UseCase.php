<?php

namespace App\Contracts;

interface UseCase
{
    public function execute(DTO $DTO): UseCaseResult;
}
