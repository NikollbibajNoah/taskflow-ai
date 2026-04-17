import { Link } from '@inertiajs/react';
import {
    Archive,
    MoreHorizontal,
    Pencil,
    Trash,
} from 'lucide-react';
import React from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { initials } from '@/lib/utils';
import { show as ProjectShow, edit as projectsEdit } from '@/routes/projects';
import type { Project } from '@/types/Project';

type ProjectCardProps = {
    project: Project;
}

export const ProjectCard:React.FC<ProjectCardProps> = ({ project }) => {
    return(
        <>
            <Link href={ProjectShow(project.id)}>
                <Card
                    key={project.name}
                    className="group cursor-pointer transition-all hover:border-primary/30 hover:shadow-md"
                >
                    <CardContent className="space-y-4 p-5">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold transition-colors group-hover:text-primary">
                                    {project.name}
                                </h3>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    {project.description}
                                </p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <MoreHorizontal className="mx-auto size-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                                    align="end"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href={projectsEdit(project.id)} className="w-full flex items-center">
                                                <Pencil className="mr-2" />
                                                Edit
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    {/*<DropdownMenuGroup>*/}
                                    {/*    <DropdownMenuItem>*/}
                                    {/*        <Archive className="mr-2" />*/}
                                    {/*        Archive*/}
                                    {/*    </DropdownMenuItem>*/}
                                    {/*</DropdownMenuGroup>*/}
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem className="text-red-500">
                                            <Trash className="mr-2 text-inherit" />
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        {/*<div className="space-y-1.5">*/}
                        {/*    <div className="flex justify-between text-xs">*/}
                        {/*        <span className="text-muted-foreground">{project.tasks} tasks</span>*/}
                        {/*        <span className="font-medium">{project.progress}%</span>*/}
                        {/*    </div>*/}
                        {/*    /!*<Progress value={project.progress} className="h-1.5" />*!/*/}
                        {/*</div>*/}
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                <Avatar className="h-7 w-7 border-2 border-card">
                                    <AvatarFallback className="bg-primary/20 text-[9px] text-primary">
                                        {project.owner
                                            ? initials(project.owner.name)
                                            : '?'}
                                    </AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}