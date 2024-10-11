<?php 

namespace App\Http\Controllers\Api;

use App\Models\JobApplication;
use App\Models\Post;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;

class AccountController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function index()
    {
        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'data' => $user
        ], 200);
    }

    public function becomeEmployer()
    {
        $user = User::find(auth()->user()->id);
        $user->removeRole('user');
        $user->assignRole('author');

        return response()->json([
            'status' => 'success',
            'message' => 'You have become an employer',
            'data' => $user
        ], 200);
    }

    public function applyJobView(Request $request)
    {
        $user = auth()->user();
        if ($this->hasApplied($user, $request->post_id)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'You have already applied for this job!'
            ], 400);
        }

        if (!$user->hasRole('user')) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Employers cannot apply for jobs!'
            ], 403);
        }

        $post = Post::find($request->post_id);
        if (!$post) {
            return response()->json([
                'status' => 'error',
                'message' => 'Job not found'
            ], 404);
        }

        $company = $post->company()->first();

        return response()->json([
            'status' => 'success',
            'post' => $post,
            'company' => $company
        ], 200);
    }

    public function applyJob(Request $request)
    {
        $user = User::find(auth()->user()->id);

        if ($this->hasApplied($user, $request->post_id)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'You have already applied for this job!'
            ], 400);
        }

        $application = new JobApplication;
        $application->user_id = $user->id;
        $application->post_id = $request->post_id;
        $application->save();

        return response()->json([
            'status' => 'success',
            'message' => 'You have successfully applied for the job!'
        ], 200);
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required|min:8',
            'new_password' => 'required|min:8',
            'confirm_password' => 'required|same:new_password'
        ]);

        $user = auth()->user();
        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json([
                'status' => 'failed',
                'message' => 'Incorrect current password!'
            ], 400);
        }

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Password changed successfully!'
        ], 200);
    }

    public function deleteAccount()
    {
        $user = auth()->user();
        Auth::logout();
        $user->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Your account was deleted successfully!'
        ], 200);
    }

    public function logout()
    {
        Auth::logout();

        return response()->json([
            'status' => 'success',
            'message' => 'Logged out successfully!'
        ], 200);
    }

    protected function hasApplied($user, $postId)
    {
        return $user->applied()->where('post_id', $postId)->exists();
    }
}
