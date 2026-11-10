// Duas Casas, Um Filho — comportamento comum a todas as páginas.
// Nada aqui guarda informação no aparelho: o caminho de leitura vai só
// no endereço da página (?linha=2).

(function () {
  // ---------- Botão "Sair rápido" ----------
  // Troca a página por um site neutro sem deixar esta página no botão
  // "voltar" do navegador.
  var SITE_NEUTRO = "https://www.climatempo.com.br/";
  var botao = document.querySelector(".sair-rapido");
  if (botao) {
    botao.addEventListener("click", function (evento) {
      evento.preventDefault();
      try { document.body.style.display = "none"; } catch (e) {}
      window.location.replace(SITE_NEUTRO);
    });
  }

  // ---------- Menu ----------
  // Fecha ao clicar fora dele ou apertar Esc
  var menu = document.querySelector(".menu");
  if (menu) {
    document.addEventListener("click", function (evento) {
      if (menu.open && !menu.contains(evento.target)) menu.open = false;
    });
    document.addEventListener("keydown", function (evento) {
      if (evento.key === "Escape" && menu.open) {
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
  }

  function criar(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  var pagina = document.body.getAttribute("data-pagina");
  var principal = document.getElementById("conteudo");

  // ---------- "Seu caminho" ----------
  // Quando a pessoa chega por uma das quatro portas da página inicial,
  // mostra em que página do caminho ela está e qual é a próxima.
  (function () {
    var bruto = document.getElementById("dados-linhas");
    var n = new URLSearchParams(window.location.search).get("linha");
    if (!bruto || !n || !principal) return;
    var linhas;
    try { linhas = JSON.parse(bruto.textContent); } catch (e) { return; }
    var linha = null;
    for (var i = 0; i < linhas.length; i++) if (String(linhas[i].n) === n) linha = linhas[i];
    if (!linha) return;
    var pos = -1;
    for (var j = 0; j < linha.paradas.length; j++) if (linha.paradas[j][0] === pagina) pos = j;
    if (pos < 0) return;

    var total = linha.paradas.length;
    document.body.style.setProperty("--cor", "var(--l" + linha.n + ")");

    // Faixa logo abaixo do cabeçalho
    var faixa = criar("div", "trilho");
    faixa.setAttribute("role", "note");
    var miolo = criar("div", "miolo");
    var num = criar("span", "num", String(linha.n));
    num.setAttribute("aria-hidden", "true");
    var frase = criar("p", "trilho-frase", linha.frase);
    var onde = criar("p", "trilho-onde");
    onde.appendChild(criar("span", null, "Página " + (pos + 1) + " de " + total + " deste caminho"));
    var pontos = criar("span", "trilho-pontos");
    pontos.setAttribute("aria-hidden", "true");
    for (var k = 0; k < total; k++) pontos.appendChild(criar("i", k < pos ? "feito" : k === pos ? "aqui" : null));
    onde.appendChild(pontos);
    miolo.appendChild(num);
    miolo.appendChild(frase);
    miolo.appendChild(onde);
    faixa.appendChild(miolo);
    principal.parentNode.insertBefore(faixa, principal);

    // No fim da página, o botão leva à próxima página do caminho
    var proxima = document.querySelector(".proxima");
    if (!proxima) {
      proxima = criar("div", "proxima");
      var coluna = document.querySelector(".coluna");
      if (coluna) coluna.appendChild(proxima);
    }
    proxima.textContent = "";
    var link = criar("a", "botao");
    if (pos + 1 < total) {
      proxima.appendChild(criar("p", null, "Próxima página do seu caminho:"));
      link.href = linha.paradas[pos + 1][0] + ".html?linha=" + linha.n;
      link.textContent = linha.paradas[pos + 1][1];
    } else {
      proxima.appendChild(criar("p", null, "Você chegou ao fim deste caminho."));
      link.href = "./";
      link.textContent = "Voltar para o início";
    }
    proxima.appendChild(link);
  })();

  // ---------- "Nesta página" ----------
  // Monta um índice com os subtítulos da página. No celular ele abre e
  // fecha; em telas largas fica fixo na lateral.
  (function () {
    var coluna = document.querySelector(".coluna");
    if (!coluna) return;
    var titulos = [];
    var todos = coluna.querySelectorAll("h2");
    for (var i = 0; i < todos.length; i++) {
      var h = todos[i];
      if (h.closest(".passos, .proxima, .quiz-resultado, .equilibrio, [hidden]")) continue;
      titulos.push(h);
    }
    if (titulos.length < 3) return;

    var usados = {};
    function idPara(texto) {
      var base = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "parte";
      var id = base, n = 2;
      while (usados[id] || document.getElementById(id)) id = base + "-" + n++;
      usados[id] = true;
      return id;
    }

    var nav = criar("nav", "nesta-pagina");
    nav.setAttribute("aria-label", "Nesta página");
    var interno = criar("div", "np-interno");
    var botaoIndice = criar("button", "np-botao");
    botaoIndice.type = "button";
    botaoIndice.setAttribute("aria-expanded", "false");
    botaoIndice.appendChild(criar("span", null, "Nesta página"));
    var seta = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    seta.setAttribute("class", "seta");
    seta.setAttribute("viewBox", "0 0 24 24");
    seta.setAttribute("aria-hidden", "true");
    seta.setAttribute("fill", "none");
    seta.setAttribute("stroke", "currentColor");
    seta.setAttribute("stroke-width", "3");
    seta.setAttribute("stroke-linecap", "round");
    seta.setAttribute("stroke-linejoin", "round");
    var traco = document.createElementNS("http://www.w3.org/2000/svg", "path");
    traco.setAttribute("d", "m9 5 7 7-7 7");
    seta.appendChild(traco);
    botaoIndice.appendChild(seta);

    var lista = criar("ol");
    var links = [];
    titulos.forEach(function (h) {
      if (!h.id) h.id = idPara(h.textContent);
      var li = criar("li");
      var a = criar("a", null, h.textContent);
      a.href = "#" + h.id;
      a.addEventListener("click", function () {
        nav.classList.remove("aberto");
        botaoIndice.setAttribute("aria-expanded", "false");
      });
      li.appendChild(a);
      lista.appendChild(li);
      links.push(a);
    });

    botaoIndice.addEventListener("click", function () {
      var aberto = nav.classList.toggle("aberto");
      botaoIndice.setAttribute("aria-expanded", aberto ? "true" : "false");
    });

    interno.appendChild(botaoIndice);
    interno.appendChild(lista);
    nav.appendChild(interno);
    var depoisDe = coluna.querySelector(".abertura") || coluna.querySelector("h1");
    if (depoisDe && depoisDe.nextSibling) coluna.insertBefore(nav, depoisDe.nextSibling);
    else coluna.insertBefore(nav, coluna.firstChild);

    // Marca no índice a parte da página que está na tela
    if (!("IntersectionObserver" in window)) return;
    var visiveis = {};
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) { visiveis[e.target.id] = e.isIntersecting; });
      var atual = null;
      for (var i = 0; i < titulos.length; i++) {
        var topo = titulos[i].getBoundingClientRect().top;
        if (topo < window.innerHeight * 0.4) atual = titulos[i].id;
      }
      links.forEach(function (a) {
        if (atual && a.getAttribute("href") === "#" + atual) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }, { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] });
    titulos.forEach(function (h) { observador.observe(h); });
  })();
})();
