# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Pais, mães e responsáveis de Sete Lagoas (MG) e região que estão se separando ou em disputa de guarda ou convivência. A maioria chega pelo celular, por um QR Code impresso, emocionalmente abalada e com escolaridade variada. Parte está em situação de violência e pode usar um celular compartilhado.

Público secundário: avós, professores, profissionais da rede de proteção e estudantes. O professor orientador e a banca do curso avaliam o site como produto do projeto.

## Product Purpose

Site informativo do Projeto de Extensão III do curso de Direito da Afya Faculdade Sete Lagoas. Explica, em linguagem simples, convivência familiar, o que é e o que não é alienação parental, os riscos de usar acusações como arma e onde buscar ajuda na cidade.

Sucesso, nas palavras de quem conduz o projeto: o site parece trabalho profissional. Uma pessoa abalada encontra o caminho dela e os telefones de ajuda sem esforço.

## Positioning

O site mostra a "via de mão dupla" com o mesmo peso: a acusação de alienação usada contra quem denuncia violência e a falsa denúncia usada para afastar o outro genitor. Ele não toma partido no debate sobre a revogação da Lei 12.318/2010. O conteúdo vem de uma pesquisa de campo local com profissionais do Direito e da Psicologia.

## Operating Context

- Entrada principal: QR Code em folder impresso, distribuído em locais públicos da cidade.
- Página inicial com quatro portas, cada uma com um caminho de leitura próprio.
- 13 páginas de leitura, um quiz que roda só no navegador e uma lista da rede de apoio local.
- Em todas as páginas: botão "Sair rápido", quatro telefones de emergência (190, 180, 100, 188), aviso de que o conteúdo não substitui orientação jurídica e botão de compartilhar no WhatsApp.

## Capabilities and Constraints

- HTML, CSS e JS puros, sem dependências. Os textos ficam em `conteudo/`; `ferramentas/montar-site.mjs` gera `docs/`, publicada pelo GitHub Pages.
- Não coleta dados pessoais, não usa cookies e não tem formulário próprio.
- Todo conteúdo jurídico e psicológico vem do briefing do projeto. Nada de leis, dados, números, falas ou coordenadas inventados.
- Trechos pendentes ficam marcados com `<!-- REVISAR -->` e com a caixa `.em-revisao`.
- Nome de profissional só aparece com autorização. Em 10/11/2026 todos os profissionais ouvidos autorizaram nome e registro. Contatos pessoais deles, matrícula e e-mail de alunos nunca aparecem.
- O mapa só mostra órgãos com endereço verificado e coordenadas reais, e só carrega quando a pessoa toca em "Mostrar o mapa". O Leaflet fica no próprio site; só as imagens do mapa vêm do OpenStreetMap.
- O conteúdo só é publicado depois da revisão do professor orientador. O professor já autorizou o logo da Afya, o questionário dos pais e o folder com QR Code.
- Endereço previsto: https://duascasasumfilho.github.io/ (organização gratuita no GitHub).

## Brand Commitments

- Nome: "Duas Casas, Um Filho". Frase-guia: "Seu filho tem direito aos dois. E à paz."
- Tom acolhedor, que não julga nem culpa os pais. Descreve condutas e nunca rotula pessoas.
- Fala com "você" e acolhe antes de informar. Termo técnico vem explicado na hora.
- Metáfora das duas casas e um filho. Sem imagens de criança chorando ou de família "quebrada".
- Não pode parecer tribunal ou escritório de advocacia. Não pode parecer frio e burocrático, como site de governo.
- A identidade visual é decidida no grupo pela responsável por Produção Técnica e Visual.

## Evidence on Hand

- Pesquisa de campo qualitativa (outubro e novembro de 2026) com advogadas e advogados de família e uma psicóloga, citados pelo nome com autorização. A Vara de Família não respondeu ao ofício e não é fonte do site.
- Base legal conferida: CF art. 227, ECA, Código Civil (art. 1.584, § 2º), Lei 11.340/2006 (arts. 7º, VI; 9º, § 8º; 28), Lei 12.318/2010, Lei 14.340/2022, Lei 13.431/2017, Lei 14.713/2023, Lei 15.384/2026, CPC e Recomendação CNJ 157/2024. Cartilha do Divórcio para os Pais (CNJ 2013; TJMG 2020).
- Rede de apoio de Sete Lagoas com 13 órgãos (21 endereços), com endereços, telefones e coordenadas conferidos pelo grupo em 10/11/2026.
- Não existem fotos, depoimentos de famílias nem estatística própria. Nada disso deve ser criado.

## Product Principles

1. A criança no centro: toda página volta ao bem-estar do filho.
2. Os dois lados com o mesmo peso: quem fala de alienação lembra da violência, e vice-versa.
3. Acolher antes de informar; orientar sem julgar.
4. Segurança primeiro: a saída rápida e os telefones estão sempre ao alcance.
5. Só publicar o que foi conferido; o que falta confirmar fica marcado.

## Accessibility & Inclusion

WCAG 2.1 AA. Mobile first, com checagem em 390px de largura. Texto base de 18px, navegação por teclado, `lang="pt-BR"` e texto alternativo nas imagens. O site precisa carregar bem em conexão 3G e respeitar quem pede menos movimento.
