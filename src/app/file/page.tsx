"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Shield,
  FileText,
  AlertTriangle,
  Clock,
  Building2,
  HardHat,
  Truck,
  Wrench,
  Package,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const ROLES = [
  { value: "general_contractor", label: "General Contractor", icon: HardHat },
  { value: "subcontractor", label: "Subcontractor", icon: Wrench },
  { value: "material_supplier", label: "Material Supplier", icon: Package },
  { value: "laborer", label: "Laborer", icon: Building2 },
  { value: "equipment_rental", label: "Equipment Rental", icon: Truck },
] as const;

const NEEDS_GC_INFO = ["subcontractor", "material_supplier", "laborer"];

const PROJECT_TYPES = [
  "Residential New Construction",
  "Residential Remodel",
  "Commercial New Construction",
  "Commercial Renovation",
  "Government/Public Works",
  "Industrial",
] as const;

const US_STATES = [
  { abbr: "AL", name: "Alabama" },
  { abbr: "AK", name: "Alaska" },
  { abbr: "AZ", name: "Arizona" },
  { abbr: "AR", name: "Arkansas" },
  { abbr: "CA", name: "California" },
  { abbr: "CO", name: "Colorado" },
  { abbr: "CT", name: "Connecticut" },
  { abbr: "DE", name: "Delaware" },
  { abbr: "FL", name: "Florida" },
  { abbr: "GA", name: "Georgia" },
  { abbr: "HI", name: "Hawaii" },
  { abbr: "ID", name: "Idaho" },
  { abbr: "IL", name: "Illinois" },
  { abbr: "IN", name: "Indiana" },
  { abbr: "IA", name: "Iowa" },
  { abbr: "KS", name: "Kansas" },
  { abbr: "KY", name: "Kentucky" },
  { abbr: "LA", name: "Louisiana" },
  { abbr: "ME", name: "Maine" },
  { abbr: "MD", name: "Maryland" },
  { abbr: "MA", name: "Massachusetts" },
  { abbr: "MI", name: "Michigan" },
  { abbr: "MN", name: "Minnesota" },
  { abbr: "MS", name: "Mississippi" },
  { abbr: "MO", name: "Missouri" },
  { abbr: "MT", name: "Montana" },
  { abbr: "NE", name: "Nebraska" },
  { abbr: "NV", name: "Nevada" },
  { abbr: "NH", name: "New Hampshire" },
  { abbr: "NJ", name: "New Jersey" },
  { abbr: "NM", name: "New Mexico" },
  { abbr: "NY", name: "New York" },
  { abbr: "NC", name: "North Carolina" },
  { abbr: "ND", name: "North Dakota" },
  { abbr: "OH", name: "Ohio" },
  { abbr: "OK", name: "Oklahoma" },
  { abbr: "OR", name: "Oregon" },
  { abbr: "PA", name: "Pennsylvania" },
  { abbr: "RI", name: "Rhode Island" },
  { abbr: "SC", name: "South Carolina" },
  { abbr: "SD", name: "South Dakota" },
  { abbr: "TN", name: "Tennessee" },
  { abbr: "TX", name: "Texas" },
  { abbr: "UT", name: "Utah" },
  { abbr: "VT", name: "Vermont" },
  { abbr: "VA", name: "Virginia" },
  { abbr: "WA", name: "Washington" },
  { abbr: "WV", name: "West Virginia" },
  { abbr: "WI", name: "Wisconsin" },
  { abbr: "WY", name: "Wyoming" },
  { abbr: "DC", name: "District of Columbia" },
] as const;

// Lien deadline info keyed by state abbreviation (days from last day of work)
const STATE_LIEN_INFO: Record<
  string,
  { deadlineDays: number; description: string }
> = {
  AL: { deadlineDays: 180, description: "6 months from last day of work" },
  AK: { deadlineDays: 120, description: "120 days from completion of work" },
  AZ: { deadlineDays: 120, description: "120 days from completion of work" },
  AR: { deadlineDays: 120, description: "120 days from last day of work" },
  CA: { deadlineDays: 90, description: "90 days from completion of work" },
  CO: { deadlineDays: 120, description: "4 months from last day of work" },
  CT: { deadlineDays: 90, description: "90 days from last day of work" },
  DE: { deadlineDays: 180, description: "180 days from last day of work" },
  FL: { deadlineDays: 90, description: "90 days from last day of work" },
  GA: { deadlineDays: 90, description: "90 days from completion of work" },
  HI: { deadlineDays: 45, description: "45 days from completion of work" },
  ID: { deadlineDays: 90, description: "90 days from completion of work" },
  IL: { deadlineDays: 120, description: "4 months from completion of work" },
  IN: { deadlineDays: 90, description: "90 days from last day of work" },
  IA: { deadlineDays: 90, description: "90 days from last day of work" },
  KS: { deadlineDays: 120, description: "4 months from last day of work" },
  KY: { deadlineDays: 180, description: "6 months from last day of work" },
  LA: { deadlineDays: 60, description: "60 days from filing of notice" },
  ME: { deadlineDays: 90, description: "90 days from last day of work" },
  MD: { deadlineDays: 180, description: "180 days from last day of work" },
  MA: { deadlineDays: 90, description: "90 days from last day of work" },
  MI: { deadlineDays: 90, description: "90 days from last day of work" },
  MN: { deadlineDays: 120, description: "120 days from last day of work" },
  MS: { deadlineDays: 180, description: "180 days from completion of work" },
  MO: { deadlineDays: 180, description: "6 months from last day of work" },
  MT: { deadlineDays: 90, description: "90 days from completion of work" },
  NE: { deadlineDays: 120, description: "4 months from last day of work" },
  NV: { deadlineDays: 90, description: "90 days after last day of work" },
  NH: { deadlineDays: 120, description: "120 days from last day of work" },
  NJ: { deadlineDays: 90, description: "90 days from last day of work" },
  NM: { deadlineDays: 120, description: "120 days from completion of work" },
  NY: { deadlineDays: 240, description: "8 months from last day of work" },
  NC: { deadlineDays: 120, description: "120 days from last day of work" },
  ND: { deadlineDays: 90, description: "90 days from last day of work" },
  OH: { deadlineDays: 75, description: "75 days from last day of work" },
  OK: { deadlineDays: 90, description: "90 days from last day of work" },
  OR: { deadlineDays: 75, description: "75 days from completion of work" },
  PA: { deadlineDays: 180, description: "6 months from completion of work" },
  RI: { deadlineDays: 200, description: "200 days from last day of work" },
  SC: { deadlineDays: 90, description: "90 days from last day of work" },
  SD: { deadlineDays: 120, description: "120 days from last day of work" },
  TN: { deadlineDays: 90, description: "90 days from completion of work" },
  TX: { deadlineDays: 120, description: "4th month after last day of work" },
  UT: { deadlineDays: 180, description: "180 days from completion of work" },
  VT: { deadlineDays: 180, description: "180 days from last day of work" },
  VA: { deadlineDays: 90, description: "90 days from last day of work" },
  WA: { deadlineDays: 90, description: "90 days from last day of work" },
  WV: { deadlineDays: 90, description: "90 days from completion of work" },
  WI: { deadlineDays: 180, description: "6 months from last day of work" },
  WY: { deadlineDays: 150, description: "150 days from last day of work" },
  DC: { deadlineDays: 90, description: "90 days from last day of work" },
};

const TIERS: { id: string; name: string; price: number; popular?: boolean; features: string[] }[] = [
  {
    id: "preliminary_notice",
    name: "Preliminary Notice",
    price: 49,
    features: [
      "State-compliant preliminary notice",
      "Digital delivery to property owner",
      "Filing confirmation receipt",
    ],
  },
  {
    id: "lien_document",
    name: "Lien Document",
    price: 149,
    popular: true,
    features: [
      "Attorney-reviewed mechanics lien",
      "County-ready document format",
      "Filing instructions for your county",
      "Deadline tracking dashboard",
      "Email + SMS deadline reminders",
    ],
  },
  {
    id: "full_protection",
    name: "Full Protection",
    price: 249,
    features: [
      "Everything in Lien Document",
      "Certified mail service to owner",
      "County recording assistance",
      "Enforcement deadline tracking",
      "Priority support from lien specialists",
    ],
  },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  // Step 1
  role: string;
  // Step 2
  state: string;
  // Step 3
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  propertyOwnerName: string;
  legalDescription: string;
  // Step 4
  projectType: string;
  dateFirstWork: string;
  dateLastWork: string;
  originalContractAmount: string;
  // Step 5
  amountOwed: string;
  invoicesSent: string;
  dateLastInvoice: string;
  lastPaymentDate: string;
  lastPaymentAmount: string;
  // Step 6 (GC info)
  gcCompanyName: string;
  gcAddress: string;
  gcLicenseNumber: string;
  // Step 7
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  companyEmail: string;
  licenseNumber: string;
  licenseState: string;
}

const INITIAL_FORM: FormData = {
  role: "",
  state: "",
  propertyStreet: "",
  propertyCity: "",
  propertyState: "",
  propertyZip: "",
  propertyOwnerName: "",
  legalDescription: "",
  projectType: "",
  dateFirstWork: "",
  dateLastWork: "",
  originalContractAmount: "",
  amountOwed: "",
  invoicesSent: "",
  dateLastInvoice: "",
  lastPaymentDate: "",
  lastPaymentAmount: "",
  gcCompanyName: "",
  gcAddress: "",
  gcLicenseNumber: "",
  companyName: "",
  companyAddress: "",
  companyPhone: "",
  companyEmail: "",
  licenseNumber: "",
  licenseState: "",
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeDeadline(
  stateAbbr: string,
  dateLastWork: string
): { date: Date; daysRemaining: number; label: string } | null {
  const info = STATE_LIEN_INFO[stateAbbr];
  if (!info || !dateLastWork) return null;
  const last = new Date(dateLastWork);
  if (isNaN(last.getTime())) return null;
  const deadline = new Date(last);
  deadline.setDate(deadline.getDate() + info.deadlineDays);
  const now = new Date();
  const diff = deadline.getTime() - now.getTime();
  const daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return { date: deadline, daysRemaining, label: info.description };
}

function formatCurrency(val: string): string {
  const n = parseFloat(val);
  if (isNaN(n)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

function formatDate(val: string): string {
  if (!val) return "";
  const d = new Date(val);
  if (isNaN(d.getTime())) return val;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateStep(step: number, data: FormData): string | null {
  switch (step) {
    case 1:
      if (!data.role) return "Please select your role.";
      return null;
    case 2:
      if (!data.state) return "Please select a state.";
      return null;
    case 3:
      if (!data.propertyStreet) return "Property street address is required.";
      if (!data.propertyCity) return "Property city is required.";
      if (!data.propertyState) return "Property state is required.";
      if (!data.propertyZip) return "Property ZIP code is required.";
      if (!data.propertyOwnerName) return "Property owner name is required.";
      return null;
    case 4:
      if (!data.projectType) return "Please select a project type.";
      if (!data.dateFirstWork) return "Date of first work is required.";
      if (!data.dateLastWork) return "Date of last work is required.";
      if (!data.originalContractAmount)
        return "Original contract amount is required.";
      return null;
    case 5:
      if (!data.amountOwed) return "Amount owed is required.";
      if (!data.invoicesSent) return "Number of invoices sent is required.";
      if (!data.dateLastInvoice) return "Date of last invoice is required.";
      return null;
    case 6:
      if (NEEDS_GC_INFO.includes(data.role)) {
        if (!data.gcCompanyName)
          return "General contractor company name is required.";
        if (!data.gcAddress) return "General contractor address is required.";
      }
      return null;
    case 7:
      if (!data.companyName) return "Your company name is required.";
      if (!data.companyAddress) return "Your company address is required.";
      if (!data.companyPhone) return "Your phone number is required.";
      if (!data.companyEmail) return "Your email address is required.";
      if (!data.licenseNumber) return "Your license number is required.";
      if (!data.licenseState)
        return "The state of your license is required.";
      return null;
    default:
      return null;
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FileLienPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const showGcStep = NEEDS_GC_INFO.includes(formData.role);
  const totalSteps = showGcStep ? 7 : 6;
  // Preview is step totalSteps + 1
  const isPreview = currentStep === totalSteps + 1;

  // Map logical step to display label
  function stepLabel(step: number): string {
    if (step === 1) return "Your Role";
    if (step === 2) return "State";
    if (step === 3) return "Property Details";
    if (step === 4) return "Project Details";
    if (step === 5) return "Payment Details";
    if (showGcStep && step === 6) return "General Contractor";
    if ((showGcStep && step === 7) || (!showGcStep && step === 6))
      return "Your Business Info";
    return "Preview";
  }

  // Map current logical step to the actual data-step for validation
  function dataStep(logicalStep: number): number {
    if (!showGcStep && logicalStep >= 6) {
      // Skip step 6 (GC info) — business info is data-step 7
      return logicalStep + 1;
    }
    return logicalStep;
  }

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);
  }

  function handleNext() {
    const validation = validateStep(dataStep(currentStep), formData);
    if (validation) {
      setError(validation);
      return;
    }
    setError(null);
    setCurrentStep((s) => s + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setError(null);
    setCurrentStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCheckout(tierId: string) {
    setSubmitting(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData, tier: tierId }),
      });
      const json = await res.json();
      if (json.url) {
        window.location.href = json.url;
      } else {
        setError("Unable to create checkout session. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const progressPercent = isPreview
    ? 100
    : Math.round((currentStep / totalSteps) * 100);

  const deadline = computeDeadline(formData.state, formData.dateLastWork);
  const stateName = US_STATES.find((s) => s.abbr === formData.state)?.name;

  // -------------------------------------------------------------------------
  // Render steps
  // -------------------------------------------------------------------------

  function renderStep() {
    const ds = dataStep(currentStep);

    // Step 1 — Role
    if (ds === 1) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              What is your role on the project?
            </CardTitle>
            <CardDescription>
              Your role determines notice requirements and filing deadlines.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-2">
              {ROLES.map((r) => {
                const Icon = r.icon;
                const selected = formData.role === r.value;
                return (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => updateField("role", r.value)}
                    className={`flex items-center gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                      selected
                        ? "border-[#f97316] bg-orange-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                        selected
                          ? "bg-[#f97316] text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[#1a2744]">{r.label}</p>
                    </div>
                    {selected && (
                      <CheckCircle2 className="ml-auto h-5 w-5 text-[#f97316]" />
                    )}
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      );
    }

    // Step 2 — State
    if (ds === 2) {
      const stateInfo = STATE_LIEN_INFO[formData.state];
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              Where is the property located?
            </CardTitle>
            <CardDescription>
              Mechanics lien laws vary significantly by state.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="state-select">State</Label>
              <Select
                value={formData.state}
                onValueChange={(val) => updateField("state", val ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a state">
                    {formData.state
                      ? US_STATES.find((s) => s.abbr === formData.state)?.name
                      : undefined}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {US_STATES.map((s) => (
                    <SelectItem key={s.abbr} value={s.abbr}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {stateInfo && (
              <div className="rounded-lg border-2 border-[#f97316]/30 bg-orange-50 p-4">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#f97316]" />
                  <div>
                    <p className="font-semibold text-[#1a2744]">
                      {stateName} Lien Deadline
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {stateInfo.description}. Filing after this deadline may
                      invalidate your lien rights.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      );
    }

    // Step 3 — Property Details
    if (ds === 3) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Property Details</CardTitle>
            <CardDescription>
              Enter the address and ownership information for the property where
              work was performed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="prop-street">Street Address</Label>
              <Input
                id="prop-street"
                value={formData.propertyStreet}
                onChange={(e) =>
                  updateField("propertyStreet", e.target.value)
                }
                placeholder="123 Main St"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="prop-city">City</Label>
                <Input
                  id="prop-city"
                  value={formData.propertyCity}
                  onChange={(e) =>
                    updateField("propertyCity", e.target.value)
                  }
                  placeholder="Los Angeles"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prop-state">State</Label>
                <Select
                  value={formData.propertyState}
                  onValueChange={(val) => updateField("propertyState", val ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s.abbr} value={s.abbr}>
                        {s.abbr}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prop-zip">ZIP Code</Label>
                <Input
                  id="prop-zip"
                  value={formData.propertyZip}
                  onChange={(e) =>
                    updateField("propertyZip", e.target.value)
                  }
                  placeholder="90001"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="owner-name">Property Owner Name</Label>
              <Input
                id="owner-name"
                value={formData.propertyOwnerName}
                onChange={(e) =>
                  updateField("propertyOwnerName", e.target.value)
                }
                placeholder="Full legal name of property owner"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="legal-desc">
                Legal Description{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Textarea
                id="legal-desc"
                value={formData.legalDescription}
                onChange={(e) =>
                  updateField("legalDescription", e.target.value)
                }
                placeholder="Lot, block, tract, parcel number, etc."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      );
    }

    // Step 4 — Project Details
    if (ds === 4) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Details</CardTitle>
            <CardDescription>
              Describe the type and timeline of the work you performed.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project-type">Project Type</Label>
              <Select
                value={formData.projectType}
                onValueChange={(val) => updateField("projectType", val ?? "")}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {PROJECT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="first-work">Date of First Work</Label>
                <Input
                  id="first-work"
                  type="date"
                  value={formData.dateFirstWork}
                  onChange={(e) =>
                    updateField("dateFirstWork", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-work">Date of Last Work</Label>
                <Input
                  id="last-work"
                  type="date"
                  value={formData.dateLastWork}
                  onChange={(e) =>
                    updateField("dateLastWork", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="contract-amount">Original Contract Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="contract-amount"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-7"
                  value={formData.originalContractAmount}
                  onChange={(e) =>
                    updateField("originalContractAmount", e.target.value)
                  }
                  placeholder="0.00"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Step 5 — Payment Details
    if (ds === 5) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Payment Details</CardTitle>
            <CardDescription>
              Document the outstanding payments and your invoicing history.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="amount-owed">Amount Owed</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  $
                </span>
                <Input
                  id="amount-owed"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-7"
                  value={formData.amountOwed}
                  onChange={(e) =>
                    updateField("amountOwed", e.target.value)
                  }
                  placeholder="0.00"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="invoices-sent">Number of Invoices Sent</Label>
                <Input
                  id="invoices-sent"
                  type="number"
                  min="0"
                  value={formData.invoicesSent}
                  onChange={(e) =>
                    updateField("invoicesSent", e.target.value)
                  }
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-invoice">Date of Last Invoice</Label>
                <Input
                  id="last-invoice"
                  type="date"
                  value={formData.dateLastInvoice}
                  onChange={(e) =>
                    updateField("dateLastInvoice", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="last-payment-date">
                  Last Payment Received Date{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="last-payment-date"
                  type="date"
                  value={formData.lastPaymentDate}
                  onChange={(e) =>
                    updateField("lastPaymentDate", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-payment-amount">
                  Last Payment Amount{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="last-payment-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className="pl-7"
                    value={formData.lastPaymentAmount}
                    onChange={(e) =>
                      updateField("lastPaymentAmount", e.target.value)
                    }
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Step 6 — General Contractor Info (conditional)
    if (ds === 6) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              General Contractor Information
            </CardTitle>
            <CardDescription>
              As a{" "}
              {ROLES.find((r) => r.value === formData.role)?.label?.toLowerCase()}
              , you are required to identify the general contractor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gc-name">GC Company Name</Label>
              <Input
                id="gc-name"
                value={formData.gcCompanyName}
                onChange={(e) =>
                  updateField("gcCompanyName", e.target.value)
                }
                placeholder="ABC Construction Inc."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gc-address">GC Address</Label>
              <Input
                id="gc-address"
                value={formData.gcAddress}
                onChange={(e) =>
                  updateField("gcAddress", e.target.value)
                }
                placeholder="Full mailing address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gc-license">
                GC License Number{" "}
                <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="gc-license"
                value={formData.gcLicenseNumber}
                onChange={(e) =>
                  updateField("gcLicenseNumber", e.target.value)
                }
                placeholder="License number"
              />
            </div>
          </CardContent>
        </Card>
      );
    }

    // Step 7 — Your Business Info
    if (ds === 7) {
      return (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Your Business Information</CardTitle>
            <CardDescription>
              This information will appear on your lien document as the
              claimant.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="co-name">Company Name</Label>
              <Input
                id="co-name"
                value={formData.companyName}
                onChange={(e) =>
                  updateField("companyName", e.target.value)
                }
                placeholder="Your Company LLC"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="co-address">Company Address</Label>
              <Input
                id="co-address"
                value={formData.companyAddress}
                onChange={(e) =>
                  updateField("companyAddress", e.target.value)
                }
                placeholder="Full mailing address"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="co-phone">Phone Number</Label>
                <Input
                  id="co-phone"
                  type="tel"
                  value={formData.companyPhone}
                  onChange={(e) =>
                    updateField("companyPhone", e.target.value)
                  }
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="co-email">Email Address</Label>
                <Input
                  id="co-email"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) =>
                    updateField("companyEmail", e.target.value)
                  }
                  placeholder="billing@company.com"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="lic-num">License Number</Label>
                <Input
                  id="lic-num"
                  value={formData.licenseNumber}
                  onChange={(e) =>
                    updateField("licenseNumber", e.target.value)
                  }
                  placeholder="License number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lic-state">License State</Label>
                <Select
                  value={formData.licenseState}
                  onValueChange={(val) => updateField("licenseState", val ?? "")}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s.abbr} value={s.abbr}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      );
    }

    return null;
  }

  // -------------------------------------------------------------------------
  // Preview / Checkout
  // -------------------------------------------------------------------------

  function renderPreview() {
    const roleLabel = ROLES.find((r) => r.value === formData.role)?.label ?? "";

    return (
      <div className="space-y-8">
        {/* Deadline alert */}
        {deadline && (
          <div
            className={`rounded-lg border-2 p-5 ${
              deadline.daysRemaining <= 14
                ? "border-red-400 bg-red-50"
                : deadline.daysRemaining <= 30
                  ? "border-yellow-400 bg-yellow-50"
                  : "border-green-400 bg-green-50"
            }`}
          >
            <div className="flex items-start gap-3">
              <AlertTriangle
                className={`mt-0.5 h-6 w-6 shrink-0 ${
                  deadline.daysRemaining <= 14
                    ? "text-red-600"
                    : deadline.daysRemaining <= 30
                      ? "text-yellow-600"
                      : "text-green-600"
                }`}
              />
              <div>
                <p className="text-lg font-bold text-[#1a2744]">
                  {deadline.daysRemaining > 0
                    ? `${deadline.daysRemaining} days remaining`
                    : "Deadline has passed"}
                </p>
                <p className="text-sm text-gray-700">
                  Your lien must be filed by{" "}
                  <strong>
                    {deadline.date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </strong>{" "}
                  ({deadline.label}).
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Blurred document preview */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200">
          {/* Document header */}
          <div className="border-b bg-gray-50 px-6 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <FileText className="h-4 w-4" />
              <span>Mechanics Lien Document Preview</span>
            </div>
          </div>

          {/* Blurred content */}
          <div className="relative px-8 py-6">
            <div className="pointer-events-none select-none blur-[6px]">
              <div className="mb-6 text-center">
                <p className="text-xs uppercase tracking-widest text-gray-400">
                  Recording Requested By
                </p>
                <p className="text-lg font-bold">{formData.companyName}</p>
              </div>
              <div className="mb-4 text-center">
                <h2 className="text-xl font-bold uppercase tracking-wide text-[#1a2744]">
                  Claim of Mechanics Lien
                </h2>
              </div>
              <div className="space-y-3 text-sm leading-relaxed text-gray-800">
                <p>
                  The undersigned, <strong>{formData.companyName}</strong>,
                  hereby claims a mechanics lien against the property located at{" "}
                  <strong>
                    {formData.propertyStreet}, {formData.propertyCity},{" "}
                    {formData.propertyState} {formData.propertyZip}
                  </strong>
                  , owned by <strong>{formData.propertyOwnerName}</strong>.
                </p>
                <p>
                  Claimant, acting as {roleLabel}, provided labor, services,
                  and/or materials for the improvement of said property under
                  contract in the amount of{" "}
                  {formatCurrency(formData.originalContractAmount)}.
                </p>
                <p>
                  Work commenced on {formatDate(formData.dateFirstWork)} and was
                  last performed on {formatDate(formData.dateLastWork)}. The
                  amount remaining unpaid is{" "}
                  {formatCurrency(formData.amountOwed)}, after giving credit for
                  all payments received.
                </p>
                {formData.legalDescription && (
                  <p>
                    Legal description of the property:{" "}
                    {formData.legalDescription}
                  </p>
                )}
                <div className="mt-8 space-y-4 border-t pt-4">
                  <div className="flex justify-between">
                    <span>Signature: ____________________</span>
                    <span>Date: ____________________</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Unlock overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm">
              <div className="rounded-xl bg-[#1a2744] px-8 py-5 text-center shadow-xl">
                <Shield className="mx-auto mb-2 h-8 w-8 text-[#f97316]" />
                <p className="text-lg font-bold text-white">
                  Pay to unlock your complete lien document
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Attorney-reviewed, county-ready, and state-compliant
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filing summary */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filing Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Your Role</dt>
                <dd className="font-medium">{roleLabel}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">State</dt>
                <dd className="font-medium">{stateName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Property</dt>
                <dd className="font-medium">
                  {formData.propertyStreet}, {formData.propertyCity},{" "}
                  {formData.propertyState} {formData.propertyZip}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Owner</dt>
                <dd className="font-medium">{formData.propertyOwnerName}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Amount Owed</dt>
                <dd className="font-medium text-[#f97316]">
                  {formatCurrency(formData.amountOwed)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Contract Amount</dt>
                <dd className="font-medium">
                  {formatCurrency(formData.originalContractAmount)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Work Period</dt>
                <dd className="font-medium">
                  {formatDate(formData.dateFirstWork)} &ndash;{" "}
                  {formatDate(formData.dateLastWork)}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Claimant</dt>
                <dd className="font-medium">{formData.companyName}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        {/* Pricing tiers */}
        <div>
          <h3 className="mb-4 text-center text-xl font-bold text-[#1a2744]">
            Choose Your Filing Package
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {TIERS.map((tier) => (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-xl border-2 p-5 transition-shadow hover:shadow-lg ${
                  tier.popular
                    ? "border-[#f97316] shadow-md"
                    : "border-gray-200"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#f97316] px-3 py-0.5 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}
                <h4 className="text-base font-bold text-[#1a2744]">
                  {tier.name}
                </h4>
                <p className="mt-1 text-3xl font-extrabold text-[#1a2744]">
                  ${tier.price}
                </p>
                <ul className="mt-4 flex-1 space-y-2">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`mt-5 w-full ${
                    tier.popular
                      ? "bg-[#f97316] text-white hover:bg-[#ea580c]"
                      : "bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
                  }`}
                  onClick={() => handleCheckout(tier.id)}
                  disabled={submitting}
                >
                  {submitting ? "Processing..." : `Get ${tier.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // Main layout
  // -------------------------------------------------------------------------

  return (
    <div className="bg-gray-50 py-8">
      <div className="mx-auto max-w-3xl px-4">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-[#1a2744]">
              {isPreview
                ? "Preview & Checkout"
                : `Step ${currentStep} of ${totalSteps}`}
            </span>
            <span className="text-muted-foreground">
              {isPreview
                ? "Review your filing"
                : stepLabel(currentStep)}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-[#f97316] transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {/* Step dots */}
          <div className="mt-3 flex justify-between">
            {Array.from({ length: totalSteps + 1 }).map((_, i) => {
              const stepNum = i + 1;
              const completed = stepNum < currentStep;
              const active = stepNum === currentStep;
              return (
                <div
                  key={i}
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium transition-colors ${
                    completed
                      ? "bg-[#f97316] text-white"
                      : active
                        ? "border-2 border-[#f97316] bg-white text-[#f97316]"
                        : "border border-gray-300 bg-white text-gray-400"
                  }`}
                >
                  {completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : stepNum <= totalSteps ? (
                    stepNum
                  ) : (
                    <FileText className="h-3.5 w-3.5" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Step content */}
        {isPreview ? renderPreview() : renderStep()}

        {/* Navigation buttons */}
        {!isPreview && (
          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={handleNext}
              className="gap-1 bg-[#1a2744] text-white hover:bg-[#1a2744]/90"
            >
              {currentStep === totalSteps ? "Review Filing" : "Continue"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}

        {isPreview && (
          <div className="mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              className="gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Edit Filing Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
