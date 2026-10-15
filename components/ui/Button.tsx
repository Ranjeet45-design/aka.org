import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "solid" | "ghost-light" | "dark" | "outline";

const Arrow = () => (
  <svg className="arrow" width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
    <path d="M0 5h16M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);

export function Button({
  href,
  variant = "solid",
  children,
  className = "",
  arrow = true,
}: {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
}) {
  const cls = `btn btn-${variant} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow />}
    </>
  );
  return /^(mailto:|tel:|https?:)/.test(href) ? (
    <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
