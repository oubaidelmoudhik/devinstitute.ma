"use client";

import React, { useEffect } from "react";
import HeaderOne from "./src/layouts/headers/HeaderOne";
import FooterOne from "./src/layouts/footers/FooterOne";
import ScrollToTop from "./src/common/ScrollToTop";
import BackToTop from "./src/common/BackToTop";
import ClientProviders from "./ClientProviders";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Import Bootstrap JS for navbar collapse functionality on client side only
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <ClientProviders>
      <HeaderOne style_2={true} />
      <main>
        {children}
      </main>
      <FooterOne style_2={true} />
      <ScrollToTop />
      <BackToTop />
    </ClientProviders>
  );
}