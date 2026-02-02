<?php

use App\Contracts\UseCaseResult;
use Illuminate\Http\JsonResponse;

function useCaseResult(UseCaseResult $result): JsonResponse
{
    if( $result -> success ){
        return response() -> json([
            'success' => $result -> success,
            'code' => $result -> code,
            'message' => $result -> message,
            'data' => $result -> data
        ] , $result -> code );
    }

    return response() -> json([
        'success' => $result -> success,
        'code' => $result -> code,
        'message' => $result -> message
    ] , $result -> code );
}
