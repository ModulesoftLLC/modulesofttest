"use client";

import { useMemo, useState } from "react";
import {
  BarChart3,
  CreditCard,
  Grid3x3,
  HelpCircle,
  Images,
  LayoutTemplate,
  Mail,
  MousePointerClick,
  PanelBottom,
  PanelTop,
  Plus,
  Quote,
  Search,
  Users,
} from "lucide-react";

import type { SectionType } from "@/types";
import { sectionPresets } from "@/data/builder";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const sectionIcons: Record<
  SectionType,
  React.ComponentType<{ className?: string }>
> = {
  navbar: PanelTop,
  hero: LayoutTemplate,
  features: Grid3x3,
  stats: BarChart3,
  gallery: Images,
  testimonials: Quote,
  pricing: CreditCard,
  cta: MousePointerClick,
  faq: HelpCircle,
  team: Users,
  contact: Mail,
  footer: PanelBottom,
};

const groups: { label: string; types: SectionType[] }[] = [
  { label: "Layout", types: ["navbar", "hero", "footer"] },
  { label: "Content", types: ["features", "stats", "gallery", "team", "faq"] },
  { label: "Conversion", types: ["testimonials", "pricing", "cta", "contact"] },
];

const labelByType = new Map<SectionType, string>(
  sectionPresets.map((preset) => [preset.type, preset.label])
);

export function ComponentsPanel({
  onAdd,
}: {
  onAdd: (type: SectionType) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        types: group.types.filter((type) => {
          if (!q) return true;
          const label = labelByType.get(type) ?? type;
          return label.toLowerCase().includes(q) || type.includes(q);
        }),
      }))
      .filter((group) => group.types.length > 0);
  }, [query]);

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-card/50">
      <div className="space-y-2.5 border-b border-border p-3">
        <div>
          <p className="text-sm font-semibold">Blocks</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Click a block to add it to the page.
          </p>
        </div>
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blocks…"
            className="h-8 pl-8 text-sm"
          />
        </div>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto p-3">
        {filteredGroups.map((group) => (
          <div key={group.label} className="space-y-1.5">
            <p className="px-1 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              {group.label}
            </p>
            {group.types.map((type) => {
              const Icon = sectionIcons[type];
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => onAdd(type)}
                  className={cn(
                    "group flex w-full items-center gap-2.5 rounded-lg border border-border bg-secondary/40 px-2.5 py-2 text-left",
                    "transition-colors duration-200 hover:border-indigo-500/40 hover:bg-secondary/70"
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-indigo-400">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex-1 truncate text-sm">
                    {labelByType.get(type) ?? type}
                  </span>
                  <Plus className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-indigo-400" />
                </button>
              );
            })}
          </div>
        ))}

        {filteredGroups.length === 0 && (
          <p className="px-1 py-8 text-center text-xs text-muted-foreground">
            No blocks match “{query.trim()}”.
          </p>
        )}
      </div>
    </aside>
  );
}
