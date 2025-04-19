import BackToTop from "../../common/BackToTop";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../home/Cta2Area";
import ContactArea from "./ContactArea";

const Contact = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Contact us" subtitle="Contact" />
      <ContactArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Contact;
