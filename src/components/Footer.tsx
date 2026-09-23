import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "../config";
import BrandMark from "./BrandMark";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner section-shell">
        <div className="footer-brand">
          <BrandMark />
          <div><strong>{siteConfig.brand.name}</strong><span>{siteConfig.labels.footerText}</span></div>
        </div>
        <div className="footer-nav">
          <a href="#services">Services</a><a href="#work">Work</a><a href="#about">Approach</a><a href="#contact">Contact</a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.brand.name}</span>
          <a href="#top">Back to top <ArrowUpRight /></a>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">{siteConfig.brand.shortName.toUpperCase()}</div>
    </footer>
  );
}
