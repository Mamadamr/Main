<?php

namespace App\UseCases\Product\Edit;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Product\Product;
use App\UseCases\Category\Get\CategoryGetDTO;
use App\UseCases\Product\Create\ProductCreateDTO;
use App\UseCases\Product\Get\ProductGetDTO;
use App\UseCases\Product\Update\ProductUpdateDTO;

class ProductEditUseCase implements UseCase
{

    public function execute(DTO|ProductEditDTO $DTO): UseCaseResult
    {
        $category = Category::find($DTO -> category_id);
        if(!$category && $DTO -> category_id){
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

        $data = array_filter( $DTO -> toArray() , fn ($field) => $field !== null );
        $product -> update($data);

        return new UseCaseResult(
            true,
            200,
            'محصول با موفقیت بروزرسانی شد'
        );

    }
}
