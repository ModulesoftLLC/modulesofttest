"use client";

import type { CSSProperties } from "react";

import type { BuilderSection } from "@/types";
import { cn } from "@/lib/utils";

/** Translucent tint of a color — works on any user-picked background. */
function tint(color: string, percent: number): string {
  return `color-mix(in srgb, ${color} ${percent}%, transparent)`;
}

function autoGrid(min: number, gap = "1.5rem"): CSSProperties {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`,
    gap,
  };
}

function AccentButton({
  label,
  accent,
  small,
}: {
  label: string;
  accent: string;
  small?: boolean;
}) {
  if (!label) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium text-white shadow-sm",
        small ? "px-3.5 py-1.5 text-xs" : "px-5 py-2.5 text-sm"
      )}
      style={{ backgroundColor: accent }}
    >
      {label}
    </span>
  );
}

export function SectionRenderer({ section }: { section: BuilderSection }) {
  const { content, style } = section;
  const accent = style.accentColor;
  const centered = style.align === "center";

  const sectionStyle: CSSProperties = {
    backgroundColor: style.backgroundColor,
    color: style.textColor,
    fontFamily: style.fontFamily,
    paddingTop: style.paddingY,
    paddingBottom: style.paddingY,
    textAlign: style.align,
    borderRadius: style.rounded ? 24 : undefined,
  };

  const muted: CSSProperties = { color: style.textColor, opacity: 0.65 };
  const faintBorder = tint(style.textColor, 12);
  const stack = cn("flex flex-col gap-4", centered ? "items-center" : "items-start");
  const eyebrow = (
    <span
      className="text-xs font-semibold tracking-[0.2em] uppercase"
      style={{ color: accent }}
    >
      {content.subheading}
    </span>
  );

  let inner: React.ReactNode;

  switch (section.type) {
    case "navbar":
      inner = (
        <div className="flex items-center justify-between gap-6">
          <span className="text-base font-semibold">{content.heading}</span>
          <div className="flex items-center gap-5 text-sm">
            {content.items.map((item, index) => (
              <span key={index} style={muted}>
                {item.title}
              </span>
            ))}
          </div>
          <AccentButton label={content.buttonText} accent={accent} small />
        </div>
      );
      break;

    case "hero":
      inner = (
        <div className={cn(stack, "gap-5")}>
          {content.subheading && eyebrow}
          <h2 className="max-w-2xl text-4xl leading-tight font-bold tracking-tight">
            {content.heading}
          </h2>
          {content.body && (
            <p className="max-w-xl text-base leading-relaxed" style={muted}>
              {content.body}
            </p>
          )}
          <div className="mt-2">
            <AccentButton label={content.buttonText} accent={accent} />
          </div>
        </div>
      );
      break;

    case "features":
      inner = (
        <div className="flex flex-col gap-10">
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="max-w-xl text-2xl font-bold tracking-tight">
              {content.heading}
            </h3>
          </div>
          <div style={autoGrid(200)}>
            {content.items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-2.5",
                  centered ? "items-center" : "items-start"
                )}
              >
                <span
                  className="flex size-9 items-center justify-center rounded-lg"
                  style={{ backgroundColor: tint(accent, 15) }}
                >
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: accent }}
                  />
                </span>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm leading-relaxed" style={muted}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case "stats":
      inner = (
        <div className="flex flex-col gap-8">
          <h3 className="text-xl font-bold tracking-tight">{content.heading}</h3>
          <div
            className={cn(
              "flex flex-wrap gap-x-12 gap-y-6",
              centered ? "justify-center" : "justify-start"
            )}
          >
            {content.items.map((item, index) => (
              <div key={index} className="flex flex-col gap-1">
                <span
                  className="text-3xl font-bold tracking-tight"
                  style={{ color: accent }}
                >
                  {item.title}
                </span>
                <span className="text-sm" style={muted}>
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case "gallery":
      inner = (
        <div className="flex flex-col gap-8">
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
          </div>
          <div style={autoGrid(180, "1rem")}>
            {content.items.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
                style={{ background: content.image }}
              >
                {item.title && (
                  <span className="absolute bottom-2.5 left-3 rounded-md bg-black/40 px-2 py-0.5 text-[11px] font-medium text-white">
                    {item.title}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case "testimonials":
      inner = (
        <div className="flex flex-col gap-8">
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
          </div>
          <div style={autoGrid(240)}>
            {content.items.map((item, index) => (
              <figure
                key={index}
                className="flex flex-col gap-4 rounded-xl border p-6 text-left"
                style={{
                  borderColor: faintBorder,
                  backgroundColor: tint(style.textColor, 5),
                }}
              >
                <blockquote className="text-sm leading-relaxed">
                  “{item.title}”
                </blockquote>
                <figcaption className="text-xs font-medium" style={muted}>
                  {item.description}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
      break;

    case "pricing":
      inner = (
        <div className="flex flex-col gap-8">
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
          </div>
          <div style={autoGrid(200, "1rem")}>
            {content.items.map((item, index) => {
              const highlighted = index === 1;
              return (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col gap-2 rounded-xl border p-6 text-left",
                    highlighted && "border-2"
                  )}
                  style={{
                    borderColor: highlighted ? accent : faintBorder,
                    backgroundColor: highlighted ? tint(accent, 8) : undefined,
                  }}
                >
                  <p className="text-lg font-semibold">{item.title}</p>
                  <p className="text-sm leading-relaxed" style={muted}>
                    {item.description}
                  </p>
                  <span
                    className="mt-4 inline-flex items-center justify-center rounded-lg border px-4 py-2 text-xs font-medium"
                    style={
                      highlighted
                        ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                        : { borderColor: faintBorder }
                    }
                  >
                    Choose plan
                  </span>
                </div>
              );
            })}
          </div>
          {content.buttonText && (
            <div className={centered ? "text-center" : "text-left"}>
              <span className="text-sm font-medium" style={{ color: accent }}>
                {content.buttonText} →
              </span>
            </div>
          )}
        </div>
      );
      break;

    case "cta":
      inner = (
        <div
          className="flex flex-col items-center gap-4 rounded-3xl border px-8 py-14 text-center"
          style={{
            backgroundColor: tint(accent, 12),
            borderColor: tint(accent, 25),
          }}
        >
          <h3 className="max-w-xl text-3xl font-bold tracking-tight">
            {content.heading}
          </h3>
          {content.body && (
            <p className="max-w-lg text-sm leading-relaxed" style={muted}>
              {content.body}
            </p>
          )}
          <div className="mt-2">
            <AccentButton label={content.buttonText} accent={accent} />
          </div>
        </div>
      );
      break;

    case "faq":
      inner = (
        <div className="flex flex-col gap-8">
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
          </div>
          <div className={cn("flex w-full max-w-2xl flex-col", centered && "mx-auto")}>
            {content.items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-1.5 py-4"
                style={
                  index < content.items.length - 1
                    ? { borderBottom: `1px solid ${faintBorder}` }
                    : undefined
                }
              >
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-sm leading-relaxed" style={muted}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case "team":
      inner = (
        <div className="flex flex-col gap-10">
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
          </div>
          <div style={autoGrid(150, "2rem")}>
            {content.items.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "flex flex-col gap-1",
                  centered ? "items-center" : "items-start"
                )}
              >
                <span
                  className="mb-2 size-20 rounded-full"
                  style={{ background: content.image }}
                />
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs" style={muted}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );
      break;

    case "contact":
      inner = (
        <div className={cn("flex w-full max-w-lg flex-col gap-6", centered && "mx-auto")}>
          <div className={stack}>
            {content.subheading && eyebrow}
            <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
            {content.body && (
              <p className="text-sm leading-relaxed" style={muted}>
                {content.body}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3 text-left">
            <div className="grid gap-3 sm:grid-cols-2">
              <div
                className="rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: faintBorder, ...muted }}
              >
                Name
              </div>
              <div
                className="rounded-lg border px-3 py-2.5 text-sm"
                style={{ borderColor: faintBorder, ...muted }}
              >
                Email address
              </div>
            </div>
            <div
              className="h-24 rounded-lg border px-3 py-2.5 text-sm"
              style={{ borderColor: faintBorder, ...muted }}
            >
              Tell us about your project…
            </div>
            <div className={centered ? "text-center" : "text-left"}>
              <AccentButton label={content.buttonText} accent={accent} />
            </div>
          </div>
        </div>
      );
      break;

    case "footer":
      inner = (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-sm font-semibold">{content.heading}</span>
            <div className="flex items-center gap-5 text-sm">
              {content.items.map((item, index) => (
                <span key={index} style={muted}>
                  {item.title}
                </span>
              ))}
            </div>
          </div>
          <div
            className="pt-5"
            style={{ borderTop: `1px solid ${faintBorder}` }}
          >
            <p className="text-xs" style={muted}>
              {content.body}
            </p>
          </div>
        </div>
      );
      break;

    default:
      inner = (
        <div className={stack}>
          <h3 className="text-2xl font-bold tracking-tight">{content.heading}</h3>
          {content.body && (
            <p className="text-sm leading-relaxed" style={muted}>
              {content.body}
            </p>
          )}
        </div>
      );
  }

  return (
    <section style={sectionStyle}>
      <div className="mx-auto w-full max-w-5xl px-8">{inner}</div>
    </section>
  );
}
