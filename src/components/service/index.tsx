import ServiceArea from "./ServiceArea";
import ServiceAbout from "./ServiceAbout";
import PriceArea from "../home/home-2/PriceArea";
import Cta2Area from "../home/home/Cta2Area";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../../common/BackToTop";

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
