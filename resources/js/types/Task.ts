import type { TaskPriority } from '@/types/TaskPriority';
import type { TaskStatus } from '@/types/TaskStatus';

export type Task = {
    id: number;

    project_id: number;

    task_number: string;
    sequence_number: number;

    name: string;
    description: string | null;

    status: TaskStatus;
    priority: TaskPriority;

    assigned_to: number | null;
    created_by: number;

    due_date: string | null;

    position: number;

    created_at: string;
    updated_at: string;

    deleted_at: string | null;
};
