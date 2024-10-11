<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Company;
use App\Models\CompanyCategory;

class PostController extends Controller
{

    public function __construct()
    {
        
    }
    public function index()
    {
        $posts = Post::latest()->take(20)->with('company')->get();
        $categories = CompanyCategory::take(5)->get();
        $topEmployers = Company::latest()->take(3)->get();
        return view('home')->with([
            'posts' => $posts,
            'categories' => $categories,
            'topEmployers' => $topEmployers
        ]);
    }

    
}
