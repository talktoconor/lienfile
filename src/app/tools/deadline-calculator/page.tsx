import type { Metadata } from "next";
import { DeadlineCalculatorClient } from "./calculator-client";

export const metadata: Metadata = {
  title: "Free Mechanic's Lien Deadline Calculator | LienFile.io",
  description:
    "Calculate your mechanic's lien filing deadline for any state. Enter your state, role, and last day of work to see all critical deadlines and countdown timers.",
  openGraph: {
    title: "Free Mechanic's Lien Deadline Calculator | LienFile.io",
    description:
      "Calculate your mechanic's lien filing deadline for any state. Never miss a critical deadline.",
  },
};

export default function DeadlineCalculatorPage() {
  return <DeadlineCalculatorClient />;
}
