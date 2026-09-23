import { siteConfig } from "../config";

export default function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-mark ${compact ? "brand-mark--compact" : ""}`} aria-hidden="true">
      <span>{siteConfig.brand.name.charAt(0).toUpperCase()}</span>
      <i />
    </span>
  );
}
