<?php

namespace Database\Factories;

use App\Enums\TaskPriority;
use App\Enums\TaskStatus;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'project_id' => Project::factory(),

            'task_number' => 'TMP-'.$this->faker->unique()->bothify('TMP-####??'),
            'sequence_number' => $this->faker->numberBetween(1, 10000),

            'name' => $this->faker->randomElement([
                'Fix login validation bug',
                'Implement JWT authentication',
                'Create project dashboard UI',
                'Refactor task service logic',
                'Add dark mode toggle',
                'Improve API error handling',
                'Setup Docker environment',
                'Write unit tests for task module',
                'Optimize database queries',
                'Integrate AI task generator',
            ]),
            'description' => $this->faker->paragraph(),

            'status' => $this->faker->randomElement(TaskStatus::cases()),
            'priority' => $this->faker->randomElement(TaskPriority::cases()),

            'assigned_to' => User::factory(),
            'created_by' => User::factory(),

            'due_date' => $this->faker->optional()->dateTimeBetween('now', '+1 month'),

            'position' => $this->faker->numberBetween(1, 100),
        ];
    }
}
