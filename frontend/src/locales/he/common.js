const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "ברוכים הבאים ל",
      getStarted: "להתחלה",
    },
    llm: {
      title: "העדפות מודל שפה (LLM)",
      description:
        "AnythingLLM יכול לעבוד עם ספקי מודלי שפה (LLM) רבים. זה יהיה השירות שיטפל בצ'אט.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "הגדרת משתמש",
      description: "הגדר את הגדרות המשתמש שלך.",
      howManyUsers: "כמה משתמשים ישתמשו במופע זה?",
      justMe: "רק אני",
      myTeam: "הצוות שלי",
      instancePassword: "סיסמת מופע",
      setPassword: "האם תרצה להגדיר סיסמה?",
      passwordReq: "סיסמאות חייבות להכיל לפחות 8 תווים.",
      passwordWarn: "חשוב לשמור סיסמה זו מכיוון שאין שיטת שחזור.",
      adminUsername: "שם משתמש של חשבון מנהל",
      adminPassword: "סיסמת חשבון מנהל",
      adminPasswordReq: "סיסמאות חייבות להכיל לפחות 8 תווים.",
      teamHint:
        "כברירת מחדל, אתה תהיה המנהל היחיד. לאחר סיום ההצטרפות תוכל ליצור ולהזמין אחרים להיות משתמשים או מנהלים. אל תאבד את סיסמתך, מכיוון שרק מנהלים יכולים לאפס סיסמאות.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "טיפול בנתונים ופרטיות",
      description: "אנו מחויבים לשקיפות ושליטה בכל הנוגע לנתונים האישיים שלך.",
      settingsHint: "ניתן להגדיר מחדש הגדרות אלה בכל עת בהגדרות.",
    },
    survey: {
      title: "ברוכים הבאים ל-AnythingLLM",
      description:
        "עזרו לנו לבנות את AnythingLLM כך שיתאים לצרכים שלכם. אופציונלי.",
      email: "מה האימייל שלך?",
      useCase: "לאיזו מטרה תשתמש ב-AnythingLLM?",
      useCaseWork: "לעבודה",
      useCasePersonal: "לשימוש אישי",
      useCaseOther: "אחר",
      comment: "איך שמעת על AnythingLLM?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, וכו' - ספר לנו איך מצאת אותנו!",
      skip: "דלג על הסקר",
      thankYou: "תודה על המשוב!",
    },
    workspace: {
      title: "צור את סביבת העבודה הראשונה שלך",
      description:
        "צור את סביבת העבודה הראשונה שלך והתחל לעבוד עם AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "שם סביבת העבודה",
    error: "שגיאה",
    success: "הצלחה",
    user: "משתמש",
    selection: "בחירת מודל",
    saving: "שומר...",
    save: "שמור שינויים",
    previous: "עמוד קודם",
    next: "עמוד הבא",
    optional: "אופציונלי",
    yes: "כן",
    no: "לא",
    search: "חיפוש",
    username_requirements:
      "שם המשתמש חייב להיות באורך 2-32 תווים, להתחיל באות קטנה ולהכיל רק אותיות קטנות, מספרים, קווים תחתונים, מקפים ונקודות.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "ברוכים הבאים",
    chooseWorkspace: "בחר סביבת עבודה כדי להתחיל לשוחח!",
    notAssigned:
      "אינך מוקצה לכל סביבת עבודה.\nיש ליצור קשר עם המנהל שלך כדי לבקש גישה לסביבת עבודה.",
    goToWorkspace: 'עבור לסביבת עבודה "{{workspace}}"',
  },
  settings: {
    title: "הגדרות מופע",
    system: "הגדרות כלליות",
    invites: "הזמנות",
    users: "משתמשים",
    workspaces: "סביבות עבודה",
    "workspace-chats": "צ'אטים של סביבות עבודה",
    customization: "התאמה אישית",
    interface: "העדפות ממשק משתמש",
    branding: "מיתוג והתאמה אישית (Whitelabeling)",
    chat: "צ'אט",
    "api-keys": "מפתחות API למפתחים",
    llm: "מודל שפה (LLM)",
    transcription: "תמלול",
    embedder: "מטמיע (Embedder)",
    "text-splitting": "פיצול טקסט וחלוקה למקטעים (Chunking)",
    "voice-speech": "קול ודיבור",
    "vector-database": "מסד נתונים וקטורי",
    embeds: "הטמעות צ'אט (Embeds)",
    "embed-chats": "היסטוריית הטמעות צ'אט",
    security: "אבטחה",
    "event-logs": "יומני אירועים",
    privacy: "פרטיות ונתונים",
    "ai-providers": "ספקי בינה מלאכותית",
    "agent-skills": "כישורי סוכן",
    "community-hub": {
      title: "מרכז קהילתי",
      trending: "גלו את הנושאים החמים",
      "your-account": "החשבון שלך",
      "import-item": "ייבוא פריט",
    },
    admin: "מנהל",
    tools: "כלים",
    "system-prompt-variables": "משתני הנחיית מערכת",
    "experimental-features": "תכונות ניסיוניות",
    contact: "צור קשר עם התמיכה",
    "browser-extension": "תוסף דפדפן",
    "mobile-app": "AnythingLLM Mobile",
  },
  login: {
    "multi-user": {
      welcome: "ברוכים הבאים ל",
      "placeholder-username": "שם משתמש",
      "placeholder-password": "סיסמה",
      login: "התחברות",
      validating: "מאמת...",
      "forgot-pass": "שכחת סיסמה",
      reset: "איפוס",
    },
    "sign-in": "התחבר לחשבון {{appName}} שלך.",
    "password-reset": {
      title: "איפוס סיסמה",
      description: "ספק את המידע הדרוש למטה כדי לאפס את סיסמתך.",
      "recovery-codes": "קודיי שחזור",
      "recovery-code": "קוד שחזור {{index}}",
      "back-to-login": "חזרה להתחברות",
    },
  },
  "main-page": {
    greeting: "במה אוכל לעזור לך היום?",
    noWorkspaceError: "אנא צור סביבת עבודה לפני התחלת צ'אט.",
    checklist: {
      title: "תחילת עבודה",
      tasksLeft: "משימות נותרו",
      completed: "אתה בדרך להפוך למומחה AnythingLLM!",
      dismiss: "סגור",
      tasks: {
        create_workspace: {
          title: "צור סביבת עבודה",
          description: "צור את סביבת העבודה הראשונה שלך כדי להתחיל",
          action: "צור",
        },
        send_chat: {
          title: "שלח צ'אט",
          description: "התחל שיחה עם עוזר ה-AI שלך",
          action: "צ'אט",
        },
        embed_document: {
          title: "הטמע מסמך",
          description: "הוסף את המסמך הראשון שלך לסביבת העבודה",
          action: "הטמע",
        },
        setup_system_prompt: {
          title: "הגדר הנחיית מערכת",
          description: "הגדר את התנהגות עוזר ה-AI שלך",
          action: "הגדר",
        },
        define_slash_command: {
          title: "הגדר פקודת סלאש",
          description: "צור פקודות מותאמות אישית עבור העוזר שלך",
          action: "הגדר",
        },
        visit_community: {
          title: "בקר במרכז הקהילה",
          description: "גלה משאבים ותבניות מהקהילה",
          action: "עיין",
        },
      },
    },
    quickActions: {
      createAgent: "צור סוכן",
      editWorkspace: "ערוך את סביבת העבודה",
      uploadDocument: "העלה מסמך",
    },
    quickLinks: {
      title: "קישורים מהירים",
      sendChat: "שלח צ'אט",
      embedDocument: "הטמע מסמך",
      createWorkspace: "צור סביבת עבודה",
    },
    exploreMore: {
      title: "גלה תכונות נוספות",
      features: {
        customAgents: {
          title: "סוכני AI מותאמים אישית",
          description: "בנה סוכני AI ואוטומציות חזקות ללא קוד.",
          primaryAction: "צ'אט באמצעות @agent",
          secondaryAction: "בנה זרימת סוכן",
        },
        slashCommands: {
          title: "פקודות סלאש",
          description:
            "חסוך זמן והזרק הנחיות באמצעות פקודות סלאש מותאמות אישית.",
          primaryAction: "צור פקודת סלאש",
          secondaryAction: "גלה במרכז הקהילה",
        },
        systemPrompts: {
          title: "הנחיות מערכת",
          description:
            "שנה את הנחיית המערכת כדי להתאים אישית את תשובות ה-AI של סביבת עבודה.",
          primaryAction: "שנה הנחיית מערכת",
          secondaryAction: "נהל משתני הנחיה",
        },
      },
    },
    announcements: {
      title: "עדכונים והודעות",
    },
    resources: {
      title: "משאבים",
      links: {
        docs: "תיעוד",
        star: "סמן בכוכב ב-Github",
      },
      keyboardShortcuts: "קיצורי מקלדת",
    },
  },
  "new-workspace": {
    title: "סביבת עבודה חדשה",
    placeholder: "סביבת העבודה שלי",
  },
  "workspaces—settings": {
    general: "הגדרות כלליות",
    chat: "הגדרות צ'אט",
    vector: "מסד נתונים וקטורי",
    members: "חברים",
    agent: "תצורת סוכן",
  },
  general: {
    vector: {
      title: "ספירת וקטורים",
      description: "המספר הכולל של וקטורים במסד הנתונים הווקטורי שלך.",
    },
    names: {
      description: "זה ישנה רק את שם התצוגה של סביבת העבודה שלך.",
    },
    message: {
      title: "הודעות צ'אט מוצעות",
      description: "התאם אישית את ההודעות שיוצעו למשתמשי סביבת העבודה שלך.",
      add: "הוסף הודעה חדשה",
      save: "שמור הודעות",
      heading: "הסבר לי",
      body: "את היתרונות של AnythingLLM",
    },
    pfp: {
      title: "תמונת פרופיל של העוזר",
      description: "התאם אישית את תמונת הפרופיל של העוזר עבור סביבת עבודה זו.",
      image: "תמונת סביבת עבודה",
      remove: "הסר תמונת סביבת עבודה",
    },
    delete: {
      title: "מחק סביבת עבודה",
      description:
        "מחק סביבת עבודה זו ואת כל הנתונים שלה. פעולה זו תמחק את סביבת העבודה עבור כל המשתמשים.",
      delete: "מחק סביבת עבודה",
      deleting: "מוחק סביבת עבודה...",
      "confirm-start": "אתה עומד למחוק את כל",
      "confirm-end":
        "סביבת העבודה שלך. פעולה זו תסיר את כל הטמעות הווקטורים ממסד הנתונים הווקטורי שלך.\n\nקבצי המקור המקוריים יישארו ללא שינוי. פעולה זו אינה הפיכה.",
    },
  },
  chat: {
    llm: {
      title: "ספק מודל שפה (LLM) של סביבת העבודה",
      description:
        "ספק ומודל ה-LLM הספציפיים שישמשו עבור סביבת עבודה זו. כברירת מחדל, הוא משתמש בספק ובהגדרות ה-LLM של המערכת.",
      search: "חפש בכל ספקי ה-LLM",
    },
    model: {
      title: "מודל צ'אט של סביבת העבודה",
      description:
        "מודל הצ'אט הספציפי שישמש עבור סביבת עבודה זו. אם ריק, ישתמש בהעדפת ה-LLM של המערכת.",
      wait: "-- ממתין למודלים --",
    },
    mode: {
      title: "מצב צ'אט",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "צ'אט",
        "desc-start": "יספק תשובות עם הידע הכללי של מודל השפה",
        and: "וכן",
        "desc-end": "מהקשר המסמכים שנמצא.",
      },
      query: {
        title: "שאילתה",
        "desc-start": "יספק תשובות",
        only: "רק",
        "desc-end": "אם נמצא הקשר במסמכים.",
      },
    },
    history: {
      title: "היסטוריית צ'אט",
      "desc-start": "מספר הצ'אטים הקודמים שייכללו בזיכרון לטווח קצר של התגובה.",
      recommend: "מומלץ 20. ",
      "desc-end":
        "יותר מ-45 צפוי להוביל לכשלים רציפים בצ'אט, תלוי בגודל ההודעה.",
    },
    prompt: {
      title: "הנחיית מערכת",
      description:
        "ההנחיה שתשמש בסביבת עבודה זו. הגדר את ההקשר וההוראות לבינה המלאכותית כדי ליצור תגובה. עליך לספק הנחיה מנוסחת בקפידה כדי שה-AI יוכל ליצור תגובה רלוונטית ומדויקת.",
      history: {
        title: "היסטוריית הנחיות מערכת",
        clearAll: "נקה הכל",
        noHistory: "אין היסטוריית הנחיות מערכת זמינה",
        restore: "שחזר",
        delete: "מחק",
        publish: "פרסם במרכז הקהילה",
        deleteConfirm: "האם אתה בטוח שברצונך למחוק פריט היסטוריה זה?",
        clearAllConfirm:
          "האם אתה בטוח שברצונך לנקות את כל ההיסטוריה? לא ניתן לבטל פעולה זו.",
        expand: "הרחב",
      },
    },
    refusal: {
      title: "תגובת סירוב במצב שאילתה",
      "desc-start": "כאשר במצב",
      query: "שאילתה",
      "desc-end":
        ", ייתכן שתרצה להחזיר תגובת סירוב מותאמת אישית כאשר לא נמצא הקשר.",
      "tooltip-title": "למה אני רואה את זה?",
      "tooltip-description":
        "אתה נמצא במצב שאילתה, אשר משתמש רק במידע מהמסמכים שלך. עבור למצב צ'אט לשיחות גמישות יותר, או לחץ כאן כדי לבקר בתיעוד שלנו וללמוד עוד על מצבי צ'אט.",
    },
    temperature: {
      title: "טמפרטורת LLM",
      "desc-start": 'הגדרה זו שולטת במידת ה"יצירתיות" של תגובות מודל השפה שלך.',
      "desc-end":
        "ככל שהמספר גבוה יותר, כך התגובה יצירתית יותר. עבור מודלים מסוימים, הדבר עלול להוביל לתגובות לא קוהרנטיות כאשר הערך גבוה מדי.",
      hint: "לרוב מודלי ה-LLM יש טווחי ערכים קבילים שונים. עיין במידע של ספק ה-LLM שלך.",
    },
  },
  "vector-workspace": {
    identifier: "מזהה מסד נתונים וקטורי",
    snippets: {
      title: "מקטעי הקשר מרביים",
      description:
        "הגדרה זו שולטת בכמות המרבית של מקטעי הקשר שיישלחו למודל השפה עבור כל צ'אט או שאילתה.",
      recommend: "מומלץ: 4",
    },
    doc: {
      title: "סף דמיון מסמכים",
      description:
        "ציון הדמיון המינימלי הנדרש כדי שמקור ייחשב קשור לצ'אט. ככל שהמספר גבוה יותר, כך המקור חייב להיות דומה יותר לצ'אט.",
      zero: "ללא הגבלה",
      low: "נמוך (ציון דמיון ≥ 0.25)",
      medium: "בינוני (ציון דמיון ≥ 0.50)",
      high: "גבוה (ציון דמיון ≥ 0.75)",
    },
    reset: {
      reset: "אפס מסד נתונים וקטורי",
      resetting: "מנקה וקטורים...",
      confirm:
        "אתה עומד לאפס את מסד הנתונים הווקטורי של סביבת עבודה זו. פעולה זו תסיר את כל הטמעות הווקטורים הקיימות.\n\nקבצי המקור המקוריים יישארו ללא שינוי. פעולה זו אינה הפיכה.",
      error: "לא ניתן היה לאפס את מסד הנתונים הווקטורי של סביבת העבודה!",
      success: "מסד הנתונים הווקטורי של סביבת העבודה אופס!",
    },
  },
  agent: {
    "performance-warning":
      "הביצועים של מודלי שפה שאינם תומכים במפורש בקריאת כלים (tool-calling) תלויים מאוד ביכולות ובדיוק של המודל. ייתכן שיכולות מסוימות יהיו מוגבלות או לא פונקציונליות.",
    provider: {
      title: "ספק מודל שפה (LLM) של סוכן סביבת העבודה",
      description:
        "ספק ומודל ה-LLM הספציפיים שישמשו עבור סוכן ה-@agent של סביבת עבודה זו.",
    },
    mode: {
      chat: {
        title: "מודל צ'אט של סוכן סביבת העבודה",
        description:
          "מודל הצ'אט הספציפי שישמש עבור סוכן ה-@agent של סביבת עבודה זו.",
      },
      title: "מודל סוכן של סביבת העבודה",
      description:
        "מודל ה-LLM הספציפי שישמש עבור סוכן ה-@agent של סביבת עבודה זו.",
      wait: "-- ממתין למודלים --",
    },
    skill: {
      title: "כישורי סוכן ברירת מחדל",
      description:
        "שפר את היכולות הטבעיות של סוכן ברירת המחדל עם כישורים מובנים אלה. הגדרה זו חלה על כל סביבות העבודה.",
      rag: {
        title: "RAG וזיכרון לטווח ארוך",
        description:
          'אפשר לסוכן למנף את המסמכים המקומיים שלך כדי לענות על שאילתות או בקש מהסוכן "לזכור" חלקי תוכן לאחזור זיכרון לטווח ארוך.',
      },
      view: {
        title: "צפייה וסיכום מסמכים",
        description:
          "אפשר לסוכן לרשום ולסכם את התוכן של קבצי סביבת העבודה המוטמעים כעת.",
      },
      scrape: {
        title: "גירוד אתרי אינטרנט",
        description: "אפשר לסוכן לבקר ולגרד את התוכן של אתרי אינטרנט.",
      },
      generate: {
        title: "יצירת תרשימים",
        description:
          "אפשר לסוכן ברירת המחדל ליצור סוגים שונים של תרשימים מנתונים שסופקו או ניתנו בצ'אט.",
      },
      save: {
        title: "יצירה ושמירה של קבצים לדפדפן",
        description:
          "אפשר לסוכן ברירת המחדל ליצור ולכתוב לקבצים שנשמרים וניתנים להורדה בדפדפן שלך.",
      },
      web: {
        title: "חיפוש וגלישה באינטרנט בזמן אמת",
        description:
          "אפשרו לסוכן שלכם לחפש באינטרנט כדי לענות על שאלותיכם, על ידי חיבור לספק שירותי חיפוש (SERP).",
      },
      sql: {
        title: "חיבור SQL",
        description:
          "אפשרו לסוכן שלכם לנצל את SQL כדי לענות על שאלותיכם, על ידי חיבור למספר ספקי מסדי נתונים של SQL.",
      },
      default_skill:
        "כברירת מחדל, הכישורים הזה מופעל, אך ניתן להשבית אותו אם אינכם רוצים שהוא יהיה זמין עבור הסוכן.",
    },
  },
  recorded: {
    title: "צ'אטים של סביבת עבודה",
    description:
      "אלה כל הצ'אטים וההודעות המוקלטים שנשלחו על ידי משתמשים, מסודרים לפי תאריך יצירתם.",
    export: "יצא",
    table: {
      id: "מזהה",
      by: "נשלח על ידי",
      workspace: "סביבת עבודה",
      prompt: "הנחיה",
      response: "תגובה",
      at: "נשלח ב",
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
      title: "העדפות ממשק משתמש",
      description: "הגדר את העדפות ממשק המשתמש שלך עבור AnythingLLM.",
    },
    branding: {
      title: "מיתוג והתאמה אישית (Whitelabeling)",
      description: "התאם אישית את מופע ה-AnythingLLM שלך עם מיתוג מותאם אישית.",
    },
    chat: {
      title: "צ'אט",
      description: "הגדר את העדפות הצ'אט שלך עבור AnythingLLM.",
      auto_submit: {
        title: "שליחה אוטומטית של קלט קולי",
        description: "שלח אוטומטית קלט קולי לאחר פרק זמן של שקט",
      },
      auto_speak: {
        title: "הקראה אוטומטית של תגובות",
        description: "הקרא אוטומטית תגובות מה-AI",
      },
      spellcheck: {
        title: "הפעל בדיקת איות",
        description: "הפעל או השבת בדיקת איות בשדה הקלט של הצ'אט",
      },
    },
    items: {
      theme: {
        title: "ערכת נושא",
        description: "בחר את ערכת הצבעים המועדפת עליך ליישום.",
      },
      "show-scrollbar": {
        title: "הצג פס גלילה",
        description: "הפעל או השבת את פס הגלילה בחלון הצ'אט.",
      },
      "support-email": {
        title: "אימייל תמיכה",
        description:
          "הגדר את כתובת האימייל לתמיכה שתהיה נגישה למשתמשים כאשר הם זקוקים לעזרה.",
      },
      "app-name": {
        title: "שם",
        description: "הגדר שם שיוצג בדף ההתחברות לכל המשתמשים.",
      },
      "chat-message-alignment": {
        title: "יישור הודעות צ'אט",
        description: "בחר את מצב יישור ההודעות בעת שימוש בממשק הצ'אט.",
      },
      "display-language": {
        title: "שפת תצוגה",
        description:
          "בחר את השפה המועדפת להצגת ממשק המשתמש של AnythingLLM - כאשר תרגומים זמינים.",
      },
      logo: {
        title: "לוגו מותג",
        description: "העלה את הלוגו המותאם אישית שלך להצגה בכל העמודים.",
        add: "הוסף לוגו מותאם אישית",
        recommended: "גודל מומלץ: 800x200",
        remove: "הסר",
        replace: "החלף",
      },
      "welcome-messages": {
        title: "הודעות פתיחה",
        description:
          "התאם אישית את הודעות הפתיחה המוצגות למשתמשים שלך. רק משתמשים שאינם מנהלים יראו הודעות אלה.",
        new: "חדש",
        system: "מערכת",
        user: "משתמש",
        message: "הודעה",
        assistant: "עוזר הצ'אט של AnythingLLM",
        "double-click": "לחץ פעמיים לעריכה...",
        save: "שמור הודעות",
      },
      "browser-appearance": {
        title: "מראה הדפדפן",
        description:
          "התאם אישית את מראה לשונית הדפדפן והכותרת כשהאפליקציה פתוחה.",
        tab: {
          title: "כותרת",
          description:
            "הגדר כותרת לשונית מותאמת אישית כשהאפליקציה פתוחה בדפדפן.",
        },
        favicon: {
          title: "סמל אתר (Favicon)",
          description: "השתמש בסמל אתר מותאם אישית עבור לשונית הדפדפן.",
        },
      },
      "sidebar-footer": {
        title: "פריטי כותרת תחתונה בסרגל הצד",
        description:
          "התאם אישית את פריטי הכותרת התחתונה המוצגים בתחתית סרגל הצד.",
        icon: "סמל",
        link: "קישור",
      },
      "render-html": {
        title: "הצגת קוד HTML בשיחת צ'אט",
        description:
          "הצגת תגובות HTML בתגובות של עוזר.\nזה יכול להוביל לאיכות תגובה גבוהה בהרבה, אך גם עלול לגרום לסיכונים פוטנציאליים של אבטחה.",
      },
    },
  },
  api: {
    title: "מפתחות API",
    description:
      "מפתחות API מאפשרים למחזיק בהם לגשת ולנהל באופן תכנותי את מופע AnythingLLM זה.",
    link: "קרא את תיעוד ה-API",
    generate: "צור מפתח API חדש",
    table: {
      key: "מפתח API",
      by: "נוצר על ידי",
      created: "נוצר",
    },
  },
  llm: {
    title: "העדפות מודל שפה (LLM)",
    description:
      "אלה האישורים וההגדרות עבור ספק הצ'אט וההטמעה המועדף עליך. חשוב שמפתחות אלה יהיו עדכניים ונכונים, אחרת AnythingLLM לא יפעל כראוי.",
    provider: "ספק LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "נקודת קצה של שירות Azure",
        api_key: "מפתח API",
        chat_deployment_name: "שם פריסת צ'אט",
        chat_model_token_limit: "מגבלת אסימוני מודל צ'אט",
        model_type: "סוג מודל",
        model_type_tooltip:
          'אם השימוש שלך כולל מודל הסקה (o1, o1-mini, o3-mini וכו\'), הגדר זאת ל"הסקה". אחרת, בקשות השיחה שלך עלולות להיכשל.',
        default: "ברירת מחדל",
        reasoning: "היגיון",
      },
    },
  },
  transcription: {
    title: "העדפות מודל תמלול",
    description:
      "אלה האישורים וההגדרות עבור ספק מודל התמלול המועדף עליך. חשוב שמפתחות אלה יהיו עדכניים ונכונים, אחרת קובצי מדיה ושמע לא יתומללו.",
    provider: "ספק תמלול",
    "warn-start":
      "שימוש במודל ה-whisper המקומי על מכונות עם זיכרון RAM או מעבד מוגבלים עלול לגרום להאטה של AnythingLLM בעת עיבוד קובצי מדיה.",
    "warn-recommend":
      "אנו ממליצים על לפחות 2GB של זיכרון RAM והעלאת קבצים קטנים מ-10Mb.",
    "warn-end": "המודל המובנה יורד אוטומטית בשימוש הראשון.",
  },
  embedding: {
    title: "העדפות הטמעה (Embedding)",
    "desc-start":
      "בעת שימוש במודל שפה שאינו תומך באופן מובנה במנוע הטמעה - ייתכן שתצטרך לציין בנוסף אישורים להטמעת טקסט.",
    "desc-end":
      "הטמעה היא תהליך של הפיכת טקסט לווקטורים. אישורים אלה נדרשים כדי להפוך את הקבצים וההנחיות שלך לפורמט ש-AnythingLLM יכול להשתמש בו לעיבוד.",
    provider: {
      title: "ספק הטמעה",
    },
  },
  text: {
    title: "העדפות פיצול טקסט וחלוקה למקטעים (Chunking)",
    "desc-start":
      "לפעמים, ייתכן שתרצה לשנות את הדרך ברירת המחדל שבה מסמכים חדשים מפוצלים ומחולקים למקטעים לפני הכנסתם למסד הנתונים הווקטורי שלך.",
    "desc-end":
      "עליך לשנות הגדרה זו רק אם אתה מבין כיצד פועל פיצול טקסט ואת תופעות הלוואי שלו.",
    size: {
      title: "גודל מקטע טקסט",
      description: "זוהי הכמות המרבית של תווים שיכולה להיות בווקטור יחיד.",
      recommend: "אורך מרבי של מודל הטמעה הוא",
    },
    overlap: {
      title: "חפיפת מקטעי טקסט",
      description:
        "זוהי החפיפה המרבית של תווים המתרחשת במהלך חלוקה למקטעים בין שני מקטעי טקסט סמוכים.",
    },
  },
  vector: {
    title: "מסד נתונים וקטורי",
    description:
      "אלה האישורים וההגדרות לאופן פעולת מופע ה-AnythingLLM שלך. חשוב שמפתחות אלה יהיו עדכניים ונכונים.",
    provider: {
      title: "ספק מסד נתונים וקטורי",
      description: "אין צורך בתצורה עבור LanceDB.",
    },
  },
  embeddable: {
    title: "ווידג'טים של צ'אט להטמעה",
    description:
      "ווידג'טים של צ'אט להטמעה הם ממשקי צ'אט ציבוריים הקשורים לסביבת עבודה אחת. הם מאפשרים לך לבנות סביבות עבודה שתוכל לפרסם לעולם.",
    create: "צור הטמעה",
    table: {
      workspace: "סביבת עבודה",
      chats: "צ'אטים שנשלחו",
      active: "דומיינים פעילים",
      created: "נוצר",
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
    title: "היסטוריית צ'אט מוטמע",
    export: "יצא",
    description: "אלה כל הצ'אטים וההודעות המוקלטים מכל הטמעה שפרסמת.",
    table: {
      embed: "הטמעה",
      sender: "שולח",
      message: "הודעה",
      response: "תגובה",
      at: "נשלח ב",
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
    title: "אבטחה",
    multiuser: {
      title: "מצב ריבוי משתמשים",
      description:
        "הגדר את המופע שלך לתמיכה בצוות שלך על ידי הפעלת מצב ריבוי משתמשים.",
      enable: {
        "is-enable": "מצב ריבוי משתמשים מופעל",
        enable: "הפעל מצב ריבוי משתמשים",
        description:
          "כברירת מחדל, אתה תהיה המנהל היחיד. כמנהל תצטרך ליצור חשבונות לכל המשתמשים או המנהלים החדשים. אל תאבד את סיסמתך, מכיוון שרק משתמש מנהל יכול לאפס סיסמאות.",
        username: "שם משתמש של חשבון מנהל",
        password: "סיסמת חשבון מנהל",
      },
    },
    password: {
      title: "הגנת סיסמה",
      description:
        "הגן על מופע ה-AnythingLLM שלך באמצעות סיסמה. אם תשכח אותה, אין שיטת שחזור, אז ודא שאתה שומר סיסמה זו.",
      "password-label": "סיסמת מופע",
    },
  },
  event: {
    title: "יומני אירועים",
    description: "צפה בכל הפעולות והאירועים המתרחשים במופע זה לצורך ניטור.",
    clear: "נקה יומני אירועים",
    table: {
      type: "סוג אירוע",
      user: "משתמש",
      occurred: "התרחש ב",
    },
  },
  privacy: {
    title: "פרטיות וטיפול בנתונים",
    description:
      "זוהי התצורה שלך לאופן שבו ספקים צד שלישי מחוברים ו-AnythingLLM מטפלים בנתונים שלך.",
    llm: "בחירת מודל שפה (LLM)",
    embedding: "העדפות הטמעה",
    vector: "מסד נתונים וקטורי",
    anonymous: "טלמטריה אנונימית מופעלת",
  },
  connectors: {
    "search-placeholder": "חפש מחברי נתונים",
    "no-connectors": "לא נמצאו מחברי נתונים.",
    obsidian: {
      name: "Obsidian",
      description: "ייבא כספת Obsidian בלחיצה אחת.",
      vault_location: "מיקום כספת",
      vault_description:
        "בחר את תיקיית כספת ה-Obsidian שלך כדי לייבא את כל ההערות והחיבורים ביניהן.",
      selected_files: "נמצאו {{count}} קבצי markdown",
      importing: "מייבא כספת...",
      import_vault: "ייבא כספת",
      processing_time: "זה עשוי לקחת זמן מה, תלוי בגודל הכספת שלך.",
      vault_warning:
        "כדי למנוע התנגשויות, ודא שכספת ה-Obsidian שלך אינה פתוחה כעת.",
    },
    github: {
      name: "מאגר GitHub",
      description: "ייבא מאגר GitHub ציבורי או פרטי שלם בלחיצה אחת.",
      URL: "כתובת URL של מאגר GitHub",
      URL_explained: "כתובת ה-URL של מאגר ה-GitHub שברצונך לאסוף.",
      token: "אסימון גישה של GitHub",
      optional: "אופציונלי",
      token_explained: "אסימון גישה למניעת הגבלת קצב.",
      token_explained_start: "ללא ",
      token_explained_link1: "אסימון גישה אישי",
      token_explained_middle:
        ", ה-API של GitHub עשוי להגביל את מספר הקבצים שניתן לאסוף עקב הגבלות קצב. תוכל ",
      token_explained_link2: "ליצור אסימון גישה זמני",
      token_explained_end: " כדי למנוע בעיה זו.",
      ignores: "התעלמות מקבצים",
      git_ignore:
        "רשום בפורמט .gitignore כדי להתעלם מקבצים ספציפיים במהלך האיסוף. הקש אנטר לאחר כל ערך שברצונך לשמור.",
      task_explained:
        "לאחר השלמה, כל הקבצים יהיו זמינים להטמעה בסביבות עבודה בבורר המסמכים.",
      branch: "ענף שממנו ברצונך לאסוף קבצים.",
      branch_loading: "-- טוען ענפים זמינים --",
      branch_explained: "ענף שממנו ברצונך לאסוף קבצים.",
      token_information:
        "ללא מילוי <b>אסימון הגישה של GitHub</b>, מחבר נתונים זה יוכל לאסוף רק את הקבצים ב<b>רמה העליונה</b> של המאגר עקב הגבלות הקצב של ה-API הציבורי של GitHub.",
      token_personal: "קבל אסימון גישה אישי בחינם עם חשבון GitHub כאן.",
    },
    gitlab: {
      name: "מאגר GitLab",
      description: "ייבא מאגר GitLab ציבורי או פרטי שלם בלחיצה אחת.",
      URL: "כתובת URL של מאגר GitLab",
      URL_explained: "כתובת ה-URL של מאגר ה-GitLab שברצונך לאסוף.",
      token: "אסימון גישה של GitLab",
      optional: "אופציונלי",
      token_explained: "אסימון גישה למניעת הגבלת קצב.",
      token_description: "בחר ישויות נוספות לאחזור מה-API של GitLab.",
      token_explained_start: "ללא ",
      token_explained_link1: "אסימון גישה אישי",
      token_explained_middle:
        ", ה-API של GitLab עשוי להגביל את מספר הקבצים שניתן לאסוף עקב הגבלות קצב. תוכל ",
      token_explained_link2: "ליצור אסימון גישה זמני",
      token_explained_end: " כדי למנוע בעיה זו.",
      fetch_issues: "אחזר בעיות (Issues) כמסמכים",
      ignores: "התעלמות מקבצים",
      git_ignore:
        "רשום בפורמט .gitignore כדי להתעלם מקבצים ספציפיים במהלך האיסוף. הקש אנטר לאחר כל ערך שברצונך לשמור.",
      task_explained:
        "לאחר השלמה, כל הקבצים יהיו זמינים להטמעה בסביבות עבודה בבורר המסמכים.",
      branch: "ענף שממנו ברצונך לאסוף קבצים",
      branch_loading: "-- טוען ענפים זמינים --",
      branch_explained: "ענף שממנו ברצונך לאסוף קבצים.",
      token_information:
        "ללא מילוי <b>אסימון הגישה של GitLab</b>, מחבר נתונים זה יוכל לאסוף רק את הקבצים ב<b>רמה העליונה</b> של המאגר עקב הגבלות הקצב של ה-API הציבורי של GitLab.",
      token_personal: "קבל אסימון גישה אישי בחינם עם חשבון GitLab כאן.",
    },
    youtube: {
      name: "תמלול YouTube",
      description: "ייבא את התמלול של סרטון YouTube שלם מקישור.",
      URL: "כתובת URL של סרטון YouTube",
      URL_explained_start:
        "הזן את כתובת ה-URL של כל סרטון YouTube כדי לאחזר את התמלול שלו. לסרטון חייבות להיות ",
      URL_explained_link: "כתוביות סגורות",
      URL_explained_end: " זמינות.",
      task_explained:
        "לאחר השלמה, התמלול יהיה זמין להטמעה בסביבות עבודה בבורר המסמכים.",
      language: "שפת התמלול",
      language_explained: "בחר את שפת התמלול שברצונך לאסוף.",
      loading_languages: "-- טוען שפות זמינות --",
    },
    "website-depth": {
      name: "גרדן קישורים המוני",
      description: "גרד אתר ואת קישורי המשנה שלו עד לעומק מסוים.",
      URL: "כתובת אתר אינטרנט",
      URL_explained: "כתובת ה-URL של האתר שברצונך לגרד.",
      depth: "עומק זחילה",
      depth_explained:
        "זהו מספר קישורי הילד שהעובד יעקוב אחריהם מכתובת ה-URL המקורית.",
      max_pages: "מספר עמודים מרבי",
      max_pages_explained: "המספר המרבי של קישורים לגירוד.",
      task_explained:
        "לאחר השלמה, כל התוכן שנגרד יהיה זמין להטמעה בסביבות עבודה בבורר המסמכים.",
    },
    confluence: {
      name: "Confluence",
      description: "ייבא עמוד Confluence שלם בלחיצה אחת.",
      deployment_type: "סוג פריסת Confluence",
      deployment_type_explained:
        "קבע אם מופע ה-Confluence שלך מתארח בענן של Atlassian או באירוח עצמי.",
      base_url: "כתובת בסיס של Confluence",
      base_url_explained: "זוהי כתובת הבסיס של מרחב ה-Confluence שלך.",
      space_key: "מפתח מרחב של Confluence",
      space_key_explained:
        "זהו מפתח המרחבים של מופע ה-Confluence שלך שישמש. בדרך כלל מתחיל ב-~",
      username: "שם משתמש ב-Confluence",
      username_explained: "שם המשתמש שלך ב-Confluence",
      auth_type: "סוג אימות Confluence",
      auth_type_explained:
        "בחר את סוג האימות שבו ברצונך להשתמש כדי לגשת לדפי ה-Confluence שלך.",
      auth_type_username: "שם משתמש ואסימון גישה",
      auth_type_personal: "אסימון גישה אישי",
      token: "אסימון גישה של Confluence",
      token_explained_start:
        "עליך לספק אסימון גישה לאימות. תוכל ליצור אסימון גישה",
      token_explained_link: "כאן",
      token_desc: "אסימון גישה לאימות",
      pat_token: "אסימון גישה אישי של Confluence",
      pat_token_explained: "אסימון הגישה האישי שלך ב-Confluence.",
      bypass_ssl: "התעלמות מאימות תעודת SSL",
      bypass_ssl_explained:
        "אפשר להפעיל את האפשרות זו כדי לעקוף את אימות תעודת ה-SSL עבור מופעי Confluence המאוחסנים באופן עצמאי עם תעודה שחתמה באופן עצמי.",
      task_explained:
        "לאחר השלמה, תוכן העמוד יהיה זמין להטמעה בסביבות עבודה בבורר המסמכים.",
    },
    manage: {
      documents: "מסמכים",
      "data-connectors": "מחברי נתונים",
      "desktop-only":
        "עריכת הגדרות אלה זמינה רק במחשב שולחני. אנא גש לדף זה משולחן העבודה שלך כדי להמשיך.",
      dismiss: "התעלם",
      editing: "עורך",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "המסמכים שלי",
      "new-folder": "תיקייה חדשה",
      "search-document": "חפש מסמך",
      "no-documents": "אין מסמכים",
      "move-workspace": "העבר לסביבת עבודה",
      name: "שם",
      "delete-confirmation":
        "האם אתה בטוח שברצונך למחוק קבצים ותיקיות אלה?\nפעולה זו תסיר את הקבצים מהמערכת ותסיר אותם אוטומטית מכל סביבת עבודה קיימת.\nפעולה זו אינה הפיכה.",
      "removing-message":
        "מסיר {{count}} מסמכים ו-{{folderCount}} תיקיות. אנא המתן.",
      "move-success": "{{count}} מסמכים הועברו בהצלחה.",
      date: "תאריך",
      type: "סוג",
      no_docs: "אין מסמכים",
      select_all: "בחר הכל",
      deselect_all: "בטל בחירת הכל",
      remove_selected: "הסר נבחרים",
      costs: "*עלות חד פעמית להטמעות",
      save_embed: "שמור והטמע",
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
      "processor-offline": "מעבד המסמכים אינו זמין",
      "processor-offline-desc":
        "אין באפשרותנו להעלות את הקבצים שלך כרגע מכיוון שמעבד המסמכים אינו מקוון. אנא נסה שוב מאוחר יותר.",
      "click-upload": "לחץ להעלאה או גרור ושחרר",
      "file-types": "תומך בקבצי טקסט, csv, גיליונות אלקטרוניים, קבצי שמע ועוד!",
      "or-submit-link": "או שלח קישור",
      "placeholder-link": "https://example.com",
      fetching: "מאחזר...",
      "fetch-website": "אחזר אתר אינטרנט",
      "privacy-notice":
        "קבצים אלה יועלו למעבד המסמכים הפועל במופע זה של AnythingLLM. קבצים אלה אינם נשלחים או משותפים עם צד שלישי.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "מהי הצמדת מסמכים?",
      pin_explained_block1:
        "כאשר אתה <b>מצמיד</b> מסמך ב-AnythingLLM, אנו נזריק את כל תוכן המסמך לחלון ההנחיה שלך כדי שמודל השפה שלך יבין אותו במלואו.",
      pin_explained_block2:
        "זה עובד בצורה הטובה ביותר עם <b>מודלים בעלי הקשר רחב</b> או קבצים קטנים שהם קריטיים לבסיס הידע שלו.",
      pin_explained_block3:
        "אם אינך מקבל את התשובות הרצויות מ-AnythingLLM כברירת מחדל, הצמדה היא דרך מצוינת לקבל תשובות איכותיות יותר בלחיצה אחת.",
      accept: "אוקיי, הבנתי",
    },
    watching: {
      what_watching: "מה עושה מעקב אחר מסמך?",
      watch_explained_block1:
        "כאשר אתה <b>עוקב</b> אחר מסמך ב-AnythingLLM, אנו נסנכרן <i>אוטומטית</i> את תוכן המסמך שלך ממקורו המקורי במרווחי זמן קבועים. זה יעדכן אוטומטית את התוכן בכל סביבת עבודה שבה קובץ זה מנוהל.",
      watch_explained_block2:
        "תכונה זו תומכת כיום בתוכן מבוסס-אינטרנט ולא תהיה זמינה עבור מסמכים שהועלו ידנית.",
      watch_explained_block3_start:
        "תוכל לנהל אילו מסמכים נמצאים במעקב מתוך תצוגת ",
      watch_explained_block3_link: "מנהל הקבצים",
      watch_explained_block3_end: " של המנהל.",
      accept: "אוקיי, הבנתי",
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
    welcome: "ברוכים הבאים לסביבת העבודה החדשה שלך.",
    get_started: "כדי להתחיל, או",
    get_started_default: "כדי להתחיל",
    upload: "העלה מסמך",
    or: "או",
    attachments_processing: "קבצים מצורפים בעיבוד. אנא המתן...",
    send_chat: "שלח צ'אט.",
    send_message: "שלח הודעה",
    attach_file: "צרף קובץ לצ'אט זה",
    slash: "הצג את כל פקודות הסלאש הזמינות לצ'אט.",
    agents: "הצג את כל הסוכנים הזמינים שתוכל להשתמש בהם לצ'אט.",
    start_agent_session: "Start agent session",
    text_size: "שנה גודל טקסט.",
    microphone: "אמור את ההנחיה שלך.",
    send: "שלח הודעת הנחיה לסביבת העבודה",
    tts_speak_message: "הקרא הודעה (TTS)",
    copy: "העתק",
    regenerate: "צור מחדש",
    regenerate_response: "צור תגובה מחדש",
    good_response: "תגובה טובה",
    more_actions: "פעולות נוספות",
    hide_citations: "הסתר ציטוטים",
    show_citations: "הצג ציטוטים",
    sources: "מקורות",
    source_count_one: "{{count}} - הפניה",
    source_count_other: "{{count}} – מקורות",
    document: "מסמך",
    similarity_match: "משחק",
    pause_tts_speech_message: "השהה הקראת הודעה (TTS)",
    fork: "פצל (Fork)",
    delete: "מחק",
    save_submit: "שמור ושלח",
    cancel: "בטל",
    submit: "הגש",
    edit_prompt: "ערוך הנחיה",
    edit_response: "ערוך תגובה",
    edit_info_user:
      '"שלח" מחזיר את התגובה של הבינה המלאכותית. "שמור" מעדכן רק את ההודעה שלך.',
    edit_info_assistant: "השינויים שאתם מבצעים יישמרו ישירות בתגובה זו.",
    see_less: "ראה פחות",
    see_more: "לראות עוד",
    at_agent: "@agent",
    default_agent_description: " - סוכן ברירת המחדל עבור סביבת עבודה זו.",
    custom_agents_coming_soon: "סוכנים מותאמים אישית יגיעו בקרוב!",
    preset_reset_description: "נקה את היסטוריית הצ'אט שלך והתחל צ'אט חדש",
    preset_exit_description: "עצירת הפעולה הנוכחית של המשתמש",
    add_new_preset: " הוסף הגדרה קבועה חדשה",
    add_new: "הוסף חדש",
    edit: "עריכה",
    publish: "להוציא לאור",
    stop_generating: "הפסיקו ליצור תגובה",
    command: "פקודה",
    your_command: "הפקודה-שלך",
    placeholder_prompt: "זהו התוכן שיוזרק לפני ההנחיה שלך.",
    description: "תיאור",
    placeholder_description: "מגיב עם שיר על מודלי שפה.",
    save: "שמור",
    small: "קטן",
    normal: "רגיל",
    large: "גדול",
    tools: "כלים",
    slash_commands: "פקודות קיצור",
    agent_skills: "כישורים של סוכן",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "גלו",
    text_size_label: "גודל הטקסט",
    select_model: "בחר מודל",
    workspace_llm_manager: {
      search: "חפש ספקי LLM",
      loading_workspace_settings: "טוען הגדרות סביבת עבודה...",
      available_models: "מודלים זמינים עבור {{provider}}",
      available_models_description: "בחר מודל לשימוש בסביבת עבודה זו.",
      save: "השתמש במודל זה",
      saving: "מגדיר מודל כברירת מחדל של סביבת העבודה...",
      missing_credentials: "חסרים אישורים לספק זה!",
      missing_credentials_description: "לחץ להגדרת אישורים",
    },
  },
  profile_settings: {
    edit_account: "ערוך חשבון",
    profile_picture: "תמונת פרופיל",
    remove_profile_picture: "הסר תמונת פרופיל",
    username: "שם משתמש",
    new_password: "סיסמה חדשה",
    password_description: "הסיסמה חייבת להכיל לפחות 8 תווים",
    cancel: "בטל",
    update_account: "עדכן חשבון",
    theme: "העדפת ערכת נושא",
    language: "שפה מועדפת",
    failed_upload: "העלאת תמונת הפרופיל נכשלה: {{error}}",
    upload_success: "תמונת הפרופיל הועלתה.",
    failed_remove: "הסרת תמונת הפרופיל נכשלה: {{error}}",
    profile_updated: "הפרופיל עודכן.",
    failed_update_user: "עדכון המשתמש נכשל: {{error}}",
    account: "חשבון",
    support: "תמיכה",
    signout: "התנתק",
  },
  "keyboard-shortcuts": {
    title: "קיצורי מקלדת",
    shortcuts: {
      settings: "פתח הגדרות",
      workspaceSettings: "פתח הגדרות סביבת עבודה נוכחית",
      home: "עבור לדף הבית",
      workspaces: "נהל סביבות עבודה",
      apiKeys: "הגדרות מפתחות API",
      llmPreferences: "העדפות מודל שפה (LLM)",
      chatSettings: "הגדרות צ'אט",
      help: "הצג עזרה לקיצורי מקלדת",
      showLLMSelector: "הצג בורר מודלי שפה לסביבת עבודה",
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
        success_title: "הצלחה!",
        success_description: "הנחיית המערכת שלך פורסמה במרכז הקהילה!",
        success_thank_you: "תודה על השיתוף בקהילה!",
        view_on_hub: "צפה במרכז הקהילה",
        modal_title: "פרסם הנחיית מערכת",
        name_label: "שם",
        name_description: "זהו שם התצוגה של הנחיית המערכת שלך.",
        name_placeholder: "הנחיית המערכת שלי",
        description_label: "תיאור",
        description_description:
          "זהו התיאור של הנחיית המערכת שלך. השתמש בזה כדי לתאר את מטרת ההנחיה.",
        tags_label: "תגיות",
        tags_description:
          "תגיות משמשות לתיוג הנחיית המערכת שלך לחיפוש קל יותר. ניתן להוסיף מספר תגיות. עד 5 תגיות. עד 20 תווים לתגית.",
        tags_placeholder: "הקלד והקש אנטר להוספת תגיות",
        visibility_label: "נראות",
        public_description: "הנחיות מערכת ציבוריות נראות לכולם.",
        private_description: "הנחיות מערכת פרטיות נראות רק לך.",
        publish_button: "פרסם במרכז הקהילה",
        submitting: "מפרסם...",
        submit: "פרסם במרכז הקהילה",
        prompt_label: "הנחיה",
        prompt_description: "זוהי הנחיית המערכת בפועל שתשמש להנחיית מודל השפה.",
        prompt_placeholder: "הזן את הנחיית המערכת שלך כאן...",
      },
      agent_flow: {
        public_description: "זרימות סוכן ציבוריות נראות לכולם.",
        private_description: "זרימות סוכן פרטיות נראות רק לך.",
        success_title: "הצלחה!",
        success_description: "זרימת הסוכן שלך פורסמה במרכז הקהילה!",
        success_thank_you: "תודה על השיתוף בקהילה!",
        view_on_hub: "צפה במרכז הקהילה",
        modal_title: "פרסם זרימת סוכן",
        name_label: "שם",
        name_description: "זהו שם התצוגה של זרימת הסוכן שלך.",
        name_placeholder: "זרימת הסוכן שלי",
        description_label: "תיאור",
        description_description:
          "זהו התיאור של זרימת הסוכן שלך. השתמש בזה כדי לתאר את מטרת הזרימה.",
        tags_label: "תגיות",
        tags_description:
          "תגיות משמשות לתיוג זרימת הסוכן שלך לחיפוש קל יותר. ניתן להוסיף מספר תגיות. עד 5 תגיות. עד 20 תווים לתגית.",
        tags_placeholder: "הקלד והקש אנטר להוספת תגיות",
        visibility_label: "נראות",
        publish_button: "פרסם במרכז הקהילה",
        submitting: "מפרסם...",
        submit: "פרסם במרכז הקהילה",
        privacy_note:
          "זרימות סוכן תמיד מועלות כפרטיות כדי להגן על נתונים רגישים. תוכל לשנות את הנראות במרכז הקהילה לאחר הפרסום. אנא ודא שהזרימה שלך אינה מכילה מידע רגיש או פרטי לפני הפרסום.",
      },
      slash_command: {
        success_title: "הצלחה!",
        success_description: "פקודת הסלאש שלך פורסמה במרכז הקהילה!",
        success_thank_you: "תודה על השיתוף בקהילה!",
        view_on_hub: "צפה במרכז הקהילה",
        modal_title: "פרסם פקודת סלאש",
        name_label: "שם",
        name_description: "זהו שם התצוגה של פקודת הסלאש שלך.",
        name_placeholder: "פקודת הסלאש שלי",
        description_label: "תיאור",
        description_description:
          "זהו התיאור של פקודת הסלאש שלך. השתמש בזה כדי לתאר את מטרת הפקודה.",
        command_label: "פקודה",
        command_description:
          "זוהי פקודת הסלאש שמשתמשים יקלידו כדי להפעיל הגדרה קבועה זו.",
        command_placeholder: "הפקודה-שלי",
        tags_label: "תגיות",
        tags_description:
          "תגיות משמשות לתיוג פקודת הסלאש שלך לחיפוש קל יותר. ניתן להוסיף מספר תגיות. עד 5 תגיות. עד 20 תווים לתגית.",
        tags_placeholder: "הקלד והקש אנטר להוספת תגיות",
        visibility_label: "נראות",
        public_description: "פקודות סלאש ציבוריות נראות לכולם.",
        private_description: "פקודות סלאש פרטיות נראות רק לך.",
        publish_button: "פרסם במרכז הקהילה",
        submitting: "מפרסם...",
        prompt_label: "הנחיה",
        prompt_description: "זוהי ההנחיה שתשמש כאשר פקודת הסלאש תופעל.",
        prompt_placeholder: "הזן את ההנחיה שלך כאן...",
      },
      generic: {
        unauthenticated: {
          title: "נדרש אימות",
          description:
            "עליך להתאמת עם מרכז הקהילה של AnythingLLM לפני פרסום פריטים.",
          button: "התחבר למרכז הקהילה",
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
