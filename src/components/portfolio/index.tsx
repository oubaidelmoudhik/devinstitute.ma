 
import BackToTop from "../../common/BackToTop";
import Breacrumb from "../../common/Breacrumb";
import FooterOne from "../../layouts/footers/FooterOne";
import HeaderOne from "../../layouts/headers/HeaderOne";
import Cta2Area from "../homes/home/Cta2Area"; 
import PortfolioArea from "./PortfolioArea";

const Portfolio = () => {
	return (
		<>
			<HeaderOne />
			<Breacrumb title="Portfolio" subtitle="Portfolio" />
			<PortfolioArea />
			<Cta2Area />
			<FooterOne />
			<BackToTop />
		</>
	);
};

export default Portfolio;
