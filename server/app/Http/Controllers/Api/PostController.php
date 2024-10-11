<?php

namespace App\Http\Controllers\Api;

use App\Events\PostViewEvent;
use App\Models\Company;
use App\Models\CompanyCategory;
use App\Models\Post;
use App\Http\Requests\PostRequest;
use App\Http\Controllers\Controller;



class PostController extends Controller
{
    public function index()
    {
        $posts = Post::latest()->take(20)->with('company')->get();
        $categories = CompanyCategory::take(5)->get();
        $topEmployers = Company::latest()->take(3)->get();

        return response()->json([
            'posts' => $posts,
            'categories' => $categories,
            'topEmployers' => $topEmployers
        ]);
    }


    public function store(PostRequest $request)
    {
        $postData = array_merge(['company_id' => auth()->user()->company->id], $request->all());

        $post = Post::create($postData);
        if ($post) {
            return response()->json([
                'status' => 'success',
                'message' => 'Post created successfully',
            ], 200);
        }
        return redirect()->back();
    }

    public function show($id)
    {
        $post = Post::findOrFail($id);

        event(new PostViewEvent($post));
        $company = $post->company()->first();

        $similarPosts = Post::whereHas('company', function ($query) use ($company) {
            return $query->where('company_category_id', $company->company_category_id);
        })->where('id', '<>', $post->id)->with('company')->take(5)->get();
        return response()->json([
            'post' => $post,
            'company' => $company,
            'similarJobs' => $similarPosts
        ]);
    }

    public function edit(Post $post)
    {
        return view('post.edit', compact('post'));
    }

    public function update(PostRequest $request, $post)
    {
        $this->requestValidate($request);
        $getPost = Post::findOrFail($post);

        $newPost = $getPost->update($request->all());
        if ($newPost) {
            return redirect()->route('account.authorSection');
        }
        return redirect()->route('post.index');
    }

    public function destroy(Post $post)
    {
        if ($post->delete()) {
            return redirect()->route('account.authorSection');
        }
        return redirect()->back();
    }
}
