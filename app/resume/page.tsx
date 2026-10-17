import type { Metadata } from "next";
import { site } from "@/lib/content";
import { asset } from "@/lib/path";

export const metadata: Metadata = { title: "Resume", description: "Resume of Somesh Zanwar: M.S. Data Science candidate, December 2026." };

const R = ({ left, right }: { left: string; right: string }) => (
  <div className="rrow"><span>{left}</span><span style={{ fontWeight: 400 }}>{right}</span></div>
);

export default function Resume() {
  return (
    <div className="resume" style={{ maxWidth: "50rem", padding: "3rem 0 4rem" }}>
      <div className="noprint" style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
        <p className="mono" style={{ margin: 0 }}>Resume</p>
        <a className="btn" href={asset("/Somesh_Zanwar_Resume.pdf")}>Download PDF</a>
      </div>

      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>SOMESH ZANWAR</h1>
      <p className="mono plain" style={{ textAlign: "center", marginTop: ".4rem" }}>
        {site.location} · {site.email} · linkedin.com/in/someshzanwar · github.com/SomeshZanwar
      </p>

      <h2>Summary</h2>
      <p style={{ fontSize: "1rem" }}>
        M.S. Data Science candidate graduating December 2026 with professional experience in data analytics and hands-on work across AI/ML, analytics engineering, automation, API-backed applications, and agent governance. Experienced in Python, SQL, data validation, reporting automation, machine-learning evaluation, experimentation, and building production-minded systems with testing, controls, auditability, and technical documentation.
      </p>

      <h2>Education</h2>
      <R left="The University of Texas at Arlington · M.S. Data Science · GPA 3.67/4.00" right="Jan 2025 – Dec 2026" />
      <R left="Savitribai Phule Pune University · B.E. Artificial Intelligence and Machine Learning · GPA 8.2/10" right="Aug 2020 – May 2024" />

      <h2>Skills</h2>
      <ul>
        <li><strong>Programming & data:</strong> Python, SQL, pandas, NumPy, PostgreSQL, dbt, Excel, data transformation, validation, feature engineering</li>
        <li><strong>AI & analytics:</strong> scikit-learn, XGBoost, classification, cross-validation, model evaluation, A/B testing, hypothesis testing, SHAP/LIME</li>
        <li><strong>Engineering:</strong> FastAPI, SQLAlchemy, REST/JSON APIs, Docker, Git/GitHub, CI/CD, pytest, Streamlit</li>
        <li><strong>BI & delivery:</strong> Power BI, Tableau, KPI analysis, requirements gathering, stakeholder reporting, technical documentation, Agile/Scrum</li>
      </ul>

      <h2>Experience</h2>
      <R left="Junior Data Analyst · IVS Software Solutions · Pune, India" right="Sep 2022 – Sep 2024" />
      <ul>
        <li>Analyzed 80,000–150,000 operational records per cycle using SQL and Python; improved reporting accuracy by 30% through validation, reconciliation, and discrepancy resolution.</li>
        <li>Automated recurring reporting workflows, saving 4–6 hours per cycle; optimized SQL joins and incremental loads to reduce data-preparation time by 40%.</li>
        <li>Collaborated with three internal teams on Power BI dashboards, KPI definitions, reusable datasets, and recurring reports.</li>
        <li>Documented metric definitions, transformation logic, validation procedures, and discrepancy resolutions to improve consistency and maintainability of recurring reporting.</li>
      </ul>

      <h2>Projects</h2>
      <R left="UTA OIT Intelligent IT Ticket Routing · Data Science Capstone" right="Sep 2026 – Present" />
      <ul>
        <li>Developing a data-driven workflow with UTA's Office of Information Technology to analyze incoming support tickets and improve routing to appropriate service teams.</li>
        <li>Applying Python-based data preparation, text/feature analysis, model evaluation, and reproducible engineering practices within a real operational support workflow.</li>
      </ul>
      <R left="MetricTrust Control Plane · Python, FastAPI, SQLAlchemy, pytest" right="Aug 2026" />
      <ul>
        <li>Built an evidence-bound execution control layer for autonomous analytics agents, enforcing policy at the action boundary; used signed permits and explicit authorization evidence for consequential actions.</li>
        <li>Implemented 21 automated tests covering policy logic, permit validation, and HTTP behavior; designed reviewable failure paths so unauthorized or insufficiently supported actions are blocked before execution.</li>
      </ul>
      <R left="DataTrust OS · Python, PostgreSQL, dbt, Streamlit" right="May 2026 – Jun 2026" />
      <ul>
        <li>Built an operational data-trust system with 12 automated quality checks, incident lifecycle tracking, downstream lineage, automated CI validation, and trust reporting.</li>
        <li>Connected data-quality failures to downstream impact and supporting evidence, turning failed checks into reviewable incidents rather than allowing invalid data to propagate silently.</li>
      </ul>
      <R left="Decision Intelligence Experimentation Platform · PostgreSQL, dbt, Python" right="Mar 2026 – May 2026" />
      <ul>
        <li>Built an experimentation workflow over 50,000 simulated users and 280,000+ events, calculating conversion lift, p-values, confidence intervals, and segmented results.</li>
        <li>Translated statistical evidence into rollout recommendations, connecting experiment results and segment behavior to practical product decisions.</li>
      </ul>

      <h2>Open source</h2>
      <ul>
        <li>Microsoft Agent Governance Toolkit: 5 merged PRs spanning policy/data-quality integration, a dbt evidence adapter, AgentMesh scaffolding, and tutorial/documentation fixes.</li>
        <li>AgentTrust / A2A CTEF: contributions across verifier enforcement, RAG scan states, runtime support, identity documentation, and agentic-security evidence; proposed a data-quality trust scheme with three conformance vectors.</li>
      </ul>
    </div>
  );
}
