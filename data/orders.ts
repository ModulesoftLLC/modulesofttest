import type { BudgetRange, Order, WebsiteType } from "@/types";

export const orders: Order[] = [
  {
    id: "ord-01",
    orderNumber: "MS-2026-1041",
    customer: { name: "Sofia Lindqvist", email: "sofia@harborandco.com", company: "Harbor & Co." },
    websiteType: "business",
    budget: "5k-10k",
    templateId: "tpl-01",
    status: "in-production",
    total: 7200,
    createdAt: "2026-06-28",
    notes: "Corporate rebrand, six pages, needs CMS handoff.",
  },
  {
    id: "ord-02",
    orderNumber: "MS-2026-1042",
    customer: { name: "Daniel Okafor", email: "daniel@neural.dev", company: "Neural Labs" },
    websiteType: "saas",
    budget: "10k-25k",
    templateId: "tpl-08",
    status: "delivered",
    total: 14500,
    createdAt: "2026-06-15",
    notes: "Launch site plus changelog and docs shell.",
  },
  {
    id: "ord-03",
    orderNumber: "MS-2026-1043",
    customer: { name: "Amelie Fournier", email: "amelie@emberhg.com", company: "Ember Hospitality Group" },
    websiteType: "restaurant",
    budget: "1k-5k",
    templateId: "tpl-02",
    status: "confirmed",
    total: 3400,
    createdAt: "2026-07-02",
    notes: "Two locations, shared menu system.",
  },
  {
    id: "ord-04",
    orderNumber: "MS-2026-1044",
    customer: { name: "Marcus Tan", email: "marcus@atlasapparel.shop", company: "Atlas Apparel" },
    websiteType: "ecommerce",
    budget: "10k-25k",
    templateId: "tpl-06",
    status: "pending",
    total: 12800,
    createdAt: "2026-07-12",
    notes: "Headless storefront, ~120 SKUs at launch.",
  },
  {
    id: "ord-05",
    orderNumber: "MS-2026-1045",
    customer: { name: "Dr. Elena Vasquez", email: "elena@vitalhealth.io", company: "Vital Health" },
    websiteType: "business",
    budget: "5k-10k",
    templateId: "tpl-05",
    status: "in-production",
    total: 8900,
    createdAt: "2026-06-22",
    notes: "Clinic site with appointment request flow. HIPAA copy review pending.",
  },
  {
    id: "ord-06",
    orderNumber: "MS-2026-1046",
    customer: { name: "Yuki Tanaka", email: "yuki@sakura.rest", company: "Sakura Dining" },
    websiteType: "restaurant",
    budget: "under-1k",
    templateId: "tpl-11",
    status: "cancelled",
    total: 690,
    createdAt: "2026-05-30",
    notes: "Postponed to next fiscal year.",
  },
  {
    id: "ord-07",
    orderNumber: "MS-2026-1047",
    customer: { name: "Isabelle Moreau", email: "isabelle@aperture.photo", company: "Aperture Studio" },
    websiteType: "portfolio",
    budget: "1k-5k",
    templateId: "tpl-14",
    status: "delivered",
    total: 2100,
    createdAt: "2026-05-08",
    notes: "Photography portfolio with print shop layout.",
  },
  {
    id: "ord-08",
    orderNumber: "MS-2026-1048",
    customer: { name: "Robert Achebe", email: "robert@summitlodge.travel", company: "Summit Lodge" },
    websiteType: "custom",
    budget: "25k-plus",
    templateId: null,
    status: "confirmed",
    total: 32000,
    createdAt: "2026-07-09",
    notes: "Fully custom booking experience, phase one of two.",
  },
];

export const orderStatusMeta: Record<
  Order["status"],
  { label: string; className: string }
> = {
  pending: { label: "Хүлээгдэж буй", className: "bg-amber-500/15 text-amber-400" },
  confirmed: { label: "Баталгаажсан", className: "bg-blue-500/15 text-blue-400" },
  "in-production": { label: "Хийгдэж буй", className: "bg-violet-500/15 text-violet-400" },
  delivered: { label: "Хүлээлгэн өгсөн", className: "bg-emerald-500/15 text-emerald-400" },
  cancelled: { label: "Цуцлагдсан", className: "bg-zinc-500/15 text-zinc-400" },
};

export const websiteTypeMeta: Record<
  WebsiteType,
  { label: string; description: string; icon: string }
> = {
  business: { label: "Бизнесийн вэбсайт", description: "Корпорацийн сайт, агентлаг, мэргэжлийн үйлчилгээ", icon: "Briefcase" },
  ecommerce: { label: "Онлайн дэлгүүр", description: "Бүтээгдэхүүний каталог, сагс, төлбөр", icon: "ShoppingBag" },
  portfolio: { label: "Портфолио", description: "Бүтээлч ажил, хувийн брэндийн танилцуулга", icon: "Palette" },
  restaurant: { label: "Ресторан", description: "Цэс, ширээ захиалга, байршил", icon: "UtensilsCrossed" },
  saas: { label: "SaaS / Стартап", description: "Бүтээгдэхүүний маркетинг, үнэ, баримтжуулалт", icon: "Rocket" },
  custom: { label: "Захиалгат шийдэл", description: "Вэб апп, портал, тусгай бүтээл", icon: "Wand2" },
};

export const budgetMeta: Record<
  BudgetRange,
  { label: string; hint: string }
> = {
  "under-1k": { label: "$1,000 хүртэл", hint: "Загвар суурилуулах, хөнгөн өөрчлөлт" },
  "1k-5k": { label: "$1,000 – $5,000", hint: "Контенттой, өөрчилсөн загвар" },
  "5k-10k": { label: "$5,000 – $10,000", hint: "Хагас захиалгат дизайн ба хөгжүүлэлт" },
  "10k-25k": { label: "$10,000 – $25,000", hint: "Бүрэн захиалгат дизайн ба хөгжүүлэлт" },
  "25k-plus": { label: "$25,000+", hint: "Захиалгат бүтээгдэхүүн, интеграци, урт хугацааны хамтын ажиллагаа" },
};
