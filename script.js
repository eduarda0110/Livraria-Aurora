const formulario = document.getElementById("formularioLogin");
const mensagem = document.getElementById("mensagem");

const telaLogin = document.getElementById("telaLogin");
const siteLoja = document.getElementById("siteLoja");

const alternarCadastro = document.getElementById("alternarCadastro");
const tituloFormulario = document.getElementById("tituloFormulario");
const subtituloFormulario = document.getElementById("subtituloFormulario");
const botaoFormulario = document.getElementById("botaoFormulario");
const textoCadastro = document.getElementById("textoCadastro");

const campoNome = document.getElementById("campoNome");
const campoSobrenome = document.getElementById("campoSobrenome");
const campoTelefone = document.getElementById("campoTelefone");

const nomeInput = document.getElementById("nome");
const sobrenomeInput = document.getElementById("sobrenome");
const telefoneInput = document.getElementById("telefone");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");

let modoCadastro = false;

let carrinho = JSON.parse(
  localStorage.getItem("carrinhoAurora")
) || [];

let favoritos = JSON.parse(
  localStorage.getItem("favoritosAurora")
) || [];

let usuarios = JSON.parse(
  localStorage.getItem("usuariosAurora")
) || [];

const livros = [
  {
    id: 1,
    titulo: "A Biblioteca da Meia-Noite",
    autor: "Matt Haig",
    categoria: "Fantasia",
    preco: 42.90,
    antigo: 59.90,
    capa: "capa-1",
    avaliacao: "★★★★★",
    oferta: true,
    vendido: true,
    lancamento: false
  },
  {
    id: 2,
    titulo: "Tudo é Rio",
    autor: "Carla Madeira",
    categoria: "Romance",
    preco: 39.90,
    antigo: 49.90,
    capa: "capa-2",
    avaliacao: "★★★★★",
    oferta: true,
    vendido: true,
    lancamento: false
  },
  {
    id: 3,
    titulo: "Verity",
    autor: "Colleen Hoover",
    categoria: "Suspense",
    preco: 34.90,
    antigo: 44.90,
    capa: "capa-3",
    avaliacao: "★★★★☆",
    oferta: true,
    vendido: true,
    lancamento: false
  },
  {
    id: 4,
    titulo: "O Poder do Hábito",
    autor: "Charles Duhigg",
    categoria: "Desenvolvimento",
    preco: 45.90,
    antigo: null,
    capa: "capa-4",
    avaliacao: "★★★★★",
    oferta: false,
    vendido: true,
    lancamento: false
  },
  {
    id: 5,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Infantil",
    preco: 29.90,
    antigo: 35.90,
    capa: "capa-5",
    avaliacao: "★★★★★",
    oferta: true,
    vendido: true,
    lancamento: false
  },
  {
    id: 6,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Clássicos",
    preco: 27.90,
    antigo: null,
    capa: "capa-6",
    avaliacao: "★★★★☆",
    oferta: false,
    vendido: false,
    lancamento: false
  },
  {
    id: 7,
    titulo: "Hábitos Atômicos",
    autor: "James Clear",
    categoria: "Desenvolvimento",
    preco: 49.90,
    antigo: 59.90,
    capa: "capa-4",
    avaliacao: "★★★★★",
    oferta: true,
    vendido: true,
    lancamento: true
  },
  {
    id: 8,
    titulo: "A Empregada",
    autor: "Freida McFadden",
    categoria: "Suspense",
    preco: 41.90,
    antigo: null,
    capa: "capa-3",
    avaliacao: "★★★★★",
    oferta: false,
    vendido: true,
    lancamento: true
  }
];

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function mostrarMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.style.display = "block";

  if (tipo === "erro") {
    mensagem.style.background = "#f9e1e1";
    mensagem.style.color = "#a83232";
  } else {
    mensagem.style.background = "#e5f5e8";
    mensagem.style.color = "#28703a";
  }
}

function esconderMensagem() {
  mensagem.textContent = "";
  mensagem.style.display = "none";
}

function mostrarNotificacao(texto) {
  const notificacao = document.getElementById("notificacao");

  if (!notificacao) {
    alert(texto);
    return;
  }

  notificacao.textContent = texto;
  notificacao.classList.add("exibir");

  setTimeout(() => {
    notificacao.classList.remove("exibir");
  }, 2800);
}

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatarTelefone(telefone) {
  const numeros = telefone.replace(/\D/g, "");

  if (numeros.length === 11) {
    return numeros.replace(
      /^(\d{2})(\d{5})(\d{4})$/,
      "($1) $2-$3"
    );
  }

  if (numeros.length === 10) {
    return numeros.replace(
      /^(\d{2})(\d{4})(\d{4})$/,
      "($1) $2-$3"
    );
  }

  return telefone;
}

function preencherInformacoesUsuario(usuario) {
  const nomeCompleto = `${usuario.nome} ${usuario.sobrenome}`;

  const nomeCabecalho = document.getElementById(
    "nomeUsuarioCabecalho"
  );

  const nomeConta = document.getElementById(
    "nomeUsuarioConta"
  );

  const emailConta = document.getElementById(
    "emailUsuarioConta"
  );

  const telefoneConta = document.getElementById(
    "telefoneUsuarioConta"
  );

  const avatar = document.getElementById(
    "avatarUsuario"
  );

  if (nomeCabecalho) {
    nomeCabecalho.textContent = usuario.nome;
  }

  if (nomeConta) {
    nomeConta.textContent = nomeCompleto;
  }

  if (emailConta) {
    emailConta.textContent = usuario.email;
  }

  if (telefoneConta) {
    telefoneConta.textContent = usuario.telefone;
  }

  if (avatar) {
    avatar.textContent = usuario.nome.charAt(0).toUpperCase();
  }
}

function abrirSite(usuario) {
  localStorage.setItem(
    "usuarioAurora",
    JSON.stringify(usuario)
  );

  preencherInformacoesUsuario(usuario);

  telaLogin.classList.add("oculto");
  siteLoja.classList.remove("oculto");

  carregarLivros();
  atualizarCarrinho();
  atualizarFavoritos();
}

function alternarParaCadastro() {
  modoCadastro = true;

  campoNome.classList.remove("oculto");
  campoSobrenome.classList.remove("oculto");
  campoTelefone.classList.remove("oculto");

  nomeInput.required = true;
  sobrenomeInput.required = true;
  telefoneInput.required = true;

  tituloFormulario.textContent = "Crie sua conta";
  subtituloFormulario.textContent =
    "Preencha seus dados para começar.";
  botaoFormulario.textContent = "Criar cadastro";
  textoCadastro.textContent = "Já possui uma conta?";
  alternarCadastro.textContent = "Entrar";

  esconderMensagem();
}

function alternarParaLogin() {
  modoCadastro = false;

  campoNome.classList.add("oculto");
  campoSobrenome.classList.add("oculto");
  campoTelefone.classList.add("oculto");

  nomeInput.required = false;
  sobrenomeInput.required = false;
  telefoneInput.required = false;

  tituloFormulario.textContent = "Bem-vindo de volta!";
  subtituloFormulario.textContent =
    "Acesse sua conta para continuar.";
  botaoFormulario.textContent = "Entrar";
  textoCadastro.textContent = "Ainda não possui uma conta?";
  alternarCadastro.textContent = "Criar cadastro";

  esconderMensagem();
}

alternarCadastro.addEventListener("click", function(event) {
  event.preventDefault();

  if (modoCadastro) {
    alternarParaLogin();
  } else {
    alternarParaCadastro();
  }
});

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const sobrenome = sobrenomeInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const email = emailInput.value.trim().toLowerCase();
  const senha = senhaInput.value.trim();

  esconderMensagem();

  if (!validarEmail(email)) {
    mostrarMensagem(
      "Digite um e-mail válido.",
      "erro"
    );
    return;
  }

  if (senha.length < 6) {
    mostrarMensagem(
      "A senha precisa ter pelo menos 6 caracteres.",
      "erro"
    );
    return;
  }

  if (modoCadastro) {
    if (nome.length < 2) {
      mostrarMensagem(
        "Digite seu nome.",
        "erro"
      );
      return;
    }

    if (sobrenome.length < 2) {
      mostrarMensagem(
        "Digite seu sobrenome.",
        "erro"
      );
      return;
    }

    const telefoneNumeros = telefone.replace(/\D/g, "");

    if (
      telefoneNumeros.length < 10 ||
      telefoneNumeros.length > 11
    ) {
      mostrarMensagem(
        "Digite um número de telefone válido.",
        "erro"
      );
      return;
    }

    const usuarioExistente = usuarios.find(
      usuario => usuario.email === email
    );

    if (usuarioExistente) {
      mostrarMensagem(
        "Este e-mail já possui cadastro. Faça login.",
        "erro"
      );
      return;
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      sobrenome,
      telefone: formatarTelefone(telefone),
      email,
      senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem(
      "usuariosAurora",
      JSON.stringify(usuarios)
    );

    mostrarMensagem(
      "Cadastro realizado com sucesso!"
    );

    setTimeout(() => {
      abrirSite(novoUsuario);
    }, 700);

    return;
  }

  const usuarioCadastrado = usuarios.find(
    usuario =>
      usuario.email === email &&
      usuario.senha === senha
  );

  if (!usuarioCadastrado) {
    const emailExiste = usuarios.some(
      usuario => usuario.email === email
    );

    if (!emailExiste) {
      mostrarMensagem(
        "Este e-mail ainda não possui cadastro. Crie uma conta primeiro.",
        "erro"
      );
    } else {
      mostrarMensagem(
        "Senha incorreta. Tente novamente.",
        "erro"
      );
    }

    return;
  }

  mostrarMensagem(
    "Login realizado com sucesso!"
  );

  setTimeout(() => {
    abrirSite(usuarioCadastrado);
  }, 700);
});

function renderizarLivro(livro) {
  const estaFavoritado = favoritos.includes(livro.id);

  return `
    <article class="card-livro">
      <button class="favorito ${
        estaFavoritado ? "selecionado" : ""
      }" data-favorito="${livro.id}">
        ${estaFavoritado ? "♥" : "♡"}
      </button>

      <div class="capa-livro ${livro.capa}">
        ${livro.titulo}
      </div>

      <div class="info-livro">
        <h3>${livro.titulo}</h3>
        <p class="autor">${livro.autor}</p>
        <div class="avaliacao">${livro.avaliacao}</div>

        <div class="preco">
          ${
            livro.antigo
              ? `<span class="preco-antigo">
                  ${formatarPreco(livro.antigo)}
                </span>`
              : ""
          }

          ${formatarPreco(livro.preco)}
        </div>

        <button
          class="botao-comprar"
          data-comprar="${livro.id}"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  `;
}

function preencherGrade(idElemento, lista) {
  const elemento = document.getElementById(idElemento);

  if (!elemento) return;

  if (!lista.length) {
    elemento.innerHTML = `
      <div class="lista-vazia">
        <span>📚</span>
        <h2>Nenhum livro encontrado</h2>
        <p>Tente pesquisar por outro título.</p>
      </div>
    `;

    return;
  }

  elemento.innerHTML = lista
    .map(renderizarLivro)
    .join("");
}

function carregarLivros() {
  preencherGrade(
    "gradeDestaques",
    livros.slice(0, 4)
  );

  preencherGrade(
    "gradeTodosLivros",
    livros
  );

  preencherGrade(
    "gradeOfertas",
    livros.filter(livro => livro.oferta)
  );

  preencherGrade(
    "gradeMaisVendidos",
    livros.filter(livro => livro.vendido)
  );

  preencherGrade(
    "gradeLancamentos",
    livros.filter(livro => livro.lancamento)
  );
}

function atualizarCarrinho() {
  const contador = document.getElementById(
    "contadorCarrinho"
  );

  if (contador) {
    contador.textContent = carrinho.length;
  }

  const conteudo = document.getElementById(
    "conteudoCarrinho"
  );

  if (!conteudo) return;

  if (!carrinho.length) {
    conteudo.innerHTML = `
      <div class="lista-vazia">
        <span>🛒</span>
        <h2>Seu carrinho está vazio</h2>
        <p>Adicione livros para começar sua compra.</p>
        <button class="botao" data-secao="livros">
          Ver livros
        </button>
      </div>
    `;

    return;
  }

  const itens = carrinho
    .map(id => livros.find(livro => livro.id === id))
    .filter(Boolean);

  const total = itens.reduce(
    (soma, livro) => soma + livro.preco,
    0
  );

  conteudo.innerHTML = `
    ${itens.map(livro => `
      <div class="item-carrinho">
        <div class="capa-livro ${livro.capa}">
          ${livro.titulo}
        </div>

        <h3>${livro.titulo}</h3>

        <strong>${formatarPreco(livro.preco)}</strong>

        <button data-remover="${livro.id}">
          Remover
        </button>
      </div>
    `).join("")}

    <div class="resumo-carrinho">
      <h2>Total: ${formatarPreco(total)}</h2>

      <button class="botao" id="finalizarCompra">
        Finalizar compra
      </button>
    </div>
  `;
}

function atualizarFavoritos() {
  const lista = document.getElementById(
    "listaFavoritos"
  );

  if (!lista) return;

  const livrosFavoritos = livros.filter(
    livro => favoritos.includes(livro.id)
  );

  if (!livrosFavoritos.length) {
    lista.className = "lista-vazia";

    lista.innerHTML = `
      <span>❤️</span>
      <h2>Sua lista ainda está vazia</h2>
      <p>
        Clique no coração dos livros para adicioná-los
        aos favoritos.
      </p>

      <button class="botao" data-secao="livros">
        Encontrar livros
      </button>
    `;

    return;
  }

  lista.className = "";

  lista.innerHTML = `
    <div class="grade-livros">
      ${livrosFavoritos.map(renderizarLivro).join("")}
    </div>
  `;
}

function abrirSecao(nomeSecao) {
  document.querySelectorAll(".pagina").forEach(secao => {
    secao.classList.remove("ativa");
  });

  const secao = document.getElementById(nomeSecao);

  if (!secao) return;

  secao.classList.add("ativa");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (nomeSecao === "carrinho") {
    atualizarCarrinho();
  }

  if (nomeSecao === "minhas-listas") {
    atualizarFavoritos();
  }
}

document.addEventListener("click", function(event) {
  const linkSecao = event.target.closest("[data-secao]");

  if (linkSecao) {
    event.preventDefault();
    abrirSecao(linkSecao.dataset.secao);
  }

  const comprar = event.target.closest("[data-comprar]");

  if (comprar) {
    const id = Number(comprar.dataset.comprar);

    if (!carrinho.includes(id)) {
      carrinho.push(id);

      localStorage.setItem(
        "carrinhoAurora",
        JSON.stringify(carrinho)
      );

      atualizarCarrinho();
      mostrarNotificacao(
        "Livro adicionado ao carrinho!"
      );
    } else {
      mostrarNotificacao(
        "Este livro já está no carrinho."
      );
    }
  }

  const remover = event.target.closest("[data-remover]");

  if (remover) {
    const id = Number(remover.dataset.remover);

    carrinho = carrinho.filter(
      item => item !== id
    );

    localStorage.setItem(
      "carrinhoAurora",
      JSON.stringify(carrinho)
    );

    atualizarCarrinho();
    mostrarNotificacao(
      "Livro removido do carrinho."
    );
  }

  const favorito = event.target.closest("[data-favorito]");

  if (favorito) {
    const id = Number(favorito.dataset.favorito);

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(
        item => item !== id
      );

      mostrarNotificacao(
        "Livro removido das suas listas."
      );
    } else {
      favoritos.push(id);

      mostrarNotificacao(
        "Livro salvo nas suas listas."
      );
    }

    localStorage.setItem(
      "favoritosAurora",
      JSON.stringify(favoritos)
    );

    carregarLivros();
    atualizarFavoritos();
  }

  const filtro = event.target.closest("[data-filtro]");

  if (filtro) {
    document.querySelectorAll(".filtro").forEach(item => {
      item.classList.remove("ativo");
    });

    filtro.classList.add("ativo");

    const categoria = filtro.dataset.filtro;

    const resultado = categoria === "todos"
      ? livros
      : livros.filter(
          livro => livro.categoria === categoria
        );

    preencherGrade(
      "gradeTodosLivros",
      resultado
    );
  }

  if (event.target.id === "finalizarCompra") {
    carrinho = [];

    localStorage.setItem(
      "carrinhoAurora",
      JSON.stringify(carrinho)
    );

    atualizarCarrinho();

    mostrarNotificacao(
      "Pedido realizado com sucesso!"
    );
  }

  if (event.target.id === "botaoSair") {
    localStorage.removeItem("usuarioAurora");

    siteLoja.classList.add("oculto");
    telaLogin.classList.remove("oculto");

    formulario.reset();
    alternarParaLogin();

    mostrarNotificacao(
      "Você saiu da sua conta."
    );
  }
});

document
  .getElementById("formPesquisa")
  ?.addEventListener("submit", function(event) {
    event.preventDefault();

    const termo = document
      .getElementById("campoPesquisa")
      .value
      .toLowerCase()
      .trim();

    const resultado = livros.filter(livro =>
      livro.titulo.toLowerCase().includes(termo) ||
      livro.autor.toLowerCase().includes(termo) ||
      livro.categoria.toLowerCase().includes(termo)
    );

    abrirSecao("livros");
    preencherGrade(
      "gradeTodosLivros",
      resultado
    );
  });

document
  .getElementById("formNewsletter")
  ?.addEventListener("submit", function(event) {
    event.preventDefault();

    this.reset();

    mostrarNotificacao(
      "Cadastro realizado na newsletter!"
    );
  });

function carregarSessaoAtiva() {
  const usuarioAtivo = JSON.parse(
    localStorage.getItem("usuarioAurora")
  );

  if (!usuarioAtivo) {
    telaLogin.classList.remove("oculto");
    siteLoja.classList.add("oculto");
    return;
  }

  abrirSite(usuarioAtivo);
}

carregarSessaoAtiva();
