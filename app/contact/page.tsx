import type { Metadata } from "next";
import Breacrumb from "../../components/common/Breacrumb";
import Cta2Area from "../../components/home/Cta2Area";
import ContactArea from "../../components/contact/ContactArea";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Dev Institute for your web development needs. Contact our team in Morocco for professional website development services.",
  alternates: {
    canonical: "https://devagency.ma/contact",
    languages: {
      en: "https://devagency.ma/contact",
      fr: "https://devagency.ma/fr/contact",
      "x-default": "https://devagency.ma/contact",
    },
  },
  openGraph: {
    title: "Contact Us | Dev Institute",
    description:
      "Get in touch with Dev Institute for your web development needs.",
    url: "https://devagency.ma/contact",
  },
};

export const dynamic = "force-dynamic";

const Contact = () => {
  return (
    <>
      <Breacrumb
        titleKey="title_2"
        subtitleKey="title_3"
        isMainHeading={true}
        background="/assets/img/bg-img/services.png"
      />
      <ContactArea />
      <Cta2Area />
    </>
  );
};

export default Contact;
