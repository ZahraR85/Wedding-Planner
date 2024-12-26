import { Schema, model } from 'mongoose';

const gallerySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User ', required: true },
    imageName: {type: String, required: true},
    imageUrl: { type: String, required: true },
    description: { type: String, trim: true },
  },
  { timestamps: true }
);

export default model('Gallery', gallerySchema);