"use client";

import { useRef, useState } from "react";
import { AlignCenter, AlignLeft, Plus, Trash2, Upload, X } from "lucide-react";

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
import { isImageValue } from "@/components/builder/section-renderer";
import type { ContentPatch, StylePatch } from "@/components/builder/editor";

const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

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
            aria-label={`${swatch} өнгө сонгох`}
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
          title="Өөрийн өнгө"
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
            aria-label={`Өөрийн өнгө — ${label.toLowerCase()}`}
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
  { value: "left", label: "Зүүн тийш зэрэгцүүлэх", icon: AlignLeft },
  { value: "center", label: "Голд нь зэрэгцүүлэх", icon: AlignCenter },
];

function ImageControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (image: string) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [urlDraft, setUrlDraft] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File | undefined) => {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setError("4MB-ээс бага зураг сонгоно уу");
      return;
    }
    setError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onChange(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const applyUrl = () => {
    const url = urlDraft.trim();
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      setError("http:// эсвэл https:// хаяг оруулна уу");
      return;
    }
    setError(null);
    onChange(url);
    setUrlDraft("");
  };

  return (
    <div className="space-y-2.5">
      {/* Gradient presets */}
      <div className="grid grid-cols-6 gap-1.5">
        {imagePresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            title={preset.label}
            aria-label={preset.label}
            onClick={() => onChange(preset.value)}
            style={{ background: preset.value }}
            className={cn(
              "aspect-square rounded-md transition-transform duration-150",
              value === preset.value
                ? "ring-2 ring-indigo-500 ring-offset-2 ring-offset-card"
                : "hover:scale-105"
            )}
          />
        ))}
      </div>

      {/* Current uploaded/URL image preview */}
      {isImageValue(value) && (
        <div className="relative overflow-hidden rounded-lg border border-border">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt="Сонгосон зураг"
            className="h-24 w-full object-cover"
          />
          <button
            type="button"
            aria-label="Зургийг арилгах"
            title="Зургийг арилгах"
            onClick={() => onChange(imagePresets[0].value)}
            className="absolute top-1.5 right-1.5 flex size-6 items-center justify-center rounded-md bg-black/60 text-white transition-colors hover:bg-black/80"
          >
            <X className="size-3.5" />
          </button>
        </div>
      )}

      {/* Upload zone */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border px-3 py-3 text-xs text-muted-foreground transition-colors hover:border-indigo-500/50 hover:bg-secondary/50 hover:text-foreground"
      >
        <Upload className="size-3.5" />
        Зураг оруулах
      </button>

      {/* URL row */}
      <div className="flex items-center gap-1.5">
        <Input
          value={urlDraft}
          onChange={(event) => setUrlDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              applyUrl();
            }
          }}
          placeholder="https://…"
          className="h-8 text-xs"
        />
        <Button
          variant="outline"
          size="sm"
          className="h-8 shrink-0"
          onClick={applyUrl}
        >
          Ашиглах
        </Button>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

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
        { title: "Шинэ мөр", description: "Энэ мөрийг тайлбарлана уу" },
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
          aria-label="Хэсгийг устгах"
          onClick={onRemove}
          className="text-muted-foreground hover:text-red-400"
        >
          <Trash2 />
        </Button>
      </div>

      <Tabs defaultValue="content" className="gap-0">
        <div className="border-b border-border p-3">
          <TabsList className="w-full">
            <TabsTrigger value="content">Контент</TabsTrigger>
            <TabsTrigger value="style">Загвар</TabsTrigger>
          </TabsList>
        </div>

        {/* ------------------------------ Content ------------------------------ */}
        <TabsContent value="content" className="space-y-5 p-4">
          <Field label="Гарчиг">
            <Input
              value={content.heading}
              onChange={(event) => onUpdateContent({ heading: event.target.value })}
              placeholder="Гарчиг"
            />
          </Field>

          <Field label="Дэд гарчиг">
            <Input
              value={content.subheading}
              onChange={(event) =>
                onUpdateContent({ subheading: event.target.value })
              }
              placeholder="Дэд гарчиг"
            />
          </Field>

          <Field label="Их бие">
            <Textarea
              value={content.body}
              onChange={(event) => onUpdateContent({ body: event.target.value })}
              placeholder="Үндсэн текст"
              rows={3}
              className="resize-none"
            />
          </Field>

          <Field label="Товчны текст">
            <Input
              value={content.buttonText}
              onChange={(event) =>
                onUpdateContent({ buttonText: event.target.value })
              }
              placeholder="Товчны бичвэр"
            />
          </Field>

          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Мөрүүд</Label>
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
                    placeholder="Гарчиг"
                    className="h-7 text-xs"
                  />
                  <button
                    type="button"
                    aria-label={`${index + 1}-р мөрийг устгах`}
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
                  placeholder="Тайлбар"
                  className="h-7 text-xs"
                />
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full" onClick={addItem}>
              <Plus />
              Мөр нэмэх
            </Button>
          </div>

          <Field label="Зураг">
            <ImageControl
              value={content.image}
              onChange={(image) => onUpdateContent({ image })}
            />
          </Field>
        </TabsContent>

        {/* ------------------------------- Style ------------------------------- */}
        <TabsContent value="style" className="space-y-5 p-4">
          <ColorControl
            label="Дэвсгэр өнгө"
            value={style.backgroundColor}
            onChange={(value) => onUpdateStyle({ backgroundColor: value })}
          />
          <ColorControl
            label="Текстийн өнгө"
            value={style.textColor}
            onChange={(value) => onUpdateStyle({ textColor: value })}
          />
          <ColorControl
            label="Онцлох өнгө"
            value={style.accentColor}
            onChange={(value) => onUpdateStyle({ accentColor: value })}
          />

          <Field label="Фонт">
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
                Босоо зай
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

          <Field label="Зэрэгцүүлэлт">
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
            <Label className="text-xs text-muted-foreground">Дугуйруулах</Label>
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
