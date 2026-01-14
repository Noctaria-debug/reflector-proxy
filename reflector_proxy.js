// =============================================================
// Reflector Proxy Server - Full Integrated OAuth Edition (2026)
// ✅ Google OAuth + Reflector API + Drive Sync ready
// ✅ Read-only memory protection integrated
// =============================================================

import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

// =============================================================
// 🧠 Core Initialization
// =============================================================
const app = express();
app.use(cors());
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🪞 Reflector Proxy (Full OAuth + Read-Only Guard) starting...");

// =============================================================
// 🔐 Environment Variables
// =============================================================
const REFLECTOR_API_URL =
  process.env.REFLECTOR_API_URL ||
  "https://reflector-api.onrender.com/chronicle/sync";
const REFLECTOR_API_KEY = process.env.REFLECTOR_API_KEY;
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "https://reflector-proxy.onrender.com/oauth2callback";
const TOKEN_PATH = path.join(__dirname, "token.json");

// =============================================================
// 🔹 OAuth 2.0 Google Login
// =============================================================
app.get("/auth/google", (req, res) => {
  const scope = encodeURIComponent([
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/drive.metadata.readonly",
  ].join(" "));

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;

  console.log("🔗 Redirecting to Google OAuth...");
  res.redirect(url);
});

// =============================================================
// 🔁 OAuth2 Callback
// =============================================================
app.get("/oauth2callback", async (req, res) => {
  const code = req.query.code;
  if (!code) return res.status(400).send("Missing authorization code");

  try {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokens = await response.json();
    if (tokens.error) throw new Error(tokens.error_description || tokens.error);

    fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
    console.log("✅ OAuth tokens saved:", TOKEN_PATH);

    res.send(`
      <h2>✅ Reflector Chronicle Bridge is now authorized with Google Drive!</h2>
      <p>You can close this window and return to the app.</p>
    `);
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).send("OAuth Error: " + err.message);
  }
});

// =============================================================
// 🔄 /chronicle/sync - Proxy Bridge (read-only protection)
// =============================================================
app.post("/chronicle/sync", async (req, res) => {
  try {
    const payload = req.body || {};
    console.log("📤 Incoming sync payload:", payload);

    // 🧩 Read-only guard:
    // Avoid overwriting memory if the payload indicates a read operation or is nearly empty.
    const isReadOnly =
      payload.test === "read-memory" ||
      payload.mode === "read-only" ||
      Object.keys(payload).length <= 2;

    if (isReadOnly) {
      console.log("🛡️ Read-only request detected. Skipping write to Reflector API.");
      return res.json({
        ok: true,
        message: "Read-only mode: existing memory preserved.",
        timestamp: new Date().toISOString(),
      });
    }

    // 🔁 Forward write/update request to Reflector API
    const response = await fetch(REFLECTOR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": REFLECTOR_API_KEY || "",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.json({
      ok: true,
      message: "Data relayed to Reflector API successfully.",
      backend_response: data,
    });
  } catch (err) {
    console.error("Reflector sync error:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =============================================================
// 🌐 Root Home Page (審査対応版)
// =============================================================
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Reflector Chronicle Bridge</title>
      <link rel="canonical" href="https://reflector-proxy.onrender.com/" />
    </head>
    <body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
      <h1>Reflector Chronicle Bridge</h1>
      <p>This service connects Second Chronicle reflection data with Google Drive securely via OAuth 2.0.</p>
      <p><a href="/auth/google">→ Sign in with Google</a></p>
      <p><a href="/privacy.html">Privacy Policy</a> | <a href="/terms.html">Terms of Service</a></p>
      <p>Contact: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>
      <p style="margin-top:3em;font-size:0.9em;color:gray;">© 2026 Reflector Chronicle Bridge<br>Last updated: January 2026</p>
    </body></html>
  `);
});

// =============================================================
// 🚀 Start Server
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Reflector Proxy (OAuth + Read-Only Guard) running on port ${PORT}`);
});