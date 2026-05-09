const Case = require('../models/Case');

// Helper function for mock AI analysis
const analyzeLegalProblem = (description) => {
    const text = description.toLowerCase();
    let caseType = 'General';
    let jurisdiction = { city: 'Unknown', court: 'District Court' };
    let complexity = 'Medium';
    let suggestion = 'Consult with a lawyer for detailed advice.';
    let score = 50;
    let time = '2-4 weeks';

    // Basic Keyword Detection
    if (text.includes('rent') || text.includes('tenant') || text.includes('property') || text.includes('makan')) {
        caseType = 'Property Law';
        suggestion = 'Send a legal notice to the counterparty.';
        score = 75;
    } else if (text.includes('divorce') || text.includes('khula') || text.includes('marriage')) {
        caseType = 'Family Law';
        suggestion = 'Gather marriage certificate and relevant documents.';
        score = 65;
        complexity = 'Complex';
    }

    // Jurisdiction detection ( Lahore mentioned in prompt)
    if (text.includes('lahore')) {
        jurisdiction.city = 'Lahore';
        jurisdiction.court = 'District Court Lahore';
    }

    return { caseType, jurisdiction, complexity, suggestion, score, time };
};

// @desc    Analyze legal case
// @route   POST /api/case/analyze
// @access  Private (Authenticated users)
const analyzeCase = async (req, res) => {
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ message: 'Please provide a case description' });
    }

    try {
        const analysis = analyzeLegalProblem(description);

        const newCase = await Case.create({
            userId: req.user._id, // Assumes auth middleware populates req.user
            description,
            caseType: analysis.caseType,
            complexity: analysis.complexity,
            estimatedTime: analysis.time,
            suggestion: analysis.suggestion,
            score: analysis.score,
            jurisdiction: analysis.jurisdiction,
        });

        res.status(201).json(newCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Generate legal roadmap
// @route   POST /api/case/roadmap/:id
// @access  Private
const generateRoadmap = async (req, res) => {
    try {
        const legalCase = await Case.findById(req.params.id);

        if (!legalCase) {
            return res.status(404).json({ message: 'Case not found' });
        }

        // Mock roadmap based on case type
        let roadmap = [
            { step: 1, title: 'Document Collection', description: 'Gather all relevant identity and legal documents.' },
            { step: 2, title: 'Initial Consultation', description: 'Discuss the case details with a specialized lawyer.' },
        ];

        if (legalCase.caseType === 'Property Law') {
            roadmap.push({ step: 3, title: 'Legal Notice', description: 'Send a formal legal notice to the other party.' });
            roadmap.push({ step: 4, title: 'Filing', description: 'File the case in the District Court.' });
        } else {
            roadmap.push({ step: 3, title: 'Formal Filing', description: 'Prepare and file the necessary legal petitions.' });
        }

        legalCase.roadmap = roadmap;
        await legalCase.save();

        res.json(legalCase);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    analyzeCase,
    generateRoadmap,
};
