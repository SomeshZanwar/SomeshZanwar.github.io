// All site content lives here. Edit this file, not the components.
// Rule for this file: every claim is either linkable or labelled as self-reported.

export const site = {
  name: "Somesh Zanwar",
  title: "Somesh Zanwar — Data, analytics engineering, AI governance",
  description:
    "Data analyst and analytics engineer building the checks that decide whether metrics, workflows and AI agents can be trusted. M.S. Data Science, UT Arlington, graduating December 2026.",
  email: "someshzanwar345@gmail.com",
  github: "https://github.com/SomeshZanwar",
  linkedin: "https://www.linkedin.com/in/someshzanwar/",
  location: "Arlington, TX",
  availability:
    "Graduating December 2026. Open to full-time roles in data analytics, analytics engineering and AI / data governance. Based in Arlington, TX, open to relocation.",
  availabilityShort: "Open to full-time · Dec 2026 · Arlington, TX",
  oldSite: "https://someshzanwar.github.io/",
  updated: "October 2026",
};

export type Link = { label: string; href: string };

export type Decision = { choice: string; over: string; why: string };

export type CaseStudy = {
  slug: string;
  n: string;
  title: string;
  question: string;
  summary: string;
  period: string;
  status: string;
  stack: string[];
  links: Link[];
  flow: { label: string; note: string }[];
  built: string[];
  decisions: Decision[];
  broke: { title: string; body: string }[];
  realVsSimulated: string;
  next: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "metrictrust-control-plane",
    n: "01",
    title: "MetricTrust Control Plane",
    question:
      "An analytics agent wants to roll an experiment from 20% to 50%. Is that specific action backed by evidence that is current, tested and approved right now?",
    summary:
      "An execution control layer that sits between an analytics agent and the systems it wants to change. It does not ask whether the agent may call a tool. It asks whether this action is justified by the current dbt results, the metric's approval status and the agent's authority, and only then issues a signed, single-use permit.",
    period: "Aug 2026",
    status: "Working, tested, live demo",
    stack: ["Python", "FastAPI", "SQLAlchemy", "dbt Core", "DuckDB", "PyJWT (RS256)", "pytest"],
    links: [
      { label: "Repository", href: "https://github.com/SomeshZanwar/metrictrust-control-plane" },
      { label: "Live demo", href: "https://metrictrust-control-plane.onrender.com/" },
      { label: "API docs", href: "https://metrictrust-control-plane.onrender.com/docs" },
    ],
    flow: [
      { label: "Agent proposes", note: "agent, action, resource, parameters" },
      { label: "Evidence broker", note: "parses real dbt manifest and run results, hashes the bundle" },
      { label: "Policy engine", note: "YAML rules, forbid first, fail closed: DENY, REQUIRE_APPROVAL or PERMIT" },
      { label: "Approval", note: "durable state machine; evidence re-verified after a human says yes" },
      { label: "Signed permit", note: "RS256 token, short TTL, single use" },
      { label: "Protected executor", note: "the only component with write access; guardrail breach triggers rollback" },
    ],
    built: [
      "An evidence broker that reads the manifest and run results dbt actually produces, queries the fact table directly and hashes the exact rows a decision rests on.",
      "A deterministic policy engine in YAML. Forbid rules are checked first, and anything the engine cannot decide is denied.",
      "A database-backed approval workflow (PENDING, APPROVED, DENIED, EXPIRED) that survives restarts, and re-checks the evidence hash after a human approves and before the permit is issued.",
      "Signed permits that bind the action, the parameters hash, the evidence bundle hash, the metric definition hash and the dataset snapshot. The executor accepts nothing from the agent directly.",
      "21 pytest tests covering policy branches, permit tampering, expiry and audience checks, and a full HTTP walkthrough: propose, approve, execute, replay rejected, audit reconstructed.",
    ],
    decisions: [
      {
        choice: "A small YAML rule engine",
        over: "Cedar",
        why: "The rule shape (principal, action, resource, context, forbid and permit) is a straight port, so swapping in Cedar later is a policy-file change, not a rewrite. It also removed a toolchain I did not need for a solo build.",
      },
      {
        choice: "Per-agent API keys and RS256-signed permits",
        over: "SPIFFE/SPIRE workload identity",
        why: "I kept the cryptography that matters, real signing and single-use nonces, without standing up an identity server for a one-person project.",
      },
      {
        choice: "A database state machine for approvals",
        over: "Temporal",
        why: "Same contract, same restart behaviour, one fewer service to operate.",
      },
      {
        choice: "Not implementing TEE attestation or the Microsoft AGT dependency",
        over: "Faking them",
        why: "Both were preview-stage. The README says so and points to the roadmap instead of simulating something it does not do.",
      },
      {
        choice: "Keeping evidence as separate fields",
        over: "One composite trust score",
        why: "A single number hides which part of the evidence moved. The permit needs to say what it was bound to.",
      },
    ],
    broke: [
      {
        title: "The approval check that failed on every approval",
        body: "The evidence hash originally included source freshness in minutes, which changes with wall-clock time. So the hash changed between an agent proposing an action and a human approving it a few seconds later, and the stale-approval check I had built tripped on every approval, not only on genuinely stale ones. The fix was separating what identifies evidence (the dbt run, the dataset snapshot, the test results) from what gates it live (freshness against a policy threshold, checked fresh every time and never hashed). I had not thought about that distinction clearly until a failing test forced it.",
      },
      {
        title: "A one-second permit that lived five hours",
        body: "Permit expiry was computed from a naive datetime's .timestamp(), which assumes local time. On a host five hours behind UTC, a permit with a one-second lifetime did not expire for five hours. A test called test_expired_permit_is_rejected caught it. Inspection did not.",
      },
    ],
    realVsSimulated:
      "The dbt project is real (dbt Core and DuckDB) and the evidence broker parses the artifacts it produces. The permits are real RS256 JWTs verified against a real public key, with single-use enforcement at the database layer. What is scoped down is the infrastructure around it, listed in the decisions above. The experiment data is a small seeded dataset.",
    next: [
      "Replace the YAML engine with Cedar behind the same policy files.",
      "Move agent identity from static keys to workload identity.",
      "Add hardware attestation once the tooling is out of preview.",
    ],
  },
  {
    slug: "datatrust-os",
    n: "02",
    title: "DataTrust OS",
    question: "Is this revenue metric safe to use before anyone acts on it, and if not, what is it standing on?",
    summary:
      "A governance-aware analytics system where the metric table carries its own reliability context. dbt test results become a trust score, failed tests become incidents with a lifecycle, and a policy decides whether the metric is allowed, usable with caution, or blocked.",
    period: "May – Jun 2026",
    status: "Public repo, CI on every push",
    stack: ["Python", "PostgreSQL", "dbt", "Streamlit", "pytest", "GitHub Actions"],
    links: [{ label: "Repository", href: "https://github.com/SomeshZanwar/Datatrust-OS" }],
    flow: [
      { label: "NYC TLC taxi data", note: "raw.yellow_trips in PostgreSQL" },
      { label: "dbt staging + tests", note: "12 governance tests on the staging model" },
      { label: "Trust scoring", note: "stored per run, so trust has a history" },
      { label: "Incidents", note: "failed tests become incidents; recurring ones update, not duplicate" },
      { label: "Governance-aware mart", note: "trust_score and open_incident_count sit next to total_revenue" },
      { label: "Policy + blast radius", note: "BLOCKED > USE_WITH_CAUTION > ALLOWED, plus downstream impact" },
    ],
    built: [
      "Twelve dbt tests on the staging model covering null critical fields, negative fares, impossible timestamps and records outside the file's month.",
      "A trust score computed from dbt results and stored in PostgreSQL per run, so the dashboard can show a trend instead of a snapshot.",
      "Incidents as first-class records with severity, status and detected, last-seen and resolved timestamps.",
      "A mart that does not only expose revenue. It exposes trust_score, trust_label, open_incident_count and data_reliability_status in the same table.",
      "YAML policies with precedence, lineage blast-radius analysis, rule-generated incident briefs, a Streamlit command center and Python tests running in CI.",
    ],
    decisions: [
      {
        choice: "Keeping the known failing tests failing",
        over: "Cleaning the data until everything passes",
        why: "The project exists to show how a governance system behaves when the data is bad. Current example: 9 of 12 tests pass, trust score 0.725 (DEGRADED), and the revenue mart comes out BLOCKED.",
      },
      {
        choice: "Putting reliability columns inside the business mart",
        over: "A separate governance dashboard",
        why: "An analyst should not have to know a second tool exists to find out the revenue number is unsafe.",
      },
      {
        choice: "Updating a recurring incident",
        over: "Opening a new one each run",
        why: "Otherwise a single bad file produces a pile of duplicates and the incident count stops meaning anything.",
      },
    ],
    broke: [],
    realVsSimulated:
      "The data is real public NYC taxi data. The failures are real too: 3 impossible timestamps, 25,049 negative-fare rows and 48 pickups outside the file month. The policies and thresholds are mine, not an organisation's.",
    next: ["Planned improvements are written up in the repository's roadmap document."],
  },
  {
    slug: "decision-intelligence-experimentation-platform",
    n: "03",
    title: "Decision Intelligence Experimentation Platform",
    question:
      "A p-value of 0.012 on an 8.3% lift looks like a ship. Who exactly are you shipping to?",
    summary:
      "An A/B test pipeline that goes from raw events to a coded SHIP, DO NOT SHIP or INCONCLUSIVE decision, with segment breakdowns that show where the experiment worked and where it did not.",
    period: "Mar – May 2026",
    status: "Public repo, live simulator",
    stack: ["Python", "PostgreSQL", "dbt", "SciPy", "pandas", "Streamlit"],
    links: [
      { label: "Repository", href: "https://github.com/SomeshZanwar/Decision-Intelligence-Experimentation-Platform" },
      { label: "Live simulator", href: "https://experiment-decision-simulator.streamlit.app/" },
    ],
    flow: [
      { label: "Simulated events", note: "50,000 users, 280K+ events, 3.8K+ orders" },
      { label: "PostgreSQL", note: "control and treatment separated at ingestion" },
      { label: "dbt models", note: "staging, intermediate, marts; conversion, AOV, segment tables" },
      { label: "Statistical engine", note: "z-test, lift, p-value, confidence interval" },
      { label: "Segment analysis", note: "platform by country" },
      { label: "Decision", note: "coded rule, then a dashboard for a non-technical reader" },
    ],
    built: [
      "A simulation of 50,000 users assigned to control and treatment, producing 280K+ events and 3.8K+ orders across platforms and countries.",
      "dbt staging, intermediate and mart models, including an experiment-level base table and conversion, average order value and segment metrics.",
      "A z-test for conversion with lift, p-value and confidence interval, feeding a decision rule that is written in code rather than interpreted by eye.",
      "Segment analysis by platform and country that produces a plain-English recommendation on who to ship to first.",
    ],
    decisions: [
      {
        choice: "Stopping at a decision, not a p-value",
        over: "A significance readout",
        why: "Significance answers whether the result is real. The rollout question is who it works for. In the example output the aggregate says SHIP (control 8.4%, treatment 9.1%, +8.3% lift, p = 0.012), while iOS users in the US show +14.2% and Android users in India show -3.1%.",
      },
      {
        choice: "Decision logic in code",
        over: "Analyst judgement per run",
        why: "A rule can be reviewed, tested and argued with. A judgement call made on a Tuesday cannot.",
      },
    ],
    broke: [],
    realVsSimulated:
      "The data is simulated, so this demonstrates the decision layer, not a finding about a real product. The example numbers above come from the simulator's sample output.",
    next: [
      "Variance reduction (CUPED) for faster readouts.",
      "Sample-size and minimum-detectable-effect calculator.",
      "An experiment registry to stop overlapping tests.",
      "Alerts when a guardrail metric is breached.",
    ],
  },
  {
    slug: "data-quality-aware-agent-governance",
    n: "04",
    title: "Data Quality-Aware Agent Governance",
    question:
      "An agent is authorised to query a dataset. That morning three dbt tests failed on it. Who tells the policy engine?",
    summary:
      "A prototype that makes agent authorisation and data trustworthiness one decision. A request passes an identity check, an agent policy check built on Microsoft's Agent Governance Toolkit, and a data quality check, and the outcome goes to a single audit log.",
    period: "2026",
    status: "Public repo, live demo, upstreamed to AGT",
    stack: ["Python", "Microsoft Agent Governance Toolkit", "YAML policy", "pytest"],
    links: [
      { label: "Repository", href: "https://github.com/SomeshZanwar/Data-Quality-Aware-Agent-Governance" },
      { label: "Live demo", href: "https://agent-governance-simulator.streamlit.app/" },
      { label: "AGT example (PR #2224)", href: "https://github.com/microsoft/agent-governance-toolkit/pull/2224" },
      { label: "dbt adapter (PR #2278)", href: "https://github.com/microsoft/agent-governance-toolkit/pull/2278" },
    ],
    flow: [
      { label: "Request", note: "agent, action, dataset" },
      { label: "Layer 0: identity", note: "is this agent registered?" },
      { label: "Layer 1: agent policy", note: "AGT PolicyEngine: is it allowed to act?" },
      { label: "Layer 2: data quality", note: "freshness, quality score, failed tests" },
      { label: "Decision + audit", note: "typed GovernanceDecision, one JSON audit trail" },
    ],
    built: [
      "A three-layer check where any failure blocks the request and records why, with no fallback.",
      "Five demo scenarios covering all three failure modes and two clean passes. In one, a registered, authorised agent is still blocked because the dataset was last validated 26 hours ago against a 12-hour threshold and two tests failed.",
      "Blocked decisions that name the data owner, so the requester knows who to contact.",
      "Tests for each layer, a reproducible demo output and an architecture note.",
    ],
    decisions: [
      {
        choice: "Instantiating the policy engine once at module load",
        over: "Per request",
        why: "Creating it registers the custom rules. Doing that on every call would be reloading a ruleset on every transaction.",
      },
      {
        choice: "A typed GovernanceDecision for every outcome",
        over: "Different return shapes per layer",
        why: "The contract stays explicit whichever layer stopped the request.",
      },
    ],
    broke: [],
    realVsSimulated:
      "This is a prototype. The data quality registry is simulated in Python and the agent identity store is a hard-coded dict. A production version would read dbt results or a data catalog and use a real identity provider. The pattern was contributed upstream to AGT as an example and an adapter. It did not change AGT's core policy engine.",
    next: ["Read dbt artifacts directly, which the AGT adapter in PR #2278 starts to do."],
  },
  {
    slug: "metric-decomposition-engine",
    n: "05",
    title: "Metric Decomposition Engine",
    question: "DAU dropped 12% on Monday. Why?",
    summary:
      "Takes an event metric across two periods, breaks the change down by dimension, ranks each segment's share of the movement and writes a plain-English incident report. It automates the most common ad-hoc request a product analyst gets.",
    period: "2026",
    status: "Public repo, live demo",
    stack: ["Python", "PostgreSQL", "pandas", "SQLAlchemy", "Streamlit", "Jinja2"],
    links: [
      { label: "Repository", href: "https://github.com/SomeshZanwar/Metric-Decomposition-Engine" },
      { label: "Live demo", href: "https://metric-change-investigator.streamlit.app/" },
    ],
    flow: [
      { label: "GitHub Archive", note: "hourly public GitHub events" },
      { label: "PostgreSQL", note: "events loaded by a Python pipeline" },
      { label: "Dimensional split", note: "actor, repository, organisation" },
      { label: "Contribution ranking", note: "each segment's change as a share of the total change" },
      { label: "Incident report", note: "summary, breakdown, root-cause hypothesis, next steps" },
    ],
    built: [
      "A decomposition engine that compares a baseline and a comparison period and groups the change by each dimension.",
      "Contribution ranking: absolute change per segment, expressed as a percentage of the total change, with the largest named as the root-cause hypothesis.",
      "A report generator that turns the ranking into an executive summary and next steps a stakeholder can read.",
      "A Streamlit app so the same analysis is a tool someone can run, not a script.",
    ],
    decisions: [
      {
        choice: "Real GitHub Archive data",
        over: "Synthetic data",
        why: "Real scale and mess, and known events such as outages work as natural test cases.",
      },
    ],
    broke: [
      {
        title: "Segments that exist in only one period",
        body: "The calculation is simple. The edge cases were not: segments that appear in only one of the two periods, and dimensions with very high cardinality, both needed deliberate handling. The report taught me the harder part of the work is translating a ranking into something a non-technical reader can act on.",
      },
    ],
    realVsSimulated:
      "The data is real. The sample report in the README is labelled illustrative. The engine compares two points in time and does not test whether a segment's change is statistically significant.",
    next: [
      "Time-series decomposition instead of two-point comparison.",
      "Significance testing at segment level.",
      "Anomaly detection to trigger an investigation without picking dates by hand.",
    ],
  },
  {
    slug: "ai-data-governance-platform",
    n: "06",
    title: "AI Data Governance Platform",
    question: "When a dataset quietly breaks, how long until someone notices, and can the system say why?",
    summary:
      "A monitoring platform for analytics data: rules run against modelled datasets, failures become incidents, each dataset gets a health score, and an LLM script turns a technical failure into an explanation an analyst can read. The earlier project that the agent-governance work grew out of.",
    period: "2026",
    status: "Public repo, live demo",
    stack: ["Python", "PostgreSQL", "dbt", "Power BI", "OpenAI API"],
    links: [
      { label: "Repository", href: "https://github.com/SomeshZanwar/AI-Data-Governance-Platform" },
      { label: "Live demo", href: "https://data-reliability-control-center.streamlit.app/" },
    ],
    flow: [
      { label: "GitHub Archive", note: "ingested with Python" },
      { label: "PostgreSQL", note: "raw storage plus governance metadata tables" },
      { label: "dbt", note: "fact and dimension models: commits, pull requests, issues, repository, user, date" },
      { label: "Rule engine", note: "duplicate and null checks, foreign keys; outcomes logged" },
      { label: "Health score + incidents", note: "1 - failed rules / total rules" },
      { label: "Explanation + Power BI", note: "LLM-written incident notes, monitoring dashboard" },
    ],
    built: [
      "A governance metadata layer: dataset_registry, rule_catalog, rule_runs, dataset_health_scores and incidents.",
      "A Python rule runner with example rules such as duplicate commit SHAs, null commits, foreign key validation and duplicate issues.",
      "A health score per dataset, health_score = 1 - failed_rules / total_rules, so unstable datasets are easy to find.",
      "Incidents generated automatically from rule failures, with severity, status and timestamps, and a Power BI dashboard over them.",
    ],
    decisions: [
      {
        choice: "Treating datasets like production services",
        over: "Fixing quality problems in the dashboard layer",
        why: "By the time a dashboard shows a wrong number, the damage is already downstream. Detection belongs next to the data.",
      },
    ],
    broke: [],
    realVsSimulated:
      "The data is GitHub Archive events. The health score is a simple ratio and does not weight rules by severity. Orchestration, alerting and a data catalog integration are listed as future work, not built.",
    next: [
      "Orchestration with Airflow or Dagster.",
      "Alerting to Slack or email.",
      "Severity-weighted health scores.",
    ],
  },
];

export const ledger = [
  {
    claim: "5 merged pull requests in Microsoft's Agent Governance Toolkit",
    proof: [
      { label: "#1818", href: "https://github.com/microsoft/agent-governance-toolkit/pull/1818" },
      { label: "#2038", href: "https://github.com/microsoft/agent-governance-toolkit/pull/2038" },
      { label: "#2114", href: "https://github.com/microsoft/agent-governance-toolkit/pull/2114" },
      { label: "#2224", href: "https://github.com/microsoft/agent-governance-toolkit/pull/2224" },
      { label: "#2278", href: "https://github.com/microsoft/agent-governance-toolkit/pull/2278" },
    ],
    status: "Public record",
  },
  {
    claim: "An agent-control layer with signed single-use permits and 21 passing tests",
    proof: [
      { label: "Repo", href: "https://github.com/SomeshZanwar/metrictrust-control-plane" },
      { label: "Live demo", href: "https://metrictrust-control-plane.onrender.com/" },
    ],
    status: "Runs live",
  },
  {
    claim: "An A/B readout where the aggregate says ship and two segments disagree",
    proof: [{ label: "Simulator", href: "https://experiment-decision-simulator.streamlit.app/" }],
    status: "Runs live",
  },
  {
    claim: "Improved reporting accuracy by 30% at IVS through validation and reconciliation",
    proof: [{ label: "Resume", href: "/resume/" }],
    status: "Self-reported",
  },
];

export const aboutLines = [
  "I came into data work as an analyst. At IVS Software Solutions I reconciled operational records, defined KPIs with three teams and automated recurring reports. That is where I started caring less about the chart and more about whether the number under it could be defended.",
  "Since then I have been building the checks that answer that question: data quality tests that become trust scores, trust scores that become incidents, and policies that decide whether a metric, or an AI agent acting on it, is allowed to proceed.",
  "I am finishing an M.S. in Data Science at UT Arlington in December 2026, and I contribute to open-source agent governance work alongside it.",
];

export const experience = [
  {
    role: "Junior Data Analyst",
    org: "IVS Software Solutions",
    place: "Pune, India",
    period: "Sep 2022 – Sep 2024",
    note: "Figures below are from my resume and self-reported. Employer data is not public.",
    points: [
      "Analyzed 80,000–150,000 operational records per reporting cycle with SQL and Python. Validation, reconciliation and discrepancy resolution improved reporting accuracy by 30%.",
      "Automated recurring reporting, saving 4–6 hours per cycle, and optimized SQL joins and incremental loads, cutting data-preparation time by 40%.",
      "Worked with three internal teams on Power BI dashboards, KPI definitions, reusable datasets and recurring reports.",
      "Documented metric definitions, transformation logic, validation procedures and discrepancy resolutions so recurring reports stayed consistent.",
    ],
  },
];

export const education = [
  {
    school: "The University of Texas at Arlington",
    degree: "M.S. Data Science",
    period: "Jan 2025 – Dec 2026",
    detail: "GPA 3.67 / 4.00. Capstone with UTA's Office of Information Technology (in progress, private).",
  },
  {
    school: "Savitribai Phule Pune University",
    degree: "B.E. Artificial Intelligence and Machine Learning",
    period: "Aug 2020 – May 2024",
    detail: "GPA 8.2 / 10.",
  },
];

export const openSource = {
  agt: {
    title: "Microsoft Agent Governance Toolkit",
    summary: "Five merged pull requests, moving from fixing what I found broken to contributing a pattern.",
    prs: [
      {
        n: 1818,
        title: "Data quality-aware governance adopter entry",
        note: "Listed my Data Quality-Aware Agent Governance project in the adopters directory.",
      },
      {
        n: 2038,
        title: "Agent SRE tutorial fixes",
        note: "Fixed Windows Unicode rendering and an outdated ChaosLibrary API call in the tutorial.",
      },
      {
        n: 2114,
        title: "AgentMesh quickstart scaffolding fixes",
        note: "Repaired quickstart commands, generated scaffold dependencies and client initialization.",
      },
      {
        n: 2224,
        title: "Data quality-aware governance example",
        note: "An example combining agent authorization with data quality checks to allow or block an action.",
      },
      {
        n: 2278,
        title: "dbt-backed data quality evidence adapter",
        note: "Extended the example with a dbt results adapter, typed quality evidence and synthetic scenarios.",
      },
    ],
    boundary:
      "These are examples, docs and an adapter. I did not change AGT's core policy engine.",
  },
  agentrust: {
    title: "AgentTrust",
    summary:
      "Issue reports and spec reviews against the AgentTrust repositories. These are written contributions, not merged code, and closing an issue does not mean my proposed change shipped.",
    items: [
      {
        repo: "cmcp",
        n: 324,
        href: "https://github.com/agentrust-io/cmcp/issues/324",
        note: "Reproduced a mismatch where the runtime allowed software-only development-mode claims and the JSON schema rejected them.",
      },
      {
        repo: "trace-spec",
        n: 29,
        href: "https://github.com/agentrust-io/trace-spec/issues/29",
        note: "Proposed an OWASP Agentic AI Top 10 crosswalk separating what TRACE can verify from what it cannot establish.",
      },
      {
        repo: "agent-manifest",
        n: 153,
        href: "https://github.com/agentrust-io/agent-manifest/issues/153",
        note: "Found missing verifier enforcement for RAG corpus poisoning-scan states, including flagged and not-scanned.",
      },
      {
        repo: "agent-manifest",
        n: 151,
        href: "https://github.com/agentrust-io/agent-manifest/issues/151",
        note: "Flagged human-in-the-loop approval examples that used SPIFFE workload identifiers for human approvers.",
      },
    ],
  },
  a2a: {
    title: "A2A (Agent2Agent protocol)",
    summary: "A proposal and a discussion contribution. Neither is a merged change.",
    items: [
      {
        label: "Issue #1835 · open",
        href: "https://github.com/a2aproject/A2A/issues/1835",
        note: "Proposed a vendor-neutral, documentation-only enterprise governance and production-readiness checklist: identity, authorization, delegation, auditability, tenant isolation, monitoring and incident response.",
      },
      {
        label: "CTEF discussion #1786",
        href: "https://github.com/a2aproject/A2A/issues/1786",
        note: "Contributed thinking on binding data-quality evidence to agent handoffs through a snapshot hash and the CTEF source_version mechanism.",
      },
    ],
  },
};

export const experiments = [
  {
    name: "UTA OIT capstone",
    tag: "In progress · private",
    body: "A data science capstone with UTA's Office of Information Technology on intelligent IT ticket routing. Private, so no data or figures here. The part I find interesting is the gap between an assignment-group snapshot and who actually resolved a ticket.",
  },
  {
    name: "ProofLayer",
    tag: "Exploratory",
    body: "A concept for AI data governance. Labelled exploratory because it is: an idea I am testing, not a finished project.",
  },
  {
    name: "Ambient agent",
    tag: "Exploring",
    body: "The ambient-agent pattern, an agent that watches and acts without being prompted, built with LangGraph, Groq, SQLite and Streamlit.",
  },
  {
    name: "Credential Bridge",
    tag: "Startup plan",
    body: "A founder's plan for a platform helping internationally educated nurses through the Texas licensure pathway. A plan with verified regulatory steps and a confidence tag on each rule, not a product.",
  },
];

export const skills = [
  {
    area: "Querying and modelling",
    items: "SQL, PostgreSQL, dbt, DuckDB",
    where:
      "Every project above. dbt models and tests are the evidence source in MetricTrust and DataTrust OS. SQL join and incremental-load tuning cut preparation time by 40% at IVS.",
  },
  {
    area: "Analysis and experimentation",
    items: "Python, pandas, NumPy, SciPy, A/B testing, hypothesis testing",
    where: "Decision Intelligence Experimentation Platform (z-test, lift, confidence intervals, segment analysis) and Metric Decomposition Engine.",
  },
  {
    area: "BI and reporting",
    items: "Power BI, Tableau, KPI definition, stakeholder reporting",
    where: "Power BI governance dashboard on the AI Data Governance Platform. Dashboards and KPI definitions with three teams at IVS.",
  },
  {
    area: "Services and testing",
    items: "FastAPI, SQLAlchemy, pytest, Docker, Git, CI",
    where: "MetricTrust Control Plane (21 tests, signed permits) and DataTrust OS (Python tests in GitHub Actions).",
  },
  {
    area: "Machine learning",
    items: "scikit-learn, XGBoost, SHAP / LIME, cross-validation",
    where: "Coursework and the in-progress capstone. Not the centre of my public projects, so I have not dressed it up as one.",
  },
  {
    area: "Governance and trust",
    items: "Data quality checks, lineage, policy controls, audit evidence",
    where: "DataTrust OS, Data Quality-Aware Agent Governance and the AGT contributions.",
  },
];

export type Post = {
  slug: string;
  title: string;
  date: string;
  dek: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "the-aggregate-said-ship",
    title: "The aggregate said ship",
    date: "2026-10",
    dek: "A significant p-value is where an experiment readout usually stops. It is where the rollout question starts.",
    body: [
      "In the experiment simulator I built, the headline result is clean. Control converts at 8.4%, treatment at 9.1%, an 8.3% lift, p-value 0.012. Most readouts end there with the word ship.",
      "The harder part is not the test. It is that the lift is not spread evenly. In the sample output, iOS users in the US show +14.2%. Android users in India show -3.1%. The aggregate is a weighted average of a good result and a bad one, and shipping to everyone means shipping the bad one too.",
      "So I stopped treating significance as the output. The engine produces a decision, SHIP, DO NOT SHIP or INCONCLUSIVE, from a rule that lives in code, and then it breaks the result by platform and country and says who to ship to first.",
      "One caveat I should be plain about: the data is simulated. This shows what the decision layer does, not a finding about a real product. A real experiment would also need a power calculation before the test, which is on my list and not built yet.",
      "I do not think the p-value is the problem. The problem is that it is often the last thing anyone computes, so it becomes the thing the decision is made on.",
    ],
  },
  {
    slug: "the-hash-that-changed-on-every-read",
    title: "The hash that changed on every read",
    date: "2026-10",
    dek: "A stale-approval check that fired on every approval, and what it taught me about what counts as evidence.",
    body: [
      "In MetricTrust, an agent proposes an action, a human approves it, and a permit is issued. Between the approval and the permit I re-check that the evidence has not moved, by comparing a hash of the evidence bundle.",
      "The check failed on every single approval. Not on stale ones. All of them.",
      "The bundle included how many minutes old the source data was. That number is a function of the clock, so the hash was different a few seconds later by definition. My safeguard against stale evidence was mostly detecting that time had passed.",
      "The fix was to split two things I had treated as one. What identifies the evidence: the dbt run, the dataset snapshot, the test results. Those only change when the data changes, so they go in the hash. What gates the evidence: freshness against a policy threshold. That is checked fresh on every evaluation and never hashed.",
      "I did not see that distinction until a failing test made me look. That is the part I would point to if someone asked what I learned from the project: not the permits or the signing, but that evidence has an identity and a condition, and they change at different speeds.",
    ],
  },
];
