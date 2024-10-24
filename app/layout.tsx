import { Navigation } from '@/components/navigation';
import { SupabaseProvider } from '@/components/providers/supabase-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Coastline',
  description: 'A full-featured web application with Next.js and Supabase',
  openGraph: {
    title: 'Coastline',
    description: 'A full-featured web application with Next.js and Supabase',
    type: 'website',
    url: 'https://your-domain.com',
    images: [
      {
        url: 'https://your-domain.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Coastline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coastline',
    description: 'A full-featured web application with Next.js and Supabase',
    images: ['https://your-domain.com/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SupabaseProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="flex relative flex-col min-h-screen">
              <Navigation />
              <main className="flex-1">{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
