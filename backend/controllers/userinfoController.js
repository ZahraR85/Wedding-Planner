import UserInfo from '../models/userInfo.js';

// Create a new record
export const createUserInfo = async (req, res) => {
  try {
    const userInfo = new UserInfo(req.body);
    await userInfo.save();
    res.status(201).json({ message: 'User info created successfully', userInfo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all records
export const getAllUserInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.find();
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single record by ID
export const getUserInfoById = async (req, res) => {
  try {
    // Query by userID instead of _id
    const userInfo = await UserInfo.findOne({ userID: req.params.id });
    if (!userInfo) return res.status(404).json({ message: "User info not found ftftftf" });
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a record
export const updateUserInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userInfo) return res.status(404).json({ message: 'User info not found' });
    res.status(200).json({ message: 'User info updated successfully', userInfo });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a record
export const deleteUserInfo = async (req, res) => {
  try {
    const userInfo = await UserInfo.findByIdAndDelete(req.params.id);
    if (!userInfo) return res.status(404).json({ message: 'User info not found' });
    res.status(200).json({ message: 'User info deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
