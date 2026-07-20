import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  LayoutTemplate,
  MousePointerClick,
  Rocket,
  Sparkles,
  Check,
  type LucideIcon,
  Paintbrush,
  PenTool,
  ShoppingCart,
  LayoutDashboard,
  Gem,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { TemplateCard } from "@/components/shared/template-card";
import {
  AmbientGlow,
  FadeIn,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { services, stats, testimonials } from "@/data/marketing";
import { featuredTemplates } from "@/data/templates";
import { formatCurrency, initials } from "@/lib/format";

export const metadata: Metadata = {
  title: "MODULESOFT — Build websites that build your business",
  description:
    "Premium templates, a visual builder, and a design studio on call. MODULESOFT is the fastest way from idea to a website that converts.",
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
    title: "Choose a template",
    description:
      "Start from one of 160+ conversion-tested designs — every layout encodes hundreds of decisions already proven against real visitors.",
  },
  {
    icon: MousePointerClick,
    title: "Customize in the builder",
    description:
      "Swap colors, type, and content in a visual editor that feels like design software — no code, no compromises, no template look.",
  },
  {
    icon: Rocket,
    title: "Launch with our studio",
    description:
      "Ship it yourself in a click, or hand the last mile to our design studio for a launch that looks like you raised a round.",
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
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:from-indigo-400 hover:to-violet-400"
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
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-secondary/40 px-6 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </Link>
  );
}

function BrowserMockup() {
  return (
    <div className="glass glow-primary overflow-hidden rounded-2xl">
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-border px-5 py-3.5">
        <div className="flex gap-2">
          <span className="size-3 rounded-full bg-red-400/80" />
          <span className="size-3 rounded-full bg-amber-400/80" />
          <span className="size-3 rounded-full bg-emerald-400/80" />
        </div>
        <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center rounded-md bg-secondary/80 text-xs text-muted-foreground">
          yourbrand.com
        </div>
        <div className="hidden w-14 sm:block" />
      </div>
      {/* Miniature landing layout */}
      <div className="relative p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/30 blur-3xl"
        />
        {/* mini nav */}
        <div className="relative flex items-center justify-between">
          <div className="h-2.5 w-20 rounded-full bg-gradient-to-r from-indigo-400 to-violet-400" />
          <div className="flex items-center gap-2.5">
            <div className="h-2 w-10 rounded-full bg-white/15" />
            <div className="h-2 w-10 rounded-full bg-white/15" />
            <div className="h-2 w-10 rounded-full bg-white/15" />
            <div className="h-6 w-16 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500" />
          </div>
        </div>
        {/* mini hero */}
        <div className="relative mt-10 grid gap-8 sm:grid-cols-2 sm:items-center">
          <div className="space-y-3">
            <div className="h-5 w-24 rounded-full border border-indigo-400/40 bg-indigo-500/10" />
            <div className="h-4 w-full rounded bg-white/80" />
            <div className="h-4 w-4/5 rounded bg-white/80" />
            <div className="h-4 w-3/5 rounded bg-gradient-to-r from-indigo-400 to-fuchsia-400" />
            <div className="pt-1">
              <div className="h-2 w-full rounded bg-white/20" />
              <div className="mt-1.5 h-2 w-2/3 rounded bg-white/20" />
            </div>
            <div className="flex gap-2.5 pt-2">
              <div className="h-7 w-24 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30" />
              <div className="h-7 w-24 rounded-lg border border-white/20" />
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <div className="h-24 rounded-lg bg-gradient-to-br from-indigo-500/50 via-violet-500/40 to-fuchsia-500/50" />
            <div className="mt-3 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-md border border-white/10 bg-white/[0.05] p-2"
                >
                  <div className="size-3.5 rounded bg-indigo-400/70" />
                  <div className="mt-1.5 h-1.5 w-full rounded bg-white/25" />
                  <div className="mt-1 h-1.5 w-2/3 rounded bg-white/15" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* mini logo strip */}
        <div className="relative mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6">
          {[16, 20, 14, 18, 16].map((w, i) => (
            <div
              key={i}
              className="h-2.5 rounded-full bg-white/15"
              style={{ width: `${w * 4}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-24">
        <div aria-hidden className="bg-grid absolute inset-0 -z-20 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <AmbientGlow />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <Badge className="border border-indigo-400/30 bg-indigo-500/10 px-3 py-1 text-indigo-300">
                <Sparkles className="size-3.5" />
                New — 160+ templates in the marketplace
              </Badge>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-gradient mt-6 text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
                Build websites that build your business
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
                Premium templates, a visual builder that feels like design
                software, and a studio team on call for the last mile. From
                idea to launch in days — not months.
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <PrimaryCta href="/order">
                  Start a project <ArrowRight className="size-4" />
                </PrimaryCta>
                <SecondaryCta href="/templates">Browse templates</SecondaryCta>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.3} className="mx-auto mt-20 max-w-4xl">
            <BrowserMockup />
          </FadeIn>
        </Container>
      </section>

      {/* Social proof / stats strip */}
      <section className="border-y border-border bg-secondary/20 py-14">
        <Container>
          <Stagger className="grid grid-cols-2 gap-10 lg:grid-cols-4">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="text-center">
                <p className="text-gradient text-4xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* How it works */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Three steps between you and launch"
            description="No blank canvases, no agency timelines. A proven structure, your brand on top, and a studio behind you when it counts."
          />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <StaggerItem key={step.title}>
                <div className="card-hover relative h-full rounded-xl border border-border bg-card p-7">
                  <span className="absolute right-6 top-6 text-sm font-semibold text-muted-foreground/50">
                    0{index + 1}
                  </span>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
                    <step.icon className="size-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Featured templates */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="Templates"
            title="Start from something proven"
            description="Hand-crafted by our studio, tuned against real traffic, and ready to wear your brand."
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
              Explore all templates <ArrowUpRight className="size-4" />
            </SecondaryCta>
          </FadeIn>
        </Container>
      </section>

      {/* Services preview */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="Studio services"
            title="When you want it done for you"
            description="The same team that builds our templates takes on a limited number of client projects each quarter."
          />
          <Stagger className="grid gap-6 md:grid-cols-3">
            {services.slice(0, 3).map((service) => {
              const Icon = serviceIcons[service.icon] ?? Sparkles;
              return (
                <StaggerItem key={service.id}>
                  <div className="card-hover flex h-full flex-col rounded-xl border border-border bg-card p-7">
                    <div className="flex size-11 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10">
                      <Icon className="size-5 text-indigo-400" />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <p className="mt-5 text-sm text-muted-foreground">
                      From{" "}
                      <span className="font-semibold text-indigo-400">
                        {formatCurrency(service.startingPrice)}
                      </span>
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <FadeIn className="mt-12 text-center">
            <SecondaryCta href="/services">
              See all services <ArrowUpRight className="size-4" />
            </SecondaryCta>
          </FadeIn>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="Testimonials"
            title="Trusted by teams who measure results"
            description="From AI startups to neighborhood bistros — the same obsession with the details that convert."
          />
          <Stagger className="grid gap-6 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <StaggerItem key={testimonial.id}>
                <figure className="card-hover flex h-full flex-col rounded-xl border border-border bg-card p-7">
                  <blockquote className="flex-1 text-pretty leading-relaxed text-foreground/90">
                    “{testimonial.quote}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-semibold text-white">
                      {initials(testimonial.author)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold">
                        {testimonial.author}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </span>
                    </span>
                  </figcaption>
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
            <div className="glow-primary relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/60 via-card to-card px-8 py-16 text-center sm:px-16 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[100px]"
              />
              <h2 className="text-gradient relative text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                Your next website is days away
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
                Tell us what you’re building and we’ll match you with a
                template, a plan, or a full studio engagement — whichever gets
                you live fastest.
              </p>
              <div className="relative mt-9 flex flex-wrap items-center justify-center gap-4">
                <PrimaryCta href="/order">
                  Start a project <ArrowRight className="size-4" />
                </PrimaryCta>
                <SecondaryCta href="/pricing">View pricing</SecondaryCta>
              </div>
              <p className="relative mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Check className="size-3.5 text-indigo-400" /> Free to explore —
                no credit card required
              </p>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
