<?php

namespace App\Models\Product;

enum ProductStatus: string
{
    const ACTIVE = 'active';
    const INACTIVE = 'inactive';
}
