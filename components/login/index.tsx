import BackToTop from "../common/BackToTop";
import Breacrumb from "../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../home/Cta2Area";
import LoginArea from "./LoginArea";

const Login = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Login" subtitle="Login" />
      <LoginArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Login;
