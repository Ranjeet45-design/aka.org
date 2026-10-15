export const SITE = {
  name: "Australian Khalsa Association",
  shortName: "AKA",
  url: "https://aka.org.au",
  email: "info@aka.org.au",
  /** Toll-free line. Display text as supplied; the tel href is its keypad equivalent (K5 H4 A2 L5 S7 A2). */
  tollFree: "1300 KHALSA",
  tollFreeTel: "tel:1300542572",
  region: "Sydney, NSW",
  scope: "Australia-wide operations",
  tagline: "Serving Humanity, Fostering Unity.",
  description:
    "The Australian Khalsa Association (AKA) is a registered not-for-profit charitable Sikh organisation supporting the Australian Sikh community, promoting Sikhism and providing unconditional support to all Australians in need.",
} as const;

export const NAV = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us/" },
  { label: "Become Volunteer", href: "/become-volunteer/" },
  { label: "Blog", href: "/blog/" },
  { label: "Gallery", href: "/photo-gallery/" },
] as const;

export const FOOTER_LINKS = [
  ...NAV,
  { label: "Contact Us", href: "/contact-us/" },
] as const;

/** "Our Key Aims" — wording preserved from aka.org.au */
export const AIMS = [
  {
    title: "Culture & Heritage",
    text: "Preserving and promoting Sikh culture and heritage. Providing a platform for Sikhs to connect, celebrate, and educate the broader Australian community.",
    image: "march-park",
  },
  {
    title: "Disaster & Crisis Relief",
    text: "Providing unwavering support to those affected by natural disasters, homelessness, or destitution without any discrimination.",
    image: "community-meals",
  },
  {
    title: "ADF Support",
    text: "Dedicated advocacy and support for serving and retired Sikhs from the Australian Defence Forces, honoring their service and commitment.",
    image: "wreath-laying",
  },
  {
    title: "Interfaith Dialogue",
    text: "Engaging in active interfaith dialogue to promote deep understanding, respect, and harmony among different religious groups in Australia.",
    image: "parliament",
  },
  {
    title: "Community Belonging",
    text: "Fostering a strong sense of community and belonging among Sikhs in Australia, providing essential spiritual guidance and emotional support.",
    image: "anzac-group",
  },
  {
    title: "Langar (Free vegetarian Meal )",
    text: "Upholding the noble tradition of Langar. Providing free, healthy meals to every individual, no matter their background. Serving the local community to ensure that nobody goes hungry.",
    image: "service-crowd",
  },
] as const;

export const MISSION = {
  statement:
    "To support and uplift the Australian Sikh community through charitable activities, educational programs, and community services.",
  points: [
    { title: "Promoting Sikhism", text: "Spreading awareness and understanding of Sikh teachings and values within the broader Australian society." },
    { title: "Community Support", text: "Providing assistance to individuals and families in need, fostering a sense of community and belonging." },
    { title: "Cultural Preservation", text: "Ensuring the preservation and celebration of Sikh culture, traditions, and heritage for future generations." },
  ],
} as const;

export const VISION = {
  statement:
    "To build a strong, cohesive, and vibrant Sikh community in Australia that thrives and contributes positively to society.",
  points: [
    { title: "Embraces Diversity", text: "Promotes inclusivity and deep understanding among different cultural and religious groups." },
    { title: "Empowers Individuals", text: "Encourages personal growth, higher education, and leadership within the Sikh community." },
    { title: "Fosters Unity", text: "Strengthens bonds within the community through shared values, mutual respect, and collective action for common goals." },
  ],
} as const;

/** Figures exactly as published on aka.org.au */
export const STATS = [
  { value: 100, suffix: "%", label: "Not For Profit" },
  { value: 24, suffix: "/7", label: "Community Support" },
  { value: 1000, suffix: "+", label: "Volunteers" },
] as const;
