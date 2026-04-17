import { Link } from '@inertiajs/react';
import {
    AlertCircle,
    ArrowLeft,
    CheckCircle2,
    Clock,
    FileText,
    MoreHorizontal,
    Plus,
    Settings,
} from 'lucide-react';
import { useMemo } from 'react';
import { MainContent } from '@/components/main-content';
import { TaskCard } from '@/components/TaskCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { initials } from '@/lib/utils';
import { index as projectsIndex } from '@/routes/projects';
import type { Project } from '@/types/Project';
import type { TaskWithAssignee } from '@/types/Task';
import type { TaskStatus } from '@/types/TaskStatus';

type StatusColumn = {
    key: TaskStatus;
    title: string;
    color: string;
};

const statusColumns: StatusColumn[] = [
    { key: "todo", title: "To Do", color: "bg-muted-foreground" },
    { key: "in_progress", title: "In Progress", color: "bg-info" },
    { key: "review", title: "Review", color: "bg-warning" },
    { key: "done", title: "Done", color: "bg-success" },
];

type TasksPayload = Record<TaskStatus, TaskWithAssignee[]> & {
    total: number;
    progress: number;
}

type ProjectShowProps = {
    project: Project;
    tasks: TasksPayload;
}

export default function ProjectShow({ project, tasks }: ProjectShowProps) {

    const projectTasks = useMemo<TaskWithAssignee[]>(() => {
        return [
            ...tasks.todo,
            ...tasks.in_progress,
            ...tasks.review,
            ...tasks.done,
        ];
    }, [tasks]);

    return(
        <>
            <MainContent>
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <Link href={projectsIndex()}>
                            <Button variant="ghost" size="icon" className="mt-0.5">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold tracking-tight">{project.name}</h1>
                                <Badge
                                    variant="secondary"
                                    className={project.is_active ? "bg-success/15 text-success" : "bg-muted text-muted-foreground"}
                                >
                                    {project.is_active ? "Active" : "Archived"}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground text-sm mt-1 max-w-2xl">{project.description}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                            <Settings />Settings
                        </Button>
                        <Button size="sm">
                            <Plus />Add Task
                        </Button>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                                <FileText className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tasks.todo.length}</p>
                                <p className="text-xs text-muted-foreground">Open Tasks</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-success/15 flex items-center justify-center">
                                <CheckCircle2 className="h-5 w-5 text-success" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tasks.done.length}</p>
                                <p className="text-xs text-muted-foreground">Completed</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-info/15 flex items-center justify-center">
                                <Clock className="h-5 w-5 text-info" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tasks.in_progress.length}</p>
                                <p className="text-xs text-muted-foreground">In Progress</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-4 flex items-center gap-3">
                            <div className="h-10 w-10 rounded-lg bg-warning/15 flex items-center justify-center">
                                <AlertCircle className="h-5 w-5 text-warning" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{tasks.review.length}</p>
                                <p className="text-xs text-muted-foreground">In Review</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Progress */}
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Overall Progress</span>
                            <span className="text-sm font-bold">{tasks.progress}%</span>
                        </div>
                        <Progress value={tasks.progress} className="h-2" />
                        {/*<div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">*/}
                        {/*    <span>Started {project.created}</span>*/}
                        {/*    <span>Deadline {project.deadline}</span>*/}
                        {/*</div>*/}
                    </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="board" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="board">Board</TabsTrigger>
                        <TabsTrigger value="list">List</TabsTrigger>
                        {/*<TabsTrigger value="members">Members</TabsTrigger>*/}
                        {/*<TabsTrigger value="activity">Activity</TabsTrigger>*/}
                    </TabsList>

                    {/* Board Tab */}
                    <TabsContent value="board">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                            {statusColumns.map((col) => {
                                const list = tasks[col.key];

                                return (
                                    <div key={col.key} className="space-y-3">
                                        <div className="flex items-center gap-2 px-1">
                                            <div className={`h-2 w-2 rounded-full ${col.color}`} />
                                            <h3 className="text-sm font-semibold">{col.title}</h3>
                                            <span className="text-xs text-muted-foreground ml-auto">{list.length}</span>
                                        </div>
                                        <div className="space-y-2">
                                            {list.length > 0 && list.map((task: TaskWithAssignee) => (
                                                <TaskCard key={task.id}
                                                    project_id={task.task_number}
                                                    name={task.name}
                                                    priority={task.priority}
                                                    assignee={task.assignee}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </TabsContent>

                    {/* List Tab */}
                    <TabsContent value="list">
                        <Card>
                            <CardContent className="p-0">
                                <div className="divide-y divide-border">
                                    {projectTasks.map((task: TaskWithAssignee) => (
                                        <div key={task.id} className="flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs text-muted-foreground font-mono w-16">{task.task_number}</span>
                                                <span className="text-sm font-medium">{task.name}</span>
                                                {/*<div className="flex gap-1.5">*/}
                                                {/*    {task.labels?.map((l) => (*/}
                                                {/*        <Badge key={l} variant="secondary" className="text-[10px] px-1.5 py-0">{l}</Badge>*/}
                                                {/*    ))}*/}
                                                {/*</div>*/}
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className="text-[10px] capitalize">{task.priority}</Badge>
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
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </MainContent>
        </>
    )
}