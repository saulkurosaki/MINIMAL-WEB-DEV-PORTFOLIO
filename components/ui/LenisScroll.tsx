"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LenisScroll = () => {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on("scroll", (e: any) => {
      console.log(e);
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
};

export default LenisScroll;
