window.PORTFOLIO_CONTENT = {
  seo: {
    title: "Александр Попов - Head of BI / Head of Analytics, руководитель BI и аналитики",
    description:
      "Александр Попов строит BI и аналитику как управляемую функцию: Atom, Mars, команда, delivery, self-service и измеримый business impact.",
    keywords:
      "Александр Попов, BI, аналитика, head of analytics, head of BI, BI lead, executive portfolio",
    url: "https://adikant.github.io/",
    ogImage: "https://adikant.github.io/assets/images/og-preview.svg",
    ogImageAlt: "Портфолио Александра Попова для head / lead ролей в BI и аналитике",
    themeColor: "#102327",
    twitterCard: "summary_large_image",
    schema: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      inLanguage: "ru",
      mainEntity: {
        "@type": "Person",
        name: "Александр Попов",
        jobTitle: "Head of BI / Head of Analytics",
        description:
          "Строю и управляю BI-функцией: команда, бизнес-запросы, delivery, self-service и измеримый эффект.",
        url: "https://adikant.github.io/",
        image: "https://adikant.github.io/assets/images/profile-hero.jpg",
        email: "mailto:minelik4@gmail.com",
        sameAs: ["https://t.me/adikant", "https://hh.ru/resume/94319226ff0fcc75930039ed1f74474d4e546e"]
      }
    }
  },

  brand: {
    name: "Александр Попов"
  },

  navigation: [
    { id: "value", label: "Ценность" },
    { id: "impact", label: "Метрики" },
    { id: "cases", label: "Кейсы" },
    { id: "profit", label: "Эффект" },
    { id: "management", label: "Управление" },
    { id: "model", label: "Процесс" },
    { id: "tech", label: "Техстек" },
    { id: "timeline", label: "Траектория" },
    { id: "contact", label: "Контакт" }
  ],

  hero: {
    name: "Александр Попов",
    role: "Руководитель BI и аналитики",
    headline:
      "Строю и управляю BI-функцией: от бизнес-вопроса до измеримого эффекта",
    summary: "",
    proofLine:
      "Запустил аналитику с нуля, собрал команду из 6 человек, увеличил количество пользователей BI с 0 до 200 в месяц и принес измеримый бизнес-эффект.",
    portrait: {
      src: "assets/images/profile-hero.jpg?v=20260507-user-photo",
      alt: "Александр Попов"
    },
    ctas: [
      {
        label: "Telegram",
        href: "https://t.me/adikant",
        kind: "primary",
        external: true
      },
      {
        label: "Короткое резюме",
        href: "assets/docs/popov-resume.pdf?v=20260507",
        kind: "secondary",
        external: true
      },
      {
        label: "Резюме на HeadHunter",
        href: "https://hh.ru/resume/94319226ff0fcc75930039ed1f74474d4e546e",
        kind: "secondary",
        external: true
      }
    ]
  },

  valuePillars: {
    eyebrow: "Управленческая ценность",
    title: "BI как функция управления",
    intro: "",
    items: [
      {
        index: "01",
        title: "Запуск функции с нуля",
        body:
          "Собираю базовый BI-контур: команду, роли, отчетность, правила работы с бизнесом и первые управленческие метрики."
      },
      {
        index: "02",
        title: "Управление отделом и процессом",
        body:
          "Перевожу запросы бизнеса в управляемый процесс: входящая воронка, оценка, постановка технической задачи, релиз и поддержка."
      },
      {
        index: "03",
        title: "Бизнес-эффект",
        body:
          "Связываю аналитику с деньгами, экономией времени, снижением рисков и скоростью решений: от коммерческих моделей до автоматизации отчетности."
      },
      {
        index: "04",
        title: "BI, витрины и self-service",
        body:
          "Выстраиваю аналитику на основе актуальных BI-решений и подходов к разработке витрин данных, обеспечиваю качество, SLA и self-service."
      }
    ]
  },

  metrics: {
    eyebrow: "",
    title: "Эффект, масштаб и использование BI",
    intro: "",
    groups: [
      {
        title: "Business impact",
        items: [
          { value: "~900 млн ₽", label: "годовой incremental-эффект коммерческих проектов Mars" },
          { value: "~300 млн ₽", label: "годовая экономия в Atom" },
          { value: "1000+", label: "часов ручной работы автоматизировано в месяц" }
        ]
      },
      {
        title: "Operating scale",
        items: [
          { value: "6", label: "человек в команде аналитики" },
          { value: "30+", label: "источников данных" },
          { value: "4500+", label: "объектов в контуре данных" },
          { value: "250", label: "витрин данных" },
          { value: "50+", label: "дашбордов и отчетных решений" }
        ]
      },
      {
        title: "Demand & adoption",
        items: [
          { value: "0 -> 200", label: "пользователей BI в месяц" },
          { value: "30+", label: "бизнес-команд заказчиков" },
          { value: "150", label: "реализованных бизнес-задач" }
        ]
      }
    ]
  },

  cases: {
    eyebrow: "",
    title: "Кейсы: запуск функции, delivery и бизнес-эффект",
    intro: "",
    items: [
      {
        company: "Atom",
        context: "запуск функции",
        title: "Запуск BI-функции и корпоративной отчетности с нуля",
        summary:
          "В компании отсутствовали единые метрики, стабильное качество данных и быстрый доступ руководителей к управленческим решениям.",
        problem:
          "Запустить единые правила расчета метрик, понятную точку входа в аналитику и регулярную отчетность для принятия решений.",
        role:
          "Первый аналитик направления, затем руководитель BI/Data Analytics: команда, правила работы, BI-продукт и связь с data platform.",
        businessResult: "",
        metrics: [],
        details: [
          {
            title: "Situation",
            body:
              "Аналитика начиналась с разрозненных потребностей бизнеса, без устойчивого BI-контура, команды, корпоративной отчетности и общего процесса работы с запросами."
          },
          {
            title: "Task / business problem",
            body:
              "Нужно было запустить функцию, которая соединяет бизнес-вопросы, витрины, дашборды, качество данных, поддержку пользователей и регулярный управленческий ритм."
          },
          {
            title: "Role / responsibility",
            body:
              "Сформировал направление от первого аналитика до руководителя команды из 6 человек, отвечая за BI-продукт, delivery-подход и взаимодействие с data platform."
          },
          {
            title: "Actions",
            list: [
              "Собрал команду data analysts и system analysts, распределил роли и зоны ответственности.",
              "Выстроил корпоративную отчетность вокруг доменных витрин и управленческих сценариев.",
              "Выстроил регулярное взаимодействие с 30+ бизнес-командами: выявление потребностей, delivery, демо, поддержка и развитие использования BI."
            ]
          },
          {
            title: "Result",
            body:
              "Контур вырос до 30+ источников, 4500+ объектов, 250 витрин, 50+ дашбордов и 200 пользователей BI в месяц."
          }
        ],
        safeVisual: {
          type: "launch",
          label: "От нуля к функции",
          items: [
            { value: "0 -> 6", label: "команда" },
            { value: "30+", label: "источников" },
            { value: "250", label: "витрин" },
            { value: "200", label: "MAU" },
            { value: "0 -> ~300 млн ₽", label: "годовая экономия" }
          ]
        }
      },
      {
        company: "Atom",
        context: "demand management",
        title: "Управляемый поток аналитических запросов",
        summary:
          "Выстроил процесс, в котором бизнес-запрос проходит путь от intake и приоритизации до S2T, разработки, QA, релиза, self-service и поддержки.",
        problem:
          "Входящий поток задач быстро рос, поэтому бизнесу требовались прозрачные правила входа, приоритетов, сроков и ответственности за результат.",
        role:
          "Координировал поток запросов совместно с командой и выстроил delivery-модель в контуре функции.",
        businessResult: "",
        businessResultMetrics: ["150 реализованных бизнес-задач"],
        metrics: [],
        details: [
          {
            title: "Situation",
            body:
              "Спрос на аналитику шел из разных функций и быстро расширялся: BI-дашборды, витрины, интеграции, API, process analytics, commercial/customer и corporate domains."
          },
          {
            title: "Task / business problem",
            body:
              "Нужно было сделать поток запросов предсказуемым: вход, прозрачный backlog, правила приоритизации, качество постановки, release, self-service и support."
          },
          {
            title: "Role / responsibility",
            body:
              "Координировал поток запросов и выстроил delivery-модель BI/Data Analytics совместно с командой: роли, приоритеты, стандарты качества и понятный маршрут до результата."
          },
          {
            title: "Actions",
            list: [
              "Intake: фиксировали ответственного со стороны бизнеса, контекст, ожидаемое решение, критерии результата и связь с управленческим действием.",
              "RICE: приоритизировали backlog через reach, impact, confidence и effort, чтобы объяснять очередность работ бизнесу.",
              "S2T и ТЗ: system analysts готовили требования к источникам, расчетам, витринам, доступам и критериям приемки.",
              "Development: data analysts совместно с командой разрабатывали витринный слой и реализовывали дашборды, отчеты, расчеты или аналитические сервисы.",
              "QA и UAT: проводили внутреннее тестирование, демонстрацию результата, пользовательское тестирование и сбор обратной связи.",
              "Support: после запуска сопровождали решение, отслеживали использование и дорабатывали его при изменении требований.",
              "Self-service: готовили подход и инструменты, чтобы бизнес мог собирать типовые дашборды и снижать поток ручных запросов."
            ]
          },
          {
            title: "Result",
            body:
              "Delivery-контур помог автоматизировать 1000+ часов ручной работы в месяц и дал около 300 млн ₽ годовой экономии."
          }
        ],
        safeVisual: {
          type: "flow",
          label: "Delivery path",
          items: ["Intake", "RICE", "S2T", "Development", "QA / UAT", "Release", "Support", "Self-service"]
        }
      },
      {
        company: "Mars",
        context: "коммерческая аналитика",
        title: "Рост выручки через полку, покрытие и контроль исполнения",
        summary:
          "Коммерческим командам нужно было закрывать план и видеть, где данные указывают на недоиспользованный потенциал продаж.",
        problem:
          "Часть магазинов имела потенциал расширения полки, а дополнительные места продаж требовали регулярного контроля фактического покрытия.",
        role:
          "Отвечал за аналитические модели, рекомендации и контур мониторинга для коммерческих команд и руководителей.",
        businessResult: "",
        metrics: [],
        details: [
          {
            title: "Situation",
            body:
              "В части магазинов спрос был выше текущего формата, а по дополнительным местам продаж требовалась видимость фактического исполнения."
          },
          {
            title: "Task / business problem",
            body:
              "Нужно было превратить данные продаж, форматов магазинов и покрытия в коммерческие рекомендации и регулярный управленческий контроль."
          },
          {
            title: "Role / responsibility",
            body:
              "Разрабатывал аналитический подход, связывал расчет с переговорной логикой и упаковывал результат для sales-команд и руководителей."
          },
          {
            title: "Actions",
            list: [
              "Сегментировал точки по формату, площади, текущей полке и продажам.",
              "Нашел магазины, где спрос превышал средний уровень следующего формата.",
              "Сформировал рекомендации для переговоров и масштабирования на сеть.",
              "Собрал регулярный контроль фактического покрытия дополнительных мест продаж по зонам ответственности."
            ]
          },
          {
            title: "Result",
            body:
              "+59 млн ₽ по пилоту расширения полки, +200 млн ₽ после масштабирования подхода на X5 и около +600 млн ₽ от контроля дополнительных мест продаж."
          }
        ],
        safeVisual: {
          type: "control",
          label: "Коммерческий эффект",
          items: [
            { label: "итого", value: "~900 млн ₽" },
            { label: "полка", value: "+59 млн ₽" },
            { label: "масштаб X5", value: "+200 млн ₽" },
            { label: "контроль мест", value: "+600 млн ₽" }
          ]
        }
      }
    ]
  },

  profitEfficiency: {
    eyebrow: "Прибыль и эффективность",
    title: "Как BI влияет на прибыль и расходы",
    intro: "",
    items: [
      {
        title: "Рост выручки",
        body:
          "Нахожу точки роста через коммерческую аналитику: полка, покрытие, исполнение договоренностей, клиентские сегменты и действия sales-команд."
      },
      {
        title: "Сокращение ручного труда",
        body:
          "Повторяемые отчеты и сверки перевожу в витрины, дашборды и self-service, чтобы команда инвестировала время в анализ данных, принятие решений и более ценные задачи."
      },
      {
        title: "Снижение рисков",
        body:
          "Прозрачные метрики, QA и регулярный контроль снижают риск пропустить проблему, принять решение на устаревших данных и позволяют быть уверенным в корректности расчетов."
      },
      {
        title: "Качественные решения",
        body:
          "Руководители получают своевременную аналитику и рекомендации: что происходит, почему это важно, как улучшить ситуацию и снизить неблагоприятные последствия."
      },
      {
        title: "Self-service",
        body:
          "Бизнес получает доступ к данным и может строить базовую и продвинутую аналитику на провалидированных данных через единое окно платформы и единую методологию метрик."
      }
    ]
  },

  managementScope: {
    eyebrow: "Что беру в управление",
    title: "Контур ответственности руководителя аналитики",
    intro: "",
    items: [
      {
        title: "People",
        items: [
          "Найм и адаптация",
          "Регулярные 1:1 и обратная связь",
          "Оценка результатов и развитие ролей"
        ]
      },
      {
        title: "Process",
        items: ["Intake и backlog", "RICE и приоритизация", "S2T, QA, release и support"]
      },
      {
        title: "BI product",
        items: ["Метрики и витрины", "Дашборды и self-service", "Регулярное использование BI"]
      },
      {
        title: "Business partnership",
        items: ["Senior stakeholders", "Roadmap и ожидания", "Trade-offs и синхронизация"]
      },
      {
        title: "Data platform",
        items: ["Требования к данным", "Качество, доступы и SLA", "Согласование требований с data engineering"]
      }
    ]
  },

  first90Days: {
    eyebrow: "Первые 90 дней",
    title: "Мой план onboarding в новую команду",
    intro: "",
    periods: [
      {
        label: "30 дней",
        title: "Диагностика и карта текущего состояния",
        items: [
          "бизнес-цели, reporting и pain points",
          "интервью с ключевыми stakeholders",
          "знакомство с командой, ролями и текущей загрузкой",
          "карта метрик",
          "риски: качество данных, ручной труд, дубли"
        ]
      },
      {
        label: "60 дней",
        title: "Правила работы и первые quick wins",
        items: [
          "целевая operating model BI/Data Analytics",
          "intake, backlog rules и RICE",
          "целевой контур ролей, навыков и ответственности",
          "стандарты BI, QA и release",
          "первые улучшения с видимым эффектом"
        ]
      },
      {
        label: "90 дней",
        title: "Roadmap, использование и KPI функции",
        items: [
          "roadmap на 6-12 месяцев",
          "план развития self-service",
          "план найма и развития команды под roadmap",
          "KPI BI-функции и стандарты качества",
          "прозрачный процесс с бизнесом и data platform"
        ]
      }
    ]
  },

  midCta: {
    title: "Нужен руководитель, который строит BI как управленческую функцию?",
    body:
      "Открыт к диалогу по ролям Head of Analytics, Head of BI, BI Lead и руководитель отдела аналитики.",
    actions: [
      {
        label: "Telegram",
        href: "https://t.me/adikant",
        kind: "primary",
        external: true
      },
      {
        label: "Короткое резюме",
        href: "assets/docs/popov-resume.pdf?v=20260507",
        kind: "secondary",
        external: true
      }
    ]
  },

  operatingModel: {
    eyebrow: "Delivery operating model",
    title: "Как запрос превращается в решение",
    intro: "",
    surface: [
      {
        title: "Бизнес-вход",
        body:
          "Совместно с заказчиком прорабатываю требования: ответственных со стороны бизнеса и команды, ключевые результаты, ожидания и критерии успеха до старта разработки."
      },
      {
        title: "Управляемый delivery",
        body:
          "Перевожу поток запросов в бэклог: оцениваю эффект и трудозатраты, согласую приоритеты, сроки, постановку, проверку и релиз."
      },
      {
        title: "Использование после релиза",
        body:
          "Реализую решение с демонстрацией результата, замером метрик, поддержкой и доступом к self-service."
      }
    ],
    steps: [
      {
        step: "01",
        title: "Intake",
        body:
          "Прорабатываю требования совместно с заказчиком: ответственных, ключевые результаты, ожидания и критерии успеха.",
        points: ["ответственные", "ключевые результаты", "критерии успеха"]
      },
      {
        step: "02",
        title: "Business question",
        body:
          "Уточняю, какое решение нужно принять, какая метрика меняется и что будет считаться полезным результатом.",
        points: ["управленческое решение", "метрика", "ожидаемое действие"]
      },
      {
        step: "03",
        title: "RICE / backlog",
        body:
          "Выстраиваю roadmap и очередь работ через reach, impact, confidence, effort и понятные trade-offs.",
        points: ["оценка эффекта", "приоритет", "очередь работ"]
      },
      {
        step: "04",
        title: "S2T",
        body:
          "Перевожу бизнес-логику в требования к источникам, расчетам, витринам и качеству данных.",
        points: ["источники", "расчеты", "критерии приемки"]
      },
      {
        step: "05",
        title: "Development",
        body:
          "Разрабатываю витринный слой и реализую дашборды, отчеты или расчетные модели под согласованную бизнес-задачу.",
        points: ["витрина", "BI-сценарий", "ревью"]
      },
      {
        step: "06",
        title: "QA / UAT",
        body:
          "Провожу внутреннее тестирование, демонстрацию результата, пользовательское тестирование и сбор обратной связи.",
        points: ["внутреннее тестирование", "UAT", "обратная связь"]
      },
      {
        step: "07",
        title: "Support",
        body:
          "Поддерживаю решение после запуска, отслеживаю использование и дорабатываю его при изменении требований или обратной связи.",
        points: ["поддержка", "использование", "доработки"]
      },
      {
        step: "08",
        title: "Self-service",
        body:
          "Готовлю подход и инструменты, чтобы бизнес мог самостоятельно собирать типовые дашборды и снижать поток ручных запросов.",
        points: ["типовые шаблоны", "права и обучение", "снижение ручных запросов"]
      }
    ]
  },

  domains: {
    eyebrow: "Домены и типы задач",
    title: "30+ бизнес-команд и разные аналитические контуры",
    intro:
      "Работал с заказчиками из corporate, commercial, product и operations-направлений, поэтому быстро перевожу бизнес-вопросы в метрики и BI-сценарии.",
    items: [
      "finance",
      "HR",
      "procurement",
      "sales",
      "marketing",
      "telematics",
      "fleet",
      "charging",
      "production",
      "product management",
      "risk",
      "quality",
      "operational analytics",
      "commercial analytics"
    ]
  },

  techContext: {
    eyebrow: "Технический контекст",
    title: "BI на стыке бизнеса и data platform",
    intro: "",
    summary:
      "Управляю BI-продуктом с пониманием зависимостей от витрин, качества данных, доступов и эксплуатации.",
    architecture: {
      title: "Упрощенный контур архитектуры",
      stages: [
        {
          title: "Источники",
          body: "системы, события, файлы и внешние данные",
          tools: [
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/postgresql.svg", label: "Database" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/salesforce.svg", label: "CRM" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/microsoftexcel.svg", label: "Excel" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apachekafka.svg", label: "Kafka" }
          ]
        },
        {
          title: "Загрузка",
          body: "batch и near-real-time потоки в единый контур данных",
          tools: [
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apacheflink.svg", label: "Flink" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apachekafka.svg", label: "Streaming" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apacheairflow.svg", label: "Batch" }
          ]
        },
        {
          title: "LakeHouse",
          body: "raw и curated слои, объектное хранение, табличные форматы",
          tools: [
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/amazons3.svg", label: "S3" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/clickhouse.svg", label: "ClickHouse" },
            { iconUrl: "https://apache.org/logos/res/iceberg/iceberg.png", label: "Iceberg" }
          ]
        },
        {
          title: "Обработка",
          body: "оркестрация, SQL, PySpark, витрины и проверка качества",
          tools: [
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apachespark.svg", label: "PySpark" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/shield-check.svg", label: "Data quality" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apacheairflow.svg", label: "Airflow" }
          ]
        },
        {
          title: "Serving",
          body: "BI, API, SQL-доступ и self-service для бизнес-команд",
          tools: [
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/yandexcloud.svg", label: "DataLens" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/apachesuperset.svg", label: "Superset" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/powerbi.svg", label: "Power BI" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/dbeaver.svg", label: "DBeaver" },
            { iconUrl: "https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/trino.svg", label: "Trino" }
          ]
        }
      ],
      rails: ["governance", "доступы", "data quality", "monitoring", "lineage"]
    },
    surface: [
      "требования к витринам и метрикам",
      "качество данных, доступы и SLA",
      "согласование требований с data engineering"
    ],
    items: [
      {
        title: "BI-слой",
        body:
          "DataLens, Superset и Power BI рассматриваю как интерфейс управленческого решения: сценарий, метрика, ясность и регулярное использование."
      },
      {
        title: "Данные и витрины",
        body:
          "SQL, Trino и S2T использую для точной постановки требований к расчетам, источникам и качеству бизнес-логики."
      },
      {
        title: "Data platform",
        body:
          "Понимаю роль Airflow, PySpark, S3 и Iceberg в надежности BI-слоя и умею говорить с data engineering на одном языке."
      },
      {
        title: "Delivery и governance",
        body:
          "Task tracker, knowledge base, Git-based review, QA, доступы и описание метрик использую как опору масштабируемой функции."
      }
    ]
  },

  speaking: {
    eyebrow: "Credibility и adoption",
    title: "Выступления, обучение и культура использования данных",
    intro:
      "Для head-роли важно добиться доверия, понимания метрик и регулярного использования решений.",
    items: [
      {
        title: "Доклад на конференции Яндекса Data&ML",
        body:
          "Выступил с докладом про BI и аналитику и усилил узнаваемость компании в профессиональном аналитическом сообществе. Моя часть начинается с 23:35.",
        href: "https://yandex.cloud/ru/events/dataml2b?videoTab=2",
        linkLabel: "Смотреть запись с 23:35"
      },
      {
        title: "Демо, воркшопы и обучение",
        body:
          "Помогаю пользователям разбираться в BI-сценариях, метриках и self-service, чтобы использование BI росло управляемо."
      },
      {
        title: "Data-driven культура",
        body:
          "Работаю с командами так, чтобы аналитика становилась привычным способом обсуждать решения, риски и результаты."
      }
    ]
  },

  timeline: {
    eyebrow: "Карьерная траектория",
    title: "Текущая роль и рост ответственности",
    intro: "",
    items: [
      {
        current: true,
        period: "03.2023 - сейчас",
        company: "Atom",
        role: "Текущая роль: руководитель отдела аналитики",
        body:
          "Запуск BI и корпоративной отчетности с нуля, команда 6 человек, operating model, self-service и рост BI в регулярный управленческий инструмент для 30+ бизнес-команд."
      },
      {
        period: "12.2019 - 03.2023",
        company: "Mars",
        role: "Аналитик -> Middle Data Analyst -> BI Lead",
        body:
          "Коммерческая аналитика, KPI, отчетность для национальных клиентов и регионов, работа с Sales, Marketing, Brand и Product. На позднем этапе - lead-роль в BI-направлении."
      }
    ]
  },

  bestFit: {
    eyebrow: "Где я особенно полезен",
    title: "Ситуации, где мой опыт дает максимальный эффект",
    intro:
      "Лучше всего подхожу компаниям, где BI должен стать управляемой функцией с владельцем, процессом, качеством и измеримым эффектом.",
    items: [
      {
        title: "Нужно запускать аналитику с нуля",
        body:
          "Есть потребность в управленческой отчетности, метриках, распределении ответственности, roadmap и регулярном использовании данных, но функция еще не собрана."
      },
      {
        title: "BI уже есть, но работает хаотично",
        body:
          "Много запросов и отчетов, но не хватает прозрачности, приоритизации, roadmap, backlog, QA, стандартов и понятного release-процесса."
      },
      {
        title: "Нужен мост между бизнесом и data platform",
        body:
          "Бизнесу нужен руководитель, который понимает задачу, BI-интерфейс и ограничения инженерного контура данных."
      },
      {
        title: "Нужно повысить использование BI",
        body:
          "Дашборды есть, но команды продолжают жить в ручных запросах; нужен self-service, обучение и управляемое использование BI."
      }
    ]
  },

  contact: {
    eyebrow: "Контакты",
    title: "Открыт к диалогу по lead / head ролям в BI и аналитике",
    intro: "",
    roles:
      "Head of Analytics, Head of BI, BI Lead, руководитель отдела аналитики",
    email: "minelik4@gmail.com",
    telegram: "@adikant",
    telegramUrl: "https://t.me/adikant",
    resumeUrl: "assets/docs/popov-resume.pdf?v=20260507",
    hhResume: {
      title: "Резюме на HeadHunter",
      body:
        "Ссылка на HeadHunter с номером телефона для рекрутеров.",
      href: "https://hh.ru/resume/94319226ff0fcc75930039ed1f74474d4e546e",
      iconText: "hh"
    },
    closing: "",
    actions: [
      { label: "Написать на email", href: "mailto:minelik4@gmail.com", kind: "primary" },
      {
        label: "Написать в Telegram",
        href: "https://t.me/adikant",
        kind: "secondary",
        external: true
      },
      {
        label: "Открыть резюме PDF",
        href: "assets/docs/popov-resume.pdf?v=20260507",
        kind: "ghost",
        external: true
      }
    ]
  },

  footer: {
    note: ""
  }
};
