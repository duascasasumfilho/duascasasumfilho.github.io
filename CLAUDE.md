# Duas Casas, Um Filho — instruções para o Claude Code

- Responda sempre em português do Brasil, de forma simples. O Pedro é iniciante em programação e estudante de Direito.
- **Leia o `BRIEFING.md` antes de escrever qualquer conteúdo.** Todo conteúdo jurídico e psicológico sai de lá ou de fonte oficial conferida (Planalto, Câmara, CNJ). Não invente leis, dados, números, falas ou coordenadas.
- Tom do site: acolhedor e sem julgar os pais. Descreva condutas e nunca rotule alguém como "alienador". Mostre a "via de mão dupla" com o mesmo peso.
- Profissionais com autorização para aparecer com nome e registro (10/11/2026). Use exatamente estas descrições (conferidas pelo grupo em 12/11/2026):
  - Dra. Vanessa Castro Moura: advogada de família (OAB/MG 92.847), presidente da Comissão de Direito de Família da OAB Sete Lagoas.
  - Dr. Lucas Thiago Ferreira Costa: advogado especialista em Direito de Família (OAB/MG 238.960 e OAB/ES 41.436).
  - Dra. Ester Magalhães: advogada familiarista, com atuação em Direito das Famílias, infância e proteção jurídica da mulher. Presidente da Comissão de Diversidade e Inclusão Racial do IBDFAM/ES e Coordenadora de Mídias da Comissão Nacional de Diversidade e Inclusão Racial do IBDFAM. Tem atuação acadêmica e pesquisa na área de relações parentais.
  - Stéfany Gomes: psicóloga (CRP-04/63037), com atuação infantil e formação nas áreas Clínica e Social.
  - Dr. Saile Marques Cristovão: advogado (OAB/MG 154.979), de Sete Lagoas. Instigou o grupo, em uma conversa inicial, a investigar se a alegação de alienação parental pode ser usada como forma de pressão nos processos. **Ele NÃO é advogado de família: nunca acrescente especialidade.**
- Nunca publique telefone, e-mail ou Instagram deles, nem matrícula ou e-mail de alunos.
- A Vara de Família não respondeu ao ofício e não aparece no site como fonte da pesquisa.
- Itens pendentes ficam marcados com `<!-- REVISAR -->` e com a caixa `.em-revisao`. Em 10/11/2026 não havia nenhum.

## Como o site funciona

- HTML, CSS e JS puros, sem dependências. Fica hospedado no GitHub Pages, a partir da pasta `docs/`. Endereço previsto: https://duascasasumfilho.github.io/ (organização `duascasasumfilho` no GitHub). O endereço fica em `ENDERECO_SITE`, no montador.
- Os textos ficam em `conteudo/<pagina>.html`. Cada arquivo começa com um cabeçalho `<!-- titulo / descricao / largura / scripts -->`.
- `node ferramentas/montar-site.mjs` aplica o layout (cabeçalho, menu, Sair rápido, emergência, rodapé) e grava o resultado em `docs/`. **Rode depois de qualquer mudança em `conteudo/` ou no montador.** Nunca edite `docs/*.html` à mão.
- No começo de `ferramentas/montar-site.mjs` ficam três listas: `PAGINAS` (todas as páginas), `GRUPOS` (como o menu agrupa as páginas) e `LINHAS` (os quatro caminhos de leitura da página inicial). No conteúdo, `<!-- PARADAS 2 -->` vira a lista de páginas do caminho 2 e `<!-- SETA -->` vira a seta.
- `conteudo/404.html` vira `docs/404.html`, a página de erro; ela não entra no menu.
- O montador também grava `docs/sitemap.xml` e `docs/robots.txt`, e põe em toda página as regras de segurança (`SEGURANCA`, uma Content-Security-Policy). Se o site passar a carregar algo de outro endereço, acrescente esse endereço em `SEGURANCA`, ou o navegador bloqueia. Ícones: `docs/favicon.ico`, `assets/img/icone.svg` e `icone-180.png`.
- Publicado em https://duascasasumfilho.github.io/ (repositório `duascasasumfilho/duascasasumfilho.github.io`, Pages a partir de `main` `/docs`). Para atualizar: montar, commit e `git push`; o site muda em 1 ou 2 minutos.
- Quem chega por uma porta navega com `?linha=N` no endereço. O `site.js` mostra "Página X de Y" e a próxima página. Nada é guardado no aparelho.
- Rede de apoio: `docs/data/rede-apoio.js` (aceita `telefones` em lista, `unidades` para órgãos com vários endereços e `categoria`: protecao, juridico ou saude). A ordem do arquivo é a ordem da página. A página usa `largura: ampla`. Coordenadas ficam no órgão ou em cada unidade. O mapa (Leaflet, em `docs/assets/leaflet/`) só carrega quando a pessoa toca em "Mostrar o mapa"; antes disso o site não faz pedido externo.
- Contador de visitas: `docs/assets/js/contador.js` chama o GoatCounter (`goatcounter.js`, hospedado no site), com o endereço em `CONTADOR_VISITAS` no montador. Conta só o caminho da página e, com `?origem=`, um evento `qr-<local>`.
- Quiz: `docs/assets/js/quiz.js`. No fim, ele convida para o questionário dos pais (Google Forms).
- Logo da Afya: `docs/assets/img/afya.png`, ligado por `MOSTRAR_LOGO_AFYA` no montador.
- Capa do WhatsApp: `ferramentas/capa-whatsapp.html`. Para gerar a imagem, sirva a pasta do projeto e tire um screenshot de 1200x630, salvando em `docs/assets/img/capa.png`.
- Impressos (não são publicados): `ferramentas/folder.html` gera `impressos/folder-a5.pdf`; os QR Codes ficam em `impressos/qrcodes/`.
- Cores e fontes: variáveis no topo de `docs/assets/css/estilo.css` (bloco `:root`). Visual "Casa com luz" (desde 10/11/2026): fundo de luz da manhã, azul-petróleo para confiança, a criança em amarelo, ilustrações em traço e uma cor para cada uma das quatro portas. Fontes Atkinson Hyperlegible (texto) e Lexend (títulos). O visual anterior ("Guia de linhas") está na marca `site-v1-azul`.
- Ilustrações: ficam em `ILUSTRACOES`, no montador. Cada página ganha a sua ao lado do título (`ILUSTRA_DA_PAGINA`). No conteúdo, `<!-- ILUSTRA nome -->` põe um desenho (temas da página inicial, categorias da rede de apoio). Páginas longas têm a caixa `.resumo` ("Em resumo") com frases copiadas da própria página. Os arquivos das fontes ficam em `docs/assets/fontes/`; o site não carrega nada do Google.
- Design: as regras do visual estão em `DESIGN.md` (leia antes de mexer em CSS). O resumo do produto está em `PRODUCT.md` e a direção escolhida em `.impeccable/surfaces/`. Separe itens com linhas finas, sem caixas; as cores das linhas só identificam os caminhos. As propostas comparadas na escolha ficam em `propostas/` e não são publicadas.
- Para ver no navegador: `npx http-server docs -p 8080`, e abrir http://127.0.0.1:8080. Confira sempre em 390px de largura, a largura de um celular.
