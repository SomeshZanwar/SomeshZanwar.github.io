import { site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="frame">
      <div className="footer">
        <p className="big">If you have a metric, workflow or agent you are not sure you can trust, I would like to hear about it.</p>
        <div className="links">
          <a href={`mailto:${site.email}`}>{site.email}</a>
          <a href={site.linkedin}>LinkedIn</a>
          <a href={site.github}>GitHub</a>
        </div>
        <p className="mono plain">
          {site.availabilityShort} · Updated {site.updated}
        </p>
      </div>
    </footer>
  );
}
