import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
  if (!post) return { title: "Post — MODULESOFT Blog" };
  return {
    title: `${post.title} — MODULESOFT Blog`,
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
      <article className="pt-32 pb-16">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="size-4" /> All posts
              </Link>
            </FadeIn>

            <FadeIn delay={0.08}>
              <Badge className="mt-8 border-0 bg-indigo-500/15 text-indigo-300">
                {post.category}
              </Badge>
              <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-5xl">
                {post.title}
              </h1>
            </FadeIn>

            <FadeIn delay={0.14}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-sm font-semibold text-white">
                  {initials(post.author)}
                </span>
                <div className="text-sm">
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-muted-foreground">{post.authorRole}</p>
                </div>
                <span
                  aria-hidden
                  className="hidden h-8 w-px bg-border sm:block"
                />
                <div className="text-sm text-muted-foreground">
                  <p>{formatDate(post.publishedAt)}</p>
                  <p className="mt-0.5 flex items-center gap-1.5">
                    <Clock className="size-3.5" /> {post.readingTime} min read
                  </p>
                </div>
              </div>
            </FadeIn>

            {/* Gradient banner */}
            <FadeIn delay={0.2}>
              <div
                aria-hidden
                className="relative mt-10 h-56 overflow-hidden rounded-2xl sm:h-72"
                style={{
                  background: `linear-gradient(135deg, ${post.palette.from}, ${post.palette.to})`,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.3),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.4),transparent_65%)]" />
                <div className="absolute inset-x-10 bottom-0 h-1/2 rounded-t-xl border border-white/25 bg-black/25 p-5 backdrop-blur-sm">
                  <div className="h-2.5 w-1/3 rounded-full bg-white/80" />
                  <div className="mt-2.5 h-1.5 w-2/3 rounded-full bg-white/40" />
                  <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/40" />
                </div>
              </div>
            </FadeIn>

            {/* Content */}
            <FadeIn delay={0.26}>
              <div className="mt-12 space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-pretty text-lg leading-relaxed text-foreground/85"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </article>

      {/* More from the blog */}
      <section className="border-t border-border py-16">
        <Container>
          <FadeIn className="mb-10 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">
              More from the blog
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1.5 text-sm font-medium text-indigo-400 underline-offset-4 hover:underline"
            >
              All posts <ArrowUpRight className="size-4" />
            </Link>
          </FadeIn>
          <Stagger className="grid gap-6 sm:grid-cols-2">
            {morePosts.map((other) => (
              <StaggerItem key={other.id}>
                <Link
                  href={`/blog/${other.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
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
                  <div className="flex flex-1 flex-col p-6">
                    <Badge className="w-fit border-0 bg-indigo-500/15 text-indigo-300">
                      {other.category}
                    </Badge>
                    <h3 className="mt-3 text-lg font-semibold group-hover:text-indigo-300">
                      {other.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {other.excerpt}
                    </p>
                    <p className="mt-5 text-xs text-muted-foreground">
                      {other.author} · {formatDate(other.publishedAt)} ·{" "}
                      {other.readingTime} min read
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
