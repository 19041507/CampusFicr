import { GraduationCap, LayoutDashboard, LogOut, MapPinned, Menu, Radar, Search, Shield, UserRound } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { logoutUser } from "@/lib/actions";
import { Button, ButtonLink } from "./Button";

export async function Navbar() {
  const user = await getCurrentUser();
  const links = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/mapa", label: "Mapa", icon: MapPinned },
    { href: "/achados-perdidos", label: "Achados", icon: Search },
    { href: "/feedback", label: "Radar", icon: Radar }
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-blue-100 bg-white/92 backdrop-blur-xl">
      <div className="h-2 bg-gradient-to-r from-blue-950 via-blue-700 to-sky-400" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-800 text-white shadow-lg shadow-blue-800/20"><GraduationCap size={23}/></span>
          <span className="leading-tight"><span className="block text-lg font-black text-blue-950">CampusFICR 360</span><span className="hidden text-[11px] font-black uppercase tracking-[0.16em] text-sky-600 sm:block">Faculdade conectada</span></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {user && links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-black text-slate-600 hover:bg-blue-50 hover:text-blue-800"><Icon size={16}/>{label}</Link>)}
          {user?.role === "TEACHER" && <Link href="/professor" className="rounded-2xl px-3 py-2 text-sm font-black text-slate-600 hover:bg-blue-50 hover:text-blue-800">Professor</Link>}
          {user?.role === "ADMIN" && <Link href="/admin" className="flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-black text-slate-600 hover:bg-blue-50 hover:text-blue-800"><Shield size={16}/>Admin</Link>}
        </nav>
        <div className="flex items-center gap-2">
          {user ? <>
            <span className="hidden items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-black text-blue-900 sm:flex"><UserRound size={16}/>{user.name}</span>
            <form action={logoutUser}><Button variant="ghost" className="px-3" aria-label="Sair"><LogOut size={17}/></Button></form>
            <Button variant="ghost" className="md:hidden" aria-label="Menu"><Menu size={18}/></Button>
          </> : <>
            <ButtonLink href="/login" variant="secondary">Entrar</ButtonLink>
            <ButtonLink href="/cadastro" className="hidden sm:inline-flex">Cadastro</ButtonLink>
          </>}
        </div>
      </div>
    </header>
  );
}
