<?php

namespace App\UseCases\OrderItem\Create;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Order\Order;
use App\Models\OrderItem;
use App\Models\Product\Product;
use Illuminate\Support\Facades\Log;

class OrderItemCreateUseCase implements UseCase
{
    public function execute(DTO|OrderItemCreateDTO $DTO): UseCaseResult
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

            $data = $DTO -> toArray();
            $order = OrderItem::create($data);

            return new UseCaseResult(
                true,
                201,
                'آیتم سفارش با موفقیت اضافه شد',
                $order
            );
        }catch (\Exception $exception){
            Log::error('OrderCreateUseCase | {message}' , ['message' => $exception -> getMessage()]);
            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }

    }
}
