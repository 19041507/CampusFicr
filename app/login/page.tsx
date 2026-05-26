import { GraduationCap, LockKeyhole, ShieldCheck, Sparkles } from "lucide-react";
import { LoginForm } from "@/components/AuthForms";

export default function LoginPage() {
  return (
    <main className="auth-bg grid min-h-[calc(100vh-82px)] place-items-center px-4 py-10">
      <div className="auth-card grid w-full max-w-5xl lg:grid-cols-[.95fr_1.05fr]">
        <section className="auth-side">
          <span className="inline-flex rounded-2xl bg-white/15 p-3 text-white"><ShieldCheck /></span>
          <h1 className="mt-6 text-4xl font-black leading-tight">CampusFICR 360</h1>
          <p className="mt-4 leading-8">Entre para acessar mapa inteligente, achados e perdidos e Professor Radar em um painel azul e branco.</p>
          <div className="mt-8 grid gap-3">
            <div className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
              <p className="flex items-center gap-2 font-black text-white"><Sparkles size={18}/>Sua experiência no campus começa aqui.</p>
              <p className="mt-2 text-sm">Acesse sua conta e continue sua jornada no CampusFICR 360.</p>
            </div>
          </div>
        </section>
        <section className="auth-form-panel">
          <div className="mb-7 text-center">
            <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><GraduationCap /></span>
            <h2 className="mt-4 text-3xl font-black text-blue-950">Entrar no sistema</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">Use sua conta de aluno, professor ou admin.</p>
          </div>
          <LoginForm />
          <div className="mt-6 flex items-start gap-3 rounded-3xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950"><LockKeyhole size={18}/><p><b>Ambiente acadêmico:</b> senha criptografada com bcryptjs e sessão por cookie.</p></div>
        </section>
      </div>
    </main>
  );
}
