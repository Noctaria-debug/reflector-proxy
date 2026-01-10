import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

// --- 現在のファイルパスから __dirname を再現 ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- ルート確認ログ ---
console.log("Reflector Proxy server starting...");

// ✅ ai-plugin.json を返す
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

// ✅ openapi.json を返す（文字列ではなくJSONとして！）
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

// ✅ テスト用API（ChatGPT経由で確認可能）
app.post("/chronicle/sync", async (req, res) => {
  try {
    console.log("Incoming Reflector Sync:", req.body);

    const { test, memory, reflection } = req.body;

    // ここでReflector本体APIに転送してもOK（今はテスト用）
    res.json({
      ok: true,
      message: "Data received successfully (via proxy)",
      from: "proxy",
      data_received: {
        test: test || null,
        memory: memory || null,
        reflection: reflection || null,
      },
    });
  } catch (err) {
    console.error("Error in /chronicle/sync:", err);
    res.status(500).json({
      ok: false,
      message: "Internal Server Error",
      error: err.message,
    });
  }
});

// ✅ ルート表示
app.get("/", (req, res) => {
  res.send("Reflector Proxy API is running. Try /ai-plugin.json or /openapi.json");
});

// --- Render用ポート設定 ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Reflector Proxy running on port ${PORT}`);
});