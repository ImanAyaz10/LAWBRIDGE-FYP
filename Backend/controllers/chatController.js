const Message = require('../models/Message');

// Helper to generate a mock AI response
const fetch = require('node-fetch');

// Helper to call Gemini API — throws on failure so errors are visible
const getAIResponse = async (userMessage, history) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY is NOT set in environment variables!");
    throw new Error("AI service is not configured — GEMINI_API_KEY is missing.");
  }

  // Log first 10 chars of key for debugging (safe partial reveal)
  console.log("🔑 GEMINI_API_KEY loaded:", apiKey.substring(0, 10) + "...");

  try {
    // Build Gemini request payload
    const contents = [];
    // System instruction (set separately)
    const systemInstruction = { parts: [{ text: "You are a legal assistant for LawBridge, providing professional, friendly advice on Pakistani legal procedures and guiding users to book consultations. Keep responses concise, include a disclaimer that the advice is not a substitute for professional counsel, and format every answer as a list of bullet points, each starting with a hyphen and a space." }] };
    // Add past conversation context (limit to last 20 messages to avoid token limits)
    if (history && history.length > 0) {
        const recentHistory = history.slice(-20);
        recentHistory.forEach(msg => {
            const role = msg.role === 'assistant' ? 'model' : 'user';
            contents.push({ role, parts: [{ text: msg.content }] });
        });
    }
    // Add current user message
    contents.push({ role: "user", parts: [{ text: userMessage }] });
    const requestBody = { systemInstruction, contents };

    console.log("📤 Calling Gemini API with", contents.length, "messages...");

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody)
    });

    // CRITICAL: Check for HTTP errors BEFORE parsing JSON
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: response.statusText } }));
      console.error("❌ Gemini API HTTP Error:", response.status, JSON.stringify(errorData));
      throw new Error(`Gemini API returned ${response.status}: ${errorData?.error?.message || response.statusText}`);
    }

    const data = await response.json();
    console.log("📥 Gemini API responded successfully");

    // Extract text response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) return text;

    // If no text, log the full response for debugging
    console.error("❌ Gemini API returned unexpected format:", JSON.stringify(data));

    // Check for safety blocks or other issues
    if (data?.candidates?.[0]?.finishReason === 'SAFETY') {
      throw new Error("The AI response was blocked by safety filters. Please rephrase your question.");
    }
    if (data?.promptFeedback?.blockReason) {
      throw new Error(`Prompt was blocked: ${data.promptFeedback.blockReason}`);
    }

    throw new Error("Gemini API returned an empty or unexpected response.");
  } catch (error) {
    console.error("❌ Gemini API error:", error.message || error);
    throw error;
  }
};

// Mock fallback generator (original behavior)
const generateMockResponse = (userMessage) => {
  const message = userMessage.toLowerCase();
  if (message.includes('hello') || message.includes('hi')) {
    return "- Hello! I am your LawBridge AI assistant.\n- How can I help you with your legal queries today?";
  }
  if (message.includes('divorce') || message.includes('family')) {
    return "- Family law matters can be sensitive.\n- In Pakistan, divorce or Khula procedures involve filing a petition in the Family Court.\n- Would you like me to guide you on document collection?";
  }
  if (message.includes('property') || message.includes('rent')) {
    return "- Property disputes often require a legal notice to be served first.\n- Have your title deeds or rental agreements ready.\n- Want a roadmap for property litigation?";
  }
  if (message.includes('fee') || message.includes('cost')) {
    return "- Legal fees vary by lawyer experience and case complexity.\n- Discuss directly with a lawyer after booking a consultation.";
  }
  return "- That sounds like a complex matter.\n- I recommend using our 'Analyze Case' feature or booking a consultation with a specialized lawyer for detailed advice.";
};

// @desc    Send a message to AI
// @route   POST /api/chat
// @access  Private
const sendMessage = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Please provide message content' });
    }

    try {
        // 1. Save User Message
        const userChat = await Message.create({
            senderId: req.user._id,
            role: 'user',
            content: content
        });

        // 2. Generate AI Response using Gemini with chat history
        const pastMessages = await Message.find({ senderId: req.user._id }).sort({ createdAt: 1 });
        const aiContent = await getAIResponse(content, pastMessages);

        // 3. Save AI Response
        const aiChat = await Message.create({
            senderId: req.user._id,
            role: 'assistant',
            content: aiContent
        });

        res.status(201).json({
            userMessage: userChat,
            aiMessage: aiChat
        });
    } catch (error) {
        console.error("❌ sendMessage error:", error.message);
        res.status(503).json({
            error: 'AI service temporarily unavailable',
            detail: error.message
        });
    }
};

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res) => {
    const history = await Message.find({ senderId: req.user._id, role: { $in: ['user', 'assistant'] } }).sort({ createdAt: 1 });
    res.json(history);
};

// @desc    Send a personal message to another user
// @route   POST /api/chat/personal
// @access  Private
const sendPersonalMessage = async (req, res) => {
    const { receiverId, content } = req.body;
    if (!receiverId || !content) {
        res.status(400);
        throw new Error('Receiver ID and content are required');
    }
    const message = await Message.create({
        senderId: req.user._id,
        receiverId,
        role: 'user',
        content
    });
    res.status(201).json(message);
};

// @desc    Get personal messages between the current user and another user
// @route   GET /api/chat/personal/:userId
// @access  Private
const getPersonalMessages = async (req, res) => {
    const otherUserId = req.params.userId;
    if (!otherUserId) {
        res.status(400);
        throw new Error('User ID is required');
    }
    const messages = await Message.find({
        $or: [
            { senderId: req.user._id, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: req.user._id }
        ]
    }).sort({ createdAt: 1 });
    res.json(messages);
}


module.exports = {
    sendMessage,
    getChatHistory,
    sendPersonalMessage,
    getPersonalMessages
};

