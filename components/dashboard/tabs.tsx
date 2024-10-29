'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DashboardTabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export default function DashboardTabs({ defaultValue, children }: DashboardTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        {children}
      </TabsContent>
    </Tabs>
  );
}