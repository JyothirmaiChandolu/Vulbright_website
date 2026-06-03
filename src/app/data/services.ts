export interface Service {
  id: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  bgImage: string;
  extendedDescription: string;
  benefits: string[];
  process: string[];
  whyChoose: string;
  tools: string[];
  faq: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    id: 'cloud',
    title: 'Cloud Solutions',
    tagline: 'Build a digital foundation that never flinches under heavy traffic.',
    description: 'Moving to the cloud shouldn\'t feel like a gamble. We architect high-speed, redundant decentralized cloud systems that stay up when traffic spikes, ensuring 99.99% uptime without burning through your infrastructure budget.',
    features: ['Cloud migration & lift-and-shift', 'Cost optimization & auto-scaling', 'Multi-cloud & hybrid deployments', 'Disaster recovery & high availability'],
    bgImage: '/images/globe.jpg',
    extendedDescription: 'Our cloud solutions team helps organizations harness the full power of AWS, Azure, and GCP platforms. We deliver end-to-end cloud migration, architecture design, and managed services that reduce costs, improve agility, and accelerate your digital journey.',
    benefits: ['Reduce infrastructure costs by up to 40%', 'Increase deployment speed with CI/CD pipelines', 'Improve reliability with 99.9% uptime SLAs', 'Scale seamlessly with demand spikes'],
    process: ['Cloud Readiness Assessment', 'Architecture Design', 'Migration & Implementation', 'Ongoing Optimization', 'Continuous Innovation & Scaling'],
    whyChoose: 'Choosing our Cloud Solutions means partnering with certified architects who have migrated hundreds of workloads without downtime. We prioritize a lift-and-optimize approach—not just lift-and-shift—so your cloud investment delivers measurable ROI from day one. Our dedicated 24/7 cloud operations team ensures your infrastructure is always secure, performant, and cost-efficient.',
    tools: ['AWS', 'Microsoft Azure', 'Google Cloud', 'Terraform', 'Kubernetes', 'Docker', 'Ansible', 'Pulumi', 'Helm', 'Prometheus', 'Grafana', 'CloudFormation'],
    faq: [
      { q: 'How long does a typical cloud migration take?', a: 'Migration timelines depend on workload complexity. Small to mid-size environments typically take 4–12 weeks. We provide a detailed roadmap after the initial readiness assessment.' },
      { q: 'Can you migrate on-premise databases without downtime?', a: 'Yes. We use blue-green and canary migration strategies combined with continuous data replication to achieve near-zero downtime for most database migrations.' },
      { q: 'Do you support multi-cloud environments?', a: 'Absolutely. We architect solutions that span AWS, Azure, and GCP using cloud-agnostic tooling like Terraform and Kubernetes so you avoid vendor lock-in.' },
      { q: 'How do you handle cloud security and compliance?', a: 'We embed security from day one—IAM policies, encryption at rest and in transit, VPC segmentation, and continuous compliance monitoring for standards like SOC 2, HIPAA, and ISO 27001.' },
      { q: 'What does ongoing cloud management include?', a: 'Our managed services cover performance monitoring, cost optimization reviews, patch management, incident response, and quarterly architecture reviews to keep your environment healthy.' },
      { q: 'How do you control cloud spending as we scale?', a: 'We implement budget alerts, rightsizing recommendations, reserved instance planning, and tagging policies from day one. Monthly cost reviews catch anomalies early and keep spend aligned with approved budgets.' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Machine Learning',
    tagline: 'Hand the keys to algorithms that learn your business inside and out.',
    description: 'We skip the basic keyword bots and build deep, single-agent conversational architectures and multi-intent classification models that learn your specific operational habits and automate heavy text-based workflows.',
    features: ['Custom model training & fine-tuning', 'NLP, vision & generative AI', 'MLOps pipelines & model deployment', 'Real-time inference APIs'],
    bgImage: '/images/ai-ml.jpg',
    extendedDescription: 'We build AI and machine learning solutions that solve complex business problems—from natural language processing and computer vision to generative AI and autonomous decision systems. Our end-to-end MLOps approach ensures your models reach production and stay performant.',
    benefits: ['Automate repetitive decision-making', 'Uncover patterns invisible to human analysts', 'Deploy models with full monitoring & drift detection', 'Reduce time-to-insight from weeks to hours'],
    process: ['Use Case Discovery', 'Data Preparation & Feature Engineering', 'Model Development & Validation', 'MLOps Deployment & Monitoring', 'Continuous Improvement & Retraining'],
    whyChoose: 'Our AI team combines deep research expertise with production engineering discipline. Unlike pure research firms, we build models that actually run in the real world—at scale, in real time, with explainability baked in. We have delivered AI solutions across finance, healthcare, retail, and manufacturing, consistently reducing manual effort by 60–80%.',
    tools: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'Hugging Face', 'MLflow', 'Vertex AI', 'SageMaker', 'OpenAI API', 'LangChain', 'Jupyter', 'ONNX', 'Ray'],
    faq: [
      { q: 'Do I need a large dataset to start an AI project?', a: 'Not always. We assess your data situation first. For limited data scenarios, we use transfer learning, synthetic data generation, and few-shot techniques to build useful models.' },
      { q: 'How do you prevent AI model bias?', a: 'We run fairness audits throughout the training process, test against diverse demographic slices, and apply bias mitigation techniques before any model reaches production.' },
      { q: 'What is MLOps and why does it matter?', a: 'MLOps is the practice of operationalizing ML models reliably—automated retraining, drift detection, versioning, and monitoring. Without it, models degrade silently in production.' },
      { q: 'Can you integrate AI into our existing software stack?', a: 'Yes. We expose models as REST or gRPC APIs and provide SDKs for common languages, making integration straightforward for your engineering team.' },
      { q: 'How do you measure AI ROI?', a: 'We define success metrics at project kickoff—accuracy thresholds, cost savings, throughput gains—and provide ongoing dashboards so you can track value delivery continuously.' },
      { q: 'Can AI decisions be explained to regulators or auditors?', a: 'Yes. We build explainability into every model—using SHAP values, LIME, and attention visualization where applicable—so you can clearly communicate how decisions are made to auditors, regulators, or end users.' },
    ],
  },
  {
    id: 'data-engineering',
    title: 'Data Engineering',
    tagline: 'Clean, uncompromised pipelines built to handle massive data volume.',
    description: "A sleek user interface means nothing if your database is choking on queries. We design end-to-end ELT/ETL pipelines that move massive datasets smoothly into secure cloud warehouses, ensuring your teams always work from a single source of truth.",
    features: ['Data pipeline design & optimization', 'ETL/ELT architecture', 'Data warehouse & lake management', 'Real-time streaming solutions'],
    bgImage: '/images/data-engineering.jpg',
    extendedDescription: 'Effective data engineering is the backbone of every data-driven organization. We design, build, and maintain scalable data infrastructure—from ingestion pipelines to data warehouses—ensuring clean, reliable, and accessible data for your teams.',
    benefits: ['Eliminate data silos across the organization', 'Reduce pipeline failures and data quality issues', 'Enable real-time analytics with streaming architectures', 'Cut data preparation time for analytics teams'],
    process: ['Data Landscape Assessment', 'Pipeline Architecture Design', 'Implementation & Testing', 'Monitoring & Maintenance', 'Optimization & Scaling'],
    whyChoose: 'We treat data engineering as a product discipline—not an afterthought. Every pipeline we build is observable, testable, and documented. Our engineers have deep expertise in both batch and streaming architectures, and we specialize in migrating fragile legacy ETL jobs to modern, cloud-native platforms that cut incident rates by over 70%.',
    tools: ['Apache Spark', 'Apache Kafka', 'Apache Airflow', 'dbt', 'Snowflake', 'Databricks', 'Fivetran', 'Apache Flink', 'Delta Lake', 'Great Expectations', 'Apache Iceberg', 'dbt Cloud'],
    faq: [
      { q: 'What is the difference between ETL and ELT?', a: 'ETL transforms data before loading into the warehouse; ELT loads raw data first and transforms it inside the warehouse. Modern cloud warehouses like Snowflake and BigQuery make ELT more practical and cost-efficient.' },
      { q: 'How do you ensure data quality in pipelines?', a: 'We integrate automated data quality checks at every pipeline stage using tools like Great Expectations, with alerting for anomalies, schema drift, and SLA breaches.' },
      { q: 'Can you help us move away from legacy ETL tools like Informatica?', a: 'Yes. We have migrated dozens of clients from legacy ETL platforms to modern dbt + Airflow or Databricks stacks, typically reducing pipeline maintenance time by 60%.' },
      { q: 'What is a data lakehouse and do we need one?', a: 'A lakehouse combines the flexibility of a data lake with the query performance of a warehouse. It is ideal if you need to support both BI dashboards and ML workloads from the same storage layer.' },
      { q: 'How do you handle schema changes in production pipelines?', a: 'We design pipelines with schema evolution in mind—using contract testing, backward-compatible serialization formats like Avro/Parquet, and automated alerts for breaking changes.' },
      { q: 'How do you document pipelines for future maintainers?', a: 'Every pipeline includes inline documentation, a data catalog entry, and a runbook covering dependencies, failure modes, and recovery steps. We also leverage dbt\'s built-in docs generation for transformation layers.' },
    ],
  },
  {
    id: 'data-science',
    title: 'Data Science and AI',
    tagline: 'Turn messy, raw company history into clean, actionable business plays.',
    description: 'Stop guessing your next quarter\'s strategy. We use advanced statistical modeling and deep data mining to pull clear, actionable trends out of raw, chaotic company databases—letting you back up major decisions with cold, hard statistical proof.',
    features: ['Predictive & prescriptive analytics', 'Business intelligence dashboards', 'Statistical modelling & experimentation', 'Customer segmentation & lifetime value'],
    bgImage: '/images/data-science.jpg',
    extendedDescription: 'Our data science team translates raw data into strategic advantage. We combine statistical analysis, machine learning, and visualization to deliver insights that power smarter business decisions—from forecasting demand to personalizing customer experiences.',
    benefits: ['Move from reactive to predictive decision-making', 'Gain real-time visibility into business performance', 'Identify revenue opportunities hidden in data', 'Reduce churn and optimize customer lifetime value'],
    process: ['Problem Framing & KPI Definition', 'Data Exploration & Analysis', 'Model Development & Validation', 'Dashboard Delivery & Training', 'Continuous Analytics & Improvement'],
    whyChoose: 'Our data scientists are fluent in both the mathematics of modelling and the language of business outcomes. We do not just build models—we translate them into executive dashboards, automated recommendations, and self-service analytics tools that your teams can use without a data degree. Every engagement ends with knowledge transfer so your organization becomes self-sufficient.',
    tools: ['Python', 'R', 'Tableau', 'Power BI', 'Looker', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'XGBoost', 'statsmodels', 'Apache Superset'],
    faq: [
      { q: 'What is the difference between data analytics and data science?', a: 'Analytics focuses on describing and understanding what happened; data science uses statistical modelling and ML to predict what will happen and prescribe optimal actions.' },
      { q: 'How quickly can we see insights from a data science engagement?', a: 'We follow an iterative approach—initial exploratory insights are typically available within the first two weeks, with production-ready dashboards and models delivered in 6–10 weeks.' },
      { q: 'Can you build dashboards that non-technical users can interact with?', a: 'Absolutely. We specialize in self-service BI using Tableau, Power BI, and Looker, with guided analytics and natural language query capabilities.' },
      { q: 'How do you validate that a predictive model is actually accurate?', a: 'We use train/validation/test splits, cross-validation, and real-world backtesting. We also track live model performance post-deployment and retrain on schedule.' },
      { q: 'Do you offer data science training for our internal teams?', a: 'Yes. All engagements include documentation and optional workshops so your team understands the models and can maintain or extend them independently.' },
      { q: 'How is our data kept secure during the engagement?', a: 'We work within your environment or a dedicated isolated environment. Data never leaves approved boundaries, access is role-restricted, and all work is conducted under signed data processing agreements.' },
    ],
  },
  {
    id: 'software',
    title: 'Software Development',
    tagline: 'Bulletproof full-stack engineering written to perform at scale.',
    description: 'We engineer custom, high-velocity web platforms, mobile apps, and full-scale ERP tools from the ground up—balancing lightning-fast response times with ironclad security protections around your data transactions.',
    features: ['Web, mobile & enterprise apps', 'API design & microservices', 'QA, testing & DevOps integration', 'UI/UX design & prototyping'],
    bgImage: '/images/coding.jpg',
    extendedDescription: 'We build custom software that solves real business problems—from consumer-facing web and mobile apps to complex enterprise systems. Our agile approach delivers working software early and often, with rigorous QA and DevOps practices that ensure quality at every step.',
    benefits: ['Ship features faster with agile sprints', 'Reduce technical debt with clean architecture', 'Ensure reliability with automated testing', 'Scale confidently with microservices'],
    process: ['Requirements & Design', 'Agile Development Sprints', 'QA & User Testing', 'Deployment & Support', 'Ongoing Support & Evolution'],
    whyChoose: 'We build software that lasts. Our engineering culture prioritizes clean architecture, comprehensive test coverage, and documented APIs—so your codebase remains maintainable as your team grows. With senior engineers leading every engagement and CI/CD pipelines from day one, you get production-grade software without the startup chaos.',
    tools: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes', 'GitHub Actions', 'GraphQL', 'Redis', 'Elasticsearch', 'Next.js', 'Playwright'],
    faq: [
      { q: 'Do you provide fixed-price or time-and-materials contracts?', a: 'Both. For well-defined scopes we offer fixed-price engagements. For evolving requirements, time-and-materials with monthly sprint reviews gives you maximum flexibility.' },
      { q: 'How do you handle changing requirements during development?', a: 'Our agile process accommodates change. Requirements can be reprioritized each sprint, and our backlog management process ensures changes are scoped and costed transparently.' },
      { q: 'What does your QA process look like?', a: 'We write unit, integration, and end-to-end tests alongside feature code. Our QA engineers run exploratory testing each sprint, and no feature ships without a passing test suite.' },
      { q: 'Can you take over and maintain an existing codebase?', a: 'Yes. We conduct a code audit first, establish testing coverage, then onboard incrementally. We have successfully rescued several projects from technical debt.' },
      { q: 'How do you ensure our intellectual property is protected?', a: 'All code produced is assigned to you under a work-for-hire agreement. We use signed NDAs, isolated development environments, and strict access controls for every project.' },
      { q: 'Do you provide post-launch support and maintenance?', a: 'Yes. We offer flexible support tiers from business-hours email support to 24/7 on-call. All engagements include a 30-day warranty period for bug fixes at no additional cost.' },
    ],
  },
  {
    id: 'digital',
    title: 'Digital Transformation',
    tagline: 'Wiping out legacy paper trails to build an agile enterprise.',
    description: 'We help long-standing enterprises drop their slow, manual habits and step confidently into modern tech—restructuring fragmented operations into clean, centralized digital control centers that save costs while keeping workflows agile.',
    features: ['Process automation & workflow redesign', 'Legacy system modernization', 'Change management & team enablement', 'Digital strategy consulting'],
    bgImage: '/images/agility.jpg',
    extendedDescription: "Digital transformation is more than technology—it's a fundamental shift in how your organization operates and delivers value. We partner with leadership to define strategy, redesign processes, modernize legacy systems, and drive lasting cultural change.",
    benefits: ['Eliminate inefficiencies through intelligent automation', 'Modernize legacy systems without disrupting operations', 'Empower teams with digital tools and training', 'Deliver measurable ROI within months, not years'],
    process: ['Digital Maturity Assessment', 'Transformation Roadmap', 'Phased Implementation', 'Change Management & Adoption', 'Continuous Improvement & Innovation'],
    whyChoose: 'We have guided organizations from heavily paper-based operations to fully digital, automated workflows—without a single day of downtime. Our transformation methodology is proven across regulated industries including banking, insurance, and healthcare. We combine strategic consulting with hands-on delivery, ensuring your transformation is not just planned but actually executed.',
    tools: ['Salesforce', 'ServiceNow', 'Microsoft 365', 'Power Automate', 'Jira', 'Confluence', 'Figma', 'SAP', 'Workday', 'UiPath', 'Miro', 'Zapier'],
    faq: [
      { q: 'How long does a digital transformation engagement typically take?', a: 'Transformation is a journey, not a project. We deliver value in phases—quick wins in 60–90 days, foundational capabilities in 6–12 months, and continuous improvement ongoing.' },
      { q: 'How do you manage employee resistance to change?', a: 'Change management is built into every phase. We run stakeholder workshops, create champions networks, provide role-specific training, and measure adoption with regular feedback loops.' },
      { q: 'Can you modernize legacy systems without replacing them completely?', a: 'Often yes. We use strangler-fig patterns, API facades, and incremental migration to wrap and gradually replace legacy systems without big-bang cutover risk.' },
      { q: 'What ROI can we expect from a digital transformation?', a: 'Typical outcomes include 30–50% reduction in process cycle times, 25–40% cost savings in targeted operations, and measurably higher customer satisfaction scores.' },
      { q: 'Do you handle both the technology and the organizational change?', a: 'Yes. Unlike pure IT consultancies, we have dedicated change management practitioners who run alongside the technical team throughout the engagement.' },
      { q: 'How do you measure the success of a transformation initiative?', a: 'We define measurable KPIs at the outset—cycle time reduction, cost per transaction, employee adoption rate—and report against them at every phase review so progress is always visible and objective.' },
    ],
  },
];
