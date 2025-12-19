import BlogArea from "./BlogArea";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Breacrumb from "../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import BackToTop from "../common/BackToTop";
import Cta2Area from "../home/Cta2Area";

const Blog = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Blog" subtitle="Blog" />
      <BlogArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Blog;
