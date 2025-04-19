import Cta2Area from "../home/home/Cta2Area";
import AboutArea from "../home/home/AboutArea";
import VideoArea from "../home/home-2/VideoArea";
import WorkprocessArea from "../home/home/WorkprocessArea";
import VideoAreaHomeOne from "../home/home/VideoAreaHomeOne";
import TeamArea from "../home/home-2/TeamArea";
import TestimonialArea from "../home/home-2/TestimonialArea";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../../common/BackToTop";
const Aboutus = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="About us" subtitle="About" />
      <AboutArea />
      <VideoArea style_2={true} />
      <WorkprocessArea />
      <VideoAreaHomeOne />
      <TeamArea />
      <TestimonialArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Aboutus;
