import type { CSSProperties } from "react";
import { siteConfig } from "./config";
import usePageEffects from "./hooks/usePageEffects";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  usePageEffects();

  const themeStyle = {
    "--accent": siteConfig.theme.accent,
    "--accent-2": siteConfig.theme.accent2,
    "--background": siteConfig.theme.background,
    "--surface": siteConfig.theme.surface,
    "--text": siteConfig.theme.text,
    "--muted": siteConfig.theme.muted,
  } as CSSProperties;

  return (
    <div className="app" style={themeStyle}>
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="scroll-progress" aria-hidden="true" />
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="cursor-glow" aria-hidden="true" />
      <Header />
      <main id="main">
        <Hero />
        <Marquee />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
