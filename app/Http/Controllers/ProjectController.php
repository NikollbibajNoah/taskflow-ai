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

    public function show()
    {

    }

    public function store(ProjectStoreRequest $request)
    {
        $data = $request->validated();

        $data['owner_id'] = $request->user()->id;

        $data['is_active'] = ($data['is_active'] ?? 'active') === 'active';

        $created = $this->projectService->create($data);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Project '{$created->name}' created successfully.",
        ]);

        return redirect()->route('projects.index');
    }
}
