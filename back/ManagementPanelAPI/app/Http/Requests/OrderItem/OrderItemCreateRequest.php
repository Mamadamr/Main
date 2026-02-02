<?php

namespace App\Http\Requests\OrderItem;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderItemCreateRequest extends FormRequest
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
            'order_id' => 'required|numeric:',
            'product_id' => 'required|numeric:',
            'price' => 'required|numeric|decimal:0,2|between:0,99999999.99',
            'quantity' => 'required|numeric'
        ];
    }

    public function messages(): array
    {
        return [
            'order_id.required' => 'آیدی سفارش الزامی است',
            'order_id.numeric' => 'آیدی سفارش باید عدد باشد',
            'product_id.required' => 'آیدی محصول الزامی است',
            'product_id.numeric' => 'آیدی محصول باید عدد باشد',
            'price.required' => ' قیمت الزامی است',
            'price.between' => 'مقدار قیمت باید بین ۰ تا ۹۹٬۹۹۹٬۹۹۹٫۹۹ باشد',
            'price.decimal' => 'مقدار قیمت باید عددی با حداکثر دو رقم اعشار باشد',
            'price.numeric' => 'مقدار قیمت باید عدد باشد',
            'quantity.required' => ' مقدار الزامی است',
            'quantity.numeric' => 'مقدار باید عدد باشد.',
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
