import { Head } from '@inertiajs/react';
import { projects } from '@/routes';

export default function Projects() {

    return(
        <>
            <Head title="Projects" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">

                <div>Projects here</div>
            </div>

        </>
    );
}

Projects.layout = {
    breadcrumbs: [
        {
            title: 'Projects',
            href: projects(),
        },
    ],
};
