import HeroArea from "./HeroArea";
import VideoArea from "./VideoArea";
import MissionArea from "./MissionArea";
// import ServiceArea from "./ServiceArea";
import ProjectArea from "./ProjectArea";
import CategoryArea from "./CategoryArea";
import ProcessArea from "./ProcessArea";
// import TeamArea from "./TeamArea";
// import PriceArea from "./PriceArea";
import FaqArea from "./FaqArea";
// import TestimonialArea from "./TestimonialArea";
// import BlogArea from "./BlogArea";
import HeaderOne from "../../../layouts/headers/HeaderOne";
import FooterOne from "../../../layouts/footers/FooterOne";
import BackToTop from "../../../common/BackToTop";

const HomeTwo = () => {
  return (
    <>
      <HeaderOne style_2={true} />
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
      <FooterOne style_2={true} />
      <BackToTop />
    </>
  );
};

export default HomeTwo;
