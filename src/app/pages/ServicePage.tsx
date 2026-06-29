import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { SEO } from '../components/SEO';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, CheckCircle, ArrowRight, ChevronDown, Wrench } from 'lucide-react';

const toolLogoMap: Record<string, string> = {
  // Cloud
  'AWS': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'Microsoft Azure': 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg',
  'Google Cloud': 'https://cdn.simpleicons.org/googlecloud',
  'Terraform': 'https://cdn.simpleicons.org/terraform',
  'Kubernetes': 'https://cdn.simpleicons.org/kubernetes',
  'Docker': 'https://cdn.simpleicons.org/docker',
  'Ansible': 'https://cdn.simpleicons.org/ansible',
  'Pulumi': 'https://cdn.simpleicons.org/pulumi',
  'Helm': 'https://cdn.simpleicons.org/helm',
  'Prometheus': 'https://cdn.simpleicons.org/prometheus',
  'Grafana': 'https://cdn.simpleicons.org/grafana',
  'CloudFormation': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  // AI & ML
  'TensorFlow': 'https://cdn.simpleicons.org/tensorflow',
  'PyTorch': 'https://cdn.simpleicons.org/pytorch',
  'Scikit-learn': 'https://cdn.simpleicons.org/scikitlearn',
  'Hugging Face': 'https://cdn.simpleicons.org/huggingface',
  'MLflow': 'https://cdn.simpleicons.org/mlflow',
  'Vertex AI': 'https://cdn.simpleicons.org/googlecloud',
  'SageMaker': 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg',
  'OpenAI API': 'https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg',
  'LangChain': 'https://cdn.simpleicons.org/langchain',
  'Jupyter': 'https://cdn.simpleicons.org/jupyter',
  'ONNX': 'https://cdn.simpleicons.org/onnx',
  'Ray': 'https://cdn.simpleicons.org/ray',
  // Data Engineering
  'Apache Spark': 'https://cdn.simpleicons.org/apachespark',
  'Apache Kafka': 'https://cdn.simpleicons.org/apachekafka',
  'Apache Airflow': 'https://cdn.simpleicons.org/apacheairflow',
  'dbt': 'https://www.vectorlogo.zone/logos/getdbt/getdbt-icon.svg',
  'dbt Cloud': 'https://www.vectorlogo.zone/logos/getdbt/getdbt-icon.svg',
  'Snowflake': 'https://cdn.simpleicons.org/snowflake',
  'Databricks': 'https://cdn.simpleicons.org/databricks',
  'Fivetran': 'https://www.vectorlogo.zone/logos/fivetran/fivetran-icon.svg',
  'Apache Flink': 'https://cdn.simpleicons.org/apacheflink',
  'Delta Lake': 'https://www.vectorlogo.zone/logos/delta_io/delta_io-icon.svg',
  'Apache Iceberg': 'https://cdn.simpleicons.org/apache',
  // Data Science
  'Python': 'https://cdn.simpleicons.org/python',
  'R': 'https://cdn.simpleicons.org/r',
  'Tableau': 'https://cdn.simpleicons.org/tableau',
  'Power BI': 'https://cdn.simpleicons.org/powerbi',
  'Looker': 'https://cdn.simpleicons.org/looker',
  'pandas': 'https://cdn.simpleicons.org/pandas',
  'NumPy': 'https://cdn.simpleicons.org/numpy',
  'Matplotlib': 'https://upload.wikimedia.org/wikipedia/commons/8/84/Matplotlib_icon.svg',
  'Seaborn': 'https://cdn.simpleicons.org/python',
  'XGBoost': 'https://cdn.simpleicons.org/python',
  'statsmodels': 'https://cdn.simpleicons.org/python',
  'Apache Superset': 'https://cdn.simpleicons.org/apache',
  // Software
  'React': 'https://cdn.simpleicons.org/react',
  'Node.js': 'https://cdn.simpleicons.org/nodedotjs',
  'TypeScript': 'https://cdn.simpleicons.org/typescript',
  'PostgreSQL': 'https://cdn.simpleicons.org/postgresql',
  'GitHub Actions': 'https://cdn.simpleicons.org/githubactions',
  'GraphQL': 'https://cdn.simpleicons.org/graphql',
  'Redis': 'https://cdn.simpleicons.org/redis',
  'Elasticsearch': 'https://cdn.simpleicons.org/elasticsearch',
  'Next.js': 'https://cdn.simpleicons.org/nextdotjs',
  'Playwright': 'https://cdn.simpleicons.org/playwright',
  // Digital Transformation
  'Salesforce': 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg',
  'ServiceNow': 'https://www.vectorlogo.zone/logos/servicenow/servicenow-icon.svg',
  'Microsoft 365': 'https://cdn.simpleicons.org/microsoftoffice',
  'Power Automate': 'https://cdn.simpleicons.org/microsoftpowerautomate',
  'Jira': 'https://cdn.simpleicons.org/jira',
  'Confluence': 'https://cdn.simpleicons.org/confluence',
  'Figma': 'https://cdn.simpleicons.org/figma',
  'SAP': 'https://cdn.simpleicons.org/sap',
  'Workday': 'https://www.vectorlogo.zone/logos/workday/workday-icon.svg',
  'UiPath': 'https://cdn.simpleicons.org/uipath',
  'Miro': 'https://cdn.simpleicons.org/miro',
  'Zapier': 'https://cdn.simpleicons.org/zapier',
};
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { services } from '../data/services';

function ToolLogoImg({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Wrench size={36} className="text-[var(--brand-green)] transition-transform duration-200 group-hover:scale-110" />;
  return (
    <img
      src={src}
      alt={alt}
      className="w-14 h-14 object-contain transition-transform duration-200 group-hover:scale-110"
      onError={() => setFailed(true)}
    />
  );
}

function FAQCard({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      onClick={() => setOpen(!open)}
      className="border-2 border-green-100 rounded-2xl bg-white p-6 cursor-pointer hover:border-[var(--brand-green)]/40 hover:shadow-md transition-all duration-200 h-full flex flex-col"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-bold text-gray-900 text-base leading-snug">{q}</h3>
        <ChevronDown
          size={18}
          className={`text-[var(--brand-green)] shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </div>
      <div className="h-px bg-green-100 mt-4" />
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <p className="text-gray-600 text-sm leading-relaxed pt-4">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function wrapSVGText(text: string, maxChars: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function StepSVGLabel({ step, num, x, cy, anchor }: { step: string; num: number; x: number; cy: number; anchor: 'start' | 'end' | 'middle' }) {
  const lines = wrapSVGText(step, 22);
  const startY = cy - (lines.length - 1) * 10;
  return (
    <g>
      <text x={x} y={startY - 24} textAnchor={anchor} fill="#7FB539" fontSize="11" fontWeight="bold" fontFamily="system-ui,sans-serif" letterSpacing="1.5">
        STEP {num}
      </text>
      {lines.map((line, i) => (
        <text key={i} x={x} y={startY + i * 20} textAnchor={anchor} fill="#111827" fontSize="17" fontWeight="600" fontFamily="system-ui,sans-serif">
          {line}
        </text>
      ))}
    </g>
  );
}

export default function ServicePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services.find((s) => s.id === id);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <button onClick={() => navigate('/')} className="px-6 py-3 bg-[var(--brand-green)] text-white rounded-lg font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const otherServices = services.filter((s) => s.id !== service.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-white relative">
      <SEO
        title={`${service.title} | Vulbright`}
        description={service.description}
        canonical={`/services/${service.id}`}
        ogImage={service.bgImage}
      />
      <div className="relative z-10">
      <Header />

      {/* Hero */}
      <section className="relative h-[68vh] flex items-end pt-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${service.bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/60 to-slate-900/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="absolute top-20 lg:top-36 left-4 lg:left-10 z-20 flex items-center gap-2 text-white/70 hover:text-white transition-colors p-3 -m-3"
        >
          <ArrowLeft size={20} /> Back
        </motion.button>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-16 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-[var(--brand-green)] font-semibold text-sm uppercase tracking-widest mb-4">
              {service.tagline}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 max-w-2xl leading-tight">
              {service.title}
            </h1>
            <div className="w-16 h-1 bg-[var(--brand-green)] mb-5" />
            <p className="text-white/75 text-lg max-w-xl leading-relaxed">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition Split: Why Choose (left) | Key Features (right) */}
      <section className="py-24 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* LEFT — Why Choose */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-3">Why Choose Our</h2>
              <h2 className="text-4xl font-bold text-[var(--brand-green)] mb-6">{service.title}?</h2>
              <div className="w-16 h-1 bg-[var(--brand-green)] mb-8" />
              <p className="text-lg text-gray-600 leading-relaxed mb-8">{service.whyChoose}</p>
              <div className="space-y-3">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <CheckCircle className="text-[var(--brand-green)] shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700">{b}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Key Features */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 shadow-lg"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h3>
              <div className="space-y-4">
                {service.features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07 }}
                    className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:border-[var(--brand-green)]/40 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[var(--brand-green)]/10 flex items-center justify-center shrink-0">
                      <span className="text-[var(--brand-green)] font-bold text-sm">{i + 1}</span>
                    </div>
                    <span className="text-gray-700 font-medium">{f}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools & Technologies */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tools & Technologies</h2>
            <div className="w-16 h-1 bg-[var(--brand-green)] mx-auto mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work with industry-leading platforms and frameworks to deliver best-in-class solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-10">
            {service.tools.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="flex flex-col items-center gap-2 group"
              >
                {toolLogoMap[tool] ? (
                  <ToolLogoImg src={toolLogoMap[tool]} alt={tool} />
                ) : (
                  <Wrench size={36} className="text-[var(--brand-green)] group-hover:scale-110 transition-transform duration-200" />
                )}
                <span className="text-xs font-semibold text-gray-600 text-center leading-tight">{tool}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <div className="w-16 h-1 bg-[var(--brand-green)] mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {service.faq.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="h-full"
              >
                <FAQCard q={item.q} a={item.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="pt-10 pb-24 bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <p className="text-[var(--brand-green)] text-sm font-semibold uppercase tracking-widest mb-3">How We Work</p>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <div className="w-16 h-1 bg-[var(--brand-green)] mx-auto" />
          </motion.div>

          {/* Desktop: tree SVG diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden lg:block"
          >
            <svg viewBox="0 -80 900 520" className="w-full" xmlns="http://www.w3.org/2000/svg">
              {/* Tree image */}
              <image href="/images/tree.png" x="250" y="30" width="400" height="400" />
              {/* Step text labels — clockwise: bottom-left → upper-left → top → upper-right → bottom-right */}
              <StepSVGLabel step={service.process[0]} num={1} x={236} cy={250} anchor="end" />
              <StepSVGLabel step={service.process[1]} num={2} x={236} cy={120} anchor="end" />
              <StepSVGLabel step={service.process[2]} num={3} x={450} cy={10} anchor="middle" />
              <StepSVGLabel step={service.process[3]} num={4} x={664} cy={120} anchor="start" />
              <StepSVGLabel step={service.process[4]} num={5} x={664} cy={250} anchor="start" />
            </svg>
          </motion.div>

          {/* Mobile: 2×2 grid */}
          <div className="lg:hidden grid sm:grid-cols-2 gap-4">
            {service.process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white border border-green-200 rounded-2xl p-5"
              >
                <div className="w-9 h-9 rounded-full bg-[var(--brand-green)] text-white font-bold text-sm flex items-center justify-center mb-3">
                  {index + 1}
                </div>
                <p className="font-semibold text-gray-900 text-sm leading-snug">{step}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-10">Explore Other Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s, index) => (
              <motion.button
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/services/${s.id}`)}
                className="text-left p-6 rounded-2xl border border-gray-200 hover:border-[var(--brand-green)] hover:shadow-lg transition-all duration-300 group"
              >
                <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-[var(--brand-green)] transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{s.tagline}</p>
                <span className="flex items-center gap-1 text-[var(--brand-green)] text-sm font-medium">
                  Learn More <ArrowRight size={14} />
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--brand-green)]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
            <p className="text-white/85 text-lg mb-8">Let's discuss how our {service.title} solutions can transform your business.</p>
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-[var(--brand-green)] rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Contact Us Today
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
      </div>
    </div>
  );
}
