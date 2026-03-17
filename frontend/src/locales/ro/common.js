const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Bine ai venit la",
      getStarted: "Începe",
    },
    llm: {
      title: "Preferința LLM",
      description:
        "AnythingLLM poate funcționa cu mai mulți furnizori LLM. Acesta va fi serviciul care gestionează conversațiile.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Configurare Utilizator",
      description: "Configurează setările utilizatorului tău.",
      howManyUsers: "Câți utilizatori vor folosi această resursă?",
      justMe: "Doar eu",
      myTeam: "Echipa mea",
      instancePassword: "Parola Resursei",
      setPassword: "Dorești să setezi o parolă?",
      passwordReq: "Parolele trebuie să aibă cel puțin 8 caractere.",
      passwordWarn:
        "Este important să salvezi această parolă deoarece nu există metodă de recuperare.",
      adminUsername: "Numele contului de administrator",
      adminPassword: "Parola contului de administrator",
      adminPasswordReq: "Parolele trebuie să aibă cel puțin 8 caractere.",
      teamHint:
        "Implicit, vei fi singurul administrator. După finalizarea configurării inițiale, poți crea și invita alți utilizatori sau administratori. Nu pierde parola, deoarece doar administratorii pot reseta parolele.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Gestionarea datelor & Confidențialitate",
      description:
        "Suntem dedicați transparenței și controlului asupra datelor tale personale.",
      settingsHint:
        "Aceste setări pot fi reconfigurate oricând în setările aplicației.",
    },
    survey: {
      title: "Bun venit la AnythingLLM",
      description:
        "Ajută-ne să facem AnythingLLM potrivit pentru nevoile tale. Opțional.",
      email: "Care este adresa ta de email?",
      useCase: "Pentru ce vei folosi AnythingLLM?",
      useCaseWork: "Pentru muncă",
      useCasePersonal: "Pentru uz personal",
      useCaseOther: "Altele",
      comment: "De unde ai aflat despre AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, etc. - Spune-ne cum ne-ai găsit!",
      skip: "Sari peste sondaj",
      thankYou: "Îți mulțumim pentru feedback!",
    },
    workspace: {
      title: "Creează primul tău spațiu de lucru",
      description:
        "Creează primul tău spațiu de lucru și începe să folosești AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Numele spațiilor de lucru",
    error: "eroare",
    success: "succes",
    user: "Utilizator",
    selection: "Selecția modelului",
    saving: "Se salvează...",
    save: "Salvează modificările",
    previous: "Pagina anterioară",
    next: "Pagina următoare",
    optional: "Opțional",
    yes: "Da",
    no: "Nu",
    search: "Caută",
    username_requirements:
      "Numele de utilizator trebuie să aibă între 2 și 32 de caractere, să înceapă cu o literă mică și să conțină doar litere mici, cifre, liniuțe de subliniere, cratime și puncte.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Bine ai venit",
    chooseWorkspace: "Alege un spațiu de lucru pentru a începe să chatezi!",
    notAssigned:
      "Momentan nu te-ai atribuit la niciun spațiu de lucru.\nContactează-ți administratorul pentru a solicita acces la un spațiu de lucru.",
    goToWorkspace: 'Mai departe la spațiul de lucru "{{workspace}}"',
  },
  settings: {
    title: "Setările instanței",
    system: "Setări generale",
    invites: "Invitații",
    users: "Utilizatori",
    workspaces: "Spații de lucru",
    "workspace-chats": "Conversațiile spațiului de lucru",
    customization: "Personalizare",
    interface: "Preferințe UI",
    branding: "Branding & White-label",
    chat: "Chat",
    "api-keys": "API pentru dezvoltatori",
    llm: "LLM",
    transcription: "Transcriere",
    embedder: "Embedder",
    "text-splitting": "Împărțirea și segmentarea textului",
    "voice-speech": "Voce & Vorbire",
    "vector-database": "Baza de date vectorială",
    embeds: "Chat Embed",
    "embed-chats": "Istoricul chat embed",
    security: "Securitate",
    "event-logs": "Jurnale de evenimente",
    privacy: "Confidențialitate & Date",
    "ai-providers": "Furnizori AI",
    "agent-skills": "Abilități agent",
    "community-hub": {
      title: "Centru comunitar",
      trending: "Descoperă tendințele",
      "your-account": "Contul dumneavoastră",
      "import-item": "Importați articolul",
    },
    admin: "Administrator",
    tools: "Instrumente",
    "system-prompt-variables": "Variabile system prompt",
    "experimental-features": "Funcții experimentale",
    contact: "Contact suport",
    "browser-extension": "Extensie browser",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Bine ai venit la",
      "placeholder-username": "Nume utilizator",
      "placeholder-password": "Parolă",
      login: "Autentifică-te",
      validating: "Se validează...",
      "forgot-pass": "Ai uitat parola",
      reset: "Resetează",
    },
    "sign-in": "Autentifică-te în {{appName}} cont.",
    "password-reset": {
      title: "Resetare parolă",
      description:
        "Introdu informațiile necesare mai jos pentru a reseta parola.",
      "recovery-codes": "Coduri de recuperare",
      "recovery-code": "Cod de recuperare {{index}}",
      "back-to-login": "Înapoi la autentificare",
    },
  },
  "main-page": {
    greeting: "Cu ce vă pot ajuta astăzi?",
    noWorkspaceError:
      "Te rugăm să creezi un spațiu de lucru înainte să începi o conversație.",
    checklist: {
      title: "Început rapid",
      tasksLeft: "sarcini rămase",
      completed: "Ești pe drumul să devii expert AnythingLLM!",
      dismiss: "închide",
      tasks: {
        create_workspace: {
          title: "Creează un spațiu de lucru",
          description: "Creează primul tău spațiu de lucru pentru a începe",
          action: "Creează",
        },
        send_chat: {
          title: "Trimite un chat",
          description: "Începe o conversație cu asistentul AI",
          action: "Chat",
        },
        embed_document: {
          title: "Inserați un document",
          description: "Adaugă primul tău document în spațiul de lucru",
          action: "Include",
        },
        setup_system_prompt: {
          title: "Configurează un sistem prompt",
          description: "Configurează comportamentul asistentului AI",
          action: "Configurează",
        },
        define_slash_command: {
          title: "Definește o comandă slash",
          description: "Creează comenzi personalizate pentru asistent",
          action: "Definește",
        },
        visit_community: {
          title: "Vizitează Comunitatea",
          description: "Explorează resursele și șabloanele comunității",
          action: "Răsfoiește",
        },
      },
    },
    quickActions: {
      createAgent: "Creați un agent",
      editWorkspace: "Modifică spațiul de lucru",
      uploadDocument: "Încărcați un document",
    },
    quickLinks: {
      title: "Link-uri rapide",
      sendChat: "Trimite Chat",
      embedDocument: "Include Document",
      createWorkspace: "Creează Spațiu de lucru",
    },
    exploreMore: {
      title: "Explorează mai multe funcții",
      features: {
        customAgents: {
          title: "Agenți AI personalizați",
          description:
            "Construiește agenți AI puternici și automatizări fără cod.",
          primaryAction: "Chatează cu @agent",
          secondaryAction: "Construiește un flux agent",
        },
        slashCommands: {
          title: "Comenzi Slash",
          description:
            "Economisește timp și folosește prompturi cu comenzi personalizate.",
          primaryAction: "Creează o comandă slash",
          secondaryAction: "Explorează pe Hub",
        },
        systemPrompts: {
          title: "System Prompts",
          description:
            "Modifică system prompt pentru a personaliza răspunsurile AI ale unui spațiu de lucru.",
          primaryAction: "Modifică un prompt system",
          secondaryAction: "Gestionează variabilele promptului",
        },
      },
    },
    announcements: {
      title: "Actualizări & Anunțuri",
    },
    resources: {
      title: "Resurse",
      links: {
        docs: "Documentație",
        star: "Stea pe Github",
      },
      keyboardShortcuts: "Scurtături de tastatură",
    },
  },
  "new-workspace": {
    title: "Spațiu de lucru nou",
    placeholder: "Spațiul meu de lucru",
  },
  "workspaces—settings": {
    general: "Setări generale",
    chat: "Setări chat",
    vector: "Baza de date vectorială",
    members: "Membri",
    agent: "Configurare agent",
  },
  general: {
    vector: {
      title: "Număr vectori",
      description: "Numărul total de vectori în baza ta de date vectorială.",
    },
    names: {
      description:
        "Aceasta va schimba doar numele afișat al spațiului de lucru.",
    },
    message: {
      title: "Mesaje sugerate pentru chat",
      description:
        "Personalizează mesajele care vor fi sugerate utilizatorilor spațiului de lucru.",
      add: "Adaugă mesaj nou",
      save: "Salvează mesajele",
      heading: "Explică-mi",
      body: "beneficiile AnythingLLM",
    },
    pfp: {
      title: "Imagine profil asistent",
      description:
        "Personalizează imaginea de profil a asistentului pentru acest spațiu de lucru.",
      image: "Imagine spațiu de lucru",
      remove: "Șterge imaginea spațiului de lucru",
    },
    delete: {
      title: "Șterge spațiul de lucru",
      description:
        "Șterge acest spațiu de lucru și toate datele sale. Aceasta va șterge spațiul de lucru pentru toți utilizatorii.",
      delete: "Șterge spațiul de lucru",
      deleting: "Se șterge spațiul de lucru...",
      "confirm-start": "Ești pe cale să ștergi întregul tău",
      "confirm-end":
        "spațiu de lucru. Această acțiune va elimina toate încorporările vectoriale (vector embeddings) din baza dumneavoastră de date vectorială.\n\nFișierele originale rămân neatinse. Această acțiune este ireversibilă.",
    },
  },
  chat: {
    llm: {
      title: "Furnizor LLM pentru spațiu de lucru",
      description:
        "Furnizorul LLM și modelul specific folosit pentru acest spațiu de lucru. Implicit, folosește setările și furnizorul sistemului.",
      search: "Caută toți furnizorii LLM",
    },
    model: {
      title: "Modelul de chat al spațiului de lucru",
      description:
        "Modelul specific chat folosit de acest spațiu de lucru. Dacă e lăsat gol, folosește preferința LLM a sistemului.",
      wait: "-- așteptare modele --",
    },
    mode: {
      title: "Mod chat",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start":
          "oferă răspunsuri bazate pe cunoștințele generale ale LLM-ului",
        and: "și",
        "desc-end": "context document care este găsit.",
      },
      query: {
        title: "Interogare",
        "desc-start": "oferă răspunsuri",
        only: "doar",
        "desc-end": "dacă contextul documentului este găsit.",
      },
    },
    history: {
      title: "Istoric chat",
      "desc-start":
        "Numărul conversațiilor anterioare care vor fi incluse în memoria pe termen scurt a răspunsului.",
      recommend: "Recomandat: 20.",
      "desc-end":
        "Mai mult de 45 poate duce la erori în conversații în funcție de mărimea mesajelor.",
    },
    prompt: {
      title: "System Prompt",
      description:
        "Promptul folosit în acest spațiu de lucru. Definește contextul și instrucțiunile pentru AI să genereze răspunsuri relevante și precise.",
      history: {
        title: "Istoricul system prompt",
        clearAll: "Șterge tot",
        noHistory: "Nu există istoric disponibil",
        restore: "Restaurează",
        delete: "Șterge",
        publish: "Publică în Comunitate",
        deleteConfirm: "Sigur dorești să ștergi acest istoric?",
        clearAllConfirm:
          "Sigur dorești să ștergi tot istoricul? Această acțiune nu poate fi anulată.",
        expand: "Extinde",
      },
    },
    refusal: {
      title: "Răspuns refuz în modul interogare",
      "desc-start": "Atunci când ești în",
      query: "modul interogare",
      "desc-end": ", poți personaliza răspunsul când nu se găsește context.",
      "tooltip-title": "De ce văd asta?",
      "tooltip-description":
        "Ești în modul interogare (query), care folosește doar informațiile din documente. Treci pe modul chat pentru conversații mai flexibile sau vizitează documentația pentru mai multe detalii.",
    },
    temperature: {
      title: "Temperatura LLM",
      "desc-start":
        'Această setare controlează cât de "creativ" va fi răspunsul LLM-ului.',
      "desc-end":
        "Cu cât numărul e mai mare, cu atât mai creativ. Pentru unele modele poate duce la răspunsuri incoerente la valori mari.",
      hint: "Majoritatea LLM-urilor au un interval valid specific. Consultă furnizorul tău LLM pentru detalii.",
    },
  },
  "vector-workspace": {
    identifier: "Identificator bază de date vectorială",
    snippets: {
      title: "Număr maxim de fragmente de context",
      description:
        "Această setare controlează cantitatea maximă de fragmente de context care vor fi trimise către LLM per chat sau interogare (query).",
      recommend: "Recomandat",
    },
    doc: {
      title: "Prag de similaritate document",
      description:
        "Scorul minim de similaritate necesar pentru ca o sursă să fie considerată relevantă pentru conversație (chat). Cu cât numărul este mai mare, cu atât sursa trebuie să fie mai asemănătoare cu conversația (chat).",
      zero: "Fără restricții",
      low: "Scăzut (scor de similaritate ≥ .25)",
      medium: "Mediu (scor de similaritate ≥ .50)",
      high: "Înalt (scor de similaritate ≥ .75)",
    },
    reset: {
      reset: "Resetează baza de date vectorială",
      resetting: "Se șterg vectorii...",
      confirm:
        "Sunteți pe cale să resetați baza de date vectorială a acestui spațiu de lucru. Această acțiune va elimina toate încorporările vectoriale aflate în prezent în bază.\n\nFișierele sursă originale vor rămâne intacte. Această acțiune este ireversibilă.",
      error:
        "Baza de date vectorială a spațiului de lucru nu a putut fi resetată!",
      success: "Baza de date vectorială a spațiului de lucru a fost resetată!",
    },
  },
  agent: {
    "performance-warning":
      "Performanța LLM-urilor care nu suportă explicit apelarea de instrumente depinde în mare măsură de capabilitățile și acuratețea modelului. Unele abilități pot fi limitate sau nefuncționale.",
    provider: {
      title: "Furnizor LLM agent spațiu de lucru",
      description:
        "Furnizorul LLM și modelul specific care vor fi utilizate pentru agentul @agent al acestui spațiu de lucru.",
    },
    mode: {
      chat: {
        title: "Model de chat agent spațiu de lucru",
        description:
          "Modelul de chat specific care va fi utilizat pentru agentul @agent al acestui spațiu de lucru.",
      },
      title: "Model agent spațiu de lucru",
      description:
        "Modelul LLM specific care va fi utilizat pentru agentul @agent al acestui spațiu de lucru.",
      wait: "-- se așteaptă modele --",
    },
    skill: {
      title: "Abilități implicite ale agentului",
      description:
        "Îmbunătățește abilitățile naturale ale agentului implicit cu aceste abilități predefinite. Această configurație se aplică tuturor spațiilor de lucru.",
      rag: {
        title: "RAG & memorie pe termen lung",
        description:
          "Permite agentului să valorifice documentele dumneavoastră locale pentru a răspunde la o interogare sau cereți-i agentului să „rețină” fragmente de conținut pentru a le putea recupera ulterior din memoria pe termen lung.",
      },
      view: {
        title: "Vizualizează & rezumă documente",
        description:
          "Permite agentului să listeze și să rezume conținutul fișierelor din spațiul de lucru încorporate în prezent.",
      },
      scrape: {
        title: "Extrage date de pe site-uri web (prin web scraping)",
        description:
          "Permite agentului să viziteze și să extragă conținutul site-urilor web (prin web scraping).",
      },
      generate: {
        title: "Generează grafice",
        description:
          "Permite agentului implicit să genereze diverse tipuri de grafice din datele furnizate sau date în chat.",
      },
      save: {
        title: "Generează & salvează fișiere în browser",
        description:
          "Permite agentului implicit să genereze și să scrie fișiere care se salvează și pot fi descărcate în browserul tău.",
      },
      web: {
        title: "Căutare și navigare web live",
        description:
          "Permite-i agentului tău să caute pe internet pentru a răspunde la întrebările tale, conectându-l la un furnizor de servicii de căutare web (SERP).",
      },
      sql: {
        title: "Conector SQL",
        description:
          "Permite-ți agentului să utilizeze SQL pentru a răspunde la întrebările tale, conectându-se la diverși furnizori de baze de date SQL.",
      },
      default_skill:
        "Implicit, această funcție este activată, dar puteți dezactiva-o dacă nu doriți ca agentul să o utilizeze.",
    },
  },
  recorded: {
    title: "Conversații spațiu de lucru",
    description:
      "Acestea sunt toate conversațiile și mesajele înregistrate care au fost trimise de utilizatori, ordonate după data creării.",
    export: "Exportă",
    table: {
      id: "ID",
      by: "Trimis de",
      workspace: "Spațiu de lucru",
      prompt: "Prompt",
      response: "Răspuns",
      at: "Trimis la",
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
      title: "Preferințe UI",
      description: "Setează preferințele UI pentru AnythingLLM.",
    },
    branding: {
      title: "Branding & White-labeling",
      description:
        "Personalizează-ți instanța AnythingLLM cu branding personalizat.",
    },
    chat: {
      title: "Chat",
      description: "Setează preferințele de chat pentru AnythingLLM.",
      auto_submit: {
        title: "Trimite automat intrarea vocală",
        description:
          "Trimite automat intrarea vocală după o perioadă de liniște",
      },
      auto_speak: {
        title: "Rostește automat răspunsurile",
        description: "Rostește automat răspunsurile de la AI",
      },
      spellcheck: {
        title: "Activează verificarea ortografică",
        description:
          "Activează sau dezactivează verificarea ortografică în câmpul de introducere a chatului",
      },
    },
    items: {
      theme: {
        title: "Temă",
        description: "Selectează tema de culoare preferată pentru aplicație.",
      },
      "show-scrollbar": {
        title: "Arată bara de derulare",
        description:
          "Activează sau dezactivează bara de derulare în fereastra de chat.",
      },
      "support-email": {
        title: "Email de suport",
        description:
          "Setează adresa de email de suport care ar trebui să fie accesibilă utilizatorilor atunci când au nevoie de ajutor.",
      },
      "app-name": {
        title: "Nume aplicație",
        description:
          "Setează un nume care este afișat pe pagina de autentificare tuturor utilizatorilor.",
      },
      "chat-message-alignment": {
        title: "Alinierea mesajelor de chat",
        description:
          "Selectează modul de aliniere a mesajelor când folosești interfața de chat.",
      },
      "display-language": {
        title: "Limba de afișare",
        description:
          "Selectează limba preferată pentru a reda interfața AnythingLLM - atunci când traducerile sunt disponibile.",
      },
      logo: {
        title: "Logo brand",
        description:
          "Încarcă logo-ul tău personalizat pentru a fi afișat pe toate paginile.",
        add: "Adaugă un logo personalizat",
        recommended: "Dimensiune recomandată: 800 x 200",
        remove: "Elimină",
        replace: "Înlocuiește",
      },
      "welcome-messages": {
        title: "Mesaje de bun venit",
        description:
          "Personalizează mesajele de bun venit afișate utilizatorilor tăi. Doar utilizatorii non-admin vor vedea aceste mesaje.",
        new: "Nou",
        system: "sistem",
        user: "utilizator",
        message: "mesaj",
        assistant: "Asistent Chat AnythingLLM",
        "double-click": "Dublu clic pentru a edita...",
        save: "Salvează mesajele",
      },
      "browser-appearance": {
        title: "Aspect browser",
        description:
          "Personalizează aspectul tabului și titlului browserului când aplicația este deschisă.",
        tab: {
          title: "Titlu",
          description:
            "Setează un titlu personalizat pentru tab când aplicația este deschisă într-un browser.",
        },
        favicon: {
          title: "Favicon",
          description:
            "Folosește un favicon personalizat pentru tabul browserului.",
        },
      },
      "sidebar-footer": {
        title: "Elemente subsol bară laterală",
        description:
          "Personalizează elementele din subsol afișate în partea de jos a barei laterale.",
        icon: "Iconiță",
        link: "Link",
      },
      "render-html": {
        title: "Redarea HTML în chat",
        description:
          "Afișarea răspunsurilor HTML în răspunsurile asistentului.\nAcest lucru poate duce la o calitate a răspunsurilor mult mai bună, dar poate și la riscuri potențiale de securitate.",
      },
    },
  },
  api: {
    title: "Chei API",
    description:
      "Cheile API permit deținătorului să acceseze și să gestioneze programatic această instanță AnythingLLM.",
    link: "Citește documentația API",
    generate: "Generează o nouă cheie API",
    table: {
      key: "Cheie API",
      by: "Creat de",
      created: "Creat la",
    },
  },
  llm: {
    title: "Preferința LLM",
    description:
      "Acestea sunt credențialele și setările pentru furnizorul tău preferat de chat și embedding LLM. Este important ca aceste chei să fie actuale și corecte, altfel AnythingLLM nu va funcționa corect.",
    provider: "Furnizor LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Endpoint serviciu Azure",
        api_key: "Cheie API",
        chat_deployment_name: "Nume implementare chat",
        chat_model_token_limit: "Limita token model chat",
        model_type: "Tip model",
        model_type_tooltip:
          "Dacă implementarea dvs. utilizează un model de raționament (o1, o1-mini, o3-mini, etc.), setați această opțiune la „Raționament”. În caz contrar, cererile dvs. de chat pot eșua.",
        default: "Implicit",
        reasoning: "Raționament",
      },
    },
  },
  transcription: {
    title: "Preferința modelului de transcriere",
    description:
      "Acestea sunt credențialele și setările pentru furnizorul tău preferat de model de transcriere. Este important ca aceste chei să fie actuale și corecte, altfel fișierele media și audio nu vor fi transcrise.",
    provider: "Furnizor transcriere",
    "warn-start":
      "Utilizarea modelului local Whisper pe mașini cu RAM sau CPU limitat poate bloca AnythingLLM la procesarea fișierelor media.",
    "warn-recommend":
      "Recomandăm cel puțin 2GB de RAM și încărcarea fișierelor <10Mb.",
    "warn-end": "Modelul încorporat se va descărca automat la prima utilizare.",
  },
  embedding: {
    title: "Preferință embedding",
    "desc-start":
      "Atunci când utilizați un LLM care nu suportă nativ un motor de embedding - s-ar putea să fie necesar să specificați credențiale suplimentare pentru embedding text.",
    "desc-end":
      "Embedding-ul este procesul de transformare a textului în vectori. Aceste credențiale sunt necesare pentru a transforma fișierele și prompturile dvs. într-un format pe care AnythingLLM îl poate utiliza pentru procesare.",
    provider: {
      title: "Furnizor embedding",
    },
  },
  text: {
    title: "Preferințe de împărțire și fragmentare text",
    "desc-start":
      "Uneori, s-ar putea să doriți să modificați modul implicit în care documentele noi sunt împărțite și fragmentate înainte de a fi inserate în baza de date vectorială.",
    "desc-end":
      "Ar trebui să modificați această setare doar dacă înțelegeți cum funcționează împărțirea textului și efectele sale secundare.",
    size: {
      title: "Dimensiune fragment text",
      description:
        "Aceasta este lungimea maximă de caractere care poate fi prezentă într-un singur vector.",
      recommend: "Lungimea maximă a modelului de embedding este",
    },
    overlap: {
      title: "Suprapunere fragment text",
      description:
        "Aceasta este suprapunerea maximă de caractere care apare în timpul fragmentării între două fragmente de text adiacente.",
    },
  },
  vector: {
    title: "Baza de date vectorială",
    description:
      "Acestea sunt credențialele și setările pentru modul în care funcționează instanța ta AnythingLLM. Este important să fie corecte și actuale.",
    provider: {
      title: "Furnizor baza de date vectorială",
      description: "Nu este necesară configurarea pentru LanceDB.",
    },
  },
  embeddable: {
    title: "Widget-uri chat integrabile (embeddable)",
    description:
      "Widgeturile de chat integrabile sunt interfețe de chat publice, asociate unui singur spațiu de lucru. Acestea vă permit să creați spații de lucru pe care le puteți apoi publica pentru întreaga lume.",
    create: "Generează cod embed",
    table: {
      workspace: "Spațiu de lucru",
      chats: "Chaturi trimise",
      active: "Domenii active",
      created: "Creat",
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
    title: "Istoric chat embed",
    export: "Exportă",
    description:
      "Acestea sunt toate chat-urile și mesajele înregistrate din orice embed pe care l-ai publicat.",
    table: {
      embed: "Embed",
      sender: "Expeditor",
      message: "Mesaj",
      response: "Răspuns",
      at: "Trimis la",
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
    title: "Securitate",
    multiuser: {
      title: "Mod multi-utilizator",
      description:
        "Configurează instanța ta să suporte echipa activând modul multi-utilizator.",
      enable: {
        "is-enable": "Modul multi-utilizator este activat",
        enable: "Activează modul multi-utilizator",
        description:
          "Implicit, vei fi singurul administrator. Ca administrator, va trebui să creezi conturi pentru toți utilizatorii sau administratorii noi. Nu pierde parola, deoarece doar un utilizator administrator poate reseta parolele.",
        username: "Numele contului de administrator",
        password: "Parola contului de administrator",
      },
    },
    password: {
      title: "Protecție prin parolă",
      description:
        "Protejează instanța AnythingLLM cu o parolă. Dacă o uiți, nu există metode de recuperare, deci asigură-te că o salvezi.",
      "password-label": "Parola instanței",
    },
  },
  event: {
    title: "Jurnale de evenimente",
    description:
      "Vizualizează toate acțiunile și evenimentele care au loc pe această resursă pentru monitorizare.",
    clear: "Șterge jurnalele",
    table: {
      type: "Tip eveniment",
      user: "Utilizator",
      occurred: "S-a întâmplat la",
    },
  },
  privacy: {
    title: "Confidențialitate & Gestionarea datelor",
    description:
      "Aceasta este configurația ta pentru modul în care furnizorii terți conectați și AnythingLLM gestionează datele tale.",
    llm: "Selecția LLM",
    embedding: "Preferința embedding",
    vector: "Baza de date vectorială",
    anonymous: "Telemetrie anonimă activată",
  },
  connectors: {
    "search-placeholder": "Caută conectori de date",
    "no-connectors": "Nu au fost găsiți conectori de date.",
    obsidian: {
      name: "Obsidian",
      description: "Importă un vault Obsidian cu un singur click.",
      vault_location: "Locația vault-ului",
      vault_description:
        "Selectează folderul vault-ului Obsidian pentru a importa toate notițele și conexiunile lor.",
      selected_files: "Au fost găsite {{count}} fișiere markdown",
      importing: "Import vault în curs...",
      import_vault: "Importă Vault",
      processing_time:
        "Aceasta poate dura ceva timp în funcție de dimensiunea vault-ului.",
      vault_warning:
        "Pentru a evita conflictele, asigură-te că vault-ul Obsidian nu este deschis în acest moment.",
    },
    github: {
      name: "Repo GitHub",
      description:
        "Importă un întreg repository public sau privat GitHub cu un singur click.",
      URL: "URL repository GitHub",
      URL_explained:
        "URL-ul repository-ului GitHub pe care dorești să îl colectezi.",
      token: "Token de acces GitHub",
      optional: "opțional",
      token_explained: "Token de acces pentru a preveni limitările de rată.",
      token_explained_start: "Fără un ",
      token_explained_link1: "Token de acces personal",
      token_explained_middle:
        ", API-ul GitHub poate limita numărul de fișiere ce pot fi colectate din cauza limitărilor. Poți ",
      token_explained_link2: "crea un token de acces temporar",
      token_explained_end: " pentru a evita această problemă.",
      ignores: "Fișiere ignorate",
      git_ignore:
        "Listează în format .gitignore fișierele de ignorat la colectare. Apasă enter după fiecare intrare pentru a salva.",
      task_explained:
        "Odată complet, toate fișierele vor fi disponibile pentru embedding în spații de lucru în selectorul de documente.",
      branch: "Ramura din care dorești să colectezi fișiere.",
      branch_loading: "-- încărcare ramuri disponibile --",
      branch_explained: "Ramura din care dorești să colectezi fișiere.",
      token_information:
        "Fără token-ul de acces GitHub completat, acest conector va putea colecta doar fișierele de top datorită limitărilor API-ului public GitHub.",
      token_personal:
        "Obține un token de acces personal gratuit aici cu un cont GitHub.",
    },
    gitlab: {
      name: "Repo GitLab",
      description:
        "Importă un întreg repository public sau privat GitLab cu un singur click.",
      URL: "URL repository GitLab",
      URL_explained:
        "URL-ul repository-ului GitLab pe care dorești să îl colectezi.",
      token: "Token de acces GitLab",
      optional: "opțional",
      token_explained: "Token de acces pentru a preveni limitările de rată.",
      token_description:
        "Selectează entitățile suplimentare de preluat din API-ul GitLab.",
      token_explained_start: "Fără un ",
      token_explained_link1: "Token de acces personal",
      token_explained_middle:
        ", API-ul GitLab poate limita numărul de fișiere ce pot fi colectate din cauza limitărilor. Poți ",
      token_explained_link2: "crea un token de acces temporar",
      token_explained_end: " pentru a evita această problemă.",
      fetch_issues: "Preia issue-uri ca documente",
      ignores: "Fișiere ignorate",
      git_ignore:
        "Listează în format .gitignore fișierele de ignorat la colectare. Apasă enter după fiecare intrare pentru a salva.",
      task_explained:
        "Odată complet, toate fișierele vor fi disponibile pentru embedding în spații de lucru în selectorul de documente.",
      branch: "Ramura din care dorești să colectezi fișiere.",
      branch_loading: "-- încărcare ramuri disponibile --",
      branch_explained: "Ramura din care dorești să colectezi fișiere.",
      token_information:
        "Fără token-ul de acces GitLab completat, acest conector va putea colecta doar fișierele de top datorită limitărilor API-ului public GitLab.",
      token_personal:
        "Obține un token de acces personal gratuit aici cu un cont GitLab.",
    },
    youtube: {
      name: "Transcriere YouTube",
      description: "Importă transcrierea unui videoclip YouTube dintr-un link.",
      URL: "URL videoclip YouTube",
      URL_explained_start:
        "Introdu URL-ul oricărui videoclip YouTube pentru a-i prelua textul. Videoclipul trebuie să aibă ",
      URL_explained_link: "subtitrări închise",
      URL_explained_end: " disponibile.",
      task_explained:
        "Odată complet, transcrierea va fi disponibilă pentru embedding în spații de lucru în selectorul de documente.",
      language: "Limba transcrierii",
      language_explained:
        "Selectează limba transcrierii pe care dorești să o colectezi.",
      loading_languages: "-- încărcare limbi disponibile --",
    },
    "website-depth": {
      name: "Bulk Link Scraper",
      description:
        "Extrage o pagină web și link-urile sale din subpaginile până la o anumită adâncime.",
      URL: "URL site web",
      URL_explained: "URL-ul site-ului pe care dorești să îl culegi.",
      depth: "Adâncime crawl",
      depth_explained:
        "Numărul de link-uri de copii pe care workerul trebuie să le urmărească din URL-ul originar.",
      max_pages: "Număr maxim pagini",
      max_pages_explained: "Numărul maxim de link-uri de colectat.",
      task_explained:
        "Odată complet, tot conținutul cules va fi disponibil pentru embedding în spații de lucru în selectorul de documente.",
    },
    confluence: {
      name: "Confluence",
      description: "Importă o pagină Confluence cu un singur click.",
      deployment_type: "Tip implementare Confluence",
      deployment_type_explained:
        "Determină dacă resursa ta Confluence este găzduită în cloud Atlassian sau self-hosted.",
      base_url: "URL de bază Confluence",
      base_url_explained:
        "Acesta este URL-ul de bază al spațiului tău Confluence.",
      space_key: "Cheie spațiu Confluence",
      space_key_explained:
        "Cheia spațiului din resursa ta Confluence care va fi folosită. De obicei începe cu ~",
      username: "Nume utilizator Confluence",
      username_explained: "Numele tău de utilizator Confluence",
      auth_type: "Tip autentificare Confluence",
      auth_type_explained:
        "Selectează tipul de autentificare pentru accesarea paginilor Confluence.",
      auth_type_username: "Nume utilizator și token de acces",
      auth_type_personal: "Token de acces personal",
      token: "Token de acces Confluence",
      token_explained_start:
        "Trebuie să furnizezi un token de acces pentru autentificare. Poți genera un token de acces ",
      token_explained_link: "aici",
      token_desc: "Token de acces pentru autentificare",
      pat_token: "Token de acces personal Confluence",
      pat_token_explained: "Token-ul tău personal de acces Confluence.",
      bypass_ssl: "Ocolirea validării certificatului SSL",
      bypass_ssl_explained:
        "Activați această opțiune pentru a ocoli validarea certificatului SSL pentru instanțele Confluence găzduite de utilizator, cu un certificat semnat de utilizator.",
      task_explained:
        "Odată complet, conținutul paginii va fi disponibil pentru embedding în spații de lucru în selectorul de documente.",
    },
    manage: {
      documents: "Documente",
      "data-connectors": "Conectori de date",
      "desktop-only":
        "Editarea acestor setări este disponibilă doar pe un dispozitiv desktop. Te rugăm să accesezi această pagină de pe desktop pentru a continua.",
      dismiss: "Ignoră",
      editing: "Se editează",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Documentele mele",
      "new-folder": "Folder nou",
      "search-document": "Căută document",
      "no-documents": "Niciun document",
      "move-workspace": "Mută în spațiul de lucru",
      name: "Nume",
      "delete-confirmation":
        "Ești sigur că vrei să ștergi aceste fișiere și foldere?\nAcest lucru va elimina fișierele din sistem și le va elimina automat din orice spațiu de lucru existent.\nAceastă acțiune este ireversibilă.",
      "removing-message":
        "Se elimină {{count}} documente și {{folderCount}} foldere. Te rugăm să aștepți.",
      "move-success": "S-au mutat cu succes {{count}} documente.",
      date: "Dată",
      type: "Tip",
      no_docs: "Niciun document",
      select_all: "Selectează tot",
      deselect_all: "Deselectează tot",
      remove_selected: "Elimină selectate",
      costs: "*Cost unic pentru embeddings",
      save_embed: "Salvează și încorporează",
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
      "processor-offline": "Procesorul de documente este offline",
      "processor-offline-desc":
        "Nu putem încărca fișierele tale acum deoarece procesorul de documente este offline. Te rugăm să încerci din nou mai târziu.",
      "click-upload": "Clic pentru a încărca sau trage și plasa",
      "file-types":
        "suportă fișiere text, CSV-uri, foi de calcul, fișiere audio și multe altele!",
      "or-submit-link": "sau trimite un link",
      "placeholder-link": "https://exemplu.com",
      fetching: "Se preia...",
      "fetch-website": "Preluare site web",
      "privacy-notice":
        "Aceste fișiere vor fi încărcate în procesorul de documente care rulează pe această instanță AnythingLLM. Aceste fișiere nu sunt trimise sau partajate cu o terță parte.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Ce este fixarea documentelor?",
      pin_explained_block1:
        "Când **fixezi** un document în AnythingLLM, vom injecta întregul conținut al documentului în fereastra de prompt pentru ca LLM-ul tău să-l înțeleagă pe deplin.",
      pin_explained_block2:
        "Acest lucru funcționează cel mai bine cu **modele cu context mare** sau fișiere mici care sunt critice pentru baza sa de cunoștințe.",
      pin_explained_block3:
        "Dacă nu obții răspunsurile dorite de la AnythingLLM în mod implicit, atunci fixarea este o modalitate excelentă de a obține răspunsuri de calitate superioară dintr-un clic.",
      accept: "Ok, am înțeles",
    },
    watching: {
      what_watching: "Ce face vizualizarea unui document?",
      watch_explained_block1:
        "Când **urmărești** un document în AnythingLLM, vom sincroniza *automat* conținutul documentului tău din sursa originală la intervale regulate. Acest lucru va actualiza automat conținutul în fiecare spațiu de lucru unde acest fișier este gestionat.",
      watch_explained_block2:
        "Această funcție suportă în prezent conținutul online și nu va fi disponibilă pentru documentele încărcate manual.",
      watch_explained_block3_start:
        "Poți gestiona ce documente sunt urmărite din vizualizarea de administrator a ",
      watch_explained_block3_link: "Managerului de fișiere",
      watch_explained_block3_end: ".",
      accept: "Ok, am înțeles",
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
    welcome: "Bine ai venit în noul tău spațiu de lucru.",
    get_started: "Pentru a începe, fie",
    get_started_default: "Pentru a începe",
    upload: "încarcă un document",
    or: "sau",
    attachments_processing:
      "Fișierele atașate se procesează. Te rugăm să aștepți...",
    send_chat: "trimite un chat.",
    send_message: "Trimite mesaj",
    attach_file: "Atașează un fișier la acest chat",
    slash: "Vizualizează toate comenzile slash disponibile pentru chat.",
    agents: "Vezi toți agenții disponibili pentru chat.",
    start_agent_session: "Start agent session",
    text_size: "Schimbă dimensiunea textului.",
    microphone: "Vorbește promptul tău.",
    send: "Trimite prompt către spațiul de lucru",
    tts_speak_message: "Rostește mesajul TTS",
    copy: "Copiază",
    regenerate: "Regenerare",
    regenerate_response: "Regenerare răspuns",
    good_response: "Răspuns bun",
    more_actions: "Mai multe acțiuni",
    hide_citations: "Ascunde citările",
    show_citations: "Arată citările",
    sources: "Surse",
    source_count_one: "{{count}} – referință",
    source_count_other: "Referințe către {{count}}",
    document: "Document",
    similarity_match: "meci",
    pause_tts_speech_message: "Pauză rostire mesaj TTS",
    fork: "Fork",
    delete: "Șterge",
    save_submit: "Salvează & Trimite",
    cancel: "Anulează",
    submit: "Trimite",
    edit_prompt: "Editează prompt",
    edit_response: "Editează răspuns",
    edit_info_user:
      "„Trimite” recreează răspunsul generat de inteligența artificială. „Salvează” actualizează doar mesajul dumneavoastră.",
    edit_info_assistant:
      "Modificările pe care le faceți vor fi salvate direct în acest răspuns.",
    see_less: "Vezi mai puțin",
    see_more: "Vezi mai multe",
    at_agent: "@agent",
    default_agent_description:
      " - agentul implicit pentru acest spațiu de lucru.",
    custom_agents_coming_soon: "agenții personalizați vin în curând!",
    preset_reset_description:
      "Șterge istoricul chatului și începe o conversație nouă",
    preset_exit_description: "Întrerupeți sesiunea actuală a agentului",
    add_new_preset: " Adaugă preset nou",
    add_new: "Adaugă",
    edit: "Editează",
    publish: "Publica",
    stop_generating: "Opriți generarea răspunsului",
    command: "Comandă",
    your_command: "comanda-ta",
    placeholder_prompt:
      "Acesta este conținutul care va fi injectat înaintea promptului tău.",
    description: "Descriere",
    placeholder_description: "Răspunde cu o poezie despre LLM-uri.",
    save: "Salvează",
    small: "Mic",
    normal: "Normal",
    large: "Mare",
    tools: "Unelte",
    slash_commands: "Comenzi scurte",
    agent_skills: "Abilități ale agenților",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Navigați",
    text_size_label: "Dimensiunea textului",
    select_model: "Selectați modelul",
    workspace_llm_manager: {
      search: "Caută furnizori LLM",
      loading_workspace_settings: "Se încarcă setările spațiului de lucru...",
      available_models: "Modele disponibile pentru {{provider}}",
      available_models_description:
        "Selectează un model pentru acest spațiu de lucru.",
      save: "Folosește acest model",
      saving: "Setez modelul ca implicit pentru spațiu de lucru...",
      missing_credentials: "Acest furnizor lipsește credențiale!",
      missing_credentials_description: "Click pentru a configura credențialele",
    },
  },
  profile_settings: {
    edit_account: "Editează contul",
    profile_picture: "Poză profil",
    remove_profile_picture: "Șterge poza profil",
    username: "Nume utilizator",
    new_password: "Parolă nouă",
    password_description: "Parola trebuie să aibă cel puțin 8 caractere",
    cancel: "Anulează",
    update_account: "Actualizează contul",
    theme: "Preferință temă",
    language: "Limba preferată",
    failed_upload: "Încărcarea pozei de profil a eșuat: {{error}}",
    upload_success: "Poză de profil încărcată.",
    failed_remove: "Ștergerea pozei de profil a eșuat: {{error}}",
    profile_updated: "Profil actualizat.",
    failed_update_user: "Actualizarea utilizatorului a eșuat: {{error}}",
    account: "Cont",
    support: "Suport",
    signout: "Deconectare",
  },
  "keyboard-shortcuts": {
    title: "Scurtături de tastatură",
    shortcuts: {
      settings: "Deschide setările",
      workspaceSettings: "Deschide setările spațiului curent de lucru",
      home: "Mergi la pagina principală",
      workspaces: "Gestionează spațiile de lucru",
      apiKeys: "Setările API Keys",
      llmPreferences: "Preferințe LLM",
      chatSettings: "Setări chat",
      help: "Arată ajutor pentru scurtături de tastatură",
      showLLMSelector: "Arată selectorul LLM pentru spațiu de lucru",
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
          "Promptul sistemului tău a fost publicat în Comunitate!",
        success_thank_you: "Mulțumim pentru contribuția ta!",
        view_on_hub: "Vezi pe Community Hub",
        modal_title: "Publică System Prompt ",
        name_label: "Nume",
        name_description:
          "Acesta este numele afișat al System Prompt-ului tău.",
        name_placeholder: "Asistentul meu",
        description_label: "Descriere",
        description_description: "Descrie scopul System Prompt-ului tău.",
        tags_label: "Etichete",
        tags_description:
          "Etichetele ajută la căutarea Promptului. Max 5 etichete, max 20 caractere fiecare.",
        tags_placeholder: "Tastează și apasă Enter pentru a adăuga etichete",
        visibility_label: "Vizibilitate",
        public_description: "Prompturile publice sunt vizibile tuturor.",
        private_description: "Prompturile private sunt vizibile doar ție.",
        publish_button: "Publică pe Community Hub",
        submitting: "Se publică...",
        submit: "Publică pe Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Acesta este promptul efectiv folosit pentru a ghida LLM-ul.",
        prompt_placeholder: "Introdu System Prompt-ul aici...",
      },
      agent_flow: {
        public_description: "Fluxurile agent publice sunt vizibile tuturor.",
        private_description: "Fluxurile agent private sunt vizibile doar ție.",
        success_title: "Succes!",
        success_description:
          "Fluxul agentului tău a fost publicat în Comunitate!",
        success_thank_you: "Mulțumim pentru contribuția ta!",
        view_on_hub: "Vezi pe Community Hub",
        modal_title: "Publică flux agent",
        name_label: "Nume",
        name_description: "Acesta este numele afișat al fluxului tău agent.",
        name_placeholder: "Fluxul meu agent",
        description_label: "Descriere",
        description_description: "Descrie scopul fluxului tău agent.",
        tags_label: "Etichete",
        tags_description:
          "Etichetele ajută la găsirea fluxului agent. Max 5 etichete, max 20 caractere fiecare.",
        tags_placeholder: "Tastează și apasă Enter pentru a adăuga etichete",
        visibility_label: "Vizibilitate",
        publish_button: "Publică pe Community Hub",
        submitting: "Se publică...",
        submit: "Publică pe Community Hub",
        privacy_note:
          "Fluxurile agent sunt întotdeauna încărcate privat pentru a proteja datele sensibile. Poți schimba vizibilitatea după publicare. Verifică că nu conține informații sensibile înainte să publici.",
      },
      slash_command: {
        success_title: "Succes!",
        success_description: "Comanda slash ta a fost publicată în Comunitate!",
        success_thank_you: "Mulțumim pentru contribuția ta!",
        view_on_hub: "Vezi pe Community Hub",
        modal_title: "Publică comandă slash",
        name_label: "Nume",
        name_description: "Acesta este numele afișat al comenzii tale slash.",
        name_placeholder: "Comanda mea slash",
        description_label: "Descriere",
        description_description: "Descrie scopul comenzii tale slash.",
        command_label: "Comandă",
        command_description:
          "Aceasta este comanda slash pe care utilizatorii o vor scrie pentru a o activa.",
        command_placeholder: "comanda-mea",
        tags_label: "Etichete",
        tags_description:
          "Etichetele ajută la găsirea comenzii. Max 5 etichete, max 20 caractere fiecare.",
        tags_placeholder: "Tastează și apasă Enter pentru a adăuga etichete",
        visibility_label: "Vizibilitate",
        public_description: "Comenzile slash publice sunt vizibile tuturor.",
        private_description: "Comenzile slash private sunt vizibile doar ție.",
        publish_button: "Publică pe Community Hub",
        submitting: "Se publică...",
        prompt_label: "Prompt",
        prompt_description:
          "Acesta este promptul folosit când se declanșează comanda slash.",
        prompt_placeholder: "Introdu promptul aici...",
      },
      generic: {
        unauthenticated: {
          title: "Autentificare necesară",
          description:
            "Trebuie să te autentifici cu AnythingLLM Community Hub înainte de a publica elemente.",
          button: "Conectează-te la Community Hub",
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
