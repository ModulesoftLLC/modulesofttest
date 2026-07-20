"use client";

import { useCallback, useRef, useState } from "react";
import { MousePointerClick } from "lucide-react";

import type { BuilderSection, SectionStyle, SectionType, Viewport } from "@/types";
import { defaultSectionTypes, getPresetByType } from "@/data/builder";
import { TopBar } from "@/components/builder/top-bar";
import { ComponentsPanel } from "@/components/builder/components-panel";
import { Canvas } from "@/components/builder/canvas";
import { PropertiesPanel } from "@/components/builder/properties-panel";

export interface TemplateSeed {
  name: string;
  palette: { from: string; to: string; surface: string };
}

export type ContentPatch = Partial<BuilderSection["content"]>;
export type StylePatch = Partial<SectionStyle>;
export type MoveDirection = "up" | "down";

function cloneSection(
  source: BuilderSection,
  id: string,
  styleOverrides?: StylePatch
): BuilderSection {
  return {
    ...source,
    id,
    content: {
      ...source.content,
      items: source.content.items.map((item) => ({ ...item })),
    },
    style: { ...source.style, ...styleOverrides },
  };
}

export function Editor({ template }: { template: TemplateSeed | null }) {
  const idCounter = useRef(0);
  const nextId = useCallback(() => {
    idCounter.current += 1;
    return `sec-user-${idCounter.current}`;
  }, []);

  const [sections, setSections] = useState<BuilderSection[]>(() =>
    defaultSectionTypes.map((type, index) =>
      cloneSection(
        getPresetByType(type),
        `sec-init-${index}`,
        template ? { accentColor: template.palette.from } : undefined
      )
    )
  );
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [viewport, setViewport] = useState<Viewport>("desktop");
  const [previewMode, setPreviewMode] = useState(false);
  const [siteName, setSiteName] = useState(template?.name ?? "Миний вэбсайт");

  const selectedSection =
    sections.find((section) => section.id === selectedSectionId) ?? null;

  const addSection = useCallback(
    (type: SectionType) => {
      const accent = template ? { accentColor: template.palette.from } : undefined;
      const section = cloneSection(getPresetByType(type), nextId(), accent);
      setSections((prev) => {
        const footerIndex = prev.findIndex((s) => s.type === "footer");
        if (footerIndex === -1) return [...prev, section];
        return [...prev.slice(0, footerIndex), section, ...prev.slice(footerIndex)];
      });
      setSelectedSectionId(section.id);
    },
    [nextId, template]
  );

  const removeSection = useCallback((id: string) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
    setSelectedSectionId((current) => (current === id ? null : current));
  }, []);

  const moveSection = useCallback((id: string, direction: MoveDirection) => {
    setSections((prev) => {
      const index = prev.findIndex((section) => section.id === id);
      if (index === -1) return prev;
      const target = direction === "up" ? index - 1 : index + 1;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      const moved = next[index];
      next[index] = next[target];
      next[target] = moved;
      return next;
    });
  }, []);

  const duplicateSection = useCallback(
    (id: string) => {
      let copyId: string | null = null;
      setSections((prev) => {
        const index = prev.findIndex((section) => section.id === id);
        if (index === -1) return prev;
        copyId = nextId();
        const copy = cloneSection(prev[index], copyId);
        return [...prev.slice(0, index + 1), copy, ...prev.slice(index + 1)];
      });
      if (copyId) setSelectedSectionId(copyId);
    },
    [nextId]
  );

  const selectSection = useCallback((id: string | null) => {
    setSelectedSectionId(id);
  }, []);

  const updateContent = useCallback((id: string, patch: ContentPatch) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, content: { ...section.content, ...patch } }
          : section
      )
    );
  }, []);

  const updateStyle = useCallback((id: string, patch: StylePatch) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, style: { ...section.style, ...patch } }
          : section
      )
    );
  }, []);

  const togglePreview = useCallback(() => {
    setPreviewMode((prev) => !prev);
  }, []);

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <TopBar
        siteName={siteName}
        onSiteNameChange={setSiteName}
        viewport={viewport}
        onViewportChange={setViewport}
        previewMode={previewMode}
        onTogglePreview={togglePreview}
      />

      <div className="flex min-h-0 flex-1">
        {!previewMode && <ComponentsPanel onAdd={addSection} />}

        <Canvas
          sections={sections}
          selectedId={selectedSectionId}
          viewport={viewport}
          previewMode={previewMode}
          siteName={siteName}
          onSelect={selectSection}
          onMove={moveSection}
          onDuplicate={duplicateSection}
          onRemove={removeSection}
        />

        {!previewMode &&
          (selectedSection ? (
            <PropertiesPanel
              key={selectedSection.id}
              section={selectedSection}
              onUpdateContent={(patch) => updateContent(selectedSection.id, patch)}
              onUpdateStyle={(patch) => updateStyle(selectedSection.id, patch)}
              onRemove={() => removeSection(selectedSection.id)}
            />
          ) : (
            <aside className="flex w-72 shrink-0 flex-col items-center justify-center gap-3 border-l border-border bg-card/50 p-6 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-secondary">
                <MousePointerClick className="size-5 text-indigo-400" />
              </span>
              <p className="text-sm font-medium">Засварлах хэсгээ сонгоно уу</p>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Канвас дээрх дурын блок дээр дарж контент болон загварыг нь
                тохируулаарай.
              </p>
            </aside>
          ))}
      </div>
    </div>
  );
}
