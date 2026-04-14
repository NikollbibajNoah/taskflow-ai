<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectStoreRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function __construct(protected ProjectService $projectService) {}

    public function index()
    {
        $projects = $this->projectService->getAll();

        return Inertia::render('Projects/Index', compact('projects'));
    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();

        dd($data);
//        $created = $this->projectService->create();

        return redirect()
            ->route('projects.index')
            ->with('success', 'Project created successfully.');
    }
}
