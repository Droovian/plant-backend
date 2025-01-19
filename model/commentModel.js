import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
      text: {
        type: String,
        required: true, 
      },
      userId: {
        type: String,
        ref: 'User',  
        required: true,  
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',  
        required: true,
      },
    },
    {
      timestamps: true,  
    }
  );
  
  export const CommentModel = mongoose.model('CommentModel', commentSchema);
  
 