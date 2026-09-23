import { ArrowUpRight } from "lucide-react";

export default function About() {
  const steps = [
    ["01", "Find the signal", "Clarify the objective, audience, deliverables, and what actually matters."],
    ["02", "Shape the system", "Build a visual and execution direction that can hold together across formats."],
    ["03", "Make the work", "Design, edit, build, iterate, and keep the feedback loop practical."],
    ["04", "Finish properly", "Responsive polish, QA, delivery, and the less glamorous details that separate done from almost done."],
  ];

  return (
    <section className="section section-shell" id="about">
      <div className="about-panel reveal">
        <div className="about-heading">
          <span className="eyebrow">How we work</span>
          <h2>Less hand-waving.<br /><em>More finished work.</em></h2>
          <p>Strong creative work still needs structure. The process is deliberately simple so there is more room for thinking and less room for administrative theatre.</p>
        </div>
        <div className="process-list">
          {steps.map(([number, title, description]) => (
            <div className="process-item" key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
              <ArrowUpRight />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
