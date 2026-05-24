"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle2,
  Download,
  FileText,
  Mail,
  Building,
  Clock,
  ArrowRight,
  Shield,
  CalendarCheck,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Inner component that reads search params
// ---------------------------------------------------------------------------

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id") ?? "";

  const NEXT_STEPS = [
    {
      icon: Download,
      title: "Download your document",
      description:
        "Your lien document is ready. Download the PDF and review it carefully before recording.",
      status: "ready" as const,
    },
    {
      icon: Building,
      title: "Record with county recorder",
      description:
        "File your mechanics lien with the county recorder's office where the property is located. Most counties accept in-person or mail filings.",
      status: "pending" as const,
    },
    {
      icon: Mail,
      title: "Serve copies to property owner",
      description:
        "Send a copy of the recorded lien to the property owner via certified mail. If you purchased the Full Protection package, we handle this for you.",
      status: "pending" as const,
    },
    {
      icon: Clock,
      title: "Track your enforcement deadline",
      description:
        "After recording, you have a limited time to enforce your lien through foreclosure. Keep track of this deadline to preserve your rights.",
      status: "pending" as const,
    },
  ];

  const TIMELINE = [
    {
      label: "Now",
      title: "Document Generated",
      description: "Your lien document has been prepared and is ready for download.",
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
        "Send a copy of the recorded lien to the owner and other required parties.",
    },
    {
      label: "Ongoing",
      title: "Monitor & Enforce",
      description:
        "Track payment and your enforcement deadline. We will send you reminders.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-3xl px-4">
        {/* Success hero */}
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-[#1a2744]">
            Your Lien Document Is Ready
          </h1>
          <p className="mt-2 text-gray-600">
            Your mechanics lien has been generated and is ready for download.
          </p>
        </div>

        {/* Download card */}
        <Card className="mb-8 border-2 border-green-200 bg-green-50/50">
          <CardContent className="flex flex-col items-center gap-4 py-6 sm:flex-row sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#1a2744]">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#1a2744]">
                  Mechanics Lien Document
                </p>
                <p className="text-sm text-gray-500">PDF format, ready to record</p>
              </div>
            </div>
            <a
              href={`/api/download?session_id=${encodeURIComponent(sessionId)}`}
              className="inline-flex"
            >
              <Button className="gap-2 bg-[#f97316] text-white hover:bg-[#ea580c]">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </a>
          </CardContent>
        </Card>

        {/* Next steps checklist */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarCheck className="h-5 w-5 text-[#f97316]" />
              Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {NEXT_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div
                    key={i}
                    className={`flex gap-4 rounded-lg border p-4 ${
                      step.status === "ready"
                        ? "border-green-200 bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <div className="flex items-start pt-0.5">
                      {step.status === "ready" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                      ) : (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="text-xs font-medium text-gray-400">
                            {i + 1}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-[#1a2744]" />
                        <h4 className="font-semibold text-[#1a2744]">
                          {step.title}
                        </h4>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-[#f97316]" />
              What Happens Next
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              {TIMELINE.map((item, i) => (
                <div key={i} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Vertical line */}
                  {i < TIMELINE.length - 1 && (
                    <div className="absolute left-[15px] top-8 h-[calc(100%-16px)] w-0.5 bg-gray-200" />
                  )}
                  {/* Dot */}
                  <div
                    className={`relative z-10 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      i === 0
                        ? "bg-[#f97316] text-white"
                        : "border-2 border-gray-300 bg-white"
                    }`}
                  >
                    <ArrowRight
                      className={`h-3.5 w-3.5 ${
                        i === 0 ? "text-white" : "text-gray-400"
                      }`}
                    />
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

        {/* Export metadata */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-[#f97316]" />
              Filing Record
            </CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Session ID</dt>
                <dd className="font-mono text-xs font-medium">
                  {sessionId || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Generated</dt>
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
                <dt className="text-muted-foreground">Document Format</dt>
                <dd className="font-medium">PDF</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="inline-flex items-center gap-1.5 font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Complete
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="/file">
            <Button variant="outline" className="w-full gap-2 sm:w-auto">
              <FileText className="h-4 w-4" />
              File Another Lien
            </Button>
          </a>
          <a href="/">
            <Button
              variant="outline"
              className="w-full gap-2 sm:w-auto"
            >
              Return Home
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page wrapper with Suspense boundary (required for useSearchParams)
// ---------------------------------------------------------------------------

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
