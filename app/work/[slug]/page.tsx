import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Row from "@/components/Row";
import { caseStudies } from "@/lib/content";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  return c ? { title: c.title, description: c.summary } : {};
}

export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = caseStudies.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const c = caseStudies[i];
  const prev = caseStudies[i - 1];
  const next = caseStudies[i + 1];

  return (
    <>
      <section className="cs-head">
        <p className="mono"><Link href="/work/">Work</Link> / {c.n}</p>
        <h1 style={{ marginTop: ".8rem" }}>{c.title}</h1>
        <p className="cs-q">{c.question}</p>
      </section>

      <Row label="Summary">
        <p>{c.summary}</p>
        <p className="mono plain">{c.period} · {c.status}</p>
        <div className="tags" style={{ marginTop: ".8rem" }}>{c.stack.map((s) => <span className="tag" key={s}>{s}</span>)}</div>
        <ul className="linklist" style={{ marginTop: "1.1rem" }}>
          {c.links.map((l) => (
            <li key={l.href}><a href={l.href}>{l.label} ↗</a></li>
          ))}
        </ul>
      </Row>

      <Row label="How it flows" sub="One request or record, start to finish">
        <ol className="flow" style={{ listStyle: "none", padding: 0 }}>
          {c.flow.map((f) => (
            <li key={f.label}><strong>{f.label}</strong><span>{f.note}</span></li>
          ))}
        </ol>
      </Row>

      <Row label="What I built">
        <ul className="plainlist">{c.built.map((b) => <li key={b}>{b}</li>)}</ul>
      </Row>

      <Row label="Decisions" sub="What I chose, what I passed on, why">
        {c.decisions.map((d) => (
          <div className="decision" key={d.choice}>
            <div className="c">{d.choice}</div>
            <div className="o">over: {d.over}</div>
            <p>{d.why}</p>
          </div>
        ))}
      </Row>

      {c.broke.length > 0 && (
        <Row label="What broke">
          <div className="broke">
            {c.broke.map((b) => (
              <div key={b.title} style={{ marginBottom: "1.6rem" }}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </Row>
      )}

      <Row label="Real vs simulated" sub="What this does and does not show">
        <div className="note-box">{c.realVsSimulated}</div>
      </Row>

      <Row label="Next">
        <ul className="plainlist">{c.next.map((n) => <li key={n}>{n}</li>)}</ul>
      </Row>

      <nav className="pager" aria-label="More work">
        {prev ? <Link href={`/work/${prev.slug}/`}>← {prev.title}</Link> : <span />}
        {next ? <Link href={`/work/${next.slug}/`}>{next.title} →</Link> : <span />}
      </nav>
    </>
  );
}
