# adikant.github.io

Публичное портфолио Александра Попова (BI & Analytics Lead) для GitHub Pages.

## Что внутри

- `index.html` — основная страница портфолио.
- `styles.css` — стили и адаптивная верстка.
- `script.js` — анимации появления, фильтрация кейсов и карусель дашбордов.
- `assets/docs/` — резюме (PDF).
- `assets/images/` — фото профиля и примеры дашбордов.

## Локальный просмотр

```bash
python3 -m http.server 8080
```

Открой [http://localhost:8080](http://localhost:8080).

## Публикация на GitHub Pages

1. Запушить репозиторий в GitHub (`main` branch).
2. В GitHub открыть `Settings` -> `Pages`.
3. В `Build and deployment` выбрать:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` и `/ (root)`
4. Сохранить и дождаться публикации.
5. Ссылка будет в формате `https://<username>.github.io/`.

## Что обычно обновлять

- Текущую роль и метрики в `index.html` (секции `#impact`, `#cases`, `#experience`).
- Актуальное резюме в `assets/docs/popov-resume.pdf`.
- Новые изображения дашбордов в `assets/images/`.
- Контакты в секции `#contact`.
