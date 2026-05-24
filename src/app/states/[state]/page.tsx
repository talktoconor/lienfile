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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { STATES } from "@/lib/states-data";

export async function generateStaticParams() {
  return Object.keys(STATES).map((key) => ({
    state: key,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state } = await params;
  const stateData = STATES[state];
  if (!stateData) return { title: "State Not Found" };

  return {
    title: `${stateData.name} Mechanic's Lien Laws & Deadlines | LienFile.io`,
    description: `${stateData.name} mechanic's lien guide: filing deadline is ${stateData.lienDeadline}. Learn preliminary notice requirements, where to file, and enforcement deadlines.`,
    openGraph: {
      title: `${stateData.name} Mechanic's Lien Laws & Deadlines | LienFile.io`,
      description: `Complete guide to mechanic's lien laws in ${stateData.name}. Deadlines, notice requirements, and filing procedures.`,
    },
  };
}

export default async function StatePage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state } = await params;
  const stateData = STATES[state];

  if (!stateData) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.lienfile.io",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "State Guides",
        item: "https://www.lienfile.io/states",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: stateData.name,
        item: `https://www.lienfile.io/states/${stateData.slug}`,
      },
    ],
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
          {/* Breadcrumb */}
          <nav className="mb-6 text-sm text-slate-400">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/states" className="hover:text-white">
              State Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{stateData.name}</span>
          </nav>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {stateData.name}{" "}Mechanic&apos;s Lien Laws
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            Everything you need to know about filing a mechanic&apos;s lien in{" "}
            {stateData.name}. Deadlines, notice requirements, and filing
            procedures.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Badge className="bg-white/10 text-white border-white/20 text-sm px-3 py-1 h-auto">
              Filing Deadline: {stateData.lienDeadline.split("(")[0].split(";")[0].trim()}
            </Badge>
            {stateData.preliminaryNotice.required && (
              <Badge className="bg-orange-500/20 text-orange-200 border-orange-400/30 text-sm px-3 py-1 h-auto">
                Preliminary Notice Required
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main Content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Preliminary Notice */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Preliminary Notice Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {stateData.preliminaryNotice.required ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                          Required
                        </Badge>
                      </div>
                      <p className="text-slate-600">
                        <span className="font-medium">Deadline:</span>{" "}
                        {stateData.preliminaryNotice.deadline}
                      </p>
                      <p className="text-slate-600">
                        <span className="font-medium">Send to:</span>{" "}
                        {stateData.preliminaryNotice.whoToSendTo}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        Not Required
                      </Badge>
                      <p className="text-slate-600">
                        {stateData.name} does not require a preliminary notice
                        for most claimants. However, sending one is still
                        recommended as a best practice.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Lien Filing Deadline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Lien Filing Deadline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{stateData.lienDeadline}</p>
                </CardContent>
              </Card>

              {/* Who Can File */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Who Can File a Lien
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {stateData.whoCanFile.map((role) => (
                      <li key={role} className="flex items-center gap-2 text-slate-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                        {role}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Where to File */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Where to File
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{stateData.whereToFile}</p>
                </CardContent>
              </Card>

              {/* Service Requirements */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Service Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    {stateData.serviceRequirements}
                  </p>
                </CardContent>
              </Card>

              {/* Enforcement Deadline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Enforcement Deadline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">
                    {stateData.enforcementDeadline}
                  </p>
                </CardContent>
              </Card>

              {/* Lien Amount Limits */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Lien Amount Limits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{stateData.lienAmountLimits}</p>
                </CardContent>
              </Card>

              {/* State Statute */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    State Statute Reference
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-mono text-sm text-slate-600">
                    {stateData.statute}
                  </p>
                </CardContent>
              </Card>

              {/* FAQ */}
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-bold text-[#1a2744]">
                  Frequently Asked Questions
                </h2>
                <Accordion>
                  {[
                    {
                      q: `Do I need to send a preliminary notice in ${stateData.name}?`,
                      a: stateData.preliminaryNotice.required
                        ? `Yes. ${stateData.preliminaryNotice.deadline}. This notice must be sent to: ${stateData.preliminaryNotice.whoToSendTo}.`
                        : `${stateData.name} does not require a preliminary notice for most claimants. However, sending a notice of your involvement on the project is always recommended as a best practice to protect your lien rights.`,
                    },
                    {
                      q: `How long do I have to file a mechanic's lien in ${stateData.name}?`,
                      a: `The lien filing deadline in ${stateData.name} is ${stateData.lienDeadline}. Missing this deadline by even one day means you lose your lien rights entirely.`,
                    },
                    {
                      q: `Where do I file a mechanic's lien in ${stateData.name}?`,
                      a: `In ${stateData.name}, you file your mechanic's lien at the ${stateData.whereToFile}. ${stateData.serviceRequirements}.`,
                    },
                    {
                      q: `How long do I have to enforce a lien in ${stateData.name}?`,
                      a: `The enforcement deadline in ${stateData.name} is ${stateData.enforcementDeadline}. If you don't file a lawsuit to enforce your lien within this period, the lien expires.`,
                    },
                  ].map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-[#1a2744]">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-slate-600">{faq.a}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="border-[#f97316] border-2">
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    File a Lien in {stateData.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Protect your right to payment. Generate a state-specific
                    mechanic&apos;s lien document for {stateData.name} in
                    minutes.
                  </p>
                  <Button
                    render={<Link href="/file" />}
                    className="w-full bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
                    size="lg"
                  >
                    File a Lien in {stateData.name} &mdash; $149
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Free Deadline Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-slate-600">
                    Calculate your exact lien filing deadline based on your last
                    day of work in {stateData.name}.
                  </p>
                  <Button render={<Link href="/tools/deadline-calculator" />} variant="outline" className="w-full">
                    Calculate Deadlines
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#1a2744]">
                    Key Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <dl className="space-y-3 text-sm">
                    {stateData.preliminaryNotice.required && (
                      <div>
                        <dt className="font-medium text-slate-900">
                          Preliminary Notice
                        </dt>
                        <dd className="text-slate-600">
                          {stateData.preliminaryNotice.deadline.split("(")[0].trim()}
                        </dd>
                      </div>
                    )}
                    <div>
                      <dt className="font-medium text-slate-900">
                        Lien Filing
                      </dt>
                      <dd className="text-slate-600">
                        {stateData.lienDeadline.split("(")[0].split(";")[0].trim()}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-slate-900">
                        Enforcement
                      </dt>
                      <dd className="text-slate-600">
                        {stateData.enforcementDeadline.split("(")[0].split(";")[0].trim()}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
