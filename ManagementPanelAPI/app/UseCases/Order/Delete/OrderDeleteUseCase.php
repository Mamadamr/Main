<?php

namespace App\UseCases\Order\Delete;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Order\Order;
use App\Models\User\User;
use App\UseCases\Order\Create\OrderCreateDTO;
use App\UseCases\Order\Edit\OrderEditDTO;
use App\UseCases\Order\Update\OrderUpdateDTO;
use Illuminate\Support\Facades\Log;

class OrderDeleteUseCase implements UseCase
{
    public function execute(DTO|OrderDeleteDTO $DTO): UseCaseResult
    {
        try{

            $order = Order::find($DTO -> id);
            if(!$order){
                return new UseCaseResult(
                    false,
                    404,
                    'سفارش با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $order -> delete();

            return new UseCaseResult(
                true,
                200,
                'سفارش با موفقیت حذف شد',
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
