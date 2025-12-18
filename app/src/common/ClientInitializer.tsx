"use client";

import { useEffect } from "react";
import { initGA } from "../ga";

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