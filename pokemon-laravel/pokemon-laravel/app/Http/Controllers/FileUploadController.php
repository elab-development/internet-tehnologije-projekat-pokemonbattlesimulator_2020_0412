<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validacija fajla
        $request->validate([
            'file' => 'required|mimes:jpg,png,pdf|max:2048', // Ograničava na tip fajla i veličinu (2MB)
        ]);

        // Sačuvaj fajl u 'storage/app/public/uploads'
        $filePath = $request->file('file')->store('uploads', 'public');

        return response()->json([
            'message' => 'File uploaded successfully!',
            'path' => $filePath
        ], 200);
    }
}

