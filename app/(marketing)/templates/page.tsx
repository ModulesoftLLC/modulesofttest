import type { Metadata } from "next";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/motion";
import { TemplateBrowser } from "@/components/templates/template-browser";
import { templates } from "@/data/templates";

export const metadata: Metadata = {
  title: "Загварууд — MODULESOFT",
  description:
    "Салбар бүрд зориулсан дээд зэрэглэлийн, хөрвүүлэлтэд бэлэн вэбсайтын загваруудыг үзээрэй. Шууд урьдчилан үзэж, бүтээгчээр өөрчилж, хэдхэн минутын дотор нээлтээ хийгээрэй.",
};

export default function TemplatesPage() {
  return (
    <section className="relative z-10 pb-24 pt-32">
      <Container>
        <FadeIn className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
            Загварын сан
          </p>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl">
            Тусгайлан бүтээсэн мэт <em>төгс</em> загварууд
          </h1>
          <p className="mt-5 text-pretty text-base leading-relaxed text-white/60 sm:text-lg">
            Салбар бүрд зориулж гараар урласан {templates.length} эхлэлийн цэг —
            бүгд хөрвүүлэлтэд тохируулагдсан, бүтээгч дээр минутын дотор өөрийн
            болгоход бэлэн.
          </p>
        </FadeIn>
        <div className="mt-14">
          <TemplateBrowser />
        </div>
      </Container>
    </section>
  );
}
