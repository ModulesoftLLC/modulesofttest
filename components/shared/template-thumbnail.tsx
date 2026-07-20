import { cn } from "@/lib/utils";
import type { Template } from "@/types";

/**
 * Template cover: renders the template's photo with a soft gradient overlay
 * tinted by its palette. Falls back to a CSS-generated miniature mockup when
 * no image is available.
 */
export function TemplateThumbnail({
  template,
  className,
}: {
  template: Pick<Template, "name" | "palette"> & { image?: string };
  className?: string;
}) {
  const { from, to, surface } = template.palette;

  if (template.image) {
    return (
      <div
        className={cn("relative overflow-hidden", className)}
        style={{ backgroundColor: surface }}
        aria-hidden
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={template.image}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20" />
        <div
          className="absolute inset-x-0 bottom-0 h-1"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: surface }}
      aria-hidden
    >
      <div
        className="absolute -right-12 -top-16 size-52 rounded-full opacity-30 blur-3xl"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />
      <div className="relative flex h-full flex-col p-5">
        <div className="flex items-center justify-between">
          <div
            className="h-2 w-12 rounded-full"
            style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
          />
          <div className="flex items-center gap-1.5">
            <div className="h-1.5 w-6 rounded-full bg-white/20" />
            <div className="h-1.5 w-6 rounded-full bg-white/20" />
            <div className="h-3 w-8 rounded-full" style={{ backgroundColor: from }} />
          </div>
        </div>
        <div className="mt-6 space-y-2">
          <div className="h-3 w-3/4 rounded bg-white/85" />
          <div className="h-3 w-1/2 rounded bg-white/85" />
          <div className="mt-3 h-1.5 w-2/3 rounded bg-white/25" />
          <div className="h-1.5 w-1/2 rounded bg-white/25" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2 pt-6">
          {[0.5, 0.35, 0.2].map((opacity, i) => (
            <div key={i} className="rounded-md border border-white/10 bg-white/[0.06] p-2">
              <div
                className="mb-1.5 size-3 rounded"
                style={{ backgroundColor: from, opacity: opacity + 0.4 }}
              />
              <div className="h-1 w-full rounded bg-white/25" />
              <div className="mt-1 h-1 w-2/3 rounded bg-white/15" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
