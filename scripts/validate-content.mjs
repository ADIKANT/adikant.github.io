import { execFile as execFileCallback } from "node:child_process";
import { access, readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { portfolioContent as content } from "../content.js";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const execFile = promisify(execFileCallback);
const errors = [];

const architectureStages = [
  ["Источники", ["Database", "CRM", "Excel", "API", "Kafka"]],
  ["Обработка", ["Flink", "Airflow", "PySpark", "Python", "SQL"]],
  ["LakeHouse", ["S3", "PostgreSQL", "Microsoft SQL", "ClickHouse", "Iceberg"]],
  ["Serving", ["DataLens", "Superset", "Power BI", "DBeaver", "Trino"]],
  ["Governance", ["OpenMetadata", "Data quality", "Metrics", "Access control", "Lineage"]]
];

const draftMarkers = [/[T]ODO/i, /FIX[M]E/i];
const sensitiveWords = [
  new RegExp(["to", "ken"].join(""), "i"),
  new RegExp(["sec", "ret"].join(""), "i"),
  new RegExp(["pass", "word"].join(""), "i"),
  new RegExp(["cred", "ential"].join(""), "i")
];
const localHostWord = new RegExp(["local", "host"].join(""), "i");
const closedUrl = new RegExp(
  [
    ["ji", "ra\\."].join(""),
    ["con", "fluence\\."].join(""),
    ["git", "lab\\.int"].join(""),
    ["gra", "fana\\.int"].join(""),
    ["ti", "me\\."].join(""),
    ["e-", "kama\\.com"].join("")
  ].join("|"),
  "i"
);

function fail(message) {
  errors.push(message);
}

async function exists(relativePath) {
  try {
    await access(path.join(rootDir, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function read(relativePath) {
  return readFile(path.join(rootDir, relativePath), "utf8");
}

async function walk(dir, predicate = () => true) {
  const out = [];
  const absolute = path.join(rootDir, dir);
  const entries = await readdir(absolute, { withFileTypes: true });

  for (const entry of entries) {
    const relative = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...(await walk(relative, predicate)));
    } else if (predicate(relative)) {
      out.push(relative);
    }
  }

  return out;
}

function stripUrl(url) {
  return url.split("#")[0].split("?")[0];
}

function idsIn(html) {
  return new Set([...html.matchAll(/\sid=["']([^"']+)["']/g)].map((match) => match[1]));
}

function pngSize(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    return null;
  }
  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20)
  };
}

function normalizeText(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ");
}

async function trackedFiles(paths) {
  try {
    const { stdout } = await execFile("git", ["ls-files", ...paths], { cwd: rootDir });
    return stdout.split("\n").filter(Boolean);
  } catch {
    return [];
  }
}

async function validateContentModel() {
  const slugs = new Set();

  for (const caseItem of content.cases) {
    const required = [
      "slug",
      "company",
      "period",
      "title",
      "lead",
      "context",
      "problem",
      "task",
      "role",
      "actions",
      "results",
      "attribution",
      "tools",
      "evidence",
      "measurement"
    ];

    for (const field of required) {
      if (!caseItem[field] || (Array.isArray(caseItem[field]) && caseItem[field].length === 0)) {
        fail(`Case ${caseItem.slug || caseItem.title} is missing ${field}`);
      }
    }

    const problem = normalizeText(caseItem.problem);
    const context = normalizeText(caseItem.context);
    const task = normalizeText(caseItem.task);

    if (!problem) {
      fail(`Case ${caseItem.slug} problem must not be empty`);
    }
    if (problem && problem === context) {
      fail(`Case ${caseItem.slug} problem must differ from context`);
    }
    if (problem && problem === task) {
      fail(`Case ${caseItem.slug} problem must differ from task`);
    }

    if (slugs.has(caseItem.slug)) {
      fail(`Duplicate case slug: ${caseItem.slug}`);
    }
    slugs.add(caseItem.slug);

    if (caseItem.results.length > 3) {
      fail(`Case ${caseItem.slug} has more than three results`);
    }

    for (const result of caseItem.results) {
      for (const field of ["value", "unit", "scale", "explanation", "type"]) {
        if (!result[field]) {
          fail(`Case ${caseItem.slug} result is missing ${field}`);
        }
      }
    }
  }

  const statuses = new Set(["draft", "review", "published"]);
  const dashboardSlugs = new Set();

  for (const example of content.dashboardExamples) {
    if (!statuses.has(example.status)) {
      fail(`Dashboard ${example.slug} has invalid status: ${example.status}`);
    }
    if (dashboardSlugs.has(example.slug)) {
      fail(`Duplicate dashboard slug: ${example.slug}`);
    }
    dashboardSlugs.add(example.slug);

    if (example.status === "published") {
      const required = [
        "title",
        "businessQuestion",
        "audience",
        "decisions",
        "metrics",
        "personalRole",
        "previewImage",
        "embedUrl",
        "fullScreenUrl",
        "syntheticDataNote"
      ];
      for (const field of required) {
        if (!example[field] || (Array.isArray(example[field]) && example[field].length === 0)) {
          fail(`Published dashboard ${example.slug} is missing ${field}`);
        }
      }
      if (!/^https:\/\//.test(example.embedUrl || "")) {
        fail(`Published dashboard ${example.slug} embedUrl must be HTTPS`);
      }
      if (!/^https:\/\//.test(example.fullScreenUrl || "")) {
        fail(`Published dashboard ${example.slug} fullScreenUrl must be HTTPS`);
      }
      if (example.previewImage && !(await exists(stripUrl(example.previewImage).replace(/^\//, "")))) {
        fail(`Published dashboard ${example.slug} preview image is missing`);
      }
    }
  }
}

async function validateHtml() {
  const htmlFiles = ["index.html", ...(await walk("cases", (file) => file.endsWith(".html")))];
  const publicTextFiles = [
    ...htmlFiles,
    "content.js",
    "script.js",
    "styles.css",
    "robots.txt",
    "sitemap.xml",
    "README.md",
    "AGENTS.md",
    ...(await walk("memory-bank", (file) => file.endsWith(".md") && !file.includes(`${path.sep}archive${path.sep}`)))
  ];
  const forbiddenPublicTextPatterns = [
    [/Запросов становилось больше, и бизнесу нужен был понятный способ договориться/i, "contains removed request-growth wording"],
    [/Без общего процесса было сложнее согласовывать приоритеты/i, "contains removed process wording"],
    [/личн(?:ых|ые)\s+договоренност/i, "contains personal-agreements wording"],
    [/Публично безопасные материалы/i, "contains prompt artifact materials wording"],
    [/Тип результата:/i, "contains technical result type wording"],
    [/50\+\s*дашборд/i, "contains removed old dashboard count"],
    [/30\+\s*бизнес-команд/i, "contains old public business-team count"],
    [/промышленн(?:ого|ое|ый|ая)\s+BI/i, "contains heavy industrial BI wording"],
    [/не\s+просто/i, "contains contrast-slogan wording"],
    [/измеримый эффект/i, "contains banned effect wording"],
    [/управляемый контур/i, "contains banned managed-contour wording"],
    [/экосистема ценности/i, "contains banned value-ecosystem wording"],
    [/4500/i, "contains removed object-scale metric"],
    [/250\+?\s*витрин/i, "contains removed mart-scale metric"],
    [/10\s*ТБ/i, "contains removed data-volume metric"],
    [/600\s*(млн|million|м)/i, "contains removed Mars financial metric"]
  ];

  for (const file of publicTextFiles) {
    const text = await read(file);
    const publicSiteFile = /\.(html|css|js|xml|txt)$/.test(file);

    if (draftMarkers.some((pattern) => pattern.test(text))) {
      fail(`${file} contains a draft marker`);
    }
    if (/\/Users\//.test(text)) {
      fail(`${file} contains an absolute local path`);
    }
    if (publicSiteFile && localHostWord.test(text)) {
      fail(`${file} contains a local host reference`);
    }
    if (/900\s*(млн|million|м)/i.test(text)) {
      fail(`${file} contains a removed financial aggregate`);
    }
    if (sensitiveWords.some((pattern) => pattern.test(text))) {
      fail(`${file} contains a sensitive marker word`);
    }
    if (/jsdelivr|cdn\.js|apache\.org/i.test(text)) {
      fail(`${file} references an external CDN or external icon source`);
    }
    if (closedUrl.test(text)) {
      fail(`${file} contains a closed URL`);
    }
    for (const [pattern, message] of forbiddenPublicTextPatterns) {
      if (pattern.test(text)) {
        fail(`${file} ${message}`);
      }
    }
  }

  for (const htmlFile of htmlFiles) {
    const html = await read(htmlFile);
    const ids = idsIn(html);
    const h1Count = (html.match(/<h1[\s>]/g) || []).length;

    if (h1Count !== 1) {
      fail(`${htmlFile} must contain exactly one H1, found ${h1Count}`);
    }
    if (!html.includes('type="application/ld+json"')) {
      fail(`${htmlFile} is missing static JSON-LD`);
    }
    if (!html.includes('rel="canonical"')) {
      fail(`${htmlFile} is missing canonical`);
    }
    if (/<(div|section)[^>]+id=["'][^"']+["'][^>]*>\s*<\/\1>/.test(html)) {
      fail(`${htmlFile} contains an empty generated container`);
    }

    const refs = [...html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)].map((match) => match[1]);
    for (const ref of refs) {
      if (/^(https?:|mailto:|tel:|data:)/.test(ref)) {
        continue;
      }

      if (ref.startsWith("#")) {
        const id = ref.slice(1);
        if (id && !ids.has(id)) {
          fail(`${htmlFile} links to missing anchor ${ref}`);
        }
        continue;
      }

      const [targetPath, anchor] = ref.split("#");
      const stripped = stripUrl(targetPath);
      if (!stripped) {
        continue;
      }

      if (anchor) {
        const targetHtml = stripped === "/" ? await read("index.html") : html;
        const targetIds = idsIn(targetHtml);
        if (!targetIds.has(anchor)) {
          fail(`${htmlFile} links to missing anchor ${ref}`);
        }
      }

      const relative = stripped.startsWith("/")
        ? stripped.slice(1)
        : path.normalize(path.join(path.dirname(htmlFile), stripped));
      const fileTarget = relative.endsWith("/") || relative === "" ? path.join(relative, "index.html") : relative;

      if (!(await exists(fileTarget))) {
        fail(`${htmlFile} links to missing local file ${ref}`);
      }
    }
  }

  await validatePublicSurface(htmlFiles);
}

async function validatePublicSurface(htmlFiles) {
  const htmlByFile = new Map();
  for (const file of htmlFiles) {
    htmlByFile.set(file, await read(file));
  }
  const combinedHtml = [...htmlByFile.values()].join("\n");

  const forbiddenHtmlPatterns = [
    [/minelik4@gmail\.com/i, "generated HTML contains public email"],
    [/mailto:/i, "generated HTML contains mailto link"],
    [/Запросов становилось больше, и бизнесу нужен был понятный способ договориться/i, "generated HTML contains removed request-growth wording"],
    [/Без общего процесса было сложнее согласовывать приоритеты/i, "generated HTML contains removed process wording"],
    [/Публично безопасные материалы/i, "case pages contain the prompt artifact materials block"],
    [/Тип результата:/i, "case pages contain technical result type text"],
    [/личн(?:ых|ые)\s+договоренност/i, "public copy contains the personal-agreements wording"],
    [/BI как управляемая функция/i, "public HTML contains old positioning"],
    [/Head of BI\s*\/\s*Head of Analytics/i, "public HTML contains old slash positioning"],
    [/30\+\s*бизнес-команд/i, "public HTML contains old business-team count"],
    [/промышленн(?:ого|ое|ый|ая)\s+BI/i, "public HTML contains heavy industrial BI wording"],
    [/не\s+просто/i, "public HTML contains contrast-slogan wording"],
    [/измеримый эффект/i, "public HTML contains banned effect wording"],
    [/управляемый контур/i, "public HTML contains banned managed-contour wording"],
    [/экосистема ценности/i, "public HTML contains banned value-ecosystem wording"],
    [/900\s*(млн|million|м)/i, "public HTML contains a removed financial aggregate"],
    [/id=["']platform["']|href=["']#platform["']|>Платформа</i, "public HTML contains a standalone platform section or navigation"],
    [/>скоро</i, "public HTML contains a placeholder soon label"],
    [/<iframe[\s>]/i, "public HTML contains an iframe while there are no published dashboards"],
    [/codex-goal/i, "public HTML references codex-goal"],
    [/portfolio-goal/i, "public HTML references portfolio-goal"],
    [/\/Users\//i, "public HTML contains an absolute local path"]
  ];

  for (const [pattern, message] of forbiddenHtmlPatterns) {
    if (pattern.test(combinedHtml)) {
      fail(message);
    }
  }

  if (publishedDashboardsCount() === 0) {
    if (combinedHtml.includes('id="dashboards"') || combinedHtml.includes(">Дашборды<")) {
      fail("Dashboard section or navigation is present while there are no published examples");
    }
    if (await exists("dashboards/index.html")) {
      fail("dashboards/index.html exists while there are no published examples");
    }
  }

  const indexHtml = htmlByFile.get("index.html") || "";
  if (!indexHtml.includes(content.contact.telegramUrl)) {
    fail("Home page is missing Telegram CTA");
  }
  if (!indexHtml.includes(content.assets.resume)) {
    fail("Home page is missing PDF resume CTA");
  }
  if (!indexHtml.includes(content.contact.hhResume.href)) {
    fail("Home page is missing HeadHunter CTA");
  }

  for (const caseItem of content.cases) {
    const casePath = path.join("cases", caseItem.slug, "index.html");
    const caseHtml = htmlByFile.get(casePath) || "";
    const href = `/cases/${caseItem.slug}/`;
    const linkIndex = indexHtml.indexOf(`href="${href}"`);
    const articleStart = linkIndex === -1 ? -1 : indexHtml.lastIndexOf("<article", linkIndex);
    const articleEnd = linkIndex === -1 ? -1 : indexHtml.indexOf("</article>", linkIndex);
    const cardHtml = articleStart === -1 || articleEnd === -1 ? "" : indexHtml.slice(articleStart, articleEnd);

    if (!cardHtml) {
      fail(`Home page case card is missing for ${caseItem.slug}`);
    } else {
      if (!cardHtml.includes(caseItem.problem)) {
        fail(`Home page case card for ${caseItem.slug} must render problem`);
      }
      if (cardHtml.includes(caseItem.context)) {
        fail(`Home page case card for ${caseItem.slug} renders context instead of problem`);
      }
    }

    if (!caseHtml.includes("<h2>Проблема</h2>")) {
      fail(`${casePath} is missing the Problem section heading`);
    }
    if (!caseHtml.includes(caseItem.problem)) {
      fail(`${casePath} is missing the case problem text`);
    }
    if (!caseHtml.includes(content.contact.telegramUrl)) {
      fail(`${casePath} is missing Telegram CTA`);
    }
    if (!caseHtml.includes(content.assets.resume)) {
      fail(`${casePath} is missing PDF resume CTA`);
    }
    if (!caseHtml.includes(content.contact.hhResume.href)) {
      fail(`${casePath} is missing HeadHunter CTA`);
    }
    if (!/rel=["']noopener noreferrer["']/.test(caseHtml)) {
      fail(`${casePath} external CTAs must use rel="noopener noreferrer"`);
    }
  }
}

async function validateSocialPreview() {
  const svg = await read("assets/images/og-preview.svg");
  const siteFields = JSON.stringify(content.site);
  const previewText = `${svg}\n${siteFields}`;
  const indexHtml = await read("index.html");
  const expectedOgImage = `${content.site.baseUrl.replace(/\/$/, "")}${content.site.ogImage}`;
  const forbiddenPreviewPatterns = [
    [/Head of BI\s*\/\s*Head of Analytics/i, "social preview contains old slash positioning"],
    [/BI как управляемая функция/i, "social preview contains old BI-function positioning"],
    [/50\+\s*дашборд/i, "social preview contains old dashboard count"],
    [/30\+\s*бизнес-команд/i, "social preview contains old business-team count"],
    [/300\s*млн/i, "social preview contains financial metric"]
  ];

  if (content.site.ogImage !== "/assets/images/og-preview-v3.png") {
    fail("site.ogImage must point to the cache-busting og-preview-v3.png asset");
  }
  if (!content.site.socialTitle) {
    fail("site.socialTitle is missing");
  }
  if (!content.site.socialDescription) {
    fail("site.socialDescription is missing");
  }

  for (const [pattern, message] of forbiddenPreviewPatterns) {
    if (pattern.test(previewText)) {
      fail(message);
    }
  }

  for (const required of [
    "Александр Попов",
    "Руководитель отдела аналитики и BI",
    "BI-процесс",
    "self-service",
    "6 человек в команде",
    "20+ бизнес-команд",
    "200 активных пользователей BI"
  ]) {
    if (!svg.includes(required)) {
      fail(`social preview SVG is missing required text: ${required}`);
    }
  }

  if (!indexHtml.includes(`content="${expectedOgImage}"`)) {
    fail("index.html social meta must reference og-preview-v3.png");
  }
  if (indexHtml.includes("og-preview-v2.png")) {
    fail("index.html still references the old og-preview-v2.png asset");
  }
  for (const required of [content.site.socialTitle, content.site.socialDescription]) {
    if (!indexHtml.includes(required)) {
      fail(`index.html social meta is missing required text: ${required}`);
    }
  }

  const png = await readFile(path.join(rootDir, "assets/images/og-preview-v3.png"));
  const size = pngSize(png);
  if (!size || size.width !== 1200 || size.height !== 630) {
    fail("assets/images/og-preview-v3.png must be a 1200x630 PNG");
  }
}

async function validateArchitecture() {
  const html = await read("index.html");
  const sectionMatch = html.match(/<section class="architecture-section"[\s\S]*?<\/section>/);

  if (!sectionMatch) {
    fail("Architecture section is missing from index.html");
    return;
  }

  const architecture = sectionMatch[0];
  const stagePositions = architectureStages.map(([stage]) => architecture.indexOf(`>${stage}<`));

  if (stagePositions.some((position) => position === -1)) {
    fail("Architecture section is missing one or more required stages");
  }

  for (let index = 1; index < stagePositions.length; index += 1) {
    if (stagePositions[index] <= stagePositions[index - 1]) {
      fail("Architecture stages are not in the required order");
      break;
    }
  }

  for (const [stage, tools] of architectureStages) {
    for (const tool of tools) {
      if (!architecture.includes(`>${tool}<`)) {
        fail(`Architecture stage ${stage} is missing ${tool}`);
      }
    }
  }

  if (!architecture.includes('aria-label="Архитектурный контекст аналитической платформы"')) {
    fail("Architecture scroll container is missing aria-label");
  }
  if (!architecture.includes('aria-hidden="true"')) {
    fail("Architecture arrows must be decorative with aria-hidden");
  }
  const iconSources = [...architecture.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map((match) => match[1]);
  if (iconSources.length === 0) {
    fail("Architecture icons are missing");
  }
  if (iconSources.some((source) => !source.startsWith("/assets/icons/architecture/"))) {
    fail("Architecture icons must use local assets");
  }

  for (const [, tools] of architectureStages) {
    for (const tool of tools) {
      const icon = content.approach.architectureIcons?.[tool];
      if (!icon) {
        fail(`Architecture icon mapping is missing for ${tool}`);
      } else if (!architecture.includes(`/assets/icons/architecture/${icon}.svg`)) {
        fail(`Architecture icon for ${tool} is not rendered`);
      }
    }
  }

  if (html.includes('id="dashboards"') && !content.dashboardExamples.some((item) => item.status === "published")) {
    fail("Dashboard section is present while there are no published examples");
  }
  if (html.includes(">Дашборды<") && !content.dashboardExamples.some((item) => item.status === "published")) {
    fail("Dashboard navigation is present while there are no published examples");
  }
}

async function validateGeneratedState() {
  for (const caseItem of content.cases) {
    const casePath = path.join("cases", caseItem.slug, "index.html");
    if (!(await exists(casePath))) {
      fail(`Missing generated case page: ${casePath}`);
    }
  }

  if (!(await exists("robots.txt"))) {
    fail("robots.txt is missing");
  }
  if (!(await exists("sitemap.xml"))) {
    fail("sitemap.xml is missing");
  }

  const sitemap = await read("sitemap.xml");
  if (publishedDashboardsCount() === 0 && /dashboards/.test(sitemap)) {
    fail("sitemap.xml contains dashboard URLs while there are no published examples");
  }
}

function publishedDashboardsCount() {
  return content.dashboardExamples.filter((item) => item.status === "published").length;
}

async function validateAssets() {
  const required = [
    content.assets.portrait.src,
    content.assets.resume,
    content.site.favicon,
    content.site.ogImage,
    "/assets/icons/architecture/tool.svg",
    ...Object.values(content.approach.architectureIcons).map((icon) => `/assets/icons/architecture/${icon}.svg`)
  ];

  for (const asset of required) {
    const localPath = stripUrl(asset).replace(/^\//, "");
    const stats = await stat(path.join(rootDir, localPath)).catch(() => null);
    if (!stats?.isFile()) {
      fail(`Required asset is missing: ${asset}`);
    }
  }
}

async function validateArchitectureIconStyle() {
  const iconFiles = await walk("assets/icons/architecture", (file) => file.endsWith(".svg"));
  const allowedColors = new Set(["#173a34"]);

  for (const file of iconFiles) {
    const svg = await read(file);
    const colors = [...svg.matchAll(/#[0-9a-f]{3,8}/gi)].map((match) => match[0].toLowerCase());
    const unexpected = colors.filter((color) => !allowedColors.has(color));

    if (unexpected.length > 0) {
      fail(`${file} must use only the monochrome architecture icon color`);
    }

    if (/fill=["']#[0-9a-f]{3,8}["']/i.test(svg.replaceAll('fill="#173a34"', ""))) {
      fail(`${file} contains a colored fill outside the approved monochrome style`);
    }
  }
}

async function validateTrackedArtifacts() {
  const tracked = await trackedFiles([
    "codex-goal",
    "portfolio-goal",
    "memory-bank/archive",
    "screenshots",
    "demo-data/*.csv",
    "__MACOSX",
    ".DS_Store"
  ]);
  if (tracked.length > 0) {
    fail(`Working artifacts must not be tracked: ${tracked.join(", ")}`);
  }
}

await validateContentModel();
await validateHtml();
await validateSocialPreview();
await validateArchitecture();
await validateGeneratedState();
await validateAssets();
await validateArchitectureIconStyle();
await validateTrackedArtifacts();

if (errors.length > 0) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Content validation passed.");
