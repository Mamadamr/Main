<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\OrderItemController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Middleware\IsAdmin;
use Illuminate\Support\Facades\Route;

Route::prefix('api') -> group(function () {

    // Auth Routes
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    // Category Routes
    Route::get('categories', [CategoryController::class, 'getAll']);
    Route::get('categories/{id}', [CategoryController::class, 'get']);

    // Orders Routes
    Route::get('orders', [OrderController::class, 'getAll']);
    Route::get('orders/{id}', [OrderController::class, 'get']);

    // Order Items Routes
    Route::get('order-items', [OrderItemController::class, 'getAll']);
    Route::get('order-items/{id}', [OrderItemController::class, 'get']);

    // Products Routes
    Route::get('products', [ProductController::class, 'getAll']);
    Route::get('products/{id}', [ProductController::class, 'get']);

    Route::middleware(['auth:web' , IsAdmin::class]) -> group(function () {
        Route::get('me', [AuthController::class, 'me']);

        // Category Routes
        Route::post('categories', [CategoryController::class, 'create']);
        Route::put('categories/{id}', [CategoryController::class, 'update']);
        Route::delete('categories/{id}', [CategoryController::class, 'delete']);

        // User Routes
        Route::put('users/{id}', [AuthController::class, 'update']);
        Route::patch('users/{id}', [AuthController::class, 'edit']);
        Route::delete('users/{id}', [AuthController::class, 'delete']);

        // Orders Routes
        Route::middleware('auth:sanctum')->post('/orders', [OrderController::class, 'create']);
        Route::put('orders/{id}', [OrderController::class, 'update']);
        Route::patch('orders/{id}', [OrderController::class, 'edit']);
        Route::delete('orders/{id}', [OrderController::class, 'delete']);

        // Order Items Routes
        Route::post('order-items', [OrderItemController::class, 'create']);
        Route::put('order-items/{id}', [OrderItemController::class, 'update']);
        Route::patch('order-items/{id}', [OrderItemController::class, 'edit']);
        Route::delete('order-items/{id}', [OrderItemController::class, 'delete']);

        // Products Routes
        Route::post('products', [ProductController::class, 'create']);
        Route::put('products/{id}', [ProductController::class, 'update']);
        Route::patch('products/{id}', [ProductController::class, 'edit']);
        Route::delete('products/{id}', [ProductController::class, 'delete']);

    });


});
