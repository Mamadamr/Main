<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\CategoryCreateRequest;
use App\Http\Requests\Category\CategoryUpdateRequest;
use App\Models\Category;
use App\UseCases\Category\Create\CategoryCreateDTO;
use App\UseCases\Category\Create\CategoryCreateUseCase;
use App\UseCases\Category\Delete\CategoryDeleteDTO;
use App\UseCases\Category\Delete\CategoryDeleteUseCase;
use App\UseCases\Category\Get\CategoryGetDTO;
use App\UseCases\Category\Get\CategoryGetUseCase;
use App\UseCases\Category\Update\CategoryUpdateDTO;
use App\UseCases\Category\Update\CategoryUpdateUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function __construct(
        private readonly CategoryGetUseCase $categoryGetUseCase,
        private readonly CategoryCreateUseCase $categoryCreateUseCase,
        private readonly CategoryUpdateUseCase $categoryUpdateUseCase,
        private readonly CategoryDeleteUseCase $categoryDeleteUseCase,
    )
    {}

    public function getAll(): JsonResponse
    {
        return response() -> json([
            'success' => true,
            'code' => 200,
            'data' => Category::all()
        ]);
    }

    public function get(string $id): JsonResponse
    {
        $DTO = new CategoryGetDTO($id);
        $result = $this -> categoryGetUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function create(CategoryCreateRequest $request): JsonResponse
    {
        $DTO = new CategoryCreateDTO( $request -> title );
        $result = $this -> categoryCreateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function update(CategoryUpdateRequest $request, string $id): JsonResponse
    {
        $DTO = new CategoryUpdateDTO($id , $request -> title);
        $result = $this -> categoryUpdateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function delete(Request $request, string $id): JsonResponse
    {
        $DTO = new CategoryDeleteDTO($id);
        $result = $this -> categoryDeleteUseCase -> execute($DTO);
        return useCaseResult($result);
    }
}
