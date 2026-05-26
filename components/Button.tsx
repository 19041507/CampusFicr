import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const styles = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
  secondary: "bg-white text-slate-800 hover:bg-slate-100 border border-slate-200",
  danger: "bg-orange-600 text-white hover:bg-orange-700",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100"
};

type Variant = keyof typeof styles;

type ButtonProps = ComponentProps<"button"> & { variant?: Variant };
export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`} {...props} />;
}

export function ButtonLink({ href, children, className = "", variant = "primary" }: { href: string; children: ReactNode; className?: string; variant?: Variant }) {
  return <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}>{children}</Link>;
}
