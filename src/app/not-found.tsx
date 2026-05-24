import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
      <h1 className="text-6xl font-bold text-[#1a2744]">404</h1>
      <h2 className="mt-4 text-xl font-semibold text-slate-700">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-slate-500">
        The page you are looking for does not exist or has been moved. If you
        need help filing a lien, head back to the homepage.
      </p>
      <Link
        href="/"
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-8 bg-[#1a2744] text-white hover:bg-[#1a2744]/90 font-semibold"
        )}
      >
        Back to Homepage
      </Link>
    </div>
  )
}
