import Cta2Area from "../home/Cta2Area";
import PricingPlanArea from "./PricingPlanArea";
import FaqArea from "../home/FaqArea";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../common/BackToTop";

const PricingPlan = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Pricing Plan" subtitle="Pricing Plan" />
      <PricingPlanArea />
      <FaqArea style_2={true} />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default PricingPlan;
