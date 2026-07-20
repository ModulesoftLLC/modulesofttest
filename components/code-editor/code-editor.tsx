"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Editor from "@monaco-editor/react";
import {
  Columns2,
  Download,
  Eye,
  FileCode2,
  LayoutTemplate,
  Monitor,
  Play,
  Smartphone,
  SquareCode,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import {
  CODE_HANDOFF_KEY,
  exportedBaseCss,
  exportedBaseJs,
  type CodeHandoff,
} from "@/lib/export-html";
import { cn } from "@/lib/utils";

type FileId = "html" | "css" | "js";
type Layout = "code" | "split" | "preview";

const files: { id: FileId; name: string; language: string }[] = [
  { id: "html", name: "index.html", language: "html" },
  { id: "css", name: "styles.css", language: "css" },
  { id: "js", name: "script.js", language: "javascript" },
];

const STORAGE_KEY = "modulesoft-code-editor";

const defaultHtml = `<!doctype html>
<html lang="mn">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Миний вэбсайт</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <header class="section nav">
    <strong>Миний вэбсайт</strong>
    <nav>
      <a href="#">Нүүр</a>
      <a href="#">Тухай</a>
      <a href="#">Холбоо барих</a>
    </nav>
  </header>

  <section class="section hero">
    <p class="eyebrow">ТАВТАЙ МОРИЛ</p>
    <h2>Кодоо энд бичээд шууд үр дүнг хараарай</h2>
    <p class="muted">
      Зүүн талд HTML, CSS, JavaScript файлуудаа засварлахад баруун талын
      урьдчилан үзэх хэсэг шууд шинэчлэгдэнэ.
    </p>
    <a class="btn" href="#">Эхлэх</a>
  </section>

  <script src="script.js"></script>
</body>
</html>`;

function buildSrcDoc(html: string, css: string, js: string): string {
  let doc = html;
  const styleTag = `<style>\n${css}\n</style>`;
  const scriptTag = `<script>\n${js}\n<\/script>`;

  if (doc.includes('href="styles.css"')) {
    doc = doc.replace(/<link[^>]*href="styles\.css"[^>]*\/?>/, styleTag);
  } else if (doc.includes("</head>")) {
    doc = doc.replace("</head>", `${styleTag}\n</head>`);
  } else {
    doc = styleTag + doc;
  }

  if (doc.includes('src="script.js"')) {
    doc = doc.replace(/<script[^>]*src="script\.js"[^>]*><\/script>/, scriptTag);
  } else if (doc.includes("</body>")) {
    doc = doc.replace("</body>", `${scriptTag}\n</body>`);
  } else {
    doc = doc + scriptTag;
  }

  return doc;
}

export function CodeEditor({ fromBuilder }: { fromBuilder: boolean }) {
  const [siteName, setSiteName] = useState("Миний вэбсайт");
  const [code, setCode] = useState<Record<FileId, string>>({
    html: defaultHtml,
    css: exportedBaseCss,
    js: exportedBaseJs,
  });
  const [activeFile, setActiveFile] = useState<FileId>("html");
  const [layout, setLayout] = useState<Layout>("split");
  const [previewMobile, setPreviewMobile] = useState(false);
  const [srcDoc, setSrcDoc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Initial load: builder handoff wins, then last session, then defaults. */
  useEffect(() => {
    try {
      if (fromBuilder) {
        const raw = localStorage.getItem(CODE_HANDOFF_KEY);
        if (raw) {
          const handoff = JSON.parse(raw) as CodeHandoff;
          setSiteName(handoff.siteName);
          setCode({ html: handoff.html, css: handoff.css, js: handoff.js });
          localStorage.removeItem(CODE_HANDOFF_KEY);
          setLoaded(true);
          return;
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CodeHandoff;
        setSiteName(parsed.siteName);
        setCode({ html: parsed.html, css: parsed.css, js: parsed.js });
      }
    } catch {
      // хадгалсан код эвдэрсэн бол анхдагчаар үргэлжилнэ
    } finally {
      setLoaded(true);
    }
  }, [fromBuilder]);

  /* Debounced live preview + session persistence. */
  useEffect(() => {
    if (!loaded) return;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSrcDoc(buildSrcDoc(code.html, code.css, code.js));
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ siteName, ...code } satisfies CodeHandoff)
        );
      } catch {
        // quota дүүрсэн бол хадгалахгүй өнгөрнө
      }
    }, 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [code, siteName, loaded]);

  const run = useCallback(() => {
    setSrcDoc(buildSrcDoc(code.html, code.css, code.js));
  }, [code]);

  const download = useCallback(() => {
    const blob = new Blob([buildSrcDoc(code.html, code.css, code.js)], {
      type: "text/html;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${siteName.trim().toLowerCase().replace(/\s+/g, "-") || "site"}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [code, siteName]);

  const active = useMemo(
    () => files.find((f) => f.id === activeFile)!,
    [activeFile]
  );

  const layoutOptions: { id: Layout; label: string; icon: typeof SquareCode }[] = [
    { id: "code", label: "Зөвхөн код", icon: SquareCode },
    { id: "split", label: "Хуваасан", icon: Columns2 },
    { id: "preview", label: "Урьдчилан үзэх", icon: Eye },
  ];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      {/* Top bar */}
      <header className="glass z-30 flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Logo />
          <div className="h-5 w-px shrink-0 bg-border" />
          <input
            value={siteName}
            onChange={(e) => setSiteName(e.target.value)}
            aria-label="Сайтын нэр"
            spellCheck={false}
            className="h-8 w-36 rounded-md bg-transparent px-2 text-sm font-medium outline-none transition-colors hover:bg-secondary/60 focus:bg-secondary/60 md:w-44"
          />
          <Badge variant="secondary">Код засварлагч</Badge>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary/50 p-1">
          {layoutOptions.map((option) => {
            const Icon = option.icon;
            const isActive = layout === option.id;
            return (
              <button
                key={option.id}
                type="button"
                title={option.label}
                aria-label={option.label}
                onClick={() => setLayout(option.id)}
                className={cn(
                  "flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs transition-colors",
                  isActive
                    ? "bg-accent text-indigo-400"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="size-4" />
                <span className="hidden lg:inline">{option.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            title={previewMobile ? "Компьютерийн харагдац" : "Утасны харагдац"}
            aria-label="Урьдчилан үзэх өргөн"
            onClick={() => setPreviewMobile((v) => !v)}
            className="flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            {previewMobile ? (
              <Smartphone className="size-4 text-indigo-400" />
            ) : (
              <Monitor className="size-4" />
            )}
          </button>

          <div className="mx-1 h-5 w-px bg-border" />

          <Button variant="ghost" size="sm" onClick={run}>
            <Play />
            Ажиллуулах
          </Button>
          <Button variant="ghost" size="sm" onClick={download}>
            <Download />
            Татах
          </Button>
          <Button
            size="sm"
            className="border-transparent bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-400 hover:to-violet-400"
            render={<Link href="/builder" />}
          >
            <LayoutTemplate />
            Бүтээгч рүү
          </Button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        {/* Editor pane */}
        {layout !== "preview" && (
          <div
            className={cn(
              "flex min-w-0 flex-col border-r border-border",
              layout === "split" ? "w-1/2" : "flex-1"
            )}
          >
            {/* File tabs */}
            <div className="flex h-10 shrink-0 items-center gap-1 border-b border-border bg-card/50 px-2">
              {files.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => setActiveFile(file.id)}
                  className={cn(
                    "flex h-7 items-center gap-1.5 rounded-md px-2.5 font-mono text-xs transition-colors",
                    activeFile === file.id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <FileCode2
                    className={cn(
                      "size-3.5",
                      activeFile === file.id && "text-indigo-400"
                    )}
                  />
                  {file.name}
                </button>
              ))}
            </div>

            <div className="min-h-0 flex-1">
              <Editor
                key={active.id}
                language={active.language}
                value={code[active.id]}
                onChange={(value) =>
                  setCode((prev) => ({ ...prev, [active.id]: value ?? "" }))
                }
                theme="vs-dark"
                loading={
                  <p className="p-4 text-sm text-muted-foreground">
                    Засварлагч ачаалж байна…
                  </p>
                }
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  fontFamily: "var(--font-geist-mono), monospace",
                  padding: { top: 12 },
                  scrollBeyondLastLine: false,
                  smoothScrolling: true,
                  wordWrap: "on",
                  tabSize: 2,
                  automaticLayout: true,
                }}
              />
            </div>
          </div>
        )}

        {/* Preview pane */}
        {layout !== "code" && (
          <div className="flex min-w-0 flex-1 flex-col bg-secondary/30">
            <div className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-card/50 px-4">
              <span className="text-xs text-muted-foreground">
                Урьдчилан үзэх
              </span>
              <span className="rounded-full bg-secondary px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
                {siteName.trim().toLowerCase().replace(/\s+/g, "-") || "site"}
                .modulesoft.site
              </span>
            </div>
            <div className="flex min-h-0 flex-1 items-stretch justify-center overflow-auto p-4">
              <iframe
                title="Урьдчилан үзэх"
                sandbox="allow-scripts"
                srcDoc={srcDoc}
                className={cn(
                  "h-full rounded-lg border border-border bg-white shadow-2xl transition-all duration-300",
                  previewMobile ? "w-[390px]" : "w-full"
                )}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
