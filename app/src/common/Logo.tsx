import Link from "next/link";
import { LOGO } from "../data/constants";

export default function Logo({ className }: any) {
  return (
    <>
      <Link className={className} href="/">
        <img className="dark-logo" src={LOGO.dark} alt="" />
        <img className="light-logo" src={LOGO.light} alt="" />
      </Link>
    </>
  );
}
