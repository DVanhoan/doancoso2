<?php


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AccountController;
use App\Http\Controllers\Api\AuthorController;
use App\Http\Controllers\Api\CompanyController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\JobController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SavedJobController;
use App\Http\Controllers\Api\AuthController;

// Auth
use Illuminate\Support\Facades\Auth;

Route::prefix('v1')->group(function () {

    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
    Route::get('me', [AuthController::class, 'me'])->middleware('auth:api');
    Route::post('logout', [AuthController::class, 'logout'])->middleware('auth:api');


    // Các route public
    Route::get('/home', [PostController::class, 'index'])->name('api.post.index')->middleware('auth:api');
    Route::get('/job/{job}', [PostController::class, 'show'])->name('api.post.show');
    Route::get('/employer/{employer}', [AuthorController::class, 'employer'])->name('api.account.employer');
    Route::get('/search', [JobController::class, 'index'])->name('api.job.index');

    // Các route yêu cầu authentication
    Route::middleware('auth:api')->prefix('account')->group(function () {
        // AccountController routes
        Route::post('logout', [AccountController::class, 'logout'])->name('api.account.logout');
        Route::get('overview', [AccountController::class, 'index'])->name('api.account.index');
        Route::get('deactivate', [AccountController::class, 'deactivateView'])->name('api.account.deactivate');
        Route::put('change-password', [AccountController::class, 'changePassword'])->name('api.account.changePassword');
        Route::delete('delete', [AccountController::class, 'deleteAccount'])->name('api.account.delete');

        // SavedJobs routes
        Route::get('my-saved-jobs', [SavedJobController::class, 'index'])->name('api.savedJob.index');
        Route::post('my-saved-jobs/{id}', [SavedJobController::class, 'store'])->name('api.savedJob.store');
        Route::delete('my-saved-jobs/{id}', [SavedJobController::class, 'destroy'])->name('api.savedJob.destroy');

        // Apply job routes
        Route::get('apply-job', [AccountController::class, 'applyJobView'])->name('api.account.applyJob');
        Route::post('apply-job', [AccountController::class, 'applyJob'])->name('api.account.applyJob');

        // Author routes
        Route::middleware(['role:author'])->group(function () {
            Route::get('author-section', [AuthorController::class, 'authorSection'])->name('api.account.authorSection');

            // Job application routes
            Route::get('job-application/{id}', [JobApplicationController::class, 'show'])->name('api.jobApplication.show');
            Route::delete('job-application', [JobApplicationController::class, 'destroy'])->name('api.jobApplication.destroy');
            Route::get('job-application', [JobApplicationController::class, 'index'])->name('api.jobApplication.index');

            // Post routes
            Route::post('post', [PostController::class, 'store'])->name('api.post.store');
            Route::put('post/{post}', [PostController::class, 'update'])->name('api.post.update');
            Route::delete('post/{post}', [PostController::class, 'destroy'])->name('api.post.destroy');

            // Company routes
            Route::post('company', [CompanyController::class, 'store'])->name('api.company.store');
            Route::put('company/{id}', [CompanyController::class, 'update'])->name('api.company.update');
            Route::delete('company', [CompanyController::class, 'destroy'])->name('api.company.destroy');
        });

        // User role routes
        Route::middleware(['role:user'])->group(function () {
            Route::post('become-employer', [AccountController::class, 'becomeEmployer'])->name('api.account.becomeEmployer');
        });
    });
});
