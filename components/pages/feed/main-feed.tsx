import { Separator } from "@/components/ui/separator";
import { TabNavItem } from "./tab-nav-item";

export default async function MainFeed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen md:border-x">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between p-1">
          <div className="w-full">
            <nav className="grid w-full grid-cols-2 gap-2 p-1 rounded-lg bg-background/80">
              <TabNavItem href="/" label="For You" />
              <TabNavItem href="/following" label="Following" />
            </nav>
          </div>
        </div>
        <Separator />
        {children}
      </div>
    </main>
  );
}
