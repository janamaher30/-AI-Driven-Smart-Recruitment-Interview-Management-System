<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class NameController extends Controller
{
    public function ShowMyName(Request $request){
        $name = $request->name;
        return view('result', compact('name'));
    }
}
