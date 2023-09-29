import mongoose from "mongoose";
import { commentSchema } from "./comment.js";
import { schemaCleaner } from "../utils/schemaCleaner.js";

export const aianswerSchema = new mongoose.Schema({
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
  upvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  downvotedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
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
