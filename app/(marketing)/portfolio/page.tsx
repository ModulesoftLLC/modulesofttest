import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import {
  AmbientGlow,
  FadeIn,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { listPortfolio } from "@/lib/api";

export const metadata: Metadata = {
  title: "Portfolio — MODULESOFT",
  description:
    "Selected client work from the MODULESOFT studio — launches measured in bookings, leads, and revenue, not just pixels.",
};

export default async function PortfolioPage() {
  const items = await listPortfolio();

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16">
        <AmbientGlow />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Portfolio
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-gradient mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Work that moved the numbers
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Every case study below shipped with a metric attached. Design
                is the craft — bookings, leads, and revenue are the score.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="card-hover group block h-full overflow-hidden rounded-xl border border-border bg-card"
                >
                  {/* Gradient cover */}
                  <div
                    className="relative flex aspect-[16/9] items-end overflow-hidden p-6"
                    style={{
                      background: `linear-gradient(135deg, ${item.palette.from}, ${item.palette.to})`,
                    }}
                  >
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.25),transparent_55%)]"
                    />
                    <div
                      aria-hidden
                      className="absolute inset-x-6 bottom-0 h-2/3 rounded-t-xl border border-white/25 bg-black/30 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1"
                    >
                      <div className="h-2.5 w-1/3 rounded-full bg-white/80" />
                      <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/40" />
                      <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/40" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-4 w-14 rounded-full bg-white/85" />
                        <div className="h-4 w-14 rounded-full border border-white/40" />
                      </div>
                    </div>
                    <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <Badge className="border-0 bg-indigo-500/15 text-indigo-300">
                        {item.industry}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.year}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold group-hover:text-indigo-300">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.summary}
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border pt-5">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-semibold text-indigo-400">
                            {metric.value}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">
                            {metric.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
