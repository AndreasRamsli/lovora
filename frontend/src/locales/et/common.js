const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Tere tulemast",
      getStarted: "Alusta",
    },
    llm: {
      title: "LLM-i eelistus",
      description:
        "AnythingLLM töötab paljude LLM-teenusepakkujatega. See teenus haldab vestlust.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Kasutaja seadistus",
      description: "Seadista oma kasutajasätted.",
      howManyUsers: "Mitu kasutajat seda instantsi kasutab?",
      justMe: "Ainult mina",
      myTeam: "Minu meeskond",
      instancePassword: "Instantsi parool",
      setPassword: "Kas soovid parooli seadistada?",
      passwordReq: "Parool peab olema vähemalt 8 märki.",
      passwordWarn:
        "Salvesta see parool hoolikalt, sest taastamisvõimalust ei ole.",
      adminUsername: "Admini kasutajanimi",
      adminPassword: "Admini parool",
      adminPasswordReq: "Parool peab olema vähemalt 8 märki.",
      teamHint:
        "Vaikimisi oled ainus administraator. Pärast häälestust saad luua ning kutsuda teisi kasutajaid või administreerida neid. Parooli kaotamisel saab paroole lähtestada vaid administraator.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Andmetöötlus ja privaatsus",
      description:
        "Oleme pühendunud läbipaistvusele ning kontrollile sinu andmete osas.",
      settingsHint: "Neid sätteid saab igal ajal seadetes muuta.",
    },
    survey: {
      title: "Tere tulemast AnythingLLM-i",
      description:
        "Aita meil AnythingLLM sinu vajadustele vastavaks kujundada. Valikuline.",
      email: "Mis on su e-post?",
      useCase: "Milleks kasutad AnythingLLM-i?",
      useCaseWork: "Töö jaoks",
      useCasePersonal: "Isiklikuks kasutuseks",
      useCaseOther: "Muu",
      comment: "Kust kuulsid AnythingLLM-ist?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube jne – anna meile teada!",
      skip: "Jäta vahele",
      thankYou: "Aitäh tagasiside eest!",
    },
    workspace: {
      title: "Loo oma esimene tööruum",
      description: "Loo esimene tööruum ja alusta AnythingLLM-iga.",
    },
  },
  common: {
    "workspaces-name": "Tööruumide nimi",
    error: "viga",
    success: "õnnestus",
    user: "Kasutaja",
    selection: "Mudeli valik",
    saving: "Salvestan…",
    save: "Salvesta muudatused",
    previous: "Eelmine leht",
    next: "Järgmine leht",
    optional: "Valikuline",
    yes: "Jah",
    no: "Ei",
    search: "otsing",
    username_requirements:
      "Kasutajanimi peab olema 2–32 tähemärki, algama väiketähega ning sisaldama ainult väiketähti, numbreid, alakriipse, sidekriipse ja punkte.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Tere tulemast",
    chooseWorkspace: "Vali tööruum, et alustada vestlust!",
    notAssigned:
      "Sa ei ole täidetud ühtegi tööruumi.\nPäringu tööruumiks, palun pööra teie administraatorile.",
    goToWorkspace: 'Mine tööruumiks "{{workspace}}"',
  },
  settings: {
    title: "Instantsi seaded",
    system: "Üldseaded",
    invites: "Kutsed",
    users: "Kasutajad",
    workspaces: "Tööruumid",
    "workspace-chats": "Tööruumi vestlused",
    customization: "Kohandamine",
    interface: "Kasutajaliidese eelistused",
    branding: "Bränding ja valgesildistamine",
    chat: "Vestlus",
    "api-keys": "Arendaja API",
    llm: "LLM",
    transcription: "Transkriptsioon",
    embedder: "Embeddija",
    "text-splitting": "Teksti lõikamine ja tükeldus",
    "voice-speech": "Hääle ja kõne seaded",
    "vector-database": "Vektoriandmebaas",
    embeds: "Vestluse embed",
    "embed-chats": "Embed-vestluste ajalugu",
    security: "Turvalisus",
    "event-logs": "Sündmuste logid",
    privacy: "Privaatsus ja andmed",
    "ai-providers": "AI-pakkujad",
    "agent-skills": "Agendi oskused",
    "community-hub": {
      title: "Kogukonna keskpunkt",
      trending: "Avasta populaarseid",
      "your-account": "Teie konto",
      "import-item": "Importeeritud toode",
    },
    admin: "Admin",
    tools: "Tööriistad",
    "system-prompt-variables": "Süsteemprompti muutujad",
    "experimental-features": "Eksperimentaalsed funktsioonid",
    contact: "Tugi",
    "browser-extension": "Brauserilaiend",
    "mobile-app": "AnythingLLM mobiilversioon",
  },
  login: {
    "multi-user": {
      welcome: "Tere tulemast",
      "placeholder-username": "Kasutajanimi",
      "placeholder-password": "Parool",
      login: "Logi sisse",
      validating: "Kontrollin…",
      "forgot-pass": "Unustasid parooli",
      reset: "Lähtesta",
    },
    "sign-in": "Logi sisse oma {{appName}} kontosse.",
    "password-reset": {
      title: "Parooli lähtestamine",
      description: "Sisesta all vajalik info, et parool lähtestada.",
      "recovery-codes": "Taastamiskoodid",
      "recovery-code": "Taastamiskood {{index}}",
      "back-to-login": "Tagasi sisselogimisele",
    },
  },
  "main-page": {
    greeting: "Kuidas saan teid täna aidata?",
    noWorkspaceError: "Enne vestlust loo tööruum.",
    checklist: {
      title: "Alustamine",
      tasksLeft: "ülesannet jäänud",
      completed: "Oled teel AnythingLLM-i eksperdiks saama!",
      dismiss: "sulge",
      tasks: {
        create_workspace: {
          title: "Loo tööruum",
          description: "Loo esimene tööruum alustamiseks",
          action: "Loo",
        },
        send_chat: {
          title: "Saada vestlus",
          description: "Alusta vestlust oma AI-abilisega",
          action: "Vestle",
        },
        embed_document: {
          title: "Põimi dokument",
          description: "Lisa esimene dokument oma tööruumi",
          action: "Põimi",
        },
        setup_system_prompt: {
          title: "Seadista süsteemprompt",
          description: "Määra AI-abilise käitumine",
          action: "Seadista",
        },
        define_slash_command: {
          title: "Loo kaldkriipskäsk",
          description: "Tee oma abilise jaoks kohandatud käsud",
          action: "Loo",
        },
        visit_community: {
          title: "Külasta kogukonna keskust",
          description: "Uuri kogukonna ressursse ja malle",
          action: "Sirvi",
        },
      },
    },
    quickActions: {
      createAgent: "Loo agent",
      editWorkspace: "Redige tööruum",
      uploadDocument: "Lae fail üles",
    },
    quickLinks: {
      title: "Kiirlingid",
      sendChat: "Saada vestlus",
      embedDocument: "Põimi dokument",
      createWorkspace: "Loo tööruum",
    },
    exploreMore: {
      title: "Avasta rohkem funktsioone",
      features: {
        customAgents: {
          title: "Kohandatud AI-agendid",
          description: "Ehita võimsaid agente ja automatsioone ilma koodita.",
          primaryAction: "Vestle @agent abil",
          secondaryAction: "Loo agendivoog",
        },
        slashCommands: {
          title: "Kaldkriipskäsklused",
          description: "Säästa aega ja lisa käske kohandatud käskudega.",
          primaryAction: "Loo kaldkriipskäsk",
          secondaryAction: "Sirvi Hubs",
        },
        systemPrompts: {
          title: "Süsteempromptid",
          description:
            "Muuda süsteemprompti, et kohandada AI vastuseid tööruumis.",
          primaryAction: "Muuda süsteemprompti",
          secondaryAction: "Halda prompt-muutujaid",
        },
      },
    },
    announcements: {
      title: "Uuendused ja teadaanded",
    },
    resources: {
      title: "Ressursid",
      links: {
        docs: "Dokumentatsioon",
        star: "GitHubi tärn",
      },
      keyboardShortcuts: "Klaviatuuri otseteed",
    },
  },
  "new-workspace": {
    title: "Uus tööruum",
    placeholder: "Minu tööruum",
  },
  "workspaces—settings": {
    general: "Üldseaded",
    chat: "Vestluse seaded",
    vector: "Vektoriandmebaas",
    members: "Liikmed",
    agent: "Agendi konfiguratsioon",
  },
  general: {
    vector: {
      title: "Vektorite arv",
      description: "Vektorite koguarv sinu vektoriandmebaasis.",
    },
    names: {
      description: "See muudab ainult tööruumi kuvatavat nime.",
    },
    message: {
      title: "Soovitatud vestlussõnumid",
      description: "Kohanda sõnumeid, mida tööruumi kasutajatele soovitatakse.",
      add: "Lisa uus sõnum",
      save: "Salvesta sõnumid",
      heading: "Selgita mulle",
      body: "AnythingLLM eeliseid",
    },
    pfp: {
      title: "Abilise profiilipilt",
      description: "Kohanda selle tööruumi abilise profiilipilti.",
      image: "Tööruumi pilt",
      remove: "Eemalda tööruumi pilt",
    },
    delete: {
      title: "Kustuta tööruum",
      description:
        "Kustuta see tööruum ja kõik selle andmed. See eemaldab tööruumi kõikidele kasutajatele.",
      delete: "Kustuta tööruum",
      deleting: "Kustutan tööruumi…",
      "confirm-start": "Oled kustutamas kogu",
      "confirm-end":
        "tööruumi. See eemaldab kõik vektorid vektoriandmebaasist.\n\nAlgseid faile ei puudutata. Tegevust ei saa tagasi võtta.",
    },
  },
  chat: {
    llm: {
      title: "Tööruumi LLM-pakkuja",
      description:
        "LLM-pakkuja ja mudel, mida selles tööruumis kasutatakse. Vaikimisi kasutatakse süsteemi LLM-seadeid.",
      search: "Otsi LLM-pakkujaid",
    },
    model: {
      title: "Tööruumi vestlusmudel",
      description:
        "Vestlusmudel, mida tööruumis kasutatakse. Kui tühi, kasutatakse süsteemi LLM-eelistust.",
      wait: "-- laadib mudeleid --",
    },
    mode: {
      title: "Vestlusrežiim",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Vestlus",
        "desc-start": "annab vastuseid LLM-i üldteadmistest",
        and: "ja",
        "desc-end": "leitud dokumendikontekstist.",
      },
      query: {
        title: "Päring",
        "desc-start": "annab vastuseid",
        only: "ainult",
        "desc-end": "kui leitakse dokumendikontekst.",
      },
    },
    history: {
      title: "Vestlusajalugu",
      "desc-start": "Eelmiste sõnumite arv, mis kaasatakse vastuse lühimällu.",
      recommend: "Soovitatav 20. ",
      "desc-end": "Üle 45 võib sõltuvalt sõnumi suurusest põhjustada tõrkeid.",
    },
    prompt: {
      title: "Süsteemprompt",
      description:
        "Prompt, mida tööruumis kasutatakse. Määra kontekst ja juhised, et AI toodaks asjakohase vastuse.",
      history: {
        title: "Süsteempromptide ajalugu",
        clearAll: "Tühjenda kõik",
        noHistory: "Ajalugu puudub",
        restore: "Taasta",
        delete: "Kustuta",
        publish: "Avalda kogukonnas",
        deleteConfirm: "Kas oled kindel, et soovid selle kirje kustutada?",
        clearAllConfirm:
          "Kas oled kindel, et soovid kogu ajaloo tühjendada? Tegevus on pöördumatu.",
        expand: "Laienda",
      },
    },
    refusal: {
      title: "Päringurežiimi keeldumisteade",
      "desc-start": "Kui ollakse",
      query: "päringu",
      "desc-end":
        "režiimis, võib määrata kohandatud vastuse, kui konteksti ei leita.",
      "tooltip-title": "Miks ma seda näen?",
      "tooltip-description":
        "Olete küsimise režiimis, mis kasutab ainult teie dokumentidest saadavat teavet. Valige vestlemise režiim, et pidada paindlikumaid vestlusi, või klõpsake siin, et külastada meie dokumentatsiooni ja saada lisateavet vestlemise režiimide kohta.",
    },
    temperature: {
      title: "LLM-i temperatuur",
      "desc-start": 'Määrab, kui "loovad" vastused on.',
      "desc-end":
        "Kõrgem väärtus = loovam, ent liiga kõrge võib tekitada ebaühtlasi vastuseid.",
      hint: "Kontrolli pakkujalt lubatud vahemikke.",
    },
  },
  "vector-workspace": {
    identifier: "Vektoriandmebaasi identifikaator",
    snippets: {
      title: "Maksimaalne konteksti lõikude arv",
      description:
        "Maksimaalne lõikude arv, mis saadetakse LLM-ile ühe vestluse/päringu kohta.",
      recommend: "Soovitatav: 4",
    },
    doc: {
      title: "Dokumendi sarnasuse lävi",
      description:
        "Minimaalne sarnasusskoor, et allikas oleks vestlusega seotud. Mida kõrgem, seda sarnasem peab allikas olema.",
      zero: "Piirang puudub",
      low: "Madal (≥ 0,25)",
      medium: "Keskmine (≥ 0,50)",
      high: "Kõrge (≥ 0,75)",
    },
    reset: {
      reset: "Lähtesta vektoriandmebaas",
      resetting: "Puhastan vektoreid…",
      confirm:
        "Lähtestad selle tööruumi vektoriandmebaasi. Kõik vektorid eemaldatakse.\n\nAlgseid faile ei puudutata. Tegevus on pöördumatu.",
      error: "Vektoriandmebaasi lähtestamine ebaõnnestus!",
      success: "Vektoriandmebaas lähtestati!",
    },
  },
  agent: {
    "performance-warning":
      "Mudelite, mis ei toeta tööriistakutsumisi, jõudlus sõltub tugevalt mudeli võimest. Mõned funktsioonid võivad olla piiratud.",
    provider: {
      title: "Tööruumi agendi LLM-pakkuja",
      description:
        "LLM-pakkuja ja mudel, mida kasutatakse @agent agendi jaoks.",
    },
    mode: {
      chat: {
        title: "Tööruumi agendi vestlusmudel",
        description: "Vestlusmudel, mida @agent agendi jaoks kasutatakse.",
      },
      title: "Tööruumi agendi mudel",
      description: "LLM-mudel, mida @agent agendi jaoks kasutatakse.",
      wait: "-- laadib mudeleid --",
    },
    skill: {
      title: "Agendi vaikimisi oskused",
      description:
        "Paranda vaikimisi agendi loomulikke oskusi nende eelnevalt ehitatud võimetega. Kehtib kõikidele tööruumidele.",
      rag: {
        title: "RAG ja pikaajaline mälu",
        description:
          'Lubab agendil kasutada kohalikke dokumente vastamiseks või "meelde jätmiseks".',
      },
      view: {
        title: "Vaata ja kokkuvõtlikusta dokumente",
        description:
          "Lubab agendil loetleda ja kokku võtta praegu põimitud faile.",
      },
      scrape: {
        title: "Kraabi veebilehti",
        description: "Lubab agendil külastada ja kraapida veebisisu.",
      },
      generate: {
        title: "Loo diagramme",
        description: "Lubab agendil luua erinevaid diagramme antud andmetest.",
      },
      save: {
        title: "Loo ja salvesta faile brauserisse",
        description:
          "Lubab agendil luua faile, mis salvestatakse ja allalaaditakse brauseris.",
      },
      web: {
        title: "Reaalajas veebihaku tugi",
        description:
          "Lisage oma esindajale võimalus veebis otsida, et vastata teie küsimustele, ühendades selle veebiotsingu (SERP) teenusega.",
      },
      sql: {
        title: "SQL-i ühendus",
        description:
          "Tagage, et teie esindaja saaks kasutada SQL-i, et vastata teie küsimustele, ühendades erinevate SQL andmebaasiteenustega.",
      },
      default_skill:
        "Vaikimisi on see funktsioon lubatud, kuid saate seda välja lülitada, kui ei soovi, et see oleks saadaval kaagentile.",
    },
  },
  recorded: {
    title: "Tööruumi vestlused",
    description:
      "Kõik salvestatud vestlused ja sõnumid kuvatakse loomise aja järgi.",
    export: "Ekspordi",
    table: {
      id: "ID",
      by: "Saatja",
      workspace: "Tööruum",
      prompt: "Päring",
      response: "Vastus",
      at: "Saadetud",
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
      title: "Kasutajaliidese eelistused",
      description: "Sea AnythingLLM-i UI eelistused.",
    },
    branding: {
      title: "Bränding ja valgesildistamine",
      description: "Valgesildista oma AnythingLLM kohandatud brändinguga.",
    },
    chat: {
      title: "Vestlus",
      description: "Sea vestluse eelistused.",
      auto_submit: {
        title: "Automaatselt esita kõnesisend",
        description: "Saada kõnesisend ära pärast vaikuse perioodi",
      },
      auto_speak: {
        title: "Loe vastused ette",
        description: "AI loeb vastused automaatselt ette",
      },
      spellcheck: {
        title: "Luba õigekirjakontroll",
        description: "Lülita vestlusväljale õigekirjakontroll sisse/välja",
      },
    },
    items: {
      theme: {
        title: "Teema",
        description: "Vali rakenduse värviteema.",
      },
      "show-scrollbar": {
        title: "Kuva kerimisriba",
        description: "Kuva või peida vestlusakna kerimisriba.",
      },
      "support-email": {
        title: "Toe e-post",
        description:
          "Määra e-posti aadress, kuhu kasutajad saavad abi saamiseks pöörduda.",
      },
      "app-name": {
        title: "Nimi",
        description:
          "Nimi, mis kuvatakse kõigile kasutajatele sisselogimislehel.",
      },
      "chat-message-alignment": {
        title: "Vestlussõnumite joondus",
        description: "Vali sõnumite joondus vestlusliideses.",
      },
      "display-language": {
        title: "Kuvakeel",
        description:
          "Vali keel, milles AnythingLLM UI kuvatakse (kui tõlge on olemas).",
      },
      logo: {
        title: "Brändi logo",
        description: "Laadi üles kohandatud logo, mis kuvatakse kõikjal.",
        add: "Lisa logo",
        recommended: "Soovituslik suurus: 800 × 200",
        remove: "Eemalda",
        replace: "Asenda",
      },
      "welcome-messages": {
        title: "Tervitussõnumid",
        description:
          "Kohanda sõnumeid, mida kasutajad näevad sisselogimisel. Ainult mitte-adminid näevad neid.",
        new: "Uus",
        system: "süsteem",
        user: "kasutaja",
        message: "sõnum",
        assistant: "AnythingLLM vestlusabi",
        "double-click": "Topeltklõps muutmiseks…",
        save: "Salvesta sõnumid",
      },
      "browser-appearance": {
        title: "Brauseri välimus",
        description: "Kohanda brauseri vahekaardi pealkirja ja ikooni.",
        tab: {
          title: "Pealkiri",
          description:
            "Sea kohandatud vahekaardi pealkiri, kui rakendus on avatud.",
        },
        favicon: {
          title: "Favicon",
          description: "Kasuta kohandatud faviconi brauseri vahekaardil.",
        },
      },
      "sidebar-footer": {
        title: "Külgriba jaluse elemendid",
        description: "Kohanda külgriba allosas kuvatavaid linke/ikooni.",
        icon: "Ikoon",
        link: "Link",
      },
      "render-html": {
        title: "Renderi HTML-koodi veebisaidil",
        description:
          "HTML-vastuste kuvamine abivasside vastustes.\nSee võib viia suurema vastuste kvaliteedi, kuid võib ka põhjustada potentsiaalseid turvaohusid.",
      },
    },
  },
  api: {
    title: "API võtmed",
    description:
      "API võtmed võimaldavad programmipõhiselt hallata seda AnythingLLM instantsi.",
    link: "Loe API dokumentatsiooni",
    generate: "Genereeri uus API võti",
    table: {
      key: "API võti",
      by: "Loonud",
      created: "Loodud",
    },
  },
  llm: {
    title: "LLM-i eelistus",
    description:
      "Siin on sinu valitud LLM-teenusepakkuja võtmed ja seaded. Need peavad olema õiged, vastasel juhul AnythingLLM ei tööta.",
    provider: "LLM-pakkuja",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure teenuse lõpp-punkt",
        api_key: "API võti",
        chat_deployment_name: "Vestluse deploy nimi",
        chat_model_token_limit: "Mudeli tokeni limiit",
        model_type: "Mudeli tüüp",
        model_type_tooltip:
          'Kui teie rakendus kasutab loogika mudelit (o1, o1-mini, o3-mini jne), siis määrake see väärtuseks "Loogika". Muu korral võivad teie vestlussõnumid ebaõiglas.',
        default: "Vaikimisi",
        reasoning: "Põhjendus",
      },
    },
  },
  transcription: {
    title: "Transkriptsiooni mudeli eelistus",
    description:
      "Siin on sinu valitud transkriptsioonimudeli pakkuja seaded. Vale seadistuse korral heli- ja meediafaile ei transkribeerita.",
    provider: "Transkriptsiooni pakkuja",
    "warn-start":
      "Kohaliku Whisper-mudeli kasutamine vähese RAM-i või CPU-ga masinal võib faili töötlemise ummistada.",
    "warn-recommend": "Soovitame vähemalt 2 GB RAM-i ning <10 MB faile.",
    "warn-end":
      "Sisseehitatud mudel laaditakse alla esmakasutusel automaatselt.",
  },
  embedding: {
    title: "Embedding-i eelistus",
    "desc-start":
      "Kui kasutad LLM-i, mis ei sisalda embedding-mootorit, tuleb määrata täiendavad võtmed.",
    "desc-end":
      "Embedding muudab teksti vektoriteks. Need võtmed on vajalikud, et AnythingLLM saaks sinu failid ja päringud töödelda.",
    provider: {
      title: "Embedding-i pakkuja",
    },
  },
  text: {
    title: "Teksti lõikamise ja tükeldamise seaded",
    "desc-start":
      "Vahel soovid muuta, kuidas uued dokumendid enne vektoriandmebaasi lisamist tükeldatakse.",
    "desc-end": "Muuda seda ainult siis, kui mõistad tekstilõike mõju.",
    size: {
      title: "Tekstitüki suurus",
      description: "Maksimaalne märgipikkus ühes vektoris.",
      recommend: "Embed-mudeli maks pikkus on",
    },
    overlap: {
      title: "Tekstitüki kattuvus",
      description: "Maksimaalne märkide kattuvus kahe kõrvuti tüki vahel.",
    },
  },
  vector: {
    title: "Vektoriandmebaas",
    description:
      "Siin on seaded, kuidas AnythingLLM töötab. Vale seadistus võib põhjustada tõrkeid.",
    provider: {
      title: "Vektoriandmebaasi pakkuja",
      description: "LanceDB puhul seadistust pole vaja.",
    },
  },
  embeddable: {
    title: "Embed-vestlusvidinad",
    description:
      "Avalikkusele suunatud vestlusliidesed, mis on seotud ühe tööruumiga.",
    create: "Loo embed",
    table: {
      workspace: "Tööruum",
      chats: "Saadetud vestlused",
      active: "Aktiivsed domeenid",
      created: "Loodud",
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
    title: "Embed-vestluste ajalugu",
    export: "Ekspordi",
    description: "Kõik embed-ide salvestatud vestlused ja sõnumid.",
    table: {
      embed: "Embed",
      sender: "Saatja",
      message: "Sõnum",
      response: "Vastus",
      at: "Saadetud",
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
    title: "Turvalisus",
    multiuser: {
      title: "Mitme kasutaja režiim",
      description:
        "Lülita mitme kasutaja tugi sisse, et meeskond saaks instantsi kasutada.",
      enable: {
        "is-enable": "Mitme kasutaja režiim on sisse lülitatud",
        enable: "Lülita sisse",
        description:
          "Vaikimisi oled ainus administraator. Adminid loovad uued kasutajad ja paroole.",
        username: "Admini kasutajanimi",
        password: "Admini parool",
      },
    },
    password: {
      title: "Paroolikaitse",
      description:
        "Kaitse oma instantsi parooliga. Kui unustad selle, taastamisvõimalust ei ole.",
      "password-label": "Instantsi parool",
    },
  },
  event: {
    title: "Sündmuste logid",
    description: "Vaata instantsis toimuvaid tegevusi ja jälgi sündmusi.",
    clear: "Tühjenda logid",
    table: {
      type: "Sündmuse tüüp",
      user: "Kasutaja",
      occurred: "Toimus",
    },
  },
  privacy: {
    title: "Privaatsus ja andmetöötlus",
    description:
      "Konfiguratsioon kolmandate osapoolte ja AnythingLLM-i andmekäitluse kohta.",
    llm: "LLM-i valik",
    embedding: "Embedding-i eelistus",
    vector: "Vektoriandmebaas",
    anonymous: "Anonüümne telemeetria lubatud",
  },
  connectors: {
    "search-placeholder": "Otsi andmepistikuid",
    "no-connectors": "Andmepistikuid ei leitud.",
    obsidian: {
      name: "Obsidian",
      description: "Impordi Obsidiani vault ühe klõpsuga.",
      vault_location: "Vaulti asukoht",
      vault_description:
        "Vali oma Obsidiani vaulti kaust, et importida kõik märkmed ja nende seosed.",
      selected_files: "Leiti {{count}} Markdown-faili",
      importing: "Vaulti importimine…",
      import_vault: "Impordi vault",
      processing_time: "See võib võtta aega sõltuvalt vaulti suurusest.",
      vault_warning:
        "Konfliktide vältimiseks veendu, et Obsidiani vault ei oleks praegu avatud.",
    },
    github: {
      name: "GitHubi repo",
      description:
        "Impordi kogu avalik või privaatne GitHubi repo ühe klõpsuga.",
      URL: "GitHubi repo URL",
      URL_explained: "Repo URL, mida soovid koguda.",
      token: "GitHubi juurdepääsuvõti",
      optional: "valikuline",
      token_explained: "Võti API piirangute vältimiseks.",
      token_explained_start: "Ilma ",
      token_explained_link1: "isikliku juurdepääsuvõtmeta",
      token_explained_middle:
        " võib GitHubi API piirata kogutavate failide hulka. Sa võid ",
      token_explained_link2: "luua ajutise juurdepääsuvõtme",
      token_explained_end: " selle vältimiseks.",
      ignores: "Faili välistused",
      git_ignore:
        ".gitignore formaadis nimekiri failidest, mida kogumisel ignoreerida. Vajuta Enter iga kirje järel.",
      task_explained:
        "Kui valmis, on failid dokumentide valijas tööruumidesse põimimiseks saadaval.",
      branch: "Haru, kust faile koguda",
      branch_loading: "-- harude laadimine --",
      branch_explained: "Haru, kust faile koguda.",
      token_information:
        "Ilma <b>GitHubi juurdepääsuvõtmeta</b> saab pistik koguda ainult repo <b>juurtaseme</b> faile GitHubi API piirangute tõttu.",
      token_personal: "Hangi tasuta isiklik juurdepääsuvõti GitHubist siit.",
    },
    gitlab: {
      name: "GitLabi repo",
      description:
        "Impordi kogu avalik või privaatne GitLabi repo ühe klõpsuga.",
      URL: "GitLabi repo URL",
      URL_explained: "Repo URL, mida soovid koguda.",
      token: "GitLabi juurdepääsuvõti",
      optional: "valikuline",
      token_explained: "Võti API piirangute vältimiseks.",
      token_description: "Vali täiendavad objektid, mida GitLabi API-st tuua.",
      token_explained_start: "Ilma ",
      token_explained_link1: "isikliku juurdepääsuvõtmeta",
      token_explained_middle:
        " võib GitLabi API piirata kogutavate failide hulka. Sa võid ",
      token_explained_link2: "luua ajutise juurdepääsuvõtme",
      token_explained_end: " selle vältimiseks.",
      fetch_issues: "Tõmba Issues dokumendina",
      ignores: "Faili välistused",
      git_ignore:
        ".gitignore formaadis nimekiri failidest, mida kogumisel ignoreerida. Vajuta Enter iga kirje järel.",
      task_explained:
        "Kui valmis, on failid dokumentide valijas tööruumidesse põimimiseks saadaval.",
      branch: "Haru, kust faile koguda",
      branch_loading: "-- harude laadimine --",
      branch_explained: "Haru, kust faile koguda.",
      token_information:
        "Ilma <b>GitLabi juurdepääsuvõtmeta</b> saab pistik koguda ainult repo <b>juurtaseme</b> faile GitLabi API piirangute tõttu.",
      token_personal: "Hangi tasuta isiklik juurdepääsuvõti GitLabist siit.",
    },
    youtube: {
      name: "YouTube'i transkript",
      description: "Impordi YouTube'i video täielik transkript lingi abil.",
      URL: "YouTube'i video URL",
      URL_explained_start:
        "Sisesta ükskõik millise YouTube'i video URL, et tuua selle transkript. Videol peavad olema ",
      URL_explained_link: "subtiitrid",
      URL_explained_end: " saadaval.",
      task_explained:
        "Kui valmis, on transkript dokumentide valijas tööruumidesse põimimiseks saadaval.",
      language: "Transkripti keel",
      language_explained: "Vali transkripti keel, mida soovid koguda.",
      loading_languages: "-- keelte laadimine --",
    },
    "website-depth": {
      name: "Massiline linkide kraapija",
      description: "Kraabi veebisaiti ja selle alamlinke määratud sügavuseni.",
      URL: "Veebisaidi URL",
      URL_explained: "Veebisaidi URL, mida soovid kraapida.",
      depth: "Kraapimissügavus",
      depth_explained: "Alamlinkide arv, mida töötaja alg-URL-ist järgib.",
      max_pages: "Maksimaalne lehtede arv",
      max_pages_explained: "Maksimaalne linkide arv, mida kraapida.",
      task_explained:
        "Kui valmis, on kogu kraabitud sisu dokumentide valijas tööruumidesse põimimiseks saadaval.",
    },
    confluence: {
      name: "Confluence",
      description: "Impordi kogu Confluence'i leht ühe klõpsuga.",
      deployment_type: "Confluence'i tüüp",
      deployment_type_explained:
        "Määra, kas Confluence töötab Atlassiani pilves või on isemajutatud.",
      base_url: "Confluence'i baas-URL",
      base_url_explained: "Sinu Confluence'i ruumi baas-URL.",
      space_key: "Confluence'i space key",
      space_key_explained:
        "Space key, mida kasutatakse (tavaliselt algab ~ märgiga).",
      username: "Confluence'i kasutajanimi",
      username_explained: "Sinu Confluence'i kasutajanimi.",
      auth_type: "Autentimise tüüp",
      auth_type_explained:
        "Vali autentimise tüüp, millega Confluence'i lehtedele ligi pääseda.",
      auth_type_username: "Kasutajanimi + juurdepääsuvõti",
      auth_type_personal: "Isiklik juurdepääsuvõti",
      token: "Confluence'i juurdepääsuvõti",
      token_explained_start:
        "Autentimiseks on vajalik juurdepääsuvõti. Saad selle genereerida",
      token_explained_link: "siin",
      token_desc: "Juurdepääsuvõti autentimiseks",
      pat_token: "Confluence'i PAT-võti",
      pat_token_explained: "Sinu isiklik juurdepääsuvõti.",
      bypass_ssl: "SSL-sertifikaadi valideerimise ümber",
      bypass_ssl_explained:
        "Selle valiku aktiveerimine võimaldab SSL sertifikaadi valideerimise ületada, kui kasutate enda hallatud Confluence instantsi, millel on enda välja antud sertifikaat.",
      task_explained:
        "Kui valmis, on lehe sisu dokumentide valijas tööruumidesse põimimiseks saadaval.",
    },
    manage: {
      documents: "Dokumendid",
      "data-connectors": "Andmepistikud",
      "desktop-only":
        "Neid sätteid saab muuta ainult lauaarvutis. Ava see leht töölaual.",
      dismiss: "Sulge",
      editing: "Muudan",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Minu dokumendid",
      "new-folder": "Uus kaust",
      "search-document": "Otsi dokumenti",
      "no-documents": "Dokumendid puuduvad",
      "move-workspace": "Liiguta tööruumi",
      name: "Nimi",
      "delete-confirmation":
        "Kas oled kindel, et soovid need failid ja kaustad kustutada?\nFailid eemaldatakse süsteemist ning kõigist tööruumidest.\nTegevust ei saa tagasi võtta.",
      "removing-message":
        "Eemaldan {{count}} dokumenti ja {{folderCount}} kausta. Palun oota.",
      "move-success": "Liigutatud edukalt {{count}} dokumenti.",
      date: "Kuupäev",
      type: "Tüüp",
      no_docs: "Dokumendid puuduvad",
      select_all: "Vali kõik",
      deselect_all: "Tühista valik",
      remove_selected: "Eemalda valitud",
      costs: "*Ühekordne embeddingu kulu",
      save_embed: "Salvesta ja põimi",
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
      "processor-offline": "Dokumenditöötleja pole saadaval",
      "processor-offline-desc":
        "Failide üleslaadimine pole võimalik, sest töötleja on offline. Proovi hiljem uuesti.",
      "click-upload": "Klõpsa või lohista failid siia",
      "file-types":
        "toetab tekstifaile, CSV-sid, arvutustabeleid, helifaile jpm!",
      "or-submit-link": "või esita link",
      "placeholder-link": "https://näide.ee",
      fetching: "Laen…",
      "fetch-website": "Tõmba veebisait",
      "privacy-notice":
        "Failid laetakse üles selle instantsi dokumenditöötlejasse ega jagata kolmandatele osapooltele.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Mis on dokumendi kinnitamine?",
      pin_explained_block1:
        "Kui <b>kinnitad</b> dokumendi, lisatakse kogu selle sisu sinu päringule, et LLM mõistaks seda täielikult.",
      pin_explained_block2:
        "Sobib eriti <b>suure kontekstiga mudelitele</b> või väikestele, kuid olulistele failidele.",
      pin_explained_block3:
        "Kui vaikimisi vastused ei rahulda, on kinnitamine lihtne viis kvaliteedi tõstmiseks.",
      accept: "Selge",
    },
    watching: {
      what_watching: "Mida tähendab dokumendi jälgimine?",
      watch_explained_block1:
        "Kui <b>jälgid</b> dokumenti, sünkroniseerime selle sisu <i>automaatselt</i> allikast kindlate intervallidega, uuendades seda kõigis tööruumides.",
      watch_explained_block2:
        "Hetkel toetab see ainult veebi-põhist sisu, mitte käsitsi üleslaetud faile.",
      watch_explained_block3_start: "Saad jälgitavaid dokumente hallata ",
      watch_explained_block3_link: "Failihalduri",
      watch_explained_block3_end: " vaates.",
      accept: "Selge",
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
    welcome: "Tere tulemast oma uude tööruumi.",
    get_started: "Alustamiseks",
    get_started_default: "Alustamiseks",
    upload: "laadi dokument üles",
    or: "või",
    attachments_processing: "Manused töötlevad. Palun oota…",
    send_chat: "saada vestlus.",
    send_message: "Saada sõnum",
    attach_file: "Lisa fail vestlusele",
    slash: "Vaata kõiki slash-käske.",
    agents: "Vaata kõiki agente, keda saad kasutada.",
    start_agent_session: "Start agent session",
    text_size: "Muuda teksti suurust.",
    microphone: "Esita päring häälega.",
    send: "Saada päring tööruumi",
    tts_speak_message: "Loe sõnum ette",
    copy: "Kopeeri",
    regenerate: "Loo uuesti",
    regenerate_response: "Loo vastus uuesti",
    good_response: "Hea vastus",
    more_actions: "Rohkem toiminguid",
    hide_citations: "Peida viited",
    show_citations: "Näita viiteid",
    sources: "Allikasid",
    source_count_one: "{{count}} viidatud",
    source_count_other: "Viidatud allikad",
    document: "Dokument",
    similarity_match: "mäng",
    pause_tts_speech_message: "Pausi TTS kõne",
    fork: "Hargnemine",
    delete: "Kustuta",
    save_submit: "Salvesta ja saada",
    cancel: "Tühista",
    submit: "Saada",
    edit_prompt: "Redigeeri päringut",
    edit_response: "Redigeeri vastust",
    edit_info_user:
      '"Saada" taastab AI vastuse. "Salvesta" muudab ainult teie sõnumi.',
    edit_info_assistant: "Teie muutused salvestatakse otse sellele vastusele.",
    see_less: "Näita vähem",
    see_more: "Vaata rohkem",
    at_agent: "@agent",
    default_agent_description: " – selle tööruumi vaikimisi agent.",
    custom_agents_coming_soon: "kohandatud agendid tulekul!",
    preset_reset_description: "Tühjenda vestlusajalugu ja alusta uut vestlust",
    preset_exit_description: "Lõpeta hetkeseisuga",
    add_new_preset: " Lisa uus preset",
    add_new: "Lisada uus",
    edit: "Redigeerimine",
    publish: "Avaldada",
    stop_generating: "Lõpeta vastuste genereerimine",
    command: "Käsk",
    your_command: "sinu-käsk",
    placeholder_prompt: "Sisu, mis süstitakse sinu päringu ette.",
    description: "Kirjeldus",
    placeholder_description: "Vastab luuletusega LLM-idest.",
    save: "Salvesta",
    small: "Väike",
    normal: "Tavaline",
    large: "Suur",
    tools: "Vahendid",
    slash_commands: "Lihtsasti kasutatavad käsud",
    agent_skills: "Agentide oskused",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Sirva",
    text_size_label: "Teksti suurus",
    select_model: "Valige mudel",
    workspace_llm_manager: {
      search: "Otsi LLM-pakkujaid",
      loading_workspace_settings: "Laen tööruumi seadeid…",
      available_models: "Saadaval mudelid pakkujalt {{provider}}",
      available_models_description: "Vali mudel, mida tööruumis kasutada.",
      save: "Kasuta seda mudelit",
      saving: "Määran mudelit vaikimisi…",
      missing_credentials: "Sellel pakkujal puuduvad võtmed!",
      missing_credentials_description: "Klõpsa, et määrata võtmed",
    },
  },
  profile_settings: {
    edit_account: "Muuda kontot",
    profile_picture: "Profiilipilt",
    remove_profile_picture: "Eemalda profiilipilt",
    username: "Kasutajanimi",
    new_password: "Uus parool",
    password_description: "Parool peab olema vähemalt 8 märki",
    cancel: "Tühista",
    update_account: "Uuenda kontot",
    theme: "Teema eelistus",
    language: "Eelistatud keel",
    failed_upload: "Profiilipildi üleslaadimine ebaõnnestus: {{error}}",
    upload_success: "Profiilipilt üles laaditud.",
    failed_remove: "Profiilipildi eemaldamine ebaõnnestus: {{error}}",
    profile_updated: "Profiil uuendatud.",
    failed_update_user: "Kasutaja uuendamine ebaõnnestus: {{error}}",
    account: "Konto",
    support: "Tugi",
    signout: "Logi välja",
  },
  "keyboard-shortcuts": {
    title: "Klaviatuuri otseteed",
    shortcuts: {
      settings: "Ava seaded",
      workspaceSettings: "Ava praeguse tööruumi seaded",
      home: "Mine avalehele",
      workspaces: "Halda tööruume",
      apiKeys: "API võtmete seaded",
      llmPreferences: "LLM-eelistused",
      chatSettings: "Vestluse seaded",
      help: "Näita otseteeabi",
      showLLMSelector: "Näita tööruumi LLM-valikut",
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
        success_title: "Edu!",
        success_description: "Sinu süsteemprompt avaldati Community Hubis!",
        success_thank_you: "Aitäh jagamast!",
        view_on_hub: "Vaata Hubis",
        modal_title: "Avalda süsteemprompt",
        name_label: "Nimi",
        name_description: "Süsteemprompti kuvanimi.",
        name_placeholder: "Minu süsteemprompt",
        description_label: "Kirjeldus",
        description_description:
          "Kirjeldus, mis selgitab süsteemprompti eesmärki.",
        tags_label: "Sildid",
        tags_description:
          "Lisa kuni 5 silti (kuni 20 tähemärki igaüks) otsingu lihtsustamiseks.",
        tags_placeholder: "Kirjuta ja vajuta Enter, et lisada silte",
        visibility_label: "Nähtavus",
        public_description: "Avalikud promptid on kõigile nähtavad.",
        private_description: "Privaatseid prompte näed vaid sina.",
        publish_button: "Avalda Community Hubis",
        submitting: "Avaldan…",
        submit: "Avalda Community Hubis",
        prompt_label: "Prompt",
        prompt_description: "Süsteemprompt, mis juhendab LLM-i.",
        prompt_placeholder: "Sisesta süsteemprompt siia…",
      },
      agent_flow: {
        public_description: "Avalikud agendi vood on kõigile nähtavad.",
        private_description: "Privaatseid agendi vooge näed vaid sina.",
        success_title: "Edu!",
        success_description: "Sinu agendi voog avaldati Community Hubis!",
        success_thank_you: "Aitäh jagamast!",
        view_on_hub: "Vaata Hubis",
        modal_title: "Avalda agendi voog",
        name_label: "Nimi",
        name_description: "Agendi voo kuvanimi.",
        name_placeholder: "Minu agendi voog",
        description_label: "Kirjeldus",
        description_description: "Kirjeldus, mis selgitab agendi voo eesmärki.",
        tags_label: "Sildid",
        tags_description:
          "Lisa kuni 5 silti (kuni 20 tähemärki) otsingu lihtsustamiseks.",
        tags_placeholder: "Kirjuta ja vajuta Enter, et lisada silte",
        visibility_label: "Nähtavus",
        publish_button: "Avalda Community Hubis",
        submitting: "Avaldan…",
        submit: "Avalda Community Hubis",
        privacy_note:
          "Agendi vood laetakse üles alati privaatsena, et kaitsta tundlikku infot. Nähtavust saab hiljem Hubis muuta. Kontrolli, et voog ei sisaldaks privaatseid andmeid.",
      },
      slash_command: {
        success_title: "Edu!",
        success_description: "Sinu slash-käsk avaldati Community Hubis!",
        success_thank_you: "Aitäh jagamast!",
        view_on_hub: "Vaata Hubis",
        modal_title: "Avalda slash-käsk",
        name_label: "Nimi",
        name_description: "Slash-käsku kuvatav nimi.",
        name_placeholder: "Minu slash-käsk",
        description_label: "Kirjeldus",
        description_description:
          "Kirjeldus, mis selgitab slash-käsku eesmärki.",
        command_label: "Käsk",
        command_description:
          "Käsk, mille kasutajad sisestavad selle preseti käivitamiseks.",
        command_placeholder: "minu-käsk",
        tags_label: "Sildid",
        tags_description:
          "Lisa kuni 5 silti (kuni 20 tähemärki) otsingu lihtsustamiseks.",
        tags_placeholder: "Kirjuta ja vajuta Enter, et lisada silte",
        visibility_label: "Nähtavus",
        public_description: "Avalikud käsud on kõigile nähtavad.",
        private_description: "Privaatseid käske näed vaid sina.",
        publish_button: "Avalda Community Hubis",
        submitting: "Avaldan…",
        prompt_label: "Prompt",
        prompt_description:
          "Prompt, mida kasutatakse, kui slash-käsk käivitub.",
        prompt_placeholder: "Sisesta prompt siia…",
      },
      generic: {
        unauthenticated: {
          title: "Autentimine vajalik",
          description: "Enne avaldamist pead Community Hubi sisselogima.",
          button: "Ühendu Community Hubiga",
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
