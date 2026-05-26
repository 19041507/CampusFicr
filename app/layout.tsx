import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = { title: "Campus Fácil 360", description: "Mapa, achados e perdidos e feedback acadêmico em uma única plataforma." };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR"><body><Navbar />{children}</body></html>;
}
