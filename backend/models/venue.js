import mongoose from "mongoose";

const venueSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  images: [{ type: String }], // Array of image URLs
  capacity: { type: Number, default: 0 },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  address: { type: String, required: true },
  description: { type: String },
  latitude: { type: Number, min: -90, max: 90, default: null },
  longitude: { type: Number, min: -180, max: 180, default: null },
  total: { type: Number, default: 0 }, // Computed total price
}, { timestamps: true });

venueSchema.pre("save", function (next) {
  this.total = this.price - (this.price * (this.discount || 0)) / 100;
  next();
});

export default mongoose.model("Venue", venueSchema);
