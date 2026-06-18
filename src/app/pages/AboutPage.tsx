import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Lightbulb, Star, Shield, Users, Zap, Globe, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

// ─── Core Values ────────────────────────────────────────────────────────────
const coreValues = [
  {
    label: 'Innovation',
    Icon: Lightbulb,
    title: 'Innovation',
    text: 'We constantly push the boundaries of what technology can achieve, investing in R&D and embracing emerging tools to deliver forward-thinking solutions for our clients.',
    image: '/images/technology.jpg',
  },
  {
    label: 'Excellence',
    Icon: Star,
    title: 'Excellence',
    text: 'We hold ourselves to the highest standards in engineering, design, and delivery. Every project reflects our commitment to quality—from architecture to the final user experience.',
    image: '/images/coding.jpg',
  },
  {
    label: 'Integrity',
    Icon: Shield,
    title: 'Integrity',
    text: 'We operate with full transparency, honest communication, and accountability in everything we do. Our clients trust us because we say what we mean and deliver what we promise.',
    image: '/images/integrity.jpg',
  },
  {
    label: 'Impact',
    Icon: Globe,
    title: 'Impact',
    text: 'We measure success by the tangible value we create—cost savings, revenue growth, and improved lives. Every engagement is driven by outcomes, not just outputs.',
    image: '/images/globe.jpg',
  },
  {
    label: 'Agility',
    Icon: Zap,
    title: 'Agility',
    text: 'We adapt quickly to changing business needs and emerging technologies. Our iterative approach means clients see value early and often, not just at project close.',
    image: '/images/agility.jpg',
  },
  {
    label: 'Collaboration',
    Icon: Users,
    title: 'Collaboration',
    text: 'We work alongside our clients as true partners—embedding in their teams, aligning with their culture, and sharing ownership of outcomes from day one.',
    image: '/images/team.jpg',
  },
];

// ─── Gallery slides ──────────────────────────────────────────────────────────
const gallerySlides = [
  {
    title: 'Our Team',
    subtitle: 'People-first culture',
    text: 'A diverse team of 200+ engineers, data scientists, and consultants united by a shared passion for technology and a drive to solve meaningful problems.',
    image: '/images/team.jpg',
  },
  {
    title: 'Delivery Excellence',
    subtitle: 'Results that speak for themselves',
    text: '250+ successful engagements delivered on time and on budget. Our rigorous project methodology, transparent reporting, and dedicated delivery teams ensure every client achieves measurable outcomes.',
    image: '/images/agility.jpg',
  },
  {
    title: 'Client Partnerships',
    subtitle: 'Long-term, trusted relationships',
    text: 'Deep partnerships with Fortune 500 companies and ambitious startups alike. We grow with our clients—many have worked with us for five or more years.',
    image: '/images/integrity.jpg',
  },
  {
    title: 'Global Reach',
    subtitle: 'Impact across 25+ countries',
    text: 'From Spring, Texas to Hyderabad to Kitchener, our global delivery model combines local understanding with world-class engineering talent.',
    image: '/images/globe.jpg',
  },
];

// ─── Circular Core Values Component ─────────────────────────────────────────
function CoreValuesCycle() {
  const [active, setActive] = useState(0);

  // ── Orbital geometry (all positions derived mathematically) ──────────────
  const W = 1440, H = 780;
  const CX = 720, CY = 390;
  const RX = 650, RY = 280;   // wide orbit to fill the section
  const NW = 280, NH = 185;   // rounded-box node dimensions
  const hw = NW / 2, hh = NH / 2;  // 120, 82.5
  const GAP = 32;             // clearance between nodes and center panel

  // 6 nodes spaced exactly 60° apart, starting at top (−90°)
  const nodePositions = coreValues.map((_, i) => {
    const angle = ((i * 60) - 90) * (Math.PI / 180);
    return {
      x: Math.round(CX + RX * Math.cos(angle)),
      y: Math.round(CY + RY * Math.sin(angle)),
    };
  });

  // Center panel — equal GAP clearance on all four sides from surrounding nodes
  const panelLeft   = nodePositions[4].x + hw + GAP;   // 210+76+32 = 318
  const panelTop    = nodePositions[0].y + hh + GAP;   // 90+45+32  = 167
  const panelWidth  = (nodePositions[1].x - hw - GAP) - panelLeft;  // 564
  const panelHeight = (nodePositions[3].y - hh - GAP) - panelTop;   // 406

  return (
    <div className="flex flex-col items-center w-full">

      {/* ── Desktop orbital diagram (lg+) ───────────────────── */}
      <div className="hidden lg:block w-full overflow-x-auto">
        <div style={{ width: W, height: H, position: 'relative', margin: '0 auto' }}>

          {/* Layer 0 — ambient depth glows */}
          <div style={{
            position: 'absolute',
            left: CX - 400, top: CY - 260,
            width: 800, height: 520,
            background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.14) 0%, rgba(5,150,105,0.07) 42%, transparent 68%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />
          <div style={{
            position: 'absolute',
            left: CX - 190, top: CY - 140,
            width: 380, height: 280,
            background: 'radial-gradient(ellipse at center, rgba(52,211,153,0.09) 0%, transparent 65%)',
            filter: 'blur(55px)',
            pointerEvents: 'none',
            zIndex: 0,
          }} />

          {/* Layer 1 — SVG orbital track */}
          <svg style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 1 }} width={W} height={H}>
            {/* Wide halo ring */}
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(34,197,94,0.07)" strokeWidth="28" />
            {/* Dashed orbital track */}
            <ellipse cx={CX} cy={CY} rx={RX} ry={RY} fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth="1" strokeDasharray="4 8" />
            {/* Junction dots — active turns green */}
            {nodePositions.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r="4.5"
                fill={i === active ? 'rgba(34,197,94,1)' : 'rgba(255,255,255,0.22)'}
                style={{ transition: 'fill 0.3s ease' }}
              />
            ))}
          </svg>

          {/* Layer 2 — Center glassmorphism panel (no box — blur only) */}
          <div
            style={{ position: 'absolute', left: panelLeft, top: panelTop, width: panelWidth, height: panelHeight, zIndex: 2 }}
            className="backdrop-blur-md flex flex-col items-center justify-center text-center px-10"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.32, ease: 'easeOut' }}
                className="w-full"
              >
                {(() => {
                  const Icon = coreValues[active].Icon;
                  return (
                    <div className="w-12 h-12 rounded-full bg-[var(--brand-green)]/20 border border-[var(--brand-green)]/40 flex items-center justify-center mx-auto mb-5">
                      <Icon size={20} className="text-[var(--brand-green)]" />
                    </div>
                  );
                })()}
                <h3 className="text-3xl font-bold text-white mb-3 leading-snug">{coreValues[active].title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{coreValues[active].text}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Layer 3 — Orbital oval capsule nodes */}
          {nodePositions.map((node, i) => {
            const isActive = i === active;
            const val = coreValues[i];
            const Icon = val.Icon;
            return (
              <motion.button
                key={i}
                onMouseEnter={() => setActive(i)}
                onClick={() => setActive(i)}
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                style={{
                  position: 'absolute',
                  left: node.x - hw,
                  top: node.y - hh,
                  width: NW,
                  height: NH,
                  overflow: 'hidden',
                  zIndex: 3,
                }}
                className={`rounded-2xl border transition-colors duration-300 ${
                  isActive
                    ? 'border-[var(--brand-green)] shadow-[0_0_0_3px_rgba(34,197,94,0.22),0_0_32px_rgba(34,197,94,0.52)]'
                    : 'border-white/15 shadow-lg hover:border-white/30'
                }`}
              >
                <img src={val.image} alt={val.label} className="absolute inset-0 w-full h-full object-cover" />
                <div className={`absolute inset-0 transition-all duration-300 ${
                  isActive ? 'bg-[var(--brand-green)]/70' : 'bg-gray-900/60'
                }`} />
                <div className="relative z-10 flex items-center justify-center gap-2 h-full px-4">
                  <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors duration-300 ${
                    isActive ? 'bg-white/25' : 'bg-white/10'
                  }`}>
                    <Icon size={13} className="text-white" />
                  </div>
                  <span className="text-[11px] font-semibold text-white tracking-wide leading-tight">{val.label}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Mobile / tablet (below lg) ───────────────────── */}
      <div className="lg:hidden grid grid-cols-3 gap-3 w-full max-w-sm mx-auto px-4">
        {coreValues.map((val, i) => {
          const isActive = i === active;
          const Icon = val.Icon;
          return (
            <button
              key={val.label}
              onClick={() => setActive(i)}
              className={`relative flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                isActive ? 'border-[var(--brand-green)]' : 'border-white/20'
              }`}
            >
              <img src={val.image} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className={`absolute inset-0 transition-all duration-300 ${isActive ? 'bg-[var(--brand-green)]/70' : 'bg-gray-900/62'}`} />
              <div className="relative z-10 flex flex-col items-center gap-1.5">
                <Icon size={20} className="text-white" />
                <span className="text-[10px] font-semibold text-white">{val.label}</span>
              </div>
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.3 }}
          className="lg:hidden mt-6 bg-white/[0.07] border border-white/15 backdrop-blur-sm rounded-3xl px-8 py-6 text-center w-full max-w-sm mx-auto"
        >
          <h3 className="text-white font-bold text-lg mb-2">{coreValues[active].title}</h3>
          <p className="text-white/70 text-sm leading-relaxed">{coreValues[active].text}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Gallery Carousel — Geometric Mask Hover Expansion ──────────────────────
function GalleryCarousel() {
  const [current, setCurrent] = useState(0);
  const total = gallerySlides.length;
  const navigate = useNavigate();

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const slide = gallerySlides[current];

  return (
    <div className="relative">

      {/* Slide transition wrapper */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          {/* Card — hover triggers "hovered" variant on all children */}
          <motion.div
            className="relative overflow-hidden rounded-3xl shadow-2xl cursor-pointer group"
            style={{ minHeight: 440, background: '#0f172a' }}
            whileHover="hovered"
            initial="rest"
            animate="rest"
          >
            {/* Image — pill-masked at rest (round left, flat right), fills card on hover */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
              variants={{
                                rest:    { clipPath: 'inset(0% 0% 0% 50% round 9999px 24px 24px 9999px)' },
                hovered: { clipPath: 'inset(0% 0% 0% 0% round 24px)' },
              }}
              transition={{ duration: 1.5, ease: [0.25, 1, 0.5, 1] }}
            />

            {/* Dark overlay — fades in to keep text legible over image */}
            <motion.div
              className="absolute inset-0 bg-black pointer-events-none"
              variants={{
                rest:    { opacity: 0 },
                hovered: { opacity: 0.52 },
              }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
            />

            {/* Text content — constrained to left 54% */}
            <div className="relative z-10 flex flex-col justify-center py-12 px-10 lg:px-14 min-h-[440px] md:w-[54%]">
              <p className="text-[var(--brand-green)] text-xs font-semibold uppercase tracking-widest mb-3">
                {slide.subtitle}
              </p>
              <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4 leading-snug">
                {slide.title}
              </h3>
              <p className="text-gray-300 group-hover:text-white/90 leading-relaxed mb-8 transition-colors duration-300">
                {slide.text}
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="self-start flex items-center gap-2 px-6 py-3 bg-[var(--brand-green)] hover:bg-[var(--brand-green-dark)] text-white rounded-lg font-semibold transition-colors duration-200"
              >
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls — below card on white background */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all duration-200"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2 items-center">
          {gallerySlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-200 ${
                i === current ? 'bg-[var(--brand-green)] w-5' : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        <button
          onClick={next}
          className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-all duration-200"
        >
          <ChevronRight size={18} />
        </button>
      </div>

    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white relative">
      <Header />

      {/* Hero + Our Story */}
      <section className="pt-20 lg:pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">About Us</h1>
            <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto mb-6" />
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Built on expertise, driven by impact, trusted by the world's leading organizations.
            </p>
          </motion.div>

          {/* Our Story */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: image with overlay */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/technology.jpg')" }}
              />
              <div className="absolute inset-0 bg-gray-900/65" />
              <div className="relative z-10 p-10 lg:p-14">
                <p className="text-[var(--brand-green)] font-semibold text-sm uppercase tracking-widest mb-4">Our Story</p>
                <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  A decade of turning complexity into clarity.
                </h2>
                <div className="w-16 h-1 bg-[var(--brand-green)] mt-8" />
              </div>
            </motion.div>

            {/* Right: paragraphs */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6 pt-8"
            >
              <p className="text-lg text-gray-600 leading-relaxed">
                Vulbright Inc was founded with a single conviction: that the right technology, applied thoughtfully, can transform any organization. Starting as a boutique cloud consultancy, we grew by earning trust one client at a time—delivering on promises, not just presentations.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We don't just write code; we build software, cloud ecosystems, data pipelines, and AI architectures tailored to fix real bottlenecks. Vulbright is a collective of restless, sharp, and intensely driven tech minds who genuinely care about solving messy, real-world operational problems.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                But we don't keep our expertise locked away. We run hands-on, industry-aligned training programs designed to give students the actual skills they need to step out of the classroom and confidently into a tech career.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-[var(--brand-green)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '200+', label: 'Team Members' },
              { value: '25+', label: 'Countries Served' },
              { value: '500+', label: 'Projects Delivered' },
              { value: '10+', label: 'Years of Excellence' },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-4xl font-bold mb-2">{stat.value}</div>
                <div className="text-white/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values — Interactive Cycle */}
      <section className="flex flex-col">
        {/* Title — white background */}
        <div className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto" />
            </motion.div>
          </div>
        </div>
        {/* Orbital layout — dark background */}
        <div className="bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 py-16 px-4">
          <CoreValuesCycle />
        </div>
      </section>

      {/* Our Gallery — Carousel */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="text-[var(--brand-green)] font-semibold text-sm uppercase tracking-widest mb-3">Our Gallery</p>
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Life at Vulbright</h2>
            <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <GalleryCarousel />
          </motion.div>
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="py-20 bg-[var(--brand-green)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-white/85 text-lg mb-8">Have a project in mind or want to learn more about Vulbright? We'd love to hear from you.</p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-[var(--brand-green)] rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Contact Us
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
