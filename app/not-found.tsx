import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-20 text-center">
            <h1 className="text-6xl font-bold text-emerald-600">404</h1>
            <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
            <p className="mt-2 text-muted-foreground">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild className="mt-8">
                <Link href="/" className="flex items-center space-x-2">
                    <Home className="w-4 h-4" />
                    <span>Return Home</span>
                </Link>
            </Button>
        </div>
    );
} 