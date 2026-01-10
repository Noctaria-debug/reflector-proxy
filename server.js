/**
 * Reflector Proxy Server (Render対応版)
 * - Node.js Express サーバ
 * - ChatGPT Action からのリクエストを受け取り、Reflector API に安全に中継
 * - Render Freeプラン環境でも確実に動作
 */

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

// ✅ Renderが自動で割り当てるポートを使用
const PORT = process.env.PORT || 3000;

// ✅ ここはあなたの Reflector API の Render URL に合わせて変更
const REFLECTOR_API_URL = process.env.REFLECTOR_API_URL || "https://reflector-api.onrender.com/chronicle/sync";

// ✅ APIキー（Render の Environment Variables に設定しておく）
const REFLECTOR_API_KEY = process.env.REFLECTOR_API_KEY;

app.use(cors());
app.use(express.json({ limit: "2mb" }));

// --- 🔹 動作確認用ヘルスチェック ---
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Reflector Proxy running on Render",
    port: PORT,
  });
});

// --- 🔹 メイン中継エンドポイント ---
app.post("/chronicle/sync", async (req, res) => {
  try {
    console.log("📩 Received request from Action:", req.body);

    if (!REFLECTOR_API_KEY) {
      return res.status(500).json({
        error: "Missing REFLECTOR_API_KEY in environment variables",
      });
    }

    // Reflector API 側へ転送
    const response = await fetch(REFLECTOR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${REFLECTOR_API_KEY}`,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    console.log("📤 Response from Reflector API:", data);

    res.status(response.status).json(data);
  } catch (error) {
    console.error("❌ Proxy Error:", error);
    res.status(500).json({
      error: "Proxy request failed",
      detail: error.message,
    });
  }
});

// --- 🔹 サーバ起動 ---
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});