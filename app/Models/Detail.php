<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Detail extends Model
{
    use SoftDeletes;

    protected $fillable = ['size','length','quantity'];
    function product():BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
