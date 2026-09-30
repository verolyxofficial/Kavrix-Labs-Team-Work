import { Facebook, Instagram, Linkedin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "../config";

const socialIcons: Record<string, ReactNode> = {
  facebook: <Facebook />,
  instagram: <Instagram />,
  twitter: <Twitter />,
  linkedin: <Linkedin />,
  youtube: <Youtube />,
  tiktok: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.27 6.27 0 0 0 1.89-4.47V8.52a8.27 8.27 0 0 0 4.88 1.58V6.69z" />
    </svg>
  ),
};

export function getConnectMethods() {
  const whatsappUrl = siteConfig.contact.whatsappNumber
    ? `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappMessage)}`
    : "https://www.whatsapp.com/";
  const phoneUrl = siteConfig.contact.phone
    ? `tel:${siteConfig.contact.phone}`
    : `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Phone call request")}&body=${encodeURIComponent("Hi Kavrix Labs, I would like to arrange a phone call.")}`;

  return [
    { name: "Instagram", icon: socialIcons.instagram, url: siteConfig.contact.socials.instagram },
    { name: "LinkedIn", icon: socialIcons.linkedin, url: siteConfig.contact.socials.linkedin },
    { name: "TikTok", icon: socialIcons.tiktok, url: siteConfig.contact.socials.tiktok },
    { name: "Twitter / X", icon: socialIcons.twitter, url: siteConfig.contact.socials.twitter },
    { name: "Facebook", icon: socialIcons.facebook, url: siteConfig.contact.socials.facebook },
    { name: "WhatsApp", icon: <MessageCircle />, url: whatsappUrl },
    { name: "Phone / call", icon: <Phone />, url: phoneUrl },
    { name: "YouTube", icon: socialIcons.youtube, url: siteConfig.contact.socials.youtube },
  ];
}
