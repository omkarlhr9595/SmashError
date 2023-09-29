import mongoose from "mongoose";
import { commentSchema } from "./comment.js";
import { schemaCleaner } from "../utils/schemaCleaner.js";

export const aianswerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
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
  updatedAt: {
    type: Date,
    default: Date.now, 
  },
});

schemaCleaner(aianswerSchema);

export const AiAnswer = mongoose.model("AiAnswer", aianswerSchema);
