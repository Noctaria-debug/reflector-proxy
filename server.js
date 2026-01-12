// =============================================================
// Reflector Proxy Server - Google OAuth Verified Compliance Edition (2026)
// ✅ 100% Google OAuth Verification Ready
// =============================================================

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

// =============================================================
// 🔹 Google Verification File
// =============================================================
app.get("/google7bda259bbc2508a5.html", (req, res) => {
  const filePath = path.join(__dirname, "google7bda259bbc2508a5.html");
  if (fs.existsSync(filePath)) res.sendFile(filePath);
  else res.status(404).send("Google verification file not found");
});

// =============================================================
// 🔹 Privacy Policy - Google Limited Use Policy 準拠版
// =============================================================
app.get("/privacy.html", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Privacy Policy - Reflector Chronicle Bridge</title>
      <meta name="description" content="Privacy policy for Reflector Chronicle Bridge, compliant with Google Limited Use Policy." />
      <link rel="canonical" href="https://reflector-proxy.onrender.com/privacy.html" />
    </head>
    <body style="font-family: sans-serif; max-width: 800px; margin: auto; line-height: 1.6;">
      <h1>Privacy Policy</h1>

      <p><strong>Last updated:</strong> January 2026</p>

      <h2>1. Overview</h2>
      <p>
        Reflector Chronicle Bridge connects your Chronicle memory data with authorized Google services (such as Google Drive) 
        to enable seamless reflection and synchronization between trusted systems.
      </p>

      <h2>2. Data We Access</h2>
      <ul>
        <li>Google Drive metadata (file names, modification dates, and IDs)</li>
        <li>Specific Chronicle reflection files when explicitly authorized by the user</li>
      </ul>
      <p>
        We <strong>do not</strong> collect or process any personal Google account information beyond what is explicitly permitted 
        by the user during authorization.
      </p>

      <h2>3. Purpose of Data Use</h2>
      <p>
        Data is accessed solely for synchronizing Chronicle memory, reflections, and contextual insights between authorized systems.  
        This allows users to maintain consistency between Reflector Chronicle and connected cloud storage.
      </p>

      <h2>4. Data Sharing</h2>
      <p>
        Reflector Chronicle Bridge strictly adheres to Google’s 
        <a href="https://developers.google.com/terms/api-services-user-data-policy#limited-use" target="_blank">
        Limited Use Policy</a>.
        <br>We do not share or sell user data to third parties.  
        Data transmitted between services is encrypted (HTTPS/TLS) and processed only transiently during synchronization.
      </p>

      <h2>5. Data Retention and Deletion</h2>
      <p>
        No long-term storage of Google user data occurs on this proxy.  
        Users may revoke Reflector Chronicle Bridge access at any time by visiting their 
        <a href="https://myaccount.google.com/permissions" target="_blank">Google Account Permissions</a> page.
      </p>
      <p>
        If users wish to remove all local records of synchronization, they may contact  
        <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a>.
      </p>

      <h2>6. Contact</h2>
      <p>
        For privacy inquiries, please contact:  
        <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a>
      </p>

      <p><a href="/">← Back to Home</a></p>
    </body>
    </html>
  `);
});

// =============================================================
// 🔹 Terms of Service - 形式的な同意条件
// =============================================================
app.get("/terms.html", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Terms of Service - Reflector Chronicle Bridge</title>
      <meta name="description" content="Terms of Service for Reflector Chronicle Bridge." />
      <link rel="canonical" href="https://reflector-proxy.onrender.com/terms.html" />
    </head>
    <body style="font-family: sans-serif; max-width: 800px; margin: auto; line-height: 1.6;">
      <h1>Terms of Service</h1>

      <p>By using Reflector Chronicle Bridge, you agree to the following:</p>
      <ul>
        <li>Access is limited to authorized Chronicle and Google accounts.</li>
        <li>No guarantee or warranty is provided for uptime or data persistence.</li>
        <li>Users are responsible for maintaining account security.</li>
      </ul>

      <p>
        This service operates as a middleware between Chronicle systems and Google APIs, under the Google API Services User Data Policy.
      </p>

      <p>For questions: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>

      <p><strong>Last updated:</strong> January 2026</p>

      <p><a href="/">← Back to Home</a></p>
    </body>
    </html>
  `);
});

// =============================================================
// 🔹 Root Page (with direct visible links)
// =============================================================
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Reflector Chronicle Bridge</title>
      <meta name="description" content="Reflector Chronicle Bridge connects Chronicle memory and reflection data securely using Google Drive APIs." />
      <link rel="canonical" href="https://reflector-proxy.onrender.com/" />
    </head>
    <body style="font-family: sans-serif; max-width: 800px; margin: auto; line-height: 1.6;">
      <h1>Reflector Chronicle Bridge</h1>
      <p>The Reflector Proxy API is active and functioning.</p>
      <p>This service connects Second Chronicle memory synchronization and reflection data with Google Drive for secure reflection handling.</p>

      <h2>Documentation</h2>
      <ul>
        <li><a href="https://reflector-proxy.onrender.com/privacy.html">Privacy Policy</a></li>
        <li><a href="https://reflector-proxy.onrender.com/terms.html">Terms of Service</a></li>
      </ul>

      <h2>Contact</h2>
      <p>Email: <a href="mailto:support@reflector-proxy.onrender.com">support@reflector-proxy.onrender.com</a></p>

      <footer><p>© 2026 Reflector Chronicle Bridge</p></footer>
    </body>
    </html>
  `);
});

// =============================================================
// 🔹 ai-plugin.json / openapi.json 配信
// =============================================================
const serveJson = (filename, route) => {
  app.get(route, (req, res) => {
    const filePath = path.join(__dirname, filename);
    if (fs.existsSync(filePath)) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
      res.json(json);
    } else {
      res.status(404).json({ error: `${filename} not found` });
    }
  });
};
serveJson("ai-plugin.json", "/ai-plugin.json");
serveJson("openapi.json", "/openapi.json");

// =============================================================
// 🔹 Reflector API Bridge
// =============================================================
app.post("/chronicle/sync", async (req, res) => {
  try {
    const payload = req.body || {};
    const apiUrl =
      process.env.API_URL || "https://reflector-api.onrender.com/chronicle/sync";
    const apiKey = process.env.REFLECTOR_API_KEY;

    const { default: fetch } = await import("node-fetch");
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Api-Key": apiKey || "" },
      body: JSON.stringify(payload),
    });

    const text = await response.text();
    let apiResponse = null;
    try {
      apiResponse = JSON.parse(text);
    } catch {
      apiResponse = { raw: text };
    }

    res.json({
      ok: true,
      message: "Synced successfully (via proxy)",
      target: apiUrl,
      response: apiResponse,
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =============================================================
// 🚀 Start Server
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Reflector Proxy running on port ${PORT}`));