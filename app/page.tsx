import { ArrowRight, MapPinned, Radar, SearchCheck, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";

const features = [
  { title: "Mapa Inteligente", icon: MapPinned, text: "Locais do campus organizados por bloco, andar e QR Code para acesso rápido." },
  { title: "Achados e Perdidos", icon: SearchCheck, text: "Cadastre objetos perdidos ou encontrados e filtre por status, categoria e local." },
  { title: "Professor Radar", icon: Radar, text: "Feedback anônimo das aulas com dados úteis para professores melhorarem o ensino." }
];

export default function Home() {
  return <main className="overflow-hidden">
    <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-slate-950 px-4 py-20 text-white">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_25%),radial-gradient(circle_at_80%_0%,white,transparent_20%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold backdrop-blur"><ShieldCheck size={16}/> Projeto acadêmico pronto para Vercel</span>
          <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">Campus Fácil 360: a faculdade mais simples de navegar, encontrar e melhorar.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">Uma plataforma web que integra mapa com QR Code, achados e perdidos e feedback anônimo das aulas em um dashboard moderno.</p>
          <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/login" variant="secondary">Entrar agora <ArrowRight size={17}/></ButtonLink><ButtonLink href="/cadastro" className="bg-slate-950 hover:bg-slate-800">Criar conta</ButtonLink></div>
        </div>
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur">
          <div className="rounded-[1.5rem] bg-white p-5 text-slate-900">
            <div className="grid gap-3 sm:grid-cols-2"><Card className="shadow-none"><p className="text-sm font-bold text-slate-500">Locais úteis</p><p className="mt-2 text-3xl font-black">12+</p></Card><Card className="shadow-none"><p className="text-sm font-bold text-slate-500">Feedbacks</p><p className="mt-2 text-3xl font-black">Anônimos</p></Card></div>
            <div className="mt-4 rounded-3xl bg-slate-50 p-4"><div className="grid grid-cols-3 gap-3 text-center text-xs font-bold text-slate-600"><span className="rounded-2xl bg-blue-100 p-5">Bloco A</span><span className="rounded-2xl bg-emerald-100 p-5">Cantina</span><span className="rounded-2xl bg-violet-100 p-5">Lab 1</span></div></div>
          </div>
        </div>
      </div>
    </section>
    <section className="mx-auto max-w-7xl px-4 py-14"><div className="grid gap-5 md:grid-cols-3">{features.map(({ title, text, icon: Icon }) => <Card key={title}><span className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600"><Icon /></span><h2 className="mt-4 text-xl font-black">{title}</h2><p className="mt-2 leading-7 text-slate-600">{text}</p></Card>)}</div></section>
  </main>;
}
