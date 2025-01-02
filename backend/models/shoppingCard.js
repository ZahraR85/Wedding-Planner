import { Schema, model } from 'mongoose';

const shoppingCardSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId, // Foreign key for the User
      ref: 'User',
      required: true,
    },
    serviceName: {
      type: String, // The name of the service (e.g., 'Makeup', 'Photography', etc.)
      required: true,
    },
    price: {
      type: Number, // Price for the selected service
      required: true,
    },
  },
  { timestamps: true }
);

export default model('ShoppingCard', shoppingCardSchema);
