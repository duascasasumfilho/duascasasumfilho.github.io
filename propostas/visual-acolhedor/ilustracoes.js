// Ilustrações em traço da proposta acolhedora. Todas no mesmo estilo:
// traço azul-petróleo de 3px, pontas redondas, uma mancha de cor clara
// atrás e, quando há criança, o ponto amarelo do logo.
window.ILUSTRACOES = {
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
document.querySelectorAll("[data-ilustra]").forEach(function (el) {
  var nome = el.getAttribute("data-ilustra");
  el.outerHTML = '<svg class="' + (el.className || "") + '" viewBox="0 0 64 64" aria-hidden="true" fill="none" stroke="#0F4C5C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">' + window.ILUSTRACOES[nome] + '</svg>';
});
