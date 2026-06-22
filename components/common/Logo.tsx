import { LOGO } from "@/data/constants";
import Link from "next/link";
import Image from "next/image";

export default function Logo({ className }: any) {
  return (
    <>
      <Link className={className} href="/">
        <Image
          className="dark-logo"
          src={LOGO.dark}
          alt="Dev Agency Logo"
          width={200}
          height={92}
          priority
        />
        <Image
          className="light-logo"
          src={LOGO.light}
          alt="Dev Agency Logo"
          width={200}
          height={94}
          priority
        />
      </Link>
    </>
  );
}
