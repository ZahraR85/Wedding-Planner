import mongoose from "mongoose";

const photographySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      required: true,
    },
    photography: {
      number: { type: Number, required: true, default: 0 },
      price: { type: Number, default: 300 },
    },
    videography: {
      number: { type: Number, required: true, default: 0 },
      price: { type: Number, default: 300 },
    },
    clipConstruction: {
      number: { type: Number, required: true, default: 0 },
      price: { type: Number, default: 200 },
    },
    physicalAlbum: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 500 },
    },
    giftImageSize: {
      number: { type: Number, required: true, default: 0 },
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
  // Calculate the total dynamically
  this.total =
    this.photography.number * this.photography.price +
    this.videography.number * this.videography.price +
    this.clipConstruction.number * this.clipConstruction.price +
    (this.physicalAlbum.selected ? this.physicalAlbum.price : 0) +
    this.giftImageSize.number * this.giftImageSize.price;

  next();
});
photographySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update) {
    // Fetch the current document
    const docToUpdate = await this.model.findOne(this.getQuery());

    // Merge existing values with the incoming update
    const photography = { ...docToUpdate.photography, ...update.photography };
    const videography = { ...docToUpdate.videography, ...update.videography };
    const clipConstruction = { ...docToUpdate.clipConstruction, ...update.clipConstruction };
    const physicalAlbum = { ...docToUpdate.physicalAlbum, ...update.physicalAlbum };
    const giftImageSize = { ...docToUpdate.giftImageSize, ...update.giftImageSize };

    // Recalculate total
    const total =
      (photography.number || 0) * (photography.price || 0) +
      (videography.number || 0) * (videography.price || 0) +
      (clipConstruction.number || 0) * (clipConstruction.price || 0) +
      (physicalAlbum.selected ? (physicalAlbum.price || 0) : 0) +
      (giftImageSize.number || 0) * (giftImageSize.price || 0);

    // Update the total in the update object
    this.setUpdate({ ...update, total });
  }
  next();
});


const Photography = mongoose.model("Photography", photographySchema);

export default Photography;
