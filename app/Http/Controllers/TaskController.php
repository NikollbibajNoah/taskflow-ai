<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskStoreRequest;
use App\Models\Project;
use App\Models\Task;
use App\Services\TaskService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{

    public function __construct(private TaskService $taskService) {}

    public function show(Project $project, Task $task)
    {
        dd($project, $task);
//        return Inertia::render('Projects/Show', [
//            'project' => $project,
//            'modalTask' => $task,
//        ]);
    }

    public function store(TaskStoreRequest $request, Project $project)
    {
        $this->taskService->createForProject(
            $project,
            $request->validated(),
            auth()->user()
        );

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => "Task created successfully",
        ]);

        return back();
    }
}
