"use client";

import { useRouter } from "next/navigation";
import {
  Code2,
  Eye,
  EyeOff,
  Monitor,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";

import type { BuilderSection, Viewport } from "@/types";
import {
  CODE_HANDOFF_KEY,
  exportSectionsToHtml,
  exportedBaseCss,
  exportedBaseJs,
  type CodeHandoff,
} from "@/lib/export-html";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TopBarProps {
  siteName: string;
  onSiteNameChange: (name: string) => void;
  viewport: Viewport;
  onViewportChange: (viewport: Viewport) => void;
  previewMode: boolean;
  onTogglePreview: () => void;
  sections: BuilderSection[];
}

const viewportOptions: {
  id: Viewport;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "desktop", label: "Компьютер", icon: Monitor },
  { id: "tablet", label: "Таблет", icon: Tablet },
  { id: "mobile", label: "Утас", icon: Smartphone },
];

export function TopBar({
  siteName,
  onSiteNameChange,
  viewport,
  onViewportChange,
  previewMode,
  onTogglePreview,
  sections,
}: TopBarProps) {
  const router = useRouter();

  const openInCodeEditor = () => {
    const handoff: CodeHandoff = {
      siteName,
      html: exportSectionsToHtml(siteName, sections),
      css: exportedBaseCss,
      js: exportedBaseJs,
    };
    try {
      localStorage.setItem(CODE_HANDOFF_KEY, JSON.stringify(handoff));
    } catch {
      // хадгалж чадаагүй ч засварлагч анхдагч кодтойгоо нээгдэнэ
    }
    router.push("/editor?from=builder");
  };

  return (
    <TooltipProvider>
      <header className="glass z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4">
        {/* Left: logo + site name + status */}
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <div className="h-5 w-px shrink-0 bg-border" />
          <input
            value={siteName}
            onChange={(event) => onSiteNameChange(event.target.value)}
            aria-label="Сайтын нэр"
            spellCheck={false}
            className="h-8 w-36 rounded-md bg-transparent px-2 text-sm font-medium outline-none transition-colors hover:bg-secondary/60 focus:bg-secondary/60 md:w-44"
          />
          <Badge variant="secondary">Ноорог</Badge>
        </div>

        {/* Center: viewport switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1">
          {viewportOptions.map((option) => {
            const Icon = option.icon;
            const active = viewport === option.id;
            return (
              <Tooltip key={option.id}>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label={option.label}
                      onClick={() => onViewportChange(option.id)}
                      className={cn(
                        "flex size-7 items-center justify-center rounded-md transition-colors",
                        active
                          ? "bg-accent text-indigo-400"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    />
                  }
                >
                  <Icon className="size-4" />
                </TooltipTrigger>
                <TooltipContent>{option.label}</TooltipContent>
              </Tooltip>
            );
          })}
        </div>

        {/* Right: history, preview, publish */}
        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" disabled aria-label="Буцаах" />
              }
            >
              <Undo2 />
            </TooltipTrigger>
            <TooltipContent>Буцаах</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" disabled aria-label="Дахих" />
              }
            >
              <Redo2 />
            </TooltipTrigger>
            <TooltipContent>Дахих</TooltipContent>
          </Tooltip>

          <div className="mx-1 h-5 w-px bg-border" />

          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={openInCodeEditor}
                  aria-label="Код засварлагчид нээх"
                />
              }
            >
              <Code2 />
              Код
            </TooltipTrigger>
            <TooltipContent>Хуудсаа HTML болгож код засварлагчид нээх</TooltipContent>
          </Tooltip>

          <Button
            variant={previewMode ? "secondary" : "ghost"}
            size="sm"
            onClick={onTogglePreview}
          >
            {previewMode ? <EyeOff /> : <Eye />}
            {previewMode ? "Засварлах горим" : "Урьдчилан үзэх"}
          </Button>

          <Dialog>
            <DialogTrigger
              render={
                <Button
                  size="sm"
                  className="border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
                />
              }
            >
              Нийтлэх
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Нийтлэхийн тулд багц шаардлагатай</DialogTitle>
                <DialogDescription>
                  “{siteName}” нийтлэгдэхэд бэлэн боллоо — modulesoft.site
                  домэйн дээр нийтлэх боломж бүх төлбөрт багцад багтсан. Таны
                  ноорог энд хэвээрээ хадгалагдана.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" render={<a href="/dashboard" />}>
                  Самбар руу
                </Button>
                <Button
                  className="border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400"
                  render={<a href="/pricing" />}
                >
                  Багц үзэх
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </TooltipProvider>
  );
}
