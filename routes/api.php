<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\PublicPostController;

Route::get('/public-posts', [PublicPostController::class, 'getAllPosts']);