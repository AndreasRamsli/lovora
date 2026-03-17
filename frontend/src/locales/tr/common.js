const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Hoş Geldiniz",
      getStarted: "Başla",
    },
    llm: {
      title: "LLM Tercihi",
      description:
        "AnythingLLM birçok LLM sağlayıcısıyla çalışabilir. Bu, sohbeti yöneten hizmet olacaktır.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Kullanıcı Kurulumu",
      description: "Kullanıcı ayarlarınızı yapılandırın.",
      howManyUsers: "Bu örneği kaç kişi kullanacak?",
      justMe: "Sadece ben",
      myTeam: "Ekibim",
      instancePassword: "Örnek Şifresi",
      setPassword: "Bir şifre belirlemek ister misiniz?",
      passwordReq: "Şifreler en az 8 karakter olmalıdır.",
      passwordWarn:
        "Kurtarma yöntemi olmadığı için bu şifreyi kaydetmeniz önemlidir.",
      adminUsername: "Yönetici hesap kullanıcı adı",
      adminPassword: "Yönetici hesap şifresi",
      adminPasswordReq: "Şifreler en az 8 karakter olmalıdır.",
      teamHint:
        "Varsayılan olarak tek yönetici siz olacaksınız. Kurulum tamamlandığında, diğer kişileri kullanıcı veya yönetici olarak davet edebilirsiniz. Yalnızca yöneticiler şifreleri sıfırlayabildiğinden şifrenizi kaybetmeyin.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Veri İşleme & Gizlilik",
      description:
        "Kişisel verileriniz konusunda şeffaflık ve kontrol sağlamaya kararlıyız.",
      settingsHint:
        "Bu ayarlar istediğiniz zaman ayarlardan yeniden yapılandırılabilir.",
    },
    survey: {
      title: "AnythingLLM'ye Hoş Geldiniz",
      description:
        "AnythingLLM'yi ihtiyaçlarınıza göre oluşturmamıza yardımcı olun. İsteğe bağlı.",
      email: "E-posta adresiniz nedir?",
      useCase: "AnythingLLM'yi ne için kullanacaksınız?",
      useCaseWork: "İş için",
      useCasePersonal: "Kişisel kullanım için",
      useCaseOther: "Diğer",
      comment: "AnythingLLM'yi nasıl duydunuz?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube vb. - Bizi nasıl buldunuz?",
      skip: "Anketi Atla",
      thankYou: "Geri bildiriminiz için teşekkür ederiz!",
    },
    workspace: {
      title: "İlk çalışma alanınızı oluşturun",
      description:
        "İlk çalışma alanınızı oluşturun ve AnythingLLM ile başlayın.",
    },
  },
  common: {
    "workspaces-name": "Çalışma Alanları Adı",
    error: "hata",
    success: "başarı",
    user: "Kullanıcı",
    selection: "Model Seçimi",
    saving: "Kaydediliyor...",
    save: "Değişiklikleri Kaydet",
    previous: "Önceki Sayfa",
    next: "Sonraki Sayfa",
    optional: "İsteğe bağlı",
    yes: "Evet",
    no: "Hayır",
    search: "Ara",
    username_requirements:
      "Kullanıcı adı 2-32 karakter uzunluğunda olmalı, küçük harfle başlamalı ve yalnızca küçük harfler, rakamlar, alt çizgiler, tireler ve noktalar içermelidir.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Hoşgeldiniz",
    chooseWorkspace: "Bir çalışma alanı seçerek sohbete başlayın!",
    notAssigned:
      "Şu anda hiçbir çalışma alanına atanmamışsınız.\nBir çalışma alanına erişmek için yöneticinize başvurun.",
    goToWorkspace: 'Çalışma alanına git "{{workspace}}"',
  },
  settings: {
    title: "Instance Ayarları",
    system: "Genel Ayarlar",
    invites: "Davetler",
    users: "Kullanıcılar",
    workspaces: "Çalışma Alanları",
    "workspace-chats": "Çalışma Alanı Sohbetleri",
    customization: "Özelleştirme",
    interface: "Arayüz Tercihleri",
    branding: "Marka & Beyaz Etiketleme",
    chat: "Sohbet",
    "api-keys": "Geliştirici API",
    llm: "LLM",
    transcription: "Transkripsiyon",
    embedder: "Gömme Aracı",
    "text-splitting": "Metin Bölme & Parçalama",
    "voice-speech": "Ses & Konuşma",
    "vector-database": "Vektör Veritabanı",
    embeds: "Sohbet Gömme",
    "embed-chats": "Gömme Sohbet Geçmişi",
    security: "Güvenlik",
    "event-logs": "Olay Kayıtları",
    privacy: "Gizlilik & Veri",
    "ai-providers": "Yapay Zeka Sağlayıcıları",
    "agent-skills": "Ajan Becerileri",
    "community-hub": {
      title: "Topluluk Merkezi",
      trending: "Popüler olanları keşfedin",
      "your-account": "Hesabınız",
      "import-item": "İthal Edilen Ürün",
    },
    admin: "Yönetici",
    tools: "Araçlar",
    "system-prompt-variables": "Sistem Prompt Değişkenleri",
    "experimental-features": "Deneysel Özellikler",
    contact: "Destekle İletişime Geçin",
    "browser-extension": "Tarayıcı Uzantısı",
    "mobile-app": "AnythingLLM Mobil",
  },
  login: {
    "multi-user": {
      welcome: "Hoş geldiniz",
      "placeholder-username": "Kullanıcı Adı",
      "placeholder-password": "Şifre",
      login: "Giriş Yap",
      validating: "Doğrulanıyor...",
      "forgot-pass": "Şifremi Unuttum",
      reset: "Sıfırla",
    },
    "sign-in": "{{appName}} hesabınıza giriş yapın.",
    "password-reset": {
      title: "Şifre Sıfırlama",
      description: "Şifrenizi sıfırlamak için gerekli bilgileri aşağıya girin.",
      "recovery-codes": "Kurtarma Kodları",
      "recovery-code": "Kurtarma Kodu {{index}}",
      "back-to-login": "Girişe Geri Dön",
    },
  },
  "main-page": {
    greeting: "Bugün size nasıl yardımcı olabilirim?",
    noWorkspaceError:
      "Sohbete başlamadan önce lütfen bir çalışma alanı oluşturun.",
    checklist: {
      title: "Başlarken",
      tasksLeft: "kalan görev",
      completed: "AnythingLLM uzmanı olma yolundasınız!",
      dismiss: "kapat",
      tasks: {
        create_workspace: {
          title: "Bir çalışma alanı oluşturun",
          description: "Başlamak için ilk çalışma alanınızı oluşturun",
          action: "Oluştur",
        },
        send_chat: {
          title: "Bir sohbet gönderin",
          description: "AI asistanınızla bir konuşma başlatın",
          action: "Sohbet",
        },
        embed_document: {
          title: "Bir belge gömün",
          description: "Çalışma alanınıza ilk belgenizi ekleyin",
          action: "Göm",
        },
        setup_system_prompt: {
          title: "Bir sistem promptu ayarlayın",
          description: "AI asistanınızın davranışını yapılandırın",
          action: "Ayarla",
        },
        define_slash_command: {
          title: "Bir eğik çizgi komutu tanımlayın",
          description: "Asistanınız için özel komutlar oluşturun",
          action: "Tanımla",
        },
        visit_community: {
          title: "Topluluk Hub'ını Ziyaret Edin",
          description: "Topluluk kaynaklarını ve şablonları keşfedin",
          action: "Göz At",
        },
      },
    },
    quickActions: {
      createAgent: "Bir temsilci oluşturun",
      editWorkspace: "Çalışma Alanını Düzenle",
      uploadDocument: "Bir belge yükleyin",
    },
    quickLinks: {
      title: "Hızlı Bağlantılar",
      sendChat: "Sohbet Gönder",
      embedDocument: "Belge Göm",
      createWorkspace: "Çalışma Alanı Oluştur",
    },
    exploreMore: {
      title: "Daha fazla özellik keşfedin",
      features: {
        customAgents: {
          title: "Özel AI Ajanları",
          description:
            "Kod yazmadan güçlü AI Ajanları ve otomasyonlar oluşturun.",
          primaryAction: "@agent kullanarak sohbet et",
          secondaryAction: "Bir ajan akışı oluştur",
        },
        slashCommands: {
          title: "Eğik Çizgi Komutları",
          description:
            "Özel eğik çizgi komutları kullanarak zaman kazanın ve promptlar enjekte edin.",
          primaryAction: "Eğik Çizgi Komutu Oluştur",
          secondaryAction: "Hub'da Keşfet",
        },
        systemPrompts: {
          title: "Sistem Promptları",
          description:
            "Bir çalışma alanının AI yanıtlarını özelleştirmek için sistem promptunu değiştirin.",
          primaryAction: "Sistem Promptunu Değiştir",
          secondaryAction: "Prompt değişkenlerini yönet",
        },
      },
    },
    announcements: {
      title: "Güncellemeler & Duyurular",
    },
    resources: {
      title: "Kaynaklar",
      links: {
        docs: "Dokümantasyon",
        star: "Github'da Yıldızla",
      },
      keyboardShortcuts: "Klavye Kısayolları",
    },
  },
  "new-workspace": {
    title: "Yeni Çalışma Alanı",
    placeholder: "Benim Çalışma Alanım",
  },
  "workspaces—settings": {
    general: "Genel Ayarlar",
    chat: "Sohbet Ayarları",
    vector: "Vektör Veritabanı",
    members: "Üyeler",
    agent: "Ajan Yapılandırması",
  },
  general: {
    vector: {
      title: "Vektör Sayısı",
      description: "Vektör veritabanınızdaki toplam vektör sayısı.",
    },
    names: {
      description:
        "Bu, yalnızca çalışma alanınızın görüntü adını değiştirecektir.",
    },
    message: {
      title: "Önerilen Sohbet Mesajları",
      description:
        "Çalışma alanı kullanıcılarınıza önerilecek sohbet mesajlarını özelleştirin.",
      add: "Yeni mesaj ekle",
      save: "Mesajları Kaydet",
      heading: "Bana açıkla",
      body: "AnythingLLM'nin faydalarını",
    },
    pfp: {
      title: "Asistan Profil Görseli",
      description:
        "Bu çalışma alanı için asistanın profil resmini özelleştirin.",
      image: "Çalışma Alanı Görseli",
      remove: "Çalışma Alanı Görselini Kaldır",
    },
    delete: {
      title: "Çalışma Alanını Sil",
      description:
        "Bu çalışma alanını ve tüm verilerini silin. Bu işlem, çalışma alanını tüm kullanıcılar için silecektir.",
      delete: "Çalışma Alanını Sil",
      deleting: "Çalışma Alanı Siliniyor...",
      "confirm-start": "Tüm çalışma alanınızı silmek üzeresiniz",
      "confirm-end":
        ". Bu, vektör veritabanınızdaki tüm vektör gömme verilerini kaldıracaktır.\n\nOrijinal kaynak dosyalar etkilenmeyecektir. Bu işlem geri alınamaz.",
    },
  },
  chat: {
    llm: {
      title: "Çalışma Alanı LLM Sağlayıcısı",
      description:
        "Bu çalışma alanı için kullanılacak belirli LLM sağlayıcısı ve modeli. Varsayılan olarak sistem LLM sağlayıcısı ve ayarları kullanılır.",
      search: "Tüm LLM sağlayıcılarını ara",
    },
    model: {
      title: "Çalışma Alanı Sohbet Modeli",
      description:
        "Bu çalışma alanı için kullanılacak belirli sohbet modeli. Boş bırakılırsa, sistem LLM tercihi kullanılacaktır.",
      wait: "-- modeller bekleniyor --",
    },
    mode: {
      title: "Sohbet Modu",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Sohbet",
        "desc-start": "LLM'nin genel bilgisiyle yanıtlar sunar",
        and: "ve",
        "desc-end": "bulunan belge bağlamını ekler.",
      },
      query: {
        title: "Sorgu",
        "desc-start": "yanıtları",
        only: "sadece",
        "desc-end": "belge bağlamı bulunduğunda sunar.",
      },
    },
    history: {
      title: "Sohbet Geçmişi",
      "desc-start":
        "Yanıta dahil edilecek önceki sohbetlerin sayısı (kısa süreli hafıza).",
      recommend: "20 önerilir. ",
      "desc-end":
        "45'ten fazlası, mesaj boyutuna göre sürekli sohbet hatalarına yol açabilir.",
    },
    prompt: {
      title: "Komut (Prompt)",
      description:
        "Bu çalışma alanında kullanılacak komut. Yapay zekanın yanıt üretmesi için bağlam ve talimatları tanımlayın. Uygun ve doğru yanıtlar almak için özenle hazırlanmış bir komut sağlamalısınız.",
      history: {
        title: "Sistem Prompt Geçmişi",
        clearAll: "Tümünü Temizle",
        noHistory: "Sistem prompt geçmişi mevcut değil",
        restore: "Geri Yükle",
        delete: "Sil",
        publish: "Topluluk Hub'ına Yayınla",
        deleteConfirm: "Bu geçmiş öğesini silmek istediğinizden emin misiniz?",
        clearAllConfirm:
          "Tüm geçmişi temizlemek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
        expand: "Genişlet",
      },
    },
    refusal: {
      title: "Sorgu Modu Ret Yanıtı",
      "desc-start": "Eğer",
      query: "sorgu",
      "desc-end":
        "modunda bağlam bulunamazsa, özel bir ret yanıtı döndürmek isteyebilirsiniz.",
      "tooltip-title": "Bunu neden görüyorum?",
      "tooltip-description":
        "Sorgu modundasınız; bu mod yalnızca belgelerinizdeki bilgileri kullanır. Daha esnek konuşmalar için sohbet moduna geçin veya sohbet modları hakkında daha fazla bilgi edinmek için belgelerimizi ziyaret etmek üzere buraya tıklayın.",
    },
    temperature: {
      title: "LLM Sıcaklığı",
      "desc-start":
        'Bu ayar, LLM yanıtlarının ne kadar "yaratıcı" olacağını kontrol eder.',
      "desc-end":
        "Sayı yükseldikçe yaratıcı yanıtlar artar. Bazı modeller için bu değer çok yüksek ayarlandığında anlamsız yanıtlar ortaya çıkabilir.",
      hint: "Çoğu LLM'in farklı kabul edilebilir değer aralıkları vardır. Ayrıntılar için LLM sağlayıcınıza danışın.",
    },
  },
  "vector-workspace": {
    identifier: "Vektör veritabanı tanımlayıcısı",
    snippets: {
      title: "Maksimum Bağlam Parçacıkları",
      description:
        "Bu ayar, sohbet veya sorgu başına LLM'e gönderilecek maksimum bağlam parçacığı sayısını kontrol eder.",
      recommend: "Önerilen: 4",
    },
    doc: {
      title: "Belge benzerlik eşiği",
      description:
        "Bir kaynağın sohbetle ilişkili sayılabilmesi için gereken minimum benzerlik puanı. Sayı yükseldikçe, kaynağın sohbete benzerliği de o kadar yüksek olmalıdır.",
      zero: "Kısıtlama yok",
      low: "Düşük (benzerlik puanı ≥ .25)",
      medium: "Orta (benzerlik puanı ≥ .50)",
      high: "Yüksek (benzerlik puanı ≥ .75)",
    },
    reset: {
      reset: "Vektör veritabanını sıfırla",
      resetting: "Vektörler temizleniyor...",
      confirm:
        "Bu çalışma alanının vektör veritabanını sıfırlamak üzeresiniz. Bu işlem, hâlihazırda gömülü olan tüm vektör verilerini kaldıracaktır.\n\nOrijinal kaynak dosyalar etkilenmeyecektir. Bu işlem geri alınamaz.",
      error: "Çalışma alanının vektör veritabanı sıfırlanamadı!",
      success: "Çalışma alanının vektör veritabanı sıfırlandı!",
    },
  },
  agent: {
    "performance-warning":
      "Araç çağırmayı açıkça desteklemeyen LLM'lerin performansı, modelin yetenekleri ve doğruluğuna büyük ölçüde bağlıdır. Bazı beceriler kısıtlı veya işlevsiz olabilir.",
    provider: {
      title: "Çalışma Alanı Ajan LLM Sağlayıcısı",
      description:
        "Bu çalışma alanındaki @agent ajanı için kullanılacak spesifik LLM sağlayıcısı ve modeli.",
    },
    mode: {
      chat: {
        title: "Çalışma Alanı Ajan Sohbet Modeli",
        description:
          "Bu çalışma alanındaki @agent ajanı için kullanılacak spesifik sohbet modeli.",
      },
      title: "Çalışma Alanı Ajan Modeli",
      description:
        "Bu çalışma alanındaki @agent ajanı için kullanılacak spesifik LLM modeli.",
      wait: "-- modeller bekleniyor --",
    },
    skill: {
      title: "Varsayılan ajan becerileri",
      description:
        "Varsayılan ajanın doğal yeteneklerini, hazır oluşturulmuş bu becerilerle geliştirin. Bu yapılandırma tüm çalışma alanları için geçerlidir.",
      rag: {
        title: "RAG ve uzun vadeli hafıza",
        description:
          'Ajana, yerel belgelerinizi kullanarak soruları yanıtlatma veya bazı içerikleri "hatırlaması" için uzun vadeli hafıza kullanma izni verin.',
      },
      view: {
        title: "Belgeleri görüntüleme & özetleme",
        description:
          "Ajana, çalışma alanında hâlihazırda gömülü olan dosyaları listeleyip özetleme izni verin.",
      },
      scrape: {
        title: "Web sitelerini tarama",
        description:
          "Ajana, web sitelerini ziyaret edip içeriklerini tarama izni verin.",
      },
      generate: {
        title: "Grafik oluşturma",
        description:
          "Varsayılan ajanın, sağlanan veya sohbette yer alan verilere göre çeşitli grafik türleri oluşturmasına izin verin.",
      },
      save: {
        title: "Tarayıcıya dosya oluştur & kaydet",
        description:
          "Varsayılan ajanın, oluşturduğu dosyaları kaydetmesine ve tarayıcıda indirilebilir hale getirmesine izin verin.",
      },
      web: {
        title: "Canlı web araması ve gezinme",
        description:
          "Ajantınızın, web arama (SERP) sağlayıcısıyla bağlantı kurarak, sorularınızı yanıtlamak için web'i aramasını sağlayın.",
      },
      sql: {
        title: "SQL Bağlayıcı",
        description:
          "Temsilcinizin, çeşitli SQL veri tabanı sağlayıcılarına bağlanarak SQL'i kullanarak sorularınızı yanıtlamasına olanak tanıyın.",
      },
      default_skill:
        "Varsayılan olarak bu özellik etkinleştirilmiştir, ancak ajanın kullanmasına izin vermek istemiyorsanız, bu özelliği devre dışı bırakabilirsiniz.",
    },
  },
  recorded: {
    title: "Çalışma Alanı Sohbetleri",
    description:
      "Bunlar, kullanıcılar tarafından gönderilen ve oluşturulma tarihlerine göre sıralanan tüm kayıtlı sohbetler ve mesajlardır.",
    export: "Dışa Aktar",
    table: {
      id: "Id",
      by: "Gönderen",
      workspace: "Çalışma Alanı",
      prompt: "Komut (Prompt)",
      response: "Yanıt",
      at: "Gönderilme Zamanı",
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
      title: "Arayüz Tercihleri",
      description: "AnythingLLM için arayüz tercihlerinizi ayarlayın.",
    },
    branding: {
      title: "Marka & Beyaz Etiketleme",
      description:
        "AnythingLLM örneğinizi özel markalamayla beyaz etiketleyin.",
    },
    chat: {
      title: "Sohbet",
      description: "AnythingLLM için sohbet tercihlerinizi ayarlayın.",
      auto_submit: {
        title: "Konuşma Girişini Otomatik Gönder",
        description:
          "Bir sessizlik süresinden sonra konuşma girişini otomatik olarak gönderin",
      },
      auto_speak: {
        title: "Yanıtları Otomatik Seslendir",
        description: "AI yanıtlarını otomatik olarak seslendirin",
      },
      spellcheck: {
        title: "Yazım Denetimini Etkinleştir",
        description:
          "Sohbet giriş alanında yazım denetimini etkinleştirin veya devre dışı bırakın",
      },
    },
    items: {
      theme: {
        title: "Tema",
        description: "Uygulama için tercih ettiğiniz renk temasını seçin.",
      },
      "show-scrollbar": {
        title: "Kaydırma Çubuğunu Göster",
        description:
          "Sohbet penceresinde kaydırma çubuğunu etkinleştirin veya devre dışı bırakın.",
      },
      "support-email": {
        title: "Destek E-postası",
        description:
          "Kullanıcıların yardıma ihtiyaç duyduğunda erişebilecekleri destek e-posta adresini ayarlayın.",
      },
      "app-name": {
        title: "Ad",
        description:
          "Giriş sayfasında tüm kullanıcılara gösterilen bir ad ayarlayın.",
      },
      "chat-message-alignment": {
        title: "Sohbet Mesajı Hizalaması",
        description:
          "Sohbet arayüzünü kullanırken mesaj hizalama modunu seçin.",
      },
      "display-language": {
        title: "Görüntüleme Dili",
        description:
          "AnythingLLM'nin kullanıcı arayüzünü görüntülemek için tercih edilen dili seçin - çeviriler mevcut olduğunda.",
      },
      logo: {
        title: "Marka Logosu",
        description: "Tüm sayfalarda göstermek için özel logonuzu yükleyin.",
        add: "Özel logo ekle",
        recommended: "Önerilen boyut: 800 x 200",
        remove: "Kaldır",
        replace: "Değiştir",
      },
      "welcome-messages": {
        title: "Karşılama Mesajları",
        description:
          "Kullanıcılarınıza gösterilen karşılama mesajlarını özelleştirin. Yalnızca yönetici olmayan kullanıcılar bu mesajları görecektir.",
        new: "Yeni",
        system: "sistem",
        user: "kullanıcı",
        message: "mesaj",
        assistant: "AnythingLLM Sohbet Asistanı",
        "double-click": "Düzenlemek için çift tıklayın...",
        save: "Mesajları Kaydet",
      },
      "browser-appearance": {
        title: "Tarayıcı Görünümü",
        description:
          "Uygulama açıkken tarayıcı sekmesinin ve başlığının görünümünü özelleştirin.",
        tab: {
          title: "Başlık",
          description:
            "Uygulama bir tarayıcıda açıkken özel bir sekme başlığı ayarlayın.",
        },
        favicon: {
          title: "Favicon",
          description: "Tarayıcı sekmesi için özel bir favicon kullanın.",
        },
      },
      "sidebar-footer": {
        title: "Kenar Çubuğu Alt Bilgi Öğeleri",
        description:
          "Kenar çubuğunun altında görüntülenen alt bilgi öğelerini özelleştirin.",
        icon: "Simge",
        link: "Bağlantı",
      },
      "render-html": {
        title: "Sohbette HTML Görüntüle",
        description:
          "Asistan yanıtlarında HTML yanıtlarını görüntüleyin.\nBu, çok daha yüksek kaliteli yanıt sağlayabilir, ancak potansiyel güvenlik risklerine de yol açabilir.",
      },
    },
  },
  api: {
    title: "API Anahtarları",
    description:
      "API anahtarları, bu AnythingLLM örneğine programatik olarak erişmeye ve yönetmeye olanak tanır.",
    link: "API dokümantasyonunu okuyun",
    generate: "Yeni API Anahtarı Oluştur",
    table: {
      key: "API Anahtarı",
      by: "Oluşturan",
      created: "Oluşturulma Tarihi",
    },
  },
  llm: {
    title: "LLM Tercihi",
    description:
      "Bu, tercih ettiğiniz LLM sohbet ve gömme sağlayıcısının kimlik bilgileri ile ayarlarıdır. Bu anahtarların güncel ve doğru olması önemlidir; aksi takdirde AnythingLLM doğru çalışmayacaktır.",
    provider: "LLM Sağlayıcısı",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure Hizmet Uç Noktası",
        api_key: "API Anahtarı",
        chat_deployment_name: "Sohbet Dağıtım Adı",
        chat_model_token_limit: "Sohbet Modeli Token Limiti",
        model_type: "Model Türü",
        model_type_tooltip:
          'Dağıtımınız bir mantıksal model (o1, o1-mini, o3-mini vb.) kullanıyorsa, bunu "Mantıksal" olarak ayarlayın. Aksi takdirde sohbet istekleriniz başarısız olabilir.',
        default: "Varsayılan",
        reasoning: "Mantıksal",
      },
    },
  },
  transcription: {
    title: "Transkripsiyon Model Tercihi",
    description:
      "Bu, tercih ettiğiniz transkripsiyon modeli sağlayıcısının kimlik bilgileri ve ayarlarıdır. Anahtarların güncel ve doğru olması önemlidir; aksi takdirde medya dosyaları ve sesler transkribe edilemez.",
    provider: "Transkripsiyon Sağlayıcısı",
    "warn-start":
      "Sınırlı RAM veya CPU'ya sahip makinelerde yerel Whisper modelini kullanmak, medya dosyalarını işlerken AnythingLLM'nin duraksamasına neden olabilir.",
    "warn-recommend":
      "En az 2GB RAM öneriyoruz ve 10MB üzerinde dosya yüklememeye dikkat edin.",
    "warn-end":
      "Yerleşik model, ilk kullanımda otomatik olarak indirilecektir.",
  },
  embedding: {
    title: "Gömme (Embedding) Tercihi",
    "desc-start":
      "Yerel olarak gömme mekanizmasını desteklemeyen bir LLM kullanıyorsanız, metinleri gömmek için ek kimlik bilgileri girmeniz gerekebilir.",
    "desc-end":
      "Gömme, metni vektörlere dönüştürme sürecidir. Dosyalarınızın ve komutlarınızın işlenebilmesi için AnythingLLM, bu kimlik bilgilerine ihtiyaç duyar.",
    provider: {
      title: "Embedding Sağlayıcısı",
    },
  },
  text: {
    title: "Metin Bölme & Parçalama Tercihleri",
    "desc-start":
      "Bazı durumlarda, yeni belgelerin vektör veritabanınıza eklenmeden önce hangi varsayılan yöntemle bölünüp parçalanacağını değiştirmek isteyebilirsiniz.",
    "desc-end":
      "Metin bölmenin nasıl çalıştığını ve olası yan etkilerini tam olarak bilmiyorsanız bu ayarı değiştirmemelisiniz.",
    size: {
      title: "Metin Parça Boyutu",
      description:
        "Tek bir vektörde bulunabilecek maksimum karakter uzunluğunu ifade eder.",
      recommend: "Gömme modelinin maksimum karakter uzunluğu",
    },
    overlap: {
      title: "Metin Parçalama Örtüşmesi",
      description:
        "İki bitişik metin parçası arasındaki, parçalama sırasında oluşabilecek maksimum karakter örtüşme miktarını belirtir.",
    },
  },
  vector: {
    title: "Vektör Veritabanı",
    description:
      "AnythingLLM örneğinizin nasıl çalışacağını belirleyen kimlik bilgileri ve ayarları burada bulunur. Bu anahtarların güncel ve doğru olması önemlidir.",
    provider: {
      title: "Vektör Veritabanı Sağlayıcısı",
      description: "LanceDB için ek bir yapılandırma gerekmez.",
    },
  },
  embeddable: {
    title: "Gömülebilir Sohbet Widget'ları",
    description:
      "Gömülebilir sohbet widget'ları, herkese açık olan ve tek bir çalışma alanına bağlı sohbet arayüzleridir. Bu sayede oluşturduğunuz çalışma alanlarını dünyaya açık hâle getirebilirsiniz.",
    create: "Gömme oluştur",
    table: {
      workspace: "Çalışma Alanı",
      chats: "Gönderilen Sohbetler",
      active: "Aktif Alan Adları",
      created: "Oluşturulma Tarihi",
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
    title: "Gömme Sohbetler",
    export: "Dışa Aktar",
    description:
      "Yayımladığınız herhangi bir gömme sohbetten gelen tüm kayıtlı sohbetler ve mesajlar burada bulunur.",
    table: {
      embed: "Gömme",
      sender: "Gönderen",
      message: "Mesaj",
      response: "Yanıt",
      at: "Gönderilme Zamanı",
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
    title: "Güvenlik",
    multiuser: {
      title: "Çoklu Kullanıcı Modu",
      description:
        "Takımınızı desteklemek için örneğinizi yapılandırın ve Çoklu Kullanıcı Modunu etkinleştirin.",
      enable: {
        "is-enable": "Çoklu Kullanıcı Modu Etkin",
        enable: "Çoklu Kullanıcı Modunu Etkinleştir",
        description:
          "Varsayılan olarak tek yönetici sizsiniz. Yönetici olarak yeni kullanıcılar veya yöneticiler için hesap oluşturmanız gerekir. Şifrenizi kaybetmeyin çünkü yalnızca bir Yönetici kullanıcı şifreleri sıfırlayabilir.",
        username: "Yönetici hesap kullanıcı adı",
        password: "Yönetici hesap şifresi",
      },
    },
    password: {
      title: "Şifre Koruması",
      description:
        "AnythingLLM örneğinizi bir şifre ile koruyun. Bu şifreyi unutmanız hâlinde kurtarma yöntemi yoktur, bu yüzden mutlaka güvende saklayın.",
      "password-label": "Örnek şifresi",
    },
  },
  event: {
    title: "Olay Kayıtları",
    description:
      "Bu örnek üzerinde gerçekleşen tüm eylem ve olayları izlemek için görüntüleyin.",
    clear: "Olay Kayıtlarını Temizle",
    table: {
      type: "Olay Türü",
      user: "Kullanıcı",
      occurred: "Gerçekleşme Zamanı",
    },
  },
  privacy: {
    title: "Gizlilik & Veri İşleme",
    description:
      "Bağlantılı üçüncü taraf sağlayıcılarla ve AnythingLLM ile verilerinizin nasıl ele alındığını burada yapılandırabilirsiniz.",
    llm: "LLM Seçimi",
    embedding: "Gömme Tercihi",
    vector: "Vektör Veritabanı",
    anonymous: "Anonim Telemetri Etkin",
  },
  connectors: {
    "search-placeholder": "Veri bağlayıcılarını ara",
    "no-connectors": "Veri bağlayıcısı bulunamadı.",
    obsidian: {
      name: "Obsidian",
      description: "Obsidian kasasını tek tıklamayla içe aktarın.",
      vault_location: "Kasa Konumu",
      vault_description:
        "Tüm notları ve bağlantılarını içe aktarmak için Obsidian kasa klasörünüzü seçin.",
      selected_files: "{{count}} markdown dosyası bulundu",
      importing: "Kasa içe aktarılıyor...",
      import_vault: "Kasayı İçe Aktar",
      processing_time:
        "Bu işlem kasanızın boyutuna bağlı olarak biraz zaman alabilir.",
      vault_warning:
        "Herhangi bir çakışmayı önlemek için Obsidian kasanızın şu anda açık olmadığından emin olun.",
    },
    github: {
      name: "GitHub Deposu",
      description:
        "Tek tıklamayla tüm herkese açık veya özel GitHub deposunu içe aktarın.",
      URL: "GitHub Depo URL'si",
      URL_explained: "Toplamak istediğiniz GitHub deposunun URL'si.",
      token: "GitHub Erişim Tokeni",
      optional: "isteğe bağlı",
      token_explained: "Hız sınırlamasını önlemek için erişim tokeni.",
      token_explained_start: "Bir ",
      token_explained_link1: "Kişisel Erişim Tokeni",
      token_explained_middle:
        " olmadan GitHub API'si, hız sınırları nedeniyle toplanabilecek dosya sayısını sınırlayabilir. ",
      token_explained_link2: "Geçici bir Erişim Tokeni oluşturabilirsiniz",
      token_explained_end: " bu sorunu önlemek için.",
      ignores: "Dosya Yoksaymaları",
      git_ignore:
        "Toplama sırasında belirli dosyaları yoksaymak için .gitignore formatında liste. Kaydetmek istediğiniz her girişten sonra enter tuşuna basın.",
      task_explained:
        "Tamamlandığında, tüm dosyalar belge seçicide çalışma alanlarına gömülmeye hazır olacaktır.",
      branch: "Dosyaları toplamak istediğiniz dal.",
      branch_loading: "-- mevcut dallar yükleniyor --",
      branch_explained: "Dosyaları toplamak istediğiniz dal.",
      token_information:
        "<b>GitHub Erişim Tokeni</b> doldurulmadan bu veri bağlayıcısı, GitHub'ın herkese açık API hız sınırları nedeniyle yalnızca deponun <b>üst düzey</b> dosyalarını toplayabilecektir.",
      token_personal:
        "Buradan ücretsiz bir Kişisel Erişim Tokeni alabilirsiniz.",
    },
    gitlab: {
      name: "GitLab Deposu",
      description:
        "Tek tıklamayla tüm herkese açık veya özel GitLab deposunu içe aktarın.",
      URL: "GitLab Depo URL'si",
      URL_explained: "Toplamak istediğiniz GitLab deposunun URL'si.",
      token: "GitLab Erişim Tokeni",
      optional: "isteğe bağlı",
      token_explained: "Hız sınırlamasını önlemek için erişim tokeni.",
      token_description: "GitLab API'sinden alınacak ek varlıkları seçin.",
      token_explained_start: "Bir ",
      token_explained_link1: "Kişisel Erişim Tokeni",
      token_explained_middle:
        " olmadan GitLab API'si, hız sınırları nedeniyle toplanabilecek dosya sayısını sınırlayabilir. ",
      token_explained_link2: "Geçici bir Erişim Tokeni oluşturabilirsiniz",
      token_explained_end: " bu sorunu önlemek için.",
      fetch_issues: "Sorunları Belge Olarak Al",
      ignores: "Dosya Yoksaymaları",
      git_ignore:
        "Toplama sırasında belirli dosyaları yoksaymak için .gitignore formatında liste. Kaydetmek istediğiniz her girişten sonra enter tuşuna basın.",
      task_explained:
        "Tamamlandığında, tüm dosyalar belge seçicide çalışma alanlarına gömülmeye hazır olacaktır.",
      branch: "Dosyaları toplamak istediğiniz dal",
      branch_loading: "-- mevcut dallar yükleniyor --",
      branch_explained: "Dosyaları toplamak istediğiniz dal.",
      token_information:
        "<b>GitLab Erişim Tokeni</b> doldurulmadan bu veri bağlayıcısı, GitLab'ın herkese açık API hız sınırları nedeniyle yalnızca deponun <b>üst düzey</b> dosyalarını toplayabilecektir.",
      token_personal:
        "Buradan ücretsiz bir Kişisel Erişim Tokeni alabilirsiniz.",
    },
    youtube: {
      name: "YouTube Transkripti",
      description:
        "Bir bağlantıdan tüm YouTube videosunun transkriptini içe aktarın.",
      URL: "YouTube Video URL'si",
      URL_explained_start:
        "Transkriptini almak için herhangi bir YouTube videosunun URL'sini girin. Videonun ",
      URL_explained_link: "altyazıları",
      URL_explained_end: " mevcut olmalıdır.",
      task_explained:
        "Tamamlandığında, transkript belge seçicide çalışma alanlarına gömülmeye hazır olacaktır.",
      language: "Transkript Dili",
      language_explained: "Toplamak istediğiniz transkriptin dilini seçin.",
      loading_languages: "-- mevcut diller yükleniyor --",
    },
    "website-depth": {
      name: "Toplu Bağlantı Kazıyıcı",
      description:
        "Bir web sitesini ve alt bağlantılarını belirli bir derinliğe kadar kazıyın.",
      URL: "Web Sitesi URL'si",
      URL_explained: "Kazımak istediğiniz web sitesinin URL'si.",
      depth: "Tarama Derinliği",
      depth_explained:
        "Bu, çalışanın kaynak URL'den takip edeceği alt bağlantı sayısıdır.",
      max_pages: "Maksimum Sayfa",
      max_pages_explained: "Kazınacak maksimum bağlantı sayısı.",
      task_explained:
        "Tamamlandığında, tüm kazınan içerik belge seçicide çalışma alanlarına gömülmeye hazır olacaktır.",
    },
    confluence: {
      name: "Confluence",
      description: "Tek tıklamayla tüm Confluence sayfasını içe aktarın.",
      deployment_type: "Confluence dağıtım türü",
      deployment_type_explained:
        "Confluence örneğinizin Atlassian bulutunda mı yoksa kendi sunucunuzda mı barındırıldığını belirleyin.",
      base_url: "Confluence temel URL'si",
      base_url_explained: "Bu, Confluence alanınızın temel URL'sidir.",
      space_key: "Confluence alan anahtarı",
      space_key_explained:
        "Bu, kullanılacak confluence örneğinizin alan anahtarıdır. Genellikle ~ ile başlar",
      username: "Confluence Kullanıcı Adı",
      username_explained: "Confluence kullanıcı adınız",
      auth_type: "Confluence Kimlik Doğrulama Türü",
      auth_type_explained:
        "Confluence sayfalarınıza erişmek için kullanmak istediğiniz kimlik doğrulama türünü seçin.",
      auth_type_username: "Kullanıcı Adı ve Erişim Tokeni",
      auth_type_personal: "Kişisel Erişim Tokeni",
      token: "Confluence Erişim Tokeni",
      token_explained_start:
        "Kimlik doğrulama için bir erişim tokeni sağlamanız gerekiyor. ",
      token_explained_link: "Buradan",
      token_desc: "Kimlik doğrulama için erişim tokeni",
      pat_token: "Confluence Kişisel Erişim Tokeni",
      pat_token_explained: "Confluence kişisel erişim tokeniniz.",
      bypass_ssl: "SSL Sertifika Doğrulamasını Atla",
      bypass_ssl_explained:
        "Kendinden imzalı sertifikaya sahip kendi sunucunuzda barındırılan confluence örnekleri için SSL sertifika doğrulamasını atlamak için bu seçeneği etkinleştirin",
      task_explained:
        "Tamamlandığında, sayfa içeriği belge seçicide çalışma alanlarına gömülmeye hazır olacaktır.",
    },
    manage: {
      documents: "Belgeler",
      "data-connectors": "Veri Bağlayıcıları",
      "desktop-only":
        "Bu ayarları düzenlemek yalnızca masaüstü cihazda mümkündür. Devam etmek için lütfen bu sayfaya masaüstünüzden erişin.",
      dismiss: "Kapat",
      editing: "Düzenleniyor",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Belgelerim",
      "new-folder": "Yeni Klasör",
      "search-document": "Belge ara",
      "no-documents": "Belge Yok",
      "move-workspace": "Çalışma Alanına Taşı",
      name: "Ad",
      "delete-confirmation":
        "Bu dosyaları ve klasörleri silmek istediğinizden emin misiniz?\nBu, dosyaları sistemden kaldıracak ve mevcut çalışma alanlarından otomatik olarak silecektir.\nBu işlem geri alınamaz.",
      "removing-message":
        "{{count}} belge ve {{folderCount}} klasör kaldırılıyor. Lütfen bekleyin.",
      "move-success": "{{count}} belge başarıyla taşındı.",
      date: "Tarih",
      type: "Tür",
      no_docs: "Belge Yok",
      select_all: "Tümünü Seç",
      deselect_all: "Tümünün Seçimini Kaldır",
      remove_selected: "Seçilenleri Kaldır",
      costs: "*Gömmeler için tek seferlik maliyet",
      save_embed: "Kaydet ve Göm",
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
      "processor-offline": "Belge İşleyici Kullanılamıyor",
      "processor-offline-desc":
        "Belge işleyici çevrimdışı olduğu için şu anda dosyalarınızı yükleyemiyoruz. Lütfen daha sonra tekrar deneyin.",
      "click-upload": "Yüklemek için tıklayın veya sürükleyip bırakın",
      "file-types":
        "metin dosyaları, csv'ler, elektronik tablolar, ses dosyaları ve daha fazlasını destekler!",
      "or-submit-link": "veya bir bağlantı gönderin",
      "placeholder-link": "https://ornek.com",
      fetching: "Alınıyor...",
      "fetch-website": "Web sitesini al",
      "privacy-notice":
        "Bu dosyalar, bu AnythingLLM örneğinde çalışan belge işleyiciye yüklenecektir. Bu dosyalar üçüncü taraflarla paylaşılmaz.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Belge sabitleme nedir?",
      pin_explained_block1:
        "AnythingLLM'de bir belgeyi <b>sabitlediğinizde</b>, belgenin tüm içeriğini LLM'nin tam olarak anlaması için prompt pencerenize enjekte ederiz.",
      pin_explained_block2:
        "Bu, <b>büyük bağlam modelleri</b> veya bilgi tabanı için kritik olan küçük dosyalarla en iyi şekilde çalışır.",
      pin_explained_block3:
        "AnythingLLM'den varsayılan olarak istediğiniz yanıtları alamıyorsanız, sabitleme tek tıklamayla daha yüksek kaliteli yanıtlar almanın harika bir yoludur.",
      accept: "Tamam, anladım",
    },
    watching: {
      what_watching: "Bir belgeyi izlemek ne yapar?",
      watch_explained_block1:
        "AnythingLLM'de bir belgeyi <b>izlediğinizde</b>, belge içeriğinizi orijinal kaynağından düzenli aralıklarla <i>otomatik olarak</i> senkronize ederiz. Bu, dosyanın yönetildiği her çalışma alanında içeriği otomatik olarak günceller.",
      watch_explained_block2:
        "Bu özellik şu anda yalnızca çevrimiçi tabanlı içeriği desteklemektedir ve manuel olarak yüklenen belgeler için kullanılamayacaktır.",
      watch_explained_block3_start: "Hangi belgelerin izlendiğini ",
      watch_explained_block3_link: "Dosya yöneticisi",
      watch_explained_block3_end: " yönetici görünümünden yönetebilirsiniz.",
      accept: "Tamam, anladım",
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
    welcome: "Yeni çalışma alanınıza hoş geldiniz.",
    get_started: "Başlamak için",
    get_started_default: "Başlamak için",
    upload: "bir belge yükleyin",
    or: "veya",
    attachments_processing: "Ekler işleniyor. Lütfen bekleyin...",
    send_chat: "bir sohbet gönderin.",
    send_message: "Mesaj gönderin",
    attach_file: "Bu sohbete bir dosya ekleyin",
    slash: "Sohbet için mevcut tüm eğik çizgi komutlarını görüntüleyin.",
    agents: "Sohbet için kullanabileceğiniz tüm ajanları görüntüleyin.",
    start_agent_session: "Start agent session",
    text_size: "Metin boyutunu değiştirin.",
    microphone: "Promptunuzu söyleyin.",
    send: "Çalışma alanına prompt mesajı gönderin",
    tts_speak_message: "TTS Mesajı Seslendir",
    copy: "Kopyala",
    regenerate: "Yeniden Oluştur",
    regenerate_response: "Yanıtı yeniden oluştur",
    good_response: "İyi yanıt",
    more_actions: "Daha fazla eylem",
    hide_citations: "Alıntıları gizle",
    show_citations: "Alıntıları göster",
    sources: "Kaynaklar",
    source_count_one: "{{count}} ile ilgili bilgi",
    source_count_other: "{{count}} referansları",
    document: "Belge",
    similarity_match: "maç",
    pause_tts_speech_message: "TTS mesaj konuşmasını duraklat",
    fork: "Çatalla",
    delete: "Sil",
    save_submit: "Kaydet & Gönder",
    cancel: "İptal",
    submit: "Gönder",
    edit_prompt: "Promptu düzenle",
    edit_response: "Yanıtı düzenle",
    edit_info_user:
      '"Gönder" seçeneği, yapay zeka yanıtını yeniden oluşturur. "Kaydet" seçeneği, yalnızca sizin mesajınızı günceller.',
    edit_info_assistant:
      "Yaptığınız değişiklikler doğrudan bu yanıtın içine kaydedilecektir.",
    see_less: "Daha az",
    see_more: "Daha Fazla",
    at_agent: "@agent",
    default_agent_description: " - bu çalışma alanının varsayılan ajanı.",
    custom_agents_coming_soon: "özel ajanlar yakında!",
    preset_reset_description:
      "Sohbet geçmişinizi temizleyin ve yeni bir sohbet başlatın",
    preset_exit_description: "Mevcut ajan oturumunu durdurun",
    add_new_preset: " Yeni Ön Ayar Ekle",
    add_new: "Yeni ekle",
    edit: "Düzenle",
    publish: "Yayınla",
    stop_generating: "Yanıt üretmeyi durdurun",
    command: "Komut",
    your_command: "sizin-komutunuz",
    placeholder_prompt: "Bu, promptunuzun önüne enjekte edilecek içeriktir.",
    description: "Açıklama",
    placeholder_description: "LLM'ler hakkında bir şiirle yanıt verir.",
    save: "Kaydet",
    small: "Küçük",
    normal: "Normal",
    large: "Büyük",
    tools: "Araçlar",
    slash_commands: "Komut satırı komutları",
    agent_skills: "Ajansın Becerileri",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Gezin",
    text_size_label: "Metin Boyutu",
    select_model: "Model Seçimi",
    workspace_llm_manager: {
      search: "LLM sağlayıcılarını ara",
      loading_workspace_settings: "Çalışma alanı ayarları yükleniyor...",
      available_models: "{{provider}} için Mevcut Modeller",
      available_models_description:
        "Bu çalışma alanı için kullanılacak bir model seçin.",
      save: "Bu modeli kullan",
      saving: "Model çalışma alanı varsayılanı olarak ayarlanıyor...",
      missing_credentials: "Bu sağlayıcının kimlik bilgileri eksik!",
      missing_credentials_description:
        "Kimlik bilgilerini ayarlamak için tıklayın",
    },
  },
  profile_settings: {
    edit_account: "Hesabı Düzenle",
    profile_picture: "Profil Resmi",
    remove_profile_picture: "Profil Resmini Kaldır",
    username: "Kullanıcı Adı",
    new_password: "Yeni Şifre",
    password_description: "Şifre en az 8 karakter uzunluğunda olmalıdır",
    cancel: "İptal",
    update_account: "Hesabı Güncelle",
    theme: "Tema Tercihi",
    language: "Tercih edilen dil",
    failed_upload: "Profil resmi yüklenemedi: {{error}}",
    upload_success: "Profil resmi yüklendi.",
    failed_remove: "Profil resmi kaldırılamadı: {{error}}",
    profile_updated: "Profil güncellendi.",
    failed_update_user: "Kullanıcı güncellenemedi: {{error}}",
    account: "Hesap",
    support: "Destek",
    signout: "Çıkış Yap",
  },
  "keyboard-shortcuts": {
    title: "Klavye Kısayolları",
    shortcuts: {
      settings: "Ayarları Aç",
      workspaceSettings: "Mevcut Çalışma Alanı Ayarlarını Aç",
      home: "Ana Sayfaya Git",
      workspaces: "Çalışma Alanlarını Yönet",
      apiKeys: "API Anahtarları Ayarları",
      llmPreferences: "LLM Tercihleri",
      chatSettings: "Sohbet Ayarları",
      help: "Klavye kısayolları yardımını göster",
      showLLMSelector: "Çalışma alanı LLM Seçicisini Göster",
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
        success_title: "Başarılı!",
        success_description: "Sistem Promptunuz Topluluk Hub'ına yayınlandı!",
        success_thank_you: "Topluluğa paylaştığınız için teşekkür ederiz!",
        view_on_hub: "Topluluk Hub'ında Görüntüle",
        modal_title: "Sistem Promptu Yayınla",
        name_label: "Ad",
        name_description: "Bu, sistem promptunuzun görüntü adıdır.",
        name_placeholder: "Sistem Promptum",
        description_label: "Açıklama",
        description_description:
          "Bu, sistem promptunuzun açıklamasıdır. Sistem promptunuzun amacını açıklamak için bunu kullanın.",
        tags_label: "Etiketler",
        tags_description:
          "Etiketler, sistem promptunuzu daha kolay aramak için etiketlemek amacıyla kullanılır. Birden fazla etiket ekleyebilirsiniz. Maksimum 5 etiket. Etiket başına maksimum 20 karakter.",
        tags_placeholder: "Yazın ve etiket eklemek için Enter'a basın",
        visibility_label: "Görünürlük",
        public_description: "Herkese açık sistem promptları herkese görünür.",
        private_description: "Özel sistem promptları yalnızca size görünür.",
        publish_button: "Topluluk Hub'ına Yayınla",
        submitting: "Yayınlanıyor...",
        submit: "Topluluk Hub'ına Yayınla",
        prompt_label: "Prompt",
        prompt_description:
          "Bu, LLM'yi yönlendirmek için kullanılacak gerçek sistem promptudur.",
        prompt_placeholder: "Sistem promptunuzu buraya girin...",
      },
      agent_flow: {
        public_description: "Herkese açık ajan akışları herkese görünür.",
        private_description: "Özel ajan akışları yalnızca size görünür.",
        success_title: "Başarılı!",
        success_description: "Ajan Akışınız Topluluk Hub'ına yayınlandı!",
        success_thank_you: "Topluluğa paylaştığınız için teşekkür ederiz!",
        view_on_hub: "Topluluk Hub'ında Görüntüle",
        modal_title: "Ajan Akışı Yayınla",
        name_label: "Ad",
        name_description: "Bu, ajan akışınızın görüntü adıdır.",
        name_placeholder: "Ajan Akışım",
        description_label: "Açıklama",
        description_description:
          "Bu, ajan akışınızın açıklamasıdır. Ajan akışınızın amacını açıklamak için bunu kullanın.",
        tags_label: "Etiketler",
        tags_description:
          "Etiketler, ajan akışınızı daha kolay aramak için etiketlemek amacıyla kullanılır. Birden fazla etiket ekleyebilirsiniz. Maksimum 5 etiket. Etiket başına maksimum 20 karakter.",
        tags_placeholder: "Yazın ve etiket eklemek için Enter'a basın",
        visibility_label: "Görünürlük",
        publish_button: "Topluluk Hub'ına Yayınla",
        submitting: "Yayınlanıyor...",
        submit: "Topluluk Hub'ına Yayınla",
        privacy_note:
          "Ajan akışları, hassas verileri korumak için her zaman özel olarak yüklenir. Yayınladıktan sonra Topluluk Hub'ında görünürlüğü değiştirebilirsiniz. Lütfen yayınlamadan önce akışınızın hassas veya özel bilgi içermediğini doğrulayın.",
      },
      slash_command: {
        success_title: "Başarılı!",
        success_description:
          "Eğik Çizgi Komutunuz Topluluk Hub'ına yayınlandı!",
        success_thank_you: "Topluluğa paylaştığınız için teşekkür ederiz!",
        view_on_hub: "Topluluk Hub'ında Görüntüle",
        modal_title: "Eğik Çizgi Komutu Yayınla",
        name_label: "Ad",
        name_description: "Bu, eğik çizgi komutunuzun görüntü adıdır.",
        name_placeholder: "Eğik Çizgi Komutum",
        description_label: "Açıklama",
        description_description:
          "Bu, eğik çizgi komutunuzun açıklamasıdır. Eğik çizgi komutunuzun amacını açıklamak için bunu kullanın.",
        command_label: "Komut",
        command_description:
          "Bu, kullanıcıların bu ön ayarı tetiklemek için yazacağı eğik çizgi komutudur.",
        command_placeholder: "komutum",
        tags_label: "Etiketler",
        tags_description:
          "Etiketler, eğik çizgi komutunuzu daha kolay aramak için etiketlemek amacıyla kullanılır. Birden fazla etiket ekleyebilirsiniz. Maksimum 5 etiket. Etiket başına maksimum 20 karakter.",
        tags_placeholder: "Yazın ve etiket eklemek için Enter'a basın",
        visibility_label: "Görünürlük",
        public_description:
          "Herkese açık eğik çizgi komutları herkese görünür.",
        private_description: "Özel eğik çizgi komutları yalnızca size görünür.",
        publish_button: "Topluluk Hub'ına Yayınla",
        submitting: "Yayınlanıyor...",
        prompt_label: "Prompt",
        prompt_description:
          "Bu, eğik çizgi komutu tetiklendiğinde kullanılacak prompttur.",
        prompt_placeholder: "Promptunuzu buraya girin...",
      },
      generic: {
        unauthenticated: {
          title: "Kimlik Doğrulama Gerekli",
          description:
            "Öğeleri yayınlamadan önce AnythingLLM Topluluk Hub'ına kimlik doğrulaması yapmanız gerekir.",
          button: "Topluluk Hub'ına Bağlan",
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
