import RegistroEmprestimo from "@/app/components/RegistroEmprestimo";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <h1 className="text-2xl font-extrabold text-slate-900">
          Clube do Livro — Gestão de Empréstimos
        </h1>
        <p className="text-sm text-slate-600">
          Sistema de controle de retiradas e prazos de devolução
        </p>
      </div>

      <RegistroEmprestimo />
    </main>
  );
}