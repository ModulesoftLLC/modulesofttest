import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PreviewFrame } from "@/components/templates/preview-frame";
import { getTemplateBySlug, templates } from "@/data/templates";

export function generateStaticParams() {
  return templates.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return { title: "Preview — MODULESOFT" };
  return {
    title: `${template.name} preview — MODULESOFT`,
    description: `Live preview of the ${template.name} template.`,
  };
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return notFound();
  return <PreviewFrame template={template} />;
}
