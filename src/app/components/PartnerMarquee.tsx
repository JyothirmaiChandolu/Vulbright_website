import { motion } from 'motion/react';

export function PartnerMarquee() {
  const partners = [
    'Amazon', 'Microsoft', 'Google', 'Apple', 'Meta',
    'IBM', 'Oracle', 'SAP', 'Cisco', 'Intel'
  ];

  const duplicatedPartners = [...partners, ...partners];

  return (
    <div className="w-full bg-white border-y border-gray-200 py-6 overflow-hidden">
      <motion.div
        className="flex gap-16"
        animate={{
          x: [0, -50 * partners.length]
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedPartners.map((partner, index) => (
          <div
            key={index}
            className="flex-shrink-0 px-8"
          >
            <div className="text-2xl font-semibold text-gray-400 hover:text-[var(--brand-green)] transition-colors duration-300 whitespace-nowrap">
              {partner}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
