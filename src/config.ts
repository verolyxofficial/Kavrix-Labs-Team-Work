import { brand, contact, heroMedia, labels, theme } from "./data/site";
import { services } from "./data/services";
import { portfolio } from "./data/portfolio";

export type {
  PortfolioReview,
  PortfolioItem,
  ServiceItem,
  SocialLinks,
  ContactConfig,
  BrandConfig,
  HeroMediaConfig,
  SiteLabels,
  SiteTheme,
} from "./data/types";

export const siteConfig = {
  brand,
  contact,
  heroMedia,
  services,
  portfolio,
  labels,
  theme,
} as const;

export default siteConfig;
