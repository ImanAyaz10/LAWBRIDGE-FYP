const { analyzeText } = require('../services/aiService');

const analyzeCase = async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ error: 'Please provide a case description' });
    }

    try {
        const analysis = await analyzeText(description);
        res.json({ success: true, analysis });
    } catch (error) {
        console.error("❌ analyzeCase error:", error.message);
        res.status(503).json({
            error: 'AI analysis service temporarily unavailable',
            detail: error.message
        });
    }
};

module.exports = {
    analyzeCase,
};

