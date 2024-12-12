
import { Schema, model } from "mongoose";

const MusicOptionSchema = new Schema(
  {
    category: {
      type: String, // E.g., "Band", "DJ", "Instrumental"
      required: true,
    },
    name: {
      type: String, // E.g., "AlexBand"
      required: true,
      trim: true,
    },
    pricePerHour: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    additionalFeatures: [String], // Optional array of features
    sampleLink: {
      type: String, // URL to a sample performance
      required: false,
    },
  },
  { timestamps: true }
);

export default model("MusicOption", MusicOptionSchema);