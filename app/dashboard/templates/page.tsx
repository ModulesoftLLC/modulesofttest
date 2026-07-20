"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, PenTool, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TemplateCard } from "@/components/shared/template-card";
import { TemplateThumbnail } from "@/components/shared/template-thumbnail";
import { templates } from "@/data/templates";
import { cn } from "@/lib/utils";

const purchased = templates.slice(0, 3);
const recommended = templates.slice(3, 6);

export default function MyTemplatesPage() {
  const [filter, setFilter] = useState<"owned" | "all">("all");

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Миний загварууд
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Таны эзэмшдэг загварууд, дээр нь танд таалагдаж магадгүй хэдэн санал.
          </p>
        </div>
        <Tabs
          value={filter}
          onValueChange={(value) => setFilter(value as "owned" | "all")}
        >
          <TabsList>
            <TabsTrigger value="all">Бүгд</TabsTrigger>
            <TabsTrigger value="owned">Эзэмшдэг</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Purchased */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <BadgeCheck className="size-4 text-indigo-400" />
          <h2 className="font-semibold">Худалдаж авсан</h2>
          <span className="text-sm text-muted-foreground">
            {purchased.length} загвар
          </span>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {purchased.map((template) => (
            <Card key={template.id} className="gap-0 overflow-hidden py-0">
              <div className="relative">
                <TemplateThumbnail
                  template={template}
                  className="aspect-[4/3]"
                />
                <Badge className="absolute left-3 top-3 border-0 bg-emerald-500/90 text-white">
                  Эзэмшдэг
                </Badge>
              </div>
              <CardContent className="space-y-4 p-4">
                <div>
                  <h3 className="font-semibold">{template.name}</h3>
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">
                    {template.tagline}
                  </p>
                </div>
                <Link
                  href={`/builder?template=${template.slug}`}
                  className={cn(
                    buttonVariants(),
                    "w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
                  )}
                >
                  <PenTool className="size-4" />
                  Бүтээгчээр нээх
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Recommended */}
      {filter === "all" && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-400" />
            <h2 className="font-semibold">Танд санал болгох</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {recommended.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>
        </section>
      )}

      <div className="flex justify-center border-t border-border pt-6">
        <Link
          href="/templates"
          className="flex items-center gap-1.5 text-sm text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Бүх загварыг үзэх <ArrowUpRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
