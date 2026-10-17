import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Row from "@/components/Row";
import { posts } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.dek } : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = posts.find((x) => x.slug === slug);
  if (!p) notFound();
  return (
    <>
      <section className="cs-head">
        <p className="mono"><Link href="/writing/">Notebook</Link> / {p.date}</p>
        <h1 style={{ marginTop: ".8rem" }}>{p.title}</h1>
        <p className="cs-q">{p.dek}</p>
      </section>
      <Row label="Note">
        <div className="post">{p.body.map((t) => <p key={t}>{t}</p>)}</div>
      </Row>
    </>
  );
}
