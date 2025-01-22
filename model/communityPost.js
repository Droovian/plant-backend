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
    },
    type: {
        type: String,
        required: true,
        enum: [
            "Help",
            "Tips",
            "DIY",
            "Organic",
            "Identification",
            "Inspiration",
            "Projects",
            "General",
        ],
        default: "General",
    },

},
{
    timestamps: true,
});

export const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);