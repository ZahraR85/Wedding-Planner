import { Schema, model } from 'mongoose';

const venueSelectionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true }, // Reference to the selected venue
    date: { type: Date, required: true }, 
  },
  { timestamps: true }
);

export default model('VenueSelection', venueSelectionSchema);
