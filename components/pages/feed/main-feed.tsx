import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function MainFeed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen md:border-x">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between p-4">
          <Tabs defaultValue="for-you" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="following">Following</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <Separator />
        {children}
      </div>
    </main>
  );
}
