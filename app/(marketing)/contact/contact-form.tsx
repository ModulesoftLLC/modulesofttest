"use client";

import { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="liquid-glass-strong flex h-full min-h-[420px] flex-col items-center justify-center rounded-[2.5rem] p-10 text-center">
        <span className="relative z-10 flex size-14 items-center justify-center rounded-full bg-white/10">
          <CheckCircle2 className="size-7 text-white" />
        </span>
        <h3 className="relative z-10 mt-6 text-xl font-medium text-white">
          Зурвас илгээгдлээ
        </h3>
        <p className="relative z-10 mt-2 max-w-sm text-sm leading-relaxed text-white/60">
          Бидэнтэй холбогдсонд баярлалаа — ажлын нэг өдрийн дотор жинхэнэ хүн
          хариу бичнэ. Хэрэв яаралтай бол нэмэлт зурвастаа дурдаарай, бид
          таныг ээлжийн эхэнд оруулна.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="relative z-10 mt-8 text-sm font-medium text-white underline-offset-4 transition-transform hover:scale-105 hover:underline"
        >
          Дахин зурвас илгээх
        </button>
      </div>
    );
  }

  return (
    <form
      className="liquid-glass-strong rounded-[2.5rem] p-8"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="relative z-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="contact-name" className="text-white">
              Нэр
            </Label>
            <Input
              id="contact-name"
              name="name"
              placeholder="Б. Ганбат"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact-email" className="text-white">
              Имэйл
            </Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              placeholder="ganbat@company.mn"
              required
            />
          </div>
        </div>
        <div className="mt-5 grid gap-2">
          <Label htmlFor="contact-company" className="text-white">
            Компани{" "}
            <span className="font-normal text-white/50">(заавал биш)</span>
          </Label>
          <Input
            id="contact-company"
            name="company"
            placeholder="Компани ХХК"
          />
        </div>
        <div className="mt-5 grid gap-2">
          <Label htmlFor="contact-message" className="text-white">
            Зурвас
          </Label>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder="Төсөл, асуулт эсвэл санаагаа бидэнтэй товчхон хуваалцаарай…"
            required
            className="min-h-32"
          />
        </div>
        <button
          type="submit"
          className="mt-7 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
        >
          Зурвас илгээх <Send className="size-4" />
        </button>
        <p className="mt-4 text-center text-xs text-white/50">
          Таны мэдээллийг зөвхөн хариу бичихэд ашиглана — таны хүсээгүй
          мэйлийн жагсаалтад хэзээ ч оруулахгүй.
        </p>
      </div>
    </form>
  );
}
