import type { Metadata } from "next";
import Breacrumb from "../src/common/Breacrumb";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Dev Institute for your web development needs. Contact our team in Morocco for professional website development services.",
  alternates: {
    canonical: "https://devinstitute.ma/contact",
    languages: {
      "en": "https://devinstitute.ma/contact",
      "fr": "https://devinstitute.ma/fr/contact",
      "x-default": "https://devinstitute.ma/contact",
    },
  },
  openGraph: {
    title: "Contact Us | Dev Institute",
    description: "Get in touch with Dev Institute for your web development needs.",
    url: "https://devinstitute.ma/contact",
  },
};

export const dynamic = 'force-dynamic';
import Cta2Area from "../src/components/home/Cta2Area";
import ContactArea from "../src/components/contact/ContactArea";

const Contact = () => {
  return (
    <>
      <Breacrumb titleKey="page_title_contact_us" subtitleKey="page_title_contact" isMainHeading={true} />
      <ContactArea />
      <Cta2Area />
    </>
  );
};

export default Contact;