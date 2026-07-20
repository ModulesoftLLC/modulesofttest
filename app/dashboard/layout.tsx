"use client";

import {
  FolderKanban,
  LayoutDashboard,
  LayoutTemplate,
  MessageSquare,
  Package,
  Settings,
} from "lucide-react";
import {
  DashboardShell,
  type DashboardNavItem,
} from "@/components/shared/dashboard-shell";
import { messageThreads } from "@/data/messages";
import { currentUser } from "@/data/users";

const totalUnread = messageThreads.reduce(
  (sum, thread) => sum + thread.unreadCount,
  0
);

const navItems: DashboardNavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Projects", icon: FolderKanban },
  { href: "/dashboard/orders", label: "Orders", icon: Package },
  { href: "/dashboard/templates", label: "Templates", icon: LayoutTemplate },
  {
    href: "/dashboard/messages",
    label: "Messages",
    icon: MessageSquare,
    badge: totalUnread,
  },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      items={navItems}
      basePath="/dashboard"
      title="Client dashboard"
      userName={currentUser.name}
      userDetail="Studio plan"
    >
      {children}
    </DashboardShell>
  );
}
