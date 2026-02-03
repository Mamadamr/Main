<?php

namespace App\UseCases\Order\Edit;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Order\Order;
use App\Models\User\User;
use App\UseCases\Order\Create\OrderCreateDTO;
use App\UseCases\Order\Update\OrderUpdateDTO;
use Illuminate\Support\Facades\Log;

class OrderEditUseCase implements UseCase
{
    public function execute(DTO|OrderEditDTO $DTO): UseCaseResult
    {
        try{
            $user = User::find($DTO -> user_id);
            if(!$user && $DTO -> user_id){
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

            $data = array_filter( $DTO -> toArray() , fn ($field) => $field !== null );
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
