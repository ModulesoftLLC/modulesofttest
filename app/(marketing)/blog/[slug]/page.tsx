import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { blogPosts } from "@/data/blog";
import { getBlogPost } from "@/lib/api";
import { formatDate, initials } from "@/lib/format";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Нийтлэл — MODULESOFT Блог" };
  return {
    title: `${post.title} — MODULESOFT Блог`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.split("\n\n");
  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="pt-28 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <Link
                href="/blog"
                className="liquid-glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/80 transition-transform hover:scale-105"
              >
                <ArrowLeft className="relative z-10 size-4" />
                <span className="relative z-10">Бүх нийтлэл</span>
              </Link>
            </FadeIn>

            <FadeIn delay={0.08}>
              <span className="mt-8 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                {post.category}
              </span>
              <h1 className="mt-4 text-balance text-3xl font-medium tracking-[-0.05em] text-white sm:text-5xl">
                {post.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-white/10 text-sm font-medium text-white">
                  {initials(post.author)}
                </span>
                <div className="text-sm">
                  <p className="font-medium text-white">{post.author}</p>
                  <p className="text-white/50">{post.authorRole}</p>
                </div>
                <span
                  aria-hidden
                  className="hidden h-8 w-px bg-white/20 sm:block"
                />
                <div className="text-sm text-white/50">
                  <p>{formatDate(post.publishedAt)}</p>
                  <p className="mt-0.5 flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {post.readingTime} мин унших
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Gradient banner */}
            <FadeIn delay={0.2}>
              <div
                aria-hidden
                className="relative mt-10 h-56 overflow-hidden rounded-[2.5rem] sm:h-72"
                style={{
                  background: `linear-gradient(135deg, ${post.palette.from}, ${post.palette.to})`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.3),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.4),transparent_65%)]" />
                <div className="absolute inset-x-10 bottom-0 h-1/2 rounded-t-xl bg-black/25 p-5 backdrop-blur-sm">
                  <div className="h-2.5 w-1/3 rounded-full bg-white/80" />
                  <div className="mt-2.5 h-1.5 w-2/3 rounded-full bg-white/40" />
                  <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/40" />
                </div>
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn delay={0.26}>
              <div className="liquid-glass mt-12 rounded-[2.5rem] p-8 sm:p-12">
                <div className="relative z-10 space-y-6">
                  {paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-pretty text-lg leading-relaxed text-white/80"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </article>

      {/* More from the blog */}
      <section className="pb-24">
        <Container>
          <FadeIn className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-medium tracking-tight text-white">
              Блогоос <em className="text-white/80">өөр</em> нийтлэлүүд
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-sm font-medium text-white underline-offset-4 hover:underline"
            >
              Бүх нийтлэл <ArrowUpRight className="size-4" />
            </Link>
          </FadeIn>
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {morePosts.map((other) => (
              <StaggerItem key={other.id}>
                <Link
                  href={`/blog/${other.slug}`}
                  className="liquid-glass group flex h-full flex-col overflow-hidden rounded-3xl transition-transform hover:scale-105"
                >
                  <div
                    aria-hidden
                    className="relative aspect-[16/6] overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${other.palette.from}, ${other.palette.to})`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.28),transparent_55%)]" />
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                      {other.category}
                    </span>
                    <h3 className="mt-3 text-lg font-medium text-white">
                      {other.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                      {other.excerpt}
                    </p>
                    <p className="mt-5 text-xs text-white/50">
                      {other.author} · {formatDate(other.publishedAt)} ·{" "}
                      {other.readingTime} мин унших
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </Container>
      </section>
    </>
  );
}
