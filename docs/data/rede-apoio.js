/*
  REDE DE APOIO DE SETE LAGOAS
  ----------------------------------------------------------------
  Este arquivo guarda os órgãos que aparecem na página
  "Onde buscar ajuda". O grupo pode editar sem saber programar:

  - Troque só o texto entre aspas.
  - "verificado": true  -> aparece com o selo "Endereço conferido"
  - "verificado": false -> aparece com o selo "Endereço em confirmação"
  - "telefones": lista de telefones, cada um entre aspas, separados por vírgula.
  - "unidades": use quando o órgão tem mais de um endereço (cada unidade
    tem "nome", "endereco" e "telefones").
  - "lat" e "lng": coordenadas do prédio, para aparecer o pino no mapa.
    Em órgãos com "unidades", as coordenadas ficam em cada unidade.
    Deixe null se não tiver certeza. NUNCA invente coordenadas.
    (Para pegar: no Google Maps, clique com o botão direito no prédio
    e clique nos números que aparecem; eles são copiados.)
  - "categoria": em que grupo da página o órgão aparece:
    "protecao" (Proteção), "juridico" (Jurídico) ou "saude" (Saúde e assistência).
    A ordem dos órgãos neste arquivo é a ordem em que aparecem na página.
  - Não apague as vírgulas entre os itens.

  Endereços, telefones e coordenadas conferidos pelo grupo em 10/11/2026.
*/
window.REDE_APOIO = [
  {
    "nome": "Delegacia Especializada de Atendimento à Mulher (DEAM)",
    "categoria": "protecao",
    "paraQue": "Registro de ocorrência e pedido de medida protetiva em casos de violência contra a mulher. Fora do horário, procure o plantão da Delegacia Regional da Polícia Civil. Em perigo, ligue 190.",
    "endereco": "Rua Jovelino Lanza, 1316, Jardim Arizona, Sete Lagoas/MG, CEP 35700-353",
    "telefones": ["(31) 3773-9305"],
    "horario": "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    "verificado": true,
    "lat": -19.45705996246092,
    "lng": -44.265092162585816
  },
  {
    "nome": "Conselho Tutelar de Sete Lagoas",
    "categoria": "protecao",
    "paraQue": "Recebe denúncias de violação de direitos de crianças e adolescentes. A cidade tem três setores; procure o do seu bairro.",
    "horario": "Segunda a sexta, das 8h às 17h, com plantão 24 horas para urgências e fins de semana.",
    "unidades": [
      { "nome": "Setor I", "endereco": "Rua Coronel Antônio Andrade, 1376, São Geraldo, CEP 35700-193", "telefones": ["(31) 3773-9851"], "lat": -19.469897319950505, "lng": -44.24553108558262 },
      { "nome": "Setor II", "endereco": "Rua Congonhas do Campo, 336, Esperança, CEP 35701-039", "telefones": ["(31) 3776-4671"], "lat": -19.440759239380387, "lng": -44.23605683654322 },
      { "nome": "Setor III", "endereco": "Rua Quintino Bocaiúva, 996, Centro, CEP 35700-053", "telefones": ["(31) 3774-1522"], "lat": -19.45414774920432, "lng": -44.24899726258676 }
    ],
    "verificado": true
  },
  {
    "nome": "CREAS",
    "categoria": "protecao",
    "paraQue": "Atendimento a crianças e famílias com direitos violados, incluindo situações de violência doméstica, abuso e negligência.",
    "endereco": "Rua Goiás, 366, Boa Vista, Sete Lagoas/MG, CEP 35700-085",
    "telefones": ["(31) 3774-7585"],
    "horario": "Segunda a sexta, das 8h às 17h",
    "verificado": true,
    "lat": -19.46022958625092,
    "lng": -44.2381567337495
  },
  {
    "nome": "Promotoria de Justiça da Infância e Juventude (MPMG)",
    "categoria": "protecao",
    "paraQue": "O Ministério Público defende os direitos de crianças e adolescentes.",
    "endereco": "Rua José Duarte de Paiva, 795, Santa Luzia, Sete Lagoas/MG, CEP 35700-059",
    "telefones": ["(31) 3776-8310", "(31) 98492-8811"],
    "horario": "Segunda a sexta, das 12h às 18h",
    "verificado": true,
    "lat": -19.455968500851117,
    "lng": -44.25459076258562
  },
  {
    "nome": "Defensoria Pública de Minas Gerais (Sete Lagoas)",
    "categoria": "juridico",
    "paraQue": "Atendimento jurídico gratuito para quem não pode pagar advogado, inclusive em guarda, convivência e pensão. Mulheres em situação de violência doméstica têm o atendimento garantido.",
    "endereco": "Rua Professora Tarcyla dos Santos, 66, Cedro e Cachoeira, Sete Lagoas/MG, CEP 35700-400",
    "telefones": ["(31) 3774-0104", "(31) 98464-8285"],
    "horario": "Segunda a sexta, das 8h às 17h. A triagem acontece de preferência das 8h às 15h ou com agendamento.",
    "verificado": true,
    "lat": -19.455153784355335,
    "lng": -44.253741849093494
  },
  {
    "nome": "Núcleo de Prática Jurídica (NPJ) da Afya Sete Lagoas",
    "categoria": "juridico",
    "paraQue": "Orientação jurídica gratuita feita por estudantes de Direito, com supervisão de professores. Atende casos de família, como guarda, convivência, pensão e divórcio, para quem tem direito à justiça gratuita.",
    "endereco": "Rua Atenas, 237, Jardim Europa, Sete Lagoas/MG, CEP 35701-281",
    "telefones": ["(31) 4040-4724", "(31) 98402-1619"],
    "horario": "Segunda a sexta, em horário comercial, com triagem e agendamento na secretaria do NPJ. Nas férias (janeiro e julho) costuma não receber casos novos.",
    "verificado": true,
    "lat": -19.42936561043172,
    "lng": -44.23484923375131
  },
  {
    "nome": "Núcleo de Prática Jurídica do UNIFEMM",
    "categoria": "juridico",
    "paraQue": "Orientação jurídica gratuita feita por estudantes de Direito do Centro Universitário de Sete Lagoas, com supervisão de professores. Atende casos de família, entre outros.",
    "endereco": "Av. Marechal Castelo Branco, 2765, Santo Antônio, Sete Lagoas/MG",
    "telefones": ["(31) 2106-2106"],
    "horario": "Nas férias (janeiro e julho) costuma não receber casos novos.",
    "verificado": true,
    "lat": -19.482577154436356,
    "lng": -44.266795201744436
  },
  {
    "nome": "Núcleo de Prática Jurídica da Faculdade Promove",
    "categoria": "juridico",
    "paraQue": "Orientação jurídica gratuita feita por estudantes de Direito, com supervisão de professores. Atende casos de família, entre outros.",
    "endereco": "Rua Dr. Pena, 163, Centro, Sete Lagoas/MG",
    "telefones": ["(31) 99532-3635"],
    "horario": "Nas férias (janeiro e julho) costuma não receber casos novos.",
    "verificado": true,
    "lat": -19.466313696254257,
    "lng": -44.24479214994403
  },
  {
    "nome": "CEJUSC da Comarca de Sete Lagoas",
    "categoria": "juridico",
    "paraQue": "Sessões de mediação e conciliação para resolver conflitos de família com acordo. Quem ainda não tem processo pode procurar o CEJUSC diretamente.",
    "endereco": "Rua Senhor dos Passos, 95, Centro (prédio dos Juizados Especiais), Sete Lagoas/MG, CEP 35700-016",
    "telefones": ["(31) 3771-9472", "(31) 99535-3968"],
    "horario": "Atendimento presencial das 9h às 18h. Também é possível pedir informações e pré-agendar pelos telefones.",
    "verificado": true,
    "lat": -19.462591218421274,
    "lng": -44.243664627795
  },
  {
    "nome": "OAB/MG, 46ª Subseção (Sete Lagoas)",
    "categoria": "juridico",
    "paraQue": "Ordem dos Advogados. Pode orientar sobre como encontrar um advogado.",
    "endereco": "Rua Professor Fernandino Júnior, 354, Centro, Sete Lagoas/MG, CEP 35700-014",
    "telefones": ["(31) 3771-8982"],
    "horario": "Segunda a sexta, das 9h às 18h",
    "verificado": true,
    "lat": -19.463175750323302,
    "lng": -44.24247380491445
  },
  {
    "nome": "Fórum Des. Félix Generoso (Vara de Família)",
    "categoria": "juridico",
    "paraQue": "Onde correm os processos de guarda, convivência e pensão. A Vara de Família fica no piso 3, sala 320.",
    "endereco": "Rua José Duarte de Paiva, 715, Santa Luzia, Sete Lagoas/MG, CEP 35700-709",
    "telefones": ["(31) 3779-5900"],
    "horario": "Segunda a sexta, das 12h às 18h",
    "verificado": true,
    "lat": -19.45605121376857,
    "lng": -44.25371763262431
  },
  {
    "nome": "CRAS e Secretaria Municipal de Assistência Social",
    "categoria": "saude",
    "paraQue": "Apoio social às famílias, perto de casa. A Secretaria informa qual CRAS atende o seu bairro.",
    "horario": "Segunda a sexta, das 8h às 17h",
    "unidades": [
      { "nome": "Secretaria de Assistência Social (central)", "endereco": "Rua Quintino Bocaiúva, 618, Centro, CEP 35700-845", "telefones": ["(31) 3773-7692"], "lat": -19.457490536941503, "lng": -44.24912706443688 },
      { "nome": "CRAS Centro", "endereco": "Rua Niterói, 100, Canaã, CEP 35700-290", "telefones": ["(31) 3773-5598"], "lat": -19.464112666125715, "lng": -44.25108000491404 },
      { "nome": "CRAS JK", "endereco": "Av. Dalton, 914, JK, CEP 35702-201", "telefones": ["(31) 3775-2146"], "lat": -19.417542000438726, "lng": -44.24883477608009 },
      { "nome": "CRAS Brasília", "endereco": "Rua Ulisses Alberto Araújo, 317, Brasília, CEP 35702-013", "telefones": ["(31) 3776-9304"], "lat": -19.464747987938757, "lng": -44.20457516258564 },
      { "nome": "CRAS Várzea", "endereco": "Rua Claudionor Olinto Martins, 30, São Geraldo", "telefones": ["(31) 3771-4542"], "lat": -19.476466973041095, "lng": -44.242409720257385 }
    ],
    "verificado": true
  },
  {
    "nome": "CAPS (saúde mental pelo SUS)",
    "categoria": "saude",
    "paraQue": "Atendimento em saúde mental pelo SUS. O CAPS Infantil atende crianças e adolescentes.",
    "horario": "Segunda a sexta, das 7h às 17h",
    "unidades": [
      { "nome": "CAPS Infantil (CAPSi)", "endereco": "Rua Floriano Peixoto, 259, Centro, CEP 35700-048", "telefones": ["(31) 3772-1371"], "lat": -19.462920376967602, "lng": -44.24900136258596 },
      { "nome": "CAPS II (adultos)", "endereco": "Rua Floriano Peixoto, 66, Centro, CEP 35700-048", "telefones": ["(31) 3773-3244"], "lat": -19.46299661879142, "lng": -44.24720172025759 },
      { "nome": "CAPS Álcool e Drogas (CAPSad)", "endereco": "Rua Milão, 15, Jardim Europa, CEP 35701-455", "telefones": ["(31) 3773-7188"], "lat": -19.429794267965992, "lng": -44.23590527607939 }
    ],
    "verificado": true
  }
];
