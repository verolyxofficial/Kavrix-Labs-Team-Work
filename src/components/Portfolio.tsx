import { useMemo, useState } from "react";
import SectionIntro from "./SectionIntro";
import ProjectCard, { type ProjectItem } from "./ProjectCard";
import StoreReviewModal from "./StoreReviewModal";
import { siteConfig } from "../config";

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Tabs stay in sync with the Services section automatically.
  // Add a new service there and the portfolio gets a new working tab.
  const categories = useMemo(
    () => ["All", ...siteConfig.services.map((service) => service.title)],
    [],
  );

  const items = useMemo(
    () =>
      filter === "All"
        ? siteConfig.portfolio
        : siteConfig.portfolio.filter((item) => item.category === filter),
    [filter],
  );

  return (
    <section className="section section-shell" id="work">
      <SectionIntro
        kicker="Selected Work"
        title={siteConfig.labels.portfolioTitle}
        copy={siteConfig.labels.portfolioSubtitle}
      />

      <div className="filter-row reveal" aria-label="Filter portfolio by service">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={filter === category}
            className={filter === category ? "active" : ""}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {items.length > 0 ? (
        <div className="projects-grid" aria-live="polite">
          {items.map((project, index) => (
            <ProjectCard
              key={`${project.category}-${project.title}`}
              project={project}
              index={index}
              onOpenReview={setSelectedProject}
            />
          ))}
        </div>
      ) : (
        <div className="portfolio-empty reveal is-visible" aria-live="polite">
          <span className="portfolio-empty-kicker">{filter}</span>
          <h3>Portfolio coming soon.</h3>
          <p>
            This service tab is ready. Add portfolio items to <code>src/config.ts</code>
            with the matching service category and they will appear here automatically.
          </p>
        </div>
      )}

      <StoreReviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
