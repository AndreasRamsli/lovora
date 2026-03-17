const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Bem-vindo ao",
      getStarted: "Começar",
    },
    llm: {
      title: "Preferência de LLM",
      description:
        "AnythingLLM funciona com vários provedores de LLM. Este será o serviço que lidará com os chats.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Configuração do Usuário",
      description: "Configure suas preferências de usuário.",
      howManyUsers: "Quantos usuários usarão esta instância?",
      justMe: "Apenas eu",
      myTeam: "Minha equipe",
      instancePassword: "Senha da Instância",
      setPassword: "Deseja configurar uma senha?",
      passwordReq: "Senhas devem ter pelo menos 8 caracteres.",
      passwordWarn:
        "É importante salvar esta senha pois não há método de recuperação.",
      adminUsername: "Nome de usuário admin",
      adminPassword: "Senha de admin",
      adminPasswordReq: "Senhas devem ter pelo menos 8 caracteres.",
      teamHint:
        "Por padrão, você será o único admin. Após a configuração, você poderá convidar outros usuários ou admins. Não perca sua senha, pois apenas admins podem redefini-la.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Privacidade de Dados",
      description:
        "Estamos comprometidos com transparência e controle sobre seus dados pessoais.",
      settingsHint:
        "Estas configurações podem ser alteradas a qualquer momento.",
    },
    survey: {
      title: "Bem-vindo ao AnythingLLM",
      description: "Ajude-nos a melhorar o AnythingLLM. Opcional.",
      email: "Qual seu email?",
      useCase: "Como você usará o AnythingLLM?",
      useCaseWork: "Para trabalho",
      useCasePersonal: "Uso pessoal",
      useCaseOther: "Outro",
      comment: "Como você conheceu o AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, etc. - Conte como nos encontrou!",
      skip: "Pular Pesquisa",
      thankYou: "Obrigado pelo seu feedback!",
    },
    workspace: {
      title: "Crie seu primeiro workspace",
      description: "Crie seu primeiro workspace e comece a usar o AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Nome do Workspace",
    error: "erro",
    success: "sucesso",
    user: "Usuário",
    selection: "Seleção de Modelo",
    saving: "Salvando...",
    save: "Salvar alterações",
    previous: "Página Anterior",
    next: "Próxima Página",
    optional: "Opcional",
    yes: "Sim",
    no: "Não",
    search: "Pesquisar",
    username_requirements:
      "O nome de usuário deve ter de 2 a 32 caracteres, começar com uma letra minúscula e conter apenas letras minúsculas, números, sublinhados, hífens e pontos.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Bem-vindo",
    chooseWorkspace: "Escolha um espaço de trabalho para começar a conversar!",
    notAssigned:
      "Você ainda não está atribuído a nenhum espaço de trabalho.\nEntre em contato com seu administrador para solicitar acesso a um espaço de trabalho.",
    goToWorkspace: 'Ir para o espaço de trabalho "{{workspace}}"',
  },
  settings: {
    title: "Configurações da Instância",
    system: "Configurações Gerais",
    invites: "Convites",
    users: "Usuários",
    workspaces: "Workspaces",
    "workspace-chats": "Chats do Workspace",
    customization: "Personalização",
    interface: "Preferências de UI",
    branding: "Marca e Etiqueta Branca",
    chat: "Chat",
    "api-keys": "API de Desenvolvedor",
    llm: "LLM",
    transcription: "Transcrição",
    embedder: "Vinculador",
    "text-splitting": "Divisor de Texto",
    "voice-speech": "Voz e Fala",
    "vector-database": "Banco de Dados Vetorial",
    embeds: "Vinculador de Chat",
    "embed-chats": "Histórico de vínculos",
    security: "Segurança",
    "event-logs": "Logs de Eventos",
    privacy: "Privacidade e Dados",
    "ai-providers": "Provedores de IA",
    "agent-skills": "Habilidades de Agente",
    "community-hub": {
      title: "Centro Comunitário",
      trending: "Explore as tendências",
      "your-account": "Sua Conta",
      "import-item": "Importar Item",
    },
    admin: "Admin",
    tools: "Ferramentas",
    "system-prompt-variables": "Variáveis de Prompt",
    "experimental-features": "Recursos Experimentais",
    contact: "Suporte",
    "browser-extension": "Extensão de Navegador",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Bem-vindo ao",
      "placeholder-username": "Nome de usuário",
      "placeholder-password": "Senha",
      login: "Login",
      validating: "Validando...",
      "forgot-pass": "Esqueci a senha",
      reset: "Redefinir",
    },
    "sign-in": "Acesse sua {{appName}} conta.",
    "password-reset": {
      title: "Redefinição de Senha",
      description:
        "Forneça as informações necessárias para redefinir sua senha.",
      "recovery-codes": "Códigos de Recuperação",
      "recovery-code": "Código de Recuperação {{index}}",
      "back-to-login": "Voltar ao Login",
    },
  },
  "main-page": {
    greeting: "Como posso ajudá-lo hoje?",
    noWorkspaceError: "Por favor, crie um workspace antes de iniciar um chat.",
    checklist: {
      title: "Primeiros Passos",
      tasksLeft: "tarefas restantes",
      completed:
        "Você está no caminho para se tornar um expert em AnythingLLM!",
      dismiss: "fechar",
      tasks: {
        create_workspace: {
          title: "Criar workspace",
          description: "Crie seu primeiro workspace para começar",
          action: "Criar",
        },
        send_chat: {
          title: "Enviar chat",
          description: "Inicie uma conversa com seu assistente de IA",
          action: "Chat",
        },
        embed_document: {
          title: "Inserir documento",
          description: "Adicione seu primeiro documento ao workspace",
          action: "Inserir",
        },
        setup_system_prompt: {
          title: "Configurar prompt",
          description: "Defina o comportamento do seu assistente de IA",
          action: "Configurar",
        },
        define_slash_command: {
          title: "Definir comando",
          description: "Crie comandos personalizados para seu assistente",
          action: "Definir",
        },
        visit_community: {
          title: "Visitar Comunidade",
          description: "Explore recursos e templates da comunidade",
          action: "Explorar",
        },
      },
    },
    quickActions: {
      createAgent: "Criar um Agente",
      editWorkspace: "Editar o Espaço de Trabalho",
      uploadDocument: "Enviar um documento",
    },
    quickLinks: {
      title: "Links Rápidos",
      sendChat: "Enviar Chat",
      embedDocument: "Vincular Documento",
      createWorkspace: "Criar Workspace",
    },
    exploreMore: {
      title: "Explore mais recursos",
      features: {
        customAgents: {
          title: "Agentes Personalizados",
          description: "Crie agentes de IA poderosos sem código.",
          primaryAction: "Chat com @agent",
          secondaryAction: "Criar fluxo de agente",
        },
        slashCommands: {
          title: "Comandos de Barra",
          description: "Economize tempo com comandos personalizados de barra.",
          primaryAction: "Criar Comando",
          secondaryAction: "Explorar no Hub",
        },
        systemPrompts: {
          title: "Prompts de Sistema",
          description:
            "Modifique o prompt para personalizar as respostas da IA.",
          primaryAction: "Modificar Prompt",
          secondaryAction: "Gerenciar variáveis",
        },
      },
    },
    announcements: {
      title: "Atualizações e Anúncios",
    },
    resources: {
      title: "Recursos",
      links: {
        docs: "Documentação",
        star: "Avalie-nos no Github",
      },
      keyboardShortcuts: "Atalhos de Teclado",
    },
  },
  "new-workspace": {
    title: "Novo Workspace",
    placeholder: "Meu Workspace",
  },
  "workspaces—settings": {
    general: "Configurações Gerais",
    chat: "Configurações de Chat",
    vector: "Banco de Dados Vetorial",
    members: "Membros",
    agent: "Configuração de Agente",
  },
  general: {
    vector: {
      title: "Contagem de Vetores",
      description: "Número total de vetores no seu banco de dados.",
    },
    names: {
      description: "Isso altera apenas o nome exibido do seu workspace.",
    },
    message: {
      title: "Sugestões de Chat",
      description:
        "Personalize as mensagens sugeridas aos usuários do workspace.",
      add: "Adicionar mensagem",
      save: "Salvar Mensagens",
      heading: "Explique para mim",
      body: "os benefícios do AnythingLLM",
    },
    pfp: {
      title: "Imagem do Assistente",
      description: "Personalize a imagem do assistente para este workspace.",
      image: "Imagem do Workspace",
      remove: "Remover Imagem",
    },
    delete: {
      title: "Excluir Workspace",
      description:
        "Exclua este workspace e todos seus dados. Isso afetará todos os usuários.",
      delete: "Excluir Workspace",
      deleting: "Excluindo Workspace...",
      "confirm-start": "Você está prestes a excluir todo o",
      "confirm-end":
        "workspace. Isso removerá todos os vetores do banco de dados.\n\nOs arquivos originais permanecerão intactos. Esta ação é irreversível.",
    },
  },
  chat: {
    llm: {
      title: "Provedor de LLM",
      description:
        "O provedor e modelo específico que será usado neste workspace. Por padrão, usa as configurações do sistema.",
      search: "Buscar todos provedores",
    },
    model: {
      title: "Modelo de Chat",
      description:
        "O modelo específico para este workspace. Se vazio, usará a preferência do sistema.",
      wait: "-- aguardando modelos --",
    },
    mode: {
      title: "Modo de Chat",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start": "fornecerá respostas com conhecimento geral do LLM",
        and: "e",
        "desc-end": "contexto dos documentos encontrados.",
      },
      query: {
        title: "Consulta",
        "desc-start": "fornecerá respostas",
        only: "apenas",
        "desc-end": "se contexto for encontrado nos documentos.",
      },
    },
    history: {
      title: "Histórico de Chat",
      "desc-start":
        "Número de chats anteriores que serão incluídos na memória de curto prazo.",
      recommend: "Recomendado: 20. ",
      "desc-end":
        "Valores acima de 45 podem causar falhas dependendo do tamanho das mensagens.",
    },
    prompt: {
      title: "Prompt de Sistema",
      description:
        "O prompt usado neste workspace. Defina o contexto e instruções para a IA gerar respostas relevantes e precisas.",
      history: {
        title: "Histórico de Prompts",
        clearAll: "Limpar Tudo",
        noHistory: "Nenhum histórico disponível",
        restore: "Restaurar",
        delete: "Excluir",
        publish: "Publicar no Hub",
        deleteConfirm: "Tem certeza que deseja excluir este item?",
        clearAllConfirm:
          "Tem certeza que deseja limpar todo o histórico? Esta ação é irreversível.",
        expand: "Expandir",
      },
    },
    refusal: {
      title: "Modo Resposta de recusa",
      "desc-start": "Quando",
      query: "consulta",
      "desc-end":
        "modo, você pode definir uma resposta personalizada quando nenhum contexto for encontrado.",
      "tooltip-title": "Resposta de Recusa",
      "tooltip-description":
        "Configure uma mensagem personalizada quando o sistema não conseguir responder baseado no contexto disponível.",
    },
    temperature: {
      title: "Temperatura do LLM",
      "desc-start": 'Controla o nível de "criatividade" das respostas.',
      "desc-end":
        "Valores mais altos geram respostas mais criativas, mas para alguns modelos podem se tornar incoerentes.",
      hint: "Cada modelo LLM tem faixas de valores válidos. Consulte seu provedor.",
    },
  },
  "vector-workspace": {
    identifier: "Identificador do banco de dados",
    snippets: {
      title: "Máximo de Trechos",
      description:
        "Controla a quantidade máxima de trechos de contexto enviados ao LLM por chat.",
      recommend: "Recomendado: 4",
    },
    doc: {
      title: "Limiar de similaridade",
      description:
        "Pontuação mínima para uma fonte ser considerada relevante para o chat. Valores mais altos exigem maior similaridade.",
      zero: "Sem restrição",
      low: "Baixo (≥ .25)",
      medium: "Médio (≥ .50)",
      high: "Alto (≥ .75)",
    },
    reset: {
      reset: "Resetar Banco de Dados",
      resetting: "Limpando vetores...",
      confirm:
        "Você está prestes a resetar o banco de dados deste workspace. Isso removerá todos os vetores atuais.\n\nOs arquivos originais permanecerão intactos. Esta ação é irreversível.",
      error: "Falha ao resetar o banco de dados!",
      success: "Banco de dados resetado com sucesso!",
    },
  },
  agent: {
    "performance-warning":
      "O desempenho de LLMs sem suporte a tool-calling varia conforme as capacidades do modelo. Algumas funcionalidades podem ser limitadas.",
    provider: {
      title: "Provedor LLM de Agente de Workspace",
      description:
        "O provedor LLM e modelo específico que será usado por este agente @agent deste workspace.",
    },
    mode: {
      chat: {
        title: "Modelo de Chat para Agente de workspace",
        description:
          "O modelo de chat específico para o agente @agent deste workspace.",
      },
      title: "Modelo para Agente de workspace",
      description:
        "O modelo LLM específico que será usado pelo agente @agent deste workspace.",
      wait: "-- aguardando modelos --",
    },
    skill: {
      title: "Habilidades padrão do agente",
      description:
        "Melhore as habilidades naturais do agente com estas funções pré-configuradas. Aplica-se a todos os workspaces.",
      rag: {
        title: "RAG & memória longa duração",
        description:
          'Permite ao agente usar documentos locais para responder suas perguntas ou perguntar ao agente "lembrar" conteúdos de sua memória de longa duração.',
      },
      view: {
        title: "Visualizar & resumir",
        description:
          "Permite ao agente listar e resumir conteúdos guardados dos arquivos do workspace.",
      },
      scrape: {
        title: "Extrair sites",
        description:
          "Permite ao agente visitar e extrair conteúdo de websites.",
      },
      generate: {
        title: "Gerar gráficos",
        description:
          "Permite ao agente padrão gerar diversos tipos de gráficos a partir de dados armazenados ou informados no chat.",
      },
      save: {
        title: "Gerar & salvar arquivos",
        description: "Permite ao agente gerar e salvar arquivos no navegador.",
      },
      web: {
        title: "Busca na web",
        description:
          "Permita que seu agente acesse a web para responder às suas perguntas, conectando-se a um provedor de pesquisa na web (SERP).",
      },
      sql: {
        title: "Conector SQL",
        description:
          "Permita que seu agente utilize o SQL para responder às suas perguntas, conectando-se a diversos provedores de bancos de dados SQL.",
      },
      default_skill:
        "Por padrão, essa habilidade está ativada, mas você pode desativá-la se não quiser que ela esteja disponível para o agente.",
    },
  },
  recorded: {
    title: "Chats do Workspace",
    description:
      "Todos os chats registrados enviados por usuários, ordenados por data de criação.",
    export: "Exportar",
    table: {
      id: "ID",
      by: "Enviado Por",
      workspace: "Workspace",
      prompt: "Prompt",
      response: "Resposta",
      at: "Enviado Em",
    },
    export_success: "Chats exported successfully as {{name}}.",
    export_failed: "Failed to export chats.",
    clear: "Clear Chats",
    clear_confirm:
      "Are you sure you want to clear all chats?\n\nThis action is irreversible.",
    cleared: "Cleared all chats.",
    row: {
      delete_confirm:
        "Are you sure you want to delete this chat?\n\nThis action is irreversible.",
      viewing_text: "Viewing Text",
    },
  },
  customization: {
    interface: {
      title: "Preferências de UI",
      description: "Defina suas preferências de interface.",
    },
    branding: {
      title: "Marca & Etiqueta Branca",
      description: "Personalize sua instância do AnythingLLM com sua marca.",
    },
    chat: {
      title: "Chat",
      description: "Defina preferências de chat.",
      auto_submit: {
        title: "Envio Automático",
        description: "Envia automaticamente entrada de voz após silêncio.",
      },
      auto_speak: {
        title: "Falar Respostas",
        description: "Fala automaticamente as respostas da IA.",
      },
      spellcheck: {
        title: "Verificação Ortográfica",
        description: "Ativa/desativa verificação ortográfica no chat.",
      },
    },
    items: {
      theme: {
        title: "Tema",
        description: "Selecione seu tema de cores preferido.",
      },
      "show-scrollbar": {
        title: "Mostrar Barra",
        description: "Ativa/desativa barra de rolagem no chat.",
      },
      "support-email": {
        title: "Email de Suporte",
        description: "Defina o email de suporte acessível aos usuários.",
      },
      "app-name": {
        title: "Nome",
        description:
          "Defina um nome exibido na página de login para todos os usuários.",
      },
      "chat-message-alignment": {
        title: "Alinhamento de Mensagens",
        description: "Selecione o alinhamento das mensagens no chat.",
      },
      "display-language": {
        title: "Idioma",
        description:
          "Selecione o idioma preferido para a interface - quando houver traduções.",
      },
      logo: {
        title: "Logo",
        description: "Envie seu logo personalizado.",
        add: "Adicionar logo",
        recommended: "Tamanho recomendado: 800 x 200",
        remove: "Remover",
        replace: "Substituir",
      },
      "welcome-messages": {
        title: "Mensagens de Boas-vindas",
        description:
          "Personalize as mensagens exibidas aos usuários que não são administradores.",
        new: "Novo",
        system: "sistema",
        user: "usuário",
        message: "mensagem",
        assistant: "Assistente de Chat",
        "double-click": "Clique duas vezes para editar...",
        save: "Salvar Mensagens",
      },
      "browser-appearance": {
        title: "Aparência no Navegador",
        description: "Personalize a aparência da aba e título no navegador.",
        tab: {
          title: "Título",
          description: "Defina um título personalizado para a aba.",
        },
        favicon: {
          title: "Favicon",
          description: "Use um favicon personalizado.",
        },
      },
      "sidebar-footer": {
        title: "Itens do Rodapé",
        description:
          "Personalize os itens exibidos no rodapé da barra lateral.",
        icon: "Ícone",
        link: "Link",
      },
      "render-html": {
        title: "Renderizar HTML no chat",
        description:
          "Renderizar respostas HTML nas respostas do assistente.\nIsso pode resultar em uma qualidade de resposta muito maior, mas também pode levar a riscos potenciais de segurança.",
      },
    },
  },
  api: {
    title: "Chaves API",
    description: "Chaves API permitem acesso programático a esta instância.",
    link: "Leia a documentação da API",
    generate: "Gerar Nova Chave",
    table: {
      key: "Chave API",
      by: "Criado Por",
      created: "Criado Em",
    },
  },
  llm: {
    title: "Preferência de LLM",
    description:
      "Credenciais e configurações do seu provedor de LLM. Essas chaves devem estar corretas para o funcionamento adequado.",
    provider: "Provedor de LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Endpoint do Serviço Azure",
        api_key: "Chave da API",
        chat_deployment_name: "Nome do Deployment de Chat",
        chat_model_token_limit: "Limite de Tokens do Modelo de Chat",
        model_type: "Tipo do Modelo",
        model_type_tooltip:
          'Se o seu ambiente de uso utiliza um modelo de raciocínio (o1, o1-mini, o3-mini, etc.), defina esta opção como "Raciocínio". Caso contrário, suas solicitações de chat podem falhar.',
        default: "Padrão",
        reasoning: "Raciocínio",
      },
    },
  },
  transcription: {
    title: "Preferência de Transcrição",
    description:
      "Credenciais e configurações do seu provedor de transcrição. Essas chaves devem estar corretas para processar arquivos de mídia.",
    provider: "Provedor de Transcrição",
    "warn-start":
      "Usar o modelo local whisper em máquinas com RAM ou CPU limitada pode travar o AnythingLLM.",
    "warn-recommend": "Recomendamos pelo menos 2GB de RAM e arquivos <10Mb.",
    "warn-end":
      "O modelo interno será baixado automaticamente no primeiro uso.",
  },
  embedding: {
    title: "Preferência de Vínculo",
    "desc-start":
      "Ao usar um LLM sem suporte nativo a vínculo, você pode precisar especificar credenciais adicionais.",
    "desc-end":
      "Vínculo é o processo de transformar texto em vetores. Essas credenciais são necessárias para processar arquivos e prompts.",
    provider: {
      title: "Provedor de Vínculo",
    },
  },
  text: {
    title: "Preferências de Divisão de Texto",
    "desc-start":
      "Você pode alterar a forma como novos documentos são divididos antes de serem inseridos no banco de dados vetorial.",
    "desc-end": "Modifique apenas se entender os efeitos da divisão de texto.",
    size: {
      title: "Tamanho dos Trechos",
      description: "Comprimento máximo de caracteres em um único vetor.",
      recommend: "Tamanho máximo do modelo de vínculo é",
    },
    overlap: {
      title: "Sobreposição de Trechos",
      description:
        "Sobreposição máxima de caracteres entre dois trechos adjacentes.",
    },
  },
  vector: {
    title: "Banco de Dados Vetorial",
    description:
      "Credenciais e configurações do seu banco de dados vetorial. Essas chaves devem estar corretas para o funcionamento adequado.",
    provider: {
      title: "Provedor do Banco",
      description: "Nenhuma configuração necessária para LanceDB.",
    },
  },
  embeddable: {
    title: "Widgets de Chat vinculado",
    description:
      "Widgets de chat vinculadas são interfaces de chats públicos ligadas a um único workspace. Isto permite construir workspaces e publicá-los na web.",
    create: "Criar vínculo",
    table: {
      workspace: "Workspace",
      chats: "Chats Enviados",
      active: "Domínios Ativos",
      created: "Criado Em",
    },
    row: {
      disable_confirm:
        "Are you sure you want to disable this embed?\nOnce disabled, the embed will no longer respond to any chat requests.",
      disabled: "Embed has been disabled.",
      enabled: "Embed is active again.",
      delete_confirm:
        "Are you sure you want to delete this embed?\nOnce deleted, this embed will no longer respond to chats or be active.\n\nThis action is irreversible.",
      deleted: "Embed deleted from system.",
    },
  },
  "embed-chats": {
    title: "Chats Vinculados",
    export: "Exportar",
    description: "Todos os chats registrados de qualquer vínculo publicado.",
    table: {
      embed: "Vínculo",
      sender: "Remetente",
      message: "Mensagem",
      response: "Resposta",
      at: "Enviado Em",
    },
    export_success: "Embed chats exported successfully as {{name}}.",
    export_failed: "Failed to export embed chats.",
    view_thoughts: "View thoughts",
    row: {
      delete_confirm:
        "Are you sure you want to delete this chat?\n\nThis action is irreversible.",
      viewing_text: "Viewing Text",
      session_id: "sessionID",
      username: "username",
      client_ip: "client IP address",
      client_host: "client host URL",
    },
  },
  security: {
    title: "Segurança",
    multiuser: {
      title: "Modo Multi-Usuário",
      description:
        "Configure sua instância para suportar sua equipe ativando o modo multi-usuário.",
      enable: {
        "is-enable": "Modo Multi-Usuário Ativo",
        enable: "Ativar Modo Multi-Usuário",
        description:
          "Por padrão, você será o único administrador. Como administrador, você precisará criar contas para novos usuários. Não perca sua senha, pois apenas administradores podem redefini-la.",
        username: "Nome de usuário admin",
        password: "Senha de admin",
      },
    },
    password: {
      title: "Proteção por Senha",
      description:
        "Proteja sua instância com uma senha. Não há recuperação, então salve esta senha.",
      "password-label": "Senha da instância",
    },
  },
  event: {
    title: "Logs de Eventos",
    description:
      "Visualize todas as ações e eventos nesta instância para monitoramento.",
    clear: "Limpar Logs de eventos",
    table: {
      type: "Tipo de Evento",
      user: "Usuário",
      occurred: "Ocorrido Em",
    },
  },
  privacy: {
    title: "Privacidade & Dados",
    description:
      "Configurações de como provedores terceiros e o AnythingLLM lidam com seus dados.",
    llm: "Seleção de LLM",
    embedding: "Preferência de Vínculo",
    vector: "Banco de Dados Vetorial",
    anonymous: "Telemetria Anônima Ativa",
  },
  connectors: {
    "search-placeholder": "Buscar conectores",
    "no-connectors": "Nenhum conector encontrado.",
    obsidian: {
      name: "Obsidian",
      description: "Importe um vault do Obsidian com um clique.",
      vault_location: "Local do Cofre",
      vault_description:
        "Selecione sua pasta do Obsidian para importar todas as notas.",
      selected_files: "Encontrados {{count}} arquivos markdown",
      importing: "Importando cofre...",
      import_vault: "Importar Cofre",
      processing_time: "Pode levar algum tempo dependendo do tamanho do cofre.",
      vault_warning:
        "Para evitar conflitos, certifique-se que seu cofre Obsidian não está aberto.",
    },
    github: {
      name: "Repositório GitHub",
      description:
        "Importe um repositório GitHub público ou privado com um clique.",
      URL: "URL do Repositório",
      URL_explained: "URL do repositório que deseja coletar.",
      token: "Token de Acesso",
      optional: "opcional",
      token_explained: "Token para evitar limitação de taxa.",
      token_explained_start: "Sem um ",
      token_explained_link1: "Token de Acesso Pessoal",
      token_explained_middle:
        ", a API do GitHub pode limitar o número de arquivos coletados. Você pode ",
      token_explained_link2: "criar um Token Temporário",
      token_explained_end: " para evitar isso.",
      ignores: "Arquivos Ignorados",
      git_ignore:
        "Liste no formato .gitignore para ignorar arquivos específicos. Pressione enter após cada entrada.",
      task_explained:
        "Após conclusão, todos os arquivos estarão disponíveis para vínculo.",
      branch: "Branch",
      branch_loading: "-- carregando branches --",
      branch_explained: "Branch para coletar arquivos.",
      token_information:
        "Sem preencher o <b>Token de Acesso</b>, este conector só poderá coletar arquivos <b>do nível superior</b> devido a limitações da API pública.",
      token_personal: "Obtenha um Token de Acesso Pessoal gratuito aqui.",
    },
    gitlab: {
      name: "Repositório GitLab",
      description:
        "Importe um repositório GitLab público ou privado com um clique.",
      URL: "URL do Repositório",
      URL_explained: "URL do repositório que deseja coletar.",
      token: "Token de Acesso",
      optional: "opcional",
      token_explained: "Token para evitar limitação de taxa.",
      token_description: "Selecione entidades adicionais para buscar na API.",
      token_explained_start: "Sem um ",
      token_explained_link1: "Token de Acesso Pessoal",
      token_explained_middle:
        ", a API do GitLab pode limitar o número de arquivos coletados. Você pode ",
      token_explained_link2: "criar um Token Temporário",
      token_explained_end: " para evitar isso.",
      fetch_issues: "Buscar Issues como Documentos",
      ignores: "Arquivos Ignorados",
      git_ignore:
        "Liste no formato .gitignore para ignorar arquivos específicos. Pressione enter após cada entrada.",
      task_explained:
        "Após conclusão, todos os arquivos estarão disponíveis para vínculo.",
      branch: "Branch",
      branch_loading: "-- carregando branches --",
      branch_explained: "Branch para coletar arquivos.",
      token_information:
        "Sem preencher o <b>Token de Acesso</b>, este conector só poderá coletar arquivos <b>do nível superior</b> devido a limitações da API pública.",
      token_personal: "Obtenha um Token de Acesso Pessoal gratuito aqui.",
    },
    youtube: {
      name: "Transcrição do YouTube",
      description:
        "Importe a transcrição de um vídeo do YouTube a partir de um link.",
      URL: "URL do Vídeo",
      URL_explained_start:
        "Insira a URL de qualquer vídeo do YouTube para buscar sua transcrição. O vídeo deve ter ",
      URL_explained_link: "legendas",
      URL_explained_end: " disponíveis.",
      task_explained:
        "Após conclusão, a transcrição estará disponível para vínculo.",
      language: "Idioma da Transcrição",
      language_explained:
        "Selecione o idioma da transcrição que deseja coletar.",
      loading_languages: "-- carregando idiomas --",
    },
    "website-depth": {
      name: "Coletor de Links",
      description:
        "Extraia um site e seus sublinks até uma certa profundidade.",
      URL: "URL do Site",
      URL_explained: "URL do site que deseja extrair.",
      depth: "Profundidade",
      depth_explained:
        "Número de links filhos que o coletor deve seguir a partir da URL original.",
      max_pages: "Máximo de Páginas",
      max_pages_explained: "Número máximo de links para extrair.",
      task_explained:
        "Após conclusão, todo o conteúdo estará disponível para vínculo.",
    },
    confluence: {
      name: "Confluence",
      description: "Importe uma página do Confluence com um clique.",
      deployment_type: "Tipo de instalação",
      deployment_type_explained:
        "Determine se sua instância é hospedada na nuvem ou auto-hospedada.",
      base_url: "URL Base",
      base_url_explained: "URL base do seu espaço no Confluence.",
      space_key: "Chave do Espaço",
      space_key_explained:
        "Chave do espaço no Confluence que será usada. Geralmente começa com ~",
      username: "Nome de Usuário",
      username_explained: "Seu nome de usuário no Confluence",
      auth_type: "Tipo de Autenticação",
      auth_type_explained:
        "Selecione o tipo de autenticação para acessar suas páginas.",
      auth_type_username: "Usuário e Token",
      auth_type_personal: "Token Pessoal",
      token: "Token de Acesso",
      token_explained_start:
        "Forneça um token de acesso para autenticação. Você pode gerar um token",
      token_explained_link: "aqui",
      token_desc: "Token para autenticação",
      pat_token: "Token Pessoal",
      pat_token_explained: "Seu token pessoal de acesso.",
      bypass_ssl: "Desviar a validação do certificado SSL",
      bypass_ssl_explained:
        "Habilite esta opção para contornar a validação do certificado SSL para instâncias do Confluence hospedadas por si mesmo, com certificado autoassinado.",
      task_explained:
        "Após conclusão, o conteúdo da página estará disponível para vínculo.",
    },
    manage: {
      documents: "Documentos",
      "data-connectors": "Conectores de Dados",
      "desktop-only":
        "Editar estas configurações só está disponível em dispositivos desktop. Acesse esta página em seu desktop para continuar.",
      dismiss: "Ignorar",
      editing: "Editando",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Meus Documentos",
      "new-folder": "Nova Pasta",
      "search-document": "Buscar documento",
      "no-documents": "Nenhum Documento",
      "move-workspace": "Mover para Workspace",
      name: "Nome",
      "delete-confirmation":
        "Tem certeza que deseja excluir estes arquivos e pastas?\nIsso removerá os arquivos do sistema e de todos os workspaces automaticamente.\nEsta ação é irreversível.",
      "removing-message":
        "Removendo {{count}} documentos e {{folderCount}} pastas. Aguarde.",
      "move-success": "{{count}} documentos movidos com sucesso.",
      date: "Data",
      type: "Tipo",
      no_docs: "Nenhum Documento",
      select_all: "Selecionar Tudo",
      deselect_all: "Desmarcar Tudo",
      remove_selected: "Remover Selecionados",
      costs: "*Custo único para vínculos",
      save_embed: "Salvar e Inserir",
      moving_message: "Moving {{count}} documents. Please wait.",
      move_error: "Error moving files: {{error}}",
      create_new_folder: "Create New Folder",
      folder_name: "Folder Name",
      folder_name_placeholder: "Enter folder name",
      create_folder: "Create Folder",
      new_folder_failed: "Failed to create folder",
      removing_selected_from_workspace:
        "Removing selected files from workspace",
      removing_file_from_workspace: "Removing file from workspace",
      estimated_cost: "Estimated Cost",
      pin_failed: "Failed to pin document.",
      unpin_failed: "Failed to unpin document.",
      pin_success: "Document pinned to workspace",
      unpin_success: "Document unpinned from workspace",
      pin_failed_error: "Failed to pin document. {{error}}",
      pin_tooltip: "Pin to workspace",
      unpin_tooltip: "Un-pin from workspace",
      pinned: "Pinned",
      unpin: "Un-pin",
      watch_failed: "Failed to watch document.",
      unwatch_failed: "Failed to unwatch document.",
      watch_success: "Document will be watched for changes.",
      unwatch_success: "Document will no longer be watched for changes.",
      watch_failed_error: "Failed to watch document. {{error}}",
      stop_watching: "Stop watching for changes",
      watch_for_changes: "Watch document for changes",
      remove_document: "Remove document from workspace",
    },
    upload: {
      "processor-offline": "Processador de documentos Indisponível",
      "processor-offline-desc":
        "Não é possível enviar arquivos agora. O processador de documentos está offline. Tente mais tarde.",
      "click-upload": "Clique para enviar ou arraste e solte",
      "file-types": "suporta textos, csv, planilhas, áudios e mais!",
      "or-submit-link": "ou envie um link",
      "placeholder-link": "https://exemplo.com",
      fetching: "Buscando...",
      "fetch-website": "Buscar site",
      "privacy-notice":
        "Esses arquivos são enviados ao processador local do AnythingLLM. Não são compartilhados com terceiros.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "O que é fixar documento?",
      pin_explained_block1:
        "Ao <b>fixar</b> um documento, o conteúdo será injetado na janela do prompt para o LLM entender.",
      pin_explained_block2:
        "Funciona melhor com <b>modelos de contexto grande</b> ou arquivos pequenos e importantes.",
      pin_explained_block3:
        "Se não tiver boas respostas, fixar pode melhorar a qualidade com um clique.",
      accept: "Ok, entendi",
    },
    watching: {
      what_watching: "O que é monitorar um documento?",
      watch_explained_block1:
        "Ao <b>monitorar</b>, o conteúdo será <i>sincronizado</i> com a fonte em intervalos regulares.",
      watch_explained_block2:
        "Funciona apenas com conteúdo online, não com uploads manuais.",
      watch_explained_block3_start:
        "Você pode gerenciar documentos monitorados no ",
      watch_explained_block3_link: "Gerenciador de arquivos",
      watch_explained_block3_end: " na visão de admin.",
      accept: "Ok, entendi",
    },
    drupalwiki: {
      fetching:
        "Fetching all pages for the given Drupal Wiki spaces. This may take a while.",
      success:
        "Pages collected from Drupal Wiki spaces {{spaceIds}}. Output folder is {{destination}}.",
      base_url: "Drupal Wiki base URL",
      base_url_help: "This is the base URL of your <link>Drupal Wiki</link>.",
      base_url_placeholder:
        "eg: https://mywiki.drupal-wiki.net, https://drupalwiki.mycompany.tld, etc...",
      space_ids: "Drupal Wiki Space IDs",
      space_ids_help:
        "Comma separated Space IDs you want to extract. See the <manual>manual</manual> on how to retrieve the Space IDs. Be sure that your API-Token User has access to those spaces.",
      space_ids_placeholder: "eg: 12,34,69",
      api_token: "Drupal Wiki API Token",
      api_token_help:
        "You need to provide an API token for authentication. See the Drupal Wiki <manual>manual</manual> on how to generate an API token for your user.",
      api_token_description: "Access token for authentication.",
      collecting: "Collecting pages...",
      submit: "Submit",
      loading_note:
        "Once complete, all pages will be available for embedding into workspaces.",
    },
  },
  chat_window: {
    welcome: "Bem-vindo ao novo workspace.",
    get_started: "Para começar,",
    get_started_default: "Para começar",
    upload: "envie um documento",
    or: "ou",
    attachments_processing: "Anexos em processamento. Aguarde...",
    send_chat: "envie uma mensagem.",
    send_message: "Enviar mensagem",
    attach_file: "Anexar arquivo ao chat",
    slash: "Veja todos os comandos disponíveis.",
    agents: "Veja todos os agentes disponíveis.",
    start_agent_session: "Start agent session",
    text_size: "Alterar tamanho do texto.",
    microphone: "Fale seu prompt.",
    send: "Enviar prompt para o workspace",
    tts_speak_message: "Leitura em voz alta da mensagem",
    copy: "Copiar",
    regenerate: "Regerar",
    regenerate_response: "Regerar resposta",
    good_response: "Resposta satisfatória",
    more_actions: "Mais ações",
    hide_citations: "Esconder citações",
    show_citations: "Exibir citações",
    sources: "Fontes",
    source_count_one: "Referência a {{count}}",
    source_count_other: "Referências a {{count}}",
    document: "Documento",
    similarity_match: "jogo",
    pause_tts_speech_message: "Pausar a leitura em voz alta",
    fork: "Fork",
    delete: "Excluir",
    save_submit: "Alterar",
    cancel: "Cancelar",
    submit: "Enviar",
    edit_prompt: "Editar prompt",
    edit_response: "Editar resposta",
    edit_info_user:
      '"Enviar" recria a resposta da IA. "Salvar" atualiza apenas sua mensagem.',
    edit_info_assistant:
      "Suas alterações serão salvas diretamente nesta resposta.",
    see_less: "Ver menos",
    see_more: "Ver mais",
    at_agent: "@agent",
    default_agent_description: " - o agente padrão deste workspace.",
    custom_agents_coming_soon: "mais agentes personalizados em breve!",
    preset_reset_description: "Limpa o histórico do seu chat e inicia um novo",
    preset_exit_description: "Interrompa a sessão atual do agente",
    add_new_preset: " Insere um novo Preset",
    add_new: "Adicionar novo",
    edit: "Editar",
    publish: "Publicar",
    stop_generating: "Pare de gerar respostas",
    command: "Comando",
    your_command: "seu-comando",
    placeholder_prompt:
      "Este é o conteúdo que será injetado a frente do seu prompt.",
    description: "Descrição",
    placeholder_description: "Responde como um poema sobre LLMs.",
    save: "Salvar",
    small: "Pequeno",
    normal: "Normal",
    large: "Grande",
    tools: "Ferramentas",
    slash_commands: "Comandos Rápidos",
    agent_skills: "Habilidades do Agente",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Navegar",
    text_size_label: "Tamanho do texto",
    select_model: "Selecione o modelo",
    workspace_llm_manager: {
      search: "Buscar provedores de LLM",
      loading_workspace_settings: "Carregando configurações do workspace...",
      available_models: "Modelos Disponíveis",
      available_models_description: "Selecione um modelo para este workspace",
      save: "Salvar modelo do workspace",
      saving: "Salvando...",
      missing_credentials: "Credenciais em falta",
      missing_credentials_description:
        "Configure as credenciais do LLM primeiro",
    },
  },
  profile_settings: {
    edit_account: "Editar conta",
    profile_picture: "Foto de perfil",
    remove_profile_picture: "Remover foto de perfil",
    username: "Nome de usuário",
    new_password: "Nova senha",
    password_description: "A senha deve ter no mínimo 8 caracteres",
    cancel: "Cancelar",
    update_account: "Atualizar conta",
    theme: "Preferência de tema",
    language: "Idioma preferido",
    failed_upload: "Falha no upload da foto de perfil",
    upload_success: "Foto de perfil atualizada com sucesso",
    failed_remove: "Falha ao remover foto de perfil",
    profile_updated: "Perfil atualizado com sucesso",
    failed_update_user: "Falha ao atualizar perfil do usuário",
    account: "Conta",
    support: "Suporte",
    signout: "Sair",
  },
  "keyboard-shortcuts": {
    title: "Atalhos de Teclado",
    shortcuts: {
      settings: "Ajustes",
      workspaceSettings: "Abrir os ajustes do workspace",
      home: "Ir para a página inicial",
      workspaces: "Gerenciar workspaces",
      apiKeys: "Ajustes das chaves da API",
      llmPreferences: "Preferências do LLM",
      chatSettings: "Ajustes do chat",
      help: "Exibe ajuda e atalhos",
      showLLMSelector: "Exibir seletor de LLM",
    },
  },
  community_hub: {
    browse: {
      title: "Community Hub",
      description: "Share and collaborate with the Lovora community.",
      recently_added: "Recently Added on Lovora Community Hub",
      latest_description:
        "Explore the latest additions to the Lovora Community Hub",
      explore_more: "Explore More →",
    },
    authentication: {
      save_failed: "Failed to save API key",
      save_success: "API key saved successfully",
      disconnect_failed: "Failed to disconnect from hub",
      disconnect_success: "Disconnected from Lovora Community Hub",
      title: "Your Lovora Community Hub Account",
      description:
        "Connecting your Lovora Community Hub account allows you to access your <bold>private</bold> Lovora Community Hub items as well as upload your own items to the Lovora Community Hub.",
      why_title: "Why connect my Lovora Community Hub account?",
      why_description:
        "Connecting your Lovora Community Hub account allows you to pull in your <bold>private</bold> items from the Lovora Community Hub as well as upload your own items to the Lovora Community Hub.",
      why_note:
        "You do not need to connect your Lovora Community Hub account to pull in public items from the Lovora Community Hub.",
      api_key_label: "Lovora Hub API Key",
      api_key_placeholder: "Enter your Lovora Hub API key",
      api_key_helper:
        "You can get your API key from your <profile>Lovora Community Hub profile page</profile>.",
      disconnect: "Disconnect",
    },
    import: {
      layout: {
        title: "Import a Community Item",
        description:
          "Import items from the Lovora Community Hub to enhance your instance with community-created prompts, skills, and commands.",
      },
      introduction: {
        missing_id: "Please enter an item ID",
        title: "Import an item from the Community Hub",
        description_1:
          "The Community Hub is a place where you can find, share, and import agent skills, system prompts, slash commands, and more.",
        description_2:
          "These items are created by the Lovora team and community, and are a great way to get started with Lovora as well as extend Lovora in a way that is customized to your needs.",
        description_3:
          "There are both <bold>private</bold> and <bold>public</bold> items in the Community Hub. Private items are only visible to you, while public items are visible to everyone.",
        warning:
          "If you are pulling in a private item, make sure it is <bold>shared with a team</bold> you belong to, and you have added a <link>Connection Key</link>.",
        item_id_label: "Community Hub Item Import ID",
        item_id_placeholder: "allm-community-id:agent-skill:1234567890",
        continue: "Continue with import →",
      },
      completed: {
        title: "Community Hub Item Imported",
        success:
          'The "{{name}}" {{itemType}} has been imported successfully. It is now available in your Lovora instance.',
        view_agent_skills: 'View "{{name}}" in Agent Skills',
        changes_note:
          "Any changes you make to this {{itemType}} will not be reflected in the Community Hub. You can now modify it as needed.",
        import_another: "Import another item",
      },
      item: {
        created_by: "Created by",
        learn_more: "Learn more →",
        file_counter: "{{name}} ({{index}} of {{count}} files)",
        agent_skill: {
          import_success: "Agent skill imported successfully!",
          import_error: "Failed to import agent skill. {{error}}",
          warning_title: "Only import agent skills you trust",
          warning_description:
            "Agent skills can execute code on your Lovora instance, so only import agent skills from sources you trust. You should also review the code before importing. If you are unsure about what a skill does, do not import it.",
          review_title: 'Review Agent Skill "{{name}}"',
          verified: "Verified code",
          unverified: "This skill is not verified.",
          description:
            "Agent skills unlock new capabilities for your Lovora workspace via <code>@agent</code> skills that can do specific tasks when invoked.",
          importing: "Importing...",
          import_button: "Import agent skill",
        },
        agent_flow: {
          import_success: "Agent flow imported successfully!",
          import_error: "Failed to import agent flow. {{error}}",
          title: 'Import Agent Flow "{{name}}"',
          description:
            "Agent flows allow you to create reusable sequences of actions that can be triggered by your agent.",
          flow_details: "Flow Details:",
          description_label: "Description: {{description}}",
          steps_label: "Steps ({{count}}):",
          importing: "Importing...",
          import_button: "Import agent flow",
        },
        system_prompt: {
          applying: "Applying system prompt to workspace...",
          apply_error: "Failed to apply system prompt. {{error}}",
          apply_success: "System prompt applied to workspace.",
          review_title: 'Review System Prompt "{{name}}"',
          description:
            "System prompts are used to guide the behavior of AI agents and can be applied to any existing workspace.",
          provided_prompt: "Provided system prompt:",
          apply_to_workspace: "Apply to Workspace",
          available_workspaces: "Available workspaces",
          apply_button: "Apply system prompt to workspace",
        },
        slash_command: {
          import_success: "Slash command {{command}} imported successfully!",
          import_error: "Failed to import slash command. {{error}}",
          review_title: 'Review Slash Command "{{name}}"',
          description:
            "Slash commands are used to prefill information into a prompt while chatting with a Lovora workspace.\n\nThe slash command will be available during chatting by simply invoking it with <code>{{command}}</code> like you would any other command.",
          import_button: "Import slash command",
        },
        unknown: {
          title: "Unsupported item",
          description:
            "We found an item in the Community Hub, but we do not know what it is or it is not yet supported for import into Lovora.",
          item_id: "The item ID is: <bold>{{id}}</bold>",
          item_type: "The item type is: <bold>{{itemType}}</bold>",
          contact_support:
            "Please contact support via email if you need help importing this item.",
          try_another: "Try another item",
        },
      },
    },
    publish: {
      system_prompt: {
        success_title: "Prompt de sistema publicado!",
        success_description:
          "Seu prompt de sistema foi publicado com sucesso no Hub da Comunidade.",
        success_thank_you: "Obrigado por contribuir!",
        view_on_hub: "Ver no Hub",
        modal_title: "Publicar prompt de sistema",
        name_label: "Nome",
        name_description: "Nome único para seu prompt de sistema",
        name_placeholder: "Meu prompt de sistema incrível",
        description_label: "Descrição",
        description_description: "Descreva o que seu prompt de sistema faz",
        tags_label: "Tags",
        tags_description:
          "Adicione tags para ajudar outros a encontrar seu prompt",
        tags_placeholder: "prompt, assistente, produtividade",
        visibility_label: "Visibilidade",
        public_description: "Qualquer pessoa pode ver e usar este prompt",
        private_description: "Apenas você pode ver e usar este prompt",
        publish_button: "Publicar prompt de sistema",
        submitting: "Publicando...",
        submit: "Publicar",
        prompt_label: "Prompt de sistema",
        prompt_description: "O conteúdo do seu prompt de sistema",
        prompt_placeholder: "Você é um assistente útil que...",
      },
      agent_flow: {
        public_description:
          "Qualquer pessoa pode ver e usar este fluxo de agente",
        private_description: "Apenas você pode ver e usar este fluxo de agente",
        success_title: "Fluxo de agente publicado!",
        success_description:
          "Seu fluxo de agente foi publicado com sucesso no Hub da Comunidade.",
        success_thank_you: "Obrigado por contribuir!",
        view_on_hub: "Ver no Hub",
        modal_title: "Publicar fluxo de agente",
        name_label: "Nome",
        name_description: "Nome único para seu fluxo de agente",
        name_placeholder: "Meu fluxo de agente incrível",
        description_label: "Descrição",
        description_description: "Descreva o que seu fluxo de agente faz",
        tags_label: "Tags",
        tags_description:
          "Adicione tags para ajudar outros a encontrar seu fluxo",
        tags_placeholder: "agente, automação, fluxo de trabalho",
        visibility_label: "Visibilidade",
        publish_button: "Publicar fluxo de agente",
        submitting: "Publicando...",
        submit: "Publicar",
        privacy_note:
          "Nota: dados sensíveis serão removidos antes da publicação",
      },
      slash_command: {
        success_title: "Comando de barra publicado!",
        success_description:
          "Seu comando de barra foi publicado com sucesso no Hub da Comunidade.",
        success_thank_you: "Obrigado por contribuir!",
        view_on_hub: "Ver no Hub",
        modal_title: "Publicar comando de barra",
        name_label: "Nome",
        name_description: "Nome único para seu comando de barra",
        name_placeholder: "Meu comando incrível",
        description_label: "Descrição",
        description_description: "Descreva o que seu comando faz",
        command_label: "Comando",
        command_description: "O comando que os usuários digitarão",
        command_placeholder: "/meu-comando",
        tags_label: "Tags",
        tags_description:
          "Adicione tags para ajudar outros a encontrar seu comando",
        tags_placeholder: "comando, produtividade, útil",
        visibility_label: "Visibilidade",
        public_description: "Qualquer pessoa pode ver e usar este comando",
        private_description: "Apenas você pode ver e usar este comando",
        publish_button: "Publicar comando de barra",
        submitting: "Publicando...",
        prompt_label: "Prompt",
        prompt_description:
          "O prompt que será executado quando o comando for usado",
        prompt_placeholder: "Responda como um especialista em...",
      },
      generic: {
        unauthenticated: {
          title: "Faça login para publicar",
          description:
            "Você precisa estar logado para publicar no Hub da Comunidade",
          button: "Fazer login",
        },
      },
    },
    card: {
      verified: "Verified",
      unverified: "Unverified",
      skill: "Skill",
      file: "file",
      found: "found",
      import: "Import",
    },
  },
  not_found: {
    title: "404 - Page Not Found",
    description: "The page you're looking for doesn't exist or has been moved.",
    go_home: "Go Home",
  },
  workspace_members: {
    username: "Username",
    role: "Role",
    date_added: "Date Added",
    empty: "No workspace members",
    manage_users: "Manage Users",
    modal: {
      title: "Users",
      search_placeholder: "Search for a user",
      no_users: "No users found",
      select_all: "Select All",
      unselect: "Unselect",
      save: "Save",
      updated_successfully: "Users updated successfully.",
    },
  },
  experimental_features: {
    title: "Experimental Features",
    select_feature: "Select an experimental feature",
    on: "On",
    off: "Off",
    enabled_reload: "Experimental feature set enabled. Reloading the page.",
    modal: {
      title: "Terms of use for experimental features",
      intro:
        "Experimental features in Lovora are features that we are piloting and are <bold>opt-in</bold>. We will proactively condition or warn you about any potential concerns before you approve any feature.",
      risks_intro:
        "Use of any feature on this page can result in, but is not limited to, the following possibilities.",
      data_loss: "Loss of data.",
      quality_change: "Change in quality of results.",
      storage: "Increased storage.",
      resources: "Increased resource consumption.",
      cost: "Increased cost or use of any connected LLM or embedding provider.",
      bugs: "Potential bugs or issues using Lovora.",
      conditions_intro:
        "Use of an experimental feature also comes with the following non-exhaustive conditions.",
      may_not_exist: "Feature may not exist in future updates.",
      unstable: "The feature being used is not currently stable.",
      future_versions:
        "The feature may not be available in future versions, configurations, or subscriptions of Lovora.",
      privacy_honored:
        "Your privacy settings <bold>will be honored</bold> with use of any beta feature.",
      conditions_change: "These conditions may change in future updates.",
      learn_more:
        "Access to any features requires approval of this modal. If you would like to read more you can refer to <docs>docs.anythingllm.com</docs> or email <email>team@mintplexlabs.com</email>.",
      reject: "Reject & close",
      accept: "I understand",
    },
    live_sync: {
      update_failed: "Failed to update status of feature.",
      enabled: "Live document content sync has been enabled.",
      disabled: "Live document content sync has been disabled.",
      title: "Automatic Document Content Sync",
      description:
        'Enable the ability to specify a document to be "watched". Watched document content will be regularly fetched and updated in Lovora.',
      scope:
        "Watched documents will automatically update in all workspaces they are referenced in at the same time of update.",
      note: "This feature only applies to web-based content, such as websites, Confluence, YouTube, and GitHub files.",
      docs: "Feature Documentation and Warnings",
      manage: "Manage Watched Documents →",
    },
  },
  embeddable_modal: {
    create_title: "Create new embed for workspace",
    update_title: "Update embed #{{id}}",
    workspace_label: "Workspace",
    workspace_description:
      "This is the workspace your chat window will be based on. All defaults will be inherited from the workspace unless overridden by this config.",
    chat_method_label: "Allowed chat method",
    chat_method_description:
      "Set how your chatbot should operate. Query means it will only respond if a document helps answer the query.\nChat opens the chat to even general questions and can answer totally unrelated queries to your workspace.",
    chat_option: "Chat: Respond to all questions regardless of context",
    query_option:
      "Query: Only respond to chats related to documents in workspace",
    domains_label: "Restrict requests from domains",
    domains_description:
      "This filter will block any requests that come from a domain other than the list below.\nLeaving this empty means anyone can use your embed on any site.",
    domains_placeholder: "https://mysite.com, https://lovora.no",
    max_chats_per_day_title: "Max chats per day",
    max_chats_per_day_hint:
      "Limit the amount of chats this embedded chat can process in a 24 hour period. Zero is unlimited.",
    max_chats_per_session_title: "Max chats per session",
    max_chats_per_session_hint:
      "Limit the amount of chats a session user can send with this embed in a 24 hour period. Zero is unlimited.",
    message_limit_title: "Message History Limit",
    message_limit_hint:
      "The number of previous messages to include in the chat context. Default is 20.",
    model_override_title: "Enable dynamic model use",
    model_override_hint:
      "Allow setting of the preferred LLM model to override the workspace default.",
    temperature_override_title: "Enable dynamic LLM temperature",
    temperature_override_hint:
      "Allow setting of the LLM temperature to override the workspace default.",
    prompt_override_title: "Enable Prompt Override",
    prompt_override_hint:
      "Allow setting of the system prompt to override the workspace default.",
    error: "Error: {{error}}",
    script_help:
      "After creating an embed you will be provided a link that you can publish on your website with a simple <code>&lt;script&gt;</code> tag.",
    cancel: "Cancel",
    create: "Create embed",
    update_success: "Embed updated successfully.",
    update: "Update embed",
  },
  browser_extension_api_keys: {
    title: "Browser Extension API Keys",
    description:
      "Manage API keys for browser extensions connecting to your Lovora instance.",
    fetch_failed: "Failed to fetch API keys",
    generate: "Generate New API Key",
    error: "Error: {{error}}",
    table: {
      connection_string: "Extension Connection String",
      created_by: "Created By",
      created_at: "Created At",
      actions: "Actions",
      empty: "No API keys found",
    },
    row: {
      revoke_confirm:
        "Are you sure you want to revoke this browser extension API key?\nAfter you do this it will no longer be usable.\n\nThis action is irreversible.",
      revoked: "Browser Extension API Key permanently revoked",
      revoke_failed: "Failed to revoke API Key",
      copied: "Connection string copied to clipboard",
      connecting: "Attempting to connect to browser extension...",
      copy_tooltip: "Copy connection string",
      connect_tooltip: "Automatically connect to extension",
      unavailable: "N/A",
    },
    modal: {
      title: "New Browser Extension API Key",
      error: "Error: {{error}}",
      multi_user_warning:
        "Warning: You are in multi-user mode, this API key will allow access to all workspaces associated with your account. Please share it cautiously.",
      auto_connect_description:
        'After clicking "Create API Key", Lovora will attempt to connect to your browser extension automatically.',
      success_description:
        'If you see "Connected to Lovora" in the extension, the connection was successful. If not, please copy the connection string and paste it into the extension manually.',
      cancel: "Cancel",
      create: "Create API Key",
      copied: "API Key Copied!",
      copy: "Copy API Key",
    },
  },
  mobile_connections: {
    title: "Connected Mobile Devices",
    description:
      "These are the devices that are connected to your desktop application to sync chats, workspaces, and more.",
    register: "Register New Device",
    table: {
      device_name: "Device Name",
      registered: "Registered",
      empty: "No devices found",
    },
    row: {
      granted: "Device access granted",
      denied: "Device access denied",
      by: "by",
      revoke: "Revoke",
      approve: "Approve Access",
      deny: "Deny",
    },
    modal: {
      title: "Go mobile. Stay local. Lovora Mobile.",
      description:
        "Lovora for mobile allows you to connect to your workspace chats, threads, tools, and documents while you are on the go.\n\nRun with local models on your phone privately or relay chats directly to this instance seamlessly.",
      qr_help:
        "Scan the QR code with the Lovora Mobile app to enable live sync of your workspaces, chats, threads and documents.",
      learn_more: "Learn more",
      play_store_alt: "Get on Google Play",
      localhost_error:
        "Please open this page via your machine's private IP address or custom domain. Localhost URLs will not work with the mobile app.",
    },
  },
  system_prompt_variables: {
    title: "System Prompt Variables",
    description:
      "System prompt variables store configuration values that can be referenced in your system prompt to enable dynamic prompt content.",
    add_variable: "Add Variable",
    no_variables: "No variables found",
    table: {
      key: "Key",
      value: "Value",
      description: "Description",
      type: "Type",
    },
    modal: {
      add_title: "Add New Variable",
      edit_title: "Edit {{key}}",
      required_fields: "Key and value are required",
      created: "Variable created successfully",
      create_failed: "Failed to create variable",
      updated: "Variable updated successfully",
      update_failed: "Failed to update variable",
      key_placeholder: "e.g., company_name",
      key_help:
        "Key must be unique and will be used in prompts as {key}. Only letters, numbers and underscores are allowed.",
      value_placeholder: "e.g., Acme Corp",
      description_placeholder: "Optional description",
      error: "Error: {{error}}",
      create: "Create variable",
      update: "Update variable",
    },
    row: {
      delete_confirm:
        'Are you sure you want to delete the variable "{{key}}"?\nThis action is irreversible.',
      deleted: "Variable deleted successfully",
      delete_failed: "Failed to delete variable",
    },
  },
  api_keys: {
    row: {
      delete_confirm:
        "Are you sure you want to deactivate this API key?\nAfter you do this it will no longer be usable.\n\nThis action is irreversible.",
      deleted: "API key permanently deleted",
      copied: "API key copied to clipboard",
      copy: "Copy API Key",
    },
    modal: {
      title: "Create new API key",
      error: "Error: {{error}}",
      copied: "API key copied to clipboard",
      description:
        "Once created, the API key can be used to programmatically access and configure this Lovora instance.",
      read_docs: "Read the API documentation",
      create: "Create API Key",
    },
  },
  users: {
    title: "Users",
    description:
      "These are all the accounts on this instance. Removing an account will immediately remove that user's access.",
    add: "Add user",
    permissions: "Permissions",
    table: {
      username: "Username",
      role: "Role",
      date_added: "Date Added",
    },
    roles: {
      default_label: "Default",
      manager_label: "Manager",
      admin_label: "Administrator",
      default: [
        "Can only send chats with workspaces they are added to by admins or managers.",
        "Cannot modify any settings.",
      ],
      manager: [
        "Can view, create, and delete any workspaces and modify workspace-specific settings.",
        "Can create, update, and invite new users to the instance.",
        "Cannot modify LLM, vector database, embedding, or other provider connections.",
      ],
      admin: [
        "Highest user privilege level.",
        "Can see and do everything across the system.",
      ],
    },
    message_limit: {
      label: "Limit messages per day",
      description:
        "Restrict this user to a number of successful queries or chats within a 24 hour window.",
      input_label: "Message limit per day",
    },
    row: {
      suspend_confirm:
        "Are you sure you want to suspend {{username}}?\nAfter you do this they will be logged out and unable to log back into this Lovora instance until unsuspended by an admin.",
      suspended: "User has been suspended.",
      unsuspended: "User is no longer suspended.",
      suspend: "Suspend",
      unsuspend: "Unsuspend",
      delete_confirm:
        "Are you sure you want to delete {{username}}?\nAfter you do this they will be logged out and unable to use this Lovora instance.\n\nThis action is irreversible.",
      deleted: "User deleted from system.",
    },
    modal: {
      add_title: "Add user to instance",
      edit_title: "Edit {{username}}",
      username_placeholder: "User's username",
      password: "Password",
      password_placeholder: "User's initial password",
      password_help: "Password must be at least 8 characters long",
      new_password: "New Password",
      new_password_placeholder: "{{username}}'s new password",
      bio: "Bio",
      bio_placeholder: "User's bio",
      error: "Error: {{error}}",
      after_create:
        "After creating a user they will need to log in with their initial credentials to gain access.",
      update: "Update user",
    },
  },
  workspace_settings: {
    updated: "Workspace updated!",
    update_failed: "Error: {{error}}",
    updating: "Updating...",
    update_workspace: "Update Workspace",
  },
  agent_config: {
    configure_skills: "Configure Agent Skills",
    configure_skills_description:
      "Customize the default agent's capabilities by enabling or disabling specific skills. These settings apply across all workspaces.",
    updating: "Updating agent...",
    update: "Update workspace agent",
  },
  audio_preference: {
    provider: "Provider",
    save_failed: "Failed to save preferences: {{error}}",
    tts: {
      title: "Text-to-speech Preference",
      description:
        "Here you can specify which text-to-speech providers you want to use in Lovora. By default, Lovora uses your browser's built-in support for these services.",
      saved: "Text-to-speech preferences saved successfully.",
      search_placeholder: "Search text to speech providers",
    },
    stt: {
      title: "Speech-to-text Preference",
      description:
        "Here you can specify which speech-to-text providers you want to use in Lovora. By default, Lovora uses your browser's built-in support for these services.",
      saved: "Speech-to-text preferences saved successfully.",
      search_placeholder: "Search speech to text providers",
    },
  },
  active_workspaces: {
    aria_label: "Workspaces",
    reorder_failed: "Failed to reorder workspaces",
    general_appearance: "General appearance settings",
    threads: {
      aria_label: "Threads",
      loading: "Loading threads...",
      default: "default",
      virtual_new: "*New Thread",
      create_failed: "Could not create thread - {{error}}",
      starting: "Starting Thread...",
      new: "New Thread",
      delete_selected: "Delete Selected",
      deleted: "deleted thread",
      options: "Thread options",
      rename_prompt: "What would you like to rename this thread to?",
      update_failed: "Thread could not be updated! {{message}}",
      delete_confirm:
        "Are you sure you want to delete this thread? All of its chats will be deleted. You cannot undo this.",
      delete_failed: "Thread could not be deleted!",
      deleted_success: "Thread deleted successfully!",
      rename: "Rename",
      delete: "Delete Thread",
    },
  },
  model_table: {
    available_models: "Available Models",
    search: "Search models",
    refresh: "Refresh Models",
  },
  footer_customization: {
    url_placeholder: "https://example.com",
  },
  chat_embed_widgets: {
    back: "Back",
    widgets: "Widgets",
    history: "History",
    code: "Code",
    disable: "Disable",
    enable: "Enable",
    delete: "Delete",
    close: "Close",
    all_domains: "all",
    code_snippet: {
      title: "Copy your embed code",
      copied: "Snippet copied to clipboard!",
      label: "HTML Script Tag Embed Code",
      description:
        "Make your workspace chat embed behave like a help desk chat bubble in the corner of your website.",
      view_options: "View all style and configuration options",
    },
  },
  agent_builder: {
    actions: {
      add_block: "Add Block",
      move_up: "Move block up",
      move_down: "Move block down",
      delete_block: "Delete block",
      new_flow: "New Flow",
      publish: "Publish",
      save: "Save",
    },
    header: {
      logo_alt: "Lovora logo",
      builder: "Builder",
      view_docs: "View documentation",
    },
    toasts: {
      load_available_flows_error: "Failed to load available flows",
      load_flow_error: "Failed to load flow",
      missing_name_description:
        "Please provide both a name and description for your flow",
      save_success: "Agent flow saved successfully!",
      save_error: "Failed to save agent flow. {{error}}",
    },
    common: {
      select_variable: "Select variable",
      select_or_create_variable: "Select or create variable",
    },
    blocks: {
      flow_info: {
        label: "Flow Information",
        description: "Basic flow information",
        untitled: "Untitled Flow",
      },
      start: {
        label: "Flow Variables",
        description: "Configure agent variables and settings",
        summary: "{{count}} variable defined",
        summary_other: "{{count}} variables defined",
      },
      api_call: {
        label: "API Call",
        description: "Make an HTTP request",
        no_url: "(no URL)",
      },
      llm_instruction: {
        label: "LLM Instruction",
        description: "Process data using LLM instructions",
        no_instruction: "No instruction",
      },
      web_scraping: {
        label: "Web Scraping",
        description: "Scrape content from a webpage",
        no_url: "No URL specified",
      },
      finish: {
        label: "Flow Complete",
        description: "End of agent flow",
        summary: "Flow will end here",
      },
    },
    direct_output: {
      label: "Direct Output",
      description:
        "The output of this block will be returned directly to the chat. This will prevent any further tool calls from being executed.",
    },
    config_coming_soon: "Configuration options coming soon...",
    content_summarization: {
      label: "Content Summarization",
      description:
        "When enabled, long webpage content will be automatically summarized to reduce token usage.",
      note: "Note: This may affect data quality and remove specific details from the original content.",
    },
    flow_info: {
      name: "Flow Name",
      name_help:
        "It is important to give your flow a name that an LLM can easily understand.",
      examples: '"SendMessageToDiscord", "CheckStockPrice", "CheckWeather"',
      name_placeholder: "Enter flow name",
      description: "Description",
      description_help:
        "It is equally important to give your flow a description that an LLM can easily understand. Be sure to include the purpose of the flow, the context it will be used in, and any other relevant information.",
      description_placeholder: "Enter flow description",
    },
    start: {
      variables: "Variables",
      variable_name: "Variable name",
      initial_value: "Initial value",
      delete_variable: "Delete variable",
      add_variable: "Add variable",
    },
    api_call: {
      url: "URL",
      url_placeholder: "https://api.example.com/endpoint",
      insert_variable: "Insert variable",
      select_variable_to_insert: "Select variable to insert",
      method: "Method",
      headers: "Headers",
      add_header: "Add header",
      header_name: "Header name",
      value: "Value",
      remove_header: "Remove header",
      request_body: "Request Body",
      raw_text: "Raw Text",
      form_data: "Form Data",
      key: "Key",
      remove_field: "Remove field",
      add_field: "Add Form Field",
      raw_body_placeholder: "Raw request body...",
      response_variable: "Store Response In",
    },
    llm_instruction: {
      instruction: "Instruction",
      placeholder: "Enter instructions for the LLM...",
      result_variable: "Result Variable",
    },
    web_scraping: {
      url: "URL to Scrape",
      capture_as: "Capture Page Content As",
      capture_options: {
        text: "Text content only",
        html: "Raw HTML",
        selector: "CSS Query Selector",
      },
      query_selector: "Query Selector",
      query_selector_help:
        "Enter a valid CSS selector to scrape the content of the page.",
      result_variable: "Result Variable",
    },
    finish: {
      description:
        "This is the end of your agent flow. All steps above will be executed in sequence.",
    },
  },
};

export default TRANSLATIONS;
