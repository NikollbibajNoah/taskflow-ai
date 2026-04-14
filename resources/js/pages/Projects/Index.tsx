import { Head } from '@inertiajs/react';
import { MoreHorizontal, PlusIcon } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
    name ? name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase() : '';

export default function Projects({ projects }: Props) {
    return(
        <>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                {/*Header section*/}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                        <p className="text-muted-foreground text-sm mt-1">{projects.length} projects total</p>
                    </div>
                    <Button><PlusIcon className="" />New Project</Button>
                </div>

                {/*Cards*/}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((p) => (
                        <Card key={p.name} className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
                            <CardContent className="p-5 space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold group-hover:text-primary transition-colors">{p.name}</h3>
                                        <p className="text-sm text-muted-foreground mt-0.5">{p.description}</p>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2"><MoreHorizontal /></Button>
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
                                            <AvatarFallback className="text-[9px] bg-primary/20 text-primary">{p.owner ? initials(p.owner.name) : `#${p.owner.id}`}</AvatarFallback>
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
