import { Head, useForm } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { MainContent } from '@/components/main-content';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { Button } from '@/components/ui/button';
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
import { store as projectsStore } from '@/routes/projects';
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
    key: string;
    is_active: 'active' | 'archived';
}

const initialForm: CreateProjectFormProps = {
    name: '',
    description: '',
    key: '',
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
            <MainContent>
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
                        <ProjectCard project={p} key={p.id} />
                    ))}
                </div>
            </MainContent>

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
                            <Label htmlFor="key" mandatory>Key</Label>
                            <Input
                                className="w-32"
                                name="key"
                                id="key"
                                placeholder="PROJ-001"
                                value={data.key}
                                onChange={(e) => setData('key', e.target.value)}
                            />
                            <InputError message={errors.key} />
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
            title: "Projects",
        }
    ]
}