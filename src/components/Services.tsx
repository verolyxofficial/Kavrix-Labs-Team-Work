import { siteConfig } from "../config";
import SectionIntro from "./SectionIntro";
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <section className="section section-shell" id="services">
      <SectionIntro
        kicker="What we do"
        title="One studio."
        accent="Multiple modes."
        copy="Use one capability or combine several. The point is not to make the service menu longer. The point is to make execution simpler."
      />
      <div className="services-grid">
        {siteConfig.services.map((service, index) => <ServiceCard key={service.title} service={service} index={index} />)}
      </div>
    </section>
  );
}
