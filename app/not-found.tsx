import Link from "next/link";

export default function NotFound() {
  return (
    <section className="hero">
      <p className="mono">404</p>
      <h1>That page failed its check.</h1>
      <p className="lead"><Link href="/">Back to the start</Link></p>
    </section>
  );
}
