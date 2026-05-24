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
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Pricing | LienFile.io",
  description:
    "Simple, transparent pricing for mechanic's lien filings. Starting at $49 for preliminary notices, $149 for lien documents, $249 for full-service filing.",
  openGraph: {
    title: "Pricing | LienFile.io",
    description:
      "Simple, transparent pricing for mechanic's lien filings. No hidden fees. No subscriptions.",
  },
};

const tiers = [
  {
    name: "Preliminary Notice",
    price: "$49",
    description: "Preserve your lien rights early",
    features: [
      "State-specific preliminary notice document",
      "Certified mail template and instructions",
      "Filing deadline calculator",
      "Step-by-step mailing guide",
      "Digital copy for your records",
      "Email support",
    ],
    href: "/file?tier=notice",
    popular: false,
    cta: "Get Started",
  },
  {
    name: "Lien Document",
    price: "$149",
    description: "File your mechanic's lien",
    features: [
      "Everything in Preliminary Notice",
      "State-specific mechanic's lien document",
      "Formatted for your county recorder",
      "County-specific filing instructions",
      "Deadline tracking with email reminders",
      "Lien release template included",
      "Priority email support",
    ],
    href: "/file?tier=lien",
    popular: true,
    cta: "Get Started",
  },
  {
    name: "Full Protection",
    price: "$249",
    description: "We handle the entire process",
    features: [
      "Everything in Lien Document",
      "We record the lien with the county",
      "Certified mail service to all parties",
      "Proof of service documentation",
      "Recording confirmation copy",
      "Deadline monitoring and alerts",
      "Priority phone and email support",
    ],
    href: "/file?tier=full",
    popular: false,
    cta: "Get Started",
  },
];

const pricingFaq = [
  {
    question: "Are there any hidden fees?",
    answer:
      "No. The price you see is the price you pay for our service. The only additional cost is the county recording fee if you file the lien yourself (Preliminary Notice and Lien Document tiers). County fees vary by location, typically ranging from $10 to $50. The Full Protection tier includes recording fees.",
  },
  {
    question: "Do I need a subscription?",
    answer:
      "No. LienFile.io is a one-time payment per project. There are no subscriptions, monthly fees, or recurring charges. You pay once and get your documents.",
  },
  {
    question: "What if I need documents for multiple projects?",
    answer:
      "Each project requires a separate filing. You can purchase documents for as many projects as you need. If you have five or more projects, contact us about volume pricing.",
  },
  {
    question: "Can I upgrade from one tier to another?",
    answer:
      "Yes. If you start with the Preliminary Notice or Lien Document tier and decide you want the full filing service, you can upgrade and only pay the difference.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all tiers, provided you have not yet filed the documents with any government office or served them on any party. If the documents have been filed or served, we cannot issue a refund.",
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
              No hidden fees. No subscriptions. Pay once, protect your payment.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison line */}
      <section className="border-b bg-slate-50">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <p className="text-lg text-slate-600">
            Your average unpaid invoice:{" "}
            <span className="font-bold text-[#1a2744]">$15,000+</span>. Your
            lien filing:{" "}
            <span className="font-bold text-[#f97316]">$149</span>.{" "}
            <span className="font-semibold text-[#1a2744]">
              Protect your money.
            </span>
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative flex flex-col ${
                  tier.popular
                    ? "ring-2 ring-[#f97316] shadow-lg lg:scale-105"
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
                  <CardTitle className="text-xl text-[#1a2744]">
                    {tier.name}
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    {tier.description}
                  </CardDescription>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-[#1a2744]">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-sm text-slate-500">
                      one-time
                    </span>
                  </div>
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
                  <div className="mt-8">
                    <Button
                      render={<Link href={tier.href} />}
                      className={`h-11 w-full rounded-lg px-4 text-sm font-semibold ${
                        tier.popular
                          ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                          : "bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
                      }`}
                    >
                      {tier.cta}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Money-back guarantee */}
          <div className="mt-14 text-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-green-200 bg-green-50 px-6 py-3">
              <svg
                className="h-6 w-6 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span className="text-sm font-medium text-green-800">
                30-Day Money-Back Guarantee &mdash; No questions asked
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-[#1a2744] sm:text-3xl">
            Pricing Questions
          </h2>
          <div className="mt-12">
            <Accordion>
              {pricingFaq.map((item, index) => (
                <AccordionItem key={index} value={`pricing-faq-${index}`}>
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

      {/* CTA */}
      <section className="bg-[#1a2744]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Don&apos;t Let Your Deadline Pass
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Every day you wait is a day closer to losing your lien rights. Start
            your filing today.
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
