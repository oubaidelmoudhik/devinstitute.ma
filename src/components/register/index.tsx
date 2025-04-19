import BackToTop from "../../common/BackToTop";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../home/Cta2Area";
import RegisterArea from "./RegisterArea";

const Register = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Register" subtitle="Register" />
      <RegisterArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Register;
