import { ArrowDown, ArrowUpRight, Zap } from "lucide-react";
import { siteConfig } from "../config";
import HeroMedia from "./HeroMedia";

export default function Hero() {
  return (
    <section className="hero section-shell" id="top">
      <div className="hero-copy reveal">
        <span className="eyebrow"><Zap size={13} /> {siteConfig.brand.eyebrow}</span>
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
          <div><strong>10</strong><span>service disciplines</span></div>
          <div><strong>01</strong><span>connected creative partner</span></div>
          <div><strong>∞</strong><span>room to adapt</span></div>
        </div>
      </div>
      <HeroMedia />
    </section>
  );
}
