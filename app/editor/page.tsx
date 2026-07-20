import type { Metadata } from "next";
import { CodeEditor } from "@/components/code-editor/code-editor";

export const metadata: Metadata = {
  title: "Код засварлагч",
  description:
    "HTML, CSS, JavaScript кодоо шууд бичиж, үр дүнг нь бодит цагт урьдчилан үзээрэй.",
};

export default async function EditorPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const params = await searchParams;
  return <CodeEditor fromBuilder={params.from === "builder"} />;
}
