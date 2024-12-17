import { Schema, model } from 'mongoose';
const venueSelectionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to user who selected the venue
    venueId: { type: Schema.Types.ObjectId, ref: 'Venue', required: true }, // Reference to the selected venue
    hours: { type: Number, required: true }, // Number of hours the user needs the venue
    date: { type: Date, required: true }, // Date when the venue is needed
  },
  { timestamps: true }
);

export default model('VenueSelection', venueSelectionSchema);

/*const venueSelectionSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    venue: {
      name: { type: String, required: true },
      city: { type: String, required: true },
      capacity: { type: Number, required: true },
      address: { type: String, required: true },
    },
    day: { type: Date, required: true }, // Selected day
    enteringHour: { type: String, required: true }, // E.g., '14:00'
  },
  { timestamps: true }
);

export default model('VenueSelection', venueSelectionSchema);
*/
