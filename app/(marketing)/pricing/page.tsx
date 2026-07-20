import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import { AmbientGlow, FadeIn } from "@/components/shared/motion";
import { pricingPlans } from "@/data/marketing";
import { PricingPlans } from "./pricing-plans";

export const metadata: Metadata = {
  title: "Pricing — MODULESOFT",
  description:
    "Simple plans for every stage — explore free, ship with Pro, or work with our design studio. Yearly billing gets two months free.",
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "Can I try MODULESOFT before paying?",
    answer:
      "Yes. The Free plan lets you browse every template and prototype a full site in the builder with no time limit and no credit card. Upgrade only when you’re ready to connect a domain and go live.",
  },
  {
    question: "What’s the difference between Pro and Studio?",
    answer:
      "Pro is self-serve: unlimited projects, every premium template, and your own domain. Studio adds our design team — monthly design hours, a priority queue, and quarterly strategy reviews for teams that want expert hands on their site.",
  },
  {
    question: "Can I switch plans or cancel later?",
    answer:
      "Any time. Upgrades apply immediately with prorated billing, downgrades take effect at the end of the current cycle, and cancelling never deletes your projects — they stay editable on the Free plan.",
  },
  {
    question: "Do plans cover custom design work?",
    answer:
      "Studio includes monthly design hours for ongoing work. Larger one-off projects — full custom sites, ecommerce builds, rebrands — are scoped and quoted separately through our services team.",
  },
  {
    question: "Is there a discount for yearly billing?",
    answer:
      "Yes — yearly billing on Pro and Studio works out to two months free compared to paying monthly. The toggle above shows exactly what you save.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-24">
        <AmbientGlow />
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Pricing
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-gradient mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Simple plans, serious websites
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                Start free, upgrade when you launch, and bring in the studio
                when the stakes rise. No setup fees, no lock-in.
              </p>
            </FadeIn>
          </div>
          <div className="mt-16">
            <PricingPlans plans={pricingPlans} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="FAQ"
            title="Pricing, answered"
            description="Still unsure which plan fits? Write to hello@modulesoft.io and we’ll point you to the cheapest one that does the job."
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
                Need something bigger than a plan?
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
                Custom builds, ecommerce, rebrands — tell us the shape of the
                project and we’ll quote it in two business days.
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
