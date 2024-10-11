<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\JobApplication;
use Carbon\Carbon;

class AuthorController extends Controller
{
    /** Author dashboard */
    public function authorSection()
    {
        $livePosts = null;
        $company = null;
        $applications = null;

        if ($this->hasCompany()) {
            $company = auth()->user()->company;
            $posts = $company->posts()->get();

            if ($company->posts->count()) {
                $livePosts = $posts->where('deadline', '>', Carbon::now())->count();
                $ids = $posts->pluck('id');
                $applications = JobApplication::whereIn('post_id', $ids)->get();
            }
        }
        return response()->json([
            'company' => $company,
            'applications' => $applications,
            'livePosts' => $livePosts
        ], 200);
    }

    // Author Employer panel
    //employer is company of author
    public function employer($employer)
    {
        $company = Company::find($employer)->with('posts')->first();
        if (!$company) {
            response()->json(['message' => 'Company not found'], 404);
        }
        return response()->json([
            'company' => $company,
        ]);
    }
    //check if has company
    protected function hasCompany()
    {
        return auth()->user()->company ? true : false;
    }
}
