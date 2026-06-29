import os
import json
import boto3
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, Response
from pydantic import BaseModel, EmailStr
from pathlib import Path
from datetime import datetime
from zoneinfo import ZoneInfo
import psycopg2
import psycopg2.extras

S3_BUCKET = "vulbright-resumes"
s3_client = boto3.client("s3", region_name="us-east-1")

app = FastAPI()

@app.get("/")
def root():
    return JSONResponse({"status": "Vulbright contact server is running."})

@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    return Response(status_code=204)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DATABASE_URL = os.environ.get("DATABASE_URL", "")

JOBS_SEED = [
    {
        "title": "Senior Cloud Architect",
        "department": "Cloud & Infrastructure",
        "location": "Spring, TX / Remote",
        "type": "Full-time",
        "description": "Lead cloud architecture design and migration projects for enterprise clients across AWS, Azure, and GCP. You'll work directly with clients to assess their infrastructure and deliver scalable, cost-optimized solutions.",
        "requirements": json.dumps([
            "7+ years of cloud architecture experience (AWS / Azure / GCP)",
            "AWS Solutions Architect Professional or Azure Expert certification",
            "Strong hands-on experience with Terraform, Kubernetes, and CI/CD pipelines",
            "Excellent client-facing communication skills",
        ]),
    },
    {
        "title": "Machine Learning Engineer",
        "department": "AI & Data",
        "location": "Spring, TX / Remote",
        "type": "Full-time",
        "description": "Build and deploy production-grade ML models for clients across finance, healthcare, and retail. You'll work end-to-end from data preparation through MLOps deployment, collaborating closely with data scientists and software engineers.",
        "requirements": json.dumps([
            "5+ years of ML engineering experience",
            "Proficiency in Python, TensorFlow or PyTorch",
            "Experience building MLOps pipelines (MLflow, SageMaker, or Vertex AI)",
            "Strong background in NLP or computer vision preferred",
        ]),
    },
    {
        "title": "Data Engineer",
        "department": "Data Engineering",
        "location": "Remote",
        "type": "Full-time",
        "description": "Design and build scalable data pipelines for enterprise clients, migrating legacy ETL to modern cloud-native architectures. You'll ensure data quality, reliability, and observability across streaming and batch workloads.",
        "requirements": json.dumps([
            "4+ years in data engineering roles",
            "Strong experience with Apache Spark, Kafka, and Airflow",
            "Hands-on expertise with dbt, Snowflake, or Databricks",
            "Solid Python and SQL skills",
        ]),
    },
    {
        "title": "Full Stack Developer",
        "department": "Software Development",
        "location": "Spring, TX / Remote",
        "type": "Full-time",
        "description": "Develop modern web applications and enterprise software for clients ranging from startups to Fortune 500 companies. You'll work in agile sprints with a focus on clean architecture, automated testing, and CI/CD delivery.",
        "requirements": json.dumps([
            "4+ years of full-stack development experience",
            "Proficiency in React, TypeScript, and Node.js",
            "Experience with PostgreSQL or similar databases",
            "Familiarity with Docker, Kubernetes, and GitHub Actions",
        ]),
    },
    {
        "title": "Digital Transformation Consultant",
        "department": "Consulting",
        "location": "Spring, TX",
        "type": "Full-time",
        "description": "Guide enterprise clients through end-to-end digital transformation engagements — from strategy and process redesign to technology implementation and change management. You'll lead workshops, manage stakeholders, and drive measurable outcomes.",
        "requirements": json.dumps([
            "6+ years in management or technology consulting",
            "Experience with Salesforce, ServiceNow, or Microsoft 365 implementations",
            "Strong workshop facilitation and stakeholder management skills",
            "MBA or equivalent experience preferred",
        ]),
    },
]


def get_db():
    conn = psycopg2.connect(DATABASE_URL)
    return conn


def init_db():
    conn = get_db()
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE IF NOT EXISTS jobs (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            department TEXT NOT NULL,
            location TEXT NOT NULL,
            type TEXT NOT NULL,
            description TEXT NOT NULL,
            requirements TEXT NOT NULL,
            is_active INTEGER DEFAULT 1
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS applications (
            id SERIAL PRIMARY KEY,
            job_id INTEGER NOT NULL,
            job_title TEXT NOT NULL,
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT DEFAULT '',
            consent INTEGER DEFAULT 0,
            resume_filename TEXT DEFAULT '',
            submitted_at TEXT NOT NULL
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            submitted_at TEXT NOT NULL
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
            id SERIAL PRIMARY KEY,
            email TEXT NOT NULL UNIQUE,
            subscribed_at TEXT NOT NULL
        )
    """)
    cur.execute("""
        CREATE TABLE IF NOT EXISTS blogs (
            id SERIAL PRIMARY KEY,
            category TEXT NOT NULL,
            title TEXT NOT NULL,
            caption TEXT NOT NULL,
            excerpt TEXT NOT NULL,
            bullets TEXT NOT NULL,
            conclusion_title TEXT NOT NULL DEFAULT '',
            conclusion TEXT NOT NULL,
            date TEXT NOT NULL,
            read_time TEXT NOT NULL,
            image_url TEXT NOT NULL DEFAULT '',
            is_active INTEGER DEFAULT 1
        )
    """)

    cur.execute("""
        DO $$
        BEGIN
            IF NOT EXISTS (
                SELECT 1 FROM information_schema.table_constraints
                WHERE constraint_name = 'fk_application_job'
                AND table_name = 'applications'
            ) THEN
                ALTER TABLE applications
                ADD CONSTRAINT fk_application_job
                FOREIGN KEY (job_id) REFERENCES jobs(id);
            END IF;
        END $$;
    """)

    cur.execute("SELECT COUNT(*) FROM jobs")
    if cur.fetchone()[0] == 0:
        for job in JOBS_SEED:
            cur.execute(
                "INSERT INTO jobs (title, department, location, type, description, requirements) VALUES (%s,%s,%s,%s,%s,%s)",
                (job["title"], job["department"], job["location"], job["type"], job["description"], job["requirements"]),
            )

    BLOGS_SEED = [
        {
            "category": "Privacy & Compliance",
            "title": "Navigating the Privacy Matrix: Surviving the CCPA Compliance Waves",
            "caption": "Beyond the Opt-Out Button: What True Data Privacy Looks Like Now.",
            "excerpt": "Data compliance isn't just about sticking a long, unreadable legal text block in your footer anymore. The latest updates to the California Consumer Privacy Act (CCPA) change the rules on how companies collect, track, and handle user information. If you're running digital systems today, compliance needs to be built directly into your technical architecture.",
            "bullets": json.dumps([
                {"heading": "Fixing the Interface Bias", "text": "You can no longer use deceptive \"dark patterns\" that trick users into consenting to tracking. The design to opt out must be just as prominent and take the exact same number of clicks as opting in."},
                {"heading": "The Long Archive Audit", "text": "Consumers now have the right to request years of historical data. If your software can't instantly crawl your legacy cloud systems, offline databases, and cold storage to pull an individual's data footprint, you are exposed."},
                {"heading": "Pulling Back the Curtain on AI", "text": "If you use software algorithms to automatically score users or make decisions without human review, CCPA now requires you to offer a clear explanation of that logic—and give users an absolute right to opt out of automated profiling."},
            ]),
            "conclusion_title": "The Bottom Line",
            "conclusion": "Compliance isn't a legal problem; it's a systems infrastructure problem. Winning enterprises are those that build clear data visibility directly into their pipelines from day one.",
            "date": "May 10, 2025",
            "read_time": "7 min read",
            "image_url": "/images/blog-privacy.jpg",
        },
        {
            "category": "Enterprise Analytics",
            "title": "CEO Transition Impact Analysis: Building a 25-Year Leadership Database for S&P 500 & Russell 2000",
            "caption": "For Every Publicly Traded Company — Who Was CEO, and When?",
            "excerpt": "This project answers a deceptively simple question: for every publicly traded company in the S&P 500 and Russell 2000 indices, who was CEO and when? The answer matters for governance research, activist investing, board-diversity analysis, executive-compensation studies, and event-driven trading strategies alike. Yet no single authoritative database provides a clean, verified CEO history going back to 2000 for all ~2,500 companies across both indices. The CEO Transition Impact Analysis project solves this by building an automated pipeline that collects company lists, ticker symbols, and CIK mappings from official sources, along with company metadata from Yahoo Finance. It uses a custom AI Agent built on OpenAI GPT-4o with a ReAct loop to fetch SEC EDGAR 8-K filings and automatically extract CEO transition information including CEO names, start dates, and end dates while also collecting company and index stock market data. The result is a structured dataset one row per CEO tenure per company that spans 25 years and covers every leadership transition a public company is required to disclose.",
            "bullets": json.dumps([
                {"heading": "SEC EDGAR", "text": "Has authoritative CEO-change filings, but only from August 2004 onward, and only if you know which specific filing type and item to look for."},
                {"heading": "Wikipedia", "text": "Has narrative CEO history for many companies, but it is unstructured, inconsistently maintained, and requires interpretation."},
                {"heading": "Web Search", "text": "Can fill individual gaps, but is not systematic at scale — making it unsuitable for coverage across the full Russell 2000."},
            ]),
            "conclusion_title": "Why Commercial Databases Fall Short",
            "conclusion": "Commercial databases like Bloomberg, FactSet, and Refinitiv do carry executive history, but they are expensive, have inconsistent historical depth for small-cap companies, and are difficult to audit. For a researcher working across the full Russell 2000, gaps and errors are common below the large-cap tier. This pipeline closes that gap with a verifiable, auditable, open dataset.",
            "date": "April 22, 2025",
            "read_time": "6 min read",
            "image_url": "/images/blog-analytics.jpg",
        },
        {
            "category": "AI & Biology",
            "title": "Embark on a Journey into Biology's Tomorrow: Unveiling the Marvels of AlphaFold!",
            "caption": "Code Meets Chemistry: How Deep Learning Solved a 50-Year Biological Riddle.",
            "excerpt": "For decades, predicting exactly how a protein chain folds into its three-dimensional shape required years of grueling, expensive laboratory work using X-ray crystallography. Google DeepMind's AlphaFold blew those timelines apart, proving that deep neural networks could predict molecular structures with staggering accuracy in just a matter of minutes.",
            "bullets": json.dumps([
                {"heading": "Mapping More Than Just Proteins", "text": "The latest iterations move past simple amino-acid strings. We are now seeing architectures predict interactions across DNA, RNA, and complex chemical ligands, giving pharmaceutical labs a massive head start in drug design."},
                {"heading": "Spotting Toxic Mutations", "text": "Specialized offshoot models can now analyze tiny genetic variations to predict with high confidence whether specific mutations are benign or likely to cause cellular damage."},
                {"heading": "Radical Research Acceleration", "text": "By replacing slow laboratory trial-and-error with high-fidelity predictive modeling, software engineering has effectively compressed decades of biological research into a couple of keystrokes."},
            ]),
            "conclusion_title": "The Future is Computational",
            "conclusion": "We are moving rapidly toward a world where the next life-saving medicine won't just be discovered in a petri dish—it will be compiled, simulated, and optimized directly inside a software repository.",
            "date": "April 5, 2025",
            "read_time": "8 min read",
            "image_url": "/images/blog-biology.jpg",
        },
    ]
    cur.execute("SELECT COUNT(*) FROM blogs")
    if cur.fetchone()[0] == 0:
        for blog in BLOGS_SEED:
            cur.execute(
                "INSERT INTO blogs (category, title, caption, excerpt, bullets, conclusion_title, conclusion, date, read_time, image_url) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
                (blog["category"], blog["title"], blog["caption"], blog["excerpt"], blog["bullets"], blog["conclusion_title"], blog["conclusion"], blog["date"], blog["read_time"], blog["image_url"]),
            )

    conn.commit()
    cur.close()
    conn.close()


init_db()


# ── Contact form ──────────────────────────────────────────────────────────────

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str


@app.post("/api/contact")
def submit_contact(form: ContactForm):
    if not form.name.strip() or not form.message.strip():
        raise HTTPException(status_code=400, detail="All fields are required.")
    submitted_at = datetime.now(ZoneInfo("America/Chicago")).strftime("%Y-%m-%d %H:%M:%S %Z")
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO contacts (name, email, message, submitted_at) VALUES (%s,%s,%s,%s)",
        (form.name.strip(), form.email.strip(), form.message.strip(), submitted_at),
    )
    conn.commit()
    cur.close()
    conn.close()
    print(f"[contact] saved: {form.name} <{form.email}>")
    return {"success": True}


# ── Newsletter ────────────────────────────────────────────────────────────────

class NewsletterForm(BaseModel):
    email: EmailStr


@app.post("/api/newsletter")
def subscribe_newsletter(form: NewsletterForm):
    subscribed_at = datetime.now(ZoneInfo("America/Chicago")).strftime("%Y-%m-%d %H:%M:%S %Z")
    conn = get_db()
    cur = conn.cursor()
    cur.execute("SELECT id FROM newsletter_subscriptions WHERE email = %s", (form.email.strip(),))
    if cur.fetchone():
        cur.close()
        conn.close()
        return {"success": True, "already_subscribed": True}
    cur.execute(
        "INSERT INTO newsletter_subscriptions (email, subscribed_at) VALUES (%s,%s)",
        (form.email.strip(), subscribed_at),
    )
    conn.commit()
    cur.close()
    conn.close()
    print(f"[newsletter] subscribed: {form.email}")
    return {"success": True, "already_subscribed": False}


# ── Jobs ──────────────────────────────────────────────────────────────────────

@app.get("/api/jobs")
def get_jobs():
    conn = get_db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT * FROM jobs WHERE is_active = 1 ORDER BY id")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [
        {
            "id": row["id"],
            "title": row["title"],
            "department": row["department"],
            "location": row["location"],
            "type": row["type"],
            "description": row["description"],
            "requirements": json.loads(row["requirements"]),
        }
        for row in rows
    ]


# ── Applications ──────────────────────────────────────────────────────────────

@app.post("/api/applications")
async def submit_application(
    job_id: int = Form(...),
    job_title: str = Form(...),
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(""),
    consent: str = Form("false"),
    resume: UploadFile = File(None),
):
    now = datetime.now(ZoneInfo("America/Chicago"))
    submitted_at = now.strftime("%Y-%m-%d %H:%M:%S %Z")
    resume_filename = ""
    if resume and resume.filename:
        ext = Path(resume.filename).suffix.lower()
        if ext not in {".pdf", ".doc", ".docx"}:
            raise HTTPException(status_code=400, detail="Only PDF, DOC, or DOCX files are accepted.")
        timestamp = now.strftime("%Y%m%d%H%M%S")
        s3_key = f"Vulbright_Application/{now.year}/{now.strftime('%B')}/{now.strftime('%d')}/{job_id}/{first_name}_{last_name}_{timestamp}{ext}"
        s3_client.upload_fileobj(resume.file, S3_BUCKET, s3_key)
        resume_filename = s3_key

    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO applications (job_id, job_title, first_name, last_name, email, phone, consent, resume_filename, submitted_at) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (job_id, job_title, first_name.strip(), last_name.strip(), email.strip(), phone.strip(), 1 if consent == "true" else 0, resume_filename, submitted_at),
    )
    conn.commit()
    cur.close()
    conn.close()
    print(f"[application] {first_name} {last_name} <{email}> → {job_title}")
    return {"success": True}


# ── Blogs ─────────────────────────────────────────────────────────────────────

@app.get("/api/blogs")
def get_blogs():
    conn = get_db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    cur.execute("SELECT * FROM blogs WHERE is_active = 1 ORDER BY id DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()
    return [
        {
            "id": row["id"],
            "category": row["category"],
            "title": row["title"],
            "caption": row["caption"],
            "excerpt": row["excerpt"],
            "bullets": json.loads(row["bullets"]),
            "conclusionTitle": row["conclusion_title"],
            "conclusion": row["conclusion"],
            "date": row["date"],
            "readTime": row["read_time"],
            "image": row["image_url"],
        }
        for row in rows
    ]


class BlogForm(BaseModel):
    key: str
    category: str
    title: str
    caption: str
    excerpt: str
    bullets: list
    conclusion_title: str = ""
    conclusion: str
    date: str
    read_time: str
    image_url: str = ""


@app.post("/api/blogs")
def create_blog(form: BlogForm):
    if form.key != ADMIN_SECRET:
        raise HTTPException(status_code=403, detail="Forbidden.")
    conn = get_db()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO blogs (category, title, caption, excerpt, bullets, conclusion_title, conclusion, date, read_time, image_url) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)",
        (form.category, form.title, form.caption, form.excerpt, json.dumps(form.bullets), form.conclusion_title, form.conclusion, form.date, form.read_time, form.image_url),
    )
    conn.commit()
    cur.close()
    conn.close()
    print(f"[blog] created: {form.title}")
    return {"success": True}


# ── Admin data viewer ─────────────────────────────────────────────────────────

ADMIN_SECRET = "vulbright-admin-2026"

@app.get("/api/admin/data")
def admin_data(key: str = ""):
    if key != ADMIN_SECRET:
        raise HTTPException(status_code=403, detail="Forbidden.")
    conn = get_db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    contacts = cur.execute("SELECT * FROM contacts ORDER BY id DESC") or cur.fetchall()
    cur.execute("SELECT * FROM contacts ORDER BY id DESC")
    contacts = [dict(r) for r in cur.fetchall()]
    cur.execute("SELECT * FROM newsletter_subscriptions ORDER BY id DESC")
    newsletter = [dict(r) for r in cur.fetchall()]
    cur.execute("SELECT * FROM applications ORDER BY id DESC")
    applications = [dict(r) for r in cur.fetchall()]
    cur.execute("SELECT * FROM blogs ORDER BY id DESC")
    blogs = [dict(r) for r in cur.fetchall()]
    cur.close()
    conn.close()
    return {"contacts": contacts, "newsletter_subscriptions": newsletter, "applications": applications, "blogs": blogs}
