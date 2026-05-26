import { GraduationCap, LayoutDashboard, LogOut, MapPinned, Search, Shield, Star, UserRound } from "lucide-react";
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
    { href: "/feedback", label: "Feedback", icon: Star }
  ];
  return <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
    <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
      <Link href="/" className="flex items-center gap-2 font-black text-slate-900"><span className="rounded-2xl bg-blue-600 p-2 text-white"><GraduationCap size={20}/></span> CampusFICR 360</Link>
      <nav className="hidden items-center gap-1 md:flex">
        {user && links.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Icon size={16}/>{label}</Link>)}
        {user?.role === "TEACHER" && <Link href="/professor" className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Professor</Link>}
        {user?.role === "ADMIN" && <Link href="/admin" className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100"><Shield size={16}/>Admin</Link>}
      </nav>
      <div className="flex items-center gap-2">
        {user ? <><span className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700 sm:flex"><UserRound size={16}/>{user.name}</span><form action={logoutUser}><Button variant="ghost" className="px-3"><LogOut size={17}/></Button></form></> : <><ButtonLink href="/login" variant="secondary">Login</ButtonLink><ButtonLink href="/cadastro" className="hidden sm:inline-flex">Cadastro</ButtonLink></>}
      </div>
    </div>
  </header>;
}
