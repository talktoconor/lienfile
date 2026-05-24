"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, useCallback, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CertifiedMailInfo {
  trackingNumber: string;
  expectedDelivery: string;
  carrier: string;
  letterId: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";

  const [documentText, setDocumentText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [certifiedMail, setCertifiedMail] = useState<CertifiedMailInfo | null>(
    null
  );
  const [certifiedLoading, setCertifiedLoading] = useState(false);
  const [certifiedError, setCertifiedError] = useState("");
  const [hasCertified, setHasCertified] = useState(false);

  const sendCertifiedMail = useCallback(
    async (docText: string) => {
      setCertifiedLoading(true);
      try {
        const res = await fetch("/api/send-certified", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, documentText: docText }),
        });
        const data = await res.json();
        if (res.ok) {
          setCertifiedMail(data);
        } else {
          setCertifiedError(data.error || "Failed to send certified mail.");
        }
      } catch {
        setCertifiedError("Network error sending certified mail.");
      } finally {
        setCertifiedLoading(false);
      }
    },
    [sessionId]
  );

  const loadDocument = useCallback(async () => {
    if (!sessionId) {
      setError("No session found. Please try again.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `/api/generate?session_id=${encodeURIComponent(sessionId)}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (data.document) {
        setDocumentText(data.document);
        if (data.sendCertified) {
          setHasCertified(true);
          sendCertifiedMail(data.document);
        }
      } else if (data.error) {
        setError(data.error);
      }
    } catch {
      setError("Failed to load document. Please refresh.");
    } finally {
      setLoading(false);
    }
  }, [sessionId, sendCertifiedMail]);

  useEffect(() => {
    loadDocument();
  }, [loadDocument]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-[#f97316]" />
          <p className="text-gray-600">Generating your lien document...</p>
          <p className="mt-1 text-sm text-gray-400">
            This takes about 15 seconds.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-700">{error}</p>
          <Button
            onClick={loadDocument}
            className="mt-4 bg-red-600 hover:bg-red-700"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Success hero */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-12 w-12 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#1a2744]">
            Your Lien Document Is Ready
          </h1>
          <p className="mt-2 text-gray-600">
            Your mechanic&apos;s lien has been generated and is ready for
            download.
          </p>
        </div>

        {/* Download card */}
        <Card className="mb-8 border-2 border-green-200 bg-green-50/50">
          <CardContent className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a2744]">
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1a2744]">
                  Mechanic&apos;s Lien Document
                </p>
                <p className="text-sm text-gray-500">
                  PDF format, ready to record
                </p>
              </div>
            </div>
            <a
              href={`/api/download?session_id=${encodeURIComponent(sessionId)}`}
              className="inline-flex"
            >
              <Button className="gap-2 bg-[#f97316] text-white hover:bg-[#ea580c]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download PDF
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Certified mail section */}
        {hasCertified && (
          <Card className="mb-8 border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <svg
                  className="h-5 w-5 text-[#f97316]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                USPS Certified Mail
              </CardTitle>
            </CardHeader>
            <CardContent>
              {certifiedLoading ? (
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#f97316] border-t-transparent" />
                  Sending your lien notice via USPS Certified Mail...
                </div>
              ) : certifiedError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {certifiedError} — You can still print and mail the document
                  yourself using the PDF above.
                </div>
              ) : certifiedMail ? (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Tracking Number
                      </p>
                      <p className="mt-1 font-mono text-gray-900">
                        {certifiedMail.trackingNumber || "Pending"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Expected Delivery
                      </p>
                      <p className="mt-1 text-gray-900">
                        {certifiedMail.expectedDelivery || "3-5 business days"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Carrier
                      </p>
                      <p className="mt-1 text-gray-900">
                        {certifiedMail.carrier}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-400">
                        Letter ID
                      </p>
                      <p className="mt-1 font-mono text-xs text-gray-900">
                        {certifiedMail.letterId}
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                    Your lien notice has been submitted for printing and mailing
                    via USPS Certified Mail. You&apos;ll receive a return
                    receipt when the property owner signs for it. Keep the
                    tracking number for your records — it serves as proof of
                    service.
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        )}

        {/* Next steps checklist */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <svg
                className="h-5 w-5 text-[#f97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Download your document",
                  description:
                    "Your lien document is ready. Download the PDF and review it carefully before recording.",
                  done: true,
                },
                {
                  title: "Record with county recorder",
                  description:
                    "File your mechanic’s lien with the county recorder’s office where the property is located.",
                  done: false,
                },
                {
                  title: "Serve copies to property owner",
                  description:
                    hasCertified && certifiedMail
                      ? "We’re sending a certified copy to the property owner via USPS Certified Mail. Tracking info is shown above."
                      : "Send a copy of the recorded lien to the property owner via certified mail to create a legal paper trail.",
                  done: hasCertified && !!certifiedMail,
                },
                {
                  title: "Track your enforcement deadline",
                  description:
                    "After recording, you have a limited time to enforce your lien. We’ll send you deadline reminders.",
                  done: false,
                },
              ].map((step, i) => (
                <div
                  key={i}
                  className={`flex gap-4 rounded-lg border p-4 ${
                    step.done
                      ? "border-green-200 bg-green-50"
                      : "border-gray-200 bg-white"
                  }`}
                >
                  <div className="flex items-start pt-0.5">
                    {step.done ? (
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    ) : (
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                        <span className="text-xs font-medium text-gray-400">
                          {i + 1}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a2744]">
                      {step.title}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <svg
                className="h-5 w-5 text-[#f97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              What Happens Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {[
                {
                  label: "Now",
                  title: "Document Generated",
                  description:
                    "Your lien document has been prepared and is ready for download.",
                },
                {
                  label: "Next",
                  title: "Record at County Office",
                  description:
                    "File the document with the county recorder where the property is located.",
                },
                {
                  label: "Within 10 days",
                  title: "Serve the Property Owner",
                  description:
                    hasCertified
                      ? "We’re handling this — your lien notice is being sent via USPS Certified Mail."
                      : "Send a copy of the recorded lien to the owner and other required parties.",
                },
                {
                  label: "Ongoing",
                  title: "Monitor & Enforce",
                  description:
                    "Track payment and your enforcement deadline. We’ll send you reminders.",
                },
              ].map((item, i) => (
                <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  {i < 3 && (
                    <div className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5 bg-gray-200" />
                  )}
                  <div
                    className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      i === 0
                        ? "bg-[#f97316] text-white"
                        : "border-2 border-gray-300 bg-white"
                    }`}
                  >
                    <svg
                      className={`h-3.5 w-3.5 ${i === 0 ? "text-white" : "text-gray-400"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#f97316]">
                      {item.label}
                    </span>
                    <h4 className="font-semibold text-[#1a2744]">
                      {item.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next steps advice */}
        <div className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
          <strong>Important:</strong>{" "}
          {hasCertified && certifiedMail
            ? "Your lien notice is being printed and mailed via USPS Certified Mail. Keep a copy of your tracking number for your records. The return receipt serves as proof that the property owner received notice of your lien."
            : "Print and send your lien notice via certified mail for the strongest paper trail. Keep a copy for your records. Certified mail provides a return receipt proving the property owner received notice."}
        </div>

        {/* Filing record */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <svg
                className="h-5 w-5 text-[#f97316]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Filing Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-gray-400">Session ID</dt>
                <dd className="font-mono text-xs font-medium">
                  {sessionId || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400">Generated</dt>
                <dd className="font-medium">
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400">Document Format</dt>
                <dd className="font-medium">PDF</dd>
              </div>
              <div>
                <dt className="text-gray-400">Certified Mail</dt>
                <dd className="inline-flex items-center gap-1.5 font-medium">
                  {hasCertified ? (
                    <>
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      <span className="text-green-600">Included</span>
                    </>
                  ) : (
                    <>
                      <span className="h-2 w-2 rounded-full bg-gray-300" />
                      <span className="text-gray-500">Not included</span>
                    </>
                  )}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="/file">
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              File Another Lien
            </Button>
          </a>
          <a href="/">
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              Return Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-[#f97316]" />
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
