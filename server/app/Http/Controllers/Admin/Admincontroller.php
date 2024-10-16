<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CompanyCategory;
use App\Models\Post;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use RealRashid\SweetAlert\Facades\Alert;
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

        return view('admin.dashboard')->with([
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
        return view('admin.pages.users.index')->with([
            'users' => $users
        ]);
    }


    public function destroyUser(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        if ($user->delete()) {
            Alert::toast('Deleted Successfully!', 'danger');
            return redirect()->route('admin.pages.users.index');
        } else {
            return redirect()->back();
        }
    }
}
