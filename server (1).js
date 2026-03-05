const express = require("express");
const app = express();
app.use(express.json());

const ANTHROPIC_API_KEY = "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";

const SYSTEM_PROMPT = `You are an epic AI assistant built into a Roblox game. 
You can write Roblox Lua scripts, create particle effects, lighting, VFX, and help with anything the player asks. Be energetic and awesome!`;

app.post("/claude", async (req, res) => {
  const { message, history } = req.body;
  const messages = [...(history || []), { role: "user", content: message }];
  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    const data = await response.json();
    res.json({ reply: data.content[0].text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/", (req, res) => res.send("Claude Roblox Proxy is running! 🚀"));

app.listen(3000, () => console.log("Running on port 3000!"));
