// Página "Onde buscar ajuda": monta os cartões e o mapa a partir de data/rede-apoio.js

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
      var busca = /Sete Lagoas/.test(item.endereco) ? item.endereco : item.endereco + ", Sete Lagoas/MG";
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

  // Mapa: só aparece se algum órgão conferido tiver coordenadas
  var comPino = lista.filter(function (s) {
    return s.verificado && typeof s.lat === "number" && typeof s.lng === "number";
  });
  if (!caixaMapa) return;
  if (!comPino.length) { caixaMapa.hidden = true; return; }

  var css = document.createElement("link");
  css.rel = "stylesheet";
  css.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
  document.head.appendChild(css);

  var js = document.createElement("script");
  js.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
  js.onload = function () {
    caixaMapa.hidden = false;
    var mapa = L.map("mapa", { scrollWheelZoom: false });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; colaboradores do OpenStreetMap"
    }).addTo(mapa);
    var limites = [];
    comPino.forEach(function (s) {
      L.marker([s.lat, s.lng]).addTo(mapa).bindPopup("<strong>" + s.nome + "</strong>");
      limites.push([s.lat, s.lng]);
    });
    if (limites.length === 1) mapa.setView(limites[0], 16);
    else mapa.fitBounds(limites, { padding: [30, 30] });
  };
  document.body.appendChild(js);
})();
