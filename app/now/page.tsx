import type { Metadata } from "next";
import Row from "@/components/Row";
import { site } from "@/lib/content";

export const metadata: Metadata = { title: "Now", description: "What I am working on and what I am looking for." };

export default function Now() {
  return (
    <>
      <section className="cs-head">
        <p className="mono">Now · updated {site.updated}</p>
        <h1 style={{ marginTop: ".8rem" }}>What I am doing this fall</h1>
      </section>
      <Row label="Working on">
        <ul className="plainlist">
          <li>A data science capstone with UTA's Office of Information Technology on intelligent IT ticket routing. It is private, so I will not write about the data here.</li>
          <li>Open-source work in agent governance: an open A2A proposal for an enterprise production-readiness checklist, and ongoing contributions around the Agent Governance Toolkit.</li>
          <li>Finishing the M.S. in Data Science in December 2026.</li>
        </ul>
      </Row>
      <Row label="Looking for">
        <p>{site.availability}</p>
        <p>The roles I am most interested in are ones where someone has to decide whether a number, a pipeline or an automated action can be relied on, and where that check is part of the job rather than an afterthought.</p>
      </Row>
      <Row label="Reach me">
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </Row>
    </>
  );
}
