import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";

interface LandingPageData {
  heroHeadline: string;
  heroSubtext: string;
  benefits: { title: string; description: string }[];
  urgency: string;
  testimonial: { quote: string; name: string; role: string };
  ctaText: string;
}

const LANDING_PAGES: Record<string, LandingPageData> = {
  contractor: {
    heroHeadline: "Contractors: Stop Losing Money on Unpaid Work",
    heroSubtext:
      "You did the work. You deserve to be paid. File a mechanic's lien in minutes and put real legal pressure on property owners who won't pay.",
    benefits: [
      {
        title: "State-Specific Documents",
        description:
          "Every lien document is tailored to your state's exact legal requirements. No generic templates that get rejected at the county recorder.",
      },
      {
        title: "Same-Day Filing",
        description:
          "Generate your mechanic's lien document in minutes, not weeks. We handle the certified mail delivery to the property owner for you.",
      },
      {
        title: "Deadline Protection",
        description:
          "Get automated reminders before your filing and enforcement deadlines expire. Never lose your lien rights due to a missed deadline.",
      },
    ],
    urgency:
      "Your lien filing deadline is approaching. Every day you wait is a day closer to losing your right to file. Don't let your deadline expire.",
    testimonial: {
      quote:
        "I was owed $47,000 for a kitchen remodel and the homeowner kept dodging my calls. Within 3 days of filing through LienFile, I had a check in hand.",
      name: "Mike R.",
      role: "General Contractor, Phoenix AZ",
    },
    ctaText: "File My Lien Now",
  },
  subcontractor: {
    heroHeadline: "Subcontractors: Protect Yourself When the GC Won't Pay",
    heroSubtext:
      "When the general contractor won't pay, a mechanic's lien is your most powerful leverage. File directly against the property — no attorney needed.",
    benefits: [
      {
        title: "Direct Property Claim",
        description:
          "Your lien attaches to the property itself, not the GC. Even if the general contractor goes bankrupt, your claim against the property remains.",
      },
      {
        title: "Preliminary Notices Included",
        description:
          "We handle any required preliminary notices for your state. Don't risk losing your lien rights because you missed a notice deadline.",
      },
      {
        title: "Certified Mail Delivery",
        description:
          "We send your lien document to the property owner via certified mail with tracking. Full proof of delivery for your records.",
      },
    ],
    urgency:
      "Subcontractor lien deadlines are shorter than GC deadlines in many states. Check your state's deadline immediately — once it passes, your rights are gone forever.",
    testimonial: {
      quote:
        "The GC told me to 'get in line' when I asked about my $23,000 payment. After I filed the lien, the owner called the GC and I was paid within two weeks.",
      name: "Sarah L.",
      role: "Electrical Subcontractor, Dallas TX",
    },
    ctaText: "Protect My Payment Rights",
  },
  unpaid: {
    heroHeadline: "Haven't Been Paid? Here's How to Get Your Money",
    heroSubtext:
      "A mechanic's lien is the single most effective tool for getting paid on construction projects. The property owner can't sell or refinance until they deal with your claim.",
    benefits: [
      {
        title: "Immediate Legal Pressure",
        description:
          "A recorded lien shows up on title searches. The property owner can't sell, refinance, or get a new loan until your lien is resolved.",
      },
      {
        title: "No Attorney Required",
        description:
          "You don't need a lawyer to file a mechanic's lien. Our platform generates everything you need with the correct legal language for your state.",
      },
      {
        title: "Affordable Protection",
        description:
          "At $149, filing a lien costs a fraction of what you'd pay an attorney. And it's far more effective than sending another unpaid invoice.",
      },
    ],
    urgency:
      "The longer you wait, the closer you get to losing your lien rights forever. In some states, you have as little as 30 days from your last day of work to file.",
    testimonial: {
      quote:
        "After 4 months of unpaid invoices and ignored emails, I filed a mechanic's lien. The owner paid in full within 10 days. I wish I had filed sooner.",
      name: "James T.",
      role: "Plumbing Contractor, Orlando FL",
    },
    ctaText: "File a Lien & Get Paid",
  },
  deadline: {
    heroHeadline: "Your Lien Deadline Is Approaching — Act Now",
    heroSubtext:
      "Mechanic's lien deadlines are strict. Miss yours by even one day and you permanently lose your right to file. Don't let that happen.",
    benefits: [
      {
        title: "Generate Documents in Minutes",
        description:
          "Our AI generates your state-specific lien document instantly. No waiting for an attorney to draft paperwork while your deadline ticks away.",
      },
      {
        title: "Same-Day Processing",
        description:
          "We process your filing the same day you submit. Your lien document is ready for recording immediately, complete with a county cover sheet.",
      },
      {
        title: "Deadline Tracking",
        description:
          "After filing, we track your enforcement deadline and send reminders. Your lien isn't useful if you don't enforce it in time.",
      },
    ],
    urgency:
      "Once your lien filing deadline passes, it's gone forever. There are no extensions, no exceptions, and no second chances. File today while you still can.",
    testimonial: {
      quote:
        "I had 5 days left on my lien deadline when I found LienFile. They got my document ready in 20 minutes and I filed it the next morning. That lien saved my business.",
      name: "David K.",
      role: "Framing Contractor, Denver CO",
    },
    ctaText: "Beat My Deadline — File Now",
  },
  supplier: {
    heroHeadline: "Material Suppliers: Secure Payment for Every Delivery",
    heroSubtext:
      "You supplied the materials. They built with them. Now you deserve to get paid. A mechanic's lien gives you a direct claim against the property.",
    benefits: [
      {
        title: "Protect Every Invoice",
        description:
          "From lumber to fixtures to equipment rentals, your materials have lien rights. Don't write off unpaid deliveries as bad debt.",
      },
      {
        title: "Notice Compliance",
        description:
          "Many states require suppliers to send preliminary notices. We generate the correct notice for your state and track the deadline for you.",
      },
      {
        title: "Batch Filing Support",
        description:
          "Dealing with multiple unpaid projects? Our platform handles multiple lien filings efficiently so you can protect all your outstanding receivables.",
      },
    ],
    urgency:
      "Supplier lien deadlines are often shorter and notice requirements stricter. Don't assume you have plenty of time — check your deadline now.",
    testimonial: {
      quote:
        "We had $62,000 in outstanding invoices across 3 projects. After filing liens on all three, we collected every dollar within 45 days.",
      name: "Rodriguez Building Supply",
      role: "Material Supplier, Houston TX",
    },
    ctaText: "Protect My Receivables",
  },
};

const VALID_VARIANTS = Object.keys(LANDING_PAGES);

export async function generateStaticParams() {
  return VALID_VARIANTS.map((variant) => ({ variant }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}): Promise<Metadata> {
  const { variant } = await params;
  const data = LANDING_PAGES[variant];
  if (!data) return { title: "Page Not Found" };

  return {
    title: `${data.heroHeadline} | LienFile.io`,
    description: data.heroSubtext,
    robots: { index: false, follow: false },
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const data = LANDING_PAGES[variant];

  if (!data) {
    notFound();
  }

  return (
    <>
      {/* Hide nav/footer from root layout */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            header.sticky { display: none !important; }
            footer.bg-\\[\\#1a2744\\] { display: none !important; }
          `,
        }}
      />

      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path d="M12 2L3 7v5c0 5.25 3.82 10.17 9 11.38C17.18 22.17 21 17.25 21 12V7L12 2zm0 2.18l7 3.82v4c0 4.29-3.03 8.37-7 9.57C8.03 20.37 5 16.29 5 12V8l7-3.82zM10 15.5l-3.5-3.5 1.41-1.41L10 12.67l5.59-5.59L17 8.5l-7 7z" />
            </svg>
            LienFile.io
          </Link>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {data.heroHeadline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            {data.heroSubtext}
          </p>
          <Button
            render={<Link href="/file" />}
            className="mt-8 bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-lg px-8 py-3 h-auto"
          >
            {data.ctaText} &mdash; $149
          </Button>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            {data.benefits.map((benefit, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f97316]/10 text-[#f97316] font-bold text-xl">
                  {i + 1}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-[#1a2744]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgency */}
      <section className="bg-red-50 border-y border-red-100">
        <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            Time-Sensitive
          </div>
          <p className="mt-4 text-lg font-medium text-red-900">
            {data.urgency}
          </p>
        </div>
      </section>

      {/* Testimonial */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <blockquote>
            <p className="text-xl italic text-slate-700">
              &ldquo;{data.testimonial.quote}&rdquo;
            </p>
            <footer className="mt-4">
              <p className="font-semibold text-[#1a2744]">
                {data.testimonial.name}
              </p>
              <p className="text-sm text-slate-500">
                {data.testimonial.role}
              </p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#1a2744] py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Stop Waiting. Start Getting Paid.
          </h2>
          <p className="mt-4 text-slate-300">
            File your mechanic&apos;s lien online in minutes. State-specific
            documents, certified mail delivery, and deadline tracking included.
          </p>
          <Button
            render={<Link href="/file" />}
            className="mt-8 bg-[#f97316] text-white hover:bg-[#ea580c] font-bold text-lg px-8 py-3 h-auto"
          >
            {data.ctaText} &mdash; $149
          </Button>
          <p className="mt-4 text-xs text-slate-500">
            LienFile is not a law firm. Documents are generated using AI and
            state-specific legal requirements.
          </p>
        </div>
      </section>
    </>
  );
}
