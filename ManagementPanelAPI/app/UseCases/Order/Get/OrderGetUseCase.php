<?php

namespace App\UseCases\Order\Get;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Order\Order;

class OrderGetUseCase implements UseCase
{

    public function execute(DTO|OrderGetDTO $DTO): UseCaseResult
    {
        $order = Order::find($DTO -> id);
        if(!$order){
            return new UseCaseResult(
                false,
                404,
                'سفارش با آیدی وارد شده وجود ندارد'
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
