import { ArrowRight, CheckCircle2, MapPinned, QrCode, Radar, SearchCheck, ShieldCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/Button";
import { Card } from "@/components/Card";

const features = [
  { title: "Mapa inteligente", icon: MapPinned, text: "Localize biblioteca, secretaria, laboratórios e salas por busca, bloco/setor e QR Code." },
  { title: "Achados e perdidos", icon: SearchCheck, text: "Cadastre objetos perdidos ou encontrados com status, contato e filtros rápidos." },
  { title: "Professor Radar", icon: Radar, text: "Feedback anônimo com métricas úteis para melhorar ritmo, clareza e exemplos das aulas." }
];

const steps = ["Escaneie um QR Code no campus", "Abra a rota do local", "Encontre serviços ou registre solicitações"];

export default function Home() {
  return (
    <main className="overflow-hidden">
      <section className="ficr-hero soft-grid relative px-4 py-16 text-white md:py-24">
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-50/95 to-transparent" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-black backdrop-blur"><ShieldCheck size={16}/> Plataforma acadêmica azul e branco</span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">CampusFICR 360</h1>
            <p className="mt-4 max-w-2xl text-2xl font-black text-blue-50">Um campus mais fácil de navegar, recuperar objetos e melhorar aulas.</p>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-50/90">Dashboard profissional para alunos, professores e administração, com navegação simples e pronto para rodar na Vercel.</p>
            <div className="mt-8 flex flex-wrap gap-3"><ButtonLink href="/login" variant="secondary">Entrar no sistema <ArrowRight size={17}/></ButtonLink><ButtonLink href="/cadastro" className="bg-blue-950 hover:bg-blue-900">Criar conta</ButtonLink></div>
          </div>
          <Card className="border-white/20 bg-white/95 p-4 text-slate-900">
            <div className="rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-white p-5">
              <div className="flex items-center justify-between gap-4">
                <div><p className="eyebrow">Visão geral</p><h2 className="mt-2 text-2xl font-black text-blue-950">Central do aluno</h2></div>
                <span className="rounded-2xl bg-blue-700 p-3 text-white"><Sparkles /></span>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {features.map(({ title, icon: Icon }) => <div key={title} className="rounded-3xl border border-blue-100 bg-white p-4 text-center shadow-sm"><Icon className="mx-auto text-blue-700"/><p className="mt-2 text-sm font-black text-blue-950">{title}</p></div>)}
              </div>
              <div className="mt-5 rounded-3xl bg-blue-950 p-5 text-white">
                <div className="flex items-center gap-3"><QrCode className="text-sky-300"/><div><p className="font-black">QR Code por local</p><p className="text-sm text-blue-100">Ideal para placas na FICR.</p></div></div>
                <div className="mt-4 grid gap-2">
                  {steps.map((step, index) => <div key={step} className="flex items-center gap-3 rounded-2xl bg-white/10 p-3"><span className="grid h-7 w-7 place-items-center rounded-full bg-sky-400 text-xs font-black text-blue-950">{index + 1}</span><span className="text-sm font-bold">{step}</span></div>)}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
      <section className="page-shell">
        <div className="mb-8 max-w-3xl"><p className="eyebrow">Funcionalidades</p><h2 className="section-title mt-2">Tudo que o aluno usa em uma tela simples</h2><p className="mt-3 leading-7 text-slate-600">A proposta é reduzir dúvidas no campus, agilizar achados e perdidos e transformar feedbacks em dados para professores.</p></div>
        <div className="grid gap-5 md:grid-cols-3">{features.map(({ title, text, icon: Icon }) => <Card key={title} className="transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><span className="inline-flex rounded-2xl bg-blue-700 p-3 text-white"><Icon /></span><h3 className="mt-4 text-xl font-black text-blue-950">{title}</h3><p className="mt-2 leading-7 text-slate-600">{text}</p><div className="mt-5 flex items-center gap-2 text-sm font-black text-blue-700"><CheckCircle2 size={16}/> Pronto para uso real</div></Card>)}</div>
      </section>
    </main>
  );
}
