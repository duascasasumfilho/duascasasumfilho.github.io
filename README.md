# Duas Casas, Um Filho

Site do Projeto de Extensão III do curso de Direito da Afya Faculdade Sete Lagoas, orientado pelo Prof. Filipe Garcia. Tema: *Alienação Parental e o Direito à Convivência Familiar*.

O site informa pais, mães e responsáveis de Sete Lagoas, com acolhimento, sobre convivência familiar, alienação parental e onde buscar ajuda.

---

## Como o projeto está organizado

```
duas-casas-um-filho/
├── conteudo/        ← OS TEXTOS DE CADA PÁGINA (é aqui que o grupo edita)
├── docs/            ← o site pronto, que vai para a internet (não editar à mão)
│   ├── data/rede-apoio.js   ← endereços da página "Onde buscar ajuda"
│   └── assets/              ← cores (css), funções (js) e imagens
├── ferramentas/     ← o "montador" do site, o molde da capa do WhatsApp e o folder
├── impressos/       ← folder A5 em PDF e QR Codes (não é publicado)
├── propostas/       ← as propostas de visual comparadas na escolha (não é publicado)
├── BRIEFING.md      ← toda a pesquisa e as regras de conteúdo
├── PRODUCT.md       ← resumo do produto: para quem é e o que não pode mudar
├── DESIGN.md        ← as regras do visual: cores, letras e blocos
└── README.md        ← este manual
```

---

## Como editar um texto (sem saber programar)

1. Abra a pasta `conteudo/` e o arquivo da página. Exemplo: `convivencia.html`.
2. Troque **só o texto** entre as marcações, sem apagar o que está entre `<` e `>`.
   - `<p>texto</p>` é um parágrafo.
   - `<strong>texto</strong>` é **negrito**.
   - `<li>texto</li>` é um item de lista.
   - `<h2>texto</h2>` é um título.
3. Salve o arquivo.
4. No terminal, dentro da pasta do projeto, rode:
   ```
   node ferramentas/montar-site.mjs
   ```
   Isso monta todas as páginas de novo, já com o cabeçalho, o menu, o botão "Sair rápido" e os telefones de emergência.

> Se preferir, peça ao Claude Code: "troque o texto X da página Y por Z". Ele faz as alterações e monta o site.

---

## Como atualizar os endereços da rede de apoio

Abra `docs/data/rede-apoio.js`. Cada órgão tem:

- `"endereco"`: o endereço completo, entre aspas;
- `"telefones"`: a lista de telefones, por exemplo `["(31) 3333-3333", "(31) 98888-8888"]`;
- `"unidades"`: para órgãos com mais de um endereço, como o Conselho Tutelar;
- `"verificado"`: troque para `true` **só depois de confirmar** o endereço por telefone (156) ou pessoalmente;
- `"lat"` e `"lng"`: coordenadas do prédio, para aparecer o pino no mapa. Para pegar, clique com o botão direito no prédio no Google Maps e clique nos números. **Nunca invente coordenadas.**

Em órgãos com `"unidades"`, as coordenadas ficam dentro de cada unidade. O mapa só aparece quando pelo menos um lugar conferido tiver coordenadas, e só carrega quando a pessoa toca em "Mostrar o mapa".

---

## Como mudar cores e letras

Abra `docs/assets/css/estilo.css`. As cores, as fontes e os tamanhos ficam no bloco `:root`, logo no começo, cada um com um comentário dizendo para que serve. Mude só ali. As regras de uso estão no `DESIGN.md`.

Os arquivos das fontes ficam em `docs/assets/fontes/`. O site não carrega nada do Google.

---

## Como mudar o menu e os caminhos de leitura

Abra `ferramentas/montar-site.mjs`. No começo do arquivo há três listas:

- `PAGINAS`: todas as páginas e o nome de cada uma;
- `GRUPOS`: como o menu agrupa as páginas (Entender, Cuidar, Agir);
- `LINHAS`: os quatro caminhos da página inicial e a ordem das páginas de cada um.

Depois de mudar, monte o site.

---

## Questionário e logo da Afya

Os dois foram autorizados pelo professor e estão no ar:

- **Questionário dos pais:** em `conteudo/sobre-o-projeto.html` (seção "Questionário para pais e mães") e no fim do quiz (`docs/assets/js/quiz.js`). Para trocar o link, procure por `docs.google.com/forms` nos dois arquivos.
- **Logo da Afya:** o arquivo é `docs/assets/img/afya.png`. Para esconder, troque `MOSTRAR_LOGO_AFYA` para `false` em `ferramentas/montar-site.mjs`.

---

## Folder e QR Codes

- O folder A5, frente e verso, está pronto em `impressos/folder-a5.pdf`. Para imprimir: tamanho A5, frente e verso, sem margens.
- Para mudar o texto do folder, edite `ferramentas/folder.html` e gere o PDF de novo (as instruções estão no começo do arquivo).
- Os QR Codes ficam em `impressos/qrcodes/`. Use `site.svg` (ou `site.png`) no material impresso. Há também um QR Code por local de distribuição (`forum`, `cras`, `escolas` etc.); eles levam ao mesmo site, com `?origem=local` no endereço. Só servem para medir o alcance se o grupo ligar um contador de visitas sem cookies, como o GoatCounter.

---

## Como publicar no GitHub Pages

O endereço do site será **https://duascasasumfilho.github.io/**.

1. No GitHub, clique no **+** (canto superior direito) e em **New organization**. Escolha o plano gratuito e o nome `duascasasumfilho`.
2. Dentro da organização, crie um repositório público chamado `duascasasumfilho.github.io`.
3. Envie este projeto para esse repositório (o Claude Code pode fazer isso, com a sua autorização).
4. No repositório, abra **Settings** → **Pages**. Em **Branch**, escolha `main` e a pasta `/docs`. Salve.
5. Em alguns minutos o site abre no endereço acima.

---

## Como atualizar o debate sobre a lei

Abra `conteudo/debate-sobre-a-lei.html` e mude a data em `Atualizado em ...` e o texto da situação dos projetos. Depois monte o site.

---

## Trechos marcados para revisão

Quando algo depender de confirmação, marque o trecho com `<!-- REVISAR -->` no código e com a caixa amarela `.em-revisao` no site. Para encontrar todos, procure pela palavra **REVISAR** na pasta `conteudo/`.

Em 10/11/2026 não havia nenhum trecho pendente. Antes de publicar, falta só:

- [ ] revisão final do Prof. Filipe Garcia;
- [ ] conferir de novo a situação do PL 2.812/2022 no site da Câmara e atualizar a data em `conteudo/debate-sobre-a-lei.html`.

---

## Como ver o site no computador

No terminal, dentro da pasta do projeto:

```
npx http-server docs -p 8080
```

Depois abra no navegador: http://127.0.0.1:8080

---

## Privacidade

O site não coleta dados, não usa cookies e não tem formulário próprio. O quiz funciona só no aparelho de quem usa. O questionário dos pais fica no Google Forms, fora do site.
