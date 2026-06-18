import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const titles = [
  "Empowering Through Digital Transformation",
  "Driving Innovation Through Technical Evolution",
  "Building Intelligent Solutions for Modern Enterprises",
  "Turning Ideas into Intelligent Solutions"
];

export function AnimatedTitle() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[160px] sm:h-[200px] lg:h-[240px] mb-6 flex items-start">
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
        >
          <span className="text-[var(--brand-green)]">
            {titles[currentIndex]}
          </span>
        </motion.h1>
      </AnimatePresence>
    </div>
  );
}
