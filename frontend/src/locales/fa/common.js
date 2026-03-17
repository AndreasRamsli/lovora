const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "به",
      getStarted: "شروع کنید",
    },
    llm: {
      title: "ترجیحات مدل‌های زبان بزرگ",
      description:
        "AnythingLLM می‌تواند با بسیاری از ارائه‌دهندگان مدل‌های زبانی کار کند. این سرویس، مسئولیت انجام مکالمات را بر عهده خواهد داشت.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "راه‌اندازی حساب کاربری",
      description: "تنظیمات کاربری خود را انجام دهید.",
      howManyUsers:
        "تعداد کاربران که از این نمونه استفاده خواهند کرد چقدر است؟",
      justMe: "فقط من",
      myTeam: "تیم من",
      instancePassword: "رمز عبور",
      setPassword: "آیا می‌خواهید یک رمز عبور تعیین کنید؟",
      passwordReq: "رمز عبور باید حداقل 8 کاراکتر باشد.",
      passwordWarn:
        "مهم است که این رمز عبور را حفظ کنید، زیرا هیچ روشی برای بازیابی آن وجود ندارد.",
      adminUsername: "نام کاربری حساب مدیر",
      adminPassword: "رمز عبور حساب کاربری",
      adminPasswordReq: "رمز عبور باید حداقل 8 کاراکتر باشد.",
      teamHint:
        "به طور پیش‌فرض، شما تنها مدیر خواهید بود. پس از اتمام فرآیند ثبت‌نام، می‌توانید افراد دیگری را به عنوان کاربران یا مدیران اضافه کنید. لطفاً رمز عبور خود را فراموش نکنید، زیرا تنها مدیران می‌توانند رمز عبور را بازنشانی کنند.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "مدیریت داده‌ها و حریم خصوصی",
      description:
        "ما متعهد به شفافیت و کنترل در رابطه با اطلاعات شخصی شما هستیم.",
      settingsHint:
        "این تنظیمات می‌توانند در هر زمان در بخش تنظیمات تغییر داده شوند.",
    },
    survey: {
      title: "به AnythingLLM خوش آمدید",
      description:
        "ما را در ساخت مدل AnythingLLM متناسب با نیازهای شما یاری دهید. (این بخش اختیاری است)",
      email: "آدرس ایمیل شما چیست؟",
      useCase: "شما از AnythingLLM برای چه منظوری استفاده خواهید کرد؟",
      useCaseWork: "برای کار",
      useCasePersonal: "برای استفاده شخصی",
      useCaseOther: "سایر",
      comment: "شما از کجا در مورد AnythingLLM مطلع شدید؟",
      commentPlaceholder:
        "Reddit، توییتر، گیت‌هاب، یوتیوب و غیره - لطفاً به ما بگویید که چگونه ما را پیدا کردید!",
      skip: "پرش از نظرسنجی",
      thankYou: "از بازخورد شما سپاسگزاریم.",
    },
    workspace: {
      title: "ایجاد فضای کاری اول خود",
      description:
        "فضای کاری خود را ایجاد کنید و با AnythingLLM شروع به کار کنید.",
    },
  },
  common: {
    "workspaces-name": "نام فضای کار",
    error: "خطا",
    success: "موفق",
    user: "کاربر",
    selection: "انتخاب مدل",
    saving: "در حال ذخیره...",
    save: "ذخیره تغییرات",
    previous: "صفحه قبلی",
    next: "صفحه بعدی",
    optional: "اختیاری",
    yes: "بله",
    no: "نه",
    search: "جستجو",
    username_requirements:
      "نام کاربری باید 2 تا 32 کاراکتر باشد، با حرف کوچک شروع شود و فقط شامل حروف کوچک، اعداد، زیرخط، خط تیره و نقطه باشد.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "خوش آمدید",
    chooseWorkspace: "انتخاب یک فضای کار برای شروع گفتگو!",
    notAssigned:
      "شما در حال حاضر به هیچ فضای کاری اختصاص نیافته‌اید.\nلطفاً با مدیر خود تماس بگیرید تا دسترسی به یک فضای کار را درخواست کنید.",
    goToWorkspace: 'به فضای کار "{{workspace}}" بروید',
  },
  settings: {
    title: "تنظیمات سامانه",
    system: "تنظیمات عمومی",
    invites: "دعوت‌نامه‌ها",
    users: "کاربران",
    workspaces: "فضاهای کاری",
    "workspace-chats": "گفتگوهای فضای کاری",
    customization: "شخصی‌سازی",
    interface: "تنظیمات رابط کاربری",
    branding: "برندسازی و تولید محصولات با برچسب سفید",
    chat: "چت",
    "api-keys": "API توسعه‌دهندگان",
    llm: "مدل زبانی",
    transcription: "رونویسی",
    embedder: "جاسازی",
    "text-splitting": "تقسیم متن و تکه‌بندی",
    "voice-speech": "صدا و گفتار",
    "vector-database": "پایگاه داده برداری",
    embeds: "جاسازی گفتگو",
    "embed-chats": "تاریخچه گفتگوهای جاسازی شده",
    security: "امنیت",
    "event-logs": "گزارش رویدادها",
    privacy: "حریم خصوصی و داده‌ها",
    "ai-providers": "ارائه‌دهندگان هوش مصنوعی",
    "agent-skills": "مهارت‌های عامل",
    "community-hub": {
      title: "مرکز محلی",
      trending: "بررسی ترندها",
      "your-account": "حساب شما",
      "import-item": "وارد کردن کالا",
    },
    admin: "مدیریت",
    tools: "ابزارها",
    "system-prompt-variables": "متغیرهای اعلان سیستم\n\n\nمتغیرهای اعلان سیستم",
    "experimental-features": "ویژگی‌های آزمایشی",
    contact: "تماس با پشتیبانی",
    "browser-extension": "افزونه مرورگر",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "خوش آمدید به",
      "placeholder-username": "نام کاربری",
      "placeholder-password": "رمز عبور",
      login: "ورود",
      validating: "در حال اعتبارسنجی...",
      "forgot-pass": "فراموشی رمز عبور",
      reset: "بازنشانی",
    },
    "sign-in": "ورود به حساب {{appName}} کاربری شما.",
    "password-reset": {
      title: "بازنشانی رمز عبور",
      description: "برای بازنشانی رمز عبور خود، اطلاعات لازم را وارد کنید.",
      "recovery-codes": "کدهای بازیابی",
      "recovery-code": "کد بازیابی {{index}}",
      "back-to-login": "بازگشت به صفحه ورود",
    },
  },
  "main-page": {
    greeting: "امروز چگونه می‌توانم به شما کمک کنم؟",
    noWorkspaceError: "لطفاً قبل از شروع گفتگو، یک فضای کاری ایجاد کنید.",
    checklist: {
      title: "شروع کار",
      tasksLeft: "وظایف باقی‌مانده",
      completed:
        "شما در مسیر تبدیل شدن به یک متخصص در زمینه مدل‌های LLM هستید!",
      dismiss: "بستن",
      tasks: {
        create_workspace: {
          title: "ایجاد یک فضای کاری",
          description: "برای شروع، فضای کاری خود را ایجاد کنید",
          action: "ایجاد",
        },
        send_chat: {
          title: "ارسال یک پیام چت",
          description: "با دستیار هوش مصنوعی خود صحبت کنید",
          action: "چت",
        },
        embed_document: {
          title: "ذخیره یک سند",
          description: "اضافه کردن اولین سند خود به فضای کاری",
          action: "قرار دادن",
        },
        setup_system_prompt: {
          title: "یک سیستم راهنما راه‌اندازی کنید.",
          description: "تنظیم رفتار دستیار هوش مصنوعی خود",
          action: "راه‌اندازی",
        },
        define_slash_command: {
          title: "یک دستور (slash command) را تعریف کنید.",
          description: "ایجاد دستورات سفارشی برای دستیار خود",
          action: "تعریف کنید",
        },
        visit_community: {
          title: "بازدید از مرکز محلی",
          description: "بررسی منابع و الگوهای موجود در جامعه",
          action: "مرور کنید",
        },
      },
    },
    quickActions: {
      createAgent: "ایجاد یک عامل",
      editWorkspace: "ویرایش فضای کاری",
      uploadDocument: "بارگذاری یک سند",
    },
    quickLinks: {
      title: "لینک‌های سریع",
      sendChat: "ارسال چت",
      embedDocument: "ذخیره یک سند",
      createWorkspace: "ایجاد فضای کاری",
    },
    exploreMore: {
      title: "ویژگی‌های بیشتر را کشف کنید",
      features: {
        customAgents: {
          title: "آژانتهای هوش مصنوعی سفارشی",
          description:
            "ایجاد عوامل هوش مصنوعی و اتوماسیون قدرتمند بدون نیاز به کد.",
          primaryAction: "با استفاده از @agent\n\nبا استفاده از @agent",
          secondaryAction: "طراحی یک جریان برای یک عامل",
        },
        slashCommands: {
          title: "دستورات کوتاه",
          description:
            "با استفاده از دستورات سفارشی، زمان را صرفه‌جویی کنید و اعلان‌ها را فعال کنید.",
          primaryAction: "ایجاد یک دستور Slash",
          secondaryAction: "کاوش در هاب",
        },
        systemPrompts: {
          title: "دستورالعمل‌های سیستم",
          description:
            "برای سفارشی‌سازی پاسخ‌های هوش مصنوعی در یک محیط کاری، دستورالعمل سیستم را تغییر دهید.",
          primaryAction: "تغییر یک دستورالعمل سیستم",
          secondaryAction: "مدیریت متغیرهای پویا",
        },
      },
    },
    announcements: {
      title: "اخبار و اطلاعیه‌ها",
    },
    resources: {
      title: "منابع",
      links: {
        docs: "اسناد",
        star: "ستاره‌گذاری در گیت‌هاب",
      },
      keyboardShortcuts: "کلیدهای میانبر",
    },
  },
  "new-workspace": {
    title: "فضای کاری جدید",
    placeholder: "فضای کاری من",
  },
  "workspaces—settings": {
    general: "تنظیمات عمومی",
    chat: "تنظیمات گفتگو",
    vector: "پایگاه داده برداری",
    members: "اعضا",
    agent: "پیکربندی عامل",
  },
  general: {
    vector: {
      title: "تعداد بردارها",
      description: "تعداد کل بردارها در پایگاه داده برداری شما.",
    },
    names: {
      description: "این فقط نام نمایشی فضای کاری شما را تغییر خواهد داد.",
    },
    message: {
      title: "پیام‌های گفتگوی پیشنهادی",
      description:
        "پیام‌هایی که به کاربران فضای کاری پیشنهاد می‌شود را شخصی‌سازی کنید.",
      add: "افزودن پیام جدید",
      save: "ذخیره پیام‌ها",
      heading: "برایم توضیح بده",
      body: "مزایای AnythingLLM را",
    },
    pfp: {
      title: "تصویر پروفایل دستیار",
      description: "تصویر پروفایل دستیار را برای این فضای کاری شخصی‌سازی کنید.",
      image: "تصویر فضای کاری",
      remove: "حذف تصویر فضای کاری",
    },
    delete: {
      title: "حذف فضای کاری",
      description:
        "این فضای کاری و تمام داده‌های آن را حذف کنید. این کار فضای کاری را برای همه کاربران حذف خواهد کرد.",
      delete: "حذف فضای کاری",
      deleting: "در حال حذف فضای کاری...",
      "confirm-start": "شما در حال حذف کامل",
      "confirm-end":
        "فضای کاری هستید. این کار تمام جاسازی‌های برداری را از پایگاه داده برداری شما حذف خواهد کرد.\n\nفایل‌های اصلی منبع دست نخورده باقی خواهند ماند. این عمل برگشت‌ناپذیر است.",
    },
  },
  chat: {
    llm: {
      title: "ارائه‌دهنده LLM فضای کاری",
      description:
        "ارائه‌دهنده و مدل LLM خاصی که برای این فضای کاری استفاده خواهد شد. به طور پیش‌فرض، از ارائه‌دهنده و تنظیمات LLM سیستم استفاده می‌کند.",
      search: "جستجوی تمام ارائه‌دهندگان LLM",
    },
    model: {
      title: "مدل گفتگوی فضای کاری",
      description:
        "مدل گفتگوی خاصی که برای این فضای کاری استفاده خواهد شد. اگر خالی باشد، از ترجیحات LLM سیستم استفاده خواهد کرد.",
      wait: "-- در انتظار مدل‌ها --",
    },
    mode: {
      title: "حالت گفتگو",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "گفتگو",
        "desc-start": "پاسخ‌ها را با دانش عمومی LLM",
        and: "و",
        "desc-end": "محتوای اسناد یافت شده ارائه می‌دهد.",
      },
      query: {
        title: "پرس‌وجو",
        "desc-start": "پاسخ‌ها را",
        only: "فقط",
        "desc-end": "در صورت یافتن محتوای اسناد ارائه می‌دهد.",
      },
    },
    history: {
      title: "تاریخچه گفتگو",
      "desc-start":
        "تعداد گفتگوهای قبلی که در حافظه کوتاه‌مدت پاسخ گنجانده خواهد شد.",
      recommend: "پیشنهاد: ۲۰. ",
      "desc-end":
        "بیش از ۴۵ احتمالاً منجر به شکست مداوم گفتگو می‌شود که به اندازه پیام‌ها بستگی دارد.",
    },
    prompt: {
      title: "پیش‌متن",
      description:
        "پیش‌متنی که در این فضای کاری استفاده خواهد شد. زمینه و دستورالعمل‌ها را برای تولید پاسخ توسط هوش مصنوعی تعریف کنید. باید یک پیش‌متن دقیق ارائه دهید تا هوش مصنوعی بتواند پاسخی مرتبط و دقیق تولید کند.",
      history: {
        title: "تاریخچه دستورات سیستم",
        clearAll: "پاک کردن همه",
        noHistory: "هیچ سابقه دستورالعمل در دسترس نیست.",
        restore: "بازگرداندن",
        delete: "حذف",
        publish: "انتشار در مرکز جامعه",
        deleteConfirm:
          "آیا مطمئن هستید که می‌خواهید این آیتم تاریخ را حذف کنید؟",
        clearAllConfirm:
          "آیا مطمئن هستید که می‌خواهید تمام تاریخچه را پاک کنید؟ این اقدام قابل لغو نیست.",
        expand: "گسترش",
      },
    },
    refusal: {
      title: "پاسخ رد در حالت پرس‌وجو",
      "desc-start": "در حالت",
      query: "پرس‌وجو",
      "desc-end":
        "ممکن است بخواهید هنگامی که هیچ محتوایی یافت نمی‌شود، یک پاسخ رد سفارشی برگردانید.",
      "tooltip-title": "من این را می‌بینم، چرا؟",
      "tooltip-description":
        "شما در حالت پرس‌وجو هستید، که تنها از اطلاعات موجود در اسناد شما استفاده می‌کند. برای گفتگوهای انعطاف‌پذیرتر، به حالت چت بروید، یا برای کسب اطلاعات بیشتر در مورد حالت‌های چت، اینجا را کلیک کنید.",
    },
    temperature: {
      title: "دمای LLM",
      "desc-start":
        'این تنظیم میزان "خلاقیت" پاسخ‌های LLM شما را کنترل می‌کند.',
      "desc-end":
        "هر چه عدد بالاتر باشد، خلاقیت بیشتر است. برای برخی مدل‌ها، تنظیم بسیار بالا می‌تواند منجر به پاسخ‌های نامفهوم شود.",
      hint: "اکثر LLMها محدوده‌های مختلفی از مقادیر معتبر را دارند. برای این اطلاعات به ارائه‌دهنده LLM خود مراجعه کنید.",
    },
  },
  "vector-workspace": {
    identifier: "شناسه پایگاه داده برداری",
    snippets: {
      title: "حداکثر قطعات متنی",
      description:
        "این تنظیم حداکثر تعداد قطعات متنی که برای هر گفتگو یا پرس‌وجو به LLM ارسال می‌شود را کنترل می‌کند.",
      recommend: "پیشنهادی: 4",
    },
    doc: {
      title: "آستانه شباهت سند",
      description:
        "حداقل امتیاز شباهت مورد نیاز برای اینکه یک منبع مرتبط با گفتگو در نظر گرفته شود. هر چه عدد بالاتر باشد، منبع باید شباهت بیشتری با گفتگو داشته باشد.",
      zero: "بدون محدودیت",
      low: "پایین (امتیاز شباهت ≥ .25)",
      medium: "متوسط (امتیاز شباهت ≥ .50)",
      high: "بالا (امتیاز شباهت ≥ .75)",
    },
    reset: {
      reset: "بازنشانی پایگاه داده برداری",
      resetting: "در حال پاک کردن بردارها...",
      confirm:
        "شما در حال بازنشانی پایگاه داده برداری این فضای کاری هستید. این کار تمام جاسازی‌های برداری فعلی را حذف خواهد کرد.\n\nفایل‌های اصلی منبع دست نخورده باقی خواهند ماند. این عمل برگشت‌ناپذیر است.",
      error: "بازنشانی پایگاه داده برداری فضای کاری امکان‌پذیر نبود!",
      success: "پایگاه داده برداری فضای کاری بازنشانی شد!",
    },
  },
  agent: {
    "performance-warning":
      "عملکرد LLMهایی که به طور صریح از فراخوانی ابزار پشتیبانی نمی‌کنند، به شدت به قابلیت‌ها و دقت مدل وابسته است. برخی توانایی‌ها ممکن است محدود یا غیرفعال باشند.",
    provider: {
      title: "ارائه‌دهنده LLM عامل فضای کاری",
      description:
        "ارائه‌دهنده و مدل LLM خاصی که برای عامل @agent این فضای کاری استفاده خواهد شد.",
    },
    mode: {
      chat: {
        title: "مدل گفتگوی عامل فضای کاری",
        description:
          "مدل گفتگوی خاصی که برای عامل @agent این فضای کاری استفاده خواهد شد.",
      },
      title: "مدل عامل فضای کاری",
      description:
        "مدل LLM خاصی که برای عامل @agent این فضای کاری استفاده خواهد شد.",
      wait: "-- در انتظار مدل‌ها --",
    },
    skill: {
      title: "مهارت‌های پیش‌فرض عامل",
      description:
        "توانایی‌های طبیعی عامل پیش‌فرض را با این مهارت‌های از پیش ساخته شده بهبود دهید. این تنظیمات برای تمام فضاهای کاری اعمال می‌شود.",
      rag: {
        title: "RAG و حافظه بلندمدت",
        description:
          'به عامل اجازه دهید از اسناد محلی شما برای پاسخ به پرس‌وجو استفاده کند یا از عامل بخواهید قطعات محتوا را برای بازیابی حافظه بلندمدت "به خاطر بسپارد".',
      },
      view: {
        title: "مشاهده و خلاصه‌سازی اسناد",
        description:
          "به عامل اجازه دهید محتوای فایل‌های جاسازی شده فعلی فضای کاری را فهرست و خلاصه کند.",
      },
      scrape: {
        title: "استخراج از وب‌سایت‌ها",
        description:
          "به عامل اجازه دهید محتوای وب‌سایت‌ها را بازدید و استخراج کند.",
      },
      generate: {
        title: "تولید نمودارها",
        description:
          "به عامل پیش‌فرض امکان تولید انواع مختلف نمودار از داده‌های ارائه شده یا داده شده در گفتگو را بدهید.",
      },
      save: {
        title: "تولید و ذخیره فایل‌ها در مرورگر",
        description:
          "به عامل پیش‌فرض امکان تولید و نوشتن در فایل‌هایی که ذخیره می‌شوند و می‌توانند در مرورگر شما دانلود شوند را بدهید.",
      },
      web: {
        title: "جستجو و مرور زنده وب",
        description:
          "با اتصال به یک ارائه‌دهنده خدمات جستجوی وب (SERP)، به نماینده خود این امکان را بدهید تا از طریق اینترنت، به سوالات شما پاسخ دهد.",
      },
      sql: {
        title: "اتصال دهنده SQL",
        description:
          "به اپراتور خود اجازه دهید تا با اتصال به ارائه‌دهندگان مختلف پایگاه داده SQL، از SQL برای پاسخگویی به سوالات شما استفاده کند.",
      },
      default_skill:
        "به طور پیش‌فرض، این قابلیت فعال است، اما می‌توانید آن را غیرفعال کنید اگر نمی‌خواهید این قابلیت برای نمایندگی در دسترس باشد.",
    },
  },
  recorded: {
    title: "گفتگوهای فضای کاری",
    description:
      "این‌ها تمام گفتگوها و پیام‌های ثبت شده هستند که توسط کاربران ارسال شده‌اند و بر اساس تاریخ ایجاد مرتب شده‌اند.",
    export: "خروجی‌گیری",
    table: {
      id: "شناسه",
      by: "ارسال شده توسط",
      workspace: "فضای کاری",
      prompt: "درخواست",
      response: "پاسخ",
      at: "زمان ارسال",
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
      title: "تنظیمات رابط کاربری",
      description: "تنظیمات رابط کاربری خود را برای AnythingLLM تعیین کنید.",
    },
    branding: {
      title: "برندسازی و ارائه خدمات با برچسب سفید",
      description:
        "با استفاده از برندسازی سفارشی، نمونه‌ی AnythingLLM خود را با برچسب سفید (White-label) ارائه دهید.",
    },
    chat: {
      title: "چت",
      description: "تنظیم ترجیحات چت خود برای AnythingLLM.",
      auto_submit: {
        title: "وارد کردن خودکار گفتار",
        description: "ارسال خودکار ورودی گفتار پس از یک دوره سکوت",
      },
      auto_speak: {
        title: "پاسخ‌های خودکار",
        description: "پاسخ‌های خودکار تولید شده توسط هوش مصنوعی",
      },
      spellcheck: {
        title: "فعال کردن بررسی املایی",
        description: "فعال یا غیرفعال کردن بررسی املایی در فیلد ورودی چت",
      },
    },
    items: {
      theme: {
        title: "موضوع",
        description: "رنگ مورد علاقه خود را برای برنامه انتخاب کنید.",
      },
      "show-scrollbar": {
        title: "نمایش نوار پیمایش",
        description: "فعال یا غیرفعال کردن نوار پیمایش در پنجره چت.",
      },
      "support-email": {
        title: "پشتیبانی از طریق ایمیل",
        description:
          "آدرس ایمیل پشتیبانی را تعیین کنید که کاربران در صورت نیاز به کمک، می‌توانند از آن استفاده کنند.",
      },
      "app-name": {
        title: "نام",
        description: "یک نام را برای تمام کاربران در صفحه ورود مشخص کنید.",
      },
      "chat-message-alignment": {
        title: "همراه‌بودن پیام‌ها در چت",
        description:
          "هنگام استفاده از رابط چت، حالت هم‌تراز کردن پیام را انتخاب کنید.",
      },
      "display-language": {
        title: "زبان نمایش",
        description:
          "زبان مورد نظر برای نمایش رابط کاربری AnythingLLM را انتخاب کنید - در صورت وجود ترجمه‌ها.",
      },
      logo: {
        title: "لوگوی برند",
        description:
          "لوگوی سفارشی خود را برای نمایش در تمام صفحات بارگذاری کنید.",
        add: "اضافه کردن یک لوگوی سفارشی",
        recommended: "اندازه پیشنهادی: 800 در 200",
        remove: "حذف",
        replace: "جایگزین کردن",
      },
      "welcome-messages": {
        title: "پیام‌های خوش‌آمد",
        description:
          "پیام‌های خوش‌آمدی که به کاربران نمایش داده می‌شوند را سفارشی کنید. فقط کاربران غیر از مدیران این پیام‌ها را مشاهده خواهند کرد.",
        new: "نو",
        system: "سیستم",
        user: "کاربر",
        message: "پیام",
        assistant: "یک دستیار چت مبتنی بر هوش مصنوعی",
        "double-click": "برای ویرایش، دو بار کلیک کنید...",
        save: "ذخیره پیام‌ها",
      },
      "browser-appearance": {
        title: "ظاهر مرورگر",
        description:
          "ظاهر تب و عنوان مرورگر را هنگام باز بودن برنامه، سفارشی کنید.",
        tab: {
          title: "عنوان",
          description:
            "هنگام باز شدن برنامه در یک مرورگر، یک عنوان سفارشی برای تب تنظیم کنید.",
        },
        favicon: {
          title: "آیکون Favicon",
          description: "از آیکون سفارشی برای تب مرورگر استفاده کنید.",
        },
      },
      "sidebar-footer": {
        title: "عناصر پایینی نوار کناری",
        description: "تنظیم عناصر پاورهای نمایش داده شده در پایین بخش کناری.",
        icon: "آیکون",
        link: "لینک",
      },
      "render-html": {
        title: "نمایش کد HTML در چت",
        description:
          "ارائه پاسخ‌های HTML در پاسخ‌های دستی.\nاین می‌تواند منجر به کیفیت پاسخ با سطح دقت بسیار بالاتر شود، اما همچنین می‌تواند خطرات امنیتی بالقوه‌ای را به همراه داشته باشد.",
      },
    },
  },
  api: {
    title: "کلیدهای API",
    description:
      "کلیدهای API به دارنده آن‌ها اجازه می‌دهند به صورت برنامه‌نویسی به این نمونه AnythingLLM دسترسی داشته و آن را مدیریت کنند.",
    link: "مطالعه مستندات API",
    generate: "ایجاد کلید API جدید",
    table: {
      key: "کلید API",
      by: "ایجاد شده توسط",
      created: "تاریخ ایجاد",
    },
  },
  llm: {
    title: "ترجیحات مدل زبانی",
    description:
      "این‌ها اعتبارنامه‌ها و تنظیمات ارائه‌دهنده مدل زبانی و جاسازی انتخابی شما هستند. مهم است که این کلیدها به‌روز و صحیح باشند در غیر این صورت AnythingLLM به درستی کار نخواهد کرد.",
    provider: "ارائه‌دهنده مدل زبانی",
    providers: {
      azure_openai: {
        azure_service_endpoint: "پایان‌نقطه سرویس Azure",
        api_key: "کلید API",
        chat_deployment_name: "نام استقرار چت",
        chat_model_token_limit: "محدودیت تعداد توکن در مدل چت",
        model_type: "نوع مدل",
        model_type_tooltip:
          'اگر سیستم شما از یک مدل استدلال (مانند o1، o1-mini، o3-mini و غیره) استفاده می‌کند، این گزینه را روی "استدلال" تنظیم کنید. در غیر این صورت، درخواست‌های چت شما ممکن است با شکست مواجه شوند.',
        default: "پیش‌فرض",
        reasoning: "استدلال",
      },
    },
  },
  transcription: {
    title: "ترجیحات مدل رونویسی",
    description:
      "این‌ها اعتبارنامه‌ها و تنظیمات ارائه‌دهنده مدل رونویسی انتخابی شما هستند. مهم است که این کلیدها به‌روز و صحیح باشند در غیر این صورت فایل‌های رسانه و صوتی رونویسی نخواهند شد.",
    provider: "ارائه‌دهنده رونویسی",
    "warn-start":
      "استفاده از مدل محلی Whisper روی دستگاه‌هایی با RAM یا CPU محدود می‌تواند هنگام پردازش فایل‌های رسانه‌ای باعث توقف AnythingLLM شود.",
    "warn-recommend":
      "ما حداقل ۲ گیگابایت RAM و آپلود فایل‌های کمتر از ۱۰ مگابایت را توصیه می‌کنیم.",
    "warn-end": "مدل داخلی در اولین استفاده به صورت خودکار دانلود خواهد شد.",
  },
  embedding: {
    title: "ترجیحات جاسازی",
    "desc-start":
      "هنگام استفاده از یک LLM که به طور پیش‌فرض از موتور جاسازی پشتیبانی نمی‌کند - ممکن است نیاز به تعیین اعتبارنامه‌های اضافی برای جاسازی متن داشته باشید.",
    "desc-end":
      "جاسازی فرآیند تبدیل متن به بردارها است. این اعتبارنامه‌ها برای تبدیل فایل‌ها و درخواست‌های شما به فرمتی که AnythingLLM بتواند پردازش کند، ضروری هستند.",
    provider: {
      title: "ارائه‌دهنده جاسازی",
    },
  },
  text: {
    title: "تقسیم متن و تکه‌بندی",
    "desc-start":
      "تقسیم متن به شما امکان می‌دهد اسناد بزرگ را به بخش‌های کوچک‌تر تقسیم کنید که برای جاسازی و پردازش مناسب‌تر هستند.",
    "desc-end":
      "سعی کنید تعادلی بین اندازه بخش و همپوشانی ایجاد کنید تا از دست رفتن اطلاعات را به حداقل برسانید.",
    size: {
      title: "حداکثر اندازه بخش",
      description:
        "این حداکثر تعداد کاراکترهایی است که می‌تواند در یک بردار وجود داشته باشد.",
      recommend: "حداکثر طول مدل جاسازی",
    },
    overlap: {
      title: "همپوشانی بخش‌های متن",
      description:
        "این حداکثر همپوشانی کاراکترها است که در هنگام تکه‌بندی بین دو بخش متن مجاور رخ می‌دهد.",
    },
  },
  vector: {
    title: "پایگاه داده برداری",
    description:
      "این‌ها اعتبارنامه‌ها و تنظیمات نحوه عملکرد نمونه AnythingLLM شما هستند. مهم است که این کلیدها به‌روز و صحیح باشند.",
    provider: {
      title: "ارائه‌دهنده پایگاه داده برداری",
      description: "برای LanceDB نیازی به پیکربندی نیست.",
    },
  },
  embeddable: {
    title: "جاسازی گفتگو",
    description:
      "جاسازی گفتگو به شما امکان می‌دهد گفتگوی فضای کاری را در وب‌سایت یا برنامه خود قرار دهید.",
    create: "ایجاد جاسازی جدید",
    table: {
      workspace: "فضای کاری",
      chats: "گفتگوهای ارسال شده",
      active: "دامنه‌های فعال",
      created: "ایجاد شده",
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
    title: "گفتگوهای جاسازی شده",
    export: "خروجی‌گیری",
    description:
      "این لیست تمام گفتگوها و پیام‌های ثبت شده از هر جاسازی که منتشر کرده‌اید را نشان می‌دهد.",
    table: {
      embed: "جاسازی",
      sender: "فرستنده",
      message: "پیام",
      response: "پاسخ",
      at: "زمان ارسال",
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
    title: "امنیت",
    multiuser: {
      title: "حالت چند کاربره",
      description:
        "نمونه خود را برای پشتیبانی از تیم خود با فعال‌سازی حالت چند کاربره تنظیم کنید.",
      enable: {
        "is-enable": "حالت چند کاربره فعال است",
        enable: "فعال‌سازی حالت چند کاربره",
        description:
          "به طور پیش‌فرض، شما تنها مدیر خواهید بود. به عنوان مدیر، باید برای تمام کاربران یا مدیران جدید حساب کاربری ایجاد کنید. رمز عبور خود را گم نکنید زیرا فقط یک کاربر مدیر می‌تواند رمزهای عبور را بازنشانی کند.",
        username: "نام کاربری حساب مدیر",
        password: "رمز عبور حساب مدیر",
      },
    },
    password: {
      title: "حفاظت با رمز عبور",
      description:
        "از نمونه AnythingLLM خود با رمز عبور محافظت کنید. اگر این رمز را فراموش کنید هیچ روش بازیابی وجود ندارد، پس حتماً این رمز عبور را ذخیره کنید.",
      "password-label": "رمز عبور نمونه",
    },
  },
  event: {
    title: "گزارش رویدادها",
    description:
      "مشاهده تمام اقدامات و رویدادهای در حال وقوع در این نمونه برای نظارت.",
    clear: "پاک کردن گزارش رویدادها",
    table: {
      type: "نوع رویداد",
      user: "کاربر",
      occurred: "زمان وقوع",
    },
  },
  privacy: {
    title: "حریم خصوصی و مدیریت داده‌ها",
    description:
      "این پیکربندی شما برای نحوه مدیریت داده‌ها توسط ارائه‌دهندگان شخص ثالث متصل و AnythingLLM است.",
    llm: "انتخاب مدل زبانی",
    embedding: "ترجیحات جاسازی",
    vector: "پایگاه داده برداری",
    anonymous: "ارسال تله‌متری ناشناس فعال است",
  },
  connectors: {
    "search-placeholder": "اتصال‌دهنده‌های داده",
    "no-connectors": "هیچ اتصال داده‌ای یافت نشد.",
    obsidian: {
      name: "آوبیشین",
      description: "وارد کردن دیسک Obsidian با یک کلیک.",
      vault_location: "موقعیت گاوصندوق",
      vault_description:
        'برای وارد کردن تمام یادداشت‌ها و ارتباطات آن‌ها، پوشه مربوط به "Obsidian" خود را انتخاب کنید.',
      selected_files: "کشف {{count}} فایل Markdown",
      importing: "وارد کردن کپسول...",
      import_vault: "وارد کردن از بایوت",
      processing_time: "این ممکن است بسته به اندازه خزانه شما، مدتی طول بکشد.",
      vault_warning:
        "برای جلوگیری از هرگونه اختلاف، مطمئن شوید که دیسک Obsidian شما در حال حاضر بسته است.",
    },
    github: {
      name: "ذوبان",
      description: "وارد کردن کل یک مخزن عمومی یا خصوصی در GitHub با یک کلیک.",
      URL: "آدرس مخزن GitHub",
      URL_explained:
        "آدرس مخزن GitHub که می‌خواهید از آن اطلاعات جمع‌آوری کنید.",
      token: "توکن دسترسی به گیت‌هاب",
      optional: "اختیاری",
      token_explained: "توکن دسترسی برای جلوگیری از محدودیت سرعت.",
      token_explained_start: "بدون",
      token_explained_link1: "توکن دسترسی شخصی",
      token_explained_middle:
        "، به دلیل محدودیت‌های سرعت، ممکن است API GitHub تعداد فایل‌هایی که می‌توان جمع‌آوری کرد را محدود کند. شما می‌توانید",
      token_explained_link2: "ایجاد یک توکن دسترسی موقت",
      token_explained_end: "برای جلوگیری از این مشکل.",
      ignores: "فایل را نادیده بگیرید",
      git_ignore:
        "فایل را در فرمت .gitignore برای نادیده گرفتن فایل‌های خاص در حین جمع‌آوری، وارد کنید. پس از هر ورودی که می‌خواهید ذخیره کنید، کلید Enter را فشار دهید.",
      task_explained:
        "پس از اتمام، تمام فایل‌ها برای درج در محیط‌های کاری در انتخاب‌گر اسناد در دسترس خواهند بود.",
      branch: "دایرکتی که می‌خواهید فایل‌ها را از آن دریافت کنید.",
      branch_loading: "-- بارگذاری شاخ‌های موجود --",
      branch_explained: "دایرتی که می‌خواهید فایل‌ها را از آن دریافت کنید.",
      token_information:
        "با وارد نکردن **توکن دسترسی GitHub**، این اتصال داده فقط می‌تواند فایل‌های سطح بالایی از مخزن را جمع‌آوری کند، به دلیل محدودیت‌های نرخ دسترسی API عمومی GitHub.",
      token_personal:
        "با داشتن یک حساب کاربری در GitHub، می‌توانید یک توکن دسترسی شخصی رایگان دریافت کنید.",
    },
    gitlab: {
      name: "ذخیره GitLab",
      description: "وارد کردن کل یک مخزن عمومی یا خصوصی GitLab با یک کلیک.",
      URL: "آدرس مخزن GitLab",
      URL_explained:
        "آدرس مخزن GitLab که می‌خواهید از آن اطلاعات جمع‌آوری کنید.",
      token: "توکن دسترسی GitLab",
      optional: "اختیاری",
      token_explained: "توکنی برای جلوگیری از محدودیت سرعت.",
      token_description:
        "برای دریافت اطلاعات از API GitLab، موجودیت‌های اضافی را انتخاب کنید.",
      token_explained_start: "بدون",
      token_explained_link1: "توکن دسترسی شخصی",
      token_explained_middle:
        "، API گیت‌لاب ممکن است به دلیل محدودیت‌های سرعت، تعداد فایل‌هایی که می‌توان جمع‌آوری کرد را محدود کند. شما می‌توانید",
      token_explained_link2: "ایجاد یک توکن دسترسی موقت",
      token_explained_end: "برای جلوگیری از این مشکل.",
      fetch_issues: "استخراج مسائل به صورت اسناد",
      ignores: "فایل را نادیده بگیرید",
      git_ignore:
        "فایل را در فرمت .gitignore برای نادیده گرفتن فایل‌های خاص در حین جمع‌آوری، وارد کنید. پس از هر ورودی که می‌خواهید ذخیره کنید، کلید Enter را فشار دهید.",
      task_explained:
        "پس از اتمام، تمام فایل‌ها برای قرار دادن در محیط‌های کاری در انتخاب‌گر فایل‌ها در دسترس خواهند بود.",
      branch: "دایرتی که می‌خواهید فایل‌ها را از آن دریافت کنید",
      branch_loading: "-- بارگذاری شاخ‌های موجود --",
      branch_explained: "دایرکتی که می‌خواهید فایل‌ها را از آن دریافت کنید.",
      token_information:
        "با عدم وارد کردن **توکن دسترسی GitLab**، این اتصال داده تنها قادر به جمع‌آوری **فایل‌های سطح اول** مخزن خواهد بود، به دلیل محدودیت‌های نرخ دسترسی API عمومی GitLab.",
      token_personal:
        "با داشتن یک حساب کاربری در GitLab، می‌توانید یک توکن دسترسی شخصی رایگان دریافت کنید.",
    },
    youtube: {
      name: "اسکریپت یوتیوب",
      description: "وارد کردن متن یک ویدیو کامل از یوتیوب از طریق یک لینک.",
      URL: "لینک ویدیو در یوتیوب",
      URL_explained_start:
        "برای دریافت زیرنویس هر ویدیوی یوتیوب، آدرس URL آن را وارد کنید. ویدیوی مورد نظر باید دارای",
      URL_explained_link: "زیرنویس",
      URL_explained_end: "در دسترس است.",
      task_explained:
        "پس از اتمام، این متن می‌تواند در ابزارهای کاری مختلف، از طریق انتخاب فایل، قرار داده شود.",
      language: "ترجمه زبان",
      language_explained: "زبان مورد نظر برای جمع‌آوری متن را انتخاب کنید.",
      loading_languages: "-- زبان‌های موجود را بارگذاری می‌کنیم --",
    },
    "website-depth": {
      name: "ابزار جمع‌آوری لینک‌های حجمی",
      description:
        "استخراج محتوای یک وب‌سایت و لینک‌های فرعی آن تا یک سطح مشخص.",
      URL: "آدرس وب‌سایت",
      URL_explained: "آدرس وب‌سایتی که می‌خواهید اطلاعات آن را استخراج کنید.",
      depth: "عمق خزیدن",
      depth_explained:
        "این تعداد، تعداد لینک‌های مربوط به کودکان است که کارگر باید از آدرس اصلی دنبال کند.",
      max_pages: "صفحات بیشتر",
      max_pages_explained: "حداکثر تعداد لینک‌هایی که باید جمع‌آوری شوند.",
      task_explained:
        "پس از اتمام، تمام محتوای جمع‌آوری‌شده در دسترس خواهد بود تا بتوان آن را در برنامه‌های کاری (یا فضاهای کاری) از طریق انتخاب اسناد، وارد کرد.",
    },
    confluence: {
      name: "همگرایی",
      description: "با یک کلیک، کل صفحه Confluence را وارد کنید.",
      deployment_type: "نوع استقرار:",
      deployment_type_explained:
        "لطفاً مشخص کنید که آیا نمونه‌ی Atlassian شما در فضای ابری Atlassian یا در سرور خود میزبانی می‌شود.",
      base_url: "آدرس پایه برای confluence",
      base_url_explained: "این آدرس پایه برای فضای Confluence شما است.",
      space_key: 'کلید فضای "کانفلوانس"',
      space_key_explained:
        "این کلید فضایی مربوط به نمونه‌ی confluence شما است که برای استفاده خواهد شد. معمولاً با ~ شروع می‌شود.",
      username: "نام کاربری confluent",
      username_explained: "نام کاربری شما در Confluence",
      auth_type: "نوع احراز هویت: Confluence",
      auth_type_explained:
        "نوع احراز هویت مورد نظر خود را برای دسترسی به صفحات Confluence انتخاب کنید.",
      auth_type_username: "نام کاربری و توکن دسترسی",
      auth_type_personal: "توکن دسترسی شخصی",
      token: "توکن دسترسی به confluent",
      token_explained_start:
        "شما باید یک توکن دسترسی برای احراز هویت ارائه دهید. شما می‌توانید یک توکن دسترسی ایجاد کنید.",
      token_explained_link: "اینجا",
      token_desc: "توکنی برای احراز هویت",
      pat_token: "توکن دسترسی شخصی confluence",
      pat_token_explained: "توکن دسترسی شخصی شما در Confluence.",
      bypass_ssl: "عدم اعتبار سنجی گواهی SSL",
      bypass_ssl_explained:
        "برای دور زدن اعتبار سنجی گواهی SSL در نمونه‌های خود میزبانی شده confluence با استفاده از گواهی امضا شده توسط خود، این گزینه را فعال کنید.",
      task_explained:
        "پس از اتمام، محتوای صفحه برای درج در فضاهای کاری در ابزار انتخاب اسناد در دسترس خواهد بود.",
    },
    manage: {
      documents: "اسناد",
      "data-connectors": "اتصال‌دهنده‌ها",
      "desktop-only":
        "تغییر این تنظیمات تنها در دستگاه‌های دسکتاپ در دسترس است. لطفاً برای ادامه، این صفحه را در دستگاه دسکتاپ خود باز کنید.",
      dismiss: "<",
      editing: "ویرایش",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "اسناد من",
      "new-folder": "فোলدر جدید",
      "search-document": "جستجو در مستند",
      "no-documents": "بدون مدارک",
      "move-workspace": "رفتن به فضای کاری",
      name: "نام",
      "delete-confirmation":
        "آیا مطمئن هستید که می‌خواهید این فایل‌ها و پوشه‌ها را حذف کنید؟\nاین کار باعث حذف فایل‌ها از سیستم و حذف خودکار آن‌ها از هر فضای کاری موجود می‌شود.\nاین اقدام غیرقابل بازگشت است.",
      "removing-message":
        "حذف {{count}} سند و {{folderCount}} پوشه. لطفاً منتظر بمانید.",
      "move-success": "انتقال موفقیت‌آمیز {{count}} سند.",
      date: "تاریخ",
      type: "نوع",
      no_docs: "بدون مدارک",
      select_all: "انتخاب همه",
      deselect_all: "انتخاب همه را لغو کنید",
      remove_selected: "حذف انتخاب‌شده",
      costs: "*هزینه یکباره برای ایجاد مدل‌های برداری",
      save_embed: "ذخیره و وارد کردن",
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
      "processor-offline":
        "دسترسی به سیستم پردازش اسناد غیر ممکن است.\n\nدسترسی به سیستم پردازش اسناد غیر ممکن است.",
      "processor-offline-desc":
        "ما نمی‌توانیم فایل‌های شما را در حال حاضر آپلود کنیم، زیرا پردازشگر اسناد غیرفعال است. لطفاً بعداً دوباره امتحان کنید.",
      "click-upload":
        "برای بارگذاری، روی آن کلیک کنید یا از طریق کشیدن و رها کردن",
      "file-types":
        "پشتیبانی از فایل‌های متنی، CSV، صفحات گسترده، فایل‌های صوتی و موارد دیگر!",
      "or-submit-link": "یا یک لینک ارسال کنید",
      "placeholder-link": "https://example.com",
      fetching: "در حال دریافت...",
      "fetch-website": "دسترسی به وب‌سایت",
      "privacy-notice":
        "این فایل‌ها در پردازشگر اسناد که روی این نمونه از AnythingLLM در حال اجرا است، بارگذاری خواهند شد. این فایل‌ها به هیچ شخص ثالثی ارسال یا به اشتراک گذاشته نمی‌شوند.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "مخزن کردن اسناد چیست؟",
      pin_explained_block1:
        'هنگامی که شما یک سند را در AnythingLLM "فیکس" می‌کنید، محتوای کامل سند را در پنجره دستورالعمل برای مدل زبان بزرگ شما قرار می‌دهیم تا مدل بتواند به طور کامل آن را درک کند.',
      pin_explained_block2:
        "این روش بهترین نتیجه را با مدل‌هایی که دارای **زمینه وسیع** هستند یا فایل‌های کوچک و مهم که برای پایگاه دانش آن ضروری هستند، ارائه می‌دهد.",
      pin_explained_block3:
        "اگر به پاسخ‌های مورد نظر خود از AnythingLLM به طور پیش‌فرض دریافت نمی‌کنید، «پین کردن» یک راه عالی برای دریافت پاسخ‌های با کیفیت بالاتر در یک مرحله است.",
      accept: "باشه، متوجه شدم.",
    },
    watching: {
      what_watching: "تماشای یک مستند چه تاثیری دارد؟",
      watch_explained_block1:
        "هنگام مشاهده یک سند در AnythingLLM، محتوای سند به طور خودکار از منبع اصلی آن، در فواصل زمانی منظم، همگام‌سازی می‌شود. این کار، به‌طور خودکار محتوا را در هر فضای کاری که این فایل در آن مدیریت می‌شود، به‌روز می‌کند.",
      watch_explained_block2:
        "این ویژگی در حال حاضر از محتوای مبتنی بر اینترنت پشتیبانی می‌کند و برای اسناد ارسالی به صورت دستی در دسترس نخواهد بود.",
      watch_explained_block3_start:
        "می‌توانید تعیین کنید که کدام اسناد باید مشاهده شوند، از طریق",
      watch_explained_block3_link: "مدیریت فایل",
      watch_explained_block3_end: "مدیریت دیدگاه.",
      accept: "باشه، متوجه شدم.",
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
    welcome: "به فضای کاری جدید خود خوش آمدید.",
    get_started: "برای شروع، می‌توانید",
    get_started_default: "برای شروع",
    upload: "ارسال یک سند",
    or: "یا",
    attachments_processing: "در حال پردازش پیوست‌ها. لطفاً منتظر بمانید...",
    send_chat: "ارسال یک پیام چت.",
    send_message: "یک پیام ارسال کنید",
    attach_file: "لطفاً یک فایل را به این چت پیوست کنید.",
    slash: "برای مشاهده تمام دستورات Slash موجود برای چت.",
    agents:
      "تمام عوامل موجود را که می‌توانید برای گفتگو استفاده کنید، مشاهده کنید.",
    start_agent_session: "Start agent session",
    text_size: "تغییر اندازه متن.",
    microphone: "سوال خود را بپرسید.",
    send: "پیام فوری را برای فضای کاری ارسال کنید",
    tts_speak_message: "پیام TTS Speak",
    copy: "کپی",
    regenerate: "بازسازی",
    regenerate_response: "بازسازی پاسخ",
    good_response: "پاسخ خوب",
    more_actions: "اقدامات بیشتر",
    hide_citations: "پنهان کردن ارجاعات",
    show_citations: "نمایش ارجاعات",
    sources: "منابع",
    source_count_one: "{{count}}، مرجع",
    source_count_other: "{{count}}، منابع",
    document: "اسناد",
    similarity_match: "مسابقه",
    pause_tts_speech_message: "مکالمه را متوقف کنید",
    fork: "چنگال",
    delete: "حذف",
    save_submit: "ذخیره و ارسال",
    cancel: "ยกد",
    submit: "ارسال",
    edit_prompt: "لطفاً دستور ویرایش را ارائه دهید.",
    edit_response: "لطفا پاسخ را ویرایش کنید.",
    edit_info_user:
      '"ارسال" پاسخ تولید شده توسط هوش مصنوعی را دوباره ایجاد می‌کند. "ذخیره" فقط پیام شما را به‌روز می‌کند.',
    edit_info_assistant: "تغییرات شما مستقیماً در این پاسخ ذخیره خواهند شد.",
    see_less: "کمی بیشتر",
    see_more: "بیشتر",
    at_agent: "@agent",
    default_agent_description: "- عامل پیش‌فرض برای این فضای کاری.",
    custom_agents_coming_soon: "نمایندگان ویژه در حال آمدن هستند!",
    preset_reset_description: "حذف تاریخچه چت خود و شروع یک چت جدید",
    preset_exit_description: "متوقف کردن جلسه فعلی با نمایندگی",
    add_new_preset: "اضافه کردن تنظیمات پیش‌فرض جدید",
    add_new: "اضافه کردن موارد جدید",
    edit: "ویرایش",
    publish: "انتشار",
    stop_generating: "متوقف کردن تولید پاسخ",
    command: "دستورالعمل",
    your_command: "دستور شما",
    placeholder_prompt:
      "این محتوایی است که در ابتدای درخواست شما قرار خواهد گرفت.",
    description: "توضیحات",
    placeholder_description: "با شعر درباره مدل‌های زبانی بزرگ پاسخ می‌دهد.",
    save: "ذخیره",
    small: "کوچک",
    normal: "عادی",
    large: "بزرگ",
    tools: "ابزارها",
    slash_commands: "دستورات مختصر",
    agent_skills: "مهارت‌های کارگزار",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "جستجو",
    text_size_label: "اندازه متن",
    select_model: "انتخاب مدل",
    workspace_llm_manager: {
      search: "پیدا کردن ارائه‌دهندگان مدل‌های زبانی بزرگ (LLM)",
      loading_workspace_settings: "بارگذاری تنظیمات فضای کاری...",
      available_models: "مدل‌های موجود برای {{provider}}",
      available_models_description:
        "یک مدل را برای استفاده در این محیط کاری انتخاب کنید.",
      save: "از این مدل استفاده کنید.",
      saving: "تنظیم مدل به عنوان پیش‌فرض فضای کاری...",
      missing_credentials: "این ارائه دهنده فاقد مدارک لازم است!",
      missing_credentials_description:
        "برای تنظیم اعتبارها، اینجا را کلیک کنید",
    },
  },
  profile_settings: {
    edit_account: "ویرایش حساب",
    profile_picture: "تصویر پروفایل",
    remove_profile_picture: "حذف تصویر پروفایل",
    username: "نام کاربری",
    new_password: "رمز عبور جدید",
    password_description: "رمز عبور باید حداقل 8 کاراکتر طول داشته باشد.",
    cancel: "ยกد",
    update_account: "به‌روزرسانی حساب",
    theme: "ترجیحات موضوعی",
    language: "زبان ترجیحی",
    failed_upload: "عدم امکان بارگذاری تصویر پروفایل: {{error}}",
    upload_success: "تصویر پروفایل آپلود شد.",
    failed_remove: "عدم امکان حذف تصویر پروفایل: {{error}}",
    profile_updated: "صفحه به‌روز شد.",
    failed_update_user: "عدم به‌روزرسانی کاربر: {{error}}",
    account: "حساب",
    support: "حمایت",
    signout: "خروج",
  },
  "keyboard-shortcuts": {
    title: "کلیدهای میانبر",
    shortcuts: {
      settings: "تنظیمات را باز کنید",
      workspaceSettings: "تنظیمات فضای کاری فعلی را باز کنید",
      home: "بازگشت به صفحه اصلی",
      workspaces: "مدیریت فضاهای کاری",
      apiKeys: "تنظیمات کلیدهای API",
      llmPreferences: "ترجیحات مدل‌های زبان بزرگ",
      chatSettings: "تنظیمات چت",
      help: "راهنمای کلیدهای میانبر",
      showLLMSelector: "انتخاب فضای کاری برای مدل‌های زبانی بزرگ",
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
        success_title: "موفقیت!",
        success_description: 'پیام شما در بخش "انجمن" منتشر شده است!',
        success_thank_you: "از اینکه با جامعه به اشتراک گذاشتید، سپاسگزاریم!",
        view_on_hub: "مشاهده در مرکز جامعه",
        modal_title: "دستورالعمل انتشار",
        name_label: "نام",
        name_description: "این نام نمایش برای سیستم شما است.",
        name_placeholder: "دستورالعمل سیستم من",
        description_label: "توضیحات",
        description_description:
          "این، توضیحی برای دستورالعمل سیستم شما است. از این برای توضیح هدف دستورالعمل سیستم خود استفاده کنید.",
        tags_label: "برچسب‌ها",
        tags_description:
          "برچسب‌ها برای شناسایی و جستجوی آسان‌تر دستورالعمل‌های سیستم استفاده می‌شوند. شما می‌توانید چندین برچسب را اضافه کنید. حداکثر 5 برچسب. حداکثر 20 کاراکتر برای هر برچسب.",
        tags_placeholder:
          "برای افزودن برچسب‌ها، نوع را وارد کنید و Enter را بزنید.",
        visibility_label: "دیده‌شدن",
        public_description: "پیام‌های عمومی در دسترس همه افراد قرار دارند.",
        private_description: "پیام‌های خصوصی فقط برای شما قابل مشاهده هستند.",
        publish_button: "انتشار در مرکز جامعه",
        submitting: "انتشار...",
        submit: "انتشار در مرکز جامعه",
        prompt_label: "شروع",
        prompt_description:
          "این دستورالعمل اصلی است که برای هدایت مدل زبان بزرگ (LLM) استفاده خواهد شد.",
        prompt_placeholder: "لطفاً دستور خود را در اینجا وارد کنید...",
      },
      agent_flow: {
        public_description:
          "دسترسی به جریان‌های اطلاعاتی برای عموم مردم امکان‌پذیر است.",
        private_description:
          "فقط شما می‌توانید جریان‌های مربوط به نمایندگان خصوصی را مشاهده کنید.",
        success_title: "موفقیت!",
        success_description:
          'پلتفرم "Agent Flow" شما در مرکز جامعه منتشر شده است!',
        success_thank_you: "از اینکه با جامعه به اشتراک گذاشتید، سپاسگزاریم!",
        view_on_hub: "مشاهده در مرکز جامعه",
        modal_title: "آژانس انتشار",
        name_label: "نام",
        name_description: "این نام نمایش برای جریان کاری شما است.",
        name_placeholder: "آژانس من",
        description_label: "توضیحات",
        description_description:
          "این، شرح جریان کاری شما است. از این برای توضیح هدف جریان کاری خود استفاده کنید.",
        tags_label: "برچسب‌ها",
        tags_description:
          "برچسب‌ها برای شناسایی و سازماندهی جریان‌های کاری خود به منظور جستجوی آسان‌تر استفاده می‌شوند. شما می‌توانید چندین برچسب را اضافه کنید. حداکثر 5 برچسب. حداکثر 20 کاراکتر برای هر برچسب.",
        tags_placeholder:
          "برای افزودن برچسب‌ها، نوع را وارد کنید و Enter را فشار دهید.",
        visibility_label: "دیده‌شدن",
        publish_button: "انتشار در مرکز جامعه",
        submitting: "انتشار...",
        submit: "انتشار در مرکز جامعه",
        privacy_note:
          "جریان‌ها همیشه به صورت خصوصی بارگذاری می‌شوند تا از هرگونه اطلاعات حساس محافظت شود. شما می‌توانید پس از انتشار، قابلیت مشاهده را در مرکز جامعه تغییر دهید. لطفاً قبل از انتشار، از این نکته اطمینان حاصل کنید که جریان شما حاوی هیچ اطلاعات حساس یا خصوصی نیست.",
      },
      slash_command: {
        success_title: "موفقیت!",
        success_description: "دستور Slash شما در مرکز جامعه منتشر شده است!",
        success_thank_you: "از اینکه با جامعه به اشتراک گذاشتید، سپاسگزاریم!",
        view_on_hub: "مشاهده در مرکز جامعه",
        modal_title: "انتشار دستور Slash",
        name_label: "نام",
        name_description: "این نام نمایش برای دستورslash شما است.",
        name_placeholder: "دستور Slash من",
        description_label: "توضیحات",
        description_description:
          "این، توضیحی برای دستور slash شما است. از این برای توضیح هدف دستور slash خود استفاده کنید.",
        command_label: "دستورالعمل",
        command_description:
          "این دستور، همان کدی است که کاربران برای فعال کردن این تنظیمات از آن استفاده می‌کنند.",
        command_placeholder: "دستور من",
        tags_label: "برچسب‌ها",
        tags_description:
          "برچسب‌ها برای شناسایی دستورات Slash Command به منظور جستجوی آسان‌تر استفاده می‌شوند. شما می‌توانید چندین برچسب را اضافه کنید. حداکثر 5 برچسب. حداکثر 20 کاراکتر برای هر برچسب.",
        tags_placeholder:
          "برای افزودن برچسب‌ها، نوع را وارد کنید و Enter را بزنید.",
        visibility_label: "دیده‌شدن",
        public_description: "دستورات عمومی در دسترس همه کاربران است.",
        private_description: "دستورات خصوصی فقط برای شما قابل مشاهده هستند.",
        publish_button: "انتشار در مرکز جامعه",
        submitting: "انتشار...",
        prompt_label: "شروع",
        prompt_description:
          "این دستور، زمانی استفاده می‌شود که دستور با خط (slash command) فعال شود.",
        prompt_placeholder: "لطفاً درخواست خود را در اینجا وارد کنید...",
      },
      generic: {
        unauthenticated: {
          title: "احراز هویت الزامی است",
          description:
            "شما باید قبل از انتشار مطالب، با مرکز جامعه AnythingLLM احراز هویت کنید.",
          button: "اتصال به مرکز جامعه",
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
