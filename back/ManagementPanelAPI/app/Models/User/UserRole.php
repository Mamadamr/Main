<?php

namespace App\Models\User;

enum UserRole : string
{
    public const ADMIN = 'admin';
    public const USER = 'user';
}
