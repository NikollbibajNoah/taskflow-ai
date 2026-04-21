<?php

namespace App\Services;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TaskService {

    public function create(array $data)
    {
        return Task::create($data);
    }

    public function createForProject(Project $project, array $validated, User $user): Task
    {
        return DB::transaction(function () use ($project, $validated, $user) {
            $nextSequence = $project->tasks()
                ->lockForUpdate()
                ->max('sequence_number');

            $nextSequence = ($nextSequence ?? 0) + 1;

            $taskNumber = sprintf('%s-%04d', $project->key, $nextSequence);

            return $project->tasks()->create([
                ...$validated,
                'sequence_number' => $nextSequence,
                'task_number' => $taskNumber,
                'created_by' => $user->id,
            ]);
        });
    }
}