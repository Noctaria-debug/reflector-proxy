// =============================================================
// Reflector Proxy Server - Full Verified + OAuth Demo Edition (2026)
// ✅ Ready for Google OAuth Verification
// =============================================================

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// =============================================================
// 🧠 Core Initialization
// =============================================================
const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🪞 Reflector Proxy Server starting...");

// =============================================================
// 🔹 Static Pages & Verification Files
// =============================================================

// Google 所有確認ファイル
app.get("/google7bda259bbc2508a5.html", (req, res) => {
  const filePath = path.join(__dirname, "google7bda259bbc2508a5.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Google verification file not found");
  }
});

// Privacy Policy
app.get("/privacy.html", (req, res) => {
  const filePath = path.join(__dirname, "privacy.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.send(`
      <!DOCTYPE html><html lang="en">
      <head><meta charset="UTF-8"><title>Privacy Policy - Reflector Chronicle Bridge</title></head>
      <body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
      <h1>Privacy Policy</h1>
      <p>Last updated: January 2026</p>
      <h2>Overview</h2>
      <p>Reflector Chronicle Bridge provides secure synchronization between Chronicle memory systems and Google Drive.</p>
      <h2>Data We Access</h2>
      <ul>
        <li>Google Drive metadata (file names, timestamps, IDs)</li>
        <li>Chronicle reflection files explicitly authorized by the user</li>
      </ul>
      <h2>Compliance</h2>
      <p>Use and transfer of Google API information adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>
      <h2>Data Retention</h2>
      <p>No Google user data is permanently stored. Data is processed in memory only during synchronization.</p>
      <h2>Contact</h2>
      <p>Email: support@reflector-proxy.onrender.com</p>
      <p><a href="/">← Back to Home</a></p>
      </body></html>
    `);
  }
});

// Terms of Service
app.get("/terms.html", (req, res) => {
  const filePath = path.join(__dirname, "terms.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.send(`
      <!DOCTYPE html><html lang="en">
      <head><meta charset="UTF-8"><title>Terms of Service - Reflector Chronicle Bridge</title></head>
      <body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
      <h1>Terms of Service</h1>
      <p>By using Reflector Chronicle Bridge, you agree to authorized Chronicle and Google Drive access only.</p>
      <p>No warranty or guarantee of uptime is provided.</p>
      <p>Email: support@reflector-proxy.onrender.com</p>
      <p><a href="/">← Back to Home</a></p>
      </body></html>
    `);
  }
});

// =============================================================
// 🔄 Chronicle Sync Bridge
// =============================================================
app.post("/chronicle/sync", async (req, res) => {
  try {
    const payload = req.body || {};
    const apiUrl =
      process.env.API_URL ||
      "https://reflector-api.onrender.com/chronicle/sync";
    const apiKey = process.env.REFLECTOR_API_KEY;

    const { default: fetch } = await import("node-fetch");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey || "",
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let apiResponse;
    try {
      apiResponse = JSON.parse(text);
    } catch {
      apiResponse = { raw: text };
    }

    res.json({
      ok: true,
      message: "Data relayed via Reflector Proxy",
      target: apiUrl,
      response: apiResponse,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =============================================================
// 🔐 OAuth Demo Page (審査専用)
// =============================================================
app.get("/demo", (req, res) => {
  res.send(`
    <!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Reflector Chronicle Bridge - OAuth Demo</title>
      <link rel="canonical" href="https://reflector-proxy.onrender.com/demo" />
      <style>
        body { font-family: sans-serif; text-align: center; padding: 3em; line-height: 1.6; }
        button { font-size: 1.2em; padding: 0.8em 1.4em; border-radius: 8px; border: none; background: #4285F4; color: white; cursor: pointer; }
        button:hover { background: #357AE8; }
      </style>
    </head>
    <body>
      <h1>Reflector Chronicle Bridge</h1>
      <p>This demo page shows the OAuth consent screen flow for verification purposes.</p>
      <a href="https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=https://reflector-proxy.onrender.com/oauth2callback&response_type=code&scope=https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly&access_type=offline">
        <button>Sign in with Google</button>
      </a>
      <p style="margin-top:2em;">
        <a href="/">← Back to Home</a>
      </p>
    </body></html>
  `);
});

// =============================================================
// ✅ Root Homepage
// =============================================================
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html><html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Reflector Chronicle Bridge</title>
      <link rel="canonical" href="https://reflector-proxy.onrender.com/" />
    </head>
    <body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
      <h1>Reflector Chronicle Bridge</h1>
      <p>The Reflector Proxy API is active and functioning.</p>
      <p>This service connects Second Chronicle reflection and memory data with Google Drive APIs for secure synchronization.</p>
      <p><a href="/privacy.html">Privacy Policy</a> | <a href="/terms.html">Terms of Service</a></p>
      <p>Contact: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>
      <p><a href="/demo">→ View OAuth Demo Page</a></p>
      <p style="margin-top:3em;font-size:0.9em;color:gray;">© 2026 Reflector Chronicle Bridge<br>Last updated: January 2026</p>
    </body></html>
  `);
});

// =============================================================
// 🚀 Render Port Binding
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Reflector Proxy running on port ${PORT}`);
});