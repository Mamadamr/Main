<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\OrderItem\OrderItemCreateRequest;
use App\Http\Requests\OrderItem\OrderItemUpdateRequest;
use App\Models\OrderItem;
use App\UseCases\OrderItem\Create\OrderItemCreateDTO;
use App\UseCases\OrderItem\Create\OrderItemCreateUseCase;
use App\UseCases\OrderItem\Delete\OrderItemDeleteDTO;
use App\UseCases\OrderItem\Delete\OrderItemDeleteUseCase;
use App\UseCases\OrderItem\Edit\OrderItemEditDTO;
use App\UseCases\OrderItem\Edit\OrderItemEditUseCase;
use App\UseCases\OrderItem\Get\OrderItemGetDTO;
use App\UseCases\OrderItem\Get\OrderItemGetUseCase;
use App\UseCases\OrderItem\Update\OrderItemUpdateDTO;
use App\UseCases\OrderItem\Update\OrderItemUpdateUseCase;
use Illuminate\Http\JsonResponse;

class OrderItemController extends Controller
{
    public function __construct(
        private readonly OrderItemGetUseCase $orderItemGetUseCase,
        private readonly OrderItemCreateUseCase $orderItemCreateUseCase,
        private readonly OrderItemUpdateUseCase $orderItemUpdateUseCase,
        private readonly OrderItemEditUseCase $orderItemEditUseCase,
        private readonly OrderItemDeleteUseCase $orderItemDeleteUseCase,
    )
    {}

    public function getAll(): JsonResponse
    {
        return response() -> json([
            'success' => true,
            'code' => 200,
            'data' => OrderItem::all()
        ]);
    }

    public function get(string $id): JsonResponse
    {
        $DTO = new OrderItemGetDTO($id);
        $result = $this -> orderItemGetUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function create(OrderItemCreateRequest $request): JsonResponse
    {
        $DTO = new OrderItemCreateDTO(
            $request -> order_id,
            $request -> product_id,
            $request -> price,
            $request -> quantity,
        );
        $result = $this -> orderItemCreateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function update(OrderItemUpdateRequest $request , string $id): JsonResponse
    {
        $DTO = new OrderItemUpdateDTO(
            $id,
            $request -> order_id,
            $request -> product_id,
            $request -> price,
            $request -> quantity,
        );
        $result = $this -> orderItemUpdateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function edit(OrderItemUpdateRequest $request , string $id): JsonResponse
    {
        $DTO = new OrderItemEditDTO(
            $id,
            $request -> order_id,
            $request -> product_id,
            $request -> price,
            $request -> quantity,
        );
        $result = $this -> orderItemEditUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function delete(string $id): JsonResponse
    {
        $DTO = new OrderItemDeleteDTO($id);
        $result = $this -> orderItemDeleteUseCase -> execute($DTO);
        return useCaseResult($result);
    }
}
