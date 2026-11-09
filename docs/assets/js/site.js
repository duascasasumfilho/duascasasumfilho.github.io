// Duas Casas, Um Filho — comportamento comum a todas as páginas

(function () {
  // Botão "Sair rápido": troca a página por um site neutro sem deixar
  // esta página no botão "voltar" do navegador.
  var SITE_NEUTRO = "https://www.climatempo.com.br/";
  var botao = document.querySelector(".sair-rapido");
  if (botao) {
    botao.addEventListener("click", function (evento) {
      evento.preventDefault();
      try { document.body.style.display = "none"; } catch (e) {}
      window.location.replace(SITE_NEUTRO);
    });
  }

  // Fecha o menu ao clicar fora dele ou apertar Esc
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
})();
