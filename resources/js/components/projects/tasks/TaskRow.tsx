import { MoreHorizontal } from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { initials } from '@/lib/utils';
import type { TaskWithAssignee } from '@/types/Task';
import type { TaskPriority } from '@/types/TaskPriority';


type TaskRowProps = {
    task: TaskWithAssignee;
    onClick?: () => void;
}

const priorityStyles = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-info/15 text-info',
    high: 'bg-destructive/15 text-destructive',
};

export const TaskRow:React.FC<TaskRowProps> = ({ task, onClick }) => {
    return(
        <div onClick={onClick} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground font-mono">{task.task_number}</span>
                <span className="text-sm font-medium">{task.name}</span>
            </div>
            <div className="flex items-center gap-3">
                <Badge
                    variant="secondary"
                    className={`${priorityStyles[task.priority as TaskPriority]}`}
                >
                    {task.priority}
                </Badge>
                <Badge variant="outline" className="text-[10px] capitalize">{task.status === "in_progress" ? "In Progress" : task.status}</Badge>
                {task.assignee && (
                    <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px] bg-primary/20 text-primary">{initials(task.assignee.name)}</AvatarFallback>
                    </Avatar>
                )}
                <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreHorizontal className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}