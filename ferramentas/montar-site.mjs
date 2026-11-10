// Monta o site: pega cada texto da pasta "conteudo/" e coloca dentro do
// layout (cabeçalho, menu, botão Sair rápido, telefones de emergência e
// rodapé). O resultado vai para a pasta "docs/", que é o site publicado.
//
// Como usar (no terminal, dentro da pasta do projeto):
//   node ferramentas/montar-site.mjs

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const PASTA_CONTEUDO = join(RAIZ, "conteudo");
const PASTA_SITE = join(RAIZ, "docs");

// Endereço do site publicado (usado nos links de compartilhar e no WhatsApp)
const ENDERECO_SITE = "https://duascasasumfilho.github.io/";
const NOME_SITE = "Duas Casas, Um Filho";

// Todas as páginas do site: [nome do arquivo, nome que aparece no menu]
const PAGINAS = [
  ["index", "Início"],
  ["convivencia", "Convivência é direito do filho"],
  ["o-que-e-alienacao-parental", "O que é e o que não é alienação parental"],
  ["quando-a-acusacao-vira-arma", "Quando a acusação vira arma"],
  ["protegendo-seu-filho", "Protegendo seu filho do conflito"],
  ["violencia-nao-e-conflito", "Violência não é conflito"],
  ["mediacao-e-cejusc", "Mediação e CEJUSC"],
  ["passo-a-passo", "Se você está vivendo isso agora"],
  ["onde-buscar-ajuda", "Onde buscar ajuda em Sete Lagoas"],
  ["teste-seus-conhecimentos", "Teste seus conhecimentos"],
  ["perguntas-frequentes", "Perguntas frequentes"],
  ["debate-sobre-a-lei", "O debate sobre a lei"],
  ["sobre-o-projeto", "Sobre o projeto"],
];

// Como o menu agrupa as páginas. Para mudar a ordem do menu, mude aqui.
const GRUPOS = [
  ["Entender", ["convivencia", "o-que-e-alienacao-parental", "quando-a-acusacao-vira-arma", "debate-sobre-a-lei"]],
  ["Cuidar", ["protegendo-seu-filho", "violencia-nao-e-conflito", "mediacao-e-cejusc", "passo-a-passo"]],
  ["Agir", ["onde-buscar-ajuda", "perguntas-frequentes", "teste-seus-conhecimentos", "sobre-o-projeto"]],
];

// Os quatro caminhos de leitura da página inicial (as "linhas" do guia).
// "paradas" são as páginas de cada caminho, na ordem de leitura.
const LINHAS = [
  { n: 1, frase: "Estou me separando e quero proteger meu filho",
    paradas: ["convivencia", "protegendo-seu-filho", "mediacao-e-cejusc", "o-que-e-alienacao-parental", "onde-buscar-ajuda"] },
  { n: 2, frase: "Sinto que meu filho está sendo afastado de mim",
    paradas: ["o-que-e-alienacao-parental", "passo-a-passo", "quando-a-acusacao-vira-arma", "protegendo-seu-filho", "onde-buscar-ajuda"] },
  { n: 3, frase: "Fui acusado(a) de alienação parental",
    paradas: ["quando-a-acusacao-vira-arma", "o-que-e-alienacao-parental", "protegendo-seu-filho", "perguntas-frequentes", "onde-buscar-ajuda"] },
  { n: 4, frase: "Estou em situação de violência",
    paradas: ["violencia-nao-e-conflito", "onde-buscar-ajuda", "quando-a-acusacao-vira-arma", "perguntas-frequentes"] },
];

// LOGO DA AFYA: autorizado pelo professor em 10/11/2026.
// O arquivo fica em docs/assets/img/afya.png. Para esconder, troque
// "true" por "false" na linha abaixo e monte o site.
const MOSTRAR_LOGO_AFYA = true;
const LOGO_AFYA = MOSTRAR_LOGO_AFYA
  ? `      <p class="rodape-logo"><img src="assets/img/afya.png" alt="Afya Faculdade Sete Lagoas" width="379" height="150" loading="lazy"></p>`
  : `      <!-- espaço reservado para o logo da Afya (ver MOSTRAR_LOGO_AFYA no montador) -->`;

// CONTADOR DE VISITAS (GoatCounter, sem cookies e sem dados pessoais).
// Pedido pelo Pedro em 10/11/2026. Para desligar, deixe as aspas vazias: "".
const CONTADOR_VISITAS = "https://duascasasumfilho.goatcounter.com/count";
const SCRIPT_CONTADOR = CONTADOR_VISITAS
  ? `
  <script src="assets/js/contador.js" data-endpoint="${CONTADOR_VISITAS}" defer></script>`
  : "";

const ROTULO = Object.fromEntries(PAGINAS);

const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M4 24 13 15l9 9v15H4Z"/>
  <path d="M26 24l9-9 9 9v15H26Z"/>
  <circle cx="24" cy="31" r="3.5" fill="currentColor" stroke="none"/>
</svg>`;

const SETA = `<svg class="seta" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg>`;

function lerConteudo(arquivo) {
  const bruto = readFileSync(join(PASTA_CONTEUDO, arquivo), "utf8");
  // Cabeçalho no começo do arquivo:
  // <!--
  // titulo: ...
  // descricao: ...
  // -->
  const cabecalho = bruto.match(/^<!--([\s\S]*?)-->/);
  const dados = {};
  if (cabecalho) {
    for (const linha of cabecalho[1].split("\n")) {
      const m = linha.match(/^\s*([a-z-]+):\s*(.+?)\s*$/);
      if (m) dados[m[1]] = m[2];
    }
  }
  const corpo = cabecalho ? bruto.slice(cabecalho[0].length) : bruto;
  return { dados, corpo: corpo.trim() };
}

function escapar(texto) {
  return String(texto)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Troca as marcações especiais do conteúdo:
//   <!-- PARADAS 2 -->  vira a lista de páginas do caminho 2, na ordem
//   <!-- SETA -->       vira a setinha das linhas e das perguntas
function trocarMarcacoes(corpo) {
  return corpo
    .replace(/<!--\s*PARADAS\s+(\d)\s*-->/g, (_, n) => {
      const linha = LINHAS.find((l) => l.n === Number(n));
      if (!linha) return "";
      const itens = linha.paradas
        .map((slug) => `              <li><a href="${slug}.html?linha=${linha.n}">${ROTULO[slug]}</a></li>`)
        .join("\n");
      return `<ol class="paradas">\n${itens}\n            </ol>`;
    })
    .replace(/<!--\s*SETA\s*-->/g, SETA);
}

function montarMenu(slug) {
  const link = (s) => {
    const atual = s === slug ? ' aria-current="page"' : "";
    return `<li><a href="${s === "index" ? "./" : s + ".html"}"${atual}>${ROTULO[s]}</a></li>`;
  };
  const grupos = GRUPOS.map(
    ([nome, slugs]) => `<div class="menu-grupo">
              <h2>${nome}</h2>
              <ul>
                ${slugs.map(link).join("\n                ")}
              </ul>
            </div>`
  ).join("\n            ");
  return `<ul class="menu-inicio">
              ${link("index")}
            </ul>
            ${grupos}`;
}

function montarPagina(slug, rotuloMenu, { dados, corpo }) {
  const arquivoSaida = `${slug}.html`;
  const endereco = slug === "index" ? ENDERECO_SITE : `${ENDERECO_SITE}${arquivoSaida}`;
  const titulo = slug === "index" ? `${NOME_SITE}: convivência familiar e alienação parental` : `${dados.titulo || rotuloMenu} | ${NOME_SITE}`;
  const descricao = dados.descricao || "Informação acolhedora para pais e mães em separação em Sete Lagoas.";
  const inicio = dados.largura === "larga";
  const extrasHead = dados.head ? dados.head : "";
  const extrasScripts = (dados.scripts || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `<script src="${s}" defer></script>`)
    .join("\n  ");

  const textoWhats = encodeURIComponent(`${dados.titulo || NOME_SITE}: ${endereco}`);
  const conteudo = trocarMarcacoes(corpo);

  // A página inicial ocupa a largura toda. As outras têm uma coluna de leitura.
  const miolo = inicio
    ? conteudo
    : `    <div class="miolo">
      <article class="coluna">
${conteudo}
      </article>
    </div>`;

  // Dados dos caminhos de leitura, usados pelo site.js para mostrar
  // "página 2 de 5" e a próxima página do caminho.
  const dadosLinhas = JSON.stringify(
    LINHAS.map((l) => ({ n: l.n, frase: l.frase, paradas: l.paradas.map((s) => [s, ROTULO[s]]) }))
  ).replace(/</g, "\\u003c");

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapar(titulo)}</title>
  <meta name="description" content="${escapar(descricao)}">
  <meta name="theme-color" content="#F6F7F4">
  <meta name="referrer" content="no-referrer">
  ${slug === "404" ? '<base href="/">\n  <meta name="robots" content="noindex">' : `<link rel="canonical" href="${endereco}">`}
  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="${NOME_SITE}">
  <meta property="og:title" content="${escapar(dados.titulo || NOME_SITE)}">
  <meta property="og:description" content="${escapar(descricao)}">
  <meta property="og:url" content="${endereco}">
  <meta property="og:image" content="${ENDERECO_SITE}assets/img/capa.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="assets/img/icone.svg" type="image/svg+xml">
  <link rel="preload" href="assets/fontes/atkinson-hyperlegible-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fontes/barlow-semi-condensed-700.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/css/estilo.css">
  ${extrasHead}
</head>
<body data-pagina="${slug}">
  <a class="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>

  <header class="topo">
    <div class="miolo">
      <a class="marca" href="./" aria-label="${NOME_SITE}, página inicial">${LOGO}<span aria-hidden="true" translate="no">Duas Casas, <br>Um Filho</span></a>
      <details class="menu">
        <summary>Menu</summary>
        <nav aria-label="Páginas do site">
          <div class="miolo">
            ${montarMenu(slug)}
            <p class="menu-nota">O botão <strong>Sair rápido</strong> troca este site por uma página de previsão do tempo.</p>
          </div>
        </nav>
      </details>
      <a class="sair-rapido" href="https://www.climatempo.com.br/" rel="noopener noreferrer" title="Sai deste site na hora e abre um site de previsão do tempo">Sair rápido</a>
    </div>
  </header>

  <main id="conteudo" class="conteudo${inicio ? " conteudo--inicio" : ""}">
${miolo}
  </main>

  <section class="emergencia" aria-labelledby="titulo-emergencia">
    <div class="miolo">
      <h2 id="titulo-emergencia">Precisa de ajuda agora?</h2>
      <p>As ligações são gratuitas. Toque no número para ligar.</p>
      <ul class="telefones">
        <li><a href="tel:190"><strong>190</strong><span>Polícia Militar, em caso de perigo</span></a></li>
        <li><a href="tel:180"><strong>180</strong><span>Central de Atendimento à Mulher</span></a></li>
        <li><a href="tel:100"><strong>100</strong><span>Disque Direitos Humanos, também para crianças</span></a></li>
        <li><a href="tel:188"><strong>188</strong><span>CVV, apoio emocional 24 horas</span></a></li>
      </ul>
    </div>
  </section>

  <footer class="rodape">
    <div class="miolo">
      <p class="aviso-legal">Conteúdo informativo produzido por estudantes de Direito sob orientação docente. Não substitui a orientação de advogado(a) ou da Defensoria Pública.</p>
      <a class="compartilhar botao" href="https://wa.me/?text=${textoWhats}" rel="noopener noreferrer" target="_blank">Compartilhar no WhatsApp</a>
      <p>Projeto de Extensão do curso de Direito da Afya Faculdade Sete Lagoas, sob orientação do Prof. Filipe Garcia. <a href="sobre-o-projeto.html">Conheça o projeto</a>.</p>
${LOGO_AFYA}
      <p>Este site não usa cookies e não coleta seus dados. Ele só conta as visitas, sem saber quem visitou. O botão Sair rápido, no alto da página, troca este site por uma página de previsão do tempo.</p>
    </div>
  </footer>

  <script type="application/json" id="dados-linhas">${dadosLinhas}</script>
  <script src="assets/js/site.js" defer></script>${SCRIPT_CONTADOR}
  ${extrasScripts}
</body>
</html>
`;
}

const arquivos = new Set(readdirSync(PASTA_CONTEUDO));
let total = 0;
for (const [slug, rotulo] of PAGINAS) {
  const arquivo = `${slug}.html`;
  if (!arquivos.has(arquivo)) {
    console.warn(`Aviso: falta o arquivo conteudo/${arquivo}`);
    continue;
  }
  const html = montarPagina(slug, rotulo, lerConteudo(arquivo));
  writeFileSync(join(PASTA_SITE, arquivo), html, "utf8");
  total++;
}

// Página de erro: aparece quando alguém abre um endereço que não existe.
// Não entra no menu. O GitHub Pages usa o arquivo docs/404.html.
if (arquivos.has("404.html")) {
  writeFileSync(join(PASTA_SITE, "404.html"), montarPagina("404", "Página não encontrada", lerConteudo("404.html")), "utf8");
  total++;
}
console.log(`Pronto! ${total} página(s) montada(s) em docs/.`);
