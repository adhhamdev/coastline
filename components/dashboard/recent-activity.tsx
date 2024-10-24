'use client';

import { ScrollArea } from '@/components/ui/scroll-area';

const activities = [
  {
    id: 1,
    type: 'payment',
    description: 'Payment processed',
    amount: '+$1,999.00',
    date: '2024-01-19',
  },
  {
    id: 2,
    type: 'subscription',
    description: 'Subscription renewed',
    amount: '-$14.99',
    date: '2024-01-18',
  },
  {
    id: 3,
    type: 'refund',
    description: 'Refund processed',
    amount: '-$99.00',
    date: '2024-01-17',
  },
];

export function RecentActivity() {
  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div>
              <p className="font-medium">{activity.description}</p>
              <p className="text-sm text-muted-foreground">{activity.date}</p>
            </div>
            <p className={activity.amount.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
              {activity.amount}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}