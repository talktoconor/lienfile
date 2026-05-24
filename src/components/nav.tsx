"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"

const navLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/state-guides", label: "State Guides" },
  { href: "/tools", label: "Free Tools" },
  { href: "/blog", label: "Blog" },
]

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 2L3 7v5c0 5.25 3.82 10.17 9 11.38C17.18 22.17 21 17.25 21 12V7L12 2zm0 2.18l7 3.82v4c0 4.29-3.03 8.37-7 9.57C8.03 20.37 5 16.29 5 12V8l7-3.82zM10 15.5l-3.5-3.5 1.41-1.41L10 12.67l5.59-5.59L17 8.5l-7 7z" />
    </svg>
  )
}

export function Nav() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <ShieldIcon className="h-7 w-7 text-[#1a2744]" />
          <span className="text-xl font-bold text-[#1a2744]">LienFile</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-[#1a2744] ${
                pathname === link.href
                  ? "text-[#1a2744]"
                  : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Link
            href="/file"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
            )}
          >
            File a Lien &mdash; $149
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" aria-label="Open menu" />
              }
            >
              <Menu className="h-6 w-6 text-[#1a2744]" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center gap-2"
                    onClick={() => setMobileOpen(false)}
                  >
                    <ShieldIcon className="h-6 w-6 text-[#1a2744]" />
                    <span className="text-lg font-bold text-[#1a2744]">
                      LienFile
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-1 px-4">
                {navLinks.map((link) => (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        className={`rounded-md px-3 py-2.5 text-sm font-medium transition-colors hover:bg-slate-100 ${
                          pathname === link.href
                            ? "text-[#1a2744] bg-slate-50"
                            : "text-slate-600"
                        }`}
                      />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <SheetClose
                    render={
                      <Link
                        href="/file"
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "w-full bg-[#f97316] text-white hover:bg-[#ea580c] font-semibold"
                        )}
                      />
                    }
                  >
                    File a Lien &mdash; $149
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
