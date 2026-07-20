import type { BuilderSection, SectionStyle, SectionType } from "@/types";

export const fontOptions = [
  { id: "sans", label: "Poppins / Montserrat", value: "var(--font-poppins), var(--font-montserrat), sans-serif" },
  { id: "serif", label: "Source Serif", value: "var(--font-source-serif), Georgia, serif" },
  { id: "mono", label: "Geist Mono", value: "var(--font-geist-mono), monospace" },
  { id: "system", label: "Системийн фонт", value: "system-ui, sans-serif" },
];

export const colorSwatches = [
  "#6366f1", "#8b5cf6", "#d946ef", "#ec4899", "#ef4444",
  "#f97316", "#eab308", "#22c55e", "#14b8a6", "#0ea5e9",
  "#3b82f6", "#0f0f14", "#1c1c24", "#ffffff", "#f4f4f5",
];

export const imagePresets = [
  { id: "violet", label: "Ягаан манан", value: "linear-gradient(135deg, #6366f1, #d946ef)" },
  { id: "sunset", label: "Нар жаргалт", value: "linear-gradient(135deg, #f97316, #ef4444)" },
  { id: "ocean", label: "Далай", value: "linear-gradient(135deg, #0ea5e9, #22d3ee)" },
  { id: "forest", label: "Ой мод", value: "linear-gradient(135deg, #22c55e, #14b8a6)" },
  { id: "gold", label: "Алт", value: "linear-gradient(135deg, #eab308, #f59e0b)" },
  { id: "mono", label: "Хар цагаан", value: "linear-gradient(135deg, #52525b, #27272a)" },
];

const baseStyle: SectionStyle = {
  backgroundColor: "#0f0f14",
  textColor: "#fafafa",
  accentColor: "#6366f1",
  fontFamily: "var(--font-poppins), var(--font-montserrat), sans-serif",
  paddingY: 96,
  align: "center",
  rounded: false,
};

let presetCounter = 0;
function section(
  type: SectionType,
  label: string,
  content: Partial<BuilderSection["content"]>,
  style?: Partial<SectionStyle>
): BuilderSection {
  presetCounter += 1;
  return {
    id: `sec-preset-${presetCounter}`,
    type,
    label,
    content: {
      heading: "",
      subheading: "",
      body: "",
      buttonText: "",
      image: "linear-gradient(135deg, #6366f1, #d946ef)",
      items: [],
      ...content,
    },
    style: { ...baseStyle, ...style },
  };
}

/**
 * Section presets shown in the builder's components panel.
 * Cloned (with a fresh id) whenever the user drops one on the canvas.
 */
export const sectionPresets: BuilderSection[] = [
  section("navbar", "Навигаци", {
    heading: "Танай компани",
    items: [
      { title: "Бүтээгдэхүүн", description: "" },
      { title: "Үнэ", description: "" },
      { title: "Тухай", description: "" },
      { title: "Холбоо барих", description: "" },
    ],
    buttonText: "Эхлэх",
  }, { paddingY: 20, align: "left" }),

  section("hero", "Hero хэсэг", {
    heading: "Хүмүүсийн санаанд үлдэх зүйлийг бүтээ",
    subheading: "ТАНАЙ ПЛАТФОРМ",
    body: "Танай баг үнэхээр дуртайяа ашиглах цогц ажлын орчин. Үнэгүй эхэлж, бэлэн болсон үедээ өргөжүүлээрэй.",
    buttonText: "Үнэгүй эхлэх",
  }, { paddingY: 128 }),

  section("features", "Онцлогууд", {
    heading: "Хэрэгтэй бүхэн бий, илүү юм байхгүй",
    subheading: "ОНЦЛОГУУД",
    items: [
      { title: "Аянга шиг хурдан", description: "Стекийн давхарга бүрд хурдны хувьд оновчилсон." },
      { title: "Анхнаасаа аюулгүй", description: "SSO болон аудитын логтой, SOC 2-т бэлэн." },
      { title: "Өсөлтөд зориулагдсан", description: "Анхны хэрэглэгчээс эхний сая хүртэл платформ солихгүй." },
    ],
  }),

  section("stats", "Статистик", {
    heading: "Дэлхий даяарх багуудын итгэлийг хүлээсэн",
    items: [
      { title: "12к+", description: "Идэвхтэй баг" },
      { title: "99.99%", description: "Ажиллагааны хугацаа" },
      { title: "4.9/5", description: "Дундаж үнэлгээ" },
      { title: "40+", description: "Улс орон" },
    ],
  }, { paddingY: 64 }),

  section("gallery", "Зургийн цомог", {
    heading: "Ажиллаж буйг нь хараарай",
    subheading: "ЗУРГИЙН ЦОМОГ",
    items: [
      { title: "Хяналтын самбар", description: "" },
      { title: "Тайлан", description: "" },
      { title: "Мобайл", description: "" },
    ],
  }),

  section("testimonials", "Сэтгэгдлүүд", {
    heading: "Хамгийн чухал хүмүүсийн хайрыг хүлээсэн",
    subheading: "СЭТГЭГДЛҮҮД",
    items: [
      { title: "Эхний өдрөө л дөрвөн хэрэгслийг орлож чадсан. Баг маань илүү хурдан, илүү аз жаргалтай болсон.", description: "Б. Тэмүүлэн — COO, Northwind" },
      { title: "Энэ жилийн хийсэн хамгийн зөв худалдан авалт маань, шууд хэлэхэд.", description: "С. Номин — Үүсгэн байгуулагч, Brightline" },
    ],
  }),

  section("pricing", "Үнэ", {
    heading: "Энгийн, шударга үнэ",
    subheading: "ҮНЭ",
    items: [
      { title: "Эхлэл — $0", description: "Дөнгөж эхэлж буй хувь хүмүүст" },
      { title: "Про — $29/сар", description: "Өсөж буй багуудад" },
      { title: "Байгууллага — Тохиролцоно", description: "Томоохон байгууллагуудад" },
    ],
    buttonText: "Багцуудыг харьцуулах",
  }),

  section("cta", "Уриалга (CTA)", {
    heading: "Та бэлэн үедээ л эхлээрэй",
    body: "Мянга мянган багтай нэгдэж хамтдаа бүтээцгээе. Картын мэдээлэл шаардлагагүй.",
    buttonText: "Үнэгүй эхлэх",
  }, { paddingY: 112 }),

  section("faq", "Түгээмэл асуулт", {
    heading: "Түгээмэл асуултууд",
    subheading: "АСУУЛТ ХАРИУЛТ",
    items: [
      { title: "Хүссэн үедээ цуцалж болох уу?", description: "Тийм ээ — багцууд сар бүрийн төлбөртэй, ямар ч гэрээний хугацаагүй." },
      { title: "Хөнгөлөлт байдаг уу?", description: "Жилээр төлбөл хоёр сарын төлбөр хэмнэнэ. ТББ-уудад 30% хөнгөлөлттэй." },
      { title: "Миний өгөгдөл аюулгүй юу?", description: "Бүх өгөгдөл дамжуулалт болон хадгалалтын үед шифрлэгдэнэ." },
    ],
  }, { align: "left" }),

  section("team", "Баг", {
    heading: "Бүтээгдэхүүний ард буй хүмүүс",
    subheading: "БАГ",
    items: [
      { title: "Ж. Золбоо", description: "Гүйцэтгэх захирал" },
      { title: "Д. Хулан", description: "Технологийн захирал" },
      { title: "Э. Мөнхжин", description: "Дизайны ахлах" },
    ],
  }),

  section("contact", "Холбоо барих", {
    heading: "Ярилцацгаая",
    body: "Төслийнхөө талаар бидэнд хэлээрэй — бид ажлын нэг өдрийн дотор хариулна.",
    buttonText: "Зурвас илгээх",
  }, { align: "left" }),

  section("footer", "Footer", {
    heading: "Танай компани",
    body: "© 2026 Танай компани. Бүх эрх хуулиар хамгаалагдсан.",
    items: [
      { title: "Нууцлал", description: "" },
      { title: "Үйлчилгээний нөхцөл", description: "" },
      { title: "Twitter", description: "" },
    ],
  }, { paddingY: 48, align: "left" }),
];

/** Starting document when the builder opens without a template. */
export const defaultSectionTypes: SectionType[] = [
  "navbar",
  "hero",
  "features",
  "stats",
  "testimonials",
  "cta",
  "footer",
];

export function getPresetByType(type: SectionType): BuilderSection {
  const preset = sectionPresets.find((p) => p.type === type);
  if (!preset) throw new Error(`No preset for section type: ${type}`);
  return preset;
}
