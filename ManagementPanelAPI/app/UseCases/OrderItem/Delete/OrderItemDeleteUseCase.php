<?php

namespace App\UseCases\OrderItem\Delete;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Order\Order;
use App\Models\OrderItem;
use App\Models\User\User;
use App\UseCases\Order\Create\OrderCreateDTO;
use App\UseCases\Order\Delete\OrderDeleteDTO;
use App\UseCases\Order\Edit\OrderEditDTO;
use App\UseCases\Order\Update\OrderUpdateDTO;
use Illuminate\Support\Facades\Log;

class OrderItemDeleteUseCase implements UseCase
{
    public function execute(DTO|OrderDeleteDTO $DTO): UseCaseResult
    {
        try{

            $order = OrderItem::find($DTO -> id);
            if(!$order){
                return new UseCaseResult(
                    false,
                    404,
                    'آیتم سفارش با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $order -> delete();

            return new UseCaseResult(
                true,
                200,
                'آیتم سفارش با موفقیت حذف شد',
            );
        }catch (\Exception $exception){
            Log::error('OrderItemDeleteUseCase | {message}' , ['message' => $exception -> getMessage()]);
            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }

    }
}
