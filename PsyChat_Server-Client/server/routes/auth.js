const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Simple in-memory "DB" for demo purposes. Replace with real DB in production.
const users = [];

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'email and password required' });
  if (users.find(u => u.email === email)) return res.status(400).json({ error: 'email exists' });
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length+1, email, password: hashed, name: name || '' };
  users.push(user);
  res.json({ message: 'registered' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ error: 'invalid credentials' });
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '7d' });
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

module.exports = router;
