"use client";
import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./Button";

export function SubmitButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return <Button type="submit" disabled={pending} className={className}>{pending ? "Carregando..." : children}</Button>;
}
