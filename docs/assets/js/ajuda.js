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

  lista.forEach(function (s) {
    var card = el("article", "servico");
    card.appendChild(el("h3", null, s.nome));

    var selo = el("span", "selo " + (s.verificado ? "selo--ok" : "selo--confirmar"),
      s.verificado ? "Endereço conferido" : "Endereço em confirmação");
    card.appendChild(selo);

    if (s.paraQue) card.appendChild(el("p", "para-que", s.paraQue));
    if (s.verificado && s.endereco) card.appendChild(el("p", null, s.endereco));
    if (s.horario) card.appendChild(el("p", null, "Horário: " + s.horario));

    var acoes = acoesPara(s, s.verificado);
    if (acoes.children.length) card.appendChild(acoes);

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
      card.appendChild(lista2);
    }
    alvo.appendChild(card);
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
