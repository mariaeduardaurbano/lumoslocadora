let filmes = JSON.parse(localStorage.getItem("filmes")) || [];

document.addEventListener("DOMContentLoaded", renderizarTabela());

function abrirModal() {
  document.getElementById("modal").style.display = "block";
}

function fecharModal() {
  document.getElementById("modal").style.display = "none";
  limparCampos();
}

function salvarFilme() {
  const capa = document.getElementById("capa").value.trim();
  const genero = document.getElementById("genero").value.trim();
  const nome = document.getElementById("nome").value.trim();
  const ano = document.getElementById("ano").value;
  const classificacao = document.getElementById("classificacao").value.trim();
  const produtora = document.getElementById("produtora").value.trim();

  if (!genero || !nome) {
    alert("Insira Nome e Genêro para continuar!");
    return;
  }

  const novoFilme = {
    id: Date.now(),
    capa,
    nome,
    genero,
    ano,
    classificacao,
    produtora
  };

  filmes.push(novoFilme);
  atualizarLocalStorage();
  renderizarTabela();
  fecharModal();
}

function renderizarTabela() {
  const tabela = document.getElementById("dados");
  tabela.innerHTML = "";

  filmes.forEach((filmes) => {
    tabela.innerHTML += `
        <tr>
            <td><img src="${filmes.capa}" width=60"></td>
            <td>${filmes.nome}</td>
            <td>${filmes.genero}</td>
            <td>${filmes.ano}</td>
            <td>${filmes.classificacao}</td>
            <td>${filmes.produtora}</td>
            <td>
            <button onclick="excluirfilmes(${filmes.id})">Excluir</button>
            </td>
            </tr>
        `;
  });
}

function excluirfilmes(id) {
  if (!confirm("Deseja excluir esse filme?")) return;

  filmes = filmes.filter((filmes) => filmes.id !== id);
  atualizarLocalStorage();
  renderizarTabela();
}

function atualizarLocalStorage() {
  localStorage.setItem("filmes", JSON.stringify(filmes));
}

function limparCampos() {
  document.getElementById("capa").value = "";
  document.getElementById("nome").value = "";
  document.getElementById("genero").value = "";
  document.getElementById("ano").value = "";
  document.getElementById("classificacao").value = "";
  document.getElementById("produtora").value = "";
}

function filtrar() {
  const genero = document.getElementById("filtro").value;

  const tabela = document.getElementById("dados");

  tabela.innerHTML = "";

  filmes.forEach((filme) => {
    if (genero === "todos" || filme.genero === genero) {
      tabela.innerHTML += `
            <tr>
                <td><img src="${filme.capa}"></td>
                <td>${filme.nome}</td>
                <td>${filme.genero}</td>
                <td>${filme.ano}</td>
                <td>${filme.classificacao}</td>
                <td>${filme.produtora}</td>
                <td>
                <button onclick="excluirfilmes(${filme.id})">Excluir</button>
            </td>
            </tr>
`;
    }
  });
}
