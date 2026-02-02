<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth('sanctum')->user(); // 👈 صراحتاً sanctum

        if (!$user) {
            return response()->json([
                'success' => false,
                'code' => 401,
                'message' => 'احراز هویت انجام نشده'
            ], 401);
        }

        if ($user->role !== 'admin') {
            return response()->json([
                'success' => false,
                'code' => 403,
                'message' => 'شما اجازه دسترسی به این بخش را ندارید'
            ], 403);
        }

        return $next($request);
    }
}
    
