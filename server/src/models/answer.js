import mongoose from "mongoose";
import { schemaCleaner } from "../utils/schemaCleaner.js";

export const answerSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 30,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

schemaCleaner(answerSchema);

export const Answer = mongoose.model("Answer", answerSchema);
