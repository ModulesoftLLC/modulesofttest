import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Gem,
  LayoutDashboard,
  Paintbrush,
  PenTool,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  AmbientGlow,
  FadeIn,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { services } from "@/data/marketing";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Services — MODULESOFT",
  description:
    "From template customization to fully bespoke builds — the MODULESOFT studio designs, builds, and grows websites that perform.",
};

const serviceIcons: Record<string, LucideIcon> = {
  Paintbrush,
  PenTool,
  ShoppingCart,
  LayoutDashboard,
  Gem,
  TrendingUp,
};

const process: { title: string; description: string }[] = [
  {
    title: "Discover",
    description:
      "A focused workshop on your positioning, customers, and conversion goals — the brief every later decision answers to.",
  },
  {
    title: "Design",
    description:
      "Structure first, polish second. We sequence the pages as an argument, then craft the visual system around it.",
  },
  {
    title: "Build",
    description:
      "Pixel-accurate, performance-budgeted implementation — fonts subset, images sized, animation on the compositor.",
  },
  {
    title: "Launch",
    description:
      "Domains, analytics, redirects, and QA across devices. Launch day is a checklist, not an adventure.",
  },
  {
    title: "Grow",
    description:
      "Post-launch iteration on real data — A/B tests, content updates, and performance monitoring under a care plan.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Template customizations usually ship in one to two weeks. Fully custom marketing sites run four to eight weeks depending on page count, and ecommerce or web-app builds are scoped individually — most land between six and twelve weeks.",
  },
  {
    question: "Do I need to buy a template first?",
    answer:
      "No. If a template is the right starting point, its cost is folded into the engagement. If your project needs a blank canvas, we skip the marketplace entirely and design from your brief.",
  },
  {
    question: "Who owns the website after launch?",
    answer:
      "You do — design files, code, content, and domain. There’s no lock-in: sites we build run on standard modern stacks, and you can host with us or anywhere you like.",
  },
  {
    question: "Can you work with our existing brand?",
    answer:
      "Absolutely. Most engagements start from an existing identity. If the brand needs work first, our Brand & Identity service can run ahead of the website so everything ships coherent.",
  },
  {
    question: "What happens after the site goes live?",
    answer:
      "Every launch includes thirty days of support. After that, Care & Growth plans cover monthly design hours, performance monitoring, and A/B testing — your website treated as a product, not a project.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-40 pb-20">
        <AmbientGlow />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Studio services
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-gradient mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Done-for-you, down to the pixel
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                The team that builds our marketplace takes on a limited number
                of client engagements each quarter — same standards, same
                performance budgets, your name on the door.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Services grid */}
      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon] ?? Sparkles;
              return (
                <StaggerItem key={service.id}>
                  <div className="card-hover flex h-full flex-col rounded-xl border border-border bg-card p-7">
                    <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
                      <Icon className="size-5 text-white" />
                    </div>
                    <h2 className="mt-5 text-lg font-semibold">
                      {service.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {service.deliverables.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="flex items-start gap-2.5 text-sm text-foreground/90"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-indigo-400" />
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">
                      From{" "}
                      <span className="text-base font-semibold text-indigo-400">
                        {formatCurrency(service.startingPrice)}
                      </span>
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Process timeline */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="Process"
            title="Five phases, zero surprises"
            description="Every engagement follows the same spine, so you always know what’s happening and what comes next."
          />
          <Stagger className="grid gap-6 md:grid-cols-5">
            {process.map((phase, index) => (
              <StaggerItem key={phase.title} className="relative">
                <div className="h-full">
                  <div className="flex items-center gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25">
                      {index + 1}
                    </span>
                    {index < process.length - 1 && (
                      <span
                        aria-hidden
                        className="hidden h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent md:block"
                      />
                    )}
                  </div>
                  <h3 className="mt-4 font-semibold">{phase.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {phase.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Questions clients actually ask"
            description="Anything else — write to hello@modulesoft.io and a human answers within one business day."
          />
          <FadeIn className="mx-auto max-w-2xl">
            <Accordion>
              {faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <FadeIn>
            <div className="glow-primary relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/60 via-card to-card px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[100px]"
              />
              <h2 className="text-gradient relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Tell us what you’re building
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
                Share a short brief and we’ll come back with a recommended
                approach, a timeline, and a fixed quote — usually within
                two business days.
              </p>
              <div className="relative mt-9 flex justify-center">
                <Link
                  href="/order"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-medium text-white shadow-lg shadow-indigo-500/25 transition-colors hover:from-indigo-400 hover:to-violet-400"
                >
                  Start a project <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
