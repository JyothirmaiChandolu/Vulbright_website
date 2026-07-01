import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { SEO } from '../components/SEO';
import { Calendar, Clock, ArrowRight, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface Blog {
  id: number;
  category: string;
  title: string;
  caption: string;
  excerpt: string;
  bullets: { heading: string; text: string }[];
  conclusionTitle: string;
  conclusion: string;
  date: string;
  readTime: string;
  image: string;
}

const PAGE_SIZE = 7;

function twoSentences(text: string): string {
  const sentences = text.match(/[^.!?]+[.!?]+/g) ?? [];
  return sentences.slice(0, 2).join(' ').trim();
}

function BlogCard({
  blog,
  index,
  isExpanded,
  onToggle,
}: {
  blog: Blog;
  index: number;
  isExpanded: boolean;
  onToggle: (id: number) => void;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'center center'],
  });

  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReduced ? [1, 1] : [0.88, 1]
  );


  // Hide text during the grid column animation so reflow is invisible,
  // then fade it back in after the column has settled.
  const [textVisible, setTextVisible] = useState(true);
  useEffect(() => {
    setTextVisible(false);
    const t = setTimeout(() => setTextVisible(true), 280);
    return () => clearTimeout(t);
  }, [isExpanded]);

  // Scroll card top into view when expanding (accounts for fixed header ~80px)
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      const top = cardRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [isExpanded]);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/*
        CSS grid-template-columns animation: browser interpolates column tracks
        natively at 60 fps, so the content column widens without a layout snap.
        Image fades out simultaneously — eye follows the fade, not the reflow.
      */}
      <div
        className="blog-card-inner"
        style={{
          display: 'grid',
          gridTemplateColumns: isExpanded ? '1fr 0fr' : '1fr 1fr',
          transition: 'grid-template-columns 0.38s cubic-bezier(0.25, 1, 0.5, 1)',
          minHeight: 340,
        }}
      >

        {/* Content column — min-width:0 lets the grid track shrink past content */}
        <div className="p-6 md:p-10 lg:p-14 flex flex-col" style={{ minWidth: 0 }}>

          <div style={{
            opacity: textVisible ? 1 : 0,
            transition: textVisible ? 'opacity 0.28s ease' : 'opacity 0.05s ease',
          }}>
            <span className="inline-block px-4 py-1.5 bg-[var(--brand-green)]/10 text-[var(--brand-green)] text-sm font-semibold rounded-full mb-4">
              {blog.category}
            </span>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-snug">{blog.title}</h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-base">{twoSentences(blog.excerpt)}</p>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{
                    opacity: 1,
                    height: 'auto',
                    transition: { duration: 0.45, ease: 'easeOut', delay: 0.2 },
                  }}
                  exit={{
                    opacity: 0,
                    height: 0,
                    transition: { duration: 0.25, ease: 'easeIn' },
                  }}
                  className="overflow-hidden"
                >
                  <p className="text-[var(--brand-green)] font-medium italic mb-5 text-base">{blog.caption}</p>
                  <p className="text-gray-600 leading-relaxed mb-6 text-base">{blog.excerpt}</p>
                  <ul className="space-y-4 mb-6">
                    {blog.bullets.map((b: { heading: string; text: string }) => (
                      <li key={b.heading} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--brand-green)] shrink-0" />
                        <span><span className="font-semibold text-gray-900">{b.heading}:</span> {b.text}</span>
                      </li>
                    ))}
                  </ul>
                  {blog.conclusionTitle && (
                    <p className="text-lg font-bold text-gray-900 mb-2">{blog.conclusionTitle}</p>
                  )}
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">{blog.conclusion}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5"><Calendar size={14} />{blog.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{blog.readTime}</span>
            </div>
            <button
              onClick={() => onToggle(blog.id)}
              className="flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-green)] hover:gap-3 transition-all duration-200"
            >
              {isExpanded ? (
                <><ChevronUp size={15} /> Read Less</>
              ) : (
                <>Learn More <ArrowRight size={15} /></>
              )}
            </button>
          </div>
        </div>

        {/* Image column — overflow:hidden masks the image as its track shrinks to 0 */}
        <div
          className="hidden md:block overflow-hidden"
          style={{
            minWidth: 0,
            opacity: isExpanded ? 0 : 1,
            transition: 'opacity 0.35s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          <motion.img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover"
            style={{ scale: imageScale }}
          />
        </div>

      </div>
    </motion.article>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Subscription failed.');
      const data = await res.json();
      setMessage(data.already_subscribed ? 'You are already subscribed!' : "You're subscribed! Welcome to the Vulbright community.");
      setStatus('success');
      setEmail('');
    } catch {
      setMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-16 rounded-3xl bg-lime-100 overflow-hidden"
    >
      <div className="grid lg:grid-cols-2">
        {/* Left — heading + image */}
        <div className="p-10 lg:p-14">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8 leading-tight">
            Subscribe to our newsletter.
          </h2>
          <img
            src="/images/blog-analytics.jpg"
            alt="Newsletter"
            className="rounded-2xl w-full h-52 object-cover"
          />
        </div>

        {/* Right — description + form + social */}
        <div className="p-10 lg:p-14 flex flex-col justify-center">
          <p className="text-gray-700 leading-relaxed mb-8">
            Stay ahead of the curve in cloud, AI, and digital transformation. Our newsletter delivers exclusive insights, case studies, and industry trends directly to your inbox — knowledge that's shaping the future of enterprise technology.
          </p>

          {status === 'success' ? (
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[var(--brand-green)] font-semibold text-lg mb-8"
            >
              {message}
            </motion.p>
          ) : (
            <>
              {status === 'error' && <p className="text-red-500 text-sm mb-3">{message}</p>}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 mb-8">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] text-gray-900"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 whitespace-nowrap"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </motion.section>
  );
}

export default function BlogsPage() {
  const navigate = useNavigate();
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/blogs`)
      .then((r) => r.json())
      .then((data) => { setBlogs(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const handleToggle = (id: number) =>
    setExpandedId((prev) => (prev === id ? null : id));

  const totalPages = Math.ceil(blogs.length / PAGE_SIZE);
  const shown = blogs.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const goToPage = (p: number) => {
    setPage(p);
    setExpandedId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white relative">
      <SEO
        title="Insights & Blog | Vulbright"
        description="Read the latest insights on cloud, AI, data engineering, and digital transformation from Vulbright's technology experts."
        canonical="/blogs"
      />
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
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">Our Blog</h1>
            <div className="w-24 h-1 bg-[var(--brand-green)] mx-auto mb-6" />
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Expert perspectives on cloud, AI, data, and digital transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog posts — vertical stack */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-10 h-10 border-4 border-[var(--brand-green)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-12">
                {shown.map((blog, i) => (
                  <BlogCard
                    key={blog.id}
                    blog={blog}
                    index={i}
                    isExpanded={expandedId === blog.id}
                    onToggle={handleToggle}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-14">
                  <button
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    ← Prev
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`w-10 h-10 rounded-lg font-semibold text-sm transition-colors duration-200 ${
                        p === page
                          ? 'bg-[var(--brand-green)] text-white'
                          : 'border border-gray-200 text-gray-600 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)]'
                      }`}
                    >
                      {p}
                    </button>
                  ))}

                  <button
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                    className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}

          <Newsletter />
        </div>
      </section>

      {/* Get in Touch CTA */}
      <section className="py-20 bg-[var(--brand-green)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
            <p className="text-white/85 text-lg mb-8">Ready to put these insights into action? Let's talk about how we can help your business.</p>
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
