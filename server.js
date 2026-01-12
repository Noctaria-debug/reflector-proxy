// =============================================================
// Reflector Proxy Server - Unified Safe Version (with Google Verification)
// Compatible with: Render Node v22.x, Second Chronicle, Reflector API
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

// --- 現在のファイルパスから __dirname を再現 ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("🪞 Reflector Proxy server starting...");

// =============================================================
// 🔹 Static Pages & Verification Files
// =============================================================
// public ディレクトリ（存在しない場合でも安全に処理）
const publicDir = path.join(__dirname, "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
  console.log("📁 public/ フォルダを自動作成しました");
}

// Google 所有確認ファイル
app.get("/google7bda259bbc2508a5.html", (req, res) => {
  const filePath = path.join(publicDir, "google7bda259bbc2508a5.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Google verification file not found");
  }
});

// Privacy Policy
app.get("/privacy.html", (req, res) => {
  const filePath = path.join(publicDir, "privacy.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Privacy Policy not found");
  }
});

// Terms of Service
app.get("/terms.html", (req, res) => {
  const filePath = path.join(publicDir, "terms.html");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send("Terms of Service not found");
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
  res.send(
    "Reflector Proxy API is running. Try /ai-plugin.json or /openapi.json"
  );
});

// =============================================================
// 🚀 Render Port Binding
// =============================================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Reflector Proxy running on port ${PORT}`);
});