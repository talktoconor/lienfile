import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "How Mechanic's Liens Work | LienFile.io",
  description:
    "Learn the step-by-step process for filing a mechanic's lien. From preliminary notices to enforcement, understand your rights and deadlines.",
  openGraph: {
    title: "How Mechanic's Liens Work | LienFile.io",
    description:
      "Learn the step-by-step process for filing a mechanic's lien. From preliminary notices to enforcement, understand your rights and deadlines.",
  },
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              How the Mechanic&apos;s Lien Process Works
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A mechanic&apos;s lien is a legal claim against a property that
              secures payment for your work. It&apos;s the most effective
              collection tool in construction &mdash; and the process is more
              straightforward than most contractors realize.
            </p>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[#1a2744] sm:text-3xl">
            The Four Stages of Lien Protection
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Protecting your right to payment is a multi-step process. Each stage
            builds on the last. The earlier you act, the stronger your position.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "1", label: "Preliminary Notice" },
              { step: "2", label: "Lien Filing" },
              { step: "3", label: "Service Requirements" },
              { step: "4", label: "Enforcement" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">
                  {item.step}
                </div>
                <span className="font-semibold text-[#1a2744]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Step 1: Preliminary Notice */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">
                  1
                </div>
                <h2 className="text-2xl font-bold text-[#1a2744]">
                  Preliminary Notice
                </h2>
              </div>
              <p className="mt-6 text-slate-600">
                In many states, you must send a preliminary notice before you can
                file a lien. This notice informs the property owner, general
                contractor, and/or lender that you are performing work on the
                property and have the right to file a lien if you are not paid.
              </p>
              <p className="mt-4 text-slate-600">
                Even in states where it is not required, sending a preliminary
                notice is a best practice. It puts everyone on notice that you
                expect to be paid and dramatically increases your chances of
                avoiding payment disputes altogether.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-[#1a2744]">
                  Key Requirements
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
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
                    Must be sent within 20&ndash;30 days of starting work (varies by state)
                  </li>
                  <li className="flex items-start gap-2">
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
                    Usually sent via certified mail with return receipt
                  </li>
                  <li className="flex items-start gap-2">
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
                    Identifies the property, parties, and nature of work
                  </li>
                  <li className="flex items-start gap-2">
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
                    Required in approximately 35 states
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base text-[#1a2744]">
                    Preliminary Notice Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">California</span>
                      <span className="font-medium text-[#1a2744]">
                        20 days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Texas</span>
                      <span className="font-medium text-[#1a2744]">
                        15th of 2nd month
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Florida</span>
                      <span className="font-medium text-[#1a2744]">
                        45 days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Arizona</span>
                      <span className="font-medium text-[#1a2744]">
                        20 days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">New York</span>
                      <span className="font-medium text-[#1a2744]">
                        Not required
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 2: Lien Filing */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">
                  2
                </div>
                <h2 className="text-2xl font-bold text-[#1a2744]">
                  Lien Filing
                </h2>
              </div>
              <p className="mt-6 text-slate-600">
                When payment is not forthcoming, you file the mechanic&apos;s
                lien with the county recorder&apos;s office where the property is
                located. The lien becomes a public record and creates a cloud on
                the property&apos;s title, preventing the owner from selling or
                refinancing until the lien is resolved.
              </p>
              <p className="mt-4 text-slate-600">
                Your lien document must include specific information required by
                your state&apos;s statute: the property description, names of
                parties, amount claimed, dates of work, and a description of the
                labor or materials provided. Errors in these details can
                invalidate your lien.
              </p>
              <div className="mt-6">
                <h3 className="font-semibold text-[#1a2744]">
                  What Your Lien Must Include
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
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
                    Legal description of the property
                  </li>
                  <li className="flex items-start gap-2">
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
                    Name and address of property owner
                  </li>
                  <li className="flex items-start gap-2">
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
                    Total amount claimed as owed
                  </li>
                  <li className="flex items-start gap-2">
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
                    First and last dates of work or material delivery
                  </li>
                  <li className="flex items-start gap-2">
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
                    Description of labor or materials provided
                  </li>
                </ul>
              </div>
            </div>
            <div className="lg:col-span-2">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base text-[#1a2744]">
                    Lien Filing Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">California</span>
                      <span className="font-medium text-[#1a2744]">
                        90 days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Texas</span>
                      <span className="font-medium text-[#1a2744]">
                        15th of 4th month
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Florida</span>
                      <span className="font-medium text-[#1a2744]">
                        90 days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">New York</span>
                      <span className="font-medium text-[#1a2744]">
                        8 months
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Ohio</span>
                      <span className="font-medium text-[#1a2744]">
                        75 days
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                    Deadlines measured from last day of work. Requirements vary
                    for subcontractors vs. general contractors.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 3: Service Requirements */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">
                3
              </div>
              <h2 className="text-2xl font-bold text-[#1a2744]">
                Service Requirements
              </h2>
            </div>
            <p className="mt-6 text-slate-600">
              After recording your lien, most states require you to serve a copy
              on the property owner within a specific timeframe. Service
              requirements vary by state but typically must be done via certified
              mail or personal delivery.
            </p>
            <p className="mt-4 text-slate-600">
              Proper service is critical. A lien that is recorded but not
              properly served can be challenged and potentially invalidated. Keep
              proof of service &mdash; certified mail receipts, return receipts,
              or affidavits of service &mdash; for your records.
            </p>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base text-[#1a2744]">
                    Acceptable Service Methods
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>Certified mail with return receipt</li>
                    <li>Registered mail</li>
                    <li>Personal service (hand delivery)</li>
                    <li>
                      Process server (in some states)
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="text-base text-[#1a2744]">
                    Service Deadlines
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li>
                      Typically 5&ndash;30 days after recording
                    </li>
                    <li>Some states: same day as recording</li>
                    <li>Some states: no separate service required</li>
                    <li>Check your state&apos;s specific rules</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Step 4: Enforcement */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-lg font-bold text-white">
                4
              </div>
              <h2 className="text-2xl font-bold text-[#1a2744]">
                Enforcement
              </h2>
            </div>
            <p className="mt-6 text-slate-600">
              If the property owner does not pay after the lien is filed, you
              have the right to enforce the lien through a foreclosure action in
              court. However, most cases never reach this stage. The lien itself
              is usually enough to motivate payment.
            </p>
            <p className="mt-4 text-slate-600">
              Enforcement deadlines also vary by state, typically ranging from 90
              days to 2 years from the date the lien was recorded. If you do not
              enforce within the deadline, the lien expires. Enforcement actions
              generally require an attorney.
            </p>
          </div>
        </div>
      </section>

      {/* Deadline Warning Callout */}
      <section className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <svg
                className="mt-0.5 h-8 w-8 shrink-0 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-bold text-red-800">
                  Deadlines Are Strictly Enforced
                </h3>
                <p className="mt-2 text-sm text-red-700">
                  Missing a lien deadline by even one day means losing your
                  rights permanently. There are no extensions, no exceptions, and
                  no second chances. Every state has different deadlines, and they
                  can vary based on whether you are a general contractor,
                  subcontractor, or material supplier.
                </p>
                <p className="mt-3 text-sm font-medium text-red-800">
                  LienFile.io calculates your specific deadline based on your
                  state and project details, and sends you reminders before time
                  runs out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens After Filing */}
      <section className="border-t bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-[#1a2744] sm:text-3xl">
              What Happens After Filing
            </h2>
            <p className="mt-6 text-slate-600">
              Once a mechanic&apos;s lien is recorded against a property, the
              owner cannot sell or refinance with a clear title. This creates
              strong motivation to resolve the payment dispute quickly.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2744] text-sm font-bold text-white">
                  1
                </div>
                <div>
                  <p className="font-semibold text-[#1a2744]">
                    Owner receives notice of the lien
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    The property owner learns that their title is now
                    encumbered. Most take this seriously.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2744] text-sm font-bold text-white">
                  2
                </div>
                <div>
                  <p className="font-semibold text-[#1a2744]">
                    Payment negotiation begins
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    Most property owners or their attorneys will reach out to
                    resolve the situation. This is when you negotiate payment.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a2744] text-sm font-bold text-white">
                  3
                </div>
                <div>
                  <p className="font-semibold text-[#1a2744]">
                    Payment is made (typically within 30 days)
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    The majority of lien claims are resolved within 30 days of
                    filing. Once paid, you release the lien.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1a2744]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to Protect Your Payment?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">
            Start your lien in minutes. Our system handles the state-specific
            details so you can focus on your work.
          </p>
          <div className="mt-10">
            <Button
              render={<Link href="/file" />}
              className="h-12 rounded-lg bg-[#f97316] px-8 text-base font-semibold text-white hover:bg-[#ea580c]"
            >
              Start Your Lien &mdash; $149
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
