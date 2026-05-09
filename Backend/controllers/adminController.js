const User = require('../models/User');

const getAllUsers = async (req, res) => {
    res.json({ message: "All users fetched (Skeleton)" });
};

const deleteUser = async (req, res) => {
    res.json({ message: "User deleted (Skeleton)" });
};

module.exports = {
    getAllUsers,
    deleteUser,
};
