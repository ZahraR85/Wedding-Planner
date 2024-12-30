import Guest from "../models/guest.js";
import nodemailer from "nodemailer";
import UserInfo from '../models/userInfo.js';






export const sendEmail = async (to, subject, text, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender's email
      to, // Recipient's email
      subject, // Subject of the email
      text, // Fallback text for non-HTML email clients
      html, // HTML email content
    });

    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error in sendEmail function:", error.message);
    throw error;
  }
};

// API endpoint to send an invitation email
export const sendInvitation = async (req, res) => {
  try {

    const { userId, email } = req.body;
    console.log( req.body);

    if (!userId) {
      return res.status(400).json({ message: "UserID is required." });
    }
    if (!email || !/.+@.+\..+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    console.log("Received userId:", userId);
     // Fetch user info dynamically
     const userInfo = await UserInfo.findOne({ userID: userId }, { _id: 0 });
     console.log(userInfo);

     if (!userInfo) {
       return res.status(404).json({ message: "User info not found for this user." });
     }
         // Fetch guest name based on the email
    const guest = await Guest.findOne({ email });

    if (!guest) {
      return res.status(404).json({ message: "Guest not found for the provided email." });
    }
    const guestName = guest.guestName;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h1 style="color:rgb(175, 76, 139);">You're Invited!</h1>
        <p>Dear ${guestName},</p>
        <p>We are delighted to invite you to the wedding of <strong>${userInfo.brideName}</strong> and <strong>${userInfo.groomName}</strong>.</p>
        <ul>
          <li><strong>Date:</strong> ${new Date(userInfo.weddingDate).toLocaleDateString()}</li>
          <li><strong>Time:</strong> 6:00 PM</li>
          <li><strong>Venue:</strong> The Grand Hall, 123 Celebration Avenue</li>
        </ul>
        <p>${userInfo.story || "We look forward to celebrating with you!"}</p>
        <p>Please respond to this email with your availability.</p>
        <p>Best Regards,</p>
        <p><strong>${userInfo.brideName} & ${userInfo.groomName}</strong></p>
      </div>
    `;

    await sendEmail(email, "You're Invited!", "Please join us for the event!", htmlContent);

    res.status(200).json({ message: "Invitation sent successfully!" });
  } catch (error) {
    console.error("Error sending invitation:", error.message);
    res.status(500).json({ message: "Error sending invitation", error: error.message });
  }
};








export const createGuest = async (req, res) => {
  try {
    const { userID, guestName, numberOfPersons, phone, address, answerStatus, email } = req.body;
    console.log(req.body);

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    if (!['Yes', 'No', 'Not yet'].includes(answerStatus)) {
      return res.status(400).json({ message: "Invalid answerStatus." });
    }

    if (!email || !/.+@.+\..+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check for existing email
    const existingGuest = await Guest.findOne({ email });
    if (existingGuest) {
      return res.status(400).json({ message: "Email already exists. Please use a different email." });
    }

    const feature = await Guest.create({
      userID,
      guestName,
      numberOfPersons,
      answerStatus,
      phone,
      address,
      email,
    });

    res.status(201).json({ message: "Guest created successfully!", feature });
  } catch (error) {
    console.error("Error in Controller:", error);
    if (error.name === "ValidationError") {
      res.status(400).json({ message: "Validation Error", errors: error.errors });
    } else {
      res.status(500).json({ message: "Error creating guest", error: error.message });
    }
  }
};

// Get all guests
export const getGuests = async (req, res) => {
  try {
    const { userID } = req.query;

    if (!userID) {
      return res.status(400).json({ message: "UserID is required." });
    }

    const guests = await Guest.find({ userID });
    res.status(200).json(guests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single guest by ID
export const getGuestById = async (req, res) => {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json(guest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a guest
export const updateGuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { guestName, numberOfPersons, phone, address, answerStatus, email } = req.body;

    if (!['Yes', 'No', 'Not yet'].includes(answerStatus)) {
      return res.status(400).json({ message: "Invalid answerStatus." });
    }

    if (!email || !/.+@.+\..+/.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    // Check if another guest already uses the same email
    // const existingGuest = await Guest.findOne({ email, _id: { $ne: id } });
    // if (existingGuest) {
    //   return res.status(400).json({ message: "Email already exists. Please use a different email." });
    // }

    const updatedGuest = await Guest.findByIdAndUpdate(
      id,
      { guestName, numberOfPersons, phone, address, answerStatus, email },
      { new: true }
    );

    if (!updatedGuest) {
      return res.status(404).json({ message: "Guest not found." });
    }

    res.status(200).json({ message: "Guest updated successfully!", updatedGuest });
  } catch (error) {
    console.error("Error in Controller:", error);
    res.status(500).json({ message: "Error updating guest", error: error.message });
  }
};

// Delete a guest
export const deleteGuest = async (req, res) => {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest) return res.status(404).json({ message: 'Guest not found' });
    res.status(200).json({ message: 'Guest deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};