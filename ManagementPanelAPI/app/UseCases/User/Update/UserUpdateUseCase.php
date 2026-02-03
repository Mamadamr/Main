<?php

namespace App\UseCases\User\Update;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\User\User;
use Illuminate\Support\Facades\Hash;

class UserUpdateUseCase implements UseCase
{

    public function execute(DTO|UserUpdateDTO $DTO): UseCaseResult
    {

        $user = User::where('id' , $DTO -> id) -> where('email' , $DTO -> email) -> first();
        if(!$user){
            return new UseCaseResult(
                false,
                401,
                'کاربری با ایمیل و آیدی وارد شده وجود ندارد',
            );
        }

        $data = $DTO -> toArray();
        $data['password'] = Hash::make($DTO -> password);
        $user -> update($data);

        return new UseCaseResult(
            true,
            200,
            'اطلاعات کاربر با موفقیت بروزرسانی شد',
            $user
        );

    }
}
