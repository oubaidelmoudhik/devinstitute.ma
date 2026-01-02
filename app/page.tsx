import CategoryArea from "@/components/home/CategoryArea";
import FaqArea from "@/components/home/FaqArea";
import HeroArea from "@/components/home/HeroArea";
import MissionArea from "@/components/home/MissionArea";
import ProcessArea from "@/components/home/ProcessArea";
import ProjectArea from "@/components/home/ProjectArea";
import UnderHero from "@/components/home/UnderHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Dev Institute, your trusted web development partner in Morocco. We create modern, responsive websites and web applications.",
  alternates: {
    canonical: "https://devagency.ma",
    languages: {
      en: "https://devagency.ma",
      fr: "https://devagency.ma/fr",
      "x-default": "https://devagency.ma",
    },
  },
  openGraph: {
    title: "Home | Dev Institute",
    description:
      "Welcome to Dev Institute, your trusted web development partner in Morocco.",
    url: "https://devagency.ma",
  },
};

export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <>
      <HeroArea />
      <UnderHero />
      <MissionArea />
      {/* <ServiceArea /> */}
      <ProjectArea />
      <CategoryArea />
      <ProcessArea />
      {/* <TeamArea /> */}
      <FaqArea />
      {/* <PriceArea /> */}
      {/* <TestimonialArea /> */}
      {/* <BlogArea /> */}
    </>
  );
};

export default Home;
