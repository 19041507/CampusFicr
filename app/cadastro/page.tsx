import { GraduationCap, ShieldCheck, UserPlus } from "lucide-react";
import { RegisterForm } from "@/components/AuthForms";

export default function CadastroPage() {
  return (
    <main className="auth-bg grid min-h-[calc(100vh-82px)] place-items-center px-4 py-10">
      <div className="auth-card grid w-full max-w-5xl lg:grid-cols-[.9fr_1.1fr]">
        <section className="auth-side">
          <span className="inline-flex rounded-2xl bg-white/15 p-3 text-white"><GraduationCap /></span>
          <h1 className="mt-6 text-4xl font-black leading-tight">Crie sua conta FICR</h1>
          <p className="mt-4 leading-8">Cadastro simples para aluno, professor ou administração. Depois do login, cada perfil entra direto na área correta.</p>
          <div className="mt-8 rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
            <p className="flex items-center gap-2 font-black text-white"><ShieldCheck size={18}/> Padrão visual azul e branco</p>
            <p className="mt-2 text-sm">Interface mais limpa, com bom contraste e preparada para uso na Vercel.</p>
          </div>
        </section>
        <section className="auth-form-panel">
          <div className="mb-7 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><UserPlus /></span>
            <h2 className="mt-4 text-3xl font-black text-blue-950">Criar cadastro</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">Escolha seu perfil e acesse automaticamente a área correta.</p>
          </div>
          <RegisterForm />
        </section>
      </div>
    </main>
  );
}
