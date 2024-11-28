import mongoose, { model, Schema } from "mongoose";


const reportSchema = new Schema(
  {
    reportType: {
      type: String,
      enum: ['Spam', 'Sexual Content', 'Harassment', 'Hate Speech', 'Misinformation', 'Other'],
      required: true,
    },
    description: {
      type: String,
      maxlength: 500,
      default: '',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    reportedOn: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blog',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Resolved', 'Dismissed'],
      default: 'Pending',
    },
    resolvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: null,
    },
    resolutionNotes: {
      type: String,
      maxlength: 500,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

export const  Reports = model('report', reportSchema);
