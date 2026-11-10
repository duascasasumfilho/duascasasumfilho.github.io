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

// REGRAS DE SEGURANÇA (Content-Security-Policy): o navegador só carrega
// arquivos do próprio site, as imagens do mapa (OpenStreetMap) e o contador.
const ORIGEM_CONTADOR = CONTADOR_VISITAS ? new URL(CONTADOR_VISITAS).origin : "";
const SEGURANCA = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: https://tile.openstreetmap.org ${ORIGEM_CONTADOR}`.trim(),
  `connect-src 'self' ${ORIGEM_CONTADOR}`.trim(),
  "font-src 'self'",
  "object-src 'none'",
  "frame-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
  "upgrade-insecure-requests"
].join("; ");

// GOOGLE SEARCH CONSOLE: código que prova ao Google que o site é do grupo.
// Fica só na página inicial. Não apague, ou o Search Console perde o acesso.
const CODIGO_GOOGLE = "9KUSH3Ms1ipK0C8s_IIaOVnleIR_GBrKOjxfWCU2DTY";
const VERIFICACAO_GOOGLE = CODIGO_GOOGLE
  ? `
  <meta name="google-site-verification" content="${CODIGO_GOOGLE}">`
  : "";

// ILUSTRAÇÕES em traço (visual "Casa com luz"). Cada página tem a sua,
// ao lado do título. No conteúdo, <!-- ILUSTRA nome --> põe um desenho.
const ILUSTRACOES = {
  convivencia: '<circle cx="34" cy="36" r="24" fill="#E3F0E6" stroke="none"/><rect x="12" y="16" width="40" height="36" rx="6"/><path d="M12 27h40M22 11v9M42 11v9"/><circle cx="25" cy="38" r="4" fill="#F2B705" stroke="none"/><circle cx="39" cy="38" r="4" fill="#F2B705" stroke="none"/>',
  alienacao: '<path d="M8 14h30a6 6 0 0 1 6 6v12a6 6 0 0 1-6 6H22l-8 7v-7H8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6Z" fill="#FFF0D2"/><path d="M56 26H34a6 6 0 0 0-6 6v10a6 6 0 0 0 6 6h12l8 7v-7h2a6 6 0 0 0 6-6V32a6 6 0 0 0-6-6Z" fill="#E3F1E6"/><path d="M11 26h22M37 37h16"/>',
  acusacao: '<circle cx="32" cy="34" r="24" fill="#FBE8D8" stroke="none"/><path d="M6 24h40M38 16l8 8-8 8M58 42H18M26 34l-8 8 8 8"/>',
  debate: '<circle cx="30" cy="36" r="24" fill="#E1ECF6" stroke="none"/><path d="M14 8h26l10 10v38H14Z"/><path d="M40 8v10h10M21 28h22M21 36h22M21 44h14"/>',
  protegendo: '<circle cx="32" cy="34" r="24" fill="#FCE7A6" stroke="none"/><path d="M6 30a26 22 0 0 1 52 0Z"/><path d="M32 8v4M32 30v22a5 5 0 0 1-10 0"/><circle cx="44" cy="46" r="6" fill="#F2B705"/>',
  violencia: '<circle cx="32" cy="34" r="24" fill="#F6E2E8" stroke="none"/><path d="M32 6l20 8v14c0 14-9 24-20 30-11-6-20-16-20-30V14Z"/><circle cx="32" cy="32" r="6" fill="#F2B705"/>',
  mediacao: '<circle cx="32" cy="36" r="24" fill="#E3F0E6" stroke="none"/><circle cx="14" cy="22" r="6"/><circle cx="50" cy="22" r="6"/><path d="M4 50v-8a10 10 0 0 1 20 0v8M40 50v-8a10 10 0 0 1 20 0v8M24 40h16"/>',
  passos: '<circle cx="32" cy="34" r="24" fill="#FBE8D8" stroke="none"/><path d="M8 54h14V42h14V30h14V18h8"/><circle cx="50" cy="10" r="5" fill="#F2B705"/>',
  ajuda: '<circle cx="32" cy="36" r="24" fill="#E1ECF6" stroke="none"/><path d="M32 60S12 40 12 26a20 20 0 0 1 40 0c0 14-20 34-20 34Z"/><path d="M23 30l9-8 9 8v9H23Z"/><circle cx="32" cy="33" r="2.5" fill="#F2B705" stroke="none"/>',
  perguntas: '<circle cx="32" cy="34" r="24" fill="#FCE7A6" stroke="none"/><path d="M10 10h44a6 6 0 0 1 6 6v24a6 6 0 0 1-6 6H30l-12 10V46h-8a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Z"/><path d="M26 22a6 6 0 1 1 8 6c-2 1-2 2-2 4"/><circle cx="32" cy="38" r="1.5" fill="#0F4C5C"/>',
  quiz: '<circle cx="32" cy="34" r="24" fill="#E3F1E6" stroke="none"/><rect x="12" y="10" width="40" height="46" rx="6"/><path d="M20 24l4 4 8-8M20 42l4 4 8-8M38 26h8M38 44h8"/>',
  sobre: '<circle cx="32" cy="34" r="24" fill="#F6E2E8" stroke="none"/><path d="M32 18c-8-6-18-6-26-4v38c8-2 18-2 26 4 8-6 18-6 26-4V14c-8-2-18-2-26 4Z"/><path d="M32 18v38"/>',
  juridico: '<circle cx="32" cy="34" r="24" fill="#E1ECF6" stroke="none"/><path d="M16 8h22l10 10v38H16Z"/><path d="M38 8v10h10M23 30h18M23 38h18"/><circle cx="44" cy="50" r="7" fill="#F2B705"/>',
  protecao: '<circle cx="32" cy="34" r="24" fill="#F6E2E8" stroke="none"/><path d="M32 6l20 8v14c0 14-9 24-20 30-11-6-20-16-20-30V14Z"/><path d="M23 32l6 6 12-12"/>',
  saude: '<circle cx="32" cy="34" r="24" fill="#E3F0E6" stroke="none"/><path d="M32 54S8 40 8 24a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 16-24 30-24 30Z"/><path d="M32 26v14M25 33h14"/>'
};
const ILUSTRA_DA_PAGINA = {
  "convivencia": "convivencia", "o-que-e-alienacao-parental": "alienacao",
  "quando-a-acusacao-vira-arma": "acusacao", "debate-sobre-a-lei": "debate",
  "protegendo-seu-filho": "protegendo", "violencia-nao-e-conflito": "violencia",
  "mediacao-e-cejusc": "mediacao", "passo-a-passo": "passos",
  "onde-buscar-ajuda": "ajuda", "perguntas-frequentes": "perguntas",
  "teste-seus-conhecimentos": "quiz", "sobre-o-projeto": "sobre"
};
function desenho(nome, classe) {
  const miolo = ILUSTRACOES[nome];
  if (!miolo) throw new Error("Ilustração desconhecida: " + nome);
  return `<svg class="${classe}" viewBox="0 0 64 64" aria-hidden="true" focusable="false" fill="none" stroke="#0F4C5C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">${miolo}</svg>`;
}

// Ícones do quadro "Pode ser / Não é, por si só"
const ICONE_PODE = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v6M12 16.5v.5"/></svg>`;
const ICONE_NAOE = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.7 2.7L16 9.8"/></svg>`;

const ROTULO = Object.fromEntries(PAGINAS);

const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
  <path d="M4 24 13 15l9 9v15H4Z"/>
  <path d="M26 24l9-9 9 9v15H26Z"/>
  <circle class="crianca-ponto" cx="24" cy="31" r="4" fill="currentColor" stroke="none"/>
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
    .replace(/<!--\s*SETA\s*-->/g, SETA)
    .replace(/<!--\s*ILUSTRA\s+([a-z]+)\s*-->/g, (_, nome) => desenho(nome, "icone-tema"))
    .replace(/<div class="pares" role="list">/g, `<div class="pares" role="list">
  <div class="pares-legenda" aria-hidden="true"><div class="lp">${ICONE_PODE}Pode ser</div><div class="ln">${ICONE_NAOE}Não é, por si só</div></div>`)
    .replace(/<span class="par-rotulo">Pode ser<\/span>/g, `<span class="par-rotulo">${ICONE_PODE}Pode ser</span>`)
    .replace(/<span class="par-rotulo">Não é, por si só<\/span>/g, `<span class="par-rotulo">${ICONE_NAOE}Não é, por si só</span>`);
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

  const textoWhats = slug === "404"
    ? encodeURIComponent(`${NOME_SITE}: ${ENDERECO_SITE}`)
    : encodeURIComponent(`${dados.titulo || NOME_SITE}: ${endereco}`);
  let conteudo = trocarMarcacoes(corpo);
  const ilustra = ILUSTRA_DA_PAGINA[slug];
  if (ilustra) {
    conteudo = conteudo.replace(/<h1>([\s\S]*?)<\/h1>/, (h1) => `<div class="cabeca-pagina">${h1}${desenho(ilustra, "ilustra")}</div>`);
  }

  // A página inicial ocupa a largura toda. As outras têm uma coluna de leitura.
  const miolo = inicio
    ? conteudo
    : `    <div class="miolo">
      <article class="coluna${dados.largura === "ampla" ? " coluna--ampla" : ""}">
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
  <meta name="theme-color" content="#FDF6EE">${slug === "index" ? VERIFICACAO_GOOGLE : ""}
  <meta name="referrer" content="no-referrer">
  <meta http-equiv="Content-Security-Policy" content="${SEGURANCA}">
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
  <link rel="icon" href="favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="assets/img/icone-180.png">
  <link rel="preload" href="assets/fontes/atkinson-hyperlegible-400.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fontes/lexend-600.woff2" as="font" type="font/woff2" crossorigin>
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
            <p class="menu-nota">O botão <strong>Sair rápido</strong> troca este site por uma página de previsão do tempo. No computador, a tecla <kbd>Esc</kbd> faz o mesmo.</p>
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
      <p>Este site não usa cookies e não coleta seus dados. Ele só conta as visitas, sem saber quem visitou. O botão Sair rápido, no alto da página, troca este site por uma página de previsão do tempo. No computador, a tecla Esc faz o mesmo.</p>
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
// robots.txt e sitemap.xml: ajudam o Google a encontrar todas as páginas.
const hoje = new Date().toISOString().slice(0, 10);
const enderecos = PAGINAS.map(([slug]) =>
  slug === "index" ? ENDERECO_SITE : ENDERECO_SITE + slug + ".html");
writeFileSync(join(PASTA_SITE, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${enderecos.map((u) => `  <url><loc>${u}</loc><lastmod>${hoje}</lastmod></url>`).join("\n")}
</urlset>
`, "utf8");
writeFileSync(join(PASTA_SITE, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${ENDERECO_SITE}sitemap.xml
`, "utf8");

console.log(`Pronto! ${total} página(s) montada(s) em docs/.`);
