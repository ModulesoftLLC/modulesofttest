import type { BlogPost } from "@/types";

export const blogPosts: BlogPost[] = [
  {
    id: "post-01",
    slug: "why-templates-beat-blank-canvases",
    title: "Why great templates beat blank canvases",
    excerpt:
      "The blank canvas is a myth. Every strong website starts from a proven structure — here's how to pick one and make it unmistakably yours.",
    content:
      "The romantic idea of starting from nothing is responsible for more abandoned website projects than any technical limitation.\n\nA good template is not a shortcut — it is compressed experience. Every proven layout encodes hundreds of decisions about hierarchy, rhythm, and conversion that someone already tested against real visitors. When you start from a strong structure, your energy goes where it actually differentiates you: your story, your offer, your proof.\n\nThe trap is stopping there. A template used as-is looks like a template. The work that matters is the translation layer — replacing the placeholder voice with your own, tuning the palette until it feels like your brand, and cutting every section that exists only because it shipped with the file.\n\nOur rule of thumb after 1,200 launches: keep the skeleton, replace the skin, and rewrite every single word.",
    author: "Jonas Weber",
    authorRole: "Founder & Creative Director",
    category: "Design",
    readingTime: 6,
    publishedAt: "2026-07-08",
    palette: { from: "#6366f1", to: "#8b5cf6" },
  },
  {
    id: "post-02",
    slug: "conversion-is-a-design-decision",
    title: "Conversion is a design decision, not a marketing one",
    excerpt:
      "Most conversion problems are decided long before the A/B test — in the hierarchy, the copy slots, and the order of sections on the page.",
    content:
      "By the time a marketing team starts A/B testing button colors, the page's conversion ceiling has already been set.\n\nIt was set when someone decided what the visitor sees first, second, and third. It was set when the pricing section was placed before — or after — the proof. It was set when the page asked for the sale once, or five times, or never clearly at all.\n\nWe sequence every landing page the same way: promise, proof, product, objections, price, ask. Not because it's a formula, but because it mirrors how a skeptical human actually decides. Motion and polish come after the sequence is right — polish on a broken sequence is lipstick on a leak.\n\nDesign your page as an argument. Then test the sentences, not just the buttons.",
    author: "Maya Chen",
    authorRole: "Lead Product Designer",
    category: "Strategy",
    readingTime: 7,
    publishedAt: "2026-06-24",
    palette: { from: "#f59e0b", to: "#ef4444" },
  },
  {
    id: "post-03",
    slug: "performance-budgets-are-promises",
    title: "Performance budgets are promises",
    excerpt:
      "A beautiful site that loads in four seconds is a beautiful site nobody sees. How we keep every MODULESOFT build under budget.",
    content:
      "Every project at MODULESOFT starts with two numbers written at the top of the brief: largest contentful paint under 1.8 seconds, total JavaScript under 170KB.\n\nThose numbers are promises, and promises change behavior. When the budget is explicit, the conversation about a heavy hero video happens before it ships, not after the bounce rate spikes. Fonts get subset. Images get sized for the layout they live in. Animation runs on the compositor or it doesn't run.\n\nThe surprising part isn't that constraints help performance — it's that they help design. Budgets force hierarchy: when you can't have everything, you decide what actually matters on the page. The fastest sites we've shipped are also, not coincidentally, the clearest.",
    author: "Priya Nair",
    authorRole: "Engineering Lead",
    category: "Engineering",
    readingTime: 5,
    publishedAt: "2026-06-10",
    palette: { from: "#14b8a6", to: "#10b981" },
  },
  {
    id: "post-04",
    slug: "ai-startup-website-checklist",
    title: "The AI startup website checklist",
    excerpt:
      "Between the demo GIF and the pricing page, most AI startups miss the same five things. A checklist from twenty launches in the category.",
    content:
      "AI startup websites have converged on a look — dark mode, gradient hero, terminal screenshot — but the ones that convert share substance, not style.\n\nFirst: show the product in the first viewport, moving. A static screenshot of a chat window tells a visitor nothing. Second: name the model risk. Buyers know outputs vary; sites that address reliability directly convert better than sites that pretend. Third: price something. 'Contact us' as the only option filters out the self-serve majority. Fourth: publish a changelog. In a category moving this fast, a two-month-old changelog reads as a dead product. Fifth: make the docs public. Engineers evaluate before they talk to sales — locked docs are a locked door.\n\nThe gradient is fine. Keep the gradient. Just put these five behind it.",
    author: "Maya Chen",
    authorRole: "Lead Product Designer",
    category: "Strategy",
    readingTime: 8,
    publishedAt: "2026-05-28",
    palette: { from: "#8b5cf6", to: "#d946ef" },
  },
  {
    id: "post-05",
    slug: "restaurant-websites-that-fill-tables",
    title: "Restaurant websites that actually fill tables",
    excerpt:
      "Menus as PDFs, reservations three clicks deep, photos from 2019 — the standard restaurant website is a lost customer machine. Here's the fix.",
    content:
      "A restaurant website has exactly three jobs: make someone hungry, tell them where you are, and let them book a table. Everything else is decoration.\n\nYet the average restaurant site buries the menu in a PDF that doesn't render on phones, hides reservations behind a third-party widget three clicks deep, and leads with a mission statement nobody came to read.\n\nWhen we rebuilt Ember Bistro's site, we made one structural decision that drove an 89% increase in reservations: the booking call-to-action follows the visitor down the page — present after every section, never blocking one. The menu became fast HTML with photography that looks like the food actually looks. Hours and location sit in the footer of every page, not just Contact.\n\nHungry people are impatient people. Design for them.",
    author: "Lucas Ferreira",
    authorRole: "Head of Client Studio",
    category: "Case Notes",
    readingTime: 5,
    publishedAt: "2026-05-12",
    palette: { from: "#f97316", to: "#ef4444" },
  },
  {
    id: "post-06",
    slug: "design-systems-for-small-teams",
    title: "Design systems for teams of one",
    excerpt:
      "You don't need a design ops team to benefit from a design system. You need twelve decisions written down.",
    content:
      "The phrase 'design system' conjures token pipelines and dedicated teams. For a small business website, a design system is something much simpler: twelve decisions, made once, written down.\n\nTwo fonts and where each is used. A type scale with five sizes, not fifteen. One accent color, one neutral ramp, and the rule for when the accent appears. Spacing on a single scale. One card style. One button hierarchy. What happens on hover.\n\nThat's it. That single page of decisions is why a professionally built site feels coherent and a DIY site feels noisy — not talent, consistency. Every template in our marketplace ships with its decisions documented, because the system is the product; the pages are just its output.",
    author: "Jonas Weber",
    authorRole: "Founder & Creative Director",
    category: "Design",
    readingTime: 4,
    publishedAt: "2026-04-30",
    palette: { from: "#0ea5e9", to: "#22d3ee" },
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
