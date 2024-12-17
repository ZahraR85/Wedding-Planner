import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming the User model is correctly set up
    required: true
  },
  name: { type: String, required: true },
  city: { type: String, required: true },
  images: [{ type: String }],
  capacity: { type: Number },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },  // Discount in percentage
  address: { type: String },
  location: {
    x: { type: Number },
    y: { type: Number }
  },
  total: { type: Number, required: true }, // The calculated total field
}, { timestamps: true });

export default mongoose.model("Venue", venueSchema);
