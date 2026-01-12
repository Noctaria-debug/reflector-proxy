import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🪞 Reflector Proxy server (Final Compliance) starting...");

// =============================================================
// 🔹 Google Verification
// =============================================================
app.get("/google7bda259bbc2508a5.html", (req, res) => {
  const filePath = path.join(__dirname, "google7bda259bbc2508a5.html");
  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else res.status(404).send("Google verification file not found");
});

// =============================================================
// 🔹 Privacy Policy
// =============================================================
app.get("/privacy.html", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Privacy Policy - Reflector Chronicle Bridge</title>
<link rel="canonical" href="https://reflector-proxy.onrender.com/privacy.html" />
</head>
<body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
<h1>Privacy Policy</h1>
<p><strong>Last updated:</strong> January 2026</p>

<h2>1. Overview</h2>
<p>Reflector Chronicle Bridge provides a secure bridge between Chronicle memory systems and Google Drive for reflection synchronization. The service accesses limited user data from Google APIs solely to enable this synchronization.</p>

<h2>2. Data We Access</h2>
<ul>
<li>Google Drive metadata (file names, modification timestamps, file IDs)</li>
<li>Specific Chronicle reflection files explicitly authorized by the user</li>
</ul>
<p>No other personal Google data (such as emails, contacts, or account details) is accessed or stored.</p>

<h2>3. Purpose of Data Use</h2>
<p>Data obtained through Google APIs is used exclusively to synchronize and maintain consistency of Chronicle reflection data. It is never used for advertising, profiling, or data analysis beyond this scope.</p>

<h2>4. Compliance with Google Policies</h2>
<p><strong>Reflector Chronicle Bridge’s use and transfer to any other app of information received from Google APIs will adhere to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">Google API Services User Data Policy</a>, including the Limited Use requirements.</strong></p>
<p>The service processes all Google user data in memory and does not permanently store it on our servers.</p>

<h2>5. Data Sharing</h2>
<p>We do not share, sell, or distribute user data to third parties. All data transfers between Reflector Chronicle Bridge and Google APIs are encrypted via HTTPS/TLS.</p>

<h2>6. Data Retention and Deletion</h2>
<p>The service does not retain Google user data after synchronization completes. Users can revoke access and delete all associated data by removing Reflector Chronicle Bridge from their <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a>.</p>
<p>Upon revocation, all temporary session data used for synchronization is permanently deleted from the proxy server.</p>

<h2>7. Contact</h2>
<p>For privacy or data removal inquiries: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>
<p><a href="/">← Back to Home</a></p>
</body>
</html>`);
});

// =============================================================
// 🔹 Terms of Service
// =============================================================
app.get("/terms.html", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Terms of Service - Reflector Chronicle Bridge</title>
<link rel="canonical" href="https://reflector-proxy.onrender.com/terms.html" />
</head>
<body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
<h1>Terms of Service</h1>

<p>By using Reflector Chronicle Bridge, you agree to the following:</p>
<ul>
<li>Access is limited to authorized Chronicle and Google accounts.</li>
<li>No guarantee or warranty is provided for uptime or data persistence.</li>
<li>Users are responsible for maintaining account security.</li>
</ul>

<p>This service operates as a middleware between Chronicle systems and Google APIs, under the Google API Services User Data Policy.</p>

<p>For questions: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>

<p><strong>Last updated:</strong> January 2026</p>
<p><a href="/">← Back to Home</a></p>
</body>
</html>`);
});

// =============================================================
// 🔹 Root Page (Google静的クロール対応)
// =============================================================
app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reflector Chronicle Bridge</title>
<link rel="canonical" href="https://reflector-proxy.onrender.com/" />
</head>
<body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">

<!-- ✅ アプリ名単体で完全一致 -->
<h1 style="font-size:1.8em;font-weight:bold;margin-top:2em;">Reflector Chronicle Bridge</h1>

<p>The Reflector Proxy API is active and functioning.</p>
<p>This service connects Second Chronicle reflection and memory data with Google Drive APIs for secure synchronization.</p>

<!-- ✅ プレーンHTML直書きリンク -->
<p>
  <a href="/privacy.html">Privacy Policy</a> | 
  <a href="/terms.html">Terms of Service</a>
</p>

<p>Contact: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>

<p style="margin-top:3em;font-size:0.9em;color:gray;">Last updated: January 2026</p>
</body>
</html>`);
});

// =============================================================
// 🔹 JSON Endpoints
// =============================================================
const serveJson = (filename, route) => {
  app.get(route, (req, res) => {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.json(JSON.parse(fs.readFileSync(filePath, "utf8")));
    } else res.status(404).json({ error: `${filename} not found` });
  });
};
serveJson("ai-plugin.json", "/ai-plugin.json");
serveJson("openapi.json", "/openapi.json");

// =============================================================
// 🔹 Proxy API
// =============================================================
app.post("/chronicle/sync", async (req, res) => {
  try {
    const { default: fetch } = await import("node-fetch");
    const apiUrl = process.env.API_URL || "https://reflector-api.onrender.com/chronicle/sync";
    const apiKey = process.env.REFLECTOR_API_KEY;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": apiKey || "" },
      body: JSON.stringify(req.body || {}),
    });
    const text = await response.text();
    let parsed;
    try { parsed = JSON.parse(text); } catch { parsed = { raw: text }; }
    res.json({ ok: true, message: "Synced via proxy", response: parsed });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

// =============================================================
// 🚀 Start Server
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Reflector Proxy running on port ${PORT}`));