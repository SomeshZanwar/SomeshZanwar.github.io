import type { Metadata } from "next";
import Link from "next/link";
import Row from "@/components/Row";
import { caseStudies, experiments } from "@/lib/content";

export const metadata: Metadata = { title: "Work", description: "Six projects written up as decision trails: the question, the choices, what broke and what is real." };

export default function Work() {
  return (
    <>
      <section className="cs-head">
        <p className="mono">Selected work</p>
        <h1 style={{ marginTop: ".8rem" }}>Six projects, written as decision trails</h1>
        <p className="lead" style={{ fontSize: "1.2rem" }}>
          Each page starts with the question the project exists to answer, then covers what I built, the choices I made and rejected, what broke, and what is real versus simulated.
        </p>
      </section>
      <Row label="Projects" wide>
        <div className="index">
          {caseStudies.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}/`} className="item">
              <span className="num">{c.n}</span>
              <span>
                <span className="t">{c.title} <span className="arrow">→</span></span>
                <span className="q" style={{ display: "block" }}>{c.question}</span>
              </span>
              <span className="mono plain meta">{c.period} · {c.status}</span>
            </Link>
          ))}
        </div>
      </Row>
      <Row label="Experiments" sub="Labelled for what they are">
        {experiments.map((e) => (
          <div className="item-block" key={e.name}>
            <h3>{e.name}</h3>
            <span className="mono">{e.tag}</span>
            <p>{e.body}</p>
          </div>
        ))}
      </Row>
    </>
  );
}
