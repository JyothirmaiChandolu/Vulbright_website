import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Clock, Briefcase, ChevronDown, ChevronUp, ArrowRight, X, Upload, CheckCircle } from 'lucide-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
}

const hiringSteps = [
  { step: '01', title: 'Apply Online', description: 'Submit your resume via our contact form or email careers@vulbright.com. No lengthy cover letter required.' },
  { step: '02', title: 'Initial Screening', description: 'A 30-minute call with our recruiting team to learn about your background and walk you through the role and team.' },
  { step: '03', title: 'Technical Interview', description: 'A focused 60-minute session with the hiring team. We assess real-world skills, not trivia — expect practical problems.' },
  { step: '04', title: 'Final Interview', description: 'Meet broader team members and leadership. We want to ensure the fit is right for both sides before moving forward.' },
  { step: '05', title: 'Offer & Onboarding', description: 'Receive your offer and hit the ground running with a structured 30-day onboarding program built for your role.' },
];

// ── Apply Modal ───────────────────────────────────────────────────────────────

function ApplyModal({ job, onClose }: { job: Job; onClose: () => void }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [consent, setConsent] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const handleFile = (file: File) => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    if (!['pdf', 'doc', 'docx'].includes(ext ?? '')) {
      setErrorMsg('Only PDF, DOC, or DOCX files are accepted.');
      return;
    }
    setErrorMsg('');
    setResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) { setErrorMsg('Please upload your resume.'); return; }
    setStatus('loading');
    setErrorMsg('');
    try {
      const fd = new FormData();
      fd.append('job_id', String(job.id));
      fd.append('job_title', job.title);
      fd.append('first_name', form.firstName);
      fd.append('last_name', form.lastName);
      fd.append('email', form.email);
      fd.append('phone', form.phone);
      fd.append('consent', String(consent));
      fd.append('resume', resumeFile);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/applications`, { method: 'POST', body: fd });
      if (!res.ok) {
        let msg = 'Submission failed. Please try again.';
        try { const data = await res.json(); msg = data.detail || msg; } catch {}
        throw new Error(msg);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-8">
          {status === 'success' ? (
            <div className="flex flex-col items-center text-center py-8">
              <CheckCircle size={56} className="text-[var(--brand-green)] mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Application Submitted!</h3>
              <p className="text-gray-600 mb-6">Thank you for applying for <strong>{job.title}</strong>. We'll review your application and get back to you shortly.</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-[var(--brand-green)] text-white font-semibold rounded-lg hover:bg-[var(--brand-green-dark)] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">My Application</p>
              <h2 className="text-xl font-bold text-[var(--brand-green)] mb-2">{job.title}</h2>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full mb-6">
                <MapPin size={12} />{job.location}
              </span>

              <p className="text-sm font-semibold text-gray-700 mb-4">Requirements to apply:</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">First Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Last Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-green)] focus:border-transparent"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                  <PhoneInput
                    country={'us'}
                    value={form.phone}
                    onChange={(phone) => setForm({ ...form, phone })}
                    inputStyle={{ width: '100%', height: '42px', fontSize: '14px', borderColor: '#e5e7eb', backgroundColor: '#f9fafb', borderRadius: '8px' }}
                    buttonStyle={{ borderColor: '#e5e7eb', backgroundColor: '#f9fafb', borderRadius: '8px 0 0 8px' }}
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-[var(--brand-green)] shrink-0"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    I consent to receive employment-related communications from Vulbright Inc. at the contact information provided. Message and data rates may apply.
                  </span>
                </label>

                {/* Resume upload */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Upload Your Resume <span className="text-red-500">*</span></label>
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors duration-200 ${
                      dragging ? 'border-[var(--brand-green)] bg-[var(--brand-green)]/5' : 'border-gray-200 hover:border-[var(--brand-green)]/50 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
                    />
                    {resumeFile ? (
                      <div className="flex items-center justify-center gap-2 text-[var(--brand-green)]">
                        <CheckCircle size={18} />
                        <span className="text-sm font-medium">{resumeFile.name}</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Drag and drop a file</p>
                        <p className="text-xs text-[var(--brand-green)] font-medium mt-1">or browse your device</p>
                        <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX accepted</p>
                      </>
                    )}
                  </div>
                </div>

                {errorMsg && <p className="text-red-500 text-xs text-center">{errorMsg}</p>}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3 bg-[var(--brand-green)] text-white font-semibold rounded-lg hover:bg-[var(--brand-green-dark)] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Submitting…' : 'Submit Application'}
                </button>
              </form>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

// ── Job Card ──────────────────────────────────────────────────────────────────

function JobCard({ job, onApply }: { job: Job; onApply: () => void }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <span className="inline-block px-3 py-1 bg-[var(--brand-green)]/10 text-[var(--brand-green)] text-xs font-semibold rounded-full mb-3">
              {job.department}
            </span>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5"><MapPin size={14} />{job.location}</span>
              <span className="flex items-center gap-1.5"><Clock size={14} />{job.type}</span>
              <span className="flex items-center gap-1.5"><Briefcase size={14} />{job.department}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onApply}
              className="px-5 py-2.5 bg-[var(--brand-green)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--brand-green-dark)] transition-colors duration-200"
            >
              Apply Now
            </button>
            <button
              onClick={() => setExpanded((v) => !v)}
              className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:border-[var(--brand-green)] hover:text-[var(--brand-green)] transition-colors duration-200"
            >
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto', transition: { duration: 0.35, ease: 'easeOut' } }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2, ease: 'easeIn' } }}
              className="overflow-hidden"
            >
              <div className="pt-6 mt-6 border-t border-gray-100">
                <p className="text-gray-600 leading-relaxed mb-5">{job.description}</p>
                <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">Requirements</h4>
                <ul className="space-y-2">
                  {job.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-gray-600 text-sm">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--brand-green)] shrink-0" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function roundedRectPath(w: number, h: number, r: number): string {
  return [
    `M ${w / 2} 0`,
    `L ${w - r} 0`,
    `Q ${w} 0 ${w} ${r}`,
    `L ${w} ${h - r}`,
    `Q ${w} ${h} ${w - r} ${h}`,
    `L ${r} ${h}`,
    `Q 0 ${h} 0 ${h - r}`,
    `L 0 ${r}`,
    `Q 0 0 ${r} 0`,
    `Z`,
  ].join(' ');
}

function HiringStepCard({ step, index }: { step: typeof hiringSteps[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => {
      const { width, height } = el.getBoundingClientRect();
      setDims({ w: width, h: height });
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div
        ref={containerRef}
        className="relative flex flex-col p-6 lg:p-8 rounded-2xl cursor-default"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {dims.w > 0 && (
          <svg
            className="absolute inset-0 pointer-events-none"
            width={dims.w}
            height={dims.h}
            style={{ overflow: 'visible' }}
          >
            <motion.path
              d={roundedRectPath(dims.w, dims.h, 16)}
              fill="none"
              stroke="#22c55e"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={hovered ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{
                pathLength: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: hovered ? 0.1 : 0.5 },
              }}
              style={{ filter: 'drop-shadow(0 0 5px rgba(34,197,94,0.75))' }}
            />
          </svg>
        )}
        <div className="text-4xl font-black text-[var(--brand-green)]/20 mb-4 leading-none">{step.step}</div>
        <h3 className="text-white font-bold mb-2">{step.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
      </div>
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CareersPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then((r) => r.json())
      .then((data) => setJobs(data))
      .catch(() => setJobs([]))
      .finally(() => setLoadingJobs(false));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              style={{ paddingLeft: '2cm' }}
            >
              <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Join Us
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our mission is to inspire <strong>innovation and collaboration</strong> while fostering a culture where everyone feels valued. We believe in harnessing our collective strengths to make a <strong>positive impact</strong> on the communities we serve.
              </p>
              <a
                href="#openings"
                className="self-start w-fit px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors duration-200 inline-flex items-center gap-2"
              >
                View Open Roles <ArrowRight size={18} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center items-end"
              style={{ paddingLeft: '1cm' }}
            >
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white shadow-2xl mt-12">
                <img src="/images/team.jpg" alt="Join Vulbright" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 mb-10"
          >
            Why Join Us?
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Innovation', desc: 'Experience seamless collaboration and innovation with our cutting-edge approach, designed to enhance productivity while ensuring adaptability for various work environments.', image: '/images/team.jpg' },
              { label: 'Service', desc: 'Enjoy exceptional service tailored to your needs, delivered by our dedicated team, committed to creating a welcoming atmosphere that prioritizes your satisfaction.', image: '/images/technology.jpg' },
              { label: 'Community', desc: 'Join a vibrant community where every interaction fosters connection and engagement, enhancing personal growth and shared experiences through thoughtfully designed programs.', image: '/images/integrity.jpg' },
              { label: 'Impact', desc: 'Discover the power of our work, designed to create meaningful impact and drive positive change within the community, encouraging collaboration and shared goals.', image: '/images/globe.jpg' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <img src={item.image} alt={item.label} className="w-full h-44 object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{item.label}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section id="openings" className="py-16 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Current Openings</h2>
            <div className="w-16 h-1 bg-[var(--brand-green)] mx-auto mb-4" />
            <p className="text-gray-600">Click a role to see full details and requirements.</p>
          </motion.div>

          {loadingJobs ? (
            <div className="text-center py-12 text-gray-400">Loading openings…</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No openings at this time. Check back soon.</div>
          ) : (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job} onApply={() => setSelectedJob(job)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Hiring Process */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-[var(--brand-green)] font-semibold text-sm uppercase tracking-widest mb-3">What to Expect</p>
            <h2 className="text-4xl font-bold text-white mb-4">Hiring Process at a Glance</h2>
            <div className="w-16 h-1 bg-[var(--brand-green)] mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {hiringSteps.map((step, i) => (
              <HiringStepCard key={step.step} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Don't See Your Role?</h2>
            <p className="text-gray-600 text-lg mb-8">
              We're always interested in exceptional talent. Send us your resume and we'll keep you in mind for future openings.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-[var(--brand-green)] text-white font-bold rounded-lg hover:bg-[var(--brand-green-dark)] transition-colors duration-200"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* Apply Modal */}
      <AnimatePresence>
        {selectedJob && (
          <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
