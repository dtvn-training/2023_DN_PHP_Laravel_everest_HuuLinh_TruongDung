<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role_id)
    {
        if (!Auth::check()) {
            return response(["message"=>"Unauthorized"], 401);
        }

        $user = Auth::user();
        if ($user->role->role_id == $role_id) {
            return $next($request);
        } else {
            return response(["message"=>"Unauthorized"], 401);
        }
    }
}
