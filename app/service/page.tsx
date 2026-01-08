import type { Metadata } from "next";
import Service from "../../components/service";

export const metadata: Metadata = {
  title: "Professional Web Development Services | Dev Agency",
  description: "Discover our comprehensive web development services including online presence setup, website design & UX, web development, local SEO, e-commerce solutions, and maintenance. Build your business online with Dev Agency in Morocco.",
  keywords: ["web development", "website design", "SEO", "e-commerce", "online presence", "Morocco", "web maintenance"],
  alternates: {
    canonical: "https://devagency.ma/services",
    languages: {
      en: "https://devagency.ma/services",
      fr: "https://devagency.ma/fr/services",
      "x-default": "https://devagency.ma/services",
    },
  },
  openGraph: {
    title: "Professional Web Development Services | Dev Agency",
    description: "Discover our comprehensive web development services including online presence setup, website design & UX, web development, local SEO, e-commerce solutions, and maintenance. Build your business online with Dev Agency in Morocco.",
    url: "https://devagency.ma/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional Web Development Services | Dev Agency",
    description: "Discover our comprehensive web development services including online presence setup, website design & UX, web development, local SEO, e-commerce solutions, and maintenance. Build your business online with Dev Agency in Morocco.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ServicesPage() {
  return <Service />;
}
