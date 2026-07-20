"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, Copy, LayoutTemplate, Trash2 } from "lucide-react";

import type { BuilderSection, Viewport } from "@/types";
import { cn } from "@/lib/utils";
import { SectionRenderer } from "@/components/builder/section-renderer";
import type { MoveDirection } from "@/components/builder/editor";

interface CanvasProps {
  sections: BuilderSection[];
  selectedId: string | null;
  viewport: Viewport;
  previewMode: boolean;
  siteName: string;
  onSelect: (id: string | null) => void;
  onMove: (id: string, direction: MoveDirection) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
}

const viewportWidth: Record<Viewport, number> = {
  desktop: 1024,
  tablet: 768,
  mobile: 390,
};

function ToolbarButton({
  label,
  danger,
  onClick,
  children,
}: {
  label: string;
  danger?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={cn(
        "flex size-6 items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-white/10 hover:text-white",
        danger && "hover:text-red-400"
      )}
    >
      {children}
    </button>
  );
}

export function Canvas({
  sections,
  selectedId,
  viewport,
  previewMode,
  siteName,
  onSelect,
  onMove,
  onDuplicate,
  onRemove,
}: CanvasProps) {
  const host = `${siteName.trim().toLowerCase().replace(/\s+/g, "-") || "untitled"}.modulesoft.site`;

  return (
    <div
      className="bg-grid min-w-0 flex-1 overflow-y-auto bg-secondary/30 p-8"
      onClick={() => onSelect(null)}
    >
      <motion.div
        className="mx-auto w-full"
        initial={false}
        animate={{ maxWidth: viewportWidth[viewport] }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
      >
        <div className="overflow-hidden rounded-xl border border-border bg-background shadow-2xl">
          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-2.5">
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-red-500/70" />
              <span className="size-2.5 rounded-full bg-yellow-500/70" />
              <span className="size-2.5 rounded-full bg-emerald-500/70" />
            </div>
            <div className="mx-auto flex h-6 min-w-0 max-w-64 flex-1 items-center justify-center rounded-full bg-secondary px-3">
              <span className="truncate text-[11px] text-muted-foreground">
                {host}
              </span>
            </div>
            <div className="w-12 shrink-0" />
          </div>

          {/* Page */}
          <div>
            <AnimatePresence initial={false}>
              {sections.map((section) => {
                const selected = section.id === selectedId && !previewMode;
                return (
                  <motion.div
                    key={section.id}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    onClick={
                      previewMode
                        ? undefined
                        : (event) => {
                            event.stopPropagation();
                            onSelect(section.id);
                          }
                    }
                    className={cn(
                      "relative",
                      !previewMode && "cursor-pointer transition-shadow duration-200",
                      selected
                        ? "z-10 ring-2 ring-indigo-500 ring-inset"
                        : !previewMode &&
                            "hover:ring-1 hover:ring-indigo-500/30 hover:ring-inset"
                    )}
                  >
                    {selected && (
                      <div
                        className="glass absolute top-3 right-3 z-20 flex items-center gap-0.5 rounded-lg p-1 shadow-lg"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <span className="px-1.5 text-[11px] font-medium text-zinc-100">
                          {section.label}
                        </span>
                        <ToolbarButton
                          label="Move up"
                          onClick={() => onMove(section.id, "up")}
                        >
                          <ArrowUp className="size-3.5" />
                        </ToolbarButton>
                        <ToolbarButton
                          label="Move down"
                          onClick={() => onMove(section.id, "down")}
                        >
                          <ArrowDown className="size-3.5" />
                        </ToolbarButton>
                        <ToolbarButton
                          label="Duplicate"
                          onClick={() => onDuplicate(section.id)}
                        >
                          <Copy className="size-3.5" />
                        </ToolbarButton>
                        <ToolbarButton
                          label="Remove"
                          danger
                          onClick={() => onRemove(section.id)}
                        >
                          <Trash2 className="size-3.5" />
                        </ToolbarButton>
                      </div>
                    )}
                    <SectionRenderer section={section} />
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {sections.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 px-8 py-24 text-center">
                <LayoutTemplate className="size-8 text-muted-foreground/40" />
                <p className="text-sm font-medium">This page is empty</p>
                <p className="text-xs text-muted-foreground">
                  Add blocks from the left panel to start building.
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
