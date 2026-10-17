import type { ReactNode } from "react";

export default function Row({
  label,
  sub,
  children,
  wide,
  id,
}: {
  label: string;
  sub?: string;
  children: ReactNode;
  wide?: boolean;
  id?: string;
}) {
  return (
    <section className="row" id={id}>
      <div className="margin">
        <span className="mono k">{label}</span>
        {sub && <span className="mono plain">{sub}</span>}
      </div>
      <div className={wide ? "body wide" : "body"}>{children}</div>
    </section>
  );
}
