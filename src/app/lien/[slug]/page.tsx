import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SEO_PAGES, type SeoPage } from "@/lib/seo-pages-data";
import { STATES } from "@/lib/states-data";

export async function generateStaticParams() {
  return SEO_PAGES.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = SEO_PAGES.find((p) => p.slug === slug);
  if (!page) return { title: "Page Not Found" };

  return {
    title: page.title,
    description: page.description,
    openGraph: {
      title: page.title,
      description: page.description,
    },
  };
}

function getContractorStateContent(page: SeoPage) {
  const stateData = page.state ? STATES[page.state] : null;
  if (!stateData) return null;

  const role = page.contractorType || "contractor";
  const roleLower = role.toLowerCase();

  return {
    paragraphs: [
      `As a ${roleLower} working in ${stateData.name}, understanding your mechanic's lien rights is essential to protecting your right to payment. ${stateData.name} has specific requirements for filing a mechanic's lien, including deadlines, notice obligations, and filing procedures that differ from other states.`,
      `The lien filing deadline in ${stateData.name} is ${stateData.lienDeadline}. ${stateData.preliminaryNotice.required ? `Importantly, ${stateData.name} requires a preliminary notice: ${stateData.preliminaryNotice.deadline}. This notice must be sent to ${stateData.preliminaryNotice.whoToSendTo}.` : `${stateData.name} does not require a preliminary notice for most claimants, which simplifies the process. However, sending one is still recommended as a best practice.`}`,
      `To file a mechanic's lien in ${stateData.name}, you must file at the ${stateData.whereToFile}. ${stateData.serviceRequirements}. The enforcement deadline is ${stateData.enforcementDeadline} — if you don't file a lawsuit by then, your lien expires.`,
    ],
    facts: [
      { label: "Filing Deadline", value: stateData.lienDeadline.split("(")[0].split(";")[0].trim() },
      { label: "Preliminary Notice", value: stateData.preliminaryNotice.required ? "Required" : "Not Required" },
      { label: "Where to File", value: stateData.whereToFile.split(" in ")[0] },
      { label: "Enforcement", value: stateData.enforcementDeadline.split("(")[0].split(";")[0].trim() },
      { label: "Statute", value: stateData.statute },
    ],
  };
}

function getSituationContent(page: SeoPage) {
  const slug = page.slug;

  const contentMap: Record<string, { paragraphs: string[]; facts: { label: string; value: string }[] }> = {
    "how-to-file-a-mechanics-lien": {
      paragraphs: [
        "Filing a mechanic's lien is a powerful legal tool that ensures contractors, subcontractors, and suppliers receive payment for work performed or materials provided on a construction project. The process varies by state, but the general steps are consistent across jurisdictions.",
        "Before filing, you must determine whether your state requires a preliminary notice and whether you've met the deadline. Most states require the lien to be filed within 30 to 120 days of the last day you furnished labor or materials. Missing this deadline by even one day means you lose your lien rights entirely.",
        "The filing process typically involves preparing a lien document with specific information about the property, the work performed, the amount owed, and the parties involved. This document is then recorded with the appropriate county office, and a copy must be served on the property owner.",
      ],
      facts: [
        { label: "Average Deadline", value: "60-120 days from last work" },
        { label: "Preliminary Notice", value: "Required in ~30 states" },
        { label: "Filing Fee", value: "$25-75 in most counties" },
        { label: "Service Required", value: "Yes, to property owner" },
        { label: "Attorney Required", value: "No, in most states" },
      ],
    },
    "preliminary-notice-guide": {
      paragraphs: [
        "A preliminary notice is a document that certain construction participants must send near the beginning of a project to preserve their right to file a mechanic's lien later. Approximately 30 states require some form of preliminary notice, and failing to send one can permanently destroy your lien rights.",
        "The deadline for sending a preliminary notice varies widely by state: California requires it within 20 days of first furnishing, Florida within 45 days, Arizona within 20 days, and Texas by the 15th day of the 2nd month after first furnishing. Each state has its own name, requirements, and recipients.",
        "Sending preliminary notices should be standard practice on every project, even in states that don't require them. They put the property owner on notice of your involvement, which can help resolve payment disputes before they escalate to the lien filing stage.",
      ],
      facts: [
        { label: "States Requiring", value: "~30 of 50 states" },
        { label: "Typical Deadline", value: "20-60 days from first work" },
        { label: "Recipients", value: "Owner, GC, and/or lender" },
        { label: "Delivery Method", value: "Certified mail required" },
        { label: "Cost to Send", value: "$10-20 per notice" },
      ],
    },
  };

  if (contentMap[slug]) {
    return contentMap[slug];
  }

  // Default content for situation pages not explicitly mapped
  return {
    paragraphs: [
      `${page.heading} is an important topic for construction professionals seeking to protect their payment rights. Understanding the legal requirements, deadlines, and procedures can mean the difference between getting paid and losing your right to recover what you're owed.`,
      "Mechanic's lien laws vary significantly from state to state. What works in one jurisdiction may not apply in another. That's why it's critical to understand the specific rules that apply to your project's location, your role on the project, and your contractual relationships.",
      "Whether you're a general contractor, subcontractor, material supplier, or laborer, your lien rights depend on following the correct procedures within the required timeframes. Taking proactive steps early in the project — such as sending preliminary notices and tracking deadlines — is the best way to protect your payment rights.",
    ],
    facts: [
      { label: "Varies By", value: "State and claimant role" },
      { label: "Key Deadlines", value: "Notice, filing, enforcement" },
      { label: "Filing Cost", value: "Starting at $149" },
      { label: "Processing Time", value: "Same-day generation" },
      { label: "Delivery", value: "Certified mail included" },
    ],
  };
}

export default async function SeoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = SEO_PAGES.find((p) => p.slug === slug);

  if (!page) {
    notFound();
  }

  const content =
    page.type === "contractor-state"
      ? getContractorStateContent(page)
      : getSituationContent(page);

  if (!content) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `https://www.lienfile.io/lien/${page.slug}`,
    publisher: {
      "@type": "Organization",
      name: "LienFile.io",
      url: "https://www.lienfile.io",
    },
  };

  return (
    <div className="flex flex-col min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <nav className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{page.heading}</span>
          </nav>
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {page.heading}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-300">
            {page.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {content.paragraphs.map((p, i) => (
                <p key={i} className="text-slate-600 leading-7">
                  {p}
                </p>
              ))}

              {/* State link if applicable */}
              {page.state && (
                <div className="mt-6 rounded-lg bg-slate-50 p-6">
                  <p className="text-sm text-slate-600">
                    For the full guide to mechanic&apos;s lien laws in{" "}
                    {STATES[page.state]?.name}, including all deadlines and
                    requirements:
                  </p>
                  <Button render={<Link href={`/states/${page.state}`} />} variant="outline" className="mt-3">
                    View {STATES[page.state]?.name} Lien Laws
                  </Button>
                </div>
              )}

              {/* CTA */}
              <div className="mt-8 rounded-lg bg-[#1a2744] p-8 text-white">
                <h2 className="text-xl font-bold">
                  Ready to File Your Mechanic&apos;s Lien?
                </h2>
                <p className="mt-2 text-slate-300">
                  Generate a state-specific lien document in minutes. Includes
                  certified mail delivery and deadline tracking.
                </p>
                <Button
                  render={<Link href="/file" />}
                  className="mt-4 bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
                  size="lg"
                >
                  File a Lien &mdash; $149
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Key Facts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    {content.facts.map((fact, i) => (
                      <div key={i}>
                        <dt className="font-medium text-slate-900">
                          {fact.label}
                        </dt>
                        <dd className="text-slate-600">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>

              <Card className="border-[#f97316] border-2">
                <CardContent className="py-6 text-center">
                  <p className="font-semibold text-[#1a2744]">
                    Protect Your Payment Rights
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    File a mechanic&apos;s lien online in minutes.
                  </p>
                  <Button
                    render={<Link href="/file" />}
                    className="mt-4 w-full bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
                    size="lg"
                  >
                    Get Started &mdash; $149
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Free Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button render={<Link href="/tools/deadline-calculator" />} variant="outline" className="w-full">
                    Deadline Calculator
                  </Button>
                  <Button render={<Link href="/states" />} variant="outline" className="w-full">
                    State Guides
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
