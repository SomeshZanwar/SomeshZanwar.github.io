"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  ["/work/", "Work"],
  ["/open-source/", "Open source"],
  ["/experience/", "Experience"],
  ["/writing/", "Notebook"],
  ["/now/", "Now"],
  ["/resume/", "Resume"],
] as const;

export default function Nav() {
  const path = usePathname() || "/";
  return (
    <header className="frame">
      <div className="topbar">
        <Link href="/" className="brand">
          Somesh Zanwar<span>.</span>
        </Link>
        <nav className="nav" aria-label="Main">
          {items.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path.startsWith(href) ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
