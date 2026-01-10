// ✅ テスト用API（ChatGPT経由で確認可能）
app.post("/chronicle/sync", async (req, res) => {
  try {
    console.log("Incoming Reflector Sync:", req.body);

    // 🔹 フィールドを限定せずに、受け取った全データを保持
    const payload = req.body || {};

    // 🔹 既存互換用：古いキーも残す
    const { test, memory, reflection, emotion, data } = payload;

    // 🔹 ここで Reflector API に転送（必要なら環境変数に URL を設定）
    const apiUrl = process.env.API_URL || "https://reflector-api.onrender.com/chronicle/sync";
    const apiKey = process.env.REFLECTOR_API_KEY;

    let apiResponse = null;
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": apiKey || "",
        },
        body: JSON.stringify(payload), // ← emotion・data含め全転送
      });
      apiResponse = await response.json();
    } catch (err) {
      console.error("Upstream Reflector API Error:", err.message);
    }

    // 🔹 Proxy自体のレスポンス（既存仕様維持 + emotion 対応）
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
      response: apiResponse || { info: "No response from API" },
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