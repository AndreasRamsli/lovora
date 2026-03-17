const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Velkommen til",
      getStarted: "Kom godt i gang",
    },
    llm: {
      title: "LLM-præference",
      description:
        "AnythingLLM kan arbejde med mange LLM-udbydere. Dette vil være den tjeneste, der håndterer chat.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Brugeropsætning",
      description: "Konfigurer dine brugerindstillinger.",
      howManyUsers: "Hvor mange brugere vil benytte denne instans?",
      justMe: "Kun mig",
      myTeam: "Mit team",
      instancePassword: "Instansadgangskode",
      setPassword: "Vil du oprette en adgangskode?",
      passwordReq: "Adgangskoder skal være på mindst 8 tegn.",
      passwordWarn:
        "Det er vigtigt at gemme denne adgangskode, da der ikke findes nogen metode til genoprettelse.",
      adminUsername: "Brugernavn til admin-konto",
      adminPassword: "Adgangskode til admin-konto",
      adminPasswordReq: "Adgangskoder skal være på mindst 8 tegn.",
      teamHint:
        "Som standard vil du være den eneste administrator. Når onboarding er fuldført, kan du oprette og invitere andre til at blive brugere eller administratorer. Glem ikke din adgangskode, da kun administratorer kan nulstille adgangskoder.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Datahåndtering & Privatliv",
      description:
        "Vi er forpligtet til gennemsigtighed og kontrol, når det gælder dine persondata.",
      settingsHint:
        "Disse indstillinger kan ændres når som helst under indstillingerne.",
    },
    survey: {
      title: "Velkommen til AnythingLLM",
      description:
        "Hjælp os med at gøre AnythingLLM tilpasset dine behov. Valgfrit.",
      email: "Hvad er din e-mail?",
      useCase: "Hvad vil du bruge AnythingLLM til?",
      useCaseWork: "Til arbejde",
      useCasePersonal: "Til personligt brug",
      useCaseOther: "Andet",
      comment: "Hvordan hørte du om AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, etc. - Fortæl os, hvordan du fandt os!",
      skip: "Spring undersøgelsen over",
      thankYou: "Tak for din feedback!",
    },
    workspace: {
      title: "Opret dit første arbejdsområde",
      description:
        "Opret dit første arbejdsområde og kom i gang med AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Navn på arbejdsområder",
    error: "fejl",
    success: "succes",
    user: "Bruger",
    selection: "Modelvalg",
    saving: "Gemmer...",
    save: "Gem ændringer",
    previous: "Forrige side",
    next: "Næste side",
    optional: "Valgfrit",
    yes: "Ja",
    no: "Nej",
    search: "Søg",
    username_requirements:
      "Brugernavnet skal bestå af 2-32 tegn, starte med et lille bogstav, og kun indeholde små bogstaver, tal, understregninger, bindestreger og punktummer.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Velkommen",
    chooseWorkspace: "Vælg et arbejdsområde for at starte at chatte!",
    notAssigned:
      "Du er ikke tildelt til nogen arbejdsområder.\nKontakt din administrator for at anmode om adgang til et arbejdsområde.",
    goToWorkspace: 'Gå til "{{workspace}}"',
  },
  settings: {
    title: "Instansindstillinger",
    system: "Generelle indstillinger",
    invites: "Invitationer",
    users: "Brugere",
    workspaces: "Arbejdsområder",
    "workspace-chats": "Arbejdsområde-chat",
    customization: "Tilpasning",
    interface: "Brugerpræferencer",
    branding: "Brandstrategi og white-labeling",
    chat: "Chat",
    "api-keys": "Udvikler API",
    llm: "LLM",
    transcription: "Transskription",
    embedder: "Indlejring",
    "text-splitting": "Tekst-splitter og opdeling",
    "voice-speech": "Stemme & Tale",
    "vector-database": "Vektordatabase",
    embeds: "Chat-indlejring",
    "embed-chats": "Historik for chat-indlejringer",
    security: "Sikkerhed",
    "event-logs": "Hændelseslog",
    privacy: "Privatliv & Data",
    "ai-providers": "AI-udbydere",
    "agent-skills": "Agentfærdigheder",
    "community-hub": {
      title: "Fælleshus",
      trending: "Udforsk populære emner",
      "your-account": "Dit konti",
      "import-item": "Importeret vare",
    },
    admin: "Administrator",
    tools: "Værktøjer",
    "system-prompt-variables":
      "System Prompt Variables\n\nSystem Prompt Variabler",
    "experimental-features": "Eksperimentelle funktioner",
    contact: "Kontakt support",
    "browser-extension": "Browserudvidelse",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Velkommen til",
      "placeholder-username": "Brugernavn",
      "placeholder-password": "Adgangskode",
      login: "Log ind",
      validating: "Validerer...",
      "forgot-pass": "Glemt adgangskode",
      reset: "Nulstil",
    },
    "sign-in": "Log ind på din {{appName}} konto.",
    "password-reset": {
      title: "Nulstilling af adgangskode",
      description:
        "Angiv de nødvendige oplysninger nedenfor for at nulstille din adgangskode.",
      "recovery-codes": "Gendannelseskoder",
      "recovery-code": "Gendannelseskode {{index}}",
      "back-to-login": "Tilbage til log ind",
    },
  },
  "main-page": {
    greeting: "Hvordan kan jeg hjælpe dig i dag?",
    noWorkspaceError:
      "Vær venligst oprettet et arbejdsområde, før du starter en samtale.",
    checklist: {
      title: "Sådan kommer du i gang",
      tasksLeft: "Udførte opgaver\n\nUdførte opgaver",
      completed: "Du er på vej til at blive en ekspert i AnythingLLM!",
      dismiss: "luk",
      tasks: {
        create_workspace: {
          title: "Opret et arbejdsområde",
          description: "Opret dit første arbejdsområde for at komme i gang.",
          action: "Opret",
        },
        send_chat: {
          title: "Send en besked",
          description:
            "Start a conversation with your AI assistant\n\nStart en samtale med din AI-assistent",
          action: "Chat",
        },
        embed_document: {
          title: "Indsæt et dokument",
          description: "Tilføj dit første dokument til dit arbejdsområde.",
          action: "Indlejre",
        },
        setup_system_prompt: {
          title: "Opret et system prompt",
          description: "Konfigurer din AI-assistent's adfærd",
          action: "Opsætning",
        },
        define_slash_command: {
          title: "Definér en kommando med et skråtegn",
          description: "Opret brugerdefinerede kommandoer til din assistent",
          action: "Definér",
        },
        visit_community: {
          title: "Besøg Community Hub",
          description: "Udforsk lokale ressourcer og skabeloner",
          action: "Udforsk",
        },
      },
    },
    quickActions: {
      createAgent: "Opret en agent",
      editWorkspace: "Rediger arbejdsområdet",
      uploadDocument: "Upload en fil",
    },
    quickLinks: {
      title: "Hurtige links",
      sendChat: "Send chat",
      embedDocument: "Indsæt et dokument",
      createWorkspace: "Opret arbejdsområde",
    },
    exploreMore: {
      title: "Udforsk flere funktioner",
      features: {
        customAgents: {
          title:
            "Skræddersyede AI-agenter\n\nCustom AI Agents\n\nSkræddersyede AI-agenter",
          description:
            "Opret kraftfulde AI-agenter og automatiseringer uden kode.",
          primaryAction:
            "Brug chatfunktionen til at kommunikere med agenten.\n\nBrug chatfunktionen til at kommunikere med agenten.",
          secondaryAction: "Opret en agentflow",
        },
        slashCommands: {
          title: "Slash-kommandoer",
          description:
            "Spar tid og indsæt kommandoer ved hjælp af brugerdefinerede kommandoer.",
          primaryAction: "Opret en Slash-kommando",
          secondaryAction: "Udforsk på Hub",
        },
        systemPrompts: {
          title: "System Prompts\n\nSystem prompts",
          description:
            "Tilpas systemprompten for at tilpasse AI's svar i et arbejdsområde.",
          primaryAction: "Rediger en systemprompt",
          secondaryAction: "Administrer variabler",
        },
      },
    },
    announcements: {
      title: "Opdateringer og meddelelser",
    },
    resources: {
      title: "Ressourcer",
      links: {
        docs: "Dokumenter",
        star: "Stjerne på GitHub",
      },
      keyboardShortcuts: "Tastaturgenveje",
    },
  },
  "new-workspace": {
    title: "Nyt arbejdsområde",
    placeholder: "Mit arbejdsområde",
  },
  "workspaces—settings": {
    general: "Generelle indstillinger",
    chat: "Chatindstillinger",
    vector: "Vektordatabase",
    members: "Medlemmer",
    agent: "Agentkonfiguration",
  },
  general: {
    vector: {
      title: "Antal vektorer",
      description: "Samlet antal vektorer i din vektordatabase.",
    },
    names: {
      description: "Dette vil kun ændre visningsnavnet på dit arbejdsområde.",
    },
    message: {
      title: "Foreslåede chatbeskeder",
      description:
        "Tilpas de beskeder, der vil blive foreslået til brugerne af dit arbejdsområde.",
      add: "Tilføj ny besked",
      save: "Gem beskeder",
      heading: "Forklar mig",
      body: "fordelene ved AnythingLLM",
    },
    pfp: {
      title: "Assistentens profilbillede",
      description: "Tilpas assistentens profilbillede for dette arbejdsområde.",
      image: "Arbejdsområdebillede",
      remove: "Fjern arbejdsområdebillede",
    },
    delete: {
      title: "Slet arbejdsområde",
      description:
        "Slet dette arbejdsområde og alle dets data. Dette vil slette arbejdsområdet for alle brugere.",
      delete: "Slet arbejdsområde",
      deleting: "Sletter arbejdsområde...",
      "confirm-start": "Du er ved at slette dit hele",
      "confirm-end":
        "arbejdsområde. Dette vil fjerne alle vektor-indlejringer i din vektordatabase.\n\nDe oprindelige kildefiler forbliver uberørte. Denne handling kan ikke fortrydes.",
    },
  },
  chat: {
    llm: {
      title: "Arbejdsområdets LLM-udbyder",
      description:
        "Den specifikke LLM-udbyder og -model, der vil blive brugt for dette arbejdsområde. Som standard anvendes systemets LLM-udbyder og indstillinger.",
      search: "Søg blandt alle LLM-udbydere",
    },
    model: {
      title: "Arbejdsområdets chatmodel",
      description:
        "Den specifikke chatmodel, der vil blive brugt for dette arbejdsområde. Hvis tom, anvendes systemets LLM-præference.",
      wait: "-- venter på modeller --",
    },
    mode: {
      title: "Chat-tilstand",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start": "vil give svar baseret på LLM'ens generelle viden",
        and: "og",
        "desc-end": "dokumentkontekst der findes.",
      },
      query: {
        title: "Forespørgsel",
        "desc-start": "vil give svar",
        only: "kun",
        "desc-end": "hvis dokumentkontekst findes.",
      },
    },
    history: {
      title: "Chat-historik",
      "desc-start":
        "Antallet af tidligere chats, der vil blive inkluderet i svarens korttidshukommelse.",
      recommend: "Anbefal 20. ",
      "desc-end":
        "Alt over 45 kan sandsynligvis føre til gentagne chat-fejl afhængigt af beskedstørrelsen.",
    },
    prompt: {
      title: "Prompt",
      description:
        "Prompten, der vil blive brugt i dette arbejdsområde. Definér konteksten og instruktionerne til, at AI'en kan generere et svar. Du bør levere en omhyggeligt udformet prompt, så AI'en kan generere et relevant og præcist svar.",
      history: {
        title:
          "System Prompt History\n\nHistorikken over system prompts er gemt i en fil, der er placeret i din lokale mappe.\nDu kan få adgang til historikken ved at åbne filen og læse indholdet.\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt\n<|file_name|>system_prompt_history.txt",
        clearAll: "Ryd alt",
        noHistory: "Ingen historik over systemprompt er tilgængelig.",
        restore: "Genopret",
        delete: "Slet",
        publish: "Publicer på Community Hub",
        deleteConfirm:
          "Er du sikker på, at du vil slette dette historikelement?",
        clearAllConfirm:
          "Er du sikker på, at du vil slette al historik? Denne handling kan ikke fortrydes.",
        expand: "Udvid",
      },
    },
    refusal: {
      title: "Afvisningssvar for forespørgsels-tilstand",
      "desc-start": "Når du er i",
      query: "forespørgsels-tilstand",
      "desc-end":
        "tilstand, kan du vælge at returnere et brugerdefineret afvisningssvar, når der ikke findes nogen kontekst.",
      "tooltip-title": "Hvorfor ser jeg dette?",
      "tooltip-description":
        "Du er i forespørgselsmodus, hvilket kun bruger information fra dine dokumenter. Skift til chat-modus for mere fleksible samtaler, eller klik her for at besøge vores dokumentation og lære mere om chat-moduser.",
    },
    temperature: {
      title: "LLM-temperatur",
      "desc-start":
        'Denne indstilling styrer, hvor "kreative" dine LLM-svar vil være.',
      "desc-end":
        "Jo højere tallet er, desto mere kreative bliver svarene. For nogle modeller kan for høje værdier føre til usammenhængende svar.",
      hint: "De fleste LLM'er har forskellige acceptable intervaller for gyldige værdier. Konsulter din LLM-udbyder for den information.",
    },
  },
  "vector-workspace": {
    identifier: "Identifikator for vektordatabase",
    snippets: {
      title: "Maksimalt antal kontekstuddrag",
      description:
        "Denne indstilling styrer det maksimale antal kontekstuddrag, der vil blive sendt til LLM'en pr. chat eller forespørgsel.",
      recommend: "Anbefalet: 4",
    },
    doc: {
      title: "Tærskel for dokuments lighed",
      description:
        "Den minimale lighedsscore, der kræves for, at en kilde betragtes som relateret til chatten. Jo højere tallet er, desto mere lig skal kilden være chatten.",
      zero: "Ingen begrænsning",
      low: "Lav (lighedsscore ≥ 0,25)",
      medium: "Middel (lighedsscore ≥ 0,50)",
      high: "Høj (lighedsscore ≥ 0,75)",
    },
    reset: {
      reset: "Nulstil vektordatabase",
      resetting: "Rydder vektorer...",
      confirm:
        "Du er ved at nulstille dette arbejdsområdes vektordatabase. Dette vil fjerne alle vektor-indlejringer, der aktuelt er indlejret.\n\nDe oprindelige kildefiler forbliver uberørte. Denne handling kan ikke fortrydes.",
      error: "Kunne ikke nulstille arbejdsområdets vektordatabase!",
      success: "Arbejdsområdets vektordatabase blev nulstillet!",
    },
  },
  agent: {
    "performance-warning":
      "Ydeevnen for LLM'er, der ikke eksplicit understøtter værktøjskald, er i høj grad afhængig af modellens kapacitet og nøjagtighed. Nogle funktioner kan være begrænsede eller ikke-fungerende.",
    provider: {
      title: "Arbejdsområdets agent LLM-udbyder",
      description:
        "Den specifikke LLM-udbyder og -model, der vil blive brugt for dette arbejdsområdes @agent-agent.",
    },
    mode: {
      chat: {
        title: "Arbejdsområdets agent chatmodel",
        description:
          "Den specifikke chatmodel, der vil blive brugt for dette arbejdsområdes @agent-agent.",
      },
      title: "Arbejdsområdets agentmodel",
      description:
        "Den specifikke LLM-model, der vil blive brugt for dette arbejdsområdes @agent-agent.",
      wait: "-- venter på modeller --",
    },
    skill: {
      title: "Standard agentfærdigheder",
      description:
        "Forbedr standardagentens naturlige evner med disse forudbyggede færdigheder. Denne opsætning gælder for alle arbejdsområder.",
      rag: {
        title: "RAG & langtidshukommelse",
        description:
          'Giv agenten mulighed for at udnytte dine lokale dokumenter til at besvare en forespørgsel eller få agenten til at "huske" dele af indhold for langtidshukommelse.',
      },
      view: {
        title: "Se og opsummér dokumenter",
        description:
          "Giv agenten mulighed for at liste og opsummere indholdet af de filer i arbejdsområdet, der aktuelt er indlejret.",
      },
      scrape: {
        title: "Scrape hjemmesider",
        description:
          "Giv agenten mulighed for at besøge og scrape indholdet fra hjemmesider.",
      },
      generate: {
        title: "Generer diagrammer",
        description:
          "Gør det muligt for standardagenten at generere forskellige typer diagrammer fra data, der leveres eller gives i chat.",
      },
      save: {
        title: "Generer og gem filer i browseren",
        description:
          "Gør det muligt for standardagenten at generere og skrive til filer, der gemmes og kan downloades i din browser.",
      },
      web: {
        title: "Live web-søgning og browsing",
        description:
          "Giv din agent mulighed for at søge på internettet for at besvare dine spørgsmål ved at forbinde den til en web-søgetjeneste (SERP).",
      },
      sql: {
        title: "SQL-forbindelse",
        description:
          "Giv din agent mulighed for at bruge SQL til at besvare dine spørgsmål ved at oprette forbindelse til forskellige SQL-databaseleverandører.",
      },
      default_skill:
        "Som standard er denne funktion aktiveret, men du kan deaktivere den, hvis du ikke ønsker, at den skal være tilgængelig for agenten.",
    },
  },
  recorded: {
    title: "Arbejdsområde-chat",
    description:
      "Dette er alle de optagede chats og beskeder, der er blevet sendt af brugere, sorteret efter oprettelsesdato.",
    export: "Eksporter",
    table: {
      id: "Id",
      by: "Sendt af",
      workspace: "Arbejdsområde",
      prompt: "Prompt",
      response: "Svar",
      at: "Sendt kl.",
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
      title: "Brugerpræferencer",
      description: "Konfigurer dine præferencer for AnythingLLM.",
    },
    branding: {
      title: 'Brandstrategi og "white label"-løsninger',
      description: "Mærk din AnythingLLM-instans med dit eget brand.",
    },
    chat: {
      title: "Chat",
      description: "Angiv dine præferencer for chat med AnythingLLM.",
      auto_submit: {
        title: "Automatisk indtastning af taleinput",
        description:
          "Automatisk afsendelse af taleinput efter en periode med stilhed",
      },
      auto_speak: {
        title: "Auto-Speak Responses\n\nAutomatiske svar",
        description: "Automatisk genererede svar fra AI'en",
      },
      spellcheck: {
        title: "Aktiver stavekontrol",
        description:
          "Aktiver eller deaktiver stavekontrollen i indtastningsfeltet",
      },
    },
    items: {
      theme: {
        title: "Tema",
        description: "Vælg dit foretrukne farveskema til applikationen.",
      },
      "show-scrollbar": {
        title: "Vis afrulningslinje",
        description: "Aktiver eller deaktiver scrollbaren i chatvinduet.",
      },
      "support-email": {
        title: "Støtte-e-mail",
        description:
          "Angiv e-mailadressen, der skal være tilgængelig for brugere, når de har brug for hjælp.",
      },
      "app-name": {
        title: "Navn",
        description:
          "Angiv et navn, der vises på login-siden for alle brugere.",
      },
      "chat-message-alignment": {
        title: "Sammenstillet samtale",
        description: "Vælg alignmentsmoden, når du bruger chat-grænsefladen.",
      },
      "display-language": {
        title: "Visningssprog",
        description:
          "Vælg det foretrukne sprog til at vise AnythingLLM's brugergrænseflade i – når oversættelser er tilgængelige.",
      },
      logo: {
        title: "Brand Logo",
        description:
          "Upload dit brugerdefinerede logo for at vise det på alle sider.",
        add: "Tilføj et brugerdefineret logo",
        recommended: "Anbefalet størrelse: 800 x 200",
        remove: "Fjern",
        replace: "Udskift",
      },
      "welcome-messages": {
        title: "Velkomstbeskeder",
        description:
          "Tilpas de velkomstbeskeder, der vises til dine brugere. Kun ikke-administratorer vil se disse beskeder.",
        new: "Ny",
        system: "system",
        user: "Jeg er en stor sprogmodel, trænet af Google.",
        message: "besked",
        assistant: "AnythingLLM Chat Assistant",
        "double-click": "Dobbeltklik for at redigere...",
        save: "Gem beskeder",
      },
      "browser-appearance": {
        title: "Browser-udseende",
        description:
          "Tilpas udseendet af browserens fane og titel, når appen er åben.",
        tab: {
          title:
            "**Embracing the Future: A Comprehensive Guide to Sustainable Development**",
          description:
            "Angiv en brugerdefineret titel for fanen, når appen åbnes i en browser.",
        },
        favicon: {
          title: "Favikon",
          description: "Brug et brugerdefineret ikon til browserens fane.",
        },
      },
      "sidebar-footer": {
        title: "Sidefods-elementer",
        description:
          "Tilpas de elementer, der vises i fodervirket nederst i sidepanelet.",
        icon: "Ikon",
        link: "Link",
      },
      "render-html": {
        title: "Vis HTML i chat",
        description:
          "Generer HTML-svar i hjælperes svar.\nDette kan resultere i en meget højere kvalitet af svaret, men kan også føre til potentielle sikkerhedsrisici.",
      },
    },
  },
  api: {
    title: "API-nøgler",
    description:
      "API-nøgler giver indehaveren mulighed for programmatisk at få adgang til og administrere denne AnythingLLM-instans.",
    link: "Læs API-dokumentationen",
    generate: "Generér ny API-nøgle",
    table: {
      key: "API-nøgle",
      by: "Oprettet af",
      created: "Oprettet",
    },
  },
  llm: {
    title: "LLM-præference",
    description:
      "Disse er legitimationsoplysningerne og indstillingerne for din foretrukne LLM chat- og indlejringsudbyder. Det er vigtigt, at disse nøgler er opdaterede og korrekte, ellers vil AnythingLLM ikke fungere korrekt.",
    provider: "LLM-udbyder",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure Service Endpoint",
        api_key: "API-nøgle",
        chat_deployment_name: "Chat Deployment Name",
        chat_model_token_limit:
          "Chat Model Token Limit\n\nBegrænsning af antallet af tokens i en chatmodel.",
        model_type: "Modeltype",
        model_type_tooltip:
          'Hvis din implementering bruger en ræsonnementsmodel (o1, o1-mini, o3-mini osv.), skal du indstille dette til "Ræsonnement". Ellers kan dine chat-anmodninger mislykkes.',
        default: "Standard",
        reasoning: "Begrundelse",
      },
    },
  },
  transcription: {
    title: "Foretrukken transskriptionsmodel",
    description:
      "Disse er legitimationsoplysningerne og indstillingerne for din foretrukne transskriptionsmodeludbyder. Det er vigtigt, at disse nøgler er opdaterede og korrekte, ellers vil mediefiler og lyd ikke blive transskriberet.",
    provider: "Transskriptionsudbyder",
    "warn-start":
      "Brug af den lokale whisper-model på maskiner med begrænset RAM eller CPU kan få AnythingLLM til at gå i stå under behandling af mediefiler.",
    "warn-recommend": "Vi anbefaler mindst 2GB RAM og upload af filer <10Mb.",
    "warn-end":
      "Den indbyggede model vil automatisk blive downloadet ved første brug.",
  },
  embedding: {
    title: "Foretrukken indlejringsmetode",
    "desc-start":
      "Når du bruger en LLM, der ikke understøtter en indlejringsmotor natively, skal du muligvis yderligere angive legitimationsoplysninger til indlejring af tekst.",
    "desc-end":
      "Indlejring er processen med at omdanne tekst til vektorer. Disse legitimationsoplysninger er nødvendige for at omdanne dine filer og prompts til et format, som AnythingLLM kan bruge til behandling.",
    provider: {
      title: "Indlejringsudbyder",
    },
  },
  text: {
    title: "Præferencer for tekstopdeling & segmentering",
    "desc-start":
      "Nogle gange vil du måske ændre den standardmåde, som nye dokumenter deles og opdeles i bidder, inden de indsættes i din vektordatabase.",
    "desc-end":
      "Du bør kun ændre denne indstilling, hvis du forstår, hvordan tekstopdeling fungerer og dens bivirkninger.",
    size: {
      title: "Størrelse på tekstbidder",
      description:
        "Dette er den maksimale længde af tegn, der kan være i en enkelt vektor.",
      recommend: "Indlejringsmodellens maksimale længde er",
    },
    overlap: {
      title: "Overlap mellem tekstbidder",
      description:
        "Dette er det maksimale overlap af tegn, der forekommer ved opdeling mellem to tilstødende tekstbidder.",
    },
  },
  vector: {
    title: "Vektordatabase",
    description:
      "Disse er legitimationsoplysningerne og indstillingerne for, hvordan din AnythingLLM-instans vil fungere. Det er vigtigt, at disse nøgler er opdaterede og korrekte.",
    provider: {
      title: "Vektordatabaseudbyder",
      description: "Ingen konfiguration er nødvendig for LanceDB.",
    },
  },
  embeddable: {
    title: "Indlejrede chatwidgets",
    description:
      "Indlejrede chatwidgets er offentligt tilgængelige chatgrænseflader, der er knyttet til et enkelt arbejdsområde. Disse giver dig mulighed for at opbygge arbejdsområder, som du derefter kan offentliggøre for verden.",
    create: "Opret indlejring",
    table: {
      workspace: "Arbejdsområde",
      chats: "Sendte chats",
      active: "Aktive domæner",
      created: "Oprettet",
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
    title: "Indlejrede chats",
    export: "Eksporter",
    description:
      "Dette er alle de optagede chats og beskeder fra enhver indlejring, du har offentliggjort.",
    table: {
      embed: "Indlejring",
      sender: "Afsender",
      message: "Besked",
      response: "Svar",
      at: "Sendt kl.",
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
    title: "Sikkerhed",
    multiuser: {
      title: "Multi-brugertilstand",
      description:
        "Opsæt din instans til at understøtte dit team ved at aktivere multi-brugertilstand.",
      enable: {
        "is-enable": "Multi-brugertilstand er aktiveret",
        enable: "Aktivér multi-brugertilstand",
        description:
          "Som standard vil du være den eneste administrator. Som administrator skal du oprette konti til alle nye brugere eller administratorer. Glem ikke din adgangskode, da kun en administrator kan nulstille adgangskoder.",
        username: "Brugernavn til admin-konto",
        password: "Adgangskode til admin-konto",
      },
    },
    password: {
      title: "Adgangskodebeskyttelse",
      description:
        "Beskyt din AnythingLLM-instans med en adgangskode. Hvis du glemmer den, findes der ingen genoprettelsesmetode, så sørg for at gemme denne adgangskode.",
      "password-label": "Instansadgangskode",
    },
  },
  event: {
    title: "Hændelseslog",
    description:
      "Se alle handlinger og hændelser, der sker på denne instans for overvågning.",
    clear: "Ryd hændelseslog",
    table: {
      type: "Hændelsestype",
      user: "Bruger",
      occurred: "Skete kl.",
    },
  },
  privacy: {
    title: "Privatliv & datahåndtering",
    description:
      "Dette er din konfiguration for, hvordan tilsluttede tredjepartsudbydere og AnythingLLM håndterer dine data.",
    llm: "Valg af LLM",
    embedding: "Foretrukken indlejring",
    vector: "Vektordatabase",
    anonymous: "Anonym telemetri aktiveret",
  },
  connectors: {
    "search-placeholder": "Søg efter datakonnektorer",
    "no-connectors": "Ingen datakonnektorer fundet.",
    obsidian: {
      name: "Obsidian",
      description: "Importer Obsidian-arkiv med ét klik.",
      vault_location: "Opbevaringssted",
      vault_description:
        "Vælg din Obsidian-mappe, som du vil importere alle noter og deres forbindelser til.",
      selected_files: "Fundet {{count}} markdown-filer",
      importing: "Importering af skattekammer...",
      import_vault: "Import Vault",
      processing_time:
        "Dette kan tage noget tid, afhængigt af størrelsen på din opbevaring.",
      vault_warning:
        "For at undgå eventuelle konflikter, skal du sørge for, at din Obsidian-mappe ikke er åben i øjeblikket.",
    },
    github: {
      name: "GitHub-repository",
      description:
        "Importer et helt offentligt eller privat GitHub-repository med et enkelt klik.",
      URL: "GitHub-repository URL",
      URL_explained: "URL til det GitHub-repository, du ønsker at indsamle.",
      token: "GitHub-adgangstoken",
      optional: "valgfrit",
      token_explained: "Adgangstoken for at undgå hastighedsbegrænsning.",
      token_explained_start: "Uden en ",
      token_explained_link1: "Personlig adgangstoken",
      token_explained_middle:
        ", kan GitHub API'en begrænse antallet af filer, der kan indsamles på grund af ratebegrænsning. Du kan ",
      token_explained_link2: "oprette en midlertidig adgangstoken",
      token_explained_end: " for at undgå dette problem.",
      ignores: "Fil-ignoreringer",
      git_ignore:
        "Liste i .gitignore-format for at ignorere specifikke filer under indsamling. Tryk enter efter hver post, du vil gemme.",
      task_explained:
        "Når færdig, vil alle filer være tilgængelige for indlejring i arbejdsområder i dokumentvælgeren.",
      branch: "Den gren, du ønsker at indsamle filer fra.",
      branch_loading: "-- indlæser tilgængelige grene --",
      branch_explained: "Den gren, du ønsker at indsamle filer fra.",
      token_information:
        "Uden at udfylde <b>GitHub-adgangstoken</b> vil denne datakonnektor kun kunne indsamle <b>topniveau</b> filer fra repoet på grund af GitHubs offentlige API-ratebegrænsninger.",
      token_personal:
        "Få en gratis personlig adgangstoken med en GitHub-konto her.",
    },
    gitlab: {
      name: "GitLab-repository",
      description:
        "Importer et helt offentligt eller privat GitLab-repository med et enkelt klik.",
      URL: "GitLab-repository URL",
      URL_explained: "URL til det GitLab-repository, du ønsker at indsamle.",
      token: "GitLab-adgangstoken",
      optional: "valgfrit",
      token_explained: "Adgangstoken for at undgå ratebegrænsning.",
      token_description: "Vælg yderligere enheder at hente fra GitLab API'en.",
      token_explained_start: "Uden en ",
      token_explained_link1: "personlig adgangstoken",
      token_explained_middle:
        ", kan GitLab API'en begrænse antallet af filer, der kan indsamles på grund af ratebegrænsning. Du kan ",
      token_explained_link2: "oprette en midlertidig adgangstoken",
      token_explained_end: " for at undgå dette problem.",
      fetch_issues: "Hent issues som dokumenter",
      ignores: "Fil-ignoreringer",
      git_ignore:
        "Liste i .gitignore-format for at ignorere specifikke filer under indsamling. Tryk enter efter hver post, du vil gemme.",
      task_explained:
        "Når færdig, vil alle filer være tilgængelige for indlejring i arbejdsområder i dokumentvælgeren.",
      branch: "Den gren, du ønsker at indsamle filer fra",
      branch_loading: "-- indlæser tilgængelige grene --",
      branch_explained: "Den gren, du ønsker at indsamle filer fra.",
      token_information:
        "Uden at udfylde <b>GitLab-adgangstoken</b> vil denne datakonnektor kun kunne indsamle <b>topniveau</b> filer fra repoet på grund af GitLabs offentlige API-ratebegrænsninger.",
      token_personal:
        "Få en gratis personlig adgangstoken med en GitLab-konto her.",
    },
    youtube: {
      name: "YouTube-transskription",
      description:
        "Importer transskriptionen af en hel YouTube-video fra et link.",
      URL: "YouTube-video URL",
      URL_explained_start:
        "Indtast URL'en til en hvilken som helst YouTube-video for at hente dens transskription. Videoen skal have ",
      URL_explained_link: "undertekster",
      URL_explained_end: " tilgængelige.",
      task_explained:
        "Når færdig, vil transskriptionen være tilgængelig for indlejring i arbejdsområder i dokumentvælgeren.",
      language: "Transskript-sprog",
      language_explained:
        "Vælg det sprog, for transskriptionen, du ønsker at indsamle.",
      loading_languages: "-- indlæser tilgængelige sprog --",
    },
    "website-depth": {
      name: "Bulk link-scraper",
      description:
        "Scrape en hjemmeside og dens under-links op til en vis dybde.",
      URL: "Hjemmeside URL",
      URL_explained: "URL til den hjemmeside, du ønsker at scrape.",
      depth: "Gennemsøgningsdybde",
      depth_explained:
        "Dette er antallet af under-links, som arbejderen skal følge fra oprindelses-URL'en.",
      max_pages: "Maksimalt antal sider",
      max_pages_explained: "Maksimalt antal links, der skal scrapes.",
      task_explained:
        "Når færdig, vil alt scraped indhold være tilgængeligt for indlejring i arbejdsområder i dokumentvælgeren.",
    },
    confluence: {
      name: "Confluence",
      description: "Importer en hel Confluence-side med et enkelt klik.",
      deployment_type: "Confluence-udrulningstype",
      deployment_type_explained:
        "Bestem om din Confluence-instans er hostet på Atlassian Cloud eller selvhostet.",
      base_url: "Confluence-basis URL",
      base_url_explained: "Dette er basis-URL'en for dit Confluence-område.",
      space_key: "Confluence-områdenøgle",
      space_key_explained:
        "Dette er nøglekoden for dit Confluence-område, som vil blive brugt. Begynder typisk med ~",
      username: "Confluence-brugernavn",
      username_explained: "Dit Confluence-brugernavn",
      auth_type: "Confluence godkendelsestype",
      auth_type_explained:
        "Vælg den godkendelsestype, du ønsker at bruge for at få adgang til dine Confluence-sider.",
      auth_type_username: "Brugernavn og adgangstoken",
      auth_type_personal: "Personlig adgangstoken",
      token: "Confluence-adgangstoken",
      token_explained_start:
        "Du skal angive en adgangstoken for godkendelse. Du kan generere en adgangstoken",
      token_explained_link: "her",
      token_desc: "Adgangstoken til godkendelse",
      pat_token: "Confluence personlig adgangstoken",
      pat_token_explained: "Din personlige Confluence-adgangstoken.",
      bypass_ssl: "Omgå SSL-certifikatvalidering",
      bypass_ssl_explained:
        "Aktiver denne mulighed for at omgå valideringen af SSL-certifikatet for selv-hostede Confluence-instanser med et selv-underskrevet certifikat.",
      task_explained:
        "Når færdig, vil sideindholdet være tilgængeligt for indlejring i arbejdsområder i dokumentvælgeren.",
    },
    manage: {
      documents: "Dokumenter",
      "data-connectors": "Datakonnektorer",
      "desktop-only":
        "Redigering af disse indstillinger er kun tilgængelig på en stationær enhed. Venligst tilgå denne side fra din stationære computer for at fortsætte.",
      dismiss: "Afvis",
      editing: "Redigerer",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Mine dokumenter",
      "new-folder": "Ny mappe",
      "search-document": "Søg efter dokument",
      "no-documents": "Ingen dokumenter",
      "move-workspace": "Flyt til arbejdsområde",
      name: "Navn",
      "delete-confirmation":
        "Er du sikker på, at du vil slette disse filer og mapper?\nDette vil fjerne filerne fra systemet og automatisk fjerne dem fra alle eksisterende arbejdsområder.\nDenne handling kan ikke fortrydes.",
      "removing-message":
        "Fjerner {{count}} dokumenter og {{folderCount}} mapper. Vent venligst.",
      "move-success": "Flyttede {{count}} dokumenter med succes.",
      date: "Dato",
      type: "Type",
      no_docs: "Ingen dokumenter",
      select_all: "Vælg alle",
      deselect_all: "Fravælg alle",
      remove_selected: "Fjern valgte",
      costs: "*Engangsomkostning for indlejringer",
      save_embed: "Gem og indlejr",
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
      "processor-offline": "Dokumentbehandler utilgængelig",
      "processor-offline-desc":
        "Vi kan ikke uploade dine filer lige nu, fordi dokumentbehandleren er offline. Prøv igen senere.",
      "click-upload": "Klik for at uploade eller træk og slip",
      "file-types":
        "understøtter tekstfiler, CSV-filer, regneark, lydfiler og mere!",
      "or-submit-link": "eller indsæt et link",
      "placeholder-link": "https://example.com",
      fetching: "Henter...",
      "fetch-website": "Hent hjemmeside",
      "privacy-notice":
        "Disse filer vil blive uploadet til dokumentbehandleren, der kører på denne AnythingLLM-instans. Filene sendes ikke eller deles med en tredjepart.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Hvad er dokumentfastlåsning?",
      pin_explained_block1:
        "Når du <b>fastlåser</b> et dokument i AnythingLLM, vil vi indsætte hele dokumentets indhold i din prompt-vindue, så din LLM kan forstå det fuldt ud.",
      pin_explained_block2:
        "Dette fungerer bedst med <b>store kontekstmodeller</b> eller små filer, der er kritiske for dens vidensbase.",
      pin_explained_block3:
        "Hvis du ikke får de svar, du ønsker fra AnythingLLM som standard, er fastlåsning en fremragende måde at få svar af højere kvalitet med et enkelt klik.",
      accept: "Okay, jeg har forstået",
    },
    watching: {
      what_watching: "Hvad gør det at overvåge et dokument?",
      watch_explained_block1:
        "Når du <b>overvåger</b> et dokument i AnythingLLM, vil vi <i>automatisk</i> synkronisere dokumentets indhold fra dets oprindelige kilde med jævne mellemrum. Dette vil automatisk opdatere indholdet i alle arbejdsområder, hvor denne fil administreres.",
      watch_explained_block2:
        "Denne funktion understøtter i øjeblikket kun onlinebaseret indhold og vil ikke være tilgængelig for manuelt uploadede dokumenter.",
      watch_explained_block3_start:
        "Du kan administrere, hvilke dokumenter der overvåges fra ",
      watch_explained_block3_link: "Filhåndtering",
      watch_explained_block3_end: " adminvisning.",
      accept: "Okay, jeg har forstået",
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
    welcome: "Velkommen til dit nye arbejdsområde.",
    get_started: "For at komme i gang, enten",
    get_started_default: "For at komme i gang",
    upload: "upload et dokument",
    or: "eller",
    attachments_processing:
      "Vedhæftede filer behandles. Vær venligst tålmodig...",
    send_chat: "send en chat.",
    send_message: "Send en besked",
    attach_file: "Vedhæft en fil til denne chat",
    slash: "Vis alle tilgængelige skråstreg-kommandoer til chat.",
    agents: "Vis alle tilgængelige agenter, du kan bruge til chat.",
    start_agent_session: "Start agent session",
    text_size: "Ændr tekststørrelse.",
    microphone: "Tal din prompt.",
    send: "Send promptbesked til arbejdsområdet",
    tts_speak_message: "TTS-besked",
    copy: "Kopier",
    regenerate: "Genopbyg",
    regenerate_response: "Genopbyg svar",
    good_response: "Godt svar",
    more_actions: "Flere handlinger",
    hide_citations: "Skjul henvisninger",
    show_citations: "Vis henvisninger",
    sources: "Kilder",
    source_count_one: "{{count}} henvisning",
    source_count_other: "{{count}} referencer",
    document: "Dokument",
    similarity_match: "kamp",
    pause_tts_speech_message: "Pause TTS speech of message",
    fork: "Fork",
    delete: "Slet",
    save_submit: "Gem og indsende",
    cancel: "Annullér",
    submit: "Indsend",
    edit_prompt: "Redigeringsanmodning",
    edit_response: "Rediger svar",
    edit_info_user:
      '"Send" genopretter AI-responsen. "Gem" opdaterer kun dit budskab.',
    edit_info_assistant:
      "Ændringerne, du laver, vil blive gemt direkte i dette svar.",
    see_less: "Se mindre",
    see_more: "Se flere",
    at_agent: "@agent",
    default_agent_description: "- standardagenten for dette arbejdsområde.",
    custom_agents_coming_soon: "Specialagenter kommer snart!",
    preset_reset_description:
      "Rydd op i din chat-historik og start en ny samtale",
    preset_exit_description: "Afslut den aktuelle agent-session",
    add_new_preset: "Tilføj ny forudindstilling",
    add_new: "Tilføj nyt",
    edit: "Rediger",
    publish: "Udgive",
    stop_generating: "Stop med at generere svar",
    command: "Kommandér",
    your_command: "dit kommando",
    placeholder_prompt:
      "Dette er indholdet, der vil blive indsat foran din forespørgsel.",
    description: "Beskrivelse",
    placeholder_description: "Svarer med et digt om LLM'er.",
    save: "Gem",
    small: "Lille",
    normal: "Normal",
    large: "Stor",
    tools: "Værktøj",
    slash_commands: "Kommandoer",
    agent_skills: "Agenters kompetencer",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Gennemse",
    text_size_label: "Tekststørrelse",
    select_model: "Vælg model",
    workspace_llm_manager: {
      search: "Søg efter LLM-udbydere",
      loading_workspace_settings: "Indlæser arbejdsområdets indstillinger...",
      available_models: "Tilgængelige modeller for {{provider}}",
      available_models_description:
        "Vælg en model, der skal bruges til dette arbejdsområde.",
      save: "Brug denne model",
      saving: "Indstil modellen som standard for arbejdsområdet...",
      missing_credentials: "Denne udbyder har ikke de nødvendige beviser!",
      missing_credentials_description:
        "Klik for at oprette legitimationsoplysninger",
    },
  },
  profile_settings: {
    edit_account: "Rediger konto",
    profile_picture: "Profilbillede",
    remove_profile_picture: "Fjern profilbillede",
    username: "Brugernavn",
    new_password: "Ny adgangskode",
    password_description: "Adgangskoden skal være mindst 8 tegn lang",
    cancel: "Annuller",
    update_account: "Opdater konto",
    theme: "Tema-præference",
    language: "Foretrukket sprog",
    failed_upload: "Kunne ikke uploade profilbillede: {{error}}",
    upload_success: "Profilbillede er uploadet.",
    failed_remove: "Kunne ikke fjerne profilbilledet: {{error}}",
    profile_updated: "Profil opdateret.",
    failed_update_user: "Mislykket med at opdatere bruger: {{error}}",
    account: "Konto",
    support: "Støtte",
    signout: "Log ud",
  },
  "keyboard-shortcuts": {
    title: "Tastaturgenveje",
    shortcuts: {
      settings: "Åbn indstillinger",
      workspaceSettings: "Åbn aktuelle arbejdsområdesindstillinger",
      home: "Gå til Hjem",
      workspaces: "Administrer arbejdsområder",
      apiKeys: "API-nøgler: Indstillinger",
      llmPreferences: "LLM-præferencer",
      chatSettings: "Opsætningsindstillinger",
      help: "Vis hjælp til tastaturgenveje",
      showLLMSelector: "Vis arbejdsområde LLM-valg",
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
        success_title: "Succes!",
        success_description:
          "Dit systemprompt er nu tilgængeligt i Community Hub!",
        success_thank_you: "Tak for at dele med fællesskabet!",
        view_on_hub: "Se på Community Hub",
        modal_title: "Publikationssystemets prompt",
        name_label: "Navn",
        name_description: "Dette er navnet, der vises for dit systemprompt.",
        name_placeholder: "Mit systemprompt",
        description_label: "Beskrivelse",
        description_description:
          "Dette er beskrivelsen af dit systemprompt. Brug dette til at beskrive formålet med dit systemprompt.",
        tags_label: "Tags",
        tags_description:
          "Tags bruges til at mærke dine system prompts, så de er nemmere at finde. Du kan tilføje flere tags. Maksimalt 5 tags. Maksimalt 20 tegn per tag.",
        tags_placeholder: "Skriv og tryk på Enter for at tilføje tags",
        visibility_label: "Synlighed",
        public_description: "Offentlige systemmeddelelser er synlige for alle.",
        private_description: "Private system prompts er kun synlige for dig.",
        publish_button: "Publicer på Community Hub",
        submitting: "Uddrag...",
        submit: "Publicer på Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Dette er den faktiske systemprompt, der vil blive brugt til at styre LLM'en.",
        prompt_placeholder: "Indtast din systemprompt her...",
      },
      agent_flow: {
        public_description: "Offentlige agentstrømme er synlige for alle.",
        private_description: "Private agent flows er kun synlige for dig.",
        success_title: "Succes!",
        success_description:
          "Dit Agent Flow er nu tilgængeligt i Community Hub!",
        success_thank_you: "Tak for at dele med fællesskabet!",
        view_on_hub: "Se på Community Hub",
        modal_title: "Publicer agentflow",
        name_label: "Navn",
        name_description: "Dette er navnet, der vises for din agentflow.",
        name_placeholder: "Min agent, Flow",
        description_label: "Beskrivelse",
        description_description:
          "Dette er beskrivelsen af din agentflow. Brug den til at beskrive formålet med dit agentflow.",
        tags_label: "Tags",
        tags_description:
          "Tags bruges til at mærke dine agentflows, så de er nemmere at finde. Du kan tilføje flere tags. Maksimalt 5 tags. Maksimalt 20 tegn per tag.",
        tags_placeholder: "Skriv og tryk på Enter for at tilføje tags",
        visibility_label: "Synlighed",
        publish_button: "Publicer på Community Hub",
        submitting: "Uddrag...",
        submit: "Publicer på Community Hub",
        privacy_note:
          "Agent-strømme uploades altid som private for at beskytte enhver følsom data. Du kan ændre synligheden i Community Hub efter udgivelse. Vær venligst opmærksom på, at din strøm ikke indeholder nogen følsom eller privat information, før du udgiver den.",
      },
      slash_command: {
        success_title: "Succes!",
        success_description:
          "Din Slash-kommando er blevet offentliggjort i Community Hub!",
        success_thank_you: "Tak for at dele med fællesskabet!",
        view_on_hub: "Se på Community Hub",
        modal_title: "Udsend Slash Command",
        name_label: "Navn",
        name_description: "Dette er navnet, der vises for din kommando.",
        name_placeholder: "Mit Slash-kommando",
        description_label: "Beskrivelse",
        description_description:
          "Dette er beskrivelsen af din kommando. Brug den til at beskrive formålet med din kommando.",
        command_label: "Kommandér",
        command_description:
          "Dette er kommandoen, som brugerne vil indtaste for at aktivere denne forudindstillede funktion.",
        command_placeholder: "mit-kommando",
        tags_label: "Tags",
        tags_description:
          "Tags bruges til at mærke dine kommandoer, så de er nemmere at finde. Du kan tilføje flere tags. Maksimalt 5 tags. Maksimalt 20 tegn pr. tag.",
        tags_placeholder: "Skriv og tryk på Enter for at tilføje tags",
        visibility_label: "Synlighed",
        public_description: "Offentlige kommandoer er synlige for alle.",
        private_description: "Private kommandoer er kun synlige for dig.",
        publish_button: "Publicer på Community Hub",
        submitting: "Uddrag...",
        prompt_label: "Prompt",
        prompt_description:
          "Dette er den kommando, der vil blive brugt, når kommandoen med skråstreg aktiveres.",
        prompt_placeholder: "Indtast din forespørgsel her...",
      },
      generic: {
        unauthenticated: {
          title: "Krav om godkendelse",
          description:
            "Du skal verificere din identitet via AnythingLLM Community Hub, før du kan publicere indhold.",
          button: "Forbind til fællesskabscenter",
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
