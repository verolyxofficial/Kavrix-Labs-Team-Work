export interface PortfolioReview {
  clientGoal: string;
  techStack: readonly string[] | string[];
  featuresEngineered: readonly string[] | string[];
  performanceImpact: string;
  scorecard: {
    mobileUx: string;
    architecture: string;
    coreWebVitals: string;
  };
}

export interface PortfolioItem {
  title: string;
  category: string;
  type: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  mediaAlt: string;
  poster?: string;
  description: string;
  liveUrl?: string;
  credit?: string;
  creditUrl?: string;
  tags?: readonly string[] | string[];
  metrics?: readonly string[] | string[];
  accentColor?: string;
  review?: PortfolioReview;
}

export interface ServiceItem {
  title: string;
  description: string;
  visual: string;
  className: string;
  subcategories: readonly string[] | string[];
}

export interface SocialLinks {
  instagram: string;
  linkedin: string;
  facebook: string;
  twitter: string;
  tiktok: string;
  youtube: string;
}

export interface ContactConfig {
  email: string;
  phone: string;
  whatsappNumber: string;
  whatsappMessage: string;
  socials: SocialLinks;
}

export interface BrandConfig {
  name: string;
  shortName: string;
  heroTitle: string;
  heroAccent: string;
  heroDescription: string;
  eyebrow: string;
}

export interface HeroMediaConfig {
  main: {
    image: string;
    imageAlt: string;
  };
  secondary: {
    image: string;
    imageAlt: string;
  };
}

export interface SiteLabels {
  primaryCta: string;
  secondaryCta: string;
  portfolioTitle: string;
  portfolioSubtitle: string;
  contactTitle: string;
  contactSubtitle: string;
  footerText: string;
}

export interface SiteTheme {
  accent: string;
  accent2: string;
  background: string;
  surface: string;
  text: string;
  muted: string;
}

export interface SiteConfig {
  brand: BrandConfig;
  contact: ContactConfig;
  heroMedia: HeroMediaConfig;
  services: readonly ServiceItem[] | ServiceItem[];
  portfolio: readonly PortfolioItem[] | PortfolioItem[];
  labels: SiteLabels;
  theme: SiteTheme;
}
