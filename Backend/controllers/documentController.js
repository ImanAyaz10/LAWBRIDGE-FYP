const Document = require('../models/Document');

const uploadDocument = async (req, res) => {
    res.json({ message: "Document uploaded (Skeleton)" });
};

const getDocuments = async (req, res) => {
    res.json({ message: "Documents fetched (Skeleton)" });
};

module.exports = {
    uploadDocument,
    getDocuments,
};
