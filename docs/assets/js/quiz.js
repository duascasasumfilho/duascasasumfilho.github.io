// Quiz "Teste seus conhecimentos". Roda só no navegador: nenhuma resposta é enviada ou guardada.

(function () {
  // Para editar: troque o texto da pergunta, a resposta certa (true = Verdadeiro,
  // false = Falso) e a explicação.
  var PERGUNTAS = [
    { texto: "Se o outro genitor atrasa a pensão, posso suspender as visitas.", certa: false,
      explicacao: "Pensão e convivência são independentes. Se a pensão atrasar, o caminho é procurar a Justiça, não impedir a visita." },
    { texto: "Guarda compartilhada significa que a criança passa metade do tempo em cada casa.", certa: false,
      explicacao: "Guarda compartilhada significa dividir as decisões sobre a vida do filho. O tempo em cada casa pode ser diferente." },
    { texto: "Se a criança não quer ver um dos pais, isso prova alienação parental.", certa: false,
      explicacao: "Rejeição é sintoma, não diagnóstico. Pode ter muitas causas, e só uma avaliação profissional consegue entender." },
    { texto: "Denunciar uma suspeita de abuso é sempre alienação parental.", certa: false,
      explicacao: "Proteger não é alienar. Uma suspeita de abuso deve ser levada a sério e apurada pelos canais certos." },
    { texto: "Fazer uma denúncia falsa para afastar o outro genitor pode ser considerado alienação parental.", certa: true,
      explicacao: "A Lei 12.318/2010 (art. 2º, parágrafo único, VI) prevê a falsa denúncia como forma de alienação parental." },
    { texto: "Em casos de violência doméstica, a mediação é sempre o melhor caminho.", certa: false,
      explicacao: "A mediação não é indicada quando há violência, ameaça ou controle. Nesses casos, a proteção vem primeiro." },
    { texto: "Pedir que a criança grave o outro genitor ajuda a proteger meu filho.", certa: false,
      explicacao: "Isso coloca a criança no meio do conflito e a torna responsável pela prova. Procure ajuda profissional." },
    { texto: "A Lei de Alienação Parental foi revogada.", certa: false,
      explicacao: "A lei continua em vigor. Existe um projeto de revogação em discussão no Congresso. Veja a página O debate sobre a lei." }
  ];

  var alvo = document.getElementById("quiz");
  var resultado = document.getElementById("quiz-resultado");
  if (!alvo) return;

  var respondidas = 0;
  var acertos = 0;

  PERGUNTAS.forEach(function (p, i) {
    var item = document.createElement("div");
    item.className = "quiz-item";

    var fieldset = document.createElement("fieldset");
    var legend = document.createElement("legend");
    legend.textContent = (i + 1) + ". " + p.texto;
    fieldset.appendChild(legend);

    var opcoes = document.createElement("div");
    opcoes.className = "quiz-opcoes";

    var resposta = document.createElement("div");
    resposta.setAttribute("aria-live", "polite");

    [["Verdadeiro", true], ["Falso", false]].forEach(function (op) {
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = op[0];
      b.setAttribute("data-valor", op[1] ? "v" : "f");
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        var botoes = opcoes.querySelectorAll("button");
        for (var k = 0; k < botoes.length; k++) {
          botoes[k].disabled = true;
          botoes[k].setAttribute("data-certa", (botoes[k].getAttribute("data-valor") === "v") === p.certa ? "sim" : "nao");
        }
        b.setAttribute("aria-pressed", "true");

        var acertou = op[1] === p.certa;
        if (acertou) acertos++;
        respondidas++;

        resposta.className = "quiz-resposta " + (acertou ? "quiz-resposta--certa" : "quiz-resposta--errada");
        var texto = document.createElement("p");
        var forte = document.createElement("strong");
        forte.textContent = (acertou ? "Isso mesmo! " : "Não é bem assim. ") + "A resposta é " + (p.certa ? "Verdadeiro" : "Falso") + ". ";
        texto.appendChild(forte);
        texto.appendChild(document.createTextNode(p.explicacao));
        resposta.innerHTML = "";
        resposta.appendChild(texto);

        if (respondidas === PERGUNTAS.length) mostrarResultado();
      });
      opcoes.appendChild(b);
    });

    fieldset.appendChild(opcoes);
    item.appendChild(fieldset);
    item.appendChild(resposta);
    alvo.appendChild(item);
  });

  function mostrarResultado() {
    if (!resultado) return;
    var msg = acertos === PERGUNTAS.length
      ? "Você acertou todas! Que tal compartilhar este site com alguém que está passando por uma separação?"
      : "Cada resposta é uma oportunidade de aprender. Os temas estão explicados nas páginas do site.";
    resultado.innerHTML = "";
    var h = document.createElement("h2");
    h.textContent = "Você acertou " + acertos + " de " + PERGUNTAS.length;
    var p = document.createElement("p");
    p.textContent = msg;
    var a = document.createElement("a");
    a.href = "./";
    a.textContent = "Voltar para o início";
    resultado.appendChild(h);
    resultado.appendChild(p);
    var voltar = document.createElement("p");
    voltar.appendChild(a);
    resultado.appendChild(voltar);
    // Convite para o questionário dos pais (abre no Google Forms, fora do site)
    var convite = document.createElement("p");
    convite.appendChild(document.createTextNode("É pai, mãe ou responsável? "));
    var forms = document.createElement("a");
    forms.href = "https://docs.google.com/forms/d/e/1FAIpQLSelXoGly04DsGW5bb6I3Sz3I_xlXspRcAL0Gj8Ch0LOnLdKxw/viewform?usp=header";
    forms.target = "_blank";
    forms.rel = "noopener noreferrer";
    forms.textContent = "Responda ao questionário do projeto";
    convite.appendChild(forms);
    convite.appendChild(document.createTextNode(" (abre no Google Forms)."));
    resultado.appendChild(convite);
    resultado.hidden = false;
    resultado.setAttribute("tabindex", "-1");
    resultado.focus();
  }
})();
