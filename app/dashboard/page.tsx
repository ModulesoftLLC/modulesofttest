import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FolderKanban,
  LayoutTemplate,
  LifeBuoy,
  MessageSquare,
  Package,
  PanelsTopLeft,
  Plus,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { messageThreads } from "@/data/messages";
import { orders } from "@/data/orders";
import { projects, projectStatusMeta } from "@/data/projects";
import { currentUser } from "@/data/users";
import {
  formatCurrency,
  formatDate,
  formatRelativeTime,
  initials,
} from "@/lib/format";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Overview — Client dashboard | MODULESOFT",
  description: "Your projects, orders and messages at a glance.",
};

const activeProjects = projects.filter(
  (p) => p.status === "in-progress" || p.status === "in-review"
);

const openOrders = orders.filter(
  (o) =>
    o.status === "pending" ||
    o.status === "confirmed" ||
    o.status === "in-production"
);

const unreadMessages = messageThreads.reduce(
  (sum, thread) => sum + thread.unreadCount,
  0
);

const recentThreads = [...messageThreads]
  .sort(
    (a, b) =>
      new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
  )
  .slice(0, 3);

const stats = [
  {
    label: "Active projects",
    value: String(activeProjects.length),
    hint: "+1 since last month",
    icon: FolderKanban,
    iconClass: "bg-indigo-500/15 text-indigo-400",
  },
  {
    label: "Open orders",
    value: String(openOrders.length),
    hint: "2 in production",
    icon: Package,
    iconClass: "bg-violet-500/15 text-violet-400",
  },
  {
    label: "Unread messages",
    value: String(unreadMessages),
    hint: "Across your threads",
    icon: MessageSquare,
    iconClass: "bg-sky-500/15 text-sky-400",
  },
  {
    label: "Total invested",
    value: formatCurrency(currentUser.totalSpent),
    hint: "Since Nov 2025",
    icon: Wallet,
    iconClass: "bg-emerald-500/15 text-emerald-400",
  },
];

const quickActions = [
  {
    href: "/templates",
    label: "Browse templates",
    description: "Find a starting point in the marketplace",
    icon: LayoutTemplate,
  },
  {
    href: "/builder",
    label: "Open builder",
    description: "Jump straight into editing a site",
    icon: PanelsTopLeft,
  },
  {
    href: "/contact",
    label: "Contact support",
    description: "We answer within one business day",
    icon: LifeBuoy,
  },
];

export default function DashboardOverviewPage() {
  const today = formatDate(new Date().toISOString());

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Greeting */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back, Sofia
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {today} — here&rsquo;s what&rsquo;s happening across your projects.
          </p>
        </div>
        <Link
          href="/order"
          className={cn(
            buttonVariants({ size: "lg" }),
            "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
          )}
        >
          <Plus className="size-4" />
          Start a project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="gap-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <span
                className={cn(
                  "flex size-9 items-center justify-center rounded-lg",
                  stat.iconClass
                )}
              >
                <stat.icon className="size-4" />
              </span>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{stat.hint}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* Active projects */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Active projects</CardTitle>
            <Link
              href="/dashboard/projects"
              className="flex items-center gap-1 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
            >
              View all <ArrowRight className="size-3.5" />
            </Link>
          </CardHeader>
          <CardContent className="space-y-5">
            {activeProjects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                href="/dashboard/projects"
                className="group flex items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 transition-colors hover:border-indigo-500/40"
              >
                <div
                  className="size-12 shrink-0 rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${project.thumbnailPalette.from}, ${project.thumbnailPalette.to})`,
                  }}
                  aria-hidden
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{project.name}</p>
                    <Badge
                      className={cn(
                        "border-0",
                        projectStatusMeta[project.status].className
                      )}
                    >
                      {projectStatusMeta[project.status].label}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {project.client}
                  </p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <Progress
                      value={project.progress}
                      className="flex-1 [&_[data-slot=progress-indicator]]:bg-indigo-500"
                    />
                    <span className="text-xs tabular-nums text-muted-foreground">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <div className="hidden shrink-0 text-right sm:block">
                  <p className="text-xs text-muted-foreground">Due</p>
                  <p className="text-sm">{formatDate(project.dueDate)}</p>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {/* Right column */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent messages</CardTitle>
              <Link
                href="/dashboard/messages"
                className="flex items-center gap-1 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
              >
                Open inbox <ArrowRight className="size-3.5" />
              </Link>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentThreads.map((thread, index) => {
                const lastMessage =
                  thread.messages[thread.messages.length - 1];
                return (
                  <div key={thread.id}>
                    {index > 0 && <Separator className="my-1" />}
                    <Link
                      href="/dashboard/messages"
                      className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50"
                    >
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="bg-secondary text-xs font-medium">
                          {initials(thread.participant)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <p className="truncate text-sm font-medium">
                            {thread.participant}
                          </p>
                          <span className="shrink-0 text-[11px] text-muted-foreground">
                            {formatRelativeTime(thread.lastMessageAt)}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-xs text-muted-foreground">
                          {lastMessage?.preview}
                        </p>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className="group flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-indigo-500/40 hover:bg-secondary/40"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                    <action.icon className="size-4" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{action.label}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {action.description}
                    </p>
                  </div>
                  <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-indigo-400" />
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
