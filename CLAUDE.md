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
- A ordem das páginas no menu está em `PAGINAS`, dentro de `ferramentas/montar-site.mjs`.
- Rede de apoio: `docs/data/rede-apoio.js`. O mapa (Leaflet) só aparece se houver órgão verificado com lat/lng.
- Quiz: `docs/assets/js/quiz.js`.
- Capa do WhatsApp: `ferramentas/capa-whatsapp.html`. Para gerar a imagem, sirva o arquivo e tire um screenshot de 1200x630, salvando em `docs/assets/img/capa.png`.
- Cores e fontes: variáveis no topo de `docs/assets/css/estilo.css`. Paleta lilás e verde; fontes Atkinson Hyperlegible (texto) e Fraunces (títulos).
- Para ver no navegador: `npx http-server docs -p 8080`, e abrir http://127.0.0.1:8080. Confira sempre em 390px de largura, a largura de um celular.
