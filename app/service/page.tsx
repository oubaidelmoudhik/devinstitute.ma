import type { Metadata } from "next";
import Service from "../../components/service";

export const metadata: Metadata = {
  title: "Services",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ServicesPage() {
  return <Service />;
}
