// Busca do site. Roda só no navegador: o que a pessoa digita não é salvo,
// não vai para o endereço da página e não é enviado para lugar nenhum.
//
// O índice (assets/busca.json) é gerado pelo montador a partir das páginas.
// Ele só é baixado quando a pessoa abre a busca pela primeira vez.
// Os sinônimos ficam em conteudo/busca-sinonimos.json.

(function () {
  var botao = document.getElementById("abrir-busca");
  var janela = document.getElementById("busca");
  var campo = document.getElementById("campo-busca");
  var status = document.getElementById("busca-status");
  var alvo = document.getElementById("busca-resultados");
  if (!botao || !janela || !campo || !status || !alvo) return;
  // Navegadores muito antigos não têm a janela <dialog>: a lupa fica escondida
  if (typeof janela.showModal !== "function") return;
  botao.hidden = false;

  var MAXIMO = 8;            // quantos resultados aparecem
  var DICA = "Digite uma palavra ou uma dúvida. A busca entende erros de digitação.";

  // Palavras que não ajudam a encontrar nada ("de", "que", "para"...)
  var VAZIAS = {};
  ("a o as os de da do das dos e em no na nos nas um uma uns umas que para pra por com sem se eu me meu minha " +
   "ao aos como qual quais quando onde nao sim ja mais muito ser estar esta estou tem ter foi isso esse essa ele ela")
    .split(" ").forEach(function (p) { VAZIAS[p] = true; });

  function criar(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  // "Pensão" e "pensao" viram a mesma coisa; "visitas" e "visita" também
  function normal(texto) {
    return String(texto).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function raiz(palavra) {
    return palavra.length > 4 && palavra.charAt(palavra.length - 1) === "s" ? palavra.slice(0, -1) : palavra;
  }
  function palavrasDe(texto) {
    return normal(texto).match(/[a-z0-9]+/g) || [];
  }

  // Quantas letras é preciso trocar para uma palavra virar a outra.
  // Para de contar quando passa do limite.
  function distancia(a, b, limite) {
    if (Math.abs(a.length - b.length) > limite) return limite + 1;
    var anterior = [], atual = [], i, j;
    for (j = 0; j <= b.length; j++) anterior[j] = j;
    for (i = 1; i <= a.length; i++) {
      atual = [i];
      var menor = i;
      for (j = 1; j <= b.length; j++) {
        atual[j] = Math.min(anterior[j] + 1, atual[j - 1] + 1, anterior[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
        if (atual[j] < menor) menor = atual[j];
      }
      if (menor > limite) return limite + 1;
      anterior = atual;
    }
    return anterior[b.length];
  }

  // ---------- Índice ----------
  var secoes = null;        // todas as seções do site
  var vocabulario = null;   // palavra -> em quais seções ela aparece
  var gatilhos = [];        // sinônimos
  var carregando = null;

  function preparar(dados) {
    secoes = dados.secoes || [];
    vocabulario = new Map();
    function anotar(palavra, numero, campo) {
      var lista = vocabulario.get(palavra);
      if (!lista) { lista = new Map(); vocabulario.set(palavra, lista); }
      var onde = lista.get(numero);
      if (!onde) { onde = { texto: 0, secao: false, pagina: false }; lista.set(numero, onde); }
      if (campo === "texto") onde.texto++; else onde[campo] = true;
    }
    var separa = /[\p{L}\p{N}]+/gu;
    secoes.forEach(function (s, numero) {
      s.palavras = [];
      var m;
      separa.lastIndex = 0;
      while ((m = separa.exec(s.x))) {
        var r = raiz(normal(m[0]));
        s.palavras.push({ i: m.index, f: m.index + m[0].length, r: r });
        anotar(r, numero, "texto");
      }
      palavrasDe(s.s).forEach(function (p) { anotar(raiz(p), numero, "secao"); });
      palavrasDe(s.p).forEach(function (p) { anotar(raiz(p), numero, "pagina"); });
    });
    gatilhos = [];
    (dados.sinonimos || []).forEach(function (grupo) {
      var buscar = (grupo.buscar || []).map(function (termo) {
        return palavrasDe(termo).map(raiz).filter(function (p) { return !VAZIAS[p]; });
      });
      (grupo.quando || []).forEach(function (frase) {
        var partes = palavrasDe(frase).map(raiz);
        if (partes.length) gatilhos.push({ partes: partes, buscar: buscar });
      });
    });
    // as frases mais longas são testadas primeiro ("advogado de graça" antes de "advogado")
    gatilhos.sort(function (a, b) { return b.partes.length - a.partes.length; });
  }

  function carregar() {
    if (secoes) return Promise.resolve();
    if (!carregando) {
      carregando = fetch("assets/busca.json")
        .then(function (r) { if (!r.ok) throw new Error("falhou"); return r.json(); })
        .then(preparar)
        .catch(function (erro) { carregando = null; throw erro; });
    }
    return carregando;
  }

  // ---------- Procurar ----------

  // Divide o que a pessoa digitou em "unidades". Cada unidade é uma palavra
  // ou uma frase conhecida da lista de sinônimos.
  function analisar(consulta) {
    var brutas = palavrasDe(consulta).map(raiz);
    var unidades = [];
    var i = 0;
    while (i < brutas.length) {
      var achou = null;
      for (var g = 0; g < gatilhos.length && !achou; g++) {
        var partes = gatilhos[g].partes, igual = true;
        for (var k = 0; k < partes.length; k++) if (brutas[i + k] !== partes[k]) { igual = false; break; }
        if (igual) achou = gatilhos[g];
      }
      if (achou) {
        var proprias = achou.partes.filter(function (p) { return !VAZIAS[p]; });
        unidades.push({ proprias: proprias.length ? proprias : achou.partes, alternativas: achou.buscar });
        i += achou.partes.length;
      } else {
        if (!VAZIAS[brutas[i]]) unidades.push({ proprias: [brutas[i]], alternativas: [] });
        i++;
      }
    }
    if (!unidades.length) unidades = brutas.map(function (p) { return { proprias: [p], alternativas: [] }; });
    return unidades;
  }

  // Quanto vale achar a palavra nesta seção: no nome da seção vale mais
  function valor(numero, onde) {
    var topo = !secoes[numero].s;   // a abertura da página
    return (onde.secao ? 10 : 0) + (onde.pagina ? (topo ? 8 : 2) : 0) + (onde.texto ? 3 + Math.min(onde.texto - 1, 3) * 0.5 : 0);
  }

  // Palavras do site que combinam com a palavra digitada:
  // igual (1), começo igual (0,7) ou parecida, com erro de digitação (0,45)
  var memoria = {};
  function parecidas(palavra) {
    if (memoria[palavra]) return memoria[palavra];
    var achadas = [];
    if (vocabulario.has(palavra)) achadas.push([palavra, 1]);
    if (palavra.length >= 3) {
      vocabulario.forEach(function (_, outra) {
        if (outra !== palavra && outra.indexOf(palavra) === 0) achadas.push([outra, 0.7]);
      });
    }
    if (!achadas.length && palavra.length >= 4) {
      var limite = palavra.length >= 7 ? 2 : 1;
      vocabulario.forEach(function (_, outra) {
        if (distancia(palavra, outra, limite) <= limite) achadas.push([outra, 0.45]);
      });
    }
    memoria[palavra] = achadas;
    return achadas;
  }

  function procurar(consulta) {
    var unidades = analisar(consulta);
    var destaque = {};                 // palavras para destacar no trecho
    var pontos = secoes.map(function () { return { total: 0, niveis: [] }; });

    unidades.forEach(function (unidade, u) {
      var proprio = secoes.map(function () { return { soma: 0, nivel: 1, quantas: 0 }; });
      unidade.proprias.forEach(function (palavra) {
        var melhor = {};
        parecidas(palavra).forEach(function (par) {
          vocabulario.get(par[0]).forEach(function (onde, numero) {
            var v = valor(numero, onde) * par[1];
            if (!melhor[numero] || v > melhor[numero].v) melhor[numero] = { v: v, nivel: par[1], palavra: par[0] };
          });
        });
        Object.keys(melhor).forEach(function (numero) {
          var p = proprio[numero];
          p.soma += melhor[numero].v;
          p.nivel = Math.min(p.nivel, melhor[numero].nivel);
          p.quantas++;
          destaque[melhor[numero].palavra] = true;
        });
      });
      // sinônimos: "visita" também procura "convivência"
      var alternativo = {};
      unidade.alternativas.forEach(function (termo, ordemDoTermo) {
        var listas = termo.map(function (p) { return vocabulario.get(p); });
        if (!listas.length || listas.some(function (l) { return !l; })) return;
        listas[0].forEach(function (_, numero) {
          var soma = 0;
          for (var k = 0; k < listas.length; k++) {
            var onde = listas[k].get(numero);
            if (!onde) return;
            soma += valor(numero, onde);
          }
          // média por palavra, para um termo comprido não valer mais que um curto
          soma = (soma / listas.length) * 0.9 * (1 - 0.06 * ordemDoTermo);
          if (!alternativo[numero] || soma > alternativo[numero]) alternativo[numero] = soma;
          termo.forEach(function (p) { destaque[p] = true; });
        });
      });
      secoes.forEach(function (_, numero) {
        var p = proprio[numero];
        var inteiro = p.quantas === unidade.proprias.length;
        var soma = p.soma, nivel = inteiro ? p.nivel : 0;
        // quando a seção tem a palavra digitada e também o sinônimo, vale um pouco mais
        if (alternativo[numero]) { soma = Math.max(soma, alternativo[numero]) + Math.min(soma, alternativo[numero]) * 0.5; nivel = 1; }
        pontos[numero].total += soma;
        pontos[numero].niveis[u] = soma > 0 ? nivel : -1;
      });
    });

    var exatos = [], proximos = [];
    pontos.forEach(function (p, numero) {
      if (p.total <= 0) return;
      var certas = 0, completo = true;
      for (var u = 0; u < unidades.length; u++) {
        var n = p.niveis[u];
        if (n > 0) certas++;
        if (!(n >= 0.7)) completo = false;
      }
      var item = { numero: numero, total: p.total * (completo ? 1.5 : 1), certas: certas };
      (completo ? exatos : proximos).push(item);
    });
    function ordem(a, b) { return b.certas - a.certas || b.total - a.total; }
    exatos.sort(ordem);
    proximos.sort(ordem);
    return { exatos: exatos.slice(0, MAXIMO), proximos: proximos.slice(0, 6), destaque: destaque };
  }

  // ---------- Mostrar ----------

  // Um trecho do texto em volta da primeira palavra encontrada, com destaque
  function trecho(secao, destaque) {
    var texto = secao.x, palavras = secao.palavras;
    var primeira = -1;
    for (var i = 0; i < palavras.length; i++) if (destaque[palavras[i].r]) { primeira = i; break; }
    var inicio = 0, fim = Math.min(texto.length, 170);
    if (primeira >= 0) {
      inicio = Math.max(0, palavras[primeira].i - 60);
      fim = Math.min(texto.length, palavras[primeira].f + 110);
    }
    // não corta palavra no meio
    if (inicio > 0) { var espaco = texto.indexOf(" ", inicio); inicio = espaco > -1 && espaco < inicio + 25 ? espaco + 1 : inicio; }
    if (fim < texto.length) { var ultimo = texto.lastIndexOf(" ", fim); fim = ultimo > inicio ? ultimo : fim; }

    var linha = criar("span", "busca-trecho");
    var posicao = inicio;
    if (inicio > 0) linha.appendChild(document.createTextNode("… "));
    palavras.forEach(function (p) {
      if (p.i < inicio || p.f > fim || !destaque[p.r]) return;
      if (p.i > posicao) linha.appendChild(document.createTextNode(texto.slice(posicao, p.i)));
      linha.appendChild(criar("mark", null, texto.slice(p.i, p.f)));
      posicao = p.f;
    });
    if (posicao < fim) linha.appendChild(document.createTextNode(texto.slice(posicao, fim)));
    if (fim < texto.length) linha.appendChild(document.createTextNode(" …"));
    return linha;
  }

  function listar(itens, destaque) {
    var lista = criar("ul", "busca-lista");
    itens.forEach(function (item) {
      var s = secoes[item.numero];
      var li = criar("li");
      var a = criar("a", "busca-item");
      a.href = s.u;
      if (s.s) {
        a.appendChild(criar("span", "busca-pagina", s.p));
        a.appendChild(criar("strong", "busca-secao", s.s));
      } else {
        a.appendChild(criar("strong", "busca-secao", s.p));
      }
      a.appendChild(trecho(s, destaque));
      li.appendChild(a);
      lista.appendChild(li);
    });
    return lista;
  }

  // Sem nenhum resultado: as quatro portas da página inicial e o grupo
  function semNada() {
    var caixa = criar("div", "busca-vazio");
    var dados = document.getElementById("dados-linhas");
    var linhas = [];
    try { linhas = JSON.parse(dados.textContent); } catch (e) {}
    if (linhas.length) {
      caixa.appendChild(criar("p", null, "Escolha a frase que mais combina com o seu momento:"));
      var lista = criar("ul", "busca-portas");
      linhas.forEach(function (linha) {
        var li = criar("li");
        var a = criar("a");
        a.href = "./#porta-" + linha.n;
        a.style.setProperty("--cor", "var(--l" + linha.n + ")");
        a.style.setProperty("--cor-clara", "var(--l" + linha.n + "-claro)");
        var num = criar("span", "num", String(linha.n));
        num.setAttribute("aria-hidden", "true");
        a.appendChild(num);
        a.appendChild(criar("span", "frase", linha.frase));
        li.appendChild(a);
        lista.appendChild(li);
      });
      caixa.appendChild(lista);
    }
    var contato = document.getElementById("contato");
    if (contato) {
      caixa.appendChild(criar("p", null, "Ou converse com a equipe do projeto:"));
      var falar = criar("button", "botao botao--zap", contato.querySelector(".contato-rotulo").textContent);
      falar.type = "button";
      falar.addEventListener("click", function () {
        janela.close();
        contato.open = true;
        var primeiro = contato.querySelector(".contato-lista a") || contato.querySelector("summary");
        if (primeiro) primeiro.focus();
      });
      caixa.appendChild(falar);
    }
    return caixa;
  }

  function atualizar() {
    var consulta = campo.value.trim();
    alvo.textContent = "";
    if (consulta.length < 2) { status.textContent = DICA; return; }
    if (!secoes) {
      status.textContent = "Carregando a busca…";
      carregar().then(atualizar, function () { status.textContent = "Não foi possível carregar a busca. Confira a internet e tente de novo."; });
      return;
    }
    var r = procurar(consulta);
    if (r.exatos.length) {
      status.textContent = r.exatos.length === 1 ? "1 resultado" : r.exatos.length + " resultados";
      alvo.appendChild(listar(r.exatos, r.destaque));
    } else if (r.proximos.length) {
      status.textContent = "Não encontramos exatamente isso. Veja os temas mais próximos:";
      alvo.appendChild(listar(r.proximos, r.destaque));
    } else {
      status.textContent = "Não encontramos nada sobre isso.";
      alvo.appendChild(semNada());
    }
  }

  // ---------- Abrir, fechar e teclado ----------

  function abrir() {
    if (janela.open) return;
    // fecha o menu e o painel do grupo, se estiverem abertos
    var abertos = document.querySelectorAll(".menu[open], .contato[open]");
    for (var i = 0; i < abertos.length; i++) abertos[i].open = false;
    janela.showModal();
    campo.select();
    atualizar();
    carregar().catch(function () {});
  }

  botao.addEventListener("click", abrir);
  janela.querySelector(".busca-fechar").addEventListener("click", function () { janela.close(); });
  // no computador, clicar fora da caixa fecha a busca
  janela.addEventListener("click", function (evento) { if (evento.target === janela) janela.close(); });

  var espera = null;
  campo.addEventListener("input", function () {
    clearTimeout(espera);
    espera = setTimeout(atualizar, 90);
  });

  // Tecla "/" abre a busca, menos quando a pessoa está escrevendo em algum campo
  document.addEventListener("keydown", function (evento) {
    if (evento.key !== "/" || evento.ctrlKey || evento.metaKey || evento.altKey) return;
    var onde = evento.target;
    if (onde && (onde.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(onde.tagName))) return;
    evento.preventDefault();
    abrir();
  });

  // Setas para cima e para baixo andam pelos resultados; Enter no campo abre o primeiro
  janela.addEventListener("keydown", function (evento) {
    var links = alvo.querySelectorAll("a, button");
    if (!links.length) return;
    var atual = Array.prototype.indexOf.call(links, document.activeElement);
    if (evento.key === "ArrowDown") {
      evento.preventDefault();
      links[Math.min(atual + 1, links.length - 1)].focus();
    } else if (evento.key === "ArrowUp") {
      evento.preventDefault();
      if (atual <= 0) campo.focus(); else links[atual - 1].focus();
    } else if (evento.key === "Enter" && document.activeElement === campo) {
      clearTimeout(espera);
      atualizar();
      var primeiro = alvo.querySelector("a.busca-item");
      if (primeiro) { evento.preventDefault(); primeiro.click(); }
    }
  });

  // Ao escolher um resultado, a busca fecha (o link leva direto à seção)
  alvo.addEventListener("click", function (evento) {
    if (evento.target.closest && evento.target.closest("a")) janela.close();
  });
})();
