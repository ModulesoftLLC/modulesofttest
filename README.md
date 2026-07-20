# MODULESOFT

A premium website-platform SaaS in the spirit of Framer, Webflow and Wix Studio:
marketing site, template marketplace, visual website builder, order flow, and
client + admin dashboards — built frontend-first with a clean seam for a real
backend later.

## Stack

- **Next.js 15** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** with a custom dark design system (`app/globals.css`)
- **shadcn/ui** primitives (`components/ui/`)
- **Framer Motion** for scroll/stagger/layout animation
- **lucide-react** icons

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
```

## Surfaces

| Route | What it is |
| --- | --- |
| `/` `/about` `/services` `/portfolio` `/pricing` `/contact` `/blog` | Marketing website (shared navbar/footer via `app/(marketing)/layout.tsx`) |
| `/templates` | Template marketplace — search, category filters, sorting |
| `/templates/[slug]` | Template detail — features, pages, purchase card |
| `/preview/[slug]` | Full-screen simulated live preview with viewport switcher |
| `/builder` (`?template=slug`) | Webflow-like editor: components panel · canvas · properties panel |
| `/order` (`?template=id`) | 4-step project request wizard (type → budget → details → contact) |
| `/dashboard/*` | Client dashboard: overview, projects, orders, templates, messages, settings |
| `/admin/*` | Admin: overview, analytics, orders, templates, users |

## Architecture

```
app/
  (marketing)/        # navbar+footer chrome; home, about, services, portfolio,
                      # templates, pricing, contact, blog
  preview/[slug]/     # chrome-less template preview
  builder/            # full-screen editor app
  order/              # focused order wizard
  dashboard/          # client dashboard (DashboardShell chrome)
  admin/              # admin dashboard (DashboardShell chrome)
components/
  ui/                 # shadcn primitives — generated, generic
  shared/             # cross-surface: Navbar, Footer, Logo, Container,
                      # SectionHeading, motion primitives, TemplateCard,
                      # TemplateThumbnail, DashboardShell
  templates/          # marketplace-specific
  builder/            # editor-specific (editor, panels, canvas, renderer)
  order/              # order-wizard-specific
data/                 # typed mock datasets (templates, projects, orders,
                      # users, messages, blog, portfolio, analytics, builder
                      # section presets)
lib/
  api/                # mock service layer — THE backend seam (see below)
  format.ts           # currency/date/initials formatters
  utils.ts            # cn()
types/                # single source of truth for all domain models
```

### The backend seam

UI reads data through `lib/api/index.ts` (async functions returning types from
`types/`), not by importing `data/` directly in feature code. To integrate a
real backend:

1. Keep every signature in `lib/api/index.ts`; replace mock returns with
   `fetch`/server actions hitting your API.
2. The write path (`submitOrderRequest`) already models the request/response
   shape (`OrderRequestInput`).
3. Delete `data/` once all endpoints are live — nothing else needs to change.

### Design system

Semantic tokens (`bg-background`, `bg-card`, `border-border`, …) are defined in
`app/globals.css` on a near-black violet-tinted dark palette, with custom
utilities: `text-gradient`, `glass`, `bg-grid`, `glow-primary`, `card-hover`.
Accent is the indigo→violet gradient. Template and project "images" are
CSS-generated (`TemplateThumbnail`, gradient palettes stored per record) so the
whole product runs with zero image assets — swap in real screenshots later.

## Notes

- All data is mock; no database, auth, or persistence yet by design.
- Builder state is in-memory per session.
- Charts in the admin are dependency-free CSS/SVG.
# modulesofttest
