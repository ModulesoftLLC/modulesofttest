"use client";

import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TemplateThumbnail } from "@/components/shared/template-thumbnail";
import { categoryLabel } from "@/data/categories";
import { formatCurrency } from "@/lib/format";
import type { Template } from "@/types";

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Link
      href={`/templates/${template.slug}`}
      className="card-hover group block overflow-hidden rounded-xl border border-border bg-card"
    >
      <div className="relative">
        <TemplateThumbnail template={template} className="aspect-[4/3]" />
        <div className="absolute left-3 top-3 flex gap-2">
          {template.isNew && (
            <Badge className="border-0 bg-indigo-500 text-white">Шинэ</Badge>
          )}
          {template.isFeatured && (
            <Badge className="border-0 bg-white/10 text-white backdrop-blur">
              Онцлох
            </Badge>
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black">
            Загвар үзэх <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate font-semibold">{template.name}</h3>
            <p className="mt-0.5 truncate text-sm text-muted-foreground">
              {template.tagline}
            </p>
          </div>
          <span className="shrink-0 font-semibold text-indigo-400">
            {template.price === 0 ? "Үнэгүй" : formatCurrency(template.price)}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="rounded-full border border-border px-2.5 py-0.5">
            {categoryLabel(template.category)}
          </span>
          <span className="flex items-center gap-1">
            <Star className="size-3.5 fill-amber-400 text-amber-400" />
            {template.rating}
            <span className="text-muted-foreground/60">
              ({template.reviewCount})
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
