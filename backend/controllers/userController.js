import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET, { expiresIn: '60d' });
};

// Register User
export const register = async (req, res) => {
  const { name, family, email, phone, password } = req.body;

  try {
    const newUser = new User({ name, family, email, phone, password });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({ error: `${duplicateField} already exists.` });
    }
    res.status(400).json({ error: 'Error registering user. Ensure all fields are valid.' });
  }
};

// Sign In User
export const signin = async (req, res) => {
  const { identifier, password } = req.body; // identifier = email or name

  try {
    // Find user by email or name
    const user = await User.findOne({
      $or: [{ email: identifier }, { name: identifier }],
    }).select('+password'); // Explicitly include the password field

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user._id, user.role);

    // Set token as HTTP-only cookie
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000, // 1 hour
      })
      .status(200)
      .json({
        message: 'Login successful',
        userId: user._id,
        role: user.role,
      });
  } catch (error) {
    console.error('Error during sign in:', error);
    res.status(500).send({ error: 'Error during sign in' });
  }
};

// Verify Token Middleware
export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(403).send('Invalid token');
  }
};

// Update Password
export const updatePassword = async (req, res) => {
  const { userId } = req.user;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId).select('+password');
    if (!user) return res.status(404).send('User not found');

    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) return res.status(401).send('Old password is incorrect');

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    res.status(200).send('Password updated successfully');
  } catch (error) {
    res.status(500).send('Error updating password');
  }
};

// Admin-Only Delete User
export const deleteUser = async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).send('Admins only');

  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);

    if (!user) return res.status(404).send('User not found');
    res.status(200).send('User deleted');
  } catch (error) {
    res.status(500).send('Error deleting user');
  }
};
