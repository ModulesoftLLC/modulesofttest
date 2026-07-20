"use client";

import {
  LayoutDashboard,
  LayoutTemplate,
  LineChart,
  Package,
  Users,
} from "lucide-react";
import {
  DashboardShell,
  type DashboardNavItem,
} from "@/components/shared/dashboard-shell";
import { orders } from "@/data/orders";

const pendingOrders = orders.filter((order) => order.status === "pending").length;

const navItems: DashboardNavItem[] = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Analytics", icon: LineChart },
  { href: "/admin/orders", label: "Orders", icon: Package, badge: pendingOrders },
  { href: "/admin/templates", label: "Templates", icon: LayoutTemplate },
  { href: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell
      items={navItems}
      basePath="/admin"
      title="Admin"
      userName="Jonas Weber"
      userDetail="Administrator"
    >
      {children}
    </DashboardShell>
  );
}
