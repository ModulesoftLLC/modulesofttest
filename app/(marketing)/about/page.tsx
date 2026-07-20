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
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { stats, team } from "@/data/marketing";
import { initials } from "@/lib/format";

export const metadata: Metadata = {
  title: "Бидний тухай — MODULESOFT",
  description:
    "Бизнес бүр бүтээгдэхүүн шиг ажилладаг вэбсайттай байх ёстой гэсэн том итгэл үнэмшилтэй жижиг студи. MODULESOFT-ын ард буй багтай танилцаарай.",
};

const values: {
  icon: LucideIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: Sparkles,
    title: "Тоо биш, чанар",
    description:
      "Гоёл болж өлгөгддөг арван загвараас худалдан авалт авчирдаг ганц загварыг бид илүүд үздэг. Манай сангийн хуудас бүр бодит хандалтын өмнө өөрийн байр сууриа хамгаалдаг.",
  },
  {
    icon: Gauge,
    title: "Хурд бол амлалт",
    description:
      "Даалгавар бүрийн эхний мөрөнд хурдны төсөв бичигддэг. Дөрвөн секундэд ачаалагддаг үзэсгэлэнтэй сайтыг хэн ч харж амждаггүй.",
  },
  {
    icon: Compass,
    title: "Дизайн бол баримтлал",
    description:
      "Хуудсуудыг үнэмшүүлэх өгүүлэмж шиг дараалалд оруулдаг — амлалт, нотолгоо, бүтээгдэхүүн, урилга. Гоо сайхан нь баримтлал зөв болсны дараа ирдэг.",
  },
  {
    icon: HeartHandshake,
    title: "Тасалбар биш, харилцагч",
    description:
      "Төсөл бүрд эхлэлээс нээлт хүртэл тогтсон нэг баг ажилладаг. Та төслөө танихгүй хүнд дахин тайлбарлах шаардлага хэзээ ч гарахгүй.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Story / mission */}
      <section className="relative pt-32 pb-16">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong mx-auto max-w-3xl rounded-[2.5rem] px-8 py-14 text-center sm:px-14">
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  MODULESOFT-ын тухай
                </p>
                <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl">
                  Вэбсайтыг <em className="text-white/80">бүтээгдэхүүн</em> шиг
                </h1>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-white/60">
                  MODULESOFT нэгэн эвгүй ажиглалтаас төрсөн: вэбийн ихэнх хэсэг
                  дахин дахин, тэр болгондоо муугаар, тэгээс бүтээгддэг. Тиймээс
                  бид арван таван жилийн харилцагчийн туршлагаа батлагдсан
                  загваруудын сан, дизайны программ шиг мэдрэгддэг бүтээгч,
                  чухал мөчид туслах студи болгон шахаж гаргасан. Өнөөдөр мянга
                  гаруй бизнес бидний бүтээсэн сайтууд дээр ажиллаж байгаа
                  бөгөөд нээлт бүр дараагийнхаа сургамж болдог.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Stats band */}
      <section className="pb-16">
        <Container>
          <FadeIn>
            <div className="liquid-glass rounded-[2.5rem] px-8 py-10">
              <Stagger className="relative z-10 grid grid-cols-2 gap-10 lg:grid-cols-4">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label} className="text-center">
                    <p className="text-4xl font-medium tracking-tight text-white">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-sm text-white/60">{stat.label}</p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16">
        <Container>
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              БИДНИЙ ИТГЭЛ ҮНЭМШИЛ
            </p>
            <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Нээлт бүрийн ард буй{" "}
              <em className="text-white/80">үнэт зүйлс</em>
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
              Юу нийтлэгдэх, юу хүлээх, юу дизайны хяналтыг хэзээ ч
              давахгүйг шийддэг дөрвөн зарчим.
            </p>
          </FadeIn>
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {values.map((value) => (
              <StaggerItem key={value.title}>
                <div className="liquid-glass h-full rounded-3xl p-7 transition-transform hover:scale-105">
                  <div className="relative z-10">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                      <value.icon className="size-4 text-white" />
                    </span>
                    <h3 className="mt-5 text-lg font-medium text-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {value.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* Team */}
      <section className="py-16">
        <Container>
          <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
              БАГ ХАМТ ОЛОН
            </p>
            <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Жижиг баг, <em className="text-white/80">туршлагатай</em> гар
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-white/60">
              Данс хөтлөгч ч үгүй, хоосон орон зай руу дамжуулах ажил ч үгүй
              — доорх хүмүүс яг таны төсөл дээр ажиллана.
            </p>
          </FadeIn>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.id}>
                <div className="liquid-glass h-full rounded-3xl p-7 text-center transition-transform hover:scale-105">
                  <div className="relative z-10">
                    <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-white/10 text-lg font-medium text-white">
                      {initials(member.name)}
                    </span>
                    <h3 className="mt-5 font-medium text-white">
                      {member.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-white/50">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 pb-24">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong rounded-[2.5rem] px-8 py-16 text-center sm:px-16">
              <div className="relative z-10">
                <h2 className="text-balance text-3xl font-medium tracking-tight text-white sm:text-4xl">
                  Нээхэд <em className="text-white/80">үнэ цэнтэй</em> зүйлийг
                  хамтдаа бүтээе
                </h2>
                <p className="mx-auto mt-4 max-w-lg text-pretty text-white/60">
                  Загвараас эхэлсэн ч, хоосон даалгавраас эхэлсэн ч — ард нь
                  адилхан баг, адилхан стандарт байх болно.
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
