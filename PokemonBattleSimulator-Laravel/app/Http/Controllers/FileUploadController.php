<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
{
    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');

            // Pristup datoteci
            $filename = $file->getClientOriginalName();
            $file->storeAs('uploads', $filename);


            return response()->json(['message' => 'File uploaded successfully'], 200);
        }

        return response()->json(['message' => 'No file uploaded'], 400);
    }
}
