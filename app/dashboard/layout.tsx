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
  { href: "/dashboard", label: "Тойм", icon: LayoutDashboard },
  { href: "/dashboard/projects", label: "Төслүүд", icon: FolderKanban },
  { href: "/dashboard/orders", label: "Захиалгууд", icon: Package },
  { href: "/dashboard/templates", label: "Загварууд", icon: LayoutTemplate },
  {
    href: "/dashboard/messages",
    label: "Зурвасууд",
    icon: MessageSquare,
    badge: totalUnread,
  },
  { href: "/dashboard/settings", label: "Тохиргоо", icon: Settings },
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
      title="Хэрэглэгчийн самбар"
      userName={currentUser.name}
      userDetail="Студи багц"
    >
      {children}
    </DashboardShell>
  );
}
