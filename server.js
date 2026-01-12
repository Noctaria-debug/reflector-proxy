// =============================================================
// Reflector Proxy Server - Full Verified Version (Final, 2026 Edition)
// ✅ Compatible with: Render Node v22.x, Google OAuth, Second Chronicle, Reflector API
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
// 🔹 Static Pages & Verification Files (No public folder)
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
      <h1>Privacy Policy - Reflector Chronicle Bridge</h1>
      <p>Reflector Chronicle Bridge does not collect personal data beyond what is required for synchronizing Chronicle memory and reflection data between trusted systems.</p>
      <p>All data transferred through this service remains encrypted in transit and is not shared with third parties.</p>
      <p>For any concerns, contact: support@reflector-proxy.onrender.com</p>
      <p>Last updated: January 2026</p>
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
      <h1>Terms of Service - Reflector Chronicle Bridge</h1>
      <p>By using Reflector Chronicle Bridge, you agree to allow limited data synchronization between authorized Chronicle systems and your connected services.</p>
      <p>This service is provided as-is, without any guarantee or warranty. Users are responsible for maintaining the security of their connected accounts.</p>
      <p>For any inquiries, contact: support@reflector-proxy.onrender.com</p>
      <p>Last updated: January 2026</p>
    `);
  }
});

// =============================================================
// 🔹 ai-plugin.json の配信
// =============================================================
app.get("/ai-plugin.json", (req, res) => {
  const filePath = path.join(__dirname, "ai-plugin.json");
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(json);
  } else {
    res.status(404).json({ error: "ai-plugin.json not found" });
  }
});

// =============================================================
// 🔹 openapi.json の配信
// =============================================================
app.get("/openapi.json", (req, res) => {
  const filePath = path.join(__dirname, "openapi.json");
  if (fs.existsSync(filePath)) {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    const json = JSON.parse(fs.readFileSync(filePath, "utf8"));
    res.json(json);
  } else {
    res.status(404).json({ error: "openapi.json not found" });
  }
});

// =============================================================
// 🔄 /chronicle/sync - Reflector Proxy Bridge
// =============================================================
app.post("/chronicle/sync", async (req, res) => {
  try {
    console.log("Incoming Reflector Sync:", req.body);

    const payload = req.body || {};
    const { test, memory, reflection, emotion, data } = payload;

    const apiUrl =
      process.env.API_URL ||
      "https://reflector-api.onrender.com/chronicle/sync";
    const apiKey = process.env.REFLECTOR_API_KEY;

    let apiResponse = null;

    try {
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
      try {
        apiResponse = JSON.parse(text);
      } catch {
        apiResponse = { raw: text };
      }
    } catch (err) {
      console.error("Upstream Reflector API Error:", err.message);
      apiResponse = { error: err.message };
    }

    res.json({
      ok: true,
      message: "Data received successfully (via proxy)",
      from: "proxy",
      target: apiUrl,
      data_received: { test, memory, reflection, emotion, data },
      response: apiResponse,
    });
  } catch (err) {
    console.error("Error in /chronicle/sync:", err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// =============================================================
// ✅ Health Check (Root Endpoint)
// =============================================================
app.get("/", (req, res) => {
  res.send(`
    <h1>Reflector Chronicle Bridge</h1>
    <p>The Reflector Proxy API is active and functioning.</p>
    <p>This service connects Second Chronicle memory synchronization and reflection data.</p>
    <ul>
      <li><a href="https://reflector-proxy.onrender.com/privacy.html">Privacy Policy</a></li>
      <li><a href="https://reflector-proxy.onrender.com/terms.html">Terms of Service</a></li>
    </ul>
  `);
});

// =============================================================
// 🚀 Render Port Binding
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Reflector Proxy running on port ${PORT}`);
});