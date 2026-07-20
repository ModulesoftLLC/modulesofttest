"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BedDouble,
  Briefcase,
  GraduationCap,
  LayoutGrid,
  Palette,
  Rocket,
  Search,
  SearchX,
  ShoppingBag,
  Sparkles,
  Stethoscope,
  UtensilsCrossed,
  X,
  type LucideIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TemplateCard } from "@/components/shared/template-card";
import { categories } from "@/data/categories";
import { templates } from "@/data/templates";
import { cn } from "@/lib/utils";
import type { TemplateCategory } from "@/types";

const categoryIcons: Record<string, LucideIcon> = {
  Briefcase,
  UtensilsCrossed,
  BedDouble,
  GraduationCap,
  Stethoscope,
  ShoppingBag,
  Palette,
  Sparkles,
  Rocket,
};

type SortKey = "popular" | "newest" | "price-asc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Popular" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "rating", label: "Rating" },
];

export function TemplateBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const [sort, setSort] = useState<SortKey>("popular");

  const hasActiveFilters = query.trim() !== "" || category !== "all";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = templates.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (q === "") return true;
      return (
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
    const sorted = [...filtered];
    switch (sort) {
      case "popular":
        sorted.sort((a, b) => b.sales - a.sales);
        break;
      case "newest":
        sorted.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
        break;
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
    }
    return sorted;
  }, [query, category, sort]);

  const resetFilters = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div>
      {/* Search + sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates, tags, industries…"
            className="h-11 rounded-lg bg-card pl-10"
            aria-label="Search templates"
          />
        </div>
        <Select
          items={sortOptions}
          value={sort}
          onValueChange={(value) => {
            if (value) setSort(value);
          }}
        >
          <SelectTrigger
            className="h-11 w-full rounded-lg bg-card sm:w-52"
            aria-label="Sort templates"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Category pills */}
      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <CategoryPill
          icon={LayoutGrid}
          label="All"
          active={category === "all"}
          onClick={() => setCategory("all")}
        />
        {categories.map((c) => {
          const Icon = categoryIcons[c.icon] ?? LayoutGrid;
          return (
            <CategoryPill
              key={c.id}
              icon={Icon}
              label={c.label}
              active={category === c.id}
              onClick={() => setCategory(c.id)}
            />
          );
        })}
      </div>

      {/* Results meta */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {results.length === templates.length
            ? `${templates.length} templates`
            : `${results.length} of ${templates.length} templates`}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors hover:border-indigo-500/40 hover:text-foreground"
          >
            <X className="size-3.5" />
            Clear filters
          </button>
        )}
      </div>

      {/* Grid */}
      {results.length > 0 ? (
        <motion.div
          layout
          className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {results.map((template) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <TemplateCard template={template} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-24 text-center"
        >
          <div className="flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
            <SearchX className="size-6 text-indigo-400" />
          </div>
          <h3 className="mt-5 text-lg font-semibold">No templates found</h3>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Nothing matches your search. Try a different keyword, or reset the
            filters to browse the full collection.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-6 inline-flex h-10 items-center justify-center rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:from-indigo-400 hover:to-violet-400"
          >
            Reset filters
          </button>
        </motion.div>
      )}
    </div>
  );
}

function CategoryPill({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        active
          ? "border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25"
          : "border-border bg-card text-muted-foreground hover:border-indigo-500/40 hover:text-foreground"
      )}
    >
      <Icon className="size-4" />
      {label}
    </button>
  );
}
