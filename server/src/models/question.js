import mongoose from "mongoose";
import { schemaCleaner } from "../utils/schemaCleaner.js";
import { answerSchema } from "./answer.js";

export const questionSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 15,
  },
  body: {
    type: String,
    required: true,
    trim: true,
    minlength: 30,
  },
  tags: [{ type: String, required: true, trim: true }],
  answers: [answerSchema],
  points: {
    type: Number,
    default: 0,
  },
  aiAnswer: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

schemaCleaner(questionSchema);

export const Question = mongoose.model("Question", questionSchema);
