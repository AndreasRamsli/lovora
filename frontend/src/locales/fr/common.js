const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Bienvenue",
      getStarted: "Commencer",
    },
    llm: {
      title: "Préférence LLM",
      description:
        "AnythingLLM peut fonctionner avec de nombreux fournisseurs LLM. Ce sera le service qui traitera vos discussions.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Configuration utilisateur",
      description: "Configurez votre accès utilisateur.",
      howManyUsers: "Combien de personnes utiliseront cette instance ?",
      justMe: "Juste moi",
      myTeam: "Mon équipe",
      instancePassword: "Mot de passe de l'instance",
      setPassword: "Définir un mot de passe",
      passwordReq: "Le mot de passe doit contenir au moins 8 caractères.",
      passwordWarn:
        "Conservez ce mot de passe, il n'y a pas de récupération possible.",
      adminUsername: "Nom d'utilisateur administrateur",
      adminPassword: "Mot de passe administrateur",
      adminPasswordReq: "Le mot de passe doit contenir au moins 8 caractères.",
      teamHint:
        "Vous pourrez ajouter d'autres utilisateurs après la configuration initiale.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Gestion des données",
      description:
        "Configurez comment AnythingLLM stocke et traite vos données.",
      settingsHint:
        "Ces paramètres peuvent être modifiés ultérieurement dans les paramètres.",
    },
    survey: {
      title: "Bienvenue",
      description:
        "Aidez-nous à améliorer AnythingLLM en répondant à quelques questions.",
      email: "Adresse e-mail",
      useCase: "Pour quel usage utiliserez-vous AnythingLLM ?",
      useCaseWork: "Pour le travail",
      useCasePersonal: "Pour un usage personnel",
      useCaseOther: "Autre",
      comment: "Comment avez-vous découvert AnythingLLM ?",
      commentPlaceholder: "Recherche, recommandation, Twitter, YouTube, etc.",
      skip: "Ignorer l'enquête",
      thankYou: "Merci pour votre retour !",
    },
    workspace: {
      title: "Créer votre premier espace de travail",
      description:
        "Créez votre premier espace de travail pour commencer à utiliser AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Nom des espaces de travail",
    error: "erreur",
    success: "succès",
    user: "Utilisateur",
    selection: "Sélection du modèle",
    saving: "Enregistrement...",
    save: "Enregistrer les modifications",
    previous: "Page précédente",
    next: "Page suivante",
    optional: "Optionnel",
    yes: "Oui",
    no: "Non",
    search: "Rechercher",
    username_requirements:
      "Le nom d'utilisateur doit comporter entre 2 et 32 caractères, commencer par une lettre minuscule et ne contenir que des lettres minuscules, des chiffres, des tirets bas, des tirets et des points.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Bienvenue",
    chooseWorkspace:
      "Choisissez un espace de travail pour commencer à chatter!",
    notAssigned:
      "Vous n'êtes actuellement pas affecté à aucun espace de travail.\nPour accéder à un espace de travail, veuillez contacter votre administrateur.",
    goToWorkspace: 'Aller à "{{workspace}}"',
  },
  settings: {
    title: "Paramètres de l'instance",
    system: "Préférences système",
    invites: "Invitation",
    users: "Utilisateurs",
    workspaces: "Espaces de travail",
    "workspace-chats": "Chat de l'espace de travail",
    customization: "Apparence",
    interface: "Interface",
    branding: "Personnalisation",
    chat: "Chat",
    "api-keys": "Clés API",
    llm: "Préférence LLM",
    transcription: "Modèle de transcription",
    embedder: "Préférences d'intégration",
    "text-splitting": "Diviseur de texte et découpage",
    "voice-speech": "Voix et Parole",
    "vector-database": "Base de données vectorielle",
    embeds: "Widgets de chat intégrés",
    "embed-chats": "Historique des chats intégrés",
    security: "Sécurité",
    "event-logs": "Journaux d'événements",
    privacy: "Confidentialité et données",
    "ai-providers": "Fournisseurs d'IA",
    "agent-skills": "Compétences de l'agent",
    "community-hub": {
      title: "Centre communautaire",
      trending: "Découvrez les tendances",
      "your-account": "Votre compte",
      "import-item": "Importer",
    },
    admin: "Admin",
    tools: "Outils",
    "system-prompt-variables": "Variables de prompt système",
    "experimental-features": "Fonctionnalités Expérimentales",
    contact: "Contacter le Support",
    "browser-extension": "Extension de navigateur",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "Bienvenue",
      "placeholder-username": "Nom d'utilisateur",
      "placeholder-password": "Mot de passe",
      login: "Connexion",
      validating: "Validation...",
      "forgot-pass": "Mot de passe oublié",
      reset: "Réinitialiser",
    },
    "sign-in": "Connectez-vous à votre compte {{appName}}.",
    "password-reset": {
      title: "Réinitialisation du mot de passe",
      description:
        "Fournissez les informations nécessaires ci-dessous pour réinitialiser votre mot de passe.",
      "recovery-codes": "Codes de récupération",
      "recovery-code": "Code de récupération {{index}}",
      "back-to-login": "Retour à la connexion",
    },
  },
  "main-page": {
    greeting: "Comment puis-je vous aider aujourd'hui ?",
    noWorkspaceError: "Veuillez créer un espace de travail pour commencer.",
    checklist: {
      title: "Liste de démarrage",
      tasksLeft: "tâches restantes",
      completed: "Terminé !",
      dismiss: "Fermer",
      tasks: {
        create_workspace: {
          title: "Créer un espace de travail",
          description:
            "Créez votre premier espace de travail pour organiser vos documents et conversations.",
          action: "Créer",
        },
        send_chat: {
          title: "Envoyer un message",
          description:
            "Démarrez une conversation avec l'IA dans votre espace de travail.",
          action: "Chatter",
        },
        embed_document: {
          title: "Intégrer un document",
          description:
            "Ajoutez des documents à votre espace de travail pour enrichir les réponses de l'IA.",
          action: "Télécharger",
        },
        setup_system_prompt: {
          title: "Configurer le prompt système",
          description:
            "Personnalisez les instructions de l'IA pour votre espace de travail.",
          action: "Configurer",
        },
        define_slash_command: {
          title: "Définir une commande slash",
          description:
            "Créez des raccourcis pour des prompts fréquemment utilisés.",
          action: "Créer",
        },
        visit_community: {
          title: "Visiter la communauté",
          description:
            "Rejoignez la communauté AnythingLLM pour obtenir de l'aide et partager vos expériences.",
          action: "Visiter",
        },
      },
    },
    quickActions: {
      createAgent: "Créer un agent",
      editWorkspace: "Modifier l'espace de travail",
      uploadDocument: "Télécharger un document",
    },
    quickLinks: {
      title: "Accès rapide",
      sendChat: "Envoyer un message",
      embedDocument: "Intégrer un document",
      createWorkspace: "Créer un espace de travail",
    },
    exploreMore: {
      title: "Explorer plus",
      features: {
        customAgents: {
          title: "Agents personnalisés",
          description:
            "Créez des agents IA spécialisés avec des compétences et des comportements personnalisés.",
          primaryAction: "Créer un agent",
          secondaryAction: "En savoir plus",
        },
        slashCommands: {
          title: "Commandes slash",
          description:
            "Créez des raccourcis pour des actions et des prompts fréquemment utilisés.",
          primaryAction: "Créer une commande",
          secondaryAction: "En savoir plus",
        },
        systemPrompts: {
          title: "Prompts système",
          description:
            "Personnalisez les instructions et le comportement de l'IA pour chaque espace de travail.",
          primaryAction: "Configurer",
          secondaryAction: "En savoir plus",
        },
      },
    },
    announcements: {
      title: "Annonces",
    },
    resources: {
      title: "Ressources",
      links: {
        docs: "Documentation",
        star: "Étoiler sur GitHub",
      },
      keyboardShortcuts: "Raccourcis clavier",
    },
  },
  "new-workspace": {
    title: "Nouvel Espace de Travail",
    placeholder: "Mon Espace de Travail",
  },
  "workspaces—settings": {
    general: "Paramètres généraux",
    chat: "Paramètres du chat",
    vector: "Base de données vectorielle",
    members: "Membres",
    agent: "Configuration de l'agent",
  },
  general: {
    vector: {
      title: "Nombre de vecteurs",
      description:
        "Nombre total de vecteurs dans votre base de données vectorielle.",
    },
    names: {
      description:
        "Cela ne changera que le nom d'affichage de votre espace de travail.",
    },
    message: {
      title: "Messages de chat suggérés",
      description:
        "Personnalisez les messages qui seront suggérés aux utilisateurs de votre espace de travail.",
      add: "Ajouter un nouveau message",
      save: "Enregistrer les messages",
      heading: "Expliquez-moi",
      body: "les avantages de AnythingLLM",
    },
    pfp: {
      title: "Image de profil de l'assistant",
      description:
        "Personnalisez l'image de profil de l'assistant pour cet espace de travail.",
      image: "Image de l'espace de travail",
      remove: "Supprimer l'image de l'espace de travail",
    },
    delete: {
      title: "Supprimer l'Espace de Travail",
      description:
        "Supprimer cet espace de travail et toutes ses données. Cela supprimera l'espace de travail pour tous les utilisateurs.",
      delete: "Supprimer l'espace de travail",
      deleting: "Suppression de l'espace de travail...",
      "confirm-start": "Vous êtes sur le point de supprimer votre",
      "confirm-end":
        "espace de travail. Cela supprimera toutes les intégrations vectorielles dans votre base de données vectorielle.\n\nLes fichiers source originaux resteront intacts. Cette action est irréversible.",
    },
  },
  chat: {
    llm: {
      title: "Fournisseur LLM de l'espace de travail",
      description:
        "Le fournisseur et le modèle LLM spécifiques qui seront utilisés pour cet espace de travail. Par défaut, il utilise le fournisseur et les paramètres LLM du système.",
      search: "Rechercher tous les fournisseurs LLM",
    },
    model: {
      title: "Modèle de chat de l'espace de travail",
      description:
        "Le modèle de chat spécifique qui sera utilisé pour cet espace de travail. Si vide, utilisera la préférence LLM du système.",
      wait: "-- en attente des modèles --",
    },
    mode: {
      title: "Mode de chat",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start":
          "fournira des réponses avec les connaissances générales du LLM",
        and: "et",
        "desc-end": "le contexte du document trouvé.",
      },
      query: {
        title: "Requête",
        "desc-start": "fournira des réponses",
        only: "uniquement",
        "desc-end": "si un contexte de document est trouvé.",
      },
    },
    history: {
      title: "Historique des chats",
      "desc-start":
        "Le nombre de chats précédents qui seront inclus dans la mémoire à court terme de la réponse.",
      recommend: "Recommandé: 20.",
      "desc-end":
        "Tout nombre supérieur à 45 risque de provoquer des échecs de chat continus en fonction de la taille du message.",
    },
    prompt: {
      title: "Invite",
      description:
        "L'invite qui sera utilisée sur cet espace de travail. Définissez le contexte et les instructions pour que l'IA génère une réponse. Vous devez fournir une invite soigneusement conçue pour que l'IA puisse générer une réponse pertinente et précise.",
      history: {
        title: "Historique des prompts",
        clearAll: "Tout effacer",
        noHistory: "Aucun historique",
        restore: "Restaurer",
        delete: "Supprimer",
        publish: "Publier",
        deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce prompt ?",
        clearAllConfirm: "Êtes-vous sûr de vouloir effacer tout l'historique ?",
        expand: "Développer",
      },
    },
    refusal: {
      title: "Réponse de refus en mode requête",
      "desc-start": "En mode",
      query: "requête",
      "desc-end":
        ", vous pouvez souhaiter retourner une réponse de refus personnalisée lorsque aucun contexte n'est trouvé.",
      "tooltip-title": "Personnaliser la réponse de refus",
      "tooltip-description":
        "Personnalisez la réponse qui sera affichée lorsque aucun contexte pertinent n'est trouvé dans vos documents.",
    },
    temperature: {
      title: "Température LLM",
      "desc-start":
        "Ce paramètre contrôle le niveau de créativité des réponses de votre LLM.",
      "desc-end":
        "Plus le nombre est élevé, plus la réponse sera créative. Pour certains modèles, cela peut entraîner des réponses incohérentes si la valeur est trop élevée.",
      hint: "La plupart des LLM ont diverses plages acceptables de valeurs valides. Consultez votre fournisseur LLM pour cette information.",
    },
  },
  "vector-workspace": {
    identifier: "Identifiant de la base de données vectorielle",
    snippets: {
      title: "Nombre maximum de contextes",
      description:
        "Ce paramètre contrôle le nombre maximum de contextes qui seront envoyés au LLM par chat ou requête.",
      recommend: "Recommandé: 4",
    },
    doc: {
      title: "Seuil de similarité des documents",
      description:
        "Le score de similarité minimum requis pour qu'une source soit considérée comme liée au chat. Plus le nombre est élevé, plus la source doit être similaire au chat.",
      zero: "Aucune restriction",
      low: "Bas (score de similarité ≥ .25)",
      medium: "Moyen (score de similarité ≥ .50)",
      high: "Élevé (score de similarité ≥ .75)",
    },
    reset: {
      reset: "Réinitialiser la base de données vectorielle",
      resetting: "Effacement des vecteurs...",
      confirm:
        "Vous êtes sur le point de réinitialiser la base de données vectorielle de cet espace de travail. Cela supprimera toutes les intégrations vectorielles actuellement intégrées.\n\nLes fichiers source originaux resteront intacts. Cette action est irréversible.",
      error:
        "La base de données vectorielle de l'espace de travail n'a pas pu être réinitialisée !",
      success:
        "La base de données vectorielle de l'espace de travail a été réinitialisée !",
    },
  },
  agent: {
    "performance-warning":
      "La performance des LLM qui ne supportent pas explicitement l'appel d'outils dépend fortement des capacités et de la précision du modèle. Certaines capacités peuvent être limitées ou non fonctionnelles.",
    provider: {
      title: "Fournisseur LLM de l'agent de l'espace de travail",
      description:
        "Le fournisseur et le modèle LLM spécifiques qui seront utilisés pour l'agent @agent de cet espace de travail.",
    },
    mode: {
      chat: {
        title: "Modèle de chat de l'agent de l'espace de travail",
        description:
          "Le modèle de chat spécifique qui sera utilisé pour l'agent @agent de cet espace de travail.",
      },
      title: "Modèle de l'agent de l'espace de travail",
      description:
        "Le modèle LLM spécifique qui sera utilisé pour l'agent @agent de cet espace de travail.",
      wait: "-- en attente des modèles --",
    },
    skill: {
      title: "Compétences par défaut de l'agent",
      description:
        "Améliorez les capacités naturelles de l'agent par défaut avec ces compétences préconstruites. Cette configuration s'applique à tous les espaces de travail.",
      rag: {
        title: "RAG et mémoire à long terme",
        description:
          "Permettez à l'agent de s'appuyer sur vos documents locaux pour répondre à une requête ou demandez à l'agent de se souvenir de morceaux de contenu pour la récupération de mémoire à long terme.",
      },
      view: {
        title: "Voir et résumer des documents",
        description:
          "Permettez à l'agent de lister et de résumer le contenu des fichiers de l'espace de travail actuellement intégrés.",
      },
      scrape: {
        title: "Récupérer des sites web",
        description:
          "Permettez à l'agent de visiter et de récupérer le contenu des sites web.",
      },
      generate: {
        title: "Générer des graphiques",
        description:
          "Activez l'agent par défaut pour générer différents types de graphiques à partir des données fournies ou données dans le chat.",
      },
      save: {
        title: "Générer et sauvegarder des fichiers dans le navigateur",
        description:
          "Activez l'agent par défaut pour générer et écrire des fichiers qui peuvent être sauvegardés et téléchargés dans votre navigateur.",
      },
      web: {
        title: "Recherche web en direct et navigation",
        description:
          "Permettez à votre agent de rechercher sur le web pour répondre à vos questions en vous connectant à un fournisseur de recherche web (SERP).",
      },
      sql: {
        title: "Connecteur SQL",
        description:
          "Permettez à votre agent d'utiliser SQL pour répondre à vos questions en lui fournissant un accès à divers fournisseurs de bases de données SQL.",
      },
      default_skill:
        "Par défaut, cette fonctionnalité est activée, mais vous pouvez la désactiver si vous ne souhaitez pas qu'elle soit disponible pour l'agent.",
    },
  },
  recorded: {
    title: "Chats de l'espace de travail",
    description:
      "Voici tous les chats et messages enregistrés qui ont été envoyés par les utilisateurs, classés par date de création.",
    export: "Exporter",
    table: {
      id: "Id",
      by: "Envoyé par",
      workspace: "Espace de travail",
      prompt: "Invite",
      response: "Réponse",
      at: "Envoyé à",
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
      title: "Interface",
      description: "Personnalisez l'apparence de l'interface utilisateur.",
    },
    branding: {
      title: "Personnalisation de la marque",
      description: "Personnalisez les éléments de marque de votre instance.",
    },
    chat: {
      title: "Chat",
      description: "Personnalisez le comportement du chat.",
      auto_submit: {
        title: "Soumission automatique",
        description:
          "Soumet automatiquement le message lorsque vous utilisez la reconnaissance vocale.",
      },
      auto_speak: {
        title: "Lecture automatique",
        description: "Lit automatiquement les réponses de l'IA à haute voix.",
      },
      spellcheck: {
        title: "Correction orthographique",
        description:
          "Active la correction orthographique dans la zone de saisie du chat.",
      },
    },
    items: {
      theme: {
        title: "Thème",
        description: "Sélectionnez votre thème d'interface préféré.",
      },
      "show-scrollbar": {
        title: "Afficher la barre de défilement",
        description: "Affiche la barre de défilement dans l'interface de chat.",
      },
      "support-email": {
        title: "E-mail de support",
        description:
          "Définissez l'adresse e-mail de support affichée aux utilisateurs.",
      },
      "app-name": {
        title: "Nom de l'application",
        description: "Définissez le nom affiché dans l'interface.",
      },
      "chat-message-alignment": {
        title: "Alignement des messages",
        description: "Choisissez l'alignement des messages dans le chat.",
      },
      "display-language": {
        title: "Langue d'affichage",
        description: "Sélectionnez la langue de l'interface utilisateur.",
      },
      logo: {
        title: "Logo",
        description: "Téléchargez votre logo personnalisé.",
        add: "Ajouter un logo personnalisé",
        recommended: "Taille recommandée : 800 x 200",
        remove: "Supprimer",
        replace: "Remplacer",
      },
      "welcome-messages": {
        title: "Messages de bienvenue",
        description:
          "Personnalisez les messages affichés aux nouveaux utilisateurs.",
        new: "Nouveau",
        system: "système",
        user: "utilisateur",
        message: "message",
        assistant: "assistant",
        "double-click": "Double-cliquez pour modifier.",
        save: "Sauvegarder les messages",
      },
      "browser-appearance": {
        title: "Apparence du navigateur",
        description: "Personnalisez l'apparence de l'onglet du navigateur.",
        tab: {
          title: "Titre de l'onglet",
          description:
            "Définissez le titre affiché dans l'onglet du navigateur.",
        },
        favicon: {
          title: "Favicon",
          description:
            "Définissez l'icône affichée dans l'onglet du navigateur.",
        },
      },
      "sidebar-footer": {
        title: "Pied de page de la barre latérale",
        description:
          "Ajoutez des icônes et des liens personnalisés au pied de page de la barre latérale.",
        icon: "URL de l'icône",
        link: "URL de destination",
      },
      "render-html": {
        title: "Rendu HTML",
        description:
          "Autorise le rendu du contenu HTML dans les réponses du chat.",
      },
    },
  },
  api: {
    title: "Clés API",
    description:
      "Les clés API permettent au titulaire d'accéder et de gérer de manière programmatique cette instance AnythingLLM.",
    link: "Lisez la documentation de l'API",
    generate: "Générer une nouvelle clé API",
    table: {
      key: "Clé API",
      by: "Créé par",
      created: "Créé",
    },
  },
  llm: {
    title: "Préférence LLM",
    description:
      "Voici les identifiants et les paramètres de votre fournisseur LLM de chat et d'intégration préféré. Il est important que ces clés soient actuelles et correctes, sinon AnythingLLM ne fonctionnera pas correctement.",
    provider: "Fournisseur LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Point de terminaison du service Azure",
        api_key: "Clé API",
        chat_deployment_name: "Nom du déploiement de chat",
        chat_model_token_limit: "Limite de tokens du modèle de chat",
        model_type: "Type de modèle",
        model_type_tooltip:
          "Si votre déploiement utilise un modèle de raisonnement (o1, o1-mini, o3-mini, etc.), veuillez définir cette option sur « Raisonnement ». Sinon, vos requêtes de conversation pourraient échouer.",
        default: "Par défaut",
        reasoning: "Raisonnement",
      },
    },
  },
  transcription: {
    title: "Préférence du modèle de transcription",
    description:
      "Voici les identifiants et les paramètres de votre fournisseur de modèle de transcription préféré. Il est important que ces clés soient actuelles et correctes, sinon les fichiers multimédias et audio ne seront pas transcrits.",
    provider: "Fournisseur de transcription",
    "warn-start":
      "L'utilisation du modèle local whisper sur des machines avec une RAM ou un CPU limités peut bloquer AnythingLLM lors du traitement des fichiers multimédias.",
    "warn-recommend":
      "Nous recommandons au moins 2 Go de RAM et des fichiers téléchargés <10 Mo.",
    "warn-end":
      "Le modèle intégré se téléchargera automatiquement lors de la première utilisation.",
  },
  embedding: {
    title: "Préférence d'intégration",
    "desc-start":
      "Lorsque vous utilisez un LLM qui ne supporte pas nativement un moteur d'intégration - vous devrez peut-être spécifier en plus des identifiants pour intégrer le texte.",
    "desc-end":
      "L'intégration est le processus de transformation du texte en vecteurs. Ces identifiants sont nécessaires pour transformer vos fichiers et invites en un format que AnythingLLM peut utiliser pour traiter.",
    provider: {
      title: "Fournisseur d'intégration",
    },
  },
  text: {
    title: "Préférences de division et de découpage du texte",
    "desc-start":
      "Parfois, vous voudrez peut-être changer la façon dont les nouveaux documents sont divisés et découpés avant d'être insérés dans votre base de données vectorielle.",
    "desc-end":
      "Vous ne devez modifier ce paramètre que si vous comprenez comment fonctionne la division du texte et ses effets secondaires.",
    size: {
      title: "Taille des segments de texte",
      description:
        "C'est la longueur maximale de caractères pouvant être présents dans un seul vecteur.",
      recommend: "Longueur maximale du modèle d'intégration est",
    },
    overlap: {
      title: "Chevauchement des segments de texte",
      description:
        "C'est le chevauchement maximal de caractères qui se produit pendant le découpage entre deux segments de texte adjacents.",
    },
  },
  vector: {
    title: "Base de données vectorielle",
    description:
      "Voici les identifiants et les paramètres de fonctionnement de votre instance AnythingLLM. Il est important que ces clés soient actuelles et correctes.",
    provider: {
      title: "Fournisseur de base de données vectorielle",
      description: "Aucune configuration n'est nécessaire pour LanceDB.",
    },
  },
  embeddable: {
    title: "Widgets de chat intégrables",
    description:
      "Les widgets de chat intégrables sont des interfaces de chat publiques associées à un espace de travail unique. Ils vous permettent de créer des espaces de travail que vous pouvez ensuite publier dans le monde entier.",
    create: "Créer un widget intégré",
    table: {
      workspace: "Espace de travail",
      chats: "Chats envoyés",
      active: "Domaines actifs",
      created: "Créé le",
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
    title: "Chats intégrés",
    export: "Exporter",
    description:
      "Voici tous les chats et messages enregistrés de tout widget intégré que vous avez publié.",
    table: {
      embed: "Intégration",
      sender: "Expéditeur",
      message: "Message",
      response: "Réponse",
      at: "Envoyé à",
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
    title: "Sécurité",
    multiuser: {
      title: "Mode multi-utilisateurs",
      description:
        "Configurez votre instance pour prendre en charge votre équipe en activant le mode multi-utilisateurs.",
      enable: {
        "is-enable": "Le mode multi-utilisateurs est activé",
        enable: "Activer le mode multi-utilisateurs",
        description:
          "Par défaut, vous serez le seul administrateur. En tant qu'administrateur, vous devrez créer des comptes pour tous les nouveaux utilisateurs ou administrateurs. Ne perdez pas votre mot de passe car seul un utilisateur administrateur peut réinitialiser les mots de passe.",
        username: "Nom d'utilisateur du compte administrateur",
        password: "Mot de passe du compte administrateur",
      },
    },
    password: {
      title: "Protection par mot de passe",
      description:
        "Protégez votre instance AnythingLLM avec un mot de passe. Si vous oubliez ce mot de passe, il n'y a pas de méthode de récupération, donc assurez-vous de le sauvegarder.",
      "password-label": "Mot de passe de l'instance",
    },
  },
  event: {
    title: "Journaux d'événements",
    description:
      "Consultez toutes les actions et événements se produisant sur cette instance pour la surveillance.",
    clear: "Effacer les journaux d'événements",
    table: {
      type: "Type d'événement",
      user: "Utilisateur",
      occurred: "Survenu à",
    },
  },
  privacy: {
    title: "Confidentialité et gestion des données",
    description:
      "Voici votre configuration pour la gestion des données et des fournisseurs tiers connectés avec AnythingLLM.",
    llm: "Sélection LLM",
    embedding: "Préférence d'intégration",
    vector: "Base de données vectorielle",
    anonymous: "Télémétrie anonyme activée",
  },
  connectors: {
    "search-placeholder": "Rechercher des connecteurs de données",
    "no-connectors": "Aucun connecteur de données trouvé.",
    obsidian: {
      name: "Coffre Obsidian",
      description: "Importez un coffre Obsidian depuis votre machine locale.",
      vault_location: "Emplacement du coffre",
      vault_description:
        "Sélectionnez le dossier racine de votre coffre Obsidian.",
      selected_files: "fichiers sélectionnés",
      importing: "Importation...",
      import_vault: "Importer le coffre",
      processing_time:
        "Le traitement peut prendre quelques minutes selon la taille du coffre.",
      vault_warning:
        "Assurez-vous de sélectionner le dossier racine contenant le dossier .obsidian.",
    },
    github: {
      name: "Dépôt GitHub",
      description: "Importez un dépôt GitHub entier en un seul clic.",
      URL: "URL du dépôt GitHub",
      URL_explained: "URL du dépôt GitHub que vous souhaitez collecter.",
      token: "Jeton d'accès GitHub",
      optional: "Optionnel",
      token_explained: "Jeton d'accès pour les dépôts privés.",
      token_explained_start:
        "Sans jeton d'accès, vous ne pourrez collecter que les dépôts publics. Vous pouvez",
      token_explained_link1: "créer un jeton d'accès temporaire",
      token_explained_middle: "ou",
      token_explained_link2: "en créer un ici",
      token_explained_end: "avec la portée 'repo'.",
      ignores: "Exclusions de fichiers",
      git_ignore:
        "Liste au format .gitignore pour exclure des fichiers de la collecte. Appuyez sur Entrée après chaque entrée.",
      task_explained:
        "Une fois terminé, tous les fichiers seront disponibles pour être intégrés dans les espaces de travail dans le menu de documents.",
      branch: "Branche",
      branch_loading: "-- chargement des branches disponibles --",
      branch_explained: "Branche à collecter.",
      token_information: "Informations sur le jeton",
      token_personal:
        "Créez un jeton d'accès personnel sur GitHub pour accéder aux dépôts privés.",
    },
    gitlab: {
      name: "Dépôt GitLab",
      description: "Importez un dépôt GitLab entier en un seul clic.",
      URL: "URL du dépôt GitLab",
      URL_explained: "URL du dépôt GitLab que vous souhaitez collecter.",
      token: "Jeton d'accès GitLab",
      optional: "Optionnel",
      token_explained: "Jeton d'accès pour les dépôts privés.",
      token_description:
        "Sélectionnez les portées d'accès au dépôt lors de la création du jeton.",
      token_explained_start:
        "Sans jeton d'accès, vous ne pourrez collecter que les dépôts publics. Vous pouvez",
      token_explained_link1: "créer un jeton d'accès temporaire",
      token_explained_middle: "ou",
      token_explained_link2: "en créer un ici",
      token_explained_end: "avec la portée 'read_repository'.",
      fetch_issues: "Récupérer les issues GitLab",
      ignores: "Exclusions de fichiers",
      git_ignore:
        "Liste au format .gitignore pour exclure des fichiers de la collecte. Appuyez sur Entrée après chaque entrée.",
      task_explained:
        "Une fois terminé, tous les fichiers seront disponibles pour être intégrés dans les espaces de travail dans le menu de documents.",
      branch: "Branche",
      branch_loading: "-- chargement des branches disponibles --",
      branch_explained: "Branche à collecter.",
      token_information: "Informations sur le jeton",
      token_personal:
        "Créez un jeton d'accès personnel sur GitLab pour accéder aux dépôts privés.",
    },
    youtube: {
      name: "Transcription YouTube",
      description:
        "Importez la transcription d'une vidéo YouTube à partir d'un lien.",
      URL: "URL de la vidéo YouTube",
      URL_explained_start:
        "Entrez l'URL d'une vidéo YouTube pour récupérer sa transcription. La vidéo doit avoir les",
      URL_explained_link: "sous-titres activés",
      URL_explained_end: ".",
      task_explained:
        "Une fois terminé, la transcription sera disponible pour être intégrée dans les espaces de travail dans le menu de documents.",
      language: "Langue de la transcription",
      language_explained:
        "Sélectionnez la langue de la transcription à récupérer.",
      loading_languages: "-- chargement des langues disponibles --",
    },
    "website-depth": {
      name: "Récupération de site web en masse",
      description:
        "Récupérez un site web et ses sous-liens jusqu'à une certaine profondeur.",
      URL: "URL du site web",
      URL_explained: "URL du site web que vous souhaitez récupérer.",
      depth: "Profondeur de récupération",
      depth_explained:
        "Nombre de niveaux de sous-liens à suivre à partir de l'URL de base.",
      max_pages: "Nombre maximum de pages",
      max_pages_explained: "Nombre maximum de pages à récupérer.",
      task_explained:
        "Une fois terminé, toutes les pages récupérées seront disponibles pour être intégrées dans les espaces de travail dans le menu de documents.",
    },
    confluence: {
      name: "Confluence",
      description: "Importez un espace Confluence entier en un seul clic.",
      deployment_type: "Type de déploiement Confluence",
      deployment_type_explained:
        "Choisissez si votre instance Confluence est hébergée dans le cloud ou sur serveur.",
      base_url: "URL de base Confluence",
      base_url_explained: "L'URL de base de votre instance Confluence.",
      space_key: "Clé de l'espace Confluence",
      space_key_explained:
        "La clé de l'espace que vous souhaitez importer. Se trouve généralement dans l'URL de l'espace.",
      username: "Nom d'utilisateur Confluence",
      username_explained:
        "Votre nom d'utilisateur ou adresse e-mail Confluence.",
      auth_type: "Type d'authentification",
      auth_type_explained:
        "Choisissez le type de jeton utilisé pour l'authentification.",
      auth_type_username: "Jeton API (nom d'utilisateur + jeton)",
      auth_type_personal: "Jeton d'accès personnel (PAT)",
      token: "Jeton API Confluence",
      token_explained_start:
        "Un jeton API est requis pour l'authentification. Vous pouvez",
      token_explained_link: "générer un jeton API ici",
      token_desc: "Jeton API pour l'authentification.",
      pat_token: "Jeton d'accès personnel",
      pat_token_explained:
        "Jeton d'accès personnel pour l'authentification sur les déploiements serveur.",
      bypass_ssl: "Ignorer la vérification SSL",
      bypass_ssl_explained:
        "Ignorez la vérification des certificats SSL pour les instances auto-hébergées avec des certificats auto-signés.",
      task_explained:
        "Une fois terminé, toutes les pages de l'espace seront disponibles pour être intégrées dans les espaces de travail dans le menu de documents.",
    },
    manage: {
      documents: "Documents",
      "data-connectors": "Connecteurs de données",
      "desktop-only":
        "Cette fonctionnalité n'est disponible que sur ordinateur de bureau.",
      dismiss: "Fermer",
      editing: "Modification",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Mes documents",
      "new-folder": "Nouveau dossier",
      "search-document": "Rechercher un document",
      "no-documents": "Aucun document",
      "move-workspace": "Déplacer vers l'espace de travail",
      name: "Nom",
      "delete-confirmation":
        "Êtes-vous sûr de vouloir supprimer ces fichiers et dossiers ?\nCela supprimera les fichiers du système et les retirera automatiquement de tout espace de travail existant.\nCette action est irréversible.",
      "removing-message":
        "Suppression de {{count}} documents et dossiers. Veuillez patienter.",
      "move-success": "{{count}} documents déplacés avec succès.",
      date: "Date",
      type: "Type",
      no_docs: "Aucun document",
      select_all: "Tout sélectionner",
      deselect_all: "Tout désélectionner",
      remove_selected: "Supprimer la sélection",
      costs: "Coûts",
      save_embed: "Sauvegarder et intégrer",
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
      "processor-offline": "Processeur de documents hors ligne",
      "processor-offline-desc":
        "Nous ne pouvons pas télécharger vos fichiers pour le moment. Veuillez réessayer plus tard.",
      "click-upload": "Cliquez pour télécharger ou glissez-déposez",
      "file-types":
        "prend en charge les fichiers texte, CSV, feuilles de calcul, fichiers audio, et plus encore !",
      "or-submit-link": "ou soumettre un lien",
      "placeholder-link": "https://exemple.com",
      fetching: "Récupération...",
      "fetch-website": "Récupérer le site web",
      "privacy-notice":
        "Ces fichiers seront téléchargés sur cette instance AnythingLLM uniquement.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Qu'est-ce que l'épinglage de documents ?",
      pin_explained_block1:
        "Lorsque vous épinglez un document, AnythingLLM injectera le contenu intégral du document dans votre fenêtre de prompt comme contexte préalable pour chaque interaction.",
      pin_explained_block2:
        "Ceci est idéal pour les documents que vous souhaitez référencer fréquemment ou pour fournir un contexte constant à l'IA.",
      pin_explained_block3:
        "L'épinglage fonctionne mieux avec des documents plus petits. Les documents volumineux peuvent affecter les performances.",
      accept: "J'ai compris",
    },
    watching: {
      what_watching: "Qu'est-ce que la surveillance de documents ?",
      watch_explained_block1:
        "Lorsque vous surveillez un document, AnythingLLM re-synchronisera automatiquement le contenu du document depuis sa source de manière périodique.",
      watch_explained_block2:
        "Cela gardera le contenu à jour si le fichier source change.",
      watch_explained_block3_start:
        "Cette fonctionnalité est actuellement limitée à",
      watch_explained_block3_link: "certains types de fichiers",
      watch_explained_block3_end: ".",
      accept: "J'ai compris",
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
    welcome: "Bienvenue dans votre nouvel espace de travail.",
    get_started: "Pour commencer, vous pouvez",
    get_started_default:
      "Pour commencer, envoyez un message ou téléchargez un document.",
    upload: "téléverser un document",
    or: "ou",
    attachments_processing:
      "Les pièces jointes sont en cours de traitement. Veuillez attendre avant d'envoyer un autre message.",
    send_chat: "envoyer un message",
    send_message: "Envoyer un message",
    attach_file: "Joindre un fichier",
    slash: "Voir les commandes slash disponibles",
    agents: "Voir les agents disponibles",
    start_agent_session: "Start agent session",
    text_size: "Modifier la taille du texte",
    microphone: "Enregistrer un message vocal",
    send: "Envoyer le message au chatbot",
    tts_speak_message: "Écouter le message",
    copy: "Copier",
    regenerate: "Régénérer",
    regenerate_response: "Régénérer la réponse",
    good_response: "Bonne réponse",
    more_actions: "Plus d'actions",
    hide_citations: "Masquer les citations",
    show_citations: "Afficher les citations",
    sources: "Sources",
    source_count_one: "{{count}} référence",
    source_count_other: "Références à {{count}}",
    document: "Document",
    similarity_match: "match",
    pause_tts_speech_message: "Mettre en pause la lecture vocale",
    fork: "Dupliquer",
    delete: "Supprimer",
    save_submit: "Sauvegarder et envoyer",
    cancel: "Annuler",
    submit: "Soumettre",
    edit_prompt: "Modifier le prompt",
    edit_response: "Modifier la réponse",
    edit_info_user:
      '"Soumettre" permet de régénérer la réponse de l\'IA. "Enregistrer" met uniquement à jour votre message.',
    edit_info_assistant:
      "Vos modifications seront enregistrées directement dans cette réponse.",
    see_less: "Voir moins",
    see_more: "Voir plus",
    at_agent: "@agent",
    default_agent_description: "l'agent par défaut de cet espace de travail",
    custom_agents_coming_soon: "Agents personnalisés bientôt disponibles",
    preset_reset_description:
      "Efface l'historique du chat actuel et commence une nouvelle conversation.",
    preset_exit_description: "Arrêter la session actuelle de l'agent",
    add_new_preset: "Ajouter une nouvelle commande preset",
    add_new: "Ajouter",
    edit: "Modifier",
    publish: "Publier",
    stop_generating: "Arrêtez de générer des réponses",
    command: "Commande",
    your_command: "Votre commande",
    placeholder_prompt: "Quel est le prompt pour cette commande ?",
    description: "Description",
    placeholder_description: "Décrivez ce que fait cette commande",
    save: "Sauvegarder",
    small: "Petit",
    normal: "Normal",
    large: "Grand",
    tools: "Outils",
    slash_commands: "Commandes abrégées",
    agent_skills: "Compétences des agents",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Parcourir",
    text_size_label: "Taille du texte",
    select_model: "Sélectionner le modèle",
    workspace_llm_manager: {
      search: "Rechercher des modèles",
      loading_workspace_settings:
        "Chargement des paramètres de l'espace de travail...",
      available_models: "Modèles disponibles",
      available_models_description:
        "Sélectionnez un modèle à utiliser pour cet espace de travail.",
      save: "Sauvegarder",
      saving: "Sauvegarde...",
      missing_credentials: "Identifiants manquants",
      missing_credentials_description:
        "Vous devez configurer vos identifiants de fournisseur LLM avant de pouvoir sélectionner un modèle.",
    },
  },
  profile_settings: {
    edit_account: "Modifier le compte",
    profile_picture: "Photo de profil",
    remove_profile_picture: "Supprimer la photo de profil",
    username: "Nom d'utilisateur",
    new_password: "Nouveau mot de passe",
    password_description:
      "Le mot de passe doit contenir au moins 8 caractères.",
    cancel: "Annuler",
    update_account: "Mettre à jour le compte",
    theme: "Thème",
    language: "Langue",
    failed_upload: "Échec du téléchargement de l'image.",
    upload_success: "Image téléchargée avec succès.",
    failed_remove: "Échec de la suppression de l'image.",
    profile_updated: "Profil mis à jour avec succès.",
    failed_update_user: "Échec de la mise à jour de l'utilisateur.",
    account: "Compte",
    support: "Support",
    signout: "Déconnexion",
  },
  "keyboard-shortcuts": {
    title: "Raccourcis clavier",
    shortcuts: {
      settings: "Ouvrir les paramètres",
      workspaceSettings: "Paramètres de l'espace de travail",
      home: "Retour à l'accueil",
      workspaces: "Afficher les espaces de travail",
      apiKeys: "Gérer les clés API",
      llmPreferences: "Préférences LLM",
      chatSettings: "Paramètres du chat",
      help: "Afficher l'aide",
      showLLMSelector: "Afficher le sélecteur de LLM",
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
        success_title: "Prompt publié avec succès !",
        success_description:
          "Votre prompt système a été publié sur le Community Hub.",
        success_thank_you: "Merci pour votre contribution !",
        view_on_hub: "Voir sur le Hub",
        modal_title: "Publier le prompt système",
        name_label: "Nom",
        name_description: "Un nom descriptif pour votre prompt.",
        name_placeholder: "Mon super prompt",
        description_label: "Description",
        description_description:
          "Décrivez ce que fait votre prompt et comment l'utiliser.",
        tags_label: "Tags",
        tags_description:
          "Ajoutez des tags pour aider les autres à trouver votre prompt.",
        tags_placeholder: "productivité, rédaction, code...",
        visibility_label: "Visibilité",
        public_description: "Visible par tous sur le Community Hub.",
        private_description: "Visible uniquement par vous.",
        publish_button: "Publier",
        submitting: "Publication...",
        submit: "Soumettre",
        prompt_label: "Prompt",
        prompt_description: "Le contenu de votre prompt système.",
        prompt_placeholder: "Vous êtes un assistant IA utile...",
      },
      agent_flow: {
        public_description: "Visible par tous sur le Community Hub.",
        private_description: "Visible uniquement par vous.",
        success_title: "Flux d'agent publié avec succès !",
        success_description:
          "Votre flux d'agent a été publié sur le Community Hub.",
        success_thank_you: "Merci pour votre contribution !",
        view_on_hub: "Voir sur le Hub",
        modal_title: "Publier le flux d'agent",
        name_label: "Nom",
        name_description: "Un nom descriptif pour votre flux d'agent.",
        name_placeholder: "Mon flux d'agent",
        description_label: "Description",
        description_description:
          "Décrivez ce que fait votre flux d'agent et comment l'utiliser.",
        tags_label: "Tags",
        tags_description:
          "Ajoutez des tags pour aider les autres à trouver votre flux.",
        tags_placeholder: "automatisation, productivité...",
        visibility_label: "Visibilité",
        publish_button: "Publier",
        submitting: "Publication...",
        submit: "Soumettre",
        privacy_note:
          "Les flux d'agents peuvent contenir des informations sensibles. Vérifiez le contenu avant de le rendre public.",
      },
      slash_command: {
        success_title: "Commande publiée avec succès !",
        success_description:
          "Votre commande slash a été publiée sur le Community Hub.",
        success_thank_you: "Merci pour votre contribution !",
        view_on_hub: "Voir sur le Hub",
        modal_title: "Publier la commande slash",
        name_label: "Nom",
        name_description: "Un nom descriptif pour votre commande.",
        name_placeholder: "Ma commande",
        description_label: "Description",
        description_description:
          "Décrivez ce que fait votre commande et comment l'utiliser.",
        command_label: "Commande",
        command_description: "La commande slash (sans le /).",
        command_placeholder: "resume",
        tags_label: "Tags",
        tags_description:
          "Ajoutez des tags pour aider les autres à trouver votre commande.",
        tags_placeholder: "productivité, résumé...",
        visibility_label: "Visibilité",
        public_description: "Visible par tous sur le Community Hub.",
        private_description: "Visible uniquement par vous.",
        publish_button: "Publier",
        submitting: "Publication...",
        prompt_label: "Prompt",
        prompt_description: "Le prompt exécuté par cette commande.",
        prompt_placeholder: "Résumez le texte suivant : {{input}}",
      },
      generic: {
        unauthenticated: {
          title: "Connexion requise",
          description:
            "Vous devez vous connecter à votre compte AnythingLLM pour publier sur le Community Hub.",
          button: "Se connecter",
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
