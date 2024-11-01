import BottomNav from '@/components/bottom-nav';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <>
            {children}
            <BottomNav />
        </>
    );
} 