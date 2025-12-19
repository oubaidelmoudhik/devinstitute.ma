"use client";

import { initGA } from "@/app/ga";
import { useEffect } from "react";

export default function ClientInitializer() {
  useEffect(() => {
    initGA();
    // @ts-ignore
    import("wowjs").then((WOW) => {
      new WOW.default.WOW().init();
    });
  }, []);

  return null;
}
