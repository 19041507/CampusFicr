import { GraduationCap, LockKeyhole, ShieldCheck } from "lucide-react";
import { LoginForm } from "@/components/AuthForms";
import { Card } from "@/components/Card";

export default function LoginPage() {
  return (
    <main className="grid min-h-[calc(100vh-82px)] place-items-center px-4 py-12">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-soft lg:grid-cols-[.9fr_1.1fr]">
        <div className="ficr-hero soft-grid hidden p-10 text-white lg:block">
          <span className="inline-flex rounded-2xl bg-white/15 p-3"><ShieldCheck /></span>
          <h1 className="mt-6 text-4xl font-black">Bem-vindo ao CampusFICR 360</h1>
          <p className="mt-4 leading-8 text-blue-50">Acesse mapa, achados e perdidos, feedbacks e painéis de forma segura.</p>
          <div className="mt-10 rounded-3xl bg-white/12 p-5 backdrop-blur"><p className="text-sm font-black uppercase tracking-wide text-sky-200">Dados de teste</p><p className="mt-2 text-sm text-blue-50">admin@campus.com, professor@campus.com ou aluno@campus.com</p><p className="mt-1 text-sm text-blue-50">Senha: 123456</p></div>
        </div>
        <Card className="rounded-none border-0 p-8 shadow-none md:p-12">
          <div className="mb-7 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><GraduationCap /></span>
            <h1 className="mt-4 text-3xl font-black text-blue-950">Entrar no sistema</h1>
            <p className="mt-2 text-sm font-medium text-slate-500">Use sua conta de aluno, professor ou admin.</p>
          </div>
          <LoginForm />
          <div className="mt-6 flex items-start gap-3 rounded-3xl bg-blue-50 p-4 text-sm text-blue-900"><LockKeyhole size={18}/><p><b>Ambiente acadêmico:</b> senha criptografada com bcryptjs e sessão por cookie.</p></div>
        </Card>
      </div>
    </main>
  );
}
