<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class AbilityCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array<int|string, mixed>
     */
    public function toArray($request): array
    {
        return $this->collection->map(function ($ability) {
            return [
                'id' => $ability->id,
                'name' => $ability->name,
                'description' => $ability->description,
                'created_at' => $ability->created_at,
                'updated_at' => $ability->updated_at,
            ];
        })->toArray();
    }
}

