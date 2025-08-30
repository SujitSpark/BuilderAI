// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  }
});

// Store conversation history in memory
const conversations = new Map();

// Chat endpoint
app.post('/api/gemini/chat', async (req, res) => {
  try {
    const { message, conversationId, systemPrompt } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    let history = conversations.get(conversationId) || [];

    // ✅ updated model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    let fullPrompt = message;
    if (systemPrompt) {
      fullPrompt = `${systemPrompt}\n\nUser: ${message}`;
    } else if (history.length > 0) {
      const recentHistory = history.slice(-5).map(h => `${h.role}: ${h.content}`).join('\n');
      fullPrompt = `${recentHistory}\nUser: ${message}`;
    }

    const result = await model.generateContent(fullPrompt);
    const text = result.response.text();

    history.push({ role: 'user', content: message });
    history.push({ role: 'assistant', content: text });
    conversations.set(conversationId, history);

    res.json({
      response: text,
      conversationId: conversationId || Date.now().toString(),
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Gemini chat error:', error);
    res.status(500).json({
      error: 'Failed to generate response',
      details: error?.message || 'Unknown error occurred'
    });
  }
});

// Image analysis
app.post('/api/gemini/analyze-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Image file is required' });
    const { question } = req.body;

    // ✅ updated model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imagePath = req.file.path;
    const base64Image = fs.readFileSync(imagePath).toString('base64');
    const image = { inlineData: { data: base64Image, mimeType: req.file.mimetype } };

    const prompt = question || 'Describe this image in detail';
    const result = await model.generateContent([prompt, image]);
    const analysis = result.response.text();

    fs.unlinkSync(imagePath);

    res.json({ analysis, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Image analysis error:', error);
    if (req.file && req.file.path) try { fs.unlinkSync(req.file.path); } catch {}
    res.status(500).json({
      error: 'Failed to analyze image',
      details: error?.message || 'Unknown error occurred'
    });
  }
});

// Code generation
app.post('/api/gemini/generate-code', async (req, res) => {
  try {
    const { componentType, requirements, framework } = req.body;
    if (!componentType || !requirements) {
      return res.status(400).json({ error: 'Component type and requirements are required' });
    }

    // ✅ updated model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const codePrompt = `Generate ${framework || 'React'} code for a ${componentType} component with:
    ${requirements}
    Return only code.`;

    const result = await model.generateContent(codePrompt);
    const code = result.response.text();

    res.json({ code, componentType, framework: framework || 'React', timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Code generation error:', error);
    res.status(500).json({
      error: 'Failed to generate code',
      details: error?.message || 'Unknown error occurred'
    });
  }
});

// Backend architecture
app.post('/api/gemini/generate-backend', async (req, res) => {
  try {
    const { description, techStack, features } = req.body;
    if (!description) return res.status(400).json({ error: 'Description is required' });

    // ✅ updated model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const backendPrompt = `Design backend for: ${description}
    Tech Stack: ${techStack || 'Node.js, Express, MongoDB'}
    Features: ${features ? features.join(', ') : 'CRUD'}
    Return JSON`;

    const result = await model.generateContent(backendPrompt);
    const architecture = result.response.text();

    let structuredResponse;
    try { structuredResponse = JSON.parse(architecture); }
    catch { structuredResponse = { architecture, format: 'text' }; }

    res.json({ backend: structuredResponse, timestamp: new Date().toISOString() });
  } catch (error) {
    console.error('Backend generation error:', error);
    res.status(500).json({
      error: 'Failed to generate backend architecture',
      details: error?.message || 'Unknown error occurred'
    });
  }
});


// Conversation clear
app.delete('/api/gemini/conversation/:id', (req, res) => {
  conversations.delete(req.params.id);
  res.json({ success: true, message: 'Conversation cleared' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
