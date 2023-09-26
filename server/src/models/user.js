import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { schemaCleaner } from "../utils/schemaCleaner.js";
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 20,
    required: true,
    trim: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: { type: String, default: "user" },
  questions: [
    {
      quesId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
    },
  ],
  answers: [
    {
      ansId: { type: mongoose.Schema.Types.ObjectId, ref: "Answer" },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(uniqueValidator);
schemaCleaner(userSchema);

export const User = mongoose.model("User", userSchema);
