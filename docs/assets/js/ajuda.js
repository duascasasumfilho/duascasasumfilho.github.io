// Página "Onde buscar ajuda": monta a lista de serviços e o mapa a partir de data/rede-apoio.js

(function () {
  var lista = window.REDE_APOIO || [];
  var alvo = document.getElementById("lista-servicos");
  var caixaMapa = document.getElementById("caixa-mapa");
  if (!alvo) return;

  function el(tag, classe, texto) {
    var e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto) e.textContent = texto;
    return e;
  }

  // Lista de telefones: aceita "telefones" (lista) ou "telefone" (um só)
  function telefonesDe(item) {
    if (Array.isArray(item.telefones)) return item.telefones.filter(Boolean);
    return item.telefone ? [item.telefone] : [];
  }

  function temCoordenada(item) {
    return typeof item.lat === "number" && typeof item.lng === "number";
  }

  // Monta os botões de ligar e de abrir no mapa
  function acoesPara(item, mostrarEndereco) {
    var acoes = el("div", "servico-acoes");
    telefonesDe(item).forEach(function (numero) {
      var tel = el("a", "botao", "Ligar: " + numero);
      var digitos = String(numero).replace(/[^0-9]/g, "");
      tel.href = "tel:" + (digitos.length >= 10 ? "+55" + digitos : digitos);
      acoes.appendChild(tel);
    });
    if (mostrarEndereco && item.endereco) {
      var mapa = el("a", "botao botao--contorno", "Abrir no mapa");
      var busca = temCoordenada(item) ? item.lat + "," + item.lng
        : (/Sete Lagoas/.test(item.endereco) ? item.endereco : item.endereco + ", Sete Lagoas/MG");
      mapa.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(busca);
      mapa.target = "_blank";
      mapa.rel = "noopener noreferrer";
      acoes.appendChild(mapa);
    }
    return acoes;
  }

  // Cada órgão vira um cartão que abre e fecha. Fechado, mostra o nome e
  // para que serve; aberto, mostra endereço, horário e os botões.
  // O cartão vai para a seção da sua "categoria" (Proteção, Jurídico ou
  // Saúde e assistência). Sem categoria, vai para a última seção.
  var secoes = alvo.querySelectorAll("[data-categoria]");
  var seta = '<svg class="seta" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';

  lista.forEach(function (s) {
    var card = el("details", "servico");
    var resumo = el("summary");
    resumo.appendChild(el("span", "servico-nome", s.nome));
    resumo.insertAdjacentHTML("beforeend", seta);
    if (s.paraQue) resumo.appendChild(el("span", "para-que", s.paraQue));
    card.appendChild(resumo);

    var corpo = el("div", "servico-corpo");
    corpo.appendChild(el("span", "selo " + (s.verificado ? "selo--ok" : "selo--confirmar"),
      s.verificado ? "Endereço conferido" : "Endereço em confirmação"));
    if (s.verificado && s.endereco) corpo.appendChild(el("p", null, s.endereco));
    if (s.horario) corpo.appendChild(el("p", null, "Horário: " + s.horario));

    var acoes = acoesPara(s, s.verificado);
    if (acoes.children.length) corpo.appendChild(acoes);

    // Órgãos com mais de um endereço (por exemplo, os três setores do Conselho Tutelar)
    if (Array.isArray(s.unidades) && s.unidades.length) {
      var lista2 = el("ul", "unidades");
      s.unidades.forEach(function (u) {
        var li = el("li");
        li.appendChild(el("p", "unidade-nome", u.nome));
        if (s.verificado && u.endereco) li.appendChild(el("p", null, u.endereco));
        var acoesU = acoesPara(u, s.verificado);
        if (acoesU.children.length) li.appendChild(acoesU);
        lista2.appendChild(li);
      });
      corpo.appendChild(lista2);
    }
    card.appendChild(corpo);

    var destino = alvo.querySelector('[data-categoria="' + s.categoria + '"]') || secoes[secoes.length - 1] || alvo;
    destino.appendChild(card);
  });


  // Mapa: só carrega quando a pessoa pede. Antes disso, a página não faz
  // nenhum pedido a outro site. O Leaflet fica em assets/leaflet; as imagens
  // do mapa vêm do OpenStreetMap.
  var pinos = [];
  lista.forEach(function (s) {
    if (!s.verificado) return;
    if (temCoordenada(s)) pinos.push({ titulo: s.nome, endereco: s.endereco, lat: s.lat, lng: s.lng });
    (s.unidades || []).forEach(function (u) {
      if (temCoordenada(u)) pinos.push({ titulo: s.nome, sub: u.nome, endereco: u.endereco, lat: u.lat, lng: u.lng });
    });
  });
  if (!caixaMapa) return;
  if (!pinos.length) { caixaMapa.hidden = true; return; }
  caixaMapa.hidden = false;

  var botaoMapa = document.getElementById("mostrar-mapa");
  var areaMapa = document.getElementById("mapa");
  if (!botaoMapa || !areaMapa) return;

  function carregar(tag, atributos) {
    return new Promise(function (ok, erro) {
      var e = document.createElement(tag);
      Object.keys(atributos).forEach(function (k) { e[k] = atributos[k]; });
      e.onload = ok;
      e.onerror = erro;
      document.head.appendChild(e);
    });
  }

  botaoMapa.addEventListener("click", function () {
    botaoMapa.disabled = true;
    botaoMapa.textContent = "Carregando o mapa…";
    Promise.all([
      carregar("link", { rel: "stylesheet", href: "assets/leaflet/leaflet.css" }),
      carregar("script", { src: "assets/leaflet/leaflet.js" })
    ]).then(function () {
      botaoMapa.hidden = true;
      areaMapa.hidden = false;
      var cor = getComputedStyle(document.documentElement);
      var campo = cor.getPropertyValue("--campo").trim() || "#0F4C5C";
      var quente = cor.getPropertyValue("--quente").trim() || "#F2B705";

      var mapa = L.map(areaMapa, { scrollWheelZoom: false });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        referrerPolicy: "strict-origin",
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(mapa);

      var limites = [];
      pinos.forEach(function (p) {
        var balao = el("div", "mapa-balao");
        balao.appendChild(el("strong", null, p.titulo));
        if (p.sub) balao.appendChild(el("span", null, p.sub));
        if (p.endereco) balao.appendChild(el("span", null, p.endereco));
        L.circleMarker([p.lat, p.lng], {
          radius: 9, color: campo, weight: 3, fillColor: quente, fillOpacity: 1
        }).addTo(mapa).bindPopup(balao);
        limites.push([p.lat, p.lng]);
      });
      if (limites.length === 1) mapa.setView(limites[0], 16);
      else mapa.fitBounds(limites, { padding: [24, 24] });
    }).catch(function () {
      botaoMapa.disabled = false;
      botaoMapa.textContent = "Não foi possível carregar. Tentar de novo";
    });
  });
})();
