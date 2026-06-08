const fetch = require('node-fetch');

/**
 * Main entry point for fetching AI responses.
 * Designed to be provider-agnostic to allow easy future migrations.
 * Currently supports: 'groq'
 * 
 * @param {string} userMessage - The current user message text.
 * @param {Array} history - Array of previous message objects.
 * @returns {Promise<string>} The AI assistant reply.
 */
const getAIResponse = async (userMessage, history = []) => {
  const provider = process.env.AI_PROVIDER || 'groq';

  switch (provider.toLowerCase()) {
    case 'groq':
      return await getGroqChatResponse(userMessage, history);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
};

/**
 * Fetch chat completion response from Groq API.
 * Maps error statuses into user-friendly messages.
 */
const getGroqChatResponse = async (userMessage, history) => {
  const apiKey = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

  if (!apiKey || apiKey === 'your_key_here') {
    console.error("❌ GROQ_API_KEY is NOT set in environment variables!");
    throw new Error("AI service is not configured — GROQ_API_KEY is missing or invalid.");
  }

  // System instruction - ensures response matches the bulleted list requirements of the frontend
  const systemPrompt = "You are a legal assistant for LawBridge, providing professional, friendly advice on Pakistani legal procedures and guiding users to book consultations. Keep responses concise, include a disclaimer that the advice is not a substitute for professional counsel, and format every answer as a list of bullet points, each starting with a hyphen and a space.";

  // Build the message payload
  const messages = [
    { role: 'system', content: systemPrompt }
  ];

  // Map history context (limit to last 20 messages to avoid token limits)
  if (history && history.length > 0) {
    const recentHistory = history.slice(-20);
    recentHistory.forEach(msg => {
      // Map roles: Groq/OpenAI expects 'user' and 'assistant'
      const role = msg.role === 'assistant' ? 'assistant' : 'user';
      messages.push({ role, content: msg.content });
    });
  }

  // To prevent duplicate user prompts, check if the last item in the history already contains userMessage
  const lastMsg = messages[messages.length - 1];
  if (!lastMsg || lastMsg.role !== 'user' || lastMsg.content !== userMessage) {
    messages.push({ role: 'user', content: userMessage });
  }

  console.log(`📤 Calling Groq API (${model}) with ${messages.length} messages...`);

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    // Handle non-2xx status codes with custom mapping
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData?.error?.message || response.statusText;
      console.error(`❌ Groq API HTTP Error (${response.status}):`, errorMessage || errorData);

      if (response.status === 401) {
        throw new Error("Invalid API key or authentication failure with the AI service. Please contact administration.");
      }
      if (response.status === 429) {
        throw new Error("The AI assistant is temporarily at capacity. Please wait a minute and try again.");
      }
      if (response.status >= 500) {
        throw new Error("The AI service is currently down or experiencing issues. Please try again later.");
      }
      throw new Error(`AI service error: ${errorMessage || response.statusText}`);
    }

    const data = await response.json();
    console.log("📥 Groq API responded successfully");

    const reply = data?.choices?.[0]?.message?.content;
    if (!reply || reply.trim() === "") {
      console.error("❌ Groq API returned empty or invalid response structure:", JSON.stringify(data));
      throw new Error("AI assistant returned an empty or invalid response. Please rephrase your query.");
    }

    return reply;
  } catch (error) {
    // Handle Network Failure / DNS Resolution / Timeout errors
    if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED' || error.message.includes('fetch failed')) {
      console.error("❌ Network failure connecting to Groq API:", error.message);
      throw new Error("Network connection to the AI service failed. Please check your internet connection.");
    }
    console.error("❌ Groq API client error:", error.message || error);
    throw error;
  }
};

/**
 * Placeholder for legal text analysis.
 */
const analyzeText = async (text) => {
  try {
    const systemPrompt = "Analyze the following legal query description and return a JSON object containing: caseType (e.g. Property Law, Family Law, etc.), jurisdiction (object with city and court), complexity (Low/Medium/Complex), suggestion, score (0-100), and time (estimated duration). Output ONLY the raw JSON.";
    const response = await getAIResponse(text, [{ role: 'system', content: systemPrompt }]);
    return JSON.parse(response);
  } catch (err) {
    console.warn("⚠️ analyzeText fallback triggered due to:", err.message);
    return {
      caseType: 'General',
      jurisdiction: { city: 'Unknown', court: 'District Court' },
      complexity: 'Medium',
      suggestion: 'Consult with a lawyer for detailed advice.',
      score: 50,
      time: '2-4 weeks'
    };
  }
};

module.exports = {
  getAIResponse,
  analyzeText
};
