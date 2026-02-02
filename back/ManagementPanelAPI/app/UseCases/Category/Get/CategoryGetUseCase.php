<?php

namespace App\UseCases\Category\Get;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;

class CategoryGetUseCase implements UseCase
{

    public function execute(DTO|CategoryGetDTO $DTO): UseCaseResult
    {
        $category = Category::find($DTO -> id);
        if(!$category){
            return new UseCaseResult(
                false,
                404,
                'دسته بندی با آیدی وارد شده وجود ندارد'
            );
        }
        return new UseCaseResult(
            true,
            200,
            null,
            $category
        );

    }
}
