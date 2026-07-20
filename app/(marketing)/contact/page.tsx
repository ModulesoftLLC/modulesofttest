import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { AmbientGlow, FadeIn } from "@/components/shared/motion";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Contact — MODULESOFT",
  description:
    "Questions, ideas, or a project brief — write to the MODULESOFT team and a real person replies within one business day.",
};

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      <AmbientGlow />
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — contact info */}
          <div>
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Contact
              </p>
              <h1 className="text-gradient mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
                Talk to a human
              </h1>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
                No chatbots, no ticket numbers. Write to us about anything —
                templates, plans, or a project you’re circling — and someone
                on the team answers personally.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-10 space-y-6">
              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10">
                  <Mail className="size-5 text-indigo-400" />
                </span>
                <div>
                  <p className="font-semibold">Email</p>
                  <a
                    href="mailto:hello@modulesoft.io"
                    className="mt-1 block text-sm text-indigo-400 underline-offset-4 hover:underline"
                  >
                    hello@modulesoft.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10">
                  <MapPin className="size-5 text-indigo-400" />
                </span>
                <div>
                  <p className="font-semibold">Offices</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Oranienstraße 24, 10999 Berlin
                  </p>
                  <p className="text-sm text-muted-foreground">
                    77 Greene Street, New York, NY 10012
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-indigo-400/30 bg-indigo-500/10">
                  <Clock className="size-5 text-indigo-400" />
                </span>
                <div>
                  <p className="font-semibold">Response time</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Every message gets a reply within one business day —
                    usually much faster during European and US East Coast
                    hours.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-10 rounded-xl border border-indigo-400/20 bg-indigo-500/5 p-6">
                <p className="font-semibold">Have a project in mind?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Project requests move fastest through our structured brief —
                  budget, timeline, and scope in one pass, quote back in two
                  business days.
                </p>
                <Link
                  href="/order"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-indigo-400 underline-offset-4 hover:underline"
                >
                  Start a project brief <ArrowRight className="size-4" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right — form */}
          <FadeIn delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
