import { Link } from "react-router-dom";
import { LOGO } from "../data/constants";

export default function Logo({ className }: any) {
  return (
    <>
      <Link className={className} to="/">
        <img className="dark-logo" src={LOGO.dark} alt="" />
        <img className="light-logo" src={LOGO.light} alt="" />
      </Link>
    </>
  );
}
