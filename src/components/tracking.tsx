"use client"

import Script from "next/script"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    fbq: (...args: unknown[]) => void
  }
}

export function Tracking() {
  return (
    <>
      {/* Google Ads gtag.js */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-gtag" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {META_PIXEL_ID && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
              alt=""
            />
          </noscript>
        </>
      )}
    </>
  )
}

/**
 * Track a purchase conversion.
 * Call after successful checkout.
 */
export function trackPurchase(value: number) {
  if (typeof window === "undefined") return

  // Google Ads conversion
  if (GA_ID && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: GA_ID,
      value,
      currency: "USD",
    })
  }

  // Meta Pixel purchase
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "Purchase", {
      value,
      currency: "USD",
    })
  }
}

/**
 * Track a lead conversion.
 * Call when a user submits their email (e.g. deadline calculator).
 */
export function trackLead() {
  if (typeof window === "undefined") return

  // Google Ads lead
  if (GA_ID && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: GA_ID,
      event_category: "lead",
    })
  }

  // Meta Pixel lead
  if (META_PIXEL_ID && window.fbq) {
    window.fbq("track", "Lead")
  }
}
