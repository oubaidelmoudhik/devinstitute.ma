import ServiceArea from "./ServiceArea";
import ServiceAbout from "./ServiceAbout";
import PriceArea from "../home/PriceArea";
import Cta2Area from "../home/Cta2Area";
import HeaderOne from "../../layouts/headers/HeaderOne";
import FooterOne from "../../layouts/footers/FooterOne";
import Breacrumb from "../common/Breacrumb";
import BackToTop from "../common/BackToTop";

const Service = () => {
  return (
    <>
      <HeaderOne style_2 />
      <Breacrumb
        title="Services"
        subtitle="Services"
        background="/assets/img/bg-img/services.png"
        isMainHeading={true}
      />
      <ServiceArea />
      <ServiceAbout />
      <Cta2Area />
      <BackToTop />
    </>
  );
};

export default Service;
