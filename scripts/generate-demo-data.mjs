import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(rootDir, "demo-data");

let seed = 20260625;

function random() {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}

function pick(values) {
  return values[Math.floor(random() * values.length)];
}

function number(min, max) {
  return Math.round(min + random() * (max - min));
}

function csv(rows) {
  return rows
    .map((row) =>
      row
        .map((value) => {
          const text = String(value);
          return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
        })
        .join(",")
    )
    .join("\n")
    .concat("\n");
}

function month(index) {
  const date = new Date(Date.UTC(2026, index, 1));
  return date.toISOString().slice(0, 10);
}

function buildSalesFunnel() {
  const rows = [["month", "channel", "region", "leads", "orders", "revenue_plan", "revenue_fact"]];
  const channels = ["web", "retail", "partner", "direct"];
  const regions = ["north", "south", "central", "east"];

  for (let m = 0; m < 12; m += 1) {
    for (const channel of channels) {
      const leads = number(420, 1400);
      const conversion = 0.08 + random() * 0.18;
      const orders = Math.round(leads * conversion);
      const plan = number(1800, 6800) * 1000;
      const fact = Math.round(plan * (0.84 + random() * 0.34));
      rows.push([month(m), channel, pick(regions), leads, orders, plan, fact]);
    }
  }

  return csv(rows);
}

function buildFleetUsage() {
  const rows = [["date", "vehicle_group", "usage_hours", "distance_km", "idle_hours", "availability_pct"]];
  const groups = ["alpha", "beta", "gamma", "delta"];

  for (let day = 1; day <= 90; day += 1) {
    const date = new Date(Date.UTC(2026, 0, day)).toISOString().slice(0, 10);
    for (const group of groups) {
      const usage = number(18, 86);
      const distance = number(80, 520);
      const idle = number(2, 28);
      const availability = number(76, 99);
      rows.push([date, group, usage, distance, idle, availability]);
    }
  }

  return csv(rows);
}

function buildBudgetPlanFact() {
  const rows = [["month", "function", "category", "plan_amount", "fact_amount"]];
  const functions = ["finance", "operations", "product", "customer", "people"];
  const categories = ["software", "services", "equipment", "training", "support"];

  for (let m = 0; m < 12; m += 1) {
    for (const fn of functions) {
      const plan = number(800, 5200) * 1000;
      const fact = Math.round(plan * (0.82 + random() * 0.36));
      rows.push([month(m), fn, pick(categories), plan, fact]);
    }
  }

  return csv(rows);
}

function buildDataQuality() {
  const rows = [["date", "dataset", "freshness_hours", "completeness_pct", "anomaly_count", "check_status"]];
  const datasets = ["sales_demo", "fleet_demo", "budget_demo", "support_demo", "quality_demo"];
  const statuses = ["green", "yellow", "red"];

  for (let day = 1; day <= 60; day += 1) {
    const date = new Date(Date.UTC(2026, 2, day)).toISOString().slice(0, 10);
    for (const dataset of datasets) {
      const freshness = number(1, 28);
      const completeness = number(91, 100);
      const anomalies = number(0, 12);
      rows.push([date, dataset, freshness, completeness, anomalies, pick(statuses)]);
    }
  }

  return csv(rows);
}

const readme = `# Demo Data

These CSV files are deterministic synthetic data for future public dashboard examples.

- Fixed seed: 20260625
- Data is created from scratch
- No employer data, closed system names, customer names, employee names, access data, or closed URLs
- Generated files are safe to publish, but dashboard pages must stay hidden until a reviewed example is marked as published in content.js

Files:

- sales_funnel.csv - sales, orders, plan and fact by generic channel and region
- fleet_usage.csv - generic fleet usage and availability
- budget_plan_fact.csv - budget plan and fact by generic function and category
- data_quality_monitoring.csv - freshness, completeness and anomaly checks for generic datasets
`;

await mkdir(outDir, { recursive: true });
await writeFile(path.join(outDir, "sales_funnel.csv"), buildSalesFunnel(), "utf8");
await writeFile(path.join(outDir, "fleet_usage.csv"), buildFleetUsage(), "utf8");
await writeFile(path.join(outDir, "budget_plan_fact.csv"), buildBudgetPlanFact(), "utf8");
await writeFile(path.join(outDir, "data_quality_monitoring.csv"), buildDataQuality(), "utf8");
await writeFile(path.join(outDir, "README.md"), readme, "utf8");

console.log("Generated deterministic synthetic demo data in demo-data/.");
