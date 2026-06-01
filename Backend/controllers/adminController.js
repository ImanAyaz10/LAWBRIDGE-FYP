// controllers/adminController.js
const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Admin login
// @route   POST /api/admin/auth/login
// @access  Public (admin only)
const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const admin = await User.findOne({ email, role: 'admin' }).select('+password');
  if (!admin) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const isMatch = await admin.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = require('jsonwebtoken').sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  res.json({ token, admin: { id: admin._id, name: admin.name, email: admin.email } });
});

// @desc    Get all users (admin only)
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
  // Assuming protect and authorize middleware have set req.user
  const users = await User.find().select('-password');
  res.status(200).json(users);
});

// @desc    Delete a user by ID (admin only)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  await user.remove();
  res.json({ message: 'User deleted successfully' });
});

module.exports = {
  adminLogin,
  getAllUsers,
  deleteUser,
};
