# Como o site funciona (notas técnicas)

Leia antes de mexer no montador, na busca, no botão do grupo, no mapa, no contador, no quiz, nos impressos ou nos vídeos. As regras do visual ficam no `DESIGN.md`.

## Montador e páginas

- Os textos ficam em `conteudo/<pagina>.html`. Cada arquivo começa com um cabeçalho `<!-- titulo / titulo-google / descricao / largura / scripts -->`. `titulo-google` é o título da aba e do Google; `descricao` é o texto que aparece embaixo dele na busca.
- `node ferramentas/montar-site.mjs` aplica o layout (cabeçalho, menu, Sair rápido, emergência, rodapé) e grava o resultado em `docs/`.
- No começo do montador ficam três listas: `PAGINAS` (todas as páginas), `GRUPOS` (como o menu agrupa as páginas) e `LINHAS` (os quatro caminhos de leitura da página inicial).
- Marcações no conteúdo: `<!-- PARADAS 2 -->` vira a lista de páginas do caminho 2; `<!-- SETA -->` vira a seta; `<!-- ILUSTRA nome -->` põe um desenho; `<!-- CONTATOS -->` vira a lista de contatos; `<!-- VIDEOS -->` vira a seção de vídeos.
- `conteudo/404.html` vira `docs/404.html`, a página de erro; ela não entra no menu.
- O montador também grava `docs/sitemap.xml`, `docs/robots.txt` e `docs/assets/busca.json`, e põe em toda página as regras de segurança (`SEGURANCA`, uma Content-Security-Policy). Se o site passar a carregar algo de outro endereço, acrescente esse endereço em `SEGURANCA`, ou o navegador bloqueia.
- Dados estruturados (schema.org, JSON-LD) saem da função `dadosEstruturados` do montador: o site e o projeto na página inicial, as perguntas e respostas (lidas da própria página) nas perguntas frequentes e o vídeo na página Sobre, quando houver.
- Search Console: o código de verificação fica em `CODIGO_GOOGLE`, no montador, e vai só para a página inicial. Não apague.
- Ícones: `docs/favicon.ico`, `assets/img/icone.svg` e `icone-180.png`.

## Publicação

- Repositório `duascasasumfilho/duascasasumfilho.github.io`, GitHub Pages a partir do ramo `main`, pasta `/docs`. Para atualizar: montar, commit e `git push` (só com autorização do Pedro); o site muda em 1 ou 2 minutos.

## Partes do site

- **Caminhos de leitura:** quem chega por uma porta navega com `?linha=N` no endereço. O `site.js` mostra "Parada X de Y" e a próxima página. Nada é guardado no aparelho.
- **Rede de apoio:** `docs/data/rede-apoio.js` (aceita `telefones` em lista, `unidades` para órgãos com vários endereços e `categoria`: protecao, juridico ou saude). A ordem do arquivo é a ordem da página. A página usa `largura: ampla`. Coordenadas ficam no órgão ou em cada unidade. O mapa (Leaflet, em `docs/assets/leaflet/`) só carrega quando a pessoa toca em "Mostrar o mapa"; antes disso o site não faz pedido externo.
- **Busca:** a lupa do cabeçalho abre a janela `<dialog id="busca">`. O script é `docs/assets/js/busca.js` (código próprio, sem biblioteca). O montador dá um `id` a cada h2/h3, pergunta frequente (`details.pergunta`) e porta (`#porta-N`), e grava `docs/assets/busca.json` com as seções de todas as páginas, os órgãos da rede de apoio (`#servico-...`) e os sinônimos de `conteudo/busca-sinonimos.json`. Nada do que a pessoa digita é salvo ou enviado. O `site.js` abre a caixa fechada quando o endereço chega com `#` (`irParaAlvo`).
- **Fale com o grupo:** botão flutuante (`details#contato`, dentro do `<main>`, com `position: sticky`, para nunca cobrir a emergência nem o rodapé). Nomes, números e textos em `conteudo/contatos.json`. O botão some enquanto está em cima do quiz, do mapa ou dos contatos da página Sobre.
- **Tecla Esc** (`site.js`): fecha, nesta ordem, a busca, o painel do grupo e o menu. Só com tudo fechado ela faz o "Sair rápido". Segurar a tecla não repete, e por meio segundo depois de fechar algo o Esc é ignorado.
- **Vídeos:** `conteudo/videos.json`. Enquanto `"youtube"` estiver vazio, a seção não aparece. O vídeo só carrega quando a pessoa toca em "Assistir", pelo endereço `youtube-nocookie.com` (liberado em `frame-src`, na `SEGURANCA`).
- **Contador de visitas:** `docs/assets/js/contador.js` chama o GoatCounter (`goatcounter.js`, hospedado no site), com o endereço em `CONTADOR_VISITAS` no montador. Conta só o caminho da página e, com `?origem=`, um evento `qr-<local>`.
- **Quiz:** `docs/assets/js/quiz.js`. No fim, ele convida para o questionário dos pais (Google Forms).
- **Logo da Afya:** `docs/assets/img/afya.png`, ligado por `MOSTRAR_LOGO_AFYA` no montador.

## Visual

- Cores e fontes: variáveis no topo de `docs/assets/css/estilo.css` (bloco `:root`). Visual "Casa com luz" (desde 10/11/2026). Fontes Atkinson Hyperlegible (texto) e Lexend (títulos), com os arquivos em `docs/assets/fontes/`; o site não carrega nada do Google. O visual anterior ("Guia de linhas") está na marca `site-v1-azul`.
- Ilustrações: ficam em `ILUSTRACOES`, no montador. Cada página ganha a sua ao lado do título (`ILUSTRA_DA_PAGINA`). Páginas longas têm a caixa `.resumo` ("Em resumo") com frases copiadas da própria página.

## Fora do site

- Capa do WhatsApp: `ferramentas/capa-whatsapp.html`. Para gerar a imagem, sirva a pasta do projeto e tire um screenshot de 1200x630, salvando em `docs/assets/img/capa.png`.
- Impressos (não são publicados): `ferramentas/folder.html` gera `impressos/folder-a5.pdf`; os QR Codes ficam em `impressos/qrcodes/`.
