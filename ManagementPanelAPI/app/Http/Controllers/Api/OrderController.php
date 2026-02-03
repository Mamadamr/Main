<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Order\OrderCreateRequest;
use App\Http\Requests\Order\OrderEditRequest;
use App\Http\Requests\Order\OrderUpdateRequest;
use App\Models\Order\Order;
use App\Models\Order\OrderStatus;
use App\UseCases\Order\Create\OrderCreateDTO;
use App\UseCases\Order\Create\OrderCreateUseCase;
use App\UseCases\Order\Delete\OrderDeleteDTO;
use App\UseCases\Order\Delete\OrderDeleteUseCase;
use App\UseCases\Order\Edit\OrderEditDTO;
use App\UseCases\Order\Edit\OrderEditUseCase;
use App\UseCases\Order\Get\OrderGetDTO;
use App\UseCases\Order\Get\OrderGetUseCase;
use App\UseCases\Order\Update\OrderUpdateDTO;
use App\UseCases\Order\Update\OrderUpdateUseCase;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function __construct(
        private readonly OrderGetUseCase $orderGetUseCase,
        private readonly OrderCreateUseCase $orderCreateUseCase,
        private readonly OrderUpdateUseCase $orderUpdateUseCase,
        private readonly OrderEditUseCase $orderEditUseCase,
        private readonly OrderDeleteUseCase $orderDeleteUseCase,
    )
    {}

    public function getAll(): JsonResponse
    {
        return response() -> json([
            'success' => true,
            'code' => 200,
            'data' => Order::all()
        ]);
    }

    public function get(string $id): JsonResponse
    {
        $DTO = new OrderGetDTO($id);
        $result = $this -> orderGetUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function create(OrderCreateRequest $request): JsonResponse
    {
        $DTO = new OrderCreateDTO(
        Auth::id(),
        $request->customer_name,
        $request->website_url,
        $request->pages_count,
        $request->total_price,
        $request->payment_type ?? 'no_gateway',
        $request->status ?? OrderStatus::PENDING,
    );

        $result = $this -> orderCreateUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function update(OrderUpdateRequest $request , string $id): JsonResponse
    {
        $DTO = new OrderUpdateDTO(
            $id,
            $request -> user_id,
            $request -> total_price,
            $request -> status ?? OrderStatus::PENDING,
        );
        $result = $this -> orderUpdateUseCase -> execute($DTO);
        return useCaseResult($result);
    }
    public function edit(OrderEditRequest $request , string $id): JsonResponse
    {
        $DTO = new OrderEditDTO(
            $id,
            $request -> user_id ?? null,
            $request -> total_price ?? null,
            $request -> status ?? null,
        );
        $result = $this -> orderEditUseCase -> execute($DTO);
        return useCaseResult($result);
    }

    public function delete(string $id)
    {
        $DTO = new OrderDeleteDTO($id);
        $result = $this -> orderDeleteUseCase -> execute($DTO);
        return useCaseResult($result);
    }
}
