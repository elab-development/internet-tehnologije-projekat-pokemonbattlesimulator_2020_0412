<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FileUploadController extends Controller
    {
    public function upload ( Request $request )
        {

        $request->validate ( [
            'file' => 'required|mimes:jpg,png,pdf|max:2048',
        ] );


        $filePath = $request->file ( 'file' )->store ( 'uploads', 'public' );


        $fullUrl = asset ( 'storage/' . $filePath );


        return response ()->json ( [
            'message' => 'File uploaded successfully!',
            'path'    => $fullUrl,
        ], 200 );
        }
    }
