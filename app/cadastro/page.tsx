import { RegisterForm } from "@/components/AuthForms";
import { Card } from "@/components/Card";
export default function CadastroPage() { return <main className="grid min-h-[calc(100vh-73px)] place-items-center px-4 py-12"><Card className="w-full max-w-lg"><h1 className="text-center text-3xl font-black">Criar cadastro</h1><p className="mb-6 mt-2 text-center text-sm text-slate-500">Cadastro simples com senha criptografada no banco.</p><RegisterForm /></Card></main>; }
