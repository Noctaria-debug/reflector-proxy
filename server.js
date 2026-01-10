import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// ✅ ステータス確認用（ルート）
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Reflector Proxy running on Render",
    port: port.toString(),
  });
});

// ✅ OpenAI用スキーマファイル
app.get("/ai-plugin.json", (req, res) => {
  res.sendFile(path.join(__dirname, "ai-plugin.json"));
});

app.get("/openapi.json", (req, res) => {
  res.sendFile(path.join(__dirname, "openapi.json"));
});

// ✅ テスト用エンドポイント
app.post("/chronicle/sync", async (req, res) => {
  try {
    const data = req.body;
    res.json({
      ok: true,
      from: "proxy",
      message: "Data received successfully",
      data_received: data,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Reflector Proxy running on port ${port}`);
});