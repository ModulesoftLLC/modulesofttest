import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Eye,
  FileText,
  Star,
  TrendingUp,
  User,
  Wand2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { TemplateCard } from "@/components/shared/template-card";
import { TemplateThumbnail } from "@/components/shared/template-thumbnail";
import { categoryLabel } from "@/data/categories";
import { getTemplateBySlug, templates } from "@/data/templates";
import { formatCurrency, formatDate } from "@/lib/format";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return { title: "Template not found — MODULESOFT" };
  return {
    title: `${template.name} — MODULESOFT Templates`,
    description: template.tagline,
  };
}

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return notFound();

  const similar = templates
    .filter((t) => t.category === template.category && t.id !== template.id)
    .slice(0, 3);

  return (
    <div className="pb-24 pt-28">
      <Container>
        {/* Breadcrumb */}
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-muted-foreground"
          >
            <Link
              href="/templates"
              className="transition-colors hover:text-foreground"
            >
              Templates
            </Link>
            <ChevronRight className="size-4" />
            <span className="font-medium text-foreground">{template.name}</span>
          </nav>
        </FadeIn>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left: preview frame */}
          <FadeIn>
            <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/30">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-border bg-secondary/60 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-400/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 rounded-md border border-border bg-background/60 px-3 py-1 text-center text-xs text-muted-foreground">
                  {template.slug}.modulesoft.site
                </div>
              </div>
              <TemplateThumbnail
                template={template}
                className="aspect-[16/10]"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {template.pages.map((page) => (
                <span
                  key={page}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground"
                >
                  <FileText className="size-3" />
                  {page}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Right: sticky purchase card */}
          <FadeIn delay={0.1}>
            <aside className="glass rounded-xl p-6 lg:sticky lg:top-24">
              <h1 className="text-2xl font-semibold tracking-tight">
                {template.name}
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {template.tagline}
              </p>

              <div className="mt-5 flex items-end justify-between">
                <span className="text-3xl font-semibold text-indigo-400">
                  {template.price === 0
                    ? "Free"
                    : formatCurrency(template.price)}
                </span>
                {template.price > 0 && (
                  <span className="text-xs text-muted-foreground">
                    one-time license
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-foreground">
                    {template.rating}
                  </span>
                  ({template.reviewCount} reviews)
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="size-4" />
                  {template.sales.toLocaleString("en-US")} sales
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/preview/${template.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/60 px-5 text-sm font-medium transition-colors hover:border-indigo-500/40 hover:bg-secondary"
                >
                  <Eye className="size-4" />
                  Live preview
                </Link>
                <Link
                  href={`/builder?template=${template.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-5 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:from-indigo-400 hover:to-violet-400"
                >
                  <Wand2 className="size-4" />
                  Customize in builder
                </Link>
                <Link
                  href={`/order?template=${template.id}`}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-lg text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Order a custom version
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <Separator className="my-6" />

              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <User className="size-4" />
                    Author
                  </dt>
                  <dd className="font-medium">{template.author}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-muted-foreground">
                    <CalendarDays className="size-4" />
                    Updated
                  </dt>
                  <dd className="font-medium">
                    {formatDate(template.updatedAt)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                <Badge className="border-0 bg-indigo-500/15 text-indigo-400">
                  {categoryLabel(template.category)}
                </Badge>
                {template.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </aside>
          </FadeIn>
        </div>

        {/* What's included */}
        <section className="mt-24">
          <SectionHeading
            align="left"
            eyebrow="Included"
            title="What’s included"
            description="Every section ships pre-built, responsive, and ready to restyle in the MODULESOFT builder."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {template.features.map((feature) => (
              <StaggerItem
                key={feature}
                className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/25 to-violet-500/25">
                  <Check className="size-3.5 text-indigo-400" />
                </span>
                <span className="text-sm font-medium">{feature}</span>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="mt-12 max-w-3xl">
            <h3 className="text-lg font-semibold">About this template</h3>
            <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
              {template.description}
            </p>
          </FadeIn>

          <FadeIn className="mt-12">
            <h3 className="text-lg font-semibold">Pages included</h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {template.pages.map((page) => (
                <li
                  key={page}
                  className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-4 py-3 text-sm"
                >
                  <FileText className="size-4 text-indigo-400" />
                  {page}
                </li>
              ))}
            </ul>
          </FadeIn>
        </section>

        {/* Similar templates */}
        {similar.length > 0 && (
          <section className="mt-24">
            <SectionHeading
              align="left"
              eyebrow="Keep browsing"
              title="Similar templates"
              description={`More ${categoryLabel(template.category).toLowerCase()} designs from the marketplace.`}
            />
            <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((t) => (
                <StaggerItem key={t.id}>
                  <TemplateCard template={t} />
                </StaggerItem>
              ))}
            </Stagger>
          </section>
        )}
      </Container>
    </div>
  );
}
