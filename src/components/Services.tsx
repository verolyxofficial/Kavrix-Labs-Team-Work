import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { siteConfig } from "../config";
import SectionIntro from "./SectionIntro";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(".service-card", gridRef.current);

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 45,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: {
            amount: 0.45,
            from: "start",
          },
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="section section-shell" id="services" data-gsap-custom="true">
      <SectionIntro
        kicker="What we do"
        title="One studio."
        accent="Multiple modes."
        copy="Use one capability or combine several. The point is not to make the service menu longer. The point is to make execution simpler."
      />
      <div ref={gridRef} className="services-grid">
        {siteConfig.services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </section>
  );
}
