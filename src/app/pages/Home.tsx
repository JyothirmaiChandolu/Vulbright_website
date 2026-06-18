import { useState } from 'react';
import { motion } from 'motion/react';
import { Target, Eye } from 'lucide-react';
import { useNavigate } from 'react-router';
import { NetworkParticles } from '../components/NetworkParticles';
import { ServiceCard } from '../components/ServiceCard';
import { IndustrySliderImproved } from '../components/IndustrySliderImproved';
import { AnimatedTitle } from '../components/AnimatedTitle';
import { services } from '../data/services';

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <section id="home" className="min-h-screen pt-16 lg:pt-28 relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-200px)]">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatedTitle />
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Transform your business with cutting-edge technology solutions designed for the modern enterprise.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-[var(--brand-green)] text-white rounded-lg font-semibold hover:bg-[var(--brand-green-dark)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Quote
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block h-[500px]"
            >
              <NetworkParticles />
            </motion.div>
          </div>
        </div>

      </section>

      <section id="about-us" className="py-24 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Our Purpose</h2>
            <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Vision — left column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
              className="bg-white rounded-3xl p-10 shadow-xl border-l-4 border-[var(--brand-green)] transition-colors duration-300 hover:border-[var(--brand-green-dark)] cursor-default"
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="p-4 bg-[var(--brand-green)] rounded-xl"
                >
                  <Eye className="text-white" size={32} />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900">Our Vision</h3>
              </motion.div>
              <p className="text-sm font-semibold text-[var(--brand-green)] uppercase tracking-widest mb-3">Total Digital Freedom, Unleashed Everywhere.</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our goal is to make modern enterprise management so seamless and profitable that building next-gen systems becomes the absolute dream job for this generation's technical minds. We are here to locate operational friction, wipe it out with modern tech stacks, and open up premium digital networks for students in rural communities.
              </p>
            </motion.div>

            {/* Mission — right column */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              whileHover={{ y: -8, boxShadow: '0 24px 48px rgba(0,0,0,0.12)' }}
              className="bg-white rounded-3xl p-10 shadow-xl border-l-4 border-[var(--brand-green)] transition-colors duration-300 hover:border-[var(--brand-green-dark)] cursor-default"
            >
              <motion.div
                className="flex items-center gap-4 mb-6"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <motion.div
                  whileHover={{ rotate: -8, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="p-4 bg-[var(--brand-green)] rounded-xl"
                >
                  <Target className="text-white" size={32} />
                </motion.div>
                <h3 className="text-3xl font-bold text-gray-900">Our Mission</h3>
              </motion.div>
              <p className="text-sm font-semibold text-[var(--brand-green)] uppercase tracking-widest mb-3">Purpose-Driven Software for Global Scale.</p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Our mission is straightforward: engineer intelligent, practical solutions across commercial, corporate, and educational landscapes. We look for the technical fractures slowing down organizations—whether they are massive global enterprises or lean local startups—and build the custom code that gets them running smoothly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Our Services</h2>
              <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto mb-6"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                Comprehensive technology solutions tailored to your business needs
              </p>
            </motion.div>
          </div>
        </div>

        <div className="relative overflow-hidden py-16">
          <div className="absolute inset-0">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{
                  opacity: activeService === index ? 1 : 0,
                  backgroundImage: `url(${service.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            ))}
            <div className="absolute inset-0 bg-white/55"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="h-full"
                >
                  <ServiceCard
                    title={service.title}
                    tagline={service.tagline}
                    features={service.features}
                    onHover={() => setActiveService(index)}
                    isActive={activeService === index}
                    onLearnMore={() => navigate(`/services/${service.id}`)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="industries" className="py-16 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto mb-4"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Delivering specialized solutions across diverse sectors
            </p>
          </motion.div>

          <IndustrySliderImproved />
        </div>
      </section>
    </div>
  );
}
