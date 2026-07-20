import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { Container } from "@/components/shared/container";
import { FadeIn, Stagger, StaggerItem } from "@/components/shared/motion";
import { listBlogPosts } from "@/lib/api";
import { formatDate, initials } from "@/lib/format";
import type { BlogPost } from "@/types";

export const metadata: Metadata = {
  title: "Блог — MODULESOFT",
  description:
    "1,200+ нээлтээс үлдээсэн тэмдэглэлүүд — жинхэнэ үр дүн өгдөг вэбсайт бүтээх дизайн, стратеги, инженерчлэлийн сургамжууд.",
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
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-medium text-white">
        {initials(post.author)}
      </span>
      <div className="min-w-0 text-xs text-white/50">
        <p className="truncate font-medium text-white">{post.author}</p>
        <p className="mt-0.5 flex items-center gap-2">
          {formatDate(post.publishedAt)}
          <span aria-hidden>·</span>
          <span className="flex items-center gap-1">
            <Clock className="size-3" /> {post.readingTime} мин унших
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
      <section className="pt-32 pb-12">
        <Container>
          <FadeIn>
            <div className="liquid-glass-strong mx-auto max-w-2xl rounded-[2.5rem] px-8 py-14 text-center sm:px-14">
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
                  БЛОГ
                </p>
                <h1 className="mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl">
                  Студийн <em className="text-white/80">тэмдэглэлүүд</em>
                </h1>
                <p className="mt-6 text-pretty text-lg leading-relaxed text-white/60">
                  1,200+ нээлт бидэнд дизайн, худалдан авалт, вэбийн талаар юу
                  заасныг бичиж үлдээлээ — та сургалтын төлбөрийг давхардуулж
                  төлөх хэрэггүй.
                </p>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="pb-24">
        <Container>
          {/* Featured post */}
          {featured && (
            <FadeIn>
              <Link
                href={`/blog/${featured.slug}`}
                className="liquid-glass group mb-6 grid overflow-hidden rounded-3xl transition-transform hover:scale-[1.02] lg:grid-cols-2"
              >
                <PostCover
                  post={featured}
                  className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-full"
                />
                <div className="relative z-10 flex flex-col p-8 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                      {featured.category}
                    </span>
                    <span className="text-xs text-white/50">
                      Сүүлийн нийтлэл
                    </span>
                  </div>
                  <h2 className="mt-4 text-balance text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 flex-1 text-pretty leading-relaxed text-white/60">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 flex items-center justify-between gap-4">
                    <PostMeta post={featured} />
                    <span className="flex items-center gap-1.5 text-sm font-medium text-white">
                      Унших <ArrowUpRight className="size-4" />
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
                  className="liquid-glass group flex h-full flex-col overflow-hidden rounded-3xl transition-transform hover:scale-105"
                >
                  <PostCover
                    post={post}
                    className="relative aspect-[16/9] overflow-hidden"
                  />
                  <div className="relative z-10 flex flex-1 flex-col p-6">
                    <span className="w-fit rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
                      {post.category}
                    </span>
                    <h2 className="mt-3 text-balance text-lg font-medium text-white">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/60">
                      {post.excerpt}
                    </p>
                    <div className="mt-6 pt-5">
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
