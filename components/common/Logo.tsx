 import { LOGO } from "@/data/constants";
import Link from "next/link";
import Image from "next/image";

export default function Logo({ className }: any) {
  return (
    <>
      <Link className={className} href="/">
        <Image className="dark-logo" src={LOGO.dark} alt="Dev Institute Logo" width={200} height={50} priority />
        <Image className="light-logo" src={LOGO.light} alt="Dev Institute Logo" width={200} height={50} priority />
      </Link>
    </>
  );
}
