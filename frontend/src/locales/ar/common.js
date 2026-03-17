const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "مرحبا في",
      getStarted: "بسم الله",
    },
    llm: {
      title: "إعدادات نموذج التعلم العميق المفضّلة",
      description:
        "يمكن لـِ  إيني ثينك إلْلْمْ العمل مع عدة موفرين لنماذج التعلم العميق لأداء خدمة المحادثات",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "إنشاء المستعمِل",
      description: ".ضبط إعدادات مستعمِلِك",
      howManyUsers: "كم من مستعمِل سيستعمِل هذا المثيل ؟",
      justMe: "فقط أنا",
      myTeam: "فريقي",
      instancePassword: "كلمة مرورالمثيل",
      setPassword: "هل تريد إنشاء كلمة مرور ؟",
      passwordReq: "يجب أن تحتوي كلمة المرور على ثمانية حروف على الأقل",
      passwordWarn: "من المهم حفظ كلمة المرور هذه لأنه لا يمكن استردادها.",
      adminUsername: "اسم مستعمل حساب المشرف",
      adminPassword: "كلمة مرور حساب المشرف",
      adminPasswordReq: "يجب أن تكون كلمات المرور 8 أحرف على الأقل.",
      teamHint:
        "بمجرد اكتمال الإنشاء  ستكون المشرف الوحيد يمكنك دعوة الآخرين ليكونوا مستعملين أو مشرفين. لا تفقد كلمة المرور الخاصة بك حيث يمكن للمشرفين فقط إعادة تعيين كلمات المرور",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "معالجة البيانات والخصوصية",
      description:
        "نحن ملتزمون بالشفافية والمراقبة عندما يتعلق الأمر ببياناتك الشخصية.",
      settingsHint: "يمكن إعادة ضبط هذه الإعدادات في أي وقت.",
    },
    survey: {
      title: "مرحباً في إيني ثينك إلْلْمْ",
      description:
        " بما يتناسب مع احتياجاتك ساعدنا إذا أحببت في تصميم  إيني ثينك إلْلْمْ",
      email: "ما هو بريدك الالكتروني؟",
      useCase: "لماذا ستستخدم إيني ثينك إلْلْمْ؟",
      useCaseWork: "للعمل",
      useCasePersonal: "للاستخدام الشخصي",
      useCaseOther: "شيء آخَر",
      comment: "كيف سمعت عن إيني ثينك إلْلْمْ ؟",
      commentPlaceholder:
        "أخبرنا كيف وجدتنا!، يوتيوب، تويتر، جيثوب، ريديت وما إلى ذلك -",
      skip: "تخطي الاستطلاع",
      thankYou: "شكرا على تقييماتك!",
    },
    workspace: {
      title: "قم بإنشاء مساحة العمل الأولى الخاصة بك",
      description:
        "قم بإنشاء مساحة العمل الأولى الخاصة بك وابدأ مع إيني ثينك إلْلْمْ.",
    },
  },
  common: {
    "workspaces-name": "اسم مساحة العمل",
    error: "خطأ",
    success: "موفّق",
    user: "مستعمِل",
    selection: "اختيار النموذج",
    saving: "حفظ...",
    save: "حفظ التغييرات",
    previous: "الصفحة السابقة",
    next: "الصفحة التالية",
    optional: "اختياري",
    yes: "نعم",
    no: "لا",
    search: "بحث",
    username_requirements:
      "يجب أن يتكون اسم المستخدم من 2 إلى 32 حرفًا، ويبدأ بحرف صغير، ويحتوي فقط على حروف وأرقام وعلامات التسطير والنقاط.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "مرحبا",
    chooseWorkspace: "اختر مساحة العمل لبدء المحادثة!",
    notAssigned:
      "لا تم التخصيص لأي مساحة عمل.\nيرجى الاتصال بمدير المثيل لطلب الوصول إلى مساحة عمل.",
    goToWorkspace: 'الذهاب إلى "{{workspace}}"',
  },
  settings: {
    title: "إعدادات المثيل",
    system: "الإعدادات العامة",
    invites: "دعوات",
    users: "مستعملون",
    workspaces: "مساحات العمل",
    "workspace-chats": "محادثات مساحة العمل",
    customization: "التخصيص",
    interface: "تفضيلات واجهة المستخدم",
    branding: "التسويق بالعلامة التجارية ووضع العلامات التجارية",
    chat: "دردشة",
    "api-keys": "واجهة برمجة التطبيقات للمطورين",
    llm: "النماذج اللغوية الكبيرة",
    transcription: "النسْخ",
    embedder: "مُضمّن",
    "text-splitting": "تقسيم النص تقطيعه",
    "voice-speech": "الصوت والخطاب",
    "vector-database": "قاعدة بيانات المتجهات",
    embeds: "تضمين المحادثة",
    "embed-chats": "سجل تضمين المحادثة",
    security: "حماية",
    "event-logs": "سجلات الأحداث",
    privacy: "الخصوصية والبيانات",
    "ai-providers": "موفرو الذكاء الاصطناعي",
    "agent-skills": "مهارات الوكيل",
    "community-hub": {
      title: "مركز المجتمع",
      trending: "استكشف الاتجاهات الرائجة",
      "your-account": "حسابك",
      "import-item": "استيراد العنصر",
    },
    admin: "مشرف",
    tools: "أدوات",
    "system-prompt-variables": "متغيرات المطالبات للنظام",
    "experimental-features": "الميزات التجريبية",
    contact: "اتصل بالدعم",
    "browser-extension": "ملحق المتصفح",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "مرحبا في",
      "placeholder-username": "اسم المستعمِل",
      "placeholder-password": "كلمة المرور",
      login: "تسجيل الدخول",
      validating: "جاري التحقق...",
      "forgot-pass": "هل نسيت كلمة المرور",
      reset: "إعادة الضبط",
    },
    "sign-in": "تسجيل الدخول إلى حساب {{appName}}.",
    "password-reset": {
      title: "إعادة تعيين كلمة المرور",
      description:
        "قم بإدخال المعلومات اللازمة أدناه لإعادة تعيين كلمة المرور الخاصة بك.",
      "recovery-codes": "رموز الاسترداد",
      "recovery-code": " {{index}} رمز الاسترداد",
      "back-to-login": "العودة إلى تسجيل الدخول",
    },
  },
  "main-page": {
    greeting: "كيف يمكنني مساعدتك اليوم؟",
    noWorkspaceError: "يرجى إنشاء مساحة عمل قبل البدء في الدردشة.",
    checklist: {
      title: "البدء",
      tasksLeft: "المهام المتبقية",
      completed: "أنت على طريق أن تصبح خبيرًا في مجال نماذج لغة AnythingLLM!",
      dismiss: "أغلق",
      tasks: {
        create_workspace: {
          title: "إنشاء مساحة عمل",
          description: "إنشاء مساحة عمل أولية للبدء",
          action: "إنشاء",
        },
        send_chat: {
          title: "أرسل رسالة",
          description: "ابدأ محادثة مع مساعدك الذكي",
          action: "دردشة",
        },
        embed_document: {
          title: "إدراج مستند",
          description: "أضف المستند الأول الخاص بك إلى مساحة العمل الخاصة بك",
          action: "دمج",
        },
        setup_system_prompt: {
          title: "قم بإنشاء نظام موجه.",
          description: "قم بتكوين سلوك مساعدك الذكي.",
          action: "إعداد",
        },
        define_slash_command: {
          title: "حدد أمر القطع",
          description: "إنشاء أوامر مخصصة لمساعدك",
          action: "عرف",
        },
        visit_community: {
          title: "زيارة مركز المجتمع",
          description: "استكشف موارد المجتمع وقوالبها",
          action: "تصفح",
        },
      },
    },
    quickActions: {
      createAgent: "إنشاء وكيل",
      editWorkspace: "تعديل مساحة العمل",
      uploadDocument: "تحميل مستند",
    },
    quickLinks: {
      title: "روابط سريعة",
      sendChat: "أرسل الدردشة",
      embedDocument: "إدراج مستند",
      createWorkspace: "إنشاء مساحة عمل",
    },
    exploreMore: {
      title: "استكشف المزيد من الميزات",
      features: {
        customAgents: {
          title: "وكلاء الذكاء الاصطناعي المخصصين",
          description:
            "قم ببناء وكلاء ذكاء اصطناعي قويين وأتمتيات بدون الحاجة إلى كتابة التعليمات البرمجية.",
          primaryAction: "استخدم الدردشة مع @agent",
          secondaryAction: "صمم مسارًا لعميل",
        },
        slashCommands: {
          title: "أوامر السطر الأوامر",
          description: "وفر الوقت وأدخل الأوامر باستخدام أوامر مخصصة.",
          primaryAction: "إنشاء أمر سطر أوامر",
          secondaryAction: "استكشف على Hub",
        },
        systemPrompts: {
          title: "مطالبات النظام",
          description:
            "عدّل مطالبة النظام لتخصيص ردود الذكاء الاصطناعي في مساحة العمل.",
          primaryAction: "عدّل مطالبة النظام",
          secondaryAction: "إدارة المتغيرات المحددة",
        },
      },
    },
    announcements: {
      title: "التحديثات والإعلانات",
    },
    resources: {
      title: "الموارد",
      links: {
        docs: "وثائق",
        star: "نجمة على GitHub",
      },
      keyboardShortcuts: "اختصارات لوحة المفاتيح",
    },
  },
  "new-workspace": {
    title: "مساحة عمل جديدة",
    placeholder: "مساحتي للعمل",
  },
  "workspaces—settings": {
    general: "الإعدادات العامة",
    chat: "إعدادات المحادثة",
    vector: "قاعدة بيانات المتجهات",
    members: "أعضاء",
    agent: "تكوين الوكيل",
  },
  general: {
    vector: {
      title: "عدد المتجهات",
      description:
        "العدد الإجمالي للمتجهات في قاعدة بيانات المتجهات الخاصة بك.",
    },
    names: {
      description: "سيؤدي هذا فقط إلى تغيير اسم العرض لمساحة العمل الخاصة بك.",
    },
    message: {
      title: "رسائل المحادثة المقترحة",
      description:
        " تخصيص الرسائل التي سيتم اقتراحها لمستعملي مساحة العمل الخاصة بك.",
      add: "إضافة رسالة جديدة",
      save: "حفظ الرسائل",
      heading: "اشرح لي",
      body: "فوائد برنامج إيني ثينك إلْلْمْ",
    },
    pfp: {
      title: "صورة الملف الشخصي للمساعد",
      description: "تخصيص صورة الملف الشخصي للمساعد لمساحة العمل هذه.",
      image: "صورة مساحة العمل",
      remove: "إزالة صورة مساحة العمل",
    },
    delete: {
      title: "حذف مساحة العمل",
      description:
        "احذف مساحة العمل هذه وكل بياناتها. سيؤدي هذا إلى حذف مساحة العمل لجميع المستخدمين.",
      delete: "حذف مساحة العمل",
      deleting: "حذف مساحة العمل...",
      "confirm-start": "أنت على وشكِ حذف كامل",
      "confirm-end":
        "لمساحة العمل. سيؤدي هذا إلى إزالة جميع تضمينات المتجهات في قاعدة بيانات المتجهات الخاصة بك.\n\nستظل ملفات المصدر الأصلية دون مساس. هذا الإجراء لا رجعة فيه.",
    },
  },
  chat: {
    llm: {
      title: "موفر نموذج التعلم العميق لمساحة العمل",
      description:
        "موفر نموذج التعلم العميق المحدد والنموذج الذي سيتم استخدامه لمساحة العمل هذه. من الوهلة الأولى، يستخدم موفر نموذج التعلم العميق هذا مع إعدادات النظام.",
      search: "البحث عن كل مُوفري نماذج التعلم العميق",
    },
    model: {
      title: "نموذج محادثة مساحة العمل",
      description:
        "نموذج المحادثة المحدد الذي سيتم استخدامه لمساحة العمل هذه. إذا كان غير محدد، فسيتم استخدام نموذج التعلم العميق الافتراضي للنظام.",
      wait: "-- في انتظار النماذج --",
    },
    mode: {
      title: "وضع المحادثة",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "المحادثة",
        "desc-start": "سيقدم إجابات حسب المعرفة العامة لنموذج التعلم العميق",
        and: "and",
        "desc-end": "المستند الذي تم العثور عليه حسب السياق.",
      },
      query: {
        title: "استعلام",
        "desc-start": "سوف تقدم الإجابات",
        only: "فقط",
        "desc-end": "إذا وجد المستند في السياق",
      },
    },
    history: {
      title: "سجل المحادثة",
      "desc-start":
        "عدد المحادثات السابقة التي سيتم تضمينها في رد الذاكرة قصيرة المدى.",
      recommend: "الموصى به 20.",
      "desc-end":
        "من المرجح أن يؤدي أي رقم أكبر من 45 إلى فشل مستمر في المحادثة اعتمادًا على حجم الرسالة.",
    },
    prompt: {
      title: "النداء",
      description:
        "النداء التي سيتم استخدامه في مساحة العمل هذه. حدد السياق والتعليمات للذكاء الاصطناعي للاستجابة. يجب عليك تقديم نداء مصمم بعناية حتى يتمكن الذكاء الاصطناعي من إنشاء استجابة دقيقة وذات صلة.",
      history: {
        title: "سجل تفاعلات النظام",
        clearAll: "مسح الكل",
        noHistory: "لا يوجد سجل تاريخي للنظام.",
        restore: "استعادة",
        delete: "حذف",
        publish: "نشر في مركز المجتمع",
        deleteConfirm:
          "هل أنت متأكد من أنك تريد حذف هذا العنصر من سجل الأنشطة؟",
        clearAllConfirm:
          "هل أنت متأكد من أنك تريد مسح كل التاريخ؟ لا يمكن التراجع عن هذه العملية.",
        expand: "وسّع",
      },
    },
    refusal: {
      title: "الرد على رفض وضعية الاستعلام",
      "desc-start": "عندما تكون في",
      query: "استعلام",
      "desc-end":
        "وضعٍية ترغب في إرجاع رفض آخر مناسب عندما لا يتم العثور على السياق.",
      "tooltip-title": "لماذا أرى هذا؟",
      "tooltip-description":
        "أنت في وضع الاستعلام، والذي يستخدم فقط المعلومات الموجودة في مستنداتك. انتقل إلى وضع الدردشة لإجراء محادثات أكثر مرونة، أو انقر هنا لزيارة وثائقنا لمعرفة المزيد عن أوضاع الدردشة.",
    },
    temperature: {
      title: "حرارة نموذج التعلم العميق",
      "desc-start":
        'يتحكم هذا الإعداد في مدى "الإبداع" الذي ستكون عليه إجابات نموذج التعلم العميق.',
      "desc-end":
        "كلما زاد العدد كلما كان الإبداع أكبر. بالنسبة لبعض النماذج، قد يؤدي هذا إلى استجابات غير منسجمة عند ضبطها على رقم مرتفع للغاية.",
      hint: "لدى معظم نماذج التعلم العميق مجالات مقبولة مختلفة من القيم الصالحة. استشر موفر نموذج التعلم العميق الخاص بك للحصول على هذه المعلومات.",
    },
  },
  "vector-workspace": {
    identifier: "معرف قاعدة بيانات المتجهة",
    snippets: {
      title: "الحد الأقصى لمقتطفات السياق",
      description:
        "يتحكم هذا الإعداد في الحد الأقصى لعدد مقتطفات السياق التي سيتم إرسالها إلى نموذج التعلم العميق لكل محادثة أو استعلام.",
      recommend: "الموصى به: 4",
    },
    doc: {
      title: "عتبة تشابه المستند",
      description:
        "الحد الأدنى لدرجة التشابه المطلوبة لاعتبار المصدر مرتبطًا بالمحادثة. وكلما زاد الرقم، كلما كان المصدر أكثر تشابهًا بالمحادثة.",
      zero: "لا قيد",
      low: "منخفضة (درجة التشابه ≥ .25)",
      medium: "متوسطة ​​(درجة التشابه ≥ .50)",
      high: "عالية (درجة التشابه ≥ .75)",
    },
    reset: {
      reset: "إعادة تعيين قاعدة بيانات المتجهات",
      resetting: "مسح المتجهات...",
      confirm:
        "أنت على وشك إعادة تعيين قاعدة بيانات المتجهات الخاصة بمساحة العمل هذه. سيؤدي هذا إلى إزالة جميع تضمينات المتجهات المضمنة حاليًا.\n\nستظل ملفات المصدر الأصلية دون مساس. هذا الإجراء لا رجعة فيه.",
      error: "تعذرت إعادة تعيين قاعدة بيانات متجهة مساحة العمل!",
      success: "تم إعادة تعيين قاعدة بيانات متجهة مساحة العمل!",
    },
  },
  agent: {
    "performance-warning":
      "يعتمد أداء نماذج التعلم العميق التي لا تدعم صراحةً استدعاء الأدوات بشكل كبير على قدرات النموذج ودقته. قد تكون بعض القدرات محدودة أو غير وظيفية.",
    provider: {
      title: "موفر نموذج التعلم العميق لوكيل مساحة العمل",
      description:
        "موفر نموذج التعلم العميق والنموذج المحدد الذي سيتم استخدامه لوكيل الخاص بمساحة العمل هذه.",
    },
    mode: {
      chat: {
        title: "نموذج محادثة وكيل مساحة العمل",
        description:
          "نموذج المحادثة المحدد الذي سيتم استخدامه لوكيل الخاص بمساحة العمل هذه.",
      },
      title: "نموذج وكيل مساحة العمل",
      description:
        "نموذج نموذج التعلم العميق المحدد الذي سيتم استخدامه لوكيل الخاص بمساحة العمل هذه.",
      wait: "-- في انتظار النماذج --",
    },
    skill: {
      title: "مهارات الوكيل الافتراضية",
      description:
        "قم بتحسين القدرات الطبيعية للوكيل الافتراضي باستخدام هذه المهارات المعدة مسبقًا. ينطبق هذا الإعداد على جميع مساحات العمل.",
      rag: {
        title: "التوليد المعزز بالاسترجاع والذاكرة طويلة المدى",
        description:
          'اسمح للوكيل بالاستفادة من مستنداتك المحلية للإجابة على استعلام أو اطلب من الوكيل "تذكر" أجزاء من المحتوى لاسترجاعها في الذاكرة طويلة المدى.',
      },
      view: {
        title: "عرض وتلخيص المستندات",
        description:
          "السماح للوكيل بإدراج وتلخيص محتوى ملفات مساحة العمل المضمنة حاليًا.",
      },
      scrape: {
        title: "جمع محتوى المواقع الإلكترونية",
        description: "السماح للوكيل بزيارة مواقع الويب وجمع محتواها.",
      },
      generate: {
        title: "إنشاء المخططات البيانية",
        description:
          "تمكين الوكيل الافتراضي لإنشاء أنواع مختلفة من المخططات من البيانات المقدمة أو المعطاة في المحادثة.",
      },
      save: {
        title: "إنشاء الملفات وحفظها في المتصفح",
        description:
          "تمكين الوكيل الافتراضي من إنشاء الملفات والكتابة عليها وحفظها و تنزيلها في متصفحك.",
      },
      web: {
        title: "البحث والتصفح المباشر على الويب",
        description:
          "اسمح لمسؤولك بالبحث على الإنترنت للإجابة على أسئلتك من خلال الاتصال بمزود خدمة البحث على الإنترنت (SERP).",
      },
      sql: {
        title: "موصل SQL",
        description:
          "اسمح لمسؤولك بالاستفادة من SQL للإجابة على أسئلتك من خلال الاتصال بمقدمي قواعد البيانات المختلفة.",
      },
      default_skill:
        "افتراضيًا، يتم تفعيل هذه الميزة، ولكن يمكنك تعطيلها إذا لم ترغب في أن تكون متاحة للممثل.",
    },
  },
  recorded: {
    title: "محادثات مساحة العمل",
    description:
      "هذه هي جميع المحادثات والرسائل المسجلة التي أرسلها المستعملون مرتبة حسب تاريخ إنشائها.",
    export: "تصدير",
    table: {
      id: "معرف",
      by: "أرسلت بواسطة",
      workspace: "مساحة العمل",
      prompt: "نداء",
      response: "استجابة",
      at: "أرسلت في",
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
      title: "تفضيلات واجهة المستخدم",
      description: "حدد تفضيلات واجهة المستخدم الخاصة بـ AnythingLLM.",
    },
    branding: {
      title: "التسويق بالعلامة التجارية ووضع العلامات التجارية",
      description:
        "قم بتخصيص نسخة AnythingLLM الخاصة بك باستخدام العلامات التجارية الخاصة بك.",
    },
    chat: {
      title: "دردشة",
      description: "حدد تفضيلات الدردشة الخاصة بك لـ AnythingLLM.",
      auto_submit: {
        title: "إرسال تلقائي للمدخلات الصوتية",
        description: "إرسال تلقائي لإدخال الكلام بعد فترة من الصمت",
      },
      auto_speak: {
        title: "ردود آلية",
        description: "إجابات تلقائية من الذكاء الاصطناعي",
      },
      spellcheck: {
        title: "تمكين التدقيق الإملائي",
        description: "تمكين أو تعطيل التدقيق الإملائي في حقل إدخال الرسائل",
      },
    },
    items: {
      theme: {
        title: "الموضوع",
        description: "حدد نظام الألوان المفضل لديك للتطبيق.",
      },
      "show-scrollbar": {
        title: "إظهار شريط التمرير",
        description: "تمكين أو تعطيل شريط التمرير في نافذة الدردشة.",
      },
      "support-email": {
        title: "دعم البريد الإلكتروني",
        description:
          "حدد عنوان البريد الإلكتروني للدعم الذي يجب أن يكون متاحًا للمستخدمين عند الحاجة إلى المساعدة.",
      },
      "app-name": {
        title: "اسم",
        description: "حدد اسمًا يظهر في صفحة تسجيل الدخول لجميع المستخدمين.",
      },
      "chat-message-alignment": {
        title: "مواءمة رسائل الدردشة",
        description: "حدد وضع محاذاة الرسائل عند استخدام واجهة الدردشة.",
      },
      "display-language": {
        title: "اللغة المعروضة",
        description:
          "حدد اللغة المفضلة لعرض واجهة مستخدم AnythingLLM - عند توفر الترجمات.",
      },
      logo: {
        title: "شعار العلامة التجارية",
        description: "قم بتحميل شعارك المخصص لعرضه على جميع الصفحات.",
        add: "أضف شعارًا مخصصًا",
        recommended: "الحجم الموصى به: 800 × 200",
        remove: "احذف",
        replace: "استبدل",
      },
      "welcome-messages": {
        title: "أهلاً وسهلاً",
        description:
          "خصص الرسائل الترحيبية المعروضة لمستخدميك. سيتمكن المستخدمون غير المسؤولين فقط من رؤية هذه الرسائل.",
        new: "جديد",
        system: "نظام",
        user: "المعلومات التي قدمتها، بالإضافة إلى المعلومات التي تم جمعها من مصادر أخرى، ستساعد في تحديد موقع هذا الشخص.",
        message: "رسالة",
        assistant: "مساعد الدردشة من AnythingLLM",
        "double-click": "انقر نقرًا مزدوجًا لتحرير...",
        save: "حفظ الرسائل",
      },
      "browser-appearance": {
        title: "مظهر المتصفح",
        description: "خصص مظهر علامة التبويب والعنوان عند فتح التطبيق.",
        tab: {
          title: "العنوان",
          description: "حدد عنوان علامة تبويب مخصصًا عند فتح التطبيق في متصفح.",
        },
        favicon: {
          title: "Favicon",
          description: "استخدم أيقونة مخصصة لعلامة المتصفح.",
        },
      },
      "sidebar-footer": {
        title: "عناصر تذييل الشريط الجانبي",
        description:
          "خصص عناصر التذييل المعروضة في الجزء السفلي من الشريط الجانبي.",
        icon: "رمز",
        link: "رابط",
      },
      "render-html": {
        title: "تحويل HTML إلى تنسيق نصي في الدردشة",
        description:
          "تقديم استجابات HTML في استجابات المساعد.\nيمكن أن يؤدي ذلك إلى تحسين كبير في جودة الاستجابة، ولكنه قد يؤدي أيضًا إلى مخاطر أمنية محتملة.",
      },
    },
  },
  api: {
    title: " مفاتيح واجهة برمجة التطبيقات.",
    description:
      "تسمح مفاتيح واجهة برمجة التطبيقات  لحامليها بالوصول إلى مثيل إني ثينك إلْلْم هذا وإدارته برمجيًا.",
    link: "اقرأ وثائق واجهة برمجة التطبيقات .",
    generate: "إنشاء مفتاح واجهة برمجة التطبيقات الجديد",
    table: {
      key: "مفتاح واجهة برمجة التطبيقات",
      by: "تم الإنشاء بواسطة",
      created: "تم إنشاؤها",
    },
  },
  llm: {
    title: "تفضيل نموذج التعلم العميق",
    description:
      "هذه هي بيانات الاعتماد والإعدادات الخاصة بنموذج التعلم العميق للمحادثة وموفر التضمين المفضلين لديك . من المهم أن تكون هذه المفاتيح حديثة وصحيحة وإلا فلن يعمل برنامج إني ثينك إلْلْم بشكل صحيح.",
    provider: "موفر نموذج التعلم العميق",
    providers: {
      azure_openai: {
        azure_service_endpoint: "نقطة نهاية الخدمة في Azure",
        api_key: "مفتاح واجهة برمجة التطبيقات",
        chat_deployment_name: "اسم نشر الدردشة",
        chat_model_token_limit: "حدود عدد الرموز المميزة في نموذج الدردشة",
        model_type: "نوع النموذج",
        model_type_tooltip:
          'إذا كان نظامك يعتمد على نموذج استدلال (مثل o1، o1-mini، o3-mini، إلخ)، فيرجى تعيين هذا الخيار على "الاستدلال". وإلا، فقد تفشل طلبات الدردشة الخاصة بك.',
        default: "افتراضي",
        reasoning: "المنطق",
      },
    },
  },
  transcription: {
    title: "تفضيل نموذج النسخ",
    description:
      "هذه هي بيانات الاعتماد والإعدادات الخاصة بموفر نموذج النسخ المفضل لديك. من المهم أن تكون هذه المفاتيح حديثة وصحيحة وإلا فلن يتم نسخ ملفات الوسائط والصوت.",
    provider: "موفر النسخ",
    "warn-start":
      "يمكن أن يؤدي استخدام نموذج الهمس المحلي على الأجهزة ذات ذاكرة الوصول العشوائي أو وحدة المعالجة المركزية المحدودة إلى تعطيل إني ثينك إلْلْم عند معالجة ملفات الوسائط.",
    "warn-recommend":
      "نوصي بذاكرة وصول عشوائي بسعة 2 جيجابايت على الأقل وتحميل ملفات أقل من 10 ميجا بايت.",
    "warn-end": "سيتم تنزيل النموذج المدمج تلقائيًا عند الاستخدام الأول.",
  },
  embedding: {
    title: "تفضيل التضمين",
    "desc-start":
      "عند استخدام نموذج تعلم عميق لا يدعم محرك التضمين أصلاً - قد تحتاج إلى تحديد بيانات الاعتماد بالإضافة إلى ذلك لتضمين النص.",
    "desc-end":
      "التضمين هو عملية تحويل النص إلى متجهات. هذه البيانات مطلوبة لتحويل ملفاتك ومطالباتك إلى تنسيق يمكن لـ إني ثينك إلْلْمْ استخدامه للمعالجة.",
    provider: {
      title: "موفر التضمين",
    },
  },
  text: {
    title: "تقسيم النص وتفضيلات التقطيع",
    "desc-start":
      "في بعض الأحيان، قد ترغب في تغيير الطريقة الافتراضية التي يتم بها تقسيم المستندات الجديدة وتقطيعها قبل إدراجها في قاعدة بيانات المتجهة الخاصة بك.",
    "desc-end":
      "يجب عليك فقط تعديل هذا الإعداد إذا كنت تفهم كيفية عمل تقسيم النص وتأثيراته الجانبية.",
    size: {
      title: "حجم قطعة النص",
      description:
        "هذا هو الحد الأقصى لطول الأحرف التي يمكن أن تكون موجودة في متجهة واحدة.",
      recommend: "الحد الأقصى لطول نموذج التضمين هو",
    },
    overlap: {
      title: "تداخل قطعة النص",
      description:
        "هذا هو الحد الأقصى لتداخل الأحرف الذي يحدث أثناء تقطيع قطعتي نص متجاورتين.",
    },
  },
  vector: {
    title: "قاعدة بيانات المتجهة",
    description:
      "هذه هي بيانات الاعتماد والإعدادات الخاصة بكيفية عمل مثيل إني ثينك إلْلْمْ الخاص بك. من المهم أن تكون هذه المفاتيح حالية وصحيحة.",
    provider: {
      title: "موفر قاعدة بيانات المتجهة",
      description: "ليست هناك حاجة تعيين إعدادات لانسديبي .",
    },
  },
  embeddable: {
    title: "أدوات المحادثة القابلة للتضمين",
    description:
      "تعتبر أدوات المحادثة القابلة للتضمين عبارة عن واجهات محادثة عامة مرتبطة بمساحة عمل واحدة. تتيح لك هذه الأدوات إنشاء مساحات عمل يمكنك بعد ذلك نشرها .",
    create: "إنشاء تضمين",
    table: {
      workspace: "مساحة العمل",
      chats: "المحادثات المرسلة",
      active: "المجالات النشطة",
      created: "تم إنشاؤه",
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
    title: "تضمين المحادثات",
    export: "تصدير",
    description:
      "هذه هي جميع المحادثات والرسائل المسجلة من أي تضمين قمت بنشره.",
    table: {
      embed: "تضمين",
      sender: "مُرسِل",
      message: "رسالة",
      response: "استجابة",
      at: "أرسلت في",
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
    title: "حماية",
    multiuser: {
      title: "وضعية المستعملين المتعددين",
      description:
        "قم بإعداد مثيلك لدعم فريقك من خلال تنشيط وضعية المستعملين المتعددين.",
      enable: {
        "is-enable": "تم تمكين وضعية المستعملين المتعددين",
        enable: "تمكين وضعية المستعملين المتعددين",
        description:
          "افتراضيًا، ستكون أنت المشرف الوحيد. وبصفتك مشرفا ستحتاج إلى إنشاء حسابات لجميع المستعملين أو المشرفين الجدد. لا تفقد كلمة مرورك، حيث يمكن فقط للمستعمل المشرف إعادة تعيين كلمات المرور.",
        username: "اسم المستعمل لحساب المشرف",
        password: "كلمة مرور حساب المشرف",
      },
    },
    password: {
      title: "حماية كلمة المرور",
      description:
        "إحم مثيل إني ثينك إلْلْمْ بكلمة المرور. إذا نسيتها فلا يوجد طريقة لاستردادها، فاحرص على حفظها.",
      "password-label": "كلمة مرور المثيل",
    },
  },
  event: {
    title: "سجلات الحدث",
    description:
      "عرض كافة الإجراءات والأحداث التي تحدث في هذا المثيل للمراقبة.",
    clear: "محو سجلات الأحداث",
    table: {
      type: "نوع الحدث",
      user: "مستعمِل",
      occurred: "حدث في",
    },
  },
  privacy: {
    title: "الخصوصية ومعالجة البيانات",
    description:
      "هذا هو التكوين الخاص بك لكيفية تعامل موفري الطرف الثالث المتصلين و إني ثينك إلْلْمْ مع بياناتك.",
    llm: "اختيار نموذج التعلم العميق",
    embedding: "تفضيلات التضمين",
    vector: "قاعدة بيانات المتجهة",
    anonymous: "تم تمكين القياس المستتر عن بعد ",
  },
  connectors: {
    "search-placeholder": "اتصالات البيانات",
    "no-connectors": "لم يتم العثور على أي اتصالات بيانات.",
    obsidian: {
      name: "أوبشيان",
      description: "استورد مجلد Obsidian بنقرة واحدة.",
      vault_location: "موقع الخزانة",
      vault_description:
        'حدد مجلد "Obsidian" الخاص بك لاستيراد جميع الملاحظات وعلاقاتها.',
      selected_files: "تم العثور على {{count}} ملفات Markdown.",
      importing: "استيراد الخزانة...",
      import_vault: "استيراد منصة Vault",
      processing_time: "قد يستغرق ذلك بعض الوقت، اعتمادًا على حجم الخزانة.",
      vault_warning:
        "لتجنب أي تعارضات، تأكد من أن مجلد Obsidian الخاص بك ليس مفتوحًا حاليًا.",
    },
    github: {
      name: "مستودع GitHub",
      description:
        "استورد مستودع GitHub بأكمله (سواء كان عامًا أو خاصًا) بنقرة واحدة.",
      URL: "عنوان مستودع GitHub",
      URL_explained: "عنوان مستودع GitHub الذي ترغب في جمعه.",
      token: "رمز الوصول إلى GitHub",
      optional: "اختياري",
      token_explained: "رمز الوصول لمنع تحديد السرعة.",
      token_explained_start: "بدون مساعدة.",
      token_explained_link1: "رمز الوصول الشخصي",
      token_explained_middle:
        "، قد تحدد واجهة برمجة التطبيقات الخاصة بـ GitHub عدد الملفات التي يمكن جمعها بسبب قيود السرعة. يمكنك",
      token_explained_link2: "إنشاء رمز وصول مؤقت",
      token_explained_end: "لتجنب هذه المشكلة.",
      ignores: "يتجاهل الملف",
      git_ignore:
        "قم بإدراج قائمة بتنسيق .gitignore لتجاهل الملفات المحددة أثناء عملية الجمع. اضغط على مفتاح الإدخال بعد كل إدخال ترغب في حفظه.",
      task_explained:
        "بمجرد الانتهاء، ستكون جميع الملفات متاحة لإدراجها في مساحات العمل في أداة اختيار المستندات.",
      branch: "المجلد الذي ترغب في استرداد الملفات منه.",
      branch_loading: "-- تحميل الفروع المتاحة --",
      branch_explained: "المجلد الذي ترغب في استرداد الملفات منه.",
      token_information:
        "بسبب قيود معدل الوصول إلى واجهة برمجة التطبيقات العامة الخاصة بـ GitHub، لن يتمكن هذا الموصل من جمع الملفات ذات المستوى الأعلى فقط.",
      token_personal: "احصل على رمز وصول شخصي مجاني مع حساب GitHub هنا.",
    },
    gitlab: {
      name: "مستودع GitLab",
      description:
        "استورد مستودع GitLab بالكامل، سواء كان عامًا أو خاصًا، بنقرة واحدة.",
      URL: "عنوان مستودع GitLab",
      URL_explained: "عنوان مستودع GitLab الذي ترغب في جمعه.",
      token: "رمز الوصول إلى GitLab",
      optional: "اختياري",
      token_explained: "رمز الوصول لمنع تحديد السرعة.",
      token_description:
        "حدد الكيانات الإضافية التي تريد استردادها من واجهة برمجة التطبيقات الخاصة بـ GitLab.",
      token_explained_start: "بدون مساعدة.",
      token_explained_link1: "رمز الوصول الشخصي",
      token_explained_middle:
        "، قد تحدد واجهة برمجة التطبيقات الخاصة بـ GitLab عدد الملفات التي يمكن جمعها بسبب قيود السرعة. يمكنك",
      token_explained_link2: "إنشاء رمز وصول مؤقت",
      token_explained_end: "لتجنب هذه المشكلة.",
      fetch_issues: "استرجاع المشكلات بصيغة المستندات",
      ignores: "يتجاهل الملف",
      git_ignore:
        "قم بإدراج قائمة بتنسيق .gitignore لتجاهل الملفات المحددة أثناء عملية الجمع. اضغط على مفتاح الإدخال بعد كل إدخال ترغب في حفظه.",
      task_explained:
        "بمجرد الانتهاء، ستكون جميع الملفات متاحة لإدراجها في مساحات العمل في أداة اختيار المستندات.",
      branch: "المجلد الذي ترغب في استرداد الملفات منه",
      branch_loading: "-- تحميل الفروع المتاحة --",
      branch_explained: "المجلد الذي ترغب في استرداد الملفات منه.",
      token_information:
        "بسبب قيود معدل الوصول إلى واجهة برمجة التطبيقات العامة لـ GitLab، لن يتمكن هذا الموصل من البيانات من جمع الملفات ذات المستوى الأعلى فقط في المستودع.",
      token_personal: "احصل على رمز وصول شخصي مجاني مع حساب GitLab هنا.",
    },
    youtube: {
      name: "نص فيديو يوتيوب",
      description: "استيراد نص فيديو يوتيوب بأكمله من رابط.",
      URL: "عنوان الفيديو على يوتيوب",
      URL_explained_start:
        "أدخل عنوان URL لأي مقطع فيديو على يوتيوب للحصول على نص الفيديو. يجب أن يحتوي الفيديو على",
      URL_explained_link: "الترجمة المصاحبة",
      URL_explained_end: "متاح.",
      task_explained:
        "بمجرد الانتهاء، سيكون النص متاحًا لإدراجه في مساحات العمل في أداة اختيار المستندات.",
      language: "لغة التسجيل",
      language_explained: "حدد لغة النص الذي ترغب في جمعه.",
      loading_languages: "-- تحميل اللغات المتاحة --",
    },
    "website-depth": {
      name: "أداة لجمع الروابط بكميات كبيرة",
      description:
        "استخراج محتوى موقع ويب وجميع الروابط الفرعية حتى مستوى معين.",
      URL: "عنوان الموقع الإلكتروني",
      URL_explained: "عنوان الموقع الإلكتروني الذي ترغب في استخراجه.",
      depth: "عمق الغوص",
      depth_explained:
        "هذا هو عدد الروابط التي يجب على العامل اتباعها من عنوان URL الأصلي.",
      max_pages: "الحد الأقصى لعدد الصفحات",
      max_pages_explained: "الحد الأقصى لعدد الروابط التي يجب استخراجها.",
      task_explained:
        "بمجرد الانتهاء، سيكون المحتوى الذي تم استخراجه متاحًا لإدراجه في مساحات العمل في أداة اختيار المستندات.",
    },
    confluence: {
      name: "التلاقي",
      description: "استيراد صفحة كاملة من Confluence بنقرة واحدة.",
      deployment_type: "نوع نشر التطبيق",
      deployment_type_explained:
        "حدد ما إذا كان مثيل Confluence الخاص بك مُستضافًا على سحابة Atlassian أم أنه مُستضاف ذاتيًا.",
      base_url: "عنوان قاعدة البيانات",
      base_url_explained: "هذا هو عنوان URL الأساسي لمساحتك في Confluence.",
      space_key: "مفتاح مساحة التجمع",
      space_key_explained:
        "هذا هو مفتاح المساحات الخاص بمثيل Confluence الخاص بك، والذي سيتم استخدامه. وعادةً ما يبدأ بـ ~",
      username: "اسم المستخدم",
      username_explained: "اسم المستخدم الخاص بك في Confluence",
      auth_type: "نوع المصادقة:",
      auth_type_explained:
        "حدد نوع المصادقة الذي ترغب في استخدامه للوصول إلى صفحات Confluence الخاصة بك.",
      auth_type_username: "اسم المستخدم ورمز الوصول",
      auth_type_personal: "رمز الوصول الشخصي",
      token: "رمز الوصول إلى منطقة التجمع",
      token_explained_start:
        "يجب عليك تقديم رمز وصول للمصادقة. يمكنك إنشاء رمز وصول.",
      token_explained_link: "هنا",
      token_desc: "رمز الوصول للمصادقة",
      pat_token: "رمز الوصول الشخصي الخاص بـ Confluence",
      pat_token_explained: "رمز الوصول الشخصي الخاص بك.",
      bypass_ssl: "تجاوز التحقق من شهادة SSL",
      bypass_ssl_explained:
        "قم بتمكين هذا الخيار لتجاوز عملية التحقق من شهادة SSL لبيئات Confluence المستضافة ذاتيًا باستخدام شهادة موقعة ذاتيًا.",
      task_explained:
        "بمجرد الانتهاء، سيتم توفير محتوى الصفحة للاستخدام في تضمينها في مساحات العمل في أداة اختيار المستندات.",
    },
    manage: {
      documents: "وثائق",
      "data-connectors": "وصلات البيانات",
      "desktop-only":
        "تتوفر هذه الإعدادات فقط على جهاز كمبيوتر مكتبي. يرجى الوصول إلى هذه الصفحة على جهاز الكمبيوتر الخاص بك لمواصلة العمل.",
      dismiss: "ارفض",
      editing: "تحرير",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "وثائقي",
      "new-folder": "مجلد جديد",
      "search-document": "البحث عن المستند",
      "no-documents": "لا توجد مستندات.",
      "move-workspace": "انتقل إلى مساحة العمل",
      name: "الاسم",
      "delete-confirmation":
        "هل أنت متأكد من أنك تريد حذف هذه الملفات والمجلدات؟\nسيؤدي ذلك إلى إزالة الملفات من النظام وإزالتها تلقائيًا من أي مساحات عمل موجودة.\nهذا الإجراء غير قابل للتراجع.",
      "removing-message":
        "حذف {{count}} مستندًا و {{folderCount}} مجلدًا. يرجى الانتظار.",
      "move-success": "تم نقل {{count}} مستندات بنجاح.",
      date: "التاريخ",
      type: "نوع",
      no_docs: "لا توجد مستندات.",
      select_all: "حدد الكل",
      deselect_all: "إلغاء التحديد الكل",
      remove_selected: "حذف المحدد",
      costs: "*تكلفة ثابتة لإنشاء التمثيلات",
      save_embed: "حفظ و تضمين",
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
      "processor-offline": "غير متاح",
      "processor-offline-desc":
        "لا يمكننا تحميل ملفاتك في الوقت الحالي لأن معالج المستندات غير متصل بالإنترنت. يرجى المحاولة مرة أخرى لاحقًا.",
      "click-upload": "انقر لتحميل أو اسحب وأفلت",
      "file-types":
        "يدعم ملفات النصوص، وملفات CSV، وجداول البيانات، وملفات الصوت، وغيرها!",
      "or-submit-link": "أو قم بإرسال رابط",
      "placeholder-link": "https://example.com",
      fetching: "جاري الاسترجاع...",
      "fetch-website": "احصل على موقع الويب",
      "privacy-notice":
        "سيتم تحميل هذه الملفات إلى معالج المستندات الذي يعمل على هذه نسخة من AnythingLLM. هذه الملفات لا يتم إرسالها أو مشاركتها مع طرف ثالث.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: 'ما هو عمل "تثبيت المستندات"؟',
      pin_explained_block1:
        "عندما تقوم بإرفاق مستند في AnythingLLM، سنقوم بإدخال محتوى المستند بالكامل في نافذة المطالبة الخاصة بـ LLM الخاص بك، وذلك حتى يتمكن LLM من فهم المحتوى بالكامل.",
      pin_explained_block2:
        "يعمل هذا بشكل أفضل مع **نماذج ذات سياق كبير** أو ملفات صغيرة ولكنها ضرورية لأساس المعرفة الخاص بها.",
      pin_explained_block3:
        'إذا لم تحصل على الإجابات التي ترغب بها بشكل افتراضي من AnythingLLM، فإن استخدام ميزة "التثبيت" هو طريقة رائعة للحصول على إجابات ذات جودة أعلى في نقرة واحدة.',
      accept: "حسناً، فهمت.",
    },
    watching: {
      what_watching: "ما الذي يفعله مشاهدة فيلم وثائقي؟",
      watch_explained_block1:
        "عندما **تشاهد** مستندًا في AnythingLLM، سيتم **مزامنة** محتوى المستند تلقائيًا من مصدره الأصلي على فترات منتظمة. وهذا سيؤدي إلى تحديث المحتوى تلقائيًا في كل مساحة عمل حيث يتم إدارة هذا الملف.",
      watch_explained_block2:
        "هذه الميزة تدعم حاليًا المحتوى القائم على الإنترنت، ولن تكون متاحة للمستندات التي يتم تحميلها يدويًا.",
      watch_explained_block3_start:
        "يمكنك إدارة المستندات التي يتم عرضها من خلال.",
      watch_explained_block3_link: "مدير الملفات",
      watch_explained_block3_end: "نظرة عامة.\n\n\nنظرة عامة.",
      accept: "حسناً، فهمت.",
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
    welcome: "مرحبًا بكم في مساحة عملكم الجديدة.",
    get_started: "للبدء، يمكنك:",
    get_started_default: "للبدء",
    upload: "تحميل مستند",
    or: "أو",
    attachments_processing: "جارٍ معالجة المرفقات. يرجى الانتظار...",
    send_chat: "أرسل رسالة.",
    send_message: "أرسل رسالة",
    attach_file: "أرفق ملفًا بهذا الدردشة",
    slash: "عرض جميع الأوامر المتاحة للتواصل.",
    agents: "عرض جميع الوكلاء المتاحين الذين يمكنك استخدامهم للمحادثة.",
    start_agent_session: "Start agent session",
    text_size: "تغيير حجم النص.",
    microphone: "اذكر طلبك.",
    send: "أرسل رسالة فورية إلى مساحة العمل",
    tts_speak_message: "رسالة TTS Speak",
    copy: "انسخ",
    regenerate: "إعادة إنشاء",
    regenerate_response: "أعد الرد",
    good_response: "رد جيد",
    more_actions: "إجراءات إضافية",
    hide_citations: "إخفاء المراجع",
    show_citations: "عرض المراجع",
    sources: "مصادر",
    source_count_one: "{{count}}، المرجع",
    source_count_other: "{{count}} المرجع",
    document: "وثيقة",
    similarity_match: "مباراة",
    pause_tts_speech_message: "إيقاف قراءة النص بصوت التحدث الآلي",
    fork: "شوكة",
    delete: "حذف",
    save_submit: "حفظ وإرسال",
    cancel: "إلغاء",
    submit: "إرسال",
    edit_prompt: "اقتراح التحرير",
    edit_response: "عدّل الرد",
    edit_info_user:
      '"إرسال" يعيد إنشاء استجابة الذكاء الاصطناعي. "حفظ" يقوم بتحديث رسالتك فقط.',
    edit_info_assistant: "سيتم حفظ التغييرات مباشرة في هذا الرد.",
    see_less: "اقرأ المزيد",
    see_more: "عرض المزيد",
    at_agent: "@agent",
    default_agent_description: "- الوكيل الافتراضي لهذا المساحة.",
    custom_agents_coming_soon: "سيصل وكلاء مخصصون قريباً!",
    preset_reset_description: "امسح سجل الدردشة الخاص بك وابدأ محادثة جديدة",
    preset_exit_description: "إيقاف الجلسة الحالية للمتصفح",
    add_new_preset: "إضافة إعداد مسبق",
    add_new: "أضف جديدًا",
    edit: "تحرير",
    publish: "نشر",
    stop_generating: "توقف عن إنشاء رد",
    command: "أمر",
    your_command: "أمرك",
    placeholder_prompt: "هذا هو المحتوى الذي سيتم إدخاله أمام سؤالك.",
    description: "وصف",
    placeholder_description: "يستجيب ببيت شعر عن نماذج اللغة الكبيرة.",
    save: "حفظ",
    small: "صغير",
    normal: "طبيعي",
    large: "كبير",
    tools: "الأدوات",
    slash_commands: "أوامر مختصرة",
    agent_skills: "مهارات الوكيل",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "تصفح",
    text_size_label: "حجم النص",
    select_model: "اختر الطراز",
    workspace_llm_manager: {
      search: "البحث عن مزودي نماذج اللغة الكبيرة",
      loading_workspace_settings: "تحميل إعدادات مساحة العمل...",
      available_models: "الموديلات المتاحة لـ {{provider}}",
      available_models_description: "حدد نموذجًا للاستخدام في هذا المساحة.",
      save: "استخدم هذا النموذج.",
      saving: "تعيين النموذج كإعداد افتراضي للمساحة العملية...",
      missing_credentials: "هذا المزود لا يمتلك المؤهلات اللازمة!",
      missing_credentials_description: "انقر لإعداد بيانات الاعتماد",
    },
  },
  profile_settings: {
    edit_account: "تحرير الحساب",
    profile_picture: "صورة الملف الشخصي",
    remove_profile_picture: "حذف صورة الملف الشخصي",
    username: "اسم المستخدم",
    new_password: "كلمة مرور جديدة",
    password_description: "يجب أن يكون طول كلمة المرور 8 أحرف على الأقل.",
    cancel: "إلغاء",
    update_account: "تحديث الحساب",
    theme: "تفضيلات الموضوع",
    language: "اللغة المفضلة",
    failed_upload: "فشل تحميل صورة الملف الشخصي: {{error}}",
    upload_success: "تم تحميل صورة الملف الشخصي.",
    failed_remove: "فشل إزالة صورة الملف الشخصي: {{error}}",
    profile_updated: "تم تحديث الملف الشخصي.",
    failed_update_user: "فشل تحديث المستخدم: {{error}}",
    account: "حساب",
    support: "الدعم",
    signout: "تسجيل الخروج",
  },
  "keyboard-shortcuts": {
    title: "اختصارات لوحة المفاتيح",
    shortcuts: {
      settings: "فتح الإعدادات",
      workspaceSettings: "فتح إعدادات مساحة العمل الحالية",
      home: "اذهب إلى الصفحة الرئيسية",
      workspaces: "إدارة مساحات العمل",
      apiKeys: "إعدادات مفاتيح واجهة برمجة التطبيقات",
      llmPreferences: "تفضيلات نموذج اللغة الكبيرة",
      chatSettings: "إعدادات الدردشة",
      help: "عرض مسرّعات لوحة المفاتيح",
      showLLMSelector: "اختر مساحة العمل",
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
        success_title: "نجاح!",
        success_description: "تم نشر مطالبتك في نظامك على منصة المجتمع!",
        success_thank_you: "شكراً لمشاركتكم في المجتمع!",
        view_on_hub: "عرض على منصة المجتمع",
        modal_title: "نص الإشعار",
        name_label: "اسم",
        name_description: "هذا هو اسم العرض الخاص بنظامك.",
        name_placeholder: "تعليمات النظام الخاص بي",
        description_label: "وصف",
        description_description:
          "هذا هو وصف لتعليمات النظام الخاصة بك. استخدم هذا لوصف الغرض من تعليمات النظام الخاصة بك.",
        tags_label: "الوسوم",
        tags_description:
          "تُستخدم العلامات لتسمية مطالبتك في النظام لتسهيل البحث. يمكنك إضافة عدة علامات. الحد الأقصى لعدد العلامات هو 5. الحد الأقصى لعدد الأحرف في كل علامة هو 20 حرفًا.",
        tags_placeholder: "أدخل النص واضغط على مفتاح الإدخال لإضافة العلامات",
        visibility_label: "رؤية",
        public_description: "تظهر إشعارات النظام العامة للجميع.",
        private_description: "رسائل التذكير الخاصة مرئية فقط لك.",
        publish_button: "نشر في مركز المجتمع",
        submitting: "نشر...",
        submit: "نشر في مركز المجتمع",
        prompt_label:
          "الرجاء تقديم معلومات حول كيفية الحصول على شهادة في مجال تكنولوجيا المعلومات.",
        prompt_description:
          "هذا هو الأمر المباشر الفعلي الذي سيتم استخدامه لتوجيه نموذج اللغة الكبير.",
        prompt_placeholder: "أدخل تعليمات النظام هنا...",
      },
      agent_flow: {
        public_description: "يمكن رؤية تدفقات الوكلاء العامة للجميع.",
        private_description: "تدفقات الوكلاء الخاصة مرئية فقط لك.",
        success_title: "نجاح!",
        success_description: 'تم نشر "Agent Flow" الخاص بك في مركز المجتمع!',
        success_thank_you: "شكراً لمشاركتكم في المجتمع!",
        view_on_hub: "عرض على منصة المجتمع",
        modal_title: "مخطط تدفق الوكيل",
        name_label: "الاسم",
        name_description: "هذا هو اسم العرض الخاص بمسار الممثل.",
        name_placeholder: 'وكيلتي، "فلو"',
        description_label: "وصف",
        description_description:
          "هذا هو وصف لتدفق العمل الخاص بك. استخدم هذا لوصف الغرض من تدفق العمل الخاص بك.",
        tags_label: "الوسوم",
        tags_description:
          "تُستخدم العلامات لتصنيف مسارات عملك لتسهيل البحث. يمكنك إضافة عدة علامات. الحد الأقصى لعدد العلامات هو 5. الحد الأقصى لعدد الأحرف في كل علامة هو 20 حرفًا.",
        tags_placeholder: "أدخل النص واضغط على مفتاح الإدخال لإضافة العلامات",
        visibility_label: "رؤية",
        publish_button: "نشر في مركز المجتمع",
        submitting: "نشر...",
        submit: "نشر في مركز المجتمع",
        privacy_note:
          "يتم تحميل تدفقات البيانات دائمًا كخاصة لحماية أي بيانات حساسة. يمكنك تغيير مستوى الوصول في مركز المجتمع بعد النشر. يرجى التأكد من أن تدفقك لا يحتوي على أي معلومات حساسة أو خاصة قبل النشر.",
      },
      slash_command: {
        success_title: "نجاح!",
        success_description: "تم نشر أمر Slash الخاص بك في مركز المجتمع!",
        success_thank_you: "شكراً لمشاركتكم في المجتمع!",
        view_on_hub: "عرض على منصة المجتمع",
        modal_title: "نشر أمر Slash",
        name_label: "اسم",
        name_description: "هذا هو اسم العرض الخاص بأمرك.",
        name_placeholder: "أمر السلايش الخاص بي",
        description_label: "وصف",
        description_description:
          "هذا هو وصف أمر السلايش الخاص بك. استخدم هذا لوصف الغرض من أمر السلايش الخاص بك.",
        command_label: "أمر",
        command_description:
          "هذا هو الأمر الذي سيدخله المستخدمون لتفعيل هذا الإعداد المسبق.",
        command_placeholder: "أمرى",
        tags_label: "الوسوم",
        tags_description:
          "تُستخدم العلامات لتسمية أوامر سلاش الخاصة بك لتسهيل البحث عنها. يمكنك إضافة عدة علامات. الحد الأقصى لعدد العلامات هو 5. الحد الأقصى لعدد الأحرف في كل علامة هو 20 حرفًا.",
        tags_placeholder: "أدخل النص واضغط على مفتاح الإدخال لإضافة العلامات",
        visibility_label: "رؤية",
        public_description: "الأوامر العامة مرئية للجميع.",
        private_description: "الأوامر الخاصة مرئية فقط لك.",
        publish_button: "نشر في مركز المجتمع",
        submitting: "نشر...",
        prompt_label: "الاستعلام",
        prompt_description:
          "هذا هو الأمر الذي سيتم استخدامه عند تفعيل الأمر الذي يتضمن الشرطة.",
        prompt_placeholder: "أدخل سؤالك هنا...",
      },
      generic: {
        unauthenticated: {
          title: "يتطلب التحقق",
          description:
            "يجب عليك التحقق من هويتك مع مركز مجتمع AnythingLLM قبل نشر أي محتوى.",
          button: "تواصل مع مركز المجتمع",
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
