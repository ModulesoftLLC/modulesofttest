"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Monitor,
  Smartphone,
  Tablet,
  type LucideIcon,
} from "lucide-react";
import { categoryLabel } from "@/data/categories";
import { cn } from "@/lib/utils";
import type { Template, Viewport } from "@/types";

const viewports: { id: Viewport; icon: LucideIcon; label: string; width: string }[] =
  [
    { id: "desktop", icon: Monitor, label: "Desktop", width: "100%" },
    { id: "tablet", icon: Tablet, label: "Tablet", width: "768px" },
    { id: "mobile", icon: Smartphone, label: "Mobile", width: "390px" },
  ];

export function PreviewFrame({ template }: { template: Template }) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const activeWidth =
    viewports.find((v) => v.id === viewport)?.width ?? "100%";

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar */}
      <header className="glass relative z-10 flex h-14 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/templates/${template.slug}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-indigo-500/40 hover:text-foreground"
            aria-label="Back to template details"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight">
              {template.name}
            </p>
            <p className="hidden truncate text-xs text-muted-foreground sm:block">
              Live preview
            </p>
          </div>
        </div>

        {/* Viewport switcher */}
        <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-secondary/60 p-1">
          {viewports.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setViewport(id)}
              aria-label={`${label} viewport`}
              aria-pressed={viewport === id}
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-colors",
                viewport === id
                  ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>

        <Link
          href={`/builder?template=${template.slug}`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-4 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:from-indigo-400 hover:to-violet-400"
        >
          <span className="hidden sm:inline">Use this template</span>
          <span className="sm:hidden">Use</span>
          <ArrowUpRight className="size-4" />
        </Link>
      </header>

      {/* Canvas */}
      <div className="bg-grid flex-1 overflow-y-auto bg-secondary/30 px-4 py-8 sm:px-8">
        <motion.div
          animate={{ width: activeWidth }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-full overflow-hidden rounded-xl border border-border shadow-2xl shadow-black/40"
          style={{ width: activeWidth }}
        >
          <DemoSite template={template} viewport={viewport} />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Generated demo site — a fake render built from the template palette */
/* ------------------------------------------------------------------ */

function DemoSite({
  template,
  viewport,
}: {
  template: Template;
  viewport: Viewport;
}) {
  const { from, to, surface } = template.palette;
  const compact = viewport === "mobile";
  const gradient = `linear-gradient(100deg, ${from}, ${to})`;
  const gradientText = {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as const;

  const cols =
    viewport === "desktop"
      ? "grid-cols-3"
      : viewport === "tablet"
        ? "grid-cols-2"
        : "grid-cols-1";

  const stats = [
    { value: "12k+", label: "Happy customers" },
    { value: "98%", label: "Satisfaction rate" },
    { value: "150+", label: "Projects shipped" },
    { value: "24/7", label: "Support coverage" },
  ];

  const navLinks = ["Home", "About", "Services", "Contact"];

  return (
    <div
      className="text-white"
      style={{ backgroundColor: surface }}
      aria-label={`${template.name} demo preview`}
    >
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <span className={cn("font-bold", compact ? "text-sm" : "text-base")}>
          <span style={gradientText}>{template.name}</span>
        </span>
        {!compact && (
          <div className="flex items-center gap-5 text-xs text-white/60">
            {navLinks.map((link) => (
              <span key={link} className="transition-colors hover:text-white">
                {link}
              </span>
            ))}
          </div>
        )}
        <span
          className="rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
          style={{ background: gradient }}
        >
          Get started
        </span>
      </nav>

      {/* Hero */}
      <section
        className={cn(
          "relative overflow-hidden text-center",
          compact ? "px-5 py-14" : "px-10 py-24"
        )}
      >
        <div
          className="absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: gradient }}
        />
        <div className="relative">
          <p
            className="mx-auto mb-4 w-fit rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-white/70"
          >
            {categoryLabel(template.category)}
          </p>
          <h1
            className={cn(
              "mx-auto max-w-2xl font-semibold leading-tight tracking-tight",
              compact ? "text-2xl" : "text-5xl"
            )}
          >
            <span style={gradientText}>{template.tagline}</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-white/60",
              compact ? "text-xs" : "text-base"
            )}
          >
            Everything a modern {categoryLabel(template.category).toLowerCase()}{" "}
            site needs — designed once, polished everywhere, and ready to launch
            the moment you are.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span
              className={cn(
                "rounded-full font-medium text-white",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
              style={{ background: gradient }}
            >
              Start today
            </span>
            <span
              className={cn(
                "rounded-full border border-white/20 font-medium text-white/80",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
            >
              Learn more
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <h2
          className={cn(
            "mb-2 text-center font-semibold",
            compact ? "text-lg" : "text-2xl"
          )}
        >
          Built for the way you work
        </h2>
        <p
          className={cn(
            "mx-auto mb-10 max-w-md text-center text-white/50",
            compact ? "text-xs" : "text-sm"
          )}
        >
          Six purpose-built sections, each tuned for this industry.
        </p>
        <div className={cn("grid gap-4", cols)}>
          {template.features.slice(0, 6).map((feature, i) => (
            <div
              key={feature}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div
                className="mb-3 flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: gradient, opacity: 1 - i * 0.06 }}
              >
                {i + 1}
              </div>
              <p
                className={cn(
                  "font-medium",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                {feature}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-white/45",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                Pre-designed, responsive, and ready to make your own.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section
        className={cn(
          "border-y border-white/10 bg-white/[0.03]",
          compact ? "px-5 py-10" : "px-10 py-14"
        )}
      >
        <div
          className={cn(
            "grid gap-8 text-center",
            compact ? "grid-cols-2" : "grid-cols-4"
          )}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                className={cn(
                  "font-semibold",
                  compact ? "text-xl" : "text-3xl"
                )}
                style={gradientText}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "mt-1 text-white/50",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <h2
          className={cn(
            "mb-8 text-center font-semibold",
            compact ? "text-lg" : "text-2xl"
          )}
        >
          A look inside
        </h2>
        <div
          className={cn(
            "grid gap-4",
            compact ? "grid-cols-2" : "grid-cols-3"
          )}
        >
          {[35, 120, 210, 300, 60, 160].map((angle, i) => (
            <div
              key={i}
              className={cn(
                "rounded-xl border border-white/10",
                compact ? "h-24" : "h-36",
                i === 5 && compact && "hidden"
              )}
              style={{
                background: `linear-gradient(${angle}deg, ${from}${i % 2 === 0 ? "cc" : "80"}, ${to}${i % 2 === 0 ? "80" : "cc"})`,
                opacity: 0.75 - (i % 3) * 0.12,
              }}
            />
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section
        className={cn(
          "border-t border-white/10",
          compact ? "px-5 py-12" : "px-10 py-20"
        )}
      >
        <figure className="mx-auto max-w-2xl text-center">
          <blockquote
            className={cn(
              "text-balance font-medium leading-relaxed",
              compact ? "text-sm" : "text-xl"
            )}
          >
            “We launched in a weekend and it still looks like a six-figure
            build. Clients keep asking who designed it.”
          </blockquote>
          <figcaption className="mt-5 flex items-center justify-center gap-3">
            <span
              className="flex size-9 items-center justify-center rounded-full text-xs font-bold text-white"
              style={{ background: gradient }}
            >
              JB
            </span>
            <span className="text-left">
              <span
                className={cn(
                  "block font-medium",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                Jordan Blake
              </span>
              <span
                className={cn(
                  "block text-white/50",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                Founder, Northwind Co.
              </span>
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Footer */}
      <footer
        className={cn(
          "border-t border-white/10 bg-black/20",
          compact ? "px-5 py-8" : "px-10 py-12"
        )}
      >
        <div
          className={cn(
            "flex gap-8",
            compact ? "flex-col" : "items-start justify-between"
          )}
        >
          <div>
            <span
              className={cn("font-bold", compact ? "text-sm" : "text-base")}
              style={gradientText}
            >
              {template.name}
            </span>
            <p
              className={cn(
                "mt-2 max-w-xs text-white/45",
                compact ? "text-[0.65rem]" : "text-xs"
              )}
            >
              {template.tagline}
            </p>
          </div>
          <div className={cn("flex gap-10", compact && "gap-8")}>
            {["Product", "Company", "Legal"].map((col) => (
              <div key={col} className="space-y-2">
                <p
                  className={cn(
                    "font-medium text-white/80",
                    compact ? "text-[0.7rem]" : "text-xs"
                  )}
                >
                  {col}
                </p>
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full bg-white/15"
                    style={{ width: `${52 - i * 10}px` }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        <p
          className={cn(
            "mt-8 border-t border-white/10 pt-5 text-white/35",
            compact ? "text-[0.6rem]" : "text-xs"
          )}
        >
          © 2026 {template.name}. Built with MODULESOFT.
        </p>
      </footer>
    </div>
  );
}
