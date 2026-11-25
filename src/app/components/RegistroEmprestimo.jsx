"use client";

import { useState } from "react";
import {
  livrosIniciais,
  participantesIniciais,
  emprestimosIniciais,
} from "../../data/mockClube";

// Função auxiliar para somar dias a uma data no formato YYYY-MM-DD
function calcularDataDevolucao(dataBase, diasPrazo = 7) {
  if (!dataBase) return "";
  const [ano, mes, dia] = dataBase.split("-").map(Number);
  const data = new Date(ano, mes - 1, dia);
  data.setDate(data.getDate() + diasPrazo);

  const anoFormatado = data.getFullYear();
  const mesFormatado = String(data.getMonth() + 1).padStart(2, "0");
  const diaFormatado = String(data.getDate()).padStart(2, "0");
  return `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
}

// Formata YYYY-MM-DD para o padrão brasileiro DD/MM/AAAA na exibição
function formatarDataBR(dataISO) {
  if (!dataISO) return "-";
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}

export default function RegistroEmprestimo() {
  const hojeISO = new Date().toISOString().split("T")[0];

  // Estados principais do módulo (prontos para serem substituídos por props/contexto na integração)
  const [livros, setLivros] = useState(livrosIniciais);
  const [participantes] = useState(participantesIniciais);
  const [emprestimos, setEmprestimos] = useState(emprestimosIniciais);

  // Estados controlados do formulário
  const [livroSelecionadoId, setLivroSelecionadoId] = useState("");
  const [participanteSelecionadoId, setParticipanteSelecionadoId] = useState("");
  const [dataRetirada, setDataRetirada] = useState(hojeISO);
  const [dataPrevistaDevolucao, setDataPrevistaDevolucao] = useState(
    calcularDataDevolucao(hojeISO, 7)
  );
  const [responsavelRegistro, setResponsavelRegistro] = useState("Administrador");
  const [feedback, setFeedback] = useState({ tipo: "", mensagem: "" });

  // Filtra apenas livros disponíveis para retirada (RF 03)
  const livrosDisponiveis = livros.filter((livro) => livro.disponivel);

  // Atualiza automaticamente a previsão de devolução quando a data de retirada muda
  function handleMudancaDataRetirada(novaData) {
    setDataRetirada(novaData);
    setDataPrevistaDevolucao(calcularDataDevolucao(novaData, 7));
  }

  function handleRegistrarEmprestimo(e) {
    e.preventDefault();
    setFeedback({ tipo: "", mensagem: "" });

    // Validações de regra de negócio
    if (!livroSelecionadoId || !participanteSelecionadoId) {
      setFeedback({
        tipo: "erro",
        mensagem: "Selecione um livro disponível e um participante antes de confirmar.",
      });
      return;
    }

    if (!dataRetirada || !dataPrevistaDevolucao) {
      setFeedback({
        tipo: "erro",
        mensagem: "Preencha as datas de retirada e de previsão de devolução.",
      });
      return;
    }

    if (dataPrevistaDevolucao < dataRetirada) {
      setFeedback({
        tipo: "erro",
        mensagem: "A data de devolução não pode ser anterior à data de retirada.",
      });
      return;
    }

    const livroEscolhido = livros.find((l) => l.id === livroSelecionadoId);
    const participanteEscolhido = participantes.find(
      (p) => p.id === participanteSelecionadoId
    );

    if (!livroEscolhido || !participanteEscolhido) return;

    // Monta o registro do novo empréstimo (RF 03 e RF 06)
    const novoEmprestimo = {
      id: `emp-${Date.now().toString().slice(-4)}`,
      livroId: livroEscolhido.id,
      livroTitulo: livroEscolhido.titulo,
      participanteId: participanteEscolhido.id,
      participanteNome: participanteEscolhido.nome,
      dataRetirada,
      dataPrevistaDevolucao,
      registradoPor: responsavelRegistro,
      status: "Ativo",
    };

    // 1. Adiciona o empréstimo no topo do histórico
    setEmprestimos((listaAtual) => [novoEmprestimo, ...listaAtual]);

    // 2. Atualiza a disponibilidade do livro no acervo
    setLivros((acervoAtual) =>
      acervoAtual.map((livro) =>
        livro.id === livroEscolhido.id ? { ...livro, disponivel: false } : livro
      )
    );

    // 3. Limpa os campos de seleção e exibe confirmação clara
    setLivroSelecionadoId("");
    setParticipanteSelecionadoId("");
    setFeedback({
      tipo: "sucesso",
      mensagem: `Empréstimo de "${livroEscolhido.titulo}" registrado para ${participanteEscolhido.nome}!`,
    });
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Cartão do Formulário de Registro */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 md:p-8">
        <div className="border-b border-slate-100 pb-4 mb-6">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md mb-2">
            Módulo de Circulação • RF 03 & RF 06
          </span>
          <h2 className="text-xl font-bold text-slate-800">
            Registrar Retirada de Livro
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Selecione um exemplar disponível no acervo, vincule ao membro do clube e defina o prazo de devolução.
          </p>
        </div>

        {feedback.mensagem && (
          <div
            className={`mb-6 p-4 rounded-lg text-sm font-medium border ${
              feedback.tipo === "sucesso"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {feedback.mensagem}
          </div>
        )}

        <form onSubmit={handleRegistrarEmprestimo} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Seleção de Livro Disponível */}
            <div>
              <label
                htmlFor="livro"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Livro Disponível ({livrosDisponiveis.length} no acervo)
              </label>
              <select
                id="livro"
                value={livroSelecionadoId}
                onChange={(e) => setLivroSelecionadoId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">-- Selecione um livro --</option>
                {livrosDisponiveis.map((livro) => (
                  <option key={livro.id} value={livro.id}>
                    {livro.titulo} — {livro.autor}
                  </option>
                ))}
              </select>
            </div>

            {/* Seleção de Participante */}
            <div>
              <label
                htmlFor="participante"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Participante / Leitor
              </label>
              <select
                id="participante"
                value={participanteSelecionadoId}
                onChange={(e) => setParticipanteSelecionadoId(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="">-- Selecione o membro --</option>
                {participantes.map((pessoa) => (
                  <option key={pessoa.id} value={pessoa.id}>
                    {pessoa.nome} ({pessoa.perfil})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Controle de Datas e Perfil de Operação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label
                htmlFor="dataRetirada"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Data de Retirada
              </label>
              <input
                id="dataRetirada"
                type="date"
                value={dataRetirada}
                onChange={(e) => handleMudancaDataRetirada(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="dataDevolucao"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Previsão de Devolução
              </label>
              <input
                id="dataDevolucao"
                type="date"
                value={dataPrevistaDevolucao}
                min={dataRetirada}
                onChange={(e) => setDataPrevistaDevolucao(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="responsavel"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Registrado por
              </label>
              <select
                id="responsavel"
                value={responsavelRegistro}
                onChange={(e) => setResponsavelRegistro(e.target.value)}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              >
                <option value="Administrador">Administrador</option>
                <option value="Participante (Autoatendimento)">
                  Participante (Autoatendimento)
                </option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Prazo padrão calculado automaticamente: 7 dias corridos.
            </span>
            <button
              type="submit"
              disabled={livrosDisponiveis.length === 0}
              className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              Confirmar Empréstimo
            </button>
          </div>
        </form>
      </section>

      {/* Listagem dos Empréstimos Registrados (RF 06) */}
      <section className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">
              Empréstimos Registrados
            </h3>
            <p className="text-xs text-slate-500">
              Controle ativo de retiradas e prazos para acompanhamento de devolução
            </p>
          </div>
          <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-full">
            {emprestimos.length} {emprestimos.length === 1 ? "registro" : "registros"}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-xs uppercase tracking-wider border-b border-slate-200">
                <th className="py-3 px-6 font-semibold">Livro</th>
                <th className="py-3 px-6 font-semibold">Participante</th>
                <th className="py-3 px-6 font-semibold">Retirada</th>
                <th className="py-3 px-6 font-semibold">Devolução Prevista</th>
                <th className="py-3 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {emprestimos.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-6 font-medium text-slate-900">
                    {item.livroTitulo}
                  </td>
                  <td className="py-3.5 px-6">{item.participanteNome}</td>
                  <td className="py-3.5 px-6">{formatarDataBR(item.dataRetirada)}</td>
                  <td className="py-3.5 px-6 font-medium text-indigo-700">
                    {formatarDataBR(item.dataPrevistaDevolucao)}
                  </td>
                  <td className="py-3.5 px-6">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}