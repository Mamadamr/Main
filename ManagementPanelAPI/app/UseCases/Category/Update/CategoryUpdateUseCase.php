<?php

namespace App\UseCases\Category\Update;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use Illuminate\Support\Facades\Log;

class CategoryUpdateUseCase implements UseCase
{
    public function execute(DTO|CategoryUpdateDTO $DTO): UseCaseResult
    {
        try{
            $data = $DTO -> toArray();
            $category = Category::find($DTO -> id);
            if(!$category){
                return new UseCaseResult(
                    false,
                    404,
                    'دسته بندی با آیدی وارد شده وجود ندارد',
                    null
                );
            }
            $category -> update($data);
            return new UseCaseResult(
                true,
                200,
                'دسته بندی با موفقیت بروزرسانی شد',
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
