 
 
import BackToTop from '../../common/BackToTop';
import Breacrumb from '../../common/Breacrumb';
import FooterOne from '../../layouts/footers/FooterOne';
import HeaderOne from '../../layouts/headers/HeaderOne';
import Cta2Area from '../homes/home/Cta2Area'; 
import TeamDetailsArea from './TeamDetailsArea';

const TeamDetails = () => {
  return (
    <>
      <HeaderOne />
      <Breacrumb title="Expert Team" subtitle="Team" />
      <TeamDetailsArea /> 
      <Cta2Area />
      <FooterOne />
      <BackToTop />
    </>
  );
};

export default TeamDetails;