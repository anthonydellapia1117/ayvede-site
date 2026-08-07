import React, { useState, useEffect } from "react";
import {
  Menu, X, ArrowRight, Mail, Phone, MapPin, ShieldCheck, Layers,
  FlaskConical, GraduationCap, Compass, ChevronDown, Plus, Minus, TriangleAlert
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────
//  AYVEDE — v2 · Ayvede.com
//  Design system: Universal UI/UX Layout (dark navy · teal · gold)
//  Outfit (body) · JetBrains Mono (data/labels) · dense · restrained
// ─────────────────────────────────────────────────────────────────

const EMAIL = "anthonydellapia@gmail.com";
const PHONE = "+1 (215) 384-8335";
const PHONE_TEL = "+12153848335";

//  Formspree endpoints. Create three forms at formspree.io (Free plan:
//  unlimited forms, 50 submissions per month across the account), then replace
//  the YOUR_*_ID placeholders with the real form IDs. Nothing else changes.
//  Until real IDs are pasted, submits resolve to the on-page error state,
//  which offers the direct email fallback. No form navigates or opens mail.
const FORMSPREE_SUBSCRIBE = "https://formspree.io/f/YOUR_SUBSCRIBE_ID";
const FORMSPREE_CONTACT = "https://formspree.io/f/YOUR_CONTACT_ID";
const FORMSPREE_TOOLS = "https://formspree.io/f/YOUR_TOOLS_ID";

const EMAIL_OK = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v).trim());

async function formspreePost(endpoint, data) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("formspree " + res.status);
}

//  Shared form-state message blocks, styled from existing tokens only.
function FormNote({ kind, children }) {
  const teal = kind === "ok";
  return (
    <p
      className="small"
      role={teal ? "status" : "alert"}
      style={{
        color: teal ? "#2ec4a8" : "#ef4444",
        border: `1px solid ${teal ? "rgba(46,196,168,.45)" : "rgba(239,68,68,.45)"}`,
        background: teal ? "rgba(46,196,168,.06)" : "rgba(239,68,68,.06)",
        borderRadius: 4,
        padding: "10px 12px",
        flex: "1 1 100%",
      }}
    >
      {children}
    </p>
  );
}

//  Six top-level destinations. The four service-side pages live one level
//  down under the Solutions menu — nothing deleted, everything one click away.
const NAV = [
  { id: "home", label: "Home" },
  {
    id: "solutions-menu",
    label: "Solutions",
    children: [
      { id: "solutions", label: "Advisory" },
      { id: "programs", label: "Programs" },
      { id: "platform", label: "Platform" },
      { id: "lab", label: "Innovation Lab" },
    ],
  },
  { id: "tools", label: "Tools" },
  { id: "insights", label: "Insights" },
  { id: "gallery", label: "Gallery" },
  { id: "vision", label: "Vision" },
];

//  Flat list of every real page, used by the footer sitemap and the mobile menu.
const NAV_ALL = NAV.flatMap((n) => (n.children ? n.children : [n]));

const TITLES = {
  home: "The AI Source of Truth for High-Trust Firms",
  vision: "Vision",
  solutions: "Solutions",
  programs: "Programs",
  platform: "The Ayvede Platform",
  lab: "Innovation Lab",
  tools: "Tools",
  insights: "The Ayvede Briefing",
  gallery: "The Gallery",
  connect: "Connect",
};

// ── HOME ─────────────────────────────────────────────────────────

const KPIS = [
  { n: "20+", l: "AI Projects Delivered" },
  { n: "30+", l: "Clients Served" },
  { n: "8", l: "Structured Programs" },
  { n: "6", l: "Lab Ventures" },
  { n: "100%", l: "Client Satisfaction" },
];

const RISKS = [
  {
    t: "Shadow AI",
    d: "Your teams are already pasting client language into consumer chatbots. Unsanctioned tools mean zero visibility, zero control, and unbounded exposure.",
  },
  {
    t: "Compliance Exposure",
    d: "Privilege, privacy law, bar rules, and regulator expectations do not pause for experimentation. Ungoverned AI turns efficiency into liability.",
  },
  {
    t: "Pilot Purgatory",
    d: "Tools get bought, demos get applauded, and nothing ships. Spend without owners, deadlines, or acceptance criteria is where AI ROI goes to die.",
  },
];

const CAPABILITIES = [
  {
    icon: Compass,
    t: "Advisory",
    d: "Structured consulting from readiness assessment through executive advisory. Strategy, governance, and secure implementation with named deliverables.",
    page: "solutions",
    cta: "Explore Solutions",
  },
  {
    icon: GraduationCap,
    t: "Education",
    d: "Confidential executive briefings, a governance and compliance bootcamp, and hands-on training that builds real internal capability.",
    page: "programs",
    cta: "See Programs",
  },
  {
    icon: Layers,
    t: "Platform",
    d: "TrustStack, Sightline, and CounselGuard unified into one governed AI operating layer, deployed privately inside your boundary.",
    page: "platform",
    cta: "View the Platform",
  },
  {
    icon: FlaskConical,
    t: "Innovation",
    d: "A disciplined lab where emerging AI capability is researched, vetted, and piloted before it ever touches a client environment.",
    page: "lab",
    cta: "Enter the Lab",
  },
];

const STEPS = [
  { n: "01", t: "Assess", d: "Deep evaluation of firm infrastructure, compliance guardrails, and risk exposure before any deployment." },
  { n: "02", t: "Align", d: "Enforceable AI policies aligned with organizational trust and high-trust confidentiality standards." },
  { n: "03", t: "Deploy", d: "Secure AI workflows and managed integration across firm-critical environments." },
  { n: "04", t: "Govern", d: "Sustainable oversight through risk reporting, performance metrics, and governance auditing." },
];

const HOME_SERVICES = [
  { t: "AI Readiness & Roadmaps", d: "Strategy before deployment. Infrastructure, compliance, and risk evaluated into a foundational blueprint." },
  { t: "Governance & Guardrails", d: "Enforceable policies and oversight. Clear boundaries for data usage and vendor compliance." },
  { t: "Risk & Security Workflows", d: "Threat modeling, guardrails, and incident readiness engineered into every AI workflow." },
  { t: "Secure Enablement", d: "Deep AI integration without exposing sensitive data. Confidentiality is the deployment framework." },
  { t: "Workflow Automation", d: "Verified, secure automation agents that remove friction while preserving quality control." },
  { t: "Managed AI Operations", d: "Ongoing upkeep, re-vetting, and improvement so your AI stack never drifts out of compliance." },
];

const DIFFS = [
  { t: "Vendor-Neutral", d: "Ayvede sells judgment, not licenses. Every recommendation is independent of every tool it evaluates." },
  { t: "Practitioner-Led", d: "Built and run by an operator who architects enterprise data and AI systems daily. Not a slide-deck agency." },
  { t: "Lab-Tested", d: "Nothing is recommended that has not survived the Innovation Lab pipeline: research, vetting, pilot, production." },
  { t: "Documented by Design", d: "Every decision, policy, and control ships in writing. Auditable, defensible, and yours to keep." },
];

const AUDIENCES = [
  "Boutique Law Firms",
  "Advisory & Accounting Practices",
  "Wealth Management",
  "Municipal & Public Entities",
  "High-Trust Professional Services",
];

// ── SOLUTIONS ────────────────────────────────────────────────────

const SERVICES = [
  {
    t: "AI Readiness & Roadmaps",
    d: "Before deployment, we evaluate existing infrastructure, compliance posture, and risk exposure. You get a strategic path from tactical pilots to enterprise-grade AI execution.",
    del: ["Risk Assessment & Opportunity Scan", "Strategic Implementation Roadmap", "Governance Framework Blueprint", "Executive Board Briefing"],
  },
  {
    t: "Governance & Compliance",
    d: "Enforceable policies and oversight mechanisms aligned with strict confidentiality standards, so AI adoption meets institutional and regulatory expectations.",
    del: ["Acceptable Use Policies", "Data Privacy & Access Controls", "AI Vendor Risk Vetting", "Automated Compliance Monitoring"],
  },
  {
    t: "Risk & Security Workflow Implementation",
    d: "Security engineered into every AI workflow, before, during, and after deployment. Controls that hold up under audit, not just in demos.",
    del: ["Threat Modeling for AI Workflows", "Custom Guardrail Deployment", "Access Control & Data Boundary Design", "Incident Response Playbooks & Tabletops"],
  },
  {
    t: "Secure Enablement",
    d: "Confidential integration of AI into complex workflows. We verify security layers and protect client data and intellectual property at every touchpoint.",
    del: ["Workflow Integration Plans", "Secure System Configuration", "Confidential Tool Rollout", "High-Trust Staff Training"],
  },
  {
    t: "Workflow Automation",
    d: "Verified automation agents that remove operational friction while a named professional stays accountable for every output.",
    del: ["Automation Opportunity Mapping", "Secure Agent Design & Deployment", "Human-in-the-Loop Quality Controls", "Output Verification Standards"],
  },
  {
    t: "Executive Advisory",
    d: "Board-ready AI risk and ROI guidance. Objective oversight for leadership navigating the shifting landscape of professional services technology.",
    del: ["Risk Impact Reporting", "Long-Term Investment Strategy", "Quarterly Governance Reviews", "ROI Alignment Guidance"],
  },
  {
    t: "Managed AI Operations",
    d: "The upkeep layer. Continuous improvement, re-vetting, and maintenance so the system you deployed this quarter is still compliant, and still best-in-class, next year.",
    del: ["Continuous Tool & Model Re-Vetting", "Policy & Guardrail Upkeep", "Prompt Library & Playbook Maintenance", "Quarterly Capability Refresh & ROI Report"],
  },
];

const TIERS = [
  {
    t: "Diagnostic",
    meta: "2–3 weeks · Fixed fee",
    d: "The AI Readiness Assessment. Risk surface, shadow-AI inventory, opportunity scan, governance blueprint, and an executive briefing.",
    note: "The first step for every new client.",
  },
  {
    t: "Program",
    meta: "30–90 days · Defined scope",
    d: "Full implementation of one or more solution areas with named deliverables, acceptance criteria, and a definition of done.",
    note: "Strategy to execution, governed at every step.",
  },
  {
    t: "Retainer",
    meta: "Monthly · 90-day minimum",
    d: "Fractional AI leadership. Continuous governance, managed operations, training refresh, and priority access to the Innovation Lab.",
    note: "Your standing AI authority, on call.",
  },
];

// ── PROGRAMS ─────────────────────────────────────────────────────

const PROGRAMS = [
  {
    t: "TrustStack",
    tag: "Governance Framework",
    isNew: false,
    d: "Governance-first AI framework for high-trust environments.",
    fmt: "Framework deployment · 30–60 days",
    del: ["Risk Assessment & Surface Analysis", "Governance Policy Design", "Secure Data Guardrail Integration", "Quarterly Oversight Reports"],
  },
  {
    t: "Sightline",
    tag: "Executive Visibility",
    isNew: false,
    d: "Executive AI visibility and risk reporting for board-level oversight.",
    fmt: "Standing capability · Quarterly cadence",
    del: ["Real-Time Monitoring Dashboards", "Executive Risk Reporting", "Compliance Strategy Alignment", "Continuous Vendor Vetting"],
  },
  {
    t: "CounselGuard",
    tag: "Legal Workflows",
    isNew: false,
    d: "Specialized confidential AI frameworks for legal workflows.",
    fmt: "Firm deployment · 45–90 days",
    del: ["Secure Legal Automation", "Usage Policy Architecture", "Confidential Tool Vetting", "Encrypted Data Control Design"],
  },
  {
    t: "Veridical AI",
    tag: "AI Assurance",
    isNew: false,
    d: "The algorithmic title company for AI models. Certify, defend, and capitalize your AI assets.",
    fmt: "Certification engagement · Scoped per asset",
    del: ["Model & Dataset Lineage Certification", "FTC Disgorgement Risk Shielding", "Surgical Machine Unlearning Enablement", "IP-Backed Financing & Insurance Readiness Packet"],
  },
  {
    t: "Executive AI Briefing",
    tag: "Confidential Advisory",
    isNew: true,
    d: "A private, NDA-backed intelligence session for firm leadership. Where AI actually stands, where you actually stand, and what to do in the next 90 days.",
    fmt: "2-hour session + written brief · On-site or virtual",
    del: ["Firm-Specific Threat & Opportunity Map", "Competitive AI Posture Review", "Regulatory & Bar-Rule Exposure Summary", "90-Day Priority Action Plan"],
  },
  {
    t: "AI Governance & Compliance Bootcamp",
    tag: "Education · Cohort",
    isNew: true,
    d: "A paid, cohort-based intensive that turns policy into practice. Your team leaves with drafted policies, not just notes.",
    fmt: "4-week cohort · Virtual or on-site",
    del: ["Structured 4-Week Curriculum", "Policy Drafting Labs (AUP, Data Controls)", "Vendor Vetting Workshop & Scorecards", "Incident Response Tabletop Exercise", "Completion Certification"],
  },
  {
    t: "Ayvede Academy",
    tag: "Hands-On Training",
    isNew: true,
    d: "Role-based, hands-on AI training your people actually use. How to work with AI, securely, verifiably, and well.",
    fmt: "Half-day workshops to multi-week tracks",
    del: ["Role-Specific Training Tracks (Attorneys, Staff, Ops, Leadership)", "Secure Prompting & Tool Usage Labs", "\u201CAI Drafts. Experts Verify.\u201D Workflow Certification", "Reusable Prompt & Playbook Library"],
  },
  {
    t: "The Ayvede Retainer",
    tag: "Fractional AI Leadership",
    isNew: true,
    d: "Your standing AI authority. Strategy, upkeep, and improvement on call, so the answer to every AI question in your firm is one message away.",
    fmt: "Monthly · 90-day minimum",
    del: ["Monthly Advisory & Standing Office Hours", "Continuous Tool Re-Vetting & Model Watch", "Governance & Policy Upkeep", "Quarterly Capability Refresh & ROI Reporting", "Priority Innovation Lab Access"],
  },
];

// ── PLATFORM ─────────────────────────────────────────────────────

const MODULES = [
  {
    k: "GOVERN",
    t: "TrustStack Core",
    d: "The governance engine. Policy enforcement, guardrails, and audit trails applied to every AI interaction in the firm.",
    pts: ["Policy engine & acceptable-use enforcement", "Data boundary guardrails", "Complete audit trail, by user and by matter"],
  },
  {
    k: "SEE",
    t: "Sightline",
    d: "The executive layer. Leadership sees usage, risk, and ROI in one view, in language a board understands.",
    pts: ["Executive dashboards & risk reporting", "Usage and adoption analytics", "Vendor vetting status, continuously updated"],
  },
  {
    k: "PROTECT",
    t: "CounselGuard",
    d: "The confidential workflow module. Privilege-protected automation for the work that can never leak.",
    pts: ["Privilege-safe legal workflows", "Encrypted data controls", "Confidential tool sandboxing"],
  },
  {
    k: "IMPROVE",
    t: "Lab Feed",
    d: "The upgrade path. Capabilities vetted in the Innovation Lab flow into the platform on a quarterly cadence.",
    pts: ["Quarterly vetted capability releases", "Model and tool watch", "Zero surprise upgrades"],
  },
];

const FLOW = [
  { n: "01", t: "Source of Truth", d: "Your data, your documents, your boundary." },
  { n: "02", t: "Governance Engine", d: "TrustStack policies and guardrails on every call." },
  { n: "03", t: "Secure Workflows", d: "CounselGuard-protected automation and drafting." },
  { n: "04", t: "Executive Visibility", d: "Sightline reporting for leadership and the board." },
];

const DEPLOY_FACTS = [
  { t: "Private by Default", d: "Deployed in your cloud or an approved environment. No client data leaves your boundary." },
  { t: "Works With Your Stack", d: "Integrates alongside the document, practice, and communication tools you already run." },
  { t: "Governed, Not Just Installed", d: "The platform ships inside an Ayvede engagement, with policies, training, and accountability attached." },
  { t: "Continuously Vetted", d: "Models and tools are re-evaluated as the landscape shifts. What was safe in Q1 is re-proven in Q3." },
];

// ── INNOVATION LAB ───────────────────────────────────────────────

const LAB = [
  {
    t: "Trademark ID Bot",
    stage: "Vetting",
    d: "AI-powered identification of high-value trademarks based on real-world naming demand.",
    del: ["Trademark Opportunity Detection & Ranking", "Name Search Trend Intelligence Engine", "ROI-Based IP Target Scoring", "Trademark Acquisition & Licensing Strategy Support"],
  },
  {
    t: "LegisGavel",
    stage: "Pilot",
    d: "AI in-house counsel infrastructure for secure, automated legal operations.",
    del: ["Secure Legal AI Architecture Blueprint", "Drafting, Review & Compliance Automation Modules", "Contract Intelligence & Matter Tracking Design", "Privilege-Protected Deployment & Oversight Framework"],
  },
  {
    t: "ClassLitigator AI",
    stage: "Pilot",
    d: "AI-driven class action discovery and lead generation for plaintiff-side litigation.",
    del: ["Real-Time Web + Social Monitoring System", "Viability Scoring & Trend Detection Engine", "Automated Predicate Fact + Legal Theory Reports", "Lead Intelligence Dashboard & Outreach Enablement"],
  },
  {
    t: "CivicShield AI",
    stage: "Vetting",
    d: "AI-powered municipal solicitor infrastructure for statutory compliance and litigation resilience.",
    del: ["OPRA & OPMA Automated Compliance Framework", "MLUL Hearing Script & Resolution Engine", "Contract Risk Red-Flag Intelligence System", "Statute-Mapped Liability & Immunity Matrix"],
  },
  {
    t: "IntakeSentinel",
    stage: "Pilot",
    d: "AI-driven intake, screening, and case qualification engine for plaintiff-side firms.",
    del: ["Compliance-Safe Intake Scripting", "Real-Time Lead Scoring & Routing", "TCPA-Aware Outreach Guardrails", "Qualification Analytics Dashboard"],
  },
  {
    t: "RegPulse",
    stage: "Research",
    d: "Regulatory and bar-rule change monitoring, mapped directly to your firm's AI obligations.",
    del: ["Rule & Guidance Change Detection", "Obligation Mapping Engine", "Policy Update Drafts, Ready for Counsel Review", "Executive Alert Digests"],
  },
];

const PIPELINE = [
  { t: "Research", d: "Capability scan, threat review, honest feasibility." },
  { t: "Vetting", d: "Security, privacy, and accuracy testing against high-trust standards." },
  { t: "Pilot", d: "Controlled deployment with real workloads and measured outcomes." },
  { t: "Production", d: "Governed rollout with documentation, training, and oversight." },
];

// ── INSIGHTS ─────────────────────────────────────────────────────

//  The Briefing hub renders from INSIGHTS_DATA, a build-time data module
//  generated from the "AI, Properly > Newsletters" Google Drive folder by
//  scripts/pull-insights.mjs and spliced ahead of this file by site-build/build.py.
const INS_CATEGORIES = ["Data Governance", "ERP", "Legal", "Healthcare", "Finance", "General AI News"];
const HUB_DATA = typeof INSIGHTS_DATA !== "undefined" ? INSIGHTS_DATA : [];

// ── GALLERY · THE AYVEDE GALLERY ─────────────────────────────────
//  Fifty original framework reads. Visuals are generated procedurally from
//  each framework's chips; no third-party artwork, imagery, or assets.

const GAL_FAMS = ["cycle","steps","ladder","funnel","network","bridge","exchange","balance","compass","matrix","systemMap","orbit","path","stack","tree"];
//  One char per framework 1..50, indexing GAL_FAMS. Fixed, so a given
//  framework always renders the same family. Never randomised at render.
const GAL_FAM_MAP = "207169cb8d540a0e193c2470b212a31c279033a0dec062402b";
const GAL_CATS = [
  { id: "habits", name: "Habits & Daily Systems", short: "Habits", description: "The routines, rituals, and environmental systems that make behavior repeatable.", order: 1 },
  { id: "mindset", name: "Mindset & Growth", short: "Mindset", description: "How people think, interpret, learn, and build resilience.", order: 2 },
  { id: "communication", name: "Communication & Relationships", short: "Communication", description: "The mechanics of trust, influence, empathy, and relationships.", order: 3 },
  { id: "purpose", name: "Purpose, Meaning & Wellbeing", short: "Purpose", description: "Meaning, emotional balance, attention, and a healthier inner operating system.", order: 4 },
  { id: "productivity", name: "Productivity & Execution", short: "Productivity", description: "How to prioritize, execute, focus, and move work forward.", order: 5 },
  { id: "leadership", name: "Leadership & Teams", short: "Leadership", description: "Systems, teams, negotiation, innovation, and organizational judgment.", order: 6 },
];
//  Keys: t title, a author, c category, w what, q quick, k chips. Values are
//  rendered verbatim from docs/gallery-reference/gallery_data.json
//  (sha256 c7756ca5...). Generated by site-build/gen/gen-gallery.py; do not
//  hand-edit the strings here, regenerate instead.
const GAL_ITEMS = [
  { n: 1, t: "The 7 Habits of Highly Effective People", a: "Stephen R. Covey", c: "mindset", w: "Effectiveness starts with character, not hacks. The source centers on taking responsibility, deciding the outcome before acting, putting priorities first, listening with empathy, seeking mutual wins, and building stronger results through cooperation.", q: "Own your response, decide what matters, and build the relationship before chasing the result.", k: ["Be Proactive","End in Mind","First Things","Win-Win","Synergize"] },
  { n: 2, t: "Emotional Intelligence", a: "Daniel Goleman", c: "communication", w: "The infographic treats emotional intelligence as a practical skill: recognize feelings, regulate reactions, understand other people, and use emotion without letting it hijack judgment.", q: "Name the emotion before it names the decision.", k: ["Recognize","Regulate","Empathize","Respond"] },
  { n: 3, t: "The 80/20 Principle", a: "Richard Koch", c: "productivity", w: "A small share of actions creates most outcomes. The work is to notice the imbalance, protect the high-value 20 percent, automate or remove the rest, and focus time where it produces disproportionate returns.", q: "Find the few moves doing the real work and stop pretending everything matters equally.", k: ["Observe","Prioritize","Automate","Scale"] },
  { n: 4, t: "How to Talk to Anyone", a: "Leil Lowndes", c: "communication", w: "Connection begins before the first sentence. The source emphasizes appearance, eye contact, posture, a genuine smile, confident openings, concise language, and keeping the spotlight on the other person.", q: "Look present, sound clear, and make the other person feel worth listening to.", k: ["Smile","Eye Contact","Posture","Listen","Be Concise"] },
  { n: 5, t: "Thinking, Fast and Slow", a: "Daniel Kahneman", c: "mindset", w: "The brain uses a fast, intuitive system and a slower, analytical one. Fast thinking is useful but prone to bias; better judgment comes from slowing down when the stakes, uncertainty, or emotion are high.", q: "Use instinct for speed, not for every verdict.", k: ["System 1","Pause","System 2","Decide"] },
  { n: 6, t: "13 Things Mentally Strong People Don't Do", a: "Amy Morin", c: "mindset", w: "Mental strength means managing thoughts, emotions, and behavior instead of handing control to circumstances. The source pushes against self-pity, fear of change, living in the past, unrealistic expectations, and avoiding calculated risk.", q: "Strength is not feeling less. It is choosing your response anyway.", k: ["Thoughts","Emotions","Behavior","Responsibility"] },
  { n: 7, t: "How to Stop Worrying and Start Living", a: "Dale Carnegie", c: "purpose", w: "Worry expands when the mind lives everywhere except the present. The framework narrows the day, analyzes the real worst case, chooses a response, reduces fatigue, and stops feeding fears that may never happen.", q: "Solve today's problem instead of rehearsing tomorrow's disaster.", k: ["Name It","Worst Case","Choose Action","Live Today"] },
  { n: 8, t: "The 5 Love Languages", a: "Gary D. Chapman", c: "communication", w: "People give and receive care in different ways: words, gifts, touch, time, and service. The practical point is to stop assuming your preferred expression is automatically meaningful to your partner.", q: "Love lands when it is delivered in the language the other person actually hears.", k: ["Words","Gifts","Touch","Time","Service"] },
  { n: 9, t: "Ikigai", a: "Héctor García, Francesc Miralles", c: "purpose", w: "Ikigai sits at the intersection of what you love, what you do well, what people need, and what can support you. The source connects purpose with daily activity, community, movement, and staying engaged.", q: "Purpose is not a slogan. It is the overlap you can live every day.", k: ["Love","+ Skill","+ Need","+ Value","Ikigai"] },
  { n: 10, t: "12 Rules for Life", a: "Jordan B. Peterson", c: "mindset", w: "The source frames a better life around responsibility, careful speech, meaningful goals, honest relationships, order, and incremental improvement. It is less about control and more about carrying your share with intention.", q: "Put your own house in order before demanding that the world cooperate.", k: ["Responsibility","Order","Truth","Meaning"] },
  { n: 11, t: "The Happiness Hypothesis", a: "Jonathan Haidt", c: "purpose", w: "Happiness is shaped by the relationship between the rational rider and the emotional elephant. Lasting wellbeing comes from alignment, meaningful relationships, purpose, and training the mind rather than demanding constant pleasure.", q: "You cannot lecture the elephant into moving. You have to train it.", k: ["Rider","Elephant","Alignment","Meaning"] },
  { n: 12, t: "Talking to Strangers", a: "Malcolm Gladwell", c: "communication", w: "People default to believing others and overrate their ability to read behavior. The source shows why context, transparency, and uncertainty matter when judging people we do not know.", q: "Confidence is not the same thing as accuracy when reading another person.", k: ["Default to Truth","Context","Uncertainty","Humility"] },
  { n: 13, t: "Steal Like an Artist", a: "Austin Kleon", c: "purpose", w: "Original work rarely starts from nothing. The source encourages collecting influences, remixing them honestly, practicing in public, staying curious, and turning borrowed sparks into something recognizably your own.", q: "Do not copy one source. Learn from many, then make the combination yours.", k: ["Collect","Remix","Practice","Share"] },
  { n: 14, t: "Thinking in Systems", a: "Donella H. Meadows, Diana Wright", c: "leadership", w: "A system is defined by its elements, relationships, and purpose. Fixes fail when they target one visible part without understanding feedback loops, delays, stocks, and the behavior of the whole.", q: "Before fixing the symptom, map the system that keeps producing it.", k: ["Elements","Connections","Purpose","Feedback"] },
  { n: 15, t: "Scrum", a: "Chris Sims, Hillary Louise Johnson", c: "productivity", w: "Scrum organizes complex work into short cycles with clear roles, a prioritized backlog, frequent review, and continuous adjustment. It turns uncertainty into a rhythm the team can inspect and improve.", q: "Plan less at once, deliver sooner, and learn from what actually happened.", k: ["Backlog","Sprint","Review","Adapt"] },
  { n: 16, t: "Start with No", a: "Jim Camp", c: "leadership", w: "Healthy negotiation does not begin with forced agreement. The source treats 'no' as permission to be honest, clarify the real problem, protect decisions from pressure, and build an agreement both sides can own.", q: "A clean no creates more truth than a nervous yes.", k: ["No","Clarify","Decide","Agreement"] },
  { n: 17, t: "Atomic Habits", a: "James Clear", c: "habits", w: "Behavior compounds through small, repeatable systems. The source focuses on identity and the four laws: make the right behavior obvious, attractive, easy, and satisfying.", q: "Make the next good action easier than the excuse.", k: ["Obvious","Attractive","Easy","Satisfying"] },
  { n: 18, t: "Boundaries", a: "Dr. Henry Cloud, Dr. John Townsend", c: "communication", w: "Boundaries define what you are responsible for and what you are not. The source emphasizes saying no, resisting guilt and control, allowing disagreement, and protecting healthy closeness through clear limits.", q: "A boundary is not punishment. It is clarity about ownership.", k: ["Own","Say No","Protect","Respect"] },
  { n: 19, t: "The 5-Second Rule", a: "Mel Robbins", c: "habits", w: "Hesitation gives the brain time to protect the status quo. Counting backward and moving interrupts that loop, creating a small window to act before doubt takes over.", q: "When the useful impulse shows up, move before your brain negotiates it away.", k: ["5","4","3","2","1 - Move"] },
  { n: 20, t: "The Healthy Mind Toolkit", a: "Alice Boyes, PhD", c: "mindset", w: "Mental friction often comes from habits, assumptions, and avoidance patterns that quietly block progress. The source focuses on noticing those patterns, simplifying actions, and replacing unhelpful responses with better ones.", q: "You cannot clean up your thinking while protecting the habits that create the clutter.", k: ["Notice","Question","Simplify","Replace"] },
  { n: 21, t: "The Miracle Morning", a: "Hal Elrod", c: "habits", w: "The morning becomes a deliberate training block for the person you want to become. Silence, affirmations, visualization, exercise, reading, and writing create momentum before the day starts making decisions for you.", q: "Win the first hour before the rest of the day starts spending it.", k: ["Silence","Affirm","Visualize","Exercise","Read + Write"] },
  { n: 22, t: "Influence", a: "Robert B. Cialdini, PhD", c: "communication", w: "Persuasion often relies on predictable shortcuts: reciprocity, consistency, social proof, liking, authority, and scarcity. Recognizing the mechanism gives you a better chance of choosing instead of reacting.", q: "When the pressure feels automatic, look for the principle being used on you.", k: ["Reciprocity","Consistency","Social Proof","Authority","Scarcity"] },
  { n: 23, t: "The Subtle Art of Not Giving a F*ck", a: "Mark Manson", c: "purpose", w: "A meaningful life is not built by caring about everything. The source argues for choosing better problems, accepting responsibility for your reactions, and spending attention on values worth the cost.", q: "You have limited attention. Spend it on problems worth having.", k: ["Choose Values","Accept Limits","Own Response","Act"] },
  { n: 24, t: "Creative Confidence", a: "Tom Kelley, David Kelley", c: "leadership", w: "Creativity is a behavior, not a rare personality trait. The source links innovation to empathy, experimentation, diverse teams, rapid prototypes, and leadership that makes it safe to test imperfect ideas.", q: "Confidence grows after you make something, not before.", k: ["Empathize","Prototype","Test","Learn"] },
  { n: 25, t: "Why We Sleep", a: "Matthew Walker", c: "habits", w: "Sleep supports learning, memory, emotional regulation, physical repair, and sound judgment. The source makes the cost clear: cutting sleep does not create more usable time; it degrades the person using it.", q: "Sleep is not time away from performance. It is part of the performance.", k: ["NREM","REM","Memory","Recovery"] },
  { n: 26, t: "Mini Habits", a: "Stephen Guise", c: "habits", w: "A behavior small enough to feel almost trivial is easier to repeat and harder to avoid. The strategy uses tiny minimums to build consistency, reduce resistance, and let momentum create more than the requirement.", q: "Shrink the habit until starting feels ridiculous to refuse.", k: ["Tiny Step","Repeat","Momentum","Expand"] },
  { n: 27, t: "The Life-Changing Magic of Tidying Up", a: "Marie Kondō", c: "habits", w: "Decluttering works when you choose what belongs in your life rather than merely rearranging excess. The source recommends sorting by category, keeping what sparks joy, and giving every retained item a clear home.", q: "Do not organize what you already know you do not want.", k: ["Discard","Choose","Category","Place"] },
  { n: 28, t: "The 10X Rule", a: "Grant Cardone", c: "mindset", w: "The 10X framework pairs larger targets with much greater action. Its central warning is that average estimates, effort, and persistence usually understate what a serious goal will demand.", q: "Do not multiply the goal and leave the effort unchanged.", k: ["10X Target","10X Action","Persist","Adjust"] },
  { n: 29, t: "Creativity, Inc.", a: "Ed Catmull, Amy Wallace", c: "leadership", w: "Great ideas depend on the environment around them. The source prioritizes strong people, candid feedback, psychological safety, and leaders who remove hidden barriers before those barriers kill the work.", q: "Protect the team that can find the idea, not the first version of the idea.", k: ["People","Candor","Safety","Iteration"] },
  { n: 30, t: "The One Thing", a: "Gary Keller, Jay Papasan", c: "productivity", w: "Extraordinary progress comes from identifying the single action that makes other work easier or unnecessary. The framework uses a focusing question, protects time, and accepts that priority means saying no.", q: "Find the domino that makes the rest easier to move.", k: ["Ask","Choose One","Time Block","Protect"] },
  { n: 31, t: "How to Stop Procrastinating", a: "S.J. Scott", c: "productivity", w: "Procrastination is usually a system problem before it is a character flaw. The source points to unclear goals, perfectionism, low energy, distraction, and weak routines, then replaces them with smaller actions and visible progress.", q: "Make the next step specific enough that delay has nowhere to hide.", k: ["Clarify","Shrink","Schedule","Start"] },
  { n: 32, t: "What the Most Successful People Do Before Breakfast", a: "Laura Vanderkam", c: "habits", w: "Early hours are valuable because they are less exposed to other people's priorities. The source recommends using them for high-value work, exercise, relationships, and planning before the day becomes reactive.", q: "Put your priority on the calendar before the world fills the space.", k: ["Plan","Create","Move","Connect"] },
  { n: 33, t: "Make Your Bed", a: "Admiral William H. McRaven", c: "habits", w: "Small disciplined actions establish a standard for the day. The source connects routine, teamwork, resilience, courage, and persistence, beginning with one task you can finish immediately.", q: "Start with one completed promise to yourself.", k: ["Routine","Discipline","Teamwork","Persist"] },
  { n: 34, t: "The Willpower Instinct", a: "Kelly McGonigal, Ph.D.", c: "habits", w: "Willpower improves through self-awareness, stress management, and understanding the conflict between immediate impulse and long-term goals. The source treats it as trainable, limited, and strongly affected by environment.", q: "Do not rely on willpower while designing a day that constantly drains it.", k: ["I Will","I Won't","I Want","Recover"] },
  { n: 35, t: "15 Secrets Successful People Know About Time Management", a: "Kevin Kruse", c: "productivity", w: "Time cannot be replaced, so the source shifts attention from managing hours to protecting minutes. Prioritize the most valuable task, use the calendar, say no, delegate, and stop confusing activity with progress.", q: "Your calendar tells the truth about your priorities.", k: ["Prioritize","Calendar","Delegate","Say No"] },
  { n: 36, t: "The 5 AM Club", a: "Robin Sharma", c: "habits", w: "The framework uses a protected early hour to strengthen body, reflection, and learning. Consistency matters more than the clock itself: the point is to create an uninterrupted ritual before distraction begins.", q: "Own a quiet hour before the day starts making demands.", k: ["Move","Reflect","Grow","Repeat"] },
  { n: 37, t: "Eat That Frog!", a: "Brian Tracy", c: "productivity", w: "The highest-impact task should be identified, broken down, and completed before lower-value work consumes the day. The source favors clear priorities, preparation, single-tasking, and steady execution.", q: "Do the task with the biggest consequence before the easy work multiplies.", k: ["Choose Frog","Prepare","Focus","Finish"] },
  { n: 38, t: "Declutter Your Mind", a: "S.J. Scott, Barrie Davenport", c: "purpose", w: "Mental clutter grows from stress, excess information, too many choices, unresolved commitments, and misaligned goals. The source uses values, simplification, mindfulness, and deliberate routines to reduce noise.", q: "A quieter mind usually starts with fewer open loops.", k: ["Values","Simplify","Close Loops","Breathe"] },
  { n: 39, t: "Limitless", a: "Jim Kwik", c: "mindset", w: "Learning improves when mindset, motivation, and method work together. The source challenges limiting beliefs and adds practical tools for focus, memory, reading, and sustained curiosity.", q: "Better learning is not one trick. It is belief, reason, and method working together.", k: ["Mindset","Motivation","Method","Practice"] },
  { n: 40, t: "Getting Things Done", a: "David Allen", c: "productivity", w: "Stress drops when commitments leave your head and enter a trusted system. Capture everything, clarify the next action, organize it, review regularly, and engage with confidence.", q: "Your brain is for having ideas, not holding every reminder.", k: ["Capture","Clarify","Organize","Reflect","Engage"] },
  { n: 41, t: "Deep Work", a: "Cal Newport", c: "productivity", w: "Undistracted concentration is increasingly rare and increasingly valuable. The source recommends scheduling depth, reducing shallow work, embracing boredom, and measuring output instead of online presence.", q: "Protect concentration like a scarce business asset.", k: ["Schedule","Disconnect","Concentrate","Ship"] },
  { n: 42, t: "Don't Overthink It", a: "Anne Bogel", c: "purpose", w: "Overthinking turns ordinary choices into recurring mental costs. The source recommends accepting imperfect information, setting decision limits, interrupting repetitive thought, and choosing a practical next move.", q: "A good decision made on time beats a perfect one that never arrives.", k: ["Reality Check","Limit Options","Decide","Move"] },
  { n: 43, t: "Do the Work", a: "Steven Pressfield", c: "productivity", w: "Resistance appears wherever meaningful work begins. The source says to start before feeling ready, separate planning from execution, expect the messy middle, and finish despite fear or self-doubt.", q: "The work gets easier after it exists, not while you are avoiding it.", k: ["Start","Face Resistance","Persist","Finish"] },
  { n: 44, t: "Everything is Figureoutable", a: "Marie Forleo", c: "mindset", w: "The core belief is that action creates options. The source connects beliefs to thoughts, feelings, and behavior, then uses experimentation, resourcefulness, and persistence to move through uncertainty.", q: "You do not need the whole answer. You need the next workable move.", k: ["Believe","Act","Learn","Adjust"] },
  { n: 45, t: "Feeling Good", a: "David D. Burns, M.D.", c: "purpose", w: "Mood is influenced by the interpretation attached to events. The source identifies cognitive distortions, records dysfunctional thoughts, tests them against evidence, and replaces them with more balanced thinking.", q: "A thought can feel true and still fail the evidence test.", k: ["Notice","Name Distortion","Test","Reframe"] },
  { n: 46, t: "You Are a Badass at Making Money", a: "Jen Sincero", c: "mindset", w: "Money behavior is tied to identity, beliefs, habits, and the willingness to ask for more. The source challenges shame and scarcity thinking while emphasizing value creation, decisions, and consistent action.", q: "Your financial ceiling often starts as a story you keep repeating.", k: ["Belief","Value","Ask","Act"] },
  { n: 47, t: "Unlimited Memory", a: "Grandmaster Kevin Horsley", c: "mindset", w: "Memory improves through attention, association, imagination, and organized recall. The source treats strong memory as a skill built with vivid links and deliberate practice, not a fixed gift.", q: "Make information vivid enough that your brain has somewhere to put it.", k: ["Focus","Associate","Visualize","Recall"] },
  { n: 48, t: "Principles", a: "Raymond Dalio", c: "leadership", w: "Better decisions come from making values explicit, diagnosing problems honestly, finding root causes, designing solutions, and learning from results. The source treats principles as reusable operating rules.", q: "Turn painful lessons into rules you can use before the next decision.", k: ["Values","Diagnose","Design","Iterate"] },
  { n: 49, t: "5 Dysfunctions of a Team", a: "Patrick Lencioni", c: "leadership", w: "Team failure compounds from the bottom up: no trust creates fear of conflict, weak commitment, avoidance of accountability, and inattention to collective results. Fixing the top symptom without rebuilding trust will not hold.", q: "Results fail last. Trust usually failed first.", k: ["Trust","Conflict","Commitment","Accountability","Results"] },
  { n: 50, t: "Mindful Relationship Habits", a: "S.J.Scott & Barrie Davenport", c: "communication", w: "Healthy relationships require attention, intentional communication, vulnerability, active listening, shared time, and routines that keep the partnership from becoming an afterthought.", q: "A relationship stays important only when the calendar and behavior agree.", k: ["Prioritize","Listen","Be Vulnerable","Connect"] },
];

// ── VISION ───────────────────────────────────────────────────────

const PHILOSOPHY = [
  { t: "Advise", d: "Clarity before tools. Strategic alignment and governance blueprints are established before any technical deployment begins." },
  { t: "Vet", d: "Risk analysis first. Every AI tool and workflow is rigorously vetted against confidentiality standards and data protection guardrails." },
  { t: "Deliver", d: "Measured execution. Secure AI solutions integrated into existing professional workflows with minimal friction and maximum accountability." },
];

const PRINCIPLES = [
  { t: "Confidentiality by Default", d: "Every engagement is NDA-first. What happens inside your firm is discussed nowhere else, ever." },
  { t: "Evidence Over Hype", d: "Nothing is recommended that has not been tested in the Lab. Enthusiasm is not a control." },
  { t: "AI Drafts. Experts Verify.", d: "Human accountability sits inside every workflow Ayvede designs. A named professional owns every output." },
  { t: "Governance Is an Advantage", d: "Controls done right accelerate adoption. The firms that govern first move faster, with fewer surprises." },
];

// ── TOOLS · THE SPEND DIAGNOSTIC ─────────────────────────────────
//  Pricing verified against vendor pricing pages and current trackers on
//  2026-07-14. Rates are USD list prices per seat per month on the
//  annual-billing basis unless noted. unit: "seat" (price x seats),
//  "flat" (fixed monthly), "spend" (visitor enters monthly dollars).
//  caps = capabilities the tool provides; incl = capabilities bundled
//  inside a suite (used for overlap detection). uncertain: true marks
//  rates that could not be confirmed on the vendor page; the UI says so.
//  To update pricing: edit the rows, bump PRICING_ASOF, rebuild.

const PRICING_ASOF = "July 14, 2026";

const CAP_LABELS = {
  assistant: "AI assistants",
  coding: "AI coding tools",
  transcription: "meeting transcription",
  chat: "team chat",
  meetings: "video meetings",
  storage: "file storage",
  docs: "docs & wikis",
  projects: "project tracking",
  whiteboard: "whiteboards",
  crm: "CRM",
  design: "design tools",
  esign: "e-signature",
};

const TOOL_CATALOG = [
  // AI assistants & copilots
  { id: "chatgpt", name: "ChatGPT Business", cat: "AI Assistants & Copilots", price: 20, unit: "seat", note: "$25 billed monthly · 2-seat min", caps: ["assistant"] },
  { id: "claude", name: "Claude Team", cat: "AI Assistants & Copilots", price: 20, unit: "seat", note: "$25 billed monthly", caps: ["assistant"] },
  { id: "m365copilot", name: "Microsoft 365 Copilot", cat: "AI Assistants & Copilots", price: 21, unit: "seat", note: "add-on; needs an M365 plan", caps: ["assistant"] },
  { id: "perplexity", name: "Perplexity Enterprise Pro", cat: "AI Assistants & Copilots", price: 33.33, unit: "seat", note: "$400/seat/yr · $40 monthly", caps: ["assistant"] },
  { id: "ghcopilot", name: "GitHub Copilot Business", cat: "AI Assistants & Copilots", price: 19, unit: "seat", note: "per assigned seat", caps: ["coding"] },
  { id: "cursor", name: "Cursor Teams", cat: "AI Assistants & Copilots", price: 32, unit: "seat", note: "$40 billed monthly", caps: ["coding"] },
  { id: "midjourney", name: "Midjourney Standard", cat: "AI Assistants & Copilots", price: 24, unit: "seat", note: "per account · $30 monthly", caps: ["design"] },
  { id: "grammarly", name: "Grammarly Pro", cat: "AI Assistants & Copilots", price: 12, unit: "seat", note: "teams up to 149", caps: ["assistant"] },
  { id: "otter", name: "Otter.ai Business", cat: "AI Assistants & Copilots", price: 19.99, unit: "seat", note: "$30 billed monthly", caps: ["transcription"] },
  { id: "openai-api", name: "OpenAI API", cat: "AI Assistants & Copilots", price: 0, unit: "spend", note: "usage-based tokens, no seat price", caps: [] },
  { id: "anthropic-api", name: "Anthropic API", cat: "AI Assistants & Copilots", price: 0, unit: "spend", note: "usage-based tokens, no seat price", caps: [] },
  // Suites & communication
  { id: "m365", name: "Microsoft 365 Business Standard", cat: "Suites & Communication", price: 14, unit: "seat", note: "$16.80 monthly", caps: [], incl: { meetings: "Teams", chat: "Teams", storage: "OneDrive", docs: "Office" } },
  { id: "gws", name: "Google Workspace Business Standard", cat: "Suites & Communication", price: 14, unit: "seat", note: "Gemini included", caps: [], incl: { assistant: "Gemini", meetings: "Meet", chat: "Google Chat", storage: "Drive", docs: "Docs" } },
  { id: "slack", name: "Slack Business+", cat: "Suites & Communication", price: 15, unit: "seat", note: "$18 monthly · Pro tier $7.25", caps: ["chat"] },
  { id: "zoom", name: "Zoom Workplace Business", cat: "Suites & Communication", price: 18.33, unit: "seat", note: "$21.99 monthly", caps: ["meetings"], incl: { transcription: "AI Companion" } },
  { id: "ringcentral", name: "RingCentral RingEX Core", cat: "Suites & Communication", price: 20, unit: "seat", note: "$30 monthly", caps: [] },
  // Docs, storage & sign
  { id: "dropbox", name: "Dropbox Standard", cat: "Docs, Storage & Sign", price: 15, unit: "seat", note: "team plan", caps: ["storage"] },
  { id: "box", name: "Box Business", cat: "Docs, Storage & Sign", price: 15, unit: "seat", note: "3-user min", caps: ["storage"] },
  { id: "docusign", name: "DocuSign Standard", cat: "Docs, Storage & Sign", price: 30, unit: "seat", note: "~$45 month-to-month", caps: ["esign"] },
  { id: "notion", name: "Notion Business", cat: "Docs, Storage & Sign", price: 20, unit: "seat", note: "$24 monthly", caps: ["docs", "projects"] },
  { id: "confluence", name: "Confluence Standard", cat: "Docs, Storage & Sign", price: 5.42, unit: "seat", note: "effective annual rate", caps: ["docs"], uncertain: true },
  // Projects & collaboration
  { id: "asana", name: "Asana Starter", cat: "Projects & Collaboration", price: 10.99, unit: "seat", note: "$13.49 monthly", caps: ["projects"] },
  { id: "monday", name: "monday.com Standard", cat: "Projects & Collaboration", price: 12, unit: "seat", note: "3-seat min typical", caps: ["projects"] },
  { id: "jira", name: "Jira Standard", cat: "Projects & Collaboration", price: 7.91, unit: "seat", note: "annual banding saves ~17%", caps: ["projects"] },
  { id: "airtable", name: "Airtable Team", cat: "Projects & Collaboration", price: 20, unit: "seat", note: "$24 monthly", caps: ["projects"] },
  { id: "smartsheet", name: "Smartsheet Business", cat: "Projects & Collaboration", price: 19, unit: "seat", note: "$24 monthly", caps: ["projects"] },
  { id: "miro", name: "Miro Business", cat: "Projects & Collaboration", price: 20, unit: "seat", note: "~$25 monthly", caps: ["whiteboard"], uncertain: true },
  { id: "loom", name: "Loom Business", cat: "Projects & Collaboration", price: 15, unit: "seat", note: "$18 monthly", caps: [] },
  { id: "calendly", name: "Calendly Teams", cat: "Projects & Collaboration", price: 16, unit: "seat", note: "$20 monthly", caps: [] },
  // Sales & client
  { id: "sfstarter", name: "Salesforce Starter Suite", cat: "Sales & Client", price: 25, unit: "seat", note: "Pro Suite is $100/seat", caps: ["crm"] },
  { id: "hubspot", name: "HubSpot Sales Hub Pro", cat: "Sales & Client", price: 90, unit: "seat", note: "$100 billed monthly", caps: ["crm"] },
  { id: "salesnav", name: "LinkedIn Sales Navigator Core", cat: "Sales & Client", price: 89.99, unit: "seat", note: "$119.99 monthly", caps: [] },
  { id: "zapier", name: "Zapier Team", cat: "Sales & Client", price: 69, unit: "flat", note: "flat, includes 25 users; task-metered", caps: [] },
  // Design & content
  { id: "canva", name: "Canva Business", cat: "Design & Content", price: 20.83, unit: "seat", note: "~$250/user/yr", caps: ["design"], uncertain: true },
  { id: "figma", name: "Figma Professional", cat: "Design & Content", price: 16, unit: "seat", note: "full seat · $20 monthly", caps: ["design", "whiteboard"] },
  { id: "adobecc", name: "Adobe CC for Teams (All Apps)", cat: "Design & Content", price: 89.99, unit: "seat", note: "per license", caps: ["design"], incl: { esign: "Acrobat" } },
  // Vertical
  { id: "clio", name: "Clio Manage Advanced", cat: "Legal & Vertical", price: 109, unit: "seat", note: "$119 billed monthly", caps: [], uncertain: true },
  { id: "qbo", name: "QuickBooks Online Plus", cat: "Legal & Vertical", price: 115, unit: "flat", note: "per company, up to 5 users", caps: [], uncertain: true },
];

const TOOL_CATS = ["AI Assistants & Copilots", "Suites & Communication", "Docs, Storage & Sign", "Projects & Collaboration", "Sales & Client", "Design & Content", "Legal & Vertical"];

//  Benchmarks quoted in the readout. Each one is sourced; keep it that way.
const DIAG_BENCH = {
  unusedShare: 0.36,
  unusedLabel: "36% of SaaS licenses go unused",
  unusedSource: "Zylo 2026 SaaS Management Index",
  facts: [
    { f: "36% of paid SaaS licenses go unused across the average portfolio.", s: "Zylo 2026 SaaS Management Index" },
    { f: "The average portfolio already carries 7 overlapping generative-AI apps.", s: "Zylo 2026 SaaS Management Index" },
    { f: "78% of AI users bring their own unsanctioned AI tools to work.", s: "Microsoft Work Trend Index, 2024" },
    { f: "57% of employees hide their AI use from their employer.", s: "KPMG global AI study, 2025" },
  ],
};

//  The Tools registry. Add a diagnostic here and it appears on the page,
//  no structural rebuild needed.
const TOOL_REGISTRY = [
  { n: "01", t: "The Spend Diagnostic", stage: "Live", d: "Your AI and SaaS surface area, priced at real list rates, with overlap and stranded-license flags." },
  { n: "02", t: "AI Policy Gap Check", stage: "In the Lab", d: "Score your acceptable-use policy against current bar and regulator guidance." },
  { n: "03", t: "Vendor Risk Scorecard", stage: "In the Lab", d: "A structured first-pass risk read on any AI vendor your firm is evaluating." },
];

// ─────────────────────────────────────────────────────────────────
//  DESIGN SYSTEM
// ─────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
*{box-sizing:border-box;margin:0;padding:0}
.av{background:#0b1120;color:#e8ecf1;font-family:'Outfit',system-ui,sans-serif;min-height:100vh;-webkit-font-smoothing:antialiased;line-height:1.6}
.av ::selection{background:rgba(46,196,168,.25)}
.av ::-webkit-scrollbar{width:6px;height:6px}
.av ::-webkit-scrollbar-track{background:#0b1120}
.av ::-webkit-scrollbar-thumb{background:#1e2d44;border-radius:3px}
.av button{font-family:'Outfit',sans-serif}
.av button:focus-visible,.av a:focus-visible,.av input:focus-visible,.av textarea:focus-visible,.av select:focus-visible{outline:2px solid #2ec4a8;outline-offset:2px}
.mono{font-family:'JetBrains Mono',monospace}
.wrap{max-width:1180px;margin:0 auto;padding:0 clamp(18px,4.5vw,44px)}
.sec{padding:clamp(54px,8.5vw,104px) 0}
.sec.tight{padding:clamp(34px,5vw,62px) 0}
.kick{font-family:'JetBrains Mono',monospace;font-size:clamp(9.5px,1vw,11px);letter-spacing:.24em;text-transform:uppercase;color:#c7a26b;font-weight:600}
.kick.teal{color:#2ec4a8}
.h1{font-size:clamp(33px,6.2vw,62px);font-weight:800;line-height:1.05;letter-spacing:-.02em;color:#e8ecf1}
.h2{font-size:clamp(24px,3.8vw,40px);font-weight:700;line-height:1.12;letter-spacing:-.015em;color:#e8ecf1}
.h3{font-size:clamp(17px,2vw,21px);font-weight:700;letter-spacing:-.01em;color:#e8ecf1}
.sub{color:#7a8ba3;font-size:clamp(13.5px,1.5vw,16.5px);line-height:1.65;max-width:660px}
.body{color:#a8b4c6;font-size:clamp(13px,1.4vw,14.5px);line-height:1.65}
.small{font-size:clamp(11.5px,1.2vw,13px);color:#7a8ba3;line-height:1.6}
.dim{color:#7a8ba3}.gold{color:#c7a26b}.tealTx{color:#2ec4a8}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:4px;font-weight:600;font-size:clamp(12px,1.3vw,13.5px);letter-spacing:.02em;padding:12px 20px;border:1px solid transparent;cursor:pointer;transition:all .18s ease;text-decoration:none}
.btn.primary{background:#2ec4a8;color:#07131f}
.btn.primary:hover{background:#3ad4b7;transform:translateY(-1px)}
.btn.ghost{background:transparent;color:#e8ecf1;border-color:rgba(199,162,107,.45)}
.btn.ghost:hover{border-color:#c7a26b;color:#c7a26b}
.btn.line{background:transparent;color:#2ec4a8;border-color:rgba(46,196,168,.4)}
.btn.line:hover{border-color:#2ec4a8;background:rgba(46,196,168,.06)}
.card{background:#101828;border:1px solid #1e2d44;border-radius:5px;padding:clamp(18px,2.6vw,26px);transition:border-color .2s ease}
.card:hover{border-color:rgba(46,196,168,.4)}
.card.gh:hover{border-color:rgba(199,162,107,.45)}
.grid{display:grid;gap:clamp(12px,1.8vw,18px)}
.g2{grid-template-columns:repeat(auto-fit,minmax(min(100%,310px),1fr))}
.g3{grid-template-columns:repeat(auto-fit,minmax(min(100%,252px),1fr))}
.g4{grid-template-columns:repeat(auto-fit,minmax(min(100%,215px),1fr))}
.tag{display:inline-flex;align-items:center;gap:6px;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:#7a8ba3;border:1px solid #1e2d44;background:#161f30;border-radius:3px;padding:4px 9px;font-weight:500;white-space:nowrap}
.tag.t{color:#2ec4a8;border-color:rgba(46,196,168,.3)}
.tag.g{color:#c7a26b;border-color:rgba(199,162,107,.3)}
.rule{height:1px;background:#1e2d44;border:0}
.goldRule{height:1px;border:0;background:linear-gradient(90deg,transparent,rgba(199,162,107,.5),transparent)}
.list{list-style:none;display:grid;gap:9px}
.list li{display:flex;gap:10px;align-items:flex-start;font-size:clamp(12.5px,1.3vw,13.5px);color:#a8b4c6;line-height:1.5}
.list li::before{content:"";width:5px;height:5px;border-radius:1px;background:#2ec4a8;margin-top:7px;flex:none}
.list.gd li::before{background:#c7a26b}
.nav{position:fixed;top:0;left:0;right:0;z-index:60;background:rgba(11,17,32,.92);backdrop-filter:blur(10px);border-bottom:1px solid rgba(199,162,107,.3)}
.navIn{display:flex;align-items:center;justify-content:space-between;gap:12px;height:clamp(56px,7vw,64px)}
.brand{display:inline-flex;align-items:baseline;cursor:pointer;background:none;border:0;font-weight:700;font-size:clamp(18px,2.2vw,21px);letter-spacing:.22em;color:#cfd6df;padding:4px 0}
.brand .v{color:#2ec4a8}
.navLinks{display:flex;align-items:center;gap:clamp(0px,.5vw,4px)}
.navLink{background:none;border:0;cursor:pointer;font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:.15em;text-transform:uppercase;color:#7a8ba3;padding:9px 10px;border-bottom:1px solid transparent;transition:color .15s ease}
.navLink:hover{color:#e8ecf1}
.navLink.on{color:#e8ecf1;border-bottom-color:#c7a26b}
.burger{display:none;background:none;border:1px solid #1e2d44;border-radius:4px;color:#7a8ba3;padding:7px;cursor:pointer;align-items:center;justify-content:center}
.mmenu{position:fixed;top:clamp(56px,7vw,64px);left:0;right:0;z-index:59;background:#0d1424;border-bottom:1px solid #1e2d44;padding:10px 0 16px}
.mmenu .navLink{display:block;width:100%;text-align:left;font-size:12px;padding:12px clamp(18px,4.5vw,44px);border-bottom:0}
.mmenu .navLink.on{color:#2ec4a8}
.mmenu .navLink.sub{padding-left:calc(clamp(18px,4.5vw,44px) + 16px)}
.mGroupLbl{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:#c7a26b;font-weight:600;padding:12px clamp(18px,4.5vw,44px) 4px}
.navGroup{position:relative;display:inline-flex}
.navDrop{position:absolute;top:100%;left:0;min-width:186px;background:#0d1424;border:1px solid #1e2d44;border-top:1px solid rgba(199,162,107,.3);border-radius:0 0 4px 4px;padding:6px 0;z-index:61}
.navDrop .navLink{display:block;width:100%;text-align:left;padding:10px 16px;border-bottom:0}
.navDrop .navLink.on{color:#2ec4a8}
@media(max-width:1024px){.navLinks,.navCta{display:none}.burger{display:inline-flex}}
.hero{position:relative;overflow:hidden;padding:clamp(96px,14vw,168px) 0 clamp(48px,7vw,92px)}
.hero .glow{position:absolute;inset:0;background:radial-gradient(900px 460px at 80% 12%,rgba(199,162,107,.10),transparent 62%),radial-gradient(700px 420px at 8% 95%,rgba(46,196,168,.07),transparent 60%);pointer-events:none}
.heroDecor{position:absolute;right:clamp(-140px,-6vw,-40px);top:clamp(60px,9vw,90px);width:min(52vw,560px);opacity:.55;pointer-events:none}
@media(max-width:760px){.heroDecor{opacity:.25;width:78vw;right:-30vw}}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.kpi{background:#161f30;border-top:1px solid #1e2d44;border-bottom:1px solid #1e2d44}
.kpiIn{display:flex;gap:clamp(20px,4.5vw,52px);overflow-x:auto;padding:15px 0;scrollbar-width:none}
.kpiIn::-webkit-scrollbar{display:none}
.kpiItem{flex:none;display:flex;align-items:baseline;gap:9px}
.kpiNum{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:clamp(15px,1.9vw,20px);color:#c7a26b}
.kpiLbl{font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:#7a8ba3}
.stepCell{border-left:1px solid #1e2d44;padding:6px 14px 6px 18px}
.stepN{font-family:'JetBrains Mono',monospace;color:#c7a26b;font-size:11px;letter-spacing:.22em;font-weight:600}
.svcRow{display:grid;gap:clamp(14px,3vw,44px);grid-template-columns:minmax(0,1fr);padding:clamp(24px,4vw,44px) 0;border-bottom:1px solid #1e2d44}
@media(min-width:820px){.svcRow{grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr)}}
.input,.ta,.sel{width:100%;background:#161f30;border:1px solid #1e2d44;border-radius:4px;color:#e8ecf1;font-family:'Outfit',sans-serif;font-size:14px;padding:11px 12px;outline:none;transition:border-color .15s ease}
.input:focus,.ta:focus,.sel:focus{border-color:#2ec4a8}
.ta{resize:vertical;min-height:110px}
.sel{appearance:none;background-image:linear-gradient(45deg,transparent 50%,#7a8ba3 50%),linear-gradient(135deg,#7a8ba3 50%,transparent 50%);background-position:calc(100% - 18px) 50%,calc(100% - 13px) 50%;background-size:5px 5px;background-repeat:no-repeat}
.lbl{display:block;font-family:'JetBrains Mono',monospace;font-size:9.5px;letter-spacing:.18em;text-transform:uppercase;color:#7a8ba3;margin-bottom:7px;font-weight:500}
.band{background:#101828;border-top:1px solid rgba(199,162,107,.3);border-bottom:1px solid #1e2d44}
.foot{background:#0d1424;border-top:1px solid rgba(199,162,107,.3);padding:clamp(40px,6vw,64px) 0 28px}
.footGrid{display:grid;gap:clamp(24px,4vw,40px);grid-template-columns:repeat(auto-fit,minmax(min(100%,215px),1fr))}
.fLink{display:block;background:none;border:0;cursor:pointer;text-align:left;color:#7a8ba3;font-size:13px;padding:4px 0;transition:color .15s}
.fLink:hover{color:#e8ecf1}
.rv{opacity:0;transform:translateY(14px);transition:opacity .55s ease,transform .55s ease}
.rv.in{opacity:1;transform:none}
@media(prefers-reduced-motion:reduce){.rv{opacity:1;transform:none;transition:none}.btn:hover{transform:none}}
.insPill{cursor:pointer;padding:8px 12px;font-size:10.5px;transition:color .15s ease,border-color .15s ease,background .15s ease}
.insPill:hover{color:#e8ecf1;border-color:rgba(199,162,107,.45)}
.insPill.on{color:#2ec4a8;border-color:rgba(46,196,168,.45);background:rgba(46,196,168,.06)}
.insSearch{max-width:280px;flex:1 1 210px}
/* The briefing grid is the one grid whose item count changes at runtime, so it
   uses auto-fill rather than the shared .g3 auto-fit. auto-fit collapses empty
   tracks, which let a single filter result stretch to the full row width; a card
   must stay the same size at 1 results or 30. Track sizing is identical to .g3,
   so the unfiltered view is unchanged. The fixed-count grids keep .g3. */
.insGrid{grid-template-columns:repeat(auto-fill,minmax(min(100%,252px),1fr))}
.insCard{cursor:pointer;display:flex;flex-direction:column}
.insCard:focus-visible{outline:2px solid #2ec4a8;outline-offset:2px}
.insCard .insMotif{margin:calc(clamp(18px,2.6vw,26px)*-1) calc(clamp(18px,2.6vw,26px)*-1) 16px}
.insMotif svg{display:block;width:100%;aspect-ratio:16/9;border-radius:4px 4px 0 0;border-bottom:1px solid #1e2d44}
.insReaderStrip svg{display:block;width:100%;aspect-ratio:8/1;border-radius:5px;border:1px solid #1e2d44}
.insBody strong{color:#e8ecf1;font-weight:600}
.insBody a{color:#2ec4a8;text-decoration:none;border-bottom:1px solid rgba(46,196,168,.4);transition:border-color .15s ease}
.insBody a:hover{border-bottom-color:#2ec4a8}
.insTableWrap{overflow-x:auto;margin:18px 0}
.insTable{width:100%;border-collapse:collapse;font-size:clamp(12.5px,1.35vw,14px);line-height:1.55}
.insTable td{border:1px solid #1e2d44;padding:10px 12px;color:#a8b4c6;text-align:left;vertical-align:top;min-width:150px}
.insTable tr:first-child td{background:#161f30;color:#e8ecf1;font-weight:600}
.tcGrid{display:grid;gap:clamp(16px,2.4vw,26px);grid-template-columns:minmax(0,1fr);align-items:start}
@media(min-width:960px){.tcGrid{grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr)}.tcSticky{position:sticky;top:84px}}
.tcCatLbl{margin:18px 0 10px}
.tcCatLbl:first-of-type{margin-top:0}
.tcList{display:grid;gap:8px}
.tcRow{display:flex;align-items:center;gap:10px;width:100%;text-align:left;background:#101828;border:1px solid #1e2d44;border-radius:4px;padding:10px 12px;cursor:pointer;transition:border-color .15s ease,background .15s ease;color:#a8b4c6;font-family:'Outfit',sans-serif;font-size:clamp(12.5px,1.3vw,13.5px);font-weight:500}
.tcRow:hover{border-color:rgba(46,196,168,.4)}
.tcRow.on{border-color:rgba(46,196,168,.55);background:rgba(46,196,168,.05);color:#e8ecf1}
.tcMark{width:14px;height:14px;flex:none;border:1px solid #1e2d44;border-radius:2px;display:inline-flex;align-items:center;justify-content:center;background:#161f30;transition:all .15s ease}
.tcRow.on .tcMark{background:#2ec4a8;border-color:#2ec4a8;color:#07131f}
.tcName{flex:1;min-width:0}
.tcNote{display:block;font-size:10.5px;color:#7a8ba3;margin-top:1px}
.tcPrice{font-family:'JetBrains Mono',monospace;font-size:11px;color:#7a8ba3;white-space:nowrap}
.tcRow.on .tcPrice{color:#2ec4a8}
.tcCtl{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding:9px 12px;border:1px solid rgba(46,196,168,.28);border-top:0;border-radius:0 0 4px 4px;background:#0d1424;margin-top:-6px}
.step{display:inline-flex;align-items:center;border:1px solid #1e2d44;border-radius:3px;background:#161f30}
.step button{background:none;border:0;color:#7a8ba3;width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;cursor:pointer}
.step button:hover{color:#2ec4a8}
.step input{width:54px;text-align:center;background:transparent;border:0;color:#e8ecf1;font-family:'JetBrains Mono',monospace;font-size:12px;outline:none;-moz-appearance:textfield;padding:0}
.step input::-webkit-outer-spin-button,.step input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}
.tcLineTotal{font-family:'JetBrains Mono',monospace;font-size:11.5px;color:#c7a26b;white-space:nowrap}
.tcBigNum{font-family:'JetBrains Mono',monospace;font-weight:700;font-size:clamp(26px,3.6vw,38px);letter-spacing:-.01em;color:#c7a26b;line-height:1.1}
.tcBar{display:flex;height:10px;border-radius:2px;overflow:hidden;border:1px solid #1e2d44;background:#161f30}
.tcBar .a{background:#2ec4a8;transition:width .3s ease}
.tcBar .w{background:rgba(239,68,68,.75);transition:width .3s ease}
.tcFlag{display:flex;gap:9px;align-items:flex-start;font-size:clamp(12px,1.3vw,13px);color:#a8b4c6;line-height:1.5;padding:9px 0;border-top:1px solid #1e2d44}
.tcAdd{display:grid;gap:8px;grid-template-columns:minmax(0,1.4fr) minmax(0,.8fr) minmax(0,.8fr) auto;align-items:center}
@media(max-width:560px){.tcAdd{grid-template-columns:1fr 1fr}}
.glRail{position:sticky;top:clamp(56px,7vw,64px);z-index:55;background:rgba(11,17,32,.92);backdrop-filter:blur(10px);border-bottom:1px solid #1e2d44}
.glTabs{display:flex;gap:4px;overflow-x:auto;scrollbar-width:none;padding:9px 0}
.glTabs::-webkit-scrollbar{display:none}
.glTab{flex:none;border:1px solid transparent;background:transparent;color:#7a8ba3;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.09em;text-transform:uppercase;padding:8px 12px;border-radius:4px;cursor:pointer;transition:color .2s ease,background .2s ease,border-color .2s ease;white-space:nowrap}
.glTab:hover{color:#e8ecf1;background:#101828}
.glTab.on{color:#2ec4a8;background:#101828;border-color:#1e2d44}
.glTc{color:#7a8ba3;margin-left:5px}
.glTab.on .glTc{color:#c7a26b}
.glHero{position:relative;overflow:hidden;border-bottom:1px solid #1e2d44;padding:clamp(46px,7vw,82px) 0 clamp(38px,6vw,66px)}
.glHero:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 48%,rgba(46,196,168,.065),transparent 34%);pointer-events:none}
.glHeroGrid{position:relative;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(320px,.9fr);gap:clamp(28px,4.5vw,58px);align-items:center}
.glEyebrow{display:flex;align-items:center;gap:12px;margin-bottom:19px;font-family:'JetBrains Mono',monospace;font-size:10px;line-height:1.3;letter-spacing:.18em;text-transform:uppercase;color:#c7a26b}
.glEyebrow:before{content:"";width:42px;height:1px;background:#c7a26b;flex:none}
.glH1{font-size:clamp(36px,5.8vw,66px);line-height:1.01;letter-spacing:-.035em;font-weight:700;max-width:820px;margin-bottom:26px;color:#e8ecf1}
.glH1 span{color:#2ec4a8}
.glHeroCopy{font-size:clamp(15px,1.7vw,18px);line-height:1.72;color:#7a8ba3;max-width:690px}
.glProof{display:flex;flex-wrap:wrap;gap:10px 24px;margin-top:30px;color:#7a8ba3;font-size:13px}
.glProof span{display:flex;align-items:center;gap:8px}
.glProof i{display:block;width:5px;height:5px;background:#2ec4a8;border-radius:50%;flex:none}
.glNetWrap{position:relative;min-height:320px;display:grid;place-items:center;color:#c7a26b}
.glNetLabel{position:absolute;right:5%;bottom:5%;background:rgba(16,24,40,.84);border:1px solid #1e2d44;border-radius:4px;padding:16px 18px;min-width:196px}
.glNetLabel strong{display:block;color:#2ec4a8;font-family:'JetBrains Mono',monospace;font-size:28px;line-height:1;margin-bottom:8px;font-weight:600}
.glNetLabel span{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:#7a8ba3}
.glBody2{padding:clamp(38px,5vw,54px) 0 clamp(64px,8vw,96px)}
.glHead{display:flex;align-items:flex-end;justify-content:space-between;gap:28px;margin-bottom:32px;flex-wrap:wrap}
.glHead h2{margin-top:8px;font-size:clamp(28px,4vw,42px);letter-spacing:-.025em;line-height:1.05;font-weight:700;color:#e8ecf1}
.glHead p{color:#7a8ba3;max-width:560px;font-size:15px;margin-top:8px}
.glTools2{display:flex;gap:10px;align-items:center;min-width:min(100%,390px)}
.glSearch{position:relative;flex:1}
.glSearch input{width:100%;background:#101828;border:1px solid #1e2d44;border-radius:4px;color:#e8ecf1;font-family:'Outfit',sans-serif;font-size:14px;padding:12px 42px 12px 14px;outline:none;transition:border-color .2s ease}
.glSearch input:focus{border-color:#2ec4a8}
.glSearch svg{position:absolute;right:13px;top:50%;transform:translateY(-50%);color:#7a8ba3;width:17px;height:17px}
.glIdxGrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:24px}
.glIdxCard{background:#101828;border:1px solid #1e2d44;border-radius:6px;padding:26px;transition:border-color .2s ease,transform .2s ease}
.glIdxCard:hover{border-color:rgba(46,196,168,.6);transform:translateY(-2px)}
.glIdxHead{display:flex;justify-content:space-between;gap:18px;align-items:flex-start;padding-bottom:15px;margin-bottom:9px;border-bottom:1px solid #1e2d44}
.glIdxHead h3{font-size:17px;font-weight:600;color:#e8ecf1}
.glIdxHead p{color:#7a8ba3;font-size:13px;line-height:1.5;margin-top:6px}
.glCount{font-family:'JetBrains Mono',monospace;font-size:10px;color:#2ec4a8;border:1px solid #1e2d44;border-radius:3px;padding:4px 7px;white-space:nowrap}
.glIdxList{list-style:none;display:block}
.glIdxList li{border-bottom:1px solid rgba(30,45,68,.52)}
.glIdxList li:last-child{border-bottom:0}
.glIdxLink{display:flex;align-items:baseline;gap:13px;width:100%;padding:9px 2px;background:none;border:0;text-align:left;cursor:pointer;color:#7a8ba3;font-family:'Outfit',sans-serif;font-size:14px;transition:color .18s ease,padding-left .18s ease}
.glIdxLink:hover{color:#2ec4a8;padding-left:7px}
.glIdxNum{font-family:'JetBrains Mono',monospace;font-size:10px;color:#7a8ba3;min-width:24px;flex:none}
.glNone{background:#101828;border:1px solid #1e2d44;padding:32px;border-radius:6px;color:#7a8ba3}
.glCatHero{border-bottom:1px solid #1e2d44;padding:clamp(38px,5vw,52px) 0 clamp(28px,4vw,38px);background:#0d1424}
.glCatIn{display:grid;grid-template-columns:1fr auto;gap:30px;align-items:end}
.glCatH1{margin:9px 0 13px;font-size:clamp(32px,5vw,58px);line-height:1.02;letter-spacing:-.03em;font-weight:700;max-width:850px;color:#e8ecf1}
.glCatDesc{color:#7a8ba3;max-width:680px}
.glStat{font-family:'JetBrains Mono',monospace;font-size:clamp(38px,5.5vw,54px);line-height:1;color:#2ec4a8;text-align:right;font-weight:600}
.glStat span{display:block;color:#7a8ba3;font-size:9px;letter-spacing:.14em;text-transform:uppercase;margin-top:7px;font-weight:400}
.glCard{display:grid;grid-template-columns:minmax(0,1.04fr) minmax(340px,.96fr);background:#101828;border:1px solid #1e2d44;border-radius:6px;overflow:hidden;margin-bottom:28px;scroll-margin-top:132px;transition:border-color .18s ease,transform .18s ease}
.glCard:hover{border-color:rgba(46,196,168,.45);transform:translateY(-2px)}
.glFig{position:relative;background:#0d1424;border-right:1px solid #1e2d44;padding:20px;display:flex;align-items:center;justify-content:center;min-height:430px}
.glSpread{display:block;width:100%;height:auto;border:1px solid rgba(122,139,163,.2);border-radius:3px;transition:transform .18s ease}
.glCard:hover .glSpread{transform:scale(1.01)}
.glFigAct{position:absolute;left:32px;right:32px;bottom:32px;display:flex;justify-content:space-between;gap:10px;opacity:0;transform:translateY(6px);transition:opacity .2s ease,transform .2s ease}
.glFig:hover .glFigAct,.glFig:focus-within .glFigAct{opacity:1;transform:none}
.glBtn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:1px solid #1e2d44;border-radius:4px;background:rgba(11,17,32,.93);color:#e8ecf1;padding:9px 12px;font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;transition:border-color .2s ease,color .2s ease}
.glBtn:hover{border-color:#2ec4a8;color:#2ec4a8}
.glBtn.gh2{background:transparent;color:#7a8ba3}
.glBody{padding:34px 36px;display:flex;flex-direction:column}
.glMeta{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-bottom:15px}
.glNum{font-family:'JetBrains Mono',monospace;font-size:12px;color:#2ec4a8}
.glCatLbl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:#c7a26b;border:1px solid #1e2d44;border-radius:3px;padding:3px 7px}
.glTitle{margin-bottom:7px;font-size:clamp(25px,3vw,38px);line-height:1.06;letter-spacing:-.025em;font-weight:700;color:#e8ecf1}
.glAuthor{color:#7a8ba3;font-size:14px;margin-bottom:25px}
.glBlock{margin-bottom:21px}
.glLbl{font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:#c7a26b;margin-bottom:7px}
.glWhat{font-size:clamp(14.5px,1.6vw,16px);line-height:1.7;color:#e8ecf1}
.glQuick{font-size:15px;line-height:1.6;color:#7a8ba3;border-left:2px solid #2ec4a8;padding-left:14px}
.glFlow{display:flex;flex-wrap:wrap;align-items:center;gap:8px;margin-top:auto;padding-top:20px;border-top:1px solid #1e2d44}
.glChip{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:600;color:#0b1120;background:#2ec4a8;padding:7px 10px;border-radius:4px}
.glChip:nth-child(even){color:#e8ecf1;background:#161f30;border:1px solid #1e2d44}
.glTools{display:flex;gap:9px;flex-wrap:wrap;margin-top:20px}
.glBand{margin-top:54px;border:1px solid #1e2d44;border-radius:6px;padding:24px;background:#0d1424;display:grid;grid-template-columns:auto 1fr;gap:18px;align-items:start}
.glBadge{width:36px;height:36px;border:1px solid #c7a26b;color:#c7a26b;font-family:'JetBrains Mono',monospace;font-size:12px;border-radius:4px;display:grid;place-items:center;flex:none}
.glBand h3{font-size:15px;margin-bottom:5px;font-weight:600;color:#e8ecf1}
.glBand p{color:#7a8ba3;font-size:13px;line-height:1.6;max-width:900px}
.glTop{position:fixed;right:24px;bottom:24px;width:44px;height:44px;border-radius:5px;border:1px solid #1e2d44;background:#161f30;color:#2ec4a8;display:grid;place-items:center;cursor:pointer;opacity:0;visibility:hidden;transform:translateY(8px);transition:opacity .2s ease,transform .2s ease,visibility .2s ease,border-color .2s ease;z-index:80}
.glTop.show{opacity:1;visibility:visible;transform:none}
.glTop:hover{border-color:#2ec4a8}
.glLb{position:fixed;inset:0;background:rgba(5,9,17,.96);z-index:250;display:grid;grid-template-rows:auto 1fr;overflow:auto}
.glLbBar{position:sticky;top:0;z-index:2;display:flex;justify-content:space-between;align-items:center;gap:18px;padding:16px 22px;background:rgba(11,17,32,.94);border-bottom:1px solid #1e2d44}
.glLbTitle{font-size:14px;font-weight:600;color:#e8ecf1}
.glLbTitle small{display:block;margin-top:2px;color:#7a8ba3;font-weight:400;font-size:11px}
.glLbCtl{display:flex;gap:8px;align-items:center}
.glIcon{width:38px;height:38px;border:1px solid #1e2d44;border-radius:4px;background:#101828;color:#e8ecf1;display:grid;place-items:center;cursor:pointer;font-size:15px}
.glIcon:hover{border-color:#2ec4a8;color:#2ec4a8}
.glLbStage{padding:26px;display:grid;place-items:start center;gap:22px}
.glLbStage .glSpread{width:min(95vw,1360px)}
.glLbCopy{width:min(95vw,1360px);display:grid;gap:16px;padding-bottom:40px}
@media(max-width:980px){.glHeroGrid{grid-template-columns:1fr}.glIdxGrid{grid-template-columns:1fr}.glCard{grid-template-columns:1fr}.glFig{border-right:0;border-bottom:1px solid #1e2d44}.glCatIn{grid-template-columns:1fr}.glStat{text-align:left}}
@media(max-width:760px){.glNetWrap{min-height:220px}.glHead{flex-direction:column;align-items:stretch}.glTools2{min-width:0;width:100%}.glIdxCard{padding:20px}.glBody{padding:27px 23px}.glFig{padding:12px;min-height:0}.glFigAct{position:static;opacity:1;transform:none;padding-top:12px}.glBand{grid-template-columns:1fr}.glLbStage{padding:12px}.glTop{right:14px;bottom:14px}}
@media(prefers-reduced-motion:reduce){.glCard:hover,.glIdxCard:hover{transform:none}.glCard:hover .glSpread{transform:none}}
`;

// ─────────────────────────────────────────────────────────────────
//  ATOMS & SHARED
// ─────────────────────────────────────────────────────────────────

function Head({ kick, title, sub, center, kickTeal }) {
  return (
    <div className="rv" style={{ marginBottom: "clamp(26px,4vw,44px)", textAlign: center ? "center" : "left" }}>
      <div className={`kick${kickTeal ? " teal" : ""}`} style={{ marginBottom: 12 }}>{kick}</div>
      <h2 className="h2">{title}</h2>
      {sub && <p className="sub" style={{ marginTop: 12, marginLeft: center ? "auto" : 0, marginRight: center ? "auto" : 0 }}>{sub}</p>}
    </div>
  );
}

function Wordmark({ size = 21 }) {
  return (
    <span style={{ fontWeight: 700, fontSize: size, letterSpacing: ".22em", color: "#cfd6df" }}>
      AY<span style={{ color: "#2ec4a8" }}>V</span>EDE
    </span>
  );
}

function NetDecor() {
  const pts = [[60,80],[180,40],[300,92],[430,52],[520,142],[468,252],[350,212],[240,272],[120,222],[84,342],[222,382],[382,342],[502,402],[302,442],[152,452]];
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,2],[6,7],[7,8],[8,0],[8,9],[9,10],[10,11],[11,5],[11,12],[10,13],[13,14],[14,9],[7,10],[6,11],[1,8]];
  return (
    <svg className="heroDecor" viewBox="0 0 600 500" aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="rgba(199,162,107,.3)" strokeWidth="1" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 3.5 : 2.2} fill={i % 7 === 0 ? "#2ec4a8" : "#c7a26b"} opacity={i % 7 === 0 ? ".8" : ".65"} />
      ))}
    </svg>
  );
}

function LayerDecor() {
  return (
    <svg className="heroDecor" viewBox="0 0 600 500" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${160 + i * 26},${330 - i * 74})`}>
          <polygon points="0,40 150,0 300,40 150,80" fill={i === 3 ? "rgba(46,196,168,.14)" : "rgba(22,31,48,.9)"} stroke={i === 3 ? "rgba(46,196,168,.6)" : "rgba(199,162,107,.35)"} strokeWidth="1" />
        </g>
      ))}
    </svg>
  );
}

function Hero({ kick, title, sub, chips, actions, decor = "net", kickTeal }) {
  return (
    <section className="hero">
      <div className="glow" />
      {decor === "net" && <NetDecor />}
      {decor === "layers" && <LayerDecor />}
      <div className="wrap" style={{ position: "relative" }}>
        <div style={{ maxWidth: 720 }}>
          <div className={`kick${kickTeal ? " teal" : ""} rv`} style={{ marginBottom: 16 }}>{kick}</div>
          <h1 className="h1 rv">{title}</h1>
          {sub && <p className="sub rv" style={{ marginTop: 18 }}>{sub}</p>}
          {chips && (
            <div className="rv" style={{ marginTop: 22 }}>
              <hr className="goldRule" style={{ width: 56, marginBottom: 14, marginLeft: 0 }} />
              <div className="chips">
                {chips.map((c) => <span key={c} className="mono" style={{ fontSize: 10.5, letterSpacing: ".1em", color: "#c7a26b" }}>{c}</span>).reduce((acc, el, i) => acc.length ? [...acc, <span key={`s${i}`} className="mono" style={{ fontSize: 10.5, color: "#4a5568" }} aria-hidden="true">·</span>, el] : [el], [])}
              </div>
            </div>
          )}
          {actions && <div className="rv" style={{ marginTop: 30, display: "flex", flexWrap: "wrap", gap: 12 }}>{actions}</div>}
        </div>
      </div>
    </section>
  );
}

function Nav({ page, go }) {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(null);
  useEffect(() => { setOpen(false); setDrop(null); }, [page]);
  useEffect(() => {
    if (!drop) return;
    const close = (e) => { if (!e.target.closest || !e.target.closest(".navGroup")) setDrop(null); };
    const esc = (e) => { if (e.key === "Escape") setDrop(null); };
    document.addEventListener("click", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", esc); };
  }, [drop]);
  return (
    <>
      <nav className="nav">
        <div className="wrap navIn">
          <button className="brand" onClick={() => go("home")} aria-label="Ayvede home">
            AY<span className="v">V</span>EDE
          </button>
          <div className="navLinks">
            {NAV.map((n) =>
              n.children ? (
                <div
                  key={n.id}
                  className="navGroup"
                  onMouseEnter={() => setDrop(n.id)}
                  onMouseLeave={() => setDrop((d) => (d === n.id ? null : d))}
                >
                  <button
                    className={`navLink${n.children.some((c) => c.id === page) ? " on" : ""}`}
                    aria-haspopup="true"
                    aria-expanded={drop === n.id}
                    onClick={() => setDrop(n.id)}
                  >
                    {n.label} <ChevronDown size={11} style={{ verticalAlign: "-1px", transition: "transform .15s ease", transform: drop === n.id ? "rotate(180deg)" : "none" }} />
                  </button>
                  {drop === n.id && (
                    <div className="navDrop">
                      {n.children.map((c) => (
                        <button key={c.id} className={`navLink${page === c.id ? " on" : ""}`} onClick={() => go(c.id)}>{c.label}</button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button key={n.id} className={`navLink${page === n.id ? " on" : ""}`} onClick={() => go(n.id)}>{n.label}</button>
              )
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button className="btn primary navCta" style={{ padding: "9px 16px" }} onClick={() => go("connect")}>Connect</button>
            <button className="burger" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X size={17} /> : <Menu size={17} />}</button>
          </div>
        </div>
      </nav>
      {open && (
        <div className="mmenu">
          {NAV.map((n) =>
            n.children ? (
              <div key={n.id}>
                <div className="mGroupLbl">{n.label}</div>
                {n.children.map((c) => (
                  <button key={c.id} className={`navLink sub${page === c.id ? " on" : ""}`} onClick={() => go(c.id)}>{c.label}</button>
                ))}
              </div>
            ) : (
              <button key={n.id} className={`navLink${page === n.id ? " on" : ""}`} onClick={() => go(n.id)}>{n.label}</button>
            )
          )}
          <button className={`navLink${page === "connect" ? " on" : ""}`} onClick={() => go("connect")}>Connect</button>
        </div>
      )}
    </>
  );
}

function CtaBand({ kick, title, sub, label, target, go }) {
  return (
    <section className="band sec tight">
      <div className="wrap" style={{ textAlign: "center" }}>
        <div className="kick rv" style={{ marginBottom: 12 }}>{kick}</div>
        <h2 className="h2 rv" style={{ maxWidth: 640, margin: "0 auto" }}>{title}</h2>
        {sub && <p className="sub rv" style={{ margin: "12px auto 0" }}>{sub}</p>}
        <div className="rv" style={{ marginTop: 26 }}>
          <button className="btn primary" onClick={() => go(target)}>{label} <ArrowRight size={15} /></button>
        </div>
      </div>
    </section>
  );
}

function SubscribeBand() {
  const [email, setEmail] = useState("");
  const [st, setSt] = useState("idle");
  const sub = async () => {
    if (!EMAIL_OK(email)) { setSt("invalid"); return; }
    setSt("sending");
    try {
      await formspreePost(FORMSPREE_SUBSCRIBE, {
        email: email.trim(),
        form: "subscribe",
        _subject: "Subscribe - The Ayvede Briefing",
      });
      setSt("ok");
    } catch {
      setSt("err");
    }
  };
  return (
    <section className="band sec tight">
      <div className="wrap" style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", alignItems: "center" }}>
        <div className="rv">
          <div className="kick" style={{ marginBottom: 10 }}>The Ayvede Briefing</div>
          <h3 className="h3" style={{ marginBottom: 8 }}>Governance-grade AI intelligence for decision-makers.</h3>
          <p className="small">Twice a month. Zero noise. Unsubscribe anytime.</p>
        </div>
        {st === "ok" ? (
          <div className="rv"><FormNote kind="ok">You&#39;re on the list. The next briefing lands in your inbox.</FormNote></div>
        ) : (
          <div className="rv" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <input
              className="input"
              style={{ flex: "1 1 220px" }}
              type="email"
              placeholder="Work email"
              value={email}
              disabled={st === "sending"}
              onChange={(e) => { setEmail(e.target.value); if (st === "invalid" || st === "err") setSt("idle"); }}
              aria-label="Work email"
            />
            <button className="btn primary" disabled={st === "sending"} style={st === "sending" ? { opacity: .6, cursor: "default" } : undefined} onClick={sub}>
              {st === "sending" ? "Subscribing..." : "Subscribe"}
            </button>
            {st === "invalid" && <FormNote kind="err">Enter a valid email address.</FormNote>}
            {st === "err" && (
              <FormNote kind="err">
                That did not go through. Try again, or email <a href={`mailto:${EMAIL}`} style={{ color: "#ef4444", fontWeight: 600 }}>{EMAIL}</a> and say subscribe.
              </FormNote>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Footer({ go }) {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="footGrid">
          <div>
            <Wordmark size={24} />
            <p className="gold" style={{ fontSize: 13, fontWeight: 600, margin: "10px 0 6px" }}>Advise. Vet. Deliver.</p>
            <p className="small dim" style={{ maxWidth: 260 }}>AI transformation built for high-trust professional environments.</p>
            <p className="mono dim" style={{ fontSize: 10.5, letterSpacing: ".12em", marginTop: 14 }}>AYVEDE.COM</p>
          </div>
          <div>
            <p className="lbl" style={{ marginBottom: 12 }}>Navigate</p>
            {[...NAV_ALL, { id: "connect", label: "Connect" }].map((n) => (
              <button key={n.id} className="fLink" onClick={() => go(n.id)}>{n.label}</button>
            ))}
          </div>
          <div>
            <p className="lbl" style={{ marginBottom: 12 }}>Contact</p>
            <a className="fLink" href={`mailto:${EMAIL}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}><Mail size={13} color="#2ec4a8" /> {EMAIL}</a>
            <a className="fLink" href={`tel:${PHONE_TEL}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}><Phone size={13} color="#2ec4a8" /> {PHONE}</a>
            <span className="fLink" style={{ display: "flex", alignItems: "center", gap: 8, cursor: "default" }}><MapPin size={13} color="#2ec4a8" /> Philadelphia, PA</span>
          </div>
        </div>
        <hr className="rule" style={{ margin: "clamp(26px,4vw,40px) 0 18px" }} />
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <p className="small dim">© 2026 Ayvede. All rights reserved.</p>
          <p className="mono tealTx" style={{ fontSize: 10.5, letterSpacing: ".14em" }}>SECURITY-FIRST ADVISORY</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────
//  PAGES
// ─────────────────────────────────────────────────────────────────

function HomePage({ go }) {
  return (
    <div>
      <Hero
        kick="Advise · Vet · Deliver"
        title={<>The AI Source of Truth for <span className="gold">High-Trust</span> Firms.</>}
        sub="Advisory, education, platform, and applied innovation. One accountable partner for adopting AI with governance, security, and measurable ROI."
        chips={["Confidentiality-first", "Governed at every step", "Strategy + execution"]}
        actions={
          <>
            <button className="btn primary" onClick={() => go("connect")}>Book a Confidential Briefing <ArrowRight size={15} /></button>
            <button className="btn ghost" onClick={() => go("platform")}>Explore the Platform</button>
          </>
        }
      />

      <div className="kpi">
        <div className="wrap kpiIn">
          {KPIS.map((k) => (
            <div key={k.l} className="kpiItem">
              <span className="kpiNum">{k.n}</span>
              <span className="kpiLbl">{k.l}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <Head
            kick="The Problem"
            title={<>AI Is Powerful. Ungoverned AI Is a <span style={{ color: "#ef4444" }}>Liability.</span></>}
            sub="Unstructured adoption creates compliance exposure, data leakage, reputational risk, and internal chaos. Most firms are already using AI, without policy, without vetting, without visibility."
          />
          <div className="grid g3">
            {RISKS.map((r) => (
              <div key={r.t} className="card rv" style={{ borderTop: "2px solid rgba(239,68,68,.45)" }}>
                <h3 className="h3" style={{ marginBottom: 8 }}>{r.t}</h3>
                <p className="body">{r.d}</p>
              </div>
            ))}
          </div>
          <div className="card rv gh" style={{ marginTop: "clamp(16px,2.4vw,24px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, borderLeft: "2px solid rgba(46,196,168,.5)" }}>
            <div style={{ maxWidth: 560 }}>
              <div className="kick teal" style={{ marginBottom: 8 }}>Free Diagnostic · New</div>
              <h3 className="h3" style={{ marginBottom: 6 }}>How big is your ungoverned surface area?</h3>
              <p className="body">Pick the AI and SaaS tools your firm pays for, set seats, and see the number. Two minutes, real list prices, nothing leaves your browser.</p>
            </div>
            <button className="btn line" onClick={() => go("tools")}>Run the Spend Diagnostic <ArrowRight size={14} /></button>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#0d1424", borderTop: "1px solid #1e2d44", borderBottom: "1px solid #1e2d44" }}>
        <div className="wrap">
          <Head
            kick="The Ayvede Model"
            title="One partner. Four disciplines."
            sub="Most consultancies advise. Some train. A few build. Ayvede is architected to do all four under one standard of governance, so nothing gets lost between the strategy deck and the deployed system."
          />
          <div className="grid g4">
            {CAPABILITIES.map((c) => {
              const Ic = c.icon;
              return (
                <div key={c.t} className="card rv" style={{ display: "flex", flexDirection: "column" }}>
                  <Ic size={19} color="#2ec4a8" style={{ marginBottom: 14 }} />
                  <h3 className="h3" style={{ marginBottom: 8 }}>{c.t}</h3>
                  <p className="body" style={{ flex: 1 }}>{c.d}</p>
                  <button className="btn line" style={{ marginTop: 16, padding: "8px 12px", alignSelf: "flex-start" }} onClick={() => go(c.page)}>
                    {c.cta} <ArrowRight size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Head kick="Built for Confidential Work" title="A proven 4-step system." sub="Ayvede designs AI adoption frameworks for environments where trust, compliance, and reputation are critical." />
          <div className="grid g4">
            {STEPS.map((s) => (
              <div key={s.n} className="stepCell rv">
                <div className="stepN">{s.n}</div>
                <h3 className="h3" style={{ margin: "8px 0" }}>{s.t}</h3>
                <p className="body">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Head kick="Secure AI, Delivered Properly" title="What we implement." sub="Every service below is available as a standalone program or inside a retainer. Each one ships with named deliverables and a definition of done." />
          <div className="grid g3">
            {HOME_SERVICES.map((s) => (
              <div key={s.t} className="card rv">
                <h3 className="h3" style={{ marginBottom: 8 }}>{s.t}</h3>
                <p className="body">{s.d}</p>
              </div>
            ))}
          </div>
          <div className="rv" style={{ marginTop: 26 }}>
            <button className="btn ghost" onClick={() => go("solutions")}>See full solution details <ArrowRight size={14} /></button>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#0d1424", borderTop: "1px solid #1e2d44", borderBottom: "1px solid #1e2d44" }}>
        <div className="wrap">
          <Head kick="Why Ayvede" title="The standard behind the name." sub="Being the source of truth is earned. This is how Ayvede earns it on every engagement." />
          <div className="grid g4">
            {DIFFS.map((d) => (
              <div key={d.t} className="rv" style={{ borderLeft: "1px solid rgba(199,162,107,.4)", paddingLeft: 16 }}>
                <h3 className="h3" style={{ marginBottom: 8, fontSize: "clamp(15px,1.7vw,17px)" }}>{d.t}</h3>
                <p className="body">{d.d}</p>
              </div>
            ))}
          </div>
          <hr className="rule" style={{ margin: "clamp(28px,4vw,40px) 0 18px" }} />
          <div className="rv" style={{ display: "flex", flexWrap: "wrap", gap: "8px 18px", alignItems: "center" }}>
            <span className="lbl" style={{ margin: 0 }}>Built for</span>
            {AUDIENCES.map((a) => (
              <span key={a} className="small" style={{ color: "#a8b4c6" }}>{a}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Head kick="Structured Programs" title="Eight defined programs. One place to start." sub="From a two-hour confidential briefing to a standing retainer, every program has a fixed shape, a fixed scope, and a clear outcome." />
          <div className="chips rv">
            {PROGRAMS.map((p) => (
              <button key={p.t} className="tag g" style={{ cursor: "pointer", padding: "8px 12px", fontSize: 10.5 }} onClick={() => go("programs")}>
                {p.t}{p.isNew && <span className="tealTx" style={{ fontSize: 8.5 }}>● NEW</span>}
              </button>
            ))}
          </div>
        </div>
      </section>

      <SubscribeBand />

      <CtaBand
        kick="Start With Clarity. Not Chaos."
        title="Ready to deploy AI the right way?"
        sub="One conversation. Confidential by default. A written recommendation within days."
        label="Start the AI Conversation"
        target="connect"
        go={go}
      />
    </div>
  );
}

function VisionPage({ go }) {
  return (
    <div>
      <Hero
        kick="Vision"
        title="AI Requires Discipline."
        sub="Ayvede exists to bring structure, verification, and accountable governance to AI adoption in high-trust environments."
        chips={["Structured thinking", "Verified systems", "Responsible deployment"]}
        actions={<button className="btn primary" onClick={() => go("connect")}>Align Your AI Vision <ArrowRight size={15} /></button>}
      />

      <section className="sec" style={{ paddingTop: "clamp(30px,4vw,50px)" }}>
        <div className="wrap">
          <Head kick="Why Ayvede Exists" title="AI without governance creates exposure." sub="We bring structure and accountability to AI transformation in environments where trust, compliance, and reputation are critical. The goal is not to slow firms down. It is to make sure what they build survives contact with regulators, clients, and reality." />
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Head kick="Philosophy" title="Advise. Vet. Deliver." />
          <div className="grid g3">
            {PHILOSOPHY.map((p, i) => (
              <div key={p.t} className="rv" style={{ borderTop: "1px solid rgba(199,162,107,.4)", paddingTop: 18 }}>
                <div className="stepN" style={{ marginBottom: 8 }}>{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h3 gold" style={{ marginBottom: 8, textTransform: "uppercase", letterSpacing: ".08em", fontSize: "clamp(14px,1.6vw,16px)" }}>{p.t}</h3>
                <p className="body">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#0d1424", borderTop: "1px solid #1e2d44", borderBottom: "1px solid #1e2d44" }}>
        <div className="wrap">
          <Head kick="Operating Principles" title="The rules we do not break." />
          <div className="grid g2">
            {PRINCIPLES.map((p) => (
              <div key={p.t} className="card rv gh">
                <h3 className="h3" style={{ marginBottom: 8 }}>{p.t}</h3>
                <p className="body">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap" style={{ display: "grid", gap: "clamp(24px,4vw,48px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))" }}>
          <div className="rv">
            <div className="kick" style={{ marginBottom: 12 }}>Long-Term View</div>
            <h2 className="h2" style={{ marginBottom: 14 }}>Sustainable systems, not trends.</h2>
            <p className="body" style={{ maxWidth: 520 }}>
              We build AI capability designed to compound. The methodology creates a permanent sightline for executives to monitor risk and ROI as the technology evolves, so the firm is never starting over when the next model generation arrives.
            </p>
          </div>
          <div className="card rv gh" style={{ borderLeft: "2px solid rgba(199,162,107,.5)" }}>
            <div className="kick" style={{ marginBottom: 12 }}>Founder & Principal</div>
            <h3 className="h3" style={{ marginBottom: 10 }}>Anthony Dellapia</h3>
            <p className="body" style={{ marginBottom: 14 }}>
              Solution architect and AI practitioner based in Philadelphia. Anthony leads enterprise data and AI initiatives across financial and professional services, and founded Ayvede to close the gap between AI ambition and governed execution. Every Ayvede engagement carries a single point of accountability: him.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a className="btn line" style={{ padding: "8px 12px" }} href={`mailto:${EMAIL}`}><Mail size={13} /> Email Anthony</a>
              <button className="btn ghost" style={{ padding: "8px 12px" }} onClick={() => go("connect")}>Book time</button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        kick="The Standard"
        title="Vendor-neutral. Lab-tested. Documented. Accountable."
        sub="If that is the kind of AI partner your firm has been looking for, the conversation starts here."
        label="Start the Conversation"
        target="connect"
        go={go}
      />
    </div>
  );
}

function SolutionsPage({ go }) {
  return (
    <div>
      <Hero
        kick="Solutions"
        title="Structured AI Implementation."
        sub="From readiness assessment to governed deployment and ongoing operations, we implement AI systems designed for compliance, control, and measurable performance."
        chips={["Risk assessed", "Governance designed", "Execution delivered", "Operations maintained"]}
        actions={<button className="btn primary" onClick={() => go("connect")}>Design Your AI Governance Plan <ArrowRight size={15} /></button>}
      />

      <section className="sec" style={{ paddingTop: "clamp(20px,3vw,36px)" }}>
        <div className="wrap">
          <hr className="goldRule" />
          {SERVICES.map((s, i) => (
            <div key={s.t} className="svcRow rv">
              <div>
                <div className="stepN" style={{ marginBottom: 10 }}>{String(i + 1).padStart(2, "0")}</div>
                <h2 className="h2 gold" style={{ fontSize: "clamp(21px,3vw,30px)" }}>{s.t}</h2>
              </div>
              <div>
                <p className="body" style={{ fontSize: "clamp(13.5px,1.5vw,15px)", marginBottom: 18 }}>{s.d}</p>
                <div className="lbl" style={{ marginBottom: 12 }}>Phase Deliverables</div>
                <ul className="list">
                  {s.del.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec" style={{ background: "#0d1424", borderTop: "1px solid #1e2d44", borderBottom: "1px solid #1e2d44" }}>
        <div className="wrap">
          <Head kick="Engagement Model" title="Three ways to work with Ayvede." sub="Every relationship starts with the Diagnostic. Where it goes from there is up to you." />
          <div className="grid g3">
            {TIERS.map((t, i) => (
              <div key={t.t} className="card rv" style={{ borderTop: `2px solid ${i === 2 ? "#c7a26b" : "#2ec4a8"}`, display: "flex", flexDirection: "column" }}>
                <h3 className="h3" style={{ marginBottom: 4 }}>{t.t}</h3>
                <div className="mono" style={{ fontSize: 10.5, letterSpacing: ".12em", color: "#7a8ba3", marginBottom: 14 }}>{t.meta}</div>
                <p className="body" style={{ flex: 1 }}>{t.d}</p>
                <p className="small" style={{ marginTop: 14, color: i === 2 ? "#c7a26b" : "#2ec4a8" }}>{t.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kick="Strategy to Execution"
        title="Governed at every step."
        sub="Tell us where you are. We will tell you, in writing, exactly what to do next."
        label="Let's Vet Your AI Strategy"
        target="connect"
        go={go}
      />
    </div>
  );
}

function ProgramsPage({ go }) {
  return (
    <div>
      <Hero
        kick="Programs"
        title="Structured AI Programs."
        sub="Defined frameworks and education built for high-trust organizations. Engineered for clarity, control, and measurable outcomes."
        chips={["Framework-driven", "Outcome-focused", "Executive-aligned"]}
        actions={<button className="btn primary" onClick={() => go("connect")}>Launch Your AI Initiative <ArrowRight size={15} /></button>}
      />

      <section className="sec" style={{ paddingTop: "clamp(20px,3vw,36px)" }}>
        <div className="wrap">
          <div className="grid g2">
            {PROGRAMS.map((p) => (
              <div key={p.t} className="card rv" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <h3 className="h3" style={{ fontSize: "clamp(19px,2.4vw,24px)" }}>{p.t}</h3>
                  <div style={{ display: "flex", gap: 6 }}>
                    {p.isNew && <span className="tag t">New</span>}
                    <span className="tag g">{p.tag}</span>
                  </div>
                </div>
                <p className="gold" style={{ fontSize: "clamp(13px,1.4vw,14.5px)", lineHeight: 1.55, marginBottom: 14, opacity: .92 }}>{p.d}</p>
                <div className="mono dim" style={{ fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>{p.fmt}</div>
                <div className="lbl" style={{ marginBottom: 10 }}>Program Deliverables</div>
                <ul className="list" style={{ flex: 1 }}>
                  {p.del.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="card rv gh" style={{ marginTop: "clamp(20px,3vw,30px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, borderLeft: "2px solid rgba(199,162,107,.5)" }}>
            <div>
              <h3 className="h3" style={{ marginBottom: 6 }}>Not sure where to start?</h3>
              <p className="body">Start with the Executive AI Briefing or the Diagnostic. Both end with a written plan, whether or not you ever hire us again.</p>
            </div>
            <button className="btn primary" onClick={() => go("connect")}>Book the Briefing <ArrowRight size={15} /></button>
          </div>
        </div>
      </section>

      <CtaBand
        kick="Framework-Driven"
        title="Every program ends with capability you keep."
        sub="Policies, playbooks, trained people, and working systems. Not a deck."
        label="Launch Your AI Initiative"
        target="connect"
        go={go}
      />
    </div>
  );
}

function PlatformPage({ go }) {
  return (
    <div>
      <Hero
        kick="The Ayvede Platform"
        kickTeal
        title="One governed AI operating layer."
        sub="TrustStack, Sightline, and CounselGuard, unified. Governance, visibility, and confidential workflows deployed privately inside your firm's boundary."
        chips={["Private deployment", "Full audit trail", "Board-level visibility"]}
        decor="layers"
        actions={
          <>
            <button className="btn primary" onClick={() => go("connect")}>Request a Platform Walkthrough <ArrowRight size={15} /></button>
            <button className="btn ghost" onClick={() => go("programs")}>See the Programs Behind It</button>
          </>
        }
      />

      <section className="sec" style={{ paddingTop: "clamp(20px,3vw,36px)" }}>
        <div className="wrap">
          <Head kick="Modules" title="Four modules. One standard." sub="Each module exists as a standalone program. Together, they run as a single platform with one governance model and one audit trail." />
          <div className="grid g2">
            {MODULES.map((m) => (
              <div key={m.t} className="card rv">
                <div className="kick teal" style={{ marginBottom: 10 }}>{m.k}</div>
                <h3 className="h3" style={{ marginBottom: 8 }}>{m.t}</h3>
                <p className="body" style={{ marginBottom: 14 }}>{m.d}</p>
                <ul className="list">
                  {m.pts.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#0d1424", borderTop: "1px solid #1e2d44", borderBottom: "1px solid #1e2d44" }}>
        <div className="wrap">
          <Head kick="How It Runs" title="From your data to your board." />
          <div className="grid g4">
            {FLOW.map((f, i) => (
              <div key={f.n} className="rv" style={{ position: "relative" }}>
                <div className="card" style={{ height: "100%", borderTop: i === 3 ? "2px solid #c7a26b" : "2px solid #2ec4a8" }}>
                  <div className="stepN" style={{ marginBottom: 8 }}>{f.n}</div>
                  <h3 className="h3" style={{ marginBottom: 6, fontSize: "clamp(15px,1.7vw,17px)" }}>{f.t}</h3>
                  <p className="body">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid g4" style={{ marginTop: "clamp(22px,3vw,32px)" }}>
            {DEPLOY_FACTS.map((f) => (
              <div key={f.t} className="rv" style={{ borderLeft: "1px solid rgba(46,196,168,.4)", paddingLeft: 14 }}>
                <h3 className="h3" style={{ fontSize: "clamp(14px,1.6vw,15.5px)", marginBottom: 6 }}>{f.t}</h3>
                <p className="small">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kick="Platform + Advisory"
        title="Software alone is not governance."
        sub="The platform ships inside an Ayvede engagement, with policy, training, and a named human accountable for the outcome."
        label="Request a Walkthrough"
        target="connect"
        go={go}
      />
    </div>
  );
}

function LabPage({ go }) {
  const stageTag = (s) => (s === "Research" ? "tag" : s === "Vetting" ? "tag g" : "tag t");
  return (
    <div>
      <Hero
        kick="Innovation Lab"
        title="Disciplined Innovation."
        sub="We test, vet, and validate emerging AI capabilities before they enter high-trust operational environments."
        chips={["Experimented carefully", "Evaluated rigorously", "Deployed responsibly"]}
        actions={<button className="btn primary" onClick={() => go("connect")}>Explore an AI Pilot Together <ArrowRight size={15} /></button>}
      />

      <section className="sec tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="grid g4">
            {PIPELINE.map((p, i) => (
              <div key={p.t} className="stepCell rv" style={{ borderLeftColor: i === 3 ? "#2ec4a8" : "#1e2d44" }}>
                <div className="stepN">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="h3" style={{ margin: "6px 0", fontSize: "clamp(15px,1.7vw,17px)" }}>{p.t}</h3>
                <p className="small">{p.d}</p>
              </div>
            ))}
          </div>
          <p className="small rv" style={{ marginTop: 18, color: "#c7a26b" }}>
            Nothing reaches a client environment before it survives this pipeline.
          </p>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: "clamp(16px,2vw,28px)" }}>
        <div className="wrap">
          <div className="grid g2">
            {LAB.map((v) => (
              <div key={v.t} className="card rv">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                  <h3 className="h3" style={{ fontSize: "clamp(19px,2.4vw,24px)" }}>{v.t}</h3>
                  <span className={stageTag(v.stage)}>{v.stage}</span>
                </div>
                <p className="gold" style={{ fontSize: "clamp(13px,1.4vw,14.5px)", lineHeight: 1.55, marginBottom: 16, opacity: .92 }}>{v.d}</p>
                <div className="lbl" style={{ marginBottom: 10 }}>Program Deliverables</div>
                <ul className="list">
                  {v.del.map((d) => <li key={d}>{d}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        kick="Priority Access"
        title="Retainer clients see the Lab first."
        sub="Vetted capabilities flow to retainer clients on a quarterly cadence, before the market catches up."
        label="Explore a Pilot Together"
        target="connect"
        go={go}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  TOOLS · THE SPEND DIAGNOSTIC
//  All math runs client-side. Nothing the visitor enters is stored,
//  sent, or logged; the only exits are the two mailto buttons.
// ─────────────────────────────────────────────────────────────────

const usd = (n) => "$" + Math.round(n).toLocaleString("en-US");
const rate = (t) =>
  t.unit === "spend" ? "usage" : t.unit === "flat" ? `${usd(t.price)}/mo flat` : `$${t.price % 1 ? t.price.toFixed(2) : t.price}/seat/mo`;

function Stepper({ value, min = 1, max = 9999, step = 1, onChange, label }) {
  const clamp = (v) => Math.max(min, Math.min(max, v));
  return (
    <span className="step">
      <button onClick={() => onChange(clamp(value - step))} aria-label={`Fewer ${label}`}><Minus size={12} /></button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        aria-label={label}
        onChange={(e) => { const v = parseInt(e.target.value, 10); onChange(clamp(isNaN(v) ? min : v)); }}
      />
      <button onClick={() => onChange(clamp(value + step))} aria-label={`More ${label}`}><Plus size={12} /></button>
    </span>
  );
}

function ToolsPage({ go }) {
  const [sel, setSel] = useState({});
  const [custom, setCustom] = useState([]);
  const [cf, setCf] = useState({ name: "", price: "", seats: "" });
  const [tEmail, setTEmail] = useState("");
  const [tSt, setTSt] = useState("idle");
  const [results, setResults] = useState(null);

  const toggle = (t) => setSel((s) => {
    const n = { ...s };
    if (n[t.id] !== undefined) delete n[t.id];
    else n[t.id] = t.unit === "spend" ? 250 : t.unit === "flat" ? 1 : 5;
    return n;
  });
  const setVal = (id, v) => setSel((s) => ({ ...s, [id]: v }));

  const picked = TOOL_CATALOG.filter((t) => sel[t.id] !== undefined);
  const lineFor = (t) => (t.unit === "spend" ? sel[t.id] : t.unit === "flat" ? t.price : t.price * sel[t.id]);
  const monthly = picked.reduce((a, t) => a + lineFor(t), 0) + custom.reduce((a, c) => a + c.price * c.seats, 0);
  const seatMonthly = picked.filter((t) => t.unit === "seat").reduce((a, t) => a + t.price * sel[t.id], 0) + custom.reduce((a, c) => a + c.price * c.seats, 0);
  const annual = monthly * 12;
  const waste = seatMonthly * 12 * DIAG_BENCH.unusedShare;
  const seats = picked.filter((t) => t.unit === "seat").reduce((a, t) => a + sel[t.id], 0) + custom.reduce((a, c) => a + c.seats, 0);
  const nTools = picked.length + custom.length;

  const capMap = {};
  picked.forEach((t) => {
    (t.caps || []).forEach((c) => (capMap[c] = capMap[c] || []).push(t.name));
    Object.entries(t.incl || {}).forEach(([c, lbl]) => (capMap[c] = capMap[c] || []).push(`${t.name} (${lbl} included)`));
  });
  const flags = Object.entries(capMap)
    .filter(([, names]) => names.length > 1)
    .map(([cap, names]) => ({ cap, names }));

  const addCustom = () => {
    const price = parseFloat(cf.price), seatN = parseInt(cf.seats, 10);
    if (!cf.name.trim() || isNaN(price) || price <= 0 || isNaN(seatN) || seatN < 1) return;
    setCustom((c) => [...c, { id: `c${c.length}-${cf.name}`, name: cf.name.trim(), price, seats: seatN }]);
    setCf({ name: "", price: "", seats: "" });
  };

  const buildResults = () => ({
    lines: [
      ...picked.map((t) => t.unit === "spend"
        ? `- ${t.name}: ${usd(sel[t.id])}/mo (usage-based)`
        : t.unit === "flat"
          ? `- ${t.name}: ${usd(t.price)}/mo flat`
          : `- ${t.name}: ${sel[t.id]} seats x $${t.price % 1 ? t.price.toFixed(2) : t.price} = ${usd(t.price * sel[t.id])}/mo`),
      ...custom.map((c) => `- ${c.name}: ${c.seats} seats x $${c.price} = ${usd(c.price * c.seats)}/mo (self-reported)`),
    ],
    flagLines: flags.map((f) => `- ${f.names.length} tools cover ${CAP_LABELS[f.cap]}: ${f.names.join(", ")}`),
    monthly,
    annual,
    waste,
  });
  //  The on-page result is the deliverable; the email is the follow-up.
  //  Results render immediately on submit, whatever the network does.
  const sendResults = async () => {
    if (!EMAIL_OK(tEmail)) { setTSt("invalid"); return; }
    const r = buildResults();
    setResults(r);
    setTSt("sending");
    try {
      await formspreePost(FORMSPREE_TOOLS, {
        email: tEmail.trim(),
        form: "tools",
        _subject: `Spend Diagnostic - ${usd(r.annual)} per year`,
        monthly: usd(r.monthly),
        annual: usd(r.annual),
        strandedEstimate: `${usd(r.waste)}/yr at the 36% unused-license benchmark (Zylo 2026 SaaS Management Index)`,
        stack: r.lines.join("\n"),
        overlapFlags: r.flagLines.length ? r.flagLines.join("\n") : "none detected",
        pricingAsOf: PRICING_ASOF,
      });
      setTSt("ok");
    } catch {
      setTSt("err");
    }
  };

  const activeAnnual = Math.max(annual - waste, 0);
  const stageTag = (s) => (s === "Live" ? "tag t" : "tag g");

  return (
    <div>
      <Hero
        kick="Tools"
        kickTeal
        title="Your AI Stack Has a Number."
        sub="Working diagnostics from the Ayvede practice, free to use. Start with spend: select the tools your firm pays for, set seat counts, and watch the ungoverned total build live."
        chips={["No signup", "Real list prices", "Nothing leaves your browser"]}
      />

      <section className="sec" style={{ paddingTop: "clamp(16px,2vw,28px)" }}>
        <div className="wrap">
          <Head
            kick="Diagnostic 01 · The Spend Audit"
            kickTeal
            title="What does ungoverned look like in dollars?"
            sub={`Real list prices on the annual-billing basis, verified ${PRICING_ASOF}. Most firms cannot name this number. Naming it is step one of governing it.`}
          />
          <div className="tcGrid rv">
            <div>
              {TOOL_CATS.map((cat) => (
                <div key={cat}>
                  <div className="lbl tcCatLbl">{cat}</div>
                  <div className="tcList" style={{ marginBottom: 6 }}>
                    {TOOL_CATALOG.filter((t) => t.cat === cat).map((t) => {
                      const on = sel[t.id] !== undefined;
                      return (
                        <div key={t.id}>
                          <button className={`tcRow${on ? " on" : ""}`} onClick={() => toggle(t)} aria-pressed={on}>
                            <span className="tcMark" aria-hidden="true" />
                            <span className="tcName">
                              {t.name}
                              <span className="tcNote">{t.note}{t.uncertain ? " · rate unverified" : ""}</span>
                            </span>
                            <span className="tcPrice">{rate(t)}</span>
                          </button>
                          {on && (
                            <div className="tcCtl">
                              {t.unit === "seat" && (
                                <>
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                    <Stepper value={sel[t.id]} onChange={(v) => setVal(t.id, v)} label={`${t.name} seats`} />
                                    <span className="small dim">seats</span>
                                  </span>
                                  <span className="tcLineTotal">{usd(t.price * sel[t.id])}/mo</span>
                                </>
                              )}
                              {t.unit === "spend" && (
                                <>
                                  <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                                    <Stepper value={sel[t.id]} min={0} max={99999} step={50} onChange={(v) => setVal(t.id, v)} label={`${t.name} monthly spend`} />
                                    <span className="small dim">$ per month</span>
                                  </span>
                                  <span className="tcLineTotal">{usd(sel[t.id])}/mo</span>
                                </>
                              )}
                              {t.unit === "flat" && (
                                <>
                                  <span className="small dim">{t.note}</span>
                                  <span className="tcLineTotal">{usd(t.price)}/mo</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className="lbl tcCatLbl">Anything We Missed</div>
              {custom.length > 0 && (
                <div className="tcList" style={{ marginBottom: 8 }}>
                  {custom.map((c) => (
                    <div key={c.id} className="tcRow on" style={{ cursor: "default" }}>
                      <span className="tcMark" aria-hidden="true" />
                      <span className="tcName">{c.name}<span className="tcNote">self-reported rate</span></span>
                      <span className="tcPrice">{c.seats} x ${c.price}/mo</span>
                      <button
                        onClick={() => setCustom(custom.filter((x) => x.id !== c.id))}
                        aria-label={`Remove ${c.name}`}
                        style={{ background: "none", border: 0, color: "#7a8ba3", cursor: "pointer", display: "inline-flex", padding: 2 }}
                      ><X size={13} /></button>
                    </div>
                  ))}
                </div>
              )}
              <div className="tcAdd">
                <input className="input" placeholder="Tool name" value={cf.name} onChange={(e) => setCf({ ...cf, name: e.target.value })} aria-label="Custom tool name" />
                <input className="input" placeholder="$/seat/mo" type="number" min="0" value={cf.price} onChange={(e) => setCf({ ...cf, price: e.target.value })} aria-label="Custom tool price per seat per month" />
                <input className="input" placeholder="Seats" type="number" min="1" value={cf.seats} onChange={(e) => setCf({ ...cf, seats: e.target.value })} aria-label="Custom tool seats" />
                <button className="btn line" style={{ padding: "10px 14px" }} onClick={addCustom} aria-label="Add custom tool"><Plus size={14} /> Add</button>
              </div>
            </div>

            <div className="tcSticky">
              <div className="card" style={{ borderTop: "2px solid #2ec4a8" }}>
                <div className="kick teal" style={{ marginBottom: 14 }}>Your Surface Area</div>
                {nTools === 0 ? (
                  <>
                    <p className="body" style={{ marginBottom: 14 }}>
                      Select the tools your firm pays for. The total builds live, at real list prices.
                    </p>
                    <p className="small dim">
                      Most firms find their first honest count lands well above what they would have guessed. The average smaller company runs 152 SaaS applications (Zylo, 2025).
                    </p>
                  </>
                ) : (
                  <>
                    <div className="tcBigNum">{usd(monthly)}<span style={{ fontSize: "clamp(13px,1.5vw,16px)", color: "#7a8ba3", fontWeight: 500 }}> / month</span></div>
                    <div className="mono" style={{ fontSize: 13, color: "#e8ecf1", margin: "6px 0 2px" }}>{usd(annual)} per year</div>
                    <div className="mono dim" style={{ fontSize: 10.5, letterSpacing: ".12em" }}>{nTools} TOOLS · {seats} PAID SEATS</div>
                    {seatMonthly > 0 && (
                      <>
                        <hr className="rule" style={{ margin: "16px 0 12px" }} />
                        <div className="tcBar" aria-hidden="true">
                          <span className="a" style={{ width: `${(activeAnnual / (annual || 1)) * 100}%` }} />
                          <span className="w" style={{ width: `${(waste / (annual || 1)) * 100}%` }} />
                        </div>
                        <p className="small" style={{ marginTop: 10 }}>
                          <span className="tealTx">Working spend</span> vs <span style={{ color: "#ef4444" }}>stranded licenses</span>: at the industry benchmark, {usd(waste)} of this goes to seats nobody uses each year.
                        </p>
                        <p className="small dim" style={{ marginTop: 4 }}>{DIAG_BENCH.unusedLabel}. {DIAG_BENCH.unusedSource}.</p>
                      </>
                    )}
                    {flags.length > 0 && (
                      <>
                        <hr className="rule" style={{ margin: "14px 0 4px" }} />
                        <div className="lbl" style={{ margin: "10px 0 2px" }}>Overlap Flags</div>
                        {flags.map((f) => (
                          <div key={f.cap} className="tcFlag" style={{ borderTop: 0 }}>
                            <TriangleAlert size={14} color="#c7a26b" style={{ flex: "none", marginTop: 2 }} />
                            <span>{f.names.length} tools cover <strong style={{ color: "#e8ecf1", fontWeight: 600 }}>{CAP_LABELS[f.cap]}</strong>: {f.names.join(", ")}.</span>
                          </div>
                        ))}
                      </>
                    )}
                    <hr className="rule" style={{ margin: "16px 0" }} />
                    <p className="body" style={{ marginBottom: 14 }}>
                      This is your ungoverned AI and SaaS surface area: every tool here touches your data, your clients, or both. The Diagnostic turns this number into an inventory, a policy, and a plan.
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <button className="btn primary" style={{ width: "100%" }} onClick={() => go("connect", { interest: "AI & SaaS Spend Diagnostic" })}>
                        Book a Scoping Call <ArrowRight size={15} />
                      </button>
                      <div className="lbl" style={{ margin: "8px 0 0" }}>Get Your Results</div>
                      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        <input
                          className="input"
                          style={{ flex: "1 1 150px" }}
                          type="email"
                          placeholder="Work email"
                          value={tEmail}
                          disabled={tSt === "sending"}
                          onChange={(e) => { setTEmail(e.target.value); if (tSt === "invalid" || tSt === "err") setTSt("idle"); }}
                          aria-label="Work email for your results"
                        />
                        <button className="btn line" disabled={tSt === "sending"} style={tSt === "sending" ? { opacity: .6, cursor: "default" } : undefined} onClick={sendResults}>
                          <Mail size={14} /> {tSt === "sending" ? "Sending..." : "Send My Results"}
                        </button>
                      </div>
                      {tSt === "invalid" && <FormNote kind="err">Enter a valid email to get your copy.</FormNote>}
                      {tSt === "ok" && <FormNote kind="ok">Your results are below. A copy is on its way to your inbox.</FormNote>}
                      {tSt === "err" && (
                        <FormNote kind="err">
                          The email did not go through. Your results are below; the direct address is <a href={`mailto:${EMAIL}`} style={{ color: "#ef4444", fontWeight: 600 }}>{EMAIL}</a>.
                        </FormNote>
                      )}
                    </div>
                    {results && (
                      <div style={{ marginTop: 12, background: "#0d1424", border: "1px solid #1e2d44", borderRadius: 4, padding: "12px 14px" }}>
                        <div className="kick teal" style={{ marginBottom: 8 }}>Your Results</div>
                        {results.lines.map((l) => (
                          <p key={l} className="mono" style={{ fontSize: 11, color: "#a8b4c6", lineHeight: 1.7 }}>{l}</p>
                        ))}
                        <hr className="rule" style={{ margin: "10px 0" }} />
                        <p className="mono" style={{ fontSize: 11.5, color: "#c7a26b", lineHeight: 1.8 }}>Monthly: {usd(results.monthly)} · Annual: {usd(results.annual)}</p>
                        <p className="mono" style={{ fontSize: 11, color: "#ef4444", lineHeight: 1.7 }}>Stranded estimate: {usd(results.waste)}/yr at the 36% benchmark</p>
                        {results.flagLines.map((l) => (
                          <p key={l} className="mono" style={{ fontSize: 11, color: "#a8b4c6", lineHeight: 1.7 }}>{l}</p>
                        ))}
                        <p className="small dim" style={{ marginTop: 8 }}>List prices as of {PRICING_ASOF}. Keep this for your records.</p>
                      </div>
                    )}
                  </>
                )}
                <hr className="rule" style={{ margin: "16px 0 12px" }} />
                <p className="small dim">
                  List prices as of {PRICING_ASOF}, annual-billing basis. Contract rates vary. Rows marked unverified could not be confirmed on the vendor page. Estimates are benchmarks, not an audit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: "#0d1424", borderTop: "1px solid #1e2d44", borderBottom: "1px solid #1e2d44" }}>
        <div className="wrap">
          <Head kick="Why This Number Matters" title="The benchmarks behind the flags." sub="Every figure the diagnostic quotes is published research, cited in place. That is the standard your own AI reporting should meet." />
          <div className="grid g4">
            {DIAG_BENCH.facts.map((x) => (
              <div key={x.s + x.f} className="rv" style={{ borderLeft: "1px solid rgba(199,162,107,.4)", paddingLeft: 16 }}>
                <p className="body" style={{ marginBottom: 8 }}>{x.f}</p>
                <p className="small dim">{x.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Head kick="More Diagnostics" title="Tools ship the way everything Ayvede ships: vetted first." sub="Each diagnostic graduates from the Innovation Lab pipeline before it appears here." />
          <div className="grid g3">
            {TOOL_REGISTRY.map((t) => (
              <div key={t.n} className="stepCell rv">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
                  <div className="stepN">{t.n}</div>
                  <span className={stageTag(t.stage)}>{t.stage}</span>
                </div>
                <h3 className="h3" style={{ margin: "8px 0" }}>{t.t}</h3>
                <p className="body">{t.d}</p>
              </div>
            ))}
          </div>
          <p className="small rv" style={{ marginTop: 18, color: "#c7a26b" }}>
            Want one of these sooner? Say so in a scoping call. Client demand sets the Lab queue.
          </p>
        </div>
      </section>

      <CtaBand
        kick="From Number to Plan"
        title="Turn the ungoverned number into a governed one."
        sub="A confidential 30-minute scoping call. Bring the diagnostic; leave with next steps in writing."
        label="Book a Scoping Call"
        target="connect"
        go={go}
      />
    </div>
  );
}

// Minimal markdown rendering for briefing bodies (headings, bold, italic,
// links, tables) — styled entirely with existing tokens.
const MD_INLINE_RE = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\(([^)\s]+)\))/;
function mdInline(text) {
  const out = [];
  let rest = String(text), k = 0;
  while (rest) {
    const m = rest.match(MD_INLINE_RE);
    if (!m) { out.push(rest); break; }
    if (m.index > 0) out.push(rest.slice(0, m.index));
    if (m[1]) out.push(<strong key={k++}>{m[2]}</strong>);
    else if (m[3]) out.push(<em key={k++}>{m[4]}</em>);
    else out.push(<a key={k++} href={m[7]} target="_blank" rel="noreferrer">{m[6]}</a>);
    rest = rest.slice(m.index + m[0].length);
  }
  return out;
}

function insBlocks(md) {
  const blocks = [];
  let para = [], table = null;
  const flushP = () => { if (para.length) { blocks.push({ t: "p", text: para.join(" ") }); para = []; } };
  const flushT = () => { if (table) { blocks.push({ t: "table", rows: table }); table = null; } };
  for (const raw of String(md).split("\n")) {
    const line = raw.trim();
    if (line.startsWith("|")) {
      flushP();
      const cells = line.replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      // Skip alignment/separator rows ("---", ":-:") — keep only content rows.
      if (!cells.every((c) => /^:?-+:?$/.test(c) || c === "")) (table = table || []).push(cells);
      continue;
    }
    // A blank line ends a paragraph but keeps an open table alive — Google Docs
    // exports blank lines between table rows. Only a real content line closes it.
    if (!line) { flushP(); continue; }
    flushT();
    if (line.startsWith("### ")) { flushP(); blocks.push({ t: "h4", text: line.slice(4) }); continue; }
    if (line.startsWith("## ")) { flushP(); blocks.push({ t: "h3", text: line.slice(3) }); continue; }
    if (line.startsWith("# ")) { flushP(); blocks.push({ t: "h3", text: line.slice(2) }); continue; }
    para.push(line);
  }
  flushP(); flushT();
  return blocks;
}

function InsightsBody({ md }) {
  return (
    <div className="insBody">
      {insBlocks(md).map((b, i) => {
        if (b.t === "h3") return <h3 key={i} className="h3" style={{ margin: "30px 0 12px" }}>{mdInline(b.text)}</h3>;
        if (b.t === "h4") return <h3 key={i} className="h3" style={{ margin: "24px 0 10px", fontSize: "clamp(15px,1.7vw,17px)" }}>{mdInline(b.text)}</h3>;
        if (b.t === "table") return (
          <div key={i} className="insTableWrap">
            <table className="insTable"><tbody>
              {b.rows.map((r, ri) => <tr key={ri}>{r.map((c, ci) => <td key={ci}>{mdInline(c)}</td>)}</tr>)}
            </tbody></table>
          </div>
        );
        return <p key={i} className="body" style={{ marginBottom: 14, fontSize: "clamp(13.5px,1.5vw,15px)", lineHeight: 1.7 }}>{mdInline(b.text)}</p>;
      })}
    </div>
  );
}

// On-brand card visual — a deterministic navy/teal/gold constellation seeded
// by the article slug, so every briefing gets a distinct but consistent motif.
// No photos, no external requests. `slim` renders the reader's accent strip.
function insHash(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function insRng(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function CardMotif({ seed, slim }) {
  const W = 1200, H = slim ? 150 : 675;
  const N = slim ? 11 : 16;
  const rnd = insRng(insHash(seed || "ayvede"));
  const pts = [];
  for (let i = 0; i < N; i++) pts.push([Math.round(50 + rnd() * (W - 100)), Math.round(26 + rnd() * (H - 52))]);
  const edges = [];
  for (let i = 0; i < pts.length; i++) {
    edges.push([i, (i + 1 + Math.floor(rnd() * 3)) % pts.length]);
    if (rnd() > 0.55) edges.push([i, (i + 5) % pts.length]);
  }
  const gid = "m" + insHash(seed || "ayvede").toString(36);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={gid + "a"} cx="80%" cy="15%" r="70%">
          <stop offset="0%" stopColor="rgba(199,162,107,.12)" /><stop offset="65%" stopColor="rgba(199,162,107,0)" />
        </radialGradient>
        <radialGradient id={gid + "b"} cx="10%" cy="90%" r="70%">
          <stop offset="0%" stopColor="rgba(46,196,168,.10)" /><stop offset="60%" stopColor="rgba(46,196,168,0)" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="#101828" />
      <rect width={W} height={H} fill={`url(#${gid}a)`} /><rect width={W} height={H} fill={`url(#${gid}b)`} />
      {edges.map(([a, b], i) => (
        <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="rgba(199,162,107,.22)" strokeWidth="1" />
      ))}
      {pts.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 4 : 2.4} fill={i % 7 === 0 ? "#2ec4a8" : "#c7a26b"} opacity={i % 7 === 0 ? 0.75 : 0.55} />
      ))}
      <rect x="0" y={H - 3} width={W} height="3" fill="rgba(199,162,107,.5)" />
    </svg>
  );
}

// ── GALLERY · PROCEDURAL VISUAL ENGINE ───────────────────────────
//  Every spread is generated from the framework's own chips plus a fixed
//  motif family. Geometry is deterministic: a given framework always renders
//  identically, so nothing shifts between visits. No Math.random at render,
//  no external assets, no traced, recoloured, or reframed source artwork.
//  Only original geometry and the short chip labels appear inside a visual.

const GT = "#2ec4a8", GG = "#c7a26b", GX = "#e8ecf1", GM = "#7a8ba3", GB = "#1e2d44", GS = "#0d1424";
const galFam = (n) => GAL_FAMS[parseInt(GAL_FAM_MAP[n - 1], 16)];
const gac = (i) => (i % 2 ? GG : GT);
//  Shrink the type for longer chip labels so a panel never overflows.
const gfs = (s, b) => (String(s).length > 14 ? b - 4 : String(s).length > 10 ? b - 2 : b);

function gT(k, x, y, t, s, c, a, w) {
  return <text key={k} x={x} y={y} fontSize={s} fill={c || GM} textAnchor={a || "middle"} fontWeight={w || 400} fontFamily="'JetBrains Mono',monospace" letterSpacing=".04em">{t}</text>;
}
function gDot(k, x, y, r, i, on) {
  return <circle key={k} cx={x} cy={y} r={r} fill={on ? gac(i) : GS} stroke={gac(i)} strokeWidth="1.6" />;
}
function gNum(k, x, y, i, on) {
  return gT(k, x, y + 4, String(i + 1).padStart(2, "0"), 17, on ? "#07131f" : gac(i), "middle", 600);
}
function gLine(k, x1, y1, x2, y2, c, w, o) {
  return <line key={k} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={w || 1.4} opacity={o == null ? 0.55 : o} strokeLinecap="round" />;
}

//  Fifteen reusable families. Each fills the box B={x,y,w,h,cx,cy} using the
//  chips it is given, and varies by geometry, weight, fill, and direction.
const GAL_ENGINE = {
  cycle(B, ch) {
    const R = Math.min(B.w, B.h) * 0.3, N = ch.length, e = [];
    const at = (i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / N; return [B.cx + R * Math.cos(a), B.cy + R * Math.sin(a), a]; };
    e.push(<circle key="ring" cx={B.cx} cy={B.cy} r={R} fill="none" stroke={GB} strokeWidth="1.4" />);
    for (let i = 0; i < N; i++) {
      const [x, y] = at(i), [x2, y2] = at((i + 1) % N);
      e.push(gLine("e" + i, x, y, x2, y2, gac(i), 1.6, 0.45));
    }
    for (let i = 0; i < N; i++) {
      const [x, y, a] = at(i), on = i === 0;
      e.push(gDot("n" + i, x, y, on ? 27 : 22, i, on));
      e.push(gNum("m" + i, x, y, i, on));
      //  Side labels sit closer in; a long chip anchored outward would otherwise
      //  run past the page edge. Top and bottom labels can afford more room.
      const off = 28 + 30 * Math.abs(Math.sin(a));
      const lx = B.cx + (R + off) * Math.cos(a), ly = B.cy + (R + off) * Math.sin(a);
      e.push(gT("l" + i, lx, ly + 4, ch[i], gfs(ch[i], 20), GX, Math.abs(Math.cos(a)) < 0.3 ? "middle" : Math.cos(a) > 0 ? "start" : "end"));
    }
    return e;
  },
  steps(B, ch) {
    const N = ch.length, e = [], bw = B.w / (N + 0.6), base = B.y + B.h - 40;
    for (let i = 0; i < N; i++) {
      const h = (B.h - 96) * ((i + 1.4) / (N + 1.1)), x = B.x + i * bw + 14, y = base - h;
      e.push(<rect key={"r" + i} x={x} y={y} width={bw - 16} height={h} rx="3" fill={i === N - 1 ? "rgba(46,196,168,.16)" : "rgba(22,31,48,.9)"} stroke={gac(i)} strokeWidth="1.4" opacity={0.5 + 0.1 * i} />);
      e.push(gNum("m" + i, x + (bw - 16) / 2, y + 20, i, false));
      e.push(gT("l" + i, x + (bw - 16) / 2, base + 26 + (i % 2) * 26, ch[i], gfs(ch[i], 18), GX));
    }
    e.push(gLine("b", B.x, base + 2, B.x + B.w, base + 2, GB, 1.2, 1));
    return e;
  },
  ladder(B, ch) {
    const N = ch.length, e = [], gap = (B.h - 70) / N, lx = B.x + 62, rx = B.x + B.w - 62;
    e.push(gLine("s1", lx, B.y + 22, lx, B.y + B.h - 22, GB, 1.4, 1));
    e.push(gLine("s2", rx, B.y + 22, rx, B.y + B.h - 22, GB, 1.4, 1));
    for (let i = 0; i < N; i++) {
      const y = B.y + B.h - 44 - i * gap;
      e.push(gLine("r" + i, lx, y, rx, y, gac(i), 1.6 + i * 0.25, 0.5 + i * 0.08));
      e.push(gDot("d" + i, lx, y, 18, i, i === N - 1));
      e.push(gNum("m" + i, lx, y, i, i === N - 1));
      e.push(gT("l" + i, lx + 34, y - 16, ch[i], gfs(ch[i], 20), GX, "start"));
    }
    return e;
  },
  funnel(B, ch) {
    const N = ch.length, e = [], hh = (B.h - 80) / N;
    for (let i = 0; i < N; i++) {
      const t = i / N, t2 = (i + 1) / N;
      const w1 = B.w * (0.86 - 0.5 * t), w2 = B.w * (0.86 - 0.5 * t2), y = B.y + 34 + i * hh;
      e.push(<path key={"p" + i} d={`M${B.cx - w1 / 2} ${y}L${B.cx + w1 / 2} ${y}L${B.cx + w2 / 2} ${y + hh - 9}L${B.cx - w2 / 2} ${y + hh - 9}Z`} fill={i === N - 1 ? "rgba(46,196,168,.15)" : "rgba(22,31,48,.85)"} stroke={gac(i)} strokeWidth="1.4" opacity={0.55 + 0.09 * i} />);
      e.push(gT("l" + i, B.cx, y + hh / 2, ch[i], gfs(ch[i], 20), GX, "middle", 500));
    }
    return e;
  },
  network(B, ch) {
    const N = ch.length, e = [], R = Math.min(B.w, B.h) * 0.31;
    const at = (i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / N; return [B.cx + R * Math.cos(a) * 1.15, B.cy + R * Math.sin(a)]; };
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const [x1, y1] = at(i), [x2, y2] = at(j);
      e.push(gLine("e" + i + "_" + j, x1, y1, x2, y2, (i + j) % 2 ? GG : GT, 1.1, 0.26));
    }
    for (let i = 0; i < N; i++) {
      const [x, y] = at(i);
      e.push(<circle key={"h" + i} cx={x} cy={y} r={40} fill={gac(i)} opacity=".07" />);
      e.push(gDot("n" + i, x, y, 20, i, false));
      e.push(gNum("m" + i, x, y, i, false));
      e.push(gT("l" + i, x, y + 44, ch[i], gfs(ch[i], 19), GX));
    }
    return e;
  },
  bridge(B, ch) {
    const N = ch.length, e = [], deck = B.cy + 34, sp = B.w - 100;
    e.push(<path key="arc" d={`M${B.x + 50} ${deck}Q${B.cx} ${deck - 150} ${B.x + 50 + sp} ${deck}`} fill="none" stroke={GT} strokeWidth="2" opacity=".5" />);
    e.push(gLine("deck", B.x + 40, deck, B.x + B.w - 40, deck, GB, 2, 1));
    e.push(<rect key="p1" x={B.x + 44} y={deck} width="12" height="76" fill="none" stroke={GG} strokeWidth="1.4" opacity=".6" />);
    e.push(<rect key="p2" x={B.x + B.w - 56} y={deck} width="12" height="76" fill="none" stroke={GG} strokeWidth="1.4" opacity=".6" />);
    for (let i = 0; i < N; i++) {
      const x = B.x + 50 + (sp * i) / (N - 1 || 1);
      const t = i / (N - 1 || 1), ay = deck - 150 * 2 * t * (1 - t) * 2;
      e.push(gLine("c" + i, x, deck, x, Math.min(ay, deck - 12), gac(i), 1.1, 0.4));
      e.push(gDot("n" + i, x, deck, 18, i, i === 0 || i === N - 1));
      e.push(gNum("m" + i, x, deck, i, i === 0 || i === N - 1));
      e.push(gT("l" + i, x, deck + 54 + (i % 2) * 26, ch[i], gfs(ch[i], 19), GX));
    }
    return e;
  },
  exchange(B, ch) {
    const N = ch.length, e = [], lx = B.x + 84, rx = B.x + B.w - 84, gap = (B.h - 92) / Math.max(N - 1, 1);
    e.push(gLine("l", lx, B.y + 30, lx, B.y + B.h - 30, GT, 1.6, 0.5));
    e.push(gLine("r", rx, B.y + 30, rx, B.y + B.h - 30, GG, 1.6, 0.5));
    for (let i = 0; i < N; i++) {
      const y = B.y + 46 + i * gap, left = i % 2 === 0;
      e.push(gLine("x" + i, lx, y, rx, left ? y + 26 : y - 26, gac(i), 1.3, 0.4));
      e.push(gDot("a" + i, left ? lx : rx, y, 18, i, left));
      e.push(gNum("m" + i, left ? lx : rx, y, i, left));
      e.push(gT("l" + i, left ? lx + 34 : rx - 34, y + 4, ch[i], gfs(ch[i], 20), GX, left ? "start" : "end"));
    }
    return e;
  },
  balance(B, ch) {
    const N = ch.length, e = [], px = B.cy - 40;
    e.push(<path key="f" d={`M${B.cx} ${px + 16}L${B.cx - 30} ${px + 92}L${B.cx + 30} ${px + 92}Z`} fill="none" stroke={GG} strokeWidth="1.5" opacity=".7" />);
    e.push(gLine("beam", B.cx - B.w * 0.34, px - 8, B.cx + B.w * 0.34, px + 8, GT, 2.2, 0.85));
    for (let i = 0; i < N; i++) {
      const left = i < Math.ceil(N / 2);
      const side = left ? -1 : 1, k = left ? i : i - Math.ceil(N / 2);
      const x = B.cx + side * (B.w * 0.19 + k * 108), y = px + side * 8 + 60 + k * 52;
      e.push(gLine("h" + i, x, px + side * 8, x, y - 15, gac(i), 1.1, 0.45));
      e.push(gDot("n" + i, x, y, 19, i, left));
      e.push(gNum("m" + i, x, y, i, left));
      e.push(gT("l" + i, x, y + 50, ch[i], gfs(ch[i], 18), GX));
    }
    return e;
  },
  compass(B, ch) {
    const N = ch.length, e = [], R = Math.min(B.w, B.h) * 0.34;
    e.push(<circle key="o" cx={B.cx} cy={B.cy} r={R} fill="none" stroke={GB} strokeWidth="1.4" />);
    e.push(<circle key="o2" cx={B.cx} cy={B.cy} r={R * 0.55} fill="none" stroke={GB} strokeWidth="1" opacity=".7" />);
    e.push(gLine("ax", B.cx - R, B.cy, B.cx + R, B.cy, GB, 1, 0.8));
    e.push(gLine("ay", B.cx, B.cy - R, B.cx, B.cy + R, GB, 1, 0.8));
    for (let i = 0; i < N; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
      const x = B.cx + R * 0.78 * Math.cos(a), y = B.cy + R * 0.78 * Math.sin(a);
      e.push(gLine("s" + i, B.cx, B.cy, x, y, gac(i), 1.6, 0.5));
      e.push(gDot("n" + i, x, y, 20, i, i === 0));
      e.push(gNum("m" + i, x, y, i, i === 0));
      e.push(gT("l" + i, B.cx + (R + 40) * Math.cos(a), B.cy + (R + 40) * Math.sin(a) + 4, ch[i], gfs(ch[i], 19), GX, Math.abs(Math.cos(a)) < 0.3 ? "middle" : Math.cos(a) > 0 ? "start" : "end"));
    }
    e.push(<circle key="c" cx={B.cx} cy={B.cy} r="7" fill={GG} />);
    return e;
  },
  matrix(B, ch) {
    const e = [], w = B.w * 0.78, h = B.h * 0.66, x0 = B.cx - w / 2, y0 = B.cy - h / 2;
    e.push(<rect key="f" x={x0} y={y0} width={w} height={h} fill="none" stroke={GB} strokeWidth="1.4" />);
    e.push(gLine("v", B.cx, y0, B.cx, y0 + h, GB, 1.2, 1));
    e.push(gLine("h", x0, B.cy, x0 + w, B.cy, GB, 1.2, 1));
    for (let i = 0; i < ch.length; i++) {
      const q = i % 4, qx = x0 + (q % 2) * (w / 2), qy = y0 + (q < 2 ? 0 : 1) * (h / 2);
      const cx = qx + w / 4, cy = qy + h / 4 + (i > 3 ? 26 : 0);
      if (i < 4) e.push(<rect key={"q" + i} x={qx + 6} y={qy + 6} width={w / 2 - 12} height={h / 2 - 12} rx="3" fill={gac(i)} opacity=".07" />);
      e.push(gDot("n" + i, cx, cy - 20, 19, i, i === 0));
      e.push(gNum("m" + i, cx, cy - 20, i, i === 0));
      e.push(gT("l" + i, cx, cy + 22, ch[i], gfs(ch[i], 19), GX));
    }
    return e;
  },
  systemMap(B, ch) {
    const N = ch.length, e = [], R = Math.min(B.w, B.h) * 0.3;
    e.push(<circle key="core" cx={B.cx} cy={B.cy} r="38" fill="rgba(46,196,168,.12)" stroke={GT} strokeWidth="1.8" />);
    e.push(gT("cl", B.cx, B.cy + 4, "SYS", 16, GT, "middle", 600));
    for (let i = 0; i < N; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
      const x = B.cx + R * Math.cos(a) * 1.2, y = B.cy + R * Math.sin(a);
      const mx = B.cx + R * 0.62 * Math.cos(a + 0.42), my = B.cy + R * 0.62 * Math.sin(a + 0.42);
      e.push(<path key={"f" + i} d={`M${B.cx + 38 * Math.cos(a)} ${B.cy + 38 * Math.sin(a)}Q${mx} ${my} ${x} ${y}`} fill="none" stroke={gac(i)} strokeWidth="1.5" opacity=".5" />);
      e.push(gDot("n" + i, x, y, 20, i, false));
      e.push(gNum("m" + i, x, y, i, false));
      e.push(gT("l" + i, x, y + 44, ch[i], gfs(ch[i], 19), GX));
    }
    return e;
  },
  orbit(B, ch) {
    const N = ch.length, e = [], R0 = Math.min(B.w, B.h) * 0.15;
    e.push(<circle key="c" cx={B.cx} cy={B.cy} r="16" fill={GG} opacity=".85" />);
    for (let i = 0; i < N; i++) {
      const R = R0 + (i + 1) * (Math.min(B.w, B.h) * 0.34 - R0) / N;
      const a = -Math.PI / 2 + i * 1.05;
      const x = B.cx + R * Math.cos(a), y = B.cy + R * Math.sin(a) * 0.82;
      e.push(<ellipse key={"o" + i} cx={B.cx} cy={B.cy} rx={R} ry={R * 0.82} fill="none" stroke={gac(i)} strokeWidth="1.1" opacity={0.42 - i * 0.03} />);
      e.push(gDot("n" + i, x, y, 18, i, i === 0));
      e.push(gNum("m" + i, x, y, i, i === 0));
      e.push(gT("l" + i, x, y - 32, ch[i], gfs(ch[i], 18), GX));
    }
    return e;
  },
  path(B, ch) {
    const N = ch.length, e = [], step = (B.w - 110) / Math.max(N - 1, 1);
    let d = "";
    const pts = [];
    for (let i = 0; i < N; i++) {
      const x = B.x + 55 + i * step, y = B.cy + (i % 2 ? 62 : -62) * (1 - i / (N * 2));
      pts.push([x, y]);
      d += (i ? "L" : "M") + x + " " + y;
    }
    e.push(<path key="p" d={d} fill="none" stroke={GT} strokeWidth="2" opacity=".45" strokeLinejoin="round" />);
    pts.forEach(([x, y], i) => {
      e.push(gDot("n" + i, x, y, i === N - 1 ? 25 : 20, i, i === N - 1));
      e.push(gNum("m" + i, x, y, i, i === N - 1));
      e.push(gT("l" + i, x, y + (i % 2 ? 46 : -36), ch[i], gfs(ch[i], 19), GX));
    });
    return e;
  },
  stack(B, ch) {
    const N = ch.length, e = [], hh = (B.h - 80) / N, w = B.w * 0.8;
    for (let i = 0; i < N; i++) {
      const y = B.y + B.h - 40 - (i + 1) * hh + 6, inset = i * 9;
      e.push(<rect key={"r" + i} x={B.cx - w / 2 + inset} y={y} width={w - inset * 2} height={hh - 12} rx="3" fill={i === N - 1 ? "rgba(46,196,168,.14)" : "rgba(22,31,48,.88)"} stroke={gac(i)} strokeWidth="1.4" opacity={0.55 + 0.1 * i} />);
      e.push(gT("l" + i, B.cx, y + (hh - 12) / 2 + 4, ch[i], gfs(ch[i], 20), GX, "middle", 500));
      e.push(gT("m" + i, B.cx - w / 2 + inset + 16, y + (hh - 12) / 2 + 4, String(i + 1).padStart(2, "0"), 15, gac(i), "start", 600));
    }
    return e;
  },
  tree(B, ch) {
    const N = ch.length, e = [], rx = B.cx, ry = B.y + 52;
    e.push(gDot("root", rx, ry, 24, 0, true));
    e.push(gNum("rm", rx, ry, 0, true));
    e.push(gT("rl", rx, ry - 38, ch[0], gfs(ch[0], 20), GX));
    const kids = ch.slice(1), K = kids.length || 1;
    kids.forEach((c, i) => {
      const x = B.x + 70 + ((B.w - 140) * i) / Math.max(K - 1, 1);
      const y = ry + 150 + (i % 2) * 74;
      e.push(<path key={"b" + i} d={`M${rx} ${ry + 18}Q${rx} ${(ry + y) / 2} ${x} ${y - 16}`} fill="none" stroke={gac(i + 1)} strokeWidth="1.4" opacity=".5" />);
      e.push(gDot("n" + i, x, y, 19, i + 1, false));
      e.push(gNum("m" + i, x, y, i + 1, false));
      e.push(gT("l" + i, x, y + 42, c, gfs(c, 19), GX));
    });
    return e;
  },
};

//  Right panel: four compositions, chosen deterministically per framework.
const GAL_RIGHT = [
  function steps(B, ch) {
    const N = ch.length, e = [], gap = (B.h - 80) / Math.max(N, 1), x = B.x + 58;
    e.push(gLine("sp", x, B.y + 40, x, B.y + 40 + gap * (N - 1), GB, 1.4, 1));
    for (let i = 0; i < N; i++) {
      const y = B.y + 40 + i * gap;
      e.push(gDot("n" + i, x, y, 19, i, i === 0));
      e.push(gNum("m" + i, x, y, i, i === 0));
      e.push(gT("l" + i, x + 36, y + 4, ch[i], gfs(ch[i], 20), GX, "start", 500));
    }
    return e;
  },
  function bars(B, ch) {
    const N = ch.length, e = [], gap = (B.h - 80) / Math.max(N, 1);
    for (let i = 0; i < N; i++) {
      const y = B.y + 46 + i * gap, w = (B.w - 96) * (0.42 + 0.58 * ((N - i) / N));
      e.push(<rect key={"b" + i} x={B.x + 48} y={y - 12} width={w} height="24" rx="2" fill={gac(i)} opacity={0.16 + 0.04 * i} />);
      e.push(gLine("u" + i, B.x + 48, y + 12, B.x + 48 + w, y + 12, gac(i), 1.6, 0.6));
      e.push(gT("l" + i, B.x + 56, y + 4, ch[i], gfs(ch[i], 20), GX, "start", 500));
    }
    return e;
  },
  function map(B, ch) {
    const N = ch.length, e = [], R = Math.min(B.w, B.h) * 0.27;
    e.push(<circle key="c" cx={B.cx} cy={B.cy} r="28" fill="none" stroke={GG} strokeWidth="1.6" opacity=".8" />);
    for (let i = 0; i < N; i++) {
      const a = -Math.PI / 2 + (i * 2 * Math.PI) / N;
      const x = B.cx + R * Math.cos(a) * 1.25, y = B.cy + R * Math.sin(a);
      e.push(gLine("s" + i, B.cx, B.cy, x, y, gac(i), 1.3, 0.42));
      e.push(gDot("n" + i, x, y, 18, i, false));
      e.push(gNum("m" + i, x, y, i, false));
      e.push(gT("l" + i, x, y + 40, ch[i], gfs(ch[i], 18), GX));
    }
    return e;
  },
  function rows(B, ch) {
    const N = ch.length, e = [], gap = (B.h - 84) / Math.max(N, 1);
    for (let i = 0; i < N; i++) {
      const y = B.y + 46 + i * gap;
      e.push(<rect key={"r" + i} x={B.x + 44} y={y - 21} width={B.w - 88} height="42" rx="3" fill="rgba(22,31,48,.8)" stroke={gac(i)} strokeWidth="1.2" opacity={0.6 + 0.06 * i} />);
      e.push(gT("m" + i, B.x + 66, y + 5, String(i + 1).padStart(2, "0"), 16, gac(i), "start", 600));
      e.push(gT("l" + i, B.x + 104, y + 5, ch[i], gfs(ch[i], 20), GX, "start", 500));
    }
    return e;
  },
];

//  One framed two-page spread. Left page is the framework diagram, right page
//  is the signals panel. Both are drawn from the same chips.
function GalSpread({ item, svgRef }) {
  const fam = galFam(item.n);
  const draw = GAL_ENGINE[fam] || GAL_ENGINE.network;
  const right = GAL_RIGHT[(item.n + item.k.length) % GAL_RIGHT.length];
  const L = { x: 52, y: 96, w: 506, h: 578, cx: 305, cy: 385 };
  const R = { x: 642, y: 96, w: 506, h: 578, cx: 895, cy: 385 };
  const nn = String(item.n).padStart(2, "0");
  const cat = GAL_CATS.find((c) => c.id === item.c);
  return (
    <svg ref={svgRef} className="glSpread" viewBox="0 0 1200 780" role="img"
      aria-label={`Original Ayvede framework visual for ${item.t}: ${fam} diagram and signals panel built from the framework's key moves`}>
      <rect x="0" y="0" width="1200" height="780" fill="#0b1120" />
      <rect x="22" y="22" width="566" height="736" rx="4" fill={GS} stroke={GB} strokeWidth="1.2" />
      <rect x="612" y="22" width="566" height="736" rx="4" fill={GS} stroke={GB} strokeWidth="1.2" />
      <line x1="600" y1="40" x2="600" y2="740" stroke={GB} strokeWidth="1" opacity=".8" />
      <line x1="52" y1="62" x2="146" y2="62" stroke={GG} strokeWidth="1.4" />
      <line x1="642" y1="62" x2="736" y2="62" stroke={GG} strokeWidth="1.4" />
      {gT("h1", 52, 52, "FRAMEWORK " + nn, 17, GG, "start", 600)}
      {gT("h2", 642, 52, "KEY MOVES", 17, GG, "start", 600)}
      {gT("f1", 558, 52, String(fam).toUpperCase(), 15, GM, "end", 500)}
      {gT("f2", 1148, 52, (cat ? cat.short : "").toUpperCase(), 15, GM, "end", 500)}
      {draw(L, item.k)}
      {right(R, item.k)}
      {gT("ft", 52, 736, "AYVEDE / ORIGINAL PROCEDURAL VISUAL", 14, GM, "start", 500)}
      {gT("fn", 1148, 736, nn + " / 50", 14, GM, "end", 500)}
    </svg>
  );
}

//  Motion helper: honour the reduced-motion preference the site already respects.
const glReduce = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//  Scroll helper. Some engines ignore smooth scrolling entirely, which would
//  make an index jump silently do nothing, so snap if nothing actually moved.
const glScrollTo = (top) => {
  const y = Math.max(0, Math.round(top)), from = window.scrollY;
  window.scrollTo({ top: y, behavior: glReduce() ? "auto" : "smooth" });
  if (Math.abs(y - from) > 2) setTimeout(() => { if (Math.abs(window.scrollY - from) < 2) window.scrollTo(0, y); }, 320);
};
const glCat = (id) => GAL_CATS.find((c) => c.id === id);
const glCount = (id) => GAL_ITEMS.filter((i) => i.c === id).length;
const glId = (n) => "gallery-i-" + String(n).padStart(2, "0");

//  Deterministic hero network. Original geometry, fixed seed, no assets.
function GalHeroArt() {
  const r = insRng(insHash("ayvede-gallery-hero"));
  const pts = [];
  for (let i = 0; i < 11; i++) pts.push([Math.round(70 + r() * 520), Math.round(60 + r() * 380)]);
  const ed = [];
  for (let i = 0; i < pts.length; i++) {
    ed.push([i, (i + 1) % pts.length]);
    if (r() > 0.45) ed.push([i, (i + 4) % pts.length]);
  }
  return (
    <svg viewBox="0 0 660 500" aria-hidden="true" style={{ width: "100%", maxWidth: 560 }}>
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".55">
        {ed.map(([a, b], i) => <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />)}
      </g>
      {pts.map(([x, y], i) => <circle key={"c" + i} cx={x} cy={y} r={i % 4 === 0 ? 7 : 4.5} fill={i % 3 === 0 ? "#2ec4a8" : "currentColor"} opacity={i % 3 === 0 ? 0.85 : 0.6} />)}
      {pts.filter((_, i) => i % 4 === 0).map(([x, y], i) => <circle key={"h" + i} cx={x} cy={y} r="26" fill="currentColor" opacity=".12" />)}
    </svg>
  );
}

function GalBand() {
  return (
    <div className="glBand rv">
      <div className="glBadge">i</div>
      <div>
        <h3>Source integrity</h3>
        <p>
          Every visual in the Gallery is generated in your browser from that framework's own key moves, using the Ayvede design system. Nothing here is scanned, traced, recolored, or reproduced from another publisher: there is no third-party artwork, photography, or imagery anywhere on this page, and no image files are loaded at all. The reads and summaries are original Ayvede editorial, written to be useful on their own.
        </p>
      </div>
    </div>
  );
}

function GalCard({ item, onOpen, onBack }) {
  const cat = glCat(item.c);
  const nn = String(item.n).padStart(2, "0");
  return (
    <article className="glCard rv" id={glId(item.n)}>
      <div className="glFig">
        <GalSpread item={item} />
        <div className="glFigAct">
          <button className="glBtn" onClick={() => onOpen(item.n)}>Expand visual</button>
          <button className="glBtn gh2" onClick={onBack}>Back to Gallery</button>
        </div>
      </div>
      <div className="glBody">
        <div className="glMeta">
          <span className="glNum">{nn}</span>
          <span className="glCatLbl">{cat ? cat.short : ""}</span>
        </div>
        <h2 className="glTitle">{item.t}</h2>
        <div className="glAuthor">{item.a}</div>
        <div className="glBlock">
          <div className="glLbl">Ayvede read</div>
          <p className="glWhat">{item.w}</p>
        </div>
        <div className="glBlock">
          <div className="glLbl">The quick version</div>
          <p className="glQuick">{item.q}</p>
        </div>
        <div className="glFlow">{item.k.map((c) => <span key={c} className="glChip">{c}</span>)}</div>
        <div className="glTools">
          <button className="glBtn" onClick={() => onOpen(item.n)}>Open full detail</button>
          <button className="glBtn gh2" onClick={onBack}>Back to Gallery</button>
        </div>
      </div>
    </article>
  );
}

function GalLightbox({ item, onClose }) {
  const box = React.useRef(null), svg = React.useRef(null), closeBtn = React.useRef(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const prev = document.activeElement;
    document.body.style.overflow = "hidden";
    if (closeBtn.current) closeBtn.current.focus();
    const key = (e) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key !== "Tab" || !box.current) return;
      const f = box.current.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => {
      document.removeEventListener("keydown", key);
      document.body.style.overflow = "";
      if (prev && prev.focus) prev.focus();
    };
  }, [onClose]);
  const save = () => {
    try {
      const node = svg.current;
      if (!node) return;
      const clone = node.cloneNode(true);
      clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      const str = new XMLSerializer().serializeToString(clone);
      const url = URL.createObjectURL(new Blob([str], { type: "image/svg+xml;charset=utf-8" }));
      const a = document.createElement("a");
      a.href = url;
      a.download = "ayvede-framework-" + String(item.n).padStart(2, "0") + ".svg";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1200);
      setSaved(true); setTimeout(() => setSaved(false), 2200);
    } catch (err) { setSaved(false); }
  };
  const cat = glCat(item.c);
  return (
    <div className="glLb" role="dialog" aria-modal="true" aria-label={"Expanded framework visual: " + item.t}
      ref={box} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="glLbBar">
        <div className="glLbTitle">{item.t}<small>{item.a} / {cat ? cat.name : ""}</small></div>
        <div className="glLbCtl">
          <button className="glBtn" onClick={save}>{saved ? "Saved" : "Save SVG"}</button>
          <button className="glIcon" ref={closeBtn} onClick={onClose} aria-label="Close expanded visual">
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="glLbStage">
        <GalSpread item={item} svgRef={svg} />
        <div className="glLbCopy">
          <div>
            <div className="glLbl">Ayvede read</div>
            <p className="glWhat">{item.w}</p>
          </div>
          <div>
            <div className="glLbl">The quick version</div>
            <p className="glQuick">{item.q}</p>
          </div>
          <div className="glFlow" style={{ borderTop: 0, paddingTop: 0 }}>
            {item.k.map((c) => <span key={c} className="glChip">{c}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryPage({ go }) {
  const [view, setView] = useState("gallery");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(null);
  const [jump, setJump] = useState(null);
  const [top, setTop] = useState(false);
  const bodyRef = React.useRef(null);
  const rootRef = React.useRef(null);

  //  The site's reveal observer is keyed on the top-level page, so cards mounted
  //  by an internal view change are never observed and would stay at opacity 0.
  //  Observe the gallery's own subtree whenever the internal view changes.
  useEffect(() => {
    const host = rootRef.current;
    if (!host) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.05 }
    );
    const t = setTimeout(() => host.querySelectorAll(".rv:not(.in)").forEach((n) => io.observe(n)), 50);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [view]);

  useEffect(() => {
    const onScroll = () => setTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //  After a category renders, settle on the requested card.
  useEffect(() => {
    if (!jump) return;
    const t = setTimeout(() => {
      const el = document.getElementById(glId(jump));
      if (el) glScrollTo(el.getBoundingClientRect().top + window.scrollY - 132);
      setJump(null);
    }, 70);
    return () => clearTimeout(t);
  }, [jump, view]);

  const goView = (v, target) => {
    setView(v);
    setOpen(null);
    if (target) setJump(target);
    else if (bodyRef.current) glScrollTo(Math.max(bodyRef.current.offsetTop - 90, 0));
    else glScrollTo(0);
  };

  const needle = q.trim().toLowerCase();
  const hits = GAL_ITEMS.filter((i) =>
    !needle || i.t.toLowerCase().includes(needle) || i.a.toLowerCase().includes(needle) ||
    i.k.some((c) => c.toLowerCase().includes(needle)));
  const openItem = open ? GAL_ITEMS.find((i) => i.n === open) : null;

  const tabs = [{ id: "gallery", label: "Gallery", count: GAL_ITEMS.length }]
    .concat(GAL_CATS.map((c) => ({ id: c.id, label: c.short, count: glCount(c.id) })));

  return (
    <div ref={rootRef}>
      <div className="glRail">
        <div className="wrap glTabs" role="tablist" aria-label="Gallery sections">
          {tabs.map((t) => (
            <button key={t.id} role="tab" aria-selected={view === t.id}
              className={`glTab${view === t.id ? " on" : ""}`} onClick={() => goView(t.id)}>
              {t.label}<span className="glTc">{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {view === "gallery" ? (
        <>
          <section className="glHero">
            <div className="wrap glHeroGrid">
              <div>
                <div className="glEyebrow rv">The Ayvede Gallery</div>
                <h1 className="glH1 rv">Ideas worth keeping.<br /><span>Built for better decisions.</span></h1>
                <p className="glHeroCopy rv">A working library of 50 framework reads for sharper judgment, stronger execution, better communication, and more deliberate leadership. Each one is summarized in Ayvede's voice and paired with an original visual generated from its own key moves.</p>
                <div className="glProof rv">
                  <span><i />50 original framework reads</span>
                  <span><i />Procedural visuals, zero image files</span>
                  <span><i />Six operating areas</span>
                </div>
              </div>
              <div className="glNetWrap rv">
                <GalHeroArt />
                <div className="glNetLabel"><strong>50</strong><span>Frameworks / 6 operating areas</span></div>
              </div>
            </div>
          </section>
          <section className="glBody2" ref={bodyRef}>
            <div className="wrap">
              <div className="glHead rv">
                <div>
                  <div className="kick">00 / Master Index</div>
                  <h2>Every framework, grouped by use.</h2>
                  <p>Search by title, author, or key move, then jump straight to the read.</p>
                </div>
                <div className="glTools2">
                  <label className="glSearch">
                    <span className="sr-only-gl" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>Search the gallery</span>
                    <input type="search" placeholder="Search title, author, or key move" autoComplete="off"
                      value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search the gallery" />
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" />
                    </svg>
                  </label>
                </div>
              </div>
              {hits.length === 0 ? (
                <div className="glNone rv">No framework matches that search.</div>
              ) : (
                <div className="glIdxGrid rv">
                  {GAL_CATS.map((c) => {
                    const list = hits.filter((i) => i.c === c.id);
                    if (!list.length) return null;
                    return (
                      <section className="glIdxCard" key={c.id}>
                        <div className="glIdxHead">
                          <div>
                            <h3>{c.name}</h3>
                            <p>{c.description}</p>
                          </div>
                          <span className="glCount">{list.length} {list.length === 1 ? "entry" : "entries"}</span>
                        </div>
                        <ul className="glIdxList">
                          {list.map((i) => (
                            <li key={i.n}>
                              <button className="glIdxLink" onClick={() => goView(c.id, i.n)}>
                                <span className="glIdxNum">{String(i.n).padStart(2, "0")}</span>
                                <span>{i.t}</span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      </section>
                    );
                  })}
                </div>
              )}
              <GalBand />
            </div>
          </section>
        </>
      ) : (
        <>
          <section className="glCatHero">
            <div className="wrap glCatIn">
              <div>
                <div className="kick">{String(glCat(view).order).padStart(2, "0")} / Operating Area</div>
                <h1 className="glCatH1">{glCat(view).name}</h1>
                <p className="glCatDesc">{glCat(view).description}</p>
              </div>
              <div className="glStat">{String(glCount(view)).padStart(2, "0")}<span>frameworks</span></div>
            </div>
          </section>
          <section className="glBody2" ref={bodyRef}>
            <div className="wrap">
              {GAL_ITEMS.filter((i) => i.c === view).map((i) => (
                <GalCard key={i.n} item={i} onOpen={setOpen} onBack={() => goView("gallery")} />
              ))}
              <GalBand />
            </div>
          </section>
        </>
      )}

      <button className={`glTop${top ? " show" : ""}`} aria-label="Back to top" onClick={() => glScrollTo(0)}>
        <ArrowRight size={17} style={{ transform: "rotate(-90deg)" }} />
      </button>
      {openItem && <GalLightbox item={openItem} onClose={() => setOpen(null)} />}
    </div>
  );
}

function InsightsPage({ go }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [openSlug, setOpenSlug] = useState(null);
  const open = HUB_DATA.find((a) => a.slug === openSlug) || null;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [openSlug]);

  const needle = q.trim().toLowerCase();
  const list = HUB_DATA.filter((a) => {
    const catOk = cat === "All" || a.category === cat || a.secondaryCategory === cat;
    const qOk = !needle || [a.title, a.teaser, a.body, a.category, a.secondaryCategory || ""].some((f) => f.toLowerCase().includes(needle));
    return catOk && qOk;
  });

  return (
    <div>
      <div style={{ display: open ? "none" : undefined }}>
        <Hero
          kick="Insights"
          title="The Ayvede Briefing."
          sub="Governance-grade AI intelligence for decision-makers. Signal, not noise. Written by a practitioner, not a content calendar."
          chips={["POVs", "Playbooks", "Field notes", "Board briefs"]}
          actions={<button className="btn primary" onClick={() => { const el = document.getElementById("subscribe-anchor"); if (el) el.scrollIntoView({ behavior: "smooth" }); }}>Subscribe to the Briefing <ArrowRight size={15} /></button>}
        />

        <section className="sec" style={{ paddingTop: "clamp(16px,2vw,28px)" }}>
          <div className="wrap">
            <div className="rv" style={{ display: "flex", flexWrap: "wrap", gap: "10px 14px", alignItems: "center", justifyContent: "space-between", marginBottom: "clamp(18px,2.6vw,28px)" }}>
              <div className="chips">
                {["All", ...INS_CATEGORIES].map((c) => (
                  <button key={c} className={`tag insPill${cat === c ? " on" : ""}`} onClick={() => setCat(c)}>{c}</button>
                ))}
              </div>
              <input className="input insSearch" placeholder="Search briefings" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search briefings" />
            </div>

            <div className="grid insGrid rv">
              {list.map((a) => (
                <article
                  key={a.slug}
                  className="card insCard"
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenSlug(a.slug)}
                  onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpenSlug(a.slug); } }}
                >
                  <div className="insMotif"><CardMotif seed={a.slug} /></div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                    <span className="tag g">{a.category}</span>
                    {a.secondaryCategory && <span className="tag">{a.secondaryCategory}</span>}
                  </div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{a.title}</h3>
                  <p className="body" style={{ flex: 1 }}>{a.teaser}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                    <span className="mono dim" style={{ fontSize: 10, letterSpacing: ".12em" }}>{a.date}</span>
                    <span className="mono tealTx" style={{ fontSize: 10.5, letterSpacing: ".14em", display: "inline-flex", alignItems: "center", gap: 6 }}>READ <ArrowRight size={12} /></span>
                  </div>
                </article>
              ))}
              {list.length === 0 && (
                <div className="card gh" style={{ gridColumn: "1 / -1", textAlign: "center", padding: "clamp(34px,5vw,56px)" }}>
                  <div className="kick" style={{ marginBottom: 10 }}>{HUB_DATA.length === 0 ? "In Production" : "No Matches"}</div>
                  <h3 className="h3" style={{ marginBottom: 8 }}>{HUB_DATA.length === 0 ? "The first briefing is on its way." : "Nothing matches that filter."}</h3>
                  <p className="small" style={{ maxWidth: 420, margin: "0 auto" }}>
                    {HUB_DATA.length === 0
                      ? "New governance-grade briefings land here as they ship. Subscribe below to get them in your inbox first."
                      : "Try another category, or clear the search."}
                  </p>
                </div>
              )}
            </div>

            <p className="small dim rv" style={{ marginTop: 18 }}>
              Full-length briefings, templates, and playbooks are delivered to subscribers and clients first.
            </p>
          </div>
        </section>

        <div id="subscribe-anchor"><SubscribeBand /></div>

        <CtaBand
          kick="Beyond the Briefing"
          title="Want this intelligence applied to your firm?"
          sub="The Executive AI Briefing turns these ideas into a confidential, firm-specific 90-day plan."
          label="Book the Executive Briefing"
          target="connect"
          go={go}
        />
      </div>

      {open && (
        <section className="sec" style={{ paddingTop: "clamp(90px,12vw,140px)" }}>
          <div className="wrap" style={{ maxWidth: 860 }}>
            <button className="btn line" style={{ padding: "8px 12px" }} onClick={() => setOpenSlug(null)}>
              <ArrowRight size={13} style={{ transform: "rotate(180deg)" }} /> All Briefings
            </button>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", margin: "clamp(20px,3vw,30px) 0 14px" }}>
              <span className="tag g">{open.category}</span>
              {open.secondaryCategory && <span className="tag">{open.secondaryCategory}</span>}
              <span className="mono dim" style={{ fontSize: 10.5, letterSpacing: ".12em", marginLeft: 4 }}>{open.date}</span>
            </div>
            <h1 className="h2" style={{ marginBottom: 12 }}>{open.title}</h1>
            <p className="sub" style={{ marginBottom: 22 }}>{open.teaser}</p>
            <div className="insReaderStrip" style={{ marginBottom: "clamp(26px,4vw,38px)" }}><CardMotif seed={open.slug} slim /></div>
            <InsightsBody md={open.body} />
            <hr className="rule" style={{ margin: "clamp(26px,4vw,40px) 0 18px" }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "space-between", alignItems: "center" }}>
              <button className="btn line" style={{ padding: "8px 12px" }} onClick={() => setOpenSlug(null)}>
                <ArrowRight size={13} style={{ transform: "rotate(180deg)" }} /> All Briefings
              </button>
              <button className="btn primary" onClick={() => go("connect")}>Book a Confidential Briefing <ArrowRight size={15} /></button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function ConnectPage({ preset }) {
  const [f, setF] = useState({ first: "", last: "", email: "", firm: "", interest: preset || "Executive AI Briefing", message: "" });
  const [st, setSt] = useState("idle");
  const set = (k) => (e) => { setF({ ...f, [k]: e.target.value }); if (st === "invalid" || st === "err") setSt("idle"); };
  const send = async () => {
    if (!f.first.trim() || !f.last.trim() || !EMAIL_OK(f.email)) { setSt("invalid"); return; }
    setSt("sending");
    try {
      await formspreePost(FORMSPREE_CONTACT, {
        name: `${f.first.trim()} ${f.last.trim()}`,
        email: f.email.trim(),
        firm: f.firm.trim(),
        interest: f.interest,
        message: f.message.trim(),
        form: "connect",
        _subject: `Ayvede Inquiry - ${f.interest}`,
      });
      setSt("ok");
    } catch {
      setSt("err");
    }
  };
  const NEXT = [
    { n: "01", t: "Response within one business day", d: "Directly from Anthony. No intake team, no ticket queue." },
    { n: "02", t: "Confidential 30-minute scoping call", d: "NDA available before any detail is shared." },
    { n: "03", t: "Written recommendation", d: "Scope, timeline, and fixed pricing, whether or not you proceed." },
  ];
  return (
    <div>
      <Hero
        kick="Connect"
        title="Connect With Us."
        sub="Share a bit about your firm and what you're exploring with AI. Every conversation is confidential by default."
      />

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap" style={{ display: "grid", gap: "clamp(22px,3.5vw,40px)", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,330px),1fr))", alignItems: "start" }}>
          <div className="card rv" style={{ borderTop: "2px solid #2ec4a8" }}>
            {st === "ok" ? (
              <div style={{ display: "grid", gap: 10, padding: "10px 0" }}>
                <div className="kick teal">Received</div>
                <h3 className="h3">Your inquiry is in.</h3>
                <p className="body">Anthony reads every inquiry personally. Expect a reply within one business day.</p>
              </div>
            ) : (
            <fieldset disabled={st === "sending"} style={{ border: 0, padding: 0, margin: 0, display: "grid", gap: 16, opacity: st === "sending" ? .6 : 1 }}>
              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,140px),1fr))" }}>
                <div>
                  <label className="lbl" htmlFor="first">First name *</label>
                  <input id="first" className="input" value={f.first} onChange={set("first")} />
                </div>
                <div>
                  <label className="lbl" htmlFor="last">Last name *</label>
                  <input id="last" className="input" value={f.last} onChange={set("last")} />
                </div>
              </div>
              <div>
                <label className="lbl" htmlFor="email">Email *</label>
                <input id="email" className="input" type="email" value={f.email} onChange={set("email")} />
              </div>
              <div>
                <label className="lbl" htmlFor="firm">Firm / Organization</label>
                <input id="firm" className="input" value={f.firm} onChange={set("firm")} />
              </div>
              <div>
                <label className="lbl" htmlFor="interest">What are you exploring?</label>
                <select id="interest" className="sel" value={f.interest} onChange={set("interest")}>
                  {["Executive AI Briefing", "AI Readiness Diagnostic", "AI & SaaS Spend Diagnostic", "Governance & Compliance Bootcamp", "Hands-On Training (Ayvede Academy)", "The Ayvede Platform", "Risk & Security Workflows", "The Ayvede Retainer", "Innovation Lab Pilot", "Something else"].map((o) => (
                    <option key={o} value={o} style={{ background: "#161f30" }}>{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="lbl" htmlFor="msg">Message</label>
                <textarea id="msg" className="ta" value={f.message} onChange={set("message")} />
              </div>
              <button className="btn primary" style={{ width: "100%" }} onClick={send}>
                {st === "sending" ? "Sending..." : <>Send Inquiry <ArrowRight size={15} /></>}
              </button>
              {st === "invalid" && <FormNote kind="err">Add your first and last name and a valid email.</FormNote>}
              {st === "err" && (
                <FormNote kind="err">
                  That did not go through. Try again, or email <a href={`mailto:${EMAIL}`} style={{ color: "#ef4444", fontWeight: 600 }}>{EMAIL}</a> directly.
                </FormNote>
              )}
              <p className="small dim" style={{ textAlign: "center" }}>Goes straight to Anthony. Confidential by default.</p>
            </fieldset>
            )}
          </div>

          <div style={{ display: "grid", gap: 16 }}>
            <div className="card rv gh">
              <div className="kick" style={{ marginBottom: 12 }}>What Happens Next</div>
              <div style={{ display: "grid", gap: 16 }}>
                {NEXT.map((n) => (
                  <div key={n.n} style={{ display: "flex", gap: 14 }}>
                    <span className="stepN" style={{ marginTop: 2 }}>{n.n}</span>
                    <div>
                      <h3 className="h3" style={{ fontSize: "clamp(14px,1.6vw,15.5px)", marginBottom: 3 }}>{n.t}</h3>
                      <p className="small">{n.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card rv">
              <div className="kick teal" style={{ marginBottom: 12 }}>Direct</div>
              <a className="fLink" href={`mailto:${EMAIL}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#a8b4c6" }}><Mail size={14} color="#2ec4a8" /> {EMAIL}</a>
              <a className="fLink" href={`tel:${PHONE_TEL}`} style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#a8b4c6" }}><Phone size={14} color="#2ec4a8" /> {PHONE}</a>
              <hr className="rule" style={{ margin: "14px 0" }} />
              <p className="small" style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <ShieldCheck size={14} color="#c7a26b" style={{ flex: "none", marginTop: 2 }} />
                Confidential by default. An NDA is available before any detail about your firm is shared.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  ROOT
// ─────────────────────────────────────────────────────────────────

export default function AyvedeSite() {
  const [page, setPage] = useState("home");
  const [connectPreset, setConnectPreset] = useState(null);

  const go = (p, opts) => {
    setConnectPreset(opts && opts.interest ? opts.interest : null);
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    document.title = `Ayvede — ${TITLES[page] || "AI Advisory"}`;
  }, [page]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    const t = setTimeout(() => document.querySelectorAll(".rv:not(.in)").forEach((el) => io.observe(el)), 60);
    return () => { clearTimeout(t); io.disconnect(); };
  }, [page]);

  const PAGES = {
    home: <HomePage go={go} />,
    vision: <VisionPage go={go} />,
    solutions: <SolutionsPage go={go} />,
    programs: <ProgramsPage go={go} />,
    platform: <PlatformPage go={go} />,
    lab: <LabPage go={go} />,
    tools: <ToolsPage go={go} />,
    insights: <InsightsPage go={go} />,
    gallery: <GalleryPage go={go} />,
    connect: <ConnectPage preset={connectPreset} />,
  };

  return (
    <div className="av">
      <style>{CSS}</style>
      <Nav page={page} go={go} />
      <main>{PAGES[page] || PAGES.home}</main>
      <Footer go={go} />
    </div>
  );
}



