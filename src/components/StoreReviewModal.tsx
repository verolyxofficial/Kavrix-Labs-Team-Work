import { useEffect, useRef } from "react";
import { X, ExternalLink, Check, Layers, Cpu, TrendingUp, Sparkles, Smartphone, ShieldCheck } from "lucide-react";
import { siteConfig } from "../config";

export type ProjectItem = (typeof siteConfig.portfolio)[number];

interface StoreReviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export default function StoreReviewModal({ project, onClose }: StoreReviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const originalOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;
      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (element) => !element.hasAttribute("disabled") && element.getAttribute("aria-hidden") !== "true",
      );
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const { review, scorecard } = {
    review: project.review,
    scorecard: project.review?.scorecard ?? { mobileUx: "98%", architecture: "Production", coreWebVitals: "Optimized" },
  };

  return (
    <div
      className="store-modal-backdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="store-modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-modal-title"
        aria-describedby="store-modal-description"
        tabIndex={-1}
      >
        <div className="store-modal-header">
          <div className="store-modal-brand-badge">
            <span className="live-status-dot" />
            <span>{project.category} · {project.type}</span>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="store-modal-close"
            onClick={onClose}
            aria-label="Close store review"
          >
            <X size={20} />
          </button>
        </div>

        <div className="store-modal-hero">
          <div className="store-modal-image-wrap">
            <img src={project.image} alt={project.imageAlt} />
            <div className="store-modal-image-overlay" />
          </div>
          <div className="store-modal-title-group">
            <h2 id="store-modal-title">{project.title}</h2>
            <p id="store-modal-description" className="store-modal-desc">{project.description}</p>
            <div className="store-modal-actions">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="button button--primary store-live-link"
              >
                <span>Visit Live Flagship</span>
                <ExternalLink size={16} />
              </a>
              <span className="store-url-label">{project.credit}</span>
            </div>
          </div>
        </div>

        <div className="store-scorecard">
          <div className="scorecard-item">
            <Smartphone size={16} className="scorecard-icon" />
            <div>
              <span className="scorecard-label">Mobile Experience</span>
              <strong className="scorecard-value">{scorecard.mobileUx}</strong>
            </div>
          </div>
          <div className="scorecard-item">
            <Cpu size={16} className="scorecard-icon" />
            <div>
              <span className="scorecard-label">System Architecture</span>
              <strong className="scorecard-value">{scorecard.architecture}</strong>
            </div>
          </div>
          <div className="scorecard-item">
            <ShieldCheck size={16} className="scorecard-icon" />
            <div>
              <span className="scorecard-label">Core Web Vitals</span>
              <strong className="scorecard-value">{scorecard.coreWebVitals}</strong>
            </div>
          </div>
        </div>

        <div className="store-review-body">
          <div className="review-section">
            <div className="review-section-heading">
              <Sparkles size={16} />
              <h3>Objective & Strategy</h3>
            </div>
            <p className="review-text">{review.clientGoal}</p>
          </div>

          <div className="review-section">
            <div className="review-section-heading">
              <Layers size={16} />
              <h3>Engineering & Tech Stack</h3>
            </div>
            <div className="tech-badge-wrap">
              {review.techStack.map((tech) => (
                <span key={tech} className="tech-badge">{tech}</span>
              ))}
            </div>
          </div>

          <div className="review-section">
            <div className="review-section-heading">
              <Cpu size={16} />
              <h3>Key Features Engineered</h3>
            </div>
            <ul className="engineered-features-list">
              {review.featuresEngineered.map((feature) => (
                <li key={feature} className="engineered-feature-item">
                  <div className="feature-check"><Check size={14} /></div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="review-section review-impact-box">
            <div className="review-section-heading">
              <TrendingUp size={16} />
              <h3>Results & Conversion Impact</h3>
            </div>
            <p className="review-text">{review.performanceImpact}</p>
          </div>
        </div>

        <div className="store-modal-footer">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="button button--primary"
          >
            <span>Explore {project.title} Live</span>
            <ExternalLink size={16} />
          </a>
          <button type="button" className="button button--ghost" onClick={onClose}>
            Back to All Stores
          </button>
        </div>
      </div>
    </div>
  );
}
