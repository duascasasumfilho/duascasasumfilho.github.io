// Contador de visitas (GoatCounter): sem cookies e sem dados pessoais.
// Conta quantas vezes cada página foi aberta e, quando a pessoa chega por um
// QR Code com ?origem=local, registra também de que local ela veio.
// O endereço do contador fica em CONTADOR_VISITAS, no montador.

(function () {
  var este = document.currentScript;
  var endpoint = este && este.dataset.endpoint;
  if (!endpoint) return;

  window.goatcounter = window.goatcounter || {};
  window.goatcounter.no_onload = true;  // a contagem é feita abaixo
  window.goatcounter.no_events = true;

  var params = new URLSearchParams(location.search);
  var origem = (params.get("origem") || "").toLowerCase().replace(/[^a-z0-9-]/g, "").slice(0, 40);

  // Tira o ?origem do endereço: se a pessoa compartilhar o link, a visita
  // de quem receber não é contada como se fosse do QR Code.
  if (params.has("origem")) {
    params.delete("origem");
    var resto = params.toString();
    try { history.replaceState(null, "", location.pathname + (resto ? "?" + resto : "") + location.hash); } catch (e) {}
  }

  var s = document.createElement("script");
  s.src = "assets/js/goatcounter.js";
  s.async = true;
  s.dataset.goatcounter = endpoint;
  s.onload = function () {
    if (!window.goatcounter.count) return;
    // Só o caminho da página, sem ?linha, para os números não se dividirem
    window.goatcounter.count({ path: location.pathname || "/" });
    if (origem) {
      window.goatcounter.count({ path: "qr-" + origem, title: "QR Code: " + origem, event: true });
    }
  };
  document.head.appendChild(s);
})();
