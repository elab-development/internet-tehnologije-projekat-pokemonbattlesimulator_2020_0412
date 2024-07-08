<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class AbilityResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $abilityData = [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
        ];

        if (Auth::check() && Auth::user()->role === 'admin') {
            $abilityData['created_at'] = $this->created_at;
            $abilityData['updated_at'] = $this->updated_at;
        }

        return $abilityData;
    }
}

