"use client";

import React, { useEffect } from "react";
import FooterOne from "@/layouts/footers/FooterOne";
import ClientProviders from "./ClientProviders";
import HeaderOne from "@/layouts/headers/HeaderOne";
import ScrollToTop from "@/hooks/scroll-to-top";
import BackToTop from "@/components/common/BackToTop";
import GoogleAnalytics from "@/components/common/GoogleAnalytics";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Load full CSS files asynchronously (non-render-blocking)
    const stylesheets = [
      "/assets/css/bootstrap.min.css",
      "/assets/css/style.css",
    ];
    stylesheets.forEach((href) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = href;
      document.head.appendChild(link);
    });

    // Import Bootstrap JS for navbar collapse functionality on client side only
    // @ts-ignore - Bootstrap JS bundle doesn't have type definitions
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    // @ts-ignore
    import("animate.css");
  }, []);

  return (
    <ClientProviders>
      <GoogleAnalytics />
      <HeaderOne style_2={true} />
      <main>{children}</main>
      <FooterOne style_2={true} />
      <ScrollToTop />
      <BackToTop />
    </ClientProviders>
  );
}
