import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { OrderWizard } from "@/components/order/order-wizard";
import { Logo } from "@/components/shared/logo";
import { AmbientGlow } from "@/components/shared/motion";
import { getTemplateById } from "@/data/templates";

export const metadata: Metadata = {
  title: "Start a project",
  description:
    "Tell us about your project and our studio will reply within one business day.",
};

export default async function OrderPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const params = await searchParams;
  const template = params.template ? getTemplateById(params.template) : undefined;

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
      <AmbientGlow />

      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Logo />
        <Link
          href="/"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          Back to site
        </Link>
      </header>

      <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-8 sm:pt-12">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400">
            Start a project
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Let’s build something <span className="text-gradient">remarkable</span>
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            A few quick questions so our studio can scope your build. It takes
            about two minutes.
          </p>
        </div>

        <OrderWizard
          template={template ? { id: template.id, name: template.name } : null}
        />
      </main>
    </div>
  );
}
