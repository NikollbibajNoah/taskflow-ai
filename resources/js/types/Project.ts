import type { User } from '@/types/User';

export type Project = {
    id: number;

    name: string;
    description: string | null;

    owner_id: number;
    owner?: User;

    key: string;

    is_active: boolean;

    created_at: string;
    updated_at: string;

    deleted_at: string | null;
};