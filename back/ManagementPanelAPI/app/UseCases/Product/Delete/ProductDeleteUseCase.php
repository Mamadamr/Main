<?php

namespace App\UseCases\Product\Delete;

use App\Contracts\DTO;
use App\Contracts\UseCase;
use App\Contracts\UseCaseResult;
use App\Models\Category;
use App\Models\Product\Product;
use App\UseCases\Category\Get\CategoryGetDTO;
use App\UseCases\Product\Create\ProductCreateDTO;
use App\UseCases\Product\Get\ProductGetDTO;
use App\UseCases\Product\Update\ProductUpdateDTO;

class ProductDeleteUseCase implements UseCase
{

    public function execute(DTO|ProductDeleteDTO $DTO): UseCaseResult
    {

        $product = Product::find($DTO -> id);
        if(!$product){
            return new UseCaseResult(
                false,
                200,
                'محصول با آیدی وارد شده وجود ندارد',
                null
            );
        }

        $product -> delete();

        return new UseCaseResult(
            true,
            200,
            'محصول با موفقیت حذف شد',
        );

    }
}
