<?php

namespace App\UseCases\User\Delete;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\User\User;
use App\UseCases\User\Edit\UserEditDTO;
use Illuminate\Support\Facades\Hash;

class UserDeleteUseCase implements UseCase
{

    public function execute(DTO|UserEditDTO $DTO): UseCaseResult
    {
        $user = User::where('id' , $DTO -> id) -> first();
        if(!$user){
            return new UseCaseResult(
                false,
                401,
                'کاربری با ایمیل و آیدی وارد شده وجود ندارد',
            );
        }

        $user -> delete();
        return new UseCaseResult(
            true,
            200,
            'کاربر با موفقیت حذف شد',
            null
        );
    }
}
