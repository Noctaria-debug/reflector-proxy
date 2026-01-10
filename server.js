// ✅ 先頭で node-fetch を追加
import fetch from "node-fetch";

// ✅ Reflector Proxy sync endpoint（完全版）
app.post("/chronicle/sync", async (req, res) => {
  try {
    console.log("Incoming Reflector Sync:", req.body);

    // 🔹 受け取った全データを保持
    const payload = req.body || {};

    // 🔹 既存互換フィールド（旧構造の維持）
    const { test, memory, reflection, emotion, data } = payload;

    // 🔹 Reflector API 宛のURLと認証キー
    const apiUrl =
      process.env.API_URL ||
      "https://reflector-api.onrender.com/chronicle/sync";
    const apiKey = process.env.REFLECTOR_API_KEY;

    // 🔹 上流APIのレスポンス格納用
    let apiResponse = null;

    // 🔹 Reflector API へ転送
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey || "",
        },
        body: JSON.stringify(payload), // emotion/data 含め全体を転送
      });

      // 🔹 可能ならJSONとして受け取る
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

    // 🔹 Proxy 側のレスポンス（既存互換 + emotion対応）
    res.json({
      ok: true,
      message: "Data received successfully (via proxy)",
      from: "proxy",
      target: apiUrl,
      data_received: {
        test: test || null,
        memory: memory || null,
        reflection: reflection || null,
        emotion: emotion || null,
        data: data || null,
      },
      response: apiResponse,
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