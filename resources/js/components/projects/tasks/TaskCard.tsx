import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { initials } from '@/lib/utils';
import type { TaskWithAssignee } from '@/types/Task';
import type { TaskPriority } from '@/types/TaskPriority';

type TaskCardProps = {
    task: TaskWithAssignee;
    onClick?: () => void;
}

const priorityStyles = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-info/15 text-info',
    high: 'bg-destructive/15 text-destructive',
};

export function TaskCard({
    task,
    onClick,
}: TaskCardProps) {
    return (
        <Card
            className="group cursor-pointer p-3 transition-all hover:border-primary/30 hover:shadow-md"
            onClick={onClick}
        >
            <p className="text-sm leading-snug font-medium transition-colors group-hover:text-primary">
                {task.name}
            </p>
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-[11px]">{task.task_number}</span>
                    <Badge
                        variant="secondary"
                        className={`px-1.5 py-0 text-[10px] ${priorityStyles[task.priority as TaskPriority]}`}
                    >
                        {task.priority}
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    {task.assignee && (
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary/20 text-[10px] text-primary">
                                {initials(task.assignee.name)}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        </Card>
    );
}
