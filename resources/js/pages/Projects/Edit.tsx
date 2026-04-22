import { Head, Link, useForm } from '@inertiajs/react';
import { AlertTriangle, ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import InputError from '@/components/input-error';
import { MainContent } from '@/components/main-content';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
    show as projectsShow,
    index as projectsIndex,
    destroy as projectsDestroy
} from '@/routes/projects';
import type { Project } from '@/types/Project';

type ProjectEditProps = {
    project: Project;
}

type Section = {
    id: string;
    label: string;
};

const sections: Section[] = [
    { id: "general", label: "General" },
    { id: "danger", label: "Danger Zone" },
];

type DeleteConfirmationProps = {
    name: string;
}

export default function ProjectEdit({ project }: ProjectEditProps) {
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
    const [active, setActive] = useState<string>("general");
    const { data, setData, delete: destroy, processing, errors } = useForm<DeleteConfirmationProps>({ name: ''});

    const submit = () => {
        destroy(projectsDestroy({ project: project.id }).url, {
            onSuccess: () => {
                setDeleteDialogOpen(false);
            }
        });
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

                if (visible) setActive(visible.target.id);
            },
            { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
        );
        sections.forEach((s) => {
            const el = document.getElementById(s.id);

            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const containerRef = useRef<HTMLDivElement>(null);


    const scrollTo = (id: string) => {
        const el = document.getElementById(id);

        if (!el) return;

        const top = el.getBoundingClientRect().top + window.scrollY - 80;

        window.scrollTo({ top, behavior: "smooth" });
    };

    return(
        <>
            <Head title="Project edit" />
            <MainContent>

                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                        <Link href={projectsShow(project.id)}>
                            <Button variant="ghost" size="icon" className="mt-0.5">
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        </Link>
                        <div>
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
                                <p className="text-muted-foreground text-sm mt-0.5">
                                    Manage settings for <span className="text-foreground font-medium">{project.name}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">

                    {/* Sticky side nav */}
                    <aside className="lg:sticky lg:top-6 lg:self-start">
                        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                            {sections.map((s: Section) => (
                                <button
                                    key={s.id}
                                    onClick={() => scrollTo(s.id)}
                                    className={cn(
                                        "text-left px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                                        active === s.id
                                            ? "bg-accent text-foreground"
                                            : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                                    )}
                                >
                                    {s.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Sections */}
                    <div ref={containerRef} className="space-y-16 max-w-3xl">
                        {/* General */}
                        <section id="general" className="scroll-mt-24 space-y-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Project Name</CardTitle>
                                    <CardDescription>
                                        Used to identify your project on the dashboard and in the URL.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Input defaultValue={project.name} className="max-w-md" />
                                </CardContent>
                                <CardFooter className="border-t bg-muted/30 py-3 flex justify-between items-center">
                                    {/*<p className="text-xs text-muted-foreground">Up to 32 characters.</p>*/}
                                    {/*<Button size="sm" onClick={() => toast.success("Project name saved")}>Save</Button>*/}
                                </CardFooter>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Description</CardTitle>
                                    <CardDescription>A short summary shown on the project card.</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        rows={3}
                                        className="w-full"
                                        defaultValue="Complete overhaul of the marketing site with a modern design system."
                                    />
                                </CardContent>
                                <CardFooter className="border-t bg-muted/30 py-3 flex justify-end">
                                    {/*<Button size="sm" onClick={() => toast.success("Description saved")}>Save</Button>*/}
                                </CardFooter>
                            </Card>
                        </section>

                        <Separator />

                        {/* Danger Zone */}
                        <section id="danger" className="scroll-mt-24">
                            <Card className="border-destructive/40">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2 text-destructive">
                                        <AlertTriangle className="size-6" /> Danger Zone
                                    </CardTitle>
                                    <CardDescription>
                                        These actions are permanent and cannot be undone.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-medium">Delete project</p>
                                            <p className="text-xs text-muted-foreground">
                                                Permanently delete this project and all of its data.
                                            </p>
                                        </div>
                                        <div>
                                            <Button
                                                variant="destructive"
                                                onClick={() => setDeleteDialogOpen(true)}
                                            >Delete</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </section>
                    </div>
                </div>

                <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Delete <b>{project.name}</b></DialogTitle>
                            <DialogDescription>Are You sure to delete this project? This action cannot be undone</DialogDescription>
                        </DialogHeader>
                        <div className="p-4">
                            <div className="space-y-2">
                                <div>
                                    <Label>To delete this project type: <b>{project.name}</b></Label>

                                </div>
                                <Input
                                    id="name"
                                    name="name"
                                    onChange={(e) => setData('name', e.target.value)}
                                    value={data.name}
                                />
                                <InputError message={errors.name} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                            <Button
                                disabled={processing || data.name.trim() !== project.name}
                                variant="destructive"
                                type="button"
                                onClick={submit} >{processing && <Spinner />}Delete</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </MainContent>
        </>
    )
}

ProjectEdit.layout = {
    breadcrumbs: [
        { title: "Projects", href: projectsIndex() },
        { title: "Details" },
        { title: "Settings" },
    ]
}