import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ✅ Render動作確認
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Reflector Proxy running on Render",
    port: port.toString(),
  });
});

// ✅ JSONファイル送信用（BOM除去・Content-Type強制）
function sendJson(res, filePath) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const data = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, ""); // BOM除去
  res.send(data);
}

// ✅ ai-plugin.json
app.get("/ai-plugin.json", (req, res) => {
  sendJson(res, path.join(__dirname, "ai-plugin.json"));
});

// ✅ openapi.json
app.get("/openapi.json", (req, res) => {
  sendJson(res, path.join(__dirname, "openapi.json"));
});

// ✅ 実際のAPIエンドポイント
app.post("/chronicle/sync", (req, res) => {
  try {
    res.json({
      ok: true,
      message: "Data received successfully",
      from: "proxy",
      data_received: req.body,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Reflector Proxy running on port ${port}`);
});