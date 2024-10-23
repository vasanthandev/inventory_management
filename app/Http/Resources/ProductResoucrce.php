<?php

namespace App\Http\Resources;

use Egulias\EmailValidator\Result\Reason\DetailedReason;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResoucrce extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            "id" => $this->id,
            "name" => $this->name,
            "country" => $this->country,
            "state" => $this->state,
            "details" => DetailResoucrce::collection($this->details)
        ];
    }
}
