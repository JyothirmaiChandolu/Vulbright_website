import { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Mail, MapPin } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const OFFICE_ADDRESS = '20008 Champion Forest Dr, Ste 403, Spring, Texas 77379-8695';
const MAPS_QUERY = '20008+Champion+Forest+Dr,+Ste+403,+Spring,+TX+77379';

function OfficeMap() {
  return (
    <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 h-64 sm:h-80 lg:h-[480px]">
      <iframe
        src={`https://maps.google.com/maps?q=${MAPS_QUERY}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Vulbright Office Location"
      />
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Submission failed.');
      }
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">
      <Header />

      {/* Hero */}
      <section className="pt-20 lg:pt-32 pb-16 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto mb-6"></div>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              No Automated Wait Times. Let's Talk Tech Directly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-10 text-white flex flex-col overflow-hidden border border-slate-700/50 shadow-2xl"
            >
              {/* Ambient glow accent */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-teal-500/8 blur-2xl pointer-events-none" />

              <p className="relative text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">Get in Touch</p>
              <h3 className="relative text-3xl font-bold mb-4 text-white">Contact Information</h3>
              <p className="relative text-slate-300 text-sm leading-relaxed mb-6">
                Drop us a line! Whether you have a massive structural migration to plan, a complex app to build, or just want to pick our brains about architecture, we are ready to listen. We don't do endless automated phone trees—just real tech minds ready to build clean solutions with you.
              </p>

              <div className="relative space-y-6 flex-grow">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
                    <Mail size={18} className="text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">Email</h4>
                    <p className="text-white font-medium">contact@vulbright.com</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-700/60">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Business Hours</h4>
                  <p className="text-slate-300 text-sm">Monday – Friday: 9:00 AM – 6:00 PM</p>
                  <p className="text-slate-500 text-sm mt-1">Saturday – Sunday: Closed</p>
                </div>
              </div>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl p-10 shadow-xl border border-gray-200 flex flex-col"
            >
              <div className="space-y-6 flex-grow flex flex-col">
                <div>
                  <label htmlFor="name" className="block text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <label htmlFor="message" className="block text-gray-900 mb-2">Message</label>
                  <textarea
                    id="message"
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full flex-grow px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                {status === 'success' && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[var(--brand-green)] font-semibold text-sm text-center"
                  >
                    Thank you! Your message has been received. We'll get back to you shortly.
                  </motion.p>
                )}
                {status === 'error' && (
                  <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-8 py-4 bg-[var(--brand-green)] text-white rounded-lg font-semibold hover:bg-[var(--brand-green-dark)] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                  {status !== 'loading' && <Send size={20} />}
                </button>
              </div>
            </motion.form>
          </div>
        </div>
      </section>

      {/* Office Map */}
      <section className="py-16 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Office</h2>
            <div className="w-16 h-1 bg-[var(--brand-green)] mx-auto" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <OfficeMap />
          </motion.div>

          <div className="flex justify-center mt-10">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-[var(--brand-green)]/50 hover:shadow-[0_8px_30px_rgba(34,197,94,0.15)] transition-all duration-300 cursor-default w-80"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-[var(--brand-green)]/10 rounded-lg">
                  <MapPin className="text-[var(--brand-green)]" size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">USA</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{OFFICE_ADDRESS}</p>
            </motion.div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
