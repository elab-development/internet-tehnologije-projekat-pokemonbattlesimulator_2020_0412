<?php

namespace App\Http\Controllers;

use App\Models\User; // Ili model koji želiš da eksportuješ
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ExportController extends Controller
{
    public function exportCsv()
    {
        $users = User::all(); // Zameni User modelom koji želiš da eksportuješ

        $csvData = '';

        // Dodaj zaglavlje CSV fajla
        $csvData .= "ID,Name,Email\n";

        // Dodaj podatke
        foreach ($users as $user) {
            $csvData .= "{$user->id},{$user->name},{$user->email}\n";
        }

        $fileName = 'users.csv';

        $headers = [
            'Content-type'        => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$fileName\"",
        ];

        return Response::make($csvData, 200, $headers);
    }


}

