import { Link, useForm } from '@inertiajs/react';
import { format } from "date-fns";
import {
    AlertCircle,
    ArrowLeft,
    CalendarIcon,
    CheckCircle2,
    Clock,
    FileText,
    MoreHorizontal,
    Plus,
    Settings,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import InputError from '@/components/input-error';
import { MainContent } from '@/components/main-content';
import { ProjectTasksDisplay } from '@/components/projects/ProjectTasksDisplay';
import { TaskCard } from '@/components/projects/tasks/TaskCard';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/Calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { index as projectsIndex, edit as projectsEdit } from '@/routes/projects';
import { store as projectsTasksStore } from '@/routes/projects/tasks';
import type { Project } from '@/types/Project';
import type { TaskWithAssignee } from '@/types/Task';
import type { TaskPriority } from '@/types/TaskPriority';
import type { TaskStatus } from '@/types/TaskStatus';

type TasksPayload = Record<TaskStatus, TaskWithAssignee[]> & {
    total: number;
    progress: number;
}

type ProjectShowProps = {
    project: Project;
    tasks: TasksPayload;
    modalTask?: TaskWithAssignee;
}

type CreateTaskFormProps = {
    name: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: Date | null;
    assigned_to: number | null;
}

export default function ProjectShow({ project, tasks }: ProjectShowProps) {
    const [openTaskDialog, setOpenTaskDialog] = useState<boolean>(false);

    const initalFormData: CreateTaskFormProps = {
        name: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        due_date: null,
        assigned_to: 1,
    };

    const { data, setData, post, processing, errors, reset } = useForm<CreateTaskFormProps>(initalFormData);

    const projectTasks: TaskWithAssignee[] = useMemo<TaskWithAssignee[]>(() => {
        return [
            ...tasks.todo,
            ...tasks.in_progress,
            ...tasks.review,
            ...tasks.done,
        ];
    }, [tasks]);

    const submit = () => {
        post(projectsTasksStore({ project: project.id }).url, {
            onSuccess: () => {
                setOpenTaskDialog(false);
                reset();
            }
        });
    }

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
                            <Link href={projectsEdit(project.id)} className="flex items-center gap-2">
                                <Settings />Settings
                            </Link>
                        </Button>
                        <Button size="sm" onClick={() => setOpenTaskDialog(true)}>
                            <Plus />Add Task
                        </Button>
                    </div>
                </div>

                <Dialog open={openTaskDialog} onOpenChange={setOpenTaskDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create new Task</DialogTitle>
                            <DialogDescription>Fill all details below to create your new task. Fields marked with <span className="text-red-500">*</span> must be filled out</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-2">
                            <div className="space-y-2">
                                <Label mandatory>Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Integrate AI-Solution..."
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                <InputError message={errors.name} />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    id="description"
                                    name="description"
                                    cols={20}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.description} />
                            </div>
                            <div className="space-y-2 w-1/2">
                                <Label>Status</Label>
                                <input type="hidden" name="status" value={data.status} />
                                <Select name="status" value={data.status} onValueChange={(v) => setData('status', v as TaskStatus)}>
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="todo">To Do</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="review">Review</SelectItem>
                                        <SelectItem value="done">Done</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                            <div className="space-y-2 w-1/2">
                                <Label>Priority</Label>
                                <input type="hidden" name="priority" value={data.priority} />
                                <Select name="priority" value={data.priority} onValueChange={(v) => setData('priority', v as TaskPriority)}>
                                    <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="low">Low</SelectItem>
                                        <SelectItem value="medium">Medium</SelectItem>
                                        <SelectItem value="high">High</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.priority} />
                            </div>
                            <div className="space-y-2 w-1/2">
                                <Label>Due date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !data.due_date && "text-muted-foreground",
                                        )}>
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {data.due_date ? (
                                                format(data.due_date, "PPP")
                                            ) : (
                                                <span>Select date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={data.due_date ?? undefined}
                                            fromDate={new Date()}
                                            onSelect={(d) => setData('due_date', d ?? null)}
                                            initialFocus

                                            className={cn("p-3 pointer-events-auto")}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <InputError message={errors.priority} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setOpenTaskDialog(false)}>Cancel</Button>
                            <Button disabled={processing} type="button" onClick={submit}>{processing && <Spinner />}Create</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

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
                    </CardContent>
                </Card>

                {/*tasks display*/}
                <ProjectTasksDisplay tasks={projectTasks} />
            </MainContent>
        </>
    )
}

ProjectShow.layout = {
    breadcrumbs: [
        { title: "Projects", href: projectsIndex() },
        { title: "Details" }
    ]
}