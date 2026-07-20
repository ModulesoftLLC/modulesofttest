"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Car,
  Check,
  Clock,
  Dumbbell,
  MapPin,
  Monitor,
  ShoppingBag,
  Smartphone,
  Star,
  Tablet,
  UtensilsCrossed,
  Waves,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Template, Viewport } from "@/types";

const viewports: {
  id: Viewport;
  icon: LucideIcon;
  label: string;
  width: string;
}[] = [
  { id: "desktop", icon: Monitor, label: "Компьютер", width: "100%" },
  { id: "tablet", icon: Tablet, label: "Таблет", width: "768px" },
  { id: "mobile", icon: Smartphone, label: "Утас", width: "390px" },
];

export function PreviewFrame({ template }: { template: Template }) {
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const activeWidth = viewports.find((v) => v.id === viewport)?.width ?? "100%";

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Toolbar — MODULESOFT chrome, grayscale liquid glass */}
      <header className="liquid-glass relative z-10 flex h-14 shrink-0 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/templates/${template.slug}`}
            className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/15 hover:text-white"
            aria-label="Буцах"
            title="Буцах"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold leading-tight text-white">
              {template.name}
            </p>
            <p className="hidden truncate text-xs text-white/50 sm:block">
              Шууд харагдац
            </p>
          </div>
        </div>

        {/* Viewport switcher */}
        <div className="liquid-glass absolute left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full p-1">
          {viewports.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => setViewport(id)}
              aria-label={label}
              title={label}
              aria-pressed={viewport === id}
              className={cn(
                "flex size-8 items-center justify-center rounded-full transition-all",
                viewport === id
                  ? "bg-white text-black shadow-lg shadow-black/20"
                  : "text-white/50 hover:text-white"
              )}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>

        <Link
          href={`/builder?template=${template.slug}`}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-white px-4 text-sm font-medium text-black transition-transform hover:scale-105 active:scale-95"
        >
          <span className="hidden sm:inline">Энэ загварыг ашиглах</span>
          <span className="sm:hidden">Ашиглах</span>
          <ArrowUpRight className="size-4" />
        </Link>
      </header>

      {/* Canvas */}
      <div className="bg-grid flex-1 overflow-y-auto bg-white/[0.02] px-4 py-8 sm:px-8">
        <motion.div
          animate={{ width: activeWidth }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40"
          style={{ width: activeWidth }}
        >
          <DemoSite template={template} viewport={viewport} />
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* Generated demo site — a simulated render of the customer's website, built  */
/* per category from the template's real photos and palette. The demo itself  */
/* is intentionally colorful; only the surrounding chrome stays grayscale.    */
/* ------------------------------------------------------------------------- */

interface DemoProps {
  template: Template;
  compact: boolean;
  cols: string;
  gradient: string;
  gradientText: React.CSSProperties;
}

function DemoSite({
  template,
  viewport,
}: {
  template: Template;
  viewport: Viewport;
}) {
  const { from, to, surface } = template.palette;
  const compact = viewport === "mobile";
  const gradient = `linear-gradient(100deg, ${from}, ${to})`;
  const gradientText = {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
  } as const;

  const cols =
    viewport === "desktop"
      ? "grid-cols-3"
      : viewport === "tablet"
        ? "grid-cols-3"
        : "grid-cols-1";

  const props: DemoProps = { template, compact, cols, gradient, gradientText };

  return (
    <div
      className="text-white"
      style={{ backgroundColor: surface }}
      aria-label={`${template.name} загварын демо харагдац`}
    >
      {(() => {
        switch (template.category) {
          case "restaurant":
            return <RestaurantDemo {...props} />;
          case "hotel":
            return <HotelDemo {...props} />;
          case "ecommerce":
            return <EcommerceDemo {...props} />;
          case "portfolio":
            return <PortfolioDemo {...props} />;
          case "ai-startup":
            return <AiStartupDemo {...props} />;
          case "landing-page":
            return <LandingDemo {...props} />;
          default:
            return <InstitutionDemo {...props} />;
        }
      })()}
    </div>
  );
}

/* --------------------------------- Shared -------------------------------- */

function DemoImg({
  src,
  alt = "",
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("size-full object-cover", className)}
    />
  );
}

function DemoNav({
  template,
  compact,
  gradient,
  links,
  cta,
  transparent = false,
}: {
  template: Template;
  compact: boolean;
  gradient: string;
  links: string[];
  cta: string;
  transparent?: boolean;
}) {
  return (
    <nav
      className={cn(
        "flex items-center justify-between px-6 py-4",
        transparent
          ? "absolute inset-x-0 top-0 z-10"
          : "border-b border-white/10"
      )}
    >
      <span className={cn("font-bold", compact ? "text-sm" : "text-base")}>
        {template.name}
      </span>
      {!compact && (
        <div className="flex items-center gap-5 text-xs text-white/70">
          {links.map((link) => (
            <span key={link} className="transition-colors hover:text-white">
              {link}
            </span>
          ))}
        </div>
      )}
      <span
        className="rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
        style={{ background: gradient }}
      >
        {cta}
      </span>
    </nav>
  );
}

function ImageHero({
  template,
  compact,
  gradient,
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  children,
}: {
  template: Template;
  compact: boolean;
  gradient: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <DemoImg src={template.image} />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
      </div>
      <div
        className={cn(
          "relative text-center",
          compact ? "px-5 pb-16 pt-24" : "px-10 pb-28 pt-40"
        )}
      >
        <p className="mx-auto mb-4 w-fit rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm">
          {eyebrow}
        </p>
        <h1
          className={cn(
            "mx-auto max-w-2xl font-semibold leading-tight tracking-tight drop-shadow-lg",
            compact ? "text-3xl" : "text-5xl"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "mx-auto mt-4 max-w-xl text-white/80",
            compact ? "text-xs" : "text-base"
          )}
        >
          {subtitle}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <span
            className={cn(
              "rounded-full font-medium text-white shadow-lg",
              compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
            )}
            style={{ background: gradient }}
          >
            {primaryCta}
          </span>
          {secondaryCta && (
            <span
              className={cn(
                "rounded-full border border-white/30 bg-black/20 font-medium text-white/90 backdrop-blur-sm",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
            >
              {secondaryCta}
            </span>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

function SectionTitle({
  compact,
  title,
  subtitle,
}: {
  compact: boolean;
  title: string;
  subtitle?: string;
}) {
  return (
    <>
      <h2
        className={cn(
          "mb-2 text-center font-semibold",
          compact ? "text-lg" : "text-2xl"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mx-auto mb-10 max-w-md text-center text-white/50",
            compact ? "mb-8 text-xs" : "text-sm"
          )}
        >
          {subtitle}
        </p>
      )}
    </>
  );
}

function DemoFooter({
  template,
  compact,
  gradientText,
  columns = ["Цэс", "Компани", "Холбоо барих"],
}: {
  template: Template;
  compact: boolean;
  gradientText: React.CSSProperties;
  columns?: string[];
}) {
  return (
    <footer
      className={cn(
        "border-t border-white/10 bg-black/20",
        compact ? "px-5 py-8" : "px-10 py-12"
      )}
    >
      <div
        className={cn(
          "flex gap-8",
          compact ? "flex-col" : "items-start justify-between"
        )}
      >
        <div>
          <span
            className={cn("font-bold", compact ? "text-sm" : "text-base")}
            style={gradientText}
          >
            {template.name}
          </span>
          <p
            className={cn(
              "mt-2 max-w-xs text-white/45",
              compact ? "text-[0.65rem]" : "text-xs"
            )}
          >
            {template.tagline}
          </p>
        </div>
        <div className={cn("flex gap-10", compact && "gap-8")}>
          {columns.map((col) => (
            <div key={col} className="space-y-2">
              <p
                className={cn(
                  "font-medium text-white/80",
                  compact ? "text-[0.7rem]" : "text-xs"
                )}
              >
                {col}
              </p>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-1.5 rounded-full bg-white/15"
                  style={{ width: `${52 - i * 10}px` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <p
        className={cn(
          "mt-8 border-t border-white/10 pt-5 text-white/35",
          compact ? "text-[0.6rem]" : "text-xs"
        )}
      >
        © 2026 {template.name}. MODULESOFT дээр бүтээв.
      </p>
    </footer>
  );
}

/* ------------------------------- Restaurant ------------------------------- */

function RestaurantDemo({
  template,
  compact,
  cols,
  gradient,
  gradientText,
}: DemoProps) {
  const dishes = [
    { name: "Тогоочийн онцлох хоол", price: "48,000₮" },
    { name: "Улирлын шинэхэн салат", price: "26,000₮" },
    { name: "Гар аргаар хийсэн амттан", price: "18,000₮" },
  ];

  return (
    <>
      <div className="relative">
        <DemoNav
          template={template}
          compact={compact}
          gradient={gradient}
          links={["Нүүр", "Цэс", "Арга хэмжээ", "Холбоо барих"]}
          cta="Ширээ захиалах"
          transparent
        />
        <ImageHero
          template={template}
          compact={compact}
          gradient={gradient}
          eyebrow="Тавтай морил"
          title={template.name}
          subtitle={template.tagline}
          primaryCta="Ширээ захиалах"
          secondaryCta="Цэс үзэх"
        />
      </div>

      {/* Signature dishes */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle
          compact={compact}
          title="Онцлох хоолнууд"
          subtitle="Тогоочийн маань хамгийн их санал болгодог, зочдын хайртай амтууд."
        />
        <div className={cn("grid gap-4", cols)}>
          {template.gallery.map((photo, i) => (
            <div
              key={photo}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <div className={cn("overflow-hidden", compact ? "h-36" : "h-44")}>
                <DemoImg src={photo} />
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <p
                  className={cn(
                    "font-medium",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  {dishes[i]?.name}
                </p>
                <span
                  className={cn(
                    "shrink-0 font-semibold",
                    compact ? "text-xs" : "text-sm"
                  )}
                  style={gradientText}
                >
                  {dishes[i]?.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote */}
      <section
        className={cn(
          "border-y border-white/10 bg-white/[0.03]",
          compact ? "px-5 py-12" : "px-10 py-16"
        )}
      >
        <figure className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star
                key={i}
                className="size-4 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
          <blockquote
            className={cn(
              "text-balance font-medium leading-relaxed",
              compact ? "text-sm" : "text-xl"
            )}
          >
            “Хотын хамгийн уур амьсгалтай газар. Хоол бүр нь жижигхэн баяр
            шиг — бид сар бүр эргэж очдог.”
          </blockquote>
          <figcaption
            className={cn(
              "mt-4 text-white/50",
              compact ? "text-[0.65rem]" : "text-xs"
            )}
          >
            Б. Номин-Эрдэнэ — байнгын зочин
          </figcaption>
        </figure>
      </section>

      {/* Hours + location */}
      <section
        className={cn(
          "grid gap-6",
          compact ? "px-5 py-12" : "grid-cols-2 px-10 py-16"
        )}
      >
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
          <div
            className="mb-3 flex size-9 items-center justify-center rounded-full text-white"
            style={{ background: gradient }}
          >
            <Clock className="size-4" />
          </div>
          <p className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
            Ажиллах цаг
          </p>
          <p
            className={cn(
              "mt-2 text-white/60",
              compact ? "text-xs" : "text-sm"
            )}
          >
            Даваа–Баасан: 11:00 – 22:00
            <br />
            Бямба–Ням: 12:00 – 24:00
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.04] p-6">
          <div
            className="mb-3 flex size-9 items-center justify-center rounded-full text-white"
            style={{ background: gradient }}
          >
            <MapPin className="size-4" />
          </div>
          <p className={cn("font-semibold", compact ? "text-sm" : "text-base")}>
            Байршил
          </p>
          <p
            className={cn(
              "mt-2 text-white/60",
              compact ? "text-xs" : "text-sm"
            )}
          >
            Сөүлийн гудамж 12, Сүхбаатар дүүрэг,
            <br />
            Улаанбаатар хот
          </p>
        </div>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
        columns={["Цэс", "Захиалга", "Холбоо барих"]}
      />
    </>
  );
}

/* ---------------------------------- Hotel --------------------------------- */

function HotelDemo({
  template,
  compact,
  cols,
  gradient,
  gradientText,
}: DemoProps) {
  const rooms = [
    { name: "Стандарт өрөө", price: "280,000₮" },
    { name: "Делюкс өрөө", price: "450,000₮" },
    { name: "Люкс сьют", price: "780,000₮" },
  ];
  const amenities: { icon: LucideIcon; label: string }[] = [
    { icon: Wifi, label: "Үнэгүй Wi-Fi" },
    { icon: Waves, label: "Усан бассейн" },
    { icon: UtensilsCrossed, label: "Ресторан" },
    { icon: Dumbbell, label: "Фитнес" },
    { icon: Car, label: "Зогсоол" },
  ];

  return (
    <>
      <div className="relative">
        <DemoNav
          template={template}
          compact={compact}
          gradient={gradient}
          links={["Нүүр", "Өрөөнүүд", "Үйлчилгээ", "Холбоо барих"]}
          cta="Захиалах"
          transparent
        />
        <ImageHero
          template={template}
          compact={compact}
          gradient={gradient}
          eyebrow="Амралтаа эхлүүл"
          title={template.name}
          subtitle={template.tagline}
          primaryCta="Өрөө захиалах"
        >
          {/* Booking bar */}
          <div
            className={cn(
              "mx-auto mt-8 flex max-w-2xl items-stretch gap-2 rounded-2xl border border-white/15 bg-black/40 p-2 backdrop-blur-md",
              compact && "flex-col"
            )}
          >
            {["Ирэх өдөр", "Гарах өдөр", "Зочид"].map((field) => (
              <div
                key={field}
                className="flex-1 rounded-xl bg-white/5 px-4 py-2.5 text-left"
              >
                <p className="text-[0.6rem] uppercase tracking-wider text-white/50">
                  {field}
                </p>
                <p className={cn("text-white/85", compact ? "text-xs" : "text-sm")}>
                  {field === "Зочид" ? "2 том хүн" : "Сонгох…"}
                </p>
              </div>
            ))}
            <span
              className={cn(
                "flex items-center justify-center rounded-xl px-6 font-medium text-white",
                compact ? "py-2.5 text-xs" : "text-sm"
              )}
              style={{ background: gradient }}
            >
              Шалгах
            </span>
          </div>
        </ImageHero>
      </div>

      {/* Rooms */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle
          compact={compact}
          title="Өрөөнүүд ба сьютүүд"
          subtitle="Аяллын хэв маягтаа тохирсон орон зайгаа сонгоорой."
        />
        <div className={cn("grid gap-4", cols)}>
          {template.gallery.map((photo, i) => (
            <div
              key={photo}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <div className={cn("overflow-hidden", compact ? "h-36" : "h-44")}>
                <DemoImg src={photo} />
              </div>
              <div className="p-4">
                <p
                  className={cn(
                    "font-medium",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  {rooms[i]?.name}
                </p>
                <p
                  className={cn(
                    "mt-1",
                    compact ? "text-[0.65rem]" : "text-xs"
                  )}
                >
                  <span className="font-semibold" style={gradientText}>
                    {rooms[i]?.price}
                  </span>{" "}
                  <span className="text-white/50">/ шөнө</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section
        className={cn(
          "border-y border-white/10 bg-white/[0.03]",
          compact ? "px-5 py-10" : "px-10 py-14"
        )}
      >
        <div
          className={cn(
            "grid gap-6 text-center",
            compact ? "grid-cols-2" : "grid-cols-5"
          )}
        >
          {amenities.map(({ icon: Icon, label }, i) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center gap-2",
                compact && i === 4 && "col-span-2"
              )}
            >
              <span
                className="flex size-10 items-center justify-center rounded-full text-white"
                style={{ background: gradient }}
              >
                <Icon className="size-4" />
              </span>
              <p
                className={cn(
                  "text-white/70",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
        columns={["Өрөөнүүд", "Үйлчилгээ", "Холбоо барих"]}
      />
    </>
  );
}

/* -------------------------------- Ecommerce ------------------------------- */

function EcommerceDemo({
  template,
  compact,
  cols,
  gradient,
  gradientText,
}: DemoProps) {
  const products = [
    { name: "Сонгомол цуглуулга", price: "89,000₮" },
    { name: "Шинэ ирэлт", price: "259,000₮" },
    { name: "Хязгаарлагдмал хувилбар", price: "129,000₮" },
  ];

  return (
    <>
      {/* Promo bar */}
      <div
        className={cn(
          "px-4 py-2 text-center font-medium text-white",
          compact ? "text-[0.65rem]" : "text-xs"
        )}
        style={{ background: gradient }}
      >
        100,000₮-с дээш захиалгад хүргэлт үнэгүй — зөвхөн энэ долоо хоногт
      </div>

      <DemoNav
        template={template}
        compact={compact}
        gradient={gradient}
        links={["Дэлгүүр", "Цуглуулга", "Тухай", "Сагс"]}
        cta="Дэлгүүр үзэх"
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <DemoImg src={template.image} />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div
          className={cn(
            "relative text-center",
            compact ? "px-5 py-16" : "px-10 py-24"
          )}
        >
          <p className="mx-auto mb-4 w-fit rounded-full border border-white/25 bg-black/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-white/80 backdrop-blur-sm">
            Шинэ улирлын цуглуулга
          </p>
          <h1
            className={cn(
              "mx-auto max-w-2xl font-semibold leading-tight tracking-tight drop-shadow-lg",
              compact ? "text-3xl" : "text-5xl"
            )}
          >
            {template.name}
          </h1>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-white/80",
              compact ? "text-xs" : "text-base"
            )}
          >
            {template.tagline}
          </p>
          <span
            className={cn(
              "mt-7 inline-block rounded-full font-medium text-white shadow-lg",
              compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
            )}
            style={{ background: gradient }}
          >
            Одоо худалдан авах
          </span>
        </div>
      </section>

      {/* Products */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle
          compact={compact}
          title="Эрэлттэй бүтээгдэхүүн"
          subtitle="Энэ сарын хамгийн их зарагдсан бараанууд."
        />
        <div className={cn("grid gap-4", cols)}>
          {template.gallery.map((photo, i) => (
            <div
              key={photo}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <div className={cn("overflow-hidden", compact ? "h-40" : "h-48")}>
                <DemoImg src={photo} />
              </div>
              <div className="p-4">
                <p
                  className={cn(
                    "font-medium",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  {products[i]?.name}
                </p>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span
                    className={cn(
                      "font-semibold",
                      compact ? "text-xs" : "text-sm"
                    )}
                    style={gradientText}
                  >
                    {products[i]?.price}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-white",
                      compact ? "text-[0.65rem]" : "text-xs"
                    )}
                    style={{ background: gradient }}
                  >
                    <ShoppingBag className="size-3" />
                    Сагслах
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Collection banner */}
      <section className={cn(compact ? "px-5 pb-12" : "px-10 pb-20")}>
        <div
          className="relative overflow-hidden rounded-2xl p-8 text-center"
          style={{ background: gradient }}
        >
          <p
            className={cn(
              "font-semibold text-white",
              compact ? "text-lg" : "text-2xl"
            )}
          >
            Улирлын хямдрал — 30% хүртэл
          </p>
          <p
            className={cn(
              "mx-auto mt-2 max-w-md text-white/85",
              compact ? "text-xs" : "text-sm"
            )}
          >
            Сонгосон цуглуулгын бараанууд дуустал. Кодоор нэмэлт хөнгөлөлт.
          </p>
          <span
            className={cn(
              "mt-5 inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 font-medium text-black",
              compact ? "text-xs" : "text-sm"
            )}
          >
            Цуглуулга үзэх
            <ArrowRight className="size-3.5" />
          </span>
        </div>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
        columns={["Дэлгүүр", "Тусламж", "Компани"]}
      />
    </>
  );
}

/* --------------------- Business / Medical / School ------------------------ */

const institutionCopy = {
  business: {
    eyebrow: "Мэргэжлийн үйлчилгээ",
    heroCta: "Үнэгүй зөвлөгөө авах",
    heroSecondary: "Үйлчилгээ үзэх",
    cardsTitle: "Манай үйлчилгээ",
    cardsSubtitle: "Бизнесийн өсөлтийг тань бүх талаас нь дэмжинэ.",
    cards: ["Стратеги зөвлөгөө", "Санхүүгийн шинжилгээ", "Дижитал шилжилт"],
    cardDesc: "Туршлагатай баг тань зорилгодоо хүрэх тодорхой зам гаргаж өгнө.",
    stats: [
      { value: "250+", label: "Харилцагч байгууллага" },
      { value: "15 жил", label: "Салбарын туршлага" },
      { value: "98%", label: "Сэтгэл ханамж" },
      { value: "40+", label: "Мэргэжилтэн" },
    ],
    teamTitle: "Манай баг",
    team: [
      { name: "Б. Тэмүүлэн", role: "Гүйцэтгэх захирал" },
      { name: "С. Анужин", role: "Стратегийн захирал" },
      { name: "Д. Мөнхбат", role: "Санхүүгийн захирал" },
    ],
    ctaTitle: "Хамтдаа өсөлтөө эхлүүлье",
    ctaButton: "Холбоо барих",
  },
  medical: {
    eyebrow: "Таны эрүүл мэнд — бидний зорилго",
    heroCta: "Цаг захиалах",
    heroSecondary: "Тасаг, чиглэл",
    cardsTitle: "Тасаг, чиглэлүүд",
    cardsSubtitle: "Орчин үеийн тоног төхөөрөмж, туршлагатай эмч нар.",
    cards: ["Урьдчилан сэргийлэх үзлэг", "Оношилгоо", "Нарийн мэргэжлийн эмчилгээ"],
    cardDesc: "Олон улсын стандартад нийцсэн, өвчтөн төвтэй тусламж үйлчилгээ.",
    stats: [
      { value: "20,000+", label: "Үйлчлүүлэгч" },
      { value: "35", label: "Эмч мэргэжилтэн" },
      { value: "24/7", label: "Яаралтай тусламж" },
      { value: "4.9", label: "Үнэлгээ" },
    ],
    teamTitle: "Манай эмч нар",
    team: [
      { name: "Д. Сарангэрэл", role: "Ерөнхий эмч" },
      { name: "Б. Батзориг", role: "Мэс засалч" },
      { name: "Н. Оюунчимэг", role: "Оношилгооны эмч" },
    ],
    ctaTitle: "Эрүүл мэндээ өнөөдөр л шалгуулаарай",
    ctaButton: "Цаг захиалах",
  },
  school: {
    eyebrow: "Ирээдүйг хамтдаа бүтээнэ",
    heroCta: "Элсэлтийн бүртгэл",
    heroSecondary: "Хөтөлбөр үзэх",
    cardsTitle: "Сургалтын хөтөлбөрүүд",
    cardsSubtitle: "Хүүхэд бүрийн авьяасыг нээх боловсролын орчин.",
    cards: ["Бага анги", "Дунд анги", "Ахлах анги"],
    cardDesc: "Олон улсын хөтөлбөрт суурилсан, чадварлаг багш нарын сургалт.",
    stats: [
      { value: "1,200+", label: "Сурагч" },
      { value: "85", label: "Багш" },
      { value: "98%", label: "Их сургуульд элссэн" },
      { value: "30+", label: "Дугуйлан, секц" },
    ],
    teamTitle: "Манай багш нар",
    team: [
      { name: "Ц. Энхжаргал", role: "Сургалтын захирал" },
      { name: "Г. Билгүүн", role: "Математикийн багш" },
      { name: "О. Сувдаа", role: "Англи хэлний багш" },
    ],
    ctaTitle: "Элсэлт нээлттэй — байраа баталгаажуулаарай",
    ctaButton: "Бүртгүүлэх",
  },
} as const;

function InstitutionDemo({
  template,
  compact,
  cols,
  gradient,
  gradientText,
}: DemoProps) {
  const copy =
    institutionCopy[template.category as keyof typeof institutionCopy] ??
    institutionCopy.business;

  return (
    <>
      <div className="relative">
        <DemoNav
          template={template}
          compact={compact}
          gradient={gradient}
          links={["Нүүр", "Тухай", "Үйлчилгээ", "Холбоо барих"]}
          cta={copy.heroCta}
          transparent
        />
        <ImageHero
          template={template}
          compact={compact}
          gradient={gradient}
          eyebrow={copy.eyebrow}
          title={template.name}
          subtitle={template.tagline}
          primaryCta={copy.heroCta}
          secondaryCta={copy.heroSecondary}
        />
      </div>

      {/* Services / departments / programs */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle
          compact={compact}
          title={copy.cardsTitle}
          subtitle={copy.cardsSubtitle}
        />
        <div className={cn("grid gap-4", cols)}>
          {template.gallery.map((photo, i) => (
            <div
              key={photo}
              className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
            >
              <div className={cn("overflow-hidden", compact ? "h-32" : "h-40")}>
                <DemoImg src={photo} />
              </div>
              <div className="p-4">
                <p
                  className={cn(
                    "font-medium",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  {copy.cards[i]}
                </p>
                <p
                  className={cn(
                    "mt-1.5 text-white/50",
                    compact ? "text-[0.65rem]" : "text-xs"
                  )}
                >
                  {copy.cardDesc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats band */}
      <section
        className={cn(
          "border-y border-white/10 bg-white/[0.03]",
          compact ? "px-5 py-10" : "px-10 py-14"
        )}
      >
        <div
          className={cn(
            "grid gap-8 text-center",
            compact ? "grid-cols-2" : "grid-cols-4"
          )}
        >
          {copy.stats.map((stat) => (
            <div key={stat.label}>
              <p
                className={cn(
                  "font-semibold",
                  compact ? "text-xl" : "text-3xl"
                )}
                style={gradientText}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "mt-1 text-white/50",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team strip */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle compact={compact} title={copy.teamTitle} />
        <div
          className={cn(
            "grid gap-4",
            compact ? "grid-cols-1" : "grid-cols-3"
          )}
        >
          {copy.team.map((member) => (
            <div
              key={member.name}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
            >
              <span
                className="flex size-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ background: gradient }}
              >
                {member.name.slice(-2)}
              </span>
              <div>
                <p
                  className={cn(
                    "font-medium",
                    compact ? "text-xs" : "text-sm"
                  )}
                >
                  {member.name}
                </p>
                <p
                  className={cn(
                    "text-white/50",
                    compact ? "text-[0.65rem]" : "text-xs"
                  )}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className={cn(compact ? "px-5 pb-12" : "px-10 pb-20")}>
        <div
          className="rounded-2xl p-8 text-center"
          style={{ background: gradient }}
        >
          <p
            className={cn(
              "font-semibold text-white",
              compact ? "text-lg" : "text-2xl"
            )}
          >
            {copy.ctaTitle}
          </p>
          <span
            className={cn(
              "mt-5 inline-block rounded-full bg-white px-5 py-2 font-medium text-black",
              compact ? "text-xs" : "text-sm"
            )}
          >
            {copy.ctaButton}
          </span>
        </div>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
      />
    </>
  );
}

/* -------------------------------- Portfolio ------------------------------- */

function PortfolioDemo({
  template,
  compact,
  gradient,
  gradientText,
}: DemoProps) {
  const photos = [template.image, ...template.gallery];
  const captions = [
    "Брэнд айдентити — 2026",
    "Редакцийн дизайн — 2025",
    "Дижитал кампанит ажил — 2025",
    "Орон зайн зураглал — 2024",
  ];

  return (
    <>
      {/* Minimal nav */}
      <nav className="flex items-center justify-between px-6 py-5">
        <span
          className={cn(
            "font-bold uppercase tracking-widest",
            compact ? "text-xs" : "text-sm"
          )}
        >
          {template.name}
        </span>
        <div
          className={cn(
            "flex items-center gap-5 text-white/60",
            compact ? "gap-4 text-[0.65rem]" : "text-xs"
          )}
        >
          <span>Бүтээлүүд</span>
          <span>Тухай</span>
          <span>Холбоо барих</span>
        </div>
      </nav>

      {/* Oversized typographic hero */}
      <section className={cn(compact ? "px-5 py-14" : "px-10 py-24")}>
        <p
          className={cn(
            "mb-4 uppercase tracking-[0.25em] text-white/40",
            compact ? "text-[0.6rem]" : "text-xs"
          )}
        >
          Бүтээлч студи · Улаанбаатар
        </p>
        <h1
          className={cn(
            "font-semibold leading-[1.05] tracking-tight",
            compact ? "text-4xl" : "text-7xl"
          )}
        >
          Бүтээл өөрөө
          <br />
          <em className="font-serif italic" style={gradientText}>
            ярьдаг
          </em>{" "}
          газар.
        </h1>
        <p
          className={cn(
            "mt-6 max-w-md text-white/60",
            compact ? "text-xs" : "text-base"
          )}
        >
          {template.tagline}
        </p>
      </section>

      {/* Masonry-ish full-bleed grid */}
      <section className={cn("grid grid-cols-2 gap-3", compact ? "px-3 pb-10" : "px-6 pb-16")}>
        {photos.map((photo, i) => (
          <figure
            key={photo}
            className={cn(
              "overflow-hidden rounded-xl",
              i % 2 === 0 ? "aspect-[3/4]" : "aspect-[4/3]",
              i % 2 !== 0 && "mt-8"
            )}
          >
            <DemoImg
              src={photo}
              className="transition-transform duration-500 hover:scale-[1.03]"
            />
            <figcaption
              className={cn(
                "mt-2 px-1 text-white/45",
                compact ? "text-[0.6rem]" : "text-xs"
              )}
            >
              {captions[i]}
            </figcaption>
          </figure>
        ))}
      </section>

      {/* About line */}
      <section
        className={cn(
          "border-t border-white/10 text-center",
          compact ? "px-5 py-12" : "px-10 py-20"
        )}
      >
        <p
          className={cn(
            "mx-auto max-w-2xl text-balance font-medium leading-relaxed",
            compact ? "text-sm" : "text-2xl"
          )}
        >
          Бид брэнд, дижитал туршлага, хэвлэлийн дизайныг нэг дор бүтээдэг{" "}
          <em className="font-serif italic" style={gradientText}>
            бие даасан
          </em>{" "}
          студи.
        </p>
        <span
          className={cn(
            "mt-7 inline-block rounded-full px-5 py-2 font-medium text-white",
            compact ? "text-xs" : "text-sm"
          )}
          style={{ background: gradient }}
        >
          Хамтарч ажиллах
        </span>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
        columns={["Бүтээлүүд", "Студи", "Холбоо барих"]}
      />
    </>
  );
}

/* -------------------------------- AI startup ------------------------------ */

function AiStartupDemo({
  template,
  compact,
  cols,
  gradient,
  gradientText,
}: DemoProps) {
  const { from, to } = template.palette;
  const logos = ["NOMAD", "ALTAI", "GOBI", "STEPPE", "KHAN"];
  const tiers = [
    { name: "Эхлэл", price: "Үнэгүй", note: "Жижиг багт" },
    { name: "Про", price: "99,000₮/сар", note: "Өсөж буй багт", featured: true },
    { name: "Байгууллага", price: "Тусгай үнэ", note: "Томоохон багт" },
  ];

  return (
    <>
      <DemoNav
        template={template}
        compact={compact}
        gradient={gradient}
        links={["Бүтээгдэхүүн", "Онцлогууд", "Үнэ", "Баримтжуулалт"]}
        cta="Үнэгүй эхлэх"
      />

      {/* Dark gradient hero + product screenshot */}
      <section className="relative overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-72 w-[40rem] max-w-full -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: gradient }}
        />
        <div
          className="absolute -left-24 top-40 size-64 rounded-full opacity-20 blur-3xl"
          style={{ background: from }}
        />
        <div
          className="absolute -right-24 top-24 size-64 rounded-full opacity-20 blur-3xl"
          style={{ background: to }}
        />
        <div
          className={cn(
            "relative text-center",
            compact ? "px-5 pt-14" : "px-10 pt-24"
          )}
        >
          <p className="mx-auto mb-4 w-fit rounded-full border border-white/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-widest text-white/70">
            Шинэ хувилбар гарлаа · v2.0
          </p>
          <h1
            className={cn(
              "mx-auto max-w-2xl font-semibold leading-tight tracking-tight",
              compact ? "text-2xl" : "text-5xl"
            )}
          >
            <span style={gradientText}>{template.tagline}</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-white/60",
              compact ? "text-xs" : "text-base"
            )}
          >
            Багаа нэг платформ дээр нэгтгэж, ажлаа хэд дахин хурдасгаарай.
            Суулгахад хоёрхон минут.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span
              className={cn(
                "rounded-full font-medium text-white",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
              style={{ background: gradient }}
            >
              Үнэгүй эхлэх
            </span>
            <span
              className={cn(
                "rounded-full border border-white/20 font-medium text-white/80",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
            >
              Демо үзэх
            </span>
          </div>

          {/* Product screenshot card */}
          <div
            className={cn(
              "mx-auto mt-12 max-w-3xl overflow-hidden rounded-t-2xl border border-b-0 border-white/15 bg-black/40 shadow-2xl",
              compact && "mt-8"
            )}
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
              <span className="size-2 rounded-full bg-white/25" />
              <span className="size-2 rounded-full bg-white/25" />
              <span className="size-2 rounded-full bg-white/25" />
              <span className="ml-2 flex-1 rounded-full bg-white/5 px-3 py-0.5 text-left text-[0.6rem] text-white/40">
                app.{template.slug}.mn
              </span>
            </div>
            <div className={cn("overflow-hidden", compact ? "h-40" : "h-72")}>
              <DemoImg src={template.image} />
            </div>
          </div>
        </div>
      </section>

      {/* Logo band */}
      <section
        className={cn(
          "border-y border-white/10 bg-white/[0.02]",
          compact ? "px-5 py-8" : "px-10 py-10"
        )}
      >
        <p
          className={cn(
            "mb-5 text-center uppercase tracking-[0.25em] text-white/35",
            compact ? "text-[0.55rem]" : "text-[0.65rem]"
          )}
        >
          Эдгээр багууд өдөр бүр ашигладаг
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {logos.map((logo) => (
            <span
              key={logo}
              className={cn(
                "font-bold tracking-widest text-white/30",
                compact ? "text-xs" : "text-sm"
              )}
            >
              {logo}
            </span>
          ))}
        </div>
      </section>

      {/* Feature grid */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle
          compact={compact}
          title="Танай багийн ажиллах хэв маягт зориулав"
          subtitle="Салбарт тохируулан бүтээсэн зургаан хэсэг."
        />
        <div className={cn("grid gap-4", cols)}>
          {template.features.slice(0, 6).map((feature, i) => (
            <div
              key={feature}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div
                className="mb-3 flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: gradient, opacity: 1 - i * 0.06 }}
              >
                {i + 1}
              </div>
              <p className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
                {feature}
              </p>
              <p
                className={cn(
                  "mt-1.5 text-white/45",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                Урьдчилан бүтээгдсэн, бүх дэлгэцэд зохицсон, өөрийн болгоход
                бэлэн.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing teaser */}
      <section
        className={cn(
          "border-t border-white/10",
          compact ? "px-5 py-12" : "px-10 py-20"
        )}
      >
        <SectionTitle
          compact={compact}
          title="Энгийн, ил тод үнэ"
          subtitle="Багийнхаа хэмжээнд тохирсон багцаа сонгоорой."
        />
        <div className={cn("grid gap-4", cols)}>
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "rounded-xl border p-5 text-center",
                tier.featured
                  ? "border-transparent"
                  : "border-white/10 bg-white/[0.04]"
              )}
              style={
                tier.featured
                  ? {
                      background: `linear-gradient(140deg, ${from}26, ${to}26)`,
                      boxShadow: `inset 0 0 0 1px ${from}66`,
                    }
                  : undefined
              }
            >
              <p
                className={cn(
                  "font-medium text-white/70",
                  compact ? "text-xs" : "text-sm"
                )}
              >
                {tier.name}
              </p>
              <p
                className={cn(
                  "mt-2 font-semibold",
                  compact ? "text-lg" : "text-2xl"
                )}
                style={tier.featured ? gradientText : undefined}
              >
                {tier.price}
              </p>
              <p
                className={cn(
                  "mt-1 text-white/45",
                  compact ? "text-[0.65rem]" : "text-xs"
                )}
              >
                {tier.note}
              </p>
              <span
                className={cn(
                  "mt-4 inline-block rounded-full px-4 py-1.5 font-medium",
                  compact ? "text-[0.65rem]" : "text-xs",
                  tier.featured
                    ? "text-white"
                    : "border border-white/20 text-white/70"
                )}
                style={tier.featured ? { background: gradient } : undefined}
              >
                Сонгох
              </span>
            </div>
          ))}
        </div>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
        columns={["Бүтээгдэхүүн", "Компани", "Нөөц"]}
      />
    </>
  );
}

/* ------------------------------- Landing page ----------------------------- */

function LandingDemo({
  template,
  compact,
  gradient,
  gradientText,
}: DemoProps) {
  const proof = [
    { value: "3,120+", label: "Идэвхтэй хэрэглэгч" },
    { value: "4.7/5", label: "Дундаж үнэлгээ" },
    { value: "2 мин", label: "Эхлүүлэх хугацаа" },
  ];
  const perks = [
    "Хязгааргүй хуудас, шинэчлэлт",
    "Бүх дэлгэцэд зохицсон дизайн",
    "Имэйл ба чат дэмжлэг",
  ];

  return (
    <>
      {/* Minimal nav */}
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <span className={cn("font-bold", compact ? "text-sm" : "text-base")}>
          <span style={gradientText}>{template.name}</span>
        </span>
        <span
          className="rounded-full px-3.5 py-1.5 text-xs font-medium text-white"
          style={{ background: gradient }}
        >
          Яг одоо эхлэх
        </span>
      </nav>

      {/* Hero */}
      <section
        className={cn(
          "relative overflow-hidden text-center",
          compact ? "px-5 pt-14" : "px-10 pt-24"
        )}
      >
        <div
          className="absolute left-1/2 top-0 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: gradient }}
        />
        <div className="relative">
          <h1
            className={cn(
              "mx-auto max-w-2xl font-semibold leading-tight tracking-tight",
              compact ? "text-2xl" : "text-5xl"
            )}
          >
            <span style={gradientText}>{template.tagline}</span>
          </h1>
          <p
            className={cn(
              "mx-auto mt-4 max-w-xl text-white/60",
              compact ? "text-xs" : "text-base"
            )}
          >
            Нэг зорилго, нэг хуудас. Зочдыг тань үйлдэл рүү хөтөлнө —
            анхаарал сарниулах зүйлгүйгээр.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <span
              className={cn(
                "rounded-full font-medium text-white",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
              style={{ background: gradient }}
            >
              Үнэгүй туршиж үзэх
            </span>
            <span
              className={cn(
                "rounded-full border border-white/20 font-medium text-white/80",
                compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
              )}
            >
              Дэлгэрэнгүй
            </span>
          </div>

          {/* Single image use: hero screenshot */}
          <div
            className={cn(
              "mx-auto mt-12 max-w-2xl overflow-hidden rounded-t-2xl border border-b-0 border-white/15 shadow-2xl",
              compact && "mt-8"
            )}
          >
            <div className={cn("overflow-hidden", compact ? "h-36" : "h-64")}>
              <DemoImg src={template.image} />
            </div>
          </div>
        </div>
      </section>

      {/* Proof band */}
      <section
        className={cn(
          "border-y border-white/10 bg-white/[0.03]",
          compact ? "px-5 py-10" : "px-10 py-14"
        )}
      >
        <div className="grid grid-cols-3 gap-6 text-center">
          {proof.map((stat) => (
            <div key={stat.label}>
              <p
                className={cn(
                  "font-semibold",
                  compact ? "text-lg" : "text-3xl"
                )}
                style={gradientText}
              >
                {stat.value}
              </p>
              <p
                className={cn(
                  "mt-1 text-white/50",
                  compact ? "text-[0.6rem]" : "text-xs"
                )}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className={cn(compact ? "px-5 py-12" : "px-10 py-20")}>
        <SectionTitle
          compact={compact}
          title="Яагаад энэ хуудас ажилладаг вэ"
          subtitle="Хэсэг бүр хөрвүүлэлтийн дарааллаар эрэмбэлэгдсэн."
        />
        <div
          className={cn(
            "grid gap-4",
            compact ? "grid-cols-1" : "grid-cols-3"
          )}
        >
          {template.features.slice(0, 3).map((feature, i) => (
            <div
              key={feature}
              className="rounded-xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div
                className="mb-3 flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: gradient, opacity: 1 - i * 0.08 }}
              >
                {i + 1}
              </div>
              <p className={cn("font-medium", compact ? "text-xs" : "text-sm")}>
                {feature}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing card */}
      <section className={cn(compact ? "px-5 pb-12" : "px-10 pb-20")}>
        <div
          className="mx-auto max-w-md rounded-2xl border border-white/10 p-8 text-center"
          style={{
            background: `linear-gradient(160deg, ${template.palette.from}1f, ${template.palette.to}1f)`,
          }}
        >
          <p
            className={cn(
              "font-medium uppercase tracking-widest text-white/60",
              compact ? "text-[0.6rem]" : "text-xs"
            )}
          >
            Бүрэн эрх
          </p>
          <p
            className={cn(
              "mt-3 font-semibold",
              compact ? "text-2xl" : "text-4xl"
            )}
            style={gradientText}
          >
            99,000₮
          </p>
          <p
            className={cn(
              "mt-1 text-white/50",
              compact ? "text-[0.65rem]" : "text-xs"
            )}
          >
            нэг удаагийн төлбөр
          </p>
          <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left">
            {perks.map((perk) => (
              <li
                key={perk}
                className={cn(
                  "flex items-start gap-2 text-white/75",
                  compact ? "text-[0.7rem]" : "text-sm"
                )}
              >
                <Check
                  className="mt-0.5 size-3.5 shrink-0"
                  style={{ color: template.palette.from }}
                />
                {perk}
              </li>
            ))}
          </ul>
          <span
            className={cn(
              "mt-7 inline-block w-full rounded-full py-2.5 font-medium text-white",
              compact ? "text-xs" : "text-sm"
            )}
            style={{ background: gradient }}
          >
            Одоо худалдан авах
          </span>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className={cn(
          "border-t border-white/10 text-center",
          compact ? "px-5 py-12" : "px-10 py-16"
        )}
      >
        <p
          className={cn(
            "mx-auto max-w-lg text-balance font-semibold",
            compact ? "text-lg" : "text-3xl"
          )}
        >
          Өнөөдөр л{" "}
          <span style={gradientText}>эхлээрэй</span> — 14 хоногийн турш үнэгүй.
        </p>
        <span
          className={cn(
            "mt-6 inline-flex items-center gap-1.5 rounded-full font-medium text-white",
            compact ? "px-4 py-2 text-xs" : "px-6 py-2.5 text-sm"
          )}
          style={{ background: gradient }}
        >
          Яг одоо эхлэх
          <ArrowRight className="size-3.5" />
        </span>
      </section>

      <DemoFooter
        template={template}
        compact={compact}
        gradientText={gradientText}
        columns={["Бүтээгдэхүүн", "Компани", "Хууль эрх зүй"]}
      />
    </>
  );
}
