// =============================================================
// Reflector Proxy Server - Final Strict HTML Compliance Build (2026 Edition)
// ✅ Fully compatible with Google OAuth verification and Limited Use Policy
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

console.log("🪞 Reflector Proxy server starting...");

// =============================================================
// 🔹 Static & Verification Files
// =============================================================

// Google verification
app.get("/google7bda259bbc2508a5.html", (req, res) => {
  const filePath = path.join(__dirname, "google7bda259bbc2508a5.html");
  fs.existsSync(filePath)
    ? res.sendFile(filePath)
    : res.status(404).send("Google verification file not found");
});

// =============================================================
// 🔹 Home (Root + index.html Redirect)
// =============================================================
app.get(["/", "/index.html"], (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Reflector Chronicle Bridge</title>
<link rel="canonical" href="https://reflector-proxy.onrender.com/" />
</head>
<body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
<h1 style="font-size:1.8em;font-weight:bold;margin-top:2em;">Reflector Chronicle Bridge</h1>

<p>The Reflector Proxy API is active and functioning.</p>
<p>This service connects Second Chronicle reflection and memory data with Google Drive APIs for secure synchronization.</p>

<!-- 🔗 Absolute URLs for Google's crawler -->
<p>
  <a href="https://reflector-proxy.onrender.com/privacy.html">Privacy Policy</a> |
  <a href="https://reflector-proxy.onrender.com/terms.html">Terms of Service</a>
</p>

<p>Contact: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>
<p style="margin-top:3em;font-size:0.9em;color:gray;">© 2026 Reflector Chronicle Bridge<br/>Last updated: January 2026</p>
</body>
</html>`);
});

// =============================================================
// 🔹 Privacy Policy (absolute + compliant version)
// =============================================================
app.get("/privacy.html", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Privacy Policy - Reflector Chronicle Bridge</title>
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
<p>No other personal Google data (emails, contacts, or account details) is accessed or stored.</p>

<h2>3. Purpose of Data Use</h2>
<p>Data obtained through Google APIs is used exclusively to synchronize and maintain consistency of Chronicle reflection data. It is never used for advertising, profiling, or analytics beyond this purpose.</p>

<h2>4. Compliance with Google Policies</h2>
<p>Reflector Chronicle Bridge’s use and transfer of information received from Google APIs adheres to the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">Google API Services User Data Policy</a>, including the Limited Use requirements.</p>

<h2>5. Data Sharing</h2>
<p>We do not share, sell, or distribute user data to third parties. All data transfers are encrypted via HTTPS/TLS.</p>

<h2>6. Data Retention and Deletion</h2>
<p>The service does not retain Google user data after synchronization completes. Users can revoke access and delete all associated data by removing Reflector Chronicle Bridge from their <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a>.</p>

<h2>7. Contact</h2>
<p>For data removal requests or privacy inquiries, please contact: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>

<p><a href="https://reflector-proxy.onrender.com/">← Back to Home</a></p>
</body>
</html>`);
});

// =============================================================
// 🔹 Terms of Service
// =============================================================
app.get("/terms.html", (req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Terms of Service - Reflector Chronicle Bridge</title>
</head>
<body style="font-family:sans-serif;max-width:800px;margin:auto;line-height:1.6;">
<h1>Terms of Service</h1>
<p><strong>Last updated:</strong> January 2026</p>

<p>By using Reflector Chronicle Bridge, you agree to the following:</p>
<ul>
  <li>Access is limited to authorized Chronicle and Google accounts.</li>
  <li>No warranty or guarantee is provided for uptime or data persistence.</li>
  <li>Users are responsible for maintaining account security.</li>
</ul>
<p>This service operates as middleware between Chronicle systems and Google APIs, under the <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank">Google API Services User Data Policy</a>.</p>

<p>For questions: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>
<p><a href="https://reflector-proxy.onrender.com/">← Back to Home</a></p>
</body>
</html>`);
});

// =============================================================
// 🔹 ai-plugin.json / openapi.json
// =============================================================
app.get("/ai-plugin.json", (req, res) => {
  const file = path.join(__dirname, "ai-plugin.json");
  fs.existsSync(file)
    ? res.sendFile(file)
    : res.status(404).json({ error: "ai-plugin.json not found" });
});

app.get("/openapi.json", (req, res) => {
  const file = path.join(__dirname, "openapi.json");
  fs.existsSync(file)
    ? res.sendFile(file)
    : res.status(404).json({ error: "openapi.json not found" });
});

// =============================================================
// 🔄 /chronicle/sync Bridge
// =============================================================
app.post("/chronicle/sync", async (req, res) => {
  try {
    console.log("Incoming Reflector Sync:", req.body);
    const { default: fetch } = await import("node-fetch");

    const response = await fetch(
      process.env.API_URL || "https://reflector-api.onrender.com/chronicle/sync",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": process.env.REFLECTOR_API_KEY || "",
        },
        body: JSON.stringify(req.body || {}),
      }
    );

    const text = await response.text();
    let apiResponse;
    try {
      apiResponse = JSON.parse(text);
    } catch {
      apiResponse = { raw: text };
    }

    res.json({
      ok: true,
      message: "Data received successfully (via proxy)",
      from: "proxy",
      response: apiResponse,
    });
  } catch (err) {
    console.error("Error in /chronicle/sync:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =============================================================
// 🚀 Server Start
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Reflector Proxy running on port ${PORT}`));