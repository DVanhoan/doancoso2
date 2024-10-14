<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\http\Controllers\Controller;

class SavedJobController extends Controller
{
    // API route to get all saved jobs
    public function index()
    {
        // Get the authenticated user's saved posts
        $posts = auth()->user()->posts;

        // Return the saved posts as a JSON response
        return response()->json([
            'success' => true,
            'data' => $posts
        ], 200);
    }

    // API route to save a job
    public function store($id)
    {
        $user = auth()->user();
        $hasPost = $user->posts()->where('id', $id)->exists();

        // Check if the job post is already saved
        if ($hasPost) {
            return response()->json([
                'success' => false,
                'message' => 'You already have saved this job!',
            ], 400); // Bad Request as it is a duplicate save
        } else {
            $user->posts()->attach($id);

            return response()->json([
                'success' => true,
                'message' => 'Job successfully saved!'
            ], 200);
        }
    }

    // API route to remove a saved job
    public function destroy($id)
    {
        $user = auth()->user();

        // Detach the job post from the saved list
        $user->posts()->detach($id);

        return response()->json([
            'success' => true,
            'message' => 'Deleted saved job!'
        ], 200);
    }
}
