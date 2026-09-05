export const brand = {
  name: "audio arts",
  phone: "[PHONE NUMBER]",
  email: "[EMAIL ADDRESS]",
  address: "[STUDIO ADDRESS]",
  businessHours: "[BUSINESS HOURS]",
  whatsapp: "[WHATSAPP]",
  instagram: "[INSTAGRAM]",
  siteUrl: "https://example.com",
} as const;

export const services = [
  {
    slug: "recording",
    name: "Recording",
    description: "Focused capture for vocals, instruments and performances.",
    detail:
      "A considered recording workflow built around confident performances, clean capture and a calm session environment.",
    uses: [
      "Vocals & instruments",
      "Live performance capture",
      "Tracking sessions",
    ],
    deliverables: ["Recorded takes", "Session files", "Approved exports"],
  },
  {
    slug: "dubbing",
    name: "Dubbing",
    description:
      "Dialogue and dubbing workflows for screen, digital and branded content.",
    detail:
      "Dialogue sessions designed for consistency, timing and clear communication between talent, production and post.",
    uses: ["Screen dialogue", "Localization workflows", "Branded content"],
    deliverables: ["Recorded dialogue", "Organized takes", "Review exports"],
  },
  {
    slug: "voice-over",
    name: "Voice Over",
    description:
      "Clean, focused voice capture for narration, campaigns and creators.",
    detail:
      "A focused environment for narration and spoken-word work, from first take through approved delivery.",
    uses: ["Narration", "Campaigns", "Explainers"],
    deliverables: ["Clean voice files", "Edited selects", "Delivery masters"],
  },
  {
    slug: "music-production",
    name: "Music Production",
    description:
      "Production support from arrangement and tracking through final direction.",
    detail:
      "A production workflow that keeps creative decisions, arrangement and technical execution close to the work.",
    uses: ["Song production", "Arrangement", "Tracking"],
    deliverables: ["Production sessions", "Edits", "Approved mixes"],
  },
  {
    slug: "mixing",
    name: "Mixing",
    description:
      "Balanced, detailed mixes built to translate across listening environments.",
    detail:
      "A deliberate mix process focused on balance, clarity, dynamics and translation across headphones, speakers and platforms.",
    uses: ["Stereo mixing", "Vocal balance", "Platform-ready mixes"],
    deliverables: ["Mix versions", "Instrumentals", "Approved mix"],
  },
  {
    slug: "mastering",
    name: "Mastering",
    description: "Final-stage finishing for consistency, clarity and delivery.",
    detail:
      "Final audio finishing for coherent playback, level management and delivery specifications.",
    uses: ["Final masters", "Release preparation", "Delivery checks"],
    deliverables: ["Master files", "Instrumentals", "Delivery versions"],
  },
  {
    slug: "sound-design",
    name: "Sound Design",
    description:
      "Purposeful sonic textures, transitions and effects for moving image.",
    detail:
      "Sound design that supports story and interaction without competing with the content.",
    uses: ["Film & video", "Branded experiences", "Transitions"],
    deliverables: ["SFX edits", "Sound beds", "Final exports"],
  },
  {
    slug: "audio-post-production",
    name: "Audio Post Production",
    description:
      "Editorial, cleanup, mixing and delivery for professional post workflows.",
    detail:
      "A structured post-production workflow spanning cleanup, editorial, mix and delivery.",
    uses: ["Picture editorial", "Dialogue cleanup", "Final mix"],
    deliverables: ["Review exports", "Final mix", "Delivery package"],
  },
] as const;

export const studios = [
  {
    name: "Control Room",
    description:
      "The main production desk — Soundcraft console, Genelec monitoring and a full-glass line of sight into the booth.",
    capability: "Monitoring · Mixing · Editing",
    image: "/images/rooms/control-room.jpg",
  },
  {
    name: "Recording Booth",
    description:
      "An acoustically treated vocal and instrument booth built for clean, confident takes.",
    capability: "Vocals · Instruments · Voice",
    image: "/images/rooms/recording-room.jpg",
  },
] as const;

export const gallery = studios.map((s, i) => ({
  title: s.name,
  caption: s.description,
  index: i,
}));

export const team = [
  {
    number: "01",
    role: "Chief Sound Engineer",
    bio: "Leads tracking and mix sessions with a focus on translation across playback systems.",
  },
  {
    number: "02",
    role: "Music Producer",
    bio: "Oversees arrangement, production direction and artist collaboration from demo to master.",
  },
  {
    number: "03",
    role: "Dubbing & Post Engineer",
    bio: "Runs dialogue, ADR and post workflows for screen and branded content.",
  },
  {
    number: "04",
    role: "Studio Manager",
    bio: "Coordinates scheduling, client onboarding and session logistics end to end.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "The mixes translated perfectly across every system we tested them on — car, earbuds, club. Genuinely one of the cleanest rooms I\u2019ve worked in.",
    name: "Aditya Verma",
    role: "Independent Artist · DEMO",
  },
  {
    quote:
      "We booked audio arts for a full ad campaign\u2019s voice-over and dubbing. Turnaround was fast and every revision was handled without friction.",
    name: "Priya Nair",
    role: "Creative Director, brand · DEMO",
  },
  {
    quote:
      "The booth is dead quiet and the engineers know exactly how to get a performance out of a nervous first-time vocalist.",
    name: "Karan Mehta",
    role: "Music Director · DEMO",
  },
] as const;
export const portfolio = [
  [
    "Midnight",
    "Music",
    "Demo project — fictional content for interface demonstration.",
  ],
  [
    "Echoes",
    "Dubbing",
    "Demo project — fictional content for interface demonstration.",
  ],
  [
    "Project Aurora",
    "Advertisement",
    "Demo project — fictional content for interface demonstration.",
  ],
  [
    "After Hours",
    "Voice",
    "Demo project — fictional content for interface demonstration.",
  ],
  [
    "Voice Study 01",
    "Voice",
    "Demo project — fictional content for interface demonstration.",
  ],
] as const;

export const equipment = [
  ["Microphones", "Professional condenser microphones"],
  ["Console", "Studio mixing console"],
  ["Monitors", "Professional monitoring system"],
  ["Instruments", "Studio instruments — details to be confirmed"],
  ["Outboard", "Outboard processing — details to be confirmed"],
  ["DAW / Software", "Digital audio workstation"],
] as const;

export const industries = [
  "Music",
  "Film",
  "Advertising",
  "OTT & Streaming",
  "Podcasts",
  "Brands",
  "Digital Content",
  "Voice & Dubbing",
] as const;

export const whyUs = [
  {
    title: "Precision",
    copy: "Technical decisions are made deliberately, from signal chain through final delivery.",
  },
  {
    title: "Creative Collaboration",
    copy: "Engineers work alongside the artist or team, not just behind the desk.",
  },
  {
    title: "Flexible Production",
    copy: "Sessions are structured around the work, not a fixed template.",
  },
  {
    title: "Attention to Detail",
    copy: "Every version, note and revision is tracked so nothing gets lost between takes.",
  },
] as const;

export const process = [
  {
    step: "Idea",
    copy: "Align on scope, references and the intent behind the session.",
  },
  {
    step: "Record",
    copy: "Capture performances in a focused, acoustically considered space.",
  },
  {
    step: "Edit",
    copy: "Comp, clean and arrange the material into a working structure.",
  },
  {
    step: "Mix",
    copy: "Balance, shape and translate the work across playback systems.",
  },
  {
    step: "Master",
    copy: "Finish levels, coherence and delivery-ready consistency.",
  },
  {
    step: "Deliver",
    copy: "Package approved versions in the formats production needs.",
  },
] as const;

export const faqs = [
  {
    q: "Do I need to bring my own equipment?",
    a: "No — the studio provides the core recording and monitoring setup. If a session calls for a specific instrument or piece of outboard gear, mention it ahead of time so it can be confirmed.",
  },
  {
    q: "How long can I book the studio for?",
    a: "Sessions can be booked by the hour or for a half/full day, depending on availability. Duration options are shown in the booking flow.",
  },
  {
    q: "Can I book a dubbing or ADR session?",
    a: "Yes — dubbing and dialogue sessions can be booked directly through the booking flow or by requesting a quote.",
  },
  {
    q: "Do you provide mixing and mastering?",
    a: "Yes, both are offered as standalone services or as part of a full production booking.",
  },
  {
    q: "Can I request revisions after a session?",
    a: "Yes — share timestamped, specific feedback with your engineer directly and it will be tracked against the delivered version.",
  },
  {
    q: "How are final files delivered?",
    a: "Approved files are shared with you directly by the studio once a version is signed off.",
  },
  {
    q: "Can I visit the studio before booking?",
    a: "Studio visits can be arranged on request — reach out through the contact page to set one up.",
  },
  {
    q: "How does the booking process work?",
    a: "Choose a service and studio, pick an available date and time, share your session details, and confirm — you will receive a booking reference for your records.",
  },
] as const;

export const demoClient = {
  name: "Aarav Mehta",
  email: "[EMAIL ADDRESS]",
  project: "MIDNIGHT",
} as const;
export const demoBookings = [
  {
    id: "AA-2026-4821",
    client: "Aarav Mehta",
    service: "Recording",
    studio: "Control Room",
    date: "18 Sep 2026",
    time: "18:00",
    status: "Confirmed",
  },
  {
    id: "AA-2026-4822",
    client: "Riya Sharma",
    service: "Voice Over",
    studio: "Podcast / Voice Space",
    date: "21 Sep 2026",
    time: "11:00",
    status: "Pending",
  },
] as const;
