import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="MODULESOFT нүүр хуудас"
    >
      <span className="relative flex size-8 items-center justify-center rounded-lg bg-white/15 shadow-lg shadow-black/20 backdrop-blur transition-transform duration-300 group-hover:scale-105">
        <span className="grid grid-cols-2 gap-[3px]">
          <span className="size-[5px] rounded-[1.5px] bg-white" />
          <span className="size-[5px] rounded-[1.5px] bg-white/70" />
          <span className="size-[5px] rounded-[1.5px] bg-white/70" />
          <span className="size-[5px] rounded-[1.5px] bg-white" />
        </span>
      </span>
      <span className="text-[15px] font-semibold tracking-[0.18em] text-white">
        MODULE<span className="text-white/60">SOFT</span>
      </span>
    </Link>
  );
}
