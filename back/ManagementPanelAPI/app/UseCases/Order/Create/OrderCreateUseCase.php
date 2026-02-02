<?php

namespace App\UseCases\Order\Create;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Order\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class OrderCreateUseCase implements UseCase
{
    public function execute(DTO|OrderCreateDTO $DTO): UseCaseResult
    {
        try {
            // ✅ ادمین لاگین‌شده
            $userId = Auth::id();

            if (!$userId) {
                return new UseCaseResult(
                    false,
                    401,
                    'کاربر لاگین نیست',
                    null
                );
            }

            // ✅ ساخت سفارش
            // $order = Order::create([
            //     'user_id' => $userId,
            //     'total_price' => $DTO->total_price,
            //     'status' => $DTO->status,
            // ]);
             $order = Order::create($DTO->toArray());

            return new UseCaseResult(
                true,
                201,
                'سفارش با موفقیت اضافه شد',
                $order
            );
        } catch (\Exception $exception) {
            Log::error('OrderCreateUseCase', [
                'message' => $exception->getMessage()
            ]);

            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }
    }
}
