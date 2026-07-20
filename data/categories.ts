import type { TemplateCategory } from "@/types";

export interface CategoryMeta {
  id: TemplateCategory;
  label: string;
  description: string;
  icon: string;
}

export const categories: CategoryMeta[] = [
  { id: "business", label: "Бизнес", description: "Корпорацийн сайт, агентлаг, зөвлөх үйлчилгээ", icon: "Briefcase" },
  { id: "restaurant", label: "Ресторан", description: "Цэс, ширээ захиалга, хоолны брэнд", icon: "UtensilsCrossed" },
  { id: "hotel", label: "Зочид буудал", description: "Зочлох үйлчилгээ, амралт, захиалгын урсгал", icon: "BedDouble" },
  { id: "school", label: "Сургууль", description: "Боловсрол, сургалт, академи", icon: "GraduationCap" },
  { id: "medical", label: "Эмнэлэг", description: "Клиник, шүдний эмнэлэг, эрүүл мэнд", icon: "Stethoscope" },
  { id: "ecommerce", label: "Онлайн дэлгүүр", description: "Цахим дэлгүүр, бүтээгдэхүүний каталог", icon: "ShoppingBag" },
  { id: "portfolio", label: "Портфолио", description: "Бүтээлч хүмүүс, студи, хувийн брэнд", icon: "Palette" },
  { id: "ai-startup", label: "AI Стартап", description: "SaaS, AI бүтээгдэхүүн, хөгжүүлэгчийн хэрэгсэл", icon: "Sparkles" },
  { id: "landing-page", label: "Лэндинг хуудас", description: "Нээлт, хүлээлгийн жагсаалт, кампанит ажил", icon: "Rocket" },
];

export function categoryLabel(id: TemplateCategory): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}
