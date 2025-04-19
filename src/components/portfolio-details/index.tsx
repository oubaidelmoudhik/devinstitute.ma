import BackToTop from "../../common/BackToTop";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../home/home/Cta2Area";
import PortfolioDetailsArea from "./PortfolioDetailsArea";

const PortfolioDetails = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Portfolio Details" subtitle="Portfolio" />
      <PortfolioDetailsArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default PortfolioDetails;
