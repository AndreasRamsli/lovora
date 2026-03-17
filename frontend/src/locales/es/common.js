const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Bienvenido a",
      getStarted: "Comenzar",
    },
    llm: {
      title: "Preferencia de LLM",
      description:
        "AnythingLLM puede funcionar con muchos proveedores de LLM. Este será el servicio que gestionará el chat.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Configuración de usuario",
      description: "Configura los ajustes de tu usuario.",
      howManyUsers: "¿Cuántos usuarios utilizarán esta instancia?",
      justMe: "Solo yo",
      myTeam: "Mi equipo",
      instancePassword: "Contraseña de la instancia",
      setPassword: "¿Deseas establecer una contraseña?",
      passwordReq: "Las contraseñas deben tener al menos 8 caracteres.",
      passwordWarn:
        "Es importante guardar esta contraseña porque no hay método de recuperación.",
      adminUsername: "Nombre de usuario del administrador",
      adminPassword: "Contraseña de la cuenta de administrador",
      adminPasswordReq: "Las contraseñas deben tener al menos 8 caracteres.",
      teamHint:
        "Por defecto, serás el único administrador. Una vez completada la incorporación, puedes crear e invitar a otros a ser usuarios o administradores. No pierdas tu contraseña, ya que solo los administradores pueden restablecer las contraseñas.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Manejo de datos y privacidad",
      description:
        "Estamos comprometidos con la transparencia y el control en lo que respecta a tus datos personales.",
      settingsHint:
        "Estos ajustes se pueden reconfigurar en cualquier momento en la configuración.",
    },
    survey: {
      title: "Bienvenido a AnythingLLM",
      description:
        "Ayúdanos a hacer que AnythingLLM se adapte a tus necesidades. Opcional.",
      email: "¿Cuál es tu correo electrónico?",
      useCase: "¿Para qué usarás AnythingLLM?",
      useCaseWork: "Para el trabajo",
      useCasePersonal: "Para uso personal",
      useCaseOther: "Otro",
      comment: "¿Cómo te enteraste de AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, etc. - ¡Haznos saber cómo nos encontraste!",
      skip: "Omitir encuesta",
      thankYou: "¡Gracias por tus comentarios!",
    },
    workspace: {
      title: "Crea tu primer espacio de trabajo",
      description:
        "Crea tu primer espacio de trabajo y comienza a usar AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Nombre de los espacios de trabajo",
    error: "error",
    success: "éxito",
    user: "Usuario",
    selection: "Selección de modelo",
    saving: "Guardando...",
    save: "Guardar cambios",
    previous: "Página anterior",
    next: "Página siguiente",
    optional: "Opcional",
    yes: "Sí",
    no: "No",
    search: "Buscar",
    username_requirements:
      "El nombre de usuario debe tener entre 2 y 32 caracteres, comenzar con una letra minúscula y solo contener letras minúsculas, números, guiones bajos, guiones y puntos.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Bienvenido",
    chooseWorkspace: "Elige un espacio de trabajo para comenzar a chatear!",
    notAssigned:
      "Actualmente no estás asignado a ningún espacio de trabajo.\nPor favor, contacta a tu administrador para solicitar acceso a un espacio de trabajo.",
    goToWorkspace: 'Ir a "{{workspace}}"',
  },
  settings: {
    title: "Ajustes de la instancia",
    system: "Ajustes generales",
    invites: "Invitaciones",
    users: "Usuarios",
    workspaces: "Espacios de trabajo",
    "workspace-chats": "Chats del espacio de trabajo",
    customization: "Personalización",
    interface: "Preferencias de la interfaz de usuario",
    branding: "Marca y marca blanca",
    chat: "Chat",
    "api-keys": "API de desarrollador",
    llm: "LLM",
    transcription: "Transcripción",
    embedder: "Incrustador (Embedder)",
    "text-splitting": "División de texto y fragmentación",
    "voice-speech": "Voz y habla",
    "vector-database": "Base de datos vectorial",
    embeds: "Incrustaciones de chat",
    "embed-chats": "Historial de incrustaciones de chat",
    security: "Seguridad",
    "event-logs": "Registros de eventos",
    privacy: "Privacidad y datos",
    "ai-providers": "Proveedores de IA",
    "agent-skills": "Habilidades del agente",
    "community-hub": {
      title: "Centro comunitario",
      trending: "Explora las tendencias más populares",
      "your-account": "Su cuenta",
      "import-item": "Importar artículo",
    },
    admin: "Administrador",
    tools: "Herramientas",
    "system-prompt-variables": "Variables de prompt del sistema",
    "experimental-features": "Funciones experimentales",
    contact: "Contactar con soporte",
    "browser-extension": "Extensión del navegador",
    "mobile-app": "AnythingLLM Móvil",
  },
  login: {
    "multi-user": {
      welcome: "Bienvenido a",
      "placeholder-username": "Nombre de usuario",
      "placeholder-password": "Contraseña",
      login: "Iniciar sesión",
      validating: "Validando...",
      "forgot-pass": "Olvidé mi contraseña",
      reset: "Restablecer",
    },
    "sign-in": "Inicia sesión en tu cuenta de {{appName}}.",
    "password-reset": {
      title: "Restablecimiento de contraseña",
      description:
        "Proporciona la información necesaria a continuación para restablecer tu contraseña.",
      "recovery-codes": "Códigos de recuperación",
      "recovery-code": "Código de recuperación {{index}}",
      "back-to-login": "Volver al inicio de sesión",
    },
  },
  "main-page": {
    greeting: "¿Cómo puedo ayudarte hoy?",
    noWorkspaceError:
      "Por favor, crea un espacio de trabajo antes de iniciar un chat.",
    checklist: {
      title: "Primeros pasos",
      tasksLeft: "tareas restantes",
      completed:
        "¡Estás en camino de convertirte en un experto en AnythingLLM!",
      dismiss: "cerrar",
      tasks: {
        create_workspace: {
          title: "Crear un espacio de trabajo",
          description: "Crea tu primer espacio de trabajo para comenzar",
          action: "Crear",
        },
        send_chat: {
          title: "Enviar un chat",
          description: "Inicia una conversación con tu asistente de IA",
          action: "Chatear",
        },
        embed_document: {
          title: "Incrustar un documento",
          description: "Agrega tu primer documento a tu espacio de trabajo",
          action: "Incrustar",
        },
        setup_system_prompt: {
          title: "Configurar un prompt del sistema",
          description: "Configura el comportamiento de tu asistente de IA",
          action: "Configurar",
        },
        define_slash_command: {
          title: "Definir un comando de barra",
          description: "Crea comandos personalizados para tu asistente",
          action: "Definir",
        },
        visit_community: {
          title: "Visitar el Centro de la Comunidad",
          description: "Explora los recursos y plantillas de la comunidad",
          action: "Explorar",
        },
      },
    },
    quickActions: {
      createAgent: "Crear un agente",
      editWorkspace: "Editar espacio de trabajo",
      uploadDocument: "Cargar un documento",
    },
    quickLinks: {
      title: "Enlaces rápidos",
      sendChat: "Enviar chat",
      embedDocument: "Incrustar un documento",
      createWorkspace: "Crear espacio de trabajo",
    },
    exploreMore: {
      title: "Explorar más funciones",
      features: {
        customAgents: {
          title: "Agentes de IA personalizados",
          description:
            "Crea potentes agentes y automatizaciones de IA sin código.",
          primaryAction: "Chatear usando @agent",
          secondaryAction: "Crear un flujo de agente",
        },
        slashCommands: {
          title: "Comandos de barra",
          description:
            "Ahorra tiempo e inyecta prompts usando comandos de barra personalizados.",
          primaryAction: "Crear un comando de barra",
          secondaryAction: "Explorar en el Centro",
        },
        systemPrompts: {
          title: "Prompts del sistema",
          description:
            "Modifica el prompt del sistema para personalizar las respuestas de IA de un espacio de trabajo.",
          primaryAction: "Modificar un prompt del sistema",
          secondaryAction: "Administrar variables de prompt",
        },
      },
    },
    announcements: {
      title: "Actualizaciones y anuncios",
    },
    resources: {
      title: "Recursos",
      links: {
        docs: "Documentación",
        star: "Marcar con una estrella en Github",
      },
      keyboardShortcuts: "Atajos de teclado",
    },
  },
  "new-workspace": {
    title: "Nuevo espacio de trabajo",
    placeholder: "Mi espacio de trabajo",
  },
  "workspaces—settings": {
    general: "Ajustes generales",
    chat: "Ajustes de chat",
    vector: "Base de datos vectorial",
    members: "Miembros",
    agent: "Configuración del agente",
  },
  general: {
    vector: {
      title: "Recuento de vectores",
      description: "Número total de vectores en tu base de datos vectorial.",
    },
    names: {
      description:
        "Esto solo cambiará el nombre para mostrar de tu espacio de trabajo.",
    },
    message: {
      title: "Mensajes de chat sugeridos",
      description:
        "Personaliza los mensajes que se sugerirán a los usuarios de tu espacio de trabajo.",
      add: "Agregar nuevo mensaje",
      save: "Guardar mensajes",
      heading: "Explícame",
      body: "los beneficios de AnythingLLM",
    },
    pfp: {
      title: "Imagen de perfil del asistente",
      description:
        "Personaliza la imagen de perfil del asistente para este espacio de trabajo.",
      image: "Imagen del espacio de trabajo",
      remove: "Eliminar imagen del espacio de trabajo",
    },
    delete: {
      title: "Eliminar espacio de trabajo",
      description:
        "Elimina este espacio de trabajo y todos sus datos. Esto eliminará el espacio de trabajo para todos los usuarios.",
      delete: "Eliminar espacio de trabajo",
      deleting: "Eliminando espacio de trabajo...",
      "confirm-start": "Estás a punto de eliminar todo tu",
      "confirm-end":
        "espacio de trabajo. Esto eliminará todas las incrustaciones de vectores en tu base de datos vectorial.\n\nLos archivos fuente originales permanecerán intactos. Esta acción es irreversible.",
    },
  },
  chat: {
    llm: {
      title: "Proveedor de LLM del espacio de trabajo",
      description:
        "El proveedor y modelo de LLM específico que se utilizará para este espacio de trabajo. Por defecto, utiliza el proveedor y la configuración de LLM del sistema.",
      search: "Buscar todos los proveedores de LLM",
    },
    model: {
      title: "Modelo de chat del espacio de trabajo",
      description:
        "El modelo de chat específico que se utilizará para este espacio de trabajo. Si está vacío, utilizará la preferencia de LLM del sistema.",
      wait: "-- esperando modelos --",
    },
    mode: {
      title: "Modo de chat",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Chat",
        "desc-start":
          "proporcionará respuestas con el conocimiento general del LLM",
        and: "y",
        "desc-end": "el contexto del documento que se encuentre.",
      },
      query: {
        title: "Consulta",
        "desc-start": "proporcionará respuestas",
        only: "solo",
        "desc-end": "si se encuentra contexto del documento.",
      },
    },
    history: {
      title: "Historial de chat",
      "desc-start":
        "El número de chats anteriores que se incluirán en la memoria a corto plazo de la respuesta.",
      recommend: "Recomendado 20.",
      "desc-end":
        "Cualquier valor superior a 45 es probable que provoque fallos continuos en el chat dependiendo del tamaño del mensaje.",
    },
    prompt: {
      title: "Prompt del sistema",
      description:
        "El prompt que se utilizará en este espacio de trabajo. Define el contexto y las instrucciones para que la IA genere una respuesta. Debes proporcionar un prompt cuidadosamente elaborado para que la IA pueda generar una respuesta relevante y precisa.",
      history: {
        title: "Historial de prompts del sistema",
        clearAll: "Borrar todo",
        noHistory: "No hay historial de prompts del sistema disponible",
        restore: "Restaurar",
        delete: "Eliminar",
        publish: "Publicar en el Centro de la Comunidad",
        deleteConfirm:
          "¿Estás seguro de que quieres eliminar este elemento del historial?",
        clearAllConfirm:
          "¿Estás seguro de que quieres borrar todo el historial? Esta acción no se puede deshacer.",
        expand: "Expandir",
      },
    },
    refusal: {
      title: "Respuesta de rechazo en modo de consulta",
      "desc-start": "Cuando estés en modo de",
      query: "consulta",
      "desc-end":
        ", es posible que desees devolver una respuesta de rechazo personalizada cuando no se encuentre contexto.",
      "tooltip-title": "¿Por qué veo esto?",
      "tooltip-description":
        "Estás en modo de consulta, que solo utiliza información de tus documentos. Cambia al modo de chat para conversaciones más flexibles, o haz clic aquí para visitar nuestra documentación y obtener más información sobre los modos de chat.",
    },
    temperature: {
      title: "Temperatura del LLM",
      "desc-start":
        'Esta configuración controla cuán "creativas" serán tus respuestas del LLM.',
      "desc-end":
        "Cuanto mayor sea el número, más creativo. Para algunos modelos, esto puede llevar a respuestas incoherentes si se establece un valor demasiado alto.",
      hint: "La mayoría de los LLM tienen varios rangos aceptables de valores válidos. Consulta a tu proveedor de LLM para obtener esa información.",
    },
  },
  "vector-workspace": {
    identifier: "Identificador de la base de datos vectorial",
    snippets: {
      title: "Fragmentos de contexto máximos",
      description:
        "Esta configuración controla la cantidad máxima de fragmentos de contexto que se enviarán al LLM por chat o consulta.",
      recommend: "Recomendado: 4",
    },
    doc: {
      title: "Umbral de similitud de documentos",
      description:
        "La puntuación de similitud mínima requerida para que una fuente se considere relacionada con el chat. Cuanto mayor sea el número, más similar debe ser la fuente al chat.",
      zero: "Sin restricción",
      low: "Bajo (puntuación de similitud ≥ .25)",
      medium: "Medio (puntuación de similitud ≥ .50)",
      high: "Alto (puntuación de similitud ≥ .75)",
    },
    reset: {
      reset: "Restablecer base de datos vectorial",
      resetting: "Borrando vectores...",
      confirm:
        "Estás a punto de restablecer la base de datos vectorial de este espacio de trabajo. Esto eliminará todas las incrustaciones de vectores actualmente incrustadas.\n\nLos archivos fuente originales permanecerán intactos. Esta acción es irreversible.",
      error:
        "¡No se pudo restablecer la base de datos vectorial del espacio de trabajo!",
      success:
        "¡La base de datos vectorial del espacio de trabajo se restableció!",
    },
  },
  agent: {
    "performance-warning":
      "El rendimiento de los LLM que no admiten explícitamente la llamada a herramientas depende en gran medida de las capacidades y la precisión del modelo. Algunas habilidades pueden ser limitadas o no funcionales.",
    provider: {
      title: "Proveedor de LLM del agente del espacio de trabajo",
      description:
        "El proveedor y modelo de LLM específico que se utilizará para el agente @agent de este espacio de trabajo.",
    },
    mode: {
      chat: {
        title: "Modelo de chat del agente del espacio de trabajo",
        description:
          "El modelo de chat específico que se utilizará para el agente @agent de este espacio de trabajo.",
      },
      title: "Modelo de agente del espacio de trabajo",
      description:
        "El modelo de LLM específico que se utilizará para el agente @agent de este espacio de trabajo.",
      wait: "-- esperando modelos --",
    },
    skill: {
      title: "Habilidades predeterminadas del agente",
      description:
        "Mejora las habilidades naturales del agente predeterminado con estas habilidades preconstruidas. Esta configuración se aplica a todos los espacios de trabajo.",
      rag: {
        title: "RAG y memoria a largo plazo",
        description:
          'Permite que el agente aproveche tus documentos locales para responder una consulta o pídele al agente que "recuerde" fragmentos de contenido para la recuperación de memoria a largo plazo.',
      },
      view: {
        title: "Ver y resumir documentos",
        description:
          "Permite que el agente liste y resuma el contenido de los archivos del espacio de trabajo actualmente incrustados.",
      },
      scrape: {
        title: "Extraer sitios web",
        description:
          "Permite que el agente visite y extraiga el contenido de los sitios web.",
      },
      generate: {
        title: "Generar gráficos",
        description:
          "Habilita al agente predeterminado para generar varios tipos de gráficos a partir de datos proporcionados o dados en el chat.",
      },
      save: {
        title: "Generar y guardar archivos en el navegador",
        description:
          "Habilita al agente predeterminado para generar y escribir en archivos que se guardan y se pueden descargar en tu navegador.",
      },
      web: {
        title: "Búsqueda y navegación web en vivo",
        description:
          "Permita que su agente acceda a internet para responder a sus preguntas, conectándolo a un proveedor de búsqueda web (SERP).",
      },
      sql: {
        title: "Conector SQL",
        description:
          "Permita que su agente pueda utilizar SQL para responder a sus preguntas, conectándose con diferentes proveedores de bases de datos SQL.",
      },
      default_skill:
        "Por defecto, esta función está activada, pero puede desactivarla si no desea que esté disponible para el agente.",
    },
  },
  recorded: {
    title: "Chats del espacio de trabajo",
    description:
      "Estos son todos los chats y mensajes grabados que han sido enviados por los usuarios, ordenados por su fecha de creación.",
    export: "Exportar",
    table: {
      id: "ID",
      by: "Enviado por",
      workspace: "Espacio de trabajo",
      prompt: "Prompt",
      response: "Respuesta",
      at: "Enviado el",
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
      title: "Preferencias de la interfaz de usuario",
      description:
        "Establece tus preferencias de la interfaz de usuario para AnythingLLM.",
    },
    branding: {
      title: "Marca y marca blanca",
      description:
        "Personaliza tu instancia de AnythingLLM con tu propia marca.",
    },
    chat: {
      title: "Chat",
      description: "Establece tus preferencias de chat para AnythingLLM.",
      auto_submit: {
        title: "Envío automático de entrada de voz",
        description:
          "Enviar automáticamente la entrada de voz después de un período de silencio",
      },
      auto_speak: {
        title: "Hablar respuestas automáticamente",
        description: "Hablar automáticamente las respuestas de la IA",
      },
      spellcheck: {
        title: "Habilitar corrector ortográfico",
        description:
          "Habilitar o deshabilitar el corrector ortográfico en el campo de entrada del chat",
      },
    },
    items: {
      theme: {
        title: "Tema",
        description:
          "Selecciona tu tema de color preferido para la aplicación.",
      },
      "show-scrollbar": {
        title: "Mostrar barra de desplazamiento",
        description:
          "Habilitar o deshabilitar la barra de desplazamiento en la ventana de chat.",
      },
      "support-email": {
        title: "Correo electrónico de soporte",
        description:
          "Establece la dirección de correo electrónico de soporte a la que los usuarios pueden acceder cuando necesiten ayuda.",
      },
      "app-name": {
        title: "Nombre",
        description:
          "Establece un nombre que se mostrará en la página de inicio de sesión para todos los usuarios.",
      },
      "chat-message-alignment": {
        title: "Alineación de mensajes de chat",
        description:
          "Selecciona el modo de alineación de mensajes cuando utilices la interfaz de chat.",
      },
      "display-language": {
        title: "Idioma de visualización",
        description:
          "Selecciona el idioma preferido para renderizar la interfaz de usuario de AnythingLLM, cuando las traducciones estén disponibles.",
      },
      logo: {
        title: "Logotipo de la marca",
        description:
          "Sube tu logotipo personalizado para mostrarlo en todas las páginas.",
        add: "Agregar un logotipo personalizado",
        recommended: "Tamaño recomendado: 800 x 200",
        remove: "Eliminar",
        replace: "Reemplazar",
      },
      "welcome-messages": {
        title: "Mensajes de bienvenida",
        description:
          "Personaliza los mensajes de bienvenida que se muestran a tus usuarios. Solo los usuarios no administradores verán estos mensajes.",
        new: "Nuevo",
        system: "sistema",
        user: "usuario",
        message: "mensaje",
        assistant: "Asistente de chat de AnythingLLM",
        "double-click": "Doble clic para editar...",
        save: "Guardar mensajes",
      },
      "browser-appearance": {
        title: "Apariencia del navegador",
        description:
          "Personaliza la apariencia de la pestaña y el título del navegador cuando la aplicación está abierta.",
        tab: {
          title: "Título",
          description:
            "Establece un título de pestaña personalizado cuando la aplicación está abierta en un navegador.",
        },
        favicon: {
          title: "Favicon",
          description:
            "Usa un favicon personalizado para la pestaña del navegador.",
        },
      },
      "sidebar-footer": {
        title: "Elementos del pie de página de la barra lateral",
        description:
          "Personaliza los elementos del pie de página que se muestran en la parte inferior de la barra lateral.",
        icon: "Icono",
        link: "Enlace",
      },
      "render-html": {
        title: "Renderizar HTML en el chat",
        description:
          "Generar respuestas en HTML en las respuestas del asistente.\nEsto puede resultar en una mayor calidad de las respuestas, pero también puede generar posibles riesgos de seguridad.",
      },
    },
  },
  api: {
    title: "Claves de API",
    description:
      "Las claves de API permiten al titular acceder y administrar programáticamente esta instancia de AnythingLLM.",
    link: "Leer la documentación de la API",
    generate: "Generar nueva clave de API",
    table: {
      key: "Clave de API",
      by: "Creado por",
      created: "Creado",
    },
  },
  llm: {
    title: "Preferencia de LLM",
    description:
      "Estas son las credenciales y la configuración de tu proveedor preferido de chat e incrustación de LLM. Es importante que estas claves estén actualizadas y sean correctas, de lo contrario, AnythingLLM no funcionará correctamente.",
    provider: "Proveedor de LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Punto de conexión del servicio de Azure",
        api_key: "Clave de API",
        chat_deployment_name: "Nombre de la implementación del chat",
        chat_model_token_limit: "Límite de tokens del modelo de chat",
        model_type: "Tipo de modelo",
        model_type_tooltip:
          'Si su implementación utiliza un modelo de razonamiento (o1, o1-mini, o3-mini, etc.), configure esto como "Razonamiento". De lo contrario, sus solicitudes de chat podrían fallar.',
        default: "Predeterminado",
        reasoning: "Razonamiento",
      },
    },
  },
  transcription: {
    title: "Preferencia del modelo de transcripción",
    description:
      "Estas son las credenciales y la configuración de tu proveedor de modelo de transcripción preferido. Es importante que estas claves estén actualizadas y sean correctas, de lo contrario, los archivos multimedia y el audio no se transcribirán.",
    provider: "Proveedor de transcripción",
    "warn-start":
      "El uso del modelo local de Whisper en máquinas con RAM o CPU limitadas puede detener AnythingLLM al procesar archivos multimedia.",
    "warn-recommend":
      "Recomendamos al menos 2 GB de RAM y subir archivos de menos de 10 MB.",
    "warn-end":
      "El modelo integrado se descargará automáticamente en el primer uso.",
  },
  embedding: {
    title: "Preferencia de incrustación",
    "desc-start":
      "Cuando se utiliza un LLM que no admite de forma nativa un motor de incrustación, es posible que debas especificar credenciales adicionales para la incrustación de texto.",
    "desc-end":
      "La incrustación es el proceso de convertir texto en vectores. Estas credenciales son necesarias para convertir tus archivos y prompts en un formato que AnythingLLM pueda usar para procesar.",
    provider: {
      title: "Proveedor de incrustación",
    },
  },
  text: {
    title: "Preferencias de división de texto y fragmentación",
    "desc-start":
      "A veces, es posible que desees cambiar la forma predeterminada en que se dividen y fragmentan los nuevos documentos antes de insertarlos en tu base de datos vectorial.",
    "desc-end":
      "Solo debes modificar esta configuración si comprendes cómo funciona la división de texto y sus efectos secundarios.",
    size: {
      title: "Tamaño del fragmento de texto",
      description:
        "Esta es la longitud máxima de caracteres que puede estar presente en un solo vector.",
      recommend: "La longitud máxima del modelo de incrustación es",
    },
    overlap: {
      title: "Superposición de fragmentos de texto",
      description:
        "Esta es la superposición máxima de caracteres que se produce durante la fragmentación entre dos fragmentos de texto adyacentes.",
    },
  },
  vector: {
    title: "Base de datos vectorial",
    description:
      "Estas son las credenciales y la configuración de cómo funcionará tu instancia de AnythingLLM. Es importante que estas claves estén actualizadas y sean correctas.",
    provider: {
      title: "Proveedor de base de datos vectorial",
      description: "No se necesita configuración para LanceDB.",
    },
  },
  embeddable: {
    title: "Widgets de chat incrustables",
    description:
      "Los widgets de chat incrustables son interfaces de chat de cara al público que están vinculadas a un único espacio de trabajo. Estos te permiten crear espacios de trabajo que luego puedes publicar para todo el mundo.",
    create: "Crear incrustación",
    table: {
      workspace: "Espacio de trabajo",
      chats: "Chats enviados",
      active: "Dominios activos",
      created: "Creado",
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
    title: "Historial de chat incrustado",
    export: "Exportar",
    description:
      "Estos son todos los chats y mensajes grabados de cualquier incrustación que hayas publicado.",
    table: {
      embed: "Incrustación",
      sender: "Remitente",
      message: "Mensaje",
      response: "Respuesta",
      at: "Enviado el",
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
    title: "Seguridad",
    multiuser: {
      title: "Modo multiusuario",
      description:
        "Configura tu instancia para que sea compatible con tu equipo activando el modo multiusuario.",
      enable: {
        "is-enable": "El modo multiusuario está habilitado",
        enable: "Habilitar modo multiusuario",
        description:
          "Por defecto, serás el único administrador. Como administrador, deberás crear cuentas para todos los nuevos usuarios o administradores. No pierdas tu contraseña, ya que solo un usuario administrador puede restablecer las contraseñas.",
        username: "Nombre de usuario de la cuenta de administrador",
        password: "Contraseña de la cuenta de administrador",
      },
    },
    password: {
      title: "Protección con contraseña",
      description:
        "Protege tu instancia de AnythingLLM con una contraseña. Si la olvidas, no hay método de recuperación, así que asegúrate de guardar esta contraseña.",
      "password-label": "Contraseña de la instancia",
    },
  },
  event: {
    title: "Registros de eventos",
    description:
      "Ve todas las acciones y eventos que ocurren en esta instancia para su supervisión.",
    clear: "Borrar registros de eventos",
    table: {
      type: "Tipo de evento",
      user: "Usuario",
      occurred: "Ocurrido el",
    },
  },
  privacy: {
    title: "Privacidad y manejo de datos",
    description:
      "Esta es tu configuración sobre cómo los proveedores de terceros conectados y AnythingLLM manejan tus datos.",
    llm: "Selección de LLM",
    embedding: "Preferencia de incrustación",
    vector: "Base de datos vectorial",
    anonymous: "Telemetría anónima habilitada",
  },
  connectors: {
    "search-placeholder": "Buscar conectores de datos",
    "no-connectors": "No se encontraron conectores de datos.",
    obsidian: {
      name: "Obsidian",
      description: "Importa el vault de Obsidian con un solo clic.",
      vault_location: "Ubicación del vault",
      vault_description:
        "Selecciona la carpeta de tu vault de Obsidian para importar todas las notas y sus conexiones.",
      selected_files: "Se encontraron {{count}} archivos markdown",
      importing: "Importando vault...",
      import_vault: "Importar vault",
      processing_time:
        "Esto puede llevar un tiempo dependiendo del tamaño de tu vault.",
      vault_warning:
        "Para evitar conflictos, asegúrate de que tu vault de Obsidian no esté abierto actualmente.",
    },
    github: {
      name: "Repositorio de GitHub",
      description:
        "Importa un repositorio completo de GitHub, público o privado, con un solo clic.",
      URL: "URL del repositorio de GitHub",
      URL_explained: "URL del repositorio de GitHub que deseas recopilar.",
      token: "Token de acceso de GitHub",
      optional: "opcional",
      token_explained:
        "Token de acceso para evitar la limitación de velocidad.",
      token_explained_start: "Sin un ",
      token_explained_link1: "Token de acceso personal",
      token_explained_middle:
        ", la API de GitHub puede limitar el número de archivos que se pueden recopilar debido a los límites de velocidad. Puedes ",
      token_explained_link2: "crear un token de acceso temporal",
      token_explained_end: " para evitar este problema.",
      ignores: "Archivos ignorados",
      git_ignore:
        "Lista en formato .gitignore para ignorar archivos específicos durante la recopilación. Presiona Intro después de cada entrada que quieras guardar.",
      task_explained:
        "Una vez completado, todos los archivos estarán disponibles para incrustar en los espacios de trabajo en el selector de documentos.",
      branch: "Rama de la que deseas recopilar archivos.",
      branch_loading: "-- cargando ramas disponibles --",
      branch_explained: "Rama de la que deseas recopilar archivos.",
      token_information:
        "Sin completar el <b>Token de acceso de GitHub</b>, este conector de datos solo podrá recopilar los archivos de <b>nivel superior</b> del repositorio debido a los límites de velocidad de la API pública de GitHub.",
      token_personal:
        "Obtén un token de acceso personal gratuito con una cuenta de GitHub aquí.",
    },
    gitlab: {
      name: "Repositorio de GitLab",
      description:
        "Importa un repositorio completo de GitLab, público o privado, con un solo clic.",
      URL: "URL del repositorio de GitLab",
      URL_explained: "URL del repositorio de GitLab que deseas recopilar.",
      token: "Token de acceso de GitLab",
      optional: "opcional",
      token_explained:
        "Token de acceso para evitar la limitación de velocidad.",
      token_description:
        "Selecciona entidades adicionales para obtener de la API de GitLab.",
      token_explained_start: "Sin un ",
      token_explained_link1: "Token de acceso personal",
      token_explained_middle:
        ", la API de GitLab puede limitar el número de archivos que se pueden recopilar debido a los límites de velocidad. Puedes ",
      token_explained_link2: "crear un token de acceso temporal",
      token_explained_end: " para evitar este problema.",
      fetch_issues: "Obtener issues como documentos",
      ignores: "Archivos ignorados",
      git_ignore:
        "Lista en formato .gitignore para ignorar archivos específicos durante la recopilación. Presiona Intro después de cada entrada que quieras guardar.",
      task_explained:
        "Una vez completado, todos los archivos estarán disponibles para incrustar en los espacios de trabajo en el selector de documentos.",
      branch: "Rama de la que deseas recopilar archivos",
      branch_loading: "-- cargando ramas disponibles --",
      branch_explained: "Rama de la que deseas recopilar archivos.",
      token_information:
        "Sin completar el <b>Token de acceso de GitLab</b>, este conector de datos solo podrá recopilar los archivos de <b>nivel superior</b> del repositorio debido a los límites de velocidad de la API pública de GitLab.",
      token_personal:
        "Obtén un token de acceso personal gratuito con una cuenta de GitLab aquí.",
    },
    youtube: {
      name: "Transcripción de YouTube",
      description:
        "Importa la transcripción de un vídeo completo de YouTube desde un enlace.",
      URL: "URL del vídeo de YouTube",
      URL_explained_start:
        "Introduce la URL de cualquier vídeo de YouTube para obtener su transcripción. El vídeo debe tener ",
      URL_explained_link: "subtítulos",
      URL_explained_end: " disponibles.",
      task_explained:
        "Una vez completada, la transcripción estará disponible para incrustar en los espacios de trabajo en el selector de documentos.",
      language: "Idioma de la transcripción",
      language_explained:
        "Selecciona el idioma de la transcripción que deseas recopilar.",
      loading_languages: "-- cargando idiomas disponibles --",
    },
    "website-depth": {
      name: "Extractor de enlaces en masa",
      description:
        "Extrae un sitio web y sus subenlaces hasta una cierta profundidad.",
      URL: "URL del sitio web",
      URL_explained: "URL del sitio web que deseas extraer.",
      depth: "Profundidad de rastreo",
      depth_explained:
        "Este es el número de enlaces secundarios que el trabajador debe seguir desde la URL de origen.",
      max_pages: "Páginas máximas",
      max_pages_explained: "Número máximo de enlaces a extraer.",
      task_explained:
        "Una vez completado, todo el contenido extraído estará disponible para incrustar en los espacios de trabajo en el selector de documentos.",
    },
    confluence: {
      name: "Confluence",
      description:
        "Importa una página completa de Confluence con un solo clic.",
      deployment_type: "Tipo de implementación de Confluence",
      deployment_type_explained:
        "Determina si tu instancia de Confluence está alojada en la nube de Atlassian o es autohospedada.",
      base_url: "URL base de Confluence",
      base_url_explained: "Esta es la URL base de tu espacio de Confluence.",
      space_key: "Clave del espacio de Confluence",
      space_key_explained:
        "Esta es la clave de los espacios de tu instancia de Confluence que se utilizará. Generalmente comienza con ~",
      username: "Nombre de usuario de Confluence",
      username_explained: "Tu nombre de usuario de Confluence",
      auth_type: "Tipo de autenticación de Confluence",
      auth_type_explained:
        "Selecciona el tipo de autenticación que deseas usar para acceder a tus páginas de Confluence.",
      auth_type_username: "Nombre de usuario y token de acceso",
      auth_type_personal: "Token de acceso personal",
      token: "Token de acceso de Confluence",
      token_explained_start:
        "Necesitas proporcionar un token de acceso para la autenticación. Puedes generar un token de acceso",
      token_explained_link: "aquí",
      token_desc: "Token de acceso para la autenticación",
      pat_token: "Token de acceso personal de Confluence",
      pat_token_explained: "Tu token de acceso personal de Confluence.",
      bypass_ssl: "Omitir la validación del certificado SSL",
      bypass_ssl_explained:
        "Habilite esta opción para omitir la validación del certificado SSL para instancias de Confluence autohospedadas con certificados auto-firmados.",
      task_explained:
        "Una vez completado, el contenido de la página estará disponible para incrustar en los espacios de trabajo en el selector de documentos.",
    },
    manage: {
      documents: "Documentos",
      "data-connectors": "Conectores de datos",
      "desktop-only":
        "La edición de esta configuración solo está disponible en un dispositivo de escritorio. Accede a esta página en tu escritorio para continuar.",
      dismiss: "Descartar",
      editing: "Editando",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Mis documentos",
      "new-folder": "Nueva carpeta",
      "search-document": "Buscar documento",
      "no-documents": "Sin documentos",
      "move-workspace": "Mover al espacio de trabajo",
      name: "Nombre",
      "delete-confirmation":
        "¿Estás seguro de que quieres eliminar estos archivos y carpetas?\nEsto eliminará los archivos del sistema y los eliminará de cualquier espacio de trabajo existente automáticamente.\nEsta acción no es reversible.",
      "removing-message":
        "Eliminando {{count}} documentos y {{folderCount}} carpetas. Por favor, espera.",
      "move-success": "Se movieron {{count}} documentos con éxito.",
      date: "Fecha",
      type: "Tipo",
      no_docs: "Sin documentos",
      select_all: "Seleccionar todo",
      deselect_all: "Deseleccionar todo",
      remove_selected: "Eliminar seleccionados",
      costs: "*Costo único por incrustaciones",
      save_embed: "Guardar e incrustar",
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
      "processor-offline": "Procesador de documentos no disponible",
      "processor-offline-desc":
        "No podemos subir tus archivos en este momento porque el procesador de documentos no está disponible. Por favor, inténtalo de nuevo más tarde.",
      "click-upload": "Haz clic para subir o arrastra y suelta",
      "file-types":
        "¡soporta archivos de texto, csv, hojas de cálculo, archivos de audio y más!",
      "or-submit-link": "o envía un enlace",
      "placeholder-link": "https://ejemplo.com",
      fetching: "Obteniendo...",
      "fetch-website": "Obtener sitio web",
      "privacy-notice":
        "Estos archivos se subirán al procesador de documentos que se ejecuta en esta instancia de AnythingLLM. Estos archivos no se envían ni se comparten con terceros.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "¿Qué es fijar documentos?",
      pin_explained_block1:
        "Cuando <b>fijas</b> un documento en AnythingLLM, inyectaremos todo el contenido del documento en tu ventana de prompt para que tu LLM lo comprenda por completo.",
      pin_explained_block2:
        "Esto funciona mejor con <b>modelos de gran contexto</b> o archivos pequeños que son críticos para su base de conocimientos.",
      pin_explained_block3:
        "Si no obtienes las respuestas que deseas de AnythingLLM por defecto, fijar es una excelente manera de obtener respuestas de mayor calidad con un clic.",
      accept: "Ok, entendido",
    },
    watching: {
      what_watching: "¿Qué hace observar un documento?",
      watch_explained_block1:
        "Cuando <b>observas</b> un documento en AnythingLLM, sincronizaremos <i>automáticamente</i> el contenido de tu documento desde su fuente original a intervalos regulares. Esto actualizará automáticamente el contenido en cada espacio de trabajo donde se gestione este archivo.",
      watch_explained_block2:
        "Esta función actualmente admite contenido en línea y no estará disponible para documentos subidos manualmente.",
      watch_explained_block3_start:
        "Puedes administrar qué documentos se observan desde la vista de administrador del ",
      watch_explained_block3_link: "Administrador de archivos",
      watch_explained_block3_end: ".",
      accept: "Ok, entendido",
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
    welcome: "Bienvenido a tu nuevo espacio de trabajo.",
    get_started: "Para comenzar, puedes",
    get_started_default: "Para comenzar",
    upload: "subir un documento",
    or: "o",
    attachments_processing:
      "Los archivos adjuntos se están procesando. Por favor, espera...",
    send_chat: "enviar un chat.",
    send_message: "Enviar un mensaje",
    attach_file: "Adjuntar un archivo a este chat",
    slash: "Ver todos los comandos de barra disponibles para chatear.",
    agents: "Ver todos los agentes disponibles que puedes usar para chatear.",
    start_agent_session: "Start agent session",
    text_size: "Cambiar tamaño del texto.",
    microphone: "Habla tu prompt.",
    send: "Enviar mensaje de prompt al espacio de trabajo",
    tts_speak_message: "Mensaje de voz TTS",
    copy: "Copiar",
    regenerate: "Regenerar",
    regenerate_response: "Regenerar respuesta",
    good_response: "Buena respuesta",
    more_actions: "Más acciones",
    hide_citations: "Ocultar citas",
    show_citations: "Mostrar citas",
    sources: "Fuentes",
    source_count_one: "{{count}} de referencia",
    source_count_other: "{{count}} referencias",
    document: "Documento",
    similarity_match: "partido",
    pause_tts_speech_message: "Pausar el mensaje de voz TTS",
    fork: "Bifurcar",
    delete: "Eliminar",
    save_submit: "Guardar y enviar",
    cancel: "Cancelar",
    submit: "Enviar",
    edit_prompt: "Editar prompt",
    edit_response: "Editar respuesta",
    edit_info_user:
      '"Enviar" regenera la respuesta de la IA. "Guardar" actualiza solo tu mensaje.',
    edit_info_assistant:
      "Los cambios que realice se guardarán directamente en esta respuesta.",
    see_less: "Ver menos",
    see_more: "Ver más",
    at_agent: "@agent",
    default_agent_description:
      " - el agente predeterminado para este espacio de trabajo.",
    custom_agents_coming_soon: "¡los agentes personalizados llegarán pronto!",
    preset_reset_description:
      "Borra tu historial de chat y comienza un nuevo chat",
    preset_exit_description: "Detener la sesión actual del agente.",
    add_new_preset: " Agregar nuevo preajuste",
    add_new: "Añadir nuevo",
    edit: "Editar",
    publish: "Publicar",
    stop_generating: "Dejar de generar respuestas",
    command: "Comando",
    your_command: "tu-comando",
    placeholder_prompt:
      "Este es el contenido que se inyectará delante de tu prompt.",
    description: "Descripción",
    placeholder_description: "Responde con un poema sobre los LLMs.",
    save: "Guardar",
    small: "Pequeño",
    normal: "Normal",
    large: "Grande",
    tools: "Herramientas",
    slash_commands: "Comandos abreviados",
    agent_skills: "Habilidades del agente",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Explorar",
    text_size_label: "Tamaño del texto",
    select_model: "Seleccionar modelo",
    workspace_llm_manager: {
      search: "Buscar proveedores de LLM",
      loading_workspace_settings:
        "Cargando la configuración del espacio de trabajo...",
      available_models: "Modelos disponibles para {{provider}}",
      available_models_description:
        "Selecciona un modelo para usar en este espacio de trabajo.",
      save: "Usar este modelo",
      saving:
        "Estableciendo el modelo como predeterminado del espacio de trabajo...",
      missing_credentials: "¡A este proveedor le faltan credenciales!",
      missing_credentials_description:
        "Haz clic para configurar las credenciales",
    },
  },
  profile_settings: {
    edit_account: "Editar cuenta",
    profile_picture: "Foto de perfil",
    remove_profile_picture: "Eliminar foto de perfil",
    username: "Nombre de usuario",
    new_password: "Nueva contraseña",
    password_description: "La contraseña debe tener al menos 8 caracteres",
    cancel: "Cancelar",
    update_account: "Actualizar cuenta",
    theme: "Preferencia de tema",
    language: "Idioma preferido",
    failed_upload: "Error al subir la foto de perfil: {{error}}",
    upload_success: "Foto de perfil subida.",
    failed_remove: "Error al eliminar la foto de perfil: {{error}}",
    profile_updated: "Perfil actualizado.",
    failed_update_user: "Error al actualizar el usuario: {{error}}",
    account: "Cuenta",
    support: "Soporte",
    signout: "Cerrar sesión",
  },
  "keyboard-shortcuts": {
    title: "Atajos de teclado",
    shortcuts: {
      settings: "Abrir configuración",
      workspaceSettings: "Abrir configuración del espacio de trabajo actual",
      home: "Ir a Inicio",
      workspaces: "Administrar espacios de trabajo",
      apiKeys: "Configuración de claves de API",
      llmPreferences: "Preferencias de LLM",
      chatSettings: "Configuración del chat",
      help: "Mostrar ayuda de atajos de teclado",
      showLLMSelector: "Mostrar selector de LLM del espacio de trabajo",
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
        success_title: "¡Éxito!",
        success_description:
          "¡Tu prompt del sistema ha sido publicado en el Centro de la Comunidad!",
        success_thank_you: "¡Gracias por compartir con la Comunidad!",
        view_on_hub: "Ver en el Centro de la Comunidad",
        modal_title: "Publicar prompt del sistema",
        name_label: "Nombre",
        name_description:
          "Este es el nombre para mostrar de tu prompt del sistema.",
        name_placeholder: "Mi prompt del sistema",
        description_label: "Descripción",
        description_description:
          "Esta es la descripción de tu prompt del sistema. Úsala para describir el propósito de tu prompt del sistema.",
        tags_label: "Etiquetas",
        tags_description:
          "Las etiquetas se utilizan para identificar tu prompt del sistema para una búsqueda más fácil. Puedes agregar varias etiquetas. Máximo 5 etiquetas. Máximo 20 caracteres por etiqueta.",
        tags_placeholder: "Escribe y presiona Enter para agregar etiquetas",
        visibility_label: "Visibilidad",
        public_description:
          "Los prompts del sistema públicos son visibles para todos.",
        private_description:
          "Los prompts del sistema privados solo son visibles para ti.",
        publish_button: "Publicar en el Centro de la Comunidad",
        submitting: "Publicando...",
        submit: "Publicar en el Centro de la Comunidad",
        prompt_label: "Prompt",
        prompt_description:
          "Este es el prompt del sistema real que se utilizará para guiar al LLM.",
        prompt_placeholder: "Ingresa tu prompt del sistema aquí...",
      },
      agent_flow: {
        public_description:
          "Los flujos de agente públicos son visibles para todos.",
        private_description:
          "Los flujos de agente privados solo son visibles para ti.",
        success_title: "¡Éxito!",
        success_description:
          "¡Tu flujo de agente ha sido publicado en el Centro de la Comunidad!",
        success_thank_you: "¡Gracias por compartir con la Comunidad!",
        view_on_hub: "Ver en el Centro de la Comunidad",
        modal_title: "Publicar flujo de agente",
        name_label: "Nombre",
        name_description:
          "Este es el nombre para mostrar de tu flujo de agente.",
        name_placeholder: "Mi flujo de agente",
        description_label: "Descripción",
        description_description:
          "Esta es la descripción de tu flujo de agente. Úsala para describir el propósito de tu flujo de agente.",
        tags_label: "Etiquetas",
        tags_description:
          "Las etiquetas se utilizan para identificar tu flujo de agente para una búsqueda más fácil. Puedes agregar varias etiquetas. Máximo 5 etiquetas. Máximo 20 caracteres por etiqueta.",
        tags_placeholder: "Escribe y presiona Enter para agregar etiquetas",
        visibility_label: "Visibilidad",
        publish_button: "Publicar en el Centro de la Comunidad",
        submitting: "Publicando...",
        submit: "Publicar en el Centro de la Comunidad",
        privacy_note:
          "Los flujos de agente siempre se suben como privados para proteger cualquier dato sensible. Puedes cambiar la visibilidad en el Centro de la Comunidad después de publicar. Por favor, verifica que tu flujo no contenga ninguna información sensible o privada antes de publicar.",
      },
      slash_command: {
        success_title: "¡Éxito!",
        success_description:
          "¡Tu comando de barra ha sido publicado en el Centro de la Comunidad!",
        success_thank_you: "¡Gracias por compartir con la Comunidad!",
        view_on_hub: "Ver en el Centro de la Comunidad",
        modal_title: "Publicar comando de barra",
        name_label: "Nombre",
        name_description:
          "Este es el nombre para mostrar de tu comando de barra.",
        name_placeholder: "Mi comando de barra",
        description_label: "Descripción",
        description_description:
          "Esta es la descripción de tu comando de barra. Úsala para describir el propósito de tu comando de barra.",
        command_label: "Comando",
        command_description:
          "Este es el comando de barra que los usuarios escribirán para activar este preajuste.",
        command_placeholder: "mi-comando",
        tags_label: "Etiquetas",
        tags_description:
          "Las etiquetas se utilizan para identificar tu comando de barra para una búsqueda más fácil. Puedes agregar varias etiquetas. Máximo 5 etiquetas. Máximo 20 caracteres por etiqueta.",
        tags_placeholder: "Escribe y presiona Enter para agregar etiquetas",
        visibility_label: "Visibilidad",
        public_description:
          "Los comandos de barra públicos son visibles para todos.",
        private_description:
          "Los comandos de barra privados solo son visibles para ti.",
        publish_button: "Publicar en el Centro de la Comunidad",
        submitting: "Publicando...",
        prompt_label: "Prompt",
        prompt_description:
          "Este es el prompt que se utilizará cuando se active el comando de barra.",
        prompt_placeholder: "Ingresa tu prompt aquí...",
      },
      generic: {
        unauthenticated: {
          title: "Se requiere autenticación",
          description:
            "Necesitas autenticarte con el Centro de la Comunidad de AnythingLLM antes de publicar elementos.",
          button: "Conectar al Centro de la Comunidad",
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
