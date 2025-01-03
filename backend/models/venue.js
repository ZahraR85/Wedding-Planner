import mongoose from "mongoose";

const venueSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming the User model is correctly set up
      required: true,
    },
    name: { type: String, required: true },
    city: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    capacity: { type: Number, default: 0 },
    price: { type: Number, required: true }, // Base price
    discount: { type: Number, default: 0 }, // Discount percentage
    address: { type: String, required: true },
    description: { type: String, required: false },
    latitude: {
      type: Number,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      min: -180,
      max: 180,
    },
    total: { type: Number, default: 0 }, // Total = price - (price * discount / 100)
  },
  { timestamps: true }
);

// Pre-save middleware to calculate total price
venueSchema.pre("save", function (next) {
  this.total = this.price - (this.price * (this.discount || 0)) / 100;
  next();
});

export default mongoose.model("Venue", venueSchema);
