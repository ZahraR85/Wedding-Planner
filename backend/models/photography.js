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

// Pre-save hook to calculate total
photographySchema.pre("save", function (next) {
  this.total =
    this.photography.number * this.photography.price +
    this.videography.number * this.videography.price +
    this.clipConstruction.number * this.clipConstruction.price +
    (this.physicalAlbum.selected ? this.physicalAlbum.price : 0) +
    this.giftImageSize.number * this.giftImageSize.price;

  next();
});

// Pre-update hook to recalculate total before saving the update
photographySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  
  if (update) {
    const photography = update.photography || {};
    const videography = update.videography || {};
    const clipConstruction = update.clipConstruction || {};
    const physicalAlbum = update.physicalAlbum || {};
    const giftImageSize = update.giftImageSize || {};

    const total =
      (photography.number || 0) * (photography.price || 0) +
      (videography.number || 0) * (videography.price || 0) +
      (clipConstruction.number || 0) * (clipConstruction.price || 0) +
      (physicalAlbum.selected ? (physicalAlbum.price || 0) : 0) +
      (giftImageSize.number || 0) * (giftImageSize.price || 0);

    this.setUpdate({ ...update, total });
  }
  next();
});

export default model("Photography", photographySchema);
