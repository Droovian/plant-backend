import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    points: {
        type: Number,
        default: 0,
    },
    token:{
        type: String,
        default: null,
        optional: true,
    }
},
{
    timestamps: true,
});

export const User = mongoose.model("User", userSchema);
