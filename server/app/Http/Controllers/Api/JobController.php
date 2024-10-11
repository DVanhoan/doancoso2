<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyCategory;
use App\Models\Post;
use Carbon\Carbon;
use Illuminate\Http\Request;

class JobController extends Controller
{
    public function index()
    {
        // This method is tied to a view and might not be used for API-based design.
        return view('job.index');
    }

    // API route for job search
    public function search(Request $request)
    {
        $postsQuery = Post::query(); // Initialize an empty query builder

        // Filtering based on various criteria
        if ($request->q) {
            $postsQuery->where('job_title', 'LIKE', '%' . $request->q . '%');
        } elseif ($request->category_id) {
            $postsQuery->whereHas('company', function ($query) use ($request) {
                return $query->where('company_category_id', $request->category_id);
            });
        } elseif ($request->job_level) {
            $postsQuery->where('job_level', 'LIKE', '%' . $request->job_level . '%');
        } elseif ($request->education_level) {
            $postsQuery->where('education_level', 'LIKE', '%' . $request->education_level . '%');
        } elseif ($request->employment_type) {
            $postsQuery->where('employment_type', 'LIKE', '%' . $request->employment_type . '%');
        } else {
            $postsQuery->take(30); // Default to taking 30 posts if no filters are applied
        }

        // Ensure that the posts have an associated company and paginate the results
        $posts = $postsQuery->has('company')->with('company')->paginate(6);

        // Return the paginated posts as JSON
        return response()->json([
            'success' => true,
            'data' => $posts
        ], 200);
    }

    // API route for getting categories
    public function getCategories()
    {
        $categories = CompanyCategory::all();

        // Return the list of categories as JSON
        return response()->json([
            'success' => true,
            'data' => $categories
        ], 200);
    }

    // API route for getting all organizations (companies)
    public function getAllOrganization()
    {
        $companies = Company::all();

        // Return the list of companies as JSON
        return response()->json([
            'success' => true,
            'data' => $companies
        ], 200);
    }

    // API route for getting all jobs by title and their respective IDs
    public function getAllByTitle()
    {
        $posts = Post::where('deadline', '>', Carbon::now())->get()->pluck('id', 'job_title');

        // Return the job titles and IDs as JSON
        return response()->json([
            'success' => true,
            'data' => $posts
        ], 200);
    }
}
