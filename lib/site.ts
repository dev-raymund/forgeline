export interface SiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly message: string;
  readonly description: string;
  readonly url: string;
  readonly locale: string;
  /** Public support address. Left unset until support channels are confirmed. */
  readonly contactEmail?: string;
}

export const site: SiteConfig = {
  name: "FORGELINE",
  tagline: "Built for Everyday.",
  message: "Everyday essentials. Better chosen.",
  description:
    "Discover thoughtfully selected everyday essentials for your home, work, travel and active lifestyle.",
  url: "https://forgeline.live",
  locale: "en_US",
};

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

export const companyLinks: readonly NavLink[] = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];
