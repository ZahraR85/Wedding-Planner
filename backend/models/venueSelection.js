import { Schema, model } from 'mongoose';

const venueSelectionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user who selected the venue
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true }, // Reference to the selected venue
    date: { type: Date, required: true }, // Date when the venue is needed
  },
  { timestamps: true }
);

export default model('VenueSelection', venueSelectionSchema);
