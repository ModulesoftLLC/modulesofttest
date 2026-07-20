/**
 * MODULESOFT domain models.
 *
 * These types are the single contract shared by the mock data layer (data/),
 * the UI, and the future backend. When the API lands, lib/api/* swaps its
 * mock implementations for fetch calls returning these same shapes.
 */

/* ---------------------------------- Templates --------------------------------- */

export type TemplateCategory =
  | "business"
  | "restaurant"
  | "hotel"
  | "school"
  | "medical"
  | "ecommerce"
  | "portfolio"
  | "ai-startup"
  | "landing-page";

export interface Template {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: TemplateCategory;
  tags: string[];
  /** Price in USD. 0 means free. */
  price: number;
  isFeatured: boolean;
  isNew: boolean;
  rating: number;
  reviewCount: number;
  sales: number;
  pages: string[];
  features: string[];
  /** Accent colors used to render the generated thumbnail preview. */
  palette: {
    from: string;
    to: string;
    surface: string;
  };
  /** Cover photo URL (Unsplash). */
  image: string;
  /** Additional photos used by the dynamic live preview. */
  gallery: string[];
  author: string;
  updatedAt: string;
}

/* ----------------------------------- Builder ---------------------------------- */

export type SectionType =
  | "navbar"
  | "hero"
  | "features"
  | "stats"
  | "gallery"
  | "testimonials"
  | "pricing"
  | "cta"
  | "faq"
  | "team"
  | "contact"
  | "footer";

export interface SectionStyle {
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  fontFamily: string;
  paddingY: number;
  align: "left" | "center";
  rounded: boolean;
}

export interface BuilderSection {
  id: string;
  type: SectionType;
  label: string;
  content: {
    heading: string;
    subheading: string;
    body: string;
    buttonText: string;
    /**
     * Image slot: either a CSS background value (gradient preset), an http(s)
     * URL, or a data: URL from a user upload. Renderers must handle all three.
     */
    image: string;
    items: { title: string; description: string }[];
  };
  style: SectionStyle;
}

export interface BuilderDocument {
  id: string;
  name: string;
  templateId: string | null;
  sections: BuilderSection[];
  updatedAt: string;
}

export type Viewport = "desktop" | "tablet" | "mobile";

/* ---------------------------------- Projects ---------------------------------- */

export type ProjectStatus =
  | "draft"
  | "in-progress"
  | "in-review"
  | "completed"
  | "on-hold";

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  progress: number;
  templateId: string | null;
  domain: string | null;
  thumbnailPalette: { from: string; to: string };
  createdAt: string;
  dueDate: string;
  team: string[];
}

/* ----------------------------------- Orders ----------------------------------- */

export type WebsiteType =
  | "business"
  | "ecommerce"
  | "portfolio"
  | "restaurant"
  | "saas"
  | "custom";

export type BudgetRange =
  | "under-1k"
  | "1k-5k"
  | "5k-10k"
  | "10k-25k"
  | "25k-plus";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in-production"
  | "delivered"
  | "cancelled";

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    company: string;
  };
  websiteType: WebsiteType;
  budget: BudgetRange;
  templateId: string | null;
  status: OrderStatus;
  total: number;
  createdAt: string;
  notes: string;
}

export interface OrderRequestInput {
  websiteType: WebsiteType | null;
  budget: BudgetRange | null;
  templateId: string | null;
  projectName: string;
  description: string;
  pagesNeeded: string[];
  timeline: string;
  contact: {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
}

/* ------------------------------------ Users ----------------------------------- */

export type UserRole = "admin" | "customer" | "designer";
export type UserStatus = "active" | "invited" | "suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: "free" | "pro" | "studio";
  projects: number;
  totalSpent: number;
  joinedAt: string;
  lastActive: string;
}

/* ---------------------------------- Messages ---------------------------------- */

export interface Message {
  id: string;
  threadId: string;
  from: string;
  fromRole: UserRole;
  preview: string;
  body: string;
  sentAt: string;
  unread: boolean;
}

export interface MessageThread {
  id: string;
  subject: string;
  participant: string;
  projectId: string | null;
  lastMessageAt: string;
  unreadCount: number;
  messages: Message[];
}

/* --------------------------------- Marketing ----------------------------------- */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  deliverables: string[];
  startingPrice: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted: boolean;
  cta: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  summary: string;
  services: string[];
  year: number;
  palette: { from: string; to: string };
  metrics: { label: string; value: string }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  category: string;
  readingTime: number;
  publishedAt: string;
  palette: { from: string; to: string };
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
}

/* ---------------------------------- Analytics ---------------------------------- */

export interface RevenuePoint {
  month: string;
  revenue: number;
  orders: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  revenueGrowth: number;
  totalOrders: number;
  ordersGrowth: number;
  activeUsers: number;
  usersGrowth: number;
  conversionRate: number;
  conversionGrowth: number;
  revenueByMonth: RevenuePoint[];
  topTemplates: { templateId: string; sales: number; revenue: number }[];
  trafficSources: { source: string; share: number }[];
}
