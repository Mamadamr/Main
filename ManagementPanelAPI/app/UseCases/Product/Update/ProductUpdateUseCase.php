<?php

namespace App\UseCases\Product\Update;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Product\Product;
use App\UseCases\Category\Get\CategoryGetDTO;
use App\UseCases\Product\Create\ProductCreateDTO;
use App\UseCases\Product\Get\ProductGetDTO;

class ProductUpdateUseCase implements UseCase
{

    public function execute(DTO|ProductUpdateDTO $DTO): UseCaseResult
    {
        $category = Category::find($DTO -> category_id);
        if(!$category){
            return new UseCaseResult(
                false,
                200,
                'دسته بندی با آیدی وارد شده وجود ندارد',
                null
            );
        }

        $product = Product::find($DTO -> id);
        if(!$product){
            return new UseCaseResult(
                false,
                200,
                'محصول با آیدی وارد شده وجود ندارد',
                null
            );
        }

        $data = $DTO -> toArray();
        $product -> update($data);

        return new UseCaseResult(
            true,
            200,
            'محصول با موفقیت بروزرسانی شد',
            $product
        );

    }
}
