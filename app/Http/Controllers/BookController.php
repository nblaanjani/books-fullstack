<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    // ✅ GET /api/books
    public function index()
    {
        return response()->json([
            'data' => Book::all()
        ]);
    }

    // ✅ POST /api/books
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required',
            'author' => 'required',
            'year' => 'required|integer',
            'description' => 'required'
        ]);

        $book = Book::create($validated);

        return response()->json([
            'message' => 'Book created',
            'data' => $book
        ], 201);
    }

    // ✅ GET /api/books/{id}
    public function show(string $id)
    {
        $book = Book::findOrFail($id);

        return response()->json([
            'data' => $book
        ]);
    }

    // ✅ PUT /api/books/{id}
    public function update(Request $request, string $id)
    {
        $book = Book::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required',
            'author' => 'required',
            'year' => 'required|integer',
            'description' => 'required'
        ]);

        $book->update($validated);

        return response()->json([
            'message' => 'Book updated',
            'data' => $book
        ]);
    }

    // ✅ DELETE /api/books/{id}
    public function destroy(string $id)
    {
        Book::destroy($id);

        return response()->json([
            'message' => 'Book deleted'
        ]);
    }
}