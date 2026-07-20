import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Gem,
  LayoutDashboard,
  Paintbrush,
  PenTool,
  ShoppingCart,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { services } from "@/data/marketing";
import { formatCurrency } from "@/lib/format";

export const metadata: Metadata = {
  title: "Үйлчилгээ — MODULESOFT",
  description:
    "Загвар тохируулгаас бүрэн захиалгат бүтээн байгуулалт хүртэл — MODULESOFT студи үр дүн авчирдаг вэбсайтуудыг зохион бүтээж, хөгжүүлж, өсгөдөг.",
};

const serviceIcons: Record<string, LucideIcon> = {
  Paintbrush,
  PenTool,
  ShoppingCart,
  LayoutDashboard,
  Gem,
  TrendingUp,
};

const process: { title: string; description: string }[] = [
  {
    title: "Судалгаа",
    description:
      "Таны байр суурь, харилцагчид, худалдан авалтын зорилгод чиглэсэн төвлөрсөн воркшоп — цаашдын бүх шийдвэрийн үндэс.",
  },
  {
    title: "Дизайн",
    description:
      "Эхлээд бүтэц, дараа нь гоо сайхан. Хуудсуудыг үнэмшүүлэх дараалалд оруулж, дараа нь визуал системийг барьдаг.",
  },
  {
    title: "Хөгжүүлэлт",
    description:
      "Пиксел бүрд үнэнч, хурдны төсөвтэй хэрэгжүүлэлт — фонт шахагдсан, зураг хэмжээгээ олсон, хөдөлгөөн зөв давхаргад.",
  },
  {
    title: "Нээлт",
    description:
      "Домэйн, аналитик, чиглүүлэлт, бүх төхөөрөмж дээрх шалгалт. Нээлтийн өдөр бол адал явдал биш — жагсаалт.",
  },
  {
    title: "Өсөлт",
    description:
      "Нээлтийн дараа бодит өгөгдөл дээр тулгуурласан сайжруулалт — A/B тест, агуулгын шинэчлэл, хурдны хяналт.",
  },
];

const faqs: { question: string; answer: string }[] = [
  {
    question: "Нэг төсөл ерөнхийдөө хэр удаан үргэлжилдэг вэ?",
    answer:
      "Загвар тохируулга ихэвчлэн нэгээс хоёр долоо хоногт дуусдаг. Бүрэн захиалгат маркетингийн сайт хуудасны тооноос хамааран дөрвөөс найман долоо хоног, харин цахим худалдаа болон вэб апп төслүүд тус тусад нь тооцогддог — ихэнх нь зургаагаас арван хоёр долоо хоногт багтдаг.",
  },
  {
    question: "Эхлээд загвар худалдаж авах шаардлагатай юу?",
    answer:
      "Үгүй. Хэрэв загвар зөв эхлэл бол түүний үнэ төслийн нийт үнэд шингэдэг. Хэрэв таны төсөлд хоосон цаас хэрэгтэй бол бид загварын санг алгасаад шууд таны даалгавраас дизайн хийдэг.",
  },
  {
    question: "Нээлтийн дараа вэбсайтыг хэн эзэмших вэ?",
    answer:
      "Та эзэмшинэ — дизайны файл, код, агуулга, домэйн бүгд таных. Ямар ч хараат байдал үгүй: бидний бүтээсэн сайтууд орчин үеийн стандарт технологи дээр ажилладаг тул та бидэнтэй ч, өөр хаана ч байршуулж болно.",
  },
  {
    question: "Манай одоо байгаа брэндтэй ажиллаж чадах уу?",
    answer:
      "Мэдээж. Ихэнх төсөл одоо байгаа брэндээс эхэлдэг. Хэрэв брэнд өөрөө засвар шаардаж байвал манай брэнд ба таних тэмдгийн үйлчилгээ вэбсайтын өмнө хийгдэж, бүгд нэгдмэл гарах боломжтой.",
  },
  {
    question: "Сайт нээгдсэний дараа юу болох вэ?",
    answer:
      "Нээлт бүр гучин хоногийн дэмжлэгтэй ирдэг. Дараа нь Арчилгаа ба Өсөлтийн багц сар бүрийн дизайны цаг, хурдны хяналт, A/B тестийг хамардаг — таны вэбсайт төсөл биш, бүтээгдэхүүн шиг арчлагдана.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong mx-auto max-w-3xl rounded-[2.5rem] px-8 py-14 text-center sm:px-14">
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  СТУДИЙН ҮЙЛЧИЛГЭЭ
                </p>
                <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl">
                  Пиксел бүрийг <em className="text-white/80">төгс</em> хийж
                  өгнө
                </h1>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-white/60">
                  Манай загварын санг бүтээдэг баг улирал бүр цөөн тооны
                  захиалгат төсөл хүлээн авдаг — адилхан стандарт, адилхан
                  хурдны төсөв, харин хаалган дээр таны нэр.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Services grid */}
      <section className="pb-24">
        <Container>
          <Stagger className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = serviceIcons[service.icon] ?? Sparkles;
              return (
                <StaggerItem key={service.id}>
                  <div className="liquid-glass flex h-full flex-col rounded-3xl p-7 transition-transform hover:scale-105">
                    <div className="relative z-10 flex flex-1 flex-col">
                      <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                        <Icon className="size-4 text-white" />
                      </span>
                      <h2 className="mt-5 text-lg font-medium text-white">
                        {service.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-white/60">
                        {service.description}
                      </p>
                      <ul className="mt-5 flex-1 space-y-2.5">
                        {service.deliverables.map((deliverable) => (
                          <li
                            key={deliverable}
                            className="flex items-start gap-2.5 text-sm text-white/80"
                          >
                            <Check className="mt-0.5 size-4 shrink-0 text-white/60" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-6 pt-5 text-sm text-white/60">
                        <span className="text-base font-medium text-white">
                          {formatCurrency(service.startingPrice)}
                        </span>
                        -с эхэлнэ
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </Container>
      </section>

      {/* Process timeline */}
      <section className="pb-24">
        <Container>
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              АЖЛЫН ЯВЦ
            </p>
            <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Таван үе шат, тэг <em className="text-white/80">гэнэтийн</em>{" "}
              зүйл
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
              Төсөл бүр нэг ижил нурууг дагадаг тул та одоо юу болж байгааг
              болон дараа нь юу ирэхийг үргэлж мэдэж байх болно.
            </p>
          </FadeIn>
          <Stagger className="grid gap-6 md:grid-cols-5">
            {process.map((phase, index) => (
              <StaggerItem key={phase.title} className="relative">
                <div className="liquid-glass h-full rounded-3xl p-5">
                  <div className="relative z-10">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white">
                      {index + 1}
                    </span>
                    <h3 className="mt-4 font-medium text-white">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {phase.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
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
              Харилцагчдын <em className="text-white/80">бодит</em> асуултууд
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
              Өөр асуух зүйл байвал hello@modulesoft.io хаяг руу бичээрэй —
              ажлын нэг өдрийн дотор жинхэнэ хүн хариулна.
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
                  Юу бүтээхээ <em className="text-white/80">бидэнд</em>{" "}
                  хэлээрэй
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-white/60">
                  Товч даалгавраа илгээгээрэй — бид санал болгох арга барил,
                  хугацааны төлөвлөгөө, тогтсон үнийн саналыг ихэвчлэн ажлын
                  хоёр өдрийн дотор буцаан хүргэнэ.
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
