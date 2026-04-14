import { Form, Head, router, useForm } from '@inertiajs/react';
import { MoreHorizontal, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
// import { Progress } from '@/components/ui/progress';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { index as projectsIndex, store as projectsStore } from '@/routes/projects';
import type { Project } from '@/types/Project';

export const statusBadge = {
    todo: 'bg-muted text-muted-foreground',
    in_progress: 'bg-blue-500/15 text-blue-600',
    review: 'bg-yellow-500/15 text-yellow-700',
    done: 'bg-success/15 text-success',
};

type Props = {
    projects: Project[];
};

type CreateProjectFormProps = {
    name: string;
    description: string | undefined;
    // key: string;
    is_active: 'active' | 'archived';
}

const initials = (name?: string) =>
    name
        ? name
              .split(' ')
              .map((s) => s[0])
              .slice(0, 2)
              .join('')
              .toUpperCase()
        : '';

const initialForm: CreateProjectFormProps = {
    name: '',
    description: '',
    is_active: 'active'
};

export default function Projects({ projects }: Props) {
    const [open, setOpen] = useState<boolean>(false);
    const { data, setData, post, processing, errors, reset } = useForm<CreateProjectFormProps>(initialForm);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const submit = () => {
        post(projectsStore().url, {
            onSuccess: () => {
                setOpen(false);
                reset();
            }
        });
    };

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
                    <Button onClick={handleDialogOpen}>
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

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create new project</DialogTitle>
                        <DialogDescription>Fill all details below to create your new project. Fields marked with <span className="text-red-500">*</span> must be filled out</DialogDescription>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                        <div className="space-y-2">
                            <Label htmlFor="name" mandatory>Project name</Label>
                            <Input
                                name="name"
                                id="name"
                                placeholder="Website Redesign, Mobile App etc."
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)} />
                            <InputError message={errors.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                name="description"
                                id="description"
                                placeholder="Few words about the project..."
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="is_active" mandatory>Status</Label>
                            <input type="hidden" name="is_active" value={data.is_active} />
                            <Select name="is_active" value={data.is_active} onValueChange={(v) => setData('is_active', v as 'active' | 'archived')}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="archived">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.is_active} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                        <Button disabled={processing} type="button" onClick={submit}>{processing && <Spinner />}Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
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
