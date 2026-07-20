import type { PortfolioItem } from "@/types";

export const portfolioItems: PortfolioItem[] = [
  {
    id: "pf-01",
    slug: "neural-labs-launch",
    title: "Neural Labs нээлтийн сайт",
    client: "Neural Labs",
    industry: "AI / SaaS",
    summary:
      "AI дэд бүтцийн стартапын нээлтийн түвшний маркетингийн сайт — хөдөлгөөнт бүтээгдэхүүний аялал, хэрэглээнд суурилсан үнэ, өөрөө нэг бүтээгдэхүүн мэт уншигдах шинэчлэлтийн тэмдэглэл.",
    services: ["Захиалгат дизайн", "Хөдөлгөөнт дизайн", "Frontend хөгжүүлэлт"],
    year: 2026,
    palette: { from: "#8b5cf6", to: "#d946ef" },
    metrics: [
      { label: "Демо хүсэлт", value: "+218%" },
      { label: "Сайтад өнгөрүүлсэн хугацаа", value: "3м 40с" },
      { label: "Нээлт хүртэлх хугацаа", value: "6 долоо хоног" },
    ],
  },
  {
    id: "pf-02",
    slug: "harbor-co-rebrand",
    title: "Harbor & Co. дижитал шинэ брэндинг",
    client: "Harbor & Co.",
    industry: "Зөвлөх үйлчилгээ",
    summary:
      "Далайн тээврийн зөвлөх компанийн бүрэн дижитал шинэ брэндинг — шинэ айдентити, кейс судалгааны систем, үйлчлүүлэгчдийнх нь нэр хүндэд нийцсэн вэбсайт.",
    services: ["Брэнд ба айдентити", "Захиалгат дизайн", "CMS хөгжүүлэлт"],
    year: 2026,
    palette: { from: "#6366f1", to: "#8b5cf6" },
    metrics: [
      { label: "Ирж буй хүсэлт", value: "2.1×" },
      { label: "Гарах хувь", value: "−34%" },
      { label: "Дизайн хийсэн хуудас", value: "14" },
    ],
  },
  {
    id: "pf-03",
    slug: "atlas-apparel-storefront",
    title: "Atlas Apparel онлайн дэлгүүр",
    client: "Atlas Apparel",
    industry: "Цахим худалдаа / Загвар",
    summary:
      "Мерчандайзингийг гол болгон дахин бүтээсэн headless онлайн дэлгүүр — шинэ коллекцын кампанит ажил, лукбүүк, орлого алдахаа болтол нь тохируулсан төлбөрийн урсгал.",
    services: ["Цахим худалдааны шийдэл", "Төлбөрийн урсгалын сайжруулалт", "Аналитик"],
    year: 2025,
    palette: { from: "#ec4899", to: "#f43f5e" },
    metrics: [
      { label: "Худалдан авалтын хувь", value: "+41%" },
      { label: "Дундаж захиалгын дүн", value: "+$18" },
      { label: "Хуудасны хурд", value: "98/100" },
    ],
  },
  {
    id: "pf-04",
    slug: "vital-health-clinic",
    title: "Vital Health үйлчлүүлэгчийн туршлага",
    client: "Vital Health",
    industry: "Эрүүл мэнд",
    summary:
      "Үйлчлүүлэгчдэд хэрэглэгч шиг ханддаг эмнэлгийн вэбсайт — тодорхой мэргэжлийн чиглэлүүд, баталгаажсан эмч нарын танилцуулга, утсаа ганц гараар барьсан ч цаг авч чадах захиалгын урсгал.",
    services: ["Захиалгат дизайн", "Хүртээмж", "Frontend хөгжүүлэлт"],
    year: 2026,
    palette: { from: "#14b8a6", to: "#10b981" },
    metrics: [
      { label: "Онлайн цаг захиалга", value: "+165%" },
      { label: "Хүртээмж", value: "WCAG AA" },
      { label: "Мобайл хэрэглээний эзлэх хувь", value: "78%" },
    ],
  },
  {
    id: "pf-05",
    slug: "summit-lodge-booking",
    title: "Summit Lodge захиалгын туршлага",
    client: "Summit Lodge",
    industry: "Зочлох үйлчилгээ",
    summary:
      "Уулын бутик зочид буудлын бүрэн захиалгат захиалгын системийн эхний үе шат — сэтгүүлийн хэв маягийн гэрэл зургийн байрлалыг үр дүнтэй захиалгын UX-тэй хослуулсан.",
    services: ["Захиалгат дизайн", "Захиалгын UX", "Frontend хөгжүүлэлт"],
    year: 2026,
    palette: { from: "#f97316", to: "#eab308" },
    metrics: [
      { label: "Шууд захиалга", value: "+52%" },
      { label: "OTA-аас хамаарал", value: "−28%" },
      { label: "Нэг хандалтад үзсэн хуудас", value: "5.2 хуудас" },
    ],
  },
  {
    id: "pf-06",
    slug: "ember-bistro-two-locations",
    title: "Ember Bistro, хоёр салбар",
    client: "Ember Hospitality Group",
    industry: "Ресторан",
    summary:
      "Нэг брэнд, хоёр танхим: ганц ч мөр контент давхардуулалгүйгээр хоёр салбарт үйлчлэх хамтарсан цэсний систем болон ширээ захиалгын урсгал.",
    services: ["Загварын тохируулга", "Цэсний систем", "Орон нутгийн SEO"],
    year: 2025,
    palette: { from: "#f97316", to: "#ef4444" },
    metrics: [
      { label: "Ширээ захиалга", value: "+89%" },
      { label: "Цэсний шинэчлэлт", value: "Өөрөө хийх" },
      { label: "Бүтээх хугацаа", value: "3 долоо хоног" },
    ],
  },
];

export function getPortfolioItemBySlug(slug: string): PortfolioItem | undefined {
  return portfolioItems.find((p) => p.slug === slug);
}
