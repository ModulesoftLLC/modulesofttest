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
import { FadeIn } from "@/components/shared/motion";
import { pricingPlans } from "@/data/marketing";
import { PricingPlans } from "./pricing-plans";

export const metadata: Metadata = {
  title: "Үнэ — MODULESOFT",
  description:
    "Үе шат бүрд тохирсон энгийн багцууд — үнэгүй туршиж, Pro-гоор нээлтээ хийж, дизайн студитэй маань хамтран ажиллаарай. Жилээр төлбөл хоёр сар үнэгүй.",
};

const faqs: { question: string; answer: string }[] = [
  {
    question: "Төлбөр төлөхөөс өмнө MODULESOFT-ыг туршиж болох уу?",
    answer:
      "Болно. Үнэгүй багц бүх загварыг үзэж, бүтээгч дээр бүтэн сайтын эх загварыг ямар ч хугацааны хязгаар, банкны картгүйгээр гаргах боломж олгодог. Домэйн холбож, сайтаа нээхэд бэлэн болсон үедээ л шинэчлээрэй.",
  },
  {
    question: "Pro болон Studio багц юугаараа ялгаатай вэ?",
    answer:
      "Pro бол өөрөө удирдах багц: хязгааргүй төсөл, бүх премиум загвар, өөрийн домэйн. Studio дээр нь манай дизайны багийг нэмдэг — сар бүрийн дизайны цаг, тэргүүн ээлжийн дараалал, сайтдаа мэргэжлийн гар хүсдэг багуудад улирал тутмын стратегийн хяналт.",
  },
  {
    question: "Дараа нь багцаа солих эсвэл цуцалж болох уу?",
    answer:
      "Хэзээ ч болно. Дээшлүүлэлт хувь тэнцүүлсэн төлбөртэйгөөр шууд хэрэгжиж, бууруулалт одоогийн мөчлөгийн төгсгөлд идэвхжинэ. Цуцлахад төслүүд тань хэзээ ч устахгүй — Үнэгүй багц дээр засварлагдахуйц хэвээр үлдэнэ.",
  },
  {
    question: "Багцад захиалгат дизайны ажил багтдаг уу?",
    answer:
      "Studio багцад тогтмол ажилд зориулсан сар бүрийн дизайны цаг багтдаг. Томоохон нэг удаагийн төслүүд — бүрэн захиалгат сайт, цахим худалдаа, брэнд шинэчлэл — манай үйлчилгээний багаар тусад нь тооцогдож, үнийн санал гардаг.",
  },
  {
    question: "Жилээр төлбөл хөнгөлөлт байдаг уу?",
    answer:
      "Тийм — Pro болон Studio багцыг жилээр төлөх нь сараар төлөхтэй харьцуулахад хоёр сар үнэгүйтэй тэнцдэг. Дээрх шилжүүлэгч таны хэмнэлтийг яг таг харуулна.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="pt-32 pb-24">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong mx-auto max-w-2xl rounded-[2.5rem] px-8 py-14 text-center sm:px-14">
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  ҮНИЙН БАГЦУУД
                </p>
                <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl">
                  Энгийн багц, <em className="text-white/80">ноцтой</em>{" "}
                  вэбсайт
                </h1>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-white/60">
                  Үнэгүй эхэлж, нээлт хийхдээ шинэчилж, чухал мөчид студиэ
                  дуудаарай. Тохиргооны төлбөр ч үгүй, хараат байдал ч үгүй.
                </p>
              </div>
            </div>
          </FadeIn>
          <div className="mt-16">
            <PricingPlans plans={pricingPlans} />
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="pb-24">
        <Container>
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              ТҮГЭЭМЭЛ АСУУЛТ
            </p>
            <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Үнийн талаарх <em className="text-white/80">хариултууд</em>
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
              Аль багц тохирохоо мэдэхгүй хэвээр байна уу? hello@modulesoft.io
              хаяг руу бичээрэй — ажлаа бүтээх хамгийн хямд багцыг зааж өгье.
            </p>
          </FadeIn>
          <FadeIn className="mx-auto max-w-2xl">
            <div className="liquid-glass rounded-3xl px-6 py-2 sm:px-8">
              <div className="relative z-10">
                <Accordion>
                  {faqs.map((faq) => (
                    <AccordionItem
                      key={faq.question}
                      value={faq.question}
                      className="not-last:border-b not-last:border-white/10"
                    >
                      <AccordionTrigger className="text-base text-white">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-white/60">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong rounded-[2.5rem] px-8 py-16 text-center sm:px-16">
              <div className="relative z-10">
                <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Багцаас <em className="text-white/80">том</em> зүйл хэрэгтэй
                  юу?
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-white/60">
                  Захиалгат бүтээн байгуулалт, цахим худалдаа, брэнд шинэчлэл
                  — төслийнхөө хэлбэрийг хэлээрэй, бид ажлын хоёр өдрийн дотор
                  үнийн санал гаргана.
                </p>
                <div className="mt-9 flex justify-center">
                  <Link
                    href="/order"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
                  >
                    Төсөл эхлүүлэх <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
