import { useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";
import { ArrowUpRight, Sparkles, CheckCircle2, Play } from "lucide-react";
import type { PortfolioItem } from "../config";

export type ProjectItem = PortfolioItem;

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  onOpenReview?: (project: ProjectItem) => void;
}

export default function ProjectCard({ project, index, onOpenReview }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onMove = (event: ReactPointerEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    node.style.setProperty("--mx", `${x * 100}%`);
    node.style.setProperty("--my", `${y * 100}%`);
    node.style.setProperty("--ry", `${(x - 0.5) * 5}deg`);
    node.style.setProperty("--rx", `${(0.5 - y) * 5}deg`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--ry", "0deg");
    node.style.setProperty("--rx", "0deg");
  };

  return (
    <article
      ref={ref}
      className="project-card reveal is-visible"
      style={{ "--delay": `${(index % 4) * 60}ms` } as CSSProperties}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <div className={`project-image-wrap project-media-${project.mediaType}`}>
        {project.mediaType === "video" ? (
          <video
            className="project-video"
            controls
            preload="metadata"
            playsInline
            poster={project.poster}
            aria-label={project.mediaAlt}
          >
            <source src={project.mediaUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <img
            src={project.mediaUrl}
            alt={project.mediaAlt}
            loading="lazy"
            decoding="async"
          />
        )}

        <div className="project-shine" />
        <span className="project-index">0{index + 1}</span>

        {project.credit && project.creditUrl ? (
          <a
            className="project-credit"
            href={project.creditUrl}
            target="_blank"
            rel="noreferrer"
            title={`Visit ${project.title}`}
          >
            <span className="live-status-dot" />
            <span>{project.credit}</span>
          </a>
        ) : project.mediaType === "video" ? (
          <span className="project-credit project-credit--static">
            <Play size={10} />
            <span>Video Portfolio</span>
          </span>
        ) : null}
      </div>

      <div className="project-copy">
        <div className="project-meta">
          <span className="project-category-name">{project.category}</span>
          <span className="project-type-tag">{project.type}</span>
        </div>

        <h3>{project.title}</h3>
        <p>{project.description}</p>

        {project.tags && project.tags.length > 0 && (
          <div className="card-tags-row">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="card-tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.metrics && project.metrics.length > 0 && (
          <div className="card-metrics-row">
            {project.metrics.slice(0, 2).map((metric) => (
              <span key={metric} className="card-metric-item">
                <CheckCircle2 size={12} />
                <span>{metric}</span>
              </span>
            ))}
          </div>
        )}

        {(project.review || project.liveUrl || project.mediaType === "video") && (
          <div className="card-action-row">
            {project.review && onOpenReview && (
              <button
                type="button"
                className="card-review-btn"
                onClick={() => onOpenReview(project)}
              >
                <Sparkles size={13} />
                <span>View Project Details</span>
              </button>
            )}

            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="card-live-link"
              >
                <span>Visit Live</span>
                <ArrowUpRight size={14} />
              </a>
            ) : project.mediaType === "video" ? (
              <a
                href={project.mediaUrl}
                target="_blank"
                rel="noreferrer"
                className="card-live-link"
              >
                <span>Open Video</span>
                <ArrowUpRight size={14} />
              </a>
            ) : null}
          </div>
        )}
      </div>
    </article>
  );
}
