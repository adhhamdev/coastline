import ThemeProvider from "@/components/common/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Coastline",
  description: "Connect with verified businesses and traders across Sri Lanka",
  applicationName: "Coastline",
  keywords: [
    "Sri Lankan marketplace",
    "business network",
    "gem trading",
    "fishing industry",
    "local businesses",
    "B2B platform",
    "Sri Lanka commerce",
    "wholesale trading",
    "business connections",
    "verified traders",
    "Sri Lankan gems",
    "fishing community",
    "business directory",
    "online marketplace",
    "trade network",
  ],
  authors: [{ name: "Adhham Safwan", url: "https://adhham.me" }],
  creator: "Adhham Safwan",
  publisher: "Adhham Safwan",
  openGraph: {
    title: "Coastline - Sri Lankan Business Marketplace",
    description:
      "Connect with verified businesses and traders across Sri Lanka. Join thousands of Sri Lankan businesses already on our platform.",
    type: "website",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Coastline - Sri Lankan Business Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Coastline - Sri Lankan Business Marketplace",
    description:
      "Connect with verified businesses and traders across Sri Lanka. Join thousands of Sri Lankan businesses already on our platform.",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
