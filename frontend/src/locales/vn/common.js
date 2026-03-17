const TRANSLATIONS = {
  onboarding: {
    home: {
      title: "Chào mừng đến",
      getStarted: "Bắt đầu",
    },
    llm: {
      title: "Tùy chọn LLM",
      description:
        "AnythingLLM có thể hoạt động với nhiều nhà cung cấp LLM. Đây sẽ là dịch vụ xử lý trò chuyện.",
      search_placeholder: "Search LLM providers",
    },
    userSetup: {
      title: "Thiết lập Người dùng",
      description: "Cấu hình cài đặt người dùng của bạn.",
      howManyUsers: "Có bao nhiêu người sẽ sử dụng phiên bản này?",
      justMe: "Chỉ mình tôi",
      myTeam: "Nhóm của tôi",
      instancePassword: "Mật khẩu Phiên bản",
      setPassword: "Bạn có muốn thiết lập mật khẩu không?",
      passwordReq: "Mật khẩu phải có ít nhất 8 ký tự.",
      passwordWarn:
        "Điều quan trọng là phải lưu mật khẩu này vì không có phương pháp khôi phục.",
      adminUsername: "Tên người dùng tài khoản Quản trị viên",
      adminPassword: "Mật khẩu tài khoản Quản trị viên",
      adminPasswordReq: "Mật khẩu phải có ít nhất 8 ký tự.",
      teamHint:
        "Theo mặc định, bạn sẽ là quản trị viên duy nhất. Sau khi hoàn tất thiết lập, bạn có thể tạo và mời người khác làm người dùng hoặc quản trị viên. Không được mất mật khẩu vì chỉ quản trị viên mới có thể đặt lại mật khẩu.",
      admin_username_placeholder: "Your admin username",
      admin_password_placeholder: "Your admin password",
      password_symbols_error:
        "Your password has restricted characters in it. Allowed symbols are _,-,!,@,$,%,^,&,*,(,),;",
      password_set_failed: "Failed to set password: {{error}}",
      setup_failed: "Error: {{error}}",
    },
    data: {
      title: "Xử lý Dữ liệu & Quyền riêng tư",
      description:
        "Chúng tôi cam kết minh bạch và kiểm soát khi liên quan đến dữ liệu cá nhân của bạn.",
      settingsHint:
        "Các cài đặt này có thể được cấu hình lại bất cứ lúc nào trong cài đặt.",
    },
    survey: {
      title: "Chào mừng đến với AnythingLLM",
      description:
        "Giúp chúng tôi xây dựng AnythingLLM phù hợp với nhu cầu của bạn. Tùy chọn.",
      email: "Email của bạn là gì?",
      useCase: "Bạn sẽ sử dụng AnythingLLM để làm gì?",
      useCaseWork: "Cho công việc",
      useCasePersonal: "Cho mục đích cá nhân",
      useCaseOther: "Khác",
      comment: "Bạn biết đến AnythingLLM như thế nào?",
      commentPlaceholder:
        "Reddit, Twitter, GitHub, YouTube, v.v. - Hãy cho chúng tôi biết bạn tìm thấy chúng tôi như thế nào!",
      skip: "Bỏ qua Khảo sát",
      thankYou: "Cảm ơn phản hồi của bạn!",
    },
    workspace: {
      title: "Tạo không gian làm việc đầu tiên của bạn",
      description:
        "Tạo không gian làm việc đầu tiên của bạn và bắt đầu với AnythingLLM.",
    },
  },
  common: {
    "workspaces-name": "Tên không gian làm việc",
    error: "Lỗi",
    success: "Thành công",
    user: "Người dùng",
    selection: "Lựa chọn mô hình",
    saving: "Đang lưu...",
    save: "Lưu thay đổi",
    previous: "Trang trước",
    next: "Trang tiếp theo",
    optional: "Tùy chọn",
    yes: "Có",
    no: "Không",
    search: "Tìm kiếm",
    username_requirements:
      "Tên người dùng phải có 2-32 ký tự, bắt đầu bằng chữ cái thường và chỉ chứa chữ cái thường, số, dấu gạch dưới, dấu gạch ngang và dấu chấm.",
    cancel: "Cancel",
    close: "Close",
    copy: "Copy",
    copied: "Copied",
    edit: "Edit",
    delete: "Delete",
  },
  home: {
    welcome: "Chào mừng bạn",
    chooseWorkspace: "Chọn một khu vực làm việc để bắt đầu trò chuyện!",
    notAssigned:
      "Bạn hiện không được giao việc nào.\nLiên hệ với quản trị viên của bạn để yêu cầu truy cập vào khu vực làm việc.",
    goToWorkspace: 'Chuyển đến khu vực làm việc "{{workspace}}"',
  },
  settings: {
    title: "Cài đặt hệ thống",
    system: "Cài đặt chung",
    invites: "Lời mời",
    users: "Người dùng",
    workspaces: "Không gian làm việc",
    "workspace-chats": "Hội thoại không gian làm việc",
    customization: "Tùy chỉnh",
    interface: "Tùy chọn Giao diện",
    branding: "Thương hiệu & Nhãn trắng",
    chat: "Trò chuyện",
    "api-keys": "API nhà phát triển",
    llm: "LLM",
    transcription: "Chuyển đổi giọng nói",
    embedder: "Nhúng dữ liệu",
    "text-splitting": "Chia nhỏ & Tách văn bản",
    "voice-speech": "Giọng nói & Phát âm",
    "vector-database": "Cơ sở dữ liệu Vector",
    embeds: "Nhúng hội thoại",
    "embed-chats": "Lịch sử Nhúng hội thoại",
    security: "Bảo mật",
    "event-logs": "Nhật ký sự kiện",
    privacy: "Quyền riêng tư & Dữ liệu",
    "ai-providers": "Nhà cung cấp AI",
    "agent-skills": "Kỹ năng của Agent",
    "community-hub": {
      title: "Trung tâm cộng đồng",
      trending: "Khám phá các nội dung đang thịnh hành",
      "your-account": "Tài khoản của bạn",
      "import-item": "Nhập hàng",
    },
    admin: "Quản trị viên",
    tools: "Công cụ",
    "system-prompt-variables": "Biến System Prompt",
    "experimental-features": "Tính năng thử nghiệm",
    contact: "Liên hệ hỗ trợ",
    "browser-extension": "Tiện ích trình duyệt",
    "mobile-app": "AnythingLLM Di động",
  },
  login: {
    "multi-user": {
      welcome: "Chào mừng đến với",
      "placeholder-username": "Tên người dùng",
      "placeholder-password": "Mật khẩu",
      login: "Đăng nhập",
      validating: "Đang xác thực...",
      "forgot-pass": "Quên mật khẩu",
      reset: "Đặt lại",
    },
    "sign-in": "Đăng nhập vào {{appName}} tài khoản của bạn.",
    "password-reset": {
      title: "Đặt lại Mật khẩu",
      description: "Cung cấp thông tin cần thiết dưới đây để đặt lại mật khẩu.",
      "recovery-codes": "Mã khôi phục",
      "recovery-code": "Mã khôi phục {{index}}",
      "back-to-login": "Quay lại Đăng nhập",
    },
  },
  "main-page": {
    greeting: "Hôm nay tôi có thể giúp gì cho bạn?",
    noWorkspaceError:
      "Vui lòng tạo một không gian làm việc trước khi bắt đầu trò chuyện.",
    checklist: {
      title: "Bắt đầu",
      tasksLeft: "nhiệm vụ còn lại",
      completed: "Bạn đang trên đường trở thành chuyên gia AnythingLLM!",
      dismiss: "đóng",
      tasks: {
        create_workspace: {
          title: "Tạo một không gian làm việc",
          description: "Tạo không gian làm việc đầu tiên của bạn để bắt đầu",
          action: "Tạo",
        },
        send_chat: {
          title: "Gửi một tin nhắn trò chuyện",
          description: "Bắt đầu cuộc trò chuyện với trợ lý AI của bạn",
          action: "Trò chuyện",
        },
        embed_document: {
          title: "Nhúng một tài liệu",
          description: "Thêm tài liệu đầu tiên của bạn vào không gian làm việc",
          action: "Nhúng",
        },
        setup_system_prompt: {
          title: "Thiết lập system prompt",
          description: "Cấu hình hành vi của trợ lý AI của bạn",
          action: "Thiết lập",
        },
        define_slash_command: {
          title: "Định nghĩa một lệnh gạch chéo",
          description: "Tạo các lệnh tùy chỉnh cho trợ lý của bạn",
          action: "Định nghĩa",
        },
        visit_community: {
          title: "Truy cập Community Hub",
          description: "Khám phá tài nguyên và mẫu cộng đồng",
          action: "Duyệt",
        },
      },
    },
    quickActions: {
      createAgent: "Tạo một đại lý",
      editWorkspace: "Chỉnh sửa không gian làm việc",
      uploadDocument: "Tải lên một tài liệu",
    },
    quickLinks: {
      title: "Liên kết Nhanh",
      sendChat: "Gửi Trò chuyện",
      embedDocument: "Nhúng Tài liệu",
      createWorkspace: "Tạo Không gian làm việc",
    },
    exploreMore: {
      title: "Khám phá thêm tính năng",
      features: {
        customAgents: {
          title: "Agent AI Tùy chỉnh",
          description:
            "Xây dựng các Agent AI và tự động hóa mạnh mẽ mà không cần viết mã.",
          primaryAction: "Trò chuyện bằng @agent",
          secondaryAction: "Xây dựng một luồng agent",
        },
        slashCommands: {
          title: "Lệnh Gạch chéo",
          description:
            "Tiết kiệm thời gian và đưa prompt bằng các lệnh gạch chéo tùy chỉnh.",
          primaryAction: "Tạo một Lệnh Gạch chéo",
          secondaryAction: "Khám phá trên Hub",
        },
        systemPrompts: {
          title: "System Prompt",
          description:
            "Sửa đổi system prompt để tùy chỉnh các phản hồi AI của một không gian làm việc.",
          primaryAction: "Sửa đổi System Prompt",
          secondaryAction: "Quản lý biến prompt",
        },
      },
    },
    announcements: {
      title: "Cập nhật & Thông báo",
    },
    resources: {
      title: "Tài nguyên",
      links: {
        docs: "Tài liệu",
        star: "Đánh dấu sao trên Github",
      },
      keyboardShortcuts: "Phím tắt",
    },
  },
  "new-workspace": {
    title: "Không gian làm việc mới",
    placeholder: "Không gian làm việc của tôi",
  },
  "workspaces—settings": {
    general: "Cài đặt chung",
    chat: "Cài đặt Trò chuyện",
    vector: "Cơ sở dữ liệu Vector",
    members: "Thành viên",
    agent: "Cấu hình Agent",
  },
  general: {
    vector: {
      title: "Số lượng Vector",
      description: "Tổng số vector trong cơ sở dữ liệu vector của bạn.",
    },
    names: {
      description:
        "Điều này chỉ thay đổi tên hiển thị của không gian làm việc.",
    },
    message: {
      title: "Tin nhắn trò chuyện được gợi ý",
      description:
        "Tùy chỉnh các tin nhắn sẽ được gợi ý cho người dùng không gian làm việc của bạn.",
      add: "Thêm tin nhắn mới",
      save: "Lưu Tin nhắn",
      heading: "Giải thích cho tôi",
      body: "các lợi ích của AnythingLLM",
    },
    pfp: {
      title: "Hình đại diện trợ lý",
      description:
        "Tùy chỉnh hình ảnh hồ sơ của trợ lý cho không gian làm việc này.",
      image: "Hình ảnh Không gian làm việc",
      remove: "Xóa Hình ảnh Không gian làm việc",
    },
    delete: {
      title: "Xóa không gian làm việc",
      description:
        "Xóa không gian làm việc này và tất cả dữ liệu của nó. Điều này sẽ xóa không gian làm việc cho tất cả người dùng.",
      delete: "Xóa không gian làm việc",
      deleting: "Đang xóa Không gian làm việc...",
      "confirm-start": "Bạn sắp xóa toàn bộ",
      "confirm-end":
        "không gian làm việc. Điều này sẽ xóa tất cả vector embedding trong cơ sở dữ liệu vector của bạn.\n\nCác tệp nguồn gốc sẽ không bị ảnh hưởng. Hành động này không thể hoàn tác.",
    },
  },
  chat: {
    llm: {
      title: "Nhà cung cấp LLM Không gian làm việc",
      description:
        "Nhà cung cấp LLM và mô hình cụ thể sẽ được sử dụng cho không gian làm việc này. Theo mặc định, nó sử dụng nhà cung cấp LLM hệ thống và cài đặt.",
      search: "Tìm kiếm tất cả nhà cung cấp LLM",
    },
    model: {
      title: "Mô hình Trò chuyện Không gian làm việc",
      description:
        "Mô hình trò chuyện cụ thể sẽ được sử dụng cho không gian làm việc này. Nếu để trống, sẽ sử dụng tùy chọn LLM hệ thống.",
      wait: "-- đang chờ mô hình --",
    },
    mode: {
      title: "Chế độ trò chuyện",
      automatic: {
        title: "Auto",
        description:
          "will automatically use tools if the model and provider support native tool calling. If native tooling is not supported, you will need to use the @agent command to use tools.",
      },
      chat: {
        title: "Trò chuyện",
        "desc-start": "sẽ cung cấp câu trả lời với kiến thức chung của LLM",
        and: "và",
        "desc-end": "ngữ cảnh tài liệu được tìm thấy.",
      },
      query: {
        title: "Truy vấn",
        "desc-start": "sẽ cung cấp câu trả lời",
        only: "chỉ",
        "desc-end": "khi tìm thấy ngữ cảnh tài liệu.",
      },
    },
    history: {
      title: "Lịch sử Trò chuyện",
      "desc-start":
        "Số lượng cuộc trò chuyện trước đó sẽ được bao gồm trong bộ nhớ ngắn hạn của phản hồi.",
      recommend: "Khuyến nghị 20. ",
      "desc-end":
        "Bất kỳ số nào lớn hơn 45 có thể dẫn đến lỗi trò chuyện liên tục tùy thuộc vào kích thước tin nhắn.",
    },
    prompt: {
      title: "Prompt",
      description:
        "Nhập vào đây prompt cho không gian làm việc này. Định nghĩa ngữ cảnh và hướng dẫn cho AI để tạo ra một phản hồi liên quan và chính xác.",
      history: {
        title: "Lịch sử System Prompt",
        clearAll: "Xóa Tất cả",
        noHistory: "Không có lịch sử system prompt",
        restore: "Khôi phục",
        delete: "Xóa",
        publish: "Đăng lên Community Hub",
        deleteConfirm: "Bạn có chắc chắn muốn xóa mục lịch sử này?",
        clearAllConfirm:
          "Bạn có chắc chắn muốn xóa tất cả lịch sử? Hành động này không thể hoàn tác.",
        expand: "Mở rộng",
      },
    },
    refusal: {
      title: "Phản hồi từ chối chế độ truy vấn",
      "desc-start": "Khi ở chế độ",
      query: "truy vấn",
      "desc-end":
        ", bạn có thể muốn trả về phản hồi từ chối tùy chỉnh khi không tìm thấy ngữ cảnh.",
      "tooltip-title": "Tại sao tôi thấy điều này?",
      "tooltip-description":
        "Bạn đang ở chế độ truy vấn, chỉ sử dụng thông tin từ tài liệu của bạn. Chuyển sang chế độ trò chuyện để có cuộc trò chuyện linh hoạt hơn, hoặc nhấp vào đây để truy cập tài liệu của chúng tôi để tìm hiểu thêm về các chế độ trò chuyện.",
    },
    temperature: {
      title: "Nhiệt độ LLM",
      "desc-start": 'Cài đặt này kiểm soát mức độ "sáng tạo" của phản hồi LLM.',
      "desc-end":
        "Số càng cao thì càng sáng tạo. Đối với một số mô hình, điều này có thể dẫn đến phản hồi không mạch lạc khi đặt quá cao.",
      hint: "Hầu hết các LLM có các phạm vi giá trị hợp lệ khác nhau. Tham khảo nhà cung cấp LLM của bạn để biết thông tin đó.",
    },
  },
  "vector-workspace": {
    identifier: "Định danh cơ sở dữ liệu vector",
    snippets: {
      title: "Đoạn Ngữ cảnh Tối đa",
      description:
        "Cài đặt này kiểm soát số lượng đoạn ngữ cảnh tối đa sẽ được gửi đến LLM cho mỗi cuộc trò chuyện hoặc truy vấn.",
      recommend: "Khuyến nghị: 4",
    },
    doc: {
      title: "Ngưỡng tương đồng tài liệu",
      description:
        "Điểm tương đồng tối thiểu cần thiết để một nguồn được coi là liên quan đến cuộc trò chuyện. Số càng cao, nguồn phải càng tương tự với cuộc trò chuyện.",
      zero: "Không hạn chế",
      low: "Thấp (điểm tương đồng ≥ .25)",
      medium: "Trung bình (điểm tương đồng ≥ .50)",
      high: "Cao (điểm tương đồng ≥ .75)",
    },
    reset: {
      reset: "Đặt lại Cơ sở dữ liệu Vector",
      resetting: "Đang xóa vectors...",
      confirm:
        "Bạn sắp đặt lại cơ sở dữ liệu vector của không gian làm việc này. Điều này sẽ xóa tất cả vector embedding hiện đang được nhúng.\n\nCác tệp nguồn gốc sẽ không bị ảnh hưởng. Hành động này không thể hoàn tác.",
      error: "Không thể đặt lại cơ sở dữ liệu vector của không gian làm việc!",
      success: "Cơ sở dữ liệu vector của không gian làm việc đã được đặt lại!",
    },
  },
  agent: {
    "performance-warning":
      "Hiệu suất của các LLM không hỗ trợ rõ ràng việc gọi công cụ phụ thuộc rất nhiều vào khả năng và độ chính xác của mô hình. Một số khả năng có thể bị hạn chế hoặc không hoạt động.",
    provider: {
      title: "Nhà cung cấp LLM cho Agent Không gian làm việc",
      description:
        "Nhà cung cấp LLM & mô hình cụ thể sẽ được sử dụng cho @agent agent của không gian làm việc này.",
    },
    mode: {
      chat: {
        title: "Mô hình Trò chuyện cho Agent Không gian làm việc",
        description:
          "Mô hình trò chuyện cụ thể sẽ được sử dụng cho @agent agent của không gian làm việc này.",
      },
      title: "Mô hình Agent Không gian làm việc",
      description:
        "Mô hình LLM cụ thể sẽ được sử dụng cho @agent agent của không gian làm việc này.",
      wait: "-- đang chờ mô hình --",
    },
    skill: {
      title: "Kỹ năng agent mặc định",
      description:
        "Cải thiện khả năng tự nhiên của agent mặc định với những kỹ năng được xây dựng sẵn này. Thiết lập này áp dụng cho tất cả không gian làm việc.",
      rag: {
        title: "RAG & bộ nhớ dài hạn",
        description:
          'Cho phép agent sử dụng tài liệu cục bộ của bạn để trả lời truy vấn hoặc yêu cầu agent "ghi nhớ" các phần nội dung để truy xuất bộ nhớ dài hạn.',
      },
      view: {
        title: "Xem & tóm tắt tài liệu",
        description:
          "Cho phép agent liệt kê và tóm tắt nội dung của các tệp không gian làm việc hiện đang được nhúng.",
      },
      scrape: {
        title: "Thu thập dữ liệu website",
        description:
          "Cho phép agent truy cập và thu thập nội dung của các website.",
      },
      generate: {
        title: "Tạo biểu đồ",
        description:
          "Cho phép agent mặc định tạo các loại biểu đồ khác nhau từ dữ liệu được cung cấp hoặc đưa ra trong trò chuyện.",
      },
      save: {
        title: "Tạo & lưu tệp",
        description:
          "Cho phép agent mặc định tạo và ghi vào các tệp có thể lưu vào máy tính của bạn.",
      },
      web: {
        title: "Tìm kiếm web trực tiếp và duyệt web",
        description:
          "Cho phép đại lý của bạn tìm kiếm trên web để trả lời các câu hỏi của bạn bằng cách kết nối với nhà cung cấp dịch vụ tìm kiếm trên web (SERP).",
      },
      sql: {
        title: "Kết nối SQL",
        description:
          "Cho phép đại lý của bạn sử dụng SQL để trả lời các câu hỏi của bạn bằng cách kết nối với nhiều nhà cung cấp cơ sở dữ liệu SQL khác nhau.",
      },
      default_skill:
        "Theo mặc định, kỹ năng này được kích hoạt, nhưng bạn có thể tắt nó nếu không muốn nó được sử dụng bởi người đại diện.",
    },
  },
  recorded: {
    title: "Hội thoại không gian làm việc",
    description:
      "Đây là tất cả các cuộc trò chuyện và tin nhắn đã được ghi lại được gửi bởi người dùng, sắp xếp theo ngày tạo.",
    export: "Xuất",
    table: {
      id: "Id",
      by: "Gửi bởi",
      workspace: "Không gian làm việc",
      prompt: "Prompt",
      response: "Phản hồi",
      at: "Gửi lúc",
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
      title: "Tùy chọn Giao diện",
      description: "Đặt tùy chọn giao diện của bạn cho AnythingLLM.",
    },
    branding: {
      title: "Thương hiệu & Nhãn trắng",
      description:
        "Nhãn trắng phiên bản AnythingLLM của bạn với thương hiệu tùy chỉnh.",
    },
    chat: {
      title: "Trò chuyện",
      description: "Đặt tùy chọn trò chuyện của bạn cho AnythingLLM.",
      auto_submit: {
        title: "Tự động Gửi Đầu vào Giọng nói",
        description:
          "Tự động gửi đầu vào giọng nói sau một khoảng thời gian im lặng",
      },
      auto_speak: {
        title: "Tự động Đọc Phản hồi",
        description: "Tự động đọc phản hồi từ AI",
      },
      spellcheck: {
        title: "Bật Kiểm tra Chính tả",
        description:
          "Bật hoặc tắt kiểm tra chính tả trong trường nhập trò chuyện",
      },
    },
    items: {
      theme: {
        title: "Giao diện",
        description: "Chọn giao diện màu ưa thích của bạn cho ứng dụng.",
      },
      "show-scrollbar": {
        title: "Hiện Thanh cuộn",
        description: "Bật hoặc tắt thanh cuộn trong cửa sổ trò chuyện.",
      },
      "support-email": {
        title: "Email Hỗ trợ",
        description:
          "Đặt địa chỉ email hỗ trợ mà người dùng có thể truy cập khi họ cần trợ giúp.",
      },
      "app-name": {
        title: "Tên",
        description:
          "Đặt tên được hiển thị trên trang đăng nhập cho tất cả người dùng.",
      },
      "chat-message-alignment": {
        title: "Căn chỉnh Tin nhắn Trò chuyện",
        description:
          "Chọn chế độ căn chỉnh tin nhắn khi sử dụng giao diện trò chuyện.",
      },
      "display-language": {
        title: "Ngôn ngữ Hiển thị",
        description:
          "Chọn ngôn ngữ ưa thích để hiển thị giao diện người dùng của AnythingLLM - khi bản dịch có sẵn.",
      },
      logo: {
        title: "Logo Thương hiệu",
        description:
          "Tải lên logo tùy chỉnh của bạn để hiển thị trên tất cả các trang.",
        add: "Thêm logo tùy chỉnh",
        recommended: "Kích thước khuyến nghị: 800 x 200",
        remove: "Xóa",
        replace: "Thay thế",
      },
      "welcome-messages": {
        title: "Tin nhắn Chào mừng",
        description:
          "Tùy chỉnh các tin nhắn chào mừng hiển thị cho người dùng của bạn. Chỉ người dùng không phải quản trị viên mới thấy các tin nhắn này.",
        new: "Mới",
        system: "hệ thống",
        user: "người dùng",
        message: "tin nhắn",
        assistant: "Trợ lý Trò chuyện AnythingLLM",
        "double-click": "Nhấp đúp để chỉnh sửa...",
        save: "Lưu Tin nhắn",
      },
      "browser-appearance": {
        title: "Giao diện Trình duyệt",
        description:
          "Tùy chỉnh giao diện của tab trình duyệt và tiêu đề khi ứng dụng đang mở.",
        tab: {
          title: "Tiêu đề",
          description:
            "Đặt tiêu đề tab tùy chỉnh khi ứng dụng đang mở trong trình duyệt.",
        },
        favicon: {
          title: "Favicon",
          description: "Sử dụng favicon tùy chỉnh cho tab trình duyệt.",
        },
      },
      "sidebar-footer": {
        title: "Mục Chân trang Thanh bên",
        description: "Tùy chỉnh các mục chân trang hiển thị ở cuối thanh bên.",
        icon: "Biểu tượng",
        link: "Liên kết",
      },
      "render-html": {
        title: "Hiển thị HTML trong trò chuyện",
        description:
          "Hiển thị phản hồi HTML trong các phản hồi của trợ lý.\nĐiều này có thể mang lại chất lượng phản hồi cao hơn nhiều, nhưng cũng có thể dẫn đến các rủi ro bảo mật tiềm ẩn.",
      },
    },
  },
  api: {
    title: "Khóa API",
    description:
      "Khóa API cho phép người sở hữu truy cập và quản lý phiên bản AnythingLLM này theo chương trình.",
    link: "Đọc tài liệu API",
    generate: "Tạo Khóa API Mới",
    table: {
      key: "Khóa API",
      by: "Tạo bởi",
      created: "Ngày tạo",
    },
  },
  llm: {
    title: "Tùy chọn LLM",
    description:
      "Đây là thông tin đăng nhập và cài đặt cho nhà cung cấp LLM trò chuyện & nhúng ưa thích của bạn. Điều quan trọng là các khóa này phải chính xác, nếu không AnythingLLM sẽ không hoạt động đúng.",
    provider: "Nhà cung cấp LLM",
    providers: {
      azure_openai: {
        azure_service_endpoint: "Điểm cuối Dịch vụ Azure",
        api_key: "Khóa API",
        chat_deployment_name: "Tên Triển khai Trò chuyện",
        chat_model_token_limit: "Giới hạn Token Mô hình Trò chuyện",
        model_type: "Loại Mô hình",
        model_type_tooltip:
          'Nếu triển khai của bạn sử dụng mô hình lý luận (o1, o1-mini, o3-mini, v.v.), hãy đặt thành "Lý luận". Nếu không, yêu cầu trò chuyện của bạn có thể thất bại.',
        default: "Mặc định",
        reasoning: "Lý luận",
      },
    },
  },
  transcription: {
    title: "Tùy chọn Mô hình Chuyển đổi giọng nói",
    description:
      "Đây là thông tin đăng nhập và cài đặt cho nhà cung cấp mô hình chuyển đổi giọng nói ưa thích của bạn. Điều quan trọng là các khóa này phải chính xác, nếu không tệp media và âm thanh sẽ không được chuyển đổi.",
    provider: "Nhà cung cấp Chuyển đổi giọng nói",
    "warn-start":
      "Sử dụng mô hình whisper cục bộ trên máy có RAM hoặc CPU hạn chế có thể làm AnythingLLM bị treo khi xử lý tệp media.",
    "warn-recommend":
      "Chúng tôi khuyến nghị ít nhất 2GB RAM và tải lên tệp <10Mb.",
    "warn-end": "Mô hình tích hợp sẽ tự động tải xuống khi sử dụng lần đầu.",
  },
  embedding: {
    title: "Tùy chọn nhúng",
    "desc-start":
      "Khi sử dụng LLM không hỗ trợ bộ máy nhúng nguyên bản - bạn có thể cần chỉ định thêm thông tin đăng nhập để nhúng văn bản.",
    "desc-end":
      "Nhúng là quá trình chuyển đổi văn bản thành vector. Thông tin đăng nhập này cần thiết để chuyển đổi tệp và prompt của bạn thành định dạng mà AnythingLLM có thể sử dụng để xử lý.",
    provider: {
      title: "Nhà cung cấp Nhúng",
    },
  },
  text: {
    title: "Tùy chọn chia nhỏ và tách văn bản",
    "desc-start":
      "Đôi khi, bạn có thể muốn thay đổi cách mặc định mà các tài liệu mới được chia nhỏ và tách trước khi được chèn vào cơ sở dữ liệu vector của bạn.",
    "desc-end":
      "Bạn chỉ nên sửa đổi cài đặt này nếu bạn hiểu cách chia văn bản hoạt động và các tác động phụ của nó.",
    size: {
      title: "Kích thước Đoạn Văn bản",
      description:
        "Đây là độ dài tối đa của các ký tự có thể có trong một vector đơn.",
      recommend: "Độ dài tối đa của mô hình nhúng là",
    },
    overlap: {
      title: "Độ Chồng lấp Đoạn Văn bản",
      description:
        "Đây là độ chồng lấp tối đa của các ký tự xảy ra trong quá trình tách giữa hai đoạn văn bản liền kề.",
    },
  },
  vector: {
    title: "Cơ sở dữ liệu Vector",
    description:
      "Đây là thông tin đăng nhập và cài đặt cho cách phiên bản AnythingLLM của bạn sẽ hoạt động. Điều quan trọng là các khóa này phải chính xác.",
    provider: {
      title: "Nhà cung cấp Cơ sở dữ liệu Vector",
      description: "Không cần cấu hình cho LanceDB.",
    },
  },
  embeddable: {
    title: "Tiện ích hội thoại nhúng",
    description:
      "Tiện ích trò chuyện nhúng là giao diện trò chuyện công khai được liên kết với một không gian làm việc duy nhất. Điều này cho phép bạn xây dựng không gian làm việc mà sau đó bạn có thể xuất bản ra thế giới.",
    create: "Tạo nhúng",
    table: {
      workspace: "Không gian làm việc",
      chats: "Trò chuyện đã gửi",
      active: "Tên miền Hoạt động",
      created: "Ngày tạo",
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
    title: "Lịch sử Nhúng Trò chuyện",
    export: "Xuất",
    description:
      "Đây là tất cả các cuộc trò chuyện và tin nhắn đã được ghi lại từ bất kỳ nhúng nào mà bạn đã xuất bản.",
    table: {
      embed: "Nhúng",
      sender: "Người gửi",
      message: "Tin nhắn",
      response: "Phản hồi",
      at: "Gửi lúc",
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
    title: "Bảo mật",
    multiuser: {
      title: "Chế độ Đa Người dùng",
      description:
        "Thiết lập phiên bản của bạn để hỗ trợ nhóm bằng cách kích hoạt Chế độ Đa Người dùng.",
      enable: {
        "is-enable": "Chế độ Đa Người dùng đã Được Bật",
        enable: "Bật Chế độ Đa Người dùng",
        description:
          "Theo mặc định, bạn sẽ là quản trị viên duy nhất. Với tư cách quản trị viên, bạn sẽ cần tạo tài khoản cho tất cả người dùng hoặc quản trị viên mới. Không được mất mật khẩu vì chỉ người dùng Quản trị viên mới có thể đặt lại mật khẩu.",
        username: "Tên người dùng tài khoản Quản trị viên",
        password: "Mật khẩu tài khoản Quản trị viên",
      },
    },
    password: {
      title: "Bảo vệ Mật khẩu",
      description:
        "Bảo vệ phiên bản AnythingLLM của bạn bằng mật khẩu. Nếu bạn quên mật khẩu này, không có phương pháp khôi phục nên hãy đảm bảo lưu mật khẩu này.",
      "password-label": "Mật khẩu của phiên bản",
    },
  },
  event: {
    title: "Nhật ký sự kiện",
    description:
      "Xem tất cả các hành động và sự kiện đang xảy ra trên phiên bản này để giám sát.",
    clear: "Xóa Nhật ký sự kiện",
    table: {
      type: "Loại Sự kiện",
      user: "Người dùng",
      occurred: "Xảy ra lúc",
    },
  },
  privacy: {
    title: "Quyền riêng tư & Xử lý Dữ liệu",
    description:
      "Đây là cấu hình của bạn về cách các nhà cung cấp bên thứ ba được kết nối và AnythingLLM xử lý dữ liệu của bạn.",
    llm: "Lựa chọn LLM",
    embedding: "Tùy chọn nhúng",
    vector: "Cơ sở dữ liệu Vector",
    anonymous: "Đã Bật Telemetry Ẩn danh",
  },
  connectors: {
    "search-placeholder": "Tìm kiếm trình kết nối dữ liệu",
    "no-connectors": "Không tìm thấy trình kết nối dữ liệu.",
    obsidian: {
      name: "Obsidian",
      description: "Nhập kho Obsidian chỉ với một cú nhấp chuột.",
      vault_location: "Vị trí Kho",
      vault_description:
        "Chọn thư mục kho Obsidian của bạn để nhập tất cả ghi chú và kết nối của chúng.",
      selected_files: "Tìm thấy {{count}} tệp markdown",
      importing: "Đang nhập kho...",
      import_vault: "Nhập Kho",
      processing_time:
        "Điều này có thể mất một lúc tùy thuộc vào kích thước kho của bạn.",
      vault_warning:
        "Để tránh xung đột, hãy đảm bảo kho Obsidian của bạn hiện không mở.",
    },
    github: {
      name: "Kho GitHub",
      description:
        "Nhập toàn bộ kho GitHub công khai hoặc riêng tư chỉ với một cú nhấp chuột.",
      URL: "URL Kho GitHub",
      URL_explained: "URL của kho GitHub bạn muốn thu thập.",
      token: "Token Truy cập GitHub",
      optional: "tùy chọn",
      token_explained: "Token truy cập để ngăn giới hạn tốc độ.",
      token_explained_start: "Nếu không có ",
      token_explained_link1: "Token Truy cập Cá nhân",
      token_explained_middle:
        ", API GitHub có thể giới hạn số lượng tệp có thể thu thập do giới hạn tốc độ. Bạn có thể ",
      token_explained_link2: "tạo Token Truy cập tạm thời",
      token_explained_end: " để tránh vấn đề này.",
      ignores: "Bỏ qua Tệp",
      git_ignore:
        "Danh sách theo định dạng .gitignore để bỏ qua các tệp cụ thể trong quá trình thu thập. Nhấn enter sau mỗi mục bạn muốn lưu.",
      task_explained:
        "Khi hoàn tất, tất cả các tệp sẽ có sẵn để nhúng vào không gian làm việc trong bộ chọn tài liệu.",
      branch: "Nhánh bạn muốn thu thập tệp.",
      branch_loading: "-- đang tải các nhánh có sẵn --",
      branch_explained: "Nhánh bạn muốn thu thập tệp.",
      token_information:
        "Nếu không điền <b>Token Truy cập GitHub</b>, trình kết nối dữ liệu này chỉ có thể thu thập các tệp <b>cấp cao nhất</b> của kho do giới hạn tốc độ API công khai của GitHub.",
      token_personal:
        "Nhận Token Truy cập Cá nhân miễn phí với tài khoản GitHub tại đây.",
    },
    gitlab: {
      name: "Kho GitLab",
      description:
        "Nhập toàn bộ kho GitLab công khai hoặc riêng tư chỉ với một cú nhấp chuột.",
      URL: "URL Kho GitLab",
      URL_explained: "URL của kho GitLab bạn muốn thu thập.",
      token: "Token Truy cập GitLab",
      optional: "tùy chọn",
      token_explained: "Token truy cập để ngăn giới hạn tốc độ.",
      token_description: "Chọn các thực thể bổ sung để lấy từ API GitLab.",
      token_explained_start: "Nếu không có ",
      token_explained_link1: "Token Truy cập Cá nhân",
      token_explained_middle:
        ", API GitLab có thể giới hạn số lượng tệp có thể thu thập do giới hạn tốc độ. Bạn có thể ",
      token_explained_link2: "tạo Token Truy cập tạm thời",
      token_explained_end: " để tránh vấn đề này.",
      fetch_issues: "Lấy Issues dưới dạng Tài liệu",
      ignores: "Bỏ qua Tệp",
      git_ignore:
        "Danh sách theo định dạng .gitignore để bỏ qua các tệp cụ thể trong quá trình thu thập. Nhấn enter sau mỗi mục bạn muốn lưu.",
      task_explained:
        "Khi hoàn tất, tất cả các tệp sẽ có sẵn để nhúng vào không gian làm việc trong bộ chọn tài liệu.",
      branch: "Nhánh bạn muốn thu thập tệp",
      branch_loading: "-- đang tải các nhánh có sẵn --",
      branch_explained: "Nhánh bạn muốn thu thập tệp.",
      token_information:
        "Nếu không điền <b>Token Truy cập GitLab</b>, trình kết nối dữ liệu này chỉ có thể thu thập các tệp <b>cấp cao nhất</b> của kho do giới hạn tốc độ API công khai của GitLab.",
      token_personal:
        "Nhận Token Truy cập Cá nhân miễn phí với tài khoản GitLab tại đây.",
    },
    youtube: {
      name: "Bản ghi YouTube",
      description: "Nhập bản ghi của toàn bộ video YouTube từ một liên kết.",
      URL: "URL Video YouTube",
      URL_explained_start:
        "Nhập URL của bất kỳ video YouTube nào để lấy bản ghi. Video phải có ",
      URL_explained_link: "phụ đề đóng",
      URL_explained_end: " có sẵn.",
      task_explained:
        "Khi hoàn tất, bản ghi sẽ có sẵn để nhúng vào không gian làm việc trong bộ chọn tài liệu.",
      language: "Ngôn ngữ Bản ghi",
      language_explained: "Chọn ngôn ngữ của bản ghi bạn muốn thu thập.",
      loading_languages: "-- đang tải các ngôn ngữ có sẵn --",
    },
    "website-depth": {
      name: "Trình thu thập Liên kết Hàng loạt",
      description:
        "Thu thập một website và các liên kết con của nó đến một độ sâu nhất định.",
      URL: "URL Website",
      URL_explained: "URL của website bạn muốn thu thập.",
      depth: "Độ sâu Thu thập",
      depth_explained:
        "Đây là số lượng liên kết con mà worker sẽ theo dõi từ URL gốc.",
      max_pages: "Số trang Tối đa",
      max_pages_explained: "Số lượng liên kết tối đa để thu thập.",
      task_explained:
        "Khi hoàn tất, tất cả nội dung đã thu thập sẽ có sẵn để nhúng vào không gian làm việc trong bộ chọn tài liệu.",
    },
    confluence: {
      name: "Confluence",
      description: "Nhập toàn bộ trang Confluence chỉ với một cú nhấp chuột.",
      deployment_type: "Loại triển khai Confluence",
      deployment_type_explained:
        "Xác định phiên bản Confluence của bạn được lưu trữ trên đám mây Atlassian hay tự lưu trữ.",
      base_url: "URL cơ sở Confluence",
      base_url_explained: "Đây là URL cơ sở của không gian Confluence của bạn.",
      space_key: "Khóa không gian Confluence",
      space_key_explained:
        "Đây là khóa không gian của phiên bản confluence của bạn sẽ được sử dụng. Thường bắt đầu bằng ~",
      username: "Tên người dùng Confluence",
      username_explained: "Tên người dùng Confluence của bạn",
      auth_type: "Loại Xác thực Confluence",
      auth_type_explained:
        "Chọn loại xác thực bạn muốn sử dụng để truy cập các trang Confluence của mình.",
      auth_type_username: "Tên người dùng và Token Truy cập",
      auth_type_personal: "Token Truy cập Cá nhân",
      token: "Token Truy cập Confluence",
      token_explained_start:
        "Bạn cần cung cấp token truy cập để xác thực. Bạn có thể tạo token truy cập ",
      token_explained_link: "tại đây",
      token_desc: "Token truy cập để xác thực",
      pat_token: "Token Truy cập Cá nhân Confluence",
      pat_token_explained: "Token truy cập cá nhân Confluence của bạn.",
      bypass_ssl: "Bỏ qua Xác thực Chứng chỉ SSL",
      bypass_ssl_explained:
        "Bật tùy chọn này để bỏ qua xác thực chứng chỉ SSL cho các phiên bản confluence tự lưu trữ với chứng chỉ tự ký",
      task_explained:
        "Khi hoàn tất, nội dung trang sẽ có sẵn để nhúng vào không gian làm việc trong bộ chọn tài liệu.",
    },
    manage: {
      documents: "Tài liệu",
      "data-connectors": "Trình kết nối Dữ liệu",
      "desktop-only":
        "Chỉnh sửa các cài đặt này chỉ có sẵn trên thiết bị máy tính để bàn. Vui lòng truy cập trang này trên máy tính để bàn của bạn để tiếp tục.",
      dismiss: "Đóng",
      editing: "Đang chỉnh sửa",
      workspace_updating: "Updating workspace...",
      workspace_updating_help: "This may take a while for large documents",
      workspace_updated: "Workspace updated successfully.",
      workspace_update_failed: "Workspace update failed: {{error}}",
      error_with_message: "Error: {{error}}",
    },
    directory: {
      "my-documents": "Tài liệu của tôi",
      "new-folder": "Thư mục Mới",
      "search-document": "Tìm kiếm tài liệu",
      "no-documents": "Không có Tài liệu",
      "move-workspace": "Di chuyển đến Không gian làm việc",
      name: "Tên",
      "delete-confirmation":
        "Bạn có chắc chắn muốn xóa các tệp và thư mục này?\nĐiều này sẽ xóa các tệp khỏi hệ thống và tự động xóa chúng khỏi bất kỳ không gian làm việc hiện có nào.\nHành động này không thể hoàn tác.",
      "removing-message":
        "Đang xóa {{count}} tài liệu và {{folderCount}} thư mục. Vui lòng chờ.",
      "move-success": "Đã di chuyển thành công {{count}} tài liệu.",
      date: "Ngày",
      type: "Loại",
      no_docs: "Không có Tài liệu",
      select_all: "Chọn Tất cả",
      deselect_all: "Bỏ chọn Tất cả",
      remove_selected: "Xóa Đã chọn",
      costs: "*Chi phí một lần cho việc nhúng",
      save_embed: "Lưu và Nhúng",
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
      "processor-offline": "Trình xử lý Tài liệu Không khả dụng",
      "processor-offline-desc":
        "Chúng tôi không thể tải lên tệp của bạn ngay bây giờ vì trình xử lý tài liệu đang ngoại tuyến. Vui lòng thử lại sau.",
      "click-upload": "Nhấp để tải lên hoặc kéo và thả",
      "file-types":
        "hỗ trợ tệp văn bản, csv, bảng tính, tệp âm thanh và hơn thế nữa!",
      "or-submit-link": "hoặc gửi liên kết",
      "placeholder-link": "https://example.com",
      fetching: "Đang lấy...",
      "fetch-website": "Lấy website",
      "privacy-notice":
        "Các tệp này sẽ được tải lên trình xử lý tài liệu đang chạy trên phiên bản AnythingLLM này. Các tệp này không được gửi hoặc chia sẻ với bên thứ ba.",
      "scraping-link": "Scraping link...",
      "link-error": "Error uploading link: {{error}}",
      "link-success": "Link uploaded successfully",
      "uploading-file": "Uploading file...",
      "file-failed": "this file failed to upload",
    },
    pinning: {
      what_pinning: "Ghim tài liệu là gì?",
      pin_explained_block1:
        "Khi bạn <b>ghim</b> một tài liệu trong AnythingLLM, chúng tôi sẽ đưa toàn bộ nội dung của tài liệu vào cửa sổ prompt của bạn để LLM hiểu đầy đủ.",
      pin_explained_block2:
        "Điều này hoạt động tốt nhất với <b>mô hình ngữ cảnh lớn</b> hoặc các tệp nhỏ quan trọng với cơ sở kiến thức của nó.",
      pin_explained_block3:
        "Nếu bạn không nhận được câu trả lời mong muốn từ AnythingLLM theo mặc định, ghim là một cách tuyệt vời để có được câu trả lời chất lượng cao hơn chỉ với một cú nhấp chuột.",
      accept: "Ok, tôi hiểu rồi",
    },
    watching: {
      what_watching: "Theo dõi tài liệu làm gì?",
      watch_explained_block1:
        "Khi bạn <b>theo dõi</b> một tài liệu trong AnythingLLM, chúng tôi sẽ <i>tự động</i> đồng bộ nội dung tài liệu của bạn từ nguồn gốc theo các khoảng thời gian đều đặn. Điều này sẽ tự động cập nhật nội dung trong mọi không gian làm việc nơi tệp này được quản lý.",
      watch_explained_block2:
        "Tính năng này hiện chỉ hỗ trợ nội dung dựa trên trực tuyến và sẽ không khả dụng cho các tài liệu được tải lên thủ công.",
      watch_explained_block3_start:
        "Bạn có thể quản lý những tài liệu nào đang được theo dõi từ ",
      watch_explained_block3_link: "Trình quản lý tệp",
      watch_explained_block3_end: " chế độ xem quản trị.",
      accept: "Ok, tôi hiểu rồi",
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
    welcome: "Chào mừng đến với không gian làm việc mới của bạn.",
    get_started: "Để bắt đầu, hãy",
    get_started_default: "Để bắt đầu",
    upload: "tải lên một tài liệu",
    or: "hoặc",
    attachments_processing: "Đang xử lý tệp đính kèm. Vui lòng chờ...",
    send_chat: "gửi một tin nhắn trò chuyện.",
    send_message: "Gửi tin nhắn",
    attach_file: "Đính kèm tệp vào cuộc trò chuyện này",
    slash: "Xem tất cả các lệnh gạch chéo có sẵn để trò chuyện.",
    agents: "Xem tất cả các agent có sẵn bạn có thể sử dụng để trò chuyện.",
    start_agent_session: "Start agent session",
    text_size: "Thay đổi kích thước văn bản.",
    microphone: "Nói prompt của bạn.",
    send: "Gửi tin nhắn prompt đến không gian làm việc",
    tts_speak_message: "TTS Đọc tin nhắn",
    copy: "Sao chép",
    regenerate: "Tạo lại",
    regenerate_response: "Tạo lại phản hồi",
    good_response: "Phản hồi tốt",
    more_actions: "Thêm hành động",
    hide_citations: "Ẩn trích dẫn",
    show_citations: "Hiện trích dẫn",
    sources: "Nguồn",
    source_count_one: "{{count}} tham khảo",
    source_count_other: "{{count}} – Tham khảo",
    document: "Tài liệu",
    similarity_match: "trận đấu",
    pause_tts_speech_message: "Tạm dừng đọc TTS của tin nhắn",
    fork: "Rẽ nhánh",
    delete: "Xóa",
    save_submit: "Lưu & Gửi",
    cancel: "Hủy",
    submit: "Gửi",
    edit_prompt: "Chỉnh sửa prompt",
    edit_response: "Chỉnh sửa phản hồi",
    edit_info_user:
      '"Gửi" sẽ tạo lại phản hồi của AI. "Lưu" chỉ cập nhật tin nhắn của bạn.',
    edit_info_assistant:
      "Các thay đổi của bạn sẽ được lưu trực tiếp vào phản hồi này.",
    see_less: "Xem ít hơn",
    see_more: "Xem thêm",
    at_agent: "@agent",
    default_agent_description: " - agent mặc định cho không gian làm việc này.",
    custom_agents_coming_soon: "agent tùy chỉnh sắp ra mắt!",
    preset_reset_description:
      "Xóa lịch sử trò chuyện và bắt đầu cuộc trò chuyện mới",
    preset_exit_description: "Dừng lại phiên làm việc hiện tại",
    add_new_preset: " Thêm Cài đặt sẵn Mới",
    add_new: "Thêm mới",
    edit: "Chỉnh sửa",
    publish: "Đăng tải",
    stop_generating: "Dừng tạo ra phản hồi",
    command: "Lệnh",
    your_command: "lệnh-của-bạn",
    placeholder_prompt: "Đây là nội dung sẽ được đưa vào trước prompt của bạn.",
    description: "Mô tả",
    placeholder_description: "Phản hồi bằng một bài thơ về LLM.",
    save: "Lưu",
    small: "Nhỏ",
    normal: "Bình thường",
    large: "Lớn",
    tools: "Dụng cụ",
    slash_commands: "Lệnh tắt/bật",
    agent_skills: "Kỹ năng của đại lý",
    manage_agent_skills: "Manage Agent Skills",
    agent_skills_disabled_in_session:
      "Can't modify skills during an active agent session. Use /exit to end the session first.",
    browse: "Duyệt",
    text_size_label: "Kích thước văn bản",
    select_model: "Chọn mẫu",
    workspace_llm_manager: {
      search: "Tìm kiếm nhà cung cấp LLM",
      loading_workspace_settings: "Đang tải cài đặt không gian làm việc...",
      available_models: "Mô hình Có sẵn cho {{provider}}",
      available_models_description:
        "Chọn một mô hình để sử dụng cho không gian làm việc này.",
      save: "Sử dụng mô hình này",
      saving: "Đang đặt mô hình làm mặc định không gian làm việc...",
      missing_credentials: "Nhà cung cấp này thiếu thông tin đăng nhập!",
      missing_credentials_description: "Nhấp để thiết lập thông tin đăng nhập",
    },
  },
  profile_settings: {
    edit_account: "Chỉnh sửa Tài khoản",
    profile_picture: "Ảnh Hồ sơ",
    remove_profile_picture: "Xóa Ảnh Hồ sơ",
    username: "Tên người dùng",
    new_password: "Mật khẩu Mới",
    password_description: "Mật khẩu phải có ít nhất 8 ký tự",
    cancel: "Hủy",
    update_account: "Cập nhật Tài khoản",
    theme: "Tùy chọn Giao diện",
    language: "Ngôn ngữ ưa thích",
    failed_upload: "Không thể tải lên ảnh hồ sơ: {{error}}",
    upload_success: "Đã tải lên ảnh hồ sơ.",
    failed_remove: "Không thể xóa ảnh hồ sơ: {{error}}",
    profile_updated: "Hồ sơ đã được cập nhật.",
    failed_update_user: "Không thể cập nhật người dùng: {{error}}",
    account: "Tài khoản",
    support: "Hỗ trợ",
    signout: "Đăng xuất",
  },
  "keyboard-shortcuts": {
    title: "Phím tắt",
    shortcuts: {
      settings: "Mở Cài đặt",
      workspaceSettings: "Mở Cài đặt Không gian làm việc Hiện tại",
      home: "Đi đến Trang chủ",
      workspaces: "Quản lý Không gian làm việc",
      apiKeys: "Cài đặt Khóa API",
      llmPreferences: "Tùy chọn LLM",
      chatSettings: "Cài đặt Trò chuyện",
      help: "Hiện trợ giúp phím tắt",
      showLLMSelector: "Hiện Bộ chọn LLM không gian làm việc",
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
        success_title: "Thành công!",
        success_description:
          "System Prompt của bạn đã được đăng lên Community Hub!",
        success_thank_you: "Cảm ơn bạn đã chia sẻ với Cộng đồng!",
        view_on_hub: "Xem trên Community Hub",
        modal_title: "Đăng System Prompt",
        name_label: "Tên",
        name_description: "Đây là tên hiển thị của system prompt của bạn.",
        name_placeholder: "System Prompt của tôi",
        description_label: "Mô tả",
        description_description:
          "Đây là mô tả của system prompt của bạn. Sử dụng điều này để mô tả mục đích của system prompt của bạn.",
        tags_label: "Thẻ",
        tags_description:
          "Thẻ được sử dụng để gắn nhãn system prompt của bạn để dễ tìm kiếm hơn. Bạn có thể thêm nhiều thẻ. Tối đa 5 thẻ. Tối đa 20 ký tự mỗi thẻ.",
        tags_placeholder: "Nhập và nhấn Enter để thêm thẻ",
        visibility_label: "Hiển thị",
        public_description:
          "System prompt công khai hiển thị cho tất cả mọi người.",
        private_description: "System prompt riêng tư chỉ hiển thị cho bạn.",
        publish_button: "Đăng lên Community Hub",
        submitting: "Đang đăng...",
        submit: "Đăng lên Community Hub",
        prompt_label: "Prompt",
        prompt_description:
          "Đây là system prompt thực tế sẽ được sử dụng để hướng dẫn LLM.",
        prompt_placeholder: "Nhập system prompt của bạn ở đây...",
      },
      agent_flow: {
        public_description:
          "Luồng agent công khai hiển thị cho tất cả mọi người.",
        private_description: "Luồng agent riêng tư chỉ hiển thị cho bạn.",
        success_title: "Thành công!",
        success_description:
          "Luồng Agent của bạn đã được đăng lên Community Hub!",
        success_thank_you: "Cảm ơn bạn đã chia sẻ với Cộng đồng!",
        view_on_hub: "Xem trên Community Hub",
        modal_title: "Đăng Luồng Agent",
        name_label: "Tên",
        name_description: "Đây là tên hiển thị của luồng agent của bạn.",
        name_placeholder: "Luồng Agent của tôi",
        description_label: "Mô tả",
        description_description:
          "Đây là mô tả của luồng agent của bạn. Sử dụng điều này để mô tả mục đích của luồng agent của bạn.",
        tags_label: "Thẻ",
        tags_description:
          "Thẻ được sử dụng để gắn nhãn luồng agent của bạn để dễ tìm kiếm hơn. Bạn có thể thêm nhiều thẻ. Tối đa 5 thẻ. Tối đa 20 ký tự mỗi thẻ.",
        tags_placeholder: "Nhập và nhấn Enter để thêm thẻ",
        visibility_label: "Hiển thị",
        publish_button: "Đăng lên Community Hub",
        submitting: "Đang đăng...",
        submit: "Đăng lên Community Hub",
        privacy_note:
          "Luồng agent luôn được tải lên dưới dạng riêng tư để bảo vệ bất kỳ dữ liệu nhạy cảm nào. Bạn có thể thay đổi khả năng hiển thị trong Community Hub sau khi đăng. Vui lòng xác minh luồng của bạn không chứa bất kỳ thông tin nhạy cảm hoặc riêng tư nào trước khi đăng.",
      },
      slash_command: {
        success_title: "Thành công!",
        success_description:
          "Lệnh Gạch chéo của bạn đã được đăng lên Community Hub!",
        success_thank_you: "Cảm ơn bạn đã chia sẻ với Cộng đồng!",
        view_on_hub: "Xem trên Community Hub",
        modal_title: "Đăng Lệnh Gạch chéo",
        name_label: "Tên",
        name_description: "Đây là tên hiển thị của lệnh gạch chéo của bạn.",
        name_placeholder: "Lệnh Gạch chéo của tôi",
        description_label: "Mô tả",
        description_description:
          "Đây là mô tả của lệnh gạch chéo của bạn. Sử dụng điều này để mô tả mục đích của lệnh gạch chéo của bạn.",
        command_label: "Lệnh",
        command_description:
          "Đây là lệnh gạch chéo mà người dùng sẽ nhập để kích hoạt cài đặt sẵn này.",
        command_placeholder: "lệnh-của-tôi",
        tags_label: "Thẻ",
        tags_description:
          "Thẻ được sử dụng để gắn nhãn lệnh gạch chéo của bạn để dễ tìm kiếm hơn. Bạn có thể thêm nhiều thẻ. Tối đa 5 thẻ. Tối đa 20 ký tự mỗi thẻ.",
        tags_placeholder: "Nhập và nhấn Enter để thêm thẻ",
        visibility_label: "Hiển thị",
        public_description:
          "Lệnh gạch chéo công khai hiển thị cho tất cả mọi người.",
        private_description: "Lệnh gạch chéo riêng tư chỉ hiển thị cho bạn.",
        publish_button: "Đăng lên Community Hub",
        submitting: "Đang đăng...",
        prompt_label: "Prompt",
        prompt_description:
          "Đây là prompt sẽ được sử dụng khi lệnh gạch chéo được kích hoạt.",
        prompt_placeholder: "Nhập prompt của bạn ở đây...",
      },
      generic: {
        unauthenticated: {
          title: "Yêu cầu Xác thực",
          description:
            "Bạn cần xác thực với AnythingLLM Community Hub trước khi đăng các mục.",
          button: "Kết nối với Community Hub",
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
