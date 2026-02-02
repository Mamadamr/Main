<?php

namespace App\UseCases\OrderItem\Update;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Order\Order;
use App\Models\OrderItem;
use App\Models\Product\Product;
use Illuminate\Support\Facades\Log;

class OrderItemUpdateUseCase implements UseCase
{
    public function execute(DTO|OrderItemUpdateDTO $DTO): UseCaseResult
    {
        try{

            $order = Order::find($DTO -> order_id);
            if(!$order){
                return new UseCaseResult(
                    false,
                    404,
                    'سفارش با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $product = Product::find($DTO -> product_id);
            if(!$product){
                return new UseCaseResult(
                    false,
                    404,
                    'محصول با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $orderItem = OrderItem::find($DTO -> id);
            if(!$orderItem){
                return new UseCaseResult(
                    false,
                    404,
                    'آیتم سفارش با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $data = $DTO -> toArray();
            $orderItem -> update($data);

            return new UseCaseResult(
                true,
                200,
                'آیتم سفارش با موفقیت بروزرسانی شد',
                $orderItem
            );
        }catch (\Exception $exception){
            Log::error('OrderItemUpdateUseCase | {message}' , ['message' => $exception -> getMessage()]);
            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }

    }
}
