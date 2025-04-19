import BackToTop from "../../common/BackToTop";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../home/home/Cta2Area";
import ServiceDetailsArea from "./ServiceDetailsArea";

const ServiceDetails = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Service Details" subtitle="Service Details" />
      <ServiceDetailsArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default ServiceDetails;
