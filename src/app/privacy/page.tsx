import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | LienFile.io",
  description:
    "Learn how LienFile.io collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-full bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1a2744] sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-slate-500">
          Last updated: January 1, 2025
        </p>

        <div className="mt-10 space-y-10 text-sm leading-relaxed text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              1. Information We Collect
            </h2>
            <p className="mt-3">
              We collect information you provide directly when using our
              services, including your name, email address, phone number, mailing
              address, and project details necessary to prepare lien documents.
              We also collect property information, amounts owed, and dates of
              work as required for your filings.
            </p>
            <p className="mt-3">
              We automatically collect certain technical information when you
              visit our website, including your IP address, browser type,
              operating system, referring URLs, and pages viewed.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              2. How We Use Your Information
            </h2>
            <p className="mt-3">We use the information we collect to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Generate and file lien documents on your behalf</li>
              <li>Send deadline reminders and filing status updates</li>
              <li>Process payments for our services</li>
              <li>Provide customer support</li>
              <li>Improve our services and develop new features</li>
              <li>
                Comply with legal obligations and enforce our terms of service
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              3. Information Sharing
            </h2>
            <p className="mt-3">
              We do not sell your personal information. We may share your
              information with third parties only in the following circumstances:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>
                With county recorder offices and mail services when you use our
                filing service
              </li>
              <li>
                With payment processors to complete transactions
              </li>
              <li>
                With service providers who assist in operating our platform
              </li>
              <li>
                When required by law, subpoena, or legal process
              </li>
              <li>
                To protect the rights, property, or safety of LienFile.io, our
                users, or the public
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              4. Data Security
            </h2>
            <p className="mt-3">
              We implement industry-standard security measures to protect your
              information, including encryption in transit and at rest, secure
              server infrastructure, and access controls. However, no method of
              transmission over the Internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              5. Data Retention
            </h2>
            <p className="mt-3">
              We retain your personal information for as long as your account is
              active or as needed to provide services to you. We also retain
              information as necessary to comply with legal obligations, resolve
              disputes, and enforce our agreements. Lien filing records are
              retained for a minimum of seven years.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              6. Your Rights
            </h2>
            <p className="mt-3">
              Depending on your jurisdiction, you may have the right to access,
              correct, delete, or port your personal information. You may also
              have the right to opt out of certain data processing activities. To
              exercise these rights, contact us at privacy@lienfile.io.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              7. Cookies and Tracking
            </h2>
            <p className="mt-3">
              We use cookies and similar technologies to improve your experience,
              analyze site traffic, and understand usage patterns. You can control
              cookie preferences through your browser settings. Disabling cookies
              may affect the functionality of our website.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              8. Changes to This Policy
            </h2>
            <p className="mt-3">
              We may update this privacy policy from time to time. We will notify
              you of material changes by posting the updated policy on our
              website and updating the &quot;Last updated&quot; date. Your continued use
              of our services after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[#1a2744]">
              9. Contact Us
            </h2>
            <p className="mt-3">
              If you have questions about this privacy policy or our data
              practices, contact us at:
            </p>
            <p className="mt-3">
              Email: privacy@lienfile.io
              <br />
              LienFile.io
              <br />
              Attn: Privacy
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
