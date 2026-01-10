import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const app = express();
const PORT = process.env.PORT || 10000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

// ✅ root check
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Reflector Proxy running on Render",
    port: PORT.toString(),
  });
});

// ✅ serve ai-plugin.json
app.get("/ai-plugin.json", (req, res) => {
  const filePath = path.join(__dirname, "ai-plugin.json");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "ai-plugin.json not found" });
  }
});

// ✅ serve openapi.yaml (if available)
app.get("/openapi.yaml", (req, res) => {
  const filePath = path.join(__dirname, "openapi.yaml");
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send({ error: "openapi.yaml not found" });
  }
});

// ✅ proxy endpoint
app.post("/chronicle/sync", async (req, res) => {
  try {
    const target = "https://reflector-api.onrender.com/chronicle/sync";
    const response = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.text();
    res.json({
      ok: true,
      from: "proxy",
      target,
      response: {
        raw: data,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Proxy request failed",
      detail: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Reflector Proxy running on Render (port: ${PORT})`);
});