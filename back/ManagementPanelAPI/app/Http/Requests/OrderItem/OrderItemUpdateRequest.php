<?php

namespace App\Http\Requests\OrderItem;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class OrderItemUpdateRequest extends FormRequest
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
            'order_id' => 'numeric',
            'product_id' => 'numeric',
            'price' => 'numeric|decimal:0,2|between:0,99999999.99',
            'quantity' => 'numeric'
        ];
    }

    public function messages(): array
    {
        return [
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
