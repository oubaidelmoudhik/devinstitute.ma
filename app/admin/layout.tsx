"use client"

import { useEffect, useRef } from "react"
import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  const prevClass = useRef("")

  useEffect(() => {
    // Save the current body class to restore on leave
    prevClass.current = document.body.className

    // Ensure admin pages stay dark (remove light-mode if present)
    const enforceDark = () => {
      if (document.body.classList.contains("light-mode")) {
        document.body.classList.remove("light-mode")
      }
    }

    enforceDark()

    // Watch for theme toggles while on admin page
    const observer = new MutationObserver(() => enforceDark())
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] })

    return () => {
      observer.disconnect()
      // Restore saved body class when leaving admin
      document.body.className = prevClass.current
    }
  }, [])

  return <>{children}</>
}
