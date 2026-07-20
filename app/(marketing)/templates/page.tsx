import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { AmbientGlow, FadeIn } from "@/components/shared/motion";
import { TemplateBrowser } from "@/components/templates/template-browser";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "Templates — MODULESOFT",
  description:
    "Browse premium, conversion-ready website templates for every industry. Preview live, customize in the builder, and launch in minutes.",
};

export default function TemplatesPage() {
  return (
    <section className="relative overflow-hidden pb-24 pt-32">
      <AmbientGlow />
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Marketplace
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            Templates that look{" "}
            <span className="text-gradient">custom-built</span>
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {templates.length} hand-crafted starting points across every
            industry — each one wired for conversion and ready to make yours in
            the builder. No stock-photo sameness, no lorem ipsum.
          </p>
        </FadeIn>
        <div className="mt-14">
          <TemplateBrowser />
        </div>
      </Container>
    </section>
  );
}
