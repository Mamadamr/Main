<?php

namespace App\UseCases\Category\Create;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class CategoryCreateUseCase implements UseCase
{
    public function execute(DTO|CategoryCreateUseCase $DTO): UseCaseResult
    {
        try{
            $data = $DTO -> toArray();
            $isCategoryExist = Category::where('title' , $DTO -> title) -> first();
            if($isCategoryExist){
                return new UseCaseResult(
                    false,
                    200,
                    'دسته بندی با عنوان وارد شده وجود دارد',
                    null
                );
            }
            $category = Category::create($data);
            return new UseCaseResult(
                true,
                201,
                'دسته بندی با موفقیت اضافه شد',
                $category
            );
        }catch (\Exception $exception){
            Log::error('CategoryCreateUseCase | {message}' , ['message' => $exception -> getMessage()]);
            return new UseCaseResult(
                false,
                500,
                'خطایی در سرور رخ داده است',
                null
            );
        }

    }
}
