<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\Task;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create main user
        $admin = User::factory()->create([
            'name' => 'Noah Nikollbibaj',
            'password' => 'password',
            'email' => 'noah@example.com',
        ]);

        // 2. Create users
        $users = User::factory(5)->create();

        // 3. Create Projects
        Project::factory(3)
            ->create([
                'owner_id' => $users->random()->id,
            ])
            ->each(function ($project) use ($users) {

                // 3. Create tasks
                Task::factory(10)
                    ->create([
                        'project_id' => $project->id,
                        'assigned_to' => $users->random()->id,
                        'created_by' => $users->random()->id,
                    ])
                    ->each(function ($task, $index) use ($project) {

                        $task->update([
                            'sequence_number' => $index + 1,
                            'task_number' => $project->key . '-' . ($index + 1),
                        ]);
                    });
            });
    }
}
