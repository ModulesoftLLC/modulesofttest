"use client";

import {
  Eye,
  EyeOff,
  Monitor,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";

import type { Viewport } from "@/types";
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
}

const viewportOptions: {
  id: Viewport;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { id: "desktop", label: "Desktop", icon: Monitor },
  { id: "tablet", label: "Tablet", icon: Tablet },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

export function TopBar({
  siteName,
  onSiteNameChange,
  viewport,
  onViewportChange,
  previewMode,
  onTogglePreview,
}: TopBarProps) {
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
            aria-label="Site name"
            spellCheck={false}
            className="h-8 w-36 rounded-md bg-transparent px-2 text-sm font-medium outline-none transition-colors hover:bg-secondary/60 focus:bg-secondary/60 md:w-44"
          />
          <Badge variant="secondary">Draft</Badge>
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
                <Button variant="ghost" size="icon-sm" disabled aria-label="Undo" />
              }
            >
              <Undo2 />
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon-sm" disabled aria-label="Redo" />
              }
            >
              <Redo2 />
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>

          <div className="mx-1 h-5 w-px bg-border" />

          <Button
            variant={previewMode ? "secondary" : "ghost"}
            size="sm"
            onClick={onTogglePreview}
          >
            {previewMode ? <EyeOff /> : <Eye />}
            {previewMode ? "Exit preview" : "Preview"}
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
              Publish
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Publishing requires a plan</DialogTitle>
                <DialogDescription>
                  “{siteName}” is ready to go live — publishing to a
                  modulesoft.site domain is included with every paid plan. Your
                  draft stays right here in the meantime.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" render={<a href="/dashboard" />}>
                  Go to dashboard
                </Button>
                <Button
                  className="border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:from-indigo-400 hover:to-violet-400"
                  render={<a href="/pricing" />}
                >
                  View pricing
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>
    </TooltipProvider>
  );
}
