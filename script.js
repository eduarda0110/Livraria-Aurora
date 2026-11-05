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
let filtroAtual = "todos";
let termoPesquisaAtual = "";
let pedidoParaCancelar = null;

/* Carrinho e favoritos ficam guardados POR CONTA (ou "visitante") */
let donoDados = "visitante";

function chaveDados(tipo) {
  return `${tipo}Aurora_${donoDados}`;
}

function lerDados(tipo) {
  try {
    return JSON.parse(localStorage.getItem(chaveDados(tipo))) || [];
  } catch (erro) {
    return [];
  }
}

function salvarCarrinho() {
  localStorage.setItem(chaveDados("carrinho"), JSON.stringify(carrinho));
}

function salvarFavoritos() {
  localStorage.setItem(chaveDados("favoritos"), JSON.stringify(favoritos));
}

// dados antigos eram compartilhados entre contas: descartamos
localStorage.removeItem("carrinhoAurora");
localStorage.removeItem("favoritosAurora");

let carrinho = lerDados("carrinho");
let favoritos = lerDados("favoritos");

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
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Suma de Letras",
    isbn: "978-65-8000-095-0",
    paginas: 217,
    faixaEtaria: "12+",
    sinopse: "Entre a vida e a morte existe uma biblioteca onde cada livro é uma chance de viver de outro jeito. Nora precisa decidir qual vida vale a pena continuar.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 110,
    avaliacoes: [
      { nome: "Thiago R.", nota: 5, comentario: "A edição chegou impecável e a leitura foi ainda melhor. Virei fã do autor.", diasAtras: 61 },
      { nome: "Vinícius S.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 26 }
    ]
  },

  {
    id: 2,
    titulo: "Tudo é Rio",
    autor: "Carla Madeira",
    categoria: "Romance",
    preco: 39.90,
    antigo: 49.90,
    capa: "capa-2",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Arqueiro",
    isbn: "978-65-8000-098-7",
    paginas: 176,
    faixaEtaria: "14+",
    sinopse: "Um triângulo amoroso na Zona da Mata mineira desencadeia um acidente que muda para sempre o destino de três famílias, contado com prosa poética e intensa.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 64,
    avaliacoes: [
      { nome: "Thiago R.", nota: 5, comentario: "Um daqueles livros que a gente lembra por meses. Recomendo demais.", diasAtras: 133 },
      { nome: "Vinícius S.", nota: 4, comentario: "Gostei bastante, a entrega foi rápida e o livro veio bem embalado.", diasAtras: 111 }
    ]
  },

  {
    id: 3,
    titulo: "Verity",
    autor: "Colleen Hoover",
    categoria: "Suspense",
    preco: 34.90,
    antigo: 44.90,
    capa: "capa-3",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Record",
    isbn: "978-65-8000-102-4",
    paginas: 461,
    faixaEtaria: "16+",
    sinopse: "Uma leitura envolvente que promete prender sua atenção do início ao fim.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 78,
    avaliacoes: [
      { nome: "Diego F.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 182 },
      { nome: "Larissa M.", nota: 5, comentario: "A edição chegou impecável e a leitura foi ainda melhor. Virei fã do autor.", diasAtras: 59 }
    ]
  },

  {
    id: 4,
    titulo: "O Poder do Hábito",
    autor: "Charles Duhigg",
    categoria: "Desenvolvimento",
    preco: 45.90,
    antigo: null,
    capa: "capa-4",
    oferta: false,
    vendido: true,
    lancamento: false,
    editora: "Sextante",
    isbn: "978-65-8000-106-1",
    paginas: 207,
    faixaEtaria: "Livre",
    sinopse: "Uma leitura envolvente que promete prender sua atenção do início ao fim.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 50,
    avaliacoes: [
      { nome: "Pedro H.", nota: 5, comentario: "A edição chegou impecável e a leitura foi ainda melhor. Virei fã do autor.", diasAtras: 158 },
      { nome: "Patrícia G.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 141 }
    ]
  },

  {
    id: 5,
    titulo: "O Pequeno Príncipe",
    autor: "Antoine de Saint-Exupéry",
    categoria: "Infantil",
    preco: 29.90,
    antigo: 35.90,
    capa: "capa-5",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Companhia das Letrinhas",
    isbn: "978-65-8000-109-8",
    paginas: 200,
    faixaEtaria: "Livre",
    sinopse: "Um piloto perdido no deserto encontra um menino vindo de outro planeta, que lhe ensina sobre amizade, amor e o que realmente importa na vida.",
    avaliacaoMedia: 4.0,
    numAvaliacoes: 72,
    avaliacoes: [
      { nome: "Renata K.", nota: 4, comentario: "História envolvente, ficou devendo um pouco no final, mas recomendo.", diasAtras: 53 },
      { nome: "Thiago R.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 201 }
    ]
  },

  {
    id: 6,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Clássicos",
    preco: 27.90,
    antigo: null,
    capa: "capa-6",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Companhia das Letras",
    isbn: "978-65-8000-113-5",
    paginas: 597,
    faixaEtaria: "14+",
    sinopse: "Bentinho revisita a própria juventude para tentar entender, ou talvez justificar, a suspeita que consumiu seu casamento com Capitu.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 80,
    avaliacoes: [
      { nome: "Amanda V.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 75 },
      { nome: "Diego F.", nota: 5, comentario: "A edição chegou impecável e a leitura foi ainda melhor. Virei fã do autor.", diasAtras: 98 }
    ]
  },

  {
    id: 7,
    titulo: "Hábitos Atômicos",
    autor: "James Clear",
    categoria: "Desenvolvimento",
    preco: 49.90,
    antigo: 59.90,
    capa: "capa-7",
    oferta: true,
    vendido: true,
    lancamento: true,
    editora: "Sextante",
    isbn: "978-65-8000-117-2",
    paginas: 503,
    faixaEtaria: "Livre",
    sinopse: "Pequenas mudanças diárias, quando repetidas, se tornam resultados extraordinários. Um guia prático para construir bons hábitos e abandonar os ruins.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 84,
    avaliacoes: [
      { nome: "André W.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 166 },
      { nome: "Diego F.", nota: 5, comentario: "Um daqueles livros que a gente lembra por meses. Recomendo demais.", diasAtras: 122 }
    ]
  },

  {
    id: 8,
    titulo: "A Empregada",
    autor: "Freida McFadden",
    categoria: "Suspense",
    preco: 41.90,
    antigo: null,
    capa: "capa-8",
    oferta: false,
    vendido: true,
    lancamento: true,
    editora: "Record",
    isbn: "978-65-8000-120-9",
    paginas: 487,
    faixaEtaria: "16+",
    sinopse: "Uma leitura envolvente que promete prender sua atenção do início ao fim.",
    avaliacaoMedia: 4.0,
    numAvaliacoes: 76,
    avaliacoes: [
      { nome: "Fernanda C.", nota: 4, comentario: "Gostei bastante, a entrega foi rápida e o livro veio bem embalado.", diasAtras: 200 },
      { nome: "Rafael T.", nota: 4, comentario: "Gostei bastante, a entrega foi rápida e o livro veio bem embalado.", diasAtras: 210 }
    ]
  },

  {
    id: 9,
    titulo: "Orgulho e Preconceito",
    autor: "Jane Austen",
    categoria: "Clássicos",
    preco: 32.90,
    antigo: null,
    capa: "capa-9",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Penguin Companhia",
    isbn: "978-65-8000-124-6",
    paginas: 297,
    faixaEtaria: "14+",
    sinopse: "Elizabeth Bennet enfrenta as convenções sociais da Inglaterra do século XIX em uma história sobre julgamentos precipitados e amadurecimento.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 68,
    avaliacoes: [
      { nome: "Fernanda C.", nota: 5, comentario: "Emprestei pra três amigos depois que terminei. Todo mundo amou.", diasAtras: 58 },
      { nome: "Patrícia G.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 40 }
    ]
  },

  {
    id: 10,
    titulo: "Como Eu Era Antes de Você",
    autor: "Jojo Moyes",
    categoria: "Romance",
    preco: 38.90,
    antigo: 47.90,
    capa: "capa-10",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Intrínseca",
    isbn: "978-65-8000-128-3",
    paginas: 286,
    faixaEtaria: "14+",
    sinopse: "Louisa aceita cuidar de Will, um homem que perdeu a vontade de viver após um acidente, e os dois transformam um ao outro para sempre.",
    avaliacaoMedia: 4.0,
    numAvaliacoes: 52,
    avaliacoes: [
      { nome: "Renata K.", nota: 4, comentario: "História envolvente, ficou devendo um pouco no final, mas recomendo.", diasAtras: 113 },
      { nome: "Pedro H.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 60 }
    ]
  },

  {
    id: 11,
    titulo: "O Hobbit",
    autor: "J. R. R. Tolkien",
    categoria: "Fantasia",
    preco: 44.90,
    antigo: 54.90,
    capa: "capa-11",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Suma de Letras",
    isbn: "978-65-8000-132-0",
    paginas: 412,
    faixaEtaria: "12+",
    sinopse: "Bilbo Bolseiro é arrastado de sua vida tranquila para uma jornada perigosa em busca de um tesouro guardado por um dragão.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 84,
    avaliacoes: [
      { nome: "Bruno A.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 43 },
      { nome: "André W.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 20 }
    ]
  },

  {
    id: 12,
    titulo: "Alice no País das Maravilhas",
    autor: "Lewis Carroll",
    categoria: "Infantil",
    preco: 31.90,
    antigo: null,
    capa: "capa-12",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Companhia das Letrinhas",
    isbn: "978-65-8000-135-7",
    paginas: 465,
    faixaEtaria: "Livre",
    sinopse: "Ao seguir um coelho branco apressado, Alice cai em um mundo onde a lógica não faz o menor sentido.",
    avaliacaoMedia: 3.5,
    numAvaliacoes: 104,
    avaliacoes: [
      { nome: "Beatriz L.", nota: 3, comentario: "Gostei da proposta, mas não me conquistou como eu esperava.", diasAtras: 145 },
      { nome: "Bruno A.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 178 }
    ]
  },

  {
    id: 13,
    titulo: "Steve Jobs",
    autor: "Walter Isaacson",
    categoria: "Biografia",
    preco: 59.90,
    antigo: 74.90,
    capa: "capa-13",
    oferta: true,
    vendido: false,
    lancamento: false,
    editora: "Globo Livros",
    isbn: "978-65-8000-139-4",
    paginas: 553,
    faixaEtaria: "12+",
    sinopse: "A biografia definitiva do cofundador da Apple, construída a partir de dezenas de entrevistas exclusivas concedidas antes de sua morte.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 58,
    avaliacoes: [
      { nome: "Gustavo N.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 115 },
      { nome: "Beatriz L.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 132 }
    ]
  },

  {
    id: 14,
    titulo: "Longa Caminhada até a Liberdade",
    autor: "Nelson Mandela",
    categoria: "Biografia",
    preco: 54.90,
    antigo: null,
    capa: "capa-14",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Objetiva",
    isbn: "978-65-8000-143-1",
    paginas: 214,
    faixaEtaria: "12+",
    sinopse: "O relato em primeira pessoa da luta de Nelson Mandela contra o apartheid e de seus 27 anos de prisão.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 102,
    avaliacoes: [
      { nome: "Isabela D.", nota: 4, comentario: "História envolvente, ficou devendo um pouco no final, mas recomendo.", diasAtras: 159 },
      { nome: "Diego F.", nota: 5, comentario: "A edição chegou impecável e a leitura foi ainda melhor. Virei fã do autor.", diasAtras: 142 }
    ]
  },

  {
    id: 15,
    titulo: "Sapiens",
    autor: "Yuval Noah Harari",
    categoria: "História",
    preco: 52.90,
    antigo: 64.90,
    capa: "capa-15",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "L&PM",
    isbn: "978-65-8000-146-8",
    paginas: 466,
    faixaEtaria: "12+",
    sinopse: "Uma explicação ambiciosa de como o Homo sapiens conquistou o planeta, das revoluções cognitiva e agrícola até a era digital.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 66,
    avaliacoes: [
      { nome: "Bruno A.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 96 },
      { nome: "Thiago R.", nota: 4, comentario: "História envolvente, ficou devendo um pouco no final, mas recomendo.", diasAtras: 18 }
    ]
  },

  {
    id: 16,
    titulo: "Armas, Germes e Aço",
    autor: "Jared Diamond",
    categoria: "História",
    preco: 58.90,
    antigo: null,
    capa: "capa-16",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Zahar",
    isbn: "978-65-8000-150-5",
    paginas: 200,
    faixaEtaria: "12+",
    sinopse: "Por que algumas civilizações prosperaram e dominaram outras? Uma resposta que atravessa geografia, biologia e história.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 96,
    avaliacoes: [
      { nome: "Camila O.", nota: 5, comentario: "Já é a segunda vez que leio e continua surpreendendo. Compra certa.", diasAtras: 198 },
      { nome: "Larissa M.", nota: 5, comentario: "Um daqueles livros que a gente lembra por meses. Recomendo demais.", diasAtras: 172 }
    ]
  },

  {
    id: 17,
    titulo: "Duna",
    autor: "Frank Herbert",
    categoria: "Ficção Científica",
    preco: 69.90,
    antigo: 84.90,
    capa: "capa-17",
    oferta: true,
    vendido: true,
    lancamento: false,
    editora: "Suma de Letras",
    isbn: "978-65-8000-154-2",
    paginas: 244,
    faixaEtaria: "12+",
    sinopse: "No planeta desértico de Arrakis, Paul Atreides precisa sobreviver à traição, à política e a uma profecia que pode destruí-lo.",
    avaliacaoMedia: 4.0,
    numAvaliacoes: 74,
    avaliacoes: [
      { nome: "Lucas B.", nota: 5, comentario: "Emprestei pra três amigos depois que terminei. Todo mundo amou.", diasAtras: 58 },
      { nome: "Juliana P.", nota: 3, comentario: "Gostei da proposta, mas não me conquistou como eu esperava.", diasAtras: 186 }
    ]
  },

  {
    id: 18,
    titulo: "Fundação",
    autor: "Isaac Asimov",
    categoria: "Ficção Científica",
    preco: 46.90,
    antigo: null,
    capa: "capa-18",
    oferta: false,
    vendido: false,
    lancamento: true,
    editora: "Morro Branco",
    isbn: "978-65-8000-157-9",
    paginas: 503,
    faixaEtaria: "12+",
    sinopse: "Um matemático prevê a queda do Império Galáctico e cria uma fundação para preservar o conhecimento durante o caos que virá.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 38,
    avaliacoes: [
      { nome: "Isabela D.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 119 },
      { nome: "Camila O.", nota: 5, comentario: "Um daqueles livros que a gente lembra por meses. Recomendo demais.", diasAtras: 90 }
    ]
  },

  {
    id: 19,
    titulo: "O Iluminado",
    autor: "Stephen King",
    categoria: "Terror",
    preco: 56.90,
    antigo: null,
    capa: "capa-19",
    oferta: false,
    vendido: true,
    lancamento: false,
    editora: "HarperCollins Brasil",
    isbn: "978-65-8000-161-6",
    paginas: 443,
    faixaEtaria: "16+",
    sinopse: "Um escritor aceita cuidar de um hotel isolado no inverno e aos poucos percebe que o lugar tem planos sinistros para sua família.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 40,
    avaliacoes: [
      { nome: "Marina S.", nota: 5, comentario: "Um daqueles livros que a gente lembra por meses. Recomendo demais.", diasAtras: 22 },
      { nome: "Thiago R.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 21 }
    ]
  },

  {
    id: 20,
    titulo: "Drácula",
    autor: "Bram Stoker",
    categoria: "Terror",
    preco: 34.90,
    antigo: 42.90,
    capa: "capa-20",
    oferta: true,
    vendido: false,
    lancamento: false,
    editora: "Suma de Letras",
    isbn: "978-65-8000-165-3",
    paginas: 196,
    faixaEtaria: "16+",
    sinopse: "Um advogado inglês descobre, tarde demais, que seu cliente transilvano é uma criatura das trevas com sede de sangue.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 66,
    avaliacoes: [
      { nome: "Rodrigo M.", nota: 5, comentario: "A edição chegou impecável e a leitura foi ainda melhor. Virei fã do autor.", diasAtras: 58 },
      { nome: "Renata K.", nota: 5, comentario: "Emprestei pra três amigos depois que terminei. Todo mundo amou.", diasAtras: 125 }
    ]
  },

  {
    id: 21,
    titulo: "A Ilha do Tesouro",
    autor: "Robert Louis Stevenson",
    categoria: "Aventura",
    preco: 28.90,
    antigo: null,
    capa: "capa-21",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Martins Fontes",
    isbn: "978-65-8000-169-0",
    paginas: 573,
    faixaEtaria: "10+",
    sinopse: "Um mapa encontrado por acaso leva um grupo de aventureiros, e um perigoso pirata, à caça de um tesouro escondido.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 128,
    avaliacoes: [
      { nome: "Bruno A.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 172 },
      { nome: "Lucas B.", nota: 5, comentario: "Já é a segunda vez que leio e continua surpreendendo. Compra certa.", diasAtras: 123 }
    ]
  },

  {
    id: 22,
    titulo: "Vinte Mil Léguas Submarinas",
    autor: "Jules Verne",
    categoria: "Aventura",
    preco: 33.90,
    antigo: 39.90,
    capa: "capa-22",
    oferta: true,
    vendido: false,
    lancamento: false,
    editora: "Zahar",
    isbn: "978-65-8000-172-7",
    paginas: 504,
    faixaEtaria: "10+",
    sinopse: "A bordo do submarino Nautilus, o capitão Nemo conduz seus prisioneiros por uma jornada fantástica pelos oceanos do mundo.",
    avaliacaoMedia: 4.0,
    numAvaliacoes: 60,
    avaliacoes: [
      { nome: "Rafael T.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 107 },
      { nome: "Thiago R.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 53 }
    ]
  },

  {
    id: 23,
    titulo: "Mensagem",
    autor: "Fernando Pessoa",
    categoria: "Poesia",
    preco: 24.90,
    antigo: null,
    capa: "capa-23",
    oferta: false,
    vendido: false,
    lancamento: false,
    editora: "Leya",
    isbn: "978-65-8000-176-4",
    paginas: 389,
    faixaEtaria: "Livre",
    sinopse: "A obra-prima poética de Fernando Pessoa celebra a identidade e o destino de Portugal através de símbolos e mitos nacionais.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 106,
    avaliacoes: [
      { nome: "Beatriz L.", nota: 5, comentario: "Um daqueles livros que a gente lembra por meses. Recomendo demais.", diasAtras: 122 },
      { nome: "Patrícia G.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 210 }
    ]
  },

  {
    id: 24,
    titulo: "Antologia Poética",
    autor: "Vinicius de Moraes",
    categoria: "Poesia",
    preco: 36.90,
    antigo: 44.90,
    capa: "capa-24",
    oferta: true,
    vendido: false,
    lancamento: true,
    editora: "Companhia das Letras",
    isbn: "978-65-8000-180-1",
    paginas: 185,
    faixaEtaria: "Livre",
    sinopse: "Uma seleção dos versos mais marcantes do poeta que transformou o cotidiano e o amor em poesia popular brasileira.",
    avaliacaoMedia: 4.0,
    numAvaliacoes: 96,
    avaliacoes: [
      { nome: "Camila O.", nota: 4, comentario: "Muito bom, só achei o ritmo um pouco lento no meio, mas vale a leitura.", diasAtras: 196 },
      { nome: "Lucas B.", nota: 4, comentario: "Gostei bastante, a entrega foi rápida e o livro veio bem embalado.", diasAtras: 128 }
    ]
  },

  {
    id: 25,
    titulo: "Meditações",
    autor: "Marco Aurélio",
    categoria: "Filosofia",
    preco: 29.90,
    antigo: null,
    capa: "capa-25",
    oferta: false,
    vendido: true,
    lancamento: false,
    editora: "L&PM",
    isbn: "978-65-8000-183-8",
    paginas: 602,
    faixaEtaria: "16+",
    sinopse: "Os pensamentos íntimos do imperador filósofo Marco Aurélio sobre virtude, disciplina e a aceitação do que não podemos controlar.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 94,
    avaliacoes: [
      { nome: "Diego F.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 101 },
      { nome: "Beatriz L.", nota: 5, comentario: "Já é a segunda vez que leio e continua surpreendendo. Compra certa.", diasAtras: 204 }
    ]
  },

  {
    id: 26,
    titulo: "O Mundo de Sofia",
    autor: "Jostein Gaarder",
    categoria: "Filosofia",
    preco: 47.90,
    antigo: 57.90,
    capa: "capa-26",
    oferta: true,
    vendido: false,
    lancamento: false,
    editora: "Martins Fontes",
    isbn: "978-65-8000-187-5",
    paginas: 376,
    faixaEtaria: "16+",
    sinopse: "Uma adolescente começa a receber cartas misteriosas que a introduzem, passo a passo, à história da filosofia ocidental.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 104,
    avaliacoes: [
      { nome: "Larissa M.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 52 },
      { nome: "Renata K.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 192 }
    ]
  },

  {
    id: 27,
    titulo: "Pai Rico, Pai Pobre",
    autor: "Robert Kiyosaki",
    categoria: "Negócios",
    preco: 39.90,
    antigo: null,
    capa: "capa-27",
    oferta: false,
    vendido: true,
    lancamento: false,
    editora: "Sextante",
    isbn: "978-65-8000-191-2",
    paginas: 542,
    faixaEtaria: "Livre",
    sinopse: "Comparando os ensinamentos de dois pais com visões opostas sobre dinheiro, o autor apresenta lições de educação financeira.",
    avaliacaoMedia: 5.0,
    numAvaliacoes: 100,
    avaliacoes: [
      { nome: "Renata K.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 126 },
      { nome: "Diego F.", nota: 5, comentario: "Emprestei pra três amigos depois que terminei. Todo mundo amou.", diasAtras: 18 }
    ]
  },

  {
    id: 28,
    titulo: "A Psicologia Financeira",
    autor: "Morgan Housel",
    categoria: "Negócios",
    preco: 44.90,
    antigo: 54.90,
    capa: "capa-28",
    oferta: true,
    vendido: true,
    lancamento: true,
    editora: "Sextante",
    isbn: "978-65-8000-194-9",
    paginas: 595,
    faixaEtaria: "Livre",
    sinopse: "Mais do que fórmulas, o comportamento humano explica boa parte das decisões financeiras que tomamos, para o bem e para o mal.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 66,
    avaliacoes: [
      { nome: "Camila O.", nota: 5, comentario: "Emprestei pra três amigos depois que terminei. Todo mundo amou.", diasAtras: 176 },
      { nome: "Bruno A.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 149 }
    ]
  },

  {
    id: 31,
    titulo: "Maus",
    autor: "Art Spiegelman",
    categoria: "HQs e Mangás",
    preco: 64.90,
    antigo: null,
    capa: "capa-31",
    oferta: false,
    vendido: true,
    lancamento: false,
    editora: "Devir",
    isbn: "978-65-8000-206-0",
    paginas: 464,
    faixaEtaria: "12+",
    sinopse: "A história real do pai do autor, sobrevivente do Holocausto, contada em quadrinhos com judeus representados como ratos e nazistas como gatos.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 120,
    avaliacoes: [
      { nome: "Lucas B.", nota: 5, comentario: "Comecei achando que ia demorar a engatar, mas larguei tudo pra terminar de ler.", diasAtras: 172 },
      { nome: "Beatriz L.", nota: 4, comentario: "História envolvente, ficou devendo um pouco no final, mas recomendo.", diasAtras: 56 }
    ]
  },

  {
    id: 32,
    titulo: "Watchmen",
    autor: "Alan Moore",
    categoria: "HQs e Mangás",
    preco: 89.90,
    antigo: 99.90,
    capa: "capa-32",
    oferta: true,
    vendido: false,
    lancamento: true,
    editora: "Devir",
    isbn: "978-65-8000-209-7",
    paginas: 320,
    faixaEtaria: "12+",
    sinopse: "Em um mundo onde heróis mascarados foram banidos, o assassinato de um deles reabre feridas antigas e revela uma conspiração maior.",
    avaliacaoMedia: 4.5,
    numAvaliacoes: 44,
    avaliacoes: [
      { nome: "Larissa M.", nota: 5, comentario: "Já é a segunda vez que leio e continua surpreendendo. Compra certa.", diasAtras: 175 },
      { nome: "Fernanda C.", nota: 4, comentario: "Boa leitura, ótimo para quem gosta do gênero. Não é perfeito, mas é muito bom.", diasAtras: 196 }
    ]
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

/* "Lembrar de mim": marcado = fica salvo; desmarcado = só até fechar o navegador */
let lembrarSessao = false;

function guardarSessao(usuario) {
  localStorage.removeItem("usuarioAurora");
  sessionStorage.removeItem("usuarioAurora");

  (lembrarSessao ? localStorage : sessionStorage).setItem(
    "usuarioAurora",
    JSON.stringify(usuario)
  );
}

function lerSessao() {
  try {
    return (
      JSON.parse(localStorage.getItem("usuarioAurora")) ||
      JSON.parse(sessionStorage.getItem("usuarioAurora"))
    );
  } catch (erro) {
    return null;
  }
}

function abrirSite(usuario) {
  usuarioLogado = usuarios.find(item => item.id === usuario.id) || usuario;

  if (!usuarioLogado.enderecos) usuarioLogado.enderecos = [];
  if (!usuarioLogado.cartoes) usuarioLogado.cartoes = [];
  if (!usuarioLogado.pedidos) usuarioLogado.pedidos = [];

  guardarSessao(usuarioLogado);

  preencherInformacoesUsuario(usuarioLogado);

  // carrinho montado como visitante vai para a conta; o resto é só da conta
  const carrinhoVisitante = donoDados === "visitante" ? carrinho.slice() : [];

  donoDados = String(usuarioLogado.id);
  carrinho = lerDados("carrinho");
  favoritos = lerDados("favoritos");

  carrinhoVisitante.forEach(id => {
    if (!carrinho.includes(id)) carrinho.push(id);
  });
  salvarCarrinho();
  localStorage.removeItem("carrinhoAurora_visitante");

  telaLogin.classList.add("oculto");
  siteLoja.classList.remove("oculto");
  document.body.classList.add("logado");

  carregarLivros();
  atualizarCarrinho();
  atualizarFavoritos();
  iniciarConta();

  // vai para onde a pessoa queria ir antes de entrar (ou para o início)
  // após entrar ou cadastrar, vai sempre para o início
  // (única exceção: quem clicou em "Finalizar compra" volta ao carrinho)
  const destino = destinoAposLogin === "carrinho" ? "carrinho" : "inicio";
  destinoAposLogin = null;
  abrirSecao(destino);

  if (destino === "carrinho" && carrinho.length) {
    irParaCheckout();
  }
}

/* ---------- Modo visitante ---------- */

let destinoAposLogin = null;

const SECOES_COM_LOGIN = ["minha-conta", "meus-pedidos"];

function mostrarTelaLogin(modo, destino) {
  destinoAposLogin = destino || null;

  siteLoja.classList.add("oculto");
  telaLogin.classList.remove("oculto");

  formulario.reset();

  if (modo === "cadastro") {
    alternarParaCadastro();
  } else {
    alternarParaLogin();
  }

  window.scrollTo({ top: 0 });
}

function voltarParaLoja() {
  destinoAposLogin = null;

  telaLogin.classList.add("oculto");
  siteLoja.classList.remove("oculto");

  abrirSecao("inicio");
}

function iniciarComoVisitante() {
  usuarioLogado = null;
  donoDados = "visitante";
  carrinho = lerDados("carrinho");
  favoritos = lerDados("favoritos");
  document.body.classList.remove("logado");

  const nomeCabecalho = document.getElementById("nomeUsuarioCabecalho");
  if (nomeCabecalho) nomeCabecalho.textContent = "Entrar";

  telaLogin.classList.add("oculto");
  siteLoja.classList.remove("oculto");

  carregarLivros();
  atualizarCarrinho();
  atualizarFavoritos();

  abrirSecao("inicio");
}

document.getElementById("voltarParaLoja")?.addEventListener("click", function(event) {
  event.preventDefault();
  voltarParaLoja();
});

document.getElementById("botaoCadastroBanner")?.addEventListener("click", function() {
  mostrarTelaLogin("cadastro", "inicio");
});

let modoRecuperar = false;

function restaurarCamposPadrao() {
  modoRecuperar = false;

  document.getElementById("opcoesLogin").classList.remove("oculto");
  document.getElementById("labelSenha").textContent = "Senha";
  senhaInput.placeholder = "Digite sua senha";
  senhaInput.autocomplete = "current-password";
}

function alternarParaRecuperarSenha() {
  alternarParaLogin();

  modoRecuperar = true;

  document.getElementById("opcoesLogin").classList.add("oculto");
  document.getElementById("labelSenha").textContent = "Nova senha";
  senhaInput.placeholder = "Mínimo de 6 caracteres";
  senhaInput.autocomplete = "new-password";

  tituloFormulario.textContent = "Recuperar senha";
  subtituloFormulario.textContent =
    "Informe seu e-mail e escolha uma nova senha.";
  botaoFormulario.textContent = "Redefinir senha";
  textoCadastro.textContent = "Lembrou da senha?";
  alternarCadastro.textContent = "Voltar ao login";

  esconderMensagem();
  emailInput.focus();
}

document.getElementById("linkEsqueci")?.addEventListener("click", function(event) {
  event.preventDefault();
  alternarParaRecuperarSenha();
});

function alternarParaCadastro() {
  restaurarCamposPadrao();
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
  restaurarCamposPadrao();
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

  if (modoRecuperar || modoCadastro) {
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

  lembrarSessao = document.getElementById("lembrarMim")?.checked || false;

  if (modoRecuperar) {
    if (!validarEmail(email)) {
      mostrarMensagem("Digite um e-mail válido.", "erro");
      return;
    }

    const contaRecuperar = usuarios.find(usuario => usuario.email === email);

    if (!contaRecuperar) {
      mostrarMensagem("Não encontramos uma conta com este e-mail.", "erro");
      return;
    }

    if (senha.length < 6) {
      mostrarMensagem("A nova senha precisa ter pelo menos 6 caracteres.", "erro");
      return;
    }

    contaRecuperar.senha = senha;
    localStorage.setItem("usuariosAurora", JSON.stringify(usuarios));

    mostrarMensagem("Senha redefinida! Agora é só entrar.");

    setTimeout(() => {
      alternarParaLogin();
      emailInput.value = email;
      senhaInput.value = "";
      senhaInput.focus();
      mostrarMensagem("Senha redefinida! Entre com a nova senha.");
    }, 1200);

    return;
  }

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

function gerarEstrelas(nota) {
  const arredondada = Math.round(nota * 2) / 2;
  let html = "";

  for (let i = 1; i <= 5; i++) {
    if (arredondada >= i) {
      html += "★";
    } else if (arredondada >= i - 0.5) {
      html += "⯨";
    } else {
      html += "☆";
    }
  }

  return html;
}

function calcularDesconto(livro) {
  if (!livro.antigo) return 0;
  return Math.round((1 - livro.preco / livro.antigo) * 100);
}

function renderizarLivro(livro) {
  const estaFavoritado = favoritos.includes(livro.id);
  const desconto = calcularDesconto(livro);

  const selos = [];
  if (desconto > 0) selos.push(`<span class="selo-livro desconto">-${desconto}%</span>`);
  if (livro.preco >= 149.90) selos.push(`<span class="selo-livro frete">Frete grátis</span>`);
  if (livro.lancamento) selos.push(`<span class="selo-livro lancamento">Lançamento</span>`);
  else if (livro.vendido) selos.push(`<span class="selo-livro vendido">Mais vendido</span>`);

  return `
    <article class="card-livro">
      <button class="favorito ${
        estaFavoritado ? "selecionado" : ""
      }" data-favorito="${livro.id}">
        ${estaFavoritado ? "♥" : "♡"}
      </button>

      <div class="capa-livro ${livro.capa}" data-detalhes="${livro.id}">
        ${selos.length ? `<div class="selos-card">${selos.join("")}</div>` : ""}
        ${livro.titulo}
      </div>

      <div class="info-livro">
        <h3 data-detalhes="${livro.id}">${livro.titulo}</h3>
        <p class="autor">${livro.autor}</p>
        <div class="avaliacao">
          ${gerarEstrelas(livro.avaliacaoMedia)}
          <span class="contagem-avaliacao">(${livro.numAvaliacoes})</span>
        </div>

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

        <button class="botao-detalhes" data-detalhes="${livro.id}">
          Ver detalhes
        </button>

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

function formatarDataRelativa(diasAtras) {
  if (diasAtras < 1) return "hoje";
  if (diasAtras === 1) return "há 1 dia";
  if (diasAtras < 30) return `há ${diasAtras} dias`;

  const meses = Math.round(diasAtras / 30);
  return meses === 1 ? "há 1 mês" : `há ${meses} meses`;
}

function abrirDetalhesLivro(id) {
  const livro = livros.find(item => item.id === id);

  if (!livro) return;

  const desconto = calcularDesconto(livro);
  const freteGratis = livro.preco >= 149.90;
  const estaFavoritado = favoritos.includes(livro.id);

  const badges = [];
  if (desconto > 0) badges.push(`<span class="selo-livro desconto grande">-${desconto}% OFF</span>`);
  if (freteGratis) badges.push(`<span class="selo-livro frete grande">🚚 Frete grátis</span>`);
  if (livro.oferta) badges.push(`<span class="selo-livro oferta grande">Oferta especial</span>`);
  if (livro.lancamento) badges.push(`<span class="selo-livro lancamento grande">Lançamento</span>`);
  else if (livro.vendido) badges.push(`<span class="selo-livro vendido grande">Mais vendido</span>`);

  document.getElementById("conteudoModalDetalhes").innerHTML = `
    <button class="fechar-modal" id="fecharModalDetalhes">✕</button>

    <div class="grade-modal-livro">
      <div class="capa-livro grande ${livro.capa}">
        ${livro.titulo}
      </div>

      <div class="dados-modal-livro">
        ${badges.length ? `<div class="badges-modal">${badges.join("")}</div>` : ""}

        <h2>${escapar(livro.titulo)}</h2>
        <p class="autor-modal">por ${escapar(livro.autor)}</p>

        <div class="avaliacao">
          ${gerarEstrelas(livro.avaliacaoMedia)}
          <span class="contagem-avaliacao">
            ${livro.avaliacaoMedia.toFixed(1)} · ${livro.numAvaliacoes} avaliações
          </span>
        </div>

        <div class="preco grande">
          ${livro.antigo ? `<span class="preco-antigo">${formatarPreco(livro.antigo)}</span>` : ""}
          ${formatarPreco(livro.preco)}
        </div>

        <div class="acoes-form">
          <button class="botao botao-auto" data-comprar="${livro.id}">
            Adicionar ao carrinho
          </button>
          <button class="botao-contorno" data-favoritar-modal="${livro.id}">
            ${estaFavoritado ? "♥ Remover dos favoritos" : "♡ Adicionar aos favoritos"}
          </button>
        </div>

        <table class="tabela-ficha">
          <tr><td>Categoria</td><td>${escapar(livro.categoria)}</td></tr>
          <tr><td>Editora</td><td>${escapar(livro.editora)}</td></tr>
          <tr><td>ISBN</td><td>${escapar(livro.isbn)}</td></tr>
          <tr><td>Páginas</td><td>${livro.paginas}</td></tr>
          <tr><td>Faixa etária</td><td>${escapar(livro.faixaEtaria)}</td></tr>
        </table>
      </div>
    </div>

    <div class="secao-modal">
      <h3>Sinopse</h3>
      <p class="sinopse-livro">${escapar(livro.sinopse)}</p>
    </div>

    <div class="secao-modal">
      <h3>Avaliações de leitores</h3>
      <div class="lista-comentarios">
        ${livro.avaliacoes.map(av => `
          <div class="comentario-leitor">
            <div class="cabecalho-comentario">
              <strong>${escapar(av.nome)}</strong>
              <span>${formatarDataRelativa(av.diasAtras)}</span>
            </div>
            <div class="avaliacao pequena">${gerarEstrelas(av.nota)}</div>
            <p>${escapar(av.comentario)}</p>
          </div>
        `).join("")}
      </div>
    </div>
  `;

  document.getElementById("modalDetalhes").classList.remove("oculto");
  document.body.style.overflow = "hidden";
}

function fecharDetalhesLivro() {
  document.getElementById("modalDetalhes").classList.add("oculto");
  document.body.style.overflow = "";
}

document.getElementById("modalDetalhes").addEventListener("click", function(event) {
  if (event.target.id === "modalDetalhes" || event.target.id === "fecharModalDetalhes") {
    fecharDetalhesLivro();
  }

  const favoritarModal = event.target.closest("[data-favoritar-modal]");

  if (favoritarModal) {
    const id = Number(favoritarModal.dataset.favoritarModal);

    if (favoritos.includes(id)) {
      favoritos = favoritos.filter(item => item !== id);
    } else {
      favoritos.push(id);
    }

    salvarFavoritos();
    atualizarFavoritos();
    abrirDetalhesLivro(id);
  }

  const comprarModal = event.target.closest("[data-comprar]");

  if (comprarModal) {
    fecharDetalhesLivro();
  }
});

function preencherGrade(idElemento, lista) {
  const elemento = document.getElementById(idElemento);

  if (!elemento) return;

  if (idElemento === "gradeTodosLivros") {
    const contagem = document.getElementById("contagemLivros");

    if (contagem) {
      contagem.textContent =
        lista.length === 1
          ? "1 livro encontrado"
          : `${lista.length} livros encontrados`;
    }
  }

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

  popularFiltroAutor();
  aplicarFiltrosLivros();

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

  atualizarRecomendados();
}

/* =====================================================
   FILTROS AVANÇADOS DE PESQUISA
===================================================== */

function popularFiltroAutor() {
  const select = document.getElementById("filtroAutor");
  if (!select || select.options.length > 1) return;

  const autores = [...new Set(livros.map(livro => livro.autor))].sort(
    (a, b) => a.localeCompare(b, "pt-BR")
  );

  autores.forEach(autor => {
    const opcao = document.createElement("option");
    opcao.value = autor;
    opcao.textContent = autor;
    select.appendChild(opcao);
  });
}

function livroPassaFiltros(livro) {
  if (filtroAtual !== "todos" && livro.categoria !== filtroAtual) return false;

  if (termoPesquisaAtual) {
    const combina =
      livro.titulo.toLowerCase().includes(termoPesquisaAtual) ||
      livro.autor.toLowerCase().includes(termoPesquisaAtual) ||
      livro.categoria.toLowerCase().includes(termoPesquisaAtual);

    if (!combina) return false;
  }

  const autor = document.getElementById("filtroAutor")?.value || "todos";
  const preco = document.getElementById("filtroPreco")?.value || "todos";
  const avaliacao = document.getElementById("filtroAvaliacao")?.value || "todos";
  const faixaEtaria = document.getElementById("filtroFaixaEtaria")?.value || "todos";

  if (autor !== "todos" && livro.autor !== autor) return false;

  if (preco !== "todos") {
    const [min, max] = preco.split("-").map(Number);
    if (livro.preco < min || livro.preco > max) return false;
  }

  if (avaliacao !== "todos" && livro.avaliacaoMedia < Number(avaliacao)) return false;

  if (faixaEtaria !== "todos" && livro.faixaEtaria !== faixaEtaria) return false;

  return true;
}

function aplicarFiltrosLivros() {
  preencherGrade(
    "gradeTodosLivros",
    livros.filter(livroPassaFiltros)
  );

  atualizarChipsFiltros();
}

const textosFaixaPreco = {
  "0-30": "Até R$ 30",
  "30-60": "R$ 30 a R$ 60",
  "60-100": "R$ 60 a R$ 100",
  "100-99999": "Acima de R$ 100"
};

function atualizarChipsFiltros() {
  const container = document.getElementById("chipsFiltrosAtivos");
  const contador = document.getElementById("contagemFiltrosAtivos");

  if (!container || !contador) return;

  const chips = [];

  if (filtroAtual !== "todos") {
    chips.push({
      texto: filtroAtual,
      limpar() {
        filtroAtual = "todos";
        const select = document.getElementById("filtroCategoria");
        if (select) select.value = "todos";
      }
    });
  }

  if (termoPesquisaAtual) {
    chips.push({
      texto: `Busca: "${termoPesquisaAtual}"`,
      limpar() {
        termoPesquisaAtual = "";
        const campo = document.getElementById("campoPesquisa");
        if (campo) campo.value = "";
      }
    });
  }

  const autor = document.getElementById("filtroAutor")?.value;
  if (autor && autor !== "todos") {
    chips.push({
      texto: autor,
      limpar() {
        document.getElementById("filtroAutor").value = "todos";
      }
    });
  }

  const preco = document.getElementById("filtroPreco")?.value;
  if (preco && preco !== "todos") {
    chips.push({
      texto: textosFaixaPreco[preco] || preco,
      limpar() {
        document.getElementById("filtroPreco").value = "todos";
      }
    });
  }

  const avaliacao = document.getElementById("filtroAvaliacao")?.value;
  if (avaliacao && avaliacao !== "todos") {
    chips.push({
      texto: `${avaliacao}★ ou mais`,
      limpar() {
        document.getElementById("filtroAvaliacao").value = "todos";
      }
    });
  }

  const faixaEtaria = document.getElementById("filtroFaixaEtaria")?.value;
  if (faixaEtaria && faixaEtaria !== "todos") {
    chips.push({
      texto: faixaEtaria,
      limpar() {
        document.getElementById("filtroFaixaEtaria").value = "todos";
      }
    });
  }

  container.innerHTML = chips.map((chip, indice) => `
    <button type="button" class="chip-filtro" data-chip="${indice}">
      ${escapar(chip.texto)} <span>✕</span>
    </button>
  `).join("");

  container.querySelectorAll("[data-chip]").forEach(botao => {
    botao.addEventListener("click", function() {
      chips[Number(this.dataset.chip)].limpar();
      aplicarFiltrosLivros();
    });
  });

  contador.textContent = String(chips.length);
  contador.classList.toggle("oculto", chips.length === 0);
}

function limparFiltrosAvancados() {
  ["filtroAutor", "filtroPreco", "filtroAvaliacao", "filtroFaixaEtaria"].forEach(id => {
    const select = document.getElementById(id);
    if (select) select.value = "todos";
  });

  filtroAtual = "todos";
  const categoria = document.getElementById("filtroCategoria");
  if (categoria) categoria.value = "todos";

  aplicarFiltrosLivros();
}

["filtroAutor", "filtroPreco", "filtroAvaliacao", "filtroFaixaEtaria"].forEach(id => {
  document.getElementById(id)?.addEventListener("change", aplicarFiltrosLivros);
});

document
  .getElementById("filtroCategoria")
  ?.addEventListener("change", function() {
    filtroAtual = this.value;
    aplicarFiltrosLivros();
  });

document
  .getElementById("botaoLimparFiltros")
  ?.addEventListener("click", limparFiltrosAvancados);

document
  .getElementById("botaoAbrirFiltros")
  ?.addEventListener("click", function() {
    const painel = document.getElementById("painelFiltros");
    painel.classList.toggle("oculto");

    const aberto = !painel.classList.contains("oculto");
    this.setAttribute("aria-expanded", String(aberto));
    this.classList.toggle("ativo", aberto);
  });

/* =====================================================
   RECOMENDAÇÕES PERSONALIZADAS
===================================================== */

function atualizarRecomendados() {
  const secao = document.getElementById("secaoRecomendados");
  const grade = document.getElementById("gradeRecomendados");

  if (!secao || !grade || !usuarioLogado) return;

  const categoriasInteresse = new Set();

  favoritos.forEach(id => {
    const livro = livros.find(item => item.id === id);
    if (livro) categoriasInteresse.add(livro.categoria);
  });

  (usuarioLogado.pedidos || []).forEach(pedido => {
    pedido.itens.forEach(item => {
      const livro = livros.find(l => l.id === item.id);
      if (livro) categoriasInteresse.add(livro.categoria);
    });
  });

  const comprados = new Set(
    (usuarioLogado.pedidos || []).flatMap(pedido => pedido.itens.map(item => item.id))
  );

  let candidatos;
  let subtitulo;

  if (categoriasInteresse.size) {
    candidatos = livros.filter(
      livro =>
        categoriasInteresse.has(livro.categoria) &&
        !favoritos.includes(livro.id) &&
        !comprados.has(livro.id)
    );
    subtitulo = "Baseado nos livros que você favoritou e comprou";
  } else {
    candidatos = [];
  }

  if (!candidatos.length) {
    candidatos = livros.filter(livro => !comprados.has(livro.id));
    subtitulo = "Os livros mais bem avaliados para você começar";
  }

  candidatos = [...candidatos]
    .sort((a, b) => b.avaliacaoMedia - a.avaliacaoMedia)
    .slice(0, 4);

  if (!candidatos.length) {
    secao.classList.add("oculto");
    return;
  }

  document.getElementById("subtituloRecomendados").textContent = subtitulo;
  preencherGrade("gradeRecomendados", candidatos);
  secao.classList.remove("oculto");
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

/* =====================================================
   CHECKOUT: entrega, pagamento e confirmação do pedido
===================================================== */

function marcarEtapaCarrinho(etapa) {
  document
    .querySelectorAll("#etapasCheckout [data-etapa-marcador]")
    .forEach(marcador => {
      marcador.classList.toggle(
        "ativa",
        marcador.dataset.etapaMarcador === etapa
      );
    });

  document.getElementById("conteudoCarrinho").classList.toggle(
    "oculto", etapa !== "carrinho"
  );

  document.getElementById("painelCheckout").classList.toggle(
    "oculto", etapa !== "checkout"
  );

  document.getElementById("confirmacaoPedido").classList.toggle(
    "oculto", etapa !== "sucesso"
  );
}

const cupons = {
  LEITURA10: { tipo: "percentual", valor: 10, descricao: "10% de desconto em todo o pedido" },
  LEITURA20: { tipo: "percentual", valor: 20, descricao: "20% de desconto", minimo: 120 },
  BEMVINDO15: { tipo: "percentual", valor: 15, descricao: "15% de desconto de boas-vindas" },
  FRETEGRATIS: { tipo: "frete", descricao: "Frete grátis neste pedido" },
  AURORA30: { tipo: "fixo", valor: 30, descricao: "R$ 30 de desconto", minimo: 150 }
};

let estadoCheckout = { metodoPagamento: "pix", cupom: null, enderecoId: null };
let ultimoPedidoAPagar = null;

function irParaCheckout() {
  if (!usuarioLogado) {
    mostrarNotificacao("Entre ou crie sua conta para finalizar a compra.");
    mostrarTelaLogin("login", "carrinho");
    return;
  }

  if (!usuarioLogado.enderecos.length) {
    mostrarNotificacao(
      "Cadastre um endereço de entrega em Minha conta antes de continuar."
    );
    abrirSecao("minha-conta");
    abrirPainel("enderecos");
    return;
  }

  renderizarCheckout();
  marcarEtapaCarrinho("checkout");
}

function gerarCodigoPix() {
  const aleatorio = Array.from({ length: 6 }, () =>
    Math.random().toString(36).slice(2, 10)
  ).join("").slice(0, 42).toUpperCase();

  return `00020126580014BR.GOV.BCB.PIX0136${aleatorio}5204000053039865802BR5913LIVRARIAAURORA6009SAOPAULO62070503***6304AURA`;
}

function gerarCodigoBoleto() {
  const digitos = quantidade =>
    Array.from({ length: quantidade }, () => Math.floor(Math.random() * 10)).join("");

  return `${digitos(5)}.${digitos(5)} ${digitos(5)}.${digitos(6)} ${digitos(5)}.${digitos(6)} ${digitos(1)} ${digitos(14)}`;
}

function mascaraCpf(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function cartoesCredito() {
  return usuarioLogado.cartoes.filter(cartao => cartao.tipo === "Crédito");
}

function selecionarMetodoPagamento(metodo) {
  estadoCheckout.metodoPagamento = metodo;

  document.querySelectorAll(".aba-pagamento").forEach(aba => {
    aba.classList.toggle("ativa", aba.dataset.metodo === metodo);
  });

  document.getElementById("painelPix").classList.toggle("oculto", metodo !== "pix");
  document.getElementById("painelCartaoCheckout").classList.toggle("oculto", metodo !== "cartao");
  document.getElementById("painelBoleto").classList.toggle("oculto", metodo !== "boleto");

  atualizarResumoCheckout();
}

function cartaoCheckoutEscolhido() {
  const marcado = document.querySelector('input[name="radioCartao"]:checked');

  if (!cartoesCredito().length || !marcado || marcado.value === "novo") {
    return "novo";
  }

  return marcado.value;
}

function atualizarFormCartaoCheckout() {
  document.getElementById("formCartaoCheckout").classList.toggle(
    "oculto",
    cartaoCheckoutEscolhido() !== "novo"
  );
}

function renderizarCartoesCheckout() {
  const listaCart = document.getElementById("listaCartoesCheckout");
  const cartoes = cartoesCredito();

  listaCart.classList.toggle("oculto", !cartoes.length);

  if (!cartoes.length) {
    listaCart.innerHTML = "";
    atualizarFormCartaoCheckout();
    return;
  }

  const temPrincipal = cartoes.some(cartao => cartao.principal);

  listaCart.innerHTML = cartoes.map((cartao, indice) => {
    const mascara = cartao.bandeira === "amex"
      ? `•••• •••••• •${cartao.ultimos4}`
      : `•••• •••• •••• ${cartao.ultimos4}`;

    const marcado = cartao.principal || (!temPrincipal && indice === 0);

    return `
      <label class="item-cartao selecionavel-item">
        <input type="radio" name="radioCartao" value="${cartao.id}" ${marcado ? "checked" : ""}>
        <div class="cartao-visual bandeira-${cartao.bandeira}">
          <div class="cartao-topo">
            <span class="chip"></span>
            <span>${nomesBandeira[cartao.bandeira]} • ${escapar(cartao.tipo)}</span>
          </div>
          <div class="cartao-numero">${mascara}</div>
          <div class="cartao-base">
            <span>${escapar(cartao.nome)}</span>
            <span>${escapar(cartao.validade)}</span>
          </div>
        </div>
      </label>
    `;
  }).join("") + `
    <label class="item-novo-cartao selecionavel-item">
      <input type="radio" name="radioCartao" value="novo">
      <div>
        <strong>➕ Usar outro cartão</strong>
        <p>Digite os dados do cartão nesta compra</p>
      </div>
    </label>
  `;

  atualizarFormCartaoCheckout();
}

function enderecoCheckoutAtual() {
  const lista = usuarioLogado.enderecos;

  return (
    lista.find(item => String(item.id) === String(estadoCheckout.enderecoId)) ||
    lista.find(item => item.principal) ||
    lista[0] ||
    null
  );
}

function renderizarEnderecoCheckout() {
  const area = document.getElementById("listaEnderecosCheckout");
  const endereco = enderecoCheckoutAtual();

  if (!endereco) {
    estadoCheckout.enderecoId = null;
    area.innerHTML = `
      <div class="vazio-painel">
        <span>📍</span>
        <p>Nenhum endereço cadastrado.</p>
        <button type="button" class="botao botao-auto" data-alterar-endereco>+ Adicionar endereço</button>
      </div>
    `;
    return;
  }

  estadoCheckout.enderecoId = endereco.id;

  area.innerHTML = `
    <article class="item-endereco endereco-escolhido">
      <div class="topo-endereco-escolhido">
        <strong>
          ${iconesEndereco[endereco.apelido] || "📌"}
          ${escapar(endereco.apelido)}
          ${endereco.principal ? '<span class="selo">Principal</span>' : ""}
        </strong>
        <button type="button" class="link-alterar" data-alterar-endereco>Alterar</button>
      </div>
      <p>
        ${escapar(endereco.rua)}, ${escapar(endereco.numero)}
        ${endereco.complemento ? " - " + escapar(endereco.complemento) : ""}
      </p>
      <p>${escapar(endereco.bairro)} • ${escapar(endereco.cidade)}/${escapar(endereco.uf)}</p>
      <p>CEP ${escapar(endereco.cep)}</p>
    </article>
  `;
}

function renderizarCheckout() {
  const principal = usuarioLogado.enderecos.find(item => item.principal) || usuarioLogado.enderecos[0];

  estadoCheckout = {
    metodoPagamento: "pix",
    cupom: null,
    enderecoId: principal ? principal.id : null
  };
  document.getElementById("campoCupom").value = "";
  document.getElementById("cupomAplicado").classList.remove("ativo");
  limparAviso("avisoCheckout");

  document.getElementById("checkoutCpf").value =
    usuarioLogado.cpf ? mascaraCpf(usuarioLogado.cpf) : "";

  document.getElementById("codigoPix").value = gerarCodigoPix();
  document.getElementById("codigoBoleto").value = gerarCodigoBoleto();

  ["ckNumero", "ckNome", "ckValidade", "ckCvv"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("ckSalvar").checked = false;

  renderizarEnderecoCheckout();

  renderizarCartoesCheckout();
  selecionarMetodoPagamento("pix");
}

document.querySelectorAll(".aba-pagamento").forEach(aba => {
  aba.addEventListener("click", function() {
    selecionarMetodoPagamento(this.dataset.metodo);
  });
});

document
  .getElementById("listaCartoesCheckout")
  .addEventListener("change", atualizarFormCartaoCheckout);

document.getElementById("checkoutCpf").addEventListener("input", function() {
  this.value = mascaraCpf(this.value);
});

document.getElementById("ckNumero").addEventListener("input", function() {
  let numeros = this.value.replace(/\D/g, "");
  numeros = numeros.slice(0, /^3[47]/.test(numeros) ? 15 : 16);
  this.value = formatarNumeroCartao(numeros);
});

document.getElementById("ckValidade").addEventListener("input", function() {
  const numeros = this.value.replace(/\D/g, "").slice(0, 4);
  this.value = numeros.length > 2 ? `${numeros.slice(0, 2)}/${numeros.slice(2)}` : numeros;
});

document.getElementById("ckCvv").addEventListener("input", function() {
  this.value = this.value.replace(/\D/g, "").slice(0, 4);
});

async function copiarCampo(idCampo, textoNotificacao) {
  const campo = document.getElementById(idCampo);

  try {
    await navigator.clipboard.writeText(campo.value);
  } catch (erro) {
    campo.select();
    document.execCommand("copy");
  }

  mostrarNotificacao(textoNotificacao);
}

document
  .getElementById("botaoCopiarPix")
  .addEventListener("click", () => copiarCampo("codigoPix", "Código Pix copiado!"));

document
  .getElementById("botaoCopiarBoleto")
  .addEventListener("click", () => copiarCampo("codigoBoleto", "Código do boleto copiado!"));

document
  .getElementById("botaoAplicarCupom")
  .addEventListener("click", function() {
    aplicarCupom();
  });

document
  .getElementById("campoCupom")
  .addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      aplicarCupom();
    }
  });

function aplicarCupom() {
  limparAviso("avisoCheckout");

  const codigo = document.getElementById("campoCupom").value.trim().toUpperCase();

  if (!codigo) return;

  const cupom = cupons[codigo];
  const subtotal = carrinho
    .map(id => livros.find(livro => livro.id === id))
    .filter(Boolean)
    .reduce((soma, livro) => soma + livro.preco, 0);

  if (!cupom) {
    mostrarAviso("avisoCheckout", "Cupom inválido ou expirado.");
    return;
  }

  if (cupom.minimo && subtotal < cupom.minimo) {
    mostrarAviso(
      "avisoCheckout",
      `Este cupom vale a partir de ${formatarPreco(cupom.minimo)} em compras.`
    );
    return;
  }

  estadoCheckout.cupom = { codigo, ...cupom };

  document.getElementById("campoCupom").value = "";
  document.getElementById("textoCupomAplicado").textContent =
    `Cupom ${codigo} aplicado: ${cupom.descricao}`;
  document.getElementById("cupomAplicado").classList.add("ativo");

  atualizarResumoCheckout();
  mostrarNotificacao("Cupom aplicado com sucesso!");
}

document
  .getElementById("botaoRemoverCupom")
  .addEventListener("click", function() {
    estadoCheckout.cupom = null;
    document.getElementById("cupomAplicado").classList.remove("ativo");
    atualizarResumoCheckout();
  });

function calcularTotaisCheckout() {
  const itens = carrinho
    .map(id => livros.find(livro => livro.id === id))
    .filter(Boolean);

  const subtotal = itens.reduce((soma, livro) => soma + livro.preco, 0);
  const economiaPromocoes = itens.reduce(
    (soma, livro) => soma + (livro.antigo ? livro.antigo - livro.preco : 0), 0
  );

  const freteOriginal = subtotal >= 149.90 ? 0 : 14.90;
  let frete = freteOriginal;
  let descontoCupom = 0;

  if (estadoCheckout.cupom) {
    if (estadoCheckout.cupom.tipo === "percentual") {
      descontoCupom = subtotal * (estadoCheckout.cupom.valor / 100);
    } else if (estadoCheckout.cupom.tipo === "fixo") {
      descontoCupom = Math.min(estadoCheckout.cupom.valor, subtotal);
    } else if (estadoCheckout.cupom.tipo === "frete") {
      frete = 0;
    }
  }

  const descontoPix = estadoCheckout.metodoPagamento === "pix"
    ? (subtotal - descontoCupom) * 0.05
    : 0;

  const descontoTotal = descontoCupom + descontoPix;
  const total = Math.max(subtotal - descontoTotal, 0) + frete;

  return {
    itens, subtotal, frete, freteOriginal, economiaPromocoes,
    descontoCupom, descontoPix, descontoTotal, total
  };
}

function atualizarParcelas(total) {
  const select = document.getElementById("ckParcelas");
  const anterior = Number(select.value) || 1;
  const maximo = Math.min(6, Math.max(1, Math.floor(total / 15)));

  select.innerHTML = Array.from({ length: maximo }, (_, i) => {
    const n = i + 1;
    const texto = n === 1
      ? `À vista de ${formatarPreco(total)}`
      : `${n}x de ${formatarPreco(total / n)} sem juros`;

    return `<option value="${n}">${texto}</option>`;
  }).join("");

  select.value = String(Math.min(anterior, maximo));
}

function textoFormaPagamento(metodo, total) {
  if (metodo === "pix") return "Pix (5% de desconto)";
  if (metodo === "boleto") return "Boleto bancário";

  const parcelas = Number(document.getElementById("ckParcelas").value) || 1;

  return parcelas > 1
    ? `Cartão de crédito em ${parcelas}x de ${formatarPreco(total / parcelas)}`
    : "Cartão de crédito à vista";
}

function atualizarResumoCheckout() {
  const totais = calcularTotaisCheckout();
  const {
    itens, subtotal, frete, freteOriginal, economiaPromocoes,
    descontoCupom, descontoPix, total
  } = totais;

  atualizarParcelas(total);

  document.getElementById("resumoCheckout").innerHTML = `
    <div class="itens-resumo">
      ${itens.map(livro => `
        <div class="item-resumo">
          <div class="capa-livro mini ${livro.capa}">${livro.titulo}</div>
          <div class="dados-item-resumo">
            <strong>${escapar(livro.titulo)}</strong>
            <p>${escapar(livro.autor)}</p>
            ${calcularDesconto(livro) > 0 ? `<span class="selo-livro desconto">-${calcularDesconto(livro)}%</span>` : ""}
          </div>
          <div class="preco-item-resumo">
            ${livro.antigo ? `<s>${formatarPreco(livro.antigo)}</s>` : ""}
            <span>${formatarPreco(livro.preco)}</span>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="linha-resumo">
      <span>Subtotal (${itens.length} ${itens.length === 1 ? "livro" : "livros"})</span>
      <span>${formatarPreco(subtotal)}</span>
    </div>
    ${descontoCupom > 0 ? `
      <div class="linha-resumo desconto-linha">
        <span>Cupom ${escapar(estadoCheckout.cupom.codigo)}</span>
        <span>- ${formatarPreco(descontoCupom)}</span>
      </div>
    ` : ""}
    ${descontoPix > 0 ? `
      <div class="linha-resumo desconto-linha">
        <span>Desconto Pix (5%)</span>
        <span>- ${formatarPreco(descontoPix)}</span>
      </div>
    ` : ""}
    <div class="linha-resumo ${frete === 0 ? "desconto-linha" : ""}">
      <span>Frete${frete === 0 && freteOriginal > 0 ? " (cupom)" : ""}</span>
      <span>${frete === 0 ? "Grátis" : formatarPreco(frete)}</span>
    </div>
    <div class="linha-resumo total">
      <span>Total</span>
      <span>${formatarPreco(total)}</span>
    </div>
    <div class="linha-resumo forma-resumo">
      <span>Forma de pagamento</span>
      <span>${textoFormaPagamento(estadoCheckout.metodoPagamento, total)}</span>
    </div>
    ${economiaPromocoes > 0 ? `
      <p class="economia-resumo">🎉 Você já está economizando ${formatarPreco(economiaPromocoes)} nas promoções dos livros.</p>
    ` : ""}
  `;
}

document
  .getElementById("ckParcelas")
  .addEventListener("change", atualizarResumoCheckout);

document
  .getElementById("botaoVoltarCarrinho")
  .addEventListener("click", function() {
    marcarEtapaCarrinho("carrinho");
  });

document
  .getElementById("botaoConfirmarPedido")
  .addEventListener("click", function() {
    limparAviso("avisoCheckout");

    const enderecoEscolhido = enderecoCheckoutAtual();

    if (!enderecoEscolhido) {
      mostrarAviso("avisoCheckout", "Selecione um endereço de entrega.");
      return;
    }

    const cpf = document.getElementById("checkoutCpf").value.replace(/\D/g, "");

    if (cpf.length !== 11) {
      mostrarAviso("avisoCheckout", "Digite o CPF com 11 dígitos (pode ser fictício).");
      document.getElementById("checkoutCpf").focus();
      return;
    }

    const metodo = estadoCheckout.metodoPagamento;
    let cartao = null;
    let parcelas = 1;

    if (metodo === "cartao") {
      parcelas = Number(document.getElementById("ckParcelas").value) || 1;
      const escolhido = cartaoCheckoutEscolhido();

      if (escolhido === "novo") {
        // Site de teste: aceita cartões fictícios, sem validar Luhn/vencimento.
        const numero = document.getElementById("ckNumero").value.replace(/\D/g, "");
        const nome = document.getElementById("ckNome").value.trim();
        const validade = document.getElementById("ckValidade").value;
        const cvv = document.getElementById("ckCvv").value;
        const bandeira = detectarBandeira(numero);

        if (numero.length < 4) {
          mostrarAviso("avisoCheckout", "Digite ao menos 4 dígitos do cartão (pode ser fictício).");
          return;
        }

        if (nome.length < 2) {
          mostrarAviso("avisoCheckout", "Digite o nome impresso no cartão.");
          return;
        }

        if (validade && !/^\d{1,2}\/\d{2}$/.test(validade)) {
          mostrarAviso("avisoCheckout", "Digite a validade no formato MM/AA (pode ser fictícia).");
          return;
        }

        const tamanhoCvv = bandeira === "amex" ? 4 : 3;

        if (cvv.length && cvv.length !== tamanhoCvv) {
          mostrarAviso("avisoCheckout", `O CVV costuma ter ${tamanhoCvv} dígitos (pode ser fictício).`);
          return;
        }

        cartao = {
          id: Date.now(),
          bandeira,
          ultimos4: numero.slice(-4),
          nome: nome.toUpperCase(),
          validade,
          tipo: "Crédito",
          principal: false
        };

        const jaSalvo = usuarioLogado.cartoes.some(
          item =>
            item.ultimos4 === cartao.ultimos4 &&
            item.bandeira === cartao.bandeira &&
            item.validade === cartao.validade
        );

        if (document.getElementById("ckSalvar").checked && !jaSalvo) {
          cartao.principal = !usuarioLogado.cartoes.length;
          usuarioLogado.cartoes.push(cartao);
        }
      } else {
        cartao = usuarioLogado.cartoes.find(
          item => String(item.id) === escolhido
        );
      }
    }

    const endereco = enderecoEscolhido;

    const { itens: itensCarrinho, subtotal, frete, descontoCupom, descontoPix, descontoTotal, total } =
      calcularTotaisCheckout();

    const itens = itensCarrinho.map(livro => ({
      id: livro.id,
      titulo: livro.titulo,
      autor: livro.autor,
      capa: livro.capa,
      preco: livro.preco
    }));

    const numeroPedido = `AU${Date.now().toString().slice(-8)}`;

    const previsao = new Date();
    previsao.setDate(previsao.getDate() + 7);

    const vencimentoBoleto = new Date();
    vencimentoBoleto.setDate(vencimentoBoleto.getDate() + 3);

    const vencimentoPix = new Date(Date.now() + 30 * 60 * 1000);

    let pagamento;

    if (metodo === "pix") {
      pagamento = { tipo: "pix", descricao: "Pix" };
    } else if (metodo === "boleto") {
      pagamento = { tipo: "boleto", descricao: "Boleto bancário" };
    } else {
      pagamento = {
        tipo: "cartao",
        bandeira: cartao.bandeira,
        mascara: cartao.bandeira === "amex"
          ? `•••• •••••• •${cartao.ultimos4}`
          : `•••• •••• •••• ${cartao.ultimos4}`,
        tipoCartao: "Crédito",
        parcelas
      };
    }

    const pedido = {
      numero: numeroPedido,
      data: new Date().toISOString(),
      previsaoEntrega: previsao.toISOString(),
      itens,
      subtotal,
      frete,
      desconto: descontoTotal,
      cupom: estadoCheckout.cupom ? estadoCheckout.cupom.codigo : null,
      total,
      endereco: {
        apelido: endereco.apelido,
        rua: endereco.rua,
        numero: endereco.numero,
        complemento: endereco.complemento,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf,
        cep: endereco.cep
      },
      pagamento,
      cpf,
      codigoRastreio: `BR${Date.now().toString().slice(-9)}AU`,
      // Só o cartão é cobrado na hora. Pix e boleto ficam "A pagar" até o pagamento.
      dataConfirmacaoBoleto: metodo === "cartao" ? new Date().toISOString() : null,
      pagamentoExpiraEm:
        metodo === "pix" ? vencimentoPix.toISOString()
        : metodo === "boleto" ? vencimentoBoleto.toISOString()
        : null,
      codigoPagamento:
        metodo === "pix" ? document.getElementById("codigoPix").value
        : metodo === "boleto" ? document.getElementById("codigoBoleto").value
        : null,
      entregaConfirmadaEm: null,
      canceladoEm: null,
      motivoCancelamento: null,
      devolucaoSolicitadaEm: null,
      motivoDevolucao: null
    };

    usuarioLogado.cpf = cpf;
    usuarioLogado.pedidos.unshift(pedido);
    salvarUsuario();

    carrinho = [];
    salvarCarrinho();
    atualizarCarrinho();

    document.getElementById("textoConfirmacaoPedido").textContent =
      metodo === "boleto"
        ? `Pedido ${numeroPedido} gerado! Pague o boleto até ${vencimentoBoleto.toLocaleDateString("pt-BR")} para liberarmos o envio.`
        : metodo === "pix"
          ? `Pedido ${numeroPedido} gerado! Pague o Pix até ${vencimentoPix.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })} para liberarmos o envio.`
          : `Pedido ${numeroPedido} confirmado! Ele chega em ${endereco.rua}, ` +
            `${endereco.numero} até ${previsao.toLocaleDateString("pt-BR")}.`;

    ultimoPedidoAPagar = metodo === "cartao" ? null : numeroPedido;
    document
      .getElementById("botaoPagarAgoraConfirmacao")
      .classList.toggle("oculto", metodo === "cartao");

    marcarEtapaCarrinho("sucesso");
    renderizarPedidos();
    atualizarRecomendados();
    mostrarNotificacao(
      metodo !== "cartao" ? "Pedido gerado! Aguardando pagamento." : "Pedido realizado com sucesso!"
    );
  });

/* =====================================================
   STATUS DINÂMICO DO PEDIDO (simulação estilo Shopee)
   Linha do tempo acelerada, só para fins de demonstração.
===================================================== */

const PREPARO_MS = 60 * 1000;    // 1 min "Preparando"
const CAMINHO_MS = 90 * 1000;    // 1,5 min "A caminho"

let filtroStatusPedidos = "todos";

function tempoInicioPreparo(pedido) {
  // "dataConfirmacaoBoleto" guarda a data em que o pagamento foi confirmado
  // (Pix, boleto ou cartão). Sem ela, o pedido continua "A pagar".
  return pedido.dataConfirmacaoBoleto
    ? new Date(pedido.dataConfirmacaoBoleto).getTime()
    : null;
}

/* Pedidos Pix/boleto não pagos dentro do prazo são cancelados automaticamente */
function aplicarExpiracoesPedidos() {
  if (!usuarioLogado) return;

  const agora = Date.now();
  let mudou = false;

  usuarioLogado.pedidos.forEach(pedido => {
    if (pedido.canceladoEm || pedido.dataConfirmacaoBoleto || !pedido.pagamentoExpiraEm) return;

    if (agora >= new Date(pedido.pagamentoExpiraEm).getTime()) {
      pedido.canceladoEm = pedido.pagamentoExpiraEm;
      pedido.motivoCancelamento = "Pagamento não realizado dentro do prazo";
      mudou = true;
    }
  });

  if (mudou) salvarUsuario();
}

function etapasTempoPedido(pedido) {
  const inicioPreparo = tempoInicioPreparo(pedido);

  if (!inicioPreparo) return null;

  const inicioCaminho = inicioPreparo + PREPARO_MS;
  const fimCaminhoAuto = inicioCaminho + CAMINHO_MS;

  return { inicioPreparo, inicioCaminho, fimCaminhoAuto };
}

function statusAtualPedido(pedido) {
  if (pedido.canceladoEm) return "Cancelado";
  if (pedido.devolucaoSolicitadaEm) return "Devolução e reembolso";
  if (pedido.entregaConfirmadaEm) return "Finalizado";

  const etapas = etapasTempoPedido(pedido);

  if (!etapas) return "A pagar";

  const agora = Date.now();

  if (agora < etapas.inicioCaminho) return "Preparando";
  if (agora < etapas.fimCaminhoAuto) return "A caminho";

  return "Finalizado";
}

function classeSeloStatus(status) {
  return {
    "A pagar": "a-pagar",
    "Preparando": "preparando",
    "A caminho": "caminho",
    "Finalizado": "confirmado",
    "Devolução e reembolso": "devolucao",
    "Cancelado": "cancelado"
  }[status] || "padrao";
}

function formatarDataHora(valor) {
  return new Date(valor).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function contarPedidosPorStatus() {
  const contagem = {};

  (usuarioLogado?.pedidos || []).forEach(pedido => {
    const status = statusAtualPedido(pedido);
    contagem[status] = (contagem[status] || 0) + 1;
  });

  return contagem;
}

function atualizarAbasPedidos() {
  const contagem = contarPedidosPorStatus();

  document.querySelectorAll("[data-status-pedido]").forEach(aba => {
    const status = aba.dataset.statusPedido;
    const total = status === "todos"
      ? (usuarioLogado?.pedidos || []).length
      : contagem[status] || 0;

    const rotulo = aba.dataset.rotuloOriginal || aba.textContent.trim();
    aba.dataset.rotuloOriginal = rotulo;

    aba.querySelector(".contagem-aba")?.remove();

    if (total > 0 && status !== "todos") {
      aba.insertAdjacentHTML(
        "beforeend",
        ` <span class="contagem-aba">${total}</span>`
      );
    }
  });
}

function construirAcoesPedido(pedido, status) {
  const acoes = [];

  if (status === "A pagar") {
    acoes.push(`
      <button type="button" class="botao-pagar-boleto" data-pagar-pedido="${pedido.numero}">
        💳 Pagar agora
      </button>
    `);
  }

  if (status === "A pagar" || status === "Preparando") {
    acoes.push(`
      <button type="button" class="botao-cancelar-pedido" data-cancelar-pedido="${pedido.numero}">
        Cancelar pedido
      </button>
    `);
  }

  if (status === "A caminho") {
    acoes.push(`
      <button type="button" class="botao-confirmar-entrega" data-confirmar-entrega="${pedido.numero}">
        ✓ Confirmar entrega
      </button>
    `);
  }

  if (status === "Finalizado" && !pedido.devolucaoSolicitadaEm) {
    acoes.push(`
      <button type="button" class="botao-devolucao" data-devolucao-pedido="${pedido.numero}">
        Devolução e reembolso
      </button>
    `);
  }

  acoes.push(`
    <button type="button" class="botao-pedido-secundario" data-rastrear-pedido="${pedido.numero}">
      📍 Rastrear
    </button>
    <button type="button" class="botao-pedido-secundario" data-detalhes-pedido="${pedido.numero}">
      Ver detalhes
    </button>
  `);

  return acoes.join("");
}

function renderizarPedidos() {
  const lista = document.getElementById("listaPedidos");

  if (!lista || !usuarioLogado) return;

  aplicarExpiracoesPedidos();
  atualizarAbasPedidos();

  if (!usuarioLogado.pedidos.length) {
    lista.className = "lista-vazia";
    lista.innerHTML = `
      <span>📦</span>
      <h2>Você ainda não fez nenhum pedido</h2>
      <p>Quando realizar uma compra, ela aparecerá aqui.</p>
      <button class="botao" data-secao="livros">Começar a comprar</button>
    `;
    return;
  }

  const pedidosComStatus = usuarioLogado.pedidos.map(pedido => ({
    pedido,
    status: statusAtualPedido(pedido)
  }));

  const filtrados = filtroStatusPedidos === "todos"
    ? pedidosComStatus
    : pedidosComStatus.filter(item => item.status === filtroStatusPedidos);

  if (!filtrados.length) {
    lista.className = "lista-vazia";
    lista.innerHTML = `
      <span>🗂️</span>
      <h2>Nenhum pedido em "${escapar(filtroStatusPedidos)}"</h2>
      <p>Assim que houver um pedido nesse status, ele aparece aqui.</p>
    `;
    return;
  }

  lista.className = "lista-itens pedidos";

  lista.innerHTML = filtrados.map(({ pedido, status }) => `
    <article class="item-pedido">
      <div class="cabecalho-pedido">
        <div>
          <strong>Pedido ${pedido.numero}</strong>
          <p>${new Date(pedido.data).toLocaleDateString("pt-BR")}</p>
        </div>
        <span class="selo status-${classeSeloStatus(status)}">
          ${escapar(status)}
        </span>
      </div>

      <div class="capas-pedido">
        ${pedido.itens.map(livro => `
          <div class="capa-livro mini ${livro.capa}" title="${escapar(livro.titulo)}">
            ${livro.titulo}
          </div>
        `).join("")}
      </div>

      <p class="itens-pedido">
        ${pedido.itens.map(livro => escapar(livro.titulo)).join(" • ")}
      </p>

      <p class="entrega-pedido">
        Entrega prevista até ${new Date(pedido.previsaoEntrega).toLocaleDateString("pt-BR")}
        em ${escapar(pedido.endereco.rua)}, ${escapar(pedido.endereco.numero)} -
        ${escapar(pedido.endereco.cidade)}/${escapar(pedido.endereco.uf)}
        ${pedido.cupom ? `<br>Cupom aplicado: <strong>${escapar(pedido.cupom)}</strong> (- ${formatarPreco(pedido.desconto)})` : ""}
      </p>

      ${status === "A pagar" ? `
        <p class="aviso-pagamento">
          ⏳ Aguardando pagamento (${pedido.pagamento.tipo === "boleto" ? "boleto" : "Pix"}).
          ${pedido.pagamentoExpiraEm ? `Pague até <strong>${formatarDataHora(pedido.pagamentoExpiraEm)}</strong> para não perder o pedido.` : ""}
        </p>
      ` : ""}

      ${status === "Cancelado" && pedido.motivoCancelamento ? `
        <p class="motivo-pedido">
          Motivo do cancelamento: <strong>${escapar(pedido.motivoCancelamento)}</strong>
        </p>
      ` : ""}

      ${status === "Devolução e reembolso" && pedido.motivoDevolucao ? `
        <p class="motivo-pedido">
          Motivo da devolução: <strong>${escapar(pedido.motivoDevolucao)}</strong>
        </p>
      ` : ""}

      <div class="rodape-pedido">
        <span>Pagamento: ${
          pedido.pagamento.tipo === "pix"
            ? "Pix"
            : pedido.pagamento.tipo === "boleto"
              ? "Boleto bancário"
              : `${nomesBandeira[pedido.pagamento.bandeira]} ${pedido.pagamento.mascara}` +
                (pedido.pagamento.parcelas > 1 ? ` em ${pedido.pagamento.parcelas}x` : "")
        }</span>
        <strong>${formatarPreco(pedido.total)}</strong>
      </div>

      <div class="acoes-pedido">
        ${construirAcoesPedido(pedido, status)}
      </div>
    </article>
  `).join("");
}

/* Abas de status em "Meus pedidos" */
document
  .getElementById("abasPedidosContainer")
  ?.addEventListener("click", function(event) {
    const aba = event.target.closest("[data-status-pedido]");

    if (!aba) return;

    event.stopPropagation();

    filtroStatusPedidos = aba.dataset.statusPedido;

    document.querySelectorAll(".aba-pedido, .item-dropdown-aba").forEach(item => {
      item.classList.remove("ativa");
    });

    const botaoMais = document.getElementById("botaoMaisAbasPedidos");
    const veioDoDropdown = aba.classList.contains("item-dropdown-aba");

    aba.classList.add("ativa");
    botaoMais.classList.toggle("ativa", veioDoDropdown);
    botaoMais.innerHTML = veioDoDropdown
      ? `${escapar(aba.dataset.rotuloOriginal || aba.textContent.trim())} <span>▾</span>`
      : `Mais <span>▾</span>`;

    document.getElementById("dropdownAbasPedidos").classList.add("oculto");

    renderizarPedidos();
  });

document
  .getElementById("botaoMaisAbasPedidos")
  ?.addEventListener("click", function(event) {
    event.stopPropagation();
    document.getElementById("dropdownAbasPedidos").classList.toggle("oculto");
  });

document.addEventListener("click", function() {
  document.getElementById("dropdownAbasPedidos")?.classList.add("oculto");
});

/* Atualiza o status dos pedidos automaticamente enquanto a aba está aberta */
setInterval(function() {
  if (document.getElementById("meus-pedidos")?.classList.contains("ativa")) {
    renderizarPedidos();
  }
}, 5000);

/* =====================================================
   AÇÕES RÁPIDAS DO PEDIDO: pagar boleto e confirmar entrega
===================================================== */

document.addEventListener("click", function(event) {
  const botaoPagar = event.target.closest("[data-pagar-pedido]");

  if (botaoPagar) {
    abrirModalPagamento(botaoPagar.dataset.pagarPedido);
  }

  const botaoEntrega = event.target.closest("[data-confirmar-entrega]");

  if (botaoEntrega) {
    const pedido = usuarioLogado.pedidos.find(
      item => item.numero === botaoEntrega.dataset.confirmarEntrega
    );

    if (pedido) {
      pedido.entregaConfirmadaEm = new Date().toISOString();
      salvarUsuario();
      renderizarPedidos();
      mostrarNotificacao("Entrega confirmada! Esperamos que você aproveite a leitura 📚");
    }
  }

  const botaoRastrear = event.target.closest("[data-rastrear-pedido]");

  if (botaoRastrear) {
    abrirModalRastreio(botaoRastrear.dataset.rastrearPedido);
  }

  const botaoDetalhes = event.target.closest("[data-detalhes-pedido]");

  if (botaoDetalhes) {
    abrirModalDetalhesPedido(botaoDetalhes.dataset.detalhesPedido);
  }
});

/* =====================================================
   RASTREIO DO PEDIDO (linha do tempo estilo Shopee)
===================================================== */

function abrirModalRastreio(numeroPedido) {
  const pedido = usuarioLogado.pedidos.find(item => item.numero === numeroPedido);

  if (!pedido) return;

  const status = statusAtualPedido(pedido);
  const etapas = etapasTempoPedido(pedido);

  const marcos = [
    {
      titulo: "Pedido realizado",
      data: pedido.data,
      feito: true
    },
    {
      titulo: pedido.pagamento.tipo === "boleto"
        ? "Pagamento do boleto confirmado"
        : pedido.pagamento.tipo === "pix"
          ? "Pagamento Pix confirmado"
          : "Pagamento aprovado",
      data: pedido.dataConfirmacaoBoleto,
      textoPendente: "Aguardando pagamento",
      feito: !!pedido.dataConfirmacaoBoleto
    },
    {
      titulo: "Pedido em preparação",
      data: etapas ? etapas.inicioPreparo : null,
      feito: !!etapas && ["Preparando", "A caminho", "Finalizado", "Devolução e reembolso"].includes(status)
    },
    {
      titulo: "Saiu para entrega",
      data: etapas ? etapas.inicioCaminho : null,
      feito: !!etapas && ["A caminho", "Finalizado", "Devolução e reembolso"].includes(status)
    },
    {
      titulo: "Entregue",
      data: pedido.entregaConfirmadaEm || (etapas ? etapas.fimCaminhoAuto : null),
      feito: status === "Finalizado" || status === "Devolução e reembolso"
    }
  ];

  let extra = "";

  if (status === "Cancelado") {
    extra = `
      <div class="marco-tempo cancelado">
        <span class="ponto-marco">✕</span>
        <div>
          <strong>Pedido cancelado</strong>
          <p>${formatarDataHora(pedido.canceladoEm)}</p>
          ${pedido.motivoCancelamento ? `<p class="motivo-marco">${escapar(pedido.motivoCancelamento)}</p>` : ""}
        </div>
      </div>
    `;
  }

  if (status === "Devolução e reembolso") {
    extra = `
      <div class="marco-tempo devolucao">
        <span class="ponto-marco">↩</span>
        <div>
          <strong>Devolução e reembolso solicitados</strong>
          <p>${formatarDataHora(pedido.devolucaoSolicitadaEm)}</p>
          ${pedido.motivoDevolucao ? `<p class="motivo-marco">${escapar(pedido.motivoDevolucao)}</p>` : ""}
        </div>
      </div>
    `;
  }

  document.getElementById("conteudoModalRastreio").innerHTML = `
    <h3>Rastrear pedido <span>#${escapar(pedido.numero)}</span></h3>
    <p class="codigo-rastreio">Código de rastreio: <strong>${escapar(pedido.codigoRastreio)}</strong></p>

    <div class="linha-do-tempo">
      ${status === "Cancelado" ? `
        <div class="marco-tempo feito">
          <span class="ponto-marco">✓</span>
          <div>
            <strong>Pedido realizado</strong>
            <p>${formatarDataHora(pedido.data)}</p>
          </div>
        </div>
        ${extra}
      ` : `
        ${marcos.map(marco => `
          <div class="marco-tempo ${marco.feito ? "feito" : "pendente"}">
            <span class="ponto-marco">${marco.feito ? "✓" : "•"}</span>
            <div>
              <strong>${escapar(marco.titulo)}</strong>
              <p>${marco.data ? formatarDataHora(marco.data) : (marco.textoPendente || "Aguardando etapa anterior")}</p>
            </div>
          </div>
        `).join("")}
        ${extra}
      `}
    </div>

    <p class="nota-rastreio">
      🚚 Simulação acelerada para fins de teste — os prazos reais de entrega seriam maiores.
    </p>
  `;

  document.getElementById("modalRastreio").classList.remove("oculto");
}

document
  .getElementById("modalRastreio")
  .addEventListener("click", function(event) {
    if (event.target.id === "modalRastreio" || event.target.id === "fecharModalRastreio") {
      this.classList.add("oculto");
    }
  });

/* =====================================================
   DETALHES COMPLETOS DO PEDIDO
===================================================== */

function abrirModalDetalhesPedido(numeroPedido) {
  const pedido = usuarioLogado.pedidos.find(item => item.numero === numeroPedido);

  if (!pedido) return;

  const status = statusAtualPedido(pedido);
  const subtotalItens = pedido.itens.reduce((soma, item) => soma + item.preco, 0);

  document.getElementById("conteudoModalDetalhesPedido").innerHTML = `
    <button class="fechar-modal" id="fecharModalDetalhesPedido">✕</button>

    <h3>Detalhes do pedido <span>#${escapar(pedido.numero)}</span></h3>
    <p class="subtitulo-detalhes-pedido">
      Realizado em ${formatarDataHora(pedido.data)} • Status: <strong>${escapar(status)}</strong>
    </p>

    <div class="itens-resumo">
      ${pedido.itens.map(livro => `
        <div class="item-resumo">
          <div class="capa-livro mini ${livro.capa}">${livro.titulo}</div>
          <div class="dados-item-resumo">
            <strong>${escapar(livro.titulo)}</strong>
            <p>${escapar(livro.autor)}</p>
          </div>
          <div class="preco-item-resumo">
            <span>${formatarPreco(livro.preco)}</span>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="resumo-checkout">
      <div class="linha-resumo">
        <span>Subtotal</span>
        <span>${formatarPreco(subtotalItens)}</span>
      </div>
      ${pedido.desconto > 0 ? `
        <div class="linha-resumo desconto-linha">
          <span>Descontos${pedido.cupom ? ` (cupom ${escapar(pedido.cupom)})` : ""}</span>
          <span>- ${formatarPreco(pedido.desconto)}</span>
        </div>
      ` : ""}
      <div class="linha-resumo ${pedido.frete === 0 ? "desconto-linha" : ""}">
        <span>Frete</span>
        <span>${pedido.frete === 0 ? "Grátis" : formatarPreco(pedido.frete)}</span>
      </div>
      <div class="linha-resumo total">
        <span>Total</span>
        <span>${formatarPreco(pedido.total)}</span>
      </div>
    </div>

    <div class="bloco-detalhes-pedido">
      <h4>Pagamento</h4>
      <p>
        ${
          pedido.pagamento.tipo === "pix"
            ? "Pix"
            : pedido.pagamento.tipo === "boleto"
              ? "Boleto bancário"
              : `${nomesBandeira[pedido.pagamento.bandeira]} ${pedido.pagamento.mascara}` +
                (pedido.pagamento.parcelas > 1 ? ` em ${pedido.pagamento.parcelas}x` : " à vista")
        }
      </p>
    </div>

    <div class="bloco-detalhes-pedido">
      <h4>Endereço de entrega</h4>
      <p>
        ${escapar(pedido.endereco.apelido)} — ${escapar(pedido.endereco.rua)}, ${escapar(pedido.endereco.numero)}
        ${pedido.endereco.complemento ? " - " + escapar(pedido.endereco.complemento) : ""}<br>
        ${escapar(pedido.endereco.bairro)}, ${escapar(pedido.endereco.cidade)}/${escapar(pedido.endereco.uf)} — CEP ${escapar(pedido.endereco.cep)}
      </p>
    </div>

    <div class="bloco-detalhes-pedido">
      <h4>Identificação</h4>
      <p>CPF na nota: ${escapar(mascaraCpf(pedido.cpf || ""))}</p>
    </div>
  `;

  document.getElementById("modalDetalhesPedido").classList.remove("oculto");
}

document
  .getElementById("modalDetalhesPedido")
  .addEventListener("click", function(event) {
    if (event.target.id === "modalDetalhesPedido" || event.target.id === "fecharModalDetalhesPedido") {
      this.classList.add("oculto");
    }
  });

/* =====================================================
   CANCELAMENTO DE PEDIDOS
===================================================== */

function abrirModalCancelamento(numeroPedido) {
  pedidoParaCancelar = numeroPedido;

  document.getElementById("numeroPedidoCancelar").textContent = `#${numeroPedido}`;

  document.querySelectorAll('input[name="motivoCancelamento"]').forEach(campo => {
    campo.checked = false;
  });

  document.getElementById("textoOutroMotivo").value = "";
  document.getElementById("campoOutroMotivo").classList.add("oculto");
  limparAviso("avisoCancelamento");

  document.getElementById("modalCancelamento").classList.remove("oculto");
}

function fecharModalCancelamento() {
  document.getElementById("modalCancelamento").classList.add("oculto");
  pedidoParaCancelar = null;
}

document
  .getElementById("modalCancelamento")
  .addEventListener("click", function(event) {
    if (
      event.target.id === "modalCancelamento" ||
      event.target.id === "fecharModalCancelamento" ||
      event.target.id === "botaoDesistirCancelamento"
    ) {
      fecharModalCancelamento();
    }
  });

document
  .getElementById("opcoesMotivoCancelamento")
  .addEventListener("change", function() {
    const outro = document.querySelector(
      'input[name="motivoCancelamento"][value="Outro motivo"]'
    );

    document
      .getElementById("campoOutroMotivo")
      .classList.toggle("oculto", !outro.checked);
  });

document
  .getElementById("botaoConfirmarCancelamento")
  .addEventListener("click", function() {
    limparAviso("avisoCancelamento");

    const escolhido = document.querySelector(
      'input[name="motivoCancelamento"]:checked'
    );

    if (!escolhido) {
      mostrarAviso("avisoCancelamento", "Selecione um motivo para o cancelamento.");
      return;
    }

    let motivo = escolhido.value;

    if (motivo === "Outro motivo") {
      const texto = document.getElementById("textoOutroMotivo").value.trim();

      if (!texto) {
        mostrarAviso("avisoCancelamento", "Escreva o motivo do cancelamento.");
        return;
      }

      motivo = texto;
    }

    const pedido = usuarioLogado.pedidos.find(
      item => item.numero === pedidoParaCancelar
    );

    if (pedido) {
      pedido.canceladoEm = new Date().toISOString();
      pedido.motivoCancelamento = motivo;
      salvarUsuario();
      renderizarPedidos();
    }

    fecharModalCancelamento();
    mostrarNotificacao("Pedido cancelado.");
  });

/* =====================================================
   DEVOLUÇÃO E REEMBOLSO
===================================================== */

let pedidoParaDevolucao = null;

function abrirModalDevolucao(numeroPedido) {
  pedidoParaDevolucao = numeroPedido;

  document.getElementById("numeroPedidoDevolucao").textContent = `#${numeroPedido}`;

  document.querySelectorAll('input[name="motivoDevolucao"]').forEach(campo => {
    campo.checked = false;
  });

  document.getElementById("textoOutroMotivoDevolucao").value = "";
  document.getElementById("campoOutroMotivoDevolucao").classList.add("oculto");
  limparAviso("avisoDevolucao");

  document.getElementById("modalDevolucao").classList.remove("oculto");
}

function fecharModalDevolucao() {
  document.getElementById("modalDevolucao").classList.add("oculto");
  pedidoParaDevolucao = null;
}

document
  .getElementById("modalDevolucao")
  .addEventListener("click", function(event) {
    if (
      event.target.id === "modalDevolucao" ||
      event.target.id === "fecharModalDevolucao" ||
      event.target.id === "botaoDesistirDevolucao"
    ) {
      fecharModalDevolucao();
    }
  });

document
  .getElementById("opcoesMotivoDevolucao")
  .addEventListener("change", function() {
    const outro = document.querySelector(
      'input[name="motivoDevolucao"][value="Outro motivo"]'
    );

    document
      .getElementById("campoOutroMotivoDevolucao")
      .classList.toggle("oculto", !outro.checked);
  });

document
  .getElementById("botaoConfirmarDevolucao")
  .addEventListener("click", function() {
    limparAviso("avisoDevolucao");

    const escolhido = document.querySelector(
      'input[name="motivoDevolucao"]:checked'
    );

    if (!escolhido) {
      mostrarAviso("avisoDevolucao", "Selecione um motivo para a devolução.");
      return;
    }

    let motivo = escolhido.value;

    if (motivo === "Outro motivo") {
      const texto = document.getElementById("textoOutroMotivoDevolucao").value.trim();

      if (!texto) {
        mostrarAviso("avisoDevolucao", "Escreva o motivo da devolução.");
        return;
      }

      motivo = texto;
    }

    const pedido = usuarioLogado.pedidos.find(
      item => item.numero === pedidoParaDevolucao
    );

    if (pedido) {
      pedido.devolucaoSolicitadaEm = new Date().toISOString();
      pedido.motivoDevolucao = motivo;
      salvarUsuario();
      renderizarPedidos();
    }

    fecharModalDevolucao();
    mostrarNotificacao("Devolução solicitada! Vamos analisar seu pedido.");
  });

document.addEventListener("click", function(event) {
  const botaoDevolucao = event.target.closest("[data-devolucao-pedido]");

  if (botaoDevolucao) {
    abrirModalDevolucao(botaoDevolucao.dataset.devolucaoPedido);
  }
});


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
  if (SECOES_COM_LOGIN.includes(nomeSecao) && !usuarioLogado) {
    mostrarTelaLogin("login", nomeSecao);
    return;
  }

  document.querySelectorAll(".pagina").forEach(secao => {
    secao.classList.remove("ativa");
  });

  const secao = document.getElementById(nomeSecao);

  if (!secao) return;

  secao.classList.add("ativa");

  document.querySelectorAll(".menu-principal a[data-secao]").forEach(link => {
    link.classList.toggle("ativo", link.dataset.secao === nomeSecao);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (nomeSecao === "carrinho") {
    marcarEtapaCarrinho("carrinho");
    atualizarCarrinho();
  }

  if (nomeSecao === "meus-pedidos") {
    renderizarPedidos();
  }

  if (nomeSecao === "minhas-listas") {
    atualizarFavoritos();
  }

  if (nomeSecao === "minha-conta") {
    iniciarConta();
  }
}

document.addEventListener("click", function(event) {
  const linkSecao = event.target.closest("[data-secao]");

  if (linkSecao) {
    event.preventDefault();
    abrirSecao(linkSecao.dataset.secao);
  }

  const detalhes = event.target.closest("[data-detalhes]");

  if (detalhes) {
    abrirDetalhesLivro(Number(detalhes.dataset.detalhes));
  }

  const comprar = event.target.closest("[data-comprar]");

  if (comprar) {
    const id = Number(comprar.dataset.comprar);

    if (!carrinho.includes(id)) {
      carrinho.push(id);

      salvarCarrinho();

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

    salvarCarrinho();

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

    salvarFavoritos();

    carregarLivros();
    atualizarFavoritos();
  }

  if (event.target.closest("[data-cancelar-pedido]")) {
    abrirModalCancelamento(
      event.target.closest("[data-cancelar-pedido]").dataset.cancelarPedido
    );
  }

  if (event.target.id === "finalizarCompra") {
    irParaCheckout();
  }

  if (event.target.id === "botaoSair") {
    localStorage.removeItem("usuarioAurora");
    sessionStorage.removeItem("usuarioAurora");
    usuarioLogado = null;

    formulario.reset();
    alternarParaLogin();

    iniciarComoVisitante();

    mostrarNotificacao(
      "Você saiu da sua conta."
    );
  }
});

document
  .getElementById("formPesquisa")
  ?.addEventListener("submit", function(event) {
    event.preventDefault();

    termoPesquisaAtual = document
      .getElementById("campoPesquisa")
      .value
      .toLowerCase()
      .trim();

    abrirSecao("livros");

    limparFiltrosAvancados();
  });

document
  .getElementById("formNewsletter")
  ?.addEventListener("submit", function(event) {
    event.preventDefault();

    const emailNews = document
      .getElementById("emailNewsletter")
      .value
      .trim()
      .toLowerCase();

    let lista = [];

    try {
      lista = JSON.parse(localStorage.getItem("newsletterAurora")) || [];
    } catch (erro) {
      lista = [];
    }

    if (!validarEmail(emailNews)) {
      mostrarNotificacao("Digite um e-mail válido.");
      return;
    }

    if (lista.includes(emailNews)) {
      mostrarNotificacao("Este e-mail já está no Clube Aurora. 😉");
      return;
    }

    lista.push(emailNews);
    localStorage.setItem("newsletterAurora", JSON.stringify(lista));

    this.reset();

    mostrarNotificacao(
      "Cadastro realizado na newsletter!"
    );
  });

/* =====================================================
   MINHA CONTA: dados, senha, endereços e pagamento
===================================================== */

let usuarioLogado = null;

function escapar(texto) {
  return String(texto).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[caractere]));
}

function salvarUsuario() {
  const posicao = usuarios.findIndex(
    usuario => usuario.id === usuarioLogado.id
  );

  if (posicao >= 0) {
    usuarios[posicao] = usuarioLogado;
  }

  localStorage.setItem("usuariosAurora", JSON.stringify(usuarios));
  guardarSessao(usuarioLogado);

  preencherInformacoesUsuario(usuarioLogado);
}

function mostrarAviso(id, texto, tipo = "erro") {
  const aviso = document.getElementById(id);

  if (!aviso) return;

  aviso.textContent = texto;
  aviso.className = `aviso-form ${tipo}`;
}

function limparAviso(id) {
  const aviso = document.getElementById(id);

  if (!aviso) return;

  aviso.textContent = "";
  aviso.className = "aviso-form";
}

function mascaraTelefone(valor) {
  const n = valor.replace(/\D/g, "").slice(0, 11);

  if (n.length === 0) return "";
  if (n.length <= 2) return `(${n}`;
  if (n.length <= 6) return `(${n.slice(0, 2)}) ${n.slice(2)}`;
  if (n.length <= 10) {
    return `(${n.slice(0, 2)}) ${n.slice(2, 6)}-${n.slice(6)}`;
  }

  return `(${n.slice(0, 2)}) ${n.slice(2, 7)}-${n.slice(7)}`;
}

function abrirPainel(nome) {
  document
    .querySelectorAll(".opcoes-conta [data-painel]")
    .forEach(botao => {
      botao.classList.toggle("ativo", botao.dataset.painel === nome);
    });

  document.querySelectorAll(".painel-item").forEach(painel => {
    painel.classList.toggle("ativo", painel.id === `painel-${nome}`);
  });
}

function fecharPainel() {
  document
    .querySelectorAll(".opcoes-conta [data-painel]")
    .forEach(botao => botao.classList.remove("ativo"));

  document
    .querySelectorAll(".painel-item")
    .forEach(painel => painel.classList.remove("ativo"));
}

function iniciarConta() {
  if (!usuarioLogado) return;

  preencherCamposDados();
  definirEdicaoDados(false);

  document.getElementById("formSenha").reset();
  atualizarForcaSenha("");

  fecharFormEndereco();
  fecharFormCartao();
  renderizarEnderecos();
  renderizarCartoes();

  ["avisoDados", "avisoSenha"].forEach(limparAviso);

  // ao entrar em Minha conta, só as abas aparecem; nenhum painel fica aberto
  fecharPainel();
}

/* ---------- DADOS PESSOAIS ---------- */

/* Preenche os campos com os dados salvos do usuário */
function preencherCamposDados() {
  if (!usuarioLogado) return;

  document.getElementById("contaNome").value = usuarioLogado.nome || "";
  document.getElementById("contaSobrenome").value = usuarioLogado.sobrenome || "";
  document.getElementById("contaEmail").value = usuarioLogado.email || "";
  document.getElementById("contaTelefone").value = usuarioLogado.telefone || "";
}

/* Habilita ou desabilita a edição dos dados pessoais */
function definirEdicaoDados(ativa) {
  document.getElementById("camposDados").disabled = !ativa;
  document.getElementById("formDados").classList.toggle("travado", !ativa);
  document.getElementById("acoesDados").classList.toggle("oculto", !ativa);
  document.getElementById("alternarEdicaoDados").checked = ativa;

  document.getElementById("rotuloEdicaoDados").textContent =
    ativa ? "Edição ativada" : "Edição desativada";

  document.getElementById("descricaoDados").textContent = ativa
    ? "Altere o que precisar e clique em salvar."
    : "Seus dados estão protegidos. Ative a edição para alterá-los.";
}

document
  .getElementById("alternarEdicaoDados")
  .addEventListener("change", function() {
    if (this.checked) {
      limparAviso("avisoDados");
      definirEdicaoDados(true);
      document.getElementById("contaNome").focus();
      return;
    }

    // desligou sem salvar: descarta o que foi digitado
    preencherCamposDados();
    limparAviso("avisoDados");
    definirEdicaoDados(false);
  });

document
  .getElementById("cancelarEdicaoDados")
  .addEventListener("click", function() {
    preencherCamposDados();
    limparAviso("avisoDados");
    definirEdicaoDados(false);
  });

document
  .getElementById("contaTelefone")
  .addEventListener("input", function() {
    this.value = mascaraTelefone(this.value);
  });

document
  .getElementById("formDados")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    if (document.getElementById("camposDados").disabled) return;

    const nome = document.getElementById("contaNome").value.trim();
    const sobrenome = document.getElementById("contaSobrenome").value.trim();
    const email = document.getElementById("contaEmail").value.trim().toLowerCase();
    const telefone = document.getElementById("contaTelefone").value.trim();
    const telefoneNumeros = telefone.replace(/\D/g, "");

    limparAviso("avisoDados");

    if (nome.length < 2) {
      mostrarAviso("avisoDados", "Digite seu nome.");
      return;
    }

    if (sobrenome.length < 2) {
      mostrarAviso("avisoDados", "Digite seu sobrenome.");
      return;
    }

    if (!validarEmail(email)) {
      mostrarAviso("avisoDados", "Digite um e-mail válido.");
      return;
    }

    if (telefoneNumeros.length < 10 || telefoneNumeros.length > 11) {
      mostrarAviso("avisoDados", "Digite um número de telefone válido.");
      return;
    }

    const emailEmUso = usuarios.some(
      usuario =>
        usuario.id !== usuarioLogado.id &&
        usuario.email === email
    );

    if (emailEmUso) {
      mostrarAviso("avisoDados", "Este e-mail já está sendo usado por outra conta.");
      return;
    }

    usuarioLogado.nome = nome;
    usuarioLogado.sobrenome = sobrenome;
    usuarioLogado.email = email;
    usuarioLogado.telefone = formatarTelefone(telefone);

    salvarUsuario();
    definirEdicaoDados(false);

    mostrarAviso("avisoDados", "Dados atualizados com sucesso!", "sucesso");
    mostrarNotificacao("Seus dados foram atualizados.");
  });

/* ---------- ALTERAR SENHA ---------- */

function calcularForcaSenha(senha) {
  let pontos = 0;

  if (senha.length >= 6) pontos++;
  if (senha.length >= 10) pontos++;
  if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) pontos++;
  if (/\d/.test(senha)) pontos++;
  if (/[^A-Za-z0-9]/.test(senha)) pontos++;

  return pontos;
}

function atualizarForcaSenha(senha) {
  const barra = document.querySelector("#forcaSenha span");
  const texto = document.getElementById("textoForca");

  if (!senha) {
    barra.style.width = "0";
    texto.textContent = "Dica: misture letras maiúsculas, minúsculas, números e símbolos.";
    return;
  }

  const pontos = calcularForcaSenha(senha);

  if (pontos <= 2) {
    barra.style.width = "33%";
    barra.style.background = "#c0392b";
    texto.textContent = "Senha fraca";
  } else if (pontos === 3) {
    barra.style.width = "66%";
    barra.style.background = "#e0a030";
    texto.textContent = "Senha média";
  } else {
    barra.style.width = "100%";
    barra.style.background = "#28703a";
    texto.textContent = "Senha forte";
  }
}

document
  .getElementById("senhaNova")
  .addEventListener("input", function() {
    atualizarForcaSenha(this.value);
  });

document
  .getElementById("mostrarSenhas")
  .addEventListener("change", function() {
    const tipo = this.checked ? "text" : "password";

    ["senhaAtual", "senhaNova", "senhaConfirma"].forEach(id => {
      document.getElementById(id).type = tipo;
    });
  });

document
  .getElementById("formSenha")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const atual = document.getElementById("senhaAtual").value;
    const nova = document.getElementById("senhaNova").value;
    const confirmacao = document.getElementById("senhaConfirma").value;

    limparAviso("avisoSenha");

    if (atual !== usuarioLogado.senha) {
      mostrarAviso("avisoSenha", "A senha atual está incorreta.");
      return;
    }

    if (nova.length < 6) {
      mostrarAviso("avisoSenha", "A nova senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    if (nova === atual) {
      mostrarAviso("avisoSenha", "A nova senha deve ser diferente da atual.");
      return;
    }

    if (nova !== confirmacao) {
      mostrarAviso("avisoSenha", "A confirmação não é igual à nova senha.");
      return;
    }

    usuarioLogado.senha = nova;
    salvarUsuario();

    this.reset();
    atualizarForcaSenha("");
    document.getElementById("mostrarSenhas").dispatchEvent(new Event("change"));

    mostrarAviso("avisoSenha", "Senha alterada com sucesso!", "sucesso");
    mostrarNotificacao("Sua senha foi atualizada.");
  });

/* ---------- ENDEREÇOS DE ENTREGA ---------- */

const formEndereco = document.getElementById("formEndereco");
const botaoNovoEndereco = document.getElementById("botaoNovoEndereco");
const iconesEndereco = { Casa: "🏠", Trabalho: "🏢", Outro: "📌" };

function renderizarEnderecos() {
  const lista = document.getElementById("listaEnderecos");
  const enderecos = usuarioLogado.enderecos;

  if (!enderecos.length) {
    lista.innerHTML = `
      <div class="vazio-painel">
        <span>📍</span>
        <p>Você ainda não cadastrou nenhum endereço de entrega.</p>
      </div>
    `;
    return;
  }

  const ordenados = [...enderecos].sort(
    (a, b) => Number(b.principal) - Number(a.principal)
  );

  lista.innerHTML = ordenados.map(endereco => `
    <article class="item-endereco ${endereco.principal ? "principal" : ""}">
      <strong>
        ${iconesEndereco[endereco.apelido] || "📌"}
        ${escapar(endereco.apelido)}
      </strong>
      ${endereco.principal ? '<span class="selo">Principal</span>' : ""}

      <p>
        ${escapar(endereco.rua)}, ${escapar(endereco.numero)}
        ${endereco.complemento ? " - " + escapar(endereco.complemento) : ""}
      </p>
      <p>${escapar(endereco.bairro)} • ${escapar(endereco.cidade)}/${escapar(endereco.uf)}</p>
      <p>CEP ${escapar(endereco.cep)}</p>

      <div class="acoes-item">
        <button type="button" data-end-editar="${endereco.id}">Editar</button>
        ${
          endereco.principal
            ? ""
            : `<button type="button" data-end-principal="${endereco.id}">Tornar principal</button>`
        }
        <button type="button" class="perigo" data-end-excluir="${endereco.id}">Excluir</button>
      </div>
    </article>
  `).join("");
}

function abrirFormEndereco(endereco) {
  formEndereco.reset();
  limparAviso("avisoEndereco");
  document.getElementById("statusCep").textContent = "";

  document.getElementById("endId").value = endereco ? endereco.id : "";
  document.getElementById("tituloFormEndereco").textContent =
    endereco ? "Editar endereço" : "Novo endereço";

  if (endereco) {
    document.getElementById("endApelido").value = endereco.apelido;
    document.getElementById("endCep").value = endereco.cep;
    document.getElementById("endRua").value = endereco.rua;
    document.getElementById("endNumero").value = endereco.numero;
    document.getElementById("endComplemento").value = endereco.complemento;
    document.getElementById("endBairro").value = endereco.bairro;
    document.getElementById("endCidade").value = endereco.cidade;
    document.getElementById("endUf").value = endereco.uf;
    document.getElementById("endPrincipal").checked = endereco.principal;
  }

  formEndereco.classList.remove("oculto");
  botaoNovoEndereco.classList.add("oculto");
  formEndereco.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fecharFormEndereco() {
  formEndereco.reset();
  formEndereco.classList.add("oculto");
  botaoNovoEndereco.classList.remove("oculto");
  limparAviso("avisoEndereco");
}

botaoNovoEndereco.addEventListener("click", () => abrirFormEndereco(null));

document
  .getElementById("cancelarEndereco")
  .addEventListener("click", fecharFormEndereco);

document
  .getElementById("endUf")
  .addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
  });

document
  .getElementById("endCep")
  .addEventListener("input", async function() {
    const numeros = this.value.replace(/\D/g, "").slice(0, 8);
    const status = document.getElementById("statusCep");

    this.value =
      numeros.length > 5
        ? `${numeros.slice(0, 5)}-${numeros.slice(5)}`
        : numeros;

    if (numeros.length < 8) {
      status.textContent = "";
      return;
    }

    status.textContent = "Buscando endereço...";

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${numeros}/json/`);
      const dados = await resposta.json();

      if (dados.erro) {
        status.textContent = "CEP não encontrado. Preencha manualmente.";
        return;
      }

      document.getElementById("endRua").value = dados.logradouro || "";
      document.getElementById("endBairro").value = dados.bairro || "";
      document.getElementById("endCidade").value = dados.localidade || "";
      document.getElementById("endUf").value = dados.uf || "";

      status.textContent = "Endereço encontrado ✓";
      document.getElementById("endNumero").focus();
    } catch (erro) {
      status.textContent = "Não foi possível buscar o CEP. Preencha manualmente.";
    }
  });

formEndereco.addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("endId").value;
  const cep = document.getElementById("endCep").value.trim();
  const rua = document.getElementById("endRua").value.trim();
  const numero = document.getElementById("endNumero").value.trim();
  const bairro = document.getElementById("endBairro").value.trim();
  const cidade = document.getElementById("endCidade").value.trim();
  const uf = document.getElementById("endUf").value.trim().toUpperCase();

  limparAviso("avisoEndereco");

  if (cep.replace(/\D/g, "").length !== 8) {
    mostrarAviso("avisoEndereco", "Digite um CEP válido com 8 números.");
    return;
  }

  if (rua.length < 3) {
    mostrarAviso("avisoEndereco", "Digite o nome da rua.");
    return;
  }

  if (!numero) {
    mostrarAviso("avisoEndereco", "Digite o número (ou S/N).");
    return;
  }

  if (bairro.length < 2) {
    mostrarAviso("avisoEndereco", "Digite o bairro.");
    return;
  }

  if (cidade.length < 2) {
    mostrarAviso("avisoEndereco", "Digite a cidade.");
    return;
  }

  if (!/^[A-Z]{2}$/.test(uf)) {
    mostrarAviso("avisoEndereco", "Digite a sigla do estado com 2 letras.");
    return;
  }

  const enderecos = usuarioLogado.enderecos;
  const existente = id ? enderecos.find(item => String(item.id) === id) : null;

  const dadosEndereco = {
    apelido: document.getElementById("endApelido").value,
    cep,
    rua,
    numero,
    complemento: document.getElementById("endComplemento").value.trim(),
    bairro,
    cidade,
    uf
  };

  let virarPrincipal = document.getElementById("endPrincipal").checked;

  if (!enderecos.length || (existente && existente.principal)) {
    virarPrincipal = true;
  }

  if (virarPrincipal) {
    enderecos.forEach(item => { item.principal = false; });
  }

  if (existente) {
    Object.assign(existente, dadosEndereco, { principal: virarPrincipal || existente.principal });
  } else {
    enderecos.push({
      id: Date.now(),
      ...dadosEndereco,
      principal: virarPrincipal
    });
  }

  salvarUsuario();
  renderizarEnderecos();
  fecharFormEndereco();

  mostrarNotificacao(
    existente ? "Endereço atualizado!" : "Endereço adicionado!"
  );
});

/* ---------- FORMAS DE PAGAMENTO ---------- */

const formCartao = document.getElementById("formCartao");
const botaoNovoCartao = document.getElementById("botaoNovoCartao");

const nomesBandeira = {
  visa: "Visa",
  mastercard: "Mastercard",
  elo: "Elo",
  amex: "American Express",
  hipercard: "Hipercard",
  outro: "Cartão"
};

function detectarBandeira(numero) {
  if (/^3[47]/.test(numero)) return "amex";

  if (/^(4011|4312|4389|4514|4576|5041|5066|5067|509|6277|6362|6363|650|6516|6550)/.test(numero)) {
    return "elo";
  }

  if (/^(606282|3841)/.test(numero)) return "hipercard";
  if (/^4/.test(numero)) return "visa";

  if (/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d\d|27[01]\d|2720)/.test(numero)) {
    return "mastercard";
  }

  return "outro";
}

function formatarNumeroCartao(numero) {
  if (/^3[47]/.test(numero)) {
    return [numero.slice(0, 4), numero.slice(4, 10), numero.slice(10, 15)]
      .filter(Boolean)
      .join(" ");
  }

  return (numero.match(/.{1,4}/g) || []).join(" ");
}

function validarLuhn(numero) {
  let soma = 0;
  let dobrar = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = Number(numero[i]);

    if (dobrar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }

    soma += digito;
    dobrar = !dobrar;
  }

  return soma % 10 === 0;
}

function atualizarPreviaCartao() {
  const numero = document.getElementById("cartNumero").value.replace(/\D/g, "");
  const nome = document.getElementById("cartNome").value.trim();
  const validade = document.getElementById("cartValidade").value;

  const bandeira = detectarBandeira(numero);
  const tamanho = bandeira === "amex" ? 15 : 16;

  document.getElementById("previaCartao").className =
    `cartao-visual previa-cartao bandeira-${bandeira}`;

  document.getElementById("previaBandeira").textContent = nomesBandeira[bandeira];
  document.getElementById("previaNumero").textContent =
    formatarNumeroCartao(numero.padEnd(tamanho, "•"));
  document.getElementById("previaNome").textContent =
    nome ? nome.toUpperCase() : "NOME NO CARTÃO";
  document.getElementById("previaValidade").textContent = validade || "MM/AA";
}

function renderizarCartoes() {
  const lista = document.getElementById("listaCartoes");
  const cartoes = usuarioLogado.cartoes;

  if (!cartoes.length) {
    lista.innerHTML = `
      <div class="vazio-painel">
        <span>💳</span>
        <p>Você ainda não salvou nenhuma forma de pagamento.</p>
      </div>
    `;
    return;
  }

  const ordenados = [...cartoes].sort(
    (a, b) => Number(b.principal) - Number(a.principal)
  );

  lista.innerHTML = ordenados.map(cartao => {
    const mascara = cartao.bandeira === "amex"
      ? `•••• •••••• •${cartao.ultimos4}`
      : `•••• •••• •••• ${cartao.ultimos4}`;

    return `
      <article class="item-cartao">
        <div class="cartao-visual bandeira-${cartao.bandeira}">
          <div class="cartao-topo">
            <span class="chip"></span>
            <span>${nomesBandeira[cartao.bandeira]} • ${escapar(cartao.tipo)}</span>
          </div>
          <div class="cartao-numero">${mascara}</div>
          <div class="cartao-base">
            <span>${escapar(cartao.nome)}</span>
            <span>${escapar(cartao.validade)}</span>
          </div>
        </div>

        <div class="acoes-item">
          ${cartao.principal ? '<span class="selo">Principal</span>' : `<button type="button" data-cartao-principal="${cartao.id}">Tornar principal</button>`}
          <button type="button" class="perigo" data-cartao-excluir="${cartao.id}">Remover</button>
        </div>
      </article>
    `;
  }).join("");
}

function abrirFormCartao() {
  formCartao.reset();
  atualizarPreviaCartao();
  limparAviso("avisoCartao");

  formCartao.classList.remove("oculto");
  botaoNovoCartao.classList.add("oculto");
  formCartao.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function fecharFormCartao() {
  formCartao.reset();
  atualizarPreviaCartao();
  formCartao.classList.add("oculto");
  botaoNovoCartao.classList.remove("oculto");
  limparAviso("avisoCartao");
}

botaoNovoCartao.addEventListener("click", abrirFormCartao);

document
  .getElementById("cancelarCartao")
  .addEventListener("click", fecharFormCartao);

document
  .getElementById("cartNumero")
  .addEventListener("input", function() {
    let numeros = this.value.replace(/\D/g, "");
    const limite = /^3[47]/.test(numeros) ? 15 : 16;

    numeros = numeros.slice(0, limite);
    this.value = formatarNumeroCartao(numeros);
    atualizarPreviaCartao();
  });

document
  .getElementById("cartNome")
  .addEventListener("input", atualizarPreviaCartao);

document
  .getElementById("cartValidade")
  .addEventListener("input", function() {
    const numeros = this.value.replace(/\D/g, "").slice(0, 4);

    this.value =
      numeros.length > 2
        ? `${numeros.slice(0, 2)}/${numeros.slice(2)}`
        : numeros;

    atualizarPreviaCartao();
  });

document
  .getElementById("cartCvv")
  .addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, "").slice(0, 4);
  });

formCartao.addEventListener("submit", function(event) {
  event.preventDefault();

  const numero = document.getElementById("cartNumero").value.replace(/\D/g, "");
  const nome = document.getElementById("cartNome").value.trim();
  const validade = document.getElementById("cartValidade").value;
  const cvv = document.getElementById("cartCvv").value;

  const bandeira = detectarBandeira(numero);

  limparAviso("avisoCartao");

  // Site de teste: aceita cartões fictícios, sem validar Luhn/vencimento.
  if (numero.length < 4) {
    mostrarAviso("avisoCartao", "Digite ao menos 4 dígitos (pode ser fictício).");
    return;
  }

  if (nome.length < 2) {
    mostrarAviso("avisoCartao", "Digite o nome impresso no cartão.");
    return;
  }

  if (validade && !/^\d{1,2}\/\d{2}$/.test(validade)) {
    mostrarAviso("avisoCartao", "Digite a validade no formato MM/AA (pode ser fictícia).");
    return;
  }

  const tamanhoCvv = bandeira === "amex" ? 4 : 3;

  if (cvv.length && cvv.length !== tamanhoCvv) {
    mostrarAviso("avisoCartao", `O CVV costuma ter ${tamanhoCvv} dígitos (pode ser fictício).`);
    return;
  }

  const ultimos4 = numero.slice(-4);
  const cartoes = usuarioLogado.cartoes;

  const duplicado = cartoes.some(
    cartao =>
      cartao.ultimos4 === ultimos4 &&
      cartao.bandeira === bandeira &&
      cartao.validade === validade
  );

  if (duplicado) {
    mostrarAviso("avisoCartao", "Este cartão já está salvo na sua conta.");
    return;
  }

  const virarPrincipal =
    document.getElementById("cartPrincipal").checked || !cartoes.length;

  if (virarPrincipal) {
    cartoes.forEach(cartao => { cartao.principal = false; });
  }

  cartoes.push({
    id: Date.now(),
    bandeira,
    ultimos4,
    nome: nome.toUpperCase(),
    validade,
    tipo: document.getElementById("cartTipo").value,
    principal: virarPrincipal
  });

  salvarUsuario();
  renderizarCartoes();
  fecharFormCartao();

  mostrarNotificacao("Forma de pagamento adicionada!");
});

/* ---------- CLIQUES DA ÁREA DA CONTA ---------- */

document.addEventListener("click", function(event) {
  if (!usuarioLogado) return;

  const painel = event.target.closest("[data-painel]");

  if (painel) {
    // Clique de novo no botão já selecionado: recolhe e desseleciona
    if (
      painel.closest(".opcoes-conta") &&
      painel.classList.contains("ativo")
    ) {
      fecharPainel();
      return;
    }

    abrirPainel(painel.dataset.painel);
    return;
  }

  const editarEndereco = event.target.closest("[data-end-editar]");

  if (editarEndereco) {
    const endereco = usuarioLogado.enderecos.find(
      item => String(item.id) === editarEndereco.dataset.endEditar
    );

    if (endereco) abrirFormEndereco(endereco);
    return;
  }

  const principalEndereco = event.target.closest("[data-end-principal]");

  if (principalEndereco) {
    usuarioLogado.enderecos.forEach(item => {
      item.principal = String(item.id) === principalEndereco.dataset.endPrincipal;
    });

    salvarUsuario();
    renderizarEnderecos();
    mostrarNotificacao("Endereço principal atualizado.");
    return;
  }

  const excluirEndereco = event.target.closest("[data-end-excluir]");

  if (excluirEndereco) {
    if (!confirm("Deseja realmente excluir este endereço?")) return;

    const id = excluirEndereco.dataset.endExcluir;

    usuarioLogado.enderecos = usuarioLogado.enderecos.filter(
      item => String(item.id) !== id
    );

    if (
      usuarioLogado.enderecos.length &&
      !usuarioLogado.enderecos.some(item => item.principal)
    ) {
      usuarioLogado.enderecos[0].principal = true;
    }

    salvarUsuario();
    renderizarEnderecos();
    mostrarNotificacao("Endereço excluído.");
    return;
  }

  const principalCartao = event.target.closest("[data-cartao-principal]");

  if (principalCartao) {
    usuarioLogado.cartoes.forEach(item => {
      item.principal = String(item.id) === principalCartao.dataset.cartaoPrincipal;
    });

    salvarUsuario();
    renderizarCartoes();
    mostrarNotificacao("Forma de pagamento principal atualizada.");
    return;
  }

  const excluirCartao = event.target.closest("[data-cartao-excluir]");

  if (excluirCartao) {
    if (!confirm("Deseja realmente remover este cartão?")) return;

    const id = excluirCartao.dataset.cartaoExcluir;

    usuarioLogado.cartoes = usuarioLogado.cartoes.filter(
      item => String(item.id) !== id
    );

    if (
      usuarioLogado.cartoes.length &&
      !usuarioLogado.cartoes.some(item => item.principal)
    ) {
      usuarioLogado.cartoes[0].principal = true;
    }

    salvarUsuario();
    renderizarCartoes();
    mostrarNotificacao("Cartão removido.");
  }
});


/* =====================================================
   PAGAR PEDIDO (Pix / boleto) — simulação
===================================================== */

function abrirModalPagamento(numeroPedido) {
  const pedido = usuarioLogado.pedidos.find(item => item.numero === numeroPedido);

  if (!pedido) return;

  const ehBoleto = pedido.pagamento.tipo === "boleto";

  if (!pedido.codigoPagamento) {
    pedido.codigoPagamento = ehBoleto ? gerarCodigoBoleto() : gerarCodigoPix();
    salvarUsuario();
  }

  document.getElementById("conteudoModalPagamento").innerHTML = `
    <h3>Pagar pedido <span>#${escapar(pedido.numero)}</span></h3>
    <p>
      ${ehBoleto ? "Boleto bancário" : "Pix"} •
      Total <strong>${formatarPreco(pedido.total)}</strong>
      ${pedido.pagamentoExpiraEm ? `<br>Vence em ${formatarDataHora(pedido.pagamentoExpiraEm)}` : ""}
    </p>

    ${ehBoleto ? "" : '<div class="qr-pix"></div>'}

    <div class="codigo-pix">
      <input type="text" id="codigoPagamentoModal" readonly value="${escapar(pedido.codigoPagamento)}">
      <button type="button" id="botaoCopiarPagamento">Copiar</button>
    </div>

    <div class="acoes-form">
      <button type="button" class="botao botao-auto" id="botaoSimularPagamento" data-numero="${escapar(pedido.numero)}">
        Simular pagamento
      </button>
      <button type="button" class="botao-contorno" id="botaoVoltarPagamento">Voltar</button>
    </div>

    <p class="nota-pix">Site de teste: o botão acima simula a confirmação do pagamento.</p>
  `;

  document.getElementById("modalPagamentoPedido").classList.remove("oculto");
}

function fecharModalPagamento() {
  document.getElementById("modalPagamentoPedido").classList.add("oculto");
}

document
  .getElementById("modalPagamentoPedido")
  .addEventListener("click", function(event) {
    const alvo = event.target;

    if (
      alvo.id === "modalPagamentoPedido" ||
      alvo.id === "fecharModalPagamento" ||
      alvo.id === "botaoVoltarPagamento"
    ) {
      fecharModalPagamento();
      return;
    }

    if (alvo.id === "botaoCopiarPagamento") {
      copiarCampo("codigoPagamentoModal", "Código copiado!");
      return;
    }

    if (alvo.id === "botaoSimularPagamento") {
      const pedido = usuarioLogado.pedidos.find(
        item => item.numero === alvo.dataset.numero
      );

      if (!pedido || pedido.canceladoEm) {
        fecharModalPagamento();
        mostrarNotificacao("Este pedido não pode mais ser pago.");
        renderizarPedidos();
        return;
      }

      pedido.dataConfirmacaoBoleto = new Date().toISOString();
      salvarUsuario();
      fecharModalPagamento();
      renderizarPedidos();
      mostrarNotificacao("Pagamento confirmado! Seu pedido entrou em preparação.");
    }
  });

document
  .getElementById("botaoPagarAgoraConfirmacao")
  .addEventListener("click", function() {
    if (ultimoPedidoAPagar) abrirModalPagamento(ultimoPedidoAPagar);
  });

/* =====================================================
   ALTERAR ENDEREÇO DE ENTREGA DENTRO DO CARRINHO
===================================================== */

const modalEnderecoCheckout = document.getElementById("modalEnderecoCheckout");
const formModalEndereco = document.getElementById("vistaFormEndereco");
let enderecoSelecionadoNoModal = null;

function mostrarVistaEndereco(vista) {
  document.getElementById("vistaListaEndereco").classList.toggle("oculto", vista !== "lista");
  formModalEndereco.classList.toggle("oculto", vista !== "form");
}

function renderizarListaModalEnderecos() {
  const lista = document.getElementById("listaModalEnderecos");
  const enderecos = [...usuarioLogado.enderecos].sort(
    (a, b) => Number(b.principal) - Number(a.principal)
  );

  lista.innerHTML = enderecos.length
    ? enderecos.map(endereco => `
        <label class="item-endereco selecionavel-item">
          <input
            type="radio"
            name="radioEnderecoModal"
            value="${endereco.id}"
            ${String(endereco.id) === String(enderecoSelecionadoNoModal) ? "checked" : ""}
          >
          <strong>
            ${iconesEndereco[endereco.apelido] || "📌"}
            ${escapar(endereco.apelido)}
            ${endereco.principal ? '<span class="selo">Principal</span>' : ""}
          </strong>
          <p>
            ${escapar(endereco.rua)}, ${escapar(endereco.numero)}
            ${endereco.complemento ? " - " + escapar(endereco.complemento) : ""}
          </p>
          <p>${escapar(endereco.bairro)} • ${escapar(endereco.cidade)}/${escapar(endereco.uf)}</p>
          <p>CEP ${escapar(endereco.cep)}</p>
          <div class="acoes-item">
            <button type="button" data-modal-end-editar="${endereco.id}">Editar</button>
          </div>
        </label>
      `).join("")
    : `<div class="vazio-painel"><span>📍</span><p>Você ainda não tem endereços cadastrados.</p></div>`;
}

function abrirModalEnderecoCheckout() {
  enderecoSelecionadoNoModal = estadoCheckout.enderecoId;

  renderizarListaModalEnderecos();
  mostrarVistaEndereco(usuarioLogado.enderecos.length ? "lista" : "form");

  if (!usuarioLogado.enderecos.length) abrirFormModalEndereco(null);

  modalEnderecoCheckout.classList.remove("oculto");
}

function fecharModalEnderecoCheckout() {
  modalEnderecoCheckout.classList.add("oculto");
}

function abrirFormModalEndereco(endereco) {
  formModalEndereco.reset();
  limparAviso("avisoModalEndereco");
  document.getElementById("mStatusCep").textContent = "";

  document.getElementById("mEndId").value = endereco ? endereco.id : "";
  document.getElementById("tituloFormModalEndereco").textContent =
    endereco ? "Editar endereço" : "Novo endereço";

  if (endereco) {
    document.getElementById("mEndApelido").value = endereco.apelido;
    document.getElementById("mEndCep").value = endereco.cep;
    document.getElementById("mEndRua").value = endereco.rua;
    document.getElementById("mEndNumero").value = endereco.numero;
    document.getElementById("mEndComplemento").value = endereco.complemento;
    document.getElementById("mEndBairro").value = endereco.bairro;
    document.getElementById("mEndCidade").value = endereco.cidade;
    document.getElementById("mEndUf").value = endereco.uf;
    document.getElementById("mEndPrincipal").checked = endereco.principal;
  }

  mostrarVistaEndereco("form");
}

document.addEventListener("click", function(event) {
  if (!usuarioLogado) return;

  if (event.target.closest("[data-alterar-endereco]")) {
    abrirModalEnderecoCheckout();
    return;
  }

  const editar = event.target.closest("[data-modal-end-editar]");

  if (editar) {
    event.preventDefault();
    const endereco = usuarioLogado.enderecos.find(
      item => String(item.id) === editar.dataset.modalEndEditar
    );

    if (endereco) abrirFormModalEndereco(endereco);
  }
});

modalEnderecoCheckout.addEventListener("click", function(event) {
  const alvo = event.target;

  if (alvo.id === "modalEnderecoCheckout" || alvo.id === "fecharModalEnderecoCheckout") {
    fecharModalEnderecoCheckout();
    return;
  }

  if (alvo.id === "botaoNovoEnderecoCheckout") {
    abrirFormModalEndereco(null);
    return;
  }

  if (alvo.id === "botaoVoltarListaEndereco") {
    if (usuarioLogado.enderecos.length) {
      renderizarListaModalEnderecos();
      mostrarVistaEndereco("lista");
    } else {
      fecharModalEnderecoCheckout();
    }
    return;
  }

  if (alvo.id === "botaoUsarEndereco") {
    const marcado = document.querySelector('input[name="radioEnderecoModal"]:checked');

    if (!marcado) {
      mostrarNotificacao("Selecione um endereço.");
      return;
    }

    estadoCheckout.enderecoId = marcado.value;
    renderizarEnderecoCheckout();
    fecharModalEnderecoCheckout();
    mostrarNotificacao("Endereço de entrega alterado.");
  }
});

modalEnderecoCheckout.addEventListener("change", function(event) {
  if (event.target.name === "radioEnderecoModal") {
    enderecoSelecionadoNoModal = event.target.value;
  }
});

document.getElementById("mEndUf").addEventListener("input", function() {
  this.value = this.value.replace(/[^a-zA-Z]/g, "").toUpperCase();
});

document.getElementById("mEndCep").addEventListener("input", async function() {
  const numeros = this.value.replace(/\D/g, "").slice(0, 8);
  const status = document.getElementById("mStatusCep");

  this.value = numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros;

  if (numeros.length < 8) {
    status.textContent = "";
    return;
  }

  status.textContent = "Buscando endereço...";

  try {
    const resposta = await fetch(`https://viacep.com.br/ws/${numeros}/json/`);
    const dados = await resposta.json();

    if (dados.erro) {
      status.textContent = "CEP não encontrado. Preencha manualmente.";
      return;
    }

    document.getElementById("mEndRua").value = dados.logradouro || "";
    document.getElementById("mEndBairro").value = dados.bairro || "";
    document.getElementById("mEndCidade").value = dados.localidade || "";
    document.getElementById("mEndUf").value = dados.uf || "";

    status.textContent = "Endereço encontrado ✓";
    document.getElementById("mEndNumero").focus();
  } catch (erro) {
    status.textContent = "Não foi possível buscar o CEP. Preencha manualmente.";
  }
});

formModalEndereco.addEventListener("submit", function(event) {
  event.preventDefault();

  const id = document.getElementById("mEndId").value;
  const cep = document.getElementById("mEndCep").value.trim();
  const rua = document.getElementById("mEndRua").value.trim();
  const numero = document.getElementById("mEndNumero").value.trim();
  const bairro = document.getElementById("mEndBairro").value.trim();
  const cidade = document.getElementById("mEndCidade").value.trim();
  const uf = document.getElementById("mEndUf").value.trim().toUpperCase();

  limparAviso("avisoModalEndereco");

  if (cep.replace(/\D/g, "").length !== 8) {
    mostrarAviso("avisoModalEndereco", "Digite um CEP válido com 8 números.");
    return;
  }
  if (rua.length < 3) {
    mostrarAviso("avisoModalEndereco", "Digite o nome da rua.");
    return;
  }
  if (!numero) {
    mostrarAviso("avisoModalEndereco", "Digite o número (ou S/N).");
    return;
  }
  if (bairro.length < 2) {
    mostrarAviso("avisoModalEndereco", "Digite o bairro.");
    return;
  }
  if (cidade.length < 2) {
    mostrarAviso("avisoModalEndereco", "Digite a cidade.");
    return;
  }
  if (!/^[A-Z]{2}$/.test(uf)) {
    mostrarAviso("avisoModalEndereco", "Digite a sigla do estado com 2 letras.");
    return;
  }

  const enderecos = usuarioLogado.enderecos;
  const existente = id ? enderecos.find(item => String(item.id) === id) : null;

  const dados = {
    apelido: document.getElementById("mEndApelido").value,
    cep,
    rua,
    numero,
    complemento: document.getElementById("mEndComplemento").value.trim(),
    bairro,
    cidade,
    uf
  };

  let virarPrincipal = document.getElementById("mEndPrincipal").checked;

  if (!enderecos.length || (existente && existente.principal)) {
    virarPrincipal = true;
  }

  if (virarPrincipal) {
    enderecos.forEach(item => { item.principal = false; });
  }

  let salvo;

  if (existente) {
    Object.assign(existente, dados, { principal: virarPrincipal || existente.principal });
    salvo = existente;
  } else {
    salvo = { id: Date.now(), ...dados, principal: virarPrincipal };
    enderecos.push(salvo);
  }

  salvarUsuario();
  renderizarEnderecos();

  estadoCheckout.enderecoId = salvo.id;
  renderizarEnderecoCheckout();
  fecharModalEnderecoCheckout();

  mostrarNotificacao(existente ? "Endereço atualizado e selecionado!" : "Endereço adicionado e selecionado!");
});

/* Botões de categoria da página inicial abrem o catálogo já filtrado */
document.addEventListener("click", function(event) {
  const categoria = event.target.closest("[data-categoria]");

  if (!categoria) return;

  abrirSecao("livros");

  filtroAtual = categoria.dataset.categoria;

  const select = document.getElementById("filtroCategoria");
  if (select) select.value = filtroAtual;

  aplicarFiltrosLivros();
});

function carregarSessaoAtiva() {
  const usuarioAtivo = lerSessao();

  if (!usuarioAtivo) {
    iniciarComoVisitante();
    return;
  }

  lembrarSessao = !!localStorage.getItem("usuarioAurora");

  abrirSite(usuarioAtivo);
}

/* =====================================================
   FAIXA PROMOCIONAL ROTATIVA
===================================================== */

const mensagensPromocionais = [
  "🚚 Frete grátis nas compras acima de R$ 149,90",
  "🎁 Use o cupom LEITURA10 e ganhe 10% de desconto",
  "✨ BEMVINDO15: 15% de desconto de boas-vindas",
  "📦 Cupom FRETEGRATIS: frete grátis em qualquer pedido",
  "💰 AURORA30: R$ 30 de desconto acima de R$ 150",
  "🔑 Pague com Pix e ganhe mais 5% de desconto"
];

let indiceMensagemPromocional = 0;

function trocarMensagemPromocional() {
  const elemento = document.getElementById("faixaPromocionalTexto");

  if (!elemento) return;

  elemento.classList.add("trocando");

  setTimeout(() => {
    indiceMensagemPromocional =
      (indiceMensagemPromocional + 1) % mensagensPromocionais.length;

    elemento.textContent = mensagensPromocionais[indiceMensagemPromocional];
    elemento.classList.remove("trocando");
  }, 250);
}

setInterval(trocarMensagemPromocional, 4500);

carregarSessaoAtiva();

/* =====================================================
   ATENDIMENTO: fale conosco (IA + atendente), entrega e ajuda
===================================================== */

const VISTAS_ATENDIMENTO = ["chat", "entrega", "ajuda"];

function abrirAtendimento(vista) {
  if (!VISTAS_ATENDIMENTO.includes(vista)) return;

  if (!document.getElementById("atendimento").classList.contains("ativa")) {
    abrirSecao("atendimento");
  }

  VISTAS_ATENDIMENTO.forEach(nome => {
    document
      .getElementById(`vista-${nome}`)
      .classList.toggle("oculto", nome !== vista);
  });

  document.querySelectorAll("[data-card-atendimento]").forEach(card => {
    card.classList.toggle("ativo", card.dataset.cardAtendimento === vista);
  });

  if (vista === "chat") prepararChat();
  if (vista === "entrega") renderizarRastreioAtendimento();
  if (vista === "ajuda") renderizarAjuda();

  document
    .getElementById("areaAtendimento")
    .scrollIntoView({ behavior: "smooth", block: "start" });
}

function fecharAtendimento() {
  VISTAS_ATENDIMENTO.forEach(nome => {
    document.getElementById(`vista-${nome}`).classList.add("oculto");
  });

  document.querySelectorAll("[data-card-atendimento]").forEach(card => {
    card.classList.remove("ativo");
  });
}

document.addEventListener("click", function(event) {
  const alvo = event.target.closest(
    "[data-vista-atendimento], [data-card-atendimento]"
  );

  if (!alvo) return;

  event.preventDefault();

  const vista = alvo.dataset.vistaAtendimento || alvo.dataset.cardAtendimento;

  // Clique de novo num dos 3 cards já selecionado: recolhe e desseleciona
  const dentroDosCards = alvo.closest("#cardsAtendimento");
  const vistaAberta = !document
    .getElementById(`vista-${vista}`)
    ?.classList.contains("oculto");

  if (dentroDosCards && vistaAberta) {
    fecharAtendimento();
    return;
  }

  abrirAtendimento(vista);
});

/* ---------- utilitários ---------- */

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function normalizarTexto(texto) {
  return String(texto)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function listaPT(itens) {
  if (itens.length <= 1) return itens.join("");
  return `${itens.slice(0, -1).join(", ")} e ${itens[itens.length - 1]}`;
}

/* =====================================================
   ENTREGA E PEDIDOS: prazo por CEP e rastreio
===================================================== */

const FRETE_PADRAO = 14.90;
const FRETE_GRATIS_A_PARTIR_DE = 149.90;

const REGIOES_ENTREGA = {
  "0": { nome: "Grande São Paulo", dias: [2, 4] },
  "1": { nome: "Interior e litoral de São Paulo", dias: [3, 5] },
  "2": { nome: "Rio de Janeiro e Espírito Santo", dias: [4, 6] },
  "3": { nome: "Minas Gerais", dias: [4, 6] },
  "4": { nome: "Bahia e Sergipe", dias: [6, 9] },
  "5": { nome: "Pernambuco, Alagoas, Paraíba e Rio Grande do Norte", dias: [7, 10] },
  "6": { nome: "Norte e Nordeste (CE, PI, MA, PA, AM e outros)", dias: [8, 12] },
  "7": { nome: "Centro-Oeste, Tocantins e Rondônia", dias: [6, 9] },
  "8": { nome: "Paraná e Santa Catarina", dias: [4, 7] },
  "9": { nome: "Rio Grande do Sul", dias: [5, 8] }
};

function somarDiasUteis(dataInicial, quantidade) {
  const data = new Date(dataInicial);
  let restantes = quantidade;

  while (restantes > 0) {
    data.setDate(data.getDate() + 1);
    const diaSemana = data.getDay();

    if (diaSemana !== 0 && diaSemana !== 6) restantes--;
  }

  return data;
}

function formatarDataCurta(data) {
  return data.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit"
  });
}

function estimarEntrega(cepNumeros) {
  const regiao = REGIOES_ENTREGA[cepNumeros[0]];

  if (!regiao) return null;

  const hoje = new Date();

  return {
    cep: cepNumeros.replace(/^(\d{5})(\d{3})$/, "$1-$2"),
    regiao: regiao.nome,
    minimo: regiao.dias[0],
    maximo: regiao.dias[1],
    dataMinima: somarDiasUteis(hoje, regiao.dias[0]),
    dataMaxima: somarDiasUteis(hoje, regiao.dias[1])
  };
}

function htmlEstimativaEntrega(estimativa) {
  return `
    <div class="resultado-prazo">
      <p class="regiao-prazo">📍 CEP ${estimativa.cep} · ${escapar(estimativa.regiao)}</p>

      <div class="opcao-prazo">
        <div>
          <strong>Entrega padrão</strong>
          <small>${estimativa.minimo} a ${estimativa.maximo} dias úteis</small>
        </div>
        <div class="prazo-datas">
          Chega entre
          <b>${formatarDataCurta(estimativa.dataMinima)}</b> e
          <b>${formatarDataCurta(estimativa.dataMaxima)}</b>
        </div>
        <div class="prazo-preco">
          ${formatarPreco(FRETE_PADRAO)}
          <small>grátis acima de ${formatarPreco(FRETE_GRATIS_A_PARTIR_DE)}</small>
        </div>
      </div>

      <p class="nota-prazo">
        Estimativa pela região do CEP, já contando 1 dia útil para separar e embalar.
        Com o cupom <strong>FRETEGRATIS</strong> o frete sai por nossa conta.
      </p>
    </div>
  `;
}

document
  .getElementById("prazoCep")
  .addEventListener("input", function() {
    const numeros = this.value.replace(/\D/g, "").slice(0, 8);
    this.value = numeros.length > 5
      ? `${numeros.slice(0, 5)}-${numeros.slice(5)}`
      : numeros;
  });

document
  .getElementById("formPrazoCep")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const resultado = document.getElementById("resultadoPrazo");
    const numeros = document.getElementById("prazoCep").value.replace(/\D/g, "");

    if (numeros.length !== 8) {
      resultado.innerHTML = `<p class="aviso-bloco">Digite um CEP válido com 8 números.</p>`;
      return;
    }

    const estimativa = estimarEntrega(numeros);

    resultado.innerHTML = estimativa
      ? htmlEstimativaEntrega(estimativa)
      : `<p class="aviso-bloco">Não conseguimos estimar para esse CEP.</p>`;
  });

function renderizarRastreioAtendimento() {
  const area = document.getElementById("rastreioAtendimento");

  if (!area) return;

  if (!usuarioLogado) {
    area.innerHTML = `
      <div class="vazio-bloco">
        <span>🔒</span>
        <p>Entre na sua conta para acompanhar seus pedidos.</p>
        <button type="button" class="botao botao-auto" id="botaoEntrarRastreio">Entrar</button>
      </div>`;

    document.getElementById("botaoEntrarRastreio")?.addEventListener("click", function() {
      mostrarTelaLogin("login", "atendimento");
    });
    return;
  }

  aplicarExpiracoesPedidos();

  const pedidos = usuarioLogado.pedidos || [];

  if (!pedidos.length) {
    area.innerHTML = `
      <div class="vazio-bloco">
        <span>📭</span>
        <p>Você ainda não tem pedidos para rastrear.</p>
        <button type="button" class="botao-contorno" data-secao="livros">Ver livros</button>
      </div>
    `;
    return;
  }

  area.innerHTML = pedidos.slice(0, 4).map(pedido => {
    const status = statusAtualPedido(pedido);

    return `
      <div class="mini-pedido">
        <div class="mini-pedido-info">
          <strong>Pedido ${escapar(pedido.numero)}</strong>
          <small>
            ${new Date(pedido.data).toLocaleDateString("pt-BR")} ·
            ${formatarPreco(pedido.total)}
          </small>
        </div>
        <span class="selo status-${classeSeloStatus(status)}">${escapar(status)}</span>
        <button type="button" class="botao-contorno" data-rastrear-pedido="${escapar(pedido.numero)}">
          Rastrear
        </button>
      </div>
    `;
  }).join("") + (pedidos.length > 4 ? `
    <button type="button" class="link-bloco" data-secao="meus-pedidos">
      Ver todos os pedidos →
    </button>
  ` : "");
}

/* =====================================================
   CENTRAL DE AJUDA
===================================================== */

const FAQ_CATEGORIAS = [
  "Pedidos",
  "Pagamento",
  "Entrega",
  "Trocas e devoluções",
  "Cupons e ofertas",
  "Minha conta"
];

const FAQ = [
  {
    cat: "Pedidos",
    p: "Como acompanho meu pedido?",
    tags: "rastrear rastreio status onde esta codigo",
    r: `Acesse <strong>Meus pedidos</strong> e clique em <strong>Rastrear</strong> no pedido desejado. Lá você vê cada etapa: pedido confirmado, preparando, a caminho e entregue, além do código de rastreio.
        <br><button type="button" class="ajuda-link" data-secao="meus-pedidos">Ir para Meus pedidos →</button>`
  },
  {
    cat: "Pedidos",
    p: "Posso cancelar um pedido?",
    tags: "cancelar cancelamento desistir",
    r: `Pode, enquanto o pedido estiver <strong>A pagar</strong> ou <strong>Preparando</strong>. Em Meus pedidos, clique em <strong>Cancelar pedido</strong> e conte o motivo. Se ele já estiver a caminho, aguarde a entrega e solicite a devolução.`
  },
  {
    cat: "Pedidos",
    p: "Fiz o pedido com Pix ou boleto e ainda não paguei. E agora?",
    tags: "pix boleto pagar depois pendente a pagar expira",
    r: `O pedido fica com status <strong>A pagar</strong>. Em Meus pedidos, clique em <strong>Pagar agora</strong> para ver o código novamente. O Pix vale por 30 minutos e o boleto por 3 dias; passado o prazo, o pedido é cancelado automaticamente.`
  },
  {
    cat: "Pagamento",
    p: "Quais formas de pagamento vocês aceitam?",
    tags: "pix cartao credito boleto pagamento",
    r: `Aceitamos <strong>Pix</strong> (com 5% de desconto), <strong>cartão de crédito</strong> e <strong>boleto bancário</strong>.`
  },
  {
    cat: "Pagamento",
    p: "Dá para parcelar a compra?",
    tags: "parcelar parcelas sem juros cartao",
    r: `Sim! No cartão de crédito você parcela em até <strong>6x sem juros</strong>, com parcela mínima de R$ 15,00.`
  },
  {
    cat: "Pagamento",
    p: "É seguro salvar meu cartão?",
    tags: "seguranca cartao cvv salvar dados",
    r: `Guardamos apenas a <strong>bandeira</strong> e os <strong>4 últimos dígitos</strong>. O CVV nunca é salvo. Você pode remover cartões a qualquer momento em Minha conta.`
  },
  {
    cat: "Entrega",
    p: "Qual é o prazo de entrega?",
    tags: "prazo demora chega dias cep quanto tempo",
    r: `Depende da sua região: de 2 a 12 dias úteis. Informe seu CEP na calculadora e veja as datas estimadas.
        <br><button type="button" class="ajuda-link" data-vista-atendimento="entrega">Calcular prazo →</button>`
  },
  {
    cat: "Entrega",
    p: "Como funciona o frete grátis?",
    tags: "frete gratis valor minimo fretegratis",
    r: `Compras a partir de <strong>R$ 149,90</strong> têm frete grátis. Abaixo disso o frete padrão é R$ 14,90, mas o cupom <strong>FRETEGRATIS</strong> zera o valor em qualquer pedido.`
  },
  {
    cat: "Entrega",
    p: "Posso receber em outro endereço?",
    tags: "endereco mudar alterar entrega trabalho",
    r: `Pode. Cadastre quantos endereços quiser em <strong>Minha conta &gt; Endereços de entrega</strong> e escolha qual usar na hora de finalizar a compra. Também dá para alterar o endereço direto no checkout.`
  },
  {
    cat: "Trocas e devoluções",
    p: "Como solicito uma devolução?",
    tags: "devolver devolucao reembolso arrependimento",
    r: `Depois de confirmar a entrega, abra <strong>Meus pedidos</strong> e clique em <strong>Devolução e reembolso</strong>. Você tem até 7 dias corridos após receber o pedido.
        <br><button type="button" class="ajuda-link" data-secao="meus-pedidos">Ir para Meus pedidos →</button>`
  },
  {
    cat: "Trocas e devoluções",
    p: "Meu livro chegou com defeito ou veio errado",
    tags: "defeito avariado errado danificado rasgado diferente",
    r: `Sentimos muito! Solicite a devolução escolhendo o motivo <em>"Produto com defeito ou avariado"</em> ou <em>"Recebi um produto diferente do pedido"</em>. Se preferir, fale com a gente no chat.`
  },
  {
    cat: "Trocas e devoluções",
    p: "Em quanto tempo recebo o reembolso?",
    tags: "reembolso estorno dinheiro prazo",
    r: `Pix: até 2 dias úteis. Cartão de crédito: até 2 faturas. Boleto: até 5 dias úteis, em conta bancária.`
  },
  {
    cat: "Cupons e ofertas",
    p: "Quais cupons estão disponíveis?",
    tags: "cupom desconto codigo promocao",
    r: `<ul>${Object.entries(cupons).map(([codigo, cupom]) => `
          <li><strong>${codigo}</strong>: ${escapar(cupom.descricao)}${cupom.minimo ? ` (a partir de ${formatarPreco(cupom.minimo)})` : ""}</li>
        `).join("")}</ul>
        Aplique o código na etapa de checkout, no passo "Cupom de desconto".`
  },
  {
    cat: "Cupons e ofertas",
    p: "Posso usar mais de um cupom?",
    tags: "cupom acumular somar pix desconto",
    r: `É um cupom por pedido. Já o <strong>desconto de 5% do Pix</strong> vale junto com o cupom.`
  },
  {
    cat: "Minha conta",
    p: "Como altero meus dados pessoais?",
    tags: "editar dados nome email telefone alterar editar",
    r: `Vá em <strong>Minha conta &gt; Editar dados pessoais</strong> e ative a chave <em>Edição</em>. Altere o que precisar, clique em <strong>Salvar alterações</strong> e a edição é bloqueada de novo automaticamente.
        <br><button type="button" class="ajuda-link" data-secao="minha-conta">Ir para Minha conta →</button>`
  },
  {
    cat: "Minha conta",
    p: "Esqueci minha senha. O que faço?",
    tags: "senha esqueci recuperar login",
    r: `Na tela de login, clique em <strong>Esqueceu a senha?</strong>. Se você já está logado e quer trocar, use <strong>Minha conta &gt; Alterar senha</strong>.`
  },
  {
    cat: "Minha conta",
    p: "Como salvo livros para ler depois?",
    tags: "favoritos lista coracao salvar",
    r: `Clique no ❤️ de qualquer livro. Eles ficam guardados em <strong>Minhas listas</strong> e ainda ajudam a melhorar suas recomendações.`
  }
];

const BUSCAS_POPULARES = ["cupom", "prazo", "boleto", "devolução", "senha"];

let ajudaCategoriaAtual = "todas";

function textoSemTags(html) {
  return html.replace(/<[^>]*>/g, " ");
}

function itensAjudaFiltrados() {
  const termos = normalizarTexto(
    document.getElementById("ajudaBusca").value
  ).split(" ").filter(Boolean);

  return FAQ
    .map((item, indice) => ({ item, indice }))
    .filter(({ item }) => {
      if (ajudaCategoriaAtual !== "todas" && item.cat !== ajudaCategoriaAtual) {
        return false;
      }

      const alvo = normalizarTexto(`${item.p} ${textoSemTags(item.r)} ${item.tags}`);

      return termos.every(termo => alvo.includes(termo));
    });
}

function renderizarAjuda() {
  const populares = document.getElementById("ajudaPopulares");

  populares.innerHTML = `<span>Mais buscados:</span>` + BUSCAS_POPULARES.map(termo => `
    <button type="button" data-ajuda-busca="${escapar(termo)}">${escapar(termo)}</button>
  `).join("");

  document.getElementById("ajudaCategorias").innerHTML = [
    { nome: "todas", rotulo: "Todas", total: FAQ.length },
    ...FAQ_CATEGORIAS.map(nome => ({
      nome,
      rotulo: nome,
      total: FAQ.filter(item => item.cat === nome).length
    }))
  ].map(cat => `
    <button type="button" class="${cat.nome === ajudaCategoriaAtual ? "ativa" : ""}" data-ajuda-cat="${escapar(cat.nome)}">
      ${escapar(cat.rotulo)} <small>${cat.total}</small>
    </button>
  `).join("");

  const resultados = itensAjudaFiltrados();
  const lista = document.getElementById("ajudaLista");

  document.getElementById("ajudaContagem").textContent = resultados.length
    ? `${resultados.length} ${resultados.length === 1 ? "resposta encontrada" : "respostas encontradas"}`
    : "";

  if (!resultados.length) {
    lista.innerHTML = `
      <div class="ajuda-vazia">
        <span>🕵️</span>
        <h4>Não achamos nada com essa busca</h4>
        <p>Tente outras palavras ou fale direto com a Lia.</p>
        <button type="button" class="botao botao-auto" data-vista-atendimento="chat">Falar no chat</button>
      </div>
    `;
    return;
  }

  lista.innerHTML = resultados.map(({ item, indice }) => `
    <details class="ajuda-item" ${resultados.length === 1 ? "open" : ""}>
      <summary>
        <span class="ajuda-cat">${escapar(item.cat)}</span>
        <span class="ajuda-pergunta">${escapar(item.p)}</span>
      </summary>
      <div class="ajuda-resposta">
        ${item.r}
        <div class="ajuda-util" data-faq-indice="${indice}">
          <span>Isso ajudou?</span>
          <button type="button" data-ajuda-voto="sim">👍 Sim</button>
          <button type="button" data-ajuda-voto="nao">👎 Não</button>
        </div>
      </div>
    </details>
  `).join("");
}

document
  .getElementById("ajudaBusca")
  .addEventListener("input", renderizarAjuda);

document
  .getElementById("vista-ajuda")
  .addEventListener("click", function(event) {
    const categoria = event.target.closest("[data-ajuda-cat]");

    if (categoria) {
      ajudaCategoriaAtual = categoria.dataset.ajudaCat;
      renderizarAjuda();
      return;
    }

    const busca = event.target.closest("[data-ajuda-busca]");

    if (busca) {
      document.getElementById("ajudaBusca").value = busca.dataset.ajudaBusca;
      ajudaCategoriaAtual = "todas";
      renderizarAjuda();
      return;
    }

    const voto = event.target.closest("[data-ajuda-voto]");

    if (voto) {
      const area = voto.closest(".ajuda-util");

      area.innerHTML = voto.dataset.ajudaVoto === "sim"
        ? `<span class="ajuda-agradece">Obrigado pelo retorno! 💛</span>`
        : `<span class="ajuda-agradece">Que pena! Quer falar com a gente?</span>
           <button type="button" class="ajuda-link" data-vista-atendimento="chat">Abrir chat →</button>`;
    }
  });

/* =====================================================
   CHAT DE ATENDIMENTO: primeiro a IA, depois um atendente
===================================================== */

const ATENDENTES = [
  { nome: "Camila", cor: "#8a5a9e" },
  { nome: "Rafael", cor: "#2f7d8c" },
  { nome: "Juliana", cor: "#b5533c" },
  { nome: "Bruno", cor: "#4f7a3a" }
];

const CHIPS_INICIAIS = [
  { rotulo: "📦 Rastrear pedido", msg: "Quero rastrear meu pedido" },
  { rotulo: "🚚 Prazo de entrega", msg: "Qual o prazo de entrega?" },
  { rotulo: "↩️ Trocas e devoluções", msg: "Como faço uma devolução?" },
  { rotulo: "💳 Pagamento", msg: "Quais as formas de pagamento?" },
  { rotulo: "🎁 Cupons", msg: "Quais cupons estão disponíveis?" },
  { rotulo: "🙋 Falar com atendente", acao: "humano" }
];

const chat = {
  sessao: 0,
  usuarioId: null,
  iniciado: false,
  fase: "ia",            // ia | fila | humano | encerrado
  falhas: 0,             // vezes que o cliente disse "não resolveu"
  semEntender: 0,        // mensagens seguidas que a IA não entendeu
  topicos: [],
  protocolo: null,
  atendente: null,
  etapaHumano: 0,
  fila: Promise.resolve()
};

function primeiroNomeChat() {
  return escapar((usuarioLogado?.nome || "").split(" ")[0] || "leitor(a)");
}

/* ---------- interface do chat ---------- */

function rolarChat() {
  const fluxo = document.getElementById("chatFluxo");
  fluxo.scrollTop = fluxo.scrollHeight;
}

function montarAcoesChat({ chips, feedback }) {
  let html = "";

  if (chips && chips.length) {
    html += chips.map(chip => chip.acao
      ? `<button type="button" class="chat-chip" data-chat-acao="${escapar(chip.acao)}">${escapar(chip.rotulo)}</button>`
      : `<button type="button" class="chat-chip" data-chat-msg="${escapar(chip.msg || chip.rotulo)}">${escapar(chip.rotulo)}</button>`
    ).join("");
  }

  if (feedback) {
    html += `
      <span class="chat-feedback-rotulo">Isso resolveu?</span>
      <button type="button" class="chat-chip positivo" data-chat-acao="resolveu">👍 Resolveu</button>
      <button type="button" class="chat-chip negativo" data-chat-acao="naoresolveu">👎 Não resolveu</button>
    `;
  }

  return html ? `<div class="msg-acoes">${html}</div>` : "";
}

function adicionarMensagem(tipo, html, opcoes = {}) {
  const fluxo = document.getElementById("chatFluxo");
  const elemento = document.createElement("div");

  if (tipo === "sistema") {
    elemento.className = "msg msg-sistema";
    elemento.innerHTML = `<span>${html}</span>`;
  } else {
    // botões de mensagens antigas deixam de valer
    fluxo.querySelectorAll(".msg-acoes").forEach(acoes => acoes.remove());

    const hora = new Date().toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    let avatar = "";
    let autor = "";

    if (tipo === "ia") {
      avatar = `<div class="msg-avatar ia">✨</div>`;
      autor = "Lia · ";
    } else if (tipo === "humano" && chat.atendente) {
      avatar = `<div class="msg-avatar humano" style="background:${chat.atendente.cor}">${chat.atendente.nome[0]}</div>`;
      autor = `${chat.atendente.nome} · `;
    }

    elemento.className = `msg msg-${tipo === "usuario" ? "usuario" : "bot"}`;
    elemento.innerHTML = `
      ${avatar}
      <div class="msg-corpo">
        <div class="msg-balao">${html}</div>
        ${montarAcoesChat(opcoes)}
        <small class="msg-hora">${autor}${hora}</small>
      </div>
    `;
  }

  const digitando = fluxo.querySelector(".msg.digitando");

  if (digitando) {
    fluxo.insertBefore(elemento, digitando);
  } else {
    fluxo.appendChild(elemento);
  }

  rolarChat();
}

function mostrarDigitando(autor) {
  const fluxo = document.getElementById("chatFluxo");

  if (fluxo.querySelector(".msg.digitando")) return;

  const avatar = autor === "humano" && chat.atendente
    ? `<div class="msg-avatar humano" style="background:${chat.atendente.cor}">${chat.atendente.nome[0]}</div>`
    : `<div class="msg-avatar ia">✨</div>`;

  const elemento = document.createElement("div");
  elemento.className = "msg msg-bot digitando";
  elemento.innerHTML = `
    ${avatar}
    <div class="msg-corpo">
      <div class="msg-balao pontos-digitando"><i></i><i></i><i></i></div>
    </div>
  `;

  fluxo.appendChild(elemento);
  rolarChat();
}

function removerDigitando() {
  document.querySelectorAll("#chatFluxo .msg.digitando").forEach(el => el.remove());
}

/* Fala do robô ou do atendente, com "digitando..." antes. */
async function botFala(html, { sessao = chat.sessao, autor = "ia", chips = null, feedback = false, rapido = false } = {}) {
  mostrarDigitando(autor);

  const tamanho = textoSemTags(html).length;
  await esperar(rapido ? 350 : 700 + Math.min(tamanho * 7, 1500));

  if (sessao !== chat.sessao) return false;

  removerDigitando();
  adicionarMensagem(autor, html, { chips, feedback });

  return true;
}

function humanoFala(html, opcoes = {}) {
  return botFala(html, { ...opcoes, autor: "humano" });
}

function definirCabecalhoChat(modo) {
  const avatar = document.getElementById("chatAvatar");
  const nome = document.getElementById("chatNome");
  const status = document.getElementById("chatStatus");

  document
    .getElementById("chatBotaoHumano")
    .classList.toggle("oculto", modo !== "ia");

  if (modo === "ia") {
    avatar.className = "chat-avatar ia";
    avatar.style.background = "";
    avatar.textContent = "✨";
    nome.textContent = "Lia · Assistente virtual";
    status.innerHTML = `<i class="ponto-online"></i> Online agora`;
  }

  if (modo === "fila") {
    avatar.className = "chat-avatar espera";
    avatar.style.background = "";
    avatar.textContent = "⏳";
    nome.textContent = "Aguardando atendente";
    status.innerHTML = `<i class="ponto-espera"></i> Na fila de atendimento`;
  }

  if (modo === "humano" && chat.atendente) {
    avatar.className = "chat-avatar humano";
    avatar.style.background = chat.atendente.cor;
    avatar.textContent = chat.atendente.nome[0];
    nome.textContent = `${chat.atendente.nome} · Atendente`;
    status.innerHTML = `<i class="ponto-online"></i> Atendimento em andamento`;
  }

  if (modo === "encerrado") {
    status.innerHTML = `<i class="ponto-off"></i> Conversa encerrada`;
  }
}

function definirEtapaChat(numero) {
  document.querySelectorAll("#etapasChat li").forEach(item => {
    const etapa = Number(item.dataset.etapaChat);

    item.classList.toggle("ativa", etapa === numero);
    item.classList.toggle("feita", etapa < numero);
    item.classList.toggle("pulada", etapa === 2 && numero === 3 && !chat.atendente);
  });
}

function habilitarEntradaChat(ativa, placeholder) {
  const campo = document.getElementById("chatCampo");

  campo.disabled = !ativa;
  document.querySelector("#chatForm .chat-enviar").disabled = !ativa;
  campo.placeholder = placeholder || "Digite sua mensagem...";
}

function mostrarProtocolo() {
  document.getElementById("chatProtocoloNumero").textContent = chat.protocolo;
  document.getElementById("chatProtocolo").classList.remove("oculto");
}

/* ---------- ciclo de vida ---------- */

function prepararChat() {
  const idAtual = usuarioLogado ? usuarioLogado.id : null;

  if (!chat.iniciado || chat.usuarioId !== idAtual) {
    reiniciarChat();
  }
}

function reiniciarChat() {
  chat.sessao++;
  chat.usuarioId = usuarioLogado ? usuarioLogado.id : null;
  chat.iniciado = true;
  chat.fase = "ia";
  chat.falhas = 0;
  chat.semEntender = 0;
  chat.topicos = [];
  chat.protocolo = null;
  chat.atendente = null;
  chat.etapaHumano = 0;
  chat.fila = Promise.resolve();

  document.getElementById("chatFluxo").innerHTML = "";
  document.getElementById("chatProtocolo").classList.add("oculto");

  definirCabecalhoChat("ia");
  definirEtapaChat(1);
  habilitarEntradaChat(true);

  saudacaoInicial(chat.sessao);
}

async function saudacaoInicial(sessao) {
  const nome = primeiroNomeChat();

  if (!await botFala(`Olá, <strong>${nome}</strong>! Eu sou a <strong>Lia</strong>, assistente virtual da Livraria Aurora 📚`, { sessao })) return;

  await botFala(
    "Posso ajudar com pedidos, entregas, pagamentos, trocas e muito mais. Sobre o que você quer falar?",
    { sessao, chips: CHIPS_INICIAIS }
  );
}

/* Executa tarefas do chat uma depois da outra, descartando as de conversas antigas. */
function enfileirar(tarefa) {
  const sessao = chat.sessao;

  chat.fila = chat.fila
    .then(() => (sessao === chat.sessao ? tarefa(sessao) : null))
    .catch(erro => console.error("Erro no chat:", erro));
}

function receberMensagemUsuario(texto) {
  if (chat.fase === "fila" || chat.fase === "encerrado") return;

  adicionarMensagem("usuario", escapar(texto));

  enfileirar(sessao =>
    chat.fase === "humano"
      ? responderHumano(texto, sessao)
      : responderIA(texto, sessao)
  );
}

/* ---------- "cérebro" da assistente virtual ---------- */

function bateChave(norm, palavras, chave) {
  if (chave.includes(" ")) return norm.includes(chave);
  if (chave.endsWith("$")) return palavras.includes(chave.slice(0, -1));
  if (chave.length <= 3) return palavras.includes(chave);

  return palavras.some(palavra => palavra.startsWith(chave));
}

function respostaRastreio(texto) {
  const pedidos = usuarioLogado?.pedidos || [];

  if (!pedidos.length) {
    return {
      html: "Não encontrei nenhum pedido na sua conta ainda 📭 Assim que você comprar, é só me chamar que eu acompanho para você.",
      chips: [{ rotulo: "📚 Ver livros", acao: "secao:livros" }]
    };
  }

  aplicarExpiracoesPedidos();

  const informado = texto.toUpperCase().match(/AU\d{4,}/);
  let pedido = informado
    ? pedidos.find(item => item.numero === informado[0])
    : null;

  if (informado && !pedido) {
    return {
      html: `Não achei o pedido <strong>${escapar(informado[0])}</strong> na sua conta. Confira o número em <em>Meus pedidos</em>.`,
      chips: [{ rotulo: "📦 Abrir Meus pedidos", acao: "secao:meus-pedidos" }]
    };
  }

  pedido = pedido || pedidos[0];

  const status = statusAtualPedido(pedido);
  const previsao = new Date(pedido.previsaoEntrega).toLocaleDateString("pt-BR");

  const detalhes = {
    "A pagar": "Estamos aguardando o pagamento. Você pode concluir em <em>Meus pedidos</em>, no botão <strong>Pagar agora</strong>.",
    "Preparando": `Estamos separando e embalando seus livros. Previsão de entrega até <strong>${previsao}</strong>.`,
    "A caminho": `Já saiu para entrega! Previsão até <strong>${previsao}</strong>. Código de rastreio: <strong>${escapar(pedido.codigoRastreio || "-")}</strong>.`,
    "Finalizado": "A entrega foi concluída. Esperamos que você aproveite a leitura 📚",
    "Cancelado": "Este pedido foi cancelado.",
    "Devolução e reembolso": "Estamos cuidando da sua devolução e do reembolso."
  }[status] || "";

  const extra = !informado && pedidos.length > 1
    ? `<br><br>Você tem ${pedidos.length} pedidos; este é o mais recente. Se quiser consultar outro, me envie o número (ex.: AU12345678).`
    : "";

  return {
    html: `Seu pedido <strong>${escapar(pedido.numero)}</strong> está <strong>${escapar(status)}</strong>.<br>${detalhes}${extra}`,
    chips: [{ rotulo: "📍 Ver rastreio completo", acao: `rastrear:${pedido.numero}` }]
  };
}

function respostaPrazo(texto) {
  const cep = texto.match(/\b\d{5}-?\d{3}\b/);

  if (cep) {
    const estimativa = estimarEntrega(cep[0].replace(/\D/g, ""));

    if (estimativa) {
      return {
        html: `Para o CEP <strong>${estimativa.cep}</strong> (${escapar(estimativa.regiao)}), a entrega leva de <strong>${estimativa.minimo} a ${estimativa.maximo} dias úteis</strong>: chega entre <strong>${formatarDataCurta(estimativa.dataMinima)}</strong> e <strong>${formatarDataCurta(estimativa.dataMaxima)}</strong>.<br>Frete: ${formatarPreco(FRETE_PADRAO)}, grátis acima de ${formatarPreco(FRETE_GRATIS_A_PARTIR_DE)}.`
      };
    }
  }

  return {
    html: `O prazo depende da sua região, de <strong>2 a 12 dias úteis</strong>. O frete é ${formatarPreco(FRETE_PADRAO)}, e <strong>grátis acima de ${formatarPreco(FRETE_GRATIS_A_PARTIR_DE)}</strong> ou com o cupom FRETEGRATIS.<br><br>Me informe seu CEP que eu calculo agora mesmo!`,
    chips: [{ rotulo: "🧮 Abrir calculadora", acao: "vista:entrega" }]
  };
}

function respostaPagamento(norm, palavras) {
  if (bateChave(norm, palavras, "pix")) {
    return { html: "No <strong>Pix</strong> você ganha <strong>5% de desconto</strong> e a confirmação é imediata. O código vale por 30 minutos; se o pagamento não for feito, o pedido é cancelado automaticamente. Para pagar depois, use <strong>Pagar agora</strong> em <em>Meus pedidos</em>." };
  }

  if (bateChave(norm, palavras, "boleto")) {
    return { html: "O <strong>boleto</strong> vence em 3 dias. O pedido só é enviado depois que o pagamento for confirmado. Se ele vencer, o pedido é cancelado automaticamente." };
  }

  if (bateChave(norm, palavras, "parcel")) {
    return { html: "No cartão de crédito você parcela em até <strong>6x sem juros</strong>, com parcela mínima de R$ 15,00." };
  }

  return {
    html: `Aceitamos:
      <ul>
        <li><strong>Pix</strong>: 5% de desconto, confirmação imediata</li>
        <li><strong>Cartão de crédito</strong>: até 6x sem juros</li>
        <li><strong>Boleto</strong>: vence em 3 dias</li>
      </ul>`
  };
}

function respostaCupons() {
  const lista = Object.entries(cupons).map(([codigo, cupom]) =>
    `<li><strong>${codigo}</strong>: ${escapar(cupom.descricao)}${cupom.minimo ? ` (a partir de ${formatarPreco(cupom.minimo)})` : ""}</li>`
  ).join("");

  return {
    html: `Estes são os cupons ativos:<ul>${lista}</ul>É um cupom por pedido, e o desconto de 5% do Pix pode ser somado. Aplique na etapa de checkout 😉`
  };
}

function respostaRecomendacao(norm) {
  const categorias = [...new Set(livros.map(livro => livro.categoria))];
  const categoria = categorias.find(nome => norm.includes(normalizarTexto(nome)));

  const base = categoria
    ? livros.filter(livro => livro.categoria === categoria)
    : livros;

  const escolhidos = [...base]
    .sort((a, b) => (b.avaliacaoMedia || 0) - (a.avaliacaoMedia || 0))
    .slice(0, 3);

  if (!escolhidos.length) {
    return { html: "Ainda estou montando a prateleira por aqui. Dê uma olhada no catálogo completo 📚", chips: [{ rotulo: "Ver livros", acao: "secao:livros" }] };
  }

  const lista = escolhidos.map(livro =>
    `<li><strong>${escapar(livro.titulo)}</strong>, ${escapar(livro.autor)} · ⭐ ${Number(livro.avaliacaoMedia || 0).toFixed(1)} · ${formatarPreco(livro.preco)}</li>`
  ).join("");

  return {
    html: `${categoria ? `Os mais bem avaliados em <strong>${escapar(categoria)}</strong>` : "Os mais bem avaliados da Aurora"}:<ul>${lista}</ul>Quer ver outras categorias? É só pedir!`,
    chips: [{ rotulo: "📚 Ver todos os livros", acao: "secao:livros" }]
  };
}

const INTENCOES = [
  {
    id: "reclamacao",
    topico: "uma reclamação",
    chaves: ["reclam", "fraude", "golpe", "procon", "advogad", "processo", "cobranca indevida", "cobrado duas vezes", "cobrou duas vezes", "cobrado errado", "pessimo", "horrivel", "absurdo", "vergonha", "enganad"],
    resposta: () => null
  },
  {
    id: "cancelar",
    topico: "cancelamento",
    chaves: ["cancel", "desist"],
    resposta: () => ({
      html: "Você pode cancelar pedidos <strong>A pagar</strong> ou <strong>Preparando</strong>: em <em>Meus pedidos</em>, clique em <strong>Cancelar pedido</strong> e informe o motivo.<br><br>Se o pedido já estiver a caminho, aguarde a entrega e peça a devolução em até 7 dias.",
      chips: [{ rotulo: "📦 Abrir Meus pedidos", acao: "secao:meus-pedidos" }]
    })
  },
  {
    id: "troca",
    topico: "trocas e devoluções",
    chaves: ["troc", "devol", "reembols", "estorn", "arrepend", "defeit", "avariad", "danificad", "rasgad", "errado", "diferente", "faltando"],
    resposta: () => ({
      html: "Você tem <strong>7 dias corridos</strong> após receber para devolver, e para livros com defeito ou diferentes do pedido também.<br><br>Confirme a entrega e clique em <strong>Devolução e reembolso</strong> no pedido, em <em>Meus pedidos</em>. O dinheiro volta pela mesma forma de pagamento: Pix em até 2 dias úteis, cartão em até 2 faturas e boleto em até 5 dias úteis.",
      chips: [{ rotulo: "📦 Abrir Meus pedidos", acao: "secao:meus-pedidos" }]
    })
  },
  {
    id: "rastreio",
    topico: "o rastreio de pedido",
    chaves: ["rastre", "onde esta", "cade$", "acompanh", "status", "chegou", "atras", "previsao", "quando chega", "codigo de rastreio"],
    resposta: texto => respostaRastreio(texto)
  },
  {
    id: "prazo",
    topico: "entrega e prazos",
    chaves: ["prazo", "entreg", "frete", "demora", "quanto tempo", "dias uteis", "chega", "correio", "transportadora", "cep"],
    resposta: texto => respostaPrazo(texto)
  },
  {
    id: "pagamento",
    topico: "pagamento",
    chaves: ["pagament", "pagar", "pague", "pix", "boleto", "cartao", "cartoes", "parcel", "credito", "debito", "fatura"],
    resposta: (texto, norm, palavras) => respostaPagamento(norm, palavras)
  },
  {
    id: "cupom",
    topico: "cupons e descontos",
    chaves: ["cupom", "cupon", "desconto", "promoc", "codigo promocional", "oferta", "voucher"],
    resposta: () => respostaCupons()
  },
  {
    id: "endereco",
    topico: "endereço de entrega",
    chaves: ["endereco", "mudei", "mudanca", "alterar endereco", "trocar endereco"],
    resposta: () => ({
      html: "Você gerencia seus endereços em <strong>Minha conta &gt; Endereços de entrega</strong>. Também dá para trocar o endereço na hora de finalizar a compra.<br><br>Depois que o pedido sai para entrega, o endereço não pode mais ser alterado.",
      chips: [{ rotulo: "👤 Ir para Minha conta", acao: "secao:minha-conta" }]
    })
  },
  {
    id: "conta",
    topico: "dados da conta",
    chaves: ["senha", "login", "conta$", "cadastr", "email", "e mail", "telefone", "meus dados", "dados pessoais", "perfil"],
    resposta: () => ({
      html: "Em <strong>Minha conta</strong> você altera seus dados pessoais (ative a chave de edição, ajuste e salve) e também a senha, endereços e formas de pagamento.<br><br>Esqueceu a senha? Na tela de login, use <strong>Esqueceu a senha?</strong>.",
      chips: [{ rotulo: "👤 Ir para Minha conta", acao: "secao:minha-conta" }]
    })
  },
  {
    id: "notafiscal",
    topico: "nota fiscal",
    chaves: ["nota fiscal", "nf$", "cpf", "danfe"],
    resposta: () => ({
      html: "A nota fiscal usa o CPF informado no checkout e é enviada ao seu e-mail assim que o pedido é faturado. Se o CPF estiver errado, me avise antes do envio do pedido que eu chamo um atendente para corrigir."
    })
  },
  {
    id: "recomendacao",
    topico: "recomendação de livros",
    chaves: ["indic", "sugest", "recomend", "que livro", "livro de", "quero ler", "melhor livro", "mais vendido"],
    resposta: (texto, norm) => respostaRecomendacao(norm)
  },
  {
    id: "obrigado",
    topico: null,
    feedback: false,
    chaves: ["obrigad", "valeu", "brigad", "agradec", "resolvido", "ajudou"],
    resposta: () => ({
      html: "Por nada! 💛 Se precisar de mais alguma coisa, é só chamar.",
      chips: [
        { rotulo: "Tenho outra dúvida", acao: "topicos" },
        { rotulo: "Encerrar conversa", acao: "encerrar" }
      ]
    })
  },
  {
    id: "saudacao",
    topico: null,
    feedback: false,
    chaves: ["oi", "ola", "bom dia", "boa tarde", "boa noite", "hey", "eae"],
    resposta: () => ({
      html: "Oi! 😊 Em que posso ajudar hoje?",
      chips: CHIPS_INICIAIS
    })
  }
];

function interpretar(texto) {
  const norm = normalizarTexto(texto);
  const palavras = norm.split(" ").filter(Boolean);

  let melhor = null;
  let melhorPontos = 0;

  INTENCOES.forEach(intencao => {
    const pontos = intencao.chaves.filter(chave => bateChave(norm, palavras, chave)).length;

    if (pontos > melhorPontos) {
      melhor = intencao;
      melhorPontos = pontos;
    }
  });

  if (!melhor && (palavras.includes("pedido") || /\bAU\d{4,}/i.test(texto))) {
    melhor = INTENCOES.find(intencao => intencao.id === "rastreio");
  }

  if (!melhor && /\b\d{5}-?\d{3}\b/.test(texto)) {
    melhor = INTENCOES.find(intencao => intencao.id === "prazo");
  }

  if (!melhor) return null;

  const resposta = melhor.resposta(texto, norm, palavras);

  return {
    id: melhor.id,
    topico: melhor.topico,
    feedback: melhor.feedback !== false,
    html: resposta ? resposta.html : null,
    chips: resposta ? resposta.chips || null : null
  };
}

function pedeAtendenteHumano(norm, palavras) {
  return [
    "atendente", "humano", "pessoa de verdade", "falar com alguem",
    "falar com uma pessoa", "gerente", "supervisor", "operador"
  ].some(chave => bateChave(norm, palavras, chave));
}

async function responderIA(texto, sessao) {
  const norm = normalizarTexto(texto);
  const palavras = norm.split(" ").filter(Boolean);

  if (pedeAtendenteHumano(norm, palavras)) {
    if (!await botFala("Claro! Vou te transferir para um atendente agora mesmo. 🙋", { sessao })) return;
    await transferirParaAtendente(sessao);
    return;
  }

  const resposta = interpretar(texto);

  if (resposta && resposta.id === "reclamacao") {
    chat.topicos.push(resposta.topico);

    if (!await botFala("Sinto muito pelo transtorno 😔 Isso merece atenção especial, então vou chamar um atendente para cuidar do seu caso com prioridade.", { sessao })) return;
    await transferirParaAtendente(sessao);
    return;
  }

  if (!resposta) {
    chat.semEntender++;

    if (chat.semEntender >= 2) {
      if (!await botFala("Hmm, ainda não consegui entender direito 😅 Para não te fazer perder tempo, vou chamar um atendente.", { sessao })) return;
      await transferirParaAtendente(sessao);
      return;
    }

    await botFala(
      "Não tenho certeza se entendi. Pode reformular? Ou escolha um dos assuntos abaixo:",
      { sessao, chips: CHIPS_INICIAIS }
    );
    return;
  }

  chat.semEntender = 0;

  if (resposta.topico && !chat.topicos.includes(resposta.topico)) {
    chat.topicos.push(resposta.topico);
  }

  await botFala(resposta.html, {
    sessao,
    chips: resposta.chips,
    feedback: resposta.feedback
  });
}

/* ---------- transferência para o atendente ---------- */

function gerarProtocolo() {
  const numero = Math.floor(Math.random() * 90000) + 10000;
  return `AUR-${new Date().getFullYear()}-${numero}`;
}

async function transferirParaAtendente(sessao) {
  if (chat.fase !== "ia") return;

  chat.fase = "fila";
  chat.protocolo = gerarProtocolo();
  chat.atendente = ATENDENTES[Math.floor(Math.random() * ATENDENTES.length)];

  definirCabecalhoChat("fila");
  definirEtapaChat(2);
  habilitarEntradaChat(false, "Aguardando um atendente...");
  mostrarProtocolo();

  adicionarMensagem("sistema", "Transferindo você para um atendente...");

  await esperar(1500);
  if (sessao !== chat.sessao) return;

  adicionarMensagem(
    "sistema",
    `Você está na fila: 1 pessoa à sua frente · Protocolo <strong>${chat.protocolo}</strong>`
  );

  await esperar(3000);
  if (sessao !== chat.sessao) return;

  chat.fase = "humano";
  chat.etapaHumano = 0;

  definirCabecalhoChat("humano");
  adicionarMensagem("sistema", `${chat.atendente.nome} entrou na conversa`);
  habilitarEntradaChat(true);

  const resumo = chat.topicos.length
    ? ` (você falou sobre ${listaPT(chat.topicos)})`
    : "";

  await humanoFala(
    `Olá, ${primeiroNomeChat()}! Aqui é ${chat.atendente.nome}, da equipe Aurora. Já li o resumo da sua conversa com a Lia${resumo}. Me conta o que está acontecendo para eu te ajudar?`,
    { sessao }
  );
}

function solicitarAtendente() {
  if (chat.fase !== "ia") return;

  adicionarMensagem("usuario", "Quero falar com um atendente");

  enfileirar(async sessao => {
    if (!await botFala("Claro! Vou te transferir para um atendente agora mesmo. 🙋", { sessao })) return;
    await transferirParaAtendente(sessao);
  });
}

/* ---------- atendente (simulado) ---------- */

const CHIPS_MAIS_ALGUMA_COISA = [
  { rotulo: "Tenho outra dúvida", msg: "Tenho outra dúvida" },
  { rotulo: "Não, era só isso", acao: "encerrar" }
];

async function responderHumano(texto, sessao) {
  const norm = normalizarTexto(texto);
  const palavras = norm.split(" ").filter(Boolean);
  const nome = primeiroNomeChat();

  // depois de dar o protocolo, uma resposta curta e negativa encerra
  const querEncerrar = chat.etapaHumano >= 2 && palavras.length <= 6 &&
    ["nao$", "nada", "so isso", "obrigad", "valeu", "tudo certo", "encerrar", "tchau"]
      .some(chave => bateChave(norm, palavras, chave));

  if (querEncerrar) {
    await encerrarAtendimento(sessao);
    return;
  }

  if (chat.etapaHumano >= 2 && norm.includes("outra duvida")) {
    await humanoFala("Claro! Pode falar, estou por aqui.", { sessao, rapido: true });
    return;
  }

  const resposta = interpretar(texto);

  if (chat.etapaHumano === 0) {
    chat.etapaHumano = 1;

    if (!await humanoFala(`Entendi, ${nome}. Vou verificar isso aqui no sistema, só um instante 🔎`, { sessao })) return;

    await esperar(1800);
    if (sessao !== chat.sessao) return;

    const analise = resposta && resposta.html && resposta.id !== "reclamacao"
      ? `Já olhei aqui. ${resposta.html}<br><br>`
      : "Analisei o seu caso com cuidado e já deixei tudo registrado com prioridade.<br><br>";

    if (!await humanoFala(
      `${analise}Anotei tudo no protocolo <strong>${chat.protocolo}</strong>. Se precisarmos de uma análise interna, retornamos por e-mail em até 24 horas úteis.`,
      { sessao }
    )) return;

    chat.etapaHumano = 2;

    await humanoFala("Posso ajudar em mais alguma coisa?", {
      sessao,
      chips: CHIPS_MAIS_ALGUMA_COISA
    });
    return;
  }

  if (resposta && resposta.html && resposta.id !== "reclamacao" && resposta.id !== "saudacao") {
    if (!await humanoFala(resposta.html, { sessao, chips: resposta.chips })) return;
  } else {
    if (!await humanoFala(`Anotei isso também no seu protocolo <strong>${chat.protocolo}</strong>.`, { sessao })) return;
  }

  await humanoFala("Mais alguma coisa em que eu possa ajudar?", {
    sessao,
    chips: CHIPS_MAIS_ALGUMA_COISA
  });
}

/* ---------- encerramento e avaliação ---------- */

async function encerrarAtendimento(sessao) {
  if (chat.fase === "encerrado" || chat.fase === "fila") return;

  const comHumano = chat.fase === "humano";
  const autor = comHumano ? "humano" : "ia";

  chat.fase = "encerrado";
  definirCabecalhoChat("encerrado");
  definirEtapaChat(3);
  habilitarEntradaChat(false, "Conversa encerrada. Inicie uma nova conversa para continuar.");

  const mensagem = comHumano
    ? `Foi um prazer ajudar, ${primeiroNomeChat()}! Seu protocolo é <strong>${chat.protocolo}</strong>. Como foi o atendimento?`
    : `Foi um prazer ajudar, ${primeiroNomeChat()}! 💛 Como você avalia este atendimento?`;

  await botFala(mensagem, {
    sessao,
    autor,
    chips: [1, 2, 3, 4, 5].map(nota => ({
      rotulo: "★".repeat(nota),
      acao: `nota:${nota}`
    }))
  });
}

function avaliarAtendimento(nota) {
  adicionarMensagem("usuario", "★".repeat(nota));

  enfileirar(async sessao => {
    const comHumano = !!chat.atendente;
    const texto = nota >= 4
      ? "Muito obrigado pela avaliação! Ficamos felizes em ajudar 💛"
      : "Obrigado pelo retorno sincero. Vamos usar isso para melhorar o nosso atendimento.";

    await botFala(texto, {
      sessao,
      autor: comHumano ? "humano" : "ia",
      rapido: true,
      chips: [{ rotulo: "↻ Nova conversa", acao: "novo" }]
    });

    mostrarNotificacao("Obrigado pela sua avaliação!");
  });
}

/* ---------- eventos do chat ---------- */

document
  .getElementById("chatForm")
  .addEventListener("submit", function(event) {
    event.preventDefault();

    const campo = document.getElementById("chatCampo");
    const texto = campo.value.trim();

    if (!texto || campo.disabled) return;

    campo.value = "";
    receberMensagemUsuario(texto);
  });

document
  .getElementById("chatBotaoHumano")
  .addEventListener("click", solicitarAtendente);

document
  .getElementById("chatBotaoNova")
  .addEventListener("click", reiniciarChat);

document
  .getElementById("chatFluxo")
  .addEventListener("click", function(event) {
    const chipMensagem = event.target.closest("[data-chat-msg]");

    if (chipMensagem) {
      receberMensagemUsuario(chipMensagem.dataset.chatMsg);
      return;
    }

    const chipAcao = event.target.closest("[data-chat-acao]");

    if (!chipAcao) return;

    const [tipo, ...resto] = chipAcao.dataset.chatAcao.split(":");
    const valor = resto.join(":");

    if (tipo === "resolveu") {
      adicionarMensagem("usuario", "👍 Resolveu");

      enfileirar(sessao => botFala(
        "Que bom que consegui ajudar! 😊 Posso ajudar em mais alguma coisa?",
        { sessao, chips: [
          { rotulo: "Tenho outra dúvida", acao: "topicos" },
          { rotulo: "Não, era só isso", acao: "encerrar" }
        ] }
      ));
      return;
    }

    if (tipo === "naoresolveu") {
      adicionarMensagem("usuario", "👎 Não resolveu");

      enfileirar(async sessao => {
        chat.falhas++;

        if (chat.falhas >= 2) {
          if (!await botFala("Poxa, desculpe por não ter resolvido 😕 Vou passar você para um atendente, que já recebe o resumo da nossa conversa.", { sessao })) return;
          await transferirParaAtendente(sessao);
          return;
        }

        await botFala(
          "Sinto muito por isso 😕 Pode me explicar com mais detalhes o que está acontecendo? Se preferir, chamo um atendente agora mesmo.",
          { sessao, chips: [{ rotulo: "🙋 Chamar atendente", acao: "humano" }] }
        );
      });
      return;
    }

    if (tipo === "humano") {
      solicitarAtendente();
      return;
    }

    if (tipo === "topicos") {
      adicionarMensagem("usuario", "Tenho outra dúvida");

      enfileirar(sessao => botFala(
        "Claro! Sobre qual assunto?",
        { sessao, chips: CHIPS_INICIAIS }
      ));
      return;
    }

    if (tipo === "encerrar") {
      adicionarMensagem("usuario", "Não, era só isso");
      enfileirar(sessao => encerrarAtendimento(sessao));
      return;
    }

    if (tipo === "nota") {
      avaliarAtendimento(Number(valor));
      return;
    }

    if (tipo === "novo") {
      reiniciarChat();
      return;
    }

    if (tipo === "rastrear") {
      abrirModalRastreio(valor);
      return;
    }

    if (tipo === "secao") {
      abrirSecao(valor);
      return;
    }

    if (tipo === "vista") {
      abrirAtendimento(valor);
    }
  });


/* =====================================================
   TRABALHE CONOSCO: candidatura
===================================================== */

document.getElementById("formCandidatura")?.addEventListener("submit", function(event) {
  event.preventDefault();

  const aviso = document.getElementById("avisoCandidatura");
  const nome = document.getElementById("candNome").value.trim();
  const email = document.getElementById("candEmail").value.trim().toLowerCase();
  const vaga = document.getElementById("candVaga").value;
  const texto = document.getElementById("candMensagem").value.trim();

  function erro(msg) {
    aviso.textContent = msg;
    aviso.className = "aviso-form erro";
  }

  if (nome.length < 3) return erro("Digite seu nome completo.");
  if (!validarEmail(email)) return erro("Digite um e-mail válido.");
  if (texto.length < 10) return erro("Conte um pouco mais sobre você (mínimo de 10 caracteres).");

  let candidaturas = [];

  try {
    candidaturas = JSON.parse(localStorage.getItem("candidaturasAurora")) || [];
  } catch (e) {
    candidaturas = [];
  }

  candidaturas.push({ nome, email, vaga, texto, data: new Date().toISOString() });
  localStorage.setItem("candidaturasAurora", JSON.stringify(candidaturas));

  this.reset();
  aviso.textContent = "";
  aviso.className = "aviso-form";

  mostrarNotificacao("Candidatura enviada! Obrigado por querer fazer parte da Aurora.");
});

/* =====================================================
   ACESSIBILIDADE: rótulos de botões só com ícone,
   foco nos modais e tecla Esc
===================================================== */

function rotularBotoesDeIcone(raiz) {
  (raiz || document).querySelectorAll(".favorito:not([aria-label])").forEach(botao => {
    const ativo = botao.classList.contains("selecionado");
    botao.setAttribute("aria-label", ativo ? "Remover dos favoritos" : "Adicionar aos favoritos");
    botao.setAttribute("aria-pressed", ativo ? "true" : "false");
  });

  (raiz || document).querySelectorAll(".fechar-modal:not([aria-label])").forEach(botao => {
    botao.setAttribute("aria-label", "Fechar");
  });

  (raiz || document).querySelectorAll("button[data-remover]:not([aria-label])").forEach(botao => {
    botao.setAttribute("aria-label", "Remover do carrinho");
  });

  (raiz || document).querySelectorAll(".capa-livro[data-detalhes]:not([role])").forEach(capa => {
    capa.setAttribute("role", "button");
    capa.setAttribute("tabindex", "0");
    capa.setAttribute("aria-label", "Ver detalhes do livro");
  });
}

rotularBotoesDeIcone();

new MutationObserver(() => rotularBotoesDeIcone()).observe(document.body, {
  childList: true,
  subtree: true
});

// o aria-label dos favoritos precisa acompanhar o estado
new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.target.classList?.contains("favorito")) {
      const ativo = m.target.classList.contains("selecionado");
      m.target.setAttribute("aria-label", ativo ? "Remover dos favoritos" : "Adicionar aos favoritos");
      m.target.setAttribute("aria-pressed", ativo ? "true" : "false");
    }
  });
}).observe(document.body, { attributes: true, attributeFilter: ["class"], subtree: true });

// capa do livro acessível pelo teclado (Enter / Espaço)
document.addEventListener("keydown", function(event) {
  const capa = event.target.closest?.(".capa-livro[data-detalhes]");

  if (capa && (event.key === "Enter" || event.key === " ")) {
    event.preventDefault();
    capa.click();
  }
});

// Esc fecha a janela aberta por cima; o foco volta para onde estava
let focoAntesDoModal = null;

new MutationObserver(() => {
  const aberto = [...document.querySelectorAll(".modal-overlay:not(.oculto)")].pop();

  if (aberto && !focoAntesDoModal) {
    focoAntesDoModal = document.activeElement;
    const alvo = aberto.querySelector(".fechar-modal, button, input, select, textarea");
    alvo?.focus();
  }

  if (!aberto && focoAntesDoModal) {
    focoAntesDoModal.focus?.();
    focoAntesDoModal = null;
  }
}).observe(document.body, { attributes: true, attributeFilter: ["class"], subtree: true });

document.addEventListener("keydown", function(event) {
  if (event.key !== "Escape") return;

  const aberto = [...document.querySelectorAll(".modal-overlay:not(.oculto)")].pop();

  if (aberto) {
    aberto.querySelector(".fechar-modal")?.click();
  }
});

// ao trocar de seção, o leitor de tela é levado para o conteúdo novo
(function() {
  const original = abrirSecao;

  abrirSecao = function(nome) {
    original(nome);
    document.getElementById("conteudoPrincipal")?.focus({ preventScroll: true });
  };
})();
