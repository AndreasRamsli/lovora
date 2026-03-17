const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Welkom bij",
      getStarted: "Aan de slag",
    },
    llm: {
      title: "LLM-voorkeuren",
      description:
        "AnythingLLM kan samenwerken met veel LLM-aanbieders. Deze service verzorgt de chatfunctie.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Gebruikersinstellingen",
      description: "Configureer uw gebruikersinstellingen.",
      howManyUsers: "Hoeveel gebruikers zullen deze instantie gebruiken?",
      justMe: "Alleen ik",
      myTeam: "Mijn team",
      instancePassword: "Instancewachtwoord",
      setPassword: "Wilt u een wachtwoord instellen?",
      passwordReq: "Wachtwoorden moeten minimaal 8 tekens lang zijn.",
      passwordWarn:
        "Het is belangrijk om dit wachtwoord te bewaren, omdat er geen herstelmethode is.",
      adminUsername: "Gebruikersnaam van het beheerdersaccount",
      adminPassword: "Wachtwoord van het beheerdersaccount",
      adminPasswordReq: "Wachtwoorden moeten minimaal 8 tekens lang zijn.",
      teamHint:
        "Standaard bent u de enige beheerder. Zodra de onboarding is voltooid, kunt u gebruikers of beheerders aanmaken en anderen uitnodigen. Raak uw wachtwoord niet kwijt, want alleen beheerders kunnen wachtwoorden opnieuw instellen.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Gegevensverwerking en privacy",
      description:
        "Wij streven naar transparantie en controle als het gaat om uw persoonlijke gegevens.",
      settingsHint:
        "Deze instellingen kunnen op elk moment opnieuw worden geconfigureerd in de instellingen.",
    },
    survey: {
      title: "Welkom bij AnythingLLM",
      description:
        "Help ons AnythingLLM af te stemmen op jouw behoeften. (Optioneel)",
      email: "Wat is je e-mailadres?",
      useCase: "Waarvoor ga je AnythingLLM gebruiken?",
      useCaseWork: "Voor werk",
      useCasePersonal: "Voor persoonlijk gebruik",
      useCaseOther: "Anders",
      comment: "Hoe heb je over AnythingLLM gehoord?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, enz. - Laat ons weten hoe je ons gevonden hebt!",
      skip: "Enquête overslaan",
      thankYou: "Bedankt voor je feedback!",
    },
    workspace: {
      title: "Maak je eerste werkruimte aan",
      description:
        "Maak je eerste werkruimte aan en ga aan de slag met AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Werkruimten Naam",
    error: "fout",
    success: "succes",
    user: "Gebruiker",
    selection: "Model Selectie",
    saving: "Opslaan...",
    save: "Wijzigingen opslaan",
    previous: "Vorige pagina",
    next: "Volgende pagina",
    optional: "Optioneel",
    yes: "Ja",
    no: "Nee",
    search: "Zoeken",
    username_requirements:
      "De gebruikersnaam moet 2-32 tekens bevatten, beginnen met een kleine letter en mag alleen kleine letters, cijfers, underscores, koppeltekens en punten bevatten.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Welkom",
    chooseWorkspace: "Kies een werkruimte om te beginnen!",
    notAssigned:
      "Je bent nog niet toegewezen aan een werkruimte.\nNeem contact op met je beheerder om toegang te vragen tot een werkruimte.",
    goToWorkspace: 'Ga naar de werkruimte "{{workspace}}"',
  },
  settings: {
    title: "Instelling Instanties",
    system: "Algemene Instellingen",
    invites: "Uitnodigingen",
    users: "Gebruikers",
    workspaces: "Werkruimten",
    "workspace-chats": "Werkruimte Chats",
    customization: "Aanpassing",
    interface: "UI-voorkeuren",
    branding: "Branding & Whitelabeling",
    chat: "Chat",
    "api-keys": "Ontwikkelaar API",
    llm: "LLM",
    transcription: "Transcriptie",
    embedder: "Inbedder",
    "text-splitting": "Tekst Splitsen & Chunking",
    "voice-speech": "Stem & Spraak",
    "vector-database": "Vector Database",
    embeds: "Chat Inbedden",
    "embed-chats": "Ingebedde Chat Geschiedenis",
    security: "Veiligheid",
    "event-logs": "Gebeurtenislogboeken",
    privacy: "Privacy & Gegevens",
    "ai-providers": "AI Providers",
    "agent-skills": "Agent Vaardigheden",
    "community-hub": {
      title: "Centraal punt",
      trending: "Bekijk populaire onderwerpen",
      "your-account": "Uw account",
      "import-item": "Importeren",
    },
    admin: "Beheerder",
    tools: "Hulpmiddelen",
    "system-prompt-variables": "Systeempromptvariabelen",
    "experimental-features": "Experimentele Functies",
    contact: "Contact Ondersteuning",
    "browser-extension": "Browser Extensie",
    "mobile-app": "AnythingLLM Mobiele App",
  },
  login: {
    "multi-user": {
      welcome: "Welkom bij",
      "placeholder-username": "Gebruikersnaam",
      "placeholder-password": "Wachtwoord",
      login: "Inloggen",
      validating: "Bezig met valideren...",
      "forgot-pass": "Wachtwoord vergeten",
      reset: "Reset",
    },
    "sign-in": "Meld je aan bij je {{appName}} account.",
    "password-reset": {
      title: "Wachtwoord Resetten",
      description:
        "Geef de benodigde informatie hieronder om je wachtwoord te resetten.",
      "recovery-codes": "Herstelcodes",
      "recovery-code": "Herstelcode {{index}}",
      "back-to-login": "Terug naar Inloggen",
    },
  },
  "main-page": {
    greeting: "Hoe kan ik u vandaag helpen?",
    noWorkspaceError: "Maak een werkruimte aan voordat u een chat start.",
    checklist: {
      title: "Aan de slag",
      tasksLeft: "resterende taken",
      completed: "U bent op weg om een ​​AnythingLLM-expert te worden!",
      dismiss: "sluiten",
      tasks: {
        create_workspace: {
          title: "Een werkruimte aanmaken",
          description: "Maak uw eerste werkruimte aan om te beginnen",
          action: "Aanmaken",
        },
        send_chat: {
          title: "Een chatbericht verzenden",
          description: "Start een gesprek met uw AI-assistent",
          action: "Chatten",
        },
        embed_document: {
          title: "Een document embedden",
          description: "Voeg uw eerste document toe aan uw werkruimte",
          action: "Embedden",
        },
        setup_system_prompt: {
          title: "Een systeemprompt instellen",
          description: "Configureer het gedrag van uw AI-assistent",
          action: "Instellen",
        },
        define_slash_command: {
          title: "Definieer een slash-opdracht",
          description: "Maak aangepaste opdrachten voor je assistent",
          action: "Definieer",
        },
        visit_community: {
          title: "Bezoek de communityhub",
          description: "Verken communitybronnen en -sjablonen",
          action: "Bladeren",
        },
      },
    },
    quickActions: {
      createAgent: "Maak een agent",
      editWorkspace: "Werkruimte bewerken",
      uploadDocument: "Upload een document",
    },
    quickLinks: {
      title: "Snelle links",
      sendChat: "Chat verzenden",
      embedDocument: "Een document embedden",
      createWorkspace: "Werkruimte maken",
    },
    exploreMore: {
      title: "Meer functies ontdekken",
      features: {
        customAgents: {
          title: "Aangepaste AI-agenten",
          description:
            "Bouw krachtige AI-agenten en automatiseringen zonder code.",
          primaryAction: "Chatten met @agent",
          secondaryAction: "Een agentflow bouwen",
        },
        slashCommands: {
          title: "Slash-opdrachten",
          description:
            "Bespaar tijd en voeg prompts toe met aangepaste slash-opdrachten.",
          primaryAction: "Een slash-opdracht maken",
          secondaryAction: "Verkennen op Hub",
        },
        systemPrompts: {
          title: "Systeemprompts",
          description:
            "Wijzig de systeemprompt om de AI-antwoorden van een werkruimte aan te passen.",
          primaryAction: "Een systeemprompt wijzigen",
          secondaryAction: "Promptvariabelen beheren",
        },
      },
    },
    announcements: {
      title: "Updates & aankondigingen",
    },
    resources: {
      title: "Bronnen",
      links: {
        docs: "Documentatie",
        star: "Ster op Github",
      },
      keyboardShortcuts: "Sneltoetsen",
    },
  },
  "new-workspace": {
    title: "Nieuwe Werkruimte",
    placeholder: "Mijn Werkruimte",
  },
  "workspaces—settings": {
    general: "Algemene Instellingen",
    chat: "Chat Instellingen",
    vector: "Vector Database",
    members: "Leden",
    agent: "Agent Configuratie",
  },
  general: {
    vector: {
      title: "Vector Teller",
      description: "Totaal aantal vectoren in je vector database.",
    },
    names: {
      description: "Dit zal alleen de weergavenaam van je werkruimte wijzigen.",
    },
    message: {
      title: "Voorgestelde Chatberichten",
      description:
        "Pas de berichten aan die aan je werkruimtegebruikers worden voorgesteld.",
      add: "Nieuw bericht toevoegen",
      save: "Berichten opslaan",
      heading: "Leg me uit",
      body: "de voordelen van AnythingLLM",
    },
    pfp: {
      title: "Assistent Profielfoto",
      description:
        "Pas de profielfoto van de assistent voor deze werkruimte aan.",
      image: "Werkruimte Afbeelding",
      remove: "Werkruimte Afbeelding Verwijderen",
    },
    delete: {
      title: "Werkruimte Verwijderen",
      description:
        "Verwijder deze werkruimte en al zijn gegevens. Dit zal de werkruimte voor alle gebruikers verwijderen.",
      delete: "Werkruimte Verwijderen",
      deleting: "Werkruimte Verwijderen...",
      "confirm-start": "Je staat op het punt je gehele",
      "confirm-end":
        "werkruimte te verwijderen. Dit zal alle vector inbeddingen in je vector database verwijderen.\n\nDe originele bronbestanden blijven onaangetast. Deze actie is onomkeerbaar.",
    },
  },
  chat: {
    llm: {
      title: "Werkruimte LLM Provider",
      description:
        "De specifieke LLM-provider en -model die voor deze werkruimte zal worden gebruikt. Standaard wordt de systeem LLM-provider en instellingen gebruikt.",
      search: "Zoek alle LLM-providers",
    },
    model: {
      title: "Werkruimte Chatmodel",
      description:
        "Het specifieke chatmodel dat voor deze werkruimte zal worden gebruikt. Indien leeg, wordt de systeem LLM-voorkeur gebruikt.",
      wait: "-- wachten op modellen --",
    },
    mode: {
      title: "Chatmodus",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start": "zal antwoorden geven met de algemene kennis van de LLM",
        and: "en",
        "desc-end": "documentcontext die wordt gevonden.",
      },
      query: {
        title: "Query",
        "desc-start": "zal antwoorden geven",
        only: "alleen",
        "desc-end": "als documentcontext wordt gevonden.",
      },
    },
    history: {
      title: "Chatgeschiedenis",
      "desc-start":
        "Het aantal vorige chats dat in het kortetermijngeheugen van de reactie wordt opgenomen.",
      recommend: "Aanbevolen 20. ",
      "desc-end":
        "Alles meer dan 45 leidt waarschijnlijk tot continue chatfouten, afhankelijk van de berichtgrootte.",
    },
    prompt: {
      title: "Prompt",
      description:
        "De prompt die in deze werkruimte zal worden gebruikt. Definieer de context en instructies voor de AI om een reactie te genereren. Je moet een zorgvuldig samengestelde prompt geven zodat de AI een relevante en nauwkeurige reactie kan genereren.",
      history: {
        title: "Geschiedenis van systeemprompts",
        clearAll: "Alles wissen",
        noHistory: "Geen geschiedenis van systeemprompts beschikbaar",
        restore: "Herstellen",
        delete: "Verwijderen",
        publish: "Publiceren naar Community Hub",
        deleteConfirm:
          "Weet u zeker dat u dit geschiedenisitem wilt verwijderen?",
        clearAllConfirm:
          "Weet u zeker dat u alle geschiedenis wilt wissen? Deze actie kan niet ongedaan worden gemaakt.",
        expand: "Uitbreiden",
      },
    },
    refusal: {
      title: "Afwijzingsreactie in Querymodus",
      "desc-start": "Wanneer in",
      query: "query",
      "desc-end":
        "modus, wil je wellicht een aangepaste afwijzingsreactie geven wanneer er geen context wordt gevonden.",
      "tooltip-title": "Waarom zie ik dit?",
      "tooltip-description":
        "U bevindt zich in de querymodus, die alleen informatie uit uw documenten gebruikt. Schakel over naar de chatmodus voor flexibelere gesprekken, of klik hier om onze documentatie te raadplegen voor meer informatie over chatmodi.",
    },
    temperature: {
      title: "LLM Temperatuur",
      "desc-start":
        'Deze instelling bepaalt hoe "creatief" je LLM-antwoorden zullen zijn.',
      "desc-end":
        "Hoe hoger het getal, hoe creatiever. Voor sommige modellen kan dit leiden tot onsamenhangende antwoorden als het te hoog wordt ingesteld.",
      hint: "De meeste LLM's hebben verschillende acceptabele reeksen van geldige waarden. Raadpleeg je LLM-provider voor die informatie.",
    },
  },
  "vector-workspace": {
    identifier: "Vector database-identificator",
    snippets: {
      title: "Maximale Contextfragmenten",
      description:
        "Deze instelling bepaalt het maximale aantal contextfragmenten dat per chat of query naar de LLM wordt verzonden.",
      recommend: "Aanbevolen: 4",
    },
    doc: {
      title: "Document gelijkenisdrempel",
      description:
        "De minimale gelijkenisscore die vereist is voor een bron om als gerelateerd aan de chat te worden beschouwd. Hoe hoger het getal, hoe meer vergelijkbaar de bron moet zijn met de chat.",
      zero: "Geen beperking",
      low: "Laag (gelijkenisscore ≥ .25)",
      medium: "Middel (gelijkenisscore ≥ .50)",
      high: "Hoog (gelijkenisscore ≥ .75)",
    },
    reset: {
      reset: "Vector Database Resetten",
      resetting: "Vectoren wissen...",
      confirm:
        "Je staat op het punt de vector database van deze werkruimte te resetten. Dit zal alle momenteel ingebedde vectoren verwijderen.\n\nDe originele bronbestanden blijven onaangetast. Deze actie is onomkeerbaar.",
      error: "Werkruimte vector database kon niet worden gereset!",
      success: "Werkruimte vector database is gereset!",
    },
  },
  agent: {
    "performance-warning":
      "De prestaties van LLM's die geen tool-aanroep expliciet ondersteunen, zijn sterk afhankelijk van de capaciteiten en nauwkeurigheid van het model. Sommige vaardigheden kunnen beperkt of niet-functioneel zijn.",
    provider: {
      title: "Werkruimte Agent LLM Provider",
      description:
        "De specifieke LLM-provider en -model die voor het @agent-agent van deze werkruimte zal worden gebruikt.",
    },
    mode: {
      chat: {
        title: "Werkruimte Agent Chatmodel",
        description:
          "Het specifieke chatmodel dat zal worden gebruikt voor het @agent-agent van deze werkruimte.",
      },
      title: "Werkruimte Agentmodel",
      description:
        "Het specifieke LLM-model dat voor het @agent-agent van deze werkruimte zal worden gebruikt.",
      wait: "-- wachten op modellen --",
    },
    skill: {
      title: "Standaard agentvaardigheden",
      description:
        "Verbeter de natuurlijke vaardigheden van de standaardagent met deze vooraf gebouwde vaardigheden. Deze opstelling is van toepassing op alle werkruimten.",
      rag: {
        title: "RAG & langetermijngeheugen",
        description:
          'Sta de agent toe om je lokale documenten te gebruiken om een vraag te beantwoorden of vraag de agent om stukken inhoud "te onthouden" voor langetermijngeheugenopslag.',
      },
      view: {
        title: "Documenten bekijken & samenvatten",
        description:
          "Sta de agent toe om de inhoud van momenteel ingebedde werkruimtebestanden op te sommen en samen te vatten.",
      },
      scrape: {
        title: "Websites schrapen",
        description:
          "Sta de agent toe om de inhoud van websites te bezoeken en te schrapen.",
      },
      generate: {
        title: "Grafieken genereren",
        description:
          "Sta de standaardagent toe om verschillende soorten grafieken te genereren uit verstrekte of in de chat gegeven gegevens.",
      },
      save: {
        title: "Genereren & opslaan van bestanden naar browser",
        description:
          "Sta de standaardagent toe om te genereren en te schrijven naar bestanden die worden opgeslagen en kunnen worden gedownload in je browser.",
      },
      web: {
        title: "Live web zoeken en browsen",
        description:
          "Maak het mogelijk voor uw agent om het internet te doorzoeken om uw vragen te beantwoorden, door een verbinding te maken met een webzoekprovider (SERP).",
      },
      sql: {
        title: "SQL-connector",
        description:
          "Maak het mogelijk voor uw agent om SQL te gebruiken om uw vragen te beantwoorden, door verbinding te maken met verschillende SQL-databaseproviders.",
      },
      default_skill:
        "Standaard is deze functie ingeschakeld, maar u kunt deze uitschakelen als u niet wilt dat de agent er gebruik van kan maken.",
    },
  },
  recorded: {
    title: "Werkruimte Chats",
    description:
      "Dit zijn alle opgenomen chats en berichten die door gebruikers zijn verzonden, gerangschikt op hun aanmaakdatum.",
    export: "Exporteren",
    table: {
      id: "Id",
      by: "Verzonden Door",
      workspace: "Werkruimte",
      prompt: "Prompt",
      response: "Response",
      at: "Verzonden Om",
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
      title: "UI-voorkeuren",
      description: "Stel uw UI-voorkeuren in voor AnythingLLM.",
    },
    branding: {
      title: "Branding & Whitelabeling",
      description:
        "Geef uw AnythingLLM-instantie een whitelabel met uw eigen branding.",
    },
    chat: {
      title: "Chat",
      description: "Stel uw chatvoorkeuren in voor AnythingLLM.",
      auto_submit: {
        title: "Spraakinvoer automatisch verzenden",
        description:
          "Verzend spraakinvoer automatisch na een periode van stilte",
      },
      auto_speak: {
        title: "Antwoorden automatisch uitspreken",
        description: "Spreek antwoorden van de AI automatisch uit",
      },
      spellcheck: {
        title: "Spellingscontrole inschakelen",
        description:
          "Schakel de spellingscontrole in of uit in het chatinvoerveld",
      },
    },
    items: {
      theme: {
        title: "Thema",
        description: "Selecteer uw favoriete kleurenthema voor de applicatie.",
      },
      "show-scrollbar": {
        title: "Scrollbalk weergeven",
        description: "Schakel de scrollbalk in of uit in het chatvenster.",
      },
      "support-email": {
        title: "E-mailadres voor ondersteuning",
        description:
          "Stel het e-mailadres voor ondersteuning in dat toegankelijk moet zijn voor gebruikers wanneer ze hulp nodig hebben.",
      },
      "app-name": {
        title: "Naam",
        description:
          "Stel een naam in die op de inlogpagina voor alle gebruikers wordt weergegeven.",
      },
      "chat-message-alignment": {
        title: "Uitlijning van chatberichten",
        description:
          "Selecteer de uitlijningsmodus voor berichten bij gebruik van de chatinterface.",
      },
      "display-language": {
        title: "Weergavetaal",
        description:
          "Selecteer de gewenste taal waarin de gebruikersinterface van AnythingLLM moet worden weergegeven - wanneer vertalingen beschikbaar zijn.",
      },
      logo: {
        title: "Merklogo",
        description: "Upload uw eigen logo om op alle pagina's te tonen.",
        add: "Voeg een eigen logo toe",
        recommended: "Aanbevolen formaat: 800 x 200",
        remove: "Verwijderen",
        replace: "Vervangen",
      },
      "welcome-messages": {
        title: "Welkomstberichten",
        description:
          "Pas de welkomstberichten aan die aan uw gebruikers worden getoond. Alleen niet-beheerders zien deze berichten.",
        new: "Nieuw",
        system: "systeem",
        user: "gebruiker",
        message: "bericht",
        assistant: "AnythingLLM Chatassistent",
        "double-click": "Dubbelklik om te bewerken...",
        save: "Berichten opslaan",
      },
      "browser-appearance": {
        title: "Browserweergave",
        description:
          "Pas de weergave van het browsertabblad en de titel aan wanneer de app is geopend.",
        tab: {
          title: "Titel",
          description:
            "Stel een aangepaste tabtitel in wanneer de app in een browser wordt geopend.",
        },
        favicon: {
          title: "Favicon",
          description:
            "Gebruik een aangepaste favicon voor het browsertabblad.",
        },
      },
      "sidebar-footer": {
        title: "Voettekst items in de zijbalk",
        description:
          "Pas de voettekst items aan die onderaan de zijbalk worden weergegeven.",
        icon: "Pictogram",
        link: "Link",
      },
      "render-html": {
        title: "HTML weergeven in chat",
        description:
          "HTML-reacties weergeven in assistentreacties.\nLet op: Dit kan resulteren in een veel hogere kwaliteit van de reacties, maar kan ook leiden tot potentiële beveiligingsrisico's.",
      },
    },
  },
  api: {
    title: "API-sleutels",
    description:
      "API-sleutels stellen de houder in staat om deze AnythingLLM-instantie programmatisch te openen en beheren.",
    link: "Lees de API-documentatie",
    generate: "Genereer Nieuwe API-sleutel",
    table: {
      key: "API-sleutel",
      by: "Aangemaakt Door",
      created: "Aangemaakt",
    },
  },
  llm: {
    title: "LLM Voorkeur",
    description:
      "Dit zijn de inloggegevens en instellingen voor je voorkeurs LLM-chat & inbeddingprovider. Het is belangrijk dat deze sleutels actueel en correct zijn, anders zal AnythingLLM niet goed werken.",
    provider: "LLM Provider",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure Service Endpoint",
        api_key: "API Key",
        chat_deployment_name: "Chat Deployment Naam",
        chat_model_token_limit: "Chat Model Token Limiet",
        model_type: "Model Type",
        model_type_tooltip:
          "Als uw implementatie een redeneermodel gebruikt (o1, o1-mini, o3-mini, enz.), stel dit dan in op 'Redeneren'. Anders kunnen uw chatverzoeken mislukken.",
        default: "Standaard",
        reasoning: "Redeneren",
      },
    },
  },
  transcription: {
    title: "Transcriptiemodel Voorkeur",
    description:
      "Dit zijn de inloggegevens en instellingen voor je voorkeurs transcriptiemodelprovider. Het is belangrijk dat deze sleutels actueel en correct zijn, anders worden media en audio niet getranscribeerd.",
    provider: "Transcriptieprovider",
    "warn-start":
      "Het gebruik van het lokale fluistermodel op machines met beperkte RAM of CPU kan AnythingLLM vertragen bij het verwerken van mediabestanden.",
    "warn-recommend":
      "We raden minstens 2GB RAM aan en upload bestanden <10Mb.",
    "warn-end":
      "Het ingebouwde model wordt automatisch gedownload bij het eerste gebruik.",
  },
  embedding: {
    title: "Inbedding Voorkeur",
    "desc-start":
      "Bij het gebruik van een LLM die geen ingebouwde ondersteuning voor een inbeddingengine heeft, moet je mogelijk aanvullende inloggegevens opgeven voor het inbedden van tekst.",
    "desc-end":
      "Inbedding is het proces van het omzetten van tekst in vectoren. Deze inloggegevens zijn vereist om je bestanden en prompts om te zetten naar een formaat dat AnythingLLM kan gebruiken om te verwerken.",
    provider: {
      title: "Inbedding Provider",
    },
  },
  text: {
    title: "Tekst Splitsen & Chunking Voorkeuren",
    "desc-start":
      "Soms wil je misschien de standaard manier wijzigen waarop nieuwe documenten worden gesplitst en gechunkt voordat ze in je vector database worden ingevoerd.",
    "desc-end":
      "Je moet deze instelling alleen wijzigen als je begrijpt hoe tekstsplitsing werkt en de bijbehorende effecten.",
    size: {
      title: "Tekst Chunk Grootte",
      description:
        "Dit is de maximale lengte van tekens die aanwezig kan zijn in een enkele vector.",
      recommend: "Inbed model maximale lengte is",
    },
    overlap: {
      title: "Tekst Chunk Overlap",
      description:
        "Dit is de maximale overlap van tekens die optreedt tijdens het chunking tussen twee aangrenzende tekstchunks.",
    },
  },
  vector: {
    title: "Vector Database",
    description:
      "Dit zijn de inloggegevens en instellingen voor hoe je AnythingLLM-instantie zal functioneren. Het is belangrijk dat deze sleutels actueel en correct zijn.",
    provider: {
      title: "Vector Database Provider",
      description: "Er is geen configuratie nodig voor LanceDB.",
    },
  },
  embeddable: {
    title: "Inbedbare Chat Widgets",
    description:
      "Inbedbare chatwidgets zijn openbare chatinterfaces die zijn gekoppeld aan een enkele werkruimte. Hiermee kun je werkruimten bouwen die je vervolgens kunt publiceren naar de wereld.",
    create: "Maak inbedding",
    table: {
      workspace: "Werkruimte",
      chats: "Verzonden Chats",
      active: "Actieve Domeinen",
      created: "Aangemaakt",
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
    title: "Inbedding Chats",
    export: "Exporteren",
    description:
      "Dit zijn alle opgenomen chats en berichten van elke inbedding die je hebt gepubliceerd.",
    table: {
      embed: "Inbedding",
      sender: "Afzender",
      message: "Bericht",
      response: "Reactie",
      at: "Verzonden Om",
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
    title: "Veiligheid",
    multiuser: {
      title: "Multi-Gebruikersmodus",
      description:
        "Stel je instantie in om je team te ondersteunen door Multi-Gebruikersmodus in te schakelen.",
      enable: {
        "is-enable": "Multi-Gebruikersmodus is Ingeschakeld",
        enable: "Schakel Multi-Gebruikersmodus In",
        description:
          "Standaard ben je de enige beheerder. Als beheerder moet je accounts aanmaken voor alle nieuwe gebruikers of beheerders. Verlies je wachtwoord niet, want alleen een beheerdersgebruiker kan wachtwoorden resetten.",
        username: "Beheerdersaccount gebruikersnaam",
        password: "Beheerdersaccount wachtwoord",
      },
    },
    password: {
      title: "Wachtwoordbeveiliging",
      description:
        "Bescherm je AnythingLLM-instantie met een wachtwoord. Als je dit vergeet, is er geen herstelmethode, dus zorg ervoor dat je dit wachtwoord opslaat.",
      "password-label": "Instances wachtwoord",
    },
  },
  event: {
    title: "Gebeurtenislogboeken",
    description:
      "Bekijk alle acties en gebeurtenissen die op deze instantie plaatsvinden voor monitoring.",
    clear: "Gebeurtenislogboeken Wissen",
    table: {
      type: "Gebeurtenistype",
      user: "Gebruiker",
      occurred: "Opgetreden Op",
    },
  },
  privacy: {
    title: "Privacy & Gegevensverwerking",
    description:
      "Dit is je configuratie voor hoe verbonden derden en AnythingLLM je gegevens verwerken.",
    llm: "LLM Selectie",
    embedding: "Inbedding Voorkeur",
    vector: "Vector Database",
    anonymous: "Anonieme Telemetrie Ingeschakeld",
  },
  connectors: {
    "search-placeholder": "Zoek naar data-connectoren",
    "no-connectors": "Geen data-connectoren gevonden.",
    obsidian: {
      name: "Obsidian",
      description: "Importeer een Obsidian-kluis met één klik.",
      vault_location: "Locatie van de kluis",
      vault_description:
        "Selecteer uw Obsidian-kluismap om alle notities en hun koppelingen te importeren.",
      selected_files: "{{count}} markdown-bestanden gevonden",
      importing: "Kluis importeren...",
      import_vault: "Kluis importeren",
      processing_time:
        "Dit kan even duren, afhankelijk van de grootte van uw kluis.",
      vault_warning:
        "Zorg ervoor dat uw Obsidian-kluis niet geopend is om conflicten te voorkomen.",
    },
    github: {
      name: "GitHub-repository",
      description:
        "Importeer een volledige openbare of privé GitHub-repository met één klik.",
      URL: "URL van de GitHub-repository",
      URL_explained: "URL van de GitHub-repository die u wilt verzamelen.",
      token: "GitHub-toegangstoken",
      optional: "optioneel",
      token_explained: "Toegangstoken om rate limiting te voorkomen.",
      token_explained_start: "Zonder een ",
      token_explained_link1: "Persoonlijk toegangstoken",
      token_explained_middle:
        ", kan de GitHub API het aantal bestanden dat kan worden verzameld beperken vanwege rate limiting. U kunt ",
      token_explained_link2: "een tijdelijk toegangstoken aanmaken",
      token_explained_end: " om dit probleem te voorkomen.",
      ignores: "Bestanden die genegeerd worden",
      git_ignore:
        "Lijst in .gitignore-indeling om specifieke bestanden te negeren tijdens het verzamelen. Druk op Enter na elke vermelding die u wilt opslaan.",
      task_explained:
        "Zodra de taak is voltooid, zijn alle bestanden beschikbaar om in te sluiten in werkruimtes in de documentkiezer.",
      branch: "De branch waarvan u bestanden wilt verzamelen.",
      branch_loading: "-- beschikbare branches laden --",
      branch_explained: "De branch waarvan u bestanden wilt verzamelen.",
      token_information:
        "Zonder het invullen van het <b>GitHub-toegangstoken</b> kan deze dataconnector alleen de <b>top-level</b> bestanden van de repository verzamelen vanwege de limieten voor het aantal aanvragen via de openbare API van GitHub.",
      token_personal:
        "Vraag hier een gratis persoonlijk toegangstoken aan met een GitHub-account.",
    },
    gitlab: {
      name: "GitLab-repository",
      description:
        "Importeer een volledige openbare of privé GitLab-repository met één klik.",
      URL: "URL van de GitLab-repository",
      URL_explained: "URL van de GitLab-repository die u wilt verzamelen.",
      token: "GitLab-toegangstoken",
      optional: "optioneel",
      token_explained: "Toegangstoken om rate limiting te voorkomen.",
      token_description:
        "Selecteer extra entiteiten om op te halen via de GitLab API.",
      token_explained_start: "Zonder een ",
      token_explained_link1: "Persoonlijk toegangstoken",
      token_explained_middle:
        ", kan de GitLab API het aantal bestanden dat kan worden verzameld beperken vanwege rate limiting. U kunt ",
      token_explained_link2: "een tijdelijk toegangstoken aanmaken",
      token_explained_end: " om dit probleem te voorkomen.",
      fetch_issues: "Problemen ophalen als documenten",
      ignores: "Bestanden negeren",
      git_ignore:
        "Lijst in  .gitignore-formaat om specifieke bestanden te negeren tijdens het verzamelen. Druk op Enter na elke vermelding die u wilt opslaan.",
      task_explained:
        "Zodra de taak is voltooid, zijn alle bestanden beschikbaar om in te sluiten in werkruimtes in de documentkiezer.",
      branch: "Branch waarvan u bestanden wilt verzamelen",
      branch_loading: "-- beschikbare branches laden --",
      branch_explained: "Branch waarvan u bestanden wilt verzamelen.",
      token_information:
        "Zonder het invullen van het <b>GitLab-toegangstoken</b> kan deze dataconnector alleen de <b>top-level</b> bestanden van de repository verzamelen vanwege de limieten voor het aantal aanvragen via de openbare GitLab API.",
      token_personal:
        "Vraag hier een gratis persoonlijk toegangstoken aan met een GitLab-account.",
    },
    youtube: {
      name: "YouTube-transcriptie",
      description:
        "Importeer de transcriptie van een volledige YouTube-video via een link.",
      URL: "URL van de YouTube-video",
      URL_explained_start:
        "Voer de URL van een YouTube-video in om de transcriptie ervan op te halen. De video moet ",
      URL_explained_link: "ondertiteling hebben en",
      URL_explained_end: "beschikbaar zijn.",
      task_explained:
        "Zodra de transcriptie is voltooid, kan deze worden ingesloten in werkruimtes in de documentkiezer.",
      language: "Transcriptietaal",
      language_explained:
        "Selecteer de taal van de transcriptie die u wilt verzamelen.",
      loading_languages: "-- beschikbare talen laden --",
    },
    "website-depth": {
      name: "Bulk Link Scraper",
      description:
        "Schraap een website en de bijbehorende sublinks tot een bepaalde diepte.",
      URL: "URL van de website",
      URL_explained: "URL van de website die u wilt schrapen.",
      depth: "Crawldiepte",
      depth_explained:
        "Dit is het aantal sublinks dat de tool vanaf de oorspronkelijke URL moet volgen.",
      max_pages: "Maximum aantal pagina's",
      max_pages_explained: "Maximum aantal links om te schrapen.",
      task_explained:
        "Zodra de taak is voltooid, is alle geschraapte inhoud beschikbaar om in te sluiten in werkruimtes in de documentkiezer.",
    },
    confluence: {
      name: "Confluence",
      description: "Importeer een volledige Confluence-pagina met één klik.",
      deployment_type: "Confluence-implementatietype",
      deployment_type_explained:
        "Bepaal of uw Confluence-instantie wordt gehost in de Atlassian-cloud of zelf gehost.",
      base_url: "Confluence-basis-URL",
      base_url_explained: "Dit is de basis-URL van uw Confluence-ruimte.",
      space_key: "Confluence-spacesleutel",
      space_key_explained:
        "Dit is de spacesleutel van uw Confluence-instantie die zal worden gebruikt. Begint meestal met ~",
      username: "Confluence-gebruikersnaam",
      username_explained: "Uw Confluence-gebruikersnaam",
      auth_type: "Confluence-authenticatietype",
      auth_type_explained:
        "Selecteer het authenticatietype dat u wilt gebruiken om toegang te krijgen tot uw Confluence-pagina's.",
      auth_type_username: "Gebruikersnaam en toegangstoken",
      auth_type_personal: "Persoonlijk toegangstoken",
      token: "Confluence-toegangstoken",
      token_explained_start:
        "U moet een toegangstoken opgeven voor authenticatie. U kunt ",
      token_explained_link: "hier",
      token_desc: " een toegangstoken genereren voor authenticatie",
      pat_token: "Persoonlijk Confluence-toegangstoken",
      pat_token_explained: "Uw persoonlijke Confluence-toegangstoken.",
      bypass_ssl: "SSL-certificaatvalidatie overslaan",
      bypass_ssl_explained:
        "Schakel deze optie in om SSL-certificaatvalidatie te omzeilen voor zelfgehoste Confluence-instanties met een zelfondertekend certificaat",
      task_explained:
        "Zodra de taak is voltooid, is de pagina-inhoud beschikbaar om in te sluiten in werkruimtes in de documentkiezer.",
    },
    manage: {
      documents: "Documenten",
      "data-connectors": "Gegevensconnectoren",
      "desktop-only":
        "Het bewerken van deze instellingen is alleen mogelijk op een desktopapparaat. Ga naar deze pagina op uw desktop om verder te gaan.",
      dismiss: "Afwijzen",
      editing: "Bewerken",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Mijn documenten",
      "new-folder": "Nieuwe map",
      "search-document": "Zoek naar een document",
      "no-documents": "Geen documenten",
      "move-workspace": "Verplaatsen naar werkruimte",
      name: "Naam",
      "delete-confirmation":
        "Weet u zeker dat u deze bestanden en mappen wilt verwijderen?\nHiermee worden de bestanden automatisch uit het systeem en alle bestaande werkruimten verwijderd.\nDeze actie is niet onomkeerbaar.",
      "removing-message":
        "{{count}} documenten en {{folderCount}} mappen worden verwijderd. Even geduld alstublieft.",
      "move-success": "{{count}} documenten succesvol verplaatst.",
      date: "Datum",
      type: "Type",
      no_docs: "Geen documenten",
      select_all: "Alles selecteren",
      deselect_all: "Alles deselecteren",
      remove_selected: "Verwijderen Geselecteerd",
      costs: "*Eenmalige kosten voor embedden",
      save_embed: "Opslaan en embedden",
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
      "processor-offline": "Documentverwerker niet beschikbaar",
      "processor-offline-desc":
        "We kunnen uw bestanden momenteel niet uploaden omdat de documentverwerker offline is. Probeer het later opnieuw.",
      "click-upload": "Klik om te uploaden of sleep en laat vallen",
      "file-types":
        "Ondersteunt tekstbestanden, csv's, spreadsheets, audiobestanden en meer!",
      "or-submit-link": "Of dien een link in",
      "placeholder-link": "https://example.com",
      fetching: "Bezig met ophalen...",
      "fetch-website": "Website ophalen",
      "privacy-notice":
        "Deze bestanden worden geüpload naar de documentverwerker die op deze AnythingLLM-instantie draait. Deze bestanden worden niet verzonden naar of gedeeld met derden.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Wat is het vastzetten van documenten?",
      pin_explained_block1:
        "Wanneer u een document vastzet in AnythingLLM, injecteren we de volledige inhoud van het document in uw promptvenster, zodat uw LLM het volledig kan begrijpen.",
      pin_explained_block2:
        "Dit werkt het beste met modellen met een grote context of kleine bestanden die essentieel zijn voor de kennisbasis.",
      pin_explained_block3:
        "Als u standaard niet de gewenste antwoorden krijgt van AnythingLLM, is vastzetten een uitstekende manier om met één klik antwoorden van hogere kwaliteit te krijgen.",
      accept: "Oké, begrepen.",
    },
    watching: {
      what_watching: "Wat doet het volgen van een document?",
      watch_explained_block1:
        "Wanneer u een document in AnythingLLM volgt, synchroniseren we de inhoud van uw document automatisch met regelmatige tussenpozen vanuit de originele bron. Hierdoor wordt de inhoud in elke werkruimte waar dit bestand wordt beheerd automatisch bijgewerkt.",
      watch_explained_block2:
        "Deze functie ondersteunt momenteel online content en is niet beschikbaar voor handmatig geüploade documenten.",
      watch_explained_block3_start:
        "U kunt beheren welke documenten worden gevolgd vanuit de ",
      watch_explained_block3_link: "Bestandsbeheer",
      watch_explained_block3_end: " beheerdersweergave.",
      accept: "Oké, begrepen",
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
    welcome: "Welkom in je nieuwe werkruimte.",
    get_started: "Om te beginnen, of",
    get_started_default: "Om te beginnen",
    upload: "Een document uploaden",
    or: "of",
    attachments_processing:
      "Bijlagen worden verwerkt. Even geduld alstublieft...",
    send_chat: "Een chatbericht verzenden.",
    send_message: "Een bericht verzenden",
    attach_file: "Een bestand aan deze chat toevoegen",
    slash: "Alle beschikbare slash-opdrachten voor chatten bekijken.",
    agents:
      "Alle beschikbare agents bekijken die je kunt gebruiken om te chatten.",
    start_agent_session: "Start agent session",
    text_size: "Tekstgrootte wijzigen.",
    microphone: "Spreek je prompt uit.",
    send: "Promptbericht naar werkruimte verzenden",
    tts_speak_message: "TTS-spreekbericht",
    copy: "Kopiëren",
    regenerate: "Opnieuw genereren",
    regenerate_response: "Reactie opnieuw genereren",
    good_response: "Goede reactie",
    more_actions: "Meer acties",
    hide_citations: "Citaten verbergen",
    show_citations: "Citaten weergeven",
    sources: "Bronnen",
    source_count_one: "{{count}} verwijzing",
    source_count_other: "{{count}} referenties",
    document: "Document",
    similarity_match: "wedstrijd",
    pause_tts_speech_message: "TTS-spraak van bericht pauzeren",
    fork: "Fork",
    delete: "Verwijderen",
    save_submit: "Opslaan en verzenden",
    cancel: "Annuleren",
    submit: "Indienen",
    edit_prompt: "Prompt bewerken",
    edit_response: "Reactie bewerken",
    edit_info_user:
      '"Verzenden" herstelt het antwoord van de AI. "Opslaan" wijzigt alleen uw bericht.',
    edit_info_assistant:
      "Uw wijzigingen worden direct op deze reactie opgeslagen.",
    see_less: "Minder zien",
    see_more: "Meer zien",
    at_agent: "@agent",
    default_agent_description: " - de standaardagent voor deze werkruimte.",
    custom_agents_coming_soon: "Aangepaste agenten komen binnenkort!",
    preset_reset_description:
      "Wis je chatgeschiedenis en begin een nieuwe chat",
    preset_exit_description: "Beëindig de huidige agent-sessie",
    add_new_preset: "Nieuwe preset toevoegen",
    add_new: "Voeg toe",
    edit: "Bewerk",
    publish: "Publiceren",
    stop_generating: "Stoppen met het genereren van antwoorden",
    command: "Commando",
    your_command: "jouw-commando",
    placeholder_prompt: "Dit is de inhoud die wordt ingevoegd voor je prompt.",
    description: "Beschrijving",
    placeholder_description: "Reageert met een gedicht over LLM's.",
    save: "Opslaan",
    small: "Klein",
    normal: "Normaal",
    large: "Groot",
    tools: "Gereedschap",
    slash_commands: "Korte commando's",
    agent_skills: "Vaardigheden van agenten",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Bladeren",
    text_size_label: "Lettergrootte",
    select_model: "Kies het model",
    workspace_llm_manager: {
      search: "Zoek naar LLM-aanbieders",
      loading_workspace_settings: "Werkruimte-instellingen laden...",
      available_models: "Beschikbare modellen voor {{provider}}",
      available_models_description: "Selecteer een model voor deze werkruimte.",
      save: "Gebruik dit model",
      saving: "Model instellen als standaard voor de werkruimte...",
      missing_credentials: "Deze aanbieder mist logingegevens!",
      missing_credentials_description: "Klik om logingegevens in te stellen",
    },
  },
  profile_settings: {
    edit_account: "Account bewerken",
    profile_picture: "Profielafbeelding",
    remove_profile_picture: "Profielafbeelding verwijderen",
    username: "Gebruikersnaam",
    new_password: "Nieuw wachtwoord",
    password_description: "Wachtwoord moet minimaal 8 tekens lang zijn",
    cancel: "Annuleren",
    update_account: "Account bijwerken",
    theme: "Themavoorkeur",
    language: "Voorkeurstaal",
    failed_upload: "Uploaden van profielafbeelding mislukt: {{error}}",
    upload_success: "Profielafbeelding geüpload.",
    failed_remove: "Verwijderen van profielafbeelding mislukt: {{error}}",
    profile_updated: "Profiel bijgewerkt.",
    failed_update_user: "Gebruiker bijwerken mislukt: {{error}}",
    account: "Account",
    support: "Ondersteuning",
    signout: "Afmelden",
  },
  "keyboard-shortcuts": {
    title: "Sneltoetsen",
    shortcuts: {
      settings: "Instellingen openen",
      workspaceSettings: "Huidige werkruimte-instellingen openen",
      home: "Naar de startpagina gaan",
      workspaces: "Werkruimtes beheren",
      apiKeys: "Instellingen voor API-sleutels",
      llmPreferences: "LLM-voorkeuren",
      chatSettings: "Chat-instellingen",
      help: "Help voor toetsenbordsneltoetsen weergeven",
      showLLMSelector: "LLM-selector voor werkruimtes weergeven",
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
        success_title: "Geslaagd!",
        success_description:
          "Uw systeemprompt is gepubliceerd op de Community Hub!",
        success_thank_you: "Bedankt voor het delen met de community!",
        view_on_hub: "Bekijken op Community Hub",
        modal_title: "Systeemprompt publiceren",
        name_label: "Naam",
        name_description: "Dit is de weergavenaam van je systeemprompt.",
        name_placeholder: "Mijn systeemprompt",
        description_label: "Beschrijving",
        description_description:
          "Dit is de beschrijving van je systeemprompt. Gebruik dit om het doel van je systeemprompt te beschrijven.",
        tags_label: "Tags",
        tags_description:
          "Tags worden gebruikt om je systeemprompt te labelen voor gemakkelijker zoeken. Je kunt meerdere tags toevoegen. Maximaal 5 tags. Maximaal 20 tekens per tag.",
        tags_placeholder: "Typ en druk op Enter om tags toe te voegen",
        visibility_label: "Zichtbaarheid",
        public_description:
          "Openbare systeemprompts zijn voor iedereen zichtbaar.",
        private_description:
          "Privé systeemprompts zijn alleen voor jou zichtbaar.",
        publish_button: "Publiceren naar Community Hub",
        submitting: "Publiceren...",
        submit: "Publiceren naar Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Dit is de daadwerkelijke systeemprompt die gebruikt zal worden om de LLM te begeleiden.",
        prompt_placeholder: "Voer hier uw systeemprompt in...",
      },
      agent_flow: {
        public_description: "Openbare agentflows zijn voor iedereen zichtbaar.",
        private_description: "Privé agentflows zijn alleen voor jou zichtbaar.",
        success_title: "Succes!",
        success_description:
          "Je agentflow is gepubliceerd op de Community Hub!",
        success_thank_you: "Bedankt voor het delen met de community!",
        view_on_hub: "Bekijk op de Community Hub",
        modal_title: "Agentflow publiceren",
        name_label: "Naam",
        name_description: "Dit is de weergavenaam van je agentflow.",
        name_placeholder: "Mijn agentflow",
        description_label: "Beschrijving",
        description_description:
          "Dit is de beschrijving van je agentflow. Gebruik dit om het doel van je agentflow te beschrijven.",
        tags_label: "Tags",
        tags_description:
          "Tags worden gebruikt om je agentflow te labelen voor eenvoudiger zoeken. Je kunt meerdere tags toevoegen. Maximaal 5 tags. Maximaal 20 tekens per tag.",
        tags_placeholder: "Typ en druk op Enter om tags toe te voegen",
        visibility_label: "Zichtbaarheid",
        publish_button: "Publiceren naar Community Hub",
        submitting: "Publiceren...",
        submit: "Publiceren naar Community Hub",
        privacy_note:
          "Agentflows worden altijd als privé geüpload om gevoelige gegevens te beschermen. U kunt de zichtbaarheid in de Community Hub wijzigen na publicatie. Controleer of uw flow geen gevoelige of privé-informatie bevat voordat u publiceert.",
      },
      slash_command: {
        success_title: "Succes!",
        success_description:
          "Je slash-commando is gepubliceerd op de Community Hub!",
        success_thank_you: "Bedankt voor het delen met de community!",
        view_on_hub: "Bekijk op de Community Hub",
        modal_title: "Slash-commando publiceren",
        name_label: "Naam",
        name_description: "Dit is de weergavenaam van je slash-commando.",
        name_placeholder: "Mijn slash-commando",
        description_label: "Beschrijving",
        description_description:
          "Dit is de beschrijving van je slash-commando. Gebruik dit om het doel van je slash-commando te beschrijven.",
        command_label: "Commando",
        command_description:
          "Dit is het slash-commando dat gebruikers moeten typen om deze preset te activeren.",
        command_placeholder: "mijn-commando",
        tags_label: "Tags",
        tags_description:
          "Tags worden gebruikt om je slash-commando te labelen voor eenvoudiger zoeken. Je kunt meerdere tags toevoegen. Max 5 tags. Maximaal 20 tekens per tag.",
        tags_placeholder: "Typ en druk op Enter om tags toe te voegen",
        visibility_label: "Zichtbaarheid",
        public_description:
          "Openbare slash-opdrachten zijn voor iedereen zichtbaar.",
        private_description:
          "Privé slash-opdrachten zijn alleen voor jou zichtbaar.",
        publish_button: "Publiceren naar Community Hub",
        submitting: "Publiceren...",
        prompt_label: "Prompt",
        prompt_description:
          "Dit is de prompt die wordt gebruikt wanneer de slash-opdracht wordt geactiveerd.",
        prompt_placeholder: "Voer hier je prompt in...",
      },
      generic: {
        unauthenticated: {
          title: "Authenticatie vereist",
          description:
            "U moet zich authenticeren bij de AnythingLLM Community Hub voordat u items kunt publiceren.",
          button: "Verbinden met Community Hub",
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
