<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateBookYear
{
    public function handle(Request $request, Closure $next): Response
    {
        $year = $request->year;

        if ($year > date("Y")) {
            return response()->json([
                "status" => "error",
                "message" => "Year cannot be greater than current year"
            ], 400);
        }

        return $next($request);
    }
}