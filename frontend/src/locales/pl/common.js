const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Witamy w",
      getStarted: "Rozpocznij",
    },
    llm: {
      title: "Preferencje modeli językowych",
      description:
        "AnythingLLM może współpracować z wieloma dostawcami modeli językowych",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Konfiguracja użytkownika",
      description: "Skonfiguruj ustawienia użytkownika.",
      howManyUsers: "Ilu użytkowników będzie korzystać z tej instancji?",
      justMe: "Tylko ja",
      myTeam: "Mój zespół",
      instancePassword: "Hasło instancji",
      setPassword: "Czy chcesz ustawić hasło?",
      passwordReq: "Hasła muszą składać się z co najmniej 8 znaków.",
      passwordWarn:
        "Ważne jest, aby zapisać to hasło, ponieważ nie ma metody jego odzyskania.",
      adminUsername: "Nazwa użytkownika konta administratora",
      adminPassword: "Hasło konta administratora",
      adminPasswordReq: "Hasła muszą składać się z co najmniej 8 znaków.",
      teamHint:
        "Domyślnie będziesz jedynym administratorem. Po zakończeniu wdrażania możesz tworzyć i zapraszać innych użytkowników lub administratorów. Nie zgub hasła, ponieważ tylko administratorzy mogą je resetować.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Obsługa danych i prywatność",
      description:
        "Dbamy o przejrzystość i kontrolę danych osobowych użytkowników.",
      settingsHint:
        "Ustawienia te można zmienić w dowolnym momencie w ustawieniach.",
    },
    survey: {
      title: "Witamy w AnythingLLM",
      description:
        "Pomóż nam stworzyć AnythingLLM dostosowany do Twoich potrzeb. Opcjonalnie.",
      email: "Jaki jest Twój adres e-mail?",
      useCase: "Do czego będziesz używać AnythingLLM?",
      useCaseWork: "Do pracy",
      useCasePersonal: "Do użytku osobistego",
      useCaseOther: "Inne",
      comment: "Skąd dowiedziałeś się o AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube itp. - Daj nam znać, jak nas znalazłeś!",
      skip: "Pomiń ankietę",
      thankYou: "Dziękujemy za opinię!",
    },
    workspace: {
      title: "Utwórz swój pierwszy obszar roboczy",
      description:
        "Stwórz swój pierwszy obszar roboczy i zacznij korzystać z AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Nazwa obszaru roboczego",
    error: "błąd",
    success: "sukces",
    user: "Użytkownik",
    selection: "Wybór modelu",
    saving: "Zapisywanie...",
    save: "Zapisz zmiany",
    previous: "Poprzednia strona",
    next: "Następna strona",
    optional: "Opcjonalnie",
    yes: "Tak",
    no: "Nie",
    search: "Wyszukaj",
    username_requirements:
      "Nazwa użytkownika musi mieć od 2 do 32 znaków, zaczynać się małą literą i zawierać tylko małe litery, cyfry, podkreślenia, myślniki i kropki.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Witamy",
    chooseWorkspace: "Wybierz obszar roboczy, aby rozpocząć czat!",
    notAssigned:
      "Nie jesteś przypisany do żadnego obszaru roboczego.\nSkontaktuj się z administratorem, aby poprosić o dostęp do obszaru roboczego.",
    goToWorkspace: 'Przejdź do obszaru roboczego "{{workspace}}"',
  },
  settings: {
    title: "Ustawienia instancji",
    system: "Ustawienia ogólne",
    invites: "Zaproszenia",
    users: "Użytkownicy",
    workspaces: "Obszary robocze",
    "workspace-chats": "Czaty w obszarach roboczych",
    customization: "Personalizacja",
    interface: "Preferencje interfejsu użytkownika",
    branding: "Branding i white-labeling",
    chat: "Czat",
    "api-keys": "Interfejs API dla programistów",
    llm: "LLM",
    transcription: "Transkrypcja",
    embedder: "Embeddings",
    "text-splitting": "Dzielenie tekstu",
    "voice-speech": "Głos i mowa",
    "vector-database": "Wektorowa baza danych",
    embeds: "Osadzone czaty",
    "embed-chats": "Historia osadzonych czatów",
    security: "Bezpieczeństwo",
    "event-logs": "Dzienniki zdarzeń",
    privacy: "Prywatność i dane",
    "ai-providers": "Dostawcy AI",
    "agent-skills": "Umiejętności agenta",
    "community-hub": {
      title: "Centrum Społeczności",
      trending: "Odkryj popularne",
      "your-account": "Twój profil",
      "import-item": "Importuj element",
    },
    admin: "Administrator",
    tools: "Narzędzia",
    "system-prompt-variables": "Zmienne instrukcji systemowej",
    "experimental-features": "Funkcje eksperymentalne",
    contact: "Kontakt z pomocą techniczną",
    "browser-extension": "Rozszerzenie przeglądarki",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Witamy w",
      "placeholder-username": "Nazwa użytkownika",
      "placeholder-password": "Hasło",
      login: "Logowanie",
      validating: "Weryfikacja...",
      "forgot-pass": "Nie pamiętam hasła",
      reset: "Reset",
    },
    "sign-in": "Zaloguj się do {{appName}}.",
    "password-reset": {
      title: "Resetowanie hasła",
      description: "Podaj poniżej niezbędne informacje, aby zresetować hasło.",
      "recovery-codes": "Kody odzyskiwania",
      "recovery-code": "Kod odzyskiwania {{index}}",
      "back-to-login": "Powrót do logowania",
    },
  },
  "main-page": {
    greeting: "W czym mogę Ci dzisiaj pomóc?",
    noWorkspaceError:
      "Przed rozpoczęciem czatu należy utworzyć obszar roboczy.",
    checklist: {
      title: "Pierwsze kroki",
      tasksLeft: "- zadania do wykonania",
      completed:
        "Jesteś na najlepszej drodze do zostania ekspertem AnythingLLM!",
      dismiss: "zamknij",
      tasks: {
        create_workspace: {
          title: "Utwórz obszar roboczy",
          description: "Utwórz swój pierwszy obszar roboczy, aby rozpocząć",
          action: "Utwórz",
        },
        send_chat: {
          title: "Wyślij wiadomość",
          description: "Rozpocznij rozmowę z asystentem AI",
          action: "Czat",
        },
        embed_document: {
          title: "Dodaj źródło danych",
          description: "Dodaj swoje pierwsze dane",
          action: "Dodaj",
        },
        setup_system_prompt: {
          title: "Konfiguracja instrukcji systemowej",
          description: "Konfiguracja zachowania asystenta AI",
          action: "Konfiguruj",
        },
        define_slash_command: {
          title: "Stwórz polecenie slash",
          description: "Tworzenie niestandardowych poleceń dla asystenta",
          action: "Stwórz",
        },
        visit_community: {
          title: "Odwiedź Community Hub",
          description: "Przeglądaj zasoby i szablony społeczności",
          action: "Przeglądaj",
        },
      },
    },
    quickActions: {
      createAgent: "Utwórz agenta",
      editWorkspace: "Edytuj przestrzeń roboczą",
      uploadDocument: "Załaduj dokument",
    },
    quickLinks: {
      title: "Szybkie akcje",
      sendChat: "Wyślij wiadomość",
      embedDocument: "Dodaj swoje dane",
      createWorkspace: "Utwórz obszar roboczy",
    },
    exploreMore: {
      title: "Poznaj więcej funkcji",
      features: {
        customAgents: {
          title: "Niestandardowi agenci AI",
          description:
            "Twórz potężnych agentów AI i automatyzacje bez użycia kodu.",
          primaryAction: "Czat przy użyciu @agent",
          secondaryAction: "Zbuduj Agents Flow",
        },
        slashCommands: {
          title: "Polecenia slash",
          description:
            "Oszczędzaj czas i dodawaj prompty dzięki niestandardowym poleceniom slash.",
          primaryAction: "Utwórz polecenie slash",
          secondaryAction: "Przeglądaj Community Hub",
        },
        systemPrompts: {
          title: "Instrukcje systemowe",
          description:
            "Zmodyfikuj instrukcję systemową, aby dostosować odpowiedzi AI.",
          primaryAction: "Modyfikuj instrukcję systemową",
          secondaryAction: "Zarządzaj zmiennymi",
        },
      },
    },
    announcements: {
      title: "Aktualizacje i ogłoszenia",
    },
    resources: {
      title: "Zasoby",
      links: {
        docs: "Dokumenty",
        star: "Star on GitHub",
      },
      keyboardShortcuts: "Skróty klawiaturowe",
    },
  },
  "new-workspace": {
    title: "Nowy obszar roboczy",
    placeholder: "Mój obszar roboczy",
  },
  "workspaces—settings": {
    general: "Ustawienia ogólne",
    chat: "Ustawienia czatu",
    vector: "Wektorowa baza danych",
    members: "Członkowie",
    agent: "Konfiguracja agenta",
  },
  general: {
    vector: {
      title: "Liczba wektorów",
      description: "Całkowita liczba wektorów w bazie danych wektorów.",
    },
    names: {
      description:
        "Spowoduje to jedynie zmianę wyświetlanej nazwy obszaru roboczego.",
    },
    message: {
      title: "Sugerowane wiadomości na czacie",
      description: "Dostosuj wiadomości, które będą sugerowane użytkownikom.",
      add: "Dodaj nową wiadomość",
      save: "Zapisz wiadomości",
      heading: "Wyjaśnij mi",
      body: "Korzyści z AnythingLLM",
    },
    pfp: {
      title: "Logo obszaru roboczego",
      description: "Dostosuj logo asystenta dla tego obszaru roboczego.",
      image: "Logo obszaru roboczego",
      remove: "Usuń logo obszaru roboczego",
    },
    delete: {
      title: "Usuń obszar roboczy",
      description:
        "Usuń ten obszar roboczy i wszystkie jego dane. Spowoduje to usunięcie obszaru roboczego dla wszystkich użytkowników.",
      delete: "Usuń obszar roboczy",
      deleting: "Usuwanie obszaru roboczego...",
      "confirm-start": "Zamierzasz usunąć cały swój",
      "confirm-end":
        "obszar roboczy. Spowoduje to usunięcie wszystkich danych z wektorowej bazy danych. Oryginalne pliki źródłowe pozostaną nietknięte. Działanie to jest nieodwracalne.",
    },
  },
  chat: {
    llm: {
      title: "Dostawca modeli językowych dla obszaru roboczego",
      description:
        "Konkretny dostawca i model LLM, który będzie używany dla tego obszaru roboczego. Domyślnie używany jest dostawca i model z preferencji systemowych.",
      search: "Wyszukaj wszystkich dostawców LLM",
    },
    model: {
      title: "Model językowy dla obszaru roboczego",
      description:
        "Określony model, który będzie używany w tym obszarze roboczym. Jeśli pole jest puste, użyty zostanie model z preferencji systemowych.",
      wait: "-- oczekiwanie na modele",
    },
    mode: {
      title: "Tryb czatu",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Czat",
        "desc-start": "dostarczy odpowiedzi na podstawie wiedzy ogólnej LLM",
        and: "oraz",
        "desc-end": " znalezionym kontekście (dokumenty, źródła danych)",
      },
      query: {
        title: "Zapytanie (wyszukiwanie)",
        "desc-start": "dostarczy odpowiedzi",
        only: "tylko",
        "desc-end":
          "na podstawie znalezionego kontekstu (dokumenty, źródła danych) - w przeciwnym razie odmówi odpowiedzi.",
      },
    },
    history: {
      title: "Historia czatu",
      "desc-start":
        "Liczba poprzednich wiadomości, które zostaną uwzględnione w pamięci krótkotrwałej",
      recommend: "Zalecane: 20.",
      "desc-end":
        "Więcej niż 45 może prowadzić do problemów z działaniem czatu.",
    },
    prompt: {
      title: "Instrukcja systemowa",
      description:
        "Instrukcja, która będzie używana w tym obszarze roboczym. Zdefiniuj kontekst i instrukcje dla AI. Powinieneś dostarczyć starannie opracowaną instrukcję, aby AI mogło wygenerować odpowiednią i dokładną odpowiedź.",
      history: {
        title: "Historia instrukcji systemowych",
        clearAll: "Wyczyść wszystko",
        noHistory: "Historia instrukcji systemowych nie jest dostępna",
        restore: "Przywróć",
        delete: "Usuń",
        publish: "Opublikuj w Community Hub",
        deleteConfirm: "Czy na pewno chcesz usunąć ten element historii?",
        clearAllConfirm:
          "Czy na pewno chcesz wyczyścić całą historię? Tej czynności nie można cofnąć.",
        expand: "Rozwiń",
      },
    },
    refusal: {
      title: "Tryb zapytania - odpowiedź odmowna",
      "desc-start": "W trybie",
      query: "zapytania (wyszukiwanie)",
      "desc-end":
        "istnieje możliwość zwrócenia niestandardowej odpowiedzi odmownej, w sytuacji gdy nie znaleziono odpowiedniego kontekstu.",
      "tooltip-title": "Dlaczego to widzę?",
      "tooltip-description":
        "Jesteś w trybie zapytań, który wykorzystuje tylko informacje z Twoich dokumentów. Przełącz się do trybu czatu, aby uzyskać bardziej elastyczne rozmowy, lub kliknij tutaj, aby odwiedzić naszą dokumentację i dowiedzieć się więcej o trybach czatu.",
    },
    temperature: {
      title: "Temperatura modelu",
      "desc-start":
        'To ustawienie kontroluje, jak "kreatywne" będą odpowiedzi modelu językowego.',
      "desc-end":
        "Im wyższa liczba, tym większa kreatywność. W przypadku niektórych modeli może to prowadzić do niespójnych odpowiedzi przy zbyt wysokich ustawieniach.",
      hint: "Większość modeli językowych ma różne dopuszczalne zakresy wartości. Informacje na ten temat można uzyskać u dostawcy modelu językowego.",
    },
  },
  "vector-workspace": {
    identifier: "Identyfikator wektorowej bazy danych",
    snippets: {
      title: "Maksymalna liczba fragmentów",
      description:
        "To ustawienie kontroluje maksymalną ilość fragmentów kontekstu, które zostaną wysłane do modelu językowego.",
      recommend: "Zalecane: 4",
    },
    doc: {
      title: "Próg podobieństwa dokumentów",
      description:
        "Minimalny wynik podobieństwa wymagany do uznania źródła za powiązane z czatem. Im wyższa liczba, tym bardziej źródło musi być powiązane z czatem.",
      zero: "Brak ograniczeń",
      low: "Niski (wynik podobieństwa ≥ .25)",
      medium: "Średni (wynik podobieństwa ≥ .50)",
      high: "Wysoki (wynik podobieństwa ≥ .75)",
    },
    reset: {
      reset: "Resetuj bazę wektorową",
      resetting: "Czyszczenie wektorów...",
      confirm:
        "Baza danych wektorów tego obszaru roboczego zostanie zresetowana. Spowoduje to usunięcie wszystkich aktualnie osadzonych wektorów. Oryginalne pliki źródłowe pozostaną nietknięte. Ta czynność jest nieodwracalna.",
      error: "Nie można zresetować bazy danych wektorów obszaru roboczego!",
      success: "Baza danych wektorów obszaru roboczego została zresetowana!",
    },
  },
  agent: {
    "performance-warning":
      "Wydajność modeli LLM, które nie obsługują bezpośrednio wywoływania narzędzi, zależy w dużym stopniu od możliwości i dokładności modelu. Niektóre możliwości mogą być ograniczone lub niefunkcjonalne.",
    provider: {
      title: "Dostawca LLM dla agenta",
      description:
        "Konkretny dostawca i model LLM, który będzie używany dla agenta @agent, w tym obszarze roboczym.",
    },
    mode: {
      chat: {
        title: "Model czatu agenta",
        description:
          "Konkretny model czatu, który będzie używany dla agenta @agent tego obszaru roboczego.",
      },
      title: "Model agenta",
      description:
        "Konkretny model LLM, który będzie używany dla agenta @agent tego obszaru roboczego.",
      wait: "-- oczekiwanie na modele",
    },
    skill: {
      title: "Domyślne umiejętności agenta",
      description:
        "Ulepsz naturalne zdolności domyślnego agenta za pomocą tych gotowych umiejętności. Ta konfiguracja dotyczy wszystkich obszarów roboczych.",
      rag: {
        title: "RAG i pamięć długotrwała",
        description:
          'Pozwól agentowi wykorzystać twoje lokalne dokumenty, aby odpowiedzieć na zapytanie lub poproś agenta o "zapamiętanie" fragmentów treści w celu odzyskania pamięci długoterminowej.',
      },
      view: {
        title: "Wyświetlanie i podsumowywanie dokumentów",
        description:
          "Umożliwienie agentowi wyświetlenia listy i podsumowania zawartości aktualnie osadzonych plików obszaru roboczego.",
      },
      scrape: {
        title: "Pobieranie treści stron internetowych",
        description:
          "Zezwalaj agentowi na odwiedzanie i pobieranie zawartości stron internetowych.",
      },
      generate: {
        title: "Generowanie wykresów",
        description:
          "Pozwól domyślnemu agentowi generować różne typy wykresów na podstawie danych dostarczonych lub podanych na czacie.",
      },
      save: {
        title: "Generowanie i zapisywanie plików w przeglądarce",
        description:
          "Pozwól domyślnemu agentowi generować i zapisywać pliki, które można zapisać i pobrać w przeglądarce.",
      },
      web: {
        title: "Wyszukiwanie i przeglądanie stron internetowych na żywo",
        description:
          "Pozwól swojemu agentowi na wyszukiwanie informacji w Internecie, aby odpowiadał na Twoje pytania, poprzez połączenie z dostawcą usług wyszukiwania (SERP).",
      },
      sql: {
        title: "Połączenie z bazą danych SQL",
        description:
          "Umożliw agentowi korzystanie z języka SQL, aby odpowiadał na Twoje pytania, poprzez połączenie z różnymi dostawcami baz danych SQL.",
      },
      default_skill:
        "Domyślnie, ta umiejętność jest włączona, ale można ją wyłączyć, jeśli nie chcemy, aby była dostępna dla agenta.",
    },
  },
  recorded: {
    title: "Czaty w obszarach roboczych",
    description:
      "Są to wszystkie czaty i wiadomości wysłane przez użytkowników uporządkowane według daty utworzenia.",
    export: "Eksport",
    table: {
      id: "ID",
      by: "Wysłane przez",
      workspace: "Obszar roboczy",
      prompt: "Prompt",
      response: "Odpowiedź",
      at: "Wysłane o",
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
      title: "Preferencje interfejsu użytkownika",
      description: "Ustaw preferencje interfejsu użytkownika dla AnythingLLM.",
    },
    branding: {
      title: "Branding i white-labeling",
      description:
        "Oznakuj swoją instancję AnythingLLM niestandardowym brandingiem.",
    },
    chat: {
      title: "Czat",
      description: "Ustaw preferencje czatu dla AnythingLLM.",
      auto_submit: {
        title: "Automatyczne przesyłanie mowy",
        description: "Automatyczne przesyłanie mowy po wykryciu ciszy.",
      },
      auto_speak: {
        title: "Automatyczne wypowiadanie odpowiedzi",
        description: "Automatycznie wypowiadaj odpowiedzi AI.",
      },
      spellcheck: {
        title: "Włącz sprawdzanie pisowni",
        description:
          "Włącz lub wyłącz sprawdzanie pisowni w polu wprowadzania tekstu.",
      },
    },
    items: {
      theme: {
        title: "Motyw",
        description: "Wybierz preferowany motyw kolorystyczny dla aplikacji.",
      },
      "show-scrollbar": {
        title: "Pokaż pasek przewijania",
        description: "Włącz lub wyłącz pasek przewijania w oknie czatu.",
      },
      "support-email": {
        title: "E-mail wsparcia",
        description:
          "Ustaw adres e-mail, który będzie dostępny dla użytkowników, gdy potrzebują pomocy.",
      },
      "app-name": {
        title: "Nazwa",
        description:
          "Ustawienie nazwy wyświetlanej na stronie logowania dla wszystkich użytkowników.",
      },
      "chat-message-alignment": {
        title: "Wyrównanie wiadomości czatu",
        description:
          "Wybór trybu wyrównania wiadomości podczas korzystania z interfejsu czatu.",
      },
      "display-language": {
        title: "Język",
        description:
          "Wybierz preferowany język interfejsu użytkownika AnythingLLM - jeśli dostępne są tłumaczenia.",
      },
      logo: {
        title: "Logo",
        description:
          "Prześlij swoje niestandardowe logo, aby wyświetlić je na wszystkich stronach.",
        add: "Dodaj niestandardowe logo",
        recommended: "Zalecany rozmiar: 800 x 200",
        remove: "Usuń",
        replace: "Zmień",
      },
      "welcome-messages": {
        title: "Ekran powitalny",
        description:
          "Dostosuj komunikaty wyświetlane użytkownikom na ekranie powitalnym. Będą widoczne tylko dla użytkowników, którzy nie są administratorami.",
        new: "Nowa wiadomość",
        system: "systemu",
        user: "użytkownika",
        message: "wiadomość",
        assistant: "Asystent czatu AnythingLLM",
        "double-click": "Kliknij dwukrotnie, aby edytować...",
        save: "Zapisz wiadomości",
      },
      "browser-appearance": {
        title: "Wygląd przeglądarki",
        description:
          "Dostosuj wygląd karty przeglądarki, gdy aplikacja jest otwarta.",
        tab: {
          title: "Tytuł",
          description:
            "Ustawienie niestandardowego tytułu karty, gdy aplikacja jest otwarta w przeglądarce.",
        },
        favicon: {
          title: "Favicon",
          description:
            "Użyj niestandardowej ikony favicon dla karty przeglądarki.",
        },
      },
      "sidebar-footer": {
        title: "Linki w stopce",
        description: "Dostosuj linki wyświetlane w stopce paska bocznego.",
        icon: "Ikona",
        link: "Link",
      },
      "render-html": {
        title: "Renderowanie HTML w czacie",
        description:
          "Wyświetlanie odpowiedzi w formacie HTML w odpowiedziach asystenta.\nMoże to prowadzić do znacznie wyższej jakości odpowiedzi, ale również wiąże się z potencjalnymi zagrożeniami bezpieczeństwa.",
      },
    },
  },
  api: {
    title: "Klucze API",
    description:
      "Klucze API umożliwiają dostęp do instancji AnythingLLM i zarządzanie nią.",
    link: "Przeczytaj dokumentację API",
    generate: "Generuj nowy klucz API",
    table: {
      key: "Klucz API",
      by: "Utworzony przez",
      created: "Utworzony o",
    },
  },
  llm: {
    title: "Preferencje LLM",
    description:
      "Tutaj skonfigurujesz dostawcę modeli językowych używanych do czatów i embeddingów. Upewnij się, że wszystkie klucze są aktualne i poprawne - bez tego AnythingLLM nie będzie działać.",
    provider: "Dostawca LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Punkt końcowy usługi Azure",
        api_key: "Klucz API",
        chat_deployment_name: "Nazwa wdrożenia czatu",
        chat_model_token_limit: "Limit tokenów modelu czatu",
        model_type: "Typ modelu",
        model_type_tooltip:
          "Jeśli w Państwa systemie używany jest model rozumowania (np. o1, o1-mini, o3-mini), ustaw tę opcję na „Rozumowanie”. W przeciwnym razie, Państwa zapytania w czacie mogą nie działać.",
        default: "Domyślne",
        reasoning: "Uzasadnienie",
      },
    },
  },
  transcription: {
    title: "Preferencje modelu transkrypcji",
    description:
      "Tutaj skonfigurujesz dostawcę modeli używanych do transkrypcji plików audio i wideo. Upewnij się, że klucze są poprawne - bez tego pliki audio nie będą transkrybowane.",
    provider: "Dostawca usług transkrypcji",
    "warn-start":
      "Korzystanie z lokalnego modelu Whisper na komputerach z ograniczoną pamięcią RAM lub procesorem może spowodować przerwanie pracy AnythingLLM podczas przetwarzania plików multimedialnych.",
    "warn-recommend":
      "Zalecana konfiguracja to co najmniej 2 GB pamięci RAM, przesyłaj pliki <10 MB.",
    "warn-end":
      "Wbudowany model zostanie automatycznie pobrany przy pierwszym użyciu.",
  },
  embedding: {
    title: "Preferencje dot. embeddingów",
    "desc-start":
      "W przypadku korzystania z LLM, który nie obsługuje natywnie silnika embeddingów - może być konieczna dodatkowa konfiguracja poświadczeń.",
    "desc-end":
      "Embedding to proces przekształcania tekstu na wektory. Poświadczenia są wymagane do przekształcenia plików i tekstu za pomocą wybranego modelu.",
    provider: {
      title: "Model używany do tworzenia embeddingów",
    },
  },
  text: {
    title: "Preferencje dot. podziału tekstu i dzielenia na fragmenty",
    "desc-start":
      "Czasami może zaistnieć potrzeba zmiany domyślnego sposobu, w jaki nowe dokumenty są dzielone i fragmentowane przed wstawieniem ich do wektorowej bazy danych.",
    "desc-end":
      "Powinieneś modyfikować to ustawienie tylko wtedy, gdy rozumiesz, jak działa dzielenie tekstu i jakie są jego skutki uboczne.",
    size: {
      title: "Rozmiar fragmentu tekstu",
      description:
        "Jest to maksymalna długość znaków, które mogą występować w pojedynczym wektorze.",
      recommend: "Maksymalna długość modelu osadzonego wynosi",
    },
    overlap: {
      title: "Nakładanie się fragmentów tekstu",
      description:
        "Jest to maksymalna liczba nakładających się znaków, które występuje podczas fragmentacji między dwoma sąsiednimi fragmentami tekstu.",
    },
  },
  vector: {
    title: "Wektorowa baza danych",
    description:
      "Tutaj skonfigurujesz wektorową bazę danych dla AnythingLLM. Upewnij się, że wszystkie ustawienia są poprawne.",
    provider: {
      title: "Wektorowa baza danych",
      description: "LanceDB nie wymaga żadnej konfiguracji.",
    },
  },
  embeddable: {
    title: "Osadzone widżety czatu",
    description:
      "Osadzane widżety czatu to publiczne interfejsy czatu, które są powiązane z pojedynczym obszarem roboczym. Umożliwiają one tworzenie przestrzeni roboczych, które następnie można publikować na całym świecie.",
    create: "Utwórz osadzenie",
    table: {
      workspace: "Obszar roboczy",
      chats: "Wysłane wiadomości",
      active: "Aktywne domeny",
      created: "Utworzony",
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
    title: "Historia czatu",
    export: "Eksport",
    description:
      "Są to wszystkie czaty i wiadomości z dowolnego opublikowanego widżetu czatu.",
    table: {
      embed: "Obszar roboczy",
      sender: "Nadawca",
      message: "Wiadomość",
      response: "Odpowiedź",
      at: "Wysłane o",
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
    title: "Bezpieczeństwo",
    multiuser: {
      title: "Tryb wielu użytkowników",
      description:
        "Skonfiguruj swoją instancję do obsługi zespołu, aktywując tryb wielu użytkowników.",
      enable: {
        "is-enable": "Tryb wielu użytkowników jest włączony",
        enable: "Włącz tryb wielu użytkowników",
        description:
          "Domyślnie będziesz jedynym administratorem. Jako administrator będziesz musiał utworzyć konta dla wszystkich nowych użytkowników lub administratorów. Nie zgub hasła, ponieważ tylko administrator może je zresetować.",
        username: "Nazwa użytkownika konta administratora",
        password: "Hasło konta administratora",
      },
    },
    password: {
      title: "Ochrona hasłem",
      description:
        "Chroń swoją instancję AnythingLLM hasłem. Jeśli go zapomnisz, nie ma metody odzyskiwania, więc upewnij się, że zapisałeś to hasło.",
      "password-label": "Hasło instancji",
    },
  },
  event: {
    title: "Dzienniki zdarzeń",
    description: "Wyświetl wszystkie akcje i zdarzenia.",
    clear: "Wyczyść dzienniki zdarzeń",
    table: {
      type: "Typ zdarzenia",
      user: "Użytkownik",
      occurred: "Wystąpiło o",
    },
  },
  privacy: {
    title: "Prywatność i obsługa danych",
    description:
      "Jest to konfiguracja sposobu, w jaki połączeni dostawcy zewnętrzni i AnythingLLM przetwarzają dane użytkownika.",
    llm: "Wybór LLM",
    embedding: "Preferencje dotyczące osadzania",
    vector: "Wektorowa baza danych",
    anonymous: "Włączona anonimowa telemetria",
  },
  connectors: {
    "search-placeholder": "Wyszukaj źródła danych",
    "no-connectors": "Nie znaleziono źródeł danych.",
    obsidian: {
      name: "Obsidian",
      description: "Zaimportuj folder Obsidian jednym kliknięciem.",
      vault_location: "Lokalizacja folderu Obsidian",
      vault_description:
        "Wybierz folder Obsidian, aby zaimportować wszystkie notatki i ich połączenia.",
      selected_files: "Znaleziono {{count}} plików markdown",
      importing: "Importowanie folderu Obsidian...",
      import_vault: "Importuj folder",
      processing_time:
        "Może to trochę potrwać w zależności od wielkości folderu.",
      vault_warning:
        "Aby uniknąć konfliktów, upewnij się, że folder Obsidian nie jest aktualnie otwarty.",
    },
    github: {
      name: "GitHub Repo",
      description:
        "Zaimportuj całe publiczne lub prywatne repozytorium GitHub jednym kliknięciem.",
      URL: "Adres URL repozytorium GitHub",
      URL_explained: "Adres URL repozytorium GitHub, które chcesz pobrać.",
      token: "Token dostępu GitHub",
      optional: "opcjonalny",
      token_explained: "Token dostępu, zapobiegający ograniczeniu szybkości.",
      token_explained_start: "Bez ",
      token_explained_link1: "Osobistego tokenu dostępu ",
      token_explained_middle:
        "API GitHub może ograniczać liczbę plików, które mogą zostać pobrane ze względu na limity szybkości. Utwórz",
      token_explained_link2: " tymczasowy token dostępu",
      token_explained_end: " aby uniknąć tego problemu.",
      ignores: "Ignorowane pliki",
      git_ignore:
        "Lista w formacie .gitignore. Naciśnij enter po każdym wpisie, aby go zapisać.",
      task_explained:
        "Po zakończeniu wszystkie pliki będą dostępne do osadzenia w obszarach roboczych w selektorze dokumentów.",
      branch: "Gałąź, z której mają być pobierane pliki.",
      branch_loading: "-- ładowanie dostępnych gałęzi",
      branch_explained: "Gałąź, z której mają być pobierane pliki.",
      token_information:
        "Bez wypełnienia <b>GitHub Access Token</b> ten konektor danych będzie mógł pobierać tylko pliki <b>z głównego katalogu</b> repozytorium ze względu na ograniczenia szybkości publicznego API GitHub.",
      token_personal:
        "Uzyskaj bezpłatny osobisty token dostępu do konta GitHub tutaj.",
    },
    gitlab: {
      name: "GitLab Repo",
      description:
        "Zaimportuj całe publiczne lub prywatne repozytorium GitLab jednym kliknięciem.",
      URL: "Adres URL repozytorium GitLab",
      URL_explained: "Adres URL repozytorium GitLab, które chcesz pobrać.",
      token: "Token dostępu GitLab",
      optional: "opcjonalny",
      token_explained: "Token dostępu, zapobiegający ograniczeniu szybkości.",
      token_description:
        "Wybierz dodatkowe elementy do pobrania z interfejsu API GitLab.",
      token_explained_start: "Bez ",
      token_explained_link1: "Osobistego tokenu dostępu ",
      token_explained_middle:
        "API GitLab może ograniczyć liczbę plików, które mogą zostać pobrane ze względu na limity szybkości. Utwórz",
      token_explained_link2: " tymczasowy token dostępu",
      token_explained_end: " aby uniknąć tego problemu.",
      fetch_issues: "Pobierz Issues jako Dokumenty",
      ignores: "Ignorowane pliki",
      git_ignore:
        "Lista w formacie .gitignore. Naciśnij enter po każdym wpisie, aby go zapisać.",
      task_explained:
        "Po zakończeniu wszystkie pliki będą dostępne do osadzenia w obszarach roboczych w selektorze dokumentów.",
      branch: "Gałąź, z której chcesz pobierać pliki",
      branch_loading: "-- ładowanie dostępnych gałęzi",
      branch_explained: "Gałąź, z której mają być pobierane pliki.",
      token_information:
        "Bez wypełnienia <b>GitLab Access Token</b> ten konektor danych będzie mógł pobierać tylko pliki <b>z głównego katalogu</b> repozytorium ze względu na ograniczenia szybkości publicznego API GitLab.",
      token_personal:
        "Uzyskaj bezpłatny osobisty token dostępu do konta GitLab tutaj.",
    },
    youtube: {
      name: "Transkrypcja YouTube",
      description: "Zaimportuj transkrypcję całego filmu YouTube z łącza.",
      URL: "Adres URL filmu YouTube",
      URL_explained_start:
        "Wprowadź adres URL dowolnego filmu z YouTube, aby pobrać jego transkrypcję. Film musi zawierać",
      URL_explained_link: " napisy",
      URL_explained_end: ".",
      task_explained:
        "Po zakończeniu transkrypcja będzie dostępna do osadzenia w obszarach roboczych w selektorze dokumentów.",
      language: "Język transkrypcji",
      language_explained: "Wybierz język transkrypcji, którą chcesz pobrać.",
      loading_languages: "-- wczytywanie dostępnych języków",
    },
    "website-depth": {
      name: "Masowe pobieranie zawartości web",
      description:
        "Pobiera treści ze strony internetowej wraz z jej podstronami do określonej głębokości (liczby podstron).",
      URL: "Adres URL witryny",
      URL_explained:
        "Adres URL strony internetowej, z której chcesz pobrać treści.",
      depth: "Głębokość przeszukiwania",
      depth_explained:
        "Określa ile poziomów podstron zostanie przeszukanych począwszy od głównego adresu URL.",
      max_pages: "Maksymalna liczba stron",
      max_pages_explained: "Maksymalna liczba stron do pobrania.",
      task_explained:
        "Po zakończeniu cała pobrana zawartość będzie dostępna do dodania w obszarach roboczych w oknie dodawania danych.",
    },
    confluence: {
      name: "Confluence",
      description: "Zaimportuj całą stronę Confluence jednym kliknięciem.",
      deployment_type: "Rodzaj wdrożenia Confluence",
      deployment_type_explained:
        "Określ, czy instancja Confluence jest hostowana w chmurze Atlassian, czy samodzielnie.",
      base_url: "Bazowy adres URL Confluence",
      base_url_explained: "Jest to podstawowy adres URL Confluence.",
      space_key: "Klucz przestrzeni Confluence",
      space_key_explained:
        "Jest to klucz instancji Confluence. Zwykle zaczyna się od ~",
      username: "Nazwa użytkownika Confluence",
      username_explained: "Nazwa użytkownika Confluence",
      auth_type: "Typ autoryzacji Confluence",
      auth_type_explained:
        "Wybierz typ uwierzytelniania, którego chcesz użyć do uzyskania dostępu do Confluence.",
      auth_type_username: "Nazwa użytkownika i token dostępu",
      auth_type_personal: "Osobisty token dostępu",
      token: "Token dostępu do Confluence",
      token_explained_start:
        "W celu uwierzytelnienia należy podać token dostępu. Token dostępu można wygenerować ",
      token_explained_link: "tutaj",
      token_desc: "Token dostępu",
      pat_token: "Osobisty token dostępu do Confluence",
      pat_token_explained: "Osobisty token dostępu do Confluence.",
      bypass_ssl: "Omijanie weryfikacji certyfikatu SSL",
      bypass_ssl_explained:
        "Włącz tę opcję, aby ominąć weryfikację certyfikatu SSL dla instancji Confluence, które są samodzielnie hostowane i posiadają certyfikat samodzielnie podpisany.",
      task_explained:
        "Po zakończeniu zawartość strony będzie dostępna do osadzenia w obszarach roboczych w selektorze dokumentów.",
    },
    manage: {
      documents: "Dokumenty",
      "data-connectors": "Źródła danych",
      "desktop-only":
        "Edycja tych ustawień jest dostępna tylko w wersji desktopowej. Aby kontynuować, przejdź do tej strony na komputerze.",
      dismiss: "Odrzuć",
      editing: "Edycja",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Moje dokumenty",
      "new-folder": "Nowy folder",
      "search-document": "Wyszukiwanie dokumentu",
      "no-documents": "Brak dokumentów",
      "move-workspace": "Przenieś do obszaru roboczego",
      name: "Nazwa",
      "delete-confirmation":
        "Czy na pewno chcesz usunąć te pliki i foldery? Spowoduje to usunięcie plików z systemu i automatyczne usunięcie ich z istniejących obszarów roboczych. Działanie to nie jest odwracalne.",
      "removing-message":
        "Usuwanie dokumentów {{count}} i folderów {{folderCount}}. Proszę czekać.",
      "move-success": "Pomyślnie przeniesiono {{count}} dokumentów.",
      date: "Data",
      type: "Typ",
      no_docs: "Brak dokumentów",
      select_all: "Wybierz wszystko",
      deselect_all: "Odznacz wszystko",
      remove_selected: "Usuń wybrane",
      costs: "*Jednorazowy koszt dodania danych",
      save_embed: "Zapisz",
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
      "processor-offline": "Procesor dokumentów niedostępny",
      "processor-offline-desc":
        "Nie możemy teraz przesłać plików, ponieważ procesor dokumentów jest w trybie offline. Spróbuj ponownie później.",
      "click-upload": "Kliknij, aby przesłać lub przeciągnij i upuść",
      "file-types":
        "obsługuje pliki tekstowe, csv, arkusze kalkulacyjne, pliki audio i wiele więcej!",
      "or-submit-link": "lub prześlij link",
      "placeholder-link": "https://example.com",
      fetching: "Pobieranie...",
      "fetch-website": "Pobierz zawartość strony",
      "privacy-notice":
        "Pliki zostaną przetworzone w obrębie danej instancji AnythingLLM. Pliki te nie będą udostępniane innym podmiotom.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Czym jest przypinanie dokumentów?",
      pin_explained_block1:
        "Kiedy <b>przypinasz</b> dokument w AnythingLLM, dodamy całą zawartość dokumentu do okna promptu, aby LLM mógł w pełni zrozumieć jego treść.",
      pin_explained_block2:
        "Działa to najlepiej w przypadku <b>dużych modeli kontekstowych</b> lub małych plików, które są krytyczne dla bazy wiedzy.",
      pin_explained_block3:
        "Jeśli domyślnie nie otrzymujesz pożądanych odpowiedzi z AnythingLLM, przypinanie jest świetnym sposobem na uzyskanie wyższej jakości odpowiedzi za jednym kliknięciem.",
      accept: "Ok, rozumiem",
    },
    watching: {
      what_watching: "Do czego służy oglądanie dokumentu?",
      watch_explained_block1:
        "Podczas <b>obserwowania</b> dokumentu w AnythingLLM będziemy <i>automatycznie</i> synchronizować zawartość dokumentu z jego oryginalnym źródłem w regularnych odstępach czasu. Spowoduje to automatyczną aktualizację zawartości w każdym obszarze roboczym, w którym ten plik jest zarządzany.",
      watch_explained_block2:
        "Ta funkcja obsługuje obecnie treści online i nie będzie dostępna dla dokumentów przesyłanych ręcznie.",
      watch_explained_block3_start:
        "Możesz zarządzać obserwowanymi dokumentami z poziomu",
      watch_explained_block3_link: "Menedżer plików",
      watch_explained_block3_end: " widok administratora.",
      accept: "Ok, rozumiem",
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
    welcome: "Witamy w nowym obszarze roboczym.",
    get_started: "Aby rozpocząć",
    get_started_default: "Aby rozpocząć",
    upload: "Prześlij dokument",
    or: "lub",
    attachments_processing: "Załączniki są przetwarzane. Proszę czekać...",
    send_chat: "wyślij wiadomość.",
    send_message: "Wyślij wiadomość",
    attach_file: "Dołącz plik do tego czatu",
    slash: "Wyświetl wszystkie dostępne polecenia slash do czatowania.",
    agents: "Wyświetl wszystkich dostępnych agentów.",
    start_agent_session: "Start agent session",
    text_size: "Zmiana rozmiaru tekstu.",
    microphone: "Wypowiedz swoją prośbę.",
    send: "Wyślij wiadomość do obszaru roboczego",
    tts_speak_message: "Wypowiedz komunikat głosowo",
    copy: "Kopiuj",
    regenerate: "Generuj ponownie",
    regenerate_response: "Wygeneruj ponownie odpowiedź",
    good_response: "Dobra odpowiedź",
    more_actions: "Więcej działań",
    hide_citations: "Ukryj cytaty",
    show_citations: "Pokaż cytaty",
    sources: "Źródła",
    source_count_one: "{{count}} – odniesienie",
    source_count_other: "{{count}} – odnośniki",
    document: "Dokument",
    similarity_match: "mecz",
    pause_tts_speech_message: "Wstrzymaj głosowe wypowiadanie komunikatu",
    fork: "Utwórz rozgałęzienie",
    delete: "Usuń",
    save_submit: "Zapisz i prześlij",
    cancel: "Anuluj",
    submit: "Prześlij",
    edit_prompt: "Edytuj prompt",
    edit_response: "Edytuj odpowiedź",
    edit_info_user:
      '"Wyślij" powoduje ponowne wygenerowanie odpowiedzi przez sztuczną inteligencję. "Zapisz" aktualizuje tylko Twoje wiadomości.',
    edit_info_assistant:
      "Twoje zmiany zostaną zapisane bezpośrednio w tej odpowiedzi.",
    see_less: "Zobacz mniej",
    see_more: "Zobacz więcej",
    at_agent: "@agent",
    default_agent_description: " - domyślny agent dla tego obszaru roboczego.",
    custom_agents_coming_soon: "niestandardowi agenci już wkrótce!",
    preset_reset_description: "Wyczyść historię czatu i rozpocznij nowy czat",
    preset_exit_description: "Zakończ bieżącą sesję z przedstawicielem",
    add_new_preset: " Dodaj nowe polecenie slash",
    add_new: "Dodaj nowe",
    edit: "Edytuj",
    publish: "Opublikować",
    stop_generating: "Przestań generować odpowiedź",
    command: "Polecenie",
    your_command: "twoje-polecenie",
    placeholder_prompt: "Ta treść zostanie dodana przed Twoim pytaniem.",
    description: "Opis",
    placeholder_description: "Stwórz opis swojego polecenia slash.",
    save: "Zapisz",
    small: "Mały",
    normal: "Normalny",
    large: "Duży",
    tools: "Narzędzia",
    slash_commands: "Polecenia w skrócie",
    agent_skills: "Umiejętności agenta",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Przeglądaj",
    text_size_label: "Rozmiar czcionki",
    select_model: "Wybierz model",
    workspace_llm_manager: {
      search: "Wyszukaj dostawców LLM",
      loading_workspace_settings: "Ładowanie ustawień obszaru roboczego...",
      available_models: "Dostępne modele dla {{provider}}",
      available_models_description:
        "Wybierz model, który będzie używany w tym obszarze roboczym.",
      save: "Użyj tego modelu",
      saving: "Ustawienie modelu jako domyślnego dla obszaru roboczego...",
      missing_credentials: "Temu dostawcy brakuje poświadczeń!",
      missing_credentials_description:
        "Kliknij, aby skonfigurować poświadczenia",
    },
  },
  profile_settings: {
    edit_account: "Edytuj konto",
    profile_picture: "Zdjęcie profilowe",
    remove_profile_picture: "Usuń zdjęcie profilowe",
    username: "Nazwa użytkownika",
    new_password: "Nowe hasło",
    password_description: "Hasz do 8 znaków.",
    cancel: "Anuluj",
    update_account: "Zaktualizuj konto",
    theme: "Preferencje dotyczące motywu",
    language: "Preferowany język",
    failed_upload: "Nie udało się przesłać zdjęcia profilowego: {{error}}.",
    upload_success: "Dodano zdjęcie profilowe.",
    failed_remove: "Nie udało się usunąć zdjęcia profilowego: {{error}}.",
    profile_updated: "Profil został zaktualizowany.",
    failed_update_user: "Nie udało się zaktualizować użytkownika: {{error}}.",
    account: "Konto",
    support: "Wsparcie",
    signout: "Wyloguj się",
  },
  "keyboard-shortcuts": {
    title: "Skróty klawiaturowe",
    shortcuts: {
      settings: "Otwórz ustawienia",
      workspaceSettings: "Otwórz ustawienia bieżącego obszaru roboczego",
      home: "Przejdź do strony głównej",
      workspaces: "Zarządzanie obszarami roboczymi",
      apiKeys: "Ustawienia kluczy API",
      llmPreferences: "Preferencje LLM",
      chatSettings: "Ustawienia czatu",
      help: "Pokaż pomoc dotyczącą skrótów klawiaturowych",
      showLLMSelector: "Pokaż selektor LLM obszaru roboczego",
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
        success_title: "Sukces!",
        success_description:
          "Twoja instrukcja systemowa została opublikowana w centrum społeczności!",
        success_thank_you: "Dziękujemy za udostępnienie społeczności!",
        view_on_hub: "Zobacz w Community Hub",
        modal_title: "Opublikuj instrukcję systemową",
        name_label: "Nazwa",
        name_description: "Jest to wyświetlana nazwa instrukcji systemowej.",
        name_placeholder: "Moja instrukcja systemowa",
        description_label: "Opis",
        description_description:
          "To jest opis instrukcji systemowej. Użyj tego, aby opisać cel instrukcji systemowej.",
        tags_label: "Tagi",
        tags_description:
          "Tagi służą do oznaczania instrukcji systemowych w celu łatwiejszego wyszukiwania. Można dodać wiele tagów. Maksymalnie 5 tagów. Maksymalnie 20 znaków na tag.",
        tags_placeholder: "Wpisz i naciśnij Enter, aby dodać tagi",
        visibility_label: "Widoczność",
        public_description:
          "Publiczne instrukcje systemowe są widoczne dla wszystkich.",
        private_description:
          "Prywatne instrukcje systemowe są widoczne tylko dla użytkownika.",
        publish_button: "Opublikuj w Community Hub",
        submitting: "Publikacja...",
        submit: "Opublikuj w Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Jest to rzeczywista instrukcja systemowa, która będzie używana do kierowania LLM.",
        prompt_placeholder: "Wprowadź tutaj instrukcję systemową...",
      },
      agent_flow: {
        public_description:
          "Przepływy agentów publicznych są widoczne dla wszystkich.",
        private_description:
          "Przepływy prywatnych agentów są widoczne tylko dla użytkownika.",
        success_title: "Sukces!",
        success_description:
          "Twój Agent Flow został opublikowany w Community Hub!",
        success_thank_you: "Dziękujemy za udostępnienie społeczności!",
        view_on_hub: "Zobacz w Community Hub",
        modal_title: "Publikowanie przepływu agenta",
        name_label: "Nazwa",
        name_description: "Jest to wyświetlana nazwa przepływu agenta.",
        name_placeholder: "Mój przepływ agenta",
        description_label: "Opis",
        description_description:
          "To jest opis przepływu agenta. Użyj tego, aby opisać cel przepływu agenta.",
        tags_label: "Tagi",
        tags_description:
          "Tagi służą do oznaczania przepływów agentów w celu łatwiejszego wyszukiwania. Można dodać wiele tagów. Maksymalnie 5 tagów. Maksymalnie 20 znaków na tag.",
        tags_placeholder: "Wpisz i naciśnij Enter, aby dodać tagi",
        visibility_label: "Widoczność",
        publish_button: "Opublikuj w Community Hub",
        submitting: "Publikacja...",
        submit: "Opublikuj w Community Hub",
        privacy_note:
          "Przepływy agenta są zawsze przesyłane jako prywatne, aby chronić wszelkie poufne dane. Widoczność można zmienić w Community Hub po opublikowaniu. Przed opublikowaniem upewnij się, że przepływ nie zawiera żadnych poufnych lub prywatnych informacji.",
      },
      slash_command: {
        success_title: "Sukces!",
        success_description:
          "Twoje polecenie slash zostało opublikowane w centrum społeczności!",
        success_thank_you: "Dziękujemy za udostępnienie społeczności!",
        view_on_hub: "Zobacz w Community Hub",
        modal_title: "Publikuj polecenie slash",
        name_label: "Nazwa",
        name_description: "Jest to wyświetlana nazwa polecenia slash.",
        name_placeholder: "Moje polecenie slash",
        description_label: "Opis",
        description_description:
          "To jest opis polecenia slash. Użyj tego, aby opisać cel polecenia slash.",
        command_label: "Polecenie",
        command_description:
          "Jest to polecenie slash, które użytkownicy będą wpisywać, aby uruchomić to ustawienie wstępne.",
        command_placeholder: "moje-polecenie",
        tags_label: "Tagi",
        tags_description:
          "Tagi są używane do oznaczania poleceń slash w celu łatwiejszego wyszukiwania. Można dodać wiele tagów. Maksymalnie 5 tagów. Maksymalnie 20 znaków na tag.",
        tags_placeholder: "Wpisz i naciśnij Enter, aby dodać tagi",
        visibility_label: "Widoczność",
        public_description:
          "Publiczne polecenia slash są widoczne dla wszystkich.",
        private_description:
          "Prywatne polecenia slash są widoczne tylko dla użytkownika.",
        publish_button: "Opublikuj w Community Hub",
        submitting: "Publikacja...",
        prompt_label: "Prompt",
        prompt_description:
          "Jest to tekst zachęty, który zostanie użyty po uruchomieniu polecenia slash.",
        prompt_placeholder: "Wprowadź tutaj swój prompt...",
      },
      generic: {
        unauthenticated: {
          title: "Wymagane uwierzytelnienie",
          description:
            "Przed opublikowaniem elementów należy uwierzytelnić się w centrum społeczności AnythingLLM.",
          button: "Połączenie z centrum społeczności",
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
