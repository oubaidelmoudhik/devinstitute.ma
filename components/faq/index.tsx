import FaqsArea from "./FaqsArea";
import Cta2Area from "../home/Cta2Area";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../common/BackToTop";

const Faq = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Faq" subtitle="Faq" />
      <FaqsArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Faq;
