import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { listPortfolio } from "@/lib/api";

export const metadata: Metadata = {
  title: "Портфолио — MODULESOFT",
  description:
    "MODULESOFT студийн шилдэг ажлууд — зөвхөн пикселээр биш, захиалга, хандалт, орлогоор хэмжигдсэн нээлтүүд.",
};

export default async function PortfolioPage() {
  const items = await listPortfolio();

  return (
    <>
      <section className="pt-32 pb-12">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong mx-auto max-w-3xl rounded-[2.5rem] px-8 py-14 text-center sm:px-14">
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  ПОРТФОЛИО
                </p>
                <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl">
                  Тоог <em className="text-white/80">хөдөлгөсөн</em> ажлууд
                </h1>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-white/60">
                  Доорх кейс бүр хэмжигдэхүйц үзүүлэлттэй хамт нээгдсэн.
                  Дизайн бол ур чадвар — захиалга, хандалт, орлого бол оноо.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2">
            {items.map((item) => (
              <StaggerItem key={item.id}>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="liquid-glass group block h-full overflow-hidden rounded-3xl transition-transform hover:scale-105"
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
                      className="absolute inset-x-6 bottom-0 h-2/3 rounded-t-xl bg-black/30 p-4 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1"
                    >
                      <div className="h-2.5 w-1/3 rounded-full bg-white/80" />
                      <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/40" />
                      <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/40" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-4 w-14 rounded-full bg-white/85" />
                        <div className="h-4 w-14 rounded-full bg-white/30" />
                      </div>
                    </div>
                    <span className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-black/30 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </div>

                  <div className="relative z-10 p-6">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                        {item.industry}
                      </span>
                      <span className="text-xs text-white/50">
                        {item.year}
                      </span>
                    </div>
                    <h2 className="mt-3 text-lg font-medium text-white">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {item.summary}
                    </p>
                    <div className="mt-5 grid grid-cols-3 gap-3 pt-2">
                      {item.metrics.map((metric) => (
                        <div key={metric.label}>
                          <p className="font-medium text-white">
                            {metric.value}
                          </p>
                          <p className="mt-0.5 text-xs text-white/50">
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
