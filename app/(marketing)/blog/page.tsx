import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/shared/container";
import {
  AmbientGlow,
  FadeIn,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import { listBlogPosts } from "@/lib/api";
import { formatDate, initials } from "@/lib/format";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Blog — MODULESOFT",
  description:
    "Notes from 1,200+ launches — design, strategy, and engineering lessons on building websites that actually perform.",
};

function PostCover({
  post,
  className,
}: {
  post: BlogPost;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: `linear-gradient(135deg, ${post.palette.from}, ${post.palette.to})`,
      }}
      aria-hidden
    >
      <div className="h-full w-full bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.28),transparent_55%),linear-gradient(to_top,rgba(0,0,0,0.35),transparent_60%)]" />
    </div>
  );
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs font-semibold text-white">
        {initials(post.author)}
      </span>
      <div className="min-w-0 text-xs text-muted-foreground">
        <p className="truncate font-medium text-foreground">{post.author}</p>
        <p className="mt-0.5 flex items-center gap-2">
          {formatDate(post.publishedAt)}
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {post.readingTime} min read
          </span>
        </p>
      </div>
    </div>
  );
}

export default async function BlogPage() {
  const posts = await listBlogPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-16">
        <AmbientGlow />
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <FadeIn>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                Blog
              </p>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-gradient mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
                Notes from the studio
              </h1>
            </FadeIn>
            <FadeIn delay={0.16}>
              <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
                What 1,200+ launches taught us about design, conversion, and
                the web — written down so you don’t pay the tuition twice.
              </p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {/* Featured post */}
          {featured && (
            <FadeIn>
              <Link
                href={`/blog/${featured.slug}`}
                className="card-hover group mb-6 grid overflow-hidden rounded-xl border border-border bg-card lg:grid-cols-2"
              >
                <PostCover
                  post={featured}
                  className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-full"
                />
                <div className="flex flex-col p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <Badge className="border-0 bg-indigo-500/15 text-indigo-300">
                      {featured.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      Latest post
                    </span>
                  </div>
                  <h2 className="mt-4 text-balance text-2xl font-semibold tracking-tight group-hover:text-indigo-300 sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 flex-1 text-pretty leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <PostMeta post={featured} />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-indigo-400">
                      Read post <ArrowUpRight className="size-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          )}

          {/* Rest of the posts */}
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <StaggerItem key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card-hover group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card"
                >
                  <PostCover
                    post={post}
                    className="relative aspect-[16/9] overflow-hidden"
                  />
                  <div className="flex flex-1 flex-col p-6">
                    <Badge className="w-fit border-0 bg-indigo-500/15 text-indigo-300">
                      {post.category}
                    </Badge>
                    <h2 className="mt-3 text-balance text-lg font-semibold group-hover:text-indigo-300">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 border-t border-border pt-5">
                      <PostMeta post={post} />
                    </div>
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
