interface SeoProps {
  title: string
  description: string
  url: string
  type?: string
  breadcrumbs?: { name: string; url: string }[]
}

export function Seo({ title, description, url, type, breadcrumbs }: SeoProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LienFile",
    url: "https://lienfile.io",
    logo: "https://lienfile.io/logo.png",
    description:
      "AI-powered mechanic's lien filing for contractors and subcontractors.",
    sameAs: [],
  }

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": type || "WebPage",
    name: title,
    description,
    url,
    publisher: {
      "@type": "Organization",
      name: "LienFile",
    },
  }

  const schemas: object[] = [organizationSchema, webPageSchema]

  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    }
    schemas.push(breadcrumbSchema)
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
