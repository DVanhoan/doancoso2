<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CompanyCategory;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class Admincontroller extends Controller
{
    public function dashboard()
    {
        $authors = User::role('author')->with('company')->paginate(30);
        $roles = Role::all()->pluck('name');
        $permissions = Permission::all()->pluck('name');
        $rolesHavePermissions = Role::with('permissions')->get();

        $dashCount = [];
        $dashCount['author'] = User::role('author')->count();
        $dashCount['user'] = User::role('user')->count();
        $dashCount['post'] = Post::count();
        $dashCount['livePost'] = Post::where('deadline', '>', Carbon::now())->count();

        return response()->json([
            'companyCategories' => CompanyCategory::all(),
            'dashCount' => $dashCount,
            'recentAuthors' => $authors,
            'roles' => $roles,
            'permissions' => $permissions,
            'rolesHavePermissions' => $rolesHavePermissions,
        ]);
    }
    public function viewAllUsers()
    {
        $users = User::select('id', 'name', 'email', 'created_at')->latest()->paginate(30);

        if (!$users) {
            return response()->json([
                'message' => 'No users found'
            ], 404);
        }

        return response()->json([
            'users' => $users,
            'message' => 'Users retrieved successfully'
        ], 200);
    }


    public function destroyUser(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        if ($user->delete()) {
            return response()->json([
                'message' => 'User deleted successfully'
            ], 200);
        } else {
            return response()->json([
                'message' => 'Failed to delete user'
            ], 500);
        }
    }
}
