import Navigation from '@/components/navigation';
import ThemeProvider from '@/components/theme-provider';
import Toaster from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Coastline',
  description: 'Connect with verified businesses and traders across Sri Lanka',
  openGraph: {
    title: 'Coastline - Sri Lankan Business Marketplace',
    description: 'Connect with verified businesses and traders across Sri Lanka. Join thousands of Sri Lankan businesses already on our platform.',
    type: 'website',
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Coastline - Sri Lankan Business Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Coastline - Sri Lankan Business Marketplace',
    description: 'Connect with verified businesses and traders across Sri Lanka. Join thousands of Sri Lankan businesses already on our platform.',
    images: [`${siteUrl}/og-image.jpg`],
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex relative flex-col min-h-screen">
            <Navigation />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
