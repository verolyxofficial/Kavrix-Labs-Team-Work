import { useMemo, useState } from "react";
import SectionIntro from "./SectionIntro";
import ProjectCard, { type ProjectItem } from "./ProjectCard";
import StoreReviewModal from "./StoreReviewModal";
import { siteConfig } from "../config";
import { Globe, Users, ShoppingBag, ShieldCheck } from "lucide-react";

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const categories = useMemo(() => ["All", ...new Set(siteConfig.portfolio.map((item) => item.category))], []);
  const items = useMemo(
    () => (filter === "All" ? siteConfig.portfolio : siteConfig.portfolio.filter((item) => item.category === filter)),
    [filter],
  );

  return (
    <section className="section section-shell" id="work">
      <SectionIntro
        kicker="Client Work & Portfolio Review"
        title={siteConfig.labels.portfolioTitle}
        copy={siteConfig.labels.portfolioSubtitle}
      />

      {/* Portfolio Impact Metrics Bar */}
      <div className="portfolio-stats-banner reveal" aria-label="Portfolio Track Record & Impact">
        <div className="portfolio-stat-item">
          <div className="stat-icon-wrap">
            <ShoppingBag size={18} />
          </div>
          <div className="stat-details">
            <span className="stat-value">7 Live Stores</span>
            <span className="stat-label">Engineered & Scaled</span>
          </div>
        </div>

        <div className="portfolio-stat-item">
          <div className="stat-icon-wrap">
            <Users size={18} />
          </div>
          <div className="stat-details">
            <span className="stat-value">99+</span>
            <span className="stat-label">Global Customers Served</span>
          </div>
        </div>

        <div className="portfolio-stat-item">
          <div className="stat-icon-wrap">
            <ShieldCheck size={18} />
          </div>
          <div className="stat-details">
            <span className="stat-value">Shopify Plus & DTC</span>
            <span className="stat-label">Headless & Custom Liquid</span>
          </div>
        </div>

        <div className="portfolio-stat-item">
          <div className="stat-icon-wrap">
            <Globe size={18} />
          </div>
          <div className="stat-details">
            <span className="stat-value">Multi-Region Reach</span>
            <span className="stat-label">Pakistan, US, Canada, UAE & EU</span>
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="filter-row reveal" aria-label="Filter stores by discipline">
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

      {/* Projects Grid */}
      <div className="projects-grid" aria-live="polite">
        {items.map((project, index) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={index}
            onOpenReview={setSelectedProject}
          />
        ))}
      </div>

      {/* Interactive Store Review & Case Study Modal */}
      <StoreReviewModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
