import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

const userInfoSchema = new Schema(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    brideName: { type: String, required: true },
    groomName: { type: String, required: true },
    weddingDate: { type: Date, required: true },
    story: { type: String },
    brideBirthday: { type: Date },
    groomBirthday: { type: Date },
    feedback: { type: String },
  },
  { timestamps: true }
);

// Prevent OverwriteModelError
const UserInfo = models.UserInfo || model("UserInfo", userInfoSchema);

export default UserInfo;