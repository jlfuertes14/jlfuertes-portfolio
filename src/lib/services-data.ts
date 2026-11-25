export interface ServiceGalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface ServiceArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: {
    label: string;
    detail: string;
  }[];
  /** Optional index into proof.gallery to feature inline inside this chapter */
  figureIndex?: number;
}

export interface ServiceItem {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  eyebrow: string;
  readingTime: string;
  shortDesc: string;
  description: string;
  pullQuote: string;
  heroCaption: string;
  tech: string[];
  deliverables: string[];
  color: string;
  sections: ServiceArticleSection[];
  proof: {
    description: string;
    image: string;
    alt: string;
    gallery: ServiceGalleryImage[];
  };
  relatedProjectTitles: string[];
}

export const services: ServiceItem[] = [
  {
    slug: "full-stack-development",
    number: "01",
    title: "Full-Stack Development",
    subtitle: "Web Applications",
    eyebrow: "Web Applications & Systems",
    readingTime: "4 min read",
    shortDesc:
      "Scalable web platforms, microservices, and reactive user interfaces built for speed.",
    description:
      "You do not just need a website; you need a platform that works reliably and scales as your business grows. I design and build full-stack web applications from the ground up. Whether it is a customer portal, a data-heavy internal dashboard, or a fast e-commerce storefront, I handle both the backend logic and the frontend interface so the final product runs fast and holds up in production.",
    pullQuote:
      "Great web software feels effortless on the surface because the data model, API contracts, and rendering boundaries are disciplined underneath.",
    heroCaption:
      "AniVerse: a full-stack discovery platform built with Next.js, TypeScript, FastAPI, and MongoDB.",
    tech: ["React / Next.js", "TypeScript", "FastAPI / Node.js", "MongoDB / SQL"],
    deliverables: [
      "End-to-end Next.js (App Router) and TypeScript web applications",
      "High-throughput REST and GraphQL APIs with FastAPI or Node.js",
      "Normalized relational (PostgreSQL / Supabase) and document (MongoDB) schemas",
      "Authentication, role-based access control (RBAC), and rate-limited endpoints",
      "Responsive, accessible UI systems with deliberate motion and strong Core Web Vitals",
    ],
    color: "#0a0f1d",
    sections: [
      {
        id: "overview",
        heading: "Built for real traffic, not just a launch screenshot",
        paragraphs: [
          "Most web projects fail quietly after launch: slow database queries, brittle state management, or layouts that break the moment real content replaces placeholder copy. My approach treats the frontend and backend as one cohesive system from day one.",
          "Using Next.js App Router and TypeScript on the client alongside FastAPI or Node.js on the server, I define strict contracts between data and interface. Server Components keep initial payloads lean, while client interactions stay responsive with GPU-composited transitions.",
        ],
        figureIndex: 1,
      },
      {
        id: "architecture",
        heading: "How I take a product from brief to production",
        paragraphs: [
          "Every build begins by mapping user workflows and data boundaries before writing components. When aggregating 27,000+ entries on AniVerse or engineering real-time versioned persistence on Vitae, getting the indexing and caching strategy right early prevented bottlenecks later.",
        ],
        bullets: [
          {
            label: "Schema & API design first",
            detail:
              "Define clear database indexes, pagination strategies, and typed request/response validation so features stay predictable as scope grows.",
          },
          {
            label: "Component craft & accessibility",
            detail:
              "Build reusable primitives with full keyboard operability, semantic HTML, responsive typography, and explicit loading and empty states.",
          },
          {
            label: "Production hardening",
            detail:
              "Add rate limiting, input sanitization, structured error handling, and automated deployments via Vercel or Docker.",
          },
        ],
        figureIndex: 2,
      },
      {
        id: "outcomes",
        heading: "Where this fits best",
        paragraphs: [
          "Full-stack builds are ideal for founders shipping an MVP that needs to impress early users, businesses replacing spreadsheets with an internal operations dashboard, or brands modernizing a storefront or hospitality platform with custom booking and inventory flows.",
        ],
      },
    ],
    proof: {
      description:
        "Real products I have shipped: responsive storefronts, admin dashboards, and API-driven platforms running in production.",
      image: "/images/aniverse-right-image.png",
      alt: "AniVerse desktop application preview",
      gallery: [
        {
          src: "/images/aniverse-right-image.png",
          alt: "AniVerse desktop interface",
          caption:
            "AniVerse desktop discovery interface aggregating 27,000+ indexed entries with fast client and server search.",
        },
        {
          src: "/images/lumina-admin-dashboard.png",
          alt: "Lumina Electronics desktop admin dashboard",
          caption:
            "Lumina Electronics administrative console for real-time inventory tracking and order management.",
        },
        {
          src: "/images/chamen-resort-rght-dekstop.png",
          alt: "Chamen Resort desktop preview",
          caption:
            "Chamen Resort hospitality experience with curated media framing and a direct booking flow.",
        },
        {
          src: "/images/onyx-right-dekstop-preveiw.png",
          alt: "Onyx desktop preview",
          caption:
            "Onyx interactive design-token workbench rendered cleanly across wide desktop viewports.",
        },
        {
          src: "/images/aniverse.png",
          alt: "AniVerse product landing page",
          caption:
            "AniVerse landing experience showcasing bold typographic hierarchy and instant filtering.",
        },
        {
          src: "/images/chamen-resort.png",
          alt: "Chamen Resort responsive landing page",
          caption:
            "Chamen Resort hero showcase tuned for smooth motion and responsive image delivery.",
        },
      ],
    },
    relatedProjectTitles: ["AniVerse", "Vitae", "Lumina Electronics", "Chamen Resort"],
  },
  {
    slug: "ai-integration",
    number: "02",
    title: "AI Integration",
    subtitle: "AI Powered Solutions",
    eyebrow: "Applied Machine Learning & Agents",
    readingTime: "4 min read",
    shortDesc:
      "Custom LLM agents, local dataset training, and high-accuracy vision pipelines.",
    description:
      "AI should not just be a buzzword for your business; it needs to deliver measurable value. I integrate practical AI solutions tailored to your workflows, from custom model training on your own datasets to conversational assistants and multi-step LLM agents. Instead of generic wrappers, you get focused tools that speed up operations and actively help your users.",
    pullQuote:
      "Useful AI is 20% model selection and 80% engineering: clean datasets, deterministic guardrails, fallback routing, and an interface people actually trust.",
    heroCaption:
      "Computer-vision candling and viability analysis interface trained on domain-specific imagery.",
    tech: [
      "Model Training / Datasets",
      "Chatbots & LLM Agents",
      "RAG Pipelines",
      "Gemini / Groq APIs",
    ],
    deliverables: [
      "Custom-trained computer vision models (YOLO, ResNet / PyTorch) and inference APIs",
      "Multi-provider LLM orchestration (Gemini, Groq, OpenRouter) with automatic failover",
      "Domain-grounded chatbots, structured extraction, and RAG retrieval pipelines",
      "Prompt-injection guardrails, token-bucket rate limiting, and output validation",
      "Explainable ML dashboards with visual confidence metrics and Grad-CAM overlays",
    ],
    color: "#110d22",
    sections: [
      {
        id: "overview",
        heading: "Beyond generic chat wrappers",
        paragraphs: [
          "Bolting an ungrounded chat box onto a web app rarely solves a real bottleneck. Practical AI engineering starts by identifying the exact decision, classification, or drafting step that slows your team down, then choosing the lightest, most reliable model architecture for the job.",
          "Sometimes that means a fine-tuned ResNet-50 or YOLO computer vision model deployed behind FastAPI. Other times it means structured LLM tool use with dual-provider failover so a single API outage never interrupts production.",
        ],
        figureIndex: 1,
      },
      {
        id: "engineering",
        heading: "Reliability, datasets, and human-in-the-loop design",
        paragraphs: [
          "Across HatchWatch (real-time egg candling and hatch detection), CatVision AI (fine-tuned PyTorch CNN with Grad-CAM explainability), Vitae (multi-feature AI resume suite), and OrionCLI (agentic terminal coding assistant), the same engineering discipline separates a demo from a dependable product.",
        ],
        bullets: [
          {
            label: "Dataset curation & evaluation",
            detail:
              "Clean labeling, augmentation, and clear validation metrics so model performance is measured on edge cases rather than cherry-picked samples.",
          },
          {
            label: "Resilient LLM orchestration",
            detail:
              "Dual-provider routing (such as Groq + OpenRouter or Gemini), strict JSON schema enforcement, and token-bucket rate limiting to keep latency low and uptime high.",
          },
          {
            label: "Transparent UX",
            detail:
              "Surface confidence scores, visual heatmaps, or cited sources directly in the UI so users can verify and act on AI outputs with confidence.",
          },
        ],
        figureIndex: 3,
      },
      {
        id: "outcomes",
        heading: "Where this fits best",
        paragraphs: [
          "This practice fits teams looking to automate visual inspection, embed intelligent document analysis or ATS-style scoring into a SaaS workflow, or build custom internal copilots connected to private operational data.",
        ],
      },
    ],
    proof: {
      description:
        "Custom-trained vision models, conversational AI assistants, and agent pipelines I have built and deployed.",
      image: "/images/ai_integration/ai1.webp",
      alt: "AI candling analysis interface preview",
      gallery: [
        {
          src: "/images/ai_integration/ai1.webp",
          alt: "AI candling analysis dashboard overview",
          caption:
            "Real-time egg candling analysis dashboard surfacing live computer-vision classifications.",
        },
        {
          src: "/images/ai_integration/ai2.jpg",
          alt: "AI-powered egg viability detection interface",
          caption:
            "Custom-trained viability detection pipeline identifying fertile and non-viable samples under candling light.",
        },
        {
          src: "/images/ai_integration/ai3.jpeg",
          alt: "Duckling detection model output view",
          caption:
            "YOLOv26 inference output detecting hatch events in real time for automated alerts.",
        },
        {
          src: "/images/vitae-dashboard.png",
          alt: "Vitae AI dashboard",
          caption:
            "Vitae dark control-room workspace with dual-provider AI rewriting, ATS scoring, and job matching.",
        },
        {
          src: "/images/onyx-right-dekstop-preveiw.png",
          alt: "Onyx desktop preview",
          caption:
            "Onyx AI design-system workspace translating natural-language direction into structured CSS tokens.",
        },
        {
          src: "/images/onyx-preview.png",
          alt: "Onyx AI design system interface",
          caption:
            "Onyx generative interface preview with live palette and typography synthesis.",
        },
      ],
    },
    relatedProjectTitles: ["Ghost Project", "CatVision AI", "OrionCLI", "Vitae"],
  },
  {
    slug: "iot-embedded-hardware",
    number: "03",
    title: "IoT & Embedded Hardware",
    subtitle: "Electronics",
    eyebrow: "Hardware & Cyber-Physical Systems",
    readingTime: "4 min read",
    shortDesc:
      "Microcontroller architecture, PID feedback loops, and live hardware telemetry.",
    description:
      "If you need to bridge the physical world and digital software, I can build it end to end. I engineer custom IoT systems and embedded hardware solutions: programming microcontrollers, wiring circuits, calibrating sensors, and building the web dashboards that monitor and control them in real time.",
    pullQuote:
      "Hardware does not forgive hand-waving. Sensor noise, power budgets, and closed-loop timing have to work together before a single metric reaches the cloud.",
    heroCaption:
      "Custom robotic and embedded prototype wired, calibrated, and programmed end to end.",
    tech: [
      "ESP32 / Arduino",
      "C++ / MicroPython",
      "PID Control Loops",
      "Sensor Calibration",
    ],
    deliverables: [
      "ESP32, Arduino, and Raspberry Pi firmware written in C++ or Python / MicroPython",
      "Closed-loop PID control for thermal, motor, and environmental regulation",
      "Multi-sensor integration, signal filtering, and hardware calibration",
      "Real-time telemetry dashboards and remote actuator controls over Wi-Fi or serial",
      "Complete wiring architecture, prototyping documentation, and bench testing",
    ],
    color: "#161616",
    sections: [
      {
        id: "overview",
        heading: "Bridging physical circuits with modern software",
        paragraphs: [
          "Rooted in my BS Computer Engineering foundation, I build connected hardware systems where firmware and web software are designed by the same hand. Removing the handoff gap between electronics engineers and web developers means faster iteration and fewer protocol surprises.",
          "From smart agricultural incubators combining Raspberry Pi 5, Arduino Uno, and vision models (HatchWatch) to RFID-secured home automation and autonomous mobile robot rigs, each build is engineered for stability under real-world electrical and environmental noise.",
        ],
        figureIndex: 2,
      },
      {
        id: "process",
        heading: "From breadboard validation to live telemetry",
        paragraphs: [
          "Physical systems require methodical verification at every layer: power integrity, sensor drift, actuator response, and clean network recovery when Wi-Fi drops.",
        ],
        bullets: [
          {
            label: "Circuit & power architecture",
            detail:
              "Clean isolation between logic controllers and high-current loads (relays, heaters, servos, motors) to prevent brownouts and resets.",
          },
          {
            label: "Deterministic firmware & PID tuning",
            detail:
              "Non-blocking control loops, calibrated sensor readings, and tuned PID feedback to hold tight temperature, speed, or position targets.",
          },
          {
            label: "Live web & mobile dashboards",
            detail:
              "Lightweight Flask or Next.js monitoring interfaces giving operators real-time visibility, threshold alerts, and manual overrides.",
          },
        ],
        figureIndex: 4,
      },
      {
        id: "outcomes",
        heading: "Where this fits best",
        paragraphs: [
          "Ideal for functional hardware prototypes, automated monitoring stations, smart agriculture or environmental controllers, and robotics builds that need both dependable firmware and a polished digital control plane.",
        ],
      },
    ],
    proof: {
      description:
        "Hands-on builds: ESP32-powered control systems, sensor rigs, and robots I have wired, coded, and tested.",
      image: "/images/embedded_systems/emb6.jpg",
      alt: "Embedded systems robotic platform preview",
      gallery: [
        {
          src: "/images/embedded_systems/emb6.jpg",
          alt: "Embedded systems robotic platform overview",
          caption:
            "Assembled robotic hardware platform showcasing integrated chassis, drive assembly, and controller wiring.",
        },
        {
          src: "/images/embedded_systems/emb2.jpg",
          alt: "Embedded systems robot side profile",
          caption:
            "Side-profile chassis layout engineered for balanced weight distribution and sensor clearance.",
        },
        {
          src: "/images/embedded_systems/emb1.jpg",
          alt: "Embedded systems electronics and chassis detail",
          caption:
            "Close-up of microcontroller wiring, power distribution, and modular sensor interconnects.",
        },
        {
          src: "/images/embedded_systems/emb4.jpg",
          alt: "Embedded systems control interface in low light",
          caption:
            "Live status indicators and onboard display verification during bench testing.",
        },
        {
          src: "/images/embedded_systems/emb5.jpg",
          alt: "Embedded systems runtime display and controls",
          caption:
            "On-device runtime display outputting live telemetry and operational state.",
        },
        {
          src: "/images/embedded_systems/emb3.jpg",
          alt: "Embedded systems battery and platform detail",
          caption:
            "Regulated battery pack mounting and accessible service layout for rapid bench iteration.",
        },
      ],
    },
    relatedProjectTitles: ["HatchWatch", "Home Automation System", "JL Robotics"],
  },
  {
    slug: "automation-data-analysis",
    number: "04",
    title: "Automation & Data Analysis",
    subtitle: "Data-Driven Automation",
    eyebrow: "Workflow Pipelines & Analytics",
    readingTime: "4 min read",
    shortDesc:
      "Automated data extractors, ETL pipelines, and executive reporting consoles.",
    description:
      "Stop spending hours on repetitive tasks that a script can complete in seconds. I build custom automations that extract data, clean messy spreadsheets and databases, and streamline recurring reporting workflows. Beyond saving time, I turn raw records into clear dashboards so you can act on accurate numbers with less manual entry.",
    pullQuote:
      "Every repetitive four-hour spreadsheet ritual is an engineering problem waiting to be compressed into a reliable, auditable single click.",
    heroCaption:
      "Campaign console built to unify messy directories, filter leads, and automate personalized outreach.",
    tech: [
      "Python / Pandas",
      "Data Cleaning / ETL",
      "Dashboards / Reporting",
      "Workflow Automation",
    ],
    deliverables: [
      "Custom Python ETL scripts for Excel, CSV, API, and database normalization",
      "Desktop and web automation tools with preview modes and safety throttling",
      "Exploratory data analysis notebooks (Pandas, DuckDB) with clear visualizations",
      "Interactive executive dashboards turning raw records into filterable insight",
      "Scheduled batch workflows with logging, retries, and clean error reporting",
    ],
    color: "#0e191b",
    sections: [
      {
        id: "overview",
        heading: "Turning hours of manual work into one-click workflows",
        paragraphs: [
          "Growing teams accumulate fragmented spreadsheets, inconsistent contact directories, and weekly reporting rituals that quietly burn hours every day. I build lightweight, tailored automation tools that fit directly into how your team already works, without forcing a costly enterprise migration.",
          "During my IT internship at Q Asia Magazine Inc., I engineered an automated email outreach platform in Python, CustomTkinter, and FastAPI that parsed Excel and CSV recipient lists, generated personalized HTML templates for up to 150 businesses per batch, enforced anti-spam throttling, and saved four hours of manual work per session, lifting outreach efficiency by 60%.",
        ],
        figureIndex: 3,
      },
      {
        id: "pipeline",
        heading: "Clean data in, clear decisions out",
        paragraphs: [
          "Automation is only as trustworthy as the data moving through it. Whether crunching 9,855 nationwide infrastructure records in DuckDB for Ghost Project or unifying client directories for outreach campaigns, every pipeline emphasizes transparency and human oversight.",
        ],
        bullets: [
          {
            label: "Automated ingestion & deduplication",
            detail:
              "Standardize column names, sanitize malformed emails or numbers, merge duplicate records, and flag anomalies before they pollute downstream systems.",
          },
          {
            label: "Safe execution guardrails",
            detail:
              "Include dry-run previews, batch throttling, and granular tagging so operators always review what is about to run before committing an action.",
          },
          {
            label: "Decision-ready reporting",
            detail:
              "Translate raw tables into reproducible Jupyter analyses or fast web dashboards that surface trends, outliers, and priorities at a glance.",
          },
        ],
        figureIndex: 1,
      },
      {
        id: "outcomes",
        heading: "Where this fits best",
        paragraphs: [
          "Best suited for operations, marketing, and leadership teams buried in repetitive CSV wrangling, manual client outreach, lead enrichment, or recurring report generation who want fast, maintainable tools they own outright.",
        ],
      },
    ],
    proof: {
      description:
        "Email tools, lead scrapers, and reporting dashboards I have built to cut hours of manual work down to one click.",
      image: "/images/automation_data_analysis/automation3.png",
      alt: "Automation campaign console preview",
      gallery: [
        {
          src: "/images/automation_data_analysis/automation3.png",
          alt: "Campaign console for directory unification and email filtering",
          caption:
            "Unified campaign console built to merge messy directories, deduplicate contacts, and filter outreach segments.",
        },
        {
          src: "/images/automation_data_analysis/data_analysis2.png",
          alt: "Jupyter notebook chart showing yearly strike data analysis",
          caption:
            "Reproducible Python and Pandas notebook visualizing multi-year trend patterns from cleaned datasets.",
        },
        {
          src: "/images/automation_data_analysis/data_analysis1.png",
          alt: "Jupyter notebook data preparation and readable-number transformation",
          caption:
            "Data-cleaning pipeline normalizing raw tabular inputs into human-readable metrics for reporting.",
        },
        {
          src: "/images/automation_data_analysis/automation4.png",
          alt: "Filtered lead management dashboard with tagging and campaign controls",
          caption:
            "Lead management interface with segment tagging, batch status tracking, and throttled dispatch controls.",
        },
        {
          src: "/images/automation_data_analysis/automation1.png",
          alt: "Email automation tool with template and recipient management",
          caption:
            "Automated email outreach desktop utility with dynamic HTML template generation and recipient previews.",
        },
        {
          src: "/images/automation_data_analysis/automation2.png",
          alt: "Laptop view of email automation dashboard in use",
          caption:
            "Production workflow running live campaign preparation with built-in preview verification.",
        },
      ],
    },
    relatedProjectTitles: ["Ghost Project", "Vitae"],
  },
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAdjacentServices(slug: string): {
  prev: ServiceItem;
  next: ServiceItem;
} {
  const index = services.findIndex((service) => service.slug === slug);
  const safeIndex = index === -1 ? 0 : index;
  const prev = services[(safeIndex - 1 + services.length) % services.length];
  const next = services[(safeIndex + 1) % services.length];
  return { prev, next };
}
