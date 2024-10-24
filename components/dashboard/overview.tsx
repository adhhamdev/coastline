'use client';

import { Overview as OverviewChart } from '@/components/dashboard/overview-chart';
import { RecentActivity } from '@/components/dashboard/recent-activity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function Overview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$45,231.89</div>
          <p className="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+2350</div>
          <p className="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+12,234</div>
          <p className="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row justify-between items-center pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">Active Now</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+573</div>
          <p className="text-xs text-muted-foreground">
            +201 since last hour
          </p>
        </CardContent>
      </Card>
      <Card className="col-span-full md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Overview</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <OverviewChart />
        </CardContent>
      </Card>
      <Card className="col-span-full md:col-span-2 lg:col-span-4">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <RecentActivity />
        </CardContent>
      </Card>
    </div>
  );
}
