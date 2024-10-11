<?php

namespace App\Http\Controllers;

use App\Models\CompanyCategory;
use Illuminate\Http\Request;

class CompanyCategoryController extends Controller
{

    public function store(Request $request)
    {
        // Validate the request
        $request->validate([
            'category_name' => 'required|min:5'
        ]);

        // Create a new category
        $category = CompanyCategory::create([
            'category_name' => $request->category_name
        ]);

        // Return a JSON response for successful creation
        return response()->json([
            'success' => true,
            'message' => 'Category Created!',
            'category' => $category
        ], 201);
    }

    public function edit(CompanyCategory $category)
    {
        // Since this is an API, you can just return the category data
        return response()->json([
            'success' => true,
            'category' => $category
        ], 200);
    }

    public function update(Request $request, $id)
    {
        // Validate the request
        $request->validate([
            'category_name' => 'required|min:5'
        ]);

        // Find the category and update it
        $category = CompanyCategory::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->update([
            'category_name' => $request->category_name
        ]);

        // Return a JSON response for successful update
        return response()->json([
            'success' => true,
            'message' => 'Category Updated!',
            'category' => $category
        ], 200);
    }

    public function destroy($id)
    {
        // Find the category and delete it
        $category = CompanyCategory::find($id);

        if (!$category) {
            return response()->json([
                'success' => false,
                'message' => 'Category not found',
            ], 404);
        }

        $category->delete();

        // Return a JSON response for successful deletion
        return response()->json([
            'success' => true,
            'message' => 'Category Deleted!'
        ], 200);
    }
}
