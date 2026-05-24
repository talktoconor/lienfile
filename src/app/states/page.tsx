import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { STATES } from "@/lib/states-data";

export const metadata: Metadata = {
  title: "Mechanic's Lien Laws by State | LienFile.io",
  description:
    "Browse mechanic's lien laws, deadlines, and filing requirements for all 50 states and Washington D.C. Find your state to learn about notice requirements and filing procedures.",
  openGraph: {
    title: "Mechanic's Lien Laws by State | LienFile.io",
    description:
      "Browse mechanic's lien laws, deadlines, and filing requirements for all 50 states and Washington D.C.",
  },
};

export default function StatesPage() {
  const stateEntries = Object.values(STATES).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <section className="bg-[#1a2744] text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Mechanic&apos;s Lien Laws by State
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Every state has different mechanic&apos;s lien deadlines, notice
              requirements, and filing procedures. Select your state below to
              learn the specific rules that apply to your project.
            </p>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {stateEntries.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="group rounded-lg border border-slate-200 p-4 transition-all hover:border-[#f97316] hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="font-semibold text-[#1a2744] group-hover:text-[#f97316]">
                      {state.name}
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      Lien deadline: {state.lienDeadline.split("(")[0].split(";")[0].trim()}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    {state.abbreviation}
                  </span>
                </div>
                <div className="mt-2">
                  {state.preliminaryNotice.required ? (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-orange-100 text-orange-700 border-orange-200"
                    >
                      Notice Required
                    </Badge>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="text-[10px] bg-green-100 text-green-700 border-green-200"
                    >
                      No Notice Required
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
