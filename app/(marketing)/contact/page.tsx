import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/motion";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "Холбоо барих — MODULESOFT",
  description:
    "Асуулт, санаа, төслийн даалгавар — MODULESOFT багт бичээрэй. Ажлын нэг өдрийн дотор жинхэнэ хүн хариу өгнө.",
};

export default function ContactPage() {
  return (
    <section className="pt-32 pb-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — contact info */}
          <div>
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                ХОЛБОО БАРИХ
              </p>
              <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
                Жинхэнэ <em className="text-white/80">хүнтэй</em> ярилцаарай
              </h1>
              <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-white/60">
                Чатбот ч үгүй, тасалбарын дугаар ч үгүй. Загвар, багц эсвэл
                эргэцүүлж яваа төслийнхөө талаар юу ч бай бичээрэй — багийн
                гишүүн биечлэн хариулна.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} className="mt-10 space-y-4">
              <div className="liquid-glass flex items-start gap-4 rounded-3xl p-5">
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail className="size-4 text-white" />
                </span>
                <div className="relative z-10">
                  <p className="font-medium text-white">Имэйл</p>
                  <a
                    href="mailto:hello@modulesoft.io"
                    className="mt-1 block text-sm text-white/70 underline-offset-4 hover:underline"
                  >
                    hello@modulesoft.io
                  </a>
                </div>
              </div>

              <div className="liquid-glass flex items-start gap-4 rounded-3xl p-5">
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MapPin className="size-4 text-white" />
                </span>
                <div className="relative z-10">
                  <p className="font-medium text-white">Оффис</p>
                  <p className="mt-1 text-sm text-white/60">
                    Oranienstraße 24, 10999 Берлин
                  </p>
                  <p className="text-sm text-white/60">
                    77 Greene Street, Нью-Йорк, NY 10012
                  </p>
                </div>
              </div>

              <div className="liquid-glass flex items-start gap-4 rounded-3xl p-5">
                <span className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Clock className="size-4 text-white" />
                </span>
                <div className="relative z-10">
                  <p className="font-medium text-white">Хариу өгөх хугацаа</p>
                  <p className="mt-1 text-sm text-white/60">
                    Зурвас бүр ажлын нэг өдрийн дотор хариугаа авдаг —
                    ихэнхдээ бүр ч хурдан.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="liquid-glass mt-10 rounded-3xl p-6">
                <div className="relative z-10">
                  <p className="font-medium text-white">Төслийн санаа байна уу?</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                    Төслийн хүсэлтүүд бүтэцтэй даалгавраар хамгийн хурдан
                    урагшилдаг — төсөв, хугацаа, цар хүрээг нэг дор бөглөхөд
                    ажлын хоёр өдрийн дотор үнийн санал ирнэ.
                  </p>
                  <Link
                    href="/order"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white underline-offset-4 transition-transform hover:scale-105 hover:underline"
                  >
                    Төслийн даалгавар эхлүүлэх{" "}
                    <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right — form */}
          <FadeIn delay={0.15}>
            <ContactForm />
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
