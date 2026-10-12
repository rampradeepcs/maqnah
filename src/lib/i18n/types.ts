/**
 * The shape every language must fill. TypeScript rejects a dictionary that
 * misses or misnames a string, so the Arabic page can't silently fall back
 * to English.
 */

export type Locale = "en" | "ar";

export type IconName =
  | "domain"
  | "scale"
  | "integration"
  | "design"
  | "local"
  | "foundations"
  | "intelligence"
  | "operations";

export type PillarIcon = "foundations" | "intelligence" | "operations";

type Link = { label: string; href: string };

export type Dictionary = {
  locale: Locale;
  dir: "ltr" | "rtl";
  /** BCP 47 tag for <html lang> and hreflang. */
  lang: string;

  meta: {
    title: string;
    description: string;
    /** og:locale, e.g. en_US / ar_SA */
    ogLocale: string;
    ogImage: string;
    ogAlt: string;
    /** Path of this page: "/" or "/ar" */
    path: string;
  };

  /** Interface text that isn't part of the wireframe copy. */
  ui: {
    skipToContent: string;
    backToTop: string;
    mainNav: string;
    footerNav: string;
    openMenu: string;
    closeMenu: string;
    /** Labels shown in the custom cursor ring */
    cursor: { talk: string; view: string; send: string };
    clientPhotoToCome: string;
    /** Opening and closing quotation marks for testimonials */
    quotes: [string, string];
    /** Appended to a social label whose URL is still to come */
    linkToCome: string;
    form: {
      firstName: string;
      lastName: string;
      email: string;
      company: string;
      phone: string;
      countryCode: string;
      message: string;
      sending: string;
      successTitle: string;
      successBody: string;
      genericError: string;
      emailUs: string;
    };
    /** Messages the contact API returns, and its no-JavaScript result page */
    api: {
      invalid: string;
      tooLong: string;
      required: string;
      badEmail: string;
      consent: string;
      notConnected: string;
      sendFailed: string;
      failTitle: string;
      emailDirect: string;
      backToForm: string;
      backToSite: string;
    };
  };

  nav: {
    links: Link[];
    /**
     * The header toggle to the other language. `label` is shown in that
     * language; `hint` (in this page's language) is read after it by screen
     * readers, e.g. "العربية (Arabic version)".
     */
    language: { label: string; href: string; lang: string; hint: string };
    cta: Link;
  };

  hero: {
    tag: string;
    headline: string;
    /** Word index (split on spaces) → the tiny icon tile that follows it */
    headlineIcons: Record<number, "layers" | "spark">;
    lead: string;
    ctas: Link[];
    visual: { src: string; alt: string };
  };

  agentic: {
    pill: string;
    heading: string;
    line: string;
    metrics: { prefix: string; value: number; suffix: string; label: string }[];
  };

  about: {
    tag: string;
    /** Two sentences: the first set in ink, the second in grey */
    heading: [string, string];
    blocks: { title: string; body: string }[];
    photo: { label: string; note: string };
    strengthsHeading: string;
    strengths: { icon: IconName; title: string; body: string }[];
  };

  services: {
    tag: string;
    heading: string;
    lead: string;
    strip: { src: string; alt: string };
    pillars: {
      icon: PillarIcon;
      title: string;
      sub: string;
      items: { title: string; body: string }[];
    }[];
  };

  industries: {
    tag: string;
    heading: string;
    items: { name: string; line: string; image: string; alt: string }[];
  };

  work: {
    tag: string;
    heading: string;
    items: { chip: string; title: string; body: string; image: string }[];
    cta: { line: string; label: string; href: string };
  };

  clients: {
    tag: string;
    heading: string;
    logos: string[];
    testimonials: { quote: string; name: string; role: string }[];
  };

  contact: {
    pill: string;
    heading: string;
    body: string;
    listHeading: string;
    list: string[];
    cards: { label: string; value: string }[];
    form: {
      heading: string;
      countryCodes: string[];
      consent: string;
      submit: string;
    };
  };

  footer: {
    copyright: string;
    social: { icon: "linkedin" | "x"; label: string; href: string | null }[];
    legal: string[];
  };
};
