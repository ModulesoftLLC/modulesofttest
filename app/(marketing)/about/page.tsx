import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Gauge,
  HeartHandshake,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/shared/container";
import { SectionHeading } from "@/components/shared/section-heading";
import {
  AmbientGlow,
  FadeIn,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { stats, team } from "@/data/marketing";
import { initials } from "@/lib/format";

export const metadata: Metadata = {
  title: "About — MODULESOFT",
  description:
    "We’re a small studio with a big thesis: every business deserves a website that performs like a product. Meet the team behind MODULESOFT.",
};

const values: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Sparkles,
    title: "Craft over volume",
    description:
      "We’d rather ship one template that converts than ten that decorate. Every layout in the marketplace earns its place against real traffic.",
  },
  {
    icon: Gauge,
    title: "Performance is a promise",
    description:
      "Speed budgets are written at the top of every brief. A beautiful site that loads in four seconds is a beautiful site nobody sees.",
  },
  {
    icon: Compass,
    title: "Design as an argument",
    description:
      "Pages are sequenced like a persuasive case — promise, proof, product, ask. Polish comes after the argument is right.",
  },
  {
    icon: HeartHandshake,
    title: "Clients, not tickets",
    description:
      "Every engagement gets a named team from kickoff to launch. You’ll never explain your project twice to a stranger.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Story / mission */}
      <section className="relative overflow-hidden pt-40 pb-24">
        <AmbientGlow />
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                About MODULESOFT
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-gradient mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Websites, treated like products
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                MODULESOFT started as a design studio with an inconvenient
                observation: most of the web is rebuilt from scratch, badly,
                over and over. So we compressed fifteen years of client work
                into a marketplace of proven templates, a builder that feels
                like design software, and a studio that steps in when the
                stakes are high. Today more than a thousand businesses run on
                sites we designed — and every launch teaches the next one.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* Stats band */}
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

      {/* Values */}
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="What we believe"
            title="The values behind every launch"
            description="Four principles that decide what ships, what waits, and what never makes it past the design review."
          />
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="card-hover h-full rounded-xl border border-border bg-card p-7">
                  <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/25">
                    <value.icon className="size-5 text-white" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Team */}
      <section className="border-t border-border py-24">
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="Small team, senior hands"
            description="No account managers, no hand-offs into the void — the people below are the people on your project."
          />
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <div className="card-hover h-full rounded-xl border border-border bg-card p-7 text-center">
                  <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-lg font-semibold text-white shadow-lg shadow-indigo-500/25">
                    {initials(member.name)}
                  </span>
                  <h3 className="mt-5 font-semibold">{member.name}</h3>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wide text-indigo-400">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {member.bio}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <FadeIn>
            <div className="glow-primary relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-950/60 via-card to-card px-8 py-16 text-center sm:px-16">
              <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-0 h-64 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/30 blur-[100px]"
              />
              <h2 className="text-gradient relative text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
                Let’s build something worth launching
              </h2>
              <p className="relative mx-auto mt-4 max-w-lg text-pretty text-muted-foreground">
                Whether you start from a template or a blank brief, the same
                team and the same standards are behind it.
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
