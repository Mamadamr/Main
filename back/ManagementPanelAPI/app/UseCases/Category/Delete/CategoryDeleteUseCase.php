<?php

namespace App\UseCases\Category\Delete;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\UseCases\Category\Update\CategoryUpdateDTO;
use Illuminate\Support\Facades\Log;

class CategoryDeleteUseCase implements UseCase
{
    public function execute(DTO|CategoryDeleteDTO $DTO): UseCaseResult
    {
        try{
            $category = Category::find($DTO -> id);
            if(!$category){
                return new UseCaseResult(
                    false,
                    404,
                    'دسته بندی با آیدی وارد شده وجود ندارد',
                    null
                );
            }
            $category -> delete();
            return new UseCaseResult(
                true,
                200,
                'دسته بندی با موفقیت حذف شد',
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
