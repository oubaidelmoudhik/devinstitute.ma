"use client";

import React from "react";
import HeaderOne from "./src/layouts/headers/HeaderOne";
import FooterOne from "./src/layouts/footers/FooterOne";
import ScrollToTop from "./src/common/ScrollToTop";
import BackToTop from "./src/common/BackToTop";
import ClientProviders from "./ClientProviders";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
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