/* eslint-disable no-console */
const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

function sh(cmd) {
  try { return execSync(cmd, { stdio: ["ignore","pipe","pipe"] }).toString().trim(); }
  catch (e) { return (e && e.stdout && e.stdout.toString()) || ""; }
}

const lastCommit = sh("git log -1 --oneline") || "n/a";
const branch = sh("git rev-parse --abbrev-ref HEAD") || "n/a";
const nodev = process.version;

function rslv(mod){
  try { return require.resolve(mod, { paths: [process.cwd()] }); } catch { return "not found"; }
}
const reactPath = rslv("react");
const reactDomPath = rslv("react-dom");

// Supabase ref discovery
let projectRef = process.env.SUPABASE_PROJECT_ID || "";
const cfgPath = path.join(process.cwd(), "supabase", "config.toml");
if (!projectRef && fs.existsSync(cfgPath)) {
  const txt = fs.readFileSync(cfgPath, "utf8");
  const m = txt.match(/project_id\s*=\s*"([a-z0-9]{20})"/);
  if (m) projectRef = m[1];
}
if (!projectRef) {
  const json = sh("supabase projects list --format json");
  try {
    const arr = JSON.parse(json);
    if (Array.isArray(arr) && arr.length && typeof arr[0]?.project_ref === "string") {
      projectRef = arr[0].project_ref;
    }
  } catch {}
}

const out = [
  "[OPS] Error Intake",
  "Context: <fill route/file>",
  "Action: <what you did>",
  "Env: Codespaces dev 5173",
  "Error (first 2 lines):",
  "<paste two red lines from console or terminal>",
  "Last commit/PR:",
  `${lastCommit} | ${branch}`,
  "",
  "— Extras —",
  `Node: ${nodev}`,
  `React: ${reactPath}`,
  `ReactDOM: ${reactDomPath}`,
  `Supabase project ref guess: ${projectRef || "NOT FOUND"}`
].join("\n");

console.log(out);
if (/^[a-z0-9]{20}$/.test(projectRef)) {
  console.error(`\nHint: export SUPABASE_PROJECT_ID=${projectRef} && pnpm run typegen:supabase`);
}