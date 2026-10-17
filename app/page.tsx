import Link from "next/link";
import Row from "@/components/Row";
import { aboutLines, caseStudies, ledger, site } from "@/lib/content";
import { asset } from "@/lib/path";

export default function Home() {
  return (
    <>
      <section className="hero">
        <p className="mono" style={{ marginBottom: "1.4rem" }}>Somesh Zanwar · Data, analytics engineering, AI governance</p>
        <h1>
          Can this metric, workflow, or AI agent be <em>trusted</em> enough to make a decision?
        </h1>
        <p className="lead">
          I build the checks that answer that: data quality tests that become trust scores, policies that gate agents, and experiment readouts that say who to ship to. I finish an M.S. in Data Science at UT Arlington in December 2026.
        </p>
        <span className="avail">{site.availabilityShort}</span>
      </section>

      <Row label="Claims" sub="and where to check them">
        <p>
          Every claim on this site is either linked to something public or marked as self-reported. This is the short version.
        </p>
        <table className="ledger">
          <thead>
            <tr><th>Claim</th><th>Check it</th><th>Status</th></tr>
          </thead>
          <tbody>
            {ledger.map((l) => (
              <tr key={l.claim}>
                <td className="claim">{l.claim}</td>
                <td>
                  <div className="pills">
                    {l.proof.map((p) =>
                      p.href.startsWith("/") ? (
                        <Link key={p.label} href={p.href}>{p.label}</Link>
                      ) : (
                        <a key={p.label} href={p.href}>{p.label}</a>
                      )
                    )}
                  </div>
                </td>
                <td>
                  <span className={`status ${l.status === "Self-reported" ? "self" : ""}`}>{l.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>

      <Row label="Selected work" sub="Six projects, each as a decision trail" wide>
        <div className="index">
          {caseStudies.map((c) => (
            <Link key={c.slug} href={`/work/${c.slug}/`} className="item">
              <span className="num">{c.n}</span>
              <span>
                <span className="t">{c.title} <span className="arrow">→</span></span>
                <span className="q" style={{ display: "block" }}>{c.question}</span>
              </span>
              <span className="mono plain meta">{c.period} · {c.stack.slice(0, 4).join(", ")}</span>
            </Link>
          ))}
        </div>
      </Row>

      <Row label="About">
        {aboutLines.map((l) => (
          <p key={l}>{l}</p>
        ))}
        <p>
          <Link href="/experience/">Experience and education</Link> · <Link href="/open-source/">Open source</Link> · <a href={asset("/Somesh_Zanwar_Resume.pdf")}>Resume (PDF)</a>
        </p>
      </Row>
    </>
  );
}
