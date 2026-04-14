import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';

export function Toolbar() {
    const { theme, toggle } = useTheme();

    return (
        <>
            <div className="flex w-full justify-end">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggle}
                    className="cursor-pointer text-muted-foreground hover:text-foreground"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </Button>
            </div>
        </>
    );
}
