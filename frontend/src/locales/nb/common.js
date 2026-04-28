const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Velkommen til",
      getStarted: "Kom i gang",
    },
    llm: {
      title: "LLM Preferanse",
      description:
        "Lovora kan fungere med mange LLM-leverandører. Dette vil være tjenesten som håndterer chatting.",
      search_placeholder: "Søk etter LLM-leverandører",
    },
    userSetup: {
      title: "Brukeroppsett",
      description: "Konfigurer brukerinnstillingene dine.",
      howManyUsers: "Hvor mange brukere vil bruke denne forekomsten?",
      justMe: "Bare meg",
      myTeam: "Laget mitt",
      instancePassword: "Forekomstpassord",
      setPassword: "Vil du sette opp et passord?",
      passwordReq: "Passord må være på minst 8 tegn.",
      passwordWarn:
        "Det er viktig å lagre dette passordet fordi det ikke finnes noen gjenopprettingsmetode.",
      adminUsername: "Brukernavn for administratorkontoen",
      adminPassword: "Admin konto passord",
      adminPasswordReq: "Passord må være på minst 8 tegn.",
      admin_username_placeholder: "Ditt admin-brukernavn",
      admin_password_placeholder: "Ditt admin-passord",
      password_symbols_error:
        "Passordet ditt inneholder ugyldige tegn. Tillatte symboler er _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Kunne ikke sette passord: {{error}}",
      setup_failed: "Feil: {{error}}",
      teamHint:
        "Som standard vil du være den eneste administratoren. Når introduksjonen er fullført, kan du opprette og invitere andre til å være brukere eller administratorer. Ikke mist passordet ditt, siden bare administratorer kan tilbakestille passord.",
    },
    data: {
      title: "Datahåndtering og personvern",
      description:
        "Vi er forpliktet til åpenhet og kontroll når det gjelder dine personopplysninger.",
      settingsHint:
        "Disse innstillingene kan rekonfigureres når som helst i innstillingene.",
    },
    survey: {
      title: "Velkommen til Lovora",
      description: "Hjelp oss med å forme Lovora for dine behov. Valgfritt.",
      email: "Hva er e-posten din?",
      useCase: "Hva skal du bruke Lovora til?",
      useCaseWork: "For jobb",
      useCasePersonal: "Til personlig bruk",
      useCaseOther: "Annen",
      comment: "Hvordan hørte du om Lovora?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube osv. - Fortell oss hvordan du fant oss!",
      skip: "Hopp over undersøkelsen",
      thankYou: "Takk for tilbakemeldingen!",
    },
    workspace: {
      title: "Lag ditt første arbeidsområde",
      description: "Lag ditt første arbeidsområde og kom i gang med Lovora.",
    },
  },
  common: {
    "workspaces-name": "Navn på arbeidsområde",
    error: "feil",
    success: "suksess",
    user: "Bruker",
    selection: "Modellvalg",
    saving: "Lagrer...",
    save: "Lagre endringer",
    previous: "Forrige side",
    next: "Neste side",
    cancel: "Avbryt",
    close: "Lukk",
    optional: "Valgfritt",
    yes: "Ja",
    no: "Nei",
    search: "Søk",
    copy: "Kopier",
    copied: "Kopiert",
    edit: "Rediger",
    delete: "Slett",
    username_requirements:
      "Brukernavnet må bestå av 2-32 tegn, begynne med en liten bokstav, og kun inneholde små bokstaver, tall, understrek, bindestreker og punktum.",
  },
  home: {
    welcome: "Velkommen",
    chooseWorkspace: "Velg et arbeidsområde for å begynne å chatte!",
    notAssigned:
      "Du er for øyeblikket ikke tilordnet noen arbeidsområder.\nKontakt administratoren din for å be om tilgang til et arbeidsområde.",
    goToWorkspace: 'Gå til "{{workspace}}"',
  },
  settings: {
    title: "Forekomstinnstillinger",
    system: "Generelle innstillinger",
    invites: "Invitasjoner",
    users: "Brukere",
    workspaces: "Arbeidsområder",
    "workspace-chats": "Arbeidsområdechatter",
    customization: "Tilpasning",
    interface: "UI-innstillinger",
    branding: "Merkevarebygging og hvitmerking",
    chat: "Samtale",
    "api-keys": "Utvikler API",
    llm: "LLM",
    transcription: "Transkripsjon",
    embedder: "Embedder",
    "text-splitting": "Tekstsplitter og chunking",
    "voice-speech": "Stemme og tale",
    "vector-database": "Vektordatabase",
    embeds: "Innebygd chat",
    "embed-chats": "Historikk for innebygde chatter",
    security: "Sikkerhet",
    "event-logs": "Hendelseslogger",
    privacy: "Personvern og data",
    "ai-providers": "AI-leverandører",
    "agent-skills": "Agentferdigheter",
    "community-hub": {
      title: "Fellesskapshub",
      trending: "Utforsk populære",
      "your-account": "Din konto",
      "import-item": "Importer element",
    },
    admin: "Administrator",
    tools: "Verktøy",
    "system-prompt-variables": "Systempromptvariabler",
    "experimental-features": "Eksperimentelle funksjoner",
    contact: "Kontakt kundestøtte",
    "browser-extension": "Nettleserutvidelse",
    "mobile-app": "Lovora Mobil",
  },
  login: {
    "multi-user": {
      welcome: "Velkommen",
      "placeholder-username": "Brukernavn",
      "placeholder-password": "Passord",
      login: "Logg inn",
      validating: "Validerer...",
      "forgot-pass": "Glemt passord",
      reset: "Tilbakestill",
    },
    "sign-in":
      "Skriv inn brukernavn og passord for å få tilgang til {{appName}}-forekomsten.",
    "password-reset": {
      title: "Tilbakestill passord",
      description:
        "Oppgi den nødvendige informasjonen nedenfor for å tilbakestille passordet ditt.",
      "recovery-codes": "Gjenopprettingskoder",
      "recovery-code": "Gjenopprettingskode {{index}}",
      "back-to-login": "Tilbake til pålogging",
    },
  },
  "main-page": {
    greeting: "Hvordan kan jeg hjelpe deg i dag?",
    noWorkspaceError: "Opprett et arbeidsområde før du starter en chat.",
    checklist: {
      title: "Komme i gang",
      tasksLeft: "oppgaver igjen",
      completed: "Du er på vei til å bli en Lovora-ekspert!",
      dismiss: "lukk",
      tasks: {
        create_workspace: {
          title: "Lag et arbeidsområde",
          description: "Lag ditt første arbeidsområde for å komme i gang",
          action: "Opprett",
        },
        send_chat: {
          title: "Send en chat",
          description: "Start en samtale med AI-assistenten din",
          action: "Send",
        },
        embed_document: {
          title: "Bygg inn et dokument",
          description: "Legg til ditt første dokument på arbeidsområdet ditt",
          action: "Bygg inn",
        },
        setup_system_prompt: {
          title: "Sett opp en systemforespørsel",
          description: "Konfigurer AI-assistentens oppførsel",
          action: "Sett opp",
        },
        define_slash_command: {
          title: "Definer en skråstrek-kommando",
          description: "Lag egendefinerte kommandoer for assistenten din",
          action: "Definer",
        },
        visit_community: {
          title: "Besøk Community Hub",
          description: "Utforsk fellesskapsressurser og maler",
          action: "Bla gjennom",
        },
      },
    },
    quickActions: {
      createAgent: "Opprett en agent",
      editWorkspace: "Rediger arbeidsområde",
      uploadDocument: "Last opp et dokument",
    },
    quickLinks: {
      title: "Hurtigkoblinger",
      sendChat: "Send chat",
      embedDocument: "Bygg inn et dokument",
      createWorkspace: "Opprett arbeidsområde",
    },
    exploreMore: {
      title: "Utforsk flere funksjoner",
      features: {
        customAgents: {
          title: "Egendefinerte AI-agenter",
          description:
            "Bygg kraftige AI-agenter og automatiseringer uten kode.",
          primaryAction: "Chat med @agent",
          secondaryAction: "Bygg en agentflyt",
        },
        slashCommands: {
          title: "Slash-kommandoer",
          description:
            "Spar tid og injiser forespørsler ved å bruke tilpassede skråstrekkommandoer.",
          primaryAction: "Opprett en skråstrek-kommando",
          secondaryAction: "Utforsk på Hub",
        },
        systemPrompts: {
          title: "Systemmeldinger",
          description:
            "Endre systemmeldingen for å tilpasse AI-svarene til et arbeidsområde.",
          primaryAction: "Endre en systemmelding",
          secondaryAction: "Administrer ledetekstvariabler",
        },
      },
    },
    announcements: {
      title: "Oppdateringer og kunngjøringer",
    },
    resources: {
      title: "Ressurser",
      links: {
        docs: "Dokumentasjon",
        star: "Stjernemerk på GitHub",
      },
      keyboardShortcuts: "Tastatursnarveier",
    },
  },
  "new-workspace": {
    title: "Nytt arbeidsområde",
    placeholder: "Mitt arbeidsområde",
  },
  "workspaces—settings": {
    general: "Generelle innstillinger",
    chat: "Chat-innstillinger",
    vector: "Vektordatabase",
    members: "Medlemmer",
    agent: "Agentkonfigurasjon",
  },
  general: {
    vector: {
      title: "Vektortelling",
      description: "Totalt antall vektorer i vektordatabasen din.",
    },
    names: {
      description:
        "Dette vil bare endre visningsnavnet på arbeidsområdet ditt.",
    },
    message: {
      title: "Foreslåtte chatmeldinger",
      description:
        "Tilpass meldingene som vil bli foreslått til brukerne av arbeidsområdet.",
      add: "Legg til ny melding",
      save: "Lagre meldinger",
      heading: "Forklar meg",
      body: "fordelene med Lovora",
    },
    pfp: {
      title: "Assistent-profilbilde",
      description:
        "Tilpass profilbildet til assistenten for dette arbeidsområdet.",
      image: "Arbeidsområdebilde",
      remove: "Fjern arbeidsområdebilde",
    },
    delete: {
      title: "Slett arbeidsområde",
      description:
        "Slett dette arbeidsområdet og alle dets data. Dette vil slette arbeidsområdet for alle brukere.",
      delete: "Slett arbeidsområde",
      deleting: "Sletter arbeidsområde …",
      "confirm-start": "Du er i ferd med å slette hele",
      "confirm-end":
        "arbeidsområde. Dette vil fjerne alle vektorinnbygginger i vektordatabasen din.\n\nDe originale kildefilene forblir urørt. Denne handlingen er irreversibel.",
    },
  },
  chat: {
    llm: {
      title: "Arbeidsområde LLM Leverandør",
      description:
        "Den spesifikke LLM-leverandøren og modellen som skal brukes for dette arbeidsområdet. Som standard bruker den systemets LLM-leverandør og -innstillinger.",
      search: "Søk i alle LLM-leverandører",
    },
    model: {
      title: "Workspace Chat-modell",
      description:
        "Den spesifikke chat-modellen som vil bli brukt for dette arbeidsområdet. Hvis tom, vil systemets LLM-preferanse brukes.",
      wait: "-- venter på modeller --",
    },
    mode: {
      title: "Chat-modus",
      automatic: {
        title: "Automatisk",
        description:
          "vil automatisk bruke verktøy hvis modellen og leverandøren støtter innebygd verktøykalling. Hvis innebygd verktøykalling ikke støttes, må du bruke @agent-kommandoen for å bruke verktøy.",
      },
      chat: {
        title: "Samtale",
        "desc-start": "vil gi svar med LLM-ens generelle kunnskap",
        and: "og",
        "desc-end": "dokumentkontekst som er funnet.",
      },
      query: {
        title: "Spørsmål",
        "desc-start": "vil gi svar",
        only: "bare",
        "desc-end": "hvis dokumentkontekst er funnet.",
      },
    },
    history: {
      title: "Chat historie",
      "desc-start":
        "Antall tidligere chatter som vil bli inkludert i svarets korttidsminne.",
      recommend: "Anbefaler 20.",
      "desc-end":
        "Alt mer enn 45 vil sannsynligvis føre til kontinuerlige chat-feil avhengig av meldingsstørrelse.",
    },
    prompt: {
      title: "Systemmelding",
      description:
        "Spørsmålet som skal brukes på dette arbeidsområdet. Definer konteksten og instruksjonene for AI for å generere et svar. Du bør gi en nøye utformet melding slik at AI kan generere et relevant og nøyaktig svar.",
      history: {
        title: "Systemmeldingshistorikk",
        clearAll: "Fjern alle",
        noHistory: "Ingen systemmeldingshistorikk tilgjengelig",
        restore: "Restaurere",
        delete: "Slett",
        publish: "Publiser til Community Hub",
        deleteConfirm:
          "Er du sikker på at du vil slette dette historieelementet?",
        clearAllConfirm:
          "Er du sikker på at du vil slette all historikk? Denne handlingen kan ikke angres.",
        expand: "Utvide",
      },
    },
    refusal: {
      title: "Svar på avslag i spørringsmodus",
      "desc-start": "Når du er inne",
      query: "spørsmål",
      "desc-end":
        "modus, vil du kanskje returnere et tilpasset avslagssvar når ingen kontekst er funnet.",
      "tooltip-title": "Hvorfor ser jeg dette?",
      "tooltip-description":
        "Du er i spørringsmodus, som kun bruker informasjon fra dokumentene dine. Bytt til chat-modus for mer fleksible samtaler, eller klikk her for å besøke dokumentasjonen vår for å lære mer om chat-moduser.",
    },
    temperature: {
      title: "LLM Temperatur",
      "desc-start":
        'Denne innstillingen kontrollerer hvor "kreative" LLM-svarene dine vil være.',
      "desc-end":
        "Jo høyere tall, jo mer kreativt. For noen modeller kan dette føre til usammenhengende svar når det er satt for høyt.",
      hint: "De fleste LLM-er har forskjellige akseptable områder av gyldige verdier. Kontakt leverandøren LLM for denne informasjonen.",
    },
  },
  "vector-workspace": {
    identifier: "Vektordatabaseidentifikator",
    snippets: {
      title: "Maks kontekstbiter",
      description:
        "Denne innstillingen kontrollerer det maksimale antallet kontekstbiter som sendes til LLM for per chat eller spørring.",
      recommend: "Anbefalt: 4",
    },
    doc: {
      title: "Terskel for dokumentlikhet",
      description:
        "Minste likhetspoeng som kreves for at en kilde skal anses relatert til chatten. Jo høyere tall, jo mer lik må kilden være chatten.",
      zero: "Ingen begrensning",
      low: "Lav (likhetspoeng ≥ 0,25)",
      medium: "Middels (likhetspoeng ≥ 0,50)",
      high: "Høy (likhetspoeng ≥ 0,75)",
    },
    reset: {
      reset: "Tilbakestill vektordatabase",
      resetting: "Fjerner vektorer...",
      confirm:
        "Du er i ferd med å tilbakestille dette arbeidsområdets vektordatabase. Dette vil fjerne alle vektorinnbygginger som for øyeblikket er innebygd.\n\nDe originale kildefilene forblir urørt. Denne handlingen er irreversibel.",
      error: "Workspace vektordatabase kunne ikke tilbakestilles!",
      success: "Workspace vektordatabase ble tilbakestilt!",
    },
  },
  agent: {
    "performance-warning":
      "Ytelsen til LLM-er som ikke eksplisitt støtter verktøykalling er svært avhengig av modellens muligheter og nøyaktighet. Noen evner kan være begrensede eller ikke-funksjonelle.",
    provider: {
      title: "Arbeidsområdeagent LLM Leverandør",
      description:
        "Den spesifikke LLM-leverandøren og modellen som skal brukes for dette arbeidsområdets @agent-agent.",
    },
    mode: {
      chat: {
        title: "Workspace Agent Chat-modell",
        description:
          "Den spesifikke chattemodellen som skal brukes for dette arbeidsområdets @agent-agent.",
      },
      title: "Workspace Agent-modell",
      description:
        "Den spesifikke LLM-modellen som skal brukes for dette arbeidsområdets @agent-agent.",
      wait: "-- venter på modeller --",
    },
    skill: {
      title: "Standard agent ferdigheter",
      description:
        "Forbedre de naturlige evnene til standardagenten med disse forhåndsbygde ferdighetene. Dette oppsettet gjelder alle arbeidsområder.",
      rag: {
        title: "RAG & langtidsminne",
        description:
          'La agenten bruke de lokale dokumentene dine til å svare på et spørsmål, eller be agenten om å "huske" deler av innholdet for gjenfinning av langtidsminnet.',
      },
      view: {
        title: "Se og oppsummer dokumenter",
        description:
          "La agenten liste og oppsummere innholdet i arbeidsområdefiler som er innebygd for øyeblikket.",
      },
      scrape: {
        title: "Skrap nettsider",
        description: "La agenten besøke og skrape innholdet på nettsteder.",
      },
      generate: {
        title: "Generer diagrammer",
        description:
          "Aktiver standardagenten for å generere ulike typer diagrammer fra data gitt eller gitt i chat.",
      },
      save: {
        title: "Generer og lagre filer",
        description:
          "Aktiver standardagenten for å generere og skrive til filer som kan lagres på datamaskinen din.",
      },
      web: {
        title: "Nettsøk",
        description:
          "Aktiver agenten din til å søke på nettet for å svare på spørsmålene dine ved å koble til en leverandør av nettsøk (SERP).",
      },
      sql: {
        title: "SQL kobling",
        description:
          "Aktiver agenten din for å kunne utnytte SQL for å svare på spørsmål ved å koble til ulike SQL-databaseleverandører.",
      },
      default_skill:
        "Som standard er denne ferdigheten aktivert, men du kan deaktivere den hvis du ikke vil at den skal være tilgjengelig for agenten.",
    },
  },
  recorded: {
    title: "Arbeidsområdechatter",
    description:
      "Dette er alle de innspilte chattene og meldingene som er sendt av brukere sortert etter opprettelsesdatoen.",
    export: "Eksport",
    export_success: "Chatter ble eksportert som {{name}}.",
    export_failed: "Kunne ikke eksportere chatter.",
    clear: "Tøm chatter",
    clear_confirm:
      "Er du sikker på at du vil tømme alle chatter?\n\nDenne handlingen kan ikke angres.",
    cleared: "Alle chatter ble tømt.",
    table: {
      id: "ID",
      by: "Sendt av",
      workspace: "Arbeidsområde",
      prompt: "Spør",
      response: "Svar",
      at: "Sendt kl",
    },
    row: {
      delete_confirm:
        "Er du sikker på at du vil slette denne chatten?\n\nDenne handlingen kan ikke angres.",
      viewing_text: "Viser tekst",
    },
  },
  system_prompt_variables: {
    title: "Systempromptvariabler",
    description:
      "Systempromptvariabler lagrer konfigurasjonsverdier som kan refereres i systemprompten for å aktivere dynamisk innhold.",
    add_variable: "Legg til variabel",
    no_variables: "Fant ingen variabler",
    table: {
      key: "Nøkkel",
      value: "Verdi",
      description: "Beskrivelse",
      type: "Variabeltype",
    },
    modal: {
      add_title: "Legg til ny variabel",
      edit_title: "Rediger {{key}}",
      required_fields: "Nøkkel og verdi er påkrevd",
      created: "Variabelen ble opprettet",
      create_failed: "Kunne ikke opprette variabel",
      updated: "Variabelen ble oppdatert",
      update_failed: "Kunne ikke oppdatere variabel",
      key_placeholder: "f.eks. company_name",
      key_help:
        "Nøkkelen må være unik og brukes i prompts som {key}. Bare bokstaver, tall og understreker er tillatt.",
      value_placeholder: "f.eks. Acme Corp",
      description_placeholder: "Valgfri beskrivelse",
      error: "Feil: {{error}}",
      create: "Opprett variabel",
      update: "Oppdater variabel",
    },
    row: {
      delete_confirm:
        'Er du sikker på at du vil slette variabelen "{{key}}"?\nDenne handlingen kan ikke angres.',
      deleted: "Variabelen ble slettet",
      delete_failed: "Kunne ikke slette variabel",
    },
  },
  customization: {
    interface: {
      title: "UI-innstillinger",
      description: "Angi UI-preferansene dine for Lovora.",
    },
    branding: {
      title: "Merkevarebygging og hvitmerking",
      description:
        "Hvitmerk Lovora-forekomsten din med tilpasset merkevarebygging.",
    },
    chat: {
      title: "Samtale",
      description: "Angi chatpreferansene dine for Lovora.",
      auto_submit: {
        title: "Auto-send taleinndata",
        description:
          "Send automatisk inn taleinndata etter en periode med stillhet",
      },
      auto_speak: {
        title: "Autoles svar",
        description: "Les svar fra AI automatisk",
      },
      spellcheck: {
        title: "Aktiver stavekontroll",
        description:
          "Aktiver eller deaktiver stavekontroll i chat-inndatafeltet",
      },
    },
    items: {
      theme: {
        title: "Tema",
        description: "Velg ditt foretrukne fargetema for applikasjonen.",
      },
      "show-scrollbar": {
        title: "Vis rullefelt",
        description: "Aktiver eller deaktiver rullefeltet i chattevinduet.",
      },
      "support-email": {
        title: "E-post til støtte",
        description:
          "Angi støtte-e-postadressen som skal være tilgjengelig for brukere når de trenger hjelp.",
      },
      "app-name": {
        title: "Navn",
        description:
          "Angi et navn som vises på påloggingssiden til alle brukere.",
      },
      "chat-message-alignment": {
        title: "Samtalemeldingsjustering",
        description:
          "Velg meldingsjusteringsmodus når du bruker chat-grensesnittet.",
      },
      "display-language": {
        title: "Språk",
        description:
          "Velg det foretrukne språket for å gjengi Lovoras brukergrensesnitt på - når oversettelser er tilgjengelige.",
      },
      logo: {
        title: "Merkevarelogo",
        description:
          "Last opp din egendefinerte logo for å vise frem på alle sider.",
        add: "Legg til en tilpasset logo",
        recommended: "Anbefalt størrelse: 800 x 200",
        remove: "Fjerne",
        replace: "Bytt ut",
      },
      "welcome-messages": {
        title: "Velkomstmeldinger",
        description:
          "Tilpass velkomstmeldingene som vises til brukerne dine. Bare ikke-administratorbrukere vil se disse meldingene.",
        new: "Ny",
        system: "systemmelding",
        user: "bruker",
        message: "beskjed",
        assistant: "Lovora Chat-assistent",
        "double-click": "Dobbeltklikk for å redigere...",
        save: "Lagre meldinger",
      },
      "browser-appearance": {
        title: "Nettleserutseende",
        description:
          "Tilpass utseendet til nettleserfanen og tittelen når appen er åpen.",
        tab: {
          title: "Tittel",
          description:
            "Angi en egendefinert fanetittel når appen er åpen i en nettleser.",
        },
        favicon: {
          title: "Favorittikon",
          description: "Bruk et tilpasset favorittikon for nettleserfanen.",
        },
      },
      "sidebar-footer": {
        title: "Sidebar-bunntekstelementer",
        description:
          "Tilpass bunntekstelementene som vises nederst på sidefeltet.",
        icon: "Ikon",
        link: "Lenke",
      },
      "render-html": {
        title: "Gjengi HTML i chat",
        description:
          "Gjengi HTML-svar i assistentsvar.\nDette kan resultere i en mye høyere responskvalitet, men kan også føre til potensielle sikkerhetsrisikoer.",
      },
    },
  },
  api: {
    title: "API nøkler",
    description:
      "API-nøkler lar innehaveren programmessig få tilgang til og administrere denne Lovora-forekomsten.",
    link: "Les API-dokumentasjonen",
    generate: "Generer ny API nøkkel",
    table: {
      key: "API Nøkkel",
      by: "Laget av",
      created: "Opprettet",
    },
  },
  api_keys: {
    row: {
      delete_confirm:
        "Er du sikker på at du vil deaktivere denne API-nøkkelen?\nEtter dette kan den ikke lenger brukes.\n\nDenne handlingen kan ikke angres.",
      deleted: "API-nøkkelen ble slettet permanent",
      copied: "API-nøkkelen ble kopiert til utklippstavlen",
      copy: "Kopier API-nøkkel",
    },
    modal: {
      title: "Opprett ny API-nøkkel",
      error: "Feil: {{error}}",
      copied: "API-nøkkelen ble kopiert til utklippstavlen",
      description:
        "Når API-nøkkelen er opprettet, kan den brukes til å få programmessig tilgang til og konfigurere denne Lovora-forekomsten.",
      read_docs: "Les API-dokumentasjonen",
      create: "Opprett API-nøkkel",
    },
  },
  users: {
    title: "Brukere",
    description:
      "Dette er alle kontoene på denne forekomsten. Hvis du fjerner en konto, mister brukeren umiddelbart tilgangen.",
    add: "Legg til bruker",
    permissions: "Tillatelser",
    table: {
      username: "Brukernavn",
      role: "Rolle",
      date_added: "Lagt til",
    },
    roles: {
      default_label: "Standard",
      manager_label: "Leder",
      admin_label: "Administrator",
      default: [
        "Kan bare sende chatter til arbeidsområder de er lagt til i av administratorer eller ledere.",
        "Kan ikke endre noen innstillinger.",
      ],
      manager: [
        "Kan vise, opprette og slette alle arbeidsområder og endre arbeidsområdespesifikke innstillinger.",
        "Kan opprette, oppdatere og invitere nye brukere til forekomsten.",
        "Kan ikke endre LLM, vektordatabase, embedding eller andre leverandørtilkoblinger.",
      ],
      admin: [
        "Høyeste brukertilgangsnivå.",
        "Kan se og gjøre alt i hele systemet.",
      ],
    },
    message_limit: {
      label: "Begrens meldinger per dag",
      description:
        "Begrens denne brukeren til et antall vellykkede forespørsler eller chatter innenfor et døgn.",
      input_label: "Meldingsgrense per dag",
    },
    row: {
      suspend_confirm:
        "Er du sikker på at du vil suspendere {{username}}?\nEtter dette blir brukeren logget ut og kan ikke logge inn i denne Lovora-forekomsten før en administrator opphever suspensjonen.",
      suspended: "Brukeren er suspendert.",
      unsuspended: "Brukeren er ikke lenger suspendert.",
      suspend: "Suspender",
      unsuspend: "Opphev suspensjon",
      delete_confirm:
        "Er du sikker på at du vil slette {{username}}?\nEtter dette blir brukeren logget ut og kan ikke bruke denne Lovora-forekomsten.\n\nDenne handlingen kan ikke angres.",
      deleted: "Brukeren ble slettet fra systemet.",
    },
    modal: {
      add_title: "Legg til bruker i forekomsten",
      edit_title: "Rediger {{username}}",
      username_placeholder: "Brukerens brukernavn",
      password: "Passord",
      password_placeholder: "Brukerens første passord",
      password_help: "Passordet må være minst 8 tegn langt",
      new_password: "Nytt passord",
      new_password_placeholder: "{{username}} sitt nye passord",
      bio: "Biografi",
      bio_placeholder: "Brukerens bio",
      error: "Feil: {{error}}",
      after_create:
        "Etter at brukeren er opprettet må vedkommende logge inn med de opprinnelige legitimasjonene for å få tilgang.",
      update: "Oppdater bruker",
    },
  },
  workspace_settings: {
    updated: "Arbeidsområdet ble oppdatert!",
    update_failed: "Feil: {{error}}",
    updating: "Oppdaterer...",
    update_workspace: "Oppdater arbeidsområde",
  },
  agent_config: {
    configure_skills: "Konfigurer agentferdigheter",
    configure_skills_description:
      "Tilpass standardagentens egenskaper ved å aktivere eller deaktivere spesifikke ferdigheter. Disse innstillingene gjelder på tvers av alle arbeidsområder.",
    updating: "Oppdaterer agent...",
    update: "Oppdater arbeidsområdeagent",
  },
  audio_preference: {
    provider: "Leverandør",
    save_failed: "Kunne ikke lagre innstillingene: {{error}}",
    tts: {
      title: "Preferanse for tekst-til-tale",
      description:
        "Her kan du velge hvilke tekst-til-tale-leverandører du vil bruke i Lovora. Som standard bruker Lovora nettleserens innebygde støtte for disse tjenestene.",
      saved: "Innstillingene for tekst-til-tale ble lagret.",
      search_placeholder: "Søk etter tekst-til-tale-leverandører",
    },
    stt: {
      title: "Preferanse for tale-til-tekst",
      description:
        "Her kan du velge hvilke tale-til-tekst-leverandører du vil bruke i Lovora. Som standard bruker Lovora nettleserens innebygde støtte for disse tjenestene.",
      saved: "Innstillingene for tale-til-tekst ble lagret.",
      search_placeholder: "Søk etter tale-til-tekst-leverandører",
    },
  },
  active_workspaces: {
    aria_label: "Arbeidsområder",
    reorder_failed: "Kunne ikke endre rekkefølgen på arbeidsområdene",
    general_appearance: "Generelle utseendeinnstillinger",
    threads: {
      aria_label: "Tråder",
      loading: "Laster tråder...",
      default: "standard",
      virtual_new: "*Ny tråd",
      create_failed: "Kunne ikke opprette tråd - {{error}}",
      starting: "Starter tråd...",
      new: "Ny tråd",
      delete_selected: "Slett valgte",
      deleted: "slettet tråd",
      options: "Trådvalg",
      rename_prompt: "Hva vil du gi denne tråden som nytt navn?",
      update_failed: "Tråden kunne ikke oppdateres! {{message}}",
      delete_confirm:
        "Er du sikker på at du vil slette denne tråden? Alle chattene i den blir slettet. Dette kan ikke angres.",
      delete_failed: "Tråden kunne ikke slettes!",
      deleted_success: "Tråden ble slettet!",
      rename: "Gi nytt navn",
      delete: "Slett tråd",
    },
  },
  model_table: {
    available_models: "Tilgjengelige modeller",
    search: "Søk i modeller",
    refresh: "Oppdater modeller",
  },
  footer_customization: {
    url_placeholder: "https://example.com",
  },
  llm: {
    title: "LLM Preferanse",
    description:
      "Dette er legitimasjonen og innstillingene for din foretrukne LLM chat- og innebyggingsleverandør. Det er viktig at disse tastene er oppdaterte og korrekte, ellers vil ikke Lovora fungere ordentlig.",
    provider: "LLM Leverandør",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure Tjenesteendepunkt",
        api_key: "API Nøkkel",
        chat_deployment_name: "Navn på chatdistribusjon",
        chat_model_token_limit: "Token-grense for chatmodell",
        model_type: "Modelltype",
        model_type_tooltip:
          'Hvis distribusjonen din bruker en resonneringsmodell (o1, o1-mini, o3-mini, etc.), sett denne til "Reasoning". Ellers kan chat-forespørslene dine mislykkes.',
        default: "Misligholde",
        reasoning: "Argumentasjon",
      },
    },
  },
  transcription: {
    title: "Preferanse for transkripsjonsmodell",
    description:
      "Dette er legitimasjonen og innstillingene for din foretrukne transkripsjonsmodellleverandør. Det er viktig at disse tastene er aktuelle og korrekte, ellers vil ikke mediefiler og lyd transkriberes.",
    provider: "Transkripsjonsleverandør",
    "warn-start":
      "Bruk av den lokale hviskemodellen på maskiner med begrenset RAM eller CPU kan stoppe Lovora ved behandling av mediefiler.",
    "warn-recommend": "Vi anbefaler minst 2 GB RAM og last opp filer <10 Mb.",
    "warn-end":
      "Den innebygde modellen vil automatisk lastes ned ved første gangs bruk.",
  },
  embedding: {
    title: "Innebyggingspreferanse",
    "desc-start":
      "Når du bruker en LLM som ikke støtter en innebyggingsmotor - kan det hende du må spesifisere legitimasjon for innebygging av tekst.",
    "desc-end":
      "Innebygging er prosessen med å gjøre tekst om til vektorer. Disse legitimasjonene kreves for å gjøre filene og meldingene dine om til et format som Lovora kan bruke til å behandle.",
    provider: {
      title: "Innebyggingsleverandør",
    },
  },
  text: {
    title: "Innstillinger for tekstdeling og deling",
    "desc-start":
      "Noen ganger kan det være lurt å endre standardmåten som nye dokumenter deles og deles på før de settes inn i vektordatabasen.",
    "desc-end":
      "Du bør bare endre denne innstillingen hvis du forstår hvordan tekstdeling fungerer og dets bivirkninger.",
    size: {
      title: "Tekstbitstørrelse",
      description:
        "Dette er den maksimale lengden på tegn som kan være til stede i en enkelt vektor.",
      recommend: "Legg inn modell maksimal lengde er",
    },
    overlap: {
      title: "Tekstdeloverlapping",
      description:
        "Dette er den maksimale overlappingen av tegn som oppstår under chunking mellom to tilstøtende tekstbiter.",
    },
  },
  vector: {
    title: "Vektordatabase",
    description:
      "Dette er legitimasjonen og innstillingene for hvordan Lovora-forekomsten din vil fungere. Det er viktig at disse nøklene er aktuelle og korrekte.",
    provider: {
      title: "Leverandør av vektordatabase",
      description: "Det er ingen konfigurasjon nødvendig for LanceDB.",
    },
  },
  embeddable: {
    title: "Innbyggbare chat-widgeter",
    description:
      "Innebyggbare chat-widgeter er offentlig vendte chat-grensesnitt som er knyttet til ett enkelt arbeidsområde. Disse lar deg bygge arbeidsområder som du deretter kan publisere til verden.",
    create: "Opprett innebygging",
    table: {
      workspace: "Arbeidsområde",
      chats: "Sendte chatter",
      active: "Aktive domener",
      created: "Opprettet",
    },
    row: {
      disable_confirm:
        "Er du sikker på at du vil deaktivere denne embed-en?\nNår den er deaktivert, vil embed-en ikke lenger svare på chatforespørsler.",
      disabled: "Embed-en er deaktivert.",
      enabled: "Embed-en er aktiv igjen.",
      delete_confirm:
        "Er du sikker på at du vil slette denne embed-en?\nNår den er slettet, vil den ikke lenger svare på chatter eller være aktiv.\n\nDenne handlingen kan ikke angres.",
      deleted: "Embed-en ble slettet fra systemet.",
    },
  },
  "embed-chats": {
    title: "Bygg inn chattehistorikk",
    export: "Eksport",
    description:
      "Dette er alle de innspilte chattene og meldingene fra alle innbygginger du har publisert.",
    table: {
      embed: "Bygg inn",
      sender: "Avsender",
      message: "Beskjed",
      response: "Svar",
      at: "Sendt kl",
    },
    export_success: "Embed-chatter ble eksportert som {{name}}.",
    export_failed: "Kunne ikke eksportere embed-chatter.",
    view_thoughts: "Vis tanker",
    row: {
      delete_confirm:
        "Er du sikker på at du vil slette denne chatten?\n\nDenne handlingen kan ikke angres.",
      viewing_text: "Viser tekst",
      session_id: "sessionID",
      username: "brukernavn",
      client_ip: "klient-IP-adresse",
      client_host: "klientvert-URL",
    },
  },
  chat_embed_widgets: {
    back: "Tilbake",
    widgets: "Widgeter",
    history: "Historikk",
    code: "Kode",
    disable: "Deaktiver",
    enable: "Aktiver",
    delete: "Slett",
    close: "Lukk",
    all_domains: "alle",
    code_snippet: {
      title: "Kopier embed-koden din",
      copied: "Kodebiten ble kopiert til utklippstavlen!",
      label: "HTML-script-tag for embed-kode",
      description:
        "La arbeidsområdechatten opptre som en hjelpesenterboble nederst i hjørnet på nettstedet ditt.",
      view_options: "Se alle stil- og konfigurasjonsvalg",
    },
  },
  security: {
    title: "Sikkerhet",
    multiuser: {
      title: "Flerbrukermodus",
      description:
        "Sett opp instansen din for å støtte teamet ditt ved å aktivere flerbrukermodus.",
      enable: {
        "is-enable": "Multi-User Mode er aktivert",
        enable: "Aktiver flerbrukermodus",
        description:
          "Som standard vil du være den eneste administratoren. Som administrator må du opprette kontoer for alle nye brukere eller administratorer. Ikke mist passordet ditt, siden bare en Admin-bruker kan tilbakestille passord.",
        username: "Brukernavn for administratorkontoen",
        password: "Admin konto passord",
      },
    },
    password: {
      title: "Passordbeskyttelse",
      description:
        "Beskytt Lovora-forekomsten din med et passord. Hvis du glemmer dette, er det ingen gjenopprettingsmetode, så sørg for at du lagrer dette passordet.",
      "password-label": "Forekomstpassord",
    },
  },
  event: {
    title: "Hendelseslogger",
    description:
      "Se alle handlinger og hendelser som skjer på denne forekomsten for overvåking.",
    clear: "Fjern hendelseslogger",
    table: {
      type: "Hendelsestype",
      user: "Bruker",
      occurred: "Oppstod kl",
    },
  },
  privacy: {
    title: "Personvern og datahåndtering",
    description:
      "Dette er din konfigurasjon for hvordan tilkoblede tredjepartsleverandører og Lovora håndterer dataene dine.",
    llm: "LLM Leverandør",
    embedding: "Innebyggingspreferanse",
    vector: "Vektordatabase",
    anonymous: "Anonym telemetri aktivert",
  },
  connectors: {
    "search-placeholder": "Søk etter datakoblinger",
    "no-connectors": "Fant ingen datakoblinger.",
    obsidian: {
      name: "Obsidian-hvelv",
      description: "Importer Obsidian hvelv med ett enkelt klikk.",
      vault_location: "Hvelvplassering",
      vault_description:
        "Velg Obsidian hvelvmappen for å importere alle notater og deres tilkoblinger.",
      selected_files: "Fant {{count}} nedmerkingsfiler",
      importing: "Importerer hvelv...",
      import_vault: "Importer hvelv",
      processing_time:
        "Dette kan ta en stund avhengig av størrelsen på hvelvet ditt.",
      vault_warning:
        "For å unngå konflikter, sørg for at Obsidian-hvelvet ikke er åpent for øyeblikket.",
    },
    github: {
      name: "GitHub Rep",
      description:
        "Importer et helt offentlig eller privat GitHub-lager med ett enkelt klikk.",
      URL: "GitHub-repo-URL",
      URL_explained: "Nettadressen til GitHub repoen du ønsker å samle inn.",
      token: "GitHub Tilgangstoken",
      optional: "valgfri",
      token_explained: "Tilgangstoken for å forhindre hastighetsbegrensning.",
      token_explained_start: "Uten en",
      token_explained_link1: "Personlig tilgangstoken",
      token_explained_middle:
        ", kan GitHub API begrense antallet filer som kan samles på grunn av hastighetsgrenser. Du kan",
      token_explained_link2: "opprette et midlertidig tilgangstoken",
      token_explained_end: "for å unngå dette problemet.",
      ignores: "Filen ignoreres",
      git_ignore:
        "List i .gitignore-format for å ignorere spesifikke filer under innsamling. Trykk enter etter hver oppføring du vil lagre.",
      task_explained:
        "Når de er fullført, vil alle filene være tilgjengelige for innbygging i arbeidsområder i dokumentvelgeren.",
      branch: "Filial du ønsker å samle filer fra.",
      branch_loading: "-- lasting av tilgjengelige grener --",
      branch_explained: "Filial du ønsker å samle filer fra.",
      token_information:
        "Uten å fylle ut <b>GitHub Access Token</b> vil denne datakoblingen kun kunne samle <b>toppnivå</b> filene til repoen på grunn av GitHubs offentlige API takstgrenser.",
      token_personal:
        "Få et gratis personlig tilgangstoken med en GitHub konto her.",
    },
    gitlab: {
      name: "GitLab Rep",
      description:
        "Importer et helt offentlig eller privat GitLab-lager med ett enkelt klikk.",
      URL: "GitLab-repo-URL",
      URL_explained: "URL til GitLab repo du ønsker å samle inn.",
      token: "GitLab Tilgangstoken",
      optional: "valgfri",
      token_explained: "Tilgangstoken for å forhindre hastighetsbegrensning.",
      token_description: "Velg flere enheter å hente fra GitLab API.",
      token_explained_start: "Uten en",
      token_explained_link1: "Personlig tilgangstoken",
      token_explained_middle:
        ", kan GitLab API begrense antallet filer som kan samles på grunn av hastighetsgrenser. Du kan",
      token_explained_link2: "opprette et midlertidig tilgangstoken",
      token_explained_end: "for å unngå dette problemet.",
      fetch_issues: "Hent problemer som dokumenter",
      ignores: "Filen ignoreres",
      git_ignore:
        "List i .gitignore-format for å ignorere spesifikke filer under innsamling. Trykk enter etter hver oppføring du vil lagre.",
      task_explained:
        "Når de er fullført, vil alle filene være tilgjengelige for innbygging i arbeidsområder i dokumentvelgeren.",
      branch: "Filial du ønsker å samle filer fra",
      branch_loading: "-- lasting av tilgjengelige grener --",
      branch_explained: "Filial du ønsker å samle filer fra.",
      token_information:
        "Uten å fylle ut <b>GitLab Access Token</b> vil denne datakoblingen kun kunne samle <b>toppnivå</b> filene til repoen på grunn av GitLabs offentlige API takstgrenser.",
      token_personal:
        "Få et gratis personlig tilgangstoken med en GitLab konto her.",
    },
    youtube: {
      name: "YouTube Transkripsjon",
      description:
        "Importer transkripsjonen av en hel YouTube video fra en kobling.",
      URL: "YouTube Video-URL",
      URL_explained_start:
        "Skriv inn nettadressen til en hvilken som helst YouTube video for å hente transkripsjonen. Videoen må ha",
      URL_explained_link: "lukkede bildetekster",
      URL_explained_end: "tilgjengelig.",
      task_explained:
        "Når det er fullført, vil transkripsjonen være tilgjengelig for innebygging i arbeidsområder i dokumentvelgeren.",
      language: "Transkripsjonsspråk",
      language_explained: "Velg språket for utskriften du vil samle inn.",
      loading_languages: "-- laster tilgjengelige språk --",
    },
    "website-depth": {
      name: "Lenkeskraper i dybden",
      description:
        "Skrap et nettsted og dets underlenker opp til en viss dybde.",
      URL: "Nettstedets URL",
      URL_explained: "URL til nettstedet du vil skrape.",
      depth: "Krypdybde",
      depth_explained:
        "Dette er antallet underordnede lenker som arbeideren skal følge fra opprinnelses-URLen.",
      max_pages: "Maksimalt antall sider",
      max_pages_explained: "Maksimalt antall lenker å skrape.",
      task_explained:
        "Når det er fullført, vil alt utskrapet innhold være tilgjengelig for innebygging i arbeidsområder i dokumentvelgeren.",
    },
    confluence: {
      name: "Confluence-side",
      description: "Importer en hel Confluence-side med ett enkelt klikk.",
      deployment_type: "Confluence distribusjonstype",
      deployment_type_explained:
        "Finn ut om Confluence-forekomsten din er vert for Atlassian-skyen eller selv-vert.",
      base_url: "Confluence basis-URL",
      base_url_explained: "Dette er basis-URLen til Confluence-området ditt.",
      space_key: "Confluence mellomromstast",
      space_key_explained:
        "Dette er mellomromsnøkkelen til din sammenløpsforekomst som vil bli brukt. Begynner vanligvis med ~",
      username: "Confluence Brukernavn",
      username_explained: "Ditt Confluence brukernavn",
      auth_type: "Confluence autentiseringstype",
      auth_type_explained:
        "Velg autentiseringstypen du vil bruke for å få tilgang til Confluence-sidene dine.",
      auth_type_username: "Brukernavn og tilgangstoken",
      auth_type_personal: "Personlig tilgangstoken",
      token: "Confluence Tilgangstoken",
      token_explained_start:
        "Du må oppgi et tilgangstoken for autentisering. Du kan generere et tilgangstoken",
      token_explained_link: "her",
      token_desc: "Tilgangstoken for autentisering",
      pat_token: "Confluence Personlig tilgangstoken",
      pat_token_explained: "Ditt Confluence personlige tilgangstoken.",
      bypass_ssl: "Omgå SSL-sertifikatvalidering",
      bypass_ssl_explained:
        "Aktiver dette alternativet for å omgå SSL-sertifikatvalidering for selvvertsbaserte sammenløpsforekomster med selvsignert sertifikat",
      task_explained:
        "Når det er fullført, vil sideinnholdet være tilgjengelig for innbygging i arbeidsområder i dokumentvelgeren.",
    },
    manage: {
      documents: "Dokumenter",
      "data-connectors": "Datakoblinger",
      "desktop-only":
        "Redigering av disse innstillingene er bare tilgjengelig på en stasjonær enhet. Gå til denne siden på skrivebordet for å fortsette.",
      dismiss: "Lukk",
      editing: "Redigering",
      workspace_updating: "Oppdaterer arbeidsområde...",
      workspace_updating_help: "Dette kan ta litt tid for store dokumenter",
      workspace_updated: "Arbeidsområdet ble oppdatert.",
      workspace_update_failed:
        "Oppdatering av arbeidsområdet mislyktes: {{error}}",
      error_with_message: "Feil: {{error}}",
    },
    directory: {
      "my-documents": "Mine dokumenter",
      "new-folder": "Ny mappe",
      "search-document": "Søk etter dokument",
      "no-documents": "Ingen dokumenter",
      "move-workspace": "Flytt til Workspace",
      name: "Navn",
      "delete-confirmation":
        "Er du sikker på at du vil slette disse filene og mappene?\nDette vil fjerne filene fra systemet og fjerne dem fra eksisterende arbeidsområder automatisk.\nDenne handlingen er ikke reversibel.",
      "removing-message":
        "Fjerner {{count}} dokumenter og {{folderCount}} mapper. Vennligst vent.",
      "move-success": "Flyttet {{count}} dokumenter.",
      date: "Dato",
      type: "Filtype",
      no_docs: "Ingen dokumenter",
      select_all: "Velg alle",
      deselect_all: "Fjern merket for Alle",
      remove_selected: "Fjern valgte",
      costs: "*Engangskostnad for innbygging",
      save_embed: "Lagre og bygg inn",
      moving_message: "Flytter {{count}} dokumenter. Vennligst vent.",
      move_error: "Feil ved flytting av filer: {{error}}",
      create_new_folder: "Opprett ny mappe",
      folder_name: "Mappenavn",
      folder_name_placeholder: "Skriv inn mappenavn",
      create_folder: "Opprett mappe",
      new_folder_failed: "Kunne ikke opprette mappe",
      removing_selected_from_workspace:
        "Fjerner valgte filer fra arbeidsområdet",
      removing_file_from_workspace: "Fjerner fil fra arbeidsområdet",
      estimated_cost: "Estimert kostnad",
      pin_failed: "Kunne ikke feste dokumentet.",
      unpin_failed: "Kunne ikke løsne dokumentet.",
      pin_success: "Dokumentet ble festet til arbeidsområdet",
      unpin_success: "Dokumentet ble løsnet fra arbeidsområdet",
      pin_failed_error: "Kunne ikke feste dokumentet. {{error}}",
      pin_tooltip: "Fest til arbeidsområdet",
      unpin_tooltip: "Løsne fra arbeidsområdet",
      pinned: "Festet",
      unpin: "Løsne",
      watch_failed: "Kunne ikke overvåke dokumentet.",
      unwatch_failed: "Kunne ikke stoppe overvåkingen av dokumentet.",
      watch_success: "Dokumentet vil bli overvåket for endringer.",
      unwatch_success:
        "Dokumentet vil ikke lenger bli overvåket for endringer.",
      watch_failed_error: "Kunne ikke overvåke dokumentet. {{error}}",
      stop_watching: "Slutt å overvåke endringer",
      watch_for_changes: "Overvåk dokument for endringer",
      remove_document: "Fjern dokument fra arbeidsområdet",
    },
    upload: {
      "processor-offline": "Dokumentbehandler utilgjengelig",
      "processor-offline-desc":
        "Vi kan ikke laste opp filene dine akkurat nå fordi dokumentbehandleren er frakoblet. Vennligst prøv igjen senere.",
      "click-upload": "Klikk for å laste opp eller dra og slipp",
      "file-types": "støtter tekstfiler, csv-er, regneark, lydfiler og mer!",
      "or-submit-link": "eller send inn en lenke",
      "placeholder-link": "https://example.com",
      fetching: "Henter...",
      "fetch-website": "Hent nettsted",
      "privacy-notice":
        "Disse filene vil bli lastet opp til dokumentbehandleren som kjører på denne Lovora-forekomsten. Disse filene sendes eller deles ikke med en tredjepart.",
      "scraping-link": "Henter inn lenke...",
      "link-error": "Feil ved opplasting av lenke: {{error}}",
      "link-success": "Lenken ble lastet opp",
      "uploading-file": "Laster opp fil...",
      "file-failed": "denne filen kunne ikke lastes opp",
    },
    drupalwiki: {
      fetching:
        "Henter alle sider for de oppgitte Drupal Wiki-områdene. Dette kan ta litt tid.",
      success:
        "Sider ble hentet fra Drupal Wiki-områdene {{spaceIds}}. Utdatamappen er {{destination}}.",
      base_url: "Basis-URL for Drupal Wiki",
      base_url_help:
        "Dette er basis-URL-en til <link>Drupal Wiki</link>-installasjonen din.",
      base_url_placeholder:
        "f.eks. https://mywiki.drupal-wiki.net, https://drupalwiki.mycompany.tld, osv...",
      space_ids: "Drupal Wiki Space-ID-er",
      space_ids_help:
        "Kommaseparerte Space-ID-er du vil hente ut. Se <manual>veiledningen</manual> for hvordan du finner Space-ID-ene. Sørg for at API-token-brukeren har tilgang til disse områdene.",
      space_ids_placeholder: "f.eks. 12,34,69",
      api_token: "Drupal Wiki API-token",
      api_token_help:
        "Du må oppgi et API-token for autentisering. Se Drupal Wiki-<manual>veiledningen</manual> for hvordan du genererer et API-token for brukeren din.",
      api_token_description: "Tilgangstoken for autentisering.",
      collecting: "Samler inn sider...",
      submit: "Send inn",
      loading_note:
        "Når dette er ferdig, vil alle sider være tilgjengelige for embedding i arbeidsområder.",
    },
    pinning: {
      what_pinning: "Hva er dokumentfesting?",
      pin_explained_block1:
        "Når du <b>fester</b> et dokument i Lovora, injiserer vi hele innholdet i dokumentet i forespørselsvinduet ditt slik at LLM kan forstå det fullt ut.",
      pin_explained_block2:
        "Dette fungerer best med <b>modeller med stor kontekst</b> eller små filer som er kritiske for kunnskapsbasen.",
      pin_explained_block3:
        "Hvis du ikke får svarene du ønsker fra Lovora som standard, er festing en fin måte å få svar av høyere kvalitet med et klikk.",
      accept: "Ok, skjønner det",
    },
    watching: {
      what_watching: "Hva gjør det å se et dokument?",
      watch_explained_block1:
        "Når du <b>ser</b> et dokument i Lovora vil vi <i>automatisk</i> synkronisere dokumentinnholdet ditt fra den opprinnelige kilden med jevne mellomrom. Dette vil automatisk oppdatere innholdet i hvert arbeidsområde der denne filen administreres.",
      watch_explained_block2:
        "Denne funksjonen støtter for øyeblikket nettbasert innhold og vil ikke være tilgjengelig for manuelt opplastede dokumenter.",
      watch_explained_block3_start:
        "Du kan administrere hvilke dokumenter som overvåkes fra",
      watch_explained_block3_link: "Filbehandler",
      watch_explained_block3_end: "administratorvisning.",
      accept: "Ok, skjønner det",
    },
  },
  chat_window: {
    welcome: "Velkommen til ditt nye arbeidsområde.",
    get_started: "For å komme i gang kan du enten",
    get_started_default: "For å komme i gang",
    upload: "laste opp et dokument",
    or: "eller",
    attachments_processing: "Vedlegg behandles. Vennligst vent...",
    send_chat: "send en chat.",
    send_message: "Send en melding",
    attach_file: "Legg ved en fil i denne chatten",
    slash: "Se alle tilgjengelige skråstrekkommandoer for chatting.",
    agents: "Se alle tilgjengelige agenter du kan bruke til å chatte.",
    start_agent_session: "Start agentøkt",
    text_size: "Endre tekststørrelse.",
    microphone: "Si spørsmålet ditt.",
    send: "Send melding til arbeidsområdet",
    tts_speak_message: "Les opp melding",
    copy: "Kopier",
    regenerate: "Regenerer",
    regenerate_response: "Generer svaret på nytt",
    good_response: "Bra svar",
    more_actions: "Flere handlinger",
    hide_citations: "Skjul sitater",
    show_citations: "Vis sitater",
    sources: "Kilder",
    source_count_one: "{{count}} referanse",
    source_count_other: "{{count}} referanser",
    document: "Dokument",
    similarity_match: "treff",
    pause_tts_speech_message: "Pause TTS-tale for melding",
    fork: "Forgren",
    delete: "Slett",
    save_submit: "Lagre og send",
    cancel: "Avbryt",
    submit: "Send",
    edit_prompt: "Rediger melding",
    edit_response: "Rediger svaret",
    edit_info_user:
      '"Send" genererer AI-svaret på nytt. "Lagre" oppdaterer bare meldingen din.',
    edit_info_assistant: "Endringene dine lagres direkte i dette svaret.",
    see_less: "Se mindre",
    see_more: "Se mer",
    at_agent: "@agent",
    default_agent_description: "- standardagenten for dette arbeidsområdet.",
    custom_agents_coming_soon: "tilpassede agenter kommer snart!",
    preset_reset_description: "Tøm chathistorikken og start en ny chat",
    preset_exit_description: "Stopp gjeldende agentøkt",
    add_new_preset: "Legg til ny forhåndsinnstilling",
    add_new: "Legg til ny",
    edit: "Rediger",
    publish: "Publiser",
    stop_generating: "Stopp generering av svar",
    command: "Kommando",
    your_command: "din-kommando",
    placeholder_prompt:
      "Dette er innholdet som legges inn foran meldingen din.",
    description: "Beskrivelse",
    placeholder_description: "Svarer med et dikt om LLM-er.",
    save: "Lagre",
    small: "Liten",
    normal: "Vanlig",
    large: "Stor",
    tools: "Verktøy",
    slash_commands: "Slash-kommandoer",
    agent_skills: "Agentferdigheter",
    manage_agent_skills: "Administrer agentferdigheter",
    agent_skills_disabled_in_session:
      "Kan ikke endre ferdigheter under en aktiv agentøkt. Bruk /exit for å avslutte økten først.",
    browse: "Bla gjennom",
    text_size_label: "Tekststørrelse",
    select_model: "Velg modell",
    workspace_llm_manager: {
      search: "Søk",
      loading_workspace_settings: "Laster arbeidsområdeinnstillinger...",
      available_models: "Tilgjengelige modeller for {{provider}}",
      available_models_description:
        "Velg en modell du vil bruke for dette arbeidsområdet.",
      save: "Bruk denne modellen",
      saving: "Setter modellen som standard for arbeidsområdet...",
      missing_credentials: "Denne leverandøren mangler legitimasjon!",
      missing_credentials_description: "Sett opp nå",
    },
  },
  profile_settings: {
    edit_account: "Rediger konto",
    profile_picture: "Profilbilde",
    remove_profile_picture: "Fjern profilbilde",
    username: "Brukernavn",
    new_password: "Nytt passord",
    password_description: "Passordet må være minst 8 tegn langt",
    cancel: "Avbryt",
    update_account: "Oppdater konto",
    theme: "Temapreferanse",
    language: "Foretrukket språk",
    failed_upload: "Kunne ikke laste opp profilbilde: {{error}}",
    upload_success: "Profilbilde lastet opp.",
    failed_remove: "Kunne ikke fjerne profilbildet: {{error}}",
    profile_updated: "Profilen er oppdatert.",
    failed_update_user: "Kunne ikke oppdatere bruker: {{error}}",
    account: "Konto",
    support: "Støtte",
    signout: "Logg ut",
  },
  "keyboard-shortcuts": {
    title: "Tastatursnarveier",
    shortcuts: {
      settings: "Åpne innstillinger",
      workspaceSettings: "Åpne gjeldende arbeidsområdeinnstillinger",
      home: "Gå til hjem",
      workspaces: "Administrer arbeidsområder",
      apiKeys: "API-nøkkelinnstillinger",
      llmPreferences: "LLM-innstillinger",
      chatSettings: "Chat-innstillinger",
      help: "Vis hjelp for tastatursnarveier",
      showLLMSelector: "Vis LLM-velger for arbeidsområdet",
    },
  },
  community_hub: {
    browse: {
      title: "Community Hub",
      description: "Del og samarbeid med Lovora-fellesskapet.",
      recently_added: "Nylig lagt til i Lovora Community Hub",
      latest_description: "Utforsk de nyeste tilleggene i Lovora Community Hub",
      explore_more: "Utforsk mer →",
    },
    card: {
      verified: "Verifisert",
      unverified: "Ikke verifisert",
      skill: "Ferdighet",
      file: "fil",
      found: "funnet",
      import: "Importer",
    },
    authentication: {
      save_failed: "Kunne ikke lagre API-nøkkelen",
      save_success: "API-nøkkelen ble lagret",
      disconnect_failed: "Kunne ikke koble fra huben",
      disconnect_success: "Koblet fra Lovora Community Hub",
      title: "Din Lovora Community Hub-konto",
      description:
        "Når du kobler til Lovora Community Hub-kontoen din, får du tilgang til <bold>private</bold> elementer i Lovora Community Hub og kan laste opp dine egne elementer til Lovora Community Hub.",
      why_title: "Hvorfor koble til Lovora Community Hub-kontoen min?",
      why_description:
        "Når du kobler til Lovora Community Hub-kontoen din, kan du hente inn <bold>private</bold> elementer fra Lovora Community Hub og laste opp dine egne elementer til Lovora Community Hub.",
      why_note:
        "Du trenger ikke å koble til Lovora Community Hub-kontoen din for å hente inn offentlige elementer fra Lovora Community Hub.",
      api_key_label: "Lovora Hub API-nøkkel",
      api_key_placeholder: "Skriv inn Lovora Hub API-nøkkelen din",
      api_key_helper:
        "Du finner API-nøkkelen din på <profile>profil-siden din i Lovora Community Hub</profile>.",
      disconnect: "Koble fra",
    },
    import: {
      layout: {
        title: "Importer et fellesskapselement",
        description:
          "Importer elementer fra Lovora Community Hub for å utvide forekomsten din med prompts, ferdigheter og kommandoer laget av fellesskapet.",
      },
      introduction: {
        missing_id: "Skriv inn en element-ID",
        title: "Importer et element fra Community Hub",
        description_1:
          "Community Hub er et sted der du kan finne, dele og importere agentferdigheter, systemmeldinger, slash-kommandoer og mer.",
        description_2:
          "Disse elementene lages av Lovora-teamet og fellesskapet, og er en god måte å komme i gang med Lovora på og utvide Lovora etter dine behov.",
        description_3:
          "Det finnes både <bold>private</bold> og <bold>offentlige</bold> elementer i Community Hub. Private elementer er bare synlige for deg, mens offentlige elementer er synlige for alle.",
        warning:
          "Hvis du henter inn et privat element, må du sørge for at det er <bold>delt med et team</bold> du tilhører, og at du har lagt til en <link>Tilkoblingsnøkkel</link>.",
        item_id_label: "Import-ID for Community Hub-element",
        item_id_placeholder: "allm-community-id:agent-skill:1234567890",
        continue: "Fortsett med import →",
      },
      completed: {
        title: "Community Hub-element importert",
        success:
          '"{{name}}" av typen {{itemType}} ble importert. Det er nå tilgjengelig i Lovora-forekomsten din.',
        view_agent_skills: 'Se "{{name}}" i Agentferdigheter',
        changes_note:
          "Endringer du gjør i dette elementet blir ikke synkronisert tilbake til Community Hub. Du kan nå endre det etter behov.",
        import_another: "Importer et nytt element",
      },
      item: {
        created_by: "Opprettet av",
        learn_more: "Les mer →",
        file_counter: "{{name}} ({{index}} av {{count}} filer)",
        agent_skill: {
          import_success: "Agentferdigheten ble importert!",
          import_error: "Kunne ikke importere agentferdigheten. {{error}}",
          warning_title: "Importer bare agentferdigheter du stoler på",
          warning_description:
            "Agentferdigheter kan kjøre kode på Lovora-forekomsten din, så importer bare agentferdigheter fra kilder du stoler på. Du bør også gå gjennom koden før du importerer. Hvis du er usikker på hva en ferdighet gjør, bør du ikke importere den.",
          review_title: 'Gå gjennom agentferdigheten "{{name}}"',
          verified: "Verifisert kode",
          unverified: "Denne ferdigheten er ikke verifisert.",
          description:
            "Agentferdigheter gir Lovora-arbeidsområdet ditt nye muligheter via <code>@agent</code>-ferdigheter som kan utføre bestemte oppgaver når de brukes.",
          importing: "Importerer...",
          import_button: "Importer agentferdighet",
        },
        agent_flow: {
          import_success: "Agentflyten ble importert!",
          import_error: "Kunne ikke importere agentflyten. {{error}}",
          title: 'Importer agentflyten "{{name}}"',
          description:
            "Agentflyter lar deg lage gjenbrukbare sekvenser av handlinger som kan utløses av agenten din.",
          flow_details: "Flytdetaljer:",
          description_label: "Beskrivelse: {{description}}",
          steps_label: "Trinn ({{count}}):",
          importing: "Importerer...",
          import_button: "Importer agentflyt",
        },
        system_prompt: {
          applying: "Bruker systemmeldingen på arbeidsområdet...",
          apply_error: "Kunne ikke bruke systemmeldingen. {{error}}",
          apply_success: "Systemmeldingen ble brukt på arbeidsområdet.",
          review_title: 'Gå gjennom systemmeldingen "{{name}}"',
          description:
            "Systemmeldinger brukes til å styre oppførselen til AI-agenter og kan brukes på alle eksisterende arbeidsområder.",
          provided_prompt: "Levert systemmelding:",
          apply_to_workspace: "Bruk på arbeidsområde",
          available_workspaces: "Tilgjengelige arbeidsområder",
          apply_button: "Bruk systemmelding på arbeidsområde",
        },
        slash_command: {
          import_success: "Slash-kommandoen {{command}} ble importert!",
          import_error: "Kunne ikke importere slash-kommandoen. {{error}}",
          review_title: 'Gå gjennom slash-kommandoen "{{name}}"',
          description:
            "Slash-kommandoer brukes til å forhåndsfylle informasjon i en prompt mens du chatter med et Lovora-arbeidsområde.\n\nSlash-kommandoen vil være tilgjengelig under chat ved at du bare bruker <code>{{command}}</code>, slik du ville brukt en hvilken som helst annen kommando.",
          import_button: "Importer slash-kommando",
        },
        unknown: {
          title: "Elementet støttes ikke",
          description:
            "Vi fant et element i Community Hub, men vi vet ikke hva det er, eller det støttes ennå ikke for import til Lovora.",
          item_id: "Element-ID: <bold>{{id}}</bold>",
          item_type: "Elementtype: <bold>{{itemType}}</bold>",
          contact_support:
            "Kontakt kundestøtte på e-post hvis du trenger hjelp til å importere dette elementet.",
          try_another: "Prøv et annet element",
        },
      },
    },
    publish: {
      system_prompt: {
        success_title: "Suksess!",
        success_description:
          "Systemforespørselen din har blitt publisert til fellesskapshuben!",
        success_thank_you: "Takk for at du deler med fellesskapet!",
        view_on_hub: "Se på Community Hub",
        modal_title: "Publiser systemforespørsel",
        name_label: "Navn",
        name_description: "Dette er visningsnavnet på systemforespørselen.",
        name_placeholder: "Min systemmelding",
        description_label: "Beskrivelse",
        description_description:
          "Dette er beskrivelsen av systemmeldingen. Bruk denne for å beskrive formålet med systemforespørselen.",
        tags_label: "Tagger",
        tags_description:
          "Tagger brukes til å merke systemforespørselen for enklere søk. Du kan legge til flere tagger. Maks 5 tagger. Maks 20 tegn per tag.",
        tags_placeholder: "Skriv inn og trykk Enter for å legge til tagger",
        visibility_label: "Synlighet",
        public_description:
          "Offentlige systemoppfordringer er synlige for alle.",
        private_description:
          "Private systemforespørsler er bare synlige for deg.",
        publish_button: "Publiser til Community Hub",
        submitting: "Publiserer...",
        submit: "Publiser til Community Hub",
        prompt_label: "Spør",
        prompt_description:
          "Dette er den faktiske systemmeldingen som vil bli brukt til å veilede LLM.",
        prompt_placeholder: "Skriv inn systemforespørselen din her...",
      },
      agent_flow: {
        public_description: "Offentlige agentstrømmer er synlige for alle.",
        private_description: "Private agentflyter er kun synlige for deg.",
        success_title: "Suksess!",
        success_description:
          "Agentflyten din har blitt publisert til fellesskapshuben!",
        success_thank_you: "Takk for at du deler med fellesskapet!",
        view_on_hub: "Se på Community Hub",
        modal_title: "Publiser Agent Flow",
        name_label: "Navn",
        name_description: "Dette er visningsnavnet på agentflyten din.",
        name_placeholder: "Min Agent Flow",
        description_label: "Beskrivelse",
        description_description:
          "Dette er beskrivelsen av agentflyten din. Bruk dette til å beskrive formålet med agentflyten din.",
        tags_label: "Tagger",
        tags_description:
          "Tagger brukes til å merke agentflyten din for enklere søk. Du kan legge til flere tagger. Maks 5 tagger. Maks 20 tegn per tag.",
        tags_placeholder: "Skriv inn og trykk Enter for å legge til tagger",
        visibility_label: "Synlighet",
        publish_button: "Publiser til Community Hub",
        submitting: "Publiserer...",
        submit: "Publiser til Community Hub",
        privacy_note:
          "Agentflyter lastes alltid opp som private for å beskytte eventuelle sensitive data. Du kan endre synligheten i Community Hub etter publisering. Kontroller at flyten din ikke inneholder sensitiv eller privat informasjon før publisering.",
      },
      slash_command: {
        success_title: "Suksess!",
        success_description:
          "Din Slash-kommando har blitt publisert til Community Hub!",
        success_thank_you: "Takk for at du deler med fellesskapet!",
        view_on_hub: "Se på Community Hub",
        modal_title: "Publiser Slash Command",
        name_label: "Navn",
        name_description: "Dette er visningsnavnet på skråstrekkommandoen.",
        name_placeholder: "Min Slash Command",
        description_label: "Beskrivelse",
        description_description:
          "Dette er beskrivelsen av skråstrek-kommandoen din. Bruk denne for å beskrive formålet med skråstrek-kommandoen.",
        command_label: "Kommando",
        command_description:
          "Dette er skråstrekkommandoen som brukere vil skrive for å utløse denne forhåndsinnstillingen.",
        command_placeholder: "min-kommando",
        tags_label: "Tagger",
        tags_description:
          "Tagger brukes til å merke skråstrekkommandoen for enklere søk. Du kan legge til flere tagger. Maks 5 tagger. Maks 20 tegn per tag.",
        tags_placeholder: "Skriv inn og trykk Enter for å legge til tagger",
        visibility_label: "Synlighet",
        public_description:
          "Offentlige skråstrekkommandoer er synlige for alle.",
        private_description:
          "Private skråstrekkommandoer er bare synlige for deg.",
        publish_button: "Publiser til Community Hub",
        submitting: "Publiserer...",
        prompt_label: "Spør",
        prompt_description:
          "Dette er ledeteksten som vil bli brukt når skråstrek-kommandoen utløses.",
        prompt_placeholder: "Skriv inn spørsmålet ditt her...",
      },
      generic: {
        unauthenticated: {
          title: "Autentisering kreves",
          description:
            "Du må autentisere med Lovora Community Hub før du publiserer elementer.",
          button: "Koble til Community Hub",
        },
      },
    },
  },
  not_found: {
    title: "404 - Fant ikke siden",
    description: "Siden du leter etter finnes ikke eller har blitt flyttet.",
    go_home: "Gå til startsiden",
  },
  workspace_members: {
    username: "Brukernavn",
    role: "Rolle",
    date_added: "Lagt til",
    empty: "Ingen medlemmer i arbeidsområdet",
    manage_users: "Administrer brukere",
    modal: {
      title: "Brukere",
      search_placeholder: "Søk etter en bruker",
      no_users: "Fant ingen brukere",
      select_all: "Velg alle",
      unselect: "Fjern valg",
      save: "Lagre",
      updated_successfully: "Brukerne ble oppdatert.",
    },
  },
  experimental_features: {
    title: "Eksperimentelle funksjoner",
    select_feature: "Velg en eksperimentell funksjon",
    on: "På",
    off: "Av",
    enabled_reload:
      "Det eksperimentelle funksjonssettet er aktivert. Laster siden på nytt.",
    modal: {
      title: "Vilkår for bruk av eksperimentelle funksjoner",
      intro:
        "Eksperimentelle funksjoner i Lovora er funksjoner vi tester ut, og de er <bold>valgfrie</bold>. Vi vil på forhånd informere om eller advare om mulige bekymringer før du godkjenner en funksjon.",
      risks_intro:
        "Bruk av funksjoner på denne siden kan blant annet føre til følgende.",
      data_loss: "Tap av data.",
      quality_change: "Endret kvalitet på resultater.",
      storage: "Økt lagringsbruk.",
      resources: "Økt ressursbruk.",
      cost: "Økte kostnader eller økt bruk av tilkoblede LLM- eller embedding-leverandører.",
      bugs: "Mulige feil eller problemer ved bruk av Lovora.",
      conditions_intro:
        "Bruk av en eksperimentell funksjon innebærer også følgende, uten at listen er uttømmende.",
      may_not_exist:
        "Funksjonen finnes kanskje ikke i fremtidige oppdateringer.",
      unstable: "Funksjonen som brukes er ikke stabil ennå.",
      future_versions:
        "Funksjonen er kanskje ikke tilgjengelig i fremtidige versjoner, konfigurasjoner eller abonnementer av Lovora.",
      privacy_honored:
        "Personverninnstillingene dine <bold>blir respektert</bold> ved bruk av betafunksjoner.",
      conditions_change:
        "Disse vilkårene kan endres i fremtidige oppdateringer.",
      learn_more:
        "Tilgang til funksjonene krever at du godkjenner denne dialogen. Hvis du vil lese mer, kan du se <docs>docs.anythingllm.com</docs> eller sende e-post til <email>team@mintplexlabs.com</email>.",
      reject: "Avvis og lukk",
      accept: "Jeg forstår",
    },
    live_sync: {
      update_failed: "Kunne ikke oppdatere funksjonsstatusen.",
      enabled: "Synkronisering av direkte dokumentinnhold er aktivert.",
      disabled: "Synkronisering av direkte dokumentinnhold er deaktivert.",
      title: "Automatisk synkronisering av dokumentinnhold",
      description:
        'Gjør det mulig å merke et dokument som "overvåket". Innholdet i overvåkede dokumenter hentes regelmessig og oppdateres i Lovora.',
      scope:
        "Overvåkede dokumenter oppdateres automatisk i alle arbeidsområder de er referert i samtidig som oppdateringen skjer.",
      note: "Denne funksjonen gjelder bare nettbasert innhold, som nettsteder, Confluence, YouTube og GitHub-filer.",
      docs: "Dokumentasjon og advarsler for funksjonen",
      manage: "Administrer overvåkede dokumenter →",
    },
  },
  embeddable_modal: {
    create_title: "Opprett ny embed for arbeidsområde",
    update_title: "Oppdater embed #{{id}}",
    workspace_label: "Arbeidsområde",
    workspace_description:
      "Dette er arbeidsområdet chatvinduet skal baseres på. Alle standardverdier arves fra arbeidsområdet med mindre de overstyres av denne konfigurasjonen.",
    chat_method_label: "Tillatt chatmetode",
    chat_method_description:
      "Bestem hvordan chatboten skal fungere. Spørring betyr at den bare svarer hvis et dokument hjelper med å besvare spørsmålet.\nChat åpner for generelle spørsmål og kan svare på spørsmål som er helt utenfor konteksten til arbeidsområdet.",
    chat_option: "Chat: Svar på alle spørsmål uavhengig av kontekst",
    query_option:
      "Spørring: Svar bare på chatter som er knyttet til dokumenter i arbeidsområdet",
    domains_label: "Begrens forespørsler fra domener",
    domains_description:
      "Dette filteret blokkerer forespørsler som kommer fra andre domener enn listen nedenfor.\nHvis du lar dette stå tomt, kan hvem som helst bruke embed-en på hvilket som helst nettsted.",
    domains_placeholder: "https://mittnettsted.no, https://lovora.no",
    max_chats_per_day_title: "Maks chatter per dag",
    max_chats_per_day_hint:
      "Begrens hvor mange chatter denne innebygde chatten kan behandle i løpet av 24 timer. Null betyr ubegrenset.",
    max_chats_per_session_title: "Maks chatter per økt",
    max_chats_per_session_hint:
      "Begrens hvor mange chatter en bruker i samme økt kan sende til denne embed-en i løpet av 24 timer. Null betyr ubegrenset.",
    message_limit_title: "Grense for meldingshistorikk",
    message_limit_hint:
      "Antall tidligere meldinger som skal inkluderes i chatkonteksten. Standard er 20.",
    model_override_title: "Aktiver dynamisk modellbruk",
    model_override_hint:
      "Tillat at foretrukket LLM-modell overstyrer standardmodellen i arbeidsområdet.",
    temperature_override_title: "Aktiver dynamisk LLM-temperatur",
    temperature_override_hint:
      "Tillat at LLM-temperaturen overstyrer standardverdien i arbeidsområdet.",
    prompt_override_title: "Aktiver overstyring av prompt",
    prompt_override_hint:
      "Tillat at systemprompten overstyrer standardverdien i arbeidsområdet.",
    error: "Feil: {{error}}",
    script_help:
      "Etter at du har opprettet en embed får du en lenke du kan publisere på nettstedet ditt med en enkel <code>&lt;script&gt;</code>-tagg.",
    cancel: "Avbryt",
    create: "Opprett embed",
    update_success: "Embed-en ble oppdatert.",
    update: "Oppdater embed",
  },
  browser_extension_api_keys: {
    title: "API-nøkler for nettleserutvidelsen",
    description:
      "Administrer API-nøkler for nettleserutvidelser som kobler seg til Lovora-forekomsten din.",
    fetch_failed: "Kunne ikke hente API-nøkler",
    generate: "Generer ny API-nøkkel",
    error: "Feil: {{error}}",
    table: {
      connection_string: "Tilkoblingsstreng for utvidelsen",
      created_by: "Opprettet av",
      created_at: "Opprettet",
      actions: "Handlinger",
      empty: "Fant ingen API-nøkler",
    },
    row: {
      revoke_confirm:
        "Er du sikker på at du vil tilbakekalle denne API-nøkkelen for nettleserutvidelsen?\nEtterpå kan den ikke lenger brukes.\n\nDenne handlingen kan ikke angres.",
      revoked: "API-nøkkelen for nettleserutvidelsen ble permanent tilbakekalt",
      revoke_failed: "Kunne ikke tilbakekalle API-nøkkelen",
      copied: "Tilkoblingsstrengen ble kopiert til utklippstavlen",
      connecting: "Prøver å koble til nettleserutvidelsen...",
      copy_tooltip: "Kopier tilkoblingsstreng",
      connect_tooltip: "Koble automatisk til utvidelsen",
      unavailable: "Ikke tilgjengelig",
    },
    modal: {
      title: "Ny API-nøkkel for nettleserutvidelsen",
      error: "Feil: {{error}}",
      multi_user_warning:
        "Advarsel: Du er i flerbrukermodus. Denne API-nøkkelen vil gi tilgang til alle arbeidsområdene som er knyttet til kontoen din. Del den med varsomhet.",
      auto_connect_description:
        'Etter at du klikker på "Opprett API-nøkkel", vil Lovora prøve å koble seg til nettleserutvidelsen automatisk.',
      success_description:
        'Hvis du ser "Koblet til Lovora" i utvidelsen, var tilkoblingen vellykket. Hvis ikke, kan du kopiere tilkoblingsstrengen og lime den inn i utvidelsen manuelt.',
      cancel: "Avbryt",
      create: "Opprett API-nøkkel",
      copied: "API-nøkkelen er kopiert!",
      copy: "Kopier API-nøkkel",
    },
  },
  mobile_connections: {
    title: "Tilkoblede mobilenheter",
    description:
      "Dette er enhetene som er koblet til skrivebordsapplikasjonen din for å synkronisere chatter, arbeidsområder og mer.",
    register: "Registrer ny enhet",
    table: {
      device_name: "Enhetsnavn",
      registered: "Registrert",
      empty: "Fant ingen enheter",
    },
    row: {
      granted: "Enhetstilgang gitt",
      denied: "Enhetstilgang avslått",
      by: "av",
      revoke: "Tilbakekall",
      approve: "Godkjenn tilgang",
      deny: "Avslå",
    },
    modal: {
      title: "Ta Lovora med deg. Hold det lokalt. Lovora Mobile.",
      description:
        "Lovora for mobil lar deg koble til arbeidsområdechattene, trådene, verktøyene og dokumentene dine når du er på farten.\n\nKjør med lokale modeller på telefonen privat, eller videresend chatter direkte til denne forekomsten uten avbrudd.",
      qr_help:
        "Skann QR-koden med Lovora Mobile-appen for å aktivere direkte synkronisering av arbeidsområder, chatter, tråder og dokumenter.",
      learn_more: "Les mer",
      play_store_alt: "Skaff den på Google Play",
      localhost_error:
        "Åpne denne siden via maskinens private IP-adresse eller et tilpasset domene. Localhost-adresser fungerer ikke med mobilappen.",
    },
  },
  agent_builder: {
    actions: {
      add_block: "Legg til blokk",
      move_up: "Flytt blokk opp",
      move_down: "Flytt blokk ned",
      delete_block: "Slett blokk",
      new_flow: "Ny flyt",
      publish: "Publiser",
      save: "Lagre",
    },
    header: {
      logo_alt: "Lovora-logo",
      builder: "Bygger",
      view_docs: "Vis dokumentasjon",
    },
    toasts: {
      load_available_flows_error: "Kunne ikke laste tilgjengelige flyter",
      load_flow_error: "Kunne ikke laste flyten",
      missing_name_description:
        "Legg inn både navn og beskrivelse for flyten din",
      save_success: "Agentflyten ble lagret!",
      save_error: "Kunne ikke lagre agentflyten. {{error}}",
    },
    common: {
      select_variable: "Velg variabel",
      select_or_create_variable: "Velg eller opprett variabel",
    },
    blocks: {
      flow_info: {
        label: "Flytinformasjon",
        description: "Grunnleggende flytinformasjon",
        untitled: "Flyt uten tittel",
      },
      start: {
        label: "Flytvariabler",
        description: "Konfigurer agentvariabler og innstillinger",
        summary: "{{count}} variabel definert",
        summary_other: "{{count}} variabler definert",
      },
      api_call: {
        label: "API-kall",
        description: "Utfør en HTTP-forespørsel",
        no_url: "(ingen URL)",
      },
      llm_instruction: {
        label: "LLM-instruksjon",
        description: "Behandle data ved hjelp av LLM-instruksjoner",
        no_instruction: "Ingen instruksjon",
      },
      web_scraping: {
        label: "Nettskraping",
        description: "Hent innhold fra en nettside",
        no_url: "Ingen URL oppgitt",
      },
      finish: {
        label: "Flyt fullført",
        description: "Slutten på agentflyten",
        summary: "Flyten avsluttes her",
      },
    },
    direct_output: {
      label: "Direkte utdata",
      description:
        "Utdataene fra denne blokken returneres direkte til chatten. Dette hindrer at flere verktøykall blir utført.",
    },
    config_coming_soon: "Konfigurasjonsvalg kommer snart...",
    content_summarization: {
      label: "Innholdssammendrag",
      description:
        "Når dette er aktivert, blir langt nettsideinnhold automatisk oppsummert for å redusere tokenbruk.",
      note: "Merk: Dette kan påvirke datakvaliteten og fjerne spesifikke detaljer fra det opprinnelige innholdet.",
    },
    flow_info: {
      name: "Flytnavn",
      name_help:
        "Det er viktig å gi flyten et navn som en LLM enkelt kan forstå.",
      examples: '"SendMessageToDiscord", "CheckStockPrice", "CheckWeather"',
      name_placeholder: "Skriv inn flytnavn",
      description: "Beskrivelse",
      description_help:
        "Det er like viktig å gi flyten en beskrivelse som en LLM enkelt kan forstå. Husk å inkludere formålet med flyten, konteksten den skal brukes i og annen relevant informasjon.",
      description_placeholder: "Skriv inn flytbeskrivelse",
    },
    start: {
      variables: "Variabler",
      variable_name: "Variabelnavn",
      initial_value: "Startverdi",
      delete_variable: "Slett variabel",
      add_variable: "Legg til variabel",
    },
    api_call: {
      url: "URL",
      url_placeholder: "https://api.example.com/endpoint",
      insert_variable: "Sett inn variabel",
      select_variable_to_insert: "Velg variabel som skal settes inn",
      method: "Metode",
      headers: "Headere",
      add_header: "Legg til header",
      header_name: "Headernavn",
      value: "Verdi",
      remove_header: "Fjern header",
      request_body: "Forespørselskropp",
      raw_text: "Råtekst",
      form_data: "Skjemadata",
      key: "Nøkkel",
      remove_field: "Fjern felt",
      add_field: "Legg til skjemafelt",
      raw_body_placeholder: "Rå forespørselskropp...",
      response_variable: "Lagre svar i",
    },
    llm_instruction: {
      instruction: "Instruksjon",
      placeholder: "Skriv inn instruksjoner for LLM-en...",
      result_variable: "Resultatvariabel",
    },
    web_scraping: {
      url: "URL som skal skrapes",
      capture_as: "Hent sideinnhold som",
      capture_options: {
        text: "Kun tekstinnhold",
        html: "Rå HTML",
        selector: "CSS-spørringsvelger",
      },
      query_selector: "Spørringsvelger",
      query_selector_help:
        "Skriv inn en gyldig CSS-velger for å hente innholdet på siden.",
      result_variable: "Resultatvariabel",
    },
    finish: {
      description:
        "Dette er slutten på agentflyten din. Alle trinnene over kjøres i rekkefølge.",
    },
  },
};

export default TRANSLATIONS;
