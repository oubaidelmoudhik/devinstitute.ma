import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../../common/BackToTop";
import VideoArea from "../home/VideoArea";
import TeamArea from "../team/TeamArea";
import TestimonialArea from "../home/TestimonialArea";
import Cta2Area from "../home/Cta2Area";
const Aboutus = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb titleKey="page_title_about_us" subtitleKey="about_menu" />
      <VideoArea style_2={true} />
      <TeamArea />
      <TestimonialArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Aboutus;
