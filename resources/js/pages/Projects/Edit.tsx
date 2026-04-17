import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
    show as projectsShow,
    index as projectsIndex,
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
    // { id: "danger", label: "Danger Zone" },
];

export default function ProjectEdit({ project }: ProjectEditProps) {
    const [active, setActive] = useState<string>("general");

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
                    <div ref={containerRef} className="space-y-8 max-w-3xl">
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
                    </div>
                </div>

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