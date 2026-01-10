import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const REFLECTOR_API_URL = process.env.REFLECTOR_API_URL;
const REFLECTOR_API_KEY = process.env.REFLECTOR_API_KEY;

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Reflector Proxy running on Render", port: process.env.PORT || 10000 });
});

app.post("/chronicle/sync", async (req, res) => {
  try {
    const response = await fetch(REFLECTOR_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${REFLECTOR_API_KEY || ""}`
      },
      body: JSON.stringify(req.body)
    });

    // Python側がJSON以外を返すと落ちる → try-catchで吸収
    const text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    res.json({ ok: true, from: "proxy", target: REFLECTOR_API_URL, response: data });
  } catch (err) {
    console.error("❌ Proxy error:", err);
    res.status(500).json({ error: "Proxy request failed", detail: err.message });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Proxy running on port ${PORT}`);
});