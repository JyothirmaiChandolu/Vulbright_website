import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  tagline: string;
  features: string[];
  onHover: () => void;
  isActive: boolean;
  onLearnMore?: () => void;
}

export function ServiceCard({ title, tagline, features, onHover, isActive, onLearnMore }: ServiceCardProps) {
  return (
    <motion.div
      onMouseEnter={onHover}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`relative p-5 rounded-2xl backdrop-blur-md transition-all duration-500 cursor-pointer group h-full flex flex-col ${
        isActive
          ? 'bg-white/95 shadow-2xl'
          : 'bg-white/60 shadow-lg hover:bg-white/80'
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs font-medium text-[var(--brand-green)] mb-2">{tagline}</p>
      <ul className="space-y-1 flex-grow">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-green)] shrink-0" />
            {f}
          </li>
        ))}
      </ul>

      {onLearnMore && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLearnMore();
          }}
          className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)] hover:gap-3 transition-all duration-200"
        >
          Learn More <ArrowRight size={15} />
        </button>
      )}

      <div className={`absolute bottom-0 left-0 h-1 bg-[var(--brand-green)] rounded-b-2xl transition-all duration-500 ${
        isActive ? 'w-full' : 'w-0 group-hover:w-full'
      }`} />
    </motion.div>
  );
}
