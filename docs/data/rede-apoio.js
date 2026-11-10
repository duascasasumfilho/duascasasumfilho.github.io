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
    Deixe null se não tiver certeza. NUNCA invente coordenadas.
    (Para pegar: no Google Maps, clique com o botão direito no prédio
    e clique nos números que aparecem; eles são copiados.)
  - Não apague as vírgulas entre os itens.

  Endereços e telefones conferidos pelo grupo em 10/11/2026.
*/
window.REDE_APOIO = [
  {
    "nome": "Fórum Des. Félix Generoso (Vara de Família)",
    "paraQue": "Onde correm os processos de guarda, convivência e pensão. A Vara de Família fica no piso 3, sala 320.",
    "endereco": "Rua José Duarte de Paiva, 715, Jardim Cambuí, Sete Lagoas/MG, CEP 35700-059",
    "telefones": ["(31) 3779-5900"],
    "horario": "Segunda a sexta, das 12h às 18h",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Defensoria Pública de Minas Gerais (Sete Lagoas)",
    "paraQue": "Atendimento jurídico gratuito para quem não pode pagar advogado, inclusive em guarda, convivência e pensão. Mulheres em situação de violência doméstica têm o atendimento garantido.",
    "endereco": "Rua Professora Tarcyla dos Santos, 66, Cedro e Cachoeira, Sete Lagoas/MG, CEP 35700-400",
    "telefones": ["(31) 3774-0104", "(31) 98464-8285"],
    "horario": "Segunda a sexta, das 8h às 17h. A triagem acontece de preferência das 8h às 15h ou com agendamento.",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Núcleo de Prática Jurídica (NPJ) da Afya Sete Lagoas",
    "paraQue": "Orientação jurídica gratuita feita por estudantes de Direito, com supervisão de professores. Atende casos de família, como guarda, convivência, pensão e divórcio, para quem tem direito à justiça gratuita.",
    "endereco": "Rua Atenas, 237, Jardim Europa, Sete Lagoas/MG, CEP 35701-281",
    "telefones": ["(31) 4040-4724", "(31) 98402-1619"],
    "horario": "Segunda a sexta, em horário comercial, com triagem e agendamento na secretaria do NPJ. Nas férias (janeiro e julho) costuma não receber casos novos.",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Núcleo de Prática Jurídica do UNIFEMM",
    "paraQue": "Orientação jurídica gratuita feita por estudantes de Direito do Centro Universitário de Sete Lagoas, com supervisão de professores. Atende casos de família, entre outros.",
    "endereco": "Av. Marechal Castelo Branco, 2765, Santo Antônio, Sete Lagoas/MG",
    "telefones": ["(31) 2106-2106"],
    "horario": "Nas férias (janeiro e julho) costuma não receber casos novos.",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Núcleo de Prática Jurídica da Faculdade Promove",
    "paraQue": "Orientação jurídica gratuita feita por estudantes de Direito, com supervisão de professores. Atende casos de família, entre outros.",
    "endereco": "Rua Dr. Pena, 163, Centro, Sete Lagoas/MG",
    "telefones": ["(31) 99532-3635"],
    "horario": "Nas férias (janeiro e julho) costuma não receber casos novos.",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "CEJUSC da Comarca de Sete Lagoas",
    "paraQue": "Sessões de mediação e conciliação para resolver conflitos de família com acordo. Quem ainda não tem processo pode procurar o CEJUSC diretamente.",
    "endereco": "Rua Senhor dos Passos, 95, Centro (prédio dos Juizados Especiais), Sete Lagoas/MG, CEP 35700-016",
    "telefones": ["(31) 3771-9472", "(31) 99535-3968"],
    "horario": "Atendimento presencial das 9h às 18h. Também é possível pedir informações e pré-agendar pelos telefones.",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Conselho Tutelar de Sete Lagoas",
    "paraQue": "Recebe denúncias de violação de direitos de crianças e adolescentes. A cidade tem três setores; procure o do seu bairro.",
    "horario": "Segunda a sexta, das 8h às 17h, com plantão 24 horas para urgências e fins de semana.",
    "unidades": [
      { "nome": "Setor I", "endereco": "Rua Coronel Antônio Andrade, 1376, São Geraldo, CEP 35700-193", "telefones": ["(31) 3773-9851"] },
      { "nome": "Setor II", "endereco": "Rua Congonhas do Campo, 336, Esperança, CEP 35701-039", "telefones": ["(31) 3776-4671"] },
      { "nome": "Setor III", "endereco": "Rua Quintino Bocaiúva, 996, Centro, CEP 35700-053", "telefones": ["(31) 3774-1522"] }
    ],
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "CREAS",
    "paraQue": "Atendimento a crianças e famílias com direitos violados, incluindo situações de violência doméstica, abuso e negligência.",
    "endereco": "Rua Goiás, 366, Boa Vista, Sete Lagoas/MG, CEP 35700-085",
    "telefones": ["(31) 3774-7585"],
    "horario": "Segunda a sexta, das 8h às 17h",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "CRAS e Secretaria Municipal de Assistência Social",
    "paraQue": "Apoio social às famílias, perto de casa. A Secretaria informa qual CRAS atende o seu bairro.",
    "horario": "Segunda a sexta, das 8h às 17h",
    "unidades": [
      { "nome": "Secretaria de Assistência Social (central)", "endereco": "Rua Quintino Bocaiúva, 618, Centro, CEP 35700-845", "telefones": ["(31) 3773-7692"] },
      { "nome": "CRAS Centro", "endereco": "Rua Niterói, 100, Canaã, CEP 35700-290", "telefones": ["(31) 3773-5598"] },
      { "nome": "CRAS JK", "endereco": "Av. Dalton, 914, JK, CEP 35702-201", "telefones": ["(31) 3775-2146"] },
      { "nome": "CRAS Brasília", "endereco": "Rua Ulisses Alberto Araújo, 317, Brasília, CEP 35702-013", "telefones": ["(31) 3776-9304"] },
      { "nome": "CRAS Várzea", "endereco": "Rua Claudionor Olinto Martins, 30, São Geraldo", "telefones": ["(31) 3771-4542"] }
    ],
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Delegacia Especializada de Atendimento à Mulher (DEAM)",
    "paraQue": "Registro de ocorrência e pedido de medida protetiva em casos de violência contra a mulher. Fora do horário, procure o plantão da Delegacia Regional da Polícia Civil. Em perigo, ligue 190.",
    "endereco": "Rua Jovelino Lanza, 1316, Jardim Arizona, Sete Lagoas/MG, CEP 35700-353",
    "telefones": ["(31) 3773-9305"],
    "horario": "Segunda a sexta, das 8h às 12h e das 13h às 17h",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "CAPS (saúde mental pelo SUS)",
    "paraQue": "Atendimento em saúde mental pelo SUS. O CAPS Infantil atende crianças e adolescentes.",
    "horario": "Segunda a sexta, das 7h às 17h",
    "unidades": [
      { "nome": "CAPS Infantil (CAPSi)", "endereco": "Rua Floriano Peixoto, 259, Centro, CEP 35700-048", "telefones": ["(31) 3772-1371"] },
      { "nome": "CAPS II (adultos)", "endereco": "Rua Floriano Peixoto, 66, Centro, CEP 35700-048", "telefones": ["(31) 3773-3244"] },
      { "nome": "CAPS Álcool e Drogas (CAPSad)", "endereco": "Rua Milão, 15, Jardim Europa, CEP 35701-455", "telefones": ["(31) 3773-7188"] }
    ],
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "Promotoria de Justiça da Infância e Juventude (MPMG)",
    "paraQue": "O Ministério Público defende os direitos de crianças e adolescentes.",
    "endereco": "Rua José Duarte de Paiva, 795, Santa Luzia, Sete Lagoas/MG, CEP 35700-059",
    "telefones": ["(31) 3776-8310", "(31) 98492-8811"],
    "horario": "Segunda a sexta, das 12h às 18h",
    "verificado": true,
    "lat": null,
    "lng": null
  },
  {
    "nome": "OAB/MG, 46ª Subseção (Sete Lagoas)",
    "paraQue": "Ordem dos Advogados. Pode orientar sobre como encontrar um advogado.",
    "endereco": "Rua Professor João Fernandino Júnior, 354, Centro, Sete Lagoas/MG, CEP 35700-014",
    "telefones": ["(31) 3771-8982"],
    "horario": "Segunda a sexta, das 9h às 18h",
    "verificado": true,
    "lat": null,
    "lng": null
  }
];
