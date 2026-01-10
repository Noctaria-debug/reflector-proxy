import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(cors());

// ✅ openapi.json を返すルートを追加
app.get("/openapi.json", (req, res) => {
  try {
    const data = fs.readFileSync("./openapi.json", "utf8");
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    console.error("Failed to load openapi.json:", err);
    res.status(500).json({ error: "Failed to load openapi.json" });
  }
});

// ✅ ai-plugin.json も同様に（既にある場合はOK）
app.get("/ai-plugin.json", (req, res) => {
  try {
    const data = fs.readFileSync("./ai-plugin.json", "utf8");
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  } catch (err) {
    console.error("Failed to load ai-plugin.json:", err);
    res.status(500).json({ error: "Failed to load ai-plugin.json" });
  }
});

// ✅ テスト用エンドポイント
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Reflector Proxy running on Render",
    port: process.env.PORT || "10000",
  });
});

// ✅ 実際のプロキシルート
app.post("/chronicle/sync", async (req, res) => {
  try {
    const response = await fetch("https://reflector-api.onrender.com/chronicle/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });
    const result = await response.text();
    res.json({
      ok: true,
      from: "proxy",
      target: "https://reflector-api.onrender.com/chronicle/sync",
      response: { raw: result },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Proxy request failed",
      detail: error.message,
    });
  }
});

// ✅ PORT設定
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Reflector Proxy running on Render port ${PORT}`);
});