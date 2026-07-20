import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { portfolioItems } from "@/data/portfolio";
import { getPortfolioItem } from "@/lib/api";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) return { title: "Case study — MODULESOFT" };
  return {
    title: `${item.title} — MODULESOFT Portfolio`,
    description: item.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPortfolioItem(slug);
  if (!item) notFound();

  const index = portfolioItems.findIndex((p) => p.slug === item.slug);
  const prev = portfolioItems[(index - 1 + portfolioItems.length) % portfolioItems.length]!;
  const next = portfolioItems[(index + 1) % portfolioItems.length]!;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <Container>
          <FadeIn>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" /> All case studies
            </Link>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div
              className="relative mt-8 flex aspect-[21/9] items-end overflow-hidden rounded-2xl p-8 sm:p-12"
              style={{
                background: `linear-gradient(135deg, ${item.palette.from}, ${item.palette.to})`,
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.3),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)]"
              />
              <div className="relative">
                <Badge className="border-0 bg-black/30 text-white backdrop-blur">
                  {item.industry}
                </Badge>
                <h1 className="mt-4 max-w-2xl text-balance text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                  {item.title}
                </h1>
              </div>
            </div>
          </FadeIn>

          {/* Meta */}
          <FadeIn delay={0.16}>
            <div className="mt-10 grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Client
                </p>
                <p className="mt-1 font-medium">{item.client}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Industry
                </p>
                <p className="mt-1 font-medium">{item.industry}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Year
                </p>
                <p className="mt-1 font-medium">{item.year}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Services
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {item.services.map((service) => (
                    <span
                      key={service}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground/90"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Summary + metrics */}
      <section className="pb-16">
        <Container>
          <FadeIn>
            <p className="max-w-3xl text-pretty text-xl leading-relaxed text-foreground/90">
              {item.summary}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
            {item.metrics.map((metric) => (
              <StaggerItem key={metric.label}>
                <div className="card-hover rounded-xl border border-border bg-card p-6 text-center">
                  <p className="text-gradient text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Narrative */}
      <section className="border-t border-border py-16">
        <Container>
          <div className="mx-auto grid max-w-4xl gap-12">
            <FadeIn>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                The challenge
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {item.client} came to us with a familiar gap: a business
                performing well offline and a website working against it. The
                existing site didn’t reflect the caliber of the work, buried
                the actions visitors came to take, and gave the team no way to
                evolve it without a developer in the loop. In a category like{" "}
                {item.industry.toLowerCase()}, that gap costs real revenue
                every week it stays open.
              </p>
            </FadeIn>
            <FadeIn>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Our approach
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                We started with a discovery workshop to map who visits, what
                they need to believe, and what a successful visit looks like.
                From there the engagement covered{" "}
                {item.services.join(", ").toLowerCase()} — sequencing every
                page as an argument before touching the visual layer, then
                building against strict performance budgets so the polish
                never came at the cost of speed.
              </p>
            </FadeIn>
            <FadeIn>
              <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                The result
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                The launch in {item.year} turned the website from a brochure
                into a working part of the business. The numbers above tell
                the short version:{" "}
                {item.metrics
                  .map((m) => `${m.label.toLowerCase()} at ${m.value}`)
                  .join(", ")}
                . The longer version is a site the {item.client} team now
                updates themselves — and a foundation the next phase of their
                growth can build on.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Prev / next */}
      <section className="border-t border-border py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn>
              <Link
                href={`/portfolio/${prev.slug}`}
                className="card-hover group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6"
              >
                <span className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  <ArrowLeft className="size-3.5" /> Previous case study
                </span>
                <span className="mt-3 font-semibold group-hover:text-indigo-300">
                  {prev.title}
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Link
                href={`/portfolio/${next.slug}`}
                className="card-hover group flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 text-right"
              >
                <span className="flex items-center justify-end gap-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Next case study <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-3 font-semibold group-hover:text-indigo-300">
                  {next.title}
                </span>
              </Link>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
