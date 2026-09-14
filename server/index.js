import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import { fileURLToPath } from "url";
import { readDB, writeDB } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "15mb" }));
app.use("/uploads", express.static(UPLOAD_DIR));

// ---------------------------------------------------------------- helpers
function makeToken(user) {
  return Buffer.from(JSON.stringify({ id: user.id, username: user.username })).toString(
    "base64url"
  );
}

function auth(req, res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  try {
    const payload = JSON.parse(Buffer.from(token, "base64url").toString("utf-8"));
    const db = readDB();
    const user = db.users.find((u) => u.id === payload.id);
    if (!user) throw new Error("no user");
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid session" });
  }
}

function isSameDay(ts1, ts2) {
  const a = new Date(ts1);
  const b = new Date(ts2);
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function flattenVisible(questions, answers = {}) {
  let out = [];
  for (const q of questions) {
    out.push(q);
    if (q.children && answers[q.id] === "yes") {
      out = out.concat(flattenVisible(q.children, answers));
    }
  }
  return out;
}

function isAnswered(q, value) {
  if (value === undefined || value === null || value === "") return false;
  if (q.type === "toggle") return value === "yes" || value === "no";
  return true;
}

function progressFor(questions, answers = {}) {
  const visible = flattenVisible(questions, answers).filter((q) => q.required);
  const attempted = visible.filter((q) => isAnswered(q, answers[q.id])).length;
  return { attempted, total: visible.length };
}

// ------------------------------------------------------------------ auth
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body || {};
  const db = readDB();
  const user = db.users.find((u) => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid username or password" });
  res.json({
    token: makeToken(user),
    user: { id: user.id, username: user.username, name: user.name },
  });
});

app.get("/api/me", auth, (req, res) => {
  res.json({ id: req.user.id, username: req.user.username, name: req.user.name });
});

// ------------------------------------------------------------ survey types
app.get("/api/survey-types", auth, (req, res) => {
  const db = readDB();
  const today = Date.now();

  const types = db.surveyTypes.map((st) => {
    const sites = db.sites.filter((s) => s.surveyTypeId === st.id);
    const visitsToday = db.visits.filter(
      (v) => v.surveyTypeId === st.id && isSameDay(v.submittedAt, today)
    );
    const sitesVisitedToday = new Set(visitsToday.map((v) => v.siteId));
    return {
      id: st.id,
      slug: st.slug,
      name: st.name,
      categoryId: st.categoryId,
      totalSites: sites.length,
      pendingCount: Math.max(sites.length - sitesVisitedToday.size, 0),
      completedCount: sitesVisitedToday.size,
      hasHistory: db.visits.some((v) => v.surveyTypeId === st.id),
    };
  });

  const categories = db.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    total: types
      .filter((t) => t.categoryId === cat.id)
      .reduce((sum, t) => sum + t.completedCount, 0),
    types: types.filter((t) => t.categoryId === cat.id),
  }));

  res.json({ categories });
});

app.get("/api/survey-types/:slug", auth, (req, res) => {
  const db = readDB();
  const st = db.surveyTypes.find((s) => s.slug === req.params.slug);
  if (!st) return res.status(404).json({ error: "Survey type not found" });

  const sites = db.sites
    .filter((s) => s.surveyTypeId === st.id)
    .map((s) => {
      const visits = db.visits.filter((v) => v.siteId === s.id);
      const visitedToday = visits.some((v) => isSameDay(v.submittedAt, Date.now()));
      return {
        ...s,
        visitCount: visits.length,
        visitedToday,
        lastVisitAt: visits.length ? Math.max(...visits.map((v) => v.submittedAt)) : null,
      };
    });

  res.json({ ...st, sites });
});

// ------------------------------------------------------------------ sites
app.get("/api/sites/:siteId/visits", auth, (req, res) => {
  const db = readDB();
  const site = db.sites.find((s) => s.id === req.params.siteId);
  if (!site) return res.status(404).json({ error: "Site not found" });
  const st = db.surveyTypes.find((s) => s.id === site.surveyTypeId);

  const visits = db.visits
    .filter((v) => v.siteId === site.id)
    .sort((a, b) => b.submittedAt - a.submittedAt)
    .map((v, idx, arr) => ({
      id: v.id,
      label: `Visit ${String(arr.length - idx).padStart(2, "0")}`,
      submittedAt: v.submittedAt,
      durationSeconds: v.durationSeconds,
    }));

  res.json({ site, surveyType: { slug: st.slug, name: st.name }, visits });
});

app.get("/api/visits/:id", auth, (req, res) => {
  const db = readDB();
  const visit = db.visits.find((v) => v.id === req.params.id);
  if (!visit) return res.status(404).json({ error: "Visit not found" });
  const st = db.surveyTypes.find((s) => s.id === visit.surveyTypeId);
  const site = db.sites.find((s) => s.id === visit.siteId);
  res.json({ ...visit, surveyType: { slug: st.slug, name: st.name, questions: st.questions }, site });
});

// ---------------------------------------------------------------- visits
app.post("/api/visits", auth, (req, res) => {
  const { surveyTypeSlug, siteId, answers, durationSeconds } = req.body || {};
  const db = readDB();
  const st = db.surveyTypes.find((s) => s.slug === surveyTypeSlug);
  if (!st) return res.status(404).json({ error: "Survey type not found" });
  const site = db.sites.find((s) => s.id === siteId);
  if (!site) return res.status(404).json({ error: "Site not found" });

  const { attempted, total } = progressFor(st.questions, answers || {});
  if (attempted < total) {
    return res.status(400).json({ error: "Please answer all required questions before submitting." });
  }

  const visit = {
    id: crypto.randomUUID(),
    surveyTypeId: st.id,
    siteId: site.id,
    userId: req.user.id,
    answers: answers || {},
    durationSeconds: durationSeconds || 0,
    submittedAt: Date.now(),
  };
  db.visits.push(visit);
  writeDB(db);
  res.status(201).json(visit);
});

// ---------------------------------------------------------------- upload
app.post("/api/upload", auth, (req, res) => {
  const { dataUrl } = req.body || {};
  if (!dataUrl || !dataUrl.startsWith("data:")) {
    return res.status(400).json({ error: "dataUrl is required" });
  }
  const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
  if (!match) return res.status(400).json({ error: "Unsupported image format" });
  const ext = match[1].split("/")[1].replace("jpeg", "jpg");
  const buffer = Buffer.from(match[2], "base64");
  const filename = `${crypto.randomUUID()}.${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
  res.status(201).json({ url: `/uploads/${filename}` });
});

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Oil survey API listening on http://localhost:${PORT}`);
});
