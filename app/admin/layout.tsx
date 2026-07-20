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
  { href: "/admin", label: "Тойм", icon: LayoutDashboard },
  { href: "/admin/analytics", label: "Аналитик", icon: LineChart },
  { href: "/admin/orders", label: "Захиалгууд", icon: Package, badge: pendingOrders },
  { href: "/admin/templates", label: "Загварууд", icon: LayoutTemplate },
  { href: "/admin/users", label: "Хэрэглэгчид", icon: Users },
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
      title="Админ"
      userName="Ж. Золбаяр"
      userDetail="Администратор"
    >
      {children}
    </DashboardShell>
  );
}
