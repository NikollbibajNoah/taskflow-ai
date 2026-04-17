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

    public function show(Request $request, Project $project)
    {
        $tasks = $project->tasks()
            ->with(['assignee:id,name,email'])
            ->get();

        $byStatus = $tasks->groupBy('status');

        $todo = $byStatus->get('todo', collect())->values();
        $inProgress = $byStatus->get('in_progress', collect())->values();
        $review = $byStatus->get('review', collect())->values();
        $done = $byStatus->get('done', collect())->values();

        $total = $tasks->count();

        $progress = $total > 0 ? round(($done->count() / $total) * 100) : 0;

        return Inertia::render('Projects/Show', [
            'project' => $project,
            'tasks' => [
                'todo' => $todo,
                'in_progress' => $inProgress,
                'review' => $review,
                'done' => $done,
                'total' => $total,
                'progress' => $progress,
            ],
        ]);
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
