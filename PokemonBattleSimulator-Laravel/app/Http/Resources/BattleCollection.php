<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class BattleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $battles = $this->collection->map(function ($battle) {
            $battleData = [
                'id' => $battle->id,
                'pokemon1_id' => $battle->pokemon1_id,
                'pokemon2_id' => $battle->pokemon2_id,
                'winner_id' => $battle->winner_id,
                'created_at' => $battle->created_at,
                'updated_at' => $battle->updated_at,
            ];

            if ($battle->winner_id) {
                $battleData['status'] = 'Completed';
            } else {
                $battleData['status'] = 'Pending';
            }

            return $battleData;
        });

        return [
            'data' => $battles,
        ];
    }
}

