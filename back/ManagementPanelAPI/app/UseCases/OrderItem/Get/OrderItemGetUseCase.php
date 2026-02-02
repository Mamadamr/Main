<?php

namespace App\UseCases\OrderItem\Get;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Order\Order;
use App\Models\OrderItem;
use App\UseCases\Order\Get\OrderGetDTO;

class OrderItemGetUseCase implements UseCase
{

    public function execute(DTO|OrderGetDTO $DTO): UseCaseResult
    {
        $order = OrderItem::find($DTO -> id);
        if(!$order){
            return new UseCaseResult(
                false,
                404,
                'آیتم سفارش با آیدی وارد شده وجود ندارد'
            );
        }
        return new UseCaseResult(
            true,
            200,
            null,
            $order
        );

    }
}
