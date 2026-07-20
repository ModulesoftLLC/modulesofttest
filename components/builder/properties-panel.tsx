"use client";

import { AlignCenter, AlignLeft, Plus, Trash2 } from "lucide-react";

import type { BuilderSection } from "@/types";
import { colorSwatches, fontOptions, imagePresets } from "@/data/builder";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import type { ContentPatch, StylePatch } from "@/components/builder/editor";

interface PropertiesPanelProps {
  section: BuilderSection;
  onUpdateContent: (patch: ContentPatch) => void;
  onUpdateStyle: (patch: StylePatch) => void;
  onRemove: () => void;
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}

function safeHex(value: string): string {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : "#6366f1";
}

function ColorControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex flex-wrap items-center gap-1.5">
        {colorSwatches.map((swatch) => (
          <button
            key={swatch}
            type="button"
            aria-label={`Use color ${swatch}`}
            onClick={() => onChange(swatch)}
            style={{ backgroundColor: swatch }}
            className={cn(
              "size-6 rounded-full border border-white/10 transition-transform duration-150",
              value.toLowerCase() === swatch.toLowerCase()
                ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-card"
                : "hover:scale-110"
            )}
          />
        ))}
        <label
          title="Custom color"
          className="relative size-6 cursor-pointer overflow-hidden rounded-full border border-white/10"
        >
          <span
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "conic-gradient(#ef4444, #eab308, #22c55e, #0ea5e9, #8b5cf6, #ef4444)",
            }}
          />
          <input
            type="color"
            value={safeHex(value)}
            onChange={(event) => onChange(event.target.value)}
            aria-label={`Custom ${label.toLowerCase()}`}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </div>
  );
}

const fontItems = fontOptions.map((font) => ({
  label: font.label,
  value: font.value,
}));

const alignOptions: {
  value: "left" | "center";
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { value: "left", label: "Align left", icon: AlignLeft },
  { value: "center", label: "Align center", icon: AlignCenter },
];

export function PropertiesPanel({
  section,
  onUpdateContent,
  onUpdateStyle,
  onRemove,
}: PropertiesPanelProps) {
  const { content, style } = section;

  const updateItem = (
    index: number,
    patch: Partial<{ title: string; description: string }>
  ) => {
    onUpdateContent({
      items: content.items.map((item, i) =>
        i === index ? { ...item, ...patch } : item
      ),
    });
  };

  const removeItem = (index: number) => {
    onUpdateContent({ items: content.items.filter((_, i) => i !== index) });
  };

  const addItem = () => {
    onUpdateContent({
      items: [
        ...content.items,
        { title: "New item", description: "Describe this item" },
      ],
    });
  };

  return (
    <aside className="w-72 shrink-0 overflow-y-auto border-l border-border bg-card/50">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 border-b border-border p-3">
        <div className="flex min-w-0 items-center gap-2">
          <p className="truncate text-sm font-semibold">{section.label}</p>
          <Badge variant="secondary" className="capitalize">
            {section.type}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Remove section"
          onClick={onRemove}
          className="text-muted-foreground hover:text-red-400"
        >
          <Trash2 />
        </Button>
      </div>

      <Tabs defaultValue="content" className="gap-0">
        <div className="border-b border-border p-3">
          <TabsList className="w-full">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="style">Style</TabsTrigger>
          </TabsList>
        </div>

        {/* ------------------------------ Content ------------------------------ */}
        <TabsContent value="content" className="space-y-5 p-4">
          <Field label="Heading">
            <Input
              value={content.heading}
              onChange={(event) => onUpdateContent({ heading: event.target.value })}
              placeholder="Heading"
            />
          </Field>

          <Field label="Subheading">
            <Input
              value={content.subheading}
              onChange={(event) =>
                onUpdateContent({ subheading: event.target.value })
              }
              placeholder="Subheading"
            />
          </Field>

          <Field label="Body">
            <Textarea
              value={content.body}
              onChange={(event) => onUpdateContent({ body: event.target.value })}
              placeholder="Body copy"
              rows={3}
              className="resize-none"
            />
          </Field>

          <Field label="Button text">
            <Input
              value={content.buttonText}
              onChange={(event) =>
                onUpdateContent({ buttonText: event.target.value })
              }
              placeholder="Button label"
            />
          </Field>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Items</Label>
            {content.items.map((item, index) => (
              <div
                key={index}
                className="space-y-1.5 rounded-lg border border-border bg-secondary/30 p-2"
              >
                <div className="flex items-center gap-1.5">
                  <Input
                    value={item.title}
                    onChange={(event) =>
                      updateItem(index, { title: event.target.value })
                    }
                    placeholder="Title"
                    className="h-7 text-xs"
                  />
                  <button
                    type="button"
                    aria-label={`Remove item ${index + 1}`}
                    onClick={() => removeItem(index)}
                    className="flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-red-400"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <Input
                  value={item.description}
                  onChange={(event) =>
                    updateItem(index, { description: event.target.value })
                  }
                  placeholder="Description"
                  className="h-7 text-xs"
                />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={addItem}>
              <Plus />
              Add item
            </Button>
          </div>

          <Field label="Image">
            <div className="grid grid-cols-6 gap-1.5">
              {imagePresets.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  title={preset.label}
                  aria-label={preset.label}
                  onClick={() => onUpdateContent({ image: preset.value })}
                  style={{ background: preset.value }}
                  className={cn(
                    "aspect-square rounded-md transition-transform duration-150",
                    content.image === preset.value
                      ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-card"
                      : "hover:scale-105"
                  )}
                />
              ))}
            </div>
          </Field>
        </TabsContent>

        {/* ------------------------------- Style ------------------------------- */}
        <TabsContent value="style" className="space-y-5 p-4">
          <ColorControl
            label="Background color"
            value={style.backgroundColor}
            onChange={(value) => onUpdateStyle({ backgroundColor: value })}
          />
          <ColorControl
            label="Text color"
            value={style.textColor}
            onChange={(value) => onUpdateStyle({ textColor: value })}
          />
          <ColorControl
            label="Accent color"
            value={style.accentColor}
            onChange={(value) => onUpdateStyle({ accentColor: value })}
          />

          <Field label="Font">
            <Select
              items={fontItems}
              value={style.fontFamily}
              onValueChange={(value) => {
                if (typeof value === "string") {
                  onUpdateStyle({ fontFamily: value });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.id} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <Label className="text-xs text-muted-foreground">
                Vertical padding
              </Label>
              <span className="text-xs tabular-nums text-muted-foreground">
                {style.paddingY}px
              </span>
            </div>
            <Slider
              min={24}
              max={160}
              step={8}
              value={style.paddingY}
              onValueChange={(value) =>
                onUpdateStyle({
                  paddingY:
                    typeof value === "number" ? value : Number(value[0] ?? 24),
                })
              }
            />
          </div>

          <Field label="Alignment">
            <div className="flex gap-1.5">
              {alignOptions.map((option) => {
                const Icon = option.icon;
                const active = style.align === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    aria-label={option.label}
                    title={option.label}
                    onClick={() => onUpdateStyle({ align: option.value })}
                    className={cn(
                      "flex h-8 flex-1 items-center justify-center rounded-lg border transition-colors",
                      active
                        ? "border-indigo-500/40 bg-accent text-indigo-400"
                        : "border-border text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="size-4" />
                  </button>
                );
              })}
            </div>
          </Field>

          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">Rounded corners</Label>
            <Switch
              checked={style.rounded}
              onCheckedChange={(checked) => onUpdateStyle({ rounded: checked })}
            />
          </div>
        </TabsContent>
      </Tabs>
    </aside>
  );
}
