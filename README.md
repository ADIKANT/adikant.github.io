# adikant.github.io

Публичное executive-портфолио Александра Попова для GitHub Pages.

## Архитектура

- `index.html` — семантический shell страницы, SEO/meta, якоря секций.
- `content.js` — основной редактируемый слой контента: hero, метрики, кейсы, leadership, CTA, контакты.
- `script.js` — рендеринг секций из `content.js`, reveal-анимации, активная навигация.
- `styles.css` — визуальная система и адаптивная верстка.
- `assets/docs/popov-resume.pdf` — актуальное резюме.
- `assets/images/profile.jpg` — исходный портрет.
- `assets/images/profile-hero.jpg` — уменьшенная версия портрета для hero.
- `assets/images/og-preview.svg` — social preview для Open Graph и Twitter.
- `assets/images/favicon.svg` — favicon.

## Что менять чаще всего

- Тексты, цифры, CTA, контакты, trust marks, кейсы:
  `content.js`
- Визуальную систему, сетку, стили секций:
  `styles.css`
- Social preview и favicon:
  `assets/images/og-preview.svg`, `assets/images/favicon.svg`
- Резюме:
  `assets/docs/popov-resume.pdf`
- Портрет:
  `assets/images/profile.jpg`
- Hero-версия портрета:
  `assets/images/profile-hero.jpg`

## Локальный просмотр

```bash
python3 -m http.server 8080
```

Открой [http://localhost:8080](http://localhost:8080).

## Публикация на GitHub Pages

1. Запушить изменения в `main`.
2. В GitHub открыть `Settings` -> `Pages`.
3. В `Build and deployment` выбрать `Deploy from a branch`.
4. Указать `main` и `/ (root)`.
5. Дождаться публикации на `https://adikant.github.io/`.

## Правила для публичной версии

- Не публиковать реальные внутренние Jira-скриншоты, dashboard screenshots и другие конфиденциальные визуалы.
- Не добавлять `TODO`, placeholders и незаполненные секции.
- Не придумывать новые цифры: использовать только подтвержденные факты.
- Если метрика спорная, выбирать более консервативную формулировку.
