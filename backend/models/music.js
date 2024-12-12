import { Schema, model } from "mongoose";

const SelectionSchema = new Schema({
  optionID: {
    type: Schema.Types.ObjectId, // Reference to MusicOption collection
    ref: "MusicOption",
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const CustomRequestSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: false,
  },
});

const MusicSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
      trim: true,
    },
    selections: [SelectionSchema], // Array of selected options
    customRequests: [CustomRequestSchema], // Array of custom requests
    totalCost: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export default model("Music", MusicSchema);