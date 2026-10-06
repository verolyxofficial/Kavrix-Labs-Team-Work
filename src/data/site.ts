import type { BrandConfig, ContactConfig, HeroMediaConfig, SiteLabels, SiteTheme } from "./types";

export const brand: BrandConfig = {
  name: "Kavrix Labs",
  shortName: "Kavrix",
  heroTitle: "Digital work that feels",
  heroAccent: "alive.",
  heroDescription:
    "Creative production, web development experiences, and digital support for brands that want sharper execution without adding another layer of chaos.",
  eyebrow: "Creative studio · Digital partner",
} as const;

export const contact: ContactConfig = {
  email: "kavrixlabs@gmail.com",
  phone: "",
  whatsappNumber: "",
  whatsappMessage: "Hi Kavrix Labs, I would like to discuss a project.",
  socials: {
    instagram: "https://www.instagram.com/kavrixlabs/",
    linkedin: "http://www.linkedin.com/in/kavrix-labs-10177643a",
    facebook: "https://www.facebook.com/profile.php?id=61594627147316",
    twitter: "http://x.com/kavrix_labs",
    tiktok: "https://www.tiktok.com/@kavrixlabs",
    youtube: "https://www.youtube.com/",
  },
} as const;

export const heroMedia: HeroMediaConfig = {
  main: {
    image: "https://images.unsplash.com/photo-1768222935380-0a3a76fbb42e?auto=format&fit=crop&fm=jpg&q=84&w=1800",
    imageAlt: "Professional video production control room with multiple screens",
  },
  secondary: {
    image: "https://images.unsplash.com/photo-1763568258187-a0d90864ed66?auto=format&fit=crop&fm=jpg&q=84&w=1200",
    imageAlt: "Laptop displaying code in a dark development workspace",
  },
} as const;

export const labels: SiteLabels = {
  primaryCta: "Start a project",
  secondaryCta: "Explore the work",
  portfolioTitle: "Selected Work Across Our Services.",
  portfolioSubtitle: "Explore our work by service. More projects, videos, and case studies can be added to the portfolio data without changing the layout.",
  contactTitle: "Bring us the complicated bit.",
  contactSubtitle: "Start with an email. The rest can be sorted out like civilized people after that.",
  footerText: "Creative production · Digital design · Front-end experiences",
} as const;

export const theme: SiteTheme = {
  accent: "#b8ff3d",
  accent2: "#7c5cff",
  background: "#08090d",
  surface: "#11131a",
  text: "#f5f7fb",
  muted: "#9ba3b2",
} as const;
