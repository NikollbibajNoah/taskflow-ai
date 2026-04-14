<?php

namespace App\Services;


use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectService {

    public function getAll(): Collection
    {
        return Project::with('owner')->latest()->get();
    }

    public function getById(int $id): Project
    {
        return Project::with('tasks')->findOrFail($id);
    }

    public function create(array $data): Project
    {
        return Project::create($data);
    }
}