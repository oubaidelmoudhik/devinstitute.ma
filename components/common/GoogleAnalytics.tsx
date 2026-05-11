"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import ReactGA from "react-ga4"

const GoogleAnalytics = () => {
  const pathname = usePathname()

  useEffect(() => {
    ReactGA.initialize(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!)
  }, [])

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: pathname })
  }, [pathname])

  return null
}

export default GoogleAnalytics
