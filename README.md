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
├── ferramentas/     ← o "montador" do site
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
- `"telefone"`: o telefone, por exemplo `"(31) 3333-3333"`;
- `"verificado"`: troque para `true` **só depois de confirmar** o endereço por telefone (156) ou pessoalmente;
- `"lat"` e `"lng"`: coordenadas do prédio, para aparecer o pino no mapa. Para pegar, clique com o botão direito no prédio no Google Maps e clique nos números. **Nunca invente coordenadas.**

O mapa só aparece quando pelo menos um órgão conferido tiver coordenadas.

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

## Como ativar o questionário e o logo da Afya

- **Questionário dos pais:** em `conteudo/sobre-o-projeto.html`, procure por `QUESTIONÁRIO DOS PAIS` e siga os três passos escritos ali.
- **Logo da Afya:** em `ferramentas/montar-site.mjs`, procure por `MOSTRAR_LOGO_AFYA` e siga as instruções.

Os dois ficam escondidos até a autorização do professor.

---

## Como atualizar o debate sobre a lei

Abra `conteudo/debate-sobre-a-lei.html` e mude a data em `Atualizado em ...` e o texto da situação dos projetos. Depois monte o site.

---

## Trechos marcados para revisão

Os trechos que dependem de autorização ou confirmação estão marcados com `<!-- REVISAR -->` no código e com uma caixa amarela no site. Para encontrar todos, procure pela palavra **REVISAR** na pasta `conteudo/`.

Pendências principais (ver `BRIEFING.md`, seção 10):

- [ ] autorização de cada profissional para aparecer com nome;
- [ ] confirmação dos endereços da rede de apoio;
- [ ] texto "Como conversar sobre a separação";
- [ ] conferência da Lei 15.384/2026 e da situação do PL 2.812/2022;
- [ ] revisão final do Prof. Filipe Garcia.

---

## Como ver o site no computador

No terminal, dentro da pasta do projeto:

```
npx http-server docs -p 8080
```

Depois abra no navegador: http://127.0.0.1:8080

---

## Privacidade

O site não coleta dados, não usa cookies e não tem formulário. O quiz funciona só no aparelho de quem usa.
