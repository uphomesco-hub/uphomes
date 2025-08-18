import React, { useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, Palette, PenTool, Monitor, Sparkles, Mail, Phone, ArrowRight, ChevronDown } from "lucide-react";

// ⚡️ Notes
// - Built to feel like the referenced Portavia site while being original.
// - TailwindCSS recommended. Minimal inline styles also included to keep it usable without Tailwind.
// - If you use Tailwind, paste the utility classes as-is. Otherwise, swap to your own CSS.
// - Animations are handled by Framer Motion.
//
// 📦 Minimal deps: react, framer-motion, lucide-react, (tailwindcss optional)
//    npm i framer-motion lucide-react
//
// 🔧 Smooth scrolling: ensure 'html { scroll-behavior: smooth; }' in your global CSS.
//
// 🖼 Replace placeholder images with your own assets.

const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Insights", href: "#insights" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Palette,
    title: "Branding",
    points: [
      "Identity systems & styleguides",
      "Messaging & brand voice",
      "Logo suites & usage rules",
      "Art direction",
    ],
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    points: [
      "Wireframes & prototypes",
      "Design systems",
      "User flows & testing",
      "Micro‑interactions",
    ],
  },
  {
    icon: Monitor,
    title: "Web Design",
    points: [
      "Responsive websites",
      "Landing pages",
      "CMS setup",
      "Performance pass",
    ],
  },
  {
    icon: Sparkles,
    title: "Graphics",
    points: [
      "Campaign creatives",
      "Social content",
      "Illustrations",
      "Iconography",
    ],
  },
];

const projects = [
  {
    title: "Summer Vibes Campaign",
    tag: "Graphic Design",
    blurb: "Posters, flyers & social launch for a city music festival.",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "ShopEase UX Sprint",
    tag: "UI/UX",
    blurb: "Checkout simplification, nav cleanup & design tokens.",
    image:
      "https://images.unsplash.com/photo-1527416876370-f89d2f3b4d34?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Coral Spiral Study",
    tag: "Branding",
    blurb: "Organic 3D motif for a modern product brand.",
    image:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?q=80&w=1600&auto=format&fit=crop",
  },
  {
    title: "Prism Noir Set",
    tag: "3D/Visual",
    blurb: "Geometric composition series for hero art.",
    image:
      "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop",
  },
];

const testimonials = [
  {
    name: "John Harris",
    role: "Marketing Director",
    quote:
      "Truly understood our goals and turned them into a high‑impact visual system.",
    avatar: "https://i.pravatar.cc/100?img=13",
  },
  {
    name: "Sarah Johnson",
    role: "CEO",
    quote: "Design craft is elite. The site converts and looks stunning.",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  {
    name: "Michael Lee",
    role: "Product Manager",
    quote: "Our flow is cleaner, faster, and easier to ship. Big win.",
    avatar: "https://i.pravatar.cc/100?img=26",
  },
  {
    name: "Laura Bennett",
    role: "Founder",
    quote: "Stress‑free process and a sharp, consistent brand kit.",
    avatar: "https://i.pravatar.cc/100?img=8",
  },
];

const faqs = [
  {
    q: "What services do you offer?",
    a: "Branding, UI/UX, and web design from strategy to shipping. Flexible per project or retainer.",
  },
  {
    q: "How long does a project take?",
    a: "Simple pages: 1–2 weeks. Full brands or apps: 3–8 weeks depending on scope and feedback cadence.",
  },
  {
    q: "Do you provide revisions?",
    a: "Yes—clear revision rounds are scoped up front so we can iterate efficiently without surprises.",
  },
  {
    q: "Can you build in Webflow/Framer?",
    a: "Yep. I design in Figma and implement in Webflow, Framer, or React—whatever fits your stack.",
  },
];

const posts = [
  {
    title: "5 Design Trends to Watch",
    date: "Apr 30, 2025",
    summary: "Signals shaping modern UI, type, motion, and brand systems.",
  },
  {
    title: "Streamline Your Design Workflow",
    date: "Apr 27, 2025",
    summary: "Practical tactics for faster feedback and better shipping.",
  },
];

function useParallax(ref) {
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-40px", "40px"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95]);
  return { y, scale };
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-400">
        {value}
      </div>
      <div className="mt-1 text-sm opacity-80">{label}</div>
    </div>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}> 
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  );
}

function Card({ children }) {
  return (
    <div className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)] transition-all duration-300">
      {children}
    </div>
  );
}

function FAQItem({ item, i }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
      >
        <span className="font-medium">{i + 1}. {item.q}</span>
        <ChevronDown className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-5 pb-5 text-sm opacity-90"
          >
            {item.a}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-md">
          <a href="#home" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="inline-block h-7 w-7 rounded-full bg-gradient-to-tr from-indigo-500 to-fuchsia-500" />
            <span>Porta<span className="text-fuchsia-400">Vibe</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="hover:text-white/90 text-white/70">
                {n.label}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm hover:bg-white/[0.12]"
            >
              <span>Available for work</span>
              <ArrowRight className="size-4" />
            </a>
          </nav>
          <button className="md:hidden" onClick={() => setOpen((o) => !o)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md"
          >
            <div className="flex flex-col px-4 py-3 text-sm">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="py-2 text-white/80" onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { y, scale } = useParallax(ref);
  return (
    <Section id="home" className="pt-36 md:pt-40">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-sky-400 to-fuchsia-400">
              Digital Designer
            </span>
            <span className="block text-white/80 text-2xl md:text-3xl mt-3">US‑based designer & React/Framer developer</span>
          </motion.h1>
          <p className="mt-6 text-white/70 max-w-xl">
            I craft clean, performant brand and product experiences. From strategy and UI/UX to polished web builds.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="rounded-full bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90">See Projects</a>
            <a href="#contact" className="rounded-full border border-white/10 px-5 py-3 text-sm hover:bg-white/[0.08]">Let’s work together</a>
          </div>
        </div>

        {/* Parallax image stack */}
        <div ref={ref} className="relative h-[480px] md:h-[560px]">
          <motion.div style={{ y, scale }} className="absolute -right-4 top-10 h-72 w-56 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src="https://images.unsplash.com/photo-1558222217-0ad5a8a2f62d?q=80&w=1400&auto=format&fit=crop"
              alt="portrait"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <motion.div style={{ y }} className="absolute left-0 bottom-0 h-80 w-64 overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <img
              src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1400&auto=format&fit=crop"
              alt="portrait"
              className="h-full w-full object-cover"
            />
          </motion.div>
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-gradient-to-tr from-fuchsia-500/40 to-indigo-500/40 blur-2xl" />
          <div className="absolute right-8 -bottom-6 h-24 w-24 rounded-full bg-gradient-to-tr from-sky-500/40 to-purple-500/40 blur-2xl" />
        </div>
      </div>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">What I can do for you</h2>
        <p className="mt-3 text-white/70">Strategy → Design → Build. End‑to‑end or plug‑in at any stage.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <Card key={s.title}>
            <div className="flex items-start gap-4">
              <s.icon className="size-6 opacity-90" />
              <div>
                <h3 className="font-semibold">{s.title}</h3>
                <ul className="mt-3 space-y-1 text-sm text-white/70">
                  {s.points.map((p) => (
                    <li key={p}>• {p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section id="about" className="">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">About me</h2>
          <p className="mt-4 text-white/70">
            Hi, I’m <span className="text-white">Duncan</span> — a digital designer passionate about meaningful products. I blend
            brand systems, crisp UI, and thoughtful motion to ship delightful experiences.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-6">
            <Stat value="8+" label="Years Experience" />
            <Stat value="120+" label="Projects" />
            <Stat value="48+" label="Happy Clients" />
            <Stat value="200%" label="Avg. Growth Impact" />
          </div>
        </div>
        <Card>
          <h3 className="text-xl font-semibold">My Story</h3>
          <p className="mt-3 text-white/70">
            From scrappy startups to funded scaleups, I’ve worked across product lifecycles—audits, redesigns, and fresh builds.
            I value tight feedback loops, accessible design, and maintainable code.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <a href="mailto:designer@example.com" className="inline-flex items-center gap-2">
              <Mail className="size-4" /> designer@example.com
            </a>
            <a href="tel:+15551234567" className="inline-flex items-center gap-2">
              <Phone className="size-4" /> +1 (555) 123‑4567
            </a>
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" className="">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Featured Projects</h2>
        <p className="mt-3 text-white/70">A few selected pieces that blend strategy, craft, and performance.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <motion.a
            key={p.title}
            href="#"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
          >
            <div className="relative h-56 w-full overflow-hidden">
              <img src={p.image} alt={p.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide">{p.tag}</span>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm text-white/80">{p.blurb}</p>
              </div>
            </div>
          </motion.a>
        ))}
      </div>
      <div className="mt-8 text-center">
        <a href="#" className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/[0.08]">
          Browse All Projects <ArrowRight className="size-4" />
        </a>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">What clients say</h2>
        <p className="mt-3 text-white/70">Feedback from partners and teams I’ve worked with.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <Card key={t.name}>
            <div className="flex items-start gap-4">
              <img src={t.avatar} alt={t.name} className="h-12 w-12 rounded-full object-cover" />
              <div>
                <p className="text-white/80">“{t.quote}”</p>
                <div className="mt-3 text-sm opacity-80">{t.name} • {t.role}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
        <Stat value="50+" label="Happy Clients" />
        <Stat value="200%" label="Avg Revenue Lift" />
        <Stat value="98%" label="Satisfaction" />
        <Stat value="120+" label="Projects Shipped" />
      </div>
    </Section>
  );
}

function FAQ() {
  return (
    <Section id="faq">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Frequently Asked Questions</h2>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {faqs.map((item, i) => (
          <FAQItem key={i} item={item} i={i} />
        ))}
      </div>
    </Section>
  );
}

function Insights() {
  return (
    <Section id="insights">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Design Insights & Ideas</h2>
        <p className="mt-3 text-white/70">Notes on process, trends, and shipping better work.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((p) => (
          <Card key={p.title}>
            <div className="flex flex-col gap-2">
              <div className="text-xs uppercase tracking-wider text-white/60">{p.date}</div>
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="text-white/70 text-sm">{p.summary}</p>
              <a href="#" className="mt-2 inline-flex items-center gap-1 text-sm text-white underline/20 hover:underline">
                Read more <ArrowRight className="size-4" />
              </a>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">Let’s work together</h2>
        <p className="mt-3 text-white/70">Tell me about your project and I’ll get back within 1–2 business days.</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Thanks! This is a demo form.");
        }}
        className="mx-auto mt-10 max-w-2xl grid gap-4"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <input className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none" placeholder="Name" required />
          <input type="email" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none" placeholder="Email" required />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <select className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none">
            <option>Branding</option>
            <option>Web Design</option>
            <option>UI/UX</option>
          </select>
          <input className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none" placeholder="Budget (optional)" />
        </div>
        <textarea rows={5} className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none" placeholder="What can I help you with?" />
        <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-black font-semibold">
          Submit <ArrowRight className="size-4" />
        </button>
      </form>
      <div className="mt-8 text-center text-white/70">
        <div className="inline-flex items-center gap-4">
          <a className="inline-flex items-center gap-2" href="mailto:designer@example.com"><Mail className="size-4"/> designer@example.com</a>
          <span className="opacity-40">•</span>
          <a className="inline-flex items-center gap-2" href="tel:+15551234567"><Phone className="size-4"/> +1 (555) 123‑4567</a>
        </div>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="relative mt-20 border-t border-white/10 py-10">
      <div className="mx-auto w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-white/70">© {new Date().getFullYear()} PortaVibe. All rights reserved.</div>
        <div className="flex items-center gap-5 text-sm">
          <a href="#" className="text-white/70 hover:text-white">Twitter</a>
          <a href="#" className="text-white/70 hover:text-white">Dribbble</a>
          <a href="#" className="text-white/70 hover:text-white">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}

export default function PortaviaInspired() {
  return (
    <div className="min-h-screen scroll-smooth bg-[#0B0B0F] text-white" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto" }}>
      {/* Subtle radial spotlights */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[40vh] w-[40vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(82,82,255,0.15),transparent_60%)]" />
        <div className="absolute right-[10%] top-[30%] h-[30vh] w-[30vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,82,203,0.12),transparent_60%)]" />
        <div className="absolute left-[5%] bottom-[10%] h-[35vh] w-[35vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(0,255,200,0.08),transparent_60%)]" />
      </div>

      <Header />
      <main>
        <Hero />
        <Services />
        <About />
        <Projects />
        <Testimonials />
        <FAQ />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
