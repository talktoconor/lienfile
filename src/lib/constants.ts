export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.lienfile.io";
export const SITE_NAME = "LienFile.io";
export const SITE_TAGLINE = "Protect Your Right to Payment — File Mechanic's Liens Online";

// Brand colors
export const NAVY = "#1a2744";
export const ORANGE = "#f97316";

// Pricing tiers
export interface PricingTier {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  stripePriceId: string;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "preliminary-notice",
    name: "Preliminary Notice",
    price: 49,
    description: "Send a state-specific preliminary notice to protect your lien rights before deadlines expire.",
    features: [
      "AI-generated preliminary notice",
      "State-specific format",
      "PDF download",
      "Certified mail delivery",
    ],
    stripePriceId: "price_preliminary_notice",
  },
  {
    id: "lien-document",
    name: "Lien Document",
    price: 149,
    description: "Generate and file a mechanic's lien document tailored to your state and county requirements.",
    features: [
      "State-specific mechanic's lien document",
      "County recorder cover sheet",
      "Certified mail to property owner",
      "Deadline tracking reminders",
    ],
    stripePriceId: "price_lien_document",
  },
  {
    id: "full-protection",
    name: "Full Protection",
    price: 249,
    description: "Complete lien protection from preliminary notice through lien filing and enforcement reminders.",
    features: [
      "Preliminary notice + lien document",
      "Notice of intent to lien",
      "Certified mail for all documents",
      "6-month deadline reminder sequence",
      "Lien release template",
    ],
    stripePriceId: "price_full_protection",
  },
];

// Claimant roles
export const ROLES = [
  "General Contractor",
  "Subcontractor",
  "Material Supplier",
  "Laborer",
  "Equipment Rental",
] as const;

export type Role = (typeof ROLES)[number];

// Project types
export const PROJECT_TYPES = [
  "Residential - New Construction",
  "Residential - Remodel",
  "Commercial - New Construction",
  "Commercial - Renovation",
  "Government/Public Works",
  "Industrial",
] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
