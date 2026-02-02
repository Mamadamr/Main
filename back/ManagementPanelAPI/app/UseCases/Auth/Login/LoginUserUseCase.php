<?php

namespace App\UseCases\Auth\Login;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class LoginUserUseCase implements UseCase
{

    public function execute(DTO|LoginUserUseCase $DTO): UseCaseResult
    {
        try{
            $user = User::where('email', $DTO -> email) -> first();
            if (!$user) {
                return new UseCaseResult(
                    false,
                    401,
                    'ایمیل وارد شده اشتباه است'
                );
            }

            if( !Hash::check($DTO -> password, $user -> password) ){
                return new UseCaseResult(
                    false,
                    401,
                    'رمز عبور وارد شده اشتباه است'
                );
            }

            Auth::login($user , true);

            return new UseCaseResult(
                true,
                200,
                'شما با موفقیت وارد شدید',
                $user
            );
        }catch (\Exception $exception){
            Log::error('LoginUserUseCase | {message}' , ['message' => $exception -> getMessage()]);
            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }

    }
}
