<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\CompanyCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CompanyController extends Controller
{
    /**
     * API to create a company
     */
    public function create()
    {
        if (auth()->user()->company) {
            return response()->json([
                'success' => false,
                'message' => 'You already have a company!',
            ], 400); // Bad Request
        }
        
        $categories = CompanyCategory::all();
        return response()->json([
            'success' => true,
            'categories' => $categories,
        ], 200);
    }

    /**
     * Store a newly created resource in storage (API).
     */
    public function store(Request $request)
    {
        $this->validateCompany($request);

        $company = new Company();
        if ($this->companySave($company, $request)) {
            return response()->json([
                'success' => true,
                'message' => 'Company created! Now you can add posts.',
            ], 201); // Created
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to create company.',
        ], 500); // Internal Server Error
    }

    /**
     * API to edit the specified resource.
     */
    public function edit()
    {
        $company = auth()->user()->company;

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'No company found for this user.',
            ], 404);
        }

        $categories = CompanyCategory::all();
        return response()->json([
            'success' => true,
            'company' => $company,
            'categories' => $categories,
        ], 200);
    }

    /**
     * Update the specified resource in storage (API).
     */
    public function update(Request $request, $id)
    {
        $this->validateCompanyUpdate($request);

        $company = auth()->user()->company;
        if ($this->companyUpdate($company, $request)) {
            return response()->json([
                'success' => true,
                'message' => 'Company updated successfully!',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to update company.',
        ], 500);
    }

    /**
     * API to destroy the company.
     */
    public function destroy()
    {
        $company = auth()->user()->company;

        if (!$company) {
            return response()->json([
                'success' => false,
                'message' => 'No company found for this user.',
            ], 404);
        }

        Storage::delete('public/companies/logos/' . basename($company->logo));

        if ($company->delete()) {
            return response()->json([
                'success' => true,
                'message' => 'Company deleted successfully!',
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to delete company.',
        ], 500);
    }

    // Validation methods for company creation and update
    protected function validateCompany(Request $request)
    {
        return $request->validate([
            'title' => 'required|min:5',
            'description' => 'required|min:5',
            'logo' => 'required|image|max:2999',
            'category' => 'required',
            'website' => 'required|string',
            'cover_img' => 'sometimes|image|max:3999'
        ]);
    }

    protected function validateCompanyUpdate(Request $request)
    {
        return $request->validate([
            'title' => 'required|min:5',
            'description' => 'required|min:5',
            'logo' => 'sometimes|image|max:2999',
            'category' => 'required',
            'website' => 'required|string',
            'cover_img' => 'sometimes|image|max:3999'
        ]);
    }

    // Helper methods to handle saving and updating companies
    protected function companySave(Company $company, Request $request)
    {
        $company->user_id = auth()->user()->id;
        $company->title = $request->title;
        $company->description = $request->description;
        $company->company_category_id = $request->category;
        $company->website = $request->website;

        // Handle logo upload
        $fileNameToStore = $this->getFileName($request->file('logo'));
        $logoPath = $request->file('logo')->storeAs('public/companies/logos', $fileNameToStore);
        if ($company->logo) {
            Storage::delete('public/companies/logos/' . basename($company->logo));
        }
        $company->logo = 'storage/companies/logos/' . $fileNameToStore;

        // Handle cover image upload
        if ($request->hasFile('cover_img')) {
            $fileNameToStore = $this->getFileName($request->file('cover_img'));
            $coverPath = $request->file('cover_img')->storeAs('public/companies/cover', $fileNameToStore);
            if ($company->cover_img) {
                Storage::delete('public/companies/cover/' . basename($company->cover_img));
            }
            $company->cover_img = 'storage/companies/cover/' . $fileNameToStore;
        } else {
            $company->cover_img = 'nocover';
        }

        return $company->save();
    }

    protected function companyUpdate(Company $company, Request $request)
    {
        $company->user_id = auth()->user()->id;
        $company->title = $request->title;
        $company->description = $request->description;
        $company->company_category_id = $request->category;
        $company->website = $request->website;

        // Handle logo update
        if ($request->hasFile('logo')) {
            $fileNameToStore = $this->getFileName($request->file('logo'));
            $logoPath = $request->file('logo')->storeAs('public/companies/logos', $fileNameToStore);
            if ($company->logo) {
                Storage::delete('public/companies/logos/' . basename($company->logo));
            }
            $company->logo = 'storage/companies/logos/' . $fileNameToStore;
        }

        // Handle cover image update
        if ($request->hasFile('cover_img')) {
            $fileNameToStore = $this->getFileName($request->file('cover_img'));
            $coverPath = $request->file('cover_img')->storeAs('public/companies/cover', $fileNameToStore);
            if ($company->cover_img) {
                Storage::delete('public/companies/cover/' . basename($company->cover_img));
            }
            $company->cover_img = 'storage/companies/cover/' . $fileNameToStore;
        } else {
            $company->cover_img = 'nocover';
        }

        return $company->save();
    }

    // Helper method to generate file name
    protected function getFileName($file)
    {
        $fileName = $file->getClientOriginalName();
        $actualFileName = pathinfo($fileName, PATHINFO_FILENAME);
        $fileExtension = $file->getClientOriginalExtension();
        return $actualFileName . time() . '.' . $fileExtension;
    }
}
