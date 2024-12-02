import BottomNav from '@/components/common/bottom-nav';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className='mt-12'>
            {children}
            <BottomNav />
        </div>
    );
} 