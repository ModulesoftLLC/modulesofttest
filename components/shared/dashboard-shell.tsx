"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ExternalLink,
  Menu,
  Search,
  type LucideIcon,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { initials } from "@/lib/format";
import { cn } from "@/lib/utils";

export interface DashboardNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

function SidebarNav({
  items,
  pathname,
  basePath,
  onNavigate,
}: {
  items: DashboardNavItem[];
  pathname: string;
  basePath: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-1 flex-col gap-1 px-3">
      {items.map((item) => {
        const active =
          item.href === basePath
            ? pathname === basePath
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
              active
                ? "bg-sidebar-accent font-medium text-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
            )}
          >
            <item.icon
              className={cn("size-4", active && "text-indigo-400")}
            />
            {item.label}
            {item.badge !== undefined && item.badge > 0 && (
              <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-semibold text-white">
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Shared sidebar-plus-topbar chrome for the user dashboard and admin panel.
 */
export function DashboardShell({
  items,
  basePath,
  title,
  userName,
  userDetail,
  children,
}: {
  items: DashboardNavItem[];
  basePath: string;
  title: string;
  userName: string;
  userDetail: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarInner = (onNavigate?: () => void) => (
    <>
      <div className="px-6 py-5">
        <Logo />
        <p className="mt-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {title}
        </p>
      </div>
      <SidebarNav
        items={items}
        pathname={pathname}
        basePath={basePath}
        onNavigate={onNavigate}
      />
      <div className="border-t border-sidebar-border p-4">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
        >
          <ExternalLink className="size-4" />
          Вэбсайт руу буцах
        </Link>
        <div className="mt-2 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2.5">
          <Avatar className="size-8">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-semibold text-white">
              {initials(userName)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{userName}</p>
            <p className="truncate text-xs text-muted-foreground">{userDetail}</p>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar lg:flex">
        {sidebarInner()}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur lg:px-8">
          <Sheet>
            <SheetTrigger
              className="lg:hidden"
              render={
                <Button
                variant="ghost"
                size="icon"
                aria-label="Навигаци нээх"
              >
                  <Menu className="size-5" />
                </Button>
              }
            />
            <SheetContent side="left" className="w-72 p-0">
              <SheetHeader className="sr-only">
                <SheetTitle>{title} navigation</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">{sidebarInner()}</div>
            </SheetContent>
          </Sheet>

          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Хайх…"
              className="h-9 border-border bg-secondary/50 pl-9"
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Мэдэгдлүүд"
            >
              <Bell className="size-4" />
              <span className="absolute right-2 top-2 size-2 rounded-full bg-indigo-500" />
            </Button>
            <Avatar className="size-8">
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-semibold text-white">
                {initials(userName)}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
