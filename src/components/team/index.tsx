
 
import TeamArea from './TeamArea'; 
import Cta2Area from '../homes/home/Cta2Area'; 
import CategoryArea from '../homes/home-2/CategoryArea';
import TestimonialArea from '../homes/home-2/TestimonialArea';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Breacrumb from '../../common/Breacrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import BackToTop from '../../common/BackToTop';

const Team = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Expert Team" subtitle="Team" />
      <TeamArea />
      <CategoryArea />
      <TestimonialArea />
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default Team;