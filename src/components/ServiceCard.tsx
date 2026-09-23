import { useState, type CSSProperties } from "react";
import { ArrowUpRight, ChevronDown, Sparkles, Video, Palette, LayoutGrid, Share2, Code2, Mail, Users, Headphones, ShoppingBag } from "lucide-react";
import { siteConfig } from "../config";

const ICONS: Record<string, typeof Video> = {
  VIDEO: Video,
  MOTION: Sparkles,
  DESIGN: Palette,
  "UI/UX": LayoutGrid,
  SOCIAL: Share2,
  CODE: Code2,
  EMAIL: Mail,
  LEADS: Users,
  VA: Headphones,
  SHOP: ShoppingBag,
};

export default function ServiceCard({ service, index }: { service: (typeof siteConfig.services)[number]; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = ICONS[service.visual] ?? Sparkles;
  const panelId = `service-panel-${index}`;

  return (
    <article className={`service-card reveal tone-${service.className}`} style={{ "--delay": `${(index % 4) * 70}ms` } as CSSProperties}>
      <div className="service-topline">
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div className="service-icon"><Icon /></div>
      </div>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <button
        className="service-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Hide capabilities" : "View capabilities"}</span>
        <ChevronDown className={open ? "rotated" : ""} />
      </button>
      <div id={panelId} className={`service-panel ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <div>
          {service.subcategories.map((item) => (
            <a
              key={item}
              href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(`Project inquiry: ${item}`)}&body=${encodeURIComponent(`Hi ${siteConfig.brand.name}, I would like to discuss ${item}.`)}`}
              tabIndex={open ? 0 : -1}
            >
              {item}<ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
      <div className="service-glow" />
    </article>
  );
}
