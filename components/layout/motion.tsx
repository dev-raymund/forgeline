"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

/**
 * Site-wide motion, after the owner's portfolio: Lenis smooth scrolling,
 * a short hero entrance (headline lines, then the photo tiles), ghost words
 * that drift sideways as you scroll, and blocks marked `data-reveal` that
 * fade up once when they enter the viewport.
 *
 * Everything is skipped when the visitor asks for reduced motion, and all
 * tweens are created after hydration and reverted on route change, so the
 * server HTML stays fully visible without JavaScript.
 */
export function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: 0.12 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const ease = "power3.out";

      const title = document.querySelector("[data-hero-title]");
      if (title) {
        gsap.from(title, { y: 28, opacity: 0, duration: 1, ease });
        gsap.from("[data-tile]", {
          y: 40,
          opacity: 0,
          duration: 1.1,
          ease,
          stagger: 0.08,
          delay: 0.15,
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-ghost]").forEach((word) => {
        gsap.fromTo(
          word,
          { xPercent: 4 },
          {
            xPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: word.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((block) => {
        gsap.from(block, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease,
          scrollTrigger: { trigger: block, start: "top 88%", once: true },
        });
      });
    });

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [pathname]);

  return null;
}
