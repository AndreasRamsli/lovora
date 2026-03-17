const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Benvenuti a",
      getStarted: "Inizia",
    },
    llm: {
      title: "Preferenza per i modelli LLM",
      description:
        "AnythingLLM può collaborare con numerosi fornitori di modelli linguistici. Questo sarà il servizio che gestirà le conversazioni.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Configurazione dell'utente",
      description: "Configura le impostazioni del tuo account.",
      howManyUsers: "Quanti utenti utilizzeranno questa istanza?",
      justMe: "Solo io.",
      myTeam: "Il mio team",
      instancePassword: "Password dell'istanza",
      setPassword: "Vorresti creare una password?",
      passwordReq: "Le password devono essere di almeno 8 caratteri.",
      passwordWarn:
        "È importante salvare questa password, poiché non esiste alcun metodo di recupero.",
      adminUsername: "Nome utente dell'account amministratore",
      adminPassword: "Password per l'account amministratore",
      adminPasswordReq: "Le password devono essere di almeno 8 caratteri.",
      teamHint:
        "Per impostazione predefinita, sarai l'unico amministratore. Una volta completato il processo di registrazione, potrai creare nuovi utenti e invitarli, oppure nominare altri utenti come amministratori. Ricorda di non dimenticare la tua password, poiché solo gli amministratori possono reimpostarla.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Gestione dei dati e privacy",
      description:
        "Ci impegniamo a garantire la trasparenza e il controllo in relazione ai vostri dati personali.",
      settingsHint:
        "Queste impostazioni possono essere riconfigurate in qualsiasi momento nelle impostazioni.",
    },
    survey: {
      title: "Benvenuti in AnythingLLM",
      description:
        "Aiutaci a sviluppare AnythingLLM in base alle tue esigenze. Facoltativo.",
      email: "Qual è il tuo indirizzo email?",
      useCase: "Quali utilizzi intende fare con AnythingLLM?",
      useCaseWork: "Per lavoro",
      useCasePersonal: "Per uso personale",
      useCaseOther: "Altro",
      comment: "Come ha saputo di AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, ecc. – Fateci sapere come ci avete trovato!",
      skip: "Salta la domanda",
      thankYou: "Grazie per il tuo feedback.",
    },
    workspace: {
      title: "Crea il tuo primo spazio di lavoro",
      description:
        "Crea il tuo primo spazio di lavoro e inizia a utilizzare AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Nome delle aree di lavoro",
    error: "errore",
    success: "successo",
    user: "Utente",
    selection: "Selezione del modello",
    saving: "Salvo...",
    save: "Salva modifiche",
    previous: "Pagina precedente",
    next: "Pagina successiva",
    optional: "Opzionale",
    yes: "Sì",
    no: "No.",
    search: "Cerca",
    username_requirements:
      "Il nome utente deve essere compreso tra 2 e 32 caratteri, iniziare con una lettera minuscola e contenere solo lettere minuscole, numeri, trattini bassi, trattini e punti.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Benvenuto",
    chooseWorkspace: "Scegli uno spazio di lavoro per iniziare a chattare!",
    notAssigned:
      "Non sei assegnato a nessuno spazio di lavoro.\nContatta il tuo amministratore per richiedere l'accesso a uno spazio di lavoro.",
    goToWorkspace: 'Vai allo spazio di lavoro "{{workspace}}"',
  },
  settings: {
    title: "Impostazioni istanza",
    system: "Impostazioni generali",
    invites: "Inviti",
    users: "Utenti",
    workspaces: "Aree di lavoro",
    "workspace-chats": "Chat dell'area di lavoro",
    customization: "Personalizzazione",
    interface: "Preferenze dell'interfaccia utente",
    branding: "Branding e personalizzazione",
    chat: "Chat",
    "api-keys": "API Sviluppatore",
    llm: "LLM",
    transcription: "Trascrizione",
    embedder: "Embedder",
    "text-splitting": "Suddivisione di testo & Chunking",
    "voice-speech": "Voce & discorso",
    "vector-database": "Database Vettoriale",
    embeds: "Chat incorporata",
    "embed-chats": "Storico chat incorporata",
    security: "Sicurezza",
    "event-logs": "Log degli eventi",
    privacy: "Privacy & Dati",
    "ai-providers": "AI Providers",
    "agent-skills": "Abilità dell'agente",
    "community-hub": {
      title: "Punto di riferimento della comunità",
      trending: "Esplora le tendenze",
      "your-account": "Il tuo account",
      "import-item": "Importa articolo",
    },
    admin: "Admin",
    tools: "Strumenti",
    "system-prompt-variables":
      "Variabili delle variabili del sistema\n\nVariabili delle variabili del sistema",
    "experimental-features": "Caratteristiche sperimentali",
    contact: "Contatta il Supporto",
    "browser-extension": "Estensione del browser",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Benvenuto in",
      "placeholder-username": "Username",
      "placeholder-password": "Password",
      login: "Login",
      validating: "Verifica in corso...",
      "forgot-pass": "Password dimenticata",
      reset: "Reset",
    },
    "sign-in": "Accedi al tuo {{appName}} account.",
    "password-reset": {
      title: "Password Reset",
      description:
        "Fornisci le informazioni necessarie qui sotto per reimpostare la tua password.",
      "recovery-codes": "Codici di recupero",
      "recovery-code": "Codice di recupero {{index}}",
      "back-to-login": "Torna al Login",
    },
  },
  "main-page": {
    greeting: "Come posso aiutarti oggi?",
    noWorkspaceError:
      "Si prega di creare uno spazio di lavoro prima di iniziare una conversazione.",
    checklist: {
      title: "Come iniziare",
      tasksLeft: "compiti rimanenti",
      completed: "Stai per diventare un esperto di AnythingLLM!",
      dismiss: "chiudi",
      tasks: {
        create_workspace: {
          title: "Crea uno spazio di lavoro",
          description: "Crea il tuo primo spazio di lavoro per iniziare",
          action: "Crea",
        },
        send_chat: {
          title: "Invia una chat",
          description: "Inizia una conversazione con il tuo assistente AI",
          action: "Chat",
        },
        embed_document: {
          title: "Incorporare un documento",
          description:
            "Aggiungi il tuo primo documento al tuo spazio di lavoro.",
          action: "Incorporare",
        },
        setup_system_prompt: {
          title: "Definisci un prompt di sistema",
          description: "Configura il comportamento del tuo assistente AI",
          action: "Configurazione",
        },
        define_slash_command: {
          title: "Definire un comando slash",
          description: "Crea comandi personalizzati per il tuo assistente",
          action: "Definire",
        },
        visit_community: {
          title: "Visita il centro comunitario",
          description:
            "Esplorate le risorse e i modelli disponibili nella comunità.",
          action: "Esplora",
        },
      },
    },
    quickActions: {
      createAgent: "Creare un agente",
      editWorkspace: "Modifica l'area di lavoro",
      uploadDocument: "Caricare un documento",
    },
    quickLinks: {
      title:
        "Link to the website\nLink to the online store\nLink to the contact form\nLink to the FAQ\nLink to the privacy policy\nLink to the terms and conditions\nLink to the blog\nLink to the social media profiles",
      sendChat: "Invia chat",
      embedDocument: "Incorporare un documento",
      createWorkspace: "Creare uno spazio di lavoro",
    },
    exploreMore: {
      title: "Esplora le altre funzionalità",
      features: {
        customAgents: {
          title: "Agenti AI personalizzati",
          description:
            "Creare potenti agenti di intelligenza artificiale e automazioni senza codice.",
          primaryAction: "Chatta usando @agent",
          secondaryAction: "Costruisci un flusso di lavoro per un agente.",
        },
        slashCommands: {
          title: "Comandi Slash",
          description:
            "Risparmia tempo e utilizza comandi personalizzati per l'inserimento di prompt.",
          primaryAction: "Creare un comando Slash",
          secondaryAction: "Esplora su Hub",
        },
        systemPrompts: {
          title: "Prompt di sistema",
          description:
            "Modifica l'istruzione del sistema per personalizzare le risposte dell'IA in un ambiente di lavoro.",
          primaryAction: "Modifica un prompt di sistema",
          secondaryAction: "Gestire le variabili di prompt",
        },
      },
    },
    announcements: {
      title: "Aggiornamenti e comunicazioni",
    },
    resources: {
      title: "Risorse",
      links: {
        docs: "Documenti",
        star: "Star on Github",
      },
      keyboardShortcuts: "Combinazioni di tasti",
    },
  },
  "new-workspace": {
    title: "Nuova area di lavoro",
    placeholder: "La mia area di lavoro",
  },
  "workspaces—settings": {
    general: "Impostazioni generali",
    chat: "Impostazioni Chat",
    vector: "Database vettoriale",
    members: "Membri",
    agent: "Configurazione dell'agente",
  },
  general: {
    vector: {
      title: "Contatore dei vettori",
      description: "Numero totale di vettori nel tuo database vettoriale.",
    },
    names: {
      description:
        "Questo cambierà solo il nome visualizzato della tua area di lavoro.",
    },
    message: {
      title: "Messaggi Chat suggeriti",
      description:
        "Personalizza i messaggi che verranno suggeriti agli utenti della tua area di lavoro.",
      add: "Aggiungi un nuovo messaggio",
      save: "Salva messaggi",
      heading: "Spiegami",
      body: "i vantaggi di AnythingLLM",
    },
    pfp: {
      title: "Immagine del profilo dell'assistente",
      description:
        "Personalizza l'immagine del profilo dell'assistente per quest'area di lavoro.",
      image: "Immagine dell'area di lavoro",
      remove: "Rimuovi immagine dell'area di lavoro",
    },
    delete: {
      title: "Elimina area di lavoro",
      description:
        "Elimina quest'area di lavoro e tutti i suoi dati. Ciò eliminerà l'area di lavoro per tutti gli utenti.",
      delete: "Elimina area di lavoro",
      deleting: "Eliminazione dell'area di lavoro...",
      "confirm-start": "Stai per eliminare l'intera",
      "confirm-end":
        "area di lavoro. Verranno rimossi tutti gli embeddings vettoriali nel tuo database vettoriale.\n\nI file sorgente originali rimarranno intatti. Questa azione è irreversibile.",
    },
  },
  chat: {
    llm: {
      title: "LLM Provider dell'area di lavoro",
      description:
        "Il provider LLM e il modello specifici che verranno utilizzati per quest'area di lavoro. Per impostazione predefinita, utilizza il provider LLM e le impostazioni di sistema.",
      search: "Cerca tutti i provider LLM",
    },
    model: {
      title: "Modello di chat dell'area di lavoro",
      description:
        "Il modello di chat specifico che verrà utilizzato per quest'area di lavoro. Se vuoto, utilizzerà l'LLM di sistema.",
      wait: "-- in attesa dei modelli --",
    },
    mode: {
      title: "Modalità chat",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start": "fornirà risposte con la conoscenza generale dell'LLM",
        and: "e",
        "desc-end": "contesto documentale associato.",
      },
      query: {
        title: "Query",
        "desc-start": "fornirà risposte",
        only: "solo",
        "desc-end": "se sarà presente un contesto documentale",
      },
    },
    history: {
      title: "Chat History",
      "desc-start":
        "Numero di chat precedenti che verranno incluse nella memoria a breve termine della risposta.",
      recommend: "Recommend 20. ",
      "desc-end":
        "Un numero superiore a 45 potrebbe causare continui errori nella chat, a seconda delle dimensioni del messaggio.",
    },
    prompt: {
      title: "Prompt",
      description:
        "Il prompt che verrà utilizzato in quest'area di lavoro. Definisci il contesto e le istruzioni affinché l'IA generi una risposta. Dovresti fornire un prompt elaborato con cura in modo che l'IA possa generare una risposta pertinente e accurata.",
      history: {
        title: "Cronologia delle istruzioni del sistema",
        clearAll: "Cancella tutto",
        noHistory: "Non sono disponibili i log di sistema.",
        restore: "Ripristina",
        delete: "Elimina",
        publish: "Pubblica su Community Hub",
        deleteConfirm:
          "È sicuro che desideri eliminare questo elemento della cronologia?",
        clearAllConfirm:
          "È sicuro che desideri eliminare tutti i dati di cronologia? Questa operazione non può essere annullata.",
        expand: "Espandi",
      },
    },
    refusal: {
      title: "Risposta al rifiuto nella modalità di query",
      "desc-start": "Quando la modalità",
      query: "query",
      "desc-end":
        "è attiva, potresti voler restituire una risposta di rifiuto personalizzata quando non viene trovato alcun contesto.",
      "tooltip-title": "Perché lo sto vedendo?",
      "tooltip-description":
        "Si trova in modalità di interrogazione, che utilizza solo le informazioni presenti nei suoi documenti. Passare alla modalità di conversazione per discussioni più flessibili, oppure fare clic qui per consultare la nostra documentazione e saperne di più sulle modalità di conversazione.",
    },
    temperature: {
      title: "Temperatura LLM",
      "desc-start":
        'Questa impostazione controlla il livello di "creatività" delle risposte dell\'LLM.',
      "desc-end":
        "Più alto è il numero, più è creativo. Per alcuni modelli questo può portare a risposte incoerenti se troppo elevato.",
      hint: "La maggior parte degli LLM ha vari intervalli accettabili di valori validi. Consulta il tuo fornitore LLM per queste informazioni.",
    },
  },
  "vector-workspace": {
    identifier: "Identificatore del database vettoriale",
    snippets: {
      title: "Numero massimo di frammenti di contesto",
      description:
        "Questa impostazione controlla la quantità massima di frammenti di contesto che verranno inviati all'LLM per ogni chat o query.",
      recommend: "Raccomandato: 4",
    },
    doc: {
      title: "Soglia di similarità del documento",
      description:
        "Punteggio di similarità minimo richiesto affinché una fonte sia considerata correlata alla chat. Più alto è il numero, più la fonte deve essere simile alla chat.",
      zero: "Nessuna restrizione",
      low: "Basso (punteggio di similarità ≥ .25)",
      medium: "Medio (punteggio di similarità ≥ .50)",
      high: "Alto (punteggio di similarità ≥ .75)",
    },
    reset: {
      reset: "Reimposta database vettoriale",
      resetting: "Cancellazione vettori...",
      confirm:
        "Stai per reimpostare il database vettoriale di quest'area di lavoro. Questa operazione rimuoverà tutti gli embedding vettoriali attualmente incorporati.\n\nI file sorgente originali rimarranno intatti. Questa azione è irreversibile.",
      error:
        "Impossibile reimpostare il database vettoriale dell'area di lavoro!",
      success:
        "Il database vettoriale dell'area di lavoro è stato reimpostato!",
    },
  },
  agent: {
    "performance-warning":
      "Le prestazioni degli LLM che non supportano esplicitamente la chiamata degli strumenti dipendono in larga misura dalle capacità e dalla precisione del modello. Alcune capacità potrebbero essere limitate o non funzionali.",
    provider: {
      title: "Provider LLM dell'agente dell'area di lavoro",
      description:
        "Il provider e il modello LLM specifici che verranno utilizzati per l'agente @agent di quest'area di lavoro.",
    },
    mode: {
      chat: {
        title: "Modello di chat dell'agente dell'area di lavoro",
        description:
          "Il modello di chat specifico che verrà utilizzato per l'agente @agent di quest'area di lavoro.",
      },
      title: "Modello dell'agente dell'area di lavoro",
      description:
        "Il modello LLM specifico che verrà utilizzato per l'agente @agent di quest'area di lavoro.",
      wait: "-- in attesa dei modelli --",
    },
    skill: {
      title: "Abilità predefinite dell'agente",
      description:
        "Migliora le capacità naturali dell'agente predefinito con queste abilità predefinite. Questa configurazione si applica a tutte le aree di lavoro.",
      rag: {
        title: "RAG e memoria a lungo termine",
        description:
          "Consenti all'agente di sfruttare i tuoi documenti locali per rispondere a una query o chiedi all'agente di \"ricordare\" parti di contenuto per il recupero della memoria a lungo termine.",
      },
      view: {
        title: "Visualizza e riepiloga i documenti",
        description:
          "Consenti all'agente di elencare e riepilogare il contenuto dei file dell'area di lavoro attualmente incorporati.",
      },
      scrape: {
        title: "Esplora siti Web",
        description:
          "Consenti all'agente di visitare ed eseguire lo scraping del contenuto dei siti Web.",
      },
      generate: {
        title: "Genera grafici",
        description:
          "Consenti all'agente predefinito di generare vari tipi di grafici dai dati forniti o forniti nella chat.",
      },
      save: {
        title: "Genera e salva file nel browser",
        description:
          "Abilita l'agente predefinito per generare e scrivere su file che possono essere salvati e scaricati nel tuo browser.",
      },
      web: {
        title: "Ricerca e navigazione web in tempo reale",
        description:
          "Permettere al vostro agente di effettuare ricerche sul web per rispondere alle vostre domande, collegandosi a un fornitore di servizi di ricerca (SERP).",
      },
      sql: {
        title: "Connettore SQL",
        description:
          "Permetti al tuo agente di utilizzare SQL per rispondere alle tue domande, collegandosi a diversi fornitori di database SQL.",
      },
      default_skill:
        "Per impostazione predefinita, questa funzionalità è attiva, ma è possibile disabilitarla se non si desidera che sia disponibile per l'agente.",
    },
  },
  recorded: {
    title: "Chat dell'area di lavoro",
    description:
      "Queste sono tutte le chat e i messaggi registrati che sono stati inviati dagli utenti ordinati in base alla data di creazione.",
    export: "Esporta",
    table: {
      id: "Id",
      by: "Inviato da",
      workspace: "Area di lavoro",
      prompt: "Prompt",
      response: "Risposta",
      at: "Inviato a",
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
      title: "Preferenze dell'interfaccia utente",
      description:
        "Configura le tue preferenze dell'interfaccia utente per AnythingLLM.",
    },
    branding: {
      title: "Branding e personalizzazione",
      description:
        "Personalizza la tua istanza di AnythingLLM con il tuo marchio.",
    },
    chat: {
      title: "Chat",
      description: "Configura le tue preferenze di chat per AnythingLLM.",
      auto_submit: {
        title: "Inserimento automatico del testo della discorsione",
        description:
          "Invia automaticamente l'input vocale dopo un periodo di silenzio.",
      },
      auto_speak: {
        title: "Risposte automatiche",
        description:
          "Genera risposte automatiche basate su un modello di linguaggio.",
      },
      spellcheck: {
        title: "Abilita il controllo ortografico",
        description:
          "Abilitare o disabilitare il controllo ortografico nel campo di input della chat",
      },
    },
    items: {
      theme: {
        title: "Tema",
        description:
          "Seleziona la combinazione di colori che preferisci per l'applicazione.",
      },
      "show-scrollbar": {
        title: "Mostra barra di scorrimento",
        description:
          "Abilita o disabilita la barra di scorrimento nella finestra di chat.",
      },
      "support-email": {
        title: "Support Email\n\nSupport Email",
        description:
          "Definisci l'indirizzo email di supporto che sarà disponibile per gli utenti quando necessitano di assistenza.",
      },
      "app-name": {
        title: "Nome",
        description:
          "Definisci un nome che verrà visualizzato sulla pagina di accesso per tutti gli utenti.",
      },
      "chat-message-alignment": {
        title: "Allignment di conversazioni",
        description:
          "Seleziona la modalità di allineamento del messaggio quando utilizzi l'interfaccia di chat.",
      },
      "display-language": {
        title: "Lingua da visualizzare",
        description:
          "Seleziona la lingua preferita per visualizzare l'interfaccia utente di AnythingLLM – quando sono disponibili le traduzioni.",
      },
      logo: {
        title: "Logo del marchio",
        description:
          "Carica il tuo logo personalizzato per visualizzarlo su tutte le pagine.",
        add: "Aggiungi un logo personalizzato",
        recommended: "Dimensioni consigliate: 800 x 200",
        remove: "Rimuovi",
        replace: "Sostituire",
      },
      "welcome-messages": {
        title: "Messaggi di benvenuto",
        description:
          "Personalizza i messaggi di benvenuto visualizzati ai tuoi utenti. Solo gli utenti non amministrativi vedranno questi messaggi.",
        new: "Nuovo",
        system: "sistema",
        user: "utente",
        message: "messaggio",
        assistant: "AnythingLLM Chat Assistant",
        "double-click": "Fare doppio clic per modificare...",
        save: "Salva i messaggi",
      },
      "browser-appearance": {
        title: "Aspetto del browser",
        description:
          "Personalizza l'aspetto della scheda del browser e del titolo quando l'app è aperta.",
        tab: {
          title: "Titolo",
          description:
            "Imposta un titolo personalizzato per l'icona quando l'app è aperta in un browser.",
        },
        favicon: {
          title: "Favicon",
          description:
            "Utilizza un'icona personalizzata per la scheda del browser.",
        },
      },
      "sidebar-footer": {
        title: "Elementi del footer della barra laterale",
        description:
          "Personalizza gli elementi del footer visualizzati nella parte inferiore della barra laterale.",
        icon: "Icon",
        link: "Link",
      },
      "render-html": {
        title: "Visualizza codice HTML in chat",
        description:
          "Generare risposte HTML nelle risposte dell'assistente.\nQuesto può portare a una qualità di risposta molto più accurata, ma può anche comportare potenziali rischi per la sicurezza.",
      },
    },
  },
  api: {
    title: "Chiavi API",
    description:
      "Le chiavi API consentono al titolare di accedere e gestire in modo programmatico questa istanza AnythingLLM.",
    link: "Leggi la documentazione API",
    generate: "Genera nuova chiave API",
    table: {
      key: "Chiave API",
      by: "Creato da",
      created: "Creato",
    },
  },
  llm: {
    title: "Preferenza LLM",
    description:
      "Queste sono le credenziali e le impostazioni per il tuo provider di chat e embedding LLM preferito. È importante che queste chiavi siano aggiornate e corrette, altrimenti AnythingLLM non funzionerà correttamente.",
    provider: "Provider LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Endpoint di servizio Azure",
        api_key: "Chiave API",
        chat_deployment_name: "Nome dell'implementazione di chat",
        chat_model_token_limit: "Limite dei token per il modello di chat",
        model_type: "Tipo di modello",
        model_type_tooltip:
          'Se il vostro sistema utilizza un modello di ragionamento (o1, o1-mini, o3-mini, ecc.), impostate questa opzione su "Ragionamento". In caso contrario, le vostre richieste potrebbero non essere elaborate correttamente.',
        default: "Predefinito",
        reasoning: "Ragionamento",
      },
    },
  },
  transcription: {
    title: "Preferenza del modello di trascrizione",
    description:
      "Queste sono le credenziali e le impostazioni per il tuo fornitore di modelli di trascrizione preferito. È importante che queste chiavi siano aggiornate e corrette, altrimenti i file multimediali e l'audio non verranno trascritti.",
    provider: "Provider di trascrizione",
    "warn-start":
      "L'utilizzo del modello whisper locale su macchine con RAM o CPU limitate può bloccare AnythingLLM durante l'elaborazione di file multimediali.",
    "warn-recommend":
      "Si consigliano almeno 2 GB di RAM e caricare file <10 Mb.",
    "warn-end":
      "Il modello integrato verrà scaricato automaticamente al primo utilizzo.",
  },
  embedding: {
    title: "Preferenza di embedding",
    "desc-start":
      "Quando si utilizza un LLM che non supporta nativamente un motore di embedding, potrebbe essere necessario specificare credenziali aggiuntive per l'embedding del testo.",
    "desc-end":
      "L'embedding è il processo di trasformazione del testo in vettori. Queste credenziali sono necessarie per trasformare i file e i prompt in un formato che AnythingLLM può utilizzare per l'elaborazione.",
    provider: {
      title: "Provider di embedding",
    },
  },
  text: {
    title: "Preferenze di suddivisione e suddivisione in blocchi del testo",
    "desc-start":
      "A volte, potresti voler cambiare il modo predefinito in cui i nuovi documenti vengono suddivisi e spezzettati in blocchi prima di essere inseriti nel tuo database vettoriale.",
    "desc-end":
      "Dovresti modificare questa impostazione solo se capisci come funziona la suddivisione del testo e i suoi effetti collaterali.",
    size: {
      title: "Dimensioni blocco di testo",
      description:
        "Questa è la lunghezza massima di caratteri che possono essere presenti in un singolo vettore.",
      recommend: "La lunghezza massima del modello di embedding è",
    },
    overlap: {
      title: "Sovrapposizione blocco di testo",
      description:
        "Questa è la sovrapposizione massima di caratteri che si verifica durante la suddivisione in blocchi tra due porzioni di testo adiacenti.",
    },
  },
  vector: {
    title: "Database vettoriale",
    description:
      "Queste sono le credenziali e le impostazioni per il funzionamento della tua istanza AnythingLLM. È importante che queste chiavi siano aggiornate e corrette.",
    provider: {
      title: "Provider del database vettoriale",
      description: "Non è richiesta alcuna configurazione per LanceDB.",
    },
  },
  embeddable: {
    title: "Widget di chat incorporabili",
    description:
      "I widget di chat incorporabili sono interfacce di chat pubbliche che sono collegate a una singola area di lavoro. Queste ti consentono di creare aree di lavoro che puoi poi pubblicare ovunque.",
    create: "Crea embedding",
    table: {
      workspace: "Area di lavoro",
      chats: "Chat inviate",
      active: "Domini attivi",
      created: "Creato",
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
    title: "Chat incorporate",
    export: "Esporta",
    description:
      "Queste sono tutte le chat e i messaggi registrati da qualsiasi embedding che hai pubblicato.",
    table: {
      embed: "Incorpora",
      sender: "Mittente",
      message: "Messaggio",
      response: "Risposta",
      at: "Inviato a",
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
    title: "Sicurezza",
    multiuser: {
      title: "Modalità multi-utente",
      description:
        "Imposta la tua istanza per supportare il tuo team attivando la modalità multi-utente.",
      enable: {
        "is-enable": "La modalità multi-utente è abilitata",
        enable: "Abilita la modalità multi-utente",
        description:
          "Per impostazione predefinita, sarai l'unico amministratore. Come amministratore dovrai creare account per tutti i nuovi utenti o amministratori. Non perdere la tua password poiché solo un utente amministratore può reimpostare le password.",
        username: "Nome utente account amministratore",
        password: "Password account amministratore",
      },
    },
    password: {
      title: "Protezione password",
      description:
        "Proteggi la tua istanza AnythingLLM con una password. Se la dimentichi, non esiste un metodo di recupero, quindi assicurati di salvare questa password.",
      "password-label": "Password istanza",
    },
  },
  event: {
    title: "Registro eventi",
    description:
      "Visualizza tutte le azioni e gli eventi che si verificano su questa istanza per il monitoraggio.",
    clear: "Cancella registri eventi",
    table: {
      type: "Tipo di evento",
      user: "Utente",
      occurred: "Si è verificato alle",
    },
  },
  privacy: {
    title: "Privacy e gestione dei dati",
    description:
      "Questa è la tua configurazione per il modo in cui i provider terzi connessi e AnythingLLM gestiscono i tuoi dati.",
    llm: "Selezione LLM",
    embedding: "Preferenza di embedding",
    vector: "Database vettoriale",
    anonymous: "Telemetria anonima abilitata",
  },
  connectors: {
    "search-placeholder": "Connettori di dati",
    "no-connectors": "Nessun connettore dati trovato.",
    obsidian: {
      name: "Obsidian",
      description: "Importa il vault di Obsidian con un solo clic.",
      vault_location: "Posizione del deposito",
      vault_description:
        "Seleziona la cartella del tuo archivio Obsidian per importare tutte le note e le loro relazioni.",
      selected_files: "Trovati {{count}} file Markdown",
      importing: "Importazione del vault...",
      import_vault: "Import Vault",
      processing_time:
        "Questo potrebbe richiedere del tempo, a seconda delle dimensioni del vostro deposito.",
      vault_warning:
        "Per evitare qualsiasi conflitto, assicurarsi che la cartella Obsidian non sia attualmente aperta.",
    },
    github: {
      name: "Repository su GitHub",
      description:
        "Importa un intero repository pubblico o privato di GitHub con un solo clic.",
      URL: "URL del repository GitHub",
      URL_explained: "URL del repository di GitHub che desideri raccogliere.",
      token: "Token di accesso a GitHub",
      optional: "Opzionale",
      token_explained: "Token di accesso per prevenire il limite di velocità.",
      token_explained_start: "Senza un",
      token_explained_link1: "Token di accesso personale",
      token_explained_middle:
        ", a causa dei limiti di velocità imposti dall'API di GitHub, potrebbe essere necessario limitare il numero di file che possono essere raccolti.",
      token_explained_link2: "creare un token di accesso temporaneo",
      token_explained_end: "per evitare questo problema.",
      ignores: "File ignorato",
      git_ignore:
        "Elenco nel formato .gitignore per ignorare file specifici durante la raccolta. Premi invio dopo ogni voce che desideri salvare.",
      task_explained:
        "Una volta completato, tutti i file saranno disponibili per essere incorporati negli spazi di lavoro tramite il selettore di documenti.",
      branch: "Cartella da cui desideri recuperare i file.",
      branch_loading: "-- Caricamento dei rami disponibili --",
      branch_explained: "Cartella da cui desideri recuperare i file.",
      token_information:
        "Senza aver fornito il <b>token di accesso GitHub</b>, questo connettore dati sarà in grado di raccogliere solo i file di primo livello del repository, a causa dei limiti di velocità imposti dall'API pubblica di GitHub.",
      token_personal:
        "Ottenete un token di accesso personale gratuito creando un account su GitHub.",
    },
    gitlab: {
      name: "Repository di GitLab",
      description:
        "Importa un intero repository pubblico o privato di GitLab con un solo clic.",
      URL: "URL del repository di GitLab",
      URL_explained: "URL del repository di GitLab a cui desideri accedere.",
      token: "Token di accesso a GitLab",
      optional: "Opzionale",
      token_explained: "Token di accesso per prevenire il limite di velocità.",
      token_description:
        "Selezionare ulteriori entità da recuperare dall'API di GitLab.",
      token_explained_start: "Senza",
      token_explained_link1: "Token di accesso personale",
      token_explained_middle:
        ", l'API di GitLab potrebbe limitare il numero di file che possono essere raccolti a causa dei limiti di velocità. Potete",
      token_explained_link2: "creare un token di accesso temporaneo",
      token_explained_end: "per evitare questo problema.",
      fetch_issues: "Estrarre informazioni come documenti",
      ignores: "File ignorato",
      git_ignore:
        "Elenco nel formato .gitignore per ignorare file specifici durante la raccolta. Premi invio dopo ogni voce che desideri salvare.",
      task_explained:
        "Una volta completato, tutti i file saranno disponibili per l'incorporamento in spazi di lavoro tramite il selettore di documenti.",
      branch: "Cartella da cui desideri recuperare i file",
      branch_loading: "-- Caricamento dei rami disponibili --",
      branch_explained: "Cartella da cui desideri recuperare i file.",
      token_information:
        "Senza aver fornito il token di accesso di <b>GitLab</b>, questo connettore dati sarà in grado di raccogliere solo i file di primo livello del repository, a causa dei limiti di velocità imposti dall'API pubblica di GitLab.",
      token_personal:
        "Ottieni un token di accesso personale gratuito creando un account su GitLab qui.",
    },
    youtube: {
      name: "Trascrizione di YouTube",
      description:
        "Importa la trascrizione di un intero video di YouTube da un link.",
      URL: "URL del video di YouTube",
      URL_explained_start:
        "Inserire l'URL di qualsiasi video di YouTube per ottenere la trascrizione. Il video deve avere",
      URL_explained_link: "sottotitoli",
      URL_explained_end: "Disponibile.",
      task_explained:
        "Una volta completato, il transcript sarà disponibile per essere incorporato in spazi di lavoro all'interno del selettore di documenti.",
      language: "Trascrizione della lingua",
      language_explained:
        "Seleziona la lingua del testo che desideri raccogliere.",
      loading_languages: "-- Caricamento delle lingue disponibili --",
    },
    "website-depth": {
      name: "Scraping di link in blocco",
      description:
        "Scansiona un sito web e tutti i suoi link di profondità fino a un certo livello.",
      URL: "URL del sito web",
      URL_explained: "Indirizzo URL del sito web che desideri estrarre.",
      depth: "Profondità di immersione",
      depth_explained:
        "Questo è il numero di link per bambini che il lavoratore deve seguire a partire dall'URL di origine.",
      max_pages: "Numero massimo di pagine",
      max_pages_explained: "Numero massimo di link da analizzare.",
      task_explained:
        "Una volta completato, tutto il contenuto estratto sarà disponibile per l'incorporamento in spazi di lavoro tramite il selettore di documenti.",
    },
    confluence: {
      name: "Confluence",
      description: "Importa un'intera pagina di Confluence con un solo clic.",
      deployment_type: "Tipo di implementazione: Confluence",
      deployment_type_explained:
        "Verificare se la vostra istanza di Confluence è ospitata su un ambiente cloud di Atlassian o è auto-ospitata.",
      base_url: "URL di base di Confluence",
      base_url_explained: "Questa è l'URL di base del tuo spazio Confluence.",
      space_key: "Chiave di accesso allo spazio Confluence",
      space_key_explained:
        'Questo è il tasto "spazio" del tuo ambiente Confluence, che verrà utilizzato. Solitamente inizia con ~.',
      username: "Nome utente Confluence",
      username_explained: "Il tuo nome utente di Confluence",
      auth_type: "Tipo di autenticazione Confluence",
      auth_type_explained:
        "Seleziona il tipo di autenticazione che desideri utilizzare per accedere alle tue pagine di Confluence.",
      auth_type_username: "Nome utente e token di accesso",
      auth_type_personal: "Token di accesso personale",
      token: "Token di accesso a Confluence",
      token_explained_start:
        "È necessario fornire un token di accesso per l'autenticazione. È possibile generare un token di accesso.",
      token_explained_link: "Qui.",
      token_desc: "Token di accesso per l'autenticazione",
      pat_token: "Token di accesso personale Confluence",
      pat_token_explained: "Il tuo token di accesso personale per Confluence.",
      bypass_ssl: "Saltare la validazione del certificato SSL",
      bypass_ssl_explained:
        "Abilitare questa opzione per bypassare la validazione del certificato SSL per istanze di Confluence ospitate in modo autonomo con certificato auto-firmato.",
      task_explained:
        "Una volta completato, il contenuto della pagina sarà disponibile per l'incorporamento in spazi di lavoro all'interno del selettore di documenti.",
    },
    manage: {
      documents: "Documenti",
      "data-connectors": "Connettori dati",
      "desktop-only":
        "La modifica di queste impostazioni è possibile solo su un dispositivo desktop. Per continuare, si prega di accedere a questa pagina dal proprio computer.",
      dismiss: "Ignora",
      editing: "Editing",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "I miei documenti",
      "new-folder": "Nuova cartella",
      "search-document": "Cerca documento",
      "no-documents": "Nessun documento.",
      "move-workspace": "Vai a Workspace",
      name: "Nome",
      "delete-confirmation":
        "È sicuro che desideri eliminare questi file e cartelle?\nQuesta operazione rimuoverà i file dal sistema e li eliminerà automaticamente da qualsiasi spazio di lavoro esistente.\nQuesta operazione non è reversibile.",
      "removing-message":
        "Eliminazione di {{count}} documenti e {{folderCount}} cartelle. Si prega di attendere.",
      "move-success": "Trasferiti con successo {{count}} documenti.",
      date: "Data",
      type: "Tipo",
      no_docs: "Nessun documento.",
      select_all: "Seleziona tutto",
      deselect_all: "Deselect All",
      remove_selected: "Elimina gli elementi selezionati",
      costs: "*Costo una tantum per le embedding",
      save_embed: "Salva e incorpora",
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
      "processor-offline": "Il processore di documenti non è disponibile.",
      "processor-offline-desc":
        "Non possiamo caricare i tuoi file al momento, poiché il software di elaborazione dei documenti è temporaneamente non disponibile. Ti preghiamo di riprovare più tardi.",
      "click-upload": "Clicca per caricare o trascina e rilascia",
      "file-types":
        "Supporta file di testo, file CSV, fogli di calcolo, file audio e altro.",
      "or-submit-link": "oppure fornire un link",
      "placeholder-link": "https://example.com",
      fetching: "Caricamento...",
      "fetch-website": "Recupera il sito web",
      "privacy-notice":
        "Questi file verranno caricati nel processore di documenti in esecuzione su questa istanza di AnythingLLM. Questi file non vengono inviati o condivisi con terzi.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: 'Cos\'è il "pinning" di un documento?',
      pin_explained_block1:
        'Quando si "fissa" un documento in AnythingLLM, caricheremo l\'intero contenuto del documento nella finestra di prompt per il tuo modello linguistico, in modo che possa comprenderlo appieno.',
      pin_explained_block2:
        "Questo funziona meglio con i modelli che gestiscono **ampie quantità di dati** o con file di piccole dimensioni che sono fondamentali per la loro base di conoscenza.",
      pin_explained_block3:
        'Se non ottenete le risposte desiderate da AnythingLLM per impostazione predefinita, allora l\'utilizzo del "pinning" è un ottimo modo per ottenere risposte di qualità superiore in pochi clic.',
      accept: "Ok, ho capito.",
    },
    watching: {
      what_watching: "Cosa si ottiene guardando un documentario?",
      watch_explained_block1:
        "Quando visualizzi un documento in AnythingLLM, il sistema <i>sincronizzerà automaticamente</i> il contenuto del documento dalla sua fonte originale a intervalli regolari. Ciò aggiornerà automaticamente il contenuto in tutti gli spazi di lavoro in cui questo file è gestito.",
      watch_explained_block2:
        "Questa funzionalità supporta attualmente i contenuti basati su internet e non sarà disponibile per i documenti caricati manualmente.",
      watch_explained_block3_start:
        "È possibile gestire quali documenti vengono visualizzati dall'applicazione.",
      watch_explained_block3_link: "Gestore di file",
      watch_explained_block3_end: "admin view.",
      accept: "Ok, ho capito.",
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
    welcome: "Benvenuti nel vostro nuovo spazio di lavoro.",
    get_started: "Per iniziare, si può fare:",
    get_started_default: "Per iniziare",
    upload: "caricare un documento",
    or: "oppure",
    attachments_processing: "In attesa... I allegati sono in elaborazione.",
    send_chat: "Invia un messaggio.",
    send_message: "Invia un messaggio",
    attach_file: "Allega un file a questa chat.",
    slash: "Visualizza tutti i comandi disponibili per la chat.",
    agents:
      "Visualizza tutti gli agenti disponibili che puoi utilizzare per la chat.",
    start_agent_session: "Start agent session",
    text_size: "Modifica la dimensione del testo.",
    microphone: "Formula la tua richiesta.",
    send: "Invia un messaggio immediato allo spazio di lavoro",
    tts_speak_message: "Messaggio TTS Speak",
    copy: "Copia",
    regenerate: "Rigenerare",
    regenerate_response:
      "Per favore, fornisci il testo originale che desideri che venga riformulato.\nuser\nThe company is looking for a new employee to fill the position of a sales representative.\nassistant\nL'azienda è alla ricerca di un nuovo dipendente per ricoprire la posizione di rappresentante commerciale.\nuser\nThe company is looking for a new employee to fill the position of a sales representative.\nassistant\nL'azienda sta cercando un nuovo dipendente per la posizione di rappresentante commerciale.\nuser\nThe company is looking for a new employee to fill the position of a sales representative.\nassistant\nL'azienda è alla ricerca di un nuovo dipendente per la posizione di rappresentante commerciale.\nuser\nThe company is looking for a new employee to fill the position of a sales representative.\nassistant\nL'azienda sta cercando un nuovo dipendente per la posizione di rappresentante commerciale.\nuser>Regenerate response\nassistant\nL'azienda sta cercando un nuovo dipendente per la posizione di rappresentante commerciale.",
    good_response: "Ottima risposta.",
    more_actions: "Ulteriori azioni",
    hide_citations: "Nascondi le citazioni",
    show_citations: "Mostra citazioni",
    sources: "Fonti",
    source_count_one: "Riferimento {{count}}",
    source_count_other: "Riferimenti a {{count}}",
    document: "Documento",
    similarity_match: "partita",
    pause_tts_speech_message:
      "Mettere in pausa la sintesi vocale del messaggio.",
    fork: "Forchetta",
    delete: "Elimina",
    save_submit: "Salva e invia",
    cancel: "Annulla",
    submit: "Invia",
    edit_prompt: "Suggerimento di modifica:",
    edit_response: "Modifica la risposta",
    edit_info_user:
      '"Invia" rigenera la risposta dell\'IA. "Salva" aggiorna solo il tuo messaggio.',
    edit_info_assistant:
      "Le modifiche verranno salvate direttamente in questa risposta.",
    see_less: "Visualizza meno",
    see_more: "Visualizza altro",
    at_agent: "@agent",
    default_agent_description:
      "- l'agente predefinito per questo spazio di lavoro.",
    custom_agents_coming_soon: "Agenti personalizzati in arrivo a breve!",
    preset_reset_description:
      "Elimina la cronologia delle chat e avvia una nuova chat",
    preset_exit_description: "Interrompere la sessione corrente con l'agente.",
    add_new_preset: "Aggiungi nuovo preset",
    add_new: "Aggiungi nuovo",
    edit: "Modifica",
    publish: "Pubblicare",
    stop_generating: "Interrompi la generazione della risposta",
    command: "Comando",
    your_command: "il tuo comando",
    placeholder_prompt:
      "Questo è il contenuto che verrà inserito all'inizio della tua richiesta.",
    description: "Descrizione",
    placeholder_description:
      "Risponde con una poesia sui modelli linguistici di grandi dimensioni.",
    save: "Salva",
    small: "Piccolo",
    normal: "Normale",
    large: "Grande",
    tools: "Strumenti",
    slash_commands: "Comandi abbreviati",
    agent_skills: "Competenze dell'agente",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Naviga",
    text_size_label: "Dimensione del testo",
    select_model: "Seleziona il modello",
    workspace_llm_manager: {
      search: "Cerca fornitori di modelli linguistici di grandi dimensioni",
      loading_workspace_settings:
        "Caricamento delle impostazioni dell'ambiente di lavoro...",
      available_models: "Modelli disponibili per {{provider}}",
      available_models_description:
        "Seleziona un modello da utilizzare per questo ambiente di lavoro.",
      save: "Utilizza questo modello.",
      saving:
        "Impostazione del modello come impostazione predefinita per l'area di lavoro...",
      missing_credentials:
        "Questo fornitore non dispone delle credenziali necessarie.",
      missing_credentials_description:
        "Fare clic per configurare le credenziali",
    },
  },
  profile_settings: {
    edit_account: "Modifica account",
    profile_picture: "Immagine del profilo",
    remove_profile_picture: "Rimuovi la foto del profilo",
    username: "Username\n\n<|start_pad|>\nNome utente",
    new_password: "Nuova password",
    password_description: "La password deve essere lunga almeno 8 caratteri.",
    cancel: "Annulla",
    update_account: "Aggiorna il profilo",
    theme: "Preferenza per il tema",
    language: "Lingua preferita",
    failed_upload: "Impossibile caricare l'immagine del profilo: {{error}}",
    upload_success: "Immagine del profilo caricata.",
    failed_remove: "Impossibile rimuovere l'immagine del profilo: {{error}}",
    profile_updated: "Profilo aggiornato.",
    failed_update_user: "Errore nell'aggiornamento dell'utente: {{error}}",
    account: "Account",
    support: "Support\n\n\nAssistenza",
    signout: "Esci",
  },
  "keyboard-shortcuts": {
    title: "Combinazioni di tasti",
    shortcuts: {
      settings: "Apri le impostazioni",
      workspaceSettings: "Apri le impostazioni dello spazio di lavoro corrente",
      home: "Vai alla pagina principale",
      workspaces: "Gestire gli spazi di lavoro",
      apiKeys: "Impostazioni delle chiavi API",
      llmPreferences: "Preferenze LLM",
      chatSettings: "Impostazioni di chat",
      help: "Mostra le scorciatoie da tastiera",
      showLLMSelector: "Seleziona l'ambiente di lavoro LLM",
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
        success_title: "Successo!",
        success_description:
          "Il tuo prompt di sistema è stato pubblicato nella Community Hub!",
        success_thank_you: "Grazie per aver condiviso con la comunità!",
        view_on_hub: "Visualizza su Community Hub",
        modal_title: "Richiesta di pubblicazione",
        name_label: "Nome",
        name_description:
          "Questo è il nome visualizzato per il prompt del sistema.",
        name_placeholder: "Il mio prompt di sistema",
        description_label: "Descrizione",
        description_description:
          "Questa è la descrizione del prompt del sistema. Utilizzala per descrivere lo scopo del tuo prompt.",
        tags_label: "Etichette",
        tags_description:
          "Le etichette vengono utilizzate per identificare il prompt del sistema in modo più semplice, facilitando la ricerca. È possibile aggiungere più etichette. Massimo 5 etichette. Massimo 20 caratteri per etichetta.",
        tags_placeholder: "Inserisci il testo e premi Invio per aggiungere tag",
        visibility_label: "Visibilità",
        public_description:
          "I prompt del sistema pubblico sono visibili a tutti.",
        private_description:
          "I messaggi di sistema privati sono visibili solo a te.",
        publish_button: "Pubblica su Community Hub",
        submitting: "Pubblicazione...",
        submit: "Pubblica su Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Questo è il prompt di sistema effettivo che verrà utilizzato per guidare il modello linguistico.",
        prompt_placeholder: "Inserisci il prompt del tuo sistema qui...",
      },
      agent_flow: {
        public_description:
          "Tutti possono visualizzare i flussi di dati pubblici.",
        private_description:
          "Solo gli utenti autorizzati possono visualizzare i flussi di dati privati.",
        success_title: "Successo!",
        success_description:
          "Il tuo flusso di lavoro è stato pubblicato nella Community Hub!",
        success_thank_you: "Grazie per aver condiviso con la comunità!",
        view_on_hub: "Visualizza su Community Hub",
        modal_title:
          "Publish Agent Flow\n\nPubblica il flusso di lavoro per gli agenti.",
        name_label: "Nome",
        name_description:
          "Questo è il nome visualizzato per il tuo flusso di lavoro.",
        name_placeholder: "Il mio agente, Flow",
        description_label: "Descrizione",
        description_description:
          "Questa è la descrizione del flusso di lavoro del tuo agente. Utilizzala per descrivere lo scopo del tuo flusso di lavoro.",
        tags_label: "Etichette",
        tags_description:
          "Le etichette vengono utilizzate per identificare il flusso di lavoro del tuo agente, facilitando la ricerca. È possibile aggiungere più etichette. Massimo 5 etichette. Massimo 20 caratteri per etichetta.",
        tags_placeholder: "Inserisci il testo e premi Invio per aggiungere tag",
        visibility_label: "Visibilità",
        publish_button: "Pubblica su Community Hub",
        submitting: "Pubblicazione...",
        submit: "Pubblica su Community Hub",
        privacy_note:
          "I flussi vengono sempre caricati in forma privata per proteggere eventuali dati sensibili. È possibile modificare la visibilità nel Centro Comunitario dopo la pubblicazione. Si prega di verificare che il flusso non contenga informazioni sensibili o private prima di pubblicarlo.",
      },
      slash_command: {
        success_title: "Successo!",
        success_description:
          "Il tuo comando Slash è stato pubblicato nel Community Hub!",
        success_thank_you: "Grazie per aver condiviso con la comunità!",
        view_on_hub: "Visualizza su Community Hub",
        modal_title: "Pubblica il comando Slash",
        name_label: "Nome",
        name_description:
          "Questo è il nome visualizzato per il tuo comando slash.",
        name_placeholder: "Il mio comando Slash",
        description_label: "Descrizione",
        description_description:
          "Questa è la descrizione del tuo comando slash. Utilizzala per descrivere lo scopo del tuo comando slash.",
        command_label: "Comando",
        command_description:
          "Questo è il comando da utilizzare dagli utenti per attivare questa impostazione predefinita.",
        command_placeholder: "my-command",
        tags_label: "Etichette",
        tags_description:
          "Le etichette vengono utilizzate per identificare il tuo comando slash, facilitando la ricerca. È possibile aggiungere più etichette. Massimo 5 etichette. Massimo 20 caratteri per etichetta.",
        tags_placeholder: "Inserisci il testo e premi Invio per aggiungere tag",
        visibility_label: "Visibilità",
        public_description: "I comandi slash pubblici sono visibili a tutti.",
        private_description: "I comandi privati sono visibili solo a te.",
        publish_button: "Pubblica su Community Hub",
        submitting: "Pubblicazione...",
        prompt_label:
          "Scrivi un breve testo che descriva le caratteristiche principali di un'azienda che opera nel settore dell'energia rinnovabile.\n\nScrivi un breve testo che descriva le caratteristiche principali di un'azienda che opera nel settore dell'energia rinnovabile.\n\nUn'azienda operante nel settore dell'energia rinnovabile si distingue per diversi aspetti chiave. Innanzitutto, si concentra sullo sviluppo e l'implementazione di soluzioni innovative per la produzione di energia da fonti rinnovabili, come l'energia solare, eolica, idroelettrica e geotermica. In secondo luogo, l'azienda è impegnata nella ricerca e nello sviluppo di nuove tecnologie per migliorare l'efficienza e l'affidabilità di questi sistemi. Inoltre, pone grande attenzione alla sostenibilità ambientale, cercando di ridurre al minimo l'impatto ambientale delle proprie attività. Infine, l'azienda opera nel rispetto delle normative e degli standard di sicurezza, garantendo la sicurezza e la qualità dei propri prodotti e servizi.\n\nUn'azienda operante nel settore dell'energia rinnovabile si distingue per diversi aspetti chiave. Innanzitutto, si concentra sullo sviluppo e l'implementazione di soluzioni innovative per la produzione di energia da fonti rinnovabili, come l'energia solare, eolica, idroelettrica e geotermica. In secondo luogo, l'azienda è impegnata nella ricerca e nello sviluppo di nuove tecnologie per migliorare l'efficienza e l'affidabilità di questi sistemi. Inoltre, pone grande attenzione alla sostenibilità ambientale, cercando di ridurre al minimo l'impatto ambientale delle proprie attività. Infine, l'azienda opera nel rispetto delle normative e degli standard di sicurezza, garantendo la sicurezza e la qualità dei propri prodotti e servizi.",
        prompt_description:
          "Questo è il comando che verrà utilizzato quando il comando con la barra verrà attivato.",
        prompt_placeholder: "Inserisci la tua richiesta qui...",
      },
      generic: {
        unauthenticated: {
          title: "Richiesta di autenticazione",
          description:
            "È necessario autenticarsi tramite il Community Hub di AnythingLLM prima di pubblicare contenuti.",
          button: "Connettiti al centro comunitario",
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
