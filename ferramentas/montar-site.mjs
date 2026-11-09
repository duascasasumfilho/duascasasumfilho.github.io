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
const ENDERECO_SITE = "https://pedritoartist.github.io/duas-casas-um-filho/";
const NOME_SITE = "Duas Casas, Um Filho";

// Ordem das páginas no menu
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

const LOGO = `<svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <path d="M3 24 L13 15 L23 24 V40 H3 Z" fill="#E9E3F6" stroke="#5E4B9C" stroke-width="2.4" stroke-linejoin="round"/>
  <path d="M25 24 L35 15 L45 24 V40 H25 Z" fill="#DCEFE3" stroke="#3B7F57" stroke-width="2.4" stroke-linejoin="round"/>
  <circle cx="24" cy="31" r="4.2" fill="#3A2D63"/>
  <path d="M24 35.5 V40" stroke="#3A2D63" stroke-width="2.4" stroke-linecap="round"/>
</svg>`;

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

function montarPagina(slug, rotuloMenu, { dados, corpo }) {
  const arquivoSaida = `${slug}.html`;
  const endereco = slug === "index" ? ENDERECO_SITE : `${ENDERECO_SITE}${arquivoSaida}`;
  const titulo = slug === "index" ? `${NOME_SITE}: convivência familiar e alienação parental` : `${dados.titulo || rotuloMenu} | ${NOME_SITE}`;
  const descricao = dados.descricao || "Informação acolhedora para pais e mães em separação em Sete Lagoas.";
  const largura = dados.largura === "larga" ? " conteudo--larga" : "";
  const extrasHead = dados.head ? dados.head : "";
  const extrasScripts = (dados.scripts || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => `<script src="${s}" defer></script>`)
    .join("\n  ");

  const menu = PAGINAS.map(([s, r]) => {
    const atual = s === slug ? ' aria-current="page"' : "";
    return `<li><a href="${s === "index" ? "./" : s + ".html"}"${atual}>${r}</a></li>`;
  }).join("\n            ");

  const textoWhats = encodeURIComponent(`${dados.titulo || NOME_SITE}: ${endereco}`);

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapar(titulo)}</title>
  <meta name="description" content="${escapar(descricao)}">
  <meta name="theme-color" content="#3A2D63">
  <meta name="referrer" content="no-referrer">
  <link rel="canonical" href="${endereco}">
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
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400&family=Fraunces:opsz,wght,SOFT@9..144,500..700,100&display=swap">
  <link rel="stylesheet" href="assets/css/estilo.css">
  ${extrasHead}
</head>
<body>
  <a class="pular-conteudo" href="#conteudo">Pular para o conteúdo</a>
  <a class="sair-rapido" href="https://www.climatempo.com.br/" rel="noopener noreferrer" title="Sai deste site na hora e abre um site de previsão do tempo">Sair rápido</a>

  <header class="cabecalho">
    <div class="cabecalho-interno">
      <a class="marca" href="./" aria-label="${NOME_SITE}, página inicial">${LOGO}<span aria-hidden="true">Duas Casas,<br>Um Filho</span></a>
      <details class="menu">
        <summary>Menu</summary>
        <nav aria-label="Páginas do site">
          <ul>
            ${menu}
          </ul>
        </nav>
      </details>
    </div>
  </header>

  <main id="conteudo" class="conteudo${largura}">
${corpo}
  </main>

  <section class="emergencia" aria-labelledby="titulo-emergencia">
    <div class="emergencia-interno">
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
    <div class="rodape-interno">
      <p class="aviso-legal">Conteúdo informativo produzido por estudantes de Direito sob orientação docente. Não substitui a orientação de advogado(a) ou da Defensoria Pública.</p>
      <a class="compartilhar botao botao--verde" href="https://wa.me/?text=${textoWhats}" rel="noopener noreferrer" target="_blank">Compartilhar no WhatsApp</a>
      <p>Projeto de Extensão do curso de Direito da Afya Faculdade Sete Lagoas, sob orientação do Prof. Filipe Garcia. <a href="sobre-o-projeto.html">Conheça o projeto</a>.</p>
      <p>Este site não usa cookies e não coleta seus dados.</p>
    </div>
  </footer>

  <script src="assets/js/site.js" defer></script>
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
console.log(`Pronto! ${total} página(s) montada(s) em docs/.`);
