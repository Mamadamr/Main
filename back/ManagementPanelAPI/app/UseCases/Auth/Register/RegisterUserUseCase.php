<?php

namespace App\UseCases\Auth\Register;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\User\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

readonly class RegisterUserUseCase implements UseCase
{
    public function __construct(private User $user)
    {}

    public function execute( DTO|RegisterUserDTO $DTO ): UseCaseResult
    {
        $data = $DTO -> toArray();
        $data['password'] = Hash::make($DTO -> password);

        try{
            $user = $this -> user -> create( [...$data] );

            Auth::login($user , true);

            return new UseCaseResult(
                true,
                201,
                'ثبت نام با موفقیت انجام شد',
                $user
            );
        }catch (\Exception $exception){
            Log::error('RegisterUserUseCase | {message}' , ['message' => $exception -> getMessage()]);
            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }

    }
}
