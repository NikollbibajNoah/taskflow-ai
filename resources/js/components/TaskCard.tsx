import { MessageSquare, Paperclip } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { initials } from '@/lib/utils';
import type { TaskPriority } from '@/types/TaskPriority';
import type { User } from '@/types/User';

interface TaskCardProps {
    name: string;
    project_id: string;
    priority: TaskPriority;
    labels?: string[];
    assignee?: User;
    comments?: number;
    attachments?: number;
    onClick?: () => void;
}

const priorityStyles = {
    low: 'bg-muted text-muted-foreground',
    medium: 'bg-info/15 text-info',
    high: 'bg-destructive/15 text-destructive',
};

const labelColors = [
    'bg-primary/15 text-primary',
    'bg-success/15 text-success',
    'bg-warning/15 text-warning',
    'bg-info/15 text-info',
];

export function TaskCard({
    name,
    project_id,
    priority,
    labels,
    assignee,
    comments,
    attachments,
    onClick,
}: TaskCardProps) {
    return (
        <Card
            className="group cursor-pointer p-3 transition-all hover:border-primary/30 hover:shadow-md"
            onClick={onClick}
        >
            <div className="mb-2 flex flex-wrap gap-1.5">
                {labels?.map((label, i) => (
                    <Badge
                        key={label}
                        variant="secondary"
                        className={`px-1.5 py-0 text-[10px] ${labelColors[i % labelColors.length]}`}
                    >
                        {label}
                    </Badge>
                ))}
            </div>
            <p className="text-sm leading-snug font-medium transition-colors group-hover:text-primary">
                {name}
            </p>
            <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="text-[11px]">{project_id}</span>
                    <Badge
                        variant="secondary"
                        className={`px-1.5 py-0 text-[10px] ${priorityStyles[priority]}`}
                    >
                        {priority}
                    </Badge>
                </div>
                <div className="flex items-center gap-2">
                    {comments && comments > 0 && (
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                            <MessageSquare className="h-3 w-3" />
                            {comments}
                        </span>
                    )}
                    {attachments && attachments > 0 && (
                        <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                            <Paperclip className="h-3 w-3" />
                            {attachments}
                        </span>
                    )}
                    {assignee && (
                        <Avatar className="h-6 w-6">
                            <AvatarFallback className="bg-primary/20 text-[10px] text-primary">
                                {initials(assignee.name)}
                            </AvatarFallback>
                        </Avatar>
                    )}
                </div>
            </div>
        </Card>
    );
}
