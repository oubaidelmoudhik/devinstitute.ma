import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../common/BackToTop";
import UnderHero from "../home/UnderHero";
import TeamArea from "../team/TeamArea";
import TestimonialArea from "../home/TestimonialArea";
import Cta2Area from "../home/Cta2Area";
const Aboutus = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb titleKey="title_1" subtitleKey="page_3" />
      <UnderHero style_2={true} />
      <TeamArea />
      <TestimonialArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Aboutus;
