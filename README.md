# Clube do Livro — Módulo de Registro de Empréstimos (RF 03 & RF 06)

**Responsável pelo módulo:** Alexsandro (`alexsandropiragine-a11y`)  
**Stack:** Next.js (App Router), React, JavaScript, Tailwind CSS

## Funcionalidades Implementadas
- **RF 03 (Registro de Empréstimos):** Seleção exclusiva de exemplares disponíveis no acervo, vinculação a participantes cadastrados, registro do perfil responsável pela operação e atualização reativa da disponibilidade.
- **RF 06 (Controle de Datas):** Preenchimento automático da data de retirada, cálculo padrão de 7 dias corridos para devolução prevista, validação contra datas retroativas e listagem cronológica de retiradas ativas.
- **Persistência Local:** Armazenamento automático via `localStorage` com opção de restauração para os dados iniciais de demonstração.

## Estrutura de Arquivos para Integração (Arthur)
- `src/app/components/RegistroEmprestimo.jsx`: Componente principal isolado com formulário, validações e tabela de registros.
- `src/data/mockClube.js`: Estrutura simulada de livros (`RF 01`), participantes (`RF 02`) e empréstimos iniciais, pronta para ser conectada à fonte de dados unificada do grupo.
- `src/app/page.js`: Página de entrada exibindo o módulo.