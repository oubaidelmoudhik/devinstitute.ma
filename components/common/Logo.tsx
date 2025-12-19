import { LOGO } from "@/data/constants";
import Link from "next/link";

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
