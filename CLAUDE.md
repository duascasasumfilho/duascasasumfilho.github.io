# Duas Casas, Um Filho — instruções para o Claude Code

- Responda sempre em português do Brasil, de forma simples. O Pedro é iniciante em programação e estudante de Direito.
- **Leia o `BRIEFING.md` antes de escrever qualquer conteúdo.** Todo conteúdo jurídico e psicológico sai de lá. Não invente leis, dados, números, falas ou coordenadas.
- Tom do site: acolhedor e sem julgar os pais. Descreva condutas e nunca rotule alguém como "alienador". Mostre a "via de mão dupla" com o mesmo peso.
- Nome de profissional só aparece com autorização. Até lá, use "advogada de família de Sete Lagoas ouvida pelo projeto". Não publique matrícula nem e-mail.
- Itens pendentes ficam marcados com `<!-- REVISAR -->` e com a caixa `.em-revisao`.

## Como o site funciona

- HTML, CSS e JS puros, sem dependências. Fica hospedado no GitHub Pages, a partir da pasta `docs/`.
- Os textos ficam em `conteudo/<pagina>.html`. Cada arquivo começa com um cabeçalho `<!-- titulo / descricao / largura / scripts -->`.
- `node ferramentas/montar-site.mjs` aplica o layout (cabeçalho, menu, Sair rápido, emergência, rodapé) e grava o resultado em `docs/`. **Rode depois de qualquer mudança em `conteudo/` ou no montador.** Nunca edite `docs/*.html` à mão.
- No começo de `ferramentas/montar-site.mjs` ficam três listas: `PAGINAS` (todas as páginas), `GRUPOS` (como o menu agrupa as páginas) e `LINHAS` (os quatro caminhos de leitura da página inicial). No conteúdo, `<!-- PARADAS 2 -->` vira a lista de páginas do caminho 2 e `<!-- SETA -->` vira a seta.
- Quem chega por uma porta navega com `?linha=N` no endereço. O `site.js` mostra "Página X de Y" e a próxima página. Nada é guardado no aparelho.
- Rede de apoio: `docs/data/rede-apoio.js`. O mapa (Leaflet) só aparece se houver órgão verificado com lat/lng.
- Quiz: `docs/assets/js/quiz.js`.
- Capa do WhatsApp: `ferramentas/capa-whatsapp.html`. Para gerar a imagem, sirva o arquivo e tire um screenshot de 1200x630, salvando em `docs/assets/img/capa.png`.
- Cores e fontes: variáveis no topo de `docs/assets/css/estilo.css` (bloco `:root`). Visual "Guia de linhas": azul-petróleo nas áreas fortes, amarelo como destaque e uma cor para cada uma das quatro portas. Fontes Atkinson Hyperlegible (texto) e Barlow Semi Condensed (títulos). Os arquivos das fontes ficam em `docs/assets/fontes/`; o site não carrega nada do Google.
- Design: as regras do visual estão em `DESIGN.md` (leia antes de mexer em CSS). O resumo do produto está em `PRODUCT.md` e a direção escolhida em `.impeccable/surfaces/`. Separe itens com linhas finas, sem caixas; as cores das linhas só identificam os caminhos.
- O questionário dos pais (`conteudo/sobre-o-projeto.html`) e o logo da Afya (`MOSTRAR_LOGO_AFYA` no montador) estão prontos e escondidos, aguardando autorização. As propostas comparadas na escolha ficam em `propostas/` e não são publicadas.
- Para ver no navegador: `npx http-server docs -p 8080`, e abrir http://127.0.0.1:8080. Confira sempre em 390px de largura, a largura de um celular.
