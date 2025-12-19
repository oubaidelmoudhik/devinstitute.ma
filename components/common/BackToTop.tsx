
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const BackToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]); // Runs on route change

  return null; // No UI needed
};

export default BackToTop;
