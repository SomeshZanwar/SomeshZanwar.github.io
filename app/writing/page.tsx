import type { Metadata } from "next";
import Link from "next/link";
import Row from "@/components/Row";
import { posts } from "@/lib/content";

export const metadata: Metadata = { title: "Notebook", description: "Short notes on things that broke while building trust checks for data and agents." };

export default function Writing() {
  return (
    <>
      <section className="cs-head">
        <p className="mono">Notebook</p>
        <h1 style={{ marginTop: ".8rem" }}>Notes from the mess</h1>
        <p className="lead" style={{ fontSize: "1.2rem" }}>Short pieces about specific things that went wrong while building. No predictions.</p>
      </section>
      <Row label="Posts" wide>
        <div className="post-list">
          {posts.map((p) => (
            <Link key={p.slug} href={`/writing/${p.slug}/`}>
              <span className="t">{p.title}</span>
              <span className="mono plain" style={{ display: "block" }}>{p.date}</span>
              <span style={{ display: "block", color: "var(--muted)", fontSize: "1rem" }}>{p.dek}</span>
            </Link>
          ))}
        </div>
      </Row>
    </>
  );
}
