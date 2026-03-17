const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Laipni lūgti",
      getStarted: "Sākt darbu",
    },
    llm: {
      title: "LLM preferences",
      description:
        "AnythingLLM var strādāt ar daudziem LLM pakalpojumu sniedzējiem. Šis būs pakalpojums, kas apstrādās sarunas.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Lietotāja iestatīšana",
      description: "Konfigurējiet savus lietotāja iestatījumus.",
      howManyUsers: "Cik daudz lietotāju izmantos šo instanci?",
      justMe: "Tikai es",
      myTeam: "Mana komanda",
      instancePassword: "Instances parole",
      setPassword: "Vai vēlaties iestatīt paroli?",
      passwordReq: "Parolēm jābūt vismaz 8 rakstzīmes garām.",
      passwordWarn: "Svarīgi saglabāt šo paroli, jo nav atjaunošanas metodes.",
      adminUsername: "Administratora konta lietotājvārds",
      adminPassword: "Administratora konta parole",
      adminPasswordReq: "Parolēm jābūt vismaz 8 rakstzīmes garām.",
      teamHint:
        "Pēc noklusējuma jūs būsiet vienīgais administrators. Kad ievadīšana būs pabeigta, jūs varēsiet izveidot un uzaicināt citus būt par lietotājiem vai administratoriem. Neaizmirstiet savu paroli, jo tikai administratori var atiestatīt paroles.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Datu apstrāde un privātums",
      description:
        "Mēs esam apņēmušies nodrošināt caurskatāmību un kontroli pār jūsu personīgajiem datiem.",
      settingsHint:
        "Šos iestatījumus var pārkonfigurēt jebkurā laikā iestatījumos.",
    },
    survey: {
      title: "Laipni lūgti AnythingLLM",
      description:
        "Palīdziet mums veidot AnythingLLM atbilstoši jūsu vajadzībām. Neobligāti.",
      email: "Kāds ir jūsu e-pasts?",
      useCase: "Kam izmantosiet AnythingLLM?",
      useCaseWork: "Darbam",
      useCasePersonal: "Personīgai lietošanai",
      useCaseOther: "Citam nolūkam",
      comment: "Kā jūs uzzinājāt par AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube utt. - Ļaujiet mums zināt, kā jūs mūs atradāt!",
      skip: "Izlaist aptauju",
      thankYou: "Paldies par jūsu atsauksmi!",
    },
    workspace: {
      title: "Izveidojiet savu pirmo darba telpu",
      description:
        "Izveidojiet savu pirmo darba telpu un sāciet darbu ar AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Darba telpas nosaukums",
    error: "kļūda",
    success: "veiksmīgi",
    user: "Lietotājs",
    selection: "Modeļa izvēle",
    saving: "Saglabā...",
    save: "Saglabāt izmaiņas",
    previous: "Iepriekšējā lapa",
    next: "Nākamā lapa",
    optional: "Neobligāti",
    yes: "Jā",
    no: "Nē",
    search: "Meklēšana",
    username_requirements:
      "Lietotājvārdam jābūt 2–32 rakstzīmju garam, jāsākas ar mazo burtu un jāsatur tikai mazie burti, cipari, apakšsvītras, domuzīmes un punkti.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Laipni lūgti",
    chooseWorkspace: "Izvēlies darba vietu, lai sāktu čatu!",
    notAssigned:
      "Jūs nav piešķirts nevienai darba vietai.\nLūdzu, sazinieties ar savu administratoru, lai pieprasītu piekļuvi darba vietai.",
    goToWorkspace: 'Pāriet uz darba vietu "{{workspace}}"',
  },
  settings: {
    title: "Instances iestatījumi",
    system: "Vispārīgie iestatījumi",
    invites: "Ielūgumi",
    users: "Lietotāji",
    workspaces: "Darba telpas",
    "workspace-chats": "Darba telpas sarunas",
    customization: "Pielāgošana",
    interface: "UI preferences",
    branding: "Zīmolraide un identitāte",
    chat: "Sarunas",
    "api-keys": "Izstrādātāja API",
    llm: "LLM",
    transcription: "Transkripcija",
    embedder: "Embedder",
    "text-splitting": "Teksta sadalītājs un sadrumstalošana",
    "voice-speech": "Balss un runa",
    "vector-database": "Vektoru datubāze",
    embeds: "Sarunas ietvere",
    "embed-chats": "Sarunas ietveres vēsture",
    security: "Drošība",
    "event-logs": "Notikumu žurnāli",
    privacy: "Privātums un dati",
    "ai-providers": "AI pakalpojumu sniedzēji",
    "agent-skills": "Aģenta prasmes",
    "community-hub": {
      title: "Sabiedriskais centrs",
      trending: "Izpētiet populārākās",
      "your-account": "Jūsu konts",
      "import-item": "Importētā prece",
    },
    admin: "Administrators",
    tools: "Rīki",
    "system-prompt-variables": "Sistēmas uzvednes mainīgie",
    "experimental-features": "Eksperimentālās funkcijas",
    contact: "Sazināties ar atbalstu",
    "browser-extension": "Pārlūka paplašinājums",
    "mobile-app": "AnythingLLM mobilā versija",
  },
  login: {
    "multi-user": {
      welcome: "Laipni lūgti",
      "placeholder-username": "Lietotājvārds",
      "placeholder-password": "Parole",
      login: "Ielogoties",
      validating: "Validē...",
      "forgot-pass": "Aizmirsi paroli",
      reset: "Atiestatīt",
    },
    "sign-in": "Piesakieties savā {{appName}} kontā.",
    "password-reset": {
      title: "Paroles atiestatīšana",
      description:
        "Sniedziet nepieciešamo informāciju zemāk, lai atiestatītu savu paroli.",
      "recovery-codes": "Atjaunošanas kodi",
      "recovery-code": "Atjaunošanas kods {{index}}",
      "back-to-login": "Atpakaļ uz pieteikšanos",
    },
  },
  "main-page": {
    greeting: "Kā es varu jums šodien palīdzēt?",
    noWorkspaceError: "Lūdzu izveidojiet darba telpu pirms sarunas sākšanas.",
    checklist: {
      title: "Darba sākšana",
      tasksLeft: "atlikušie uzdevumi",
      completed: "Jūs esat ceļā, lai kļūtu par AnythingLLM ekspertu!",
      dismiss: "aizvērt",
      tasks: {
        create_workspace: {
          title: "Izveidot darba telpu",
          description: "Izveidojiet savu pirmo darba telpu, lai sāktu",
          action: "Izveidot",
        },
        send_chat: {
          title: "Nosūtīt sarunu",
          description: "Sāciet sarunu ar savu AI asistentu",
          action: "Saruna",
        },
        embed_document: {
          title: "Iegult dokumentu",
          description: "Pievienojiet savu pirmo dokumentu darba telpai",
          action: "Iegult",
        },
        setup_system_prompt: {
          title: "Iestatīt sistēmas uzvedni",
          description: "Konfigurējiet sava AI asistenta uzvedību",
          action: "Iestatīt",
        },
        define_slash_command: {
          title: "Definēt slīpsvītras komandu",
          description: "Izveidojiet pielāgotas komandas savam asistentam",
          action: "Definēt",
        },
        visit_community: {
          title: "Apmeklēt kopienas centru",
          description: "Izpētiet kopienas resursus un veidnes",
          action: "Pārlūkot",
        },
      },
    },
    quickActions: {
      createAgent: "Izveidot aģentu",
      editWorkspace: "Rediģēt darba telpu",
      uploadDocument: "August failu",
    },
    quickLinks: {
      title: "Ātrās saites",
      sendChat: "Sūtīt sarunu",
      embedDocument: "Iegult dokumentu",
      createWorkspace: "Izveidot darba telpu",
    },
    exploreMore: {
      title: "Izpētiet vairāk funkciju",
      features: {
        customAgents: {
          title: "Pielāgoti AI aģenti",
          description:
            "Veidojiet spēcīgus AI aģentus un automatizācijas bez koda.",
          primaryAction: "Sarunāties izmantojot @agent",
          secondaryAction: "Veidot aģenta plūsmu",
        },
        slashCommands: {
          title: "Slīpsvītras komandas",
          description:
            "Ietaupiet laiku un ievietojiet uzvednes izmantojot pielāgotas slīpsvītras komandas.",
          primaryAction: "Izveidot slīpsvītras komandu",
          secondaryAction: "Izpētīt centrā",
        },
        systemPrompts: {
          title: "Sistēmas uzvednes",
          description:
            "Modificējiet sistēmas uzvedni, lai pielāgotu AI atbildes darba telpā.",
          primaryAction: "Modificēt sistēmas uzvedni",
          secondaryAction: "Pārvaldīt uzvednes mainīgos",
        },
      },
    },
    announcements: {
      title: "Atjauninājumi un paziņojumi",
    },
    resources: {
      title: "Resursi",
      links: {
        docs: "Dokumentācija",
        star: "Zvaigzne GitHub",
      },
      keyboardShortcuts: "Taustiņu atvieglojumi",
    },
  },
  "new-workspace": {
    title: "Jauna darba telpa",
    placeholder: "Mana darba telpa",
  },
  "workspaces—settings": {
    general: "Vispārīgie iestatījumi",
    chat: "Sarunas iestatījumi",
    vector: "Vektoru datubāze",
    members: "Dalībnieki",
    agent: "Aģenta konfigurācija",
  },
  general: {
    vector: {
      title: "Vektoru skaits",
      description: "Kopējais vektoru skaits jūsu vektoru datubāzē.",
    },
    names: {
      description: "Tas mainīs tikai jūsu darba telpas attēlojamo nosaukumu.",
    },
    message: {
      title: "Ieteiktās sarunas ziņas",
      description:
        "Pielāgojiet ziņas, kas tiks ieteiktas jūsu darba telpas lietotājiem.",
      add: "Pievienot jaunu ziņu",
      save: "Saglabāt ziņas",
      heading: "Izskaidro man",
      body: "AnythingLLM priekšrocības",
    },
    pfp: {
      title: "Asistenta profila attēls",
      description: "Pielāgojiet asistenta profila attēlu šai darba telpai.",
      image: "Darba telpas attēls",
      remove: "Noņemt darba telpas attēlu",
    },
    delete: {
      title: "Dzēst darba telpu",
      description:
        "Dzēst šo darba telpu un visus tās datus. Tas dzēsīs darba telpu visiem lietotājiem.",
      delete: "Dzēst darba telpu",
      deleting: "Dzēš darba telpu...",
      "confirm-start": "Jūs gatavojaties dzēst visu savu",
      "confirm-end":
        "darba telpu. Tas noņems visus vektoru iegulšanas jūsu vektoru datubāzē.\n\nOriģinālie avota faili paliks neskartie. Šī darbība ir neatgriezeniska.",
    },
  },
  chat: {
    llm: {
      title: "Darba telpas LLM pakalpojumu sniedzējs",
      description:
        "Konkrētais LLM pakalpojumu sniedzējs un modelis, kas tiks izmantots šai darba telpai. Pēc noklusējuma tas izmanto sistēmas LLM pakalpojumu sniedzēju un iestatījumus.",
      search: "Meklēt visus LLM pakalpojumu sniedzējus",
    },
    model: {
      title: "Darba telpas sarunas modelis",
      description:
        "Konkrētais sarunas modelis, kas tiks izmantots šai darba telpai. Ja tukšs, izmantos sistēmas LLM preferences.",
      wait: "-- gaida modeļus --",
    },
    mode: {
      title: "Sarunas režīms",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Saruna",
        "desc-start": "sniegs atbildes ar LLM vispārējām zināšanām",
        and: "un",
        "desc-end": "dokumentu kontekstu, kas tiek atrasts.",
      },
      query: {
        title: "Vaicājums",
        "desc-start": "sniegs atbildes",
        only: "tikai",
        "desc-end": "ja tiek atrasts dokumentu konteksts.",
      },
    },
    history: {
      title: "Sarunu vēsture",
      "desc-start":
        "Iepriekšējo sarunu skaits, kas tiks iekļauts atbildes īslaicīgajā atmiņā.",
      recommend: "Ieteicams 20. ",
      "desc-end":
        "Vairāk nekā 45 var novest pie nepārtrauktām sarunu kļūmēm atkarībā no ziņojuma izmēra.",
    },
    prompt: {
      title: "Sistēmas uzvedne",
      description:
        "Uzvedne, kas tiks izmantota šajā darba telpā. Definējiet kontekstu un instrukcijas AI, lai ģenerētu atbildi. Jums vajadzētu nodrošināt rūpīgi izstrādātu uzvedni, lai AI varētu ģenerēt atbilstošu un precīzu atbildi.",
      history: {
        title: "Sistēmas uzvednes vēsture",
        clearAll: "Notīrīt visu",
        noHistory: "Nav pieejama sistēmas uzvednes vēsture",
        restore: "Atjaunot",
        delete: "Dzēst",
        publish: "Publicē savu saturu Community Hub.",
        deleteConfirm: "Vai tiešām vēlaties dzēst šo vēstures ierakstu?",
        clearAllConfirm:
          "Vai tiešām vēlaties nodzēst visu vēsturi? Šo darbību nevar atsaukt.",
        expand: "Paplašināt",
      },
    },
    refusal: {
      title: "Vaicājuma režīma atteikuma atbilde",
      "desc-start": "Kad",
      query: "vaicājuma",
      "desc-end":
        "režīmā, jūs varētu vēlēties atgriezt pielāgotu atteikuma atbildi, kad konteksts nav atrasts.",
      "tooltip-title": "Kāpēc es to redzu?",
      "tooltip-description":
        "Jūs atrodaties meklēšanas režīmā, kas izmanto tikai informāciju no jūsu dokumentiem. Izmantojiet runas režīmu, lai nodrošinātu elastīgākas sarunas, vai noklikšķiniet šeit, lai apmeklētu mūsu dokumentāciju un iegūtu vairāk informācijas par runas režīmiem.",
    },
    temperature: {
      title: "LLM Temperatūra",
      "desc-start":
        'Šis iestatījums kontrolē, cik "radošas" būs jūsu LLM atbildes.',
      "desc-end":
        "Jo lielāks skaitlis, jo radošākas atbildes. Dažiem modeļiem tas var novest pie nesaprotamām atbildēm, ja iestatīts pārāk augsts.",
      hint: "Lielākajai daļai LLM ir dažādi pieņemami derīgo vērtību diapazoni. Konsultējieties ar savu LLM pakalpojumu sniedzēju par šo informāciju.",
    },
  },
  "vector-workspace": {
    identifier: "Vektoru datubāzes identifikators",
    snippets: {
      title: "Maksimālie konteksta fragmenti",
      description:
        "Šis iestatījums kontrolē maksimālo konteksta fragmentu skaitu, kas tiks nosūtīti LLM katrai sarunai vai vaicājumam.",
      recommend: "Ieteicams: 4",
    },
    doc: {
      title: "Dokumentu līdzības slieksnis",
      description:
        "Minimālais līdzības rādītājs, kas nepieciešams, lai avots tiktu uzskatīts par saistītu ar sarunu. Jo lielāks skaitlis, jo līdzīgākam avotam jābūt sarunai.",
      zero: "Bez ierobežojuma",
      low: "Zems (līdzības vērtējums ≥ .25)",
      medium: "Vidējs (līdzības vērtējums ≥ .50)",
      high: "Augsts (līdzības vērtējums ≥ .75)",
    },
    reset: {
      reset: "Atiestatīt vektoru datubāzi",
      resetting: "Notīra vektorus...",
      confirm:
        "Jūs gatavojaties atiestatīt šīs darba telpas vektoru datubāzi. Tas noņems visas pašlaik iegultās vektoru iegulšanas.\n\nOriģinālie avota faili paliks neskartie. Šī darbība ir neatgriezeniska.",
      error: "Darba telpas vektoru datubāzi nevarēja atiestatīt!",
      success: "Darba telpas vektoru datubāze tika atiestatīta!",
    },
  },
  agent: {
    "performance-warning":
      "LLM, kas tieši neatbalsta rīku izsaukumus, veiktspēja ir ļoti atkarīga no modeļa iespējām un precizitātes. Dažas iespējas var būt ierobežotas vai nefunkcionālas.",
    provider: {
      title: "Darba telpas aģenta LLM pakalpojumu sniedzējs",
      description:
        "Konkrētais LLM pakalpojumu sniedzējs un modelis, kas tiks izmantots šīs darba telpas @agent aģentam.",
    },
    mode: {
      chat: {
        title: "Darba telpas aģenta sarunas modelis",
        description:
          "Konkrētais sarunas modelis, kas tiks izmantots šīs darba telpas @agent aģentam.",
      },
      title: "Darba telpas aģenta modelis",
      description:
        "Konkrētais LLM modelis, kas tiks izmantots šīs darba telpas @agent aģentam.",
      wait: "-- gaida modeļus --",
    },
    skill: {
      title: "Noklusējuma aģenta prasmes",
      description:
        "Uzlabojiet noklusējuma aģenta dabiskās spējas ar šīm iepriekš izveidotajām prasmēm. Šis uzstādījums attiecas uz visām darba telpām.",
      rag: {
        title: "RAG un ilgtermiņa atmiņa",
        description:
          'Ļaujiet aģentam izmantot jūsu lokālos dokumentus, lai atbildētu uz vaicājumu, vai lūdziet aģentu "atcerēties" satura daļas ilgtermiņa atmiņas izguvei.',
      },
      view: {
        title: "Skatīt un apkopot dokumentus",
        description:
          "Ļaujiet aģentam uzskaitīt un apkopot pašlaik iegulto darba telpas failu saturu.",
      },
      scrape: {
        title: "Iegūt tīmekļa vietnes",
        description: "Ļaujiet aģentam apmeklēt un iegūt tīmekļa vietņu saturu.",
      },
      generate: {
        title: "Ģenerēt diagrammas",
        description:
          "Iespējot noklusējuma aģentam ģenerēt dažāda veida diagrammas no sarunā sniegtajiem vai dotajiem datiem.",
      },
      save: {
        title: "Ģenerēt un saglabāt failus pārlūkā",
        description:
          "Iespējot noklusējuma aģentam ģenerēt un rakstīt failus, kas saglabājas un var tikt lejupielādēti jūsu pārlūkā.",
      },
      web: {
        title: "Tiešsaistes tīmekļa meklēšana un pārlūkošana",
        description:
          "Iegādājieties iespēju, lai jūsu aģents varētu meklēt informāciju internetā, lai atbildētu uz jūsu jautājumiem, pieslēdzoties tīmekļa meklēšanas (SERP) pakalpojuma sniedzējam.",
      },
      sql: {
        title: "SQL savienotājs",
        description:
          "Ļauj savam pārstāvim izmantot SQL, lai atbildētu uz jūsu jautājumiem, savienojoties ar dažādiem SQL datubāzes sniedzējiem.",
      },
      default_skill:
        "Par iestatījumu, šī spēja ir aktivizēta, taču jūs varat to izslēgt, ja nevēlaties, lai tā būtu pieejama aģentam.",
    },
  },
  recorded: {
    title: "Darba telpas sarunas",
    description:
      "Šīs ir visas ierakstītās sarunas un ziņas, ko lietotāji ir nosūtījuši, sakārtotas pēc to izveides datuma.",
    export: "Eksportēt",
    table: {
      id: "ID",
      by: "Nosūtīja",
      workspace: "Darba telpa",
      prompt: "Uzvedne",
      response: "Atbilde",
      at: "Nosūtīts",
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
      title: "UI preferences",
      description: "Iestatiet savas UI preferences AnythingLLM.",
    },
    branding: {
      title: "Zīmolrade un identitāte",
      description:
        "Pielāgojiet savu AnythingLLM instanci ar pielāgotu zīmolradi.",
    },
    chat: {
      title: "Saruna",
      description: "Iestatiet savas sarunas preferences AnythingLLM.",
      auto_submit: {
        title: "Automātiski iesniegt runas ievadi",
        description: "Automātiski iesniegt runas ievadi pēc klusuma perioda",
      },
      auto_speak: {
        title: "Automātiski runāt atbildes",
        description: "Automātiski runāt atbildes no AI",
      },
      spellcheck: {
        title: "Iespējot pareizrakstības pārbaudi",
        description:
          "Iespējot vai atspējot pareizrakstības pārbaudi sarunas ievades laukā",
      },
    },
    items: {
      theme: {
        title: "Tēma",
        description: "Izvēlieties vēlamo krāsu tēmu lietotnei.",
      },
      "show-scrollbar": {
        title: "Rādīt ritjoslu",
        description: "Iespējot vai atspējot ritjoslu sarunas logā.",
      },
      "support-email": {
        title: "Atbalsta e-pasts",
        description:
          "Iestatiet atbalsta e-pasta adresi, kam lietotājiem jābūt pieejamam, kad viņiem nepieciešama palīdzība.",
      },
      "app-name": {
        title: "Nosaukums",
        description:
          "Iestatiet nosaukumu, kas tiek rādīts pieteikšanās lapā visiem lietotājiem.",
      },
      "chat-message-alignment": {
        title: "Sarunas ziņu līdzinājums",
        description:
          "Izvēlieties ziņu līdzinājuma režīmu, izmantojot sarunas saskarni.",
      },
      "display-language": {
        title: "Displeja valoda",
        description:
          "Izvēlieties vēlamo valodu AnythingLLM lietotāja saskarnei - kad pieejami tulkojumi.",
      },
      logo: {
        title: "Zīmola logotips",
        description:
          "Augšupielādējiet savu pielāgoto logotipu, lai to rādītu visās lapās.",
        add: "Pievienot pielāgotu logotipu",
        recommended: "Ieteicamais izmērs: 800 x 200",
        remove: "Noņemt",
        replace: "Aizvietot",
      },
      "welcome-messages": {
        title: "Sveiciena ziņojumi",
        description:
          "Pielāgojiet sveiciena ziņojumus, kas tiek rādīti lietotājiem. Tikai ne-administratori redzēs šos ziņojumus.",
        new: "Jauns",
        system: "sistēma",
        user: "lietotājs",
        message: "ziņojums",
        assistant: "AnythingLLM čata asistents",
        "double-click": "Dubultklikšķis, lai rediģētu...",
        save: "Saglabāt ziņojumus",
      },
      "browser-appearance": {
        title: "Pārlūkprogrammas izskats",
        description:
          "Pielāgojiet pārlūkprogrammas cilnes izskatu un nosaukumu, kad lietotne ir atvērta.",
        tab: {
          title: "Nosaukums",
          description:
            "Iestatiet pielāgotu cilnes nosaukumu, kad lietotne ir atvērta pārlūkprogrammā.",
        },
        favicon: {
          title: "Favicon",
          description: "Izmantojiet pielāgotu favicon pārlūkprogrammas cilnei.",
        },
      },
      "sidebar-footer": {
        title: "Sānu joslas kājenes vienumi",
        description:
          "Pielāgojiet kājenes vienumus, kas tiek attēloti sānu joslas apakšā.",
        icon: "Ikona",
        link: "Saite",
      },
      "render-html": {
        title: "Izveidot HTML saturu, ko var izmantot čatā.",
        description:
          "Ievietojiet HTML atbildes palīdzības atbildēs.\nTas var novērst daudz augstāku atbildes kvalitātes līmeni, taču arī var radīt potenciālas drošības riskus.",
      },
    },
  },
  api: {
    title: "API atslēgas",
    description:
      "API atslēgas ļauj to īpašniekam programmatiski piekļūt un pārvaldīt šo AnythingLLM instanci.",
    link: "Lasīt API dokumentāciju",
    generate: "Ģenerēt jaunu API atslēgu",
    table: {
      key: "API atslēga",
      by: "Izveidoja",
      created: "Izveidots",
    },
  },
  llm: {
    title: "LLM preferences",
    description:
      "Šie ir akreditācijas dati un iestatījumi jūsu vēlamajam LLM čata un iegulšanas pakalpojuma sniedzējam. Ir svarīgi, lai šīs atslēgas būtu aktuālas un pareizas, pretējā gadījumā AnythingLLM nedarbosies pareizi.",
    provider: "LLM pakalpojuma sniedzējs",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure pakalpojuma gala punkts",
        api_key: "API atslēņa",
        chat_deployment_name: "Izvietošanas nosaukums",
        chat_model_token_limit:
          'Žurnāla "The Guardian" raksts "How to build a sustainable city" ("Kā izveidot ilgtspējīgu pilsētu")\n\n\nŽurnāla "The Guardian" raksts "How to build a sustainable city" ("Kā izveidot ilgtspējīgu pilsētu")',
        model_type: "Modeļa veids",
        model_type_tooltip:
          'Ja jūsu lietojums izmanto loģiskā modelī (o1, o1-mini, o3-mini utt.), norādiet, ka tas ir "Loģisks". Citi gadījumā jūsu sarunu pieprasījumi var neizpildīties.',
        default: "Standarta",
        reasoning: "Pamatojums",
      },
    },
  },
  transcription: {
    title: "Transkripcijas modeļa preferences",
    description:
      "Šie ir akreditācijas dati un iestatījumi jūsu vēlamajam transkripcijas modeļa pakalpojuma sniedzējam. Ir svarīgi, lai šīs atslēgas būtu aktuālas un pareizas, pretējā gadījumā multivides faili un audio netiks transkribēti.",
    provider: "Transkripcijas pakalpojuma sniedzējs",
    "warn-start":
      "Izmantojot lokālo whisper modeli iekārtās ar ierobežotu RAM vai CPU var apstādināt AnythingLLM, apstrādājot multivides failus.",
    "warn-recommend":
      "Mēs iesakām vismaz 2GB RAM un augšupielādēt failus <10Mb.",
    "warn-end":
      "Iebūvētais modelis automātiski lejupielādēsies pirmajā lietošanas reizē.",
  },
  embedding: {
    title: "Iegulšanas preferences",
    "desc-start":
      "Izmantojot LLM, kas neatbalsta iebūvētu iegulšanas dzinēju - jums var būt nepieciešams papildus norādīt akreditācijas datus teksta iegulšanai.",
    "desc-end":
      "Iegulšana ir process, ar kuru teksts tiek pārveidots vektoros. Šie akreditācijas dati ir nepieciešami, lai pārveidotu jūsu failus un vaicājumus formātā, kuru AnythingLLM var izmantot apstrādei.",
    provider: {
      title: "Iegulšanas pakalpojuma sniedzējs",
    },
  },
  text: {
    title: "Teksta sadalīšanas un sagatavošanas preferences",
    "desc-start":
      "Dažreiz jūs, iespējams, vēlēsieties mainīt noklusējuma veidu, kā jauni dokumenti tiek sadalīti un sagatavoti pirms ievietošanas vektoru datubāzē.",
    "desc-end":
      "Jums vajadzētu mainīt šo iestatījumu tikai tad, ja saprotat, kā darbojas teksta sadalīšana un tās blakusefekti.",
    size: {
      title: "Teksta gabala izmērs",
      description:
        "Šis ir maksimālais rakstzīmju skaits, kas var būt vienā vektorā.",
      recommend: "Iegult modeļa maksimālo garumu ir",
    },
    overlap: {
      title: "Teksta gabalu pārklāšanās",
      description:
        "Šī ir maksimālā rakstzīmju pārklāšanās, kas notiek sadalīšanas laikā starp diviem blakus esošiem teksta gabaliem.",
    },
  },
  vector: {
    title: "Vektoru datubāze",
    description:
      "Šie ir akreditācijas dati un iestatījumi tam, kā darbosies jūsu AnythingLLM instance. Ir svarīgi, lai šīs atslēgas būtu aktuālas un pareizas.",
    provider: {
      title: "Vektoru datubāzes pakalpojuma sniedzējs",
      description: "LanceDB nav nepieciešama konfigurācija.",
    },
  },
  embeddable: {
    title: "Iegulstāmie čata logrīki",
    description:
      "Iegulstāmie čata logrīki ir publiskas saziņas saskarnes, kas ir piesaistītas vienam darbam. Tie ļauj izveidot darba vietas, kuras pēc tam varat publicēt pasaulē.",
    create: "Izveidot iegulumu",
    table: {
      workspace: "Darba vieta",
      chats: "Nosūtītie čati",
      active: "Aktīvie domēni",
      created: "Izveidotais",
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
    title: "Iegulto čatu saraksts",
    export: "Eksportēt",
    description:
      "Šie ir visi ierakstītie čati un ziņojumi no jebkura iegultā logrīka, ko esat publicējis.",
    table: {
      embed: "Iegultais",
      sender: "Sūtītājs",
      message: "Ziņojums",
      response: "Atbilde",
      at: "Nosūtīts",
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
    title: "Drošība",
    multiuser: {
      title: "Vairāklietotāju režīms",
      description:
        "Iestatiet savu instanci, lai atbalstītu jūsu komandu, aktivizējot vairāklietotāju režīmu.",
      enable: {
        "is-enable": "Vairāklietotāju režīms ir iespējots",
        enable: "Iespējot vairāklietotāju režīmu",
        description:
          "Pēc noklusējuma jūs būsiet vienīgais administrators. Kā administrators jums būs jāizveido konti visiem jaunajiem lietotājiem vai administratoriem. Nezaudējiet savu paroli, jo tikai administratora lietotājs var atiestatīt paroles.",
        username: "Administratora konta lietotājvārds",
        password: "Administratora konta parole",
      },
    },
    password: {
      title: "Aizsardzība ar paroli",
      description:
        "Aizsargājiet savu AnythingLLM instanci ar paroli. Ja aizmirsīsiet šo paroli, nav atgūšanas metodes, tāpēc pārliecinieties, ka saglabājat šo paroli.",
      "password-label": "Instances paroles",
    },
  },
  event: {
    title: "Notikumu žurnāli",
    description:
      "Skatiet visas darbības un notikumus, kas notiek šajā instancē uzraudzības nolūkos.",
    clear: "Notīrīt notikumu žurnālus",
    table: {
      type: "Notikuma veids",
      user: "Lietotājs",
      occurred: "Notika",
    },
  },
  privacy: {
    title: "Privātums un datu apstrāde",
    description:
      "Šī ir jūsu konfigurācija tam, kā savienotie trešo pušu pakalpojumu sniedzēji un AnythingLLM apstrādā jūsu datus.",
    llm: "LLM izvēle",
    embedding: "Iegulšanas preferences",
    vector: "Vektoru datubāze",
    anonymous: "Anonīmā telemetrija iespējota",
  },
  connectors: {
    "search-placeholder": "Meklēt datu savienotājus",
    "no-connectors": "Nav atrasti datu savienotāji.",
    obsidian: {
      name: "Obsidian",
      description: "Importējiet Obsidian krātuvi ar vienu klikšķi.",
      vault_location: "Krātuves atrašanās vieta",
      vault_description:
        "Atlasiet savu Obsidian krātuves mapi, lai importētu visas piezīmes un to savienojumus.",
      selected_files: "Atrasti {{count}} markdown faili",
      importing: "Notiek krātuves importēšana...",
      import_vault: "Importēt krātuvi",
      processing_time:
        "Tas var aizņemt laiku atkarībā no jūsu krātuves lieluma.",
      vault_warning:
        "Lai izvairītos no konfliktiem, pārliecinieties, ka jūsu Obsidian krātuve pašlaik nav atvērta.",
    },
    github: {
      name: "GitHub repozitorijs",
      description:
        "Importējiet visu publisku vai privātu GitHub repozitoriju ar vienu klikšķi.",
      URL: "GitHub repozitorija URL",
      URL_explained: "GitHub repozitorija URL, kuru vēlaties savākt.",
      token: "GitHub piekļuves tokens",
      optional: "neobligāts",
      token_explained: "Piekļuves tokens, lai novērstu ātruma ierobežojumus.",
      token_explained_start: "Bez ",
      token_explained_link1: "personiskā piekļuves tokena",
      token_explained_middle:
        ", GitHub API var ierobežot savācamo failu skaitu ātruma ierobežojumu dēļ. Jūs varat ",
      token_explained_link2: "izveidot pagaidu piekļuves tokenu",
      token_explained_end: ", lai izvairītos no šīs problēmas.",
      ignores: "Failu ignorēšana",
      git_ignore:
        "Saraksts .gitignore formātā, lai ignorētu konkrētus failus savākšanas laikā. Nospiediet enter pēc katra ieraksta, kuru vēlaties saglabāt.",
      task_explained:
        "Kad tas būs pabeigts, visi faili būs pieejami iegulšanai darba vietās dokumentu atlasītājā.",
      branch: "Zars, no kura vēlaties savākt failus.",
      branch_loading: "-- notiek pieejamo zaru ielāde --",
      branch_explained: "Zars, no kura vēlaties savākt failus.",
      token_information:
        "Bez <b>GitHub piekļuves tokena</b> aizpildīšanas šis datu savienotājs varēs savākt tikai <b>augšējā līmeņa</b> failus repozitorijā GitHub publiskā API ātruma ierobežojumu dēļ.",
      token_personal:
        "Iegūstiet bezmaksas personisko piekļuves tokenu ar GitHub kontu šeit.",
    },
    gitlab: {
      name: "GitLab repozitorijs",
      description:
        "Importējiet visu publisku vai privātu GitLab repozitoriju ar vienu klikšķi.",
      URL: "GitLab repozitorija URL",
      URL_explained: "GitLab repozitorija URL, kuru vēlaties savākt.",
      token: "GitLab piekļuves tokens",
      optional: "neobligāts",
      token_explained: "Piekļuves tokens, lai novērstu ātruma ierobežojumus.",
      token_description: "Atlasiet papildu entītijas, ko iegūt no GitLab API.",
      token_explained_start: "Bez ",
      token_explained_link1: "personiskā piekļuves tokena",
      token_explained_middle:
        ", GitLab API var ierobežot savācamo failu skaitu ātruma ierobežojumu dēļ. Jūs varat ",
      token_explained_link2: "izveidot pagaidu piekļuves tokenu",
      token_explained_end: ", lai izvairītos no šīs problēmas.",
      fetch_issues: "Iegūt problēmas kā dokumentus",
      ignores: "Failu ignorēšana",
      git_ignore:
        "Saraksts .gitignore formātā, lai ignorētu konkrētus failus savākšanas laikā. Nospiediet enter pēc katra ieraksta, kuru vēlaties saglabāt.",
      task_explained:
        "Kad tas būs pabeigts, visi faili būs pieejami iegulšanai darba vietās dokumentu atlasītājā.",
      branch: "Zars, no kura vēlaties savākt failus",
      branch_loading: "-- notiek pieejamo zaru ielāde --",
      branch_explained: "Zars, no kura vēlaties savākt failus.",
      token_information:
        "Bez <b>GitLab piekļuves tokena</b> aizpildīšanas šis datu savienotājs varēs savākt tikai <b>augšējā līmeņa</b> failus repozitorijā GitLab publiskā API ātruma ierobežojumu dēļ.",
      token_personal:
        "Iegūstiet bezmaksas personisko piekļuves tokenu ar GitLab kontu šeit.",
    },
    youtube: {
      name: "YouTube transkripcija",
      description: "Importējiet visa YouTube video transkripciju no saites.",
      URL: "YouTube video URL",
      URL_explained_start:
        "Ievadiet jebkura YouTube video URL, lai iegūtu tā transkripciju. Video ir jābūt pieejamiem ",
      URL_explained_link: "slēgtajiem parakstiem",
      URL_explained_end: ".",
      task_explained:
        "Kad tas būs pabeigts, transkripcija būs pieejama iegulšanai darba vietās dokumentu atlasītājā.",
      language: "Transkripcijas valoda",
      language_explained:
        "Atlasiet transkripcijas valodu, kuru vēlaties savākt.",
      loading_languages: "-- notiek pieejamo valodu ielāde --",
    },
    "website-depth": {
      name: "Vairāku saišu skrāpētājs",
      description:
        "Skrāpējiet vietni un tās apakšsaites līdz noteiktam dziļumam.",
      URL: "Vietnes URL",
      URL_explained: "URL vietnei, kuru vēlaties skrāpēt.",
      depth: "Pārmeklēšanas dziļums",
      depth_explained:
        "Šis ir bērnu saišu skaits, kurām darbiniekam būtu jāseko no sākotnējā URL.",
      max_pages: "Maksimālais lapu skaits",
      max_pages_explained: "Maksimālais skrāpējamo saišu skaits.",
      task_explained:
        "Kad tas būs pabeigts, viss skrāpētais saturs būs pieejams iegulšanai darba vietās dokumentu atlasītājā.",
    },
    confluence: {
      name: "Confluence",
      description: "Importējiet visu Confluence lapu ar vienu klikšķi.",
      deployment_type: "Confluence izvietošanas veids",
      deployment_type_explained:
        "Nosakiet, vai jūsu Confluence instance ir izvietota Atlassian mākonī vai pašu uzturētā.",
      base_url: "Confluence pamata URL",
      base_url_explained: "Šis ir jūsu Confluence telpas pamata URL.",
      space_key: "Confluence telpas atslēga",
      space_key_explained:
        "Šī ir jūsu confluence instances telpas atslēga, kas tiks izmantota. Parasti sākas ar ~",
      username: "Confluence lietotājvārds",
      username_explained: "Jūsu Confluence lietotājvārds",
      auth_type: "Confluence autentifikācijas veids",
      auth_type_explained:
        "Atlasiet autentifikācijas veidu, kuru vēlaties izmantot, lai piekļūtu savām Confluence lapām.",
      auth_type_username: "Lietotājvārds un piekļuves tokens",
      auth_type_personal: "Personiskais piekļuves tokens",
      token: "Confluence piekļuves tokens",
      token_explained_start:
        "Jums ir jānodrošina piekļuves tokens autentifikācijai. Jūs varat ģenerēt piekļuves tokenu",
      token_explained_link: "šeit",
      token_desc: "Piekļuves tokens autentifikācijai",
      pat_token: "Confluence personiskais piekļuves tokens",
      pat_token_explained: "Jūsu Confluence personiskais piekļuves tokens.",
      bypass_ssl: "Aizvest SSL sertifikāta validācijas",
      bypass_ssl_explained:
        "Aktivizējiet šo opciju, lai pārliecinajas no SSL sertifikāta validācijas, izmantojot pašizveidotā sertifikātu, konfluensā, kas ir pašizveidots.",
      task_explained:
        "Kad tas būs pabeigts, lapas saturs būs pieejams iegulšanai darba vietās dokumentu atlasītājā.",
    },
    manage: {
      documents: "Dokumenti",
      "data-connectors": "Datu savienotāji",
      "desktop-only":
        "Šo iestatījumu rediģēšana ir pieejama tikai galddatora ierīcē. Lūdzu, piekļūstiet šai lapai savā galddatorā, lai turpinātu.",
      dismiss: "Noraidīt",
      editing: "Rediģēšana",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Mani dokumenti",
      "new-folder": "Jauna mape",
      "search-document": "Meklēt dokumentu",
      "no-documents": "Nav dokumentu",
      "move-workspace": "Pārvietot uz darba vietu",
      name: "Nosaukums",
      "delete-confirmation":
        "Vai tiešām vēlaties dzēst šos failus un mapes?\nTas noņems failus no sistēmas un automātiski noņems tos no visām esošajām darba vietām.\nŠī darbība nav atgriezeniska.",
      "removing-message":
        "Notiek {{count}} dokumentu un {{folderCount}} mapju noņemšana. Lūdzu, uzgaidiet.",
      "move-success": "Veiksmīgi pārvietoti {{count}} dokumenti.",
      date: "Datums",
      type: "Veids",
      no_docs: "Nav dokumentu",
      select_all: "Atlasīt visu",
      deselect_all: "Atcelt visu atlasi",
      remove_selected: "Noņemt atlasītos",
      costs: "*Vienreizējas izmaksas iegulšanai",
      save_embed: "Saglabāt un iegult",
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
      "processor-offline": "Dokumentu apstrādātājs nav pieejams",
      "processor-offline-desc":
        "Mēs nevaram augšupielādēt jūsu failus, jo dokumentu apstrādātājs ir bezsaistē. Lūdzu, mēģiniet vēlāk.",
      "click-upload":
        "Noklikšķiniet, lai augšupielādētu, vai velciet un nometiet",
      "file-types":
        "atbalsta teksta failus, csv, izklājlapas, audio failus un vēl vairāk!",
      "or-submit-link": "vai iesniedziet saiti",
      "placeholder-link": "https://example.com",
      fetching: "Iegūst...",
      "fetch-website": "Iegūt vietni",
      "privacy-notice":
        "Šie faili tiks augšupielādēti dokumentu apstrādātājā, kas darbojas šajā AnythingLLM instancē. Šie faili netiek nosūtīti vai kopīgoti ar trešo pusi.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Kas ir dokumentu piespraušana?",
      pin_explained_block1:
        "Kad jūs <b>piespraudiet</b> dokumentu AnythingLLM, mēs ievietosim visu dokumenta saturu jūsu uzvednes logā, lai jūsu LLM to pilnībā saprastu.",
      pin_explained_block2:
        "Tas vislabāk darbojas ar <b>liela konteksta modeļiem</b> vai maziem failiem, kas ir kritiski tā zināšanu bāzei.",
      pin_explained_block3:
        "Ja jūs nesaņemat vēlamās atbildes no AnythingLLM pēc noklusējuma, tad piespraušana ir lielisks veids, kā iegūt kvalitatīvākas atbildes ar vienu klikšķi.",
      accept: "Labi, sapratu",
    },
    watching: {
      what_watching: "Ko dara dokumenta novērošana?",
      watch_explained_block1:
        "Kad jūs <b>novērojat</b> dokumentu AnythingLLM, mēs <i>automātiski</i> sinhronizēsim jūsu dokumenta saturu no tā sākotnējā avota regulāros intervālos. Tas automātiski atjauninās saturu katrā darba vietā, kur šis fails tiek pārvaldīts.",
      watch_explained_block2:
        "Šī funkcija pašlaik atbalsta tiešsaistes saturu un nebūs pieejama manuāli augšupielādētiem dokumentiem.",
      watch_explained_block3_start:
        "Jūs varat pārvaldīt, kuri dokumenti tiek novēroti no ",
      watch_explained_block3_link: "Failu pārvaldnieka",
      watch_explained_block3_end: " administratora skata.",
      accept: "Labi, sapratu",
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
    welcome: "Laipni lūgti jūsu jaunajā darba vietā.",
    get_started: "Lai sāktu, vai nu",
    get_started_default: "Lai sāktu",
    upload: "augšupielādējiet dokumentu",
    or: "vai",
    attachments_processing: "Faili tiek apstrādāti. Lūdzu, paceliet.",
    send_chat: "sūtiet čatu.",
    send_message: "Sūtīt ziņojumu",
    attach_file: "Pievienot failu šim čatam",
    slash: "Skatīt visas pieejamās slīpsvītras komandas čatošanai.",
    agents: "Skatīt visus pieejamos aģentus, kurus varat izmantot čatošanai.",
    start_agent_session: "Start agent session",
    text_size: "Mainīt teksta izmēru.",
    microphone: "Izrunājiet savu uzvedni.",
    send: "Nosūtīt uzvednes ziņojumu uz darba vietu",
    tts_speak_message: "TTS run message",
    copy: "Kopēt",
    regenerate: "Atjaunot",
    regenerate_response: "Atjaunot atbildi",
    good_response: "Laba atbilde",
    more_actions: "Vairāk darbību",
    hide_citations: "Izvākt atsaukmes",
    show_citations: "Rādīt atsauces",
    sources: "Avotus",
    source_count_one: "{{count}} – atsauce",
    source_count_other: "Atsauces uz {{count}}",
    document: "Dokuments",
    similarity_match: "spēle",
    pause_tts_speech_message: "Pārtrauciet tekstā iekļauto balss tulkošanu.",
    fork: "Klūtis",
    delete: "Dzēst",
    save_submit: "Saglabāt un iesūt",
    cancel: "Atcelt",
    submit: "Iesniegt",
    edit_prompt: "Ieslēgt",
    edit_response: "Rediģēt atbildi",
    edit_info_user:
      '"Sūtīt" atjauno AI atbildi. "Saglabāt" atjauno tikai jūsu ziņu.',
    edit_info_assistant:
      "Jūsu izmaiņas tiks automātiski saglabātas šajā atbildē.",
    see_less: "Skatīt mazāk",
    see_more: "Skatīt vairāk",
    at_agent: "@agent",
    default_agent_description: "- noklusējuma aģents šim darba telpai.",
    custom_agents_coming_soon:
      "Nedaudz drīzumā būs pieejami individuāli pakalpojumi!",
    preset_reset_description:
      "Izdzēsiet savu pastā veidoتو sarunu vēsturi un sāciet jaunu sarunu.",
    preset_exit_description: "Aizust klientu sesiju",
    add_new_preset: "Pievienot jaunu iepriekšējo",
    add_new: "Pievienot jaunu",
    edit: "Rediģēt",
    publish: "Publicēt",
    stop_generating: "Atsauciet atbildes ģenerēšanu",
    command: "Ordere",
    your_command: "Jūsu komanda",
    placeholder_prompt:
      "Šis ir saturs, kas tiks ievietots pirms jūsu pieprasījuma.",
    description: "Apraksts",
    placeholder_description: "Atbild ar dzeju par lielajiem valodu modeļiem.",
    save: "Saglabāt",
    small: "Mazs.",
    normal: "Normāls",
    large: "Liels",
    tools: "Rīki",
    slash_commands: "Īsziņu komandas",
    agent_skills: "Aģenta prasmes",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Izpētiet",
    text_size_label: "Teksta izmērs",
    select_model: "Izvēlieties modeli",
    workspace_llm_manager: {
      search: "Izmeklē LLM sniedzējus",
      loading_workspace_settings: "Ielāde darba vidējās iestatījumi...",
      available_models: "Pieejamās modeļi: {{provider}}",
      available_models_description:
        "Izvēlieties modeli, ko izmantot šim darba zonai.",
      save: "Izmantojiet šo modeli.",
      saving: "Iestata modeli kā noklusēto darba vietai...",
      missing_credentials:
        "Šim pakalpojuma sniedzējam nav sniegta nekur dokumentēta informācija.",
      missing_credentials_description:
        "Noklikšķiniet, lai konfigurētu autentifikācijas datus",
    },
  },
  profile_settings: {
    edit_account: "Rediģēt kontu",
    profile_picture: "Profila attēls",
    remove_profile_picture: "Noņemt profila attēlu",
    username: "Lietotājvārds",
    new_password: "Jauna parole",
    password_description: "Parolei jābūt vismaz 8 rakstzīmes garai",
    cancel: "Atcelt",
    update_account: "Atjaunināt kontu",
    theme: "Tēmas preference",
    language: "Vēlamā valoda",
    failed_upload: "Neizdevās augsēt profilas attēlu: {{error}}",
    upload_success: "Profila attēls ir augšupielādēts.",
    failed_remove: "Neizdevās noņemt profilbildi: {{error}}",
    profile_updated: "Profils atjaunināts.",
    failed_update_user: "Neizdevās atjaunināt lietotāju: {{error}}",
    account: "Konta",
    support: "Atbalsts",
    signout: "Iziet",
  },
  "keyboard-shortcuts": {
    title: "Taustiņu atvieglojumi",
    shortcuts: {
      settings: "Atvērt iestatījumus",
      workspaceSettings: "Atvērt pašreizējās darba vides iestatījumus",
      home: "Pārvietojieties uz sākuma lapu",
      workspaces: "Administrējiet darba vietas",
      apiKeys: "API atslēgas – iestatījumi",
      llmPreferences: "LLM prioritātes",
      chatSettings: "Pieskaites iestatījumi",
      help: "Rādīt tastatūras atvērto palīdzības",
      showLLMSelector: "LLM izvēles rīks",
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
        success_title: "Veiksmi!",
        success_description:
          'Jūsu sistēmas iniciatīva ir publicēta "Community Hub" platformā!',
        success_thank_you: "Paldies par dalīšanos ar komunitāti!",
        view_on_hub: "Skatīt Community Hub",
        modal_title: "Publicēšanas sistēmas iniciatīva",
        name_label: "Jānis",
        name_description: "Šis ir jūsu sistēmas komandas nosaukums.",
        name_placeholder: "Mana sistēmas iniciatīva",
        description_label: "Apraksts",
        description_description:
          "Šis ir jūsu sistēmas iniciatīvas apraksts. Izmantojiet to, lai aprakstītu jūsu sistēmas iniciatīvas mērķi.",
        tags_label: "Atzīmes",
        tags_description:
          "Atzīmes tiek izmantotas, lai atzīmētu jūsu sistēmas iniciatīvu, lai to vieglāk atrastu. Jūs varat pievienot vairākas atzīmes. Maks 5 atzīmes. Katrai atzīmei – maksimāli 20 raksti.",
        tags_placeholder:
          'Ievietojiet tekstu un nospiediet "Enter", lai pievienotu atzīmes',
        visibility_label: "Redzamība",
        public_description: "Vispārējās sistēmas aicinājumi ir redzami visiem.",
        private_description:
          "Privātā sistēmas paziņojumi ir redzami tikai jums.",
        publish_button: "Publicē savu saturu Community Hub.",
        submitting: "Izdevniecība...",
        submit: "Publicē savu saturu Community Hub.",
        prompt_label: "Ieslēgt",
        prompt_description:
          "Šis ir tiešais sistēmas prompts, kas tiks izmantots, lai vadītu LLM.",
        prompt_placeholder: "Ievietojiet savu sistēmas komandu šeit...",
      },
      agent_flow: {
        public_description: "Visiem redzamas sabiedrības aģentu darbības.",
        private_description: "Privātās aģenta darbības ir redzamas tikai jums.",
        success_title: "Veiksmi!",
        success_description:
          'Jūsu "Agent Flow" ir publicēts "Community Hub" platformā!',
        success_thank_you: "Paldies par dalīšanos ar kopienu!",
        view_on_hub: "Skatīt Community Hub",
        modal_title: "Publicēšanas aģenta darbības",
        name_label: "Jānis",
        name_description: "Šis ir jūsu aģenta darbības norises nosaukums.",
        name_placeholder: "Mana aģenta darbība",
        description_label: "Apraksts",
        description_description:
          "Šis ir jūsu aģenta darbības apraksts. Izmantojiet to, lai aprakstītu jūsu aģenta darbības mērķi.",
        tags_label: "Atzīmes",
        tags_description:
          "Atzīmes tiek izmantotas, lai atzīmētu jūsu aģenta darbplūsmu, lai to būtu vieglāk atrast. Jūs varat pievienot vairākas atzīmes. Maks 5 atzīmes. Katrai atzīmei – maksimāli 20 raksti.",
        tags_placeholder:
          'Ievietojiet tekstu un nospiediet "Enter", lai pievienotu atzīmes',
        visibility_label: "Redzamība",
        publish_button: "Publicē savu saturu Community Hub.",
        submitting: "Izdevniecība...",
        submit: "Publicē savu saturu Community Hub.",
        privacy_note:
          'Dati tiek augšupielādēti kā privāti, lai aizsargātu jebkādus citus datus. Pēc publicēšanas varat mainīt redzamības iestatījumus "Sabiedrības centrā". Lūdzu, pārliecinieties, ka jūsu dati nesatur nevienu citu vai privātu informāciju, pirms publicēšanas.',
      },
      slash_command: {
        success_title: "Veiksmi!",
        success_description:
          'Jūsu "Slash Command" ir publicēts "Community Hub"!',
        success_thank_you: "Paldies par dalīšanos ar kopienu!",
        view_on_hub: "Skatīt Community Hub",
        modal_title: "Publicējiet Slash komandu",
        name_label: "Jānis",
        name_description: "Šis ir jūsu komandas nosaukums.",
        name_placeholder: "Mana Slash komanda",
        description_label: "Apraksts",
        description_description:
          "Šis ir jūsu komandas apraksts. Izmantojiet to, lai aprakstītu jūsu komandas mērķi.",
        command_label: "Ordere",
        command_description:
          "Šis ir komandu, ko lietotāji ievadīs, lai aktivizētu šo iepriekš noteikto.",
        command_placeholder: "manas komanda",
        tags_label: "Atzīmes",
        tags_description:
          "Atzīmes tiek izmantotas, lai atzīmētu jūsu komandu, kas ļauj vieglāk meklēt. Jūs varat pievienot vairākas atzīmes. Maks 5 atzīmes. Katrai atzīmei – maksimāli 20 raksti.",
        tags_placeholder:
          "Ierakstiet un nospiediet Enter, lai pievienotu atzīmes",
        visibility_label: "Redzamība",
        public_description: "Vispārīgie komandas vārdi ir redzami visiem.",
        private_description: "Vietiski komandu komandās var redzēt tikai jūs.",
        publish_button: "Publicē savu saturu Community Hub.",
        submitting: "Izdevniecība...",
        prompt_label: "Ieslēgt",
        prompt_description:
          "Šis ir komandu, kas tiks izmantots, kad tiks aktivizēta slashes komanda.",
        prompt_placeholder: "Ievietojiet savu pieprasījumu šeit...",
      },
      generic: {
        unauthenticated: {
          title: "Nepieciešama autentifikācija",
          description:
            'Pirms satura publicēšanas ir jāiespējo autentifikācija "AnythingLLM" sabiedrības centrā.',
          button: "Pievienojieties sabiedrības centram",
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
