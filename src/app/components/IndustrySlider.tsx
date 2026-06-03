import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Industry {
  name: string;
  description: string;
  icon: string;
}

const industries: Industry[] = [
  {
    name: 'Healthcare',
    description: 'Innovative solutions for modern healthcare challenges',
    icon: '🏥'
  },
  {
    name: 'Finance',
    description: 'Secure and scalable financial technology solutions',
    icon: '💼'
  },
  {
    name: 'Manufacturing',
    description: 'Smart manufacturing and supply chain optimization',
    icon: '🏭'
  },
  {
    name: 'Retail',
    description: 'Transforming customer experiences in retail',
    icon: '🛍️'
  },
  {
    name: 'Technology',
    description: 'Cutting-edge solutions for tech companies',
    icon: '💻'
  },
  {
    name: 'Education',
    description: 'Digital transformation in education sector',
    icon: '📚'
  }
];

export function IndustrySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + itemsPerView >= industries.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? Math.max(0, industries.length - itemsPerView) : prev - 1
    );
  };

  return (
    <div className="relative px-16">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-[var(--brand-green)] hover:text-white transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{ x: -currentIndex * (100 / itemsPerView) + '%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {industries.map((industry, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[calc(33.333%-16px)] min-w-[280px]"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border-2 border-transparent hover:border-[var(--brand-green)]"
              >
                <div className="text-6xl mb-4">{industry.icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {industry.name}
                </h3>
                <p className="text-gray-600">{industry.description}</p>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg hover:bg-[var(--brand-green)] hover:text-white transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
