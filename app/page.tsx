import CategoryArea from "@/components/home/CategoryArea";
import FaqArea from "@/components/home/FaqArea";
import HeroArea from "@/components/home/HeroArea";
import MissionArea from "@/components/home/MissionArea";
import ProcessArea from "@/components/home/ProcessArea";
import ProjectArea from "@/components/home/ProjectArea";
import VideoArea from "@/components/home/VideoArea";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Welcome to Dev Institute, your trusted web development partner in Morocco. We create modern, responsive websites and web applications.",
  alternates: {
    canonical: "https://devinstitute.ma",
    languages: {
      en: "https://devinstitute.ma",
      fr: "https://devinstitute.ma/fr",
      "x-default": "https://devinstitute.ma",
    },
  },
  openGraph: {
    title: "Home | Dev Institute",
    description:
      "Welcome to Dev Institute, your trusted web development partner in Morocco.",
    url: "https://devinstitute.ma",
  },
};

export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <>
      <HeroArea />
      <VideoArea />
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
