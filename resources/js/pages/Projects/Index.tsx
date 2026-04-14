import { Head } from '@inertiajs/react';
import { MoreHorizontal, PlusIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
import { index as projectsIndex } from '@/routes/projects';
import type { Project } from '@/types/Project';
import type { TaskStatus } from '@/types/TaskStatus';

export const statusBadge: Record<TaskStatus, string> = {
    todo: 'bg-muted text-muted-foreground',
    in_progress: 'bg-blue-500/15 text-blue-600',
    review: 'bg-yellow-500/15 text-yellow-700',
    done: 'bg-success/15 text-success',
};

type Props = {
    projects: Project[];
};

const initials = (name?: string) =>
    name
        ? name
              .split(' ')
              .map((s) => s[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : '';

export default function Projects({ projects }: Props) {
    return (
        <>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/*Header section*/}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">
                            Projects
                        </h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            {projects.length} projects total
                        </p>
                    </div>
                    <Button>
                        <PlusIcon className="" />
                        New Project
                    </Button>
                </div>

                {/*Cards*/}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => (
                        <Card
                            key={p.name}
                            className="group cursor-pointer transition-all hover:border-primary/30 hover:shadow-md"
                        >
                            <CardContent className="space-y-4 p-5">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold transition-colors group-hover:text-primary">
                                            {p.name}
                                        </h3>
                                        <p className="mt-0.5 text-sm text-muted-foreground">
                                            {p.description}
                                        </p>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="-mt-1 -mr-2 h-8 w-8"
                                    >
                                        <MoreHorizontal />
                                    </Button>
                                </div>
                                {/*<div className="space-y-1.5">*/}
                                {/*    <div className="flex justify-between text-xs">*/}
                                {/*        <span className="text-muted-foreground">{p.tasks} tasks</span>*/}
                                {/*        <span className="font-medium">{p.progress}%</span>*/}
                                {/*    </div>*/}
                                {/*    /!*<Progress value={p.progress} className="h-1.5" />*!/*/}
                                {/*</div>*/}
                                <div className="flex items-center justify-between">
                                    <div className="flex -space-x-2">
                                        <Avatar className="h-7 w-7 border-2 border-card">
                                            <AvatarFallback className="bg-primary/20 text-[9px] text-primary">
                                                {p.owner
                                                    ? initials(p.owner.name)
                                                    : '?'}
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
}

Projects.layout = {
    breadcrumbs: [
        {
            title: 'Projects',
            href: projectsIndex(),
        },
    ],
};
