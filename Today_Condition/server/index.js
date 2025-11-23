const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_API_KEY;
const PORT = process.env.PORT || 3000;

if (!OPENAI_KEY) {
  console.warn('Warning: OPENAI_API_KEY is not set. Set it in server/.env or environment variables.');
}

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, metadata } = req.body;
    if (!prompt) return res.status(400).json({ error: 'prompt required' });

    // Build system instruction with metadata for more contextual responses
    const system = "너는 친절한 상담사야. 사용자의 감정과 키워드를 바탕으로 공감하고, 간단한 코칭을 제공해줘. 긴 답변 대신 한두 문장으로 친절하게 응답해줘.";

    const messages = [
      { role: 'system', content: system },
      { role: 'user', content: `사용자 입력: ${prompt}` },
    ];

    if (metadata && metadata.keywords) {
      messages.push({ role: 'user', content: `키워드: ${metadata.keywords.join(', ')}` });
    }
    if (metadata && metadata.sentiment) {
      messages.push({ role: 'user', content: `추정 감정: ${metadata.sentiment.label}` });
    }

    // Call OpenAI Chat Completions API
    const resp = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 200,
      temperature: 0.8
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_KEY}`
      }
    });

    const reply = resp.data.choices && resp.data.choices[0] && resp.data.choices[0].message && resp.data.choices[0].message.content
      ? resp.data.choices[0].message.content
      : '죄송해요. 답변을 생성하지 못했어요.';

    return res.json({ reply });
  } catch (err) {
    console.error('OpenAI error', err?.response?.data || err.message);
    return res.status(500).json({ error: 'server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
