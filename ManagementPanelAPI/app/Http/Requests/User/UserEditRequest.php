<?php

namespace App\Http\Requests\User;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UserEditRequest extends FormRequest
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
            'name' => 'max:255',
            'email' => 'email|max:255',
            'password' => 'min:8',
            'role' => 'in:user,admin',
            'status' => 'in:active,blocked'
        ];
    }
    public function messages(): array
    {
        return [
            'name.max' => 'نام کاربری بیشتر از ۲۵۵ کاراکتر نمی‌تواند باشد',
            'email.email' => 'ایمیل وارد شده نامعتبر است',
            'email.unique' => 'کاربری با ایمیل وارد شده وجود دارد',
            'email.max' => 'ایمیل بیشتر از ۲۵۵ کاراکتر نمی‌تواند باشد',
            'password.min' => 'رمز عبور باید حداقل ۸ رقم باشد',
            'role.in' => 'نقش کاربر باید از [admin,user] باشد',
            'status.in' => 'وضعیت کاربر باید از [active,blocked] باشد'
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
