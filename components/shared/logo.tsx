import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-2.5", className)}
      aria-label="MODULESOFT home"
    >
      <span className="relative flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-105">
        <span className="grid grid-cols-2 gap-[3px]">
          <span className="size-[5px] rounded-[1.5px] bg-white" />
          <span className="size-[5px] rounded-[1.5px] bg-white/70" />
          <span className="size-[5px] rounded-[1.5px] bg-white/70" />
          <span className="size-[5px] rounded-[1.5px] bg-white" />
        </span>
      </span>
      <span className="text-[15px] font-semibold tracking-[0.18em]">
        MODULE<span className="text-indigo-400">SOFT</span>
      </span>
    </Link>
  );
}
