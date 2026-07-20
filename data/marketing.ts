import type {
  PricingPlan,
  Service,
  TeamMember,
  Testimonial,
} from "@/types";

export const services: Service[] = [
  {
    id: "svc-01",
    title: "Template Customization",
    description:
      "Pick any template from our marketplace and we adapt it to your brand — colors, typography, content structure, and imagery — in days, not months.",
    icon: "Paintbrush",
    deliverables: ["Brand-matched design", "Content migration", "Responsive QA", "Launch support"],
    startingPrice: 990,
  },
  {
    id: "svc-02",
    title: "Custom Website Design",
    description:
      "A fully bespoke website designed from a blank canvas around your positioning, your customers, and your conversion goals.",
    icon: "PenTool",
    deliverables: ["Discovery workshop", "Custom design system", "Up to 12 unique pages", "Motion design"],
    startingPrice: 4900,
  },
  {
    id: "svc-03",
    title: "Ecommerce Builds",
    description:
      "Conversion-tuned storefronts on modern headless stacks — merchandising, product storytelling, and checkout flows that don't leak revenue.",
    icon: "ShoppingCart",
    deliverables: ["Storefront design", "Catalog architecture", "Checkout optimization", "Analytics setup"],
    startingPrice: 7500,
  },
  {
    id: "svc-04",
    title: "Web App Interfaces",
    description:
      "Dashboards, portals, and product UIs designed and built with the same care as our marketing work — from design system to shipped frontend.",
    icon: "LayoutDashboard",
    deliverables: ["UX architecture", "Design system", "Component library", "Frontend build"],
    startingPrice: 12000,
  },
  {
    id: "svc-05",
    title: "Brand & Identity",
    description:
      "Logo, palette, typography, and voice — the identity layer that makes every page we build for you unmistakably yours.",
    icon: "Gem",
    deliverables: ["Logo suite", "Brand guidelines", "Typography system", "Asset library"],
    startingPrice: 2900,
  },
  {
    id: "svc-06",
    title: "Care & Growth Plans",
    description:
      "Ongoing design, content, and performance work after launch — your website treated as a product, not a project.",
    icon: "TrendingUp",
    deliverables: ["Monthly design hours", "Performance monitoring", "A/B testing", "Priority support"],
    startingPrice: 490,
  },
];

export const pricingPlans: PricingPlan[] = [
  {
    id: "plan-free",
    name: "Free",
    description: "Explore the platform and prototype your site in the builder.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      "Browse all templates",
      "Builder with 1 draft project",
      "Community support",
      "MODULESOFT subdomain preview",
    ],
    highlighted: false,
    cta: "Start free",
  },
  {
    id: "plan-pro",
    name: "Pro",
    description: "For founders and small teams shipping their own site.",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Everything in Free",
      "Unlimited builder projects",
      "All premium templates included",
      "Custom domain connection",
      "Remove MODULESOFT badge",
      "Email support",
    ],
    highlighted: true,
    cta: "Start Pro trial",
  },
  {
    id: "plan-studio",
    name: "Studio",
    description: "Work directly with our design team on custom projects.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "Everything in Pro",
      "Dedicated design team",
      "Monthly design hours included",
      "Priority project queue",
      "Quarterly strategy reviews",
      "Same-day support",
    ],
    highlighted: false,
    cta: "Talk to us",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "tst-01",
    quote:
      "We went from a dated brochure site to something that looks like we raised a Series B. Inbound leads doubled in the first quarter after launch.",
    author: "Sofia Lindqvist",
    role: "Managing Partner",
    company: "Harbor & Co.",
  },
  {
    id: "tst-02",
    quote:
      "The builder is the closest thing to Figma-for-websites I've used, and when we needed real design muscle, the studio team was one message away.",
    author: "Daniel Okafor",
    role: "Founder & CEO",
    company: "Neural Labs",
  },
  {
    id: "tst-03",
    quote:
      "Our storefront redesign paid for itself in six weeks. The team obsessed over checkout details our previous agency never even mentioned.",
    author: "Marcus Tan",
    role: "Head of Ecommerce",
    company: "Atlas Apparel",
  },
  {
    id: "tst-04",
    quote:
      "Patients constantly tell us the new site is why they chose our clinic. It feels calm, credible, and it books appointments while we sleep.",
    author: "Dr. Elena Vasquez",
    role: "Medical Director",
    company: "Vital Health",
  },
];

export const team: TeamMember[] = [
  {
    id: "tm-01",
    name: "Jonas Weber",
    role: "Founder & Creative Director",
    bio: "Fifteen years designing for startups and studios across Berlin and New York. Believes every pixel should earn its place.",
  },
  {
    id: "tm-02",
    name: "Maya Chen",
    role: "Lead Product Designer",
    bio: "Previously shipped design systems at two unicorns. Owns the template marketplace's quality bar.",
  },
  {
    id: "tm-03",
    name: "Priya Nair",
    role: "Engineering Lead",
    bio: "Full-stack engineer who treats performance budgets as promises, not suggestions.",
  },
  {
    id: "tm-04",
    name: "Lucas Ferreira",
    role: "Head of Client Studio",
    bio: "Runs every custom engagement from kickoff to launch. The reason our projects ship on time.",
  },
];

export const stats = [
  { label: "Websites launched", value: "1,200+" },
  { label: "Templates in marketplace", value: "160+" },
  { label: "Average client rating", value: "4.9/5" },
  { label: "Countries served", value: "40+" },
];
