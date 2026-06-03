import { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart, DollarSign, Factory, ShoppingBag, Cpu, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface Industry {
  name: string;
  description: string;
  lines: string[];
  icon: React.ReactNode;
  image: string;
}

const industries: Industry[] = [
  {
    name: 'Healthcare',
    description: 'Innovative solutions for modern healthcare challenges',
    lines: [
      'AI-powered diagnostics and patient data platforms',
      'Compliant cloud infrastructure for EHR and telehealth',
      'Predictive analytics to reduce readmissions and costs',
    ],
    icon: <Heart size={28} />,
    image: '/images/healthcare.jpg',
  },
  {
    name: 'Finance',
    description: 'Secure and scalable financial technology solutions',
    lines: [
      'Real-time fraud detection and risk modeling systems',
      'Secure cloud migration for core banking workloads',
      'Data pipelines powering regulatory reporting and insights',
    ],
    icon: <DollarSign size={28} />,
    image: '/images/finance.jpg',
  },
  {
    name: 'Manufacturing',
    description: 'Smart manufacturing and supply chain optimization',
    lines: [
      'IoT-integrated data pipelines for shop-floor visibility',
      'Predictive maintenance models to minimize downtime',
      'Process automation and digital twins for lean operations',
    ],
    icon: <Factory size={28} />,
    image: '/images/manufacturing.jpg',
  },
  {
    name: 'Retail',
    description: 'Transforming customer experiences in retail',
    lines: [
      'Personalization engines and recommendation systems',
      'Unified commerce platforms connecting online and in-store',
      'Demand forecasting and inventory optimization at scale',
    ],
    icon: <ShoppingBag size={28} />,
    image: '/images/retail.jpg',
  },
  {
    name: 'Technology',
    description: 'Cutting-edge solutions for tech companies',
    lines: [
      'Scalable microservices and cloud-native architecture',
      'MLOps platforms and AI product development',
      'DevOps acceleration with CI/CD and infrastructure automation',
    ],
    icon: <Cpu size={28} />,
    image: '/images/technology.jpg',
  },
  {
    name: 'Education',
    description: 'Digital transformation in education sector',
    lines: [
      'Learning management platforms and adaptive content tools',
      'Analytics dashboards tracking student outcomes at scale',
      'Secure cloud infrastructure for institutions and EdTech firms',
    ],
    icon: <BookOpen size={28} />,
    image: '/images/education.jpg',
  },
];

const N = industries.length;
const CARD_W = 420;
const STEP = 460;

function relPos(idx: number, active: number): number {
  let r = (idx - active + N) % N;
  if (r > N / 2) r -= N;
  return r;
}

export function IndustrySliderImproved() {
  const [active, setActive] = useState(0);
  const nav = (dir: number) => setActive((a) => (a + dir + N) % N);

  return (
    <div className="relative select-none">

      {/* Cards — flex row, centered, no clipping container */}
      <div className="flex items-end justify-center" style={{ height: 520, position: 'relative' }}>
        {industries.map((ind, idx) => {
          const rel = relPos(idx, active);
          const isCenter = rel === 0;
          const visible = Math.abs(rel) <= 1;

          return (
            <motion.div
              key={idx}
              className="absolute rounded-3xl overflow-hidden bg-white cursor-pointer group"
              style={{ width: CARD_W }}
              animate={{
                x: rel * STEP,
                y: isCenter ? -48 : 0,
                scale: isCenter ? 1 : 0.87,
                opacity: visible ? 1 : 0,
                zIndex: isCenter ? 3 : visible ? 2 : 0,
                boxShadow: isCenter
                  ? '0 28px 72px rgba(0,0,0,0.18)'
                  : '0 4px 16px rgba(0,0,0,0.08)',
              }}
              transition={{ duration: 0.52, ease: [0.32, 0.72, 0, 1] }}
              whileHover={{
                y: isCenter ? -58 : -10,
                transition: { duration: 0.25, ease: 'easeOut' },
              }}
              onClick={() => !isCenter && nav(rel > 0 ? 1 : -1)}
            >
              {/* Border overlay — drawn on hover via CSS */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-[var(--brand-green)] transition-colors duration-300 z-10 pointer-events-none" />

              <div className="h-64">
                <img src={ind.image} alt={ind.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 bg-white" style={{ minHeight: 200 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[var(--brand-green)]">{ind.icon}</span>
                  <h3 className="text-xl font-bold text-gray-900">{ind.name}</h3>
                </div>
                <ul className="space-y-2">
                  {ind.lines.map((line) => (
                    <li key={line} className="flex items-start gap-2 text-gray-600 text-sm leading-relaxed">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-green)] shrink-0" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation — arrow · dots · arrow, centered */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={() => nav(-1)}
          className="w-12 h-12 rounded-full border-2 border-[var(--brand-green)] text-[var(--brand-green)] flex items-center justify-center hover:bg-[var(--brand-green)] hover:text-white transition-all duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {industries.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`rounded-full transition-all duration-300 ${
                i === active
                  ? 'w-6 h-2.5 bg-[var(--brand-green)]'
                  : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => nav(1)}
          className="w-12 h-12 rounded-full border-2 border-[var(--brand-green)] text-[var(--brand-green)] flex items-center justify-center hover:bg-[var(--brand-green)] hover:text-white transition-all duration-300"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
