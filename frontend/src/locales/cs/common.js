const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Vítejte v",
      getStarted: "Začít",
    },
    llm: {
      title: "Preferovaný LLM",
      description:
        "AnythingLLM může pracovat s mnoha poskytovateli LLM. Toto bude služba, která bude zpracovávat chatování.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Nastavení uživatele",
      description: "Nakonfigurujte svá uživatelská nastavení.",
      howManyUsers: "Kolik uživatelů bude používat tuto instanci?",
      justMe: "Jen já",
      myTeam: "Můj tým",
      instancePassword: "Heslo instance",
      setPassword: "Chcete nastavit heslo?",
      passwordReq: "Hesla musí mít alespoň 8 znaků.",
      passwordWarn:
        "Je důležité toto heslo uložit, protože neexistuje způsob obnovení.",
      adminUsername: "Uživatelské jméno správce",
      adminPassword: "Heslo správce",
      adminPasswordReq: "Hesla musí mít alespoň 8 znaků.",
      teamHint:
        "Ve výchozím nastavení budete jediným správcem. Po dokončení onboardingu můžete vytvářet a zvat další uživatele nebo správce. Neztrácejte své heslo, protože pouze správci mohou resetovat hesla.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Zpracování dat a soukromí",
      description:
        "Jsme odhodláni být transparentní a dávat vám kontrolu nad vašimi osobními údaji.",
      settingsHint:
        "Tato nastavení lze kdykoliv znovu nakonfigurovat v nastavení.",
    },
    survey: {
      title: "Vítejte v AnythingLLM",
      description:
        "Pomozte nám vybudovat AnythingLLM pro vaše potřeby. Volitelné.",
      email: "Jaký je váš e-mail?",
      useCase: "K čemu budete AnythingLLM používat?",
      useCaseWork: "Pro práci",
      useCasePersonal: "Pro osobní použití",
      useCaseOther: "Jiné",
      comment: "Jak jste se o AnythingLLM dozvěděli?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube atd. - Dejte nám vědět, jak jste nás našli!",
      skip: "Přeskočit průzkum",
      thankYou: "Děkujeme za vaši zpětnou vazbu!",
    },
    workspace: {
      title: "Vytvořte svůj první pracovní prostor",
      description:
        "Vytvořte svůj první pracovní prostor a začněte s AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Název pracovního prostoru",
    error: "chyba",
    success: "úspěch",
    user: "Uživatel",
    selection: "Výběr modelu",
    saving: "Ukládání...",
    save: "Uložit změny",
    previous: "Předchozí stránka",
    next: "Další stránka",
    optional: "Volitelné",
    yes: "Ano",
    no: "Ne",
    search: "Hledat",
    username_requirements:
      "Uživatelské jméno musí mít 2–32 znaků, začínat malým písmenem a obsahovat pouze malá písmena, číslice, podtržítka, pomlčky a tečky.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Vítejte",
    chooseWorkspace: "Vyberte pracovní prostor pro začátek chatu!",
    notAssigned:
      "V současné době nemáte přiřazen žádný pracovní prostor.\nKontaktujte svého správce o žádost o přístup k pracovnímu prostoru.",
    goToWorkspace: 'Přejít na "{{workspace}}"',
  },
  settings: {
    title: "Nastavení instance",
    system: "Obecná nastavení",
    invites: "Pozvánky",
    users: "Uživatelé",
    workspaces: "Pracovní prostory",
    "workspace-chats": "Chaty pracovních prostorů",
    customization: "Přizpůsobení",
    interface: "Předvolby rozhraní",
    branding: "Značení a bílé označení",
    chat: "Chat",
    "api-keys": "API pro vývojáře",
    llm: "LLM",
    transcription: "Přepis",
    embedder: "Embedding",
    "text-splitting": "Rozdělení textu a chunkování",
    "voice-speech": "Hlas a řeč",
    "vector-database": "Vektorová databáze",
    embeds: "Vložený chat",
    "embed-chats": "Historie vložených chatů",
    security: "Zabezpečení",
    "event-logs": "Protokoly událostí",
    privacy: "Soukromí a data",
    "ai-providers": "Poskytovatelé AI",
    "agent-skills": "Dovednosti agenta",
    "community-hub": {
      title: "Centrální místo pro komunitu",
      trending: "Prozkoumejte aktuální trendy",
      "your-account": "Váš účet",
      "import-item": "Importovat položku",
    },
    admin: "Správce",
    tools: "Nástroje",
    "system-prompt-variables": "Proměnné systémové výzvy",
    "experimental-features": "Experimentální funkce",
    contact: "Kontaktovat podporu",
    "browser-extension": "Rozšíření prohlížeče",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Vítejte v",
      "placeholder-username": "Uživatelské jméno",
      "placeholder-password": "Heslo",
      login: "Přihlásit",
      validating: "Ověřování...",
      "forgot-pass": "Zapomněli jste heslo",
      reset: "Resetovat",
    },
    "sign-in": "Přihlaste se do svého {{appName}} účtu.",
    "password-reset": {
      title: "Reset hesla",
      description: "Níže uveďte potřebné informace pro resetování hesla.",
      "recovery-codes": "Záchranné kódy",
      "recovery-code": "Záchranný kód {{index}}",
      "back-to-login": "Zpět k přihlášení",
    },
  },
  "main-page": {
    greeting: "Jak vám mohu dnes pomoci?",
    noWorkspaceError: "Před zahájením chatu prosím vytvořte pracovní prostor.",
    checklist: {
      title: "Začínáme",
      tasksLeft: "zbylých úkolů",
      completed: "Jste na cestě stát se odborníkem na AnythingLLM!",
      dismiss: "zavřít",
      tasks: {
        create_workspace: {
          title: "Vytvořit pracovní prostor",
          description: "Vytvořte svůj první pracovní prostor pro začátek",
          action: "Vytvořit",
        },
        send_chat: {
          title: "Odeslat chat",
          description: "Začněte konverzaci se svým asistentem AI",
          action: "Chatovat",
        },
        embed_document: {
          title: "Vložit dokument",
          description:
            "Přidejte svůj první dokument do svého pracovního prostoru",
          action: "Vložit",
        },
        setup_system_prompt: {
          title: "Nastavit systémovou výzvu",
          description: "Nakonfigurujte chování svého asistenta AI",
          action: "Nastavit",
        },
        define_slash_command: {
          title: "Definovat lomítkový příkaz",
          description: "Vytvořte vlastní příkazy pro svého asistenta",
          action: "Definovat",
        },
        visit_community: {
          title: "Navštívit komunitní centrum",
          description: "Prozkoumejte komunitní zdroje a šablony",
          action: "Procházet",
        },
      },
    },
    quickActions: {
      createAgent: "Vytvořte agenta",
      editWorkspace: "Upravit pracovní prostor",
      uploadDocument: "Nahrajte dokument",
    },
    quickLinks: {
      title: "Rychlé odkazy",
      sendChat: "Odeslat chat",
      embedDocument: "Vložit dokument",
      createWorkspace: "Vytvořit pracovní prostor",
    },
    exploreMore: {
      title: "Prozkoumat další funkce",
      features: {
        customAgents: {
          title: "Vlastní agenti AI",
          description:
            "Vytvářejte výkonné agenty AI a automatizace bez kódování.",
          primaryAction: "Chatovat pomocí @agenta",
          secondaryAction: "Sestavit tok agenta",
        },
        slashCommands: {
          title: "Lomítkové příkazy",
          description:
            "Ušetřete čas a vkládejte výzvy pomocí vlastních lomítkových příkazů.",
          primaryAction: "Vytvořit lomítkový příkaz",
          secondaryAction: "Prozkoumat v centru",
        },
        systemPrompts: {
          title: "Systémové výzvy",
          description:
            "Upravte systémovou výzvu pro přizpůsobení odpovědí AI pracovního prostoru.",
          primaryAction: "Upravit systémovou výzvu",
          secondaryAction: "Spravovat proměnné výzvy",
        },
      },
    },
    announcements: {
      title: "Aktualizace a oznámení",
    },
    resources: {
      title: "Zdroje",
      links: {
        docs: "Dokumentace",
        star: "Označit hvězdou na Githubu",
      },
      keyboardShortcuts: "Klávesové zkratky",
    },
  },
  "new-workspace": {
    title: "Nový pracovní prostor",
    placeholder: "Můj pracovní prostor",
  },
  "workspaces—settings": {
    general: "Obecná nastavení",
    chat: "Nastavení chatu",
    vector: "Vektorová databáze",
    members: "Členové",
    agent: "Konfigurace agenta",
  },
  general: {
    vector: {
      title: "Počet vektorů",
      description: "Celkový počet vektorů ve vaší vektorové databázi.",
    },
    names: {
      description:
        "Tímto se změní pouze zobrazovaný název vašeho pracovního prostoru.",
    },
    message: {
      title: "Navrhované zprávy chatu",
      description:
        "Přizpůsobte zprávy, které budou navrhovány uživatelům vašeho pracovního prostoru.",
      add: "Přidat novou zprávu",
      save: "Uložit zprávy",
      heading: "Vysvětlit mi",
      body: "výhody AnythingLLM",
    },
    pfp: {
      title: "Profilový obrázek asistenta",
      description:
        "Přizpůsobte profilový obrázek asistenta pro tento pracovní prostor.",
      image: "Obrázek pracovního prostoru",
      remove: "Odebrat obrázek pracovního prostoru",
    },
    delete: {
      title: "Smazat pracovní prostor",
      description:
        "Smažte tento pracovní prostor a všechna jeho data. Toto smaže pracovní prostor pro všechny uživatele.",
      delete: "Smazat pracovní prostor",
      deleting: "Mazání pracovního prostoru...",
      "confirm-start": "Chystáte se smazat celý",
      "confirm-end":
        "pracovní prostor. Toto odstraní všechny vektorové embeddingy ve vaší vektorové databázi.\n\nPůvodní zdrojové soubory zůstanou nedotčeny. Tato akce je nevratná.",
    },
  },
  chat: {
    llm: {
      title: "Poskytovatel LLM pracovního prostoru",
      description:
        "Konkrétní poskytovatel LLM a model, který bude použit pro tento pracovní prostor. Ve výchozím nastavení používá systémového poskytovatele LLM a nastavení.",
      search: "Hledat všechny poskytovatele LLM",
    },
    model: {
      title: "Chatovací model pracovního prostoru",
      description:
        "Konkrétní chatovací model, který bude použit pro tento pracovní prostor. Pokud je prázdné, použije se systémová preference LLM.",
      wait: "-- čekání na modely --",
    },
    mode: {
      title: "Režim chatu",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start": "bude poskytovat odpovědi s obecnými znalostmi LLM",
        and: "a",
        "desc-end": "kontext dokumentu, který je nalezen.",
      },
      query: {
        title: "Dotaz",
        "desc-start": "bude poskytovat odpovědi",
        only: "pouze",
        "desc-end": "pokud je nalezen kontext dokumentu.",
      },
    },
    history: {
      title: "Historie chatu",
      "desc-start":
        "Počet předchozích chatů, které budou zahrnuty do krátkodobé paměti odpovědi.",
      recommend: "Doporučeno 20. ",
      "desc-end":
        "Více než 45 pravděpodobně povede k trvalým selháním chatu v závislosti na velikosti zprávy.",
    },
    prompt: {
      title: "Systémová výzva",
      description:
        "Výzva, která bude použita v tomto pracovním prostoru. Definujte kontext a pokyny pro AI k vygenerování odpovědi. Měli byste poskytnout pečlivě vytvořenou výzvu, aby AI mohla generovat relevantní a přesnou odpověď.",
      history: {
        title: "Historie systémových výzev",
        clearAll: "Vymazat vše",
        noHistory: "Žádná historie systémových výzev není k dispozici",
        restore: "Obnovit",
        delete: "Smazat",
        publish: "Publikovat do komunitního centra",
        deleteConfirm: "Jste si jisti, že chcete smazat tuto položku historie?",
        clearAllConfirm:
          "Jste si jisti, že chcete vymazat celou historii? Tato akce nelze vrátit zpět.",
        expand: "Rozbalit",
      },
    },
    refusal: {
      title: "Odpověď na odmítnutí v režimu dotazu",
      "desc-start": "V režimu",
      query: "dotazu",
      "desc-end":
        "možná budete chtít vrátit vlastní odpověď na odmítnutí, pokud není nalezen kontext.",
      "tooltip-title": "Proč to vidím?",
      "tooltip-description":
        "Jste v režimu dotazu, který používá pouze informace z vašich dokumentů. Přepněte na režim chatu pro flexibilnější konverzace, nebo klikněte sem a navštivte naši dokumentaci pro další informace o režimech chatu.",
    },
    temperature: {
      title: "Teplota LLM",
      "desc-start":
        'Toto nastavení řídí, jak "kreativní" budou odpovědi vašeho LLM.',
      "desc-end":
        "Vyšší číslo znamená kreativnější. U některých modelů to může vést k nesourodým odpovědím při nastavení příliš vysoko.",
      hint: "Většina LLM má různé přijatelné rozsahy platných hodnot. Poradťe se se svým poskytovatelem LLM pro tyto informace.",
    },
  },
  "vector-workspace": {
    identifier: "Identifikátor vektorové databáze",
    snippets: {
      title: "Maximum kontextových úryvků",
      description:
        "Toto nastavení řídí maximální množství kontextových úryvků, které budou odeslány do LLM pro každý chat nebo dotaz.",
      recommend: "Doporučeno: 4",
    },
    doc: {
      title: "Práh podobnosti dokumentů",
      description:
        "Minimální skóre podobnosti požadované pro zdroj, aby byl považován za související s chatem. Vyšší číslo znamená, že zdroj musí být více podobný chatu.",
      zero: "Žádné omezení",
      low: "Nízké (skóre podobnosti ≥ .25)",
      medium: "Střední (skóre podobnosti ≥ .50)",
      high: "Vysoké (skóre podobnosti ≥ .75)",
    },
    reset: {
      reset: "Resetovat vektorovou databázi",
      resetting: "Mazání vektorů...",
      confirm:
        "Chystáte se resetovat vektorovou databázi tohoto pracovního prostoru. Toto odstraní všechny vektorové embeddingy, které jsou momentálně vloženy.\n\nPůvodní zdrojové soubory zůstanou nedotčeny. Tato akce je nevratná.",
      error: "Vektorovou databázi pracovního prostoru se nepodařilo resetovat!",
      success: "Vektorová databáze pracovního prostoru byla resetována!",
    },
  },
  agent: {
    "performance-warning":
      "Výkon LLM, které explicitně nepodporují volání nástrojů, je silně závislý na schopnostech a přesnosti modelu. Některé schopnosti mohou být omezené nebo nefunkční.",
    provider: {
      title: "Poskytovatel LLM agenta pracovního prostoru",
      description:
        "Konkrétní poskytovatel LLM a model, který bude použit pro @agenta agenta tohoto pracovního prostoru.",
    },
    mode: {
      chat: {
        title: "Chatovací model agenta pracovního prostoru",
        description:
          "Konkrétní chatovací model, který bude použit pro @agenta agenta tohoto pracovního prostoru.",
      },
      title: "Model agenta pracovního prostoru",
      description:
        "Konkrétní model LLM, který bude použit pro @agenta agenta tohoto pracovního prostoru.",
      wait: "-- čekání na modely --",
    },
    skill: {
      title: "Výchozí dovednosti agenta",
      description:
        "Vylepšte přirozené schopnosti výchozího agenta pomocí těchto předpřipravených dovedností. Toto nastavení se vztahuje na všechny pracovní prostory.",
      rag: {
        title: "RAG a dlouhodobá paměť",
        description:
          'Umožněte agentovi využívat vaše místní dokumenty k odpovědi na dotaz nebo požádejte agenta, aby si "zapamatoval" části obsahu pro dlouhodobé načítání.',
      },
      view: {
        title: "Zobrazit a shrnout dokumenty",
        description:
          "Umožněte agentovi vypsat a shrnout obsah souborů pracovního prostoru, které jsou momentálně vloženy.",
      },
      scrape: {
        title: "Stahovat webové stránky",
        description:
          "Umožněte agentovi navštěvovat a stahovat obsah webových stránek.",
      },
      generate: {
        title: "Generovat grafy",
        description:
          "Umožněte výchozímu agentovi generovat různé typy grafů z dat poskytnutých nebo uvedených v chatu.",
      },
      save: {
        title: "Generovat a ukládat soubory",
        description:
          "Umožněte výchozímu agentovi generovat a zapisovat do souborů, které lze uložit do počítače.",
      },
      web: {
        title: "Živé webové vyhledávání a prohlížení",
        description:
          "Umožněte svému agentovi, aby prohledával internet a odpovídal na vaše otázky, propojením se poskytovatelem vyhledávacího servisu (SERP).",
      },
      sql: {
        title: "Připojení k databázi SQL",
        description:
          "Umožněte svému agentovi, aby mohl využívat SQL k zodpovězení vašich otázek, a to prostřednictvím připojení k různým poskytovatelům databází.",
      },
      default_skill:
        "Výchozí nastavení je, že tato schopnost je aktivní, ale můžete ji vypnout, pokud nechcete, aby ji mohl využít zástupce.",
    },
  },
  recorded: {
    title: "Chaty pracovních prostorů",
    description:
      "Toto jsou všechny zaznamenané chaty a zprávy, které odeslali uživatelé, seřazené podle data vytvoření.",
    export: "Exportovat",
    table: {
      id: "ID",
      by: "Odeslal",
      workspace: "Pracovní prostor",
      prompt: "Výzva",
      response: "Odpověď",
      at: "Odesláno v",
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
      title: "Předvolby rozhraní",
      description: "Nastavte své předvolby rozhraní pro AnythingLLM.",
    },
    branding: {
      title: "Značení a bílé označení",
      description:
        "Bílé označení instance AnythingLLM pomocí vlastního značení.",
    },
    chat: {
      title: "Chat",
      description: "Nastavte své předvolby chatu pro AnythingLLM.",
      auto_submit: {
        title: "Automatické odeslání hlasového vstupu",
        description: "Automaticky odeslat hlasový vstup po období ticha",
      },
      auto_speak: {
        title: "Automatické čtení odpovědí",
        description: "Automaticky číst odpovědi z AI",
      },
      spellcheck: {
        title: "Povolit kontrolu pravopisu",
        description:
          "Povolit nebo zakázat kontrolu pravopisu v poli vstupu chatu",
      },
    },
    items: {
      theme: {
        title: "Motiv",
        description: "Vyberte preferovaný barevný motiv pro aplikaci.",
      },
      "show-scrollbar": {
        title: "Zobrazit posuvník",
        description: "Povolit nebo zakázat posuvník v okně chatu.",
      },
      "support-email": {
        title: "E-mail podpory",
        description:
          "Nastavte e-mailovou adresu podpory, která má být přístupná uživatelům, když potřebují pomoc.",
      },
      "app-name": {
        title: "Název",
        description:
          "Nastavte název, který je zobrazen na přihlašovací stránce všem uživatelům.",
      },
      "chat-message-alignment": {
        title: "Zarovnání zpráv chatu",
        description:
          "Vyberte režim zarovnání zpráv při použití rozhraní chatu.",
      },
      "display-language": {
        title: "Zobrazovací jazyk",
        description:
          "Vyberte preferovaný jazyk pro vykreslení rozhraní AnythingLLM - pokud jsou k dispozici překlady.",
      },
      logo: {
        title: "Logo značky",
        description:
          "Nahrajte své vlastní logo k zobrazení na všech stránkách.",
        add: "Přidat vlastní logo",
        recommended: "Doporučená velikost: 800 x 200",
        remove: "Odebrat",
        replace: "Nahradit",
      },
      "welcome-messages": {
        title: "Uvítací zprávy",
        description:
          "Přizpůsobte uvítací zprávy zobrazené vašim uživatelům. Pouze neadministrátoři uvidí tyto zprávy.",
        new: "Nové",
        system: "systém",
        user: "uživatel",
        message: "zpráva",
        assistant: "Chatovací asistent AnythingLLM",
        "double-click": "Dvojitým kliknutím upravit...",
        save: "Uložit zprávy",
      },
      "browser-appearance": {
        title: "Vzhled prohlížeče",
        description:
          "Přizpůsobte vzhled karty prohlížeče a názvu, když je aplikace otevřena.",
        tab: {
          title: "Název",
          description:
            "Nastavte vlastní název karty, když je aplikace otevřena v prohlížeči.",
        },
        favicon: {
          title: "Favicon",
          description: "Použít vlastní favicon pro kartu prohlížeče.",
        },
      },
      "sidebar-footer": {
        title: "Položky zápatí postranního panelu",
        description:
          "Přizpůsobte položky zápatí zobrazené na spodní části postranního panelu.",
        icon: "Ikona",
        link: "Odkaz",
      },
      "render-html": {
        title: "Vykreslit HTML v chatu",
        description:
          "Vykreslit HTML odpovědi v odpovědích asistenta.\nTo může vést k mnohem vyšší věrnosti kvality odpovědi, ale může také vést k potenciálním bezpečnostním rizikům.",
      },
    },
  },
  api: {
    title: "API klíče",
    description:
      "API klíče umožňují držiteli programově přistupovat a spravovat tuto instanci AnythingLLM.",
    link: "Přečíst dokumentaci API",
    generate: "Generovat nový API klíč",
    table: {
      key: "API klíč",
      by: "Vytvořil",
      created: "Vytvořeno",
    },
  },
  llm: {
    title: "Preferovaný LLM",
    description:
      "Toto jsou přihlašovací údaje a nastavení pro vašeho preferovaného poskytovatele chatu a embeddingu LLM. Je důležité, aby tyto klíče byly aktuální a správné, jinak AnythingLLM nebude fungovat správně.",
    provider: "Poskytovatel LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Koncový bod služby Azure",
        api_key: "API klíč",
        chat_deployment_name: "Název nasazení chatu",
        chat_model_token_limit: "Limit tokenů chatovacího modelu",
        model_type: "Typ modelu",
        model_type_tooltip:
          "Pokud vaše nasazení používá model uvažování (o1, o1-mini, o3-mini atd.), nastavte to na 'Uvažování'. Jinak se vaše požadavky chatu mohou selhat.",
        default: "Výchozí",
        reasoning: "Uvažování",
      },
    },
  },
  transcription: {
    title: "Preferovaný model přepisu",
    description:
      "Toto jsou přihlašovací údaje a nastavení pro vašeho preferovaného poskytovatele modelu přepisu. Je důležité, aby tyto klíče byly aktuální a správné, jinak mediální soubory a audio nebudou přepisovány.",
    provider: "Poskytovatel přepisu",
    "warn-start":
      "Použití místního modelu whisper na strojích s omezenou RAM nebo CPU může zastavit AnythingLLM při zpracování mediálních souborů.",
    "warn-recommend": "Doporučujeme alespoň 2GB RAM a nahrávat soubory <10Mb.",
    "warn-end": "Vestavěný model se automaticky stáhne při prvním použití.",
  },
  embedding: {
    title: "Preferovaný embedding",
    "desc-start":
      "Při použití LLM, který nativně nepodporuje engine embeddingu - možná budete muset additionally uvést přihlašovací údaje pro embeddingování textu.",
    "desc-end":
      "Embedding je proces převodu textu na vektory. Tyto přihlašovací údaje jsou nutné k převodu vašich souborů a výzev do formátu, který AnythingLLM může použít ke zpracování.",
    provider: {
      title: "Poskytovatel embeddingu",
    },
  },
  text: {
    title: "Předvolby rozdělení a chunkování textu",
    "desc-start":
      "Někdy můžete chtít změnit výchozí způsob, jakým jsou nové dokumenty děleny a chunkovány před vložením do vaší vektorové databáze.",
    "desc-end":
      "Měli byste toto nastavení měnit pouze tehdy, pokud rozumíte, jak funguje rozdělení textu a jeho vedlejší účinky.",
    size: {
      title: "Velikost chunku textu",
      description:
        "Toto je maximální délka znaků, která může být přítomna v jednom vektoru.",
      recommend: "Maximální délka embeddingového modelu je",
    },
    overlap: {
      title: "Překrytí chunků textu",
      description:
        "Toto je maximální překrytí znaků, ke které dochází během chunkování mezi dvěma sousedními chunky textu.",
    },
  },
  vector: {
    title: "Vektorová databáze",
    description:
      "Toto jsou přihlašovací údaje a nastavení, jak bude vaše instance AnythingLLM fungovat. Je důležité, aby tyto klíče byly aktuální a správné.",
    provider: {
      title: "Poskytovatel vektorové databáze",
      description: "Pro LanceDB není potřeba žádná konfigurace.",
    },
  },
  embeddable: {
    title: "Vložitelné widgety chatu",
    description:
      "Vložitelné widgety chatu jsou veřejně orientovaná rozhraní chatu spojená s jedním pracovním prostorem. Tyto vám umožňují vytvářet pracovní prostory, které pak můžete zveřejnit světu.",
    create: "Vytvořit vložení",
    table: {
      workspace: "Pracovní prostor",
      chats: "Odeslané chaty",
      active: "Aktivní domény",
      created: "Vytvořeno",
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
    title: "Historie vložených chatů",
    export: "Exportovat",
    description:
      "Toto jsou všechny zaznamenané chaty a zprávy z jakéhokoli vložení, které jste zveřejnili.",
    table: {
      embed: "Vložení",
      sender: "Odesílatel",
      message: "Zpráva",
      response: "Odpověď",
      at: "Odesláno v",
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
    title: "Zabezpečení",
    multiuser: {
      title: "Režim více uživatelů",
      description:
        "Nastavte svou instanci pro podporu týmu aktivováním režimu více uživatelů.",
      enable: {
        "is-enable": "Režim více uživatelů je povolen",
        enable: "Povolit režim více uživatelů",
        description:
          "Ve výchozím nastavení budete jediným správcem. Jako správce budete muset vytvářet účty pro všechny nové uživatele nebo správce. Neztrácejte své heslo, protože pouze uživatel typu správce může resetovat hesla.",
        username: "Uživatelské jméno účtu správce",
        password: "Heslo účtu správce",
      },
    },
    password: {
      title: "Ochrana heslem",
      description:
        "Chraňte svou instanci AnythingLLM heslem. Pokud zapomenete, neexistuje způsob obnovení, proto se ujistěte, že heslo uložíte.",
      "password-label": "Heslo instance",
    },
  },
  event: {
    title: "Protokoly událostí",
    description:
      "Zobrazit všechny akce a události probíhající na této instanci pro sledování.",
    clear: "Vymazat protokoly událostí",
    table: {
      type: "Typ události",
      user: "Uživatel",
      occurred: "Nastalo v",
    },
  },
  privacy: {
    title: "Soukromí a zpracování dat",
    description:
      "Toto je vaše konfigurace, jak připojené třetí strany a AnythingLLM zpracovávají vaše data.",
    llm: "Poskytovatel LLM",
    embedding: "Preferovaný embedding",
    vector: "Vektorová databáze",
    anonymous: "Anonymní telemetrie je povolena",
  },
  connectors: {
    "search-placeholder": "Hledat datové konektory",
    "no-connectors": "Nebyly nalezeny žádné datové konektory.",
    obsidian: {
      name: "Obsidian",
      description: "Importovat trezor Obsidian jedním kliknutím.",
      vault_location: "Umístění trezoru",
      vault_description:
        "Vyberte složku trezoru Obsidian pro import všech poznámek a jejich spojení.",
      selected_files: "Nalezeno {{count}} souborů markdown",
      importing: "Importování trezoru...",
      import_vault: "Importovat trezor",
      processing_time:
        "To může chvíli trvat v závislosti na velikosti vašeho trezoru.",
      vault_warning:
        "Aby se předešlo konfliktům, ujistěte se, že váš trezor Obsidian není momentálně otevřen.",
    },
    github: {
      name: "Úložiště GitHub",
      description:
        "Importovat celé veřejné nebo soukromé úložiště GitHub jedním kliknutím.",
      URL: "URL úložiště GitHub",
      URL_explained: "URL úložiště GitHub, které chcete sbírat.",
      token: "Přístupový token GitHub",
      optional: "volitelné",
      token_explained: "Přístupový token pro prevenci omezení rychlosti.",
      token_explained_start: "Bez ",
      token_explained_link1: "Osobního přístupového tokenu",
      token_explained_middle:
        ", API GitHub může omezit počet souborů, které lze sbírat kvůli limitům rychlosti. Můžete ",
      token_explained_link2: "vytvořit dočasný přístupový token",
      token_explained_end: " k vyhnutí se tomuto problému.",
      ignores: "Ignorované soubory",
      git_ignore:
        "Seznam ve formátu .gitignore k ignorování specifických souborů během sbírání. Stiskněte Enter po každé položce, kterou chcete uložit.",
      task_explained:
        "Po dokončení budou všechny soubory k dispozici pro vložení do pracovních prostorů ve výběru dokumentů.",
      branch: "Větev, ze které chcete sbírat soubory",
      branch_loading: "-- načítání dostupných větví --",
      branch_explained: "Větev, ze které chcete sbírat soubory.",
      token_information:
        "Bez vyplnění <b>Přístupového tokenu GitHub</b> bude tento datový konektor schopen sbírat pouze <b>nejvyšší úrovňové</b> soubory úložiště kvůli omezením veřejného API GitHub.",
      token_personal:
        "Získejte bezplatný osobní přístupový token s účtem GitHub zde.",
    },
    gitlab: {
      name: "Úložiště GitLab",
      description:
        "Importovat celé veřejné nebo soukromé úložiště GitLab jedním kliknutím.",
      URL: "URL úložiště GitLab",
      URL_explained: "URL úložiště GitLab, které chcete sbírat.",
      token: "Přístupový token GitLab",
      optional: "volitelné",
      token_explained: "Přístupový token pro prevenci omezení rychlosti.",
      token_description: "Vyberte další entity k načtení z API GitLab.",
      token_explained_start: "Bez ",
      token_explained_link1: "Osobního přístupového tokenu",
      token_explained_middle:
        ", API GitLab může omezit počet souborů, které lze sbírat kvůli limitům rychlosti. Můžete ",
      token_explained_link2: "vytvořit dočasný přístupový token",
      token_explained_end: " k vyhnutí se tomuto problému.",
      fetch_issues: "Načíst problémy jako dokumenty",
      ignores: "Ignorované soubory",
      git_ignore:
        "Seznam ve formátu .gitignore k ignorování specifických souborů během sbírání. Stiskněte Enter po každé položce, kterou chcete uložit.",
      task_explained:
        "Po dokončení budou všechny soubory k dispozici pro vložení do pracovních prostorů ve výběru dokumentů.",
      branch: "Větev, ze které chcete sbírat soubory",
      branch_loading: "-- načítání dostupných větví --",
      branch_explained: "Větev, ze které chcete sbírat soubory.",
      token_information:
        "Bez vyplnění <b>Přístupového tokenu GitLab</b> bude tento datový konektor schopen sbírat pouze <b>nejvyšší úrovňové</b> soubory úložiště kvůli omezením veřejného API GitLab.",
      token_personal:
        "Získejte bezplatný osobní přístupový token s účtem GitLab zde.",
    },
    youtube: {
      name: "Přepis YouTube",
      description: "Importovat přepis celého videa YouTube z odkazu.",
      URL: "URL videa YouTube",
      URL_explained_start:
        "Zadejte URL jakéhokoli videa YouTube pro stažení jeho přepisu. Video musí mít ",
      URL_explained_link: "uzavřené titulky",
      URL_explained_end: " k dispozici.",
      task_explained:
        "Po dokončení bude přepis k dispozici pro vložení do pracovních prostorů ve výběru dokumentů.",
      language: "Jazyk přepisu",
      language_explained: "Vyberte jazyk přepisu, který chcete sbírat.",
      loading_languages: "-- načítání dostupných jazyků --",
    },
    "website-depth": {
      name: "Hromadný stahovač odkazů",
      description:
        "Stáhnout webovou stránku a její pododkazy až do určité hloubky.",
      URL: "URL webové stránky",
      URL_explained: "URL webové stránky, kterou chcete stáhnout.",
      depth: "Hloubka stahování",
      depth_explained:
        "Toto je počet pododkazů, které má pracovník následovat z původní URL.",
      max_pages: "Maximum stránek",
      max_pages_explained: "Maximální počet odkazů ke stažení.",
      task_explained:
        "Po dokončení bude veškerý stažený obsah k dispozici pro vložení do pracovních prostorů ve výběru dokumentů.",
    },
    confluence: {
      name: "Confluence",
      description: "Importovat celou stránku Confluence jedním kliknutím.",
      deployment_type: "Typ nasazení Confluence",
      deployment_type_explained:
        "Určete, zda je vaše instance Conference hostována na cloudu Atlassian nebo sama hostovaná.",
      base_url: "Základní URL Confluence",
      base_url_explained: "Toto je základní URL vašeho prostoru Confluence.",
      space_key: "Klíč prostoru Confluence",
      space_key_explained:
        "Toto je klíč prostoru vaší instance Confluence, který bude použit. Obvykle začíná s ~",
      username: "Uživatelské jméno Confluence",
      username_explained: "Vaše uživatelské jméno Confluence",
      auth_type: "Typ ověření Confluence",
      auth_type_explained:
        "Vyberte typ ověření, který chcete použít pro přístup ke svým stránkám Confluence.",
      auth_type_username: "Uživatelské jméno a přístupový token",
      auth_type_personal: "Osobní přístupový token",
      token: "Přístupový token Confluence",
      token_explained_start:
        "Musíte poskytnout přístupový token pro ověření. Můžete vygenerovat přístupový token",
      token_explained_link: "zde",
      token_desc: "Přístupový token pro ověření",
      pat_token: "Osobní přístupový token Confluence",
      pat_token_explained: "Váš osobní přístupový token Confluence.",
      bypass_ssl: "Obejití ověření certifikátu SSL",
      bypass_ssl_explained:
        "Povolte tuto možnost k obejití ověření certifikátu SSL pro samo-hostované instance Confluence s vlastnoručně podepsaným certifikátem",
      task_explained:
        "Po dokončení bude obsah stránky k dispozici pro vložení do pracovních prostorů ve výběru dokumentů.",
    },
    manage: {
      documents: "Dokumenty",
      "data-connectors": "Datové konektory",
      "desktop-only":
        "Úprava těchto nastavení je k dispozici pouze na stolním zařízení. Chcete-li pokračovat, přístupujte na tuto stránku na svém stolním počítači.",
      dismiss: "Odmítnout",
      editing: "Úprava",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Mé dokumenty",
      "new-folder": "Nová složka",
      "search-document": "Hledat dokument",
      "no-documents": "Žádné dokumenty",
      "move-workspace": "Přesunout do pracovního prostoru",
      name: "Název",
      "delete-confirmation":
        "Jste si jisti, že chcete smazat tyto soubory a složky?\nToto odstraní soubory ze systému a automaticky je odstraní ze všech existujících pracovních prostorů.\nTato akce je nevratná.",
      "removing-message":
        "Odstraňování {{count}} dokumentů a {{folderCount}} složek. Prosím čekejte.",
      "move-success": "Úspěšně přesunuto {{count}} dokumentů.",
      date: "Datum",
      type: "Typ",
      no_docs: "Žádné dokumenty",
      select_all: "Vybrat vše",
      deselect_all: "Zrušit výběr všeho",
      remove_selected: "Odebrat vybrané",
      costs: "*Jednorázové náklady pro embeddingy",
      save_embed: "Uložit a vložit",
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
      "processor-offline": "Procesor dokumentů nedostupný",
      "processor-offline-desc":
        "Nemůžeme nahrát vaše soubory právě teď, protože procesor dokumentů je offline. Zkuste to prosím později.",
      "click-upload": "Klikněte pro nahrání nebo přetažení a upuštění",
      "file-types":
        "podporuje textové soubory, csv, tabulky, zvukové soubory a další!",
      "or-submit-link": "nebo odeslat odkaz",
      "placeholder-link": "https://example.com",
      fetching: "Načítání...",
      "fetch-website": "Stáhnout webovou stránku",
      "privacy-notice":
        "Tyto soubory budou nahrány na procesor dokumentů běžící na této instanci AnythingLLM. Tyto soubory nejsou odesílány nebo sdíleny s třetí stranou.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Co je připínání dokumentů?",
      pin_explained_block1:
        "Když <b>připnete</b> dokument v AnythingLLM, vložíme celý obsah dokumentu do vašeho okna výzvy, aby ho LLM plně pochopil.",
      pin_explained_block2:
        "To funguje nejlépe s <b>modely s velkým kontextem</b> nebo malými soubory, které jsou kritické pro jejich znalostní základ.",
      pin_explained_block3:
        "Pokud nedostáváte odpovědi, které si přejete od AnythingLLM ve výchozím nastavení, pak připínání je skvělý způsob získání kvalitnějších odpovědí jedním kliknutím.",
      accept: "OK, rozumím",
    },
    watching: {
      what_watching: "Co dělá sledování dokumentu?",
      watch_explained_block1:
        "Když <b>sledujete</b> dokument v AnythingLLM, <i>automaticky</i> synchronizujeme obsah dokumentu z jeho původního zdroje v pravidelných intervalech. Tím se automaticky aktualizuje obsah v každém pracovním prostoru, kde je tento soubor spravován.",
      watch_explained_block2:
        "Tato funkce v současné době podporuje onlineový obsah a nebude k dispozici pro ručně nahrané dokumenty.",
      watch_explained_block3_start:
        "Můžete spravovat, které dokumenty jsou sledovány z ",
      watch_explained_block3_link: "Správce souborů",
      watch_explained_block3_end: " zobrazení správce.",
      accept: "OK, rozumím",
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
    welcome: "Vítejte ve svém novém pracovním prostoru.",
    get_started: "Začněte buď",
    get_started_default: "Začněte",
    upload: "nahrát dokument",
    or: "nebo",
    attachments_processing: "Přílohy se zpracovávají. Prosím čekejte...",
    send_chat: "odeslat chat.",
    send_message: "Odeslat zprávu",
    attach_file: "Přiložit soubor k tomuto chatu",
    slash: "Zobrazit všechny dostupné lomítkové příkazy pro chatování.",
    agents:
      "Zobrazit všechny dostupné agenty, které můžete použít pro chatování.",
    start_agent_session: "Start agent session",
    text_size: "Změnit velikost textu.",
    microphone: "Mluvit svou výzvu.",
    send: "Odeslat zprávu výzvy do pracovního prostoru",
    tts_speak_message: "TTS Číst zprávu",
    copy: "Kopírovat",
    regenerate: "Regenerovat",
    regenerate_response: "Regenerovat odpověď",
    good_response: "Dobrá odpověď",
    more_actions: "Další akce",
    hide_citations: "Skrýt citace",
    show_citations: "Zobrazit citace",
    sources: "Zdroje",
    source_count_one: "{{count}} – odkaz",
    source_count_other: "{{count}} – odkazy",
    document: "Dokument",
    similarity_match: "zápas",
    pause_tts_speech_message: "Pozastavit TTS čtení zprávy",
    fork: "Rozdělit",
    delete: "Smazat",
    save_submit: "Uložit a odeslat",
    cancel: "Zrušit",
    submit: "Odeslat",
    edit_prompt: "Upravit výzvu",
    edit_response: "Upravit odpověď",
    edit_info_user:
      "„Odeslat“ znovu vygeneruje odpověď od AI. „Uložit“ aktualizuje pouze vaši zprávu.",
    edit_info_assistant: "Vaše změny budou uloženy přímo v tomto odpovědi.",
    see_less: "Zobrazit méně",
    see_more: "Více",
    at_agent: "@agent",
    default_agent_description: " - výchozí agent pro tento pracovní prostor.",
    custom_agents_coming_soon: "vlastní agenti přicházejí brzy!",
    preset_reset_description: "Vymazat historii chatu a začít nový chat",
    preset_exit_description: "Zastavte aktuální relaci s agentem",
    add_new_preset: " Přidat novou předvolbu",
    add_new: "Přidat nové",
    edit: "Upravit",
    publish: "Publikovat",
    stop_generating: "Zastavte generování odpovědi",
    command: "Příkaz",
    your_command: "váš-příkaz",
    placeholder_prompt: "Toto je obsah, který bude vložen před vaší výzvou.",
    description: "Popis",
    placeholder_description: "Odpovídá básní o LLM.",
    save: "Uložit",
    small: "Malé",
    normal: "Normální",
    large: "Velké",
    tools: "Nářadí",
    slash_commands: "Příkazy (skratky)",
    agent_skills: "Dovednosti agenta",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Prohlédněte si",
    text_size_label: "Velikost písma",
    select_model: "Vyberte model",
    workspace_llm_manager: {
      search: "Hledat poskytovatele LLM",
      loading_workspace_settings: "Načítání nastavení pracovního prostoru...",
      available_models: "Dostupné modely pro {{provider}}",
      available_models_description:
        "Vyberte model k použití pro tento pracovní prostor.",
      save: "Použít tento model",
      saving: "Nastavování modelu jako výchozího pro pracovní prostor...",
      missing_credentials: "Tomuto poskytovateli chybí přihlašovací údaje!",
      missing_credentials_description:
        "Klikněte pro nastavení přihlašovacích údajů",
    },
  },
  profile_settings: {
    edit_account: "Upravit účet",
    profile_picture: "Profilový obrázek",
    remove_profile_picture: "Odebrat profilový obrázek",
    username: "Uživatelské jméno",
    new_password: "Nové heslo",
    password_description: "Heslo musí mít délku alespoň 8 znaků",
    cancel: "Zrušit",
    update_account: "Aktualizovat účet",
    theme: "Preferovaný motiv",
    language: "Preferovaný jazyk",
    failed_upload: "Nepodařilo se nahrát profilový obrázek: {{error}}",
    upload_success: "Profilový obrázek nahrán.",
    failed_remove: "Nepodařilo se odebrat profilový obrázek: {{error}}",
    profile_updated: "Profil aktualizován.",
    failed_update_user: "Nepodařilo se aktualizovat uživatele: {{error}}",
    account: "Účet",
    support: "Podpora",
    signout: "Odhlásit",
  },
  "keyboard-shortcuts": {
    title: "Klávesové zkratky",
    shortcuts: {
      settings: "Otevřít nastavení",
      workspaceSettings: "Otevřít nastavení aktuálního pracovního prostoru",
      home: "Přejít domů",
      workspaces: "Spravovat pracovní prostory",
      apiKeys: "Nastavení API klíčů",
      llmPreferences: "Preference LLM",
      chatSettings: "Nastavení chatu",
      help: "Zobrazit nápovědu klávesových zkratek",
      showLLMSelector: "Zobrazit výběr LLM pracovního prostoru",
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
        success_title: "Úspěch!",
        success_description:
          "Vaše systémová výzva byla publikována do komunitního centra!",
        success_thank_you: "Děkujeme za sdílení s komunitou!",
        view_on_hub: "Zobrazit v komunitním centru",
        modal_title: "Publikovat systémovou výzvu",
        name_label: "Název",
        name_description: "Toto je zobrazovaný název vaší systémové výzvy.",
        name_placeholder: "Moje systémová výzva",
        description_label: "Popis",
        description_description:
          "Toto je popis vaší systémové výzvy. Použijte k popisu účelu vaší systémové výzvy.",
        tags_label: "Štítky",
        tags_description:
          "Štítky slouží k označení vaší systémové výzvy pro snadnější vyhledávání. Můžete přidat více štítků. Max 5 štítků. Max 20 znaků na štítek.",
        tags_placeholder: "Zadejte a stiskněte Enter pro přidání štítků",
        visibility_label: "Viditelnost",
        public_description: "Veřejné systémové výzvy jsou viditelné všem.",
        private_description:
          "Soukromé systémové výzvy jsou viditelné pouze vám.",
        publish_button: "Publikovat do komunitního centra",
        submitting: "Publikování...",
        submit: "Publikovat do komunitního centra",
        prompt_label: "Výzva",
        prompt_description:
          "Toto je skutečná systémová výzva, která bude použita k vedení LLM.",
        prompt_placeholder: "Zadejte svou systémovou výzvu zde...",
      },
      agent_flow: {
        public_description: "Veřejné toky agentů jsou viditelné všem.",
        private_description: "Soukromé toky agentů jsou viditelné pouze vám.",
        success_title: "Úspěch!",
        success_description:
          "Váš tok agenta byl publikován do komunitního centra!",
        success_thank_you: "Děkujeme za sdílení s komunitou!",
        view_on_hub: "Zobrazit v komunitním centru",
        modal_title: "Publikovat tok agenta",
        name_label: "Název",
        name_description: "Toto je zobrazovaný název vašeho toku agenta.",
        name_placeholder: "Můj tok agenta",
        description_label: "Popis",
        description_description:
          "Toto je popis vašeho toku agenta. Použijte k popisu účelu vašeho toku agenta.",
        tags_label: "Štítky",
        tags_description:
          "Štítky slouží k označení vašeho toku agenta pro snadnější vyhledávání. Můžete přidat více štítků. Max 5 štítků. Max 20 znaků na štítek.",
        tags_placeholder: "Zadejte a stiskněte Enter pro přidání štítků",
        visibility_label: "Viditelnost",
        publish_button: "Publikovat do komunitního centra",
        submitting: "Publikování...",
        submit: "Publikovat do komunitního centra",
        privacy_note:
          "Toky agentů jsou vždy nahrávány jako soukromé pro ochranu jakýchkoli citlivých dat. Viditelnost můžete změnit v komunitním centru po publikování. Prosím ověřte, že váš tok neobsahuje žádné citlivé nebo soukromé informace před publikováním.",
      },
      slash_command: {
        success_title: "Úspěch!",
        success_description:
          "Váš lomítkový příkaz byl publikován do komunitního centra!",
        success_thank_you: "Děkujeme za sdílení s komunitou!",
        view_on_hub: "Zobrazit v komunitním centru",
        modal_title: "Publikovat lomítkový příkaz",
        name_label: "Název",
        name_description:
          "Toto je zobrazovaný název vašeho lomítkového příkazu.",
        name_placeholder: "Můj lomítkový příkaz",
        description_label: "Popis",
        description_description:
          "Toto je popis vašeho lomítkového příkazu. Použijte k popisu účelu vašeho lomítkového příkazu.",
        command_label: "Příkaz",
        command_description:
          "Toto je lomítkový příkaz, který uživatelé zadají pro spuštění této předvolby.",
        command_placeholder: "můj-příkaz",
        tags_label: "Štítky",
        tags_description:
          "Štítky slouží k označení vašeho lomítkového příkazu pro snadnější vyhledávání. Můžete přidat více štítků. Max 5 štítků. Max 20 znaků na štítek.",
        tags_placeholder: "Zadejte a stiskněte Enter pro přidání štítků",
        visibility_label: "Viditelnost",
        public_description: "Veřejné lomítkové příkazy jsou viditelné všem.",
        private_description:
          "Soukromé lomítkové příkazy jsou viditelné pouze vám.",
        publish_button: "Publikovat do komunitního centra",
        submitting: "Publikování...",
        prompt_label: "Výzva",
        prompt_description:
          "Toto je výzva, která bude použita při spuštění lomítkového příkazu.",
        prompt_placeholder: "Zadejte svou výzvu zde...",
      },
      generic: {
        unauthenticated: {
          title: "Vyžadováno ověření",
          description:
            "Musíte se ověřit pomocí komunitního centra AnythingLLM před publikováním položek.",
          button: "Připojit se ke komunitnímu centru",
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
