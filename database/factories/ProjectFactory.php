<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement([
                'Taskflow Web App',
                'Internal CRM System',
                'AI Task Manager',
            ]),
            'description' => $this->faker->sentence(),
            'key' => strtoupper($this->faker->unique()->lexify('???')),
            'owner_id' => User::factory(),
            'is_active' => true,
        ];
    }
}
