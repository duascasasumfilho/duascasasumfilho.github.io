# Duas Casas, Um Filho — instruções para o Claude Code

- Responda em português do Brasil, de forma simples: o Pedro é estudante de Direito e iniciante em programação.
- Leia o `BRIEFING.md` antes de escrever conteúdo. Conteúdo jurídico e psicológico sai só dele ou de fonte oficial conferida (Planalto, Câmara, CNJ). Não invente leis, dados, números, falas ou coordenadas.
- Tom: acolhedor, sem julgar os pais. Descreva condutas e nunca rotule alguém como "alienador". Mostre a "via de mão dupla" com o mesmo peso dos dois lados.
- Profissionais autorizados (10/11/2026). Use exatamente estas descrições:
  - Dra. Vanessa Castro Moura: advogada de família (OAB/MG 92.847), presidente da Comissão de Direito de Família da OAB Sete Lagoas.
  - Dr. Lucas Thiago Ferreira Costa: advogado especialista em Direito de Família (OAB/MG 238.960 e OAB/ES 41.436).
  - Dra. Ester Magalhães: advogada familiarista, com atuação em Direito das Famílias, infância e proteção jurídica da mulher. Presidente da Comissão de Diversidade e Inclusão Racial do IBDFAM/ES e Coordenadora de Mídias da Comissão Nacional de Diversidade e Inclusão Racial do IBDFAM. Tem atuação acadêmica e pesquisa na área de relações parentais.
  - Stéfany Gomes: psicóloga (CRP-04/63037), com atuação infantil e formação nas áreas Clínica e Social.
  - Dr. Saile Marques Cristovão: advogado (OAB/MG 154.979), de Sete Lagoas. Instigou o grupo a investigar se a alegação de alienação parental pode ser usada como forma de pressão nos processos. **Não é advogado de família: nunca acrescente especialidade.**
- Nunca publique telefone, e-mail ou Instagram dos profissionais, nem matrícula ou e-mail de alunos. Exceção: os WhatsApp do Pedro e da Thaís, só em `conteudo/contatos.json`.
- A Vara de Família não respondeu ao ofício e não aparece como fonte.
- Trecho pendente: marque com `<!-- REVISAR -->` e com a caixa `.em-revisao`.
- Publicar (push) só com autorização do Pedro.

## Como trabalhar no site

- Textos em `conteudo/`. Depois de mudar `conteudo/` ou o montador, rode `node ferramentas/montar-site.mjs`. Nunca edite `docs/*.html` à mão: `docs/` é a pasta publicada.
- No ar em https://duascasasumfilho.github.io/ (GitHub Pages, ramo `main`, pasta `/docs`).
- Teste local: `npx http-server docs -p 8080` e confira sempre em 390px de largura.
- Antes de mexer em CSS ou no visual, leia `DESIGN.md`. Ele vale sobre qualquer outra regra de visual.
- Antes de mexer no montador, na busca, no botão do grupo, no mapa, no contador, no quiz, nos impressos ou nos vídeos, leia `notas/como-o-site-funciona.md`.
