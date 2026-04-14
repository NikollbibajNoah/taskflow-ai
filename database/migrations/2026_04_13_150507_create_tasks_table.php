<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();

            $table->foreignId('project_id')
                ->constrained('projects')->cascadeOnDelete();

            $table->string('task_number')->unique(); // Task
            $table->integer('sequence_number');

            $table->string('name');
            $table->string('description')->nullable();

            $table->enum('status', ['todo', 'in_progress', 'review', 'done'])
                ->default('todo');

            $table->enum('priority', ['low', 'medium', 'high'])
                ->default('medium');

            $table->foreignId('assigned_to')->nullable()
                ->constrained('users')->nullOnDelete();

            $table->foreignId('created_by')
                ->constrained('users')->cascadeOnDelete();

            $table->timestamp('due_date')->nullable();

            $table->integer('position')->default(0); // For kanban

            $table->timestamps();

            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
