const Message = require('../models/Message');

// Helper to generate a mock AI response
const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('hello') || message.includes('hi')) {
        return "Hello! I am your LawBridge AI assistant. How can I help you with your legal queries today?";
    }
    
    if (message.includes('divorce') || message.includes('family')) {
        return "Family law matters can be sensitive. In Pakistan, divorce or Khula procedures involve filing a petition in the Family Court. Would you like me to guide you on document collection?";
    }
    
    if (message.includes('property') || message.includes('rent')) {
        return "Property disputes often require a legal notice to be served first. You should have your title deeds or rental agreements ready. Do you want to see a roadmap for property litigation?";
    }

    if (message.includes('fee') || message.includes('cost')) {
        return "Legal fees vary depending on the lawyer's experience and the complexity of the case. You can discuss this directly with a lawyer after booking a consultation.";
    }

    return "That sounds like a complex matter. I recommend analyzing your case using our 'Analyze Case' feature or booking a consultation with a specialized lawyer for detailed advice.";
};

// @desc    Send a message to AI
// @route   POST /api/chat
// @access  Private
const sendMessage = async (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ message: 'Please provide message content' });
    }

    try {
        // 1. Save User Message
        const userChat = await Message.create({
            senderId: req.user._id,
            role: 'user',
            content: content
        });

        // 2. Generate AI Response
        const aiContent = generateAIResponse(content);

        // 3. Save AI Response
        const aiChat = await Message.create({
            senderId: req.user._id, // For AI chat, we'll mark AI responses associated with the user
            role: 'assistant',
            content: aiContent
        });

        res.status(201).json({
            userMessage: userChat,
            aiMessage: aiChat
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get chat history
// @route   GET /api/chat/history
// @access  Private
const getChatHistory = async (req, res) => {
    try {
        const history = await Message.find({ senderId: req.user._id, role: { $in: ['user', 'assistant'] } }).sort({ createdAt: 1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sendMessage,
    getChatHistory
};

