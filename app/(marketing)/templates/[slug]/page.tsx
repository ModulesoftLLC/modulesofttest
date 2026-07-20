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
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { TemplateCard } from "@/components/shared/template-card";
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
  if (!template) return { title: "Загвар олдсонгүй — MODULESOFT" };
  return {
    title: `${template.name} — MODULESOFT Загварууд`,
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
    <div className="relative z-10 pb-24 pt-28">
      <Container>
        {/* Breadcrumb */}
        <FadeIn>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-white/50"
          >
            <Link
              href="/templates"
              className="transition-colors hover:text-white"
            >
              Загварууд
            </Link>
            <ChevronRight className="size-4" />
            <span className="font-medium text-white">{template.name}</span>
          </nav>
        </FadeIn>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* Left: image-led presentation */}
          <FadeIn>
            <div className="liquid-glass-strong overflow-hidden rounded-3xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-full bg-white/25" />
                  <span className="size-2.5 rounded-full bg-white/25" />
                  <span className="size-2.5 rounded-full bg-white/25" />
                </div>
                <div className="flex-1 rounded-full bg-white/5 px-3 py-1 text-center text-xs text-white/50">
                  {template.slug}.modulesoft.site
                </div>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={template.image}
                  alt={`${template.name} загварын нүүр зураг`}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-lg font-semibold text-white drop-shadow">
                    {template.name}
                  </p>
                  <p className="text-xs text-white/70 drop-shadow">
                    {categoryLabel(template.category)}
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery */}
            <div className="mt-4 grid grid-cols-3 gap-4">
              {template.gallery.map((photo, i) => (
                <div
                  key={photo}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo}
                    alt={`${template.name} загварын дэлгэрэнгүй зураг ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {template.pages.map((page) => (
                <span
                  key={page}
                  className="liquid-glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/60"
                >
                  <FileText className="size-3" />
                  {page}
                </span>
              ))}
            </div>
          </FadeIn>

          {/* Right: sticky purchase card */}
          <FadeIn delay={0.1}>
            <aside className="liquid-glass-strong rounded-3xl p-6 lg:sticky lg:top-24">
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                {template.name}
              </h1>
              <p className="mt-1 text-sm text-white/60">{template.tagline}</p>

              <div className="mt-5 flex items-end justify-between">
                <span className="text-3xl font-semibold text-white">
                  {template.price === 0
                    ? "Үнэгүй"
                    : formatCurrency(template.price)}
                </span>
                {template.price > 0 && (
                  <span className="text-xs text-white/50">
                    нэг удаагийн лиценз
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-white/50">
                <span className="flex items-center gap-1">
                  <Star className="size-4 fill-white/80 text-white/80" />
                  <span className="font-medium text-white">
                    {template.rating}
                  </span>
                  ({template.reviewCount} сэтгэгдэл)
                </span>
                <span className="flex items-center gap-1">
                  <TrendingUp className="size-4" />
                  {template.sales.toLocaleString("mn-MN")} борлуулалт
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <Link
                  href={`/builder?template=${template.slug}`}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
                >
                  <Wand2 className="size-4" />
                  Бүтээгчээр өөрчлөх
                </Link>
                <Link
                  href={`/preview/${template.slug}`}
                  className="liquid-glass inline-flex h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium text-white/80 transition-colors hover:text-white"
                >
                  <Eye className="size-4" />
                  Шууд үзэх
                </Link>
                <Link
                  href={`/order?template=${template.id}`}
                  className="inline-flex h-10 items-center justify-center gap-1.5 rounded-full text-sm font-medium text-white/50 transition-colors hover:text-white"
                >
                  Захиалгат хувилбар захиалах
                  <ArrowUpRight className="size-4" />
                </Link>
              </div>

              <div className="my-6 h-px bg-white/10" />

              <dl className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-white/50">
                    <User className="size-4" />
                    Бүтээгч
                  </dt>
                  <dd className="font-medium text-white/80">
                    {template.author}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="flex items-center gap-2 text-white/50">
                    <CalendarDays className="size-4" />
                    Шинэчлэгдсэн
                  </dt>
                  <dd className="font-medium text-white/80">
                    {formatDate(template.updatedAt)}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 flex flex-wrap gap-2">
                <span className="inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
                  {categoryLabel(template.category)}
                </span>
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="liquid-glass inline-flex items-center rounded-full px-2.5 py-0.5 text-xs text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </aside>
          </FadeIn>
        </div>

        {/* What's included */}
        <section className="mt-24">
          <SectionHeading
            align="left"
            eyebrow="Багтсан зүйлс"
            title="Юу багтсан бэ"
            description="Хэсэг бүр урьдчилан бүтээгдсэн, бүх дэлгэцэд зохицсон, MODULESOFT бүтээгч дээр өөрчлөхөд бэлэн."
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {template.features.map((feature) => (
              <StaggerItem
                key={feature}
                className="liquid-glass flex items-start gap-3 rounded-3xl p-4"
              >
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Check className="size-3.5 text-white/80" />
                </span>
                <span className="text-sm font-medium text-white/80">
                  {feature}
                </span>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn className="mt-12 max-w-3xl">
            <h3 className="text-lg font-semibold text-white">
              Энэ загварын тухай
            </h3>
            <p className="mt-3 text-pretty leading-relaxed text-white/60">
              {template.description}
            </p>
          </FadeIn>

          <FadeIn className="mt-12">
            <h3 className="text-lg font-semibold text-white">
              Багтсан хуудсууд
            </h3>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {template.pages.map((page) => (
                <li
                  key={page}
                  className="liquid-glass flex items-center gap-2.5 rounded-full px-4 py-3 text-sm text-white/80"
                >
                  <FileText className="size-4 text-white/50" />
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
              eyebrow="Үргэлжлүүлэн үзэх"
              title="Төстэй загварууд"
              description={`«${categoryLabel(template.category)}» ангиллын бусад загварууд.`}
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
