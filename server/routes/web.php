<?php

use Illuminate\Support\Facades\Route;
use RealRashid\SweetAlert\Facades\Alert;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AuthorController;
use App\Http\Controllers\Admin\CompanyCategoryController;
use App\Http\Controllers\Admin\CompanyController;

Route::get("/", function () {
    return view("welcome");
});

Route::get('/login', function () {
    return "login";
})->name('login');

// Route::get('/', [PostController::class, 'index'])->name('post.index');
// Route::get('/job/{job}', [PostController::class, 'show'])->name('post.show');
// Route::get('employer/{employer}', [AuthorController::class, 'employer'])->name('account.employer');


Route::middleware('auth')->prefix('account')->group(function () {
    Route::middleware(['role:admin'])->group(function () {
        Route::get('dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::get('view-all-users', [AdminController::class, 'viewAllUsers'])->name('admin.viewAllUsers');
        Route::delete('view-all-users', [AdminController::class, 'destroyUser'])->name('admin.destroyUser');

        // Category routes
        // Route::get('category/{category}/edit', [CompanyCategoryController::class, 'edit'])->name('category.edit');
        // Route::post('category', [CompanyCategoryController::class, 'store'])->name('category.store');
        // Route::put('category/{id}', [CompanyCategoryController::class, 'update'])->name('category.update');
        // Route::delete('category/{id}', [CompanyCategoryController::class, 'destroy'])->name('category.destroy');
    });
});
