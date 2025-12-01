const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'no auth header' });
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    req.user = payload;
    next();
  } catch (e) { return res.status(401).json({ error: 'invalid token' }); }
}

router.post('/', authMiddleware, async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'message required' });

  try {
    // Example using OpenAI Chat Completions
    const resp = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful psychiatric style chatbot called PsyChat. Be empathetic and concise." },
        { role: "user", content: message }
      ],
      max_tokens: 500
    });
    const text = resp.data.choices?.[0]?.message?.content || 'No response';
    res.json({ reply: text });
  } catch (err) {
    console.error('OpenAI error', err?.response?.data || err.message);
    res.status(500).json({ error: 'OpenAI error', details: err?.response?.data || err.message });
  }
});

module.exports = router;
