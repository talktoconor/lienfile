"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { STATES } from "@/lib/states-data";
import { calculateDeadlines, type DeadlineResult } from "@/lib/deadline-calculator";

const stateOptions = Object.values(STATES).sort((a, b) =>
  a.name.localeCompare(b.name)
);

const roleOptions = [
  "General Contractor",
  "Subcontractor",
  "Material Supplier",
  "Laborer",
  "Equipment Rental",
];

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getDaysUntil(date: Date): number {
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function DeadlineCard({
  label,
  date,
  description,
}: {
  label: string;
  date: Date;
  description: string;
}) {
  const daysUntil = getDaysUntil(date);
  const isPast = daysUntil < 0;
  const isUrgent = !isPast && daysUntil <= 30;

  return (
    <Card className={isPast ? "opacity-60" : isUrgent ? "border-red-300" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base text-[#1a2744]">{label}</CardTitle>
          {isPast ? (
            <Badge variant="destructive">Expired</Badge>
          ) : isUrgent ? (
            <Badge className="bg-red-100 text-red-700 border-red-200">
              Urgent
            </Badge>
          ) : (
            <Badge className="bg-green-100 text-green-700 border-green-200">
              Active
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold text-[#1a2744]">
          {formatDate(date)}
        </p>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
        <div className="mt-3">
          {isPast ? (
            <p className="text-sm font-medium text-red-600">
              This deadline passed {Math.abs(daysUntil)} days ago
            </p>
          ) : (
            <div className="flex items-center gap-2">
              <div
                className={`text-2xl font-bold ${
                  isUrgent ? "text-red-600" : "text-[#1a2744]"
                }`}
              >
                {daysUntil}
              </div>
              <span className="text-sm text-slate-500">days remaining</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function DeadlineCalculatorClient() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [lastDayOfWork, setLastDayOfWork] = useState("");
  const [results, setResults] = useState<DeadlineResult | null>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  function handleCalculate() {
    setError("");
    setResults(null);

    if (!selectedState || !selectedRole || !lastDayOfWork) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const result = calculateDeadlines(selectedState, selectedRole, lastDayOfWork);
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred.");
    }
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
    }
  }

  const stateData = selectedState ? STATES[selectedState] : null;

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Mechanic&apos;s Lien Deadline Calculator
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Enter your state, role, and last day of work to calculate all
              critical lien deadlines. Never miss a filing deadline again.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-[#1a2744]">
                Calculate Your Deadlines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* State Select */}
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <select
                  id="state"
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="">Select a state...</option>
                  {stateOptions.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Select */}
              <div className="space-y-2">
                <Label htmlFor="role">Your Role</Label>
                <select
                  id="role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="flex h-9 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="">Select your role...</option>
                  {roleOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Input */}
              <div className="space-y-2">
                <Label htmlFor="lastDay">Last Day of Work</Label>
                <Input
                  id="lastDay"
                  type="date"
                  value={lastDayOfWork}
                  onChange={(e) => setLastDayOfWork(e.target.value)}
                  className="h-9"
                />
              </div>

              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}

              <Button
                onClick={handleCalculate}
                className="w-full bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
                size="lg"
              >
                Calculate Deadlines
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          {results && stateData && (
            <div className="mt-8 space-y-6">
              <h2 className="text-xl font-bold text-[#1a2744]">
                Your Deadlines in {stateData.name}
              </h2>

              <div className="space-y-4">
                {results.preliminaryNoticeDeadline && (
                  <DeadlineCard
                    label="Preliminary Notice Deadline"
                    date={results.preliminaryNoticeDeadline}
                    description={`${stateData.preliminaryNotice.deadline}. Send to: ${stateData.preliminaryNotice.whoToSendTo}.`}
                  />
                )}

                <DeadlineCard
                  label="Lien Filing Deadline"
                  date={results.lienFilingDeadline}
                  description={`You must file your mechanic's lien by this date. ${stateData.lienDeadline}.`}
                />

                <DeadlineCard
                  label="Enforcement Deadline"
                  date={results.enforcementDeadline}
                  description={`You must file a lawsuit to enforce your lien by this date. ${stateData.enforcementDeadline}.`}
                />
              </div>

              {/* CTA */}
              <Card className="border-[#f97316] border-2">
                <CardContent className="py-6 text-center">
                  <p className="text-lg font-semibold text-[#1a2744]">
                    Don&apos;t wait until the last minute.
                  </p>
                  <p className="mt-1 text-sm text-slate-600">
                    File your mechanic&apos;s lien now to protect your payment
                    rights in {stateData.name}.
                  </p>
                  <Button
                    render={<Link href="/file" />}
                    className="mt-4 bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
                    size="lg"
                  >
                    File a Lien &mdash; $149
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Email Capture */}
          <div className="mt-12">
            <Card className="bg-slate-50">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a2744]">
                  Get Deadline Reminders
                </CardTitle>
              </CardHeader>
              <CardContent>
                {emailSubmitted ? (
                  <p className="text-sm text-green-700">
                    Thank you! We&apos;ll send you deadline reminders so you
                    never miss a filing date.
                  </p>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-3">
                    <p className="text-sm text-slate-600">
                      Enter your email to receive automated deadline reminders
                      before your lien filing deadlines expire.
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-9 flex-1"
                      />
                      <Button
                        type="submit"
                        className="bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
                      >
                        Subscribe
                      </Button>
                    </div>
                    <p className="text-xs text-slate-400">
                      No spam. Unsubscribe anytime.
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
