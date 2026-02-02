<?php

namespace App\UseCases\OrderItem\Edit;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Order\Order;
use App\Models\OrderItem;
use App\Models\Product\Product;
use App\UseCases\OrderItem\Update\OrderItemUpdateDTO;
use Illuminate\Support\Facades\Log;

class OrderItemEditUseCase implements UseCase
{
    public function execute(DTO|OrderItemUpdateDTO $DTO): UseCaseResult
    {
        try{

            $order = Order::find($DTO -> order_id);
            if(!$order && $DTO -> order_id){
                return new UseCaseResult(
                    false,
                    404,
                    'سفارش با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $product = Product::find($DTO -> product_id);
            if(!$product && $DTO -> product_id){
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

            $data = array_filter( $DTO -> toArray() , fn ($field) => $field !== null );
            $orderItem -> update($data);

            return new UseCaseResult(
                true,
                200,
                'آیتم سفارش با موفقیت بروزرسانی شد',
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
