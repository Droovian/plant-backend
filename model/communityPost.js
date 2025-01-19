import mongoose from "mongoose";

const communityPostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    }
},
{
    timestamps: true,
});

export const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);