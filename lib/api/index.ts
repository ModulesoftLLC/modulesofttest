/**
 * Mock service layer.
 *
 * Every UI surface reads data through these functions instead of importing
 * from data/ directly, so swapping in a real backend later is a change to
 * this file only: replace the mock returns with fetch calls (or server
 * actions) that resolve to the same types from @/types.
 */

import { analytics } from "@/data/analytics";
import { blogPosts, getBlogPostBySlug } from "@/data/blog";
import { messageThreads } from "@/data/messages";
import { orders } from "@/data/orders";
import { getPortfolioItemBySlug, portfolioItems } from "@/data/portfolio";
import { projects } from "@/data/projects";
import { getTemplateById, getTemplateBySlug, templates } from "@/data/templates";
import { currentUser, users } from "@/data/users";
import type {
  AnalyticsSummary,
  BlogPost,
  MessageThread,
  Order,
  OrderRequestInput,
  PortfolioItem,
  Project,
  Template,
  TemplateCategory,
  User,
} from "@/types";

const SIMULATED_LATENCY_MS = 0;

function resolve<T>(value: T): Promise<T> {
  if (SIMULATED_LATENCY_MS === 0) return Promise.resolve(value);
  return new Promise((r) => setTimeout(() => r(value), SIMULATED_LATENCY_MS));
}

/* Templates */

export function listTemplates(filters?: {
  category?: TemplateCategory | "all";
  query?: string;
}): Promise<Template[]> {
  let result = templates;
  if (filters?.category && filters.category !== "all") {
    result = result.filter((t) => t.category === filters.category);
  }
  if (filters?.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.tags.some((tag) => tag.includes(q))
    );
  }
  return resolve(result);
}

export function getTemplate(slug: string): Promise<Template | undefined> {
  return resolve(getTemplateBySlug(slug));
}

export function getTemplateByIdAsync(id: string): Promise<Template | undefined> {
  return resolve(getTemplateById(id));
}

/* Projects / Orders / Users / Messages */

export function listProjects(): Promise<Project[]> {
  return resolve(projects);
}

export function listOrders(): Promise<Order[]> {
  return resolve(orders);
}

export function listUsers(): Promise<User[]> {
  return resolve(users);
}

export function getCurrentUser(): Promise<User> {
  return resolve(currentUser);
}

export function listMessageThreads(): Promise<MessageThread[]> {
  return resolve(messageThreads);
}

/* Marketing content */

export function listPortfolio(): Promise<PortfolioItem[]> {
  return resolve(portfolioItems);
}

export function getPortfolioItem(slug: string): Promise<PortfolioItem | undefined> {
  return resolve(getPortfolioItemBySlug(slug));
}

export function listBlogPosts(): Promise<BlogPost[]> {
  return resolve(blogPosts);
}

export function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  return resolve(getBlogPostBySlug(slug));
}

/* Analytics */

export function getAnalytics(): Promise<AnalyticsSummary> {
  return resolve(analytics);
}

/* Orders — write path (mock) */

export function submitOrderRequest(
  input: OrderRequestInput
): Promise<{ ok: true; orderNumber: string }> {
  // Future backend: POST /api/orders
  void input;
  return resolve({ ok: true, orderNumber: "MS-2026-1049" });
}
