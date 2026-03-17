const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Willkommen bei",
      getStarted: "Jetzt starten",
    },
    llm: {
      title: "LLM-Einstellung",
      description:
        "AnythingLLM ist mit vielen LLM-Anbietern kompatibel. Der ausgewählte Dienst wird für die Chats verwendet.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Benutzer Setup",
      description: "Konfigurieren Sie Ihre Benutzereinstellungen.",
      howManyUsers: "Wie viele Benutzer werden diese Instanz verwenden?",
      justMe: "Nur ich",
      myTeam: "Mein Team",
      instancePassword: "Passwort für diese Instanz",
      setPassword: "Möchten Sie ein Passwort einrichten?",
      passwordReq: "Das Passwort muss mindestens 8 Zeichen enthalten.",
      passwordWarn:
        "Dieses Passwort sollte sicher aufbewahrt werden, da Wiederherstellung nicht möglich ist.",
      adminUsername: "Benutzername des Admin-Accounts",
      adminPassword: "Passwort des Admin-Accounts",
      adminPasswordReq: "Das Passwort muss mindestens 8 Zeichen enthalten.",
      teamHint:
        "Zu Beginn sind Sie der einzige Admin. Nach der Einrichtung können Sie weitere Benutzer oder Admins einladen. Verlieren Sie Ihr Passwort nicht – nur Admins können Passwörter zurücksetzen.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Datenverarbeitung & Datenschutz",
      description:
        "Wir setzen uns für Transparenz und Kontrolle im Umgang mit Ihren persönlichen Daten ein.",
      settingsHint:
        "Diese Einstellungen können jederzeit in den Einstellungen angepasst werden.",
    },
    survey: {
      title: "Willkommen bei AnythingLLM",
      description:
        "Helfen Sie uns, AnythingLLM an Ihre Bedürfnisse anzupassen. (Optional)",
      email: "Wie lautet Ihre E-Mail-Adresse?",
      useCase: "Wofür möchten Sie AnythingLLM verwenden?",
      useCaseWork: "Beruflich",
      useCasePersonal: "Privat",
      useCaseOther: "Sonstiges",
      comment: "Wie haben Sie von AnythingLLM erfahren?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, etc. – Teilen Sie uns mit, wie Sie uns entdeckt haben!",
      skip: "Umfrage überspringen",
      thankYou: "Vielen Dank für Ihr Feedback!",
    },
    workspace: {
      title: "Ersten Workspace erstellen",
      description:
        "Erstellen Sie Ihren ersten Workspace und starten Sie AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Namen der Workspaces",
    error: "Fehler",
    success: "Erfolg",
    user: "Benutzer",
    selection: "Modellauswahl",
    saving: "Speichern...",
    save: "Änderungen speichern",
    previous: "Vorherige Seite",
    next: "Nächste Seite",
    optional: "Optional",
    yes: "Ja",
    no: "Nein",
    search: "Suchen",
    username_requirements:
      "Der Benutzername muss 2-32 Zeichen lang sein, mit einem Kleinbuchstaben beginnen und darf nur Kleinbuchstaben, Zahlen, Unterstriche, Bindestriche und Punkte enthalten.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Willkommen",
    chooseWorkspace: "Wählen Sie ein Arbeitsbereich, um zu beginnen!",
    notAssigned:
      "Sie sind nicht zugewiesen zu einem Arbeitsbereich.\nBitte kontaktieren Sie Ihren Administrator, um Zugriff auf einen Arbeitsbereich zu erhalten.",
    goToWorkspace: 'Zurück zum Arbeitsbereich "{{workspace}}"',
  },
  settings: {
    title: "Instanzeinstellungen",
    system: "Allgemeine Einstellungen",
    invites: "Einladungen",
    users: "Benutzer",
    workspaces: "Workspaces",
    "workspace-chats": "Workspace-Chats",
    customization: "Personalisierung",
    interface: "UI-Einstellungen",
    branding: "Branding & Whitelabeling",
    chat: "Chat",
    "api-keys": "Entwickler-API",
    llm: "LLM",
    transcription: "Transkription",
    embedder: "Einbettung",
    "text-splitting": "Textsplitting & Chunking",
    "voice-speech": "Sprache & Sprachausgabe",
    "vector-database": "Vektordatenbank",
    embeds: "Chat-Einbettung",
    "embed-chats": "Chat-Einbettungsverlauf",
    security: "Sicherheit",
    "event-logs": "Ereignisprotokolle",
    privacy: "Datenschutz & Datenverarbeitung",
    "ai-providers": "KI-Anbieter",
    "agent-skills": "Agentenfähigkeiten",
    "community-hub": {
      title: "Gemeindezentrum",
      trending: "Entdecken Sie die aktuell beliebtesten Themen",
      "your-account": "Ihr Konto",
      "import-item": "Artikel importieren",
    },
    admin: "Administrator",
    tools: "Werkzeuge",
    "system-prompt-variables": "Systempromptvariablen",
    "experimental-features": "Experimentelle Funktionen",
    contact: "Support kontaktieren",
    "browser-extension": "Browser-Extension",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Willkommen bei",
      "placeholder-username": "Benutzername",
      "placeholder-password": "Passwort",
      login: "Anmelden",
      validating: "Überprüfung...",
      "forgot-pass": "Passwort vergessen",
      reset: "Zurücksetzen",
    },
    "sign-in": "Melden Sie sich bei Ihrem {{appName}} Konto an.",
    "password-reset": {
      title: "Passwort zurücksetzen",
      description:
        "Geben Sie die erforderlichen Informationen unten ein, um Ihr Passwort zurückzusetzen.",
      "recovery-codes": "Wiederherstellungscodes",
      "recovery-code": "Wiederherstellungscode {{index}}",
      "back-to-login": "Zurück zur Anmeldung",
    },
  },
  "main-page": {
    greeting: "Wie kann ich Ihnen heute helfen?",
    noWorkspaceError:
      "Bitte erstellen Sie einen Workspace, bevor Sie einen Chat beginnen.",
    checklist: {
      title: "Erste Schritte",
      tasksLeft: "Aufgaben übrig",
      completed: "Sie sind auf dem Weg, ein AnythingLLM-Experte zu werden!",
      dismiss: "schließen",
      tasks: {
        create_workspace: {
          title: "Einen Workspace erstellen",
          description: "Erstellen Sie Ihren ersten Workspace, um zu beginnen",
          action: "Erstellen",
        },
        send_chat: {
          title: "Einen Chat senden",
          description: "Starten Sie ein Gespräch mit Ihrem KI-Assistenten",
          action: "Chat",
        },
        embed_document: {
          title: "Ein Dokument einbetten",
          description: "Fügen Sie Ihr erstes Dokument zu Ihrem Workspace hinzu",
          action: "Einbetten",
        },
        setup_system_prompt: {
          title: "Ein System-Prompt einrichten",
          description: "Konfigurieren Sie das Verhalten Ihres KI-Assistenten",
          action: "Einrichten",
        },
        define_slash_command: {
          title: "Einen Slash-Befehl definieren",
          description:
            "Erstellen Sie benutzerdefinierte Befehle für Ihren Assistenten",
          action: "Definieren",
        },
        visit_community: {
          title: "Community Hub besuchen",
          description: "Entdecken Sie Community-Ressourcen und Vorlagen",
          action: "Stöbern",
        },
      },
    },
    quickActions: {
      createAgent: "Erstelle einen Agenten",
      editWorkspace: "Arbeitsbereich bearbeiten",
      uploadDocument: "Ein Dokument hochladen",
    },
    quickLinks: {
      title: "Schnellzugriffe",
      sendChat: "Chat senden",
      embedDocument: "Dokument einbetten",
      createWorkspace: "Workspace erstellen",
    },
    exploreMore: {
      title: "Weitere Funktionen erkunden",
      features: {
        customAgents: {
          title: "Benutzerdefinierte KI-Agenten",
          description:
            "Erstellen Sie leistungsstarke KI-Agenten und Automatisierungen ohne Code.",
          primaryAction: "Chatten mit @agent",
          secondaryAction: "Einen Agenten-Flow erstellen",
        },
        slashCommands: {
          title: "Slash-Befehle",
          description:
            "Sparen Sie Zeit und fügen Sie Eingabeaufforderungen mit benutzerdefinierten Slash-Befehlen ein.",
          primaryAction: "Einen Slash-Befehl erstellen",
          secondaryAction: "Im Hub erkunden",
        },
        systemPrompts: {
          title: "System-Prompts",
          description:
            "Ändern Sie die System-Eingabeaufforderung, um die KI-Antworten eines Workspaces anzupassen.",
          primaryAction: "Eine System-Eingabeaufforderung ändern",
          secondaryAction: "Eingabevariablen verwalten",
        },
      },
    },
    announcements: {
      title: "Updates & Ankündigungen",
    },
    resources: {
      title: "Ressourcen",
      links: {
        docs: "Dokumentation",
        star: "Auf Github mit Stern versehen",
      },
      keyboardShortcuts: "Tastaturkürzel",
    },
  },
  "new-workspace": {
    title: "Neuer Workspace",
    placeholder: "Mein Workspace",
  },
  "workspaces—settings": {
    general: "Allgemeine Einstellungen",
    chat: "Chat-Einstellungen",
    vector: "Vektordatenbank",
    members: "Mitglieder",
    agent: "Agentenkonfiguration",
  },
  general: {
    vector: {
      title: "Vektoranzahl",
      description: "Gesamtanzahl der Vektoren in Ihrer Vektordatenbank.",
    },
    names: {
      description: "Dies ändert nur den Anzeigenamen Ihres Workspace.",
    },
    message: {
      title: "Vorgeschlagene Chat-Nachrichten",
      description:
        "Passen Sie die Nachrichten an, die Ihren Workspace-Benutzern vorgeschlagen werden.",
      add: "Neue Nachricht hinzufügen",
      save: "Nachrichten speichern",
      heading: "Erkläre mir",
      body: "die Vorteile von AnythingLLM",
    },
    pfp: {
      title: "Assistent-Profilbild",
      description:
        "Passen Sie das Profilbild des Assistenten für diesen Workspace an.",
      image: "Workspace-Bild",
      remove: "Workspace-Bild entfernen",
    },
    delete: {
      title: "Workspace löschen",
      description:
        "Löschen Sie diesen Workspace und alle seine Daten. Dies löscht den Workspace für alle Benutzer.",
      delete: "Workspace löschen",
      deleting: "Workspace wird gelöscht...",
      "confirm-start": "Sie sind dabei, Ihren gesamten",
      "confirm-end":
        "Workspace zu löschen. Dies entfernt alle Vektoreinbettungen in Ihrer Vektordatenbank.\n\nDie ursprünglichen Quelldateien bleiben unberührt. Diese Aktion ist irreversibel.",
    },
  },
  chat: {
    llm: {
      title: "Workspace-LLM-Anbieter",
      description:
        "Der spezifische LLM-Anbieter und das Modell, das für diesen Workspace verwendet wird. Standardmäßig wird der System-LLM-Anbieter und dessen Einstellungen verwendet.",
      search: "Durchsuchen Sie alle LLM-Anbieter",
    },
    model: {
      title: "Workspace-Chat-Modell",
      description:
        "Das spezifische Chat-Modell, das für diesen Workspace verwendet wird. Wenn leer, wird die System-LLM-Präferenz verwendet.",
      wait: "-- warte auf Modelle --",
    },
    mode: {
      title: "Chat-Modus",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start": "wird Antworten mit dem allgemeinen Wissen des LLM",
        and: "und",
        "desc-end": "gefundenem Dokumentenkontext liefern.",
      },
      query: {
        title: "Abfrage",
        "desc-start": "wird Antworten",
        only: "nur",
        "desc-end": "liefern, wenn Dokumentenkontext gefunden wird.",
      },
    },
    history: {
      title: "Chat-Verlauf",
      "desc-start":
        "Die Anzahl der vorherigen Chats, die in das Kurzzeitgedächtnis der Antwort einbezogen werden.",
      recommend: "Empfohlen 20. ",
      "desc-end":
        "Alles über 45 führt wahrscheinlich zu kontinuierlichen Chat-Ausfällen, abhängig von der Nachrichtengröße.",
    },
    prompt: {
      title: "Prompt",
      description:
        "Der Prompt, der in diesem Workspace verwendet wird. Definieren Sie den Kontext und die Anweisungen für die KI, um eine Antwort zu generieren. Sie sollten einen sorgfältig formulierten Prompt bereitstellen, damit die KI eine relevante und genaue Antwort generieren kann.",
      history: {
        title: "Systemprompt-Historie",
        clearAll: "Alles löschen",
        noHistory: "Keine Einträge im Verlauf vorhanden",
        restore: "Wiederherstellen",
        delete: "Löschen",
        publish: "Im Community Hub veröffentlichen",
        deleteConfirm: "Möchten Sie diesen Eintrag wirklich löschen?",
        clearAllConfirm:
          "Möchten Sie wirklich alle Einträge löschen? Diese Aktion ist unwiderruflich.",
        expand: "Ausklappen",
      },
    },
    refusal: {
      title: "Abfragemodus-Ablehnungsantwort",
      "desc-start": "Wenn im",
      query: "Abfrage",
      "desc-end":
        "modus, möchten Sie vielleicht eine benutzerdefinierte Ablehnungsantwort zurückgeben, wenn kein Kontext gefunden wird.",
      "tooltip-title": "Warum sehe ich das?",
      "tooltip-description":
        "Sie befinden sich im Abfragemodus, der nur Informationen aus Ihren Dokumenten verwendet. Wechseln Sie in den Chat-Modus für flexiblere Gespräche oder klicken Sie hier, um unsere Dokumentation zu besuchen und mehr über Chat-Modi zu erfahren.",
    },
    temperature: {
      title: "LLM-Temperatur",
      "desc-start":
        'Diese Einstellung steuert, wie "kreativ" Ihre LLM-Antworten sein werden.',
      "desc-end":
        "Je höher die Zahl, desto kreativer. Bei einigen Modellen kann dies zu unverständlichen Antworten führen, wenn sie zu hoch eingestellt ist.",
      hint: "Die meisten LLMs haben verschiedene akzeptable Bereiche gültiger Werte. Konsultieren Sie Ihren LLM-Anbieter für diese Informationen.",
    },
  },
  "vector-workspace": {
    identifier: "Vektordatenbank-Identifikator",
    snippets: {
      title: "Maximale Kontext-Snippets",
      description:
        "Diese Einstellung steuert die maximale Anzahl von Kontext-Snippets, die pro Chat oder Abfrage an das LLM gesendet werden.",
      recommend: "Empfohlen: 4",
    },
    doc: {
      title: "Dokumentähnlichkeitsschwelle",
      description:
        "Der minimale Ähnlichkeitswert, der erforderlich ist, damit eine Quelle als relevant für den Chat betrachtet wird. Je höher die Zahl, desto ähnlicher muss die Quelle dem Chat sein.",
      zero: "Keine Einschränkung",
      low: "Niedrig (Ähnlichkeitswert ≥ .25)",
      medium: "Mittel (Ähnlichkeitswert ≥ .50)",
      high: "Hoch (Ähnlichkeitswert ≥ .75)",
    },
    reset: {
      reset: "Vektordatenbank zurücksetzen",
      resetting: "Vektoren werden gelöscht...",
      confirm:
        "Sie sind dabei, die Vektordatenbank dieses Workspace zurückzusetzen. Dies entfernt alle derzeit eingebetteten Vektoreinbettungen.\n\nDie ursprünglichen Quelldateien bleiben unberührt. Diese Aktion ist irreversibel.",
      error: "Die Workspace-Vektordatenbank konnte nicht zurückgesetzt werden!",
      success: "Die Workspace-Vektordatenbank wurde zurückgesetzt!",
    },
  },
  agent: {
    "performance-warning":
      "Die Leistung von LLMs, die keine explizite Unterstützung für das Aufrufen von Tools bieten, hängt stark von den Fähigkeiten und der Genauigkeit des Modells ab. Einige Fähigkeiten können eingeschränkt oder nicht funktionsfähig sein.",
    provider: {
      title: "Workspace-Agent LLM-Anbieter",
      description:
        "Der spezifische LLM-Anbieter und das Modell, das für den @agent-Agenten dieses Workspace verwendet wird.",
    },
    mode: {
      chat: {
        title: "Workspace-Agent Chat-Modell",
        description:
          "Das spezifische Chat-Modell, das für den @agent-Agenten dieses Workspace verwendet wird.",
      },
      title: "Workspace-Agent-Modell",
      description:
        "Das spezifische LLM-Modell, das für den @agent-Agenten dieses Workspace verwendet wird.",
      wait: "-- warte auf Modelle --",
    },
    skill: {
      title: "Standard-Agentenfähigkeiten",
      description:
        "Verbessern Sie die natürlichen Fähigkeiten des Standard-Agenten mit diesen vorgefertigten Fähigkeiten. Diese Einrichtung gilt für alle Workspaces.",
      rag: {
        title: "RAG & Langzeitgedächtnis",
        description:
          'Erlauben Sie dem Agenten, Ihre lokalen Dokumente zu nutzen, um eine Abfrage zu beantworten oder bitten Sie den Agenten, Inhalte für den Langzeitabruf zu "merken".',
      },
      view: {
        title: "Dokumente anzeigen & zusammenfassen",
        description:
          "Erlauben Sie dem Agenten, den Inhalt der aktuell eingebetteten Workspace-Dateien aufzulisten und zusammenzufassen.",
      },
      scrape: {
        title: "Websites durchsuchen",
        description:
          "Erlauben Sie dem Agenten, Websites zu besuchen und deren Inhalt zu extrahieren.",
      },
      generate: {
        title: "Diagramme generieren",
        description:
          "Aktivieren Sie den Standard-Agenten, um verschiedene Arten von Diagrammen aus bereitgestellten oder im Chat gegebenen Daten zu generieren.",
      },
      save: {
        title: "Dateien generieren & im Browser speichern",
        description:
          "Aktivieren Sie den Standard-Agenten, um Dateien zu generieren und zu schreiben, die gespeichert und in Ihrem Browser heruntergeladen werden können.",
      },
      web: {
        title: "Live-Websuche und -Browsing",
        description:
          "Ermöglichen Sie Ihrem Agenten, das Internet zu durchsuchen, um Ihre Fragen zu beantworten, indem Sie eine Verbindung zu einem Anbieter von Web-Suchdiensten (SERP) herstellen.",
      },
      sql: {
        title: "SQL-Verbindung",
        description:
          "Ermöglichen Sie Ihrem Agenten, SQL zu nutzen, um Ihre Fragen zu beantworten, indem Sie eine Verbindung zu verschiedenen SQL-Datenbankanbietern herstellen.",
      },
      default_skill:
        "Standardmäßig ist diese Funktion aktiviert, aber Sie können sie deaktivieren, wenn Sie nicht möchten, dass sie für den Agenten verfügbar ist.",
    },
  },
  recorded: {
    title: "Workspace-Chats",
    description:
      "Dies sind alle aufgezeichneten Chats und Nachrichten, die von Benutzern gesendet wurden, geordnet nach ihrem Erstellungsdatum.",
    export: "Exportieren",
    table: {
      id: "Id",
      by: "Gesendet von",
      workspace: "Workspace",
      prompt: "Prompt",
      response: "Antwort",
      at: "Gesendet am",
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
      title: "UI Einstellungen",
      description: "Passen Sie die Benutzeroberfläche von AnythingLLM an.",
    },
    branding: {
      title: "Branding & Whitelabeling",
      description:
        "Individualisieren Sie Ihre AnythingLLM-Instanz durch eigenes Branding.",
    },
    chat: {
      title: "Chat",
      description: "Passen Sie Ihre Chat-Einstellungen für AnythingLLM an.",
      auto_submit: {
        title: "Spracheingaben automatisch senden",
        description:
          "Automatische Übermittlung der Spracheingabe nach einer Sprechpause.",
      },
      auto_speak: {
        title: "Antworten automatisch vorlesen",
        description: "Antworten der KI automatisch vorlesen lassen",
      },
      spellcheck: {
        title: "Rechtschreibprüfung aktivieren",
        description:
          "Aktivieren oder deaktivieren Sie die Rechtschreibprüfung im Chat-Eingabefeld.",
      },
    },
    items: {
      theme: {
        title: "Farbschema",
        description: "Wählen Sie Ihr bevorzugtes Farbschema für die Anwendung.",
      },
      "show-scrollbar": {
        title: "Scrollbar anzeigen",
        description:
          "Aktivieren oder deaktivieren Sie die Scrollbar im Chat-Fenster.",
      },
      "support-email": {
        title: "Support-E-Mail",
        description: "Legen Sie die E-Mail-Adresse für den Kundensupport fest.",
      },
      "app-name": {
        title: "Name",
        description:
          "Geben Sie einen Anwendungsnamen ein, der auf der Login-Seite erscheint.",
      },
      "chat-message-alignment": {
        title: "Nachrichtenanordnung im Chat",
        description:
          "Bestimmen Sie den Ausrichtungsmodus der Chat-Nachrichten.",
      },
      "display-language": {
        title: "Sprache",
        description:
          "Wählen Sie die bevorzugte Sprache für die Benutzeroberfläche.",
      },
      logo: {
        title: "Eigenes Logo",
        description:
          "Laden Sie Ihr eigenes Logo hoch, das auf allen Seiten angezeigt wird.",
        add: "Eigenes Logo hinzufügen",
        recommended: "Empfohlene Größe: 800 x 200",
        remove: "Löschen",
        replace: "Ersetzen",
      },
      "welcome-messages": {
        title: "Willkommensnachrichten",
        description:
          "Individualisieren Sie die angezeigten Willkommensmitteilungen für Ihre Benutzer. Diese Mitteilungen sehen nur Nicht-Administratoren.",
        new: "Neue Nachricht",
        system: "System",
        user: "Benutzer",
        message: "Nachricht",
        assistant: "AnythingLLM Chat-Assistent",
        "double-click": "Zum Bearbeiten doppelklicken",
        save: "Nachrichten speichern",
      },
      "browser-appearance": {
        title: "Browser-Ansicht",
        description:
          "Individualisieren Sie die Ansicht von Browser-Tab und -Titel, während die App geöffnet ist.",
        tab: {
          title: "Titel",
          description:
            "Bestimmen Sie einen individuellen Tab-Titel, wenn die App im Browser geöffnet ist.",
        },
        favicon: {
          title: "Tab-Icon",
          description: "Nutzen Sie ein eigenes Icon für den Tab im Browser.",
        },
      },
      "sidebar-footer": {
        title: "Fußzeilenelemente der Seitenleiste",
        description:
          "Individualisieren Sie die Elemente in der Fußzeile am unteren Ende der Seitenleiste.",
        icon: "Icon",
        link: "Link",
      },
      "render-html": {
        title: "HTML-Code in einem Chat anzeigen",
        description:
          "HTML-Antworten in den Antworten des Assistenten anzeigen.\nDies kann zu einer viel höheren Qualität der Antwort führen, aber auch zu potenziellen Sicherheitsrisiken führen.",
      },
    },
  },
  api: {
    title: "API-Schlüssel",
    description:
      "API-Schlüssel ermöglichen es dem Besitzer, programmatisch auf diese AnythingLLM-Instanz zuzugreifen und sie zu verwalten.",
    link: "Lesen Sie die API-Dokumentation",
    generate: "Neuen API-Schlüssel generieren",
    table: {
      key: "API-Schlüssel",
      by: "Erstellt von",
      created: "Erstellt",
    },
  },
  llm: {
    title: "LLM-Präferenz",
    description:
      "Dies sind die Anmeldeinformationen und Einstellungen für Ihren bevorzugten LLM-Chat- und Einbettungsanbieter. Es ist wichtig, dass diese Schlüssel aktuell und korrekt sind, sonst wird AnythingLLM nicht richtig funktionieren.",
    provider: "LLM-Anbieter",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure-Service-Endpoint",
        api_key: "API-Schlüssel",
        chat_deployment_name: "Name der Chat-Deployment",
        chat_model_token_limit: "Chat-Modell Token-Begrenzung",
        model_type: "Art des Modells",
        model_type_tooltip:
          'Wenn Ihre Bereitstellung ein Reasoning-Modell verwendet (z. B. o1, o1-mini, o3-mini usw.), setzen Sie dies auf "Reasoning". Andernfalls können Ihre Chat-Anfragen fehlschlagen.',
        default: "Standard",
        reasoning: "Reasoning",
      },
    },
  },
  transcription: {
    title: "Transkriptionsmodell-Präferenz",
    description:
      "Dies sind die Anmeldeinformationen und Einstellungen für Ihren bevorzugten Transkriptionsmodellanbieter. Es ist wichtig, dass diese Schlüssel aktuell und korrekt sind, sonst werden Mediendateien und Audio nicht transkribiert.",
    provider: "Transkriptionsanbieter",
    "warn-start":
      "Die Verwendung des lokalen Whisper-Modells auf Maschinen mit begrenztem RAM oder CPU kann AnythingLLM bei der Verarbeitung von Mediendateien zum Stillstand bringen.",
    "warn-recommend":
      "Wir empfehlen mindestens 2 GB RAM und das Hochladen von Dateien <10 MB.",
    "warn-end":
      "Das eingebaute Modell wird bei der ersten Verwendung automatisch heruntergeladen.",
  },
  embedding: {
    title: "Einbettungspräferenz",
    "desc-start":
      "Bei der Verwendung eines LLM, das keine native Unterstützung für eine Einbettungs-Engine bietet, müssen Sie möglicherweise zusätzlich Anmeldeinformationen für die Texteinbettung angeben.",
    "desc-end":
      "Einbettung ist der Prozess, Text in Vektoren umzuwandeln. Diese Anmeldeinformationen sind erforderlich, um Ihre Dateien und Prompts in ein Format umzuwandeln, das AnythingLLM zur Verarbeitung verwenden kann.",
    provider: {
      title: "Einbettungsanbieter",
    },
  },
  text: {
    title: "Textsplitting & Chunking-Präferenzen",
    "desc-start":
      "Manchmal möchten Sie vielleicht die Standardmethode ändern, wie neue Dokumente gesplittet und gechunkt werden, bevor sie in Ihre Vektordatenbank eingefügt werden.",
    "desc-end":
      "Sie sollten diese Einstellung nur ändern, wenn Sie verstehen, wie Textsplitting funktioniert und welche Nebenwirkungen es hat.",
    size: {
      title: "Textchunk-Größe",
      description:
        "Dies ist die maximale Länge der Zeichen, die in einem einzelnen Vektor vorhanden sein können.",
      recommend: "Die maximale Länge des Einbettungsmodells beträgt",
    },
    overlap: {
      title: "Textchunk-Überlappung",
      description:
        "Dies ist die maximale Überlappung von Zeichen, die während des Chunkings zwischen zwei benachbarten Textchunks auftritt.",
    },
  },
  vector: {
    title: "Vektordatenbank",
    description:
      "Dies sind die Anmeldeinformationen und Einstellungen für die Funktionsweise Ihrer AnythingLLM-Instanz. Es ist wichtig, dass diese Schlüssel aktuell und korrekt sind.",
    provider: {
      title: "Vektordatenbankanbieter",
      description: "Für LanceDB ist keine Konfiguration erforderlich.",
    },
  },
  embeddable: {
    title: "Einbettbare Chat-Widgets",
    description:
      "Einbettbare Chat-Widgets sind öffentlich zugängliche Chat-Schnittstellen, die an einen einzelnen Workspace gebunden sind. Diese ermöglichen es Ihnen, Workspaces zu erstellen, die Sie dann weltweit veröffentlichen können.",
    create: "Einbettung erstellen",
    table: {
      workspace: "Workspace",
      chats: "Gesendete Chats",
      active: "Aktive Domains",
      created: "Erstellt",
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
    title: "Eingebettete Chats",
    export: "Exportieren",
    description:
      "Dies sind alle aufgezeichneten Chats und Nachrichten von jeder Einbettung, die Sie veröffentlicht haben.",
    table: {
      embed: "Einbettung",
      sender: "Absender",
      message: "Nachricht",
      response: "Antwort",
      at: "Gesendet am",
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
    title: "Sicherheit",
    multiuser: {
      title: "Mehrbenutzer-Modus",
      description:
        "Richten Sie Ihre Instanz ein, um Ihr Team zu unterstützen, indem Sie den Mehrbenutzer-Modus aktivieren.",
      enable: {
        "is-enable": "Mehrbenutzer-Modus ist aktiviert",
        enable: "Mehrbenutzer-Modus aktivieren",
        description:
          "Standardmäßig sind Sie der einzige Administrator. Als Administrator müssen Sie Konten für alle neuen Benutzer oder Administratoren erstellen. Verlieren Sie Ihr Passwort nicht, da nur ein Administrator-Benutzer Passwörter zurücksetzen kann.",
        username: "Administrator-Kontoname",
        password: "Administrator-Kontopasswort",
      },
    },
    password: {
      title: "Passwortschutz",
      description:
        "Schützen Sie Ihre AnythingLLM-Instanz mit einem Passwort. Wenn Sie dieses vergessen, gibt es keine Wiederherstellungsmethode, also stellen Sie sicher, dass Sie dieses Passwort speichern.",
      "password-label": "Instanzpasswort",
    },
  },
  event: {
    title: "Ereignisprotokolle",
    description:
      "Sehen Sie alle Aktionen und Ereignisse, die auf dieser Instanz zur Überwachung stattfinden.",
    clear: "Ereignisprotokolle löschen",
    table: {
      type: "Ereignistyp",
      user: "Benutzer",
      occurred: "Aufgetreten am",
    },
  },
  privacy: {
    title: "Datenschutz & Datenverarbeitung",
    description:
      "Dies ist Ihre Konfiguration dafür, wie verbundene Drittanbieter und AnythingLLM Ihre Daten behandeln.",
    llm: "LLM-Auswahl",
    embedding: "Einbettungspräferenz",
    vector: "Vektordatenbank",
    anonymous: "Anonyme Telemetrie aktiviert",
  },
  connectors: {
    "search-placeholder": "Datenverbindungen durchsuchen",
    "no-connectors": "Keine Datenverbindungen gefunden.",
    obsidian: {
      name: "Obsidian",
      description: "Mit einem Klick Obsidian-Vault importieren.",
      vault_location: "Ort des Vaults",
      vault_description:
        "Ordner des Obsidian-Vaults auswählen, um sämtliche Notizen inkl. Verknüpfungen zu importieren.",
      selected_files: "{{count}} Markdown-Dateien gefunden",
      importing: "Vault wird importiert...",
      import_vault: "Vault importieren",
      processing_time: "Dies kann je nach Größe Ihres Vaults etwas dauern",
      vault_warning:
        "Bitte schließen Sie Ihr Obsidian-Vault, um mögliche Konflikte zu vermeiden.",
    },
    github: {
      name: "GitHub Repository",
      description:
        "Importieren Sie ein öffentliches oder privates GitHub-Repository mit einem einzigen Klick.",
      URL: "GitHub Repo URL",
      URL_explained: "URL des GitHub-Repositories, das Sie sammeln möchten.",
      token: "GitHub Zugriffstoken",
      optional: "optional",
      token_explained: "Zugriffstoken um Ratenlimits zu vermeiden.",
      token_explained_start: "Ohne einen ",
      token_explained_link1: "persönlichen Zugriffstoken",
      token_explained_middle:
        " kann die GitHub-API aufgrund von Ratenlimits die Anzahl der abrufbaren Dateien einschränken. Sie können ",
      token_explained_link2: "einen temporären Zugriffstoken erstellen",
      token_explained_end: ", um dieses Problem zu vermeiden.",
      ignores: "Datei-Ausschlüsse",
      git_ignore:
        "Liste im .gitignore-Format, um bestimmte Dateien während der Sammlung zu ignorieren. Drücken Sie Enter nach jedem Eintrag, den Sie speichern möchten.",
      task_explained:
        "Sobald der Vorgang abgeschlossen ist, sind alle Dateien im Dokumenten-Picker zur Einbettung in Workspaces verfügbar.",
      branch: "Branch, von dem Sie Dateien sammeln möchten.",
      branch_loading: "-- lade verfügbare Branches --",
      branch_explained: "Branch, von dem Sie Dateien sammeln möchten.",
      token_information:
        "Ohne Angabe des <b>GitHub Zugriffstokens</b> kann dieser Datenkonnektor aufgrund der öffentlichen API-Ratenlimits von GitHub nur die <b>Top-Level</b>-Dateien des Repositories sammeln.",
      token_personal:
        "Holen Sie sich hier einen kostenlosen persönlichen Zugriffstoken mit einem GitHub-Konto.",
    },
    gitlab: {
      name: "GitLab Repository",
      description:
        "Importieren Sie ein öffentliches oder privates GitLab-Repository mit einem einzigen Klick.",
      URL: "GitLab Repo URL",
      URL_explained: "URL des GitLab-Repositories, das Sie sammeln möchten.",
      token: "GitLab Zugriffstoken",
      optional: "optional",
      token_explained: "Zugriffstoken zur Vermeidung von Ratenlimits.",
      token_description:
        "Wählen Sie zusätzliche Entitäten aus, die von der GitLab-API abgerufen werden sollen.",
      token_explained_start: "Ohne einen ",
      token_explained_link1: "persönlichen Zugriffstoken",
      token_explained_middle:
        " kann die GitLab-API aufgrund von Ratenlimits die Anzahl der abrufbaren Dateien einschränken. Sie können ",
      token_explained_link2: "einen temporären Zugriffstoken erstellen",
      token_explained_end: ", um dieses Problem zu vermeiden.",
      fetch_issues: "Issues als Dokumente abrufen",
      ignores: "Datei-Ausschlüsse",
      git_ignore:
        "Liste im .gitignore-Format, um bestimmte Dateien während der Sammlung zu ignorieren. Drücken Sie Enter nach jedem Eintrag, den Sie speichern möchten.",
      task_explained:
        "Sobald der Vorgang abgeschlossen ist, sind alle Dateien im Dokumenten-Picker zur Einbettung in Workspaces verfügbar.",
      branch: "Branch, von dem Sie Dateien sammeln möchten",
      branch_loading: "-- lade verfügbare Branches --",
      branch_explained: "Branch, von dem Sie Dateien sammeln möchten.",
      token_information:
        "Ohne Angabe des <b>GitLab Zugriffstokens</b> kann dieser Datenkonnektor aufgrund der öffentlichen API-Ratenlimits von GitLab nur die <b>Top-Level</b>-Dateien des Repositories sammeln.",
      token_personal:
        "Holen Sie sich hier einen kostenlosen persönlichen Zugriffstoken mit einem GitLab-Konto.",
    },
    youtube: {
      name: "YouTube Transkript",
      description:
        "Importieren Sie die Transkription eines YouTube-Videos über einen Link.",
      URL: "YouTube Video URL",
      URL_explained_start:
        "Geben Sie die URL eines beliebigen YouTube-Videos ein, um dessen Transkript abzurufen. Das Video muss über ",
      URL_explained_link: "Untertitel",
      URL_explained_end: " verfügen.",
      task_explained:
        "Sobald der Vorgang abgeschlossen ist, ist das Transkript im Dokumenten-Picker zur Einbettung in Workspaces verfügbar.",
      language: "Transkriptsprache",
      language_explained:
        "Wählen Sie die Sprache des Transkripts aus, das Sie sammeln möchten.",
      loading_languages: "-- lade verfügbare Sprachen --",
    },
    "website-depth": {
      name: "Massen-Link-Scraper",
      description:
        "Durchsuchen Sie eine Website und ihre Unterlinks bis zu einer bestimmten Tiefe.",
      URL: "Website URL",
      URL_explained:
        "Geben Sie die Start-URL der Website ein, die Sie durchsuchen möchten.",
      depth: "Durchsuchungstiefe",
      depth_explained:
        "Das ist die Menge an Unterseiten, die abhängig der originalen URL durchsucht werden sollen.",
      max_pages: "Maximale Seitenanzahl",
      max_pages_explained: "Maximale Anzahl der zu durchsuchenden Seiten.",
      task_explained:
        "Sobald der Vorgang abgeschlossen ist, sind alle gesammelten Inhalte im Dokumenten-Picker zur Einbettung in Workspaces verfügbar.",
    },
    confluence: {
      name: "Confluence",
      description:
        "Importieren Sie eine komplette Confluence-Seite mit einem einzigen Klick.",
      deployment_type: "Confluence Bereitstellungstyp",
      deployment_type_explained:
        "Bestimmen Sie, ob Ihre Confluence-Instanz in der Atlassian Cloud oder selbst gehostet ist.",
      base_url: "Confluence Basis-URL",
      base_url_explained: "Dies ist die Basis-URL Ihres Confluence-Bereichs.",
      space_key: "Confluence Space-Key",
      space_key_explained:
        "Dies ist der Space-Key Ihrer Confluence-Instanz, der verwendet wird. Beginnt normalerweise mit ~",
      username: "Confluence Benutzername",
      username_explained: "Ihr Confluence Benutzername.",
      auth_type: "Confluence Authentifizierungstyp",
      auth_type_explained:
        "Wählen Sie den Authentifizierungstyp, den Sie verwenden möchten, um auf Ihre Confluence-Seiten zuzugreifen.",
      auth_type_username: "Benutzername und Zugriffstoken",
      auth_type_personal: "Persönliches Zugriffstoken",
      token: "Confluence API-Token",
      token_explained_start:
        "Sie müssen ein Zugriffstoken für die Authentifizierung bereitstellen. Sie können ein Zugriffstoken",
      token_explained_link: "hier",
      token_desc: "Zugriffstoken für die Authentifizierung.",
      pat_token: "Confluence persönliches Zugriffstoken",
      pat_token_explained: "Ihr Confluence persönliches Zugriffstoken.",
      bypass_ssl: "SSL-Zertifikatsvalidierung umgehen",
      bypass_ssl_explained:
        "Aktivieren Sie diese Option, um die SSL-Zertifikatsvalidierung für selbst gehostete Confluence-Instanzen mit selbstsignierten Zertifikaten zu umgehen.",
      task_explained:
        "Sobald der Vorgang abgeschlossen ist, ist der Seiteninhalt im Dokumenten-Picker zur Einbettung in Workspaces verfügbar.",
    },
    manage: {
      documents: "Dokumente",
      "data-connectors": "Datenverbindungen",
      "desktop-only":
        "Diese Einstellungen können nur auf einem Desktop-Gerät bearbeitet werden. Bitte rufen Sie diese Seite auf Ihrem Desktop auf, um fortzufahren.",
      dismiss: "Schließen",
      editing: "Bearbeite",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Meine Dokumente",
      "new-folder": "Neuer Ordner",
      "search-document": "Dokument suchen",
      "no-documents": "Keine Dokumente",
      "move-workspace": "In Workspace verschieben",
      name: "Name",
      "delete-confirmation":
        "Sind Sie sicher, dass Sie diese Dateien und Ordner löschen möchten?\nDies wird die Dateien vom System entfernen und sie automatisch aus allen vorhandenen Workspaces entfernen.\nDiese Aktion kann nicht rückgängig gemacht werden.",
      "removing-message":
        "Entferne {{count}} Dokumente und {{folderCount}} Ordner. Bitte warten.",
      "move-success": "{{count}} Dokumente erfolgreich verschoben.",
      date: "Datum",
      type: "Typ",
      no_docs: "Keine Dokumente vorhanden.",
      select_all: "Alle auswählen",
      deselect_all: "Auswahl abbrechen",
      remove_selected: "Ausgewähltes entfernen",
      costs: "*Einmalige Kosten für das Einbetten",
      save_embed: "Speichern und Einbetten",
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
      "processor-offline": "Dokumentenprozessor nicht verfügbar",
      "processor-offline-desc":
        "Wir können Ihre Dateien momentan nicht hochladen, da der Dokumentenprozessor offline ist. Bitte versuchen Sie es später erneut.",
      "click-upload":
        "Klicken Sie zum Hochladen oder ziehen Sie Dateien per Drag & Drop",
      "file-types":
        "unterstützt Textdateien, CSVs, Tabellenkalkulationen, Audiodateien und mehr!",
      "or-submit-link": "oder einen Link einreichen",
      "placeholder-link": "https://beispiel.de",
      fetching: "Wird abgerufen...",
      "fetch-website": "Website abrufen",
      "privacy-notice":
        "Diese Dateien werden zum Dokumentenprozessor hochgeladen, der auf dieser AnythingLLM-Instanz läuft. Diese Dateien werden nicht an Dritte gesendet oder geteilt.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Was bedeutet es Dokumente anzuheften?",
      pin_explained_block1:
        "Wenn du ein Dokument <b>anheftest</b>, wird den kompletten Inhalt des Dokuments mit deinem Prompt versendet, wodurch das LLM den vollen Kontext besitzt",
      pin_explained_block2:
        "Das funktioniert am besten bei <b>sehr großen Dokumenten</b> sowie für kleine Dokumenten, dessen Inhalt für die Wissensbasis absolut wichtig sind.",
      pin_explained_block3:
        "Wenn du nicht standardmäßig die erwünschten Ergebnisse bekommst, kann das anheften eine gute Methode sein, um Antworten mit einer besseren Qualität mit nur einem Klick zu erhalten.",
      accept: "Alles klar, ich habe es verstanden.",
    },
    watching: {
      what_watching: "Was bedeutet es ein Dokument zu beobachten?",
      watch_explained_block1:
        "Wenn du ein Dokument <b>beobachtest,</b> werden wir <i>automatisch</i> das Dokument von der Datenquelle in regelmäßigen Abständen aktualisieren. Dadurch wird der Inhalt automatisch in allen Workspaces aktualisiert, wo sich das Dokument befindet.",
      watch_explained_block2:
        "Diese Funktion unterstützt aktuell nur Online-Quellen und ist somit nicht verfügbar für selbst hochgeladene Dokumente",
      watch_explained_block3_start: "Du kannst im ",
      watch_explained_block3_link: "Dateimanager",
      watch_explained_block3_end:
        " entscheiden, welche Dokumente du beobachten möchtest.",
      accept: "Alles klar, ich habe es verstanden.",
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
    welcome: "Willkommen zu deinem Workspace.",
    get_started: "Starte mit ",
    get_started_default: "Starte mit ",
    upload: "dem Upload von Dokumenten",
    or: " oder ",
    attachments_processing: "Anhänge werden verarbeitet. Bitte warten...",
    send_chat: " schreibe im Chat.",
    send_message: "Schreibe eine Nachricht",
    attach_file: "Füge eine Datei zum Chat hinzu",
    slash: "Schau dir alle verfügbaren Slash Befehle für den Chat an.",
    agents: "Schau dir alle verfugbaren Agentenfähigkeiten für den Chat an.",
    start_agent_session: "Start agent session",
    text_size: "Ändere die Größe des Textes.",
    microphone: "Spreche deinen Prompt ein.",
    send: "Versende den Prompt an den Workspace.",
    tts_speak_message: "Nachricht vorlesen (TTS)",
    copy: "Kopieren",
    regenerate: "Neu generieren",
    regenerate_response: "Antwort neu generieren",
    good_response: "Gute Antwort",
    more_actions: "Weitere Aktionen",
    hide_citations: "Quellenangaben ausblenden",
    show_citations: "Quellenangaben anzeigen",
    sources: "Quellen",
    source_count_one: "{{count}} Referenz",
    source_count_other: "{{count}} Verweise",
    document: "Dokument",
    similarity_match: "Spiel",
    pause_tts_speech_message: "Nachrichtenvorlesung pausieren",
    fork: "Abzweigen",
    delete: "Löschen",
    save_submit: "Speichern und Senden",
    cancel: "Abbrechen",
    submit: "Absenden",
    edit_prompt: "Prompt bearbeiten",
    edit_response: "Antwort bearbeiten",
    edit_info_user:
      '"Absenden" generiert die Antwort des KI-Systems neu. "Speichern" aktualisiert lediglich Ihre Nachricht.',
    edit_info_assistant:
      "Ihre Änderungen werden direkt in diese Antwort gespeichert.",
    see_less: "Weniger anzeigen",
    see_more: "Mehr anzeigen",
    at_agent: "@agent",
    default_agent_description: "– Standardagent für diesen Workspace.",
    custom_agents_coming_soon: "Eigene Agenten bald verfügbar!",
    preset_reset_description: "Chatverlauf löschen und neuen Chat starten",
    preset_exit_description: "Behalte die aktuelle Agentensitzung",
    add_new_preset: "Neues Preset anlegen",
    add_new: "Neu hinzufügen",
    edit: "Bearbeiten",
    publish: "Veröffentlichen",
    stop_generating: "Stoppen Sie die Generierung von Antworten",
    command: "Befehl",
    your_command: "dein-befehl",
    placeholder_prompt: "Dieser Text wird vor deinem Prompt eingefügt.",
    description: "Beschreibung",
    placeholder_description: "Antwortet mit einem Gedicht über LLMs.",
    save: "Speichern",
    small: "Klein",
    normal: "Standard",
    large: "Groß",
    tools: "Werkzeuge",
    slash_commands: "Befehlszeilen",
    agent_skills: "Fähigkeiten von Agenten",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Durchsuchen",
    text_size_label: "Schriftgröße",
    select_model: "Modell auswählen",
    workspace_llm_manager: {
      search: "LLM-Provider durchsuchen",
      loading_workspace_settings: "Workspace-Einstellungen werden geladen",
      available_models: "Verfügbare Modelle von {{provider}}",
      available_models_description:
        "Wählen Sie ein Modell für diesen Workspace",
      save: "Modell verwenden",
      saving: "Standardmodell für Workspace wird eingestellt...",
      missing_credentials: "Für diesen Anbieter fehlen Anmeldedaten!",
      missing_credentials_description: "Klicken, um Zugangsdaten einzurichten",
    },
  },
  profile_settings: {
    edit_account: "Account bearbeiten",
    profile_picture: "Profilbild",
    remove_profile_picture: "Profilbild entfernen",
    username: "Nutzername",
    new_password: "Neues Passwort",
    password_description: "Das Passwort muss mindestens 8 Zeichen haben.",
    cancel: "Abbrechen",
    update_account: "Account updaten",
    theme: "Bevorzugtes Design",
    language: "Bevorzugte Sprache",
    failed_upload: "Profilbild konnte nicht hochgeladen werden: {{error}}",
    upload_success: "Profilbild hochgeladen.",
    failed_remove: "Profilbild konnte nicht entfernt werden: {{error}}",
    profile_updated: "Profil wurde aktualisiert.",
    failed_update_user: "Benutzer konnte nicht aktualisiert werden: {{error}}",
    account: "Account",
    support: "Support",
    signout: "Abmelden",
  },
  "keyboard-shortcuts": {
    title: "Tastaturkürzel",
    shortcuts: {
      settings: "Einstellungen öffnen",
      workspaceSettings: "Workspace Einstellungen öffnen",
      home: "Zur Startseite",
      workspaces: "Workspaces verwalten",
      apiKeys: "API-Schlüssel Einstellungen",
      llmPreferences: "LLM-Einstellungen",
      chatSettings: "Chat Einstellungen",
      help: "Tastenkürzel Hilfe anzeigen",
      showLLMSelector: "LLM-Auswahl für Workspace zeigen",
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
        success_title: "Erfolg!",
        success_description:
          "Ihre System-Anweisung wurde im Community Hub veröffentlicht!",
        success_thank_you: "Vielen Dank für die Weitergabe an die Community!",
        view_on_hub: "Ansicht im Community Hub",
        modal_title:
          "Veröffentlichen Sie das System, um die Benutzer zu informieren, dass das System nicht mehr verfügbar ist.",
        name_label: "Name",
        name_description: "Dies ist der Anzeigename für Ihren Systemprompt.",
        name_placeholder: "Mein System-Prompt",
        description_label: "Beschreibung",
        description_description:
          "Dies ist die Beschreibung Ihres System-Prompts. Verwenden Sie dies, um den Zweck Ihres System-Prompts zu beschreiben.",
        tags_label: "Schlüsselwörter",
        tags_description:
          "Die Tags werden verwendet, um Ihre Systemanweisung für eine einfachere Suche zu kennzeichnen. Sie können mehrere Tags hinzufügen. Maximal 5 Tags. Maximal 20 Zeichen pro Tag.",
        tags_placeholder:
          "Geben Sie den Text ein und drücken Sie die Eingabetaste, um Tags hinzuzufügen.",
        visibility_label: "Sichtbarkeit",
        public_description: "Öffentliche Anweisungen sind für alle sichtbar.",
        private_description:
          "Private System-Nachrichten sind nur für Sie sichtbar.",
        publish_button: "Veröffentlichen Sie im Community Hub",
        submitting: "Veröffentlichung...",
        submit: "Veröffentlichen Sie im Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Dies ist der eigentliche Systemprompt, der verwendet wird, um das LLM zu steuern.",
        prompt_placeholder: "Bitte geben Sie Ihren Systemprompt hier ein...",
      },
      agent_flow: {
        public_description: "Öffentliche Datenströme sind für alle sichtbar.",
        private_description: "Private Agent-Daten sind nur für Sie sichtbar.",
        success_title: "Erfolg!",
        success_description:
          "Ihr Agent Flow wurde auf dem Community Hub veröffentlicht!",
        success_thank_you: "Vielen Dank für die Weitergabe an die Community!",
        view_on_hub: "Ansicht im Community Hub",
        modal_title: "Veröffentlichen Sie den Agentenfluss.",
        name_label: "Name",
        name_description: "Dies ist der Anzeigename für Ihren Agentenablauf.",
        name_placeholder: "Mein Agent Flow",
        description_label: "Beschreibung",
        description_description:
          "Dies ist die Beschreibung Ihres Agentenflusses. Verwenden Sie diese, um den Zweck Ihres Agentenflusses zu beschreiben.",
        tags_label: "Schlüsselwörter",
        tags_description:
          "Die Tags werden verwendet, um Ihren Agentenfluss leichter durchsuchbar zu machen. Sie können mehrere Tags hinzufügen. Maximal 5 Tags. Maximal 20 Zeichen pro Tag.",
        tags_placeholder:
          "Geben Sie Tags ein und drücken Sie die Eingabetaste, um sie hinzuzufügen.",
        visibility_label: "Sichtbarkeit",
        publish_button: "Veröffentlichen Sie im Community Hub",
        submitting: "Veröffentlichung...",
        submit: "Veröffentlichen Sie im Community Hub",
        privacy_note:
          "Agent-Prozesse werden immer privat hochgeladen, um sensible Daten zu schützen. Sie können die Sichtbarkeit im Community Hub nach der Veröffentlichung ändern. Bitte überprüfen Sie, ob Ihr Prozess keine sensiblen oder privaten Informationen enthält, bevor Sie ihn veröffentlichen.",
      },
      slash_command: {
        success_title: "Erfolg!",
        success_description:
          "Ihre Slash-Befehle wurden im Community Hub veröffentlicht!",
        success_thank_you: "Vielen Dank für die Weitergabe an die Community!",
        view_on_hub: "Ansicht im Community Hub",
        modal_title: "Slash-Befehle veröffentlichen",
        name_label: "Name",
        name_description: "Dies ist der Anzeigename für Ihren Slash-Befehl.",
        name_placeholder: "Meine Slash-Befehle",
        description_label: "Beschreibung",
        description_description:
          "Dies ist die Beschreibung für Ihren Slash-Befehl. Verwenden Sie diese, um den Zweck Ihres Slash-Befehls zu beschreiben.",
        command_label: "Befehl",
        command_description:
          "Dies ist der Slash-Befehl, den Benutzer eingeben, um diese Voreinstellung auszulösen.",
        command_placeholder: "mein-befehl",
        tags_label: "Schlüsselwörter",
        tags_description:
          "Die Tags werden verwendet, um Ihren Slash-Befehl zu kennzeichnen und die Suche zu erleichtern. Sie können mehrere Tags hinzufügen. Maximal 5 Tags. Maximal 20 Zeichen pro Tag.",
        tags_placeholder:
          "Geben Sie Tags ein und drücken Sie die Eingabetaste, um sie hinzuzufügen.",
        visibility_label: "Sichtbarkeit",
        public_description:
          "Öffentliche Slash-Befehle sind für jeden sichtbar.",
        private_description: "Private Slash-Befehle sind nur für Sie sichtbar.",
        publish_button: "Veröffentlichen Sie im Community Hub",
        submitting: "Veröffentlichung...",
        prompt_label:
          "Bitte geben Sie den Namen des Produkts an, das Sie verkaufen möchten.",
        prompt_description:
          "Dies ist der Befehl, der verwendet wird, wenn der Slash-Befehl ausgelöst wird.",
        prompt_placeholder: "Bitte geben Sie Ihre Anfrage hier ein...",
      },
      generic: {
        unauthenticated: {
          title: "Benötigte Authentifizierung",
          description:
            "Sie müssen sich vor der Veröffentlichung von Inhalten über den AnythingLLM Community Hub authentifizieren.",
          button: "Verbinden Sie sich mit dem Community Hub",
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
