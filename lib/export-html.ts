import type { BuilderSection } from "@/types";

/**
 * Serializes builder sections into a standalone HTML document the code
 * editor can open and the user can keep hacking on. Not a pixel-perfect
 * mirror of the canvas — a clean, readable starting point.
 */

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const isImage = (v: string) => v.startsWith("data:") || v.startsWith("http");

function sectionCss(section: BuilderSection): string {
  const { style } = section;
  return [
    `background:${style.backgroundColor}`,
    `color:${style.textColor}`,
    `font-family:${style.fontFamily}`,
    `padding:${style.paddingY}px 24px`,
    `text-align:${style.align}`,
    style.rounded ? "border-radius:24px" : "",
  ]
    .filter(Boolean)
    .join(";");
}

function itemsHtml(section: BuilderSection): string {
  if (section.content.items.length === 0) return "";
  const cards = section.content.items
    .map(
      (item) => `
      <div class="card">
        <h3>${esc(item.title)}</h3>
        ${item.description ? `<p>${esc(item.description)}</p>` : ""}
      </div>`
    )
    .join("");
  return `<div class="grid">${cards}</div>`;
}

function sectionHtml(section: BuilderSection): string {
  const { content, style, type } = section;
  const accent = style.accentColor;
  const button = content.buttonText
    ? `<a class="btn" style="background:${accent}" href="#">${esc(content.buttonText)}</a>`
    : "";
  const media = isImage(content.image)
    ? `<img class="media" src="${esc(content.image)}" alt="" />`
    : "";

  if (type === "navbar") {
    return `
  <header class="section nav" style="${sectionCss(section)}">
    <strong>${esc(content.heading)}</strong>
    <nav>${section.content.items.map((i) => `<a href="#">${esc(i.title)}</a>`).join("")}</nav>
    ${button}
  </header>`;
  }

  if (type === "footer") {
    return `
  <footer class="section" style="${sectionCss(section)}">
    <strong>${esc(content.heading)}</strong>
    <nav>${section.content.items.map((i) => `<a href="#">${esc(i.title)}</a>`).join("")}</nav>
    <p class="muted">${esc(content.body)}</p>
  </footer>`;
  }

  return `
  <section class="section ${type}" style="${sectionCss(section)}">
    ${content.subheading ? `<p class="eyebrow" style="color:${accent}">${esc(content.subheading)}</p>` : ""}
    ${content.heading ? `<h2>${esc(content.heading)}</h2>` : ""}
    ${content.body ? `<p class="muted">${esc(content.body)}</p>` : ""}
    ${media}
    ${itemsHtml(section)}
    ${button}
  </section>`;
}

export function exportSectionsToHtml(
  siteName: string,
  sections: BuilderSection[]
): string {
  const body = sections.map(sectionHtml).join("\n");
  return `<!doctype html>
<html lang="mn">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(siteName)}</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
${body}
  <script src="script.js"></script>
</body>
</html>`;
}

/** Companion stylesheet for the exported markup. */
export const exportedBaseCss = `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; line-height: 1.6; }
.section { display: flex; flex-direction: column; gap: 20px; }
.section[style*="text-align:center"] { align-items: center; }
.nav, footer.section { flex-direction: row; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; }
nav { display: flex; gap: 20px; }
nav a { color: inherit; text-decoration: none; opacity: 0.75; }
nav a:hover { opacity: 1; }
.eyebrow { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 600; }
h2 { font-size: clamp(28px, 5vw, 44px); font-weight: 500; line-height: 1.15; }
h3 { font-size: 18px; font-weight: 600; }
.muted { opacity: 0.7; max-width: 640px; }
.btn { display: inline-block; padding: 12px 28px; border-radius: 999px; color: #fff; text-decoration: none; font-weight: 500; }
.btn:hover { filter: brightness(1.1); }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; width: 100%; max-width: 1080px; }
.card { border: 1px solid rgba(128,128,128,0.25); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 8px; text-align: left; }
.media { width: 100%; max-width: 880px; border-radius: 16px; object-fit: cover; max-height: 420px; }
`;

export const exportedBaseJs = `// ${"Энд өөрийн JavaScript кодоо бичээрэй"}
document.addEventListener("DOMContentLoaded", () => {
  console.log("Сайт ачааллаа");
});
`;

/** localStorage handoff key between the builder and the code editor. */
export const CODE_HANDOFF_KEY = "modulesoft-code-handoff";

export interface CodeHandoff {
  siteName: string;
  html: string;
  css: string;
  js: string;
}
