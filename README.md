# Clube do Livro — Parte de Registro de Empréstimos (RF 03 e RF 06)

**Quem fez esta parte:** Alexsandro (`alexsandropiragine-a11y`)  
**Ferramentas usadas:** Next.js (App Router), React, JavaScript, Tailwind CSS

## O que foi feito
- **RF 03 (Registro de Empréstimos):** Deixa escolher só os livros que estão livres, ligar o livro ao leitor cadastrado, anotar quem fez o empréstimo e mudar na hora a situação do livro para ocupado.
- **RF 06 (Controle de Datas):** Coloca a data de saída sozinha, conta 7 dias para a data de entrega, não deixa colocar datas antigas e mostra a lista dos empréstimos que estão valendo.
- **Salvar no Navegador:** Salva tudo sozinho no `localStorage` para não apagar quando atualizar a página, e tem um botão para voltar tudo como era no começo.

## Onde está cada arquivo (Para juntar tudo - Marcelo)
- `src/app/components/RegistroEmprestimo.jsx`: Arquivo principal com a tela de cadastro, as regras de erro e a lista de empréstimos.
- `src/data/mockClube.js`: Dados de teste dos livros (`RF 01`), leitores (`RF 02`) e empréstimos do começo, prontos para serem trocados pelos dados oficiais do grupo.
- `src/app/page.js`: Tela inicial que mostra esta parte funcionando.
