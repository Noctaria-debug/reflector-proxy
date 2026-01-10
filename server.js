import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const REFLECTOR_URL = "https://reflector-api.onrender.com/chronicle/sync";
const REFLECTOR_KEY = "RFX-PROD-2026-XA7Y9VQ3KZ4R2M8T-LJQ8F0P@!B5N";

app.post("/proxy/sync", async (req, res) => {
  try {
    const response = await fetch(REFLECTOR_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": REFLECTOR_KEY
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    console.error("Proxy Error:", err.message);
    res.status(500).json({ error: "Proxy Error", message: err.message });
  }
});

app.get("/", (_, res) => {
  res.json({ status: "ok", service: "Reflector Proxy" });
});

app.listen(3000, () => console.log("✅ Proxy running on port 3000"));
