import { Schema, model } from "mongoose";

const receptionSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        Starter: {
            Number: { type: Number, required: true, default: 0 }, // Number of guests
            price: { type: Number, default: 5 },   // Price per guest
        },
        MainCourse: {
            Number: { type: Number, required: true, default: 0 },
            price: { type: Number, default: 15 },
        },
        Dessert: {
            Number: { type: Number, required: true, default: 0 },
            price: { type: Number, default: 6 },
        },
        ColdDrink: {
            Number: { type: Number, required: true, default: 0 },
            price: { type: Number, default: 7 },
        },
        CafeBar: {
            Number: { type: Number, required: true, default: 0 },
            price: { type: Number, default: 4 },
        },
        Fruiets: {
            Number: { type: Number, required: true, default: 0 },
            price: { type: Number, default: 9 },
        },
        Cake: {
            Number: { type: Number, required: true, default: 0 },
            price: { type: Number, default: 3 },
        },
        Waiter: {
            Number: { type: Number,  required: true, default: 0 },
            price: { type: Number, default: 20 },
        },
        total: {
            type: Number, // Automatically calculated
            default: 0,
        },
    },
    { timestamps: true }
);

// Pre-save hook to calculate the total
receptionSchema.pre("save", function (next) {
    const calculateTotal = (item) => this[item].selected * this[item].price;

    this.total =
        calculateTotal("Starter") +
        calculateTotal("MainCourse") +
        calculateTotal("Dessert") +
        calculateTotal("ColdDrink") +
        calculateTotal("CafeBar") +
        calculateTotal("Fruiets") +
        calculateTotal("Cake") +
        calculateTotal("Waiter");

    next();
});

export default model("Reception", receptionSchema);