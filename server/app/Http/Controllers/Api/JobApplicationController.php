<?php

namespace App\Http\Controllers;

use App\Models\JobApplication;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class JobApplicationController extends Controller
{
    // Get all job applications for a company
    public function index(): JsonResponse
    {
        $applicationsWithPostAndUser = null;
        $company = auth()->user()->company;

        if ($company) {
            $ids = $company->posts()->pluck('id');
            $applications = JobApplication::whereIn('post_id', $ids);
            $applicationsWithPostAndUser = $applications->with('user', 'post')->latest()->paginate(10);
        }

        return response()->json([
            'status' => 'success',
            'data' => $applicationsWithPostAndUser
        ], 200);
    }

    // Get a single job application by ID
    public function show($id): JsonResponse
    {
        $application = JobApplication::find($id);

        if (!$application) {
            return response()->json([
                'status' => 'error',
                'message' => 'Job application not found'
            ], 404);
        }

        $post = $application->post()->first();
        $userId = $application->user_id;
        $applicant = User::find($userId);
        $company = $post->company()->first();

        return response()->json([
            'status' => 'success',
            'data' => [
                'applicant' => $applicant,
                'post' => $post,
                'company' => $company,
                'application' => $application
            ]
        ], 200);
    }

    // Delete a job application
    public function destroy(Request $request): JsonResponse
    {
        $application = JobApplication::find($request->application_id);

        if (!$application) {
            return response()->json([
                'status' => 'error',
                'message' => 'Job application not found'
            ], 404);
        }

        $application->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Job application deleted'
        ], 200);
    }
}
