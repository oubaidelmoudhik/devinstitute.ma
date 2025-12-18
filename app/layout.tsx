import "bootstrap/dist/css/bootstrap.min.css";
import "./src/style.scss";
import "animate.css";

import React from "react";
import ClientLayout from "./ClientLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://devinstitute.ma"),
  title: {
    default: "Dev Institute – Web Development Agency in Morocco",
    template: "%s | Dev Institute",
  },
  description: "Professional web development services in Morocco. We create modern, responsive websites and web applications for businesses.",
  keywords: ["web development", "Morocco", "website design", "web applications"],
  authors: [{ name: "Dev Institute" }],
  creator: "Dev Institute",
  publisher: "Dev Institute",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Dev Institute",
    title: "Dev Institute – Web Development Agency in Morocco",
    description: "Professional web development services in Morocco. We create modern, responsive websites and web applications for businesses.",
    url: "https://devinstitute.ma",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Institute – Web Development Agency in Morocco",
    description: "Professional web development services in Morocco. We create modern, responsive websites and web applications for businesses.",
    creator: "@devinstitute",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Unbounded:wght@200..900&display=swap"
        />
      </head>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
