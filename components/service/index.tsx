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
      <HeaderOne />
      <Breacrumb title="Services" subtitle="Services" />
      <ServiceArea />
      <ServiceAbout />
      <PriceArea style_2={true} />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Service;
