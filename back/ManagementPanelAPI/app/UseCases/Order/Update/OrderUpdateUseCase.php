<?php

namespace App\UseCases\Order\Update;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Order\Order;
use App\Models\User\User;
use App\UseCases\Order\Create\OrderCreateDTO;
use Illuminate\Support\Facades\Log;

class OrderUpdateUseCase implements UseCase
{
    public function execute(DTO|OrderUpdateDTO $DTO): UseCaseResult
    {
        try{
            $user = User::find($DTO -> user_id);
            if(!$user){
                return new UseCaseResult(
                    false,
                    404,
                    'کاربر با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $order = Order::find($DTO -> id);
            if(!$order){
                return new UseCaseResult(
                    false,
                    404,
                    'سفارش با آیدی وارد شده وجود ندارد',
                    null
                );
            }

            $data = $DTO -> toArray();
            $order -> update($data);

            return new UseCaseResult(
                true,
                200,
                'سفارش با موفقیت بروزرسانی شد',
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
