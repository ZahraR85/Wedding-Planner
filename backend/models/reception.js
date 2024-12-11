import { Schema, model } from "mongoose";

const receptionSchema = new Schema(
    {
        userID: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        Starter: {
            selected: { type: Number, default: 0 }, // Number of guests
            price: { type: Number, default: 5 },   // Price per guest
        },
        MainCourse: {
            selected: { type: Number, default: 0 },
            price: { type: Number, default: 15 },
        },
        Dessert: {
            selected: { type: Number, default: 0 },
            price: { type: Number, default: 6 },
        },
        ColdDrink: {
            selected: { type: Number, default: 0 },
            price: { type: Number, default: 7 },
        },
        CafeBar: {
            selected: { type: Number, default: 0 },
            price: { type: Number, default: 4 },
        },
        Fruiets: {
            selected: { type: Number, default: 0 },
            price: { type: Number, default: 9 },
        },
        Cake: {
            selected: { type: Number, default: 0 },
            price: { type: Number, default: 3 },
        },
        Waiter: {
            selected: { type: Number, default: 0 },
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