<?php

namespace App\Http\Controllers;

use App\Models\User; // Ili model koji pretražuješ
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = User::query(); // Možeš promeniti User na model koji želiš da pretražuješ

        // Dodaj uslove pretrage na osnovu zahteva
        if ($request->has('name')) {
            $query->where('name', 'like', '%' . $request->input('name') . '%');
        }

        if ($request->has('email')) {
            $query->where('email', 'like', '%' . $request->input('email') . '%');
        }

        if ($request->has('id')) {
            $query->where('id', 'like', '%' . $request->input('id') . '%');
        }

        // Možeš dodati još filtera prema potrebi
        // if ($request->has('some_criteria')) {
        //     $query->where('some_field', $request->input('some_criteria'));
        // }

        $results = $query->get();

        return response()->json($results);
    }
}

