import React, { useMemo } from 'react';
import { TaskCard } from '@/components/projects/tasks/TaskCard';
import { TaskRow } from '@/components/projects/tasks/TaskRow';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { TaskWithAssignee } from '@/types/Task';
import type { TaskStatus } from '@/types/TaskStatus';

type ProjectTasksDisplayProps = {
    tasks: TaskWithAssignee[];
}

type TasksByStatus = Record<TaskStatus, TaskWithAssignee[]>;

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

export const ProjectTasksDisplay: React.FC<ProjectTasksDisplayProps> = ({ tasks }) => {

    const grouped = useMemo<TasksByStatus>(() => {
        const initial: TasksByStatus = {
            todo: [],
            in_progress: [],
            review: [],
            done: [],
        };

        for (const t of tasks) {
            initial[t.status].push(t);
        }

        return initial;
    }, [tasks]);

    return(
        <>
            {/* Tabs */}
            <Tabs defaultValue="board" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="board">Board</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                </TabsList>

                {/*board*/}
                <TabsContent value="board">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        {statusColumns.map((col: StatusColumn) => {
                            const list = grouped[col.key];

                            return (
                                <div key={col.key} className="space-y-3">
                                    <div className="flex items-center gap-2 px-1">
                                        <div className={`h-2 w-2 rounded-full ${col.color}`} />
                                        <h3 className="text-sm font-semibold">{col.title}</h3>
                                        <span className="text-xs text-muted-foreground ml-auto">{list.length}</span>
                                    </div>
                                    <div className="space-y-2">
                                        {list.length > 0 && list.map((task: TaskWithAssignee) => (
                                            <TaskCard
                                                key={task.id}
                                                task={task}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </TabsContent>

                {/*list*/}
                <TabsContent value="list">
                    <Card>
                        <CardContent className="p-0">
                            <div className="divide-y divide-border">
                                {tasks.map((task: TaskWithAssignee) => (
                                    <TaskRow task={task} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </>
    )
}