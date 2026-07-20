import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  AtSign,
  BookOpen,
  Check,
  Download,
  Globe,
  LayoutTemplate,
  MousePointerClick,
  Plus,
  Rocket,
  Share2,
  Sparkles,
  Wand2,
  type LucideIcon,
  Paintbrush,
  PenTool,
  ShoppingCart,
  LayoutDashboard,
  Gem,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { TemplateCard } from "@/components/shared/template-card";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { services, stats, testimonials } from "@/data/marketing";
import { featuredTemplates } from "@/data/templates";
import { formatCurrency, initials } from "@/lib/format";

export const metadata: Metadata = {
  title: "MODULESOFT — Вэбсайтын ирээдүйг хамтдаа бүтээе",
  description:
    "Дээд зэрэглэлийн загварууд, визуал бүтээгч, дуудлагад бэлэн дизайн студи. Санаанаас худалдан авалт хийдэг вэбсайт хүрэх хамгийн хурдан зам бол MODULESOFT.",
};

const serviceIcons: Record<string, LucideIcon> = {
  Paintbrush,
  PenTool,
  ShoppingCart,
  LayoutDashboard,
  Gem,
  TrendingUp,
};

const steps: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: LayoutTemplate,
    title: "Загвараа сонгоорой",
    description:
      "Бодит хэрэглэгчид дээр туршигдсан 160+ загварын аль нэгнээс эхлээрэй — хуудас бүрд аль хэдийн нотлогдсон олон зуун шийдвэр шингэсэн байдаг.",
  },
  {
    icon: MousePointerClick,
    title: "Бүтээгч дээр өөрчлөөрэй",
    description:
      "Өнгө, үсгийн фонт, агуулгаа дизайны программ шиг визуал орчинд солиорой — код бичих шаардлагагүй, ямар ч буулт хийхгүй.",
  },
  {
    icon: Rocket,
    title: "Студитэй хамт нээгээрэй",
    description:
      "Нэг товшилтоор өөрөө нийтлээрэй, эсвэл сүүлийн шатыг манай студид даатгаж, том хөрөнгө оруулалт татсан мэт нээлт хийгээрэй.",
  },
];

function PrimaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
    >
      {children}
    </Link>
  );
}

function SecondaryCta({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="liquid-glass inline-flex h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
    >
      {children}
    </Link>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
        {eyebrow}
      </p>
      <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
          {description}
        </p>
      )}
    </FadeIn>
  );
}

function HeroMark() {
  return (
    <span className="flex size-20 items-center justify-center rounded-2xl bg-white/15 shadow-lg shadow-black/20 backdrop-blur">
      <span className="grid grid-cols-2 gap-1.5">
        <span className="size-3 rounded-[3px] bg-white" />
        <span className="size-3 rounded-[3px] bg-white/70" />
        <span className="size-3 rounded-[3px] bg-white/70" />
        <span className="size-3 rounded-[3px] bg-white" />
      </span>
    </span>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col lg:flex-row">
      {/* Left panel */}
      <div className="relative min-h-screen w-full lg:w-[52%]">
        <div className="liquid-glass-strong absolute inset-4 rounded-3xl lg:inset-6">
          <div className="relative z-10 flex h-full flex-col p-6 pt-24 sm:p-8 sm:pt-24">
            {/* Panel brand row */}
            <div className="flex items-center gap-2.5">
              <span className="flex size-7 items-center justify-center rounded-lg bg-white/15">
                <span className="grid grid-cols-2 gap-[2.5px]">
                  <span className="size-[4px] rounded-[1px] bg-white" />
                  <span className="size-[4px] rounded-[1px] bg-white/70" />
                  <span className="size-[4px] rounded-[1px] bg-white/70" />
                  <span className="size-[4px] rounded-[1px] bg-white" />
                </span>
              </span>
              <span className="text-xs font-semibold tracking-[0.18em] text-white">
                MODULE<span className="text-white/60">SOFT</span>
              </span>
            </div>

            {/* Hero center */}
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <FadeIn>
                <div className="flex justify-center">
                  <HeroMark />
                </div>
              </FadeIn>
              <FadeIn delay={0.08}>
                <h1 className="mt-8 text-balance text-5xl font-medium tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                  Вэбсайтын ирээдүйг
                  <br />
                  <em className="font-serif italic text-white/80">
                    хамтдаа бүтээе
                  </em>
                </h1>
              </FadeIn>
              <FadeIn delay={0.16}>
                <div className="mt-10 flex justify-center">
                  <Link
                    href="/templates"
                    className="liquid-glass-strong inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 flex size-7 items-center justify-center rounded-full bg-white/15">
                      <Download className="size-3.5" />
                    </span>
                    <span className="relative z-10">Одоо эхлэх</span>
                  </Link>
                </div>
              </FadeIn>
              <FadeIn delay={0.24}>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  {["Загварын сан", "AI Үүсгэлт", "3D Бүтэц"].map((pill) => (
                    <span
                      key={pill}
                      className="liquid-glass rounded-full px-4 py-2 text-xs text-white/80"
                    >
                      {pill}
                    </span>
                  ))}
                </div>
              </FadeIn>
            </div>

            {/* Vision quote */}
            <FadeIn delay={0.3}>
              <div className="mx-auto max-w-md text-center">
                <p className="text-xs uppercase tracking-widest text-white/50">
                  Алсын хараа
                </p>
                <p className="mt-3 text-lg text-white">
                  <span className="font-sans">Бид </span>
                  <span className="font-serif italic text-white/80">
                    төгсгөлгүй орон зайг
                  </span>
                  <span className="font-sans"> төсөөлсөн.</span>
                </p>
                <div className="mt-4 flex items-center gap-4">
                  <span aria-hidden className="h-px flex-1 bg-white/20" />
                  <span className="text-[11px] tracking-[0.25em] text-white/60">
                    МАРКУС АУРЕЛИО
                  </span>
                  <span aria-hidden className="h-px flex-1 bg-white/20" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Right panel — raw video, floating glass widgets */}
      <div className="hidden flex-col gap-4 p-6 pt-24 lg:flex lg:w-[48%]">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="liquid-glass flex items-center gap-4 rounded-full px-4 py-2">
            <a
              href="#"
              aria-label="Twitter"
              className="relative z-10 text-white transition-colors hover:text-white/80"
            >
              <Share2 className="size-4" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="relative z-10 text-white transition-colors hover:text-white/80"
            >
              <Globe className="size-4" />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="relative z-10 text-white transition-colors hover:text-white/80"
            >
              <AtSign className="size-4" />
            </a>
            <ArrowRight className="relative z-10 size-4 text-white/60" />
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="liquid-glass rounded-full px-4 py-2 text-xs font-medium text-white transition-transform hover:scale-105"
            >
              <span className="relative z-10">Бүртгэл</span>
            </Link>
            <button
              type="button"
              aria-label="AI туслах"
              className="liquid-glass flex size-9 items-center justify-center rounded-full text-white transition-transform hover:scale-105"
            >
              <Sparkles className="relative z-10 size-4" />
            </button>
          </div>
        </div>

        {/* Community card */}
        <FadeIn delay={0.15} className="self-end">
          <div className="liquid-glass w-56 rounded-3xl p-4">
            <p className="relative z-10 text-sm text-white">
              Манай экосистемд нэгдээрэй
            </p>
            <p className="relative z-10 mt-1.5 text-xs leading-relaxed text-white/60">
              Мянга гаруй бүтээгчид загвар, туршлагаа хуваалцан хамтдаа өсөж
              байна.
            </p>
          </div>
        </FadeIn>

        {/* Bottom feature section */}
        <FadeIn delay={0.25} className="mt-auto">
          <div className="liquid-glass rounded-[2.5rem] p-4">
            <div className="relative z-10 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="liquid-glass rounded-3xl p-4">
                  <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-white/10">
                    <Wand2 className="size-4 text-white" />
                  </span>
                  <p className="relative z-10 mt-3 text-sm text-white">
                    Боловсруулалт
                  </p>
                  <p className="relative z-10 mt-1 text-xs leading-relaxed text-white/60">
                    Агуулга, дизайнаа ухаалаг хэрэгслээр хормын дотор
                    сайжруулаарай.
                  </p>
                </div>
                <div className="liquid-glass rounded-3xl p-4">
                  <span className="relative z-10 flex size-8 items-center justify-center rounded-full bg-white/10">
                    <BookOpen className="size-4 text-white" />
                  </span>
                  <p className="relative z-10 mt-3 text-sm text-white">
                    Өсөлтийн архив
                  </p>
                  <p className="relative z-10 mt-1 text-xs leading-relaxed text-white/60">
                    1,200+ нээлтээс хуримтлуулсан туршлага таны гарт.
                  </p>
                </div>
              </div>
              <div className="liquid-glass flex items-center gap-4 rounded-3xl p-4">
                <span className="relative z-10 block h-16 w-24 shrink-0 overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=200&q=70"
                    alt=""
                    className="size-full object-cover"
                  />
                </span>
                <span className="relative z-10 min-w-0 flex-1">
                  <span className="block text-sm text-white">
                    Дэвшилтэт вэб бүтээгч
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-white/60">
                    Санаагаа хэдхэн минутын дотор амьд хуудас болгоорой.
                  </span>
                </span>
                <Link
                  href="/builder"
                  aria-label="Бүтээгч рүү очих"
                  className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-transform hover:scale-105"
                >
                  <Plus className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats strip */}
      <section className="py-14">
        <Container>
          <FadeIn>
            <div className="liquid-glass rounded-[2.5rem] px-8 py-10">
              <Stagger className="relative z-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label} className="text-center">
                    <p className="text-4xl font-medium tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{stat.label}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Хэрхэн ажилладаг вэ"
            title={
              <>
                Нээлт хүртэлх гуравхан <em className="text-white/80">алхам</em>
              </>
            }
            description="Хоосон цаасан дээрээс эхлэх шаардлагагүй, агентлагийн урт хугацаа ч үгүй. Батлагдсан бүтэц, дээр нь таны брэнд, шаардлагатай үед ард тань студи."
          />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="liquid-glass h-full rounded-3xl p-7 transition-transform hover:scale-105">
                  <div className="relative z-10">
                    <span className="absolute right-0 top-0 text-sm font-medium text-white/40">
                      0{index + 1}
                    </span>
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                      <step.icon className="size-4 text-white" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Featured templates */}
      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Загварууд"
            title={
              <>
                Батлагдсан загвараас{" "}
                <em className="text-white/80">эхлээрэй</em>
              </>
            }
            description="Манай студийн гараар бүтээгдэж, бодит хандалтаар туршигдсан — таны брэндийг өмсөхөд бэлэн загварууд."
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTemplates.slice(0, 4).map((template) => (
              <StaggerItem key={template.id}>
                <TemplateCard template={template} />
              </StaggerItem>
            ))}
          </Stagger>
          <FadeIn className="mt-12 text-center">
            <SecondaryCta href="/templates">
              Бүх загварыг үзэх <ArrowUpRight className="relative z-10 size-4" />
            </SecondaryCta>
          </FadeIn>
        </Container>
      </section>

      {/* Services preview */}
      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Студийн үйлчилгээ"
            title={
              <>
                Бүгдийг нь <em className="text-white/80">бид</em> хийж өгье
              </>
            }
            description="Манай загваруудыг бүтээдэг баг улирал бүр цөөн тооны захиалгат төслийг хүлээн авдаг."
          />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map((service) => {
              const Icon = serviceIcons[service.icon] ?? Sparkles;
              return (
                <StaggerItem key={service.id}>
                  <div className="liquid-glass flex h-full flex-col rounded-3xl p-7 transition-transform hover:scale-105">
                    <div className="relative z-10 flex flex-1 flex-col">
                      <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                        <Icon className="size-4 text-white" />
                      </span>
                      <h3 className="mt-5 text-lg font-medium text-white">
                        {service.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                        {service.description}
                      </p>
                      <p className="mt-5 text-sm text-white/60">
                        <span className="font-medium text-white">
                          {formatCurrency(service.startingPrice)}
                        </span>
                        -с эхэлнэ
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <FadeIn className="mt-12 text-center">
            <SecondaryCta href="/services">
              Бүх үйлчилгээг үзэх{" "}
              <ArrowUpRight className="relative z-10 size-4" />
            </SecondaryCta>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <Container>
          <SectionTitle
            eyebrow="Сэтгэгдэл"
            title={
              <>
                Үр дүнг хэмждэг багуудын{" "}
                <em className="text-white/80">итгэл</em>
              </>
            }
            description="AI стартапаас эхлээд хотхоны ресторан хүртэл — худалдан авалтад хүргэдэг нарийн ширийнийг адилхан хайрладаг."
          />
          <Stagger className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <figure className="liquid-glass flex h-full flex-col rounded-3xl p-7 transition-transform hover:scale-105">
                  <div className="relative z-10 flex flex-1 flex-col">
                    <blockquote className="flex-1 text-pretty leading-relaxed text-white/80">
                      “{testimonial.quote}”
                    </blockquote>
                    <figcaption className="mt-6 flex items-center gap-3">
                      <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white">
                        {initials(testimonial.author)}
                      </span>
                      <span>
                        <span className="block text-sm font-medium text-white">
                          {testimonial.author}
                        </span>
                        <span className="block text-xs text-white/50">
                          {testimonial.role}, {testimonial.company}
                        </span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Big CTA */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong rounded-[2.5rem] px-8 py-16 text-center sm:px-16 sm:py-20">
              <div className="relative z-10">
                <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-5xl">
                  Таны дараагийн вэбсайт{" "}
                  <em className="text-white/80">хэдхэн хоногийн</em> цаана
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-white/60">
                  Юу бүтээж байгаагаа хэлээрэй — бид танд тохирох загвар,
                  багц эсвэл студийн бүрэн үйлчилгээг санал болгоно. Аль нь
                  таныг хамгийн хурдан амжилтад хүргэхээс шалтгаална.
                </p>
                <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                  <PrimaryCta href="/order">
                    Төсөл эхлүүлэх <ArrowRight className="size-4" />
                  </PrimaryCta>
                  <SecondaryCta href="/pricing">
                    <span className="relative z-10">Үнэ харах</span>
                  </SecondaryCta>
                </div>
                <p className="mt-6 flex items-center justify-center gap-2 text-xs text-white/50">
                  <Check className="size-3.5 text-white/70" /> Үнэгүй
                  туршаарай — банкны карт шаардлагагүй
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
