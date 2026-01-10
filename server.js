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

// ✅ ルートステータス
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Reflector Proxy running on Render",
    port: port.toString(),
  });
});

// ✅ ai-plugin.json を正しい Content-Type で返す
app.get("/ai-plugin.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "ai-plugin.json"));
});

// ✅ openapi.json を正しい Content-Type で返す
app.get("/openapi.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.sendFile(path.join(__dirname, "openapi.json"));
});

// ✅ 実際の同期エンドポイント
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
  console.log(`✅ Reflector Proxy running on port ${port}`);
});