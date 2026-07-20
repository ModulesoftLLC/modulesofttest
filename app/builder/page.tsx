import { getTemplateBySlug } from "@/data/templates";
import { Editor, type TemplateSeed } from "@/components/builder/editor";

export const metadata = {
  title: "Вэбсайт бүтээгч",
  description:
    "Вэбсайтаа нүдээр харж бүтээ — хэсгүүдээ эрэмбэлж, загвараа тохируулан, төхөөрөмж бүр дээр урьдчилан үзээрэй.",
};

export default async function BuilderPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>;
}) {
  const params = await searchParams;
  const template = params.template
    ? getTemplateBySlug(params.template)
    : undefined;

  const seed: TemplateSeed | null = template
    ? { name: template.name, palette: template.palette }
    : null;

  return (
    <main className="h-screen overflow-hidden bg-background text-foreground">
      <Editor template={seed} />
    </main>
  );
}
