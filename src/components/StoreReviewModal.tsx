import { useEffect } from "react";
import { X, ExternalLink, Check, Layers, Cpu, TrendingUp, Sparkles, Smartphone, ShieldCheck } from "lucide-react";
import { siteConfig } from "../config";

export type ProjectItem = (typeof siteConfig.portfolio)[number];

interface StoreReviewModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export default function StoreReviewModal({ project, onClose }: StoreReviewModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
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
      role="dialog"
      aria-modal="true"
      aria-labelledby="store-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="store-modal-container">
        {/* Header */}
        <div className="store-modal-header">
          <div className="store-modal-brand-badge">
            <span className="live-status-dot" />
            <span>{project.category} · {project.type}</span>
          </div>
          <button
            type="button"
            className="store-modal-close"
            onClick={onClose}
            aria-label="Close store review"
          >
            <X size={20} />
          </button>
        </div>

        {/* Hero Banner in Modal */}
        <div className="store-modal-hero">
          <div className="store-modal-image-wrap">
            <img src={project.image} alt={project.imageAlt} />
            <div className="store-modal-image-overlay" />
          </div>
          <div className="store-modal-title-group">
            <h2 id="store-modal-title">{project.title}</h2>
            <p className="store-modal-desc">{project.description}</p>
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

        {/* Performance & Quality Scorecard */}
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

        {/* Detailed Review Content */}
        <div className="store-review-body">
          {/* Client Challenge / Objective */}
          <div className="review-section">
            <div className="review-section-heading">
              <Sparkles size={16} />
              <h3>Objective & Strategy</h3>
            </div>
            <p className="review-text">{review.clientGoal}</p>
          </div>

          {/* Tech Stack Matrix */}
          <div className="review-section">
            <div className="review-section-heading">
              <Layers size={16} />
              <h3>Engineering & Tech Stack</h3>
            </div>
            <div className="tech-badge-wrap">
              {review.techStack.map((tech) => (
                <span key={tech} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Features Engineered */}
          <div className="review-section">
            <div className="review-section-heading">
              <Cpu size={16} />
              <h3>Key Features Engineered</h3>
            </div>
            <ul className="engineered-features-list">
              {review.featuresEngineered.map((feature, i) => (
                <li key={i} className="engineered-feature-item">
                  <div className="feature-check">
                    <Check size={14} />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Conversion & Business Impact */}
          <div className="review-section review-impact-box">
            <div className="review-section-heading">
              <TrendingUp size={16} />
              <h3>Results & Conversion Impact</h3>
            </div>
            <p className="review-text">{review.performanceImpact}</p>
          </div>
        </div>

        {/* Modal Footer */}
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
