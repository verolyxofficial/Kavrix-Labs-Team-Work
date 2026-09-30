import { useRef } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const steps = [
    {
      number: "01",
      title: "Find the signal",
      description: "Clarify the objective, target audience, deliverables, and core priorities.",
      tags: ["Discovery", "Scope", "Strategy"],
    },
    {
      number: "02",
      title: "Shape the system",
      description: "Build a visual and execution direction that holds together across formats.",
      tags: ["Design System", "Architecture"],
    },
    {
      number: "03",
      title: "Make the work",
      description: "Design, edit, build, and iterate with fast feedback loops and precision.",
      tags: ["Design & Code", "Sprint Sprints"],
    },
    {
      number: "04",
      title: "Finish properly",
      description: "Responsive polish, performance QA, delivery, and production launch.",
      tags: ["QA Testing", "Live Launch"],
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.fromTo(
        ".about-panel",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }
      )
        .fromTo(
          ".about-heading > *",
          { opacity: 0, x: -25 },
          { opacity: 1, x: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        )
        .fromTo(
          ".process-card",
          { opacity: 0, y: 25, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.6, ease: "power3.out" },
          "-=0.3"
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="section section-shell" id="about" data-gsap-custom="true">
      <div className="about-panel">
        <div className="about-heading">
          <span className="eyebrow">How we work</span>
          <h2>Less hand-waving.<br /><em>More finished work.</em></h2>
          <p>Strong creative work still needs structure. The process is deliberately simple so there is more room for thinking and less room for administrative theatre.</p>
          <div className="about-badge">
            <Sparkles size={13} style={{ color: "var(--accent)" }} />
            <span>Structured Process · Milestone-Driven Delivery</span>
          </div>
        </div>
        <div className="process-grid">
          {steps.map((step) => (
            <div className="process-card" key={step.number}>
              <div className="process-card-top">
                <span className="process-step-num">{step.number}</span>
                <ArrowUpRight />
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <div className="process-tags">
                {step.tags.map((tag) => (
                  <span key={tag} className="process-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
