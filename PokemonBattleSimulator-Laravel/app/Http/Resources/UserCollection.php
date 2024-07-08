<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Support\Facades\Auth;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        $users = $this->collection->map(function ($user) {
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];

            if (Auth::check() && Auth::user()->role === 'admin') {
                $userData['created_at'] = $user->created_at;
                $userData['updated_at'] = $user->updated_at;
                $userData['role'] = $user->role;
            }

            return $userData;
        });

        return [
            'data' => $users,
        ];
    }
}

