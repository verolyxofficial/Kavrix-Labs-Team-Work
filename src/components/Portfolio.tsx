import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SectionIntro from "./SectionIntro";
import ProjectCard, { type ProjectItem } from "./ProjectCard";
import { siteConfig } from "../config";

gsap.registerPlugin(ScrollTrigger);

const StoreReviewModal = lazy(() => import("./StoreReviewModal"));

export default function Portfolio() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = useMemo(
    () => siteConfig.services.map((service) => service.title),
    [],
  );

  const [filter, setFilter] = useState<string>(() => siteConfig.services[0]?.title || "Video Editing");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Smooth GSAP card cascade when category tab changes
  useGSAP(
    () => {
      if (gridRef.current) {
        const cards = gridRef.current.children;
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            {
              opacity: 0,
              y: 35,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.55,
              stagger: 0.06,
              ease: "power3.out",
              overwrite: "auto",
            }
          );
        }
      } else {
        const emptyEl = containerRef.current?.querySelector(".portfolio-empty");
        if (emptyEl) {
          gsap.fromTo(
            emptyEl,
            { opacity: 0, y: 30, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)" }
          );
        }
      }
    },
    { dependencies: [filter], scope: containerRef }
  );

  const updateScrollState = useCallback(() => {
    const el = tabsRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = tabsRef.current;
    if (!el) return;
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  const scrollTabs = (direction: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = direction === "left" ? -280 : 280;
    el.scrollBy({ left: amount, behavior: "smooth" });
    setTimeout(updateScrollState, 320);
  };

  const items = useMemo(() => {
    return siteConfig.portfolio.filter((item) => {
      const cat: string = item.category;
      if (cat === filter) return true;
      if (
        (filter === "E-commerce" || filter === "Web Development") &&
        (cat === "Web Development" || cat === "E-commerce")
      ) {
        return true;
      }
      return false;
    });
  }, [filter]);

  return (
    <section ref={containerRef} className="section section-shell" id="work" data-gsap-custom="true">
      <SectionIntro
        kicker="Selected Work"
        title={siteConfig.labels.portfolioTitle}
        copy={siteConfig.labels.portfolioSubtitle}
      />

      <div className="filter-tabs-container">
        <button
          type="button"
          className={`filter-arrow filter-arrow--prev ${canScrollLeft ? "is-active" : "is-disabled"}`}
          onClick={() => scrollTabs("left")}
          aria-label="Previous tabs"
        >
          <ChevronLeft size={18} />
        </button>

        <div
          ref={tabsRef}
          className="filter-row"
          onScroll={updateScrollState}
          aria-label="Filter portfolio by service"
        >
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

        <button
          type="button"
          className={`filter-arrow filter-arrow--next ${canScrollRight ? "is-active" : "is-disabled"}`}
          onClick={() => scrollTabs("right")}
          aria-label="Next tabs"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {items.length > 0 ? (
        <div ref={gridRef} className="projects-grid" aria-live="polite">
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
        <div className="portfolio-empty" aria-live="polite">
          <span className="portfolio-empty-kicker">{filter}</span>
          <h3>Portfolio showcase coming soon.</h3>
          <p>
            We are curating case studies and client deliverables for <strong>{filter}</strong>.
            Have a project in mind for this category?
          </p>
          <a href="#contact" className="button button--primary" style={{ marginTop: "1rem", display: "inline-flex" }}>
            Discuss a {filter} Project
          </a>
        </div>
      )}

      {selectedProject && (
        <Suspense fallback={null}>
          <StoreReviewModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        </Suspense>
      )}
    </section>
  );
}
