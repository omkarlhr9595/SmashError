import mongoose from "mongoose";
import { schemaCleaner } from "../utils/schemaCleaner.js";

export const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  body: { type: String, required: true, trim: true, minlength: 5 },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

schemaCleaner(commentSchema);

export const Comment = mongoose.model("Comment", commentSchema);
