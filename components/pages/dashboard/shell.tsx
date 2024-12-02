import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 rounded-lg bg-background p-4 md:p-6",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}