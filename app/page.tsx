import type { Metadata } from "next";
import HeroArea from "./src/components/home/HeroArea";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Dev Institute, your trusted web development partner in Morocco. We create modern, responsive websites and web applications.",
  alternates: {
    canonical: "https://devinstitute.ma",
    languages: {
      "en": "https://devinstitute.ma",
      "fr": "https://devinstitute.ma/fr",
      "x-default": "https://devinstitute.ma",
    },
  },
  openGraph: {
    title: "Home | Dev Institute",
    description: "Welcome to Dev Institute, your trusted web development partner in Morocco.",
    url: "https://devinstitute.ma",
  },
};

export const dynamic = 'force-dynamic';
import VideoArea from "./src/components/home/VideoArea";
import MissionArea from "./src/components/home/MissionArea";
// import ServiceArea from "./ServiceArea";
import ProjectArea from "./src/components/home/ProjectArea";
import CategoryArea from "./src/components/home/CategoryArea";
import ProcessArea from "./src/components/home/ProcessArea";
// import TeamArea from "./TeamArea";
// import PriceArea from "./PriceArea";
import FaqArea from "./src/components/home/FaqArea";
// import TestimonialArea from "./TestimonialArea";
// import BlogArea from "./BlogArea";

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