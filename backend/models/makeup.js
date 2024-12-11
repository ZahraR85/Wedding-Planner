import { Schema, model } from "mongoose";

const makeupSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId, // Reference to the User schema
      ref: "User",
      required: true,
    },
    makeup: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 400 },
    },
    dress: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 500 },
    },
    nail: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 200 },
    },
    hairstyle: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 400 },
    },
    shoes: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 100 },
    },
    special: {
      selected: { type: Boolean, default: false },
      price: { type: Number, default: 300 },
    },
    total: {
      type: Number, // Automatically calculated
      default: 0,
    },
  },
  { timestamps: true }
);

makeupSchema.pre("save", function (next) {
  // Calculate the total before saving
  this.total =
    (this.makeup.selected ? this.makeup.price : 0) +
    (this.dress.selected ? this.dress.price : 0) +
    (this.nail.selected ? this.nail.price : 0) +
    (this.hairstyle.selected ? this.hairstyle.price : 0) +
    (this.shoes.selected ? this.shoes.price : 0) +
    (this.special.selected ? this.special.price : 0);
  next();
});

export default model("Makeup", makeupSchema);
