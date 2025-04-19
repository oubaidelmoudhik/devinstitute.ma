import BackToTop from "../../common/BackToTop";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../home/home/Cta2Area";
import BlogDetailsArea from "./BlogDetailsArea";

const BlogDetails = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Blog Details" subtitle="Blog Details" />
      <BlogDetailsArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default BlogDetails;
