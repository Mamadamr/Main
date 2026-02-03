<?php

namespace App\Http\Requests\Order;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required',
            'total_price' => 'required|numeric|decimal:0,2|between:0,99999999.99',
            'status' => 'in:pending,paid,shipped,delivered,cancelled'
        ];
    }

    public function messages(): array
    {
        return [
            'user_id.required' => 'آیدی کاربر الزامی است',
            'total_price.required' => 'قیمت الزامی است',
            'total_price.between' => 'مقدار قیمت باید بین ۰ تا ۹۹٬۹۹۹٬۹۹۹٫۹۹ باشد',
            'total_price.decimal' => 'مقدار قیمت باید عددی با حداکثر دو رقم اعشار باشد',
            'status.in' => 'وضعیت سفارش باید از [pending,paid,shipped,delivered,cancelled] باشد'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'code' => 422,
            'errors'  => $validator -> errors(),
        ], 422));
    }
}
