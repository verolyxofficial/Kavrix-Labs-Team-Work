import { useRef } from "react";
import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "../config";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        ".hero-copy .eyebrow",
        { y: -30, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.8)" }
      )
        .fromTo(
          ".hero h1",
          { y: 70, opacity: 0, rotateZ: 2 },
          { y: 0, opacity: 1, rotateZ: 0, duration: 1.1, ease: "power4.out" },
          "-=0.5"
        )
        .fromTo(
          ".hero-description",
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".hero-actions .button",
          { y: 30, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.12, duration: 0.7, ease: "back.out(1.5)" },
          "-=0.5"
        )
        .fromTo(
          ".hero-proof div",
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6 },
          "-=0.4"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="hero section-shell" id="top">
      <div className="hero-copy" data-gsap-custom="true">
        <span className="eyebrow">
          <Zap size={13} /> {siteConfig.brand.eyebrow}
        </span>
        <h1>
          {siteConfig.brand.heroTitle}
          <span className="gradient-word"> {siteConfig.brand.heroAccent}</span>
        </h1>
        <p className="hero-description">{siteConfig.brand.heroDescription}</p>
        <div className="hero-actions">
          <a className="button button--primary" href="#contact">
            {siteConfig.labels.primaryCta} <ArrowUpRight />
          </a>
          <a className="button button--ghost" href="#work">
            {siteConfig.labels.secondaryCta} <ArrowDown />
          </a>
        </div>
        <div className="hero-proof" aria-label="Studio capabilities">
          <div>
            <strong>{String(siteConfig.services.length).padStart(2, "0")}</strong>
            <span>service disciplines</span>
          </div>
          <div>
            <strong>01</strong>
            <span>connected creative partner</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>room to adapt</span>
          </div>
        </div>
      </div>
      <HeroMedia />
    </section>
  );
}
