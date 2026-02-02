<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User\User;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $email = 'admin@test.com';

        if (!User::where('email', $email)->exists()) {
            User::create([
                'name' => 'Admin',
                'email' => $email,
                'password' => Hash::make('12345678'),
                'role' => 'admin',
                'status' => 'active'
            ]);
        }
    }
}
