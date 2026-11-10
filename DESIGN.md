---
name: Duas Casas, Um Filho
description: Guia de linhas para pais e mães em separação. Cada porta é uma linha com cor própria; as páginas são as paradas.
colors:
  papel: "#F6F7F4"
  superficie: "#FFFFFF"
  tinta: "#15252B"
  suave: "#4A5B60"
  fio: "#D3DAD6"
  campo: "#0F4C5C"
  campo-escuro: "#0A3742"
  campo-claro: "#E1EBEC"
  sobre-campo: "#FFFFFF"
  suave-campo: "#C9DDE1"
  quente: "#F2B705"
  linha-1: "#2F7A45"
  linha-2: "#1F6594"
  linha-3: "#A94E0B"
  linha-4: "#8E2F4B"
  aviso: "#FFF4D6"
  aviso-borda: "#C99A12"
  aviso-tinta: "#5C4300"
typography:
  capa:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "clamp(2.6rem, 11.5vw, 5.25rem)"
    fontWeight: 700
    lineHeight: 0.98
  h1:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "clamp(2.5rem, 10.5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1
  h2:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "clamp(1.9rem, 7.5vw, 2.4rem)"
    fontWeight: 700
    lineHeight: 1.1
  h3:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.15
  destaque:
    fontFamily: "Barlow Semi Condensed, Arial Narrow, Segoe UI, sans-serif"
    fontSize: "1.6rem"
    fontWeight: 600
    lineHeight: 1.3
  abertura:
    fontFamily: "Atkinson Hyperlegible, Segoe UI, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.5
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
  foco: "4px"
  raio: "0.5rem"
  traco: "1rem"
  circulo: "50%"
spacing:
  e-1: "0.25rem"
  e-2: "0.5rem"
  e-3: "0.75rem"
  e-4: "1rem"
  e-5: "1.5rem"
  e-6: "2rem"
  e-7: "3rem"
  e-8: "4rem"
components:
  botao:
    backgroundColor: "{colors.campo}"
    textColor: "{colors.sobre-campo}"
    rounded: "{rounded.raio}"
    padding: "0.6rem 1.25rem"
    height: "3rem"
  botao-hover:
    backgroundColor: "{colors.campo-escuro}"
  botao-contorno:
    backgroundColor: "transparent"
    textColor: "{colors.campo}"
    rounded: "{rounded.raio}"
  sair-rapido:
    backgroundColor: "{colors.campo}"
    textColor: "{colors.sobre-campo}"
    rounded: "{rounded.raio}"
    height: "2.75rem"
  disco-da-linha:
    backgroundColor: "{colors.linha-1}"
    textColor: "#FFFFFF"
    rounded: "{rounded.circulo}"
    size: "2.75rem"
  aviso-importante:
    backgroundColor: "{colors.campo-claro}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.raio}"
    padding: "1rem 1.5rem 1.5rem"
  em-revisao:
    backgroundColor: "{colors.aviso}"
    textColor: "{colors.aviso-tinta}"
    rounded: "{rounded.raio}"
    padding: "0.75rem 1rem"
---

# Duas Casas, Um Filho

## Overview

O site é um guia de bolso com quatro linhas, como um mapa de transporte. Cada porta da página inicial é uma linha com número e cor. As páginas são as paradas, na ordem de leitura. Quem chega por uma porta vê, em toda página, em que parada está e qual é a próxima.

O leitor é um pai, uma mãe ou um responsável abalado, quase sempre no celular. O visual acolhe sem infantilizar. Não pode parecer tribunal nem repartição pública.

Todos os valores ficam no bloco `:root` de `docs/assets/css/estilo.css`. Esse arquivo é a fonte da verdade; este documento descreve como usar os valores.

## Colors

Cada cor tem um papel fixo.

- **papel** é o fundo de todas as páginas. **tinta** é o texto. **suave** é o texto de apoio.
- **fio** desenha as linhas finas que separam itens. É o que substitui as caixas.
- **campo** (azul-petróleo) cobre as áreas fortes: capa, faixa de emergência, botões e títulos. **campo-claro** é o fundo do aviso importante, o único bloco com fundo colorido dentro do texto.
- **quente** (amarelo) é o destaque. Usa-se pouco: "E à paz." na capa, os números de emergência, a criança no trajeto, a marca de página atual e o traço acima das citações.
- **linha-1 a linha-4** identificam os quatro caminhos. Elas nunca querem dizer "certo", "errado" ou "perigo". Estado se mostra com forma (ponto cheio ou vazado) e com texto.
- **aviso** é só da caixa "em revisão".

Contraste medido: todos os pares de texto passam de 4,5 para 1.

## Typography

Títulos em Barlow Semi Condensed, peso 700, na cor campo. Citações usam a mesma família em peso 600. Texto corrido em Atkinson Hyperlegible, 18px, entrelinha 1,6. A coluna de leitura tem no máximo 40rem.

Os arquivos das fontes ficam em `docs/assets/fontes/`. O site não carrega fonte de servidor externo.

Negrito no texto corrido marca só a ideia principal do parágrafo.

## Layout

- Tudo o que fica dentro de `.miolo` tem a mesma largura máxima (70rem) e as mesmas bordas (1,125rem no celular, 2rem a partir de 60rem). Cabeçalho, conteúdo, emergência e rodapé se alinham por ele.
- Páginas de leitura têm uma coluna de 40rem alinhada à esquerda. A partir de 68rem, o índice "Nesta página" ocupa a lateral direita e fica fixo.
- A página inicial ocupa a largura toda: capa em campo, as quatro linhas, a via de mão dupla e os temas em três grupos.
- No celular de 390px, as quatro linhas terminam antes do fim da primeira tela.
- Ritmo: mais espaço acima de um título do que abaixo dele.

## Elevation & Depth

O site é plano. A única sombra é a do menu aberto, que cai sobre o conteúdo logo abaixo do cabeçalho.

## Shapes

- Raio de 0,5rem em botões, aviso importante, caixa em revisão e respostas do quiz. O contorno de foco usa 4px, e os traços (trilho e traço da citação) têm pontas arredondadas de 1rem.
- Círculos: disco numerado das linhas, paradas do trilho, pontos do índice e marcadores de estado.
- O trilho é a assinatura: uma linha grossa na cor do caminho com uma parada redonda por página. Aparece na porta aberta, na faixa "seu caminho" e, em versão fina, no índice "Nesta página".

## Components

- **Cabeçalho:** fixo no topo, com a marca, o Menu e o Sair rápido. Menu e Sair rápido têm 44px de altura.
- **Menu:** ocupa a largura inteira abaixo do cabeçalho, com Início e três grupos (Entender, Cuidar, Agir).
- **Linha (porta):** disco numerado, frase e seta. Aberta, mostra o acolhimento, o que saber primeiro e as paradas.
- **Faixa "seu caminho":** aparece quando o endereço tem `?linha=N`. Mostra o número, a frase e "Página X de Y".
- **Aviso importante (`.equilibrio`):** fundo campo-claro. Um por assunto, no máximo.
- **Citação (`.destaque`):** sem caixa, com um traço amarelo curto acima.
- **Dois lados, quadro e pares:** colunas separadas por fio, sempre com o mesmo peso visual dos dois lados.
- **Passos:** número grande à esquerda, fio entre os passos.
- **Pergunta:** linha com fio, texto em negrito e seta que gira ao abrir.
- **Em revisão (`.em-revisao`):** fundo amarelo-claro com borda tracejada. Marca conteúdo que o grupo ainda vai confirmar.
- **Emergência:** quatro números grandes em amarelo sobre campo, separados por fio.
- **Rodapé:** aviso legal, botão de compartilhar, créditos e o logo da Afya nas cores originais (rosa da marca), com 7,5rem de largura. O rosa aparece só no logo, nunca como cor do site.
- **Rede de apoio:** cada órgão é um bloco separado por fio, com selo, para que serve, endereço, horário e botões "Ligar" e "Abrir no mapa". Órgãos com vários endereços listam as unidades, recuadas, logo abaixo.
- **Impressos:** o folder A5 (`ferramentas/folder.html`) e a capa do WhatsApp usam os mesmos tokens, fontes e o trajeto das duas casas.

Movimento: botões encolhem para 97% ao toque (160ms). O conteúdo de linhas, perguntas e menu entra com um deslize curto (220ms). Setas giram em 180ms. Tudo desliga com "reduzir movimento".

## Do's and Don'ts

- Separe itens com fio. Não coloque texto corrido dentro de caixas.
- Não use faixa colorida na lateral de um bloco.
- Não use as cores das linhas para indicar certo, errado, risco ou sucesso.
- Não crie um segundo bloco com fundo colorido na mesma seção.
- Mantenha os dois lados de uma comparação com o mesmo peso.
- Todo alvo de toque fora de texto corrido tem pelo menos 44px de altura.
- Não use imagens de criança chorando nem de família "quebrada".
