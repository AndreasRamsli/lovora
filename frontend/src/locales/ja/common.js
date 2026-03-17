const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "ようこそ",
      getStarted: "はじめる",
    },
    llm: {
      title: "LLMの設定",
      description:
        "AnythingLLMは多くのLLMプロバイダーと連携できます。これがチャットを処理するサービスになります。",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "ユーザー設定",
      description: "ユーザー設定を構成します。",
      howManyUsers: "このインスタンスを使用するユーザー数は？",
      justMe: "自分だけ",
      myTeam: "チーム",
      instancePassword: "インスタンスパスワード",
      setPassword: "パスワードを設定しますか？",
      passwordReq: "パスワードは8文字以上である必要があります。",
      passwordWarn:
        "このパスワードを保存することが重要です。回復方法はありません。",
      adminUsername: "管理者アカウントのユーザー名",
      adminPassword: "管理者アカウントのパスワード",
      adminPasswordReq: "パスワードは8文字以上である必要があります。",
      teamHint:
        "デフォルトでは、あなたが唯一の管理者になります。オンボーディングが完了した後、他のユーザーや管理者を作成して招待できます。パスワードを紛失しないでください。管理者のみがパスワードをリセットできます。",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "データ処理とプライバシー",
      description:
        "個人データに関して透明性とコントロールを提供することをお約束します。",
      settingsHint: "これらの設定は、設定画面でいつでも再構成できます。",
    },
    survey: {
      title: "AnythingLLMへようこそ",
      description:
        "AnythingLLMをあなたのニーズに合わせて構築するためにご協力ください。任意です。",
      email: "メールアドレスは何ですか？",
      useCase: "AnythingLLMを何に使用しますか？",
      useCaseWork: "仕事用",
      useCasePersonal: "個人用",
      useCaseOther: "その他",
      comment: "AnythingLLMをどのように知りましたか？",
      commentPlaceholder:
        "Reddit、Twitter、GitHub、YouTubeなど - どのように見つけたか教えてください！",
      skip: "アンケートをスキップ",
      thankYou: "フィードバックありがとうございます！",
    },
    workspace: {
      title: "最初のワークスペースを作成する",
      description:
        "最初のワークスペースを作成して、AnythingLLMを始めましょう。",
    },
  },
  common: {
    "workspaces-name": "ワークスペース名",
    error: "エラー",
    success: "成功",
    user: "ユーザー",
    selection: "モデル選択",
    saving: "保存中...",
    save: "変更を保存",
    previous: "前のページ",
    next: "次のページ",
    optional: "任意",
    yes: "はい",
    no: "いいえ",
    search: "検索",
    username_requirements:
      "ユーザー名は2〜32文字で、小文字で始まり、小文字、数字、アンダースコア、ハイフン、ピリオドのみを含む必要があります。",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "ようこそ",
    chooseWorkspace: "ワークスペースを選択してチャットを開始してください！",
    notAssigned:
      "現在、あなたはどのワークスペースにも割り当てられていません。\nワークスペースへのアクセスを要求するには、管理者にお問い合わせください。",
    goToWorkspace: 'ワークスペースに移動 "{{workspace}}"',
  },
  settings: {
    title: "インスタンス設定",
    system: "一般設定",
    invites: "招待",
    users: "ユーザー",
    workspaces: "ワークスペース",
    "workspace-chats": "ワークスペースチャット",
    customization: "カスタマイズ",
    interface: "UI設定",
    branding: "ブランディングとホワイトレーベル化",
    chat: "チャット",
    "api-keys": "開発者API",
    llm: "LLM",
    transcription: "文字起こし",
    embedder: "埋め込みエンジン",
    "text-splitting": "テキスト分割とチャンク化",
    "voice-speech": "音声とスピーチ",
    "vector-database": "ベクターデータベース",
    embeds: "チャット埋め込み",
    "embed-chats": "チャット埋め込み履歴",
    security: "セキュリティ",
    "event-logs": "イベントログ",
    privacy: "プライバシーとデータ",
    "ai-providers": "AIプロバイダー",
    "agent-skills": "エージェントスキル",
    "community-hub": {
      title: "地域交流拠点",
      trending: "人気のあるものを探す",
      "your-account": "あなたのアカウント",
      "import-item": "輸入品",
    },
    admin: "管理者",
    tools: "ツール",
    "system-prompt-variables": "システムプロンプト変数",
    "experimental-features": "実験的機能",
    contact: "サポートに連絡",
    "browser-extension": "ブラウザ拡張",
    "mobile-app": "AnythingLLM モバイル版",
  },
  login: {
    "multi-user": {
      welcome: "ようこそ",
      "placeholder-username": "ユーザー名",
      "placeholder-password": "パスワード",
      login: "ログイン",
      validating: "検証中...",
      "forgot-pass": "パスワードを忘れた",
      reset: "リセット",
    },
    "sign-in": "{{appName}} アカウントにサインインします。",
    "password-reset": {
      title: "パスワードリセット",
      description:
        "以下に必要な情報を入力してパスワードをリセットしてください。",
      "recovery-codes": "回復コード",
      "recovery-code": "回復コード {{index}}",
      "back-to-login": "ログイン画面に戻る",
    },
  },
  "main-page": {
    greeting: "今日はどのようにお手伝いできますか？",
    noWorkspaceError:
      "チャットを開始する前にワークスペースを作成してください。",
    checklist: {
      title: "はじめに",
      tasksLeft: "残りのタスク",
      completed: "AnythingLLMの達人への道を進んでいます！",
      dismiss: "閉じる",
      tasks: {
        create_workspace: {
          title: "ワークスペースを作成する",
          description: "始めるには最初のワークスペースを作成してください",
          action: "作成",
        },
        send_chat: {
          title: "チャットを送信する",
          description: "AIアシスタントとの会話を開始する",
          action: "チャット",
        },
        embed_document: {
          title: "ドキュメントを埋め込む",
          description: "ワークスペースに最初のドキュメントを追加する",
          action: "埋め込む",
        },
        setup_system_prompt: {
          title: "システムプロンプトを設定する",
          description: "AIアシスタントの動作を設定する",
          action: "設定",
        },
        define_slash_command: {
          title: "スラッシュコマンドを定義する",
          description: "アシスタント用のカスタムコマンドを作成する",
          action: "定義",
        },
        visit_community: {
          title: "コミュニティハブを訪問する",
          description: "コミュニティリソースとテンプレートを探索する",
          action: "閲覧",
        },
      },
    },
    quickActions: {
      createAgent: "エージェントを作成する",
      editWorkspace: "ワークスペースの編集",
      uploadDocument: "ドキュメントをアップロードする",
    },
    quickLinks: {
      title: "クイックリンク",
      sendChat: "チャットを送信",
      embedDocument: "ドキュメントを埋め込む",
      createWorkspace: "ワークスペースを作成",
    },
    exploreMore: {
      title: "その他の機能を探索",
      features: {
        customAgents: {
          title: "カスタムAIエージェント",
          description: "コードなしで強力なAIエージェントと自動化を構築。",
          primaryAction: "@agentを使用してチャット",
          secondaryAction: "エージェントフローを構築",
        },
        slashCommands: {
          title: "スラッシュコマンド",
          description:
            "カスタムスラッシュコマンドで時間を節約しプロンプトを挿入。",
          primaryAction: "スラッシュコマンドを作成",
          secondaryAction: "ハブで探索",
        },
        systemPrompts: {
          title: "システムプロンプト",
          description:
            "システムプロンプトを変更してワークスペースのAI返答をカスタマイズ。",
          primaryAction: "システムプロンプトを変更",
          secondaryAction: "プロンプト変数を管理",
        },
      },
    },
    announcements: {
      title: "更新とお知らせ",
    },
    resources: {
      title: "リソース",
      links: {
        docs: "ドキュメント",
        star: "Githubでスター",
      },
      keyboardShortcuts: "キーボードショートカット",
    },
  },
  "new-workspace": {
    title: "新しいワークスペース",
    placeholder: "マイワークスペース",
  },
  "workspaces—settings": {
    general: "一般設定",
    chat: "チャット設定",
    vector: "ベクターデータベース",
    members: "メンバー",
    agent: "エージェント構成",
  },
  general: {
    vector: {
      title: "ベクター数",
      description: "ベクターデータベース内のベクターの総数。",
    },
    names: {
      description: "これはワークスペースの表示名のみを変更します。",
    },
    message: {
      title: "提案されたチャットメッセージ",
      description:
        "ワークスペースユーザーに提案されるメッセージをカスタマイズします。",
      add: "新しいメッセージを追加",
      save: "メッセージを保存",
      heading: "説明してください",
      body: "AnythingLLMの利点",
    },
    pfp: {
      title: "アシスタントのプロフィール画像",
      description:
        "このワークスペースのアシスタントのプロフィール画像をカスタマイズします。",
      image: "ワークスペース画像",
      remove: "ワークスペース画像を削除",
    },
    delete: {
      title: "ワークスペースを削除",
      description:
        "このワークスペースとそのすべてのデータを削除します。これにより、すべてのユーザーのワークスペースが削除されます。",
      delete: "ワークスペースを削除",
      deleting: "ワークスペースを削除中...",
      "confirm-start": "ワークスペース全体を削除しようとしています",
      "confirm-end":
        "ワークスペース。この操作により、ベクターデータベース内のすべてのベクター埋め込みが削除されます。\n\n元のソースファイルはそのまま残ります。この操作は元に戻せません。",
    },
  },
  chat: {
    llm: {
      title: "ワークスペースLLMプロバイダー",
      description:
        "このワークスペースで使用するLLMプロバイダーとモデルを指定します。デフォルトではシステムのLLMプロバイダーと設定が使用されます。",
      search: "すべてのLLMプロバイダーを検索",
    },
    model: {
      title: "ワークスペースチャットモデル",
      description:
        "このワークスペースで使用するチャットモデルを指定します。空の場合はシステムのLLM設定が使用されます。",
      wait: "-- waiting for models --",
    },
    mode: {
      title: "チャットモード",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "チャット",
        "desc-start": "LLMの一般知識で回答します",
        and: "および",
        "desc-end": "見つかったドキュメントコンテキストを使用します。",
      },
      query: {
        title: "クエリ",
        "desc-start": "回答を提供します",
        only: "のみ",
        "desc-end": "ドキュメントコンテキストが見つかった場合のみ。",
      },
    },
    history: {
      title: "チャット履歴",
      "desc-start": "応答の短期記憶に含まれる過去のチャット数。",
      recommend: "推奨値: 20",
      "desc-end":
        "45以上にすると、メッセージサイズによっては継続的なチャット失敗が発生する可能性があります。",
    },
    prompt: {
      title: "プロンプト",
      description:
        "このワークスペースで使用するプロンプトです。AIが適切な応答を生成できるよう、コンテキストや指示を定義してください。",
      history: {
        title: "システムプロンプトの履歴",
        clearAll: "クリアすべて",
        noHistory: "利用履歴は保存されていません。",
        restore: "復元",
        delete: "削除",
        publish: "コミュニティハブに公開する",
        deleteConfirm: "本当にこの履歴項目を削除してもよろしいですか？",
        clearAllConfirm:
          "本当に履歴をすべて削除したくないですか？ この操作は取り消すことができません。",
        expand: "拡大",
      },
    },
    refusal: {
      title: "クエリモード拒否応答",
      "desc-start": "モードが",
      query: "クエリ",
      "desc-end":
        "の場合、コンテキストが見つからないときにカスタム拒否応答を返すことができます。",
      "tooltip-title": "なぜ、私はこれを見ているのだろう？",
      "tooltip-description":
        "現在、クエリモードで、お客様のドキュメントからのみ情報を取得しています。より柔軟な会話をご希望の場合は、チャットモードに切り替えてください。チャットモードについて詳しく知りたい場合は、こちらをクリックして、当社のドキュメントをご覧ください。",
    },
    temperature: {
      title: "LLM温度",
      "desc-start": "この設定はLLMの応答の創造性を制御します。",
      "desc-end":
        "数値が高いほど創造的になりますが、高すぎると一部のモデルでは一貫性のない応答になる場合があります。",
      hint: "多くのLLMには有効な値の範囲があります。詳細はLLMプロバイダーの情報を参照してください。",
    },
  },
  "vector-workspace": {
    identifier: "ベクターデータベース識別子",
    snippets: {
      title: "最大コンテキストスニペット数",
      description:
        "この設定は、チャットやクエリごとにLLMへ送信される最大コンテキストスニペット数を制御します。",
      recommend: "推奨値: 4",
    },
    doc: {
      title: "ドキュメント類似度しきい値",
      description:
        "チャットに関連すると見なされるために必要な最小類似度スコアです。数値が高いほど、より類似したソースのみが対象となります。",
      zero: "制限なし",
      low: "低（類似度スコア ≥ 0.25）",
      medium: "中（類似度スコア ≥ 0.50）",
      high: "高（類似度スコア ≥ 0.75）",
    },
    reset: {
      reset: "ベクターデータベースをリセット",
      resetting: "ベクターをクリア中...",
      confirm:
        "このワークスペースのベクターデータベースをリセットしようとしています。これにより、現在埋め込まれているすべてのベクターが削除されます。\n\n元のソースファイルはそのまま残ります。この操作は元に戻せません。",
      error: "ワークスペースのベクターデータベースをリセットできませんでした！",
      success: "ワークスペースのベクターデータベースがリセットされました！",
    },
  },
  agent: {
    "performance-warning":
      "ツール呼び出しに対応していないLLMの性能は、モデルの能力や精度に大きく依存します。一部の機能が制限されたり、正しく動作しない場合があります。",
    provider: {
      title: "ワークスペースエージェントのLLMプロバイダー",
      description:
        "このワークスペースの@agentで使用するLLMプロバイダーとモデルを指定します。",
    },
    mode: {
      chat: {
        title: "ワークスペースエージェントのチャットモデル",
        description:
          "このワークスペースの@agentで使用するチャットモデルを指定します。",
      },
      title: "ワークスペースエージェントのモデル",
      description:
        "このワークスペースの@agentで使用するLLMモデルを指定します。",
      wait: "-- モデルを読み込み中 --",
    },
    skill: {
      title: "デフォルトエージェントのスキル",
      description:
        "これらのスキルでデフォルトエージェントの能力を強化できます。設定はすべてのワークスペースに適用されます。",
      rag: {
        title: "RAGと長期記憶",
        description:
          "エージェントがローカルドキュメントを活用して質問に答えたり、内容を「記憶」して長期的に参照できるようにします。",
      },
      view: {
        title: "ドキュメントの閲覧と要約",
        description:
          "エージェントがワークスペース内のファイルを一覧表示し、内容を要約できるようにします。",
      },
      scrape: {
        title: "ウェブサイトの取得",
        description:
          "エージェントがウェブサイトを訪問し、内容を取得できるようにします。",
      },
      generate: {
        title: "チャートの生成",
        description:
          "デフォルトエージェントがチャットやデータからさまざまなチャートを作成できるようにします。",
      },
      save: {
        title: "ファイルの生成と保存",
        description:
          "デフォルトエージェントがファイルを生成し、ブラウザからダウンロードできるようにします。",
      },
      web: {
        title: "ウェブ検索と閲覧",
        description:
          "エージェントがウェブ検索（SERP）プロバイダーに接続することで、あなたの質問に答えるためにウェブを検索できるようにする。",
      },
      sql: {
        title: "SQLコネクタ",
        description:
          "エージェントが、さまざまなSQLデータベースプロバイダーに接続することで、SQLを活用してお客様からの質問に回答できるようにする。",
      },
      default_skill:
        "デフォルトでは、この機能は有効になっていますが、エージェントに利用させたくない場合は、無効にすることができます。",
    },
  },
  recorded: {
    title: "ワークスペースチャット履歴",
    description:
      "ユーザーが送信したすべてのチャットとメッセージの履歴です。作成日時順に表示されます。",
    export: "エクスポート",
    table: {
      id: "ID",
      by: "送信者",
      workspace: "ワークスペース",
      prompt: "プロンプト",
      response: "応答",
      at: "送信日時",
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
      title: "UI設定",
      description: "AnythingLLM の UI 設定を調整してください。",
    },
    branding: {
      title: "ブランディングとホワイトレーベル化",
      description:
        "AnythingLLMインスタンスを、独自のブランドでカスタマイズしてください。",
    },
    chat: {
      title: "チャット",
      description: "AnythingLLM のチャット設定をカスタマイズしてください。",
      auto_submit: {
        title: "自動音声入力送信",
        description: "沈黙の後に自動で音声入力を行う",
      },
      auto_speak: {
        title: "自動応答機能",
        description: "AIによる自動応答",
      },
      spellcheck: {
        title: "スペルチェック機能を有効にする",
        description:
          "チャット入力フィールドでのスペルチェックを有効または無効にする",
      },
    },
    items: {
      theme: {
        title: "テーマ",
        description: "アプリケーションの希望の色テーマを選択してください。",
      },
      "show-scrollbar": {
        title: "スクロールバーを表示する",
        description:
          "チャットウィンドウのスクロールバーを有効または無効にする。",
      },
      "support-email": {
        title: "サポートメール",
        description:
          "ユーザーが支援を必要とする際に利用できる、サポート用メールアドレスを設定します。",
      },
      "app-name": {
        title: "名前",
        description:
          "ログインページに表示される名前を、すべてのユーザーに設定する。",
      },
      "chat-message-alignment": {
        title: "チャットメッセージの整合性を確認する",
        description:
          "チャットインターフェースを使用する場合、メッセージの配置モードを選択してください。",
      },
      "display-language": {
        title: "表示言語",
        description:
          "AnythingLLMのUIを特定の言語で表示するためのオプションを選択してください。翻訳が利用可能な場合にのみ有効です。",
      },
      logo: {
        title: "ブランドロゴ",
        description:
          "すべてのページで表示するためのカスタムロゴをアップロードしてください。",
        add: "カスタムロゴを追加する",
        recommended: "推奨サイズ：800 x 200",
        remove: "削除",
        replace: "置き換える",
      },
      "welcome-messages": {
        title: "ようこそ",
        description:
          "ユーザーに表示されるウェルカムメッセージをカスタマイズできます。これらのメッセージは、管理者以外のユーザーのみが表示します。",
        new: "新しい",
        system: "システム",
        user: "私は、このプロジェクトの成功に貢献できることを願っています。",
        message: "メッセージ",
        assistant: "何か質問はありますか？",
        "double-click": "編集するにはダブルクリック...",
        save: "メッセージを保存する",
      },
      "browser-appearance": {
        title: "ブラウザの見た目",
        description:
          "アプリを開いたときに、ブラウザのタブとタイトルをカスタマイズする。",
        tab: {
          title: "タイトル",
          description:
            "ブラウザでアプリを開いたときに、カスタムのタブタイトルを設定します。",
        },
        favicon: {
          title: "Favicon",
          description: "ブラウザのタブにカスタムのfaviconを使用する。",
        },
      },
      "sidebar-footer": {
        title: "サイドバーのフッター項目",
        description:
          "サイドバーの下部に表示されるフッターの項目をカスタマイズする。",
        icon: "アイコン",
        link: "リンク",
      },
      "render-html": {
        title: "チャットでHTMLをレンダリングする",
        description:
          "アシスタントの回答にHTML形式のレスポンスを生成する。\nこれにより、回答の品質を大幅に向上させることができるが、同時にセキュリティ上のリスクも生じる可能性がある。",
      },
    },
  },
  api: {
    title: "APIキー",
    description:
      "APIキーにより、プログラム経由でこのAnythingLLMインスタンスにアクセスおよび管理できます。",
    link: "APIドキュメントを読む",
    generate: "新しいAPIキーを生成",
    table: {
      key: "APIキー",
      by: "作成者",
      created: "作成日",
    },
  },
  llm: {
    title: "LLMの設定",
    description:
      "これは、お好みのLLMチャットおよび埋め込みプロバイダー用の認証情報と設定です。これらのキーが最新かつ正確でない場合、AnythingLLMは正しく動作しません。",
    provider: "LLMプロバイダー",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Azure サービス エンドポイント",
        api_key: "APIキー",
        chat_deployment_name: "チャットデプロイメント名",
        chat_model_token_limit:
          "チャットモデルのトークン制限について\n\nチャットモデルのトークン制限について",
        model_type: "モデルの種類",
        model_type_tooltip:
          "もし、あなたのシステムが推論モデル（o1、o1-mini、o3-miniなど）を使用している場合、この設定を「推論」に設定してください。そうでない場合、チャットの要求が失敗する可能性があります。",
        default: "デフォルト",
        reasoning: "理由",
      },
    },
  },
  transcription: {
    title: "文字起こしモデルの設定",
    description:
      "これは、お好みの文字起こしモデルプロバイダー用の認証情報と設定です。これらのキーが最新かつ正確でない場合、メディアファイルや音声が正しく文字起こしされません。",
    provider: "文字起こしプロバイダー",
    "warn-start":
      "RAMやCPUが限られたマシンでローカルのWhisperモデルを使用すると、メディアファイルの処理中にAnythingLLMが停止する可能性があります。",
    "warn-recommend":
      "少なくとも2GBのRAMが推奨され、ファイルサイズは10Mb未満であることをお勧めします。",
    "warn-end": "組み込みモデルは初回使用時に自動的にダウンロードされます。",
  },
  embedding: {
    title: "埋め込み設定",
    "desc-start":
      "LLMがネイティブに埋め込みエンジンをサポートしていない場合、テキストの埋め込み用に追加の認証情報を指定する必要がある場合があります。",
    "desc-end":
      "埋め込みとは、テキストをベクトルに変換するプロセスです。これらの認証情報は、ファイルやプロンプトをAnythingLLMが処理できるフォーマットに変換するために必要です。",
    provider: {
      title: "埋め込みプロバイダー",
    },
  },
  text: {
    title: "テキスト分割とチャンク化の設定",
    "desc-start":
      "新しいドキュメントがベクトルデータベースに挿入される前に、どのように分割およびチャンク化されるかのデフォルトの方法を変更する場合があります。",
    "desc-end":
      "テキスト分割の仕組みとその副作用を理解している場合にのみ、この設定を変更するべきです。",
    size: {
      title: "テキストチャンクサイズ",
      description: "1つのベクトルに含まれる最大の文字数です。",
      recommend: "埋め込みモデルの最大長は",
    },
    overlap: {
      title: "テキストチャンクの重複",
      description: "隣接するテキストチャンク間に発生する最大の重複文字数です。",
    },
  },
  vector: {
    title: "ベクターデータベース設定",
    description:
      "これは、AnythingLLMインスタンスの動作方法用の認証情報と設定です。これらのキーが最新で正確であることが重要です。",
    provider: {
      title: "ベクターデータベースプロバイダー",
      description: "LanceDBの場合、特に設定は必要ありません。",
    },
  },
  embeddable: {
    title: "埋め込みチャットウィジェット",
    description:
      "埋め込みチャットウィジェットは、特定のワークスペースに紐付けられた公開用チャットインターフェースです。これにより、ワークスペースを構築し、そのチャットを外部に公開できます。",
    create: "埋め込みチャットウィジェットを作成",
    table: {
      workspace: "ワークスペース",
      chats: "送信済みチャット",
      active: "有効なドメイン",
      created: "作成",
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
    title: "埋め込みチャット履歴",
    export: "エクスポート",
    description:
      "これは、公開された埋め込みウィジェットから送信された全てのチャットとメッセージの記録です。",
    table: {
      embed: "埋め込み",
      sender: "送信者",
      message: "メッセージ",
      response: "応答",
      at: "送信日時",
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
    title: "セキュリティ",
    multiuser: {
      title: "マルチユーザーモード",
      description:
        "マルチユーザーモードを有効にして、チームをサポートするようにインスタンスを設定します。",
      enable: {
        "is-enable": "マルチユーザーモードが有効です",
        enable: "マルチユーザーモードを有効にする",
        description:
          "デフォルトでは、あなたが唯一の管理者になります。管理者として、すべての新しいユーザーまたは管理者のアカウントを作成する必要があります。管理者ユーザーのみがパスワードをリセットできるため、パスワードを紛失しないでください。",
        username: "管理者アカウントのユーザー名",
        password: "管理者アカウントのパスワード",
      },
    },
    password: {
      title: "パスワード保護",
      description:
        "AnythingLLMインスタンスをパスワードで保護します。これを忘れた場合、回復方法はないため、このパスワードを必ず保存してください。",
      "password-label": "インスタンスパスワード",
    },
  },
  event: {
    title: "イベントログ",
    description:
      "監視のために、このインスタンスで発生しているすべてのアクションとイベントを表示します。",
    clear: "イベントログをクリア",
    table: {
      type: "イベントタイプ",
      user: "ユーザー",
      occurred: "発生日時",
    },
  },
  privacy: {
    title: "プライバシーとデータ処理",
    description:
      "これは、接続されているサードパーティプロバイダーとAnythingLLMがデータをどのように処理するかの設定です。",
    llm: "LLM選択",
    embedding: "埋め込み設定",
    vector: "ベクターデータベース",
    anonymous: "匿名テレメトリが有効",
  },
  connectors: {
    "search-placeholder": "データコネクタを検索",
    "no-connectors": "データコネクタが見つかりません。",
    obsidian: {
      name: "オキシジン",
      description: "ワンクリックでObsidianの vault をインポートする。",
      vault_location: "保管場所",
      vault_description:
        "Obsidianの vault フォルダを選択して、すべてのメモとそれらの関連をインポートします。",
      selected_files: "マークダウン形式のファイルが見つかりました：{{count}}個",
      importing: "保管庫のインポート...",
      import_vault: "Import Vault",
      processing_time:
        "これは、保管場所のサイズによって時間がかかる可能性があります。",
      vault_warning:
        "いかなる紛争を避けるため、Obsidianの保管場所が現在開いている状態でないことを確認してください。",
    },
    github: {
      name: "GitHubリポジトリ",
      description:
        "ワンクリックで公開・非公開のGitHubリポジトリ全体をインポートできます。",
      URL: "GitHubリポジトリURL",
      URL_explained: "収集したいGitHubリポジトリのURLです。",
      token: "GitHubアクセストークン",
      optional: "任意",
      token_explained: "レート制限を回避するためのアクセストークンです。",
      token_explained_start: "アクセストークンがない場合、",
      token_explained_link1: "パーソナルアクセストークン",
      token_explained_middle:
        "がないと、GitHub APIのレート制限により収集できるファイル数が制限される場合があります。 ",
      token_explained_link2: "一時的なアクセストークンを作成",
      token_explained_end: "してこの問題を回避できます。",
      ignores: "無視するファイル",
      git_ignore:
        ".gitignore形式で収集時に無視したいファイルをリストしてください。エンターキーで各エントリを保存します。",
      task_explained:
        "完了後、すべてのファイルがドキュメントピッカーからワークスペースに埋め込めるようになります。",
      branch: "収集したいブランチ",
      branch_loading: "-- 利用可能なブランチを読み込み中 --",
      branch_explained: "収集したいブランチを指定します。",
      token_information:
        "<b>GitHubアクセストークン</b>を入力しない場合、GitHubの公開APIのレート制限により<b>トップレベル</b>のファイルのみ収集可能です。",
      token_personal:
        "無料のパーソナルアクセストークンはこちらから取得できます。",
    },
    gitlab: {
      name: "GitLabリポジトリ",
      description:
        "ワンクリックで公開・非公開のGitLabリポジトリ全体をインポートできます。",
      URL: "GitLabリポジトリURL",
      URL_explained: "収集したいGitLabリポジトリのURLです。",
      token: "GitLabアクセストークン",
      optional: "任意",
      token_explained: "レート制限を回避するためのアクセストークンです。",
      token_description: "GitLab APIから取得する追加エンティティを選択します。",
      token_explained_start: "アクセストークンがない場合、",
      token_explained_link1: "パーソナルアクセストークン",
      token_explained_middle:
        "がないと、GitLab APIのレート制限により収集できるファイル数が制限される場合があります。 ",
      token_explained_link2: "一時的なアクセストークンを作成",
      token_explained_end: "してこの問題を回避できます。",
      fetch_issues: "Issueをドキュメントとして取得",
      ignores: "無視するファイル",
      git_ignore:
        ".gitignore形式で収集時に無視したいファイルをリストしてください。エンターキーで各エントリを保存します。",
      task_explained:
        "完了後、すべてのファイルがドキュメントピッカーからワークスペースに埋め込めるようになります。",
      branch: "収集したいブランチ",
      branch_loading: "-- 利用可能なブランチを読み込み中 --",
      branch_explained: "収集したいブランチを指定します。",
      token_information:
        "<b>GitLabアクセストークン</b>を入力しない場合、GitLabの公開APIのレート制限により<b>トップレベル</b>のファイルのみ収集可能です。",
      token_personal:
        "無料のパーソナルアクセストークンはこちらから取得できます。",
    },
    youtube: {
      name: "YouTube文字起こし",
      description: "YouTube動画の文字起こしをリンクからインポートできます。",
      URL: "YouTube動画URL",
      URL_explained_start:
        "文字起こしを取得したいYouTube動画のURLを入力してください。動画には",
      URL_explained_link: "クローズドキャプション",
      URL_explained_end: "が必要です。",
      task_explained:
        "完了後、文字起こしがドキュメントピッカーからワークスペースに埋め込めるようになります。",
      language: "文字起こしの言語",
      language_explained: "取得したい文字起こしの言語を選択してください。",
      loading_languages: "-- 利用可能な言語を読み込み中 --",
    },
    "website-depth": {
      name: "ウェブサイト一括スクレイパー",
      description: "ウェブサイトとその下層リンクを指定した深さまで取得します。",
      URL: "ウェブサイトURL",
      URL_explained: "取得したいウェブサイトのURLです。",
      depth: "クロール深度",
      depth_explained: "元のURLからたどる子リンクの数です。",
      max_pages: "最大ページ数",
      max_pages_explained: "取得する最大リンク数です。",
      task_explained:
        "完了後、すべての取得内容がドキュメントピッカーからワークスペースに埋め込めるようになります。",
    },
    confluence: {
      name: "Confluence",
      description: "ワンクリックでConfluenceページ全体をインポートできます。",
      deployment_type: "Confluenceデプロイタイプ",
      deployment_type_explained:
        "ConfluenceインスタンスがAtlassianクラウドかセルフホストかを選択します。",
      base_url: "ConfluenceベースURL",
      base_url_explained: "ConfluenceスペースのベースURLです。",
      space_key: "Confluenceスペースキー",
      space_key_explained:
        "使用するConfluenceインスタンスのスペースキーです。通常は~で始まります。",
      username: "Confluenceユーザー名",
      username_explained: "Confluenceのユーザー名です。",
      auth_type: "Confluence認証タイプ",
      auth_type_explained:
        "Confluenceページへアクセスするための認証タイプを選択してください。",
      auth_type_username: "ユーザー名とアクセストークン",
      auth_type_personal: "パーソナルアクセストークン",
      token: "Confluenceアクセストークン",
      token_explained_start:
        "認証用のアクセストークンを入力してください。アクセストークンは",
      token_explained_link: "こちら",
      token_desc: "認証用アクセストークン",
      pat_token: "Confluenceパーソナルアクセストークン",
      pat_token_explained: "Confluenceのパーソナルアクセストークンです。",
      bypass_ssl: "SSL証明書の検証をスキップする",
      bypass_ssl_explained:
        "これにより、独自の証明書で署名された、自社ホストのConfluenceインスタンスに対して、SSL証明書の検証を回避できます。",
      task_explained:
        "完了後、ページ内容がドキュメントピッカーからワークスペースに埋め込めるようになります。",
    },
    manage: {
      documents: "ドキュメント",
      "data-connectors": "データコネクタ",
      "desktop-only":
        "これらの設定の編集はデスクトップ端末のみ対応しています。デスクトップでこのページにアクセスしてください。",
      dismiss: "閉じる",
      editing: "編集中",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "マイドキュメント",
      "new-folder": "新しいフォルダー",
      "search-document": "ドキュメントを検索",
      "no-documents": "ドキュメントがありません",
      "move-workspace": "ワークスペースへ移動",
      name: "名前",
      "delete-confirmation":
        "これらのファイルやフォルダーを削除してもよろしいですか？\nシステムから削除され、既存のワークスペースからも自動的に削除されます。\nこの操作は元に戻せません。",
      "removing-message":
        "{{count}}件のドキュメントと{{folderCount}}件のフォルダーを削除中です。しばらくお待ちください。",
      "move-success": "{{count}}件のドキュメントを移動しました。",
      date: "日付",
      type: "種類",
      no_docs: "ドキュメントがありません",
      select_all: "すべて選択",
      deselect_all: "すべて選択解除",
      remove_selected: "選択したものを削除",
      costs: "※埋め込みには一度だけ費用がかかります",
      save_embed: "保存して埋め込む",
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
      "processor-offline": "ドキュメント処理機能が利用できません",
      "processor-offline-desc":
        "ドキュメント処理機能がオフラインのため、ファイルをアップロードできません。後でもう一度お試しください。",
      "click-upload":
        "クリックしてアップロード、またはドラッグ＆ドロップしてください",
      "file-types":
        "テキストファイル、CSV、スプレッドシート、音声ファイルなどに対応しています！",
      "or-submit-link": "またはリンクを入力",
      "placeholder-link": "https://example.com",
      fetching: "取得中...",
      "fetch-website": "ウェブサイトを取得",
      "privacy-notice":
        "これらのファイルは、このAnythingLLMインスタンス上のドキュメント処理機能にアップロードされます。第三者に送信・共有されることはありません。",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "ドキュメントのピン留めとは？",
      pin_explained_block1:
        "AnythingLLMでドキュメントを<b>ピン留め</b>すると、その内容全体がプロンプトウィンドウに挿入され、LLMがしっかり理解できるようになります。",
      pin_explained_block2:
        "<b>大きなコンテキストを持つモデル</b>や、重要な小さなファイルで特に効果的です。",
      pin_explained_block3:
        "デフォルトのままでは満足できる回答が得られない場合、ピン留めを活用するとより高品質な回答が得られます。",
      accept: "わかりました",
    },
    watching: {
      what_watching: "ドキュメントのウォッチとは？",
      watch_explained_block1:
        "AnythingLLMでドキュメントを<b>ウォッチ</b>すると、元のソースから定期的に内容が<i>自動的に</i>同期されます。管理しているすべてのワークスペースで内容が自動更新されます。",
      watch_explained_block2:
        "この機能は現在オンラインベースのコンテンツのみ対応しており、手動アップロードしたドキュメントには利用できません。",
      watch_explained_block3_start: "ウォッチしているドキュメントの管理は",
      watch_explained_block3_link: "ファイルマネージャー",
      watch_explained_block3_end: "管理画面から行えます。",
      accept: "わかりました",
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
    welcome: "新しいワークスペースへようこそ。",
    get_started: "まずはじめに、",
    get_started_default: "はじめに",
    upload: "ドキュメントをアップロード",
    or: "または",
    attachments_processing:
      "添付ファイルの処理中です。しばらくお待ちください。",
    send_chat: "チャットを送信",
    send_message: "メッセージを送信",
    attach_file: "このチャットにファイルを添付",
    slash: "チャットで使えるスラッシュコマンドをすべて表示",
    agents: "利用可能なエージェントをすべて表示",
    start_agent_session: "Start agent session",
    text_size: "テキストサイズを変更",
    microphone: "プロンプトを音声入力",
    send: "ワークスペースにプロンプトメッセージを送信",
    tts_speak_message: "TTS Speak メッセージ",
    copy: "以下に翻訳を示します。",
    regenerate: "再生",
    regenerate_response: "申し訳ありませんが、その質問にはお答えできません。",
    good_response: "良い反応",
    more_actions:
      "さらに詳細な情報が必要な場合は、お気軽にお問い合わせください。",
    hide_citations: "参考文献を隠す",
    show_citations: "引用元を表示する",
    sources: "出典",
    source_count_one: "{{count}} 参照",
    source_count_other: "{{count}} への参照",
    document: "文書",
    similarity_match: "試合",
    pause_tts_speech_message: "メッセージのテキスト読み上げを一時停止する。",
    fork: "フォーク",
    delete: "削除",
    save_submit: "保存して送信",
    cancel: "キャンセル",
    submit: "送信",
    edit_prompt: "編集のヒント",
    edit_response: "編集内容を保存します。",
    edit_info_user:
      "「送信」はAIの応答を再生成します。「保存」は、あなたのメッセージのみを更新します。",
    edit_info_assistant: "あなたの変更は、この回答に直接保存されます。",
    see_less: "詳細を見る",
    see_more: "詳細を見る",
    at_agent: "@agent",
    default_agent_description: "- このワークスペースのデフォルトエージェント。",
    custom_agents_coming_soon: "カスタムエージェントは近日公開予定です。",
    preset_reset_description:
      "チャット履歴をクリアし、新しいチャットを開始してください。",
    preset_exit_description: "現在のエージェントセッションを停止する",
    add_new_preset: "新しいプリセットを追加する",
    add_new: "新しいものを追加する",
    edit: "編集",
    publish: "出版",
    stop_generating: "応答の生成を停止する",
    command: "命令",
    your_command: "あなたの指示",
    placeholder_prompt: "これは、プロンプトの先頭に挿入されるコンテンツです。",
    description: "説明",
    placeholder_description: "大規模言語モデルに関する詩を提示します。",
    save: "保存",
    small: "小さい",
    normal: "通常",
    large: "大規模",
    tools: "道具",
    slash_commands: "スラッシュコマンド",
    agent_skills: "エージェントのスキル",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "閲覧",
    text_size_label: "文字サイズ",
    select_model: "モデルを選択",
    workspace_llm_manager: {
      search: "LLMプロバイダーを検索する",
      loading_workspace_settings: "作業スペースの設定を読み込んでいます...",
      available_models: "{{provider}} の利用可能なモデル",
      available_models_description:
        "このワークスペースで使用するモデルを選択してください。",
      save: "このモデルを使用してください。",
      saving: "デフォルトワークスペースとしてモデルを設定...",
      missing_credentials: "このプロバイダーには資格がありません。",
      missing_credentials_description:
        "認証情報を設定するには、ここをクリックしてください。",
    },
  },
  profile_settings: {
    edit_account: "アカウントを編集",
    profile_picture: "プロフィール画像",
    remove_profile_picture: "プロフィール画像を削除",
    username: "ユーザー名",
    new_password: "新しいパスワード",
    password_description: "パスワードは8文字以上である必要があります",
    cancel: "キャンセル",
    update_account: "アカウントを更新",
    theme: "テーマ設定",
    language: "優先言語",
    failed_upload: "プロフィール写真のアップロードに失敗しました：{{error}}",
    upload_success: "プロフィール写真がアップロードされました。",
    failed_remove: "プロフィール写真の削除に失敗しました：{{error}}",
    profile_updated: "プロフィールを更新しました。",
    failed_update_user: "ユーザーの更新に失敗：{{error}}",
    account: "アカウント",
    support: "サポート",
    signout: "ログアウト",
  },
  "keyboard-shortcuts": {
    title: "キーボードショートカット",
    shortcuts: {
      settings: "設定を開く",
      workspaceSettings: "現在のワークスペースの設定を開く",
      home: "ホームページへ",
      workspaces: "ワークスペースの管理",
      apiKeys: "APIキーの設定",
      llmPreferences: "LLM の好み",
      chatSettings: "チャット設定",
      help: "キーボードショートカットのヘルプを表示する",
      showLLMSelector: "LLM（大規模言語モデル）選択ツール",
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
        success_title: "成功！",
        success_description:
          "システムプロンプトがコミュニティハブに公開されました。",
        success_thank_you: "コミュニティへの共有ありがとうございます。",
        view_on_hub: "コミュニティハブでの表示",
        modal_title: "出版システムに関するプロンプト",
        name_label: "名前",
        name_description: "これは、システムのプロンプトの名前です。",
        name_placeholder: "私のシステムプロンプト",
        description_label: "説明",
        description_description:
          "これは、システムプロンプトの説明です。システムプロンプトの目的を説明するために使用してください。",
        tags_label: "タグ",
        tags_description:
          "タグは、システムプロンプトを簡単に検索できるようにラベル付けするために使用されます。複数のタグを追加できます。最大5つのタグ。各タグは最大20文字です。",
        tags_placeholder:
          "タグを追加するには、タイプしてEnterキーを押してください。",
        visibility_label: "視界",
        public_description:
          "一般のシステムからのメッセージは、すべての人に表示されます。",
        private_description:
          "プライベートなシステムからのメッセージは、あなただけが見ることができます。",
        publish_button: "コミュニティハブに公開する",
        submitting: "出版...",
        submit: "コミュニティハブに公開する",
        prompt_label: "プロンプト",
        prompt_description:
          "これは、大規模言語モデル（LLM）を誘導するために使用される実際のシステムプロンプトです。",
        prompt_placeholder: "ここにシステムプロンプトを入力してください...",
      },
      agent_flow: {
        public_description:
          "一般の利用者は、これらの流れをすべて把握することができます。",
        private_description:
          "あなただけが確認できるプライベートな取引フローのみが表示されます。",
        success_title: "成功！",
        success_description:
          "あなたのエージェントフローがコミュニティハブに公開されました。",
        success_thank_you: "コミュニティへの共有ありがとうございます。",
        view_on_hub: "コミュニティハブで確認",
        modal_title: "出版代理店フロー",
        name_label:
          "山田太郎\n\n\n氏名\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n\n名前\n山田 太郎\n<|im",
        name_description: "これは、あなたのエージェントフローの名前です。",
        name_placeholder: "私のエージェントフロー",
        description_label: "説明",
        description_description:
          "これは、あなたのエージェントフローの説明です。この説明文を使って、あなたのエージェントフローの目的を記述してください。",
        tags_label: "タグ",
        tags_description:
          "タグは、ワークフローをより簡単に検索するために使用されます。複数のタグを追加できます。最大5つのタグ。各タグは最大20文字です。",
        tags_placeholder:
          "タグを追加するには、タイプしてEnterキーを押してください。",
        visibility_label: "視界",
        publish_button: "コミュニティハブに公開する",
        submitting: "出版...",
        submit: "コミュニティハブに公開する",
        privacy_note:
          "機密性の高いデータ保護のため、ワークフローは常にプライベートでアップロードされます。公開後、コミュニティハブで可視性を変更できます。公開前に、ワークフローに機密情報や個人情報が含まれていないことを確認してください。",
      },
      slash_command: {
        success_title: "成功！",
        success_description:
          "スラッシュコマンドがコミュニティハブに公開されました。",
        success_thank_you: "コミュニティへの共有ありがとうございます。",
        view_on_hub: "コミュニティハブでの表示",
        modal_title: "スラッシュコマンドを公開する",
        name_label: "名前",
        name_description: "これは、スラッシュコマンドの名前です。",
        name_placeholder: "私のスラッシュコマンド",
        description_label: "説明",
        description_description:
          "これは、スラッシュコマンドの説明です。スラッシュコマンドの目的を記述するために使用してください。",
        command_label: "命令",
        command_description:
          "これは、ユーザーがこのプリセットを起動するために入力するスラッシュコマンドです。",
        command_placeholder: "my-command",
        tags_label: "タグ",
        tags_description:
          "スラッシュコマンドをより簡単に検索できるように、タグを使用してコマンドを分類します。複数のタグを追加できます。最大5つのタグ。各タグは最大20文字です。",
        tags_placeholder:
          "タグを追加するには、タイプしてEnterキーを押してください。",
        visibility_label: "視界",
        public_description:
          "一般のユーザーが利用できるコマンドは、すべての人に公開されています。",
        private_description:
          "私だけが利用できるプライベートなスラッシュコマンドのみが表示されます。",
        publish_button: "コミュニティハブに公開する",
        submitting: "出版...",
        prompt_label:
          "どのような状況で、どのような目的で、どのような方法で、どのような結果を期待していますか？",
        prompt_description:
          "これは、スラッシュコマンドが実行されたときに使用されるプロンプトです。",
        prompt_placeholder: "ここに指示を入力してください...",
      },
      generic: {
        unauthenticated: {
          title: "本人確認が必要です。",
          description:
            "アイテムを公開する前に、AnythingLLMコミュニティハブで認証する必要があります。",
          button: "コミュニティハブへの接続",
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
