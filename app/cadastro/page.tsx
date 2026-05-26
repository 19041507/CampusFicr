import { UserPlus } from "lucide-react";
import { RegisterForm } from "@/components/AuthForms";
import { Card } from "@/components/Card";

export default function CadastroPage() {
  return (
    <main className="grid min-h-[calc(100vh-82px)] place-items-center px-4 py-12">
      <Card className="w-full max-w-2xl p-7 md:p-9">
        <div className="mb-7 text-center">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-blue-700 text-white shadow-lg shadow-blue-700/20"><UserPlus /></span>
          <h1 className="mt-4 text-3xl font-black text-blue-950">Criar cadastro</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">Escolha seu perfil e acesse automaticamente a área correta.</p>
        </div>
        <RegisterForm />
      </Card>
    </main>
  );
}
