<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Product\ProductCreateRequest;
use App\Http\Requests\Product\ProductEditRequest;
use App\Http\Requests\Product\ProductUpdateRequest;
use App\Models\Product\Product;
use App\Models\Product\ProductStatus;
use App\UseCases\Product\Create\ProductCreateDTO;
use App\UseCases\Product\Create\ProductCreateUseCase;
use App\UseCases\Product\Delete\ProductDeleteDTO;
use App\UseCases\Product\Delete\ProductDeleteUseCase;
use App\UseCases\Product\Edit\ProductEditDTO;
use App\UseCases\Product\Edit\ProductEditUseCase;
use App\UseCases\Product\Get\ProductGetDTO;
use App\UseCases\Product\Get\ProductGetUseCase;
use App\UseCases\Product\Update\ProductUpdateDTO;
use App\UseCases\Product\Update\ProductUpdateUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function __construct(
        private readonly ProductGetUseCase $productGetUseCase,
        private readonly ProductCreateUseCase $productCreateUseCase,
        private readonly ProductUpdateUseCase $productUpdateUseCase,
        private readonly ProductEditUseCase $productEditUseCase,
        private readonly ProductDeleteUseCase $productDeleteUseCase,
    ){}

    public function getAll(): JsonResponse
    {
        return response() -> json([
            'success' => true,
            'code' => 200,
            'data' => Product::all()
        ]);
    }

    public function get(string $id): JsonResponse
    {
        $DTO = new ProductGetDTO($id);
        $result = $this -> productGetUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function create(ProductCreateRequest $request): JsonResponse
    {
        $DTO = new ProductCreateDTO(
            $request -> title,
            $request -> description,
            $request -> category_id,
            $request -> price,
            $request -> stock,
            $request -> status ?? ProductStatus::ACTIVE
        );
        $result = $this -> productCreateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function update(ProductUpdateRequest $request , string $id): JsonResponse
    {
        $DTO = new ProductUpdateDTO(
            $id,
            $request -> title,
            $request -> description,
            $request -> category_id,
            $request -> price,
            $request -> stock,
            $request -> status ?? ProductStatus::ACTIVE
        );
        $result = $this -> productUpdateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function edit(ProductEditRequest $request , string $id): JsonResponse
    {
        $DTO = new ProductEditDTO(
            $id,
            $request -> title,
            $request -> description,
            $request -> category_id,
            $request -> price,
            $request -> stock,
            $request -> status ?? ProductStatus::ACTIVE
        );
        $result = $this -> productEditUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $DTO = new ProductDeleteDTO($id);
        $result = $this -> productDeleteUseCase -> execute($DTO);
        return useCaseResult($result);
    }
}
