import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "File a Mechanic's Lien | Protect Your Right to Payment",
  description:
    "Didn't get paid for your construction work? File a mechanic's lien in minutes. State-specific forms, deadline tracking, and certified mail service. Starting at $49.",
  openGraph: {
    title: "File a Mechanic's Lien | Protect Your Right to Payment",
    description:
      "Didn't get paid for your construction work? File a mechanic's lien in minutes. State-specific forms, deadline tracking, and certified mail service.",
    type: "website",
    url: "https://lienfile.io",
  },
};

const faqData = [
  {
    question: "What is a mechanic's lien?",
    answer:
      "A mechanic's lien is a legal claim against a property that secures payment for contractors, subcontractors, and suppliers who provided labor or materials for construction work. It gives you a security interest in the property itself, meaning the owner can't sell or refinance until you're paid.",
  },
  {
    question: "How long do I have to file a mechanic's lien?",
    answer:
      "Deadlines vary by state and range from 30 days to 12 months after your last day of work. Missing your deadline means losing your lien rights permanently. We track your state's specific deadline and send you reminders so you never miss it.",
  },
  {
    question: "Do I need a lawyer to file a mechanic's lien?",
    answer:
      "No. In most states, you can file a mechanic's lien yourself without an attorney. Our platform generates the correct state-specific forms, walks you through the process, and handles filing and service requirements. However, if your case involves complex legal issues or goes to court, consulting an attorney is recommended.",
  },
  {
    question: "How much does it cost to file a mechanic's lien?",
    answer:
      "Our lien document package starts at $149, which includes the state-specific lien form, instructions, and deadline tracking. County recording fees vary by location and are paid separately. Compare that to the thousands of dollars in legal fees you'd pay an attorney for the same service.",
  },
  {
    question: "Will filing a lien actually get me paid?",
    answer:
      "Mechanic's liens recover payment approximately 85% of the time without going to court. Most property owners pay once a lien is filed because it clouds their title, preventing them from selling or refinancing the property. It's the single most effective tool contractors have to secure payment.",
  },
  {
    question: "Can I file a lien as a subcontractor?",
    answer:
      "Yes. Subcontractors, material suppliers, and equipment lessors all have the right to file mechanic's liens in every state. In fact, lien rights exist specifically to protect those who may not have a direct contract with the property owner. Some states require a preliminary notice first, which we also help you prepare.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Didn&apos;t Get Paid?{" "}
              <span className="text-[#f97316]">
                File a Mechanic&apos;s Lien.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
              You did the work. You deserve to get paid. A mechanic&apos;s lien
              is the most powerful tool in construction to protect your right to
              payment &mdash; and you can file one in minutes.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button
                render={<Link href="/file" />}
                className="h-12 rounded-lg bg-[#f97316] px-8 text-base font-semibold text-white hover:bg-[#ea580c]"
              >
                Start Your Lien &mdash; $149
              </Button>
              <Link
                href="/pricing"
                className="text-sm font-medium text-slate-300 underline underline-offset-4 hover:text-white"
              >
                See Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <p className="text-4xl font-bold text-[#1a2744] sm:text-5xl">
                $150B+
              </p>
              <p className="mt-2 text-sm text-slate-600">
                In construction payment disputes annually
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#1a2744] sm:text-5xl">
                75%
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Of contractors report payment issues
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-[#1a2744] sm:text-5xl">
                85%
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Of liens recover payment without court
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1a2744] sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Four steps between you and getting paid. Most users finish in
              under 15 minutes.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Enter Project Details",
                description:
                  "Property address, work dates, amount owed. We ask only what your state requires.",
              },
              {
                step: "2",
                title: "AI Generates Your Lien",
                description:
                  "Our system produces the correct state-specific lien document, formatted for your county.",
              },
              {
                step: "3",
                title: "Download or We File",
                description:
                  "Download your documents instantly, or let us handle recording and certified mail service.",
              },
              {
                step: "4",
                title: "Get Paid",
                description:
                  "Most property owners resolve payment within 30 days of a lien being filed on their property.",
              },
            ].map((item) => (
              <Card key={item.step} className="relative border-0 shadow-none">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">
                    {item.step}
                  </div>
                  <CardTitle className="mt-3 text-lg font-semibold text-[#1a2744]">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-[#f97316]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                ),
                title: "State-Specific Forms",
                description:
                  "Every lien is tailored to your state's exact statutory requirements.",
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-[#f97316]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                ),
                title: "Deadline Tracking",
                description:
                  "We calculate your filing deadline and send reminders before time runs out.",
              },
              {
                icon: (
                  <svg
                    className="h-8 w-8 text-[#f97316]"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                ),
                title: "Certified Mail Service",
                description:
                  "We handle required notice mailings with proof of delivery for your records.",
              },
            ].map((badge) => (
              <div key={badge.title} className="flex items-start gap-4">
                <div className="shrink-0">{badge.icon}</div>
                <div>
                  <p className="font-semibold text-[#1a2744]">{badge.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {badge.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#1a2744] sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-600">
              No hidden fees. No subscriptions. Pay once, protect your payment.
            </p>
          </div>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                name: "Preliminary Notice",
                price: "$49",
                description: "Preserve your lien rights",
                features: [
                  "State-specific preliminary notice",
                  "Certified mail template",
                  "Deadline calculator",
                  "Step-by-step instructions",
                ],
                href: "/file?tier=notice",
                popular: false,
              },
              {
                name: "Lien Document",
                price: "$149",
                description: "File your mechanic's lien",
                features: [
                  "Everything in Preliminary Notice",
                  "State-specific lien document",
                  "County-formatted for recording",
                  "Filing instructions included",
                  "Deadline tracking & reminders",
                ],
                href: "/file?tier=lien",
                popular: true,
              },
              {
                name: "Full Protection",
                price: "$249",
                description: "Complete filing service",
                features: [
                  "Everything in Lien Document",
                  "We file with the county",
                  "Certified mail service included",
                  "Proof of service documents",
                  "Priority support",
                ],
                href: "/file?tier=full",
                popular: false,
              },
            ].map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.popular
                    ? "ring-2 ring-[#f97316] shadow-lg"
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#f97316] text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-lg text-[#1a2744]">
                    {tier.name}
                  </CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <p className="mt-4 text-4xl font-bold text-[#1a2744]">
                    {tier.price}
                  </p>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="flex-1 space-y-3 text-sm text-slate-600">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#f97316]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">
                    <Button
                      render={<Link href={tier.href} />}
                      className={`w-full rounded-lg px-4 py-2 text-sm font-semibold ${
                        tier.popular
                          ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                          : "bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
                      }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1a2744] sm:text-4xl">
            Contractors Trust LienFile
          </h2>
          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              {
                quote:
                  "I was owed $23,000 for a kitchen remodel. Filed the lien on a Tuesday, got a check by the following Monday. Should have done it months ago.",
                name: "Mike Torrance",
                role: "Licensed Electrician, Phoenix AZ",
              },
              {
                quote:
                  "As a sub, I always felt like I had no leverage. LienFile made the process simple. The GC paid within two weeks of the lien being recorded. Worth every penny.",
                name: "Rachel Dominguez",
                role: "Plumbing Contractor, Dallas TX",
              },
              {
                quote:
                  "I've been in this business 30 years and never knew filing a lien could be this straightforward. Recovered $47K on a commercial job that the developer was dodging.",
                name: "James Whitfield",
                role: "General Contractor, Atlanta GA",
              },
            ].map((testimonial) => (
              <Card key={testimonial.name} className="flex flex-col">
                <CardContent className="flex flex-1 flex-col">
                  <div className="flex gap-1 text-[#f97316]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className="h-4 w-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-semibold text-[#1a2744]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {testimonial.role}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold text-[#1a2744] sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <div className="mt-12">
            <Accordion>
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium text-[#1a2744]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-slate-600">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1a2744]">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Don&apos;t Let Your Deadline Pass
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Every state has a strict filing deadline. Once it passes, you lose
            your lien rights permanently. Protect your payment today.
          </p>
          <div className="mt-10">
            <Button
              render={<Link href="/file" />}
              className="h-12 rounded-lg bg-[#f97316] px-8 text-base font-semibold text-white hover:bg-[#ea580c]"
            >
              File Your Lien Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
