"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "/templates", label: "Загварууд" },
  { href: "/services", label: "Үйлчилгээ" },
  { href: "/portfolio", label: "Портфолио" },
  { href: "/pricing", label: "Үнэ" },
  { href: "/about", label: "Бидний тухай" },
  { href: "/blog", label: "Блог" },
  { href: "/contact", label: "Холбоо барих" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 transition-all duration-300 lg:px-6">
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-6xl items-center justify-between rounded-full px-5 transition-all duration-300",
          scrolled ? "liquid-glass-strong" : "liquid-glass"
        )}
      >
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3.5 py-2 text-sm transition-all",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/60 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full text-white/80 hover:text-white"
            render={<Link href="/dashboard" />}
          >
            Нэвтрэх
          </Button>
          <Button
            size="sm"
            className="rounded-full bg-white text-black transition-transform hover:scale-105 hover:bg-white/90 active:scale-95"
            render={<Link href="/order" />}
          >
            Төсөл эхлүүлэх
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="lg:hidden"
            render={
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                aria-label="Цэс нээх"
              >
                <Menu className="size-5" />
              </Button>
            }
          />
          <SheetContent side="right" className="w-72">
            <SheetHeader>
              <SheetTitle className="text-left text-sm tracking-[0.18em]">
                MODULE<span className="text-white/60">SOFT</span>
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
                <Button
                  variant="outline"
                  className="rounded-full"
                  render={
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                    />
                  }
                >
                  Нэвтрэх
                </Button>
                <Button
                  className="rounded-full bg-white text-black hover:bg-white/90"
                  render={
                    <Link href="/order" onClick={() => setMobileOpen(false)} />
                  }
                >
                  Төсөл эхлүүлэх
                </Button>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
