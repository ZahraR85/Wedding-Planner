
import { Schema, model } from "mongoose";

const GuestSchema = new Schema(
  {
    userID: {
      type: String, // No `unique: true`
      required: true,
      trim: true,
    },
    guestName: {
      type: String,
      required: true,
      trim: true,
    },
    numberOfPersons: {
      type: Number,
      required: true,
    },
    answerStatus: {
      type: String,
      enum: ['Yes', 'No', 'Not yet'],
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      unique: true, // Phone should remain unique
    },
    address: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true, // Email should remain unique
      match: [/.+@.+\..+/, 'Please enter a valid email address'],
    },
  },
  { timestamps: true }
);

export default model('Guest', GuestSchema);