<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        if (!Auth::check() || strtoupper(Auth::user()->role) !== strtoupper($role)) {

            return redirect('/dashboard');
        }

        return $next($request);
    }
}