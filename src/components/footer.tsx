import Link from "next/link"

const footerSections = [
  {
    title: "Product",
    links: [
      { href: "/file", label: "File a Lien" },
      { href: "/pricing", label: "Pricing" },
      { href: "/tools", label: "Free Tools" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/blog", label: "Blog" },
      { href: "/state-guides", label: "State Guides" },
      { href: "/how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/disclaimer", label: "Disclaimer" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-[#1a2744] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Link columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-12 border-t border-slate-700 pt-8">
          <p className="text-xs leading-5 text-slate-400">
            LienFile is not a law firm. Documents are generated using AI and
            state-specific legal requirements. Lien laws vary by state. Review
            generated documents for accuracy before filing. Consult a
            construction attorney for complex lien situations.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-6">
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} LienFile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
