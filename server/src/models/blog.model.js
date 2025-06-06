
import mongoose, { model, Schema } from "mongoose";


// Blog Schema
const blogSchema = new Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // Reference to the User model
        required: true,
      },
      image: {
        url: {
          type: String,
        },
        public_id: {
          type: String,
        },
      },
      content: {
        type: String,
        required: true,
      },
      title:{
        type:String ,
        required : true
      },

      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "comment", // Reference to the Comment schema
        },
      ],

      reactions:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user", // Reference to the User model
            required: true,
        }
      ],
      
      isBlock :{
        type: Boolean ,
        default:false
      }

    },

    { timestamps: true } // Adds createdAt and updatedAt fields
  );
  
export const Blogs = model("blog", blogSchema);