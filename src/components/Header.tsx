import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { siteConfig } from "../config";
import BrandMark from "./BrandMark";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const close = () => setOpen(false);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("resize", close);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("resize", close);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const nav = [
    ["Services", "#services"],
    ["Work", "#work"],
    ["Approach", "#about"],
    ["Contact", "#contact"],
  ] as const;

  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label={`${siteConfig.brand.name} home`} onClick={() => setOpen(false)}>
        <BrandMark compact />
        <span>{siteConfig.brand.name}</span>
      </a>
      <nav id="primary-navigation" className={`nav ${open ? "is-open" : ""}`} aria-label="Primary navigation">
        {nav.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            <span>{label}</span>
          </a>
        ))}
        <a className="nav-mobile-cta" href={`mailto:${siteConfig.contact.email}`} onClick={() => setOpen(false)}>
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
      </nav>
      <div className="header-actions">
        <a className="header-cta" href={`mailto:${siteConfig.contact.email}`}>
          Let&apos;s talk <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-button"
          type="button"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          aria-controls="primary-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
