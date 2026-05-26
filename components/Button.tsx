import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

const styles = {
  primary: "bg-blue-700 text-white hover:bg-blue-800 shadow-lg shadow-blue-700/20",
  secondary: "border border-blue-100 bg-white text-blue-800 hover:border-blue-200 hover:bg-blue-50",
  danger: "bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20",
  ghost: "bg-transparent text-slate-600 hover:bg-blue-50 hover:text-blue-800"
};

type Variant = keyof typeof styles;
type ButtonProps = ComponentProps<"button"> & { variant?: Variant };

export function Button({ className = "", variant = "primary", ...props }: ButtonProps) {
  return <button className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${className}`} {...props} />;
}

export function ButtonLink({ href, children, className = "", variant = "primary" }: { href: string; children: ReactNode; className?: string; variant?: Variant }) {
  return <Link href={href} className={`inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-black transition ${styles[variant]} ${className}`}>{children}</Link>;
}
