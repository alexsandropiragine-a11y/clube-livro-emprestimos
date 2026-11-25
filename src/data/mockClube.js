export const livrosIniciais = [
  {
    id: "liv-01",
    titulo: "O Senhor dos Anéis: A Sociedade do Anel",
    autor: "J.R.R. Tolkien",
    disponivel: true,
  },
  {
    id: "liv-02",
    titulo: "1984",
    autor: "George Orwell",
    disponivel: true,
  },
  {
    id: "liv-03",
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    disponivel: false,
  },
  {
    id: "liv-04",
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    disponivel: true,
  },
  {
    id: "liv-05",
    titulo: "Duna",
    autor: "Frank Herbert",
    disponivel: true,
  },
];

export const participantesIniciais = [
  {
    id: "part-01",
    nome: "Ana Clara Souza",
    email: "ana.souza@email.com",
    perfil: "Participante",
  },
  {
    id: "part-02",
    nome: "Carlos Eduardo Lima",
    email: "carlos.lima@email.com",
    perfil: "Participante",
  },
  {
    id: "part-03",
    nome: "Mariana Costa (Admin)",
    email: "mariana.admin@clubedolivro.com",
    perfil: "Administrador",
  },
  {
    id: "part-04",
    nome: "Rafael Oliveira",
    email: "rafael.oliveira@email.com",
    perfil: "Participante",
  },
];

export const emprestimosIniciais = [
  {
    id: "emp-101",
    livroId: "liv-03",
    livroTitulo: "Dom Casmurro",
    participanteId: "part-01",
    participanteNome: "Ana Clara Souza",
    dataRetirada: "2026-11-18",
    dataPrevistaDevolucao: "2026-11-25",
    status: "Ativo",
  },
];