<?php

namespace App\UseCases\Product\Create;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Product\Product;
use App\UseCases\Category\Get\CategoryGetDTO;
use App\UseCases\Product\Get\ProductGetDTO;

class ProductCreateUseCase implements UseCase
{

    public function execute(DTO|ProductCreateDTO $DTO): UseCaseResult
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
        $data = $DTO -> toArray();
        $product = Product::create($data);

        return new UseCaseResult(
            true,
            200,
            'محصول با موفقیت اضافه شد',
            $product
        );

    }
}
