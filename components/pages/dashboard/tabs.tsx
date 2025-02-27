import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DashboardTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export default function DashboardTabs({
  defaultValue,
  children,
}: DashboardTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="w-full">
      <TabsList className="w-full overflow-x-auto grid grid-cols-4">
        <TabsTrigger value="overview" className="shrink-0">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" className="shrink-0">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" className="shrink-0">
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" className="shrink-0">
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        {children}
      </TabsContent>
    </Tabs>
  );
}
