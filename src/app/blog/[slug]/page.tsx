import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BLOG_POSTS } from "@/lib/blog-posts";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | LienFile.io`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: ["LienFile Team"],
    },
  };
}

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderMarkdownContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(" ").trim();
      if (text) {
        elements.push(
          <p key={`p-${elements.length}`} className="text-slate-600 leading-7">
            {text}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="space-y-1 text-slate-600 leading-7 list-disc pl-6"
        >
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  const flushNumberedList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="space-y-1 text-slate-600 leading-7 list-decimal pl-6"
        >
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
      listItems = [];
      inList = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="text-xl font-bold text-[#1a2744] mt-8 mb-3"
        >
          {trimmed.slice(3)}
        </h2>
      );
    } else if (trimmed.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="text-lg font-semibold text-[#1a2744] mt-6 mb-2"
        >
          {trimmed.slice(4)}
        </h3>
      );
    } else if (trimmed.startsWith("- ")) {
      flushParagraph();
      if (!inList) {
        inList = true;
      }
      listItems.push(trimmed.slice(2));
    } else if (/^\d+\.\s/.test(trimmed)) {
      flushParagraph();
      if (!inList) {
        inList = true;
      }
      listItems.push(trimmed.replace(/^\d+\.\s/, ""));
    } else if (trimmed === "") {
      flushParagraph();
      if (inList) {
        if (listItems.some((item) => /^\d/.test(item))) {
          flushNumberedList();
        } else {
          flushList();
        }
      }
    } else {
      if (inList) {
        flushList();
      }
      currentParagraph.push(trimmed);
    }
  }

  flushParagraph();
  flushList();

  return elements;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const readingTime = estimateReadingTime(post.content);
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "LienFile Team",
    },
    publisher: {
      "@type": "Organization",
      name: "LienFile.io",
      url: "https://www.lienfile.io",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.lienfile.io/blog/${post.slug}`,
    },
  };

  return (
    <div className="flex flex-col min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-slate-400">
            <Link href="/" className="hover:text-[#1a2744]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/blog" className="hover:text-[#1a2744]">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-600">{post.title}</span>
          </nav>

          {/* Header */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#1a2744] sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-3 text-sm text-slate-500">
              <span>{"LienFile Team"}</span>
              <span>&middot;</span>
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>&middot;</span>
              <span>{readingTime} min read</span>
            </div>
          </header>

          <Separator className="mb-8" />

          {/* Content */}
          <div className="space-y-4">{renderMarkdownContent(post.content)}</div>

          {/* CTA Banner */}
          <div className="mt-12 rounded-lg bg-[#1a2744] p-8 text-center text-white">
            <h2 className="text-2xl font-bold">
              Ready to Protect Your Payment Rights?
            </h2>
            <p className="mt-2 text-slate-300">
              File a mechanic&apos;s lien online in minutes. State-specific
              documents, deadline tracking, and certified mail delivery.
            </p>
            <Button
              render={<Link href="/file" />}
              className="mt-6 bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
              size="lg"
            >
              File a Lien &mdash; $149
            </Button>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="border-t border-slate-200 bg-slate-50 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-6 text-xl font-bold text-[#1a2744]">
              Related Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((related) => (
                <Link
                  key={related.slug}
                  href={`/blog/${related.slug}`}
                  className="group rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-[#f97316] hover:shadow-md"
                >
                  <time className="text-xs text-slate-400">
                    {new Date(related.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h3 className="mt-2 font-semibold text-[#1a2744] group-hover:text-[#f97316]">
                    {related.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600 line-clamp-2">
                    {related.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
