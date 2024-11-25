import mongoose, { model, Schema } from "mongoose";

// Comment Schema
const commentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user", // Reference to the User model
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment", // Reference to the same schema for nested comments
      },
    ],
  },
  { timestamps: true } 
);


export const Comment = model("comment", commentSchema);

