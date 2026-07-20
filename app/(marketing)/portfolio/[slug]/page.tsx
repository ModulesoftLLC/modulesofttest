import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  if (!item) return { title: "Кейс судалгаа — MODULESOFT" };
  return {
    title: `${item.title} — MODULESOFT Портфолио`,
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
      <section className="pt-28 pb-16">
        <Container>
          <FadeIn>
            <Link
              href="/portfolio"
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 transition-transform hover:scale-105"
            >
              <ArrowLeft className="relative z-10 size-4" />
              <span className="relative z-10">Бүх кейс судалгаа</span>
            </Link>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div
              className="relative mt-8 flex aspect-[21/9] items-end overflow-hidden rounded-[2.5rem] p-8 sm:p-12"
              style={{
                background: `linear-gradient(135deg, ${item.palette.from}, ${item.palette.to})`,
              }}
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(255,255,255,0.3),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.55),transparent_60%)]"
              />
              <div className="relative">
                <span className="rounded-full bg-black/30 px-3 py-1 text-xs text-white backdrop-blur">
                  {item.industry}
                </span>
                <h1 className="mt-4 max-w-2xl text-balance text-3xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
                  {item.title}
                </h1>
              </div>
            </div>
          </FadeIn>

          {/* Meta */}
          <FadeIn delay={0.16}>
            <div className="liquid-glass mt-10 rounded-3xl p-6">
              <div className="relative z-10 grid gap-6 sm:grid-cols-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50">
                    Харилцагч
                  </p>
                  <p className="mt-1 font-medium text-white">{item.client}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50">
                    Салбар
                  </p>
                  <p className="mt-1 font-medium text-white">
                    {item.industry}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50">
                    Он
                  </p>
                  <p className="mt-1 font-medium text-white">{item.year}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/50">
                    Үйлчилгээ
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {item.services.map((service) => (
                      <span
                        key={service}
                        className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
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
            <p className="max-w-3xl text-pretty text-xl leading-relaxed text-white/80">
              {item.summary}
            </p>
          </FadeIn>
          <Stagger className="mt-10 grid gap-6 sm:grid-cols-3">
            {item.metrics.map((metric) => (
              <StaggerItem key={metric.label}>
                <div className="liquid-glass rounded-3xl p-6 text-center transition-transform hover:scale-105">
                  <div className="relative z-10">
                    <p className="text-3xl font-medium tracking-tight text-white">
                      {metric.value}
                    </p>
                    <p className="mt-2 text-sm text-white/60">
                      {metric.label}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Narrative */}
      <section className="pb-16">
        <Container>
          <FadeIn>
            <div className="liquid-glass mx-auto max-w-4xl rounded-[2.5rem] p-8 sm:p-12">
              <div className="relative z-10 grid gap-12">
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Тулгарсан сорилт
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-white/70">
                    {item.client} бидэн дээр танил цоорхойтой ирсэн: оффлайн
                    орчинд сайн ажилладаг бизнес, харин түүний эсрэг ажилладаг
                    вэбсайт. Хуучин сайт нь ажлын жинхэнэ түвшинг илэрхийлж
                    чадахгүй, зочдын хийхээр ирсэн үйлдлүүдийг нууж, багт
                    хөгжүүлэгчгүйгээр өөрчлөлт хийх ямар ч боломж олгодоггүй
                    байв. {item.industry} шиг өрсөлдөөнтэй салбарт энэ цоорхой
                    нээлттэй байх долоо хоног бүр бодит орлогоор үнэлэгддэг.
                  </p>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Бидний арга барил
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-white/70">
                    Бид хэн зочилдог, тэд юунд итгэх ёстой, амжилттай зочлолт
                    ямар харагдахыг тодорхойлох судалгааны воркшопоос эхэлсэн.
                    Тэндээс төсөл {item.services.join(", ")} чиглэлүүдийг
                    хамарсан — визуал давхаргад хүрэхээс өмнө хуудас бүрийг
                    үнэмшүүлэх дараалалд оруулж, дараа нь гоо сайхан нь хурдны
                    зардал болохгүйн тулд хатуу хурдны төсвийн дагуу
                    хөгжүүлсэн.
                  </p>
                </div>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                    Үр дүн
                  </h2>
                  <p className="mt-4 text-pretty leading-relaxed text-white/70">
                    {item.year} оны нээлт вэбсайтыг танилцуулга хуудаснаас
                    бизнесийн ажилладаг хэсэг болгон хувиргасан. Дээрх тоонууд
                    товч хувилбарыг өгүүлдэг:{" "}
                    {item.metrics
                      .map((m) => `${m.label} — ${m.value}`)
                      .join(", ")}
                    . Урт хувилбар нь {item.client} багийн одоо өөрсдөө
                    шинэчилдэг сайт бөгөөд өсөлтийнх нь дараагийн үе шат
                    түшиглэх суурь болсон явдал юм.
                  </p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Prev / next */}
      <section className="pb-24">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2">
            <FadeIn>
              <Link
                href={`/portfolio/${prev.slug}`}
                className="liquid-glass group flex h-full flex-col justify-between rounded-3xl p-6 transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-wide text-white/50">
                  <ArrowLeft className="size-3.5" /> Өмнөх кейс
                </span>
                <span className="relative z-10 mt-3 font-medium text-white">
                  {prev.title}
                </span>
              </Link>
            </FadeIn>
            <FadeIn delay={0.08}>
              <Link
                href={`/portfolio/${next.slug}`}
                className="liquid-glass group flex h-full flex-col justify-between rounded-3xl p-6 text-right transition-transform hover:scale-105"
              >
                <span className="relative z-10 flex items-center justify-end gap-2 text-xs uppercase tracking-wide text-white/50">
                  Дараагийн кейс <ArrowRight className="size-3.5" />
                </span>
                <span className="relative z-10 mt-3 font-medium text-white">
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
