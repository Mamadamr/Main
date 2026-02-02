<?php

namespace App\Http\Requests\Product;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductCreateRequest extends FormRequest
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
            'title' => 'required|max:255',
            'description' => 'required',
            'category_id' => 'required',
            'price' => 'required|numeric|decimal:0,2|between:0,99999999.99',
            'stock' => 'required|numeric',
            'status' => 'in:active,inactive',
            'status.in' => 'وضعیت کاربر باید از [active,blocked] باشد',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'عنوان الزامی است',
            'title.max' => 'عنوان بیشتر از ۲۵۵ کاراکتر نمی‌تواند باشد',
            'description.required' => 'توضیحات الزامی است',
            'price.required' => ' قیمت الزامی است',
            'price.between' => 'مقدار قیمت باید بین ۰ تا ۹۹٬۹۹۹٬۹۹۹٫۹۹ باشد',
            'price.decimal' => 'مقدار قیمت باید عددی با حداکثر دو رقم اعشار باشد',
            'price.numeric' => 'مقدار قیمت باید عدد باشد',
            'stock.required' => ' موجودی الزامی است',
            'stock.numeric' => 'موجودی باید عدد باشد.',
            'status.in' => 'وضعیت سفارش باید از [pending,paid,shipped,delivered,cancelled] باشد',
            'category_id.required' => 'دسته بندی الزامی است',
            'image.image' => 'فایل باید تصویر باشد',
            'image.mimes' => 'فرمت تصویر مجاز نیست',
            'image.max' => 'حجم تصویر نباید بیشتر از ۲ مگابایت باشد',

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
