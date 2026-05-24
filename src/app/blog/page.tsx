import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Construction Payment Resources & Blog | LienFile.io",
  description:
    "Expert guides on mechanic's liens, preliminary notices, lien waivers, and getting paid in construction. Free resources for contractors and suppliers.",
  openGraph: {
    title: "Construction Payment Resources & Blog | LienFile.io",
    description:
      "Expert guides on mechanic's liens, preliminary notices, lien waivers, and getting paid in construction.",
  },
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Construction Payment Resources
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Expert guides on mechanic&apos;s liens, preliminary notices, lien
              waivers, and protecting your right to payment in construction.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-lg border border-slate-200 p-6 transition-all hover:border-[#f97316] hover:shadow-md"
              >
                <div className="flex-1">
                  <time className="text-xs font-medium text-slate-400">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-2 text-lg font-semibold text-[#1a2744] group-hover:text-[#f97316]">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="mt-4 text-sm font-medium text-[#f97316]">
                  Read article &rarr;
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
