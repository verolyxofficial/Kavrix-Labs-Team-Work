import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Send, AlertCircle, Clock, CheckCircle2, ShieldCheck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "../config";
import ConnectCard from "./ConnectCard";

gsap.registerPlugin(ScrollTrigger);

// Automated email delivery:
// Submissions are routed to siteConfig.contact.email (kavrixlabs@gmail.com) via FormSubmit AJAX.
// The first time a form is submitted, FormSubmit sends a 1-click activation link to your inbox.
// Once confirmed, all future website briefs arrive instantly in your inbox!

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState<"idle" | "copied" | "error">("idle");
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    service: string;
    message: string;
  }>({
    name: "",
    email: "",
    service: siteConfig.services[0]?.title || "Video Editing",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          once: true,
        },
      });

      tl.fromTo(
        ".contact-hero",
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".contact-form-card",
          { opacity: 0, x: 40 },
          { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".connect-project-card",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" },
          "-=0.45"
        );
    },
    { scope: containerRef }
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
      setCopied("copied");
    } catch {
      setCopied("error");
    }
    window.setTimeout(() => setCopied("idle"), 1800);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      // Sends emails directly to siteConfig.contact.email (kavrixlabs@gmail.com)
      const response = await fetch(`https://formsubmit.co/ajax/${siteConfig.contact.email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          Name: formData.name,
          Email: formData.email,
          Service: formData.service,
          Message: formData.message,
          _subject: `New Project Inquiry: ${formData.service} from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = await response.json().catch(() => ({}));
      if (response.ok || result.success === "true" || result.success === true) {
        setFormStatus("success");
        setStatusMessage("Thank you! Your brief has been sent directly to our team. We will respond within 24 hours.");
        setFormData({ name: "", email: "", service: siteConfig.services[0]?.title || "Video Editing", message: "" });
      } else {
        // Fallback: opens pre-filled email client
        const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name}`);
        const body = encodeURIComponent(
          `Hi Kavrix Labs,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Brief:\n${formData.message}\n`
        );
        window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
        setFormStatus("success");
        setStatusMessage("Your email draft has been prepared with your inquiry! We will respond within 24 hours.");
      }
    } catch {
      // Fallback on network issues
      const subject = encodeURIComponent(`Project Inquiry: ${formData.service} — ${formData.name}`);
      const body = encodeURIComponent(
        `Hi Kavrix Labs,\n\nName: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nProject Brief:\n${formData.message}\n`
      );
      window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
      setFormStatus("success");
      setStatusMessage("Your email draft has been prepared with your inquiry! We will respond within 24 hours.");
    }
  };

  return (
    <section ref={containerRef} className="section section-shell contact-section" id="contact" data-gsap-custom="true">
      {/* Left Column: Direct Info & Highlights */}
      <div className="contact-hero">
        <div className="availability">
          <span className="live-dot" /> Currently taking selected projects
        </div>

        <span className="eyebrow" style={{ marginTop: ".75rem" }}>Start a conversation</span>
        <h2>{siteConfig.labels.contactTitle}</h2>
        <p>{siteConfig.labels.contactSubtitle}</p>

        <a className="contact-email" href={`mailto:${siteConfig.contact.email}`}>
          <span>{siteConfig.contact.email}</span>
          <ArrowUpRight />
        </a>

        <div className="contact-actions">
          <a className="button button--primary" href={`mailto:${siteConfig.contact.email}`}>
            <Send size={15} /> Direct Email
          </a>
          <button className="button button--ghost" type="button" onClick={copyEmail}>
            {copied === "copied" ? <><Check size={15} /> Copied</> : copied === "error" ? "Copy failed" : "Copy email"}
          </button>
        </div>

        <div className="contact-highlights-list">
          <div className="contact-highlight-item">
            <CheckCircle2 size={16} />
            <div>
              <strong>Fast 24h Turnaround</strong>
              <span>Replies and project scopes delivered promptly</span>
            </div>
          </div>
          <div className="contact-highlight-item">
            <CheckCircle2 size={16} />
            <div>
              <strong>Transparent Scoping</strong>
              <span>Clear milestones, deliverables, and timelines</span>
            </div>
          </div>
          <div className="contact-highlight-item">
            <CheckCircle2 size={16} />
            <div>
              <strong>Direct Collaboration</strong>
              <span>Work directly with creators and front-end developers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Redesigned Interactive Email Form */}
      <div className="contact-aside contact-form-card">
        <div className="contact-form-header">
          <div className="form-badge">
            <Clock size={12} />
            <span>Average response: ~24 hours</span>
          </div>
          <h3>Send a Project Brief</h3>
          <p>Fill out the details below and we&apos;ll get back to you with ideas, scope, and next steps.</p>
        </div>

        {formStatus === "success" ? (
          <div className="form-status-alert form-status-success">
            <Check size={18} />
            <div>
              <strong>Inquiry Received!</strong>
              <p>{statusMessage}</p>
              <button
                type="button"
                className="button button--ghost"
                style={{ marginTop: "1rem", fontSize: ".72rem", padding: ".4rem .8rem" }}
                onClick={() => setFormStatus("idle")}
              >
                Send another message
              </button>
            </div>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit}>
            {formStatus === "error" && (
              <div className="form-status-alert form-status-error">
                <AlertCircle size={16} />
                <span>{statusMessage}</span>
              </div>
            )}

            <div className="form-row-2col">
              <div className="form-field">
                <label htmlFor="contact-name">Your Name / Company</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Jenkins"
                />
              </div>

              <div className="form-field">
                <label htmlFor="contact-email">Email Address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="contact-service">Service Needed</label>
              <div className="select-wrap">
                <select
                  id="contact-service"
                  name="service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  {siteConfig.services.map((svc) => (
                    <option key={svc.title} value={svc.title}>
                      {svc.title}
                    </option>
                  ))}
                  <option value="General Inquiry / Other">General Inquiry / Other</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <label htmlFor="contact-message">Project Brief / Message</label>
                <span className="field-hint">Scope, deadline or references</span>
              </div>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Briefly describe what you want to achieve, any deadline, or references..."
              />
            </div>

            <button
              type="submit"
              className="button button--primary form-submit-btn"
              disabled={formStatus === "submitting"}
            >
              {formStatus === "submitting" ? (
                <>Sending inquiry...</>
              ) : (
                <>
                  <Send size={15} /> Send Project Inquiry
                </>
              )}
            </button>

            <div className="form-privacy-note">
              <ShieldCheck size={14} />
              <span>Delivered directly to {siteConfig.contact.email} · No spam, guaranteed</span>
            </div>
          </form>
        )}
      </div>

      <ConnectCard />
    </section>
  );
}
