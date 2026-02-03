<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginUserRequest;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Http\Requests\User\UserDeleteRequest;
use App\Http\Requests\User\UserEditRequest;
use App\Http\Requests\User\UserUpdateRequest;
use App\Models\User\UserRole;
use App\Models\User\UserStatus;
use App\UseCases\Auth\Login\LoginUserDTO;
use App\UseCases\Auth\Login\LoginUserUseCase;
use App\UseCases\Auth\Me\GetUserDTO;
use App\UseCases\Auth\Me\GetUserUseCase;
use App\UseCases\Auth\Register\RegisterUserDTO;
use App\UseCases\Auth\Register\RegisterUserUseCase;
use App\UseCases\Category\Delete\CategoryDeleteDTO;
use App\UseCases\User\Delete\UserDeleteDTO;
use App\UseCases\User\Delete\UserDeleteUseCase;
use App\UseCases\User\Edit\UserEditDTO;
use App\UseCases\User\Edit\UserEditUseCase;
use App\UseCases\User\Update\UserUpdateDTO;
use App\UseCases\User\Update\UserUpdateUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function __construct(
        private readonly RegisterUserUseCase $registerUserUseCase,
        private readonly LoginUserUseCase $loginUserUseCase,
        private readonly UserUpdateUseCase $userUpdateUseCase,
        private readonly UserEditUseCase $userEditUseCase,
        private readonly UserDeleteUseCase $userDeleteUseCase,
    ) {}

    public function register(RegisterUserRequest $request): JsonResponse
    {
        $DTO = new RegisterUserDto(
            name: $request -> name,
            email: $request -> email,
            password: $request -> password
        );
        $result = $this -> registerUserUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    

    public function login(LoginUserRequest $request): JsonResponse
    {
    if (!Auth::attempt([
        'email' => $request->email,
        'password' => $request->password,
    ], true)) {
        return response()->json([
            'success' => false,
            'message' => 'ایمیل یا رمز عبور اشتباه است'
        ], 401);
    }

    $request->session()->regenerate();

    return response()->json([
        'success' => true,
        'message' => 'ورود موفق',
        'user' => Auth::user()
    ]);
    }




    public function update(UserUpdateRequest $request , string $id): JsonResponse
    {
        $DTO = new UserUpdateDTO(
            $id,
            name: $request -> name,
            email: $request -> email,
            password: $request -> password,
            role: $request -> role ?? UserRole::USER,
            status: $request -> status ?? UserStatus::ACTIVE
        );
        $result = $this -> userUpdateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function edit(UserEditRequest $request , string $id): JsonResponse
    {
        $DTO = new UserEditDTO(
            $id,
            name: $request -> name ?? null,
            email: $request -> email ?? null,
            password: $request -> password ?? null,
            role: $request -> role ?? UserRole::USER,
            status: $request -> status ?? UserStatus::ACTIVE
        );
        $result = $this -> userEditUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function me(Request $request): JsonResponse
    {
        try{
            return response() -> json([
                'success' => true,
                'code' => 200,
                'user' => $request -> user()
            ]);
        }catch (\Exception $e){
            Log::error($e -> getMessage());
        }

        return response() -> json([
            'success' => false,
            'code' => 500,
            'message' => 'خطایی در سرور رخ داده است'
        ], 500);
    }

    public function logout(Request $request): JsonResponse
    {
        Auth::logout();
        $request -> session() -> invalidate();
        $request -> session() -> regenerateToken();

        return response() -> json([
            'success' => true,
            'code' => 200,
            'message' => 'کاربر با موفقیت خارج شد'
        ]);
    }

    public function delete(UserDeleteRequest $request , string $id): JsonResponse
    {
        $DTO = new UserDeleteDTO($id , $request -> email);
        $result = $this -> userDeleteUseCase -> execute($DTO);
        return useCaseResult($result);
    }
}
