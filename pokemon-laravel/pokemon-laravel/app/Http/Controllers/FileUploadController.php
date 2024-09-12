<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
    {
    public function upload ( Request $request )
        {
        // Validacija
        $request->validate ( [
            'file' => 'required|mimes:jpg,png,pdf|max:2048',
        ] );

        // Čuvanje fajla u 'storage/uploads'
        $filePath = $request->file ( 'file' )->store ( 'uploads', 'public' );

        // Generisanje punog URL-a do fajla
        $fullUrl = asset ( 'storage/' . $filePath );

        // Vraćanje odgovora sa punim URL-om do fajla
        return response ()->json ( [
            'message' => 'File uploaded successfully!',
            'path'    => $fullUrl,  // Vraćamo pun URL
        ], 200 );
        }
    }
