import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Nav } from "@/components/nav"
import { UrgencyBar } from "@/components/urgency-bar"
import { Footer } from "@/components/footer"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    template: "%s | LienFile - Mechanic's Lien Filing",
    default: "LienFile - Mechanic's Lien Filing",
  },
  description:
    "File a mechanic's lien to protect your right to payment. AI-powered, state-specific lien documents for contractors and subcontractors.",
  metadataBase: new URL("https://lienfile.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lienfile.io",
    siteName: "LienFile",
    title: "LienFile - Mechanic's Lien Filing",
    description:
      "File a mechanic's lien to protect your right to payment. AI-powered, state-specific lien documents for contractors and subcontractors.",
  },
  twitter: {
    card: "summary_large_image",
    title: "LienFile - Mechanic's Lien Filing",
    description:
      "File a mechanic's lien to protect your right to payment. AI-powered, state-specific lien documents for contractors and subcontractors.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Plausible Analytics */}
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
          />
        )}

        {/* Google Ads gtag.js */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col font-sans text-slate-800">
        <Nav />
        <UrgencyBar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
