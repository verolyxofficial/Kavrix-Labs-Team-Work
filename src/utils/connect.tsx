import { Facebook, Instagram, Linkedin, MessageCircle, Phone, Twitter, Youtube } from "lucide-react";
import type { ReactNode } from "react";
import { siteConfig } from "../config";

const socialIcons: Record<string, ReactNode> = {
  facebook: <Facebook />,
  instagram: <Instagram />,
  twitter: <Twitter />,
  linkedin: <Linkedin />,
  youtube: <Youtube />,
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
    { name: "Facebook", icon: socialIcons.facebook, url: siteConfig.contact.socials.facebook },
    { name: "Twitter / X", icon: socialIcons.twitter, url: siteConfig.contact.socials.twitter },
    { name: "WhatsApp", icon: <MessageCircle />, url: whatsappUrl },
    { name: "Phone / call", icon: <Phone />, url: phoneUrl },
    { name: "YouTube", icon: socialIcons.youtube, url: siteConfig.contact.socials.youtube },
  ];
}
