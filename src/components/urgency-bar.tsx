"use client"

import { useState } from "react"
import { AlertTriangle, X } from "lucide-react"

export function UrgencyBar() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="sticky top-16 z-40 bg-[#f97316] text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-medium">
          <AlertTriangle className="h-4 w-4 shrink-0" />
          <span>
            Lien deadlines are strict and vary by state. Missing your deadline
            means losing your right to payment.
          </span>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="shrink-0 rounded-sm p-0.5 hover:bg-white/20 transition-colors"
          aria-label="Dismiss deadline warning"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
