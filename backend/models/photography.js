import { Schema, model } from "mongoose";

const photographySchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId, // Reference to the User schema
      ref: "User", // Foreign key linking to the User table
      required: true,
    },
    photography: {
      number: { type: Number, required: false, default: 0 },
      price: { type: Number, default: 300 },
    },
    videography: {
      number: { type: Number, required: false, default: 0 },
      price: { type: Number, default: 300 },
    },
    clipConstruction: {
      number: { type: Number, required: false, default: 0 },
      price: { type: Number, default: 200 },
    },
    physicalAlbum: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 500 },
    },
    giftImageSize: {
      number: { type: Number, required: false, default: 0 },
      price: { type: Number, default: 10 },
    },
    total: {
      type: Number, // Automatically calculated
      default: 0,
    },
  },
  { timestamps: true }
);

// Pre-save hook to calculate total on creation (for first time entry)
photographySchema.pre("save", function (next) {
  this.total =
    this.photography.number * this.photography.price +
    this.videography.number * this.videography.price +
    this.clipConstruction.number * this.clipConstruction.price +
    (this.physicalAlbum.selected ? this.physicalAlbum.price : 0) +
    this.giftImageSize.number * this.giftImageSize.price;

  next();
});

export default model("Photography", photographySchema);
