import MainFeed from "@/components/pages/feed/main-feed";
import SideNavbar from "@/components/pages/feed/side-navbar";
import SideTrends from "@/components/pages/feed/side-trends";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed | Coastline",
  description: "Stay updated with the latest posts from your network",
};

export default async function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-[48px_1fr_1fr] lg:grid-cols-[200px_1fr_1fr] gap-5 md:p-4 lg:w-4/5">
        <SideNavbar />
        <main className="min-h-screen md:border-x">
          <MainFeed>{children}</MainFeed>
        </main>
        <SideTrends />
      </div>
    </div>
  );
}
