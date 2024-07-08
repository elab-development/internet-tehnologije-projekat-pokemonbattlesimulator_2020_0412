<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class BattleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $battleData = [
            'id' => $this->id,
            'pokemon1_id' => $this->pokemon1_id,
            'pokemon2_id' => $this->pokemon2_id,
            'winner_id' => $this->winner_id,
        ];

        if (Auth::check() && Auth::user()->role === 'admin') {
            $battleData['comments'] = $this->comments;
            $battleData['created_at'] = $this->created_at;
            $battleData['updated_at'] = $this->updated_at;
        }

        return $battleData;
    }
}

