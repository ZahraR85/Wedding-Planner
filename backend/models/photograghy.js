import mongoose from "mongoose";

const photographySchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  photography: { type: Number, required: true },
  videography: { type: Number, required: true },
  clipConstruction: { type: Number, required: true },
  physicalAlbum: { type: Boolean, required: true }, // Updated to Boolean
  giftImageSize: { type: Number, required: true },
}, { timestamps: true });

const Photography = mongoose.model("Photography", photographySchema);

export default Photography;
