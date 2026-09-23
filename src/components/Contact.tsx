import { useState } from "react";
import { ArrowUpRight, Check, Send } from "lucide-react";
import { siteConfig } from "../config";
import ConnectCard from "./ConnectCard";

export default function Contact() {
  const [copied, setCopied] = useState<"idle" | "copied" | "error">("idle");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied("copied");
    } catch {
      setCopied("error");
    }
    window.setTimeout(() => setCopied("idle"), 1800);
  };

  return (
    <section className="section section-shell contact-section" id="contact">
      <div className="contact-hero reveal">
        <span className="eyebrow">Start a conversation</span>
        <h2>{siteConfig.labels.contactTitle}</h2>
        <p>{siteConfig.labels.contactSubtitle}</p>
        <a className="contact-email" href={`mailto:${siteConfig.contact.email}`}>
          <span>{siteConfig.contact.email}</span><ArrowUpRight />
        </a>
        <div className="contact-actions">
          <a className="button button--primary" href={`mailto:${siteConfig.contact.email}`}><Send /> Email Kavrix Labs</a>
          <button className="button button--ghost" type="button" onClick={copyEmail}>
            {copied === "copied" ? <><Check /> Copied</> : copied === "error" ? "Copy failed" : "Copy email"}
          </button>
        </div>
      </div>
      <div className="contact-aside reveal reveal-right">
        <div className="availability"><span className="live-dot" /> Currently taking selected projects</div>
        <div className="contact-detail"><span>Best first step</span><strong>Email with a short brief</strong></div>
        <div className="contact-detail"><span>Useful to include</span><strong>Scope · deadline · references</strong></div>
        <div className="contact-detail"><span>Response route</span><strong>Email first, then the channel that fits the project</strong></div>
        <p className="contact-note">Email is still the cleanest first step. The card below keeps the social, WhatsApp, and call-request routes together in one place.</p>
      </div>
      <ConnectCard />
    </section>
  );
}
