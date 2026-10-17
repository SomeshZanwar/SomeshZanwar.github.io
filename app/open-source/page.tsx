import type { Metadata } from "next";
import Row from "@/components/Row";
import { openSource } from "@/lib/content";

export const metadata: Metadata = { title: "Open source", description: "Contributions to agent governance projects, with merged code kept separate from issues and discussion." };

export default function OpenSource() {
  const { agt, agentrust, a2a } = openSource;
  return (
    <>
      <section className="cs-head">
        <p className="mono">Open source</p>
        <h1 style={{ marginTop: ".8rem" }}>Agent governance, in public</h1>
        <p className="lead" style={{ fontSize: "1.2rem" }}>
          Merged code, issue reports and discussion are different things, so they are separated here and labelled as what they are.
        </p>
      </section>

      <Row label="Merged code" sub="Public pull requests">
        <h2>{agt.title}</h2>
        <p>{agt.summary}</p>
        {agt.prs.map((p) => (
          <div className="item-block" key={p.n}>
            <h3>
              <a href={`https://github.com/microsoft/agent-governance-toolkit/pull/${p.n}`}>#{p.n}</a> · {p.title}
            </h3>
            <p>{p.note}</p>
          </div>
        ))}
        <p className="note-box" style={{ marginTop: "1.2rem" }}>{agt.boundary}</p>
      </Row>

      <Row label="Issue reports" sub="Written contributions, not merged code">
        <h2>{agentrust.title}</h2>
        <p>{agentrust.summary}</p>
        {agentrust.items.map((p) => (
          <div className="item-block" key={p.href}>
            <h3><a href={p.href}>{p.repo} #{p.n}</a></h3>
            <p>{p.note}</p>
          </div>
        ))}
      </Row>

      <Row label="Proposals" sub="Standards work">
        <h2>{a2a.title}</h2>
        <p>{a2a.summary}</p>
        {a2a.items.map((p) => (
          <div className="item-block" key={p.href}>
            <h3><a href={p.href}>{p.label}</a></h3>
            <p>{p.note}</p>
          </div>
        ))}
      </Row>
    </>
  );
}
