<?php

namespace App\UseCases\Product\Get;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Product\Product;
use App\UseCases\Category\Get\CategoryGetDTO;

class ProductGetUseCase implements UseCase
{

    public function execute(DTO|ProductGetDTO $DTO): UseCaseResult
    {
        $product = Product::find($DTO -> id);
        if(!$product){
            return new UseCaseResult(
                false,
                404,
                'محصول با آیدی وارد شده وجود ندارد'
            );
        }
        return new UseCaseResult(
            true,
            200,
            null,
            $product
        );

    }
}
