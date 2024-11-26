// Comment.js
import mongoose, { model, Schema } from "mongoose";

const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  { timestamps: true }
);

export const Comment = mongoose.model("comment", commentSchema); // Correctly register the model
