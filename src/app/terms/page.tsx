import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | LienFile.io",
  description:
    "Terms and conditions governing the use of LienFile.io services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1a2744] sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Last updated: January 1, 2025
        </p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3">
              By accessing or using LienFile.io (&quot;the Service&quot;), you agree to be
              bound by these Terms of Service. If you do not agree to these
              terms, do not use the Service. We reserve the right to update these
              terms at any time, and your continued use constitutes acceptance of
              any changes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              2. Description of Service
            </h2>
            <p className="mt-3">
              LienFile.io provides document preparation tools for mechanic&apos;s
              liens, preliminary notices, and related construction payment
              documents. We are a document preparation service, not a law firm.
              We do not provide legal advice, legal representation, or attorney
              services. The information on our website and generated documents
              are for informational purposes and should not be considered legal
              advice.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              3. User Responsibilities
            </h2>
            <p className="mt-3">You are responsible for:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                Providing accurate and complete information for all documents
              </li>
              <li>
                Verifying that generated documents meet your specific legal
                requirements
              </li>
              <li>
                Meeting all applicable filing deadlines and statutory
                requirements
              </li>
              <li>
                Consulting with a licensed attorney if you have questions about
                the legal implications of filing a lien
              </li>
              <li>
                Maintaining the security of your account credentials
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              4. Fees and Payment
            </h2>
            <p className="mt-3">
              Fees for our services are displayed at the time of purchase and are
              non-refundable except as stated in our refund policy. County
              recording fees, where applicable, are separate from our service
              fees and are passed through at cost. All prices are in US dollars.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              5. Refund Policy
            </h2>
            <p className="mt-3">
              If you are unsatisfied with our document preparation service, you
              may request a refund within 30 days of purchase, provided that you
              have not yet filed the documents with any government office or
              served them on any party. Refund requests should be directed to
              support@lienfile.io.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              6. Limitation of Liability
            </h2>
            <p className="mt-3">
              To the fullest extent permitted by law, LienFile.io and its
              officers, directors, employees, and agents shall not be liable for
              any indirect, incidental, special, consequential, or punitive
              damages arising from or related to your use of the Service.
              Our total liability for any claim arising from these terms or the
              Service shall not exceed the amount you paid to us in the twelve
              months preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              7. Disclaimer of Warranties
            </h2>
            <p className="mt-3">
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without
              warranties of any kind, either express or implied. We do not
              warrant that our documents will achieve any particular legal
              outcome or that they will be accepted by any particular
              governmental authority. We do not guarantee the accuracy,
              completeness, or usefulness of any information provided through the
              Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              8. Intellectual Property
            </h2>
            <p className="mt-3">
              All content, software, and technology used to provide the Service
              are the property of LienFile.io or its licensors. You may not
              copy, modify, distribute, sell, or lease any part of our Service
              without written permission. Documents generated for you are yours
              to use for their intended legal purpose.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              9. Termination
            </h2>
            <p className="mt-3">
              We may suspend or terminate your access to the Service at any time,
              with or without cause, with or without notice. Upon termination,
              your right to use the Service ceases immediately. Provisions that
              by their nature should survive termination shall survive,
              including limitations of liability and intellectual property
              provisions.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              10. Governing Law
            </h2>
            <p className="mt-3">
              These terms shall be governed by and construed in accordance with
              the laws of the State of Delaware, without regard to its conflict
              of law provisions. Any disputes arising from these terms or the
              Service shall be resolved in the state or federal courts located in
              Delaware.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              11. Contact
            </h2>
            <p className="mt-3">
              Questions about these terms should be directed to:
            </p>
            <p className="mt-3">
              Email: legal@lienfile.io
              <br />
              LienFile.io
              <br />
              Attn: Legal
            </p>
          </section>
        </div>

        <div className="mt-12 border-t pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-[#f97316] hover:text-[#ea580c]"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
