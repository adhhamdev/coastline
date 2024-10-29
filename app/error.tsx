'use client';

import { Button } from '@/components/ui/button';
import { RefreshCcw } from 'lucide-react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            <h2 className="text-2xl font-semibold">Something went wrong!</h2>
            <p className="mt-2 text-muted-foreground">
                {error.message || 'An error occurred while loading this page.'}
            </p>
            <Button onClick={reset} className="mt-8">
                <RefreshCcw className="mr-2 w-4 h-4" />
                Try again
            </Button>
        </div>
    );
} 