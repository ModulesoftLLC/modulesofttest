import type { PortfolioItem } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "pf-01",
    slug: "neural-labs-launch",
    title: "Neural Labs Launch Site",
    client: "Neural Labs",
    industry: "AI / SaaS",
    summary:
      "A launch-grade marketing site for an AI infrastructure startup — animated product tour, usage-based pricing, and a changelog that reads like a product in itself.",
    services: ["Custom Design", "Motion Design", "Frontend Build"],
    year: 2026,
    palette: { from: "#8b5cf6", to: "#d946ef" },
    metrics: [
      { label: "Demo requests", value: "+218%" },
      { label: "Time on site", value: "3m 40s" },
      { label: "Launch to ship", value: "6 weeks" },
    ],
  },
  {
    id: "pf-02",
    slug: "harbor-co-rebrand",
    title: "Harbor & Co. Digital Rebrand",
    client: "Harbor & Co.",
    industry: "Consulting",
    summary:
      "A full digital rebrand for a maritime consultancy — new identity, case-study system, and a site that finally matches the caliber of their client list.",
    services: ["Brand & Identity", "Custom Design", "CMS Build"],
    year: 2026,
    palette: { from: "#6366f1", to: "#8b5cf6" },
    metrics: [
      { label: "Inbound leads", value: "2.1×" },
      { label: "Bounce rate", value: "−34%" },
      { label: "Pages designed", value: "14" },
    ],
  },
  {
    id: "pf-03",
    slug: "atlas-apparel-storefront",
    title: "Atlas Apparel Storefront",
    client: "Atlas Apparel",
    industry: "Ecommerce / Fashion",
    summary:
      "A headless storefront rebuilt around merchandising: drop campaigns, lookbooks, and a checkout flow tuned until it stopped leaking revenue.",
    services: ["Ecommerce Build", "Checkout Optimization", "Analytics"],
    year: 2025,
    palette: { from: "#ec4899", to: "#f43f5e" },
    metrics: [
      { label: "Conversion rate", value: "+41%" },
      { label: "AOV", value: "+$18" },
      { label: "Page speed", value: "98/100" },
    ],
  },
  {
    id: "pf-04",
    slug: "vital-health-clinic",
    title: "Vital Health Patient Experience",
    client: "Vital Health",
    industry: "Healthcare",
    summary:
      "A clinic website that treats patients like users — clear specialties, credentialed doctor profiles, and an appointment flow that works one-handed on a phone.",
    services: ["Custom Design", "Accessibility", "Frontend Build"],
    year: 2026,
    palette: { from: "#14b8a6", to: "#10b981" },
    metrics: [
      { label: "Online bookings", value: "+165%" },
      { label: "Accessibility", value: "WCAG AA" },
      { label: "Mobile share", value: "78%" },
    ],
  },
  {
    id: "pf-05",
    slug: "summit-lodge-booking",
    title: "Summit Lodge Booking Experience",
    client: "Summit Lodge",
    industry: "Hospitality",
    summary:
      "Phase one of a fully custom booking experience for an alpine boutique hotel — editorial photography layouts wrapped around hard-working booking UX.",
    services: ["Custom Design", "Booking UX", "Frontend Build"],
    year: 2026,
    palette: { from: "#f97316", to: "#eab308" },
    metrics: [
      { label: "Direct bookings", value: "+52%" },
      { label: "OTA dependency", value: "−28%" },
      { label: "Session depth", value: "5.2 pages" },
    ],
  },
  {
    id: "pf-06",
    slug: "ember-bistro-two-locations",
    title: "Ember Bistro, Two Locations",
    client: "Ember Hospitality Group",
    industry: "Restaurants",
    summary:
      "One brand, two rooms: a shared menu system and reservation flow serving two locations without duplicating a single line of content.",
    services: ["Template Customization", "Menu System", "Local SEO"],
    year: 2025,
    palette: { from: "#f97316", to: "#ef4444" },
    metrics: [
      { label: "Reservations", value: "+89%" },
      { label: "Menu updates", value: "Self-serve" },
      { label: "Build time", value: "3 weeks" },
    ],
  },
];

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug);
}
