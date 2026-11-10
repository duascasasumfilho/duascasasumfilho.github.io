---
name: Duas Casas, Um Filho
description: "Casa com luz": guia acolhedor para pais e mães em separação. Fundo de luz da manhã, ilustrações em traço das duas casas e quatro caminhos com cor própria.
status: aprovado pelo Pedro em 10/11/2026 e aplicado no ramo visual-acolhedor. O visual anterior ("Guia de linhas") está na marca site-v1-azul.
colors:
  papel: "#FDF6EE"
  superficie: "#FFFFFF"
  tinta: "#1F2E35"
  suave: "#4F5F66"
  fio: "#EADFD2"
  campo: "#0F4C5C"
  campo-escuro: "#0A3742"
  sol: "#F2B705"
  sol-claro: "#FCE7A6"
  pessego: "#F8DCC6"
  abraco: "#FFF0E3"
  ambar-fundo: "#FFF0D2"
  ambar-tinta: "#7A4A00"
  ambar-traco: "#E0A43A"
  verde-fundo: "#E3F1E6"
  verde-tinta: "#1D5E33"
  verde-traco: "#6DAF7F"
  linha-1: "#2F7A45"
  linha-1-claro: "#E3F0E6"
  linha-2: "#1F6594"
  linha-2-claro: "#E1ECF6"
  linha-3: "#A94E0B"
  linha-3-claro: "#FBE8D8"
  linha-4: "#8E2F4B"
  linha-4-claro: "#F6E2E8"
typography:
  h1:
    fontFamily: "Lexend, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 8.4vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.08
  h2:
    fontFamily: "Lexend, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.55rem, 6vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.2
  h3:
    fontFamily: "Lexend, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  destaque:
    fontFamily: "Lexend, Segoe UI, system-ui, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 500
    lineHeight: 1.35
  abertura:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.22rem"
    fontWeight: 400
    lineHeight: 1.55
  texto:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  pequeno:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.4
rounded:
  foco: "6px"
  raio: "0.75rem"
  cartao: "1.25rem"
  botao: "999px"
  circulo: "50%"
spacing:
  e-2: "0.5rem"
  e-3: "0.75rem"
  e-4: "1rem"
  e-5: "1.5rem"
  e-6: "2rem"
  e-7: "3rem"
  e-8: "4.5rem"
components:
  botao:
    backgroundColor: "{colors.campo}"
    textColor: "#FFFFFF"
    rounded: "{rounded.botao}"
    height: "44px"
  botao-contorno:
    backgroundColor: "{colors.superficie}"
    textColor: "{colors.campo}"
    rounded: "{rounded.botao}"
  sair-rapido:
    backgroundColor: "{colors.campo}"
    textColor: "#FFFFFF"
    rounded: "{rounded.botao}"
    height: "44px"
  porta:
    backgroundColor: "{colors.linha-1-claro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.cartao}"
  resumo:
    backgroundColor: "{colors.abraco}"
    rounded: "{rounded.cartao}"
  pode-ser:
    backgroundColor: "{colors.ambar-fundo}"
    textColor: "{colors.tinta}"
  nao-e:
    backgroundColor: "{colors.verde-fundo}"
    textColor: "{colors.tinta}"
  servico:
    backgroundColor: "{colors.superficie}"
    rounded: "{rounded.cartao}"
---

# Duas Casas, Um Filho: "Casa com luz"

## Overview

O site é um guia de apoio, como uma conversa numa cozinha clara: fundo de luz da manhã, letras fáceis de ler e desenhos em traço das duas casas. A criança aparece sempre em amarelo, entre as duas casas. Os quatro caminhos de leitura continuam, cada um com sua cor.

O leitor é um pai, uma mãe ou um responsável abalado, quase sempre no celular. O visual acolhe sem infantilizar. Não pode parecer tribunal nem repartição pública.

A versão anterior ("Guia de linhas", azul-petróleo com fios finos) está guardada na marca `site-v1-azul` do git. Os protótipos desta direção ficam em `propostas/visual-acolhedor/`.

## Colors

- **papel** (luz da manhã) é o fundo de todas as páginas. **abraco** é um tom mais quente, usado na capa, no "Em resumo" e no "Não sabe por onde começar?".
- **campo** (azul-petróleo) é a cor da confiança: títulos, botões, Sair rápido, traço das ilustrações e a faixa de emergência.
- **sol** (amarelo) é a criança: o ponto do logo, a figura da capa, os marcadores do resumo e a parada atual do trajeto. **sol-claro** e **pessego** são manchas de luz atrás dos desenhos.
- **linha-1 a linha-4** e seus tons claros identificam os quatro caminhos. Os cartões das portas usam o tom claro de fundo e a cor forte no número. As cores dos caminhos nunca querem dizer certo ou errado.
- **âmbar** e **verde** são só do quadro "Pode ser / Não é, por si só". O sentido também vem por texto e por ícone (exclamação e sinal de visto), nunca só pela cor.
- O texto de abertura usa a cor **tinta**, não cinza: é a frase que mais acolhe.
- Contraste: todo texto passa de 4,5:1 sobre o fundo em que está.

## Typography

- Títulos em **Lexend** (peso 600), letra criada para facilitar a leitura, de formas redondas e abertas. Citações em Lexend 500.
- Texto corrido em **Atkinson Hyperlegible**, 18px, entrelinha 1,6. Coluna de leitura de no máximo 44rem.
- As fontes ficam em `docs/assets/fontes/`. O site não carrega fonte de servidor externo.
- Negrito no texto corrido marca só a ideia principal do parágrafo.

## Illustration

- Traço único em azul-petróleo (3px na escala de 64px, 4px na capa), pontas e cantos redondos.
- Atrás de cada desenho, uma mancha clara (tom de caminho, sol-claro ou pêssego). A criança, quando aparece, é amarela.
- Uma ilustração por página, ao lado do título. Ícones das categorias da rede de apoio e dos temas no mesmo estilo.
- Proibido: rostos com expressão, criança chorando, família "quebrada", balança da Justiça, martelo de juiz, fotos de banco de imagem.
- Todas são SVG escritos à mão, leves, sem imagem externa.

## Layout

- `.miolo`: largura máxima de 72rem, bordas de 1,125rem no celular e 2rem a partir de 60rem.
- Página inicial: capa clara com o título à esquerda e a ilustração à direita no computador; no celular, a ilustração vem antes do título, baixa, para a primeira porta aparecer na primeira tela. As quatro portas são cartões; no computador, em grade de 2 por 2.
- Páginas de leitura: faixa do caminho (com `?linha=N`), título com ilustração, "Em resumo" nas páginas longas, texto em coluna de 44rem e, a partir de 68rem, a lateral com "Nesta página".
- "Onde buscar ajuda": a caixa "Não sabe por onde começar?" com links tocáveis, atalhos para três categorias na ordem Proteção, Jurídico, Saúde e assistência, e um cartão que abre e fecha por órgão. O Fórum vem por último no Jurídico. No computador, os cartões ficam em duas colunas.
- Ritmo: mais espaço acima de um título do que abaixo dele.

## Elevation & Depth

O site é plano. A profundidade vem do tom do fundo (papel, abraço, cartão branco), não de sombras. O cabeçalho fixo tem um leve desfoque do que passa por baixo.

## Shapes

- Cartões: raio de 1,25rem. Botões, Menu, Sair rápido e atalhos: pílula.
- Círculos: número das portas, paradas do trajeto, marcadores do resumo.
- O trajeto é a assinatura: uma linha com paradas redondas, a atual em amarelo.

## Components

- **Cabeçalho:** fixo, com a marca (ponto amarelo entre as casas), Menu e Sair rápido, todos com 44px. No celular cabe em uma linha.
- **Porta (cartão):** fundo no tom claro do caminho, número em círculo, frase do caminho e uma frase curta de apoio tirada do próprio texto da porta. Abre no mesmo lugar.
- **Faixa do caminho:** "Caminho: frase", as paradas como pontos numa linha e "Parada X de Y. Próxima: página".
- **Em resumo:** fundo abraço, três pontos amarelos, frases copiadas da própria página. Só nas páginas longas.
- **Pode ser / Não é, por si só:** no computador, duas colunas com cabeçalho âmbar e verde; no celular, dois blocos coloridos por par, cada um com rótulo e ícone.
- **Citação (`.destaque`):** sem caixa, com traço amarelo curto acima, em Lexend.
- **Aviso importante (`.equilibrio`):** cartão branco com borda clara; na rede de apoio, em tom abraço.
- **Serviço (rede de apoio):** cartão branco que abre e fecha. Fechado: nome e para que serve. Aberto: selo, endereço, horário, botões de ligar e "Abrir no mapa".
- **Emergência:** faixa azul-petróleo com quatro números grandes em amarelo, em blocos claros translúcidos.
- **Rodapé:** aviso legal, compartilhar, créditos e logo da Afya nas cores originais.

Movimento: botões encolhem para 97% ao toque (160ms). Cartões (portas, perguntas, serviços) crescem até a altura do conteúdo: 240ms para abrir, 170ms para fechar; a seta gira. Com "reduzir movimento", saem os deslizes e a animação de altura, e ficam só as mudanças de cor.

Tecla Esc: fecha o menu; com o menu fechado, faz o mesmo que o Sair rápido.

## Do's and Don'ts

- Use cartões só onde há uma escolha ou algo que abre e fecha (portas, serviços). Blocos de fundo só para resumo, aviso e o quadro "Pode ser / Não é". Texto corrido fica solto no papel.
- Não use faixa colorida grossa na lateral de um bloco.
- Não use as cores dos caminhos para indicar certo, errado, risco ou sucesso.
- Não ponha cartão dentro de cartão.
- Mantenha os dois lados de uma comparação com o mesmo peso.
- Todo alvo de toque fora de texto corrido tem pelo menos 44px de altura.
- Não use fotos de banco de imagem, criança chorando nem família "quebrada".
