import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = { title: "CampusFICR 360", description: "Mapa, achados e perdidos e feedback acadêmico em uma única plataforma." };

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="pt-BR"><body><Navbar />{children}</body></html>;
}
