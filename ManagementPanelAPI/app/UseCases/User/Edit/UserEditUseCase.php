<?php

namespace App\UseCases\User\Edit;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\User\User;
use Illuminate\Support\Facades\Hash;

class UserEditUseCase implements UseCase
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

        $data = array_filter( $DTO -> toArray() , fn ($field) => $field !== null );
        if( isset($data['password']) ){
            $data['password'] = Hash::make($DTO -> password);
        }
        $user -> update($data);
        return new UseCaseResult(
            true,
            200,
            'اطلاعات کاربر با موفقیت بروزرسانی شد',
            null
        );
    }
}
